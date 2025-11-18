import type { APIRoute } from 'astro';
import { createClient } from '../../../lib/supabase/server';
import { supabaseAdmin } from '../../../lib/supabase';

const MAX_FILES = 10;
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ALLOWED_EXTENSIONS = [
  'step',
  'stp',
  'stl',
  'iges',
  'igs',
  'dwg',
  'dxf',
  'obj',
  'ply',
  '3mf'
];

const jsonResponse = (status: number, payload: Record<string, unknown>) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });

const normalizeMaterial = (value: string) => {
  const map: Record<string, string> = {
    '6061-t6': 'aluminum',
    '7075-t6': 'aluminum',
    '2024-t3': 'aluminum',
    'aluminum-6061': 'aluminum',
    'aluminum-7075': 'aluminum',
    'stainless-304': 'stainless_steel',
    'stainless-316': 'stainless_steel',
    '304-stainless': 'stainless_steel',
    '316l-stainless': 'stainless_steel',
    '17-4ph-stainless': 'stainless_steel',
    'c360-brass': 'brass',
    brass: 'brass',
    copper: 'brass',
    'ti-6al-4v': 'titanium',
    'grade-2-titanium': 'titanium',
    titanium: 'titanium',
    'carbon-steel': 'steel',
    steel: 'steel',
    aluminum: 'aluminum',
    'aluminum-alloy': 'aluminum',
    plastic: 'plastic',
    peek: 'plastic',
    pom: 'plastic'
  };
  return map[value] || 'other';
};

const isMultipart = (contentType: string | null) =>
  Boolean(contentType && contentType.includes('multipart/form-data'));

const isAllowedExtension = (fileName: string) => {
  const lower = fileName.toLowerCase();
  return ALLOWED_EXTENSIONS.some((ext) => lower.endsWith(`.${ext}`));
};

const uploadFiles = async (supabase: ReturnType<typeof createClient> | NonNullable<typeof supabaseAdmin>, files: File[]) => {
  const uploads: Array<{
    originalName: string;
    path: string;
    size: number;
    type: string;
  }> = [];

  for (const file of files) {
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`File ${file.name} exceeds 50MB limit.`);
    }

    if (!isAllowedExtension(file.name)) {
      throw new Error(`File ${file.name} type is not supported.`);
    }

    const extension = file.name.split('.').pop() || 'step';
    const safeName = `${Date.now()}-${randomUUID()}.${extension}`;
    const storagePath = `public/quotes/${safeName}`;
    const buffer = new Uint8Array(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from('cad-files')
      .upload(storagePath, buffer, {
        contentType: file.type || 'application/octet-stream',
        upsert: false
      });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    uploads.push({
      originalName: file.name,
      path: storagePath,
      size: file.size,
      type: file.type || 'application/octet-stream'
    });
  }

  return uploads;
};

export const POST: APIRoute = async (context) => {
  const contentType = context.request.headers.get('content-type');
  if (!isMultipart(contentType)) {
    return jsonResponse(400, { success: false, error: 'Invalid content type.' });
  }

  const formData = await context.request.formData();
  const emailFromForm = formData.get('email')?.toString().trim() || '';
  const materialRaw = formData.get('material')?.toString().trim();
  const quantityValue = Number(formData.get('quantity') ?? '0');
  const language = (formData.get('language')?.toString() || 'zh') as 'zh' | 'en';
  const name = formData.get('name')?.toString().trim() || null;
  const companyRaw = formData.get('company')?.toString().trim() || '';
  const phone = formData.get('phone')?.toString().trim() || null;
  const country = formData.get('country')?.toString().trim() || null;
  const notes = formData.get('notes')?.toString().trim() || null;

  const fileEntries = Array.from(formData.entries())
    .filter(([key]) => key.startsWith('file'))
    .map(([, value]) => value)
    .filter((value): value is File => value instanceof File && value.size > 0);

  if (!materialRaw || Number.isNaN(quantityValue) || quantityValue <= 0) {
    return jsonResponse(400, { success: false, error: 'Missing required fields.' });
  }

  if (!fileEntries.length) {
    return jsonResponse(400, { success: false, error: 'At least one CAD file is required.' });
  }

  if (fileEntries.length > MAX_FILES) {
    return jsonResponse(400, { success: false, error: 'Too many files uploaded.' });
  }

  try {
    const requestScopedClient = createClient(context);
    if (import.meta.env?.DEV) {
      console.debug('[create-quote] incoming request', {
        hasCookie: Boolean(context.request.headers.get('cookie')),
        contentType
      });
    }
    const { data: sessionData, error: sessionError } = await requestScopedClient.auth.getSession();

    if (sessionError) {
      console.error('[create-quote] session error:', sessionError);
      return jsonResponse(500, { success: false, error: 'Unable to verify session.' });
    }

    const sessionUserId = sessionData.session?.user?.id;
    if (import.meta.env?.DEV) {
      console.debug('[create-quote] 📊 session lookup details:', {
        hasSession: Boolean(sessionUserId),
        userEmail: sessionData.session?.user?.email,
        userId: sessionUserId,
        accessTokenPrefix: sessionData.session?.access_token?.substring(0, 20) || 'none',
        expiresAt: sessionData.session?.expires_at,
        hasSessionError: Boolean(sessionError),
        timestamp: new Date().toISOString()
      });
    }
    if (!sessionUserId) {
      return jsonResponse(401, { success: false, error: 'Please log in before submitting a quote.' });
    }

    const sessionEmail = sessionData.session?.user?.email?.trim() ?? '';
    const email = emailFromForm || sessionEmail;
    if (!email) {
      return jsonResponse(400, { success: false, error: 'Missing email address.' });
    }

    const contactName = name && name.length > 0 ? name : email.split('@')[0] || 'Customer';
    const normalizedCompany =
      companyRaw && companyRaw.length > 0 ? companyRaw : contactName || 'Individual';

    const supabase = supabaseAdmin ?? requestScopedClient;
    const normalizedMaterial = normalizeMaterial(materialRaw);

    const profilePayload: Record<string, unknown> = {
      id: sessionUserId,
      email,
      role: 'customer'
    };
    profilePayload.contact_name = contactName;
    profilePayload.company_name = normalizedCompany;
    profilePayload.phone_number = phone ?? '';
    if (country) {
      profilePayload.shipping_address = country;
    }

    const { error: profileError } = await supabase
      .from('profiles')
      .upsert(profilePayload, { onConflict: 'id' });
    if (profileError) {
      console.error('[create-quote] profile upsert failed:', profileError);
      return jsonResponse(500, { success: false, error: 'Unable to update profile information.' });
    }

    const uploads = await uploadFiles(supabase, fileEntries);

    const metadata = {
      source: 'web:create-quote',
      language,
      contact: {
        email,
        name: contactName,
        company: normalizedCompany,
        phone,
        country
      },
      product: {
        material: materialRaw,
        normalizedMaterial,
        quantity: quantityValue,
        notes
      },
      files: uploads.map((file) => ({
        name: file.originalName,
        path: file.path,
        size: file.size
      })),
      submittedAt: new Date().toISOString()
    };
    if (import.meta.env?.DEV) {
      console.debug('[create-quote] submission metadata', metadata);
    }

    const { data: quote, error } = await supabase
      .from('quotes')
      .insert({
        user_id: sessionUserId,
        status: 'new',
        material: normalizedMaterial,
        quantity: quantityValue,
        customer_notes: notes || null,
        cad_file_path: uploads[0]?.path ?? null,
        currency: 'USD',
        total_amount: null,
        stripe_payment_intent_id: null
      })
      .select()
      .single();

    if (error || !quote) {
      throw new Error(error?.message || 'Unable to create quote.');
    }

    if (uploads.length) {
      try {
        const filePayload = uploads.map((file) => ({
          quote_id: quote.id,
          original_filename: file.originalName,
          file_path: file.path,
          file_size: file.size,
          file_type: file.type,
          ai_analyzed: false
        }));

        const { error: fileError } = await supabase.from('quote_files').insert(filePayload);
        if (fileError) {
          throw fileError;
        }
      } catch (fileInsertError: any) {
        console.warn('quote_files insert skipped:', fileInsertError?.message ?? fileInsertError);
      }
    }

    return jsonResponse(200, {
      success: true,
      data: {
        id: quote.id,
        token: quote.id
      }
    });
  } catch (error: any) {
    console.error('Create quote failed:', error);
    return jsonResponse(500, {
      success: false,
      error: error?.message || 'Failed to submit quote.'
    });
  }
};
import { randomUUID } from 'node:crypto';
