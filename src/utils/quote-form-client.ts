type SubmissionContext = {
  files: File[];
  language: 'zh' | 'en';
  contactData: Record<string, any>;
  productData: Record<string, any>;
};

type QuoteSubmissionResponse = {
  success: boolean;
  data?: {
    id: string;
    token: string;
  };
  error?: string;
};

const appendOptional = (formData: FormData, key: string, value?: string | number | null) => {
  if (value === undefined || value === null || value === '') {
    return;
  }
  formData.append(key, typeof value === 'number' ? value.toString() : value);
};

export async function submitQuoteForm({ files, language, contactData, productData }: SubmissionContext) {
  const formData = new FormData();
  formData.append('language', language);
  formData.append('email', (contactData.email ?? '').toString());

  appendOptional(formData, 'name', contactData.name);
  appendOptional(formData, 'company', contactData.company);
  appendOptional(formData, 'phone', contactData.phone);
  appendOptional(formData, 'country', contactData.country);

  formData.append('material', (productData.material ?? '').toString());
  appendOptional(formData, 'quantity', Number(productData.quantity) || 1);
  appendOptional(formData, 'notes', productData.notes || productData.requirements);

  files.forEach((file, index) => {
    formData.append(`file${index}`, file);
  });

  console.debug('🚀 [submitQuoteForm] Submitting to API:', {
    fileCount: files.length,
    email: contactData.email,
    material: productData.material,
    timestamp: new Date().toISOString()
  });

  const response = await fetch('/api/functions/create-quote', {
    method: 'POST',
    body: formData
  });

  const result = (await response.json().catch(() => null)) as QuoteSubmissionResponse | null;

  console.debug('📨 [submitQuoteForm] API Response:', {
    status: response.status,
    ok: response.ok,
    success: result?.success,
    hasData: !!result?.data,
    error: result?.error,
    timestamp: new Date().toISOString()
  });

  if (!response.ok || !result?.success || !result.data) {
    const errorMsg = result?.error || 'Quote submission failed.';
    console.error('❌ [submitQuoteForm] Submission failed:', errorMsg);
    throw new Error(errorMsg);
  }

  console.debug('✅ [submitQuoteForm] Submission successful:', result.data);
  return result.data;
}
