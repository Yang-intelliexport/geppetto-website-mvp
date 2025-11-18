import type { APIRoute } from 'astro';
import { createClient } from '../../../lib/supabase/server';
import { supabaseAdmin } from '../../../lib/supabase';

type Language = 'zh' | 'en';

type QuoteRow = {
  id: string;
  user_id: string | null;
  status: string;
  material?: string | null;
  quantity?: number | null;
  total_amount?: number | null;
  currency?: string | null;
  customer_notes?: string | null;
  cad_file_path?: string | null;
  stripe_payment_intent_id?: string | null;
  created_at: string;
  updated_at?: string | null;
};

type ProfileRecord = {
  id: string;
  email?: string | null;
  contact_name?: string | null;
  company_name?: string | null;
  phone_number?: string | null;
};

type ApiResponse = {
  success: boolean;
  data?: Record<string, unknown>;
  error?: string;
  message?: string;
  requestId?: string;
  meta?: Record<string, unknown>;
};

const SELECT_COLUMNS = `
  id,
  user_id,
  status,
  material,
  quantity,
  total_amount,
  currency,
  customer_notes,
  cad_file_path,
  stripe_payment_intent_id,
  created_at,
  updated_at
`;

const STATUS_LABELS = {
  en: {
    new: 'New',
    pending: 'Pending',
    quoted: 'Quoted',
    processing: 'Processing',
    paid: 'Paid',
    manufacturing: 'Manufacturing',
    shipping: 'Shipping',
    complete: 'Complete',
    cancelled: 'Cancelled',
    'payment_pending': 'Payment Pending',
    'payment-confirmed': 'Payment Confirmed',
    'ai-reviewing': 'AI Reviewing',
    'expert-reviewing': 'Expert Review',
    'quality-check': 'Quality Check',
    packaging: 'Packaging'
  },
  zh: {
    new: '新建',
    pending: '待处理',
    quoted: '已报价',
    processing: '处理中',
    paid: '已支付',
    manufacturing: '生产中',
    shipping: '运输中',
    complete: '已完成',
    cancelled: '已取消',
    'payment_pending': '等待付款',
    'payment-confirmed': '支付成功',
    'ai-reviewing': 'AI评估',
    'expert-reviewing': '专家审核',
    'quality-check': '质量检测',
    packaging: '打包中'
  }
} as const;

const MATERIAL_LABELS = {
  en: {
    aluminum: 'Aluminum',
    'aluminum-6061': '6061 Aluminum',
    'aluminum-7075': '7075 Aluminum',
    steel: 'Carbon Steel',
    stainless_steel: 'Stainless Steel',
    'stainless-304': '304 Stainless Steel',
    'stainless-316': '316 Stainless Steel',
    brass: 'Brass',
    'brass-c360': 'Brass C360',
    titanium: 'Titanium',
    'titanium-grade2': 'Titanium Grade 2',
    plastic: 'Plastic',
    other: 'Other Material'
  },
  zh: {
    aluminum: '铝合金',
    'aluminum-6061': '6061铝合金',
    'aluminum-7075': '7075铝合金',
    steel: '碳钢',
    stainless_steel: '不锈钢',
    'stainless-304': '304不锈钢',
    'stainless-316': '316不锈钢',
    brass: '黄铜',
    'brass-c360': 'C360黄铜',
    titanium: '钛合金',
    'titanium-grade2': 'Grade 2钛合金',
    plastic: '塑料',
    other: '其他材料'
  }
} as const;

const ORDER_STATUSES = new Set(['paid', 'complete']);

const parseLanguage = (value: string | null): Language => (value === 'en' ? 'en' : 'zh');
const looksLikeEmail = (value: string) => value.includes('@') && value.includes('.');
const isUUID = (value: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

const formatShortId = (row: QuoteRow) => {
  const source = String(row.id ?? '');
  return source.slice(-8).toUpperCase();
};

const localizeMaterial = (material: string | null | undefined, language: Language) => {
  if (!material) return language === 'zh' ? '未指定材料' : 'Material TBD';
  const labels = MATERIAL_LABELS[language];
  return labels[material as keyof typeof labels] ?? material;
};

const localizeStatus = (status: string, language: Language) => {
  const labels = STATUS_LABELS[language];
  return labels[status as keyof typeof labels] ?? status;
};

const buildSelect = (supabase: ReturnType<typeof createClient> | NonNullable<typeof supabaseAdmin>) =>
  supabase
    .from('quotes')
    .select(SELECT_COLUMNS)
    .order('created_at', { ascending: false })
    .limit(50);

const executeQuery = async (
  queryBuilder: ReturnType<typeof buildSelect>,
) => {
  const { data, error } = await queryBuilder;
  if (error) {
    console.error('Track order query failed:', error);
    return [];
  }
  return data ?? [];
};

const log = (...args: any[]) => {
  if (import.meta.env?.DEV) {
    console.debug('[track-order/api]', ...args);
  }
};

async function fetchQuotesByUserIds(
  supabaseClient: ReturnType<typeof createClient> | NonNullable<typeof supabaseAdmin>,
  userIds: string[],
) {
  if (!userIds.length) return [];
  log('fetchQuotesByUserIds', userIds);
  return executeQuery(buildSelect(supabaseClient).in('user_id', userIds));
}

async function fetchQuotesByQuery(
  supabaseClient: ReturnType<typeof createClient> | NonNullable<typeof supabaseAdmin>,
  profilesClient: ReturnType<typeof createClient> | NonNullable<typeof supabaseAdmin>,
  query: string,
) {
  const trimmed = query.trim();
  if (!trimmed) return [];

  if (looksLikeEmail(trimmed)) {
    log('searching profiles for email', trimmed);
    const { data: profiles, error } = await profilesClient
      .from('profiles')
      .select('id')
      .ilike('email', `%${trimmed}%`)
      .limit(10);
    if (error) {
      console.error('[track-order/API] profile query failed', error);
    } else if (profiles?.length) {
      const ids = profiles.map((profile) => profile.id);
      log('profile matches found', ids);
      const rows = await fetchQuotesByUserIds(supabaseClient, ids);
      if (rows.length) return rows;
    }
  }

  if (isUUID(trimmed)) {
    const rows = await executeQuery(buildSelect(supabaseClient).eq('id', trimmed));
    if (rows.length) return rows;
  }

  const normalized = trimmed.replace(/[^a-z0-9]/gi, '').toLowerCase();
  if (normalized.length >= 4) {
    log('searching quotes by short id fragment', normalized);
    const rows = await executeQuery(buildSelect(supabaseClient));
    const filtered = rows.filter((row) =>
      (row.id || '').replace(/[^a-z0-9]/gi, '').toLowerCase().includes(normalized),
    );
    if (filtered.length) return filtered;
  }

  return [];
}

const mapQuoteToOrder = (
  row: QuoteRow,
  language: Language,
  profileMap: Map<string, ProfileRecord>,
) => {
  const amount = row.total_amount ?? null;
  const currency = (row.currency ?? (language === 'zh' ? 'CNY' : 'USD')).toUpperCase();
  const type = ORDER_STATUSES.has(row.status) ? 'order' : 'quote';
  const profile = row.user_id ? profileMap.get(row.user_id) : undefined;

  return {
    id: row.id,
    shortId: formatShortId(row),
    type,
    status: row.status,
    statusLabel: localizeStatus(row.status, language),
    email: profile?.email ?? null,
    contactName: profile?.contact_name ?? null,
    material: row.material,
    materialLabel: localizeMaterial(row.material, language),
    quantity: row.quantity ?? null,
    quoteTotal: amount,
    currency,
    estimatedDeliveryDays: null,
    customerNotes: row.customer_notes ?? null,
    engineerNotes: null,
    createdAt: row.created_at,
    updatedAt: row.updated_at ?? row.created_at,
    paymentUrl: row.status === 'paid' ? null : `/${language}/order/${encodeURIComponent(row.id)}/payment`
  };
};

export const POST: APIRoute = async (context) => {
  const formData = await context.request.formData();
  const rawQuery = formData.get('query')?.toString() ?? '';
  const query = rawQuery.trim();
  const language = parseLanguage(formData.get('language')?.toString() ?? null);

  const requestClient = createClient(context);
  const supabase = supabaseAdmin ?? requestClient;

  const { data: userResult } = await requestClient.auth.getUser();
  const sessionUserId = userResult?.user?.id ?? null;
  const useSessionFallback = !query && sessionUserId;

  if (!useSessionFallback && !query) {
    return new Response(
      JSON.stringify({
        success: false,
        error: language === 'zh' ? '请输入查询条件' : 'Please provide a search query',
        requestId: `track_${Date.now()}`
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let quotes: QuoteRow[] = [];
  if (useSessionFallback && sessionUserId) {
    quotes = await executeQuery(buildSelect(supabase).eq('user_id', sessionUserId));
  } else {
    quotes = await fetchQuotesByQuery(supabase, supabase, query);
  }

  let orders: ReturnType<typeof mapQuoteToOrder>[] = [];
  if (quotes.length) {
    const userIds = Array.from(
      new Set(quotes.map((row) => row.user_id).filter((value): value is string => Boolean(value)))
    );
    let profileMap = new Map<string, ProfileRecord>();
    if (userIds.length) {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('id,email,contact_name,company_name,phone_number')
        .in('id', userIds);
      if (error) {
        console.error('Track order profile fetch failed:', error);
      } else if (profiles) {
        profileMap = new Map(profiles.map((profile) => [profile.id, profile]));
      }
    }
    orders = quotes.map((row) => mapQuoteToOrder(row, language, profileMap));
  }

  const response: ApiResponse = {
    success: true,
    data: { orders },
    message: orders.length
      ? language === 'zh'
        ? `找到 ${orders.length} 条记录`
        : `Found ${orders.length} record(s)`
      : language === 'zh'
        ? '未找到匹配的订单'
        : 'No matching orders found',
    requestId: `track_${Date.now()}`,
    meta: {
      count: orders.length,
      query
    }
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      success: true,
      message: 'Track Order API ready',
      requires: 'POST form-data { query, language }'
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};
