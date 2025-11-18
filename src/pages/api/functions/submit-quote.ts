import type { APIRoute } from 'astro';
import { createClient } from '../../../lib/supabase/server';
import { supabaseAdmin } from '../../../lib/supabase';

export const POST: APIRoute = async (context) => {
  const contentType = context.request.headers.get('content-type') || '';
  if (!contentType.includes('multipart/form-data')) {
    return new Response(
      JSON.stringify({ success: false, error: 'Invalid content type.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const formData = await context.request.formData();
  const email = formData.get('email')?.toString().trim();
  const material = formData.get('material')?.toString().trim();
  const surfaceFinish = formData.get('surfaceFinish')?.toString().trim() || null;
  const language = (formData.get('language')?.toString() || 'zh') as 'zh' | 'en';
  const quantityValue = Number(formData.get('quantity'));
  const fileEntry = Array.from(formData.entries()).find(([key]) => key.startsWith('file'))?.[1];
  const file = fileEntry instanceof File && fileEntry.size > 0 ? fileEntry : null;

  if (!email || !material || Number.isNaN(quantityValue) || quantityValue <= 0) {
    return new Response(
      JSON.stringify({ success: false, error: 'Missing required fields.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const supabase = supabaseAdmin ?? createClient(context);

  let uploadedPath: string | null = null;

  if (file) {
    try {
      const extension = file.name.split('.').pop() || 'step';
      const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;
      const storagePath = `public/simple-form/${safeName}`;
      const fileBuffer = new Uint8Array(await file.arrayBuffer());

      const { error: uploadError } = await supabase.storage
        .from('cad-files')
        .upload(storagePath, fileBuffer, {
          contentType: file.type || 'application/octet-stream',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      uploadedPath = storagePath;
    } catch (error: any) {
      console.error('File upload failed:', error);
      return new Response(
        JSON.stringify({ success: false, error: error?.message || 'File upload failed.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

  const insertPayload = {
    customer_email: email,
    material,
    quantity: quantityValue,
    surface_finish: surfaceFinish,
    language,
    status: 'pending',
    source: 'simple-form',
    original_file_url: uploadedPath,
    file_size: file?.size ?? null
  };

  const { error: insertError } = await supabase
    .from('mvp_quotes')
    .insert(insertPayload);

  if (insertError) {
    console.error('Failed to insert quote:', insertError);
    return new Response(
      JSON.stringify({ success: false, error: insertError.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify({ success: true }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};
