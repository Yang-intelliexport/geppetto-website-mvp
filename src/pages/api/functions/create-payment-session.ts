import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { supabaseAdmin } from '../../../lib/supabase';

const stripeSecret = import.meta.env.STRIPE_SECRET_KEY;
const stripe =
  stripeSecret && typeof stripeSecret === 'string' ? new Stripe(stripeSecret) : null;

export const POST: APIRoute = async (context) => {
  if (!stripe) {
    return new Response(JSON.stringify({ success: false, error: 'Stripe not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  if (!supabaseAdmin) {
    return new Response(JSON.stringify({ success: false, error: 'Supabase admin unavailable' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  let payload: any = null;
  try {
    payload = await context.request.json();
  } catch {
    return new Response(JSON.stringify({ success: false, error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const rawQuoteId = payload?.quoteId ?? payload?.quote_id;
  const locale = payload?.locale === 'zh' ? 'zh' : 'en';
  if (!rawQuoteId) {
    return new Response(JSON.stringify({ success: false, error: 'Missing quoteId' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const numericId = Number(rawQuoteId);
  const filterValue = Number.isNaN(numericId) ? String(rawQuoteId) : numericId;

  const { data: quote, error: quoteError } = await supabaseAdmin
    .from('quotes')
    .select('id,user_id,total_amount,currency,status')
    .eq('id', filterValue)
    .single();

  if (quoteError || !quote) {
    console.error('[create-payment-session] quote fetch failed', quoteError);
    return new Response(JSON.stringify({ success: false, error: 'Quote not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const amount = Number(quote.total_amount ?? 0);
  if (!amount || Number.isNaN(amount) || amount <= 0) {
    return new Response(
      JSON.stringify({ success: false, error: 'Quote does not have a payable amount' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  let customerEmail: string | undefined;
  if (quote.user_id) {
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('email')
      .eq('id', quote.user_id)
      .single();
    customerEmail = profile?.email ?? undefined;
  }

  try {
    const currency = (quote.currency ?? 'usd').toLowerCase();
    const successUrl = `${context.url.origin}/${locale}/order/${encodeURIComponent(quote.id)}/payment?status=success`;
    const cancelUrl = `${context.url.origin}/${locale}/order/${encodeURIComponent(quote.id)}/payment?status=cancel`;
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: customerEmail,
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: `Quote #${quote.id}`
            },
            unit_amount: Math.round(amount * 100)
          },
          quantity: 1
        }
      ],
      metadata: {
        quote_id: String(quote.id),
        user_id: quote.user_id ?? ''
      },
      success_url: successUrl,
      cancel_url: cancelUrl
    });

    return new Response(JSON.stringify({ success: true, url: session.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('[create-payment-session] stripe error', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error?.message || 'Unable to create payment session'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
