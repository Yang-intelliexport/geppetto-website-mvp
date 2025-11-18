import type { AstroGlobal } from 'astro';
import { createClient } from '../lib/supabase/astro';

export async function getQuoteDetails(Astro: AstroGlobal, quoteId: string) {
  const supabase = createClient(Astro);

  const numericId = Number(quoteId);
  let quoteQuery = supabase
    .from('quotes')
    .select(
      `
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
    `,
    );

  if (!Number.isNaN(numericId)) {
    quoteQuery = quoteQuery.eq('id', numericId);
  } else {
    quoteQuery = quoteQuery.eq('id', quoteId);
  }

  const { data, error } = await quoteQuery.single();

  if (error) {
    console.error('❌ [server] 获取报价详情失败:', error);
    throw error;
  }

  let profile = null;
  if (data?.user_id) {
    const { data: profileData } = await supabase
      .from('profiles')
      .select('id,email,contact_name,company_name,phone_number')
      .eq('id', data.user_id)
      .single();
    profile = profileData ?? null;
  }

  const [breakdown, messages, files] = await Promise.all([
    supabase.from('quote_breakdown_items').select('*').eq('quote_id', data.id),
    supabase.from('quote_messages').select('*').eq('quote_id', data.id),
    supabase.from('quote_files').select('*').eq('quote_id', data.id)
  ]);

  return {
    ...data,
    token: String(data.id),
    email: profile?.email ?? '',
    contact_name: profile?.contact_name ?? '',
    profile,
    quote_breakdown_items: breakdown.data ?? [],
    quote_messages: messages.data ?? [],
    quote_files: files.data ?? []
  };
}

export async function getCurrentSession(Astro: AstroGlobal) {
  const supabase = createClient(Astro);
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error('❌ [server] 获取会话失败:', error);
    throw error;
  }

  return data.session;
}
