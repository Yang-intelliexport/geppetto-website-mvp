/* empty css                                       */
import { d as createAstro, c as createComponent, a as renderTemplate, ai as defineScriptVars, r as renderComponent, m as maybeRenderHead, e as addAttribute } from '../../../chunks/astro/server_Np7zNMWM.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../../chunks/BaseLayout_3sUPClHz.mjs';
import { M as MessageThread } from '../../../chunks/MessageThread_Co71UxOu.mjs';
import { b as getQuoteDetails, g as getCurrentSession } from '../../../chunks/supabase_cGWeccMZ.mjs';
export { renderers } from '../../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://geppetto.studio");
const $$token = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$token;
  const { token } = Astro2.params;
  if (!token) {
    return new Response("Invalid quote token", { status: 400 });
  }
  try {
    const quote2 = await getQuoteDetails(token);
    if (!quote2) {
      return new Response("Quote not found", { status: 404 });
    }
    const session2 = await getCurrentSession();
    let userCanAccess = false;
    let userName2 = "Guest";
    let userEmail = "";
    if (session2 && session2.user) {
      userCanAccess = session2.user.email === quote2.email;
      userName2 = quote2.contact_name;
      userEmail = session2.user.email;
    } else {
      userCanAccess = true;
      userName2 = quote2.contact_name;
      userEmail = quote2.email;
    }
    if (!userCanAccess) {
      return Astro2.redirect("/login?redirect=" + encodeURIComponent(Astro2.url.pathname));
    }
    const conversations2 = quote2.quote_messages || [];
    const statusMap = {
      "new": { label: "New", color: "bg-blue-100 text-blue-800" },
      "quoted": { label: "Quoted", color: "bg-green-100 text-green-800" },
      "paid": { label: "Paid", color: "bg-purple-100 text-purple-800" },
      "manufacturing": { label: "Manufacturing", color: "bg-indigo-100 text-indigo-800" },
      "shipping": { label: "Shipping", color: "bg-yellow-100 text-yellow-800" },
      "complete": { label: "Complete", color: "bg-green-100 text-green-800" },
      "cancelled": { label: "Cancelled", color: "bg-red-100 text-red-800" }
    };
    const statusInfo2 = statusMap[quote2.status] || statusMap["new"];
    const materialMap = {
      "aluminum": "Aluminum",
      "steel": "Carbon Steel",
      "stainless_steel": "Stainless Steel",
      "brass": "Brass",
      "titanium": "Titanium",
      "plastic": "Plastic",
      "other": "Other"
    };
    const materialDisplay2 = materialMap[quote2.material] || quote2.material;
  } catch (error) {
    console.error("Failed to fetch quote details:", error);
    return new Response("Internal server error", { status: 500 });
  }
  return renderTemplate(_a || (_a = __template(["", " <script>(function(){", "\n// V1.1 Payment functionality integration\nclass PaymentHandler {\n  constructor(quoteId) {\n    this.quoteId = quoteId;\n    this.initializePaymentButton();\n  }\n\n  initializePaymentButton() {\n    const paymentBtn = document.getElementById('payment-btn');\n    if (paymentBtn) {\n      paymentBtn.addEventListener('click', () => this.handlePayment());\n    }\n  }\n\n  async handlePayment() {\n    try {\n      const paymentBtn = document.getElementById('payment-btn');\n      if (paymentBtn) {\n        paymentBtn.disabled = true;\n        paymentBtn.textContent = 'Creating payment session...';\n      }\n\n      const { createPaymentSession } = await import('/src/utils/supabase.js');\n      \n      console.log('\u{1F4B3} Starting payment session creation (V1.1):', this.quoteId);\n      const paymentData = await createPaymentSession(this.quoteId);\n      \n      if (paymentData && paymentData.url) {\n        console.log('\u2705 Payment session created successfully, redirecting...');\n        window.location.href = paymentData.url;\n      } else {\n        throw new Error('Payment session creation failed: No payment URL returned');\n      }\n    } catch (error) {\n      console.error('\u274C Payment creation failed:', error);\n      \n      const paymentBtn = document.getElementById('payment-btn');\n      if (paymentBtn) {\n        paymentBtn.disabled = false;\n        paymentBtn.textContent = `Quick Pay`;\n      }\n      \n      alert('Payment creation failed: ' + error.message);\n    }\n  }\n}\n\n// Initialize payment handler\ndocument.addEventListener('DOMContentLoaded', function() {\n  if (document.getElementById('payment-btn')) {\n    window.paymentHandler = new PaymentHandler(quoteId);\n  }\n});\n})();<\/script>"], ["", " <script>(function(){", "\n// V1.1 Payment functionality integration\nclass PaymentHandler {\n  constructor(quoteId) {\n    this.quoteId = quoteId;\n    this.initializePaymentButton();\n  }\n\n  initializePaymentButton() {\n    const paymentBtn = document.getElementById('payment-btn');\n    if (paymentBtn) {\n      paymentBtn.addEventListener('click', () => this.handlePayment());\n    }\n  }\n\n  async handlePayment() {\n    try {\n      const paymentBtn = document.getElementById('payment-btn');\n      if (paymentBtn) {\n        paymentBtn.disabled = true;\n        paymentBtn.textContent = 'Creating payment session...';\n      }\n\n      const { createPaymentSession } = await import('/src/utils/supabase.js');\n      \n      console.log('\u{1F4B3} Starting payment session creation (V1.1):', this.quoteId);\n      const paymentData = await createPaymentSession(this.quoteId);\n      \n      if (paymentData && paymentData.url) {\n        console.log('\u2705 Payment session created successfully, redirecting...');\n        window.location.href = paymentData.url;\n      } else {\n        throw new Error('Payment session creation failed: No payment URL returned');\n      }\n    } catch (error) {\n      console.error('\u274C Payment creation failed:', error);\n      \n      const paymentBtn = document.getElementById('payment-btn');\n      if (paymentBtn) {\n        paymentBtn.disabled = false;\n        paymentBtn.textContent = \\`Quick Pay\\`;\n      }\n      \n      alert('Payment creation failed: ' + error.message);\n    }\n  }\n}\n\n// Initialize payment handler\ndocument.addEventListener('DOMContentLoaded', function() {\n  if (document.getElementById('payment-btn')) {\n    window.paymentHandler = new PaymentHandler(quoteId);\n  }\n});\n})();<\/script>"])), renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `Quote Details #${quote.token}` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gray-50 py-8"> <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"> <!-- Page Title --> <div class="mb-8"> <h1 class="text-3xl font-bold text-gray-900">
Quote Details #${quote.token} </h1> <p class="mt-2 text-gray-600">
Created: ${new Date(quote.created_at).toLocaleDateString("en-US")} </p> </div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8"> <!-- Left: Quote Information --> <div class="lg:col-span-2 space-y-6"> <!-- Status and Basic Information --> <div class="bg-white rounded-lg shadow-md p-6"> <div class="flex items-center justify-between mb-6"> <h2 class="text-xl font-semibold text-gray-900">Quote Status</h2> <span${addAttribute(`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`, "class")}> ${statusInfo.label} </span> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> <div> <label class="block text-sm font-medium text-gray-500">Product Name</label> <p class="mt-1 text-sm text-gray-900">${quote.product_name}</p> </div> <div> <label class="block text-sm font-medium text-gray-500">Material</label> <p class="mt-1 text-sm text-gray-900">${materialDisplay}</p> </div> <div> <label class="block text-sm font-medium text-gray-500">Quantity</label> <p class="mt-1 text-sm text-gray-900">${quote.quantity} pcs</p> </div> ${quote.delivery_time_days && renderTemplate`<div> <label class="block text-sm font-medium text-gray-500">Estimated Delivery</label> <p class="mt-1 text-sm text-gray-900">${quote.delivery_time_days} days</p> </div>`} </div> ${quote.special_requirements && renderTemplate`<div class="mt-4"> <label class="block text-sm font-medium text-gray-500">Special Requirements</label> <p class="mt-1 text-sm text-gray-900">${quote.special_requirements}</p> </div>`} </div> <!-- V1.1 Quote Breakdown Information --> ${(quote.total_amount || quote.quote_breakdown_items?.length > 0) && renderTemplate`<div class="bg-white rounded-lg shadow-md p-6"> <h2 class="text-xl font-semibold text-gray-900 mb-4">Quote Breakdown</h2> ${quote.quote_breakdown_items && quote.quote_breakdown_items.length > 0 ? renderTemplate`<div class="space-y-4"> <div class="overflow-x-auto"> <table class="w-full text-sm"> <thead> <tr class="border-b border-gray-200"> <th class="text-left py-2 font-semibold text-gray-900">Item</th> <th class="text-center py-2 font-semibold text-gray-900">Qty</th> <th class="text-right py-2 font-semibold text-gray-900">Unit Price</th> <th class="text-right py-2 font-semibold text-gray-900">Total</th> </tr> </thead> <tbody> ${quote.quote_breakdown_items.map((item, index) => renderTemplate`<tr${addAttribute(index, "key")} class="border-b border-gray-100"> <td class="py-2">${item.item_name}</td> <td class="py-2 text-center">${item.quantity}</td> <td class="py-2 text-right">¥${item.unit_price.toFixed(2)}</td> <td class="py-2 text-right font-semibold">¥${item.total_price.toFixed(2)}</td> </tr>`)} </tbody> </table> </div> </div>` : quote.total_amount && renderTemplate`<div class="p-4 bg-gray-50 rounded-md"> <p class="text-sm text-gray-600">Quote total has been calculated. Contact us for detailed breakdown.</p> </div>`} ${quote.status === "quoted" && quote.total_amount && renderTemplate`<div class="mt-6 space-y-3"> <button id="payment-btn" class="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold py-3 px-6 rounded-md hover:from-purple-700 hover:to-blue-600 transition-colors disabled:opacity-50">
Quick Pay ¥${quote.total_amount.toFixed(2)} </button> <a${addAttribute(`/en/order/${quote.id}/payment`, "href")} class="block w-full text-center bg-white border border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-md hover:bg-gray-50 transition-colors">
View Detailed Payment Page
</a> <a${addAttribute(`/zh/order/${quote.id}/payment`, "href")} class="block w-full text-center bg-gray-100 border border-gray-300 text-gray-600 font-medium py-2 px-6 rounded-md hover:bg-gray-200 transition-colors text-sm">
Chinese Payment Page
</a> </div>`} </div>`} </div> <!-- Right: Communication Thread --> <div class="lg:col-span-1"> <div class="bg-white rounded-lg shadow-md p-6"> <h2 class="text-xl font-semibold text-gray-900 mb-4">Communication</h2> ${session?.user ? renderTemplate`${renderComponent($$result2, "MessageThread", MessageThread, { "client:load": true, "quoteId": quote.id, "initialMessages": conversations, "userId": session?.user?.id, "userName": userName, "currentLang": "en", "client:component-hydration": "load", "client:component-path": "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/components/MessageThread.tsx", "client:component-export": "default" })}` : renderTemplate`<div class="text-center py-8"> <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path> </svg> <p class="text-gray-600 text-sm mb-4">Login to communicate with our team</p> <a href="/login" class="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
Login
</a> </div>`} </div> </div> </div> </div> </div> ` }), defineScriptVars({ quoteId: quote.id }));
}, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/en/quote/[token].astro", void 0);

const $$file = "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/en/quote/[token].astro";
const $$url = "/en/quote/[token]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$token,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
