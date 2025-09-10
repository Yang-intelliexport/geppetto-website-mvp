/* empty css                                          */
import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../../../chunks/astro/server_Np7zNMWM.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../../../chunks/BaseLayout_3sUPClHz.mjs';
import { C as CheckoutOrderPayment } from '../../../../chunks/CheckoutOrderPayment_BCmSJ616.mjs';
export { renderers } from '../../../../renderers.mjs';

const $$Astro = createAstro("https://geppetto.studio");
const $$Payment = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Payment;
  const { id } = Astro2.params;
  if (!id) {
    return new Response("Invalid order ID", { status: 400 });
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Order Payment - Secure Payment Processing | Geppetto Smart Manufacturing", "description": "Secure payment processing for your CNC manufacturing order. Multiple payment methods supported with industry-standard security protection." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gray-50 py-12"> <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"> <!-- Header --> <div class="text-center mb-12"> <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4"> <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20"> <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path> <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd"></path> </svg> </div> <h1 class="text-4xl font-bold text-gray-900 mb-4">💳 Order Payment</h1> <p class="text-xl text-gray-600 max-w-2xl mx-auto">
Your quote has been confirmed. Please complete payment to start the production process
</p> </div> <!-- Order Payment Component --> ${renderComponent($$result2, "CheckoutOrderPayment", CheckoutOrderPayment, { "client:load": true, "orderId": id, "language": "en", "client:component-hydration": "load", "client:component-path": "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/components/order/CheckoutOrderPayment.tsx", "client:component-export": "default" })} <!-- Security Notice --> <div class="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-8"> <div class="flex items-start"> <div class="flex-shrink-0"> <svg class="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path> </svg> </div> <div class="ml-4"> <h3 class="text-lg font-semibold text-blue-900 mb-2">🔒 Security Guarantee</h3> <div class="text-blue-800 space-y-2 text-sm"> <p>• SSL encryption technology protects your payment information</p> <p>• Multiple secure payment methods: Credit Card, PayPal, Stripe</p> <p>• Production begins immediately after payment completion</p> <p>• For assistance, contact support: <a href="mailto:hello@geppetto.studio" class="font-medium underline">hello@geppetto.studio</a></p> </div> </div> </div> </div> </div> </div> ` })}`;
}, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/en/order/[id]/payment.astro", void 0);

const $$file = "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/en/order/[id]/payment.astro";
const $$url = "/en/order/[id]/payment";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Payment,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
