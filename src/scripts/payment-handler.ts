import { createPaymentSession } from '../utils/supabase.js';

type PaymentConfig = {
  buttonId: string;
  quoteId: string;
  creatingText: string;
  failureAlert: string;
  defaultLabel?: string;
  locale?: 'zh' | 'en';
};

async function handlePayment(button: HTMLButtonElement, config: PaymentConfig) {
  const originalLabel = config.defaultLabel || button.dataset.defaultLabel || button.textContent || '';
  try {
    button.disabled = true;
    button.textContent = config.creatingText;
    const paymentData = await createPaymentSession(config.quoteId, { locale: config.locale });
    if (paymentData?.url) {
      window.location.href = paymentData.url;
      return;
    }
    throw new Error('No payment URL returned');
  } catch (error: any) {
    console.error('Payment creation failed:', error);
    alert(config.failureAlert + (error?.message ?? ''));
    button.disabled = false;
    button.textContent = originalLabel;
  }
}

export function setupPaymentButton(config: PaymentConfig) {
  const bind = () => {
    const button = document.getElementById(config.buttonId) as HTMLButtonElement | null;
    if (!button || button.dataset.paymentHandlerAttached === 'true') {
      return;
    }
    button.dataset.paymentHandlerAttached = 'true';
    if (!button.dataset.defaultLabel) {
      button.dataset.defaultLabel = button.textContent || '';
    }
    button.addEventListener('click', () => handlePayment(button, config));
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind, { once: true });
  } else {
    bind();
  }
}
