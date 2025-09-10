/* empty css                                       */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../../chunks/astro/server_Np7zNMWM.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../../chunks/BaseLayout_3sUPClHz.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Success = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Payment Successful - Your Order is Confirmed | Geppetto Smart Manufacturing", "description": "Payment successful! Your CNC manufacturing order has been confirmed and we will begin production immediately. Thank you for choosing Geppetto Smart Manufacturing." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12"> <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"> <!-- Success Header --> <div class="text-center mb-12"> <div class="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6"> <svg class="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path> </svg> </div> <h1 class="text-4xl font-bold text-gray-900 mb-4">🎉 Payment Successful!</h1> <p class="text-xl text-gray-600 max-w-2xl mx-auto">
Thank you! Your payment has been successfully processed and we are now processing your order.
</p> </div> <!-- Success Content --> <div class="bg-white rounded-lg shadow-lg p-8"> <div class="grid grid-cols-1 md:grid-cols-2 gap-8"> <!-- Left: Success Info --> <div class="space-y-6"> <div class="border-l-4 border-green-500 pl-6"> <h2 class="text-2xl font-semibold text-gray-900 mb-3">✅ Order Status</h2> <div class="space-y-2 text-gray-600"> <p>• Payment successfully processed</p> <p>• Order added to production queue</p> <p>• Confirmation email sent to your inbox</p> <p>• You can track order progress anytime</p> </div> </div> <div class="bg-blue-50 border border-blue-200 rounded-lg p-4"> <h3 class="text-lg font-semibold text-blue-900 mb-2">📧 What happens next?</h3> <div class="text-blue-800 text-sm space-y-1"> <p>1. Our engineers will review your design files</p> <p>2. Production team will begin manufacturing your parts</p> <p>3. Quality control ensures product meets standards</p> <p>4. Shipping arranged with tracking information provided</p> </div> </div> </div> <!-- Right: Actions --> <div class="space-y-6"> <div class="border border-gray-200 rounded-lg p-6"> <h3 class="text-xl font-semibold text-gray-900 mb-4">📋 Manage Your Orders</h3> <div class="space-y-4"> <a href="/en/track-order" class="flex items-center justify-between w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-colors"> <span>View My Orders</span> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path> </svg> </a> <a href="/en/quote" class="flex items-center justify-between w-full border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"> <span>Submit New Quote Request</span> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path> </svg> </a> </div> </div> <!-- Support Info --> <div class="bg-gray-50 border border-gray-200 rounded-lg p-4"> <h4 class="font-semibold text-gray-900 mb-2">🤝 Need Help?</h4> <div class="text-gray-600 text-sm space-y-1"> <p>If you have any questions, please contact us:</p> <p>📧 Email: <a href="mailto:hello@geppetto.studio" class="text-purple-600 hover:underline">hello@geppetto.studio</a></p> <p>💬 Live Chat: Available on our website</p> <p>⏰ Business Hours: Mon-Fri 9:00AM-6:00PM PST</p> </div> </div> </div> </div> <!-- Important Notice --> <div class="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4"> <div class="flex items-start"> <svg class="w-5 h-5 text-yellow-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path> </svg> <div> <h4 class="text-yellow-800 font-semibold mb-1">Important Notice</h4> <p class="text-yellow-700 text-sm">
This page is for your convenience only. The official order status will be automatically updated 
                when our server receives confirmation from Stripe. Please keep your payment confirmation email 
                as proof of transaction.
</p> </div> </div> </div> </div> </div> </div> ` })}`;
}, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/en/payment/success.astro", void 0);

const $$file = "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/en/payment/success.astro";
const $$url = "/en/payment/success";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Success,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
