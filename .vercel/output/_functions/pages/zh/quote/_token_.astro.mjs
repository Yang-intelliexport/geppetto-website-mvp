/* empty css                                       */
import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../../../chunks/astro/server_Np7zNMWM.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../../chunks/BaseLayout_3sUPClHz.mjs';
import { M as MessageThread } from '../../../chunks/MessageThread_Co71UxOu.mjs';
import { b as getQuoteDetails, g as getCurrentSession } from '../../../chunks/supabase_cGWeccMZ.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://geppetto.studio");
const $$token = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$token;
  const { token } = Astro2.params;
  if (!token) {
    return Astro2.redirect("/zh");
  }
  let quote = null;
  let errorMessage = "";
  try {
    quote = await getQuoteDetails(token);
  } catch (error) {
    console.error("\u83B7\u53D6\u62A5\u4EF7\u8BE6\u60C5\u5931\u8D25:", error);
    errorMessage = "\u65E0\u6CD5\u83B7\u53D6\u62A5\u4EF7\u4FE1\u606F\uFF0C\u8BF7\u68C0\u67E5\u94FE\u63A5\u662F\u5426\u6B63\u786E\u6216\u8054\u7CFB\u5BA2\u670D\u3002";
  }
  const session = await getCurrentSession();
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": quote ? `\u62A5\u4EF7\u8BE6\u60C5 - ${quote.product_name} | Geppetto CNC Manufacturing` : "\u62A5\u4EF7\u8BE6\u60C5 - Geppetto CNC Manufacturing", "description": quote ? `\u67E5\u770B\u60A8\u7684${quote.product_name}CNC\u52A0\u5DE5\u62A5\u4EF7\u8BE6\u60C5\u3001\u751F\u4EA7\u8FDB\u5EA6\u548C\u6C9F\u901A\u8BB0\u5F55` : "\u67E5\u770B\u60A8\u7684CNC\u52A0\u5DE5\u62A5\u4EF7\u8BE6\u60C5\u548C\u8FDB\u5EA6", "currentLang": "zh" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gray-50 py-8"> <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"> ${errorMessage && renderTemplate`<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6"> <div class="flex items-center"> <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path> </svg> <span>${errorMessage}</span> </div> <div class="mt-4"> <a href="/zh/contact" class="text-red-700 hover:text-red-900 underline font-medium">
联系客服获取帮助 →
</a> </div> </div>`} ${quote && renderTemplate`<div class="space-y-8"> <!-- 报价状态头部 --> <div class="bg-white rounded-xl shadow-lg p-8"> <div class="flex items-center justify-between mb-6"> <div> <h1 class="text-3xl font-bold text-gray-900 mb-2">${quote.product_name}</h1> <p class="text-gray-600">报价编号: #${quote.token}</p> </div> <div class="text-right"> <div${addAttribute(`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${quote.status === "quoted" ? "bg-green-100 text-green-800" : quote.status === "processing" ? "bg-blue-100 text-blue-800" : quote.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"}`, "class")}> ${quote.status === "quoted" ? "\u5DF2\u62A5\u4EF7" : quote.status === "processing" ? "\u5904\u7406\u4E2D" : quote.status === "pending" ? "\u5F85\u5904\u7406" : quote.status} </div> ${quote.total_price && renderTemplate`<div class="mt-2 text-2xl font-bold text-green-600">
¥${quote.total_price.toLocaleString()} </div>`} </div> </div> <!-- 报价详情网格 --> <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6"> <div> <h3 class="text-sm font-medium text-gray-500 mb-2">联系信息</h3> <p class="font-medium">${quote.contact_name}</p> <p class="text-gray-600">${quote.email}</p> ${quote.phone && renderTemplate`<p class="text-gray-600">${quote.phone}</p>`} </div> <div> <h3 class="text-sm font-medium text-gray-500 mb-2">产品规格</h3> <p><span class="font-medium">材料:</span> ${quote.material}</p> <p><span class="font-medium">数量:</span> ${quote.quantity} 件</p> ${quote.surface_finish && renderTemplate`<p><span class="font-medium">表面处理:</span> ${quote.surface_finish}</p>`} </div> <div> <h3 class="text-sm font-medium text-gray-500 mb-2">交付信息</h3> <p class="text-gray-600">创建时间: ${new Date(quote.created_at).toLocaleDateString("zh-CN")}</p> ${quote.delivery_time_days && renderTemplate`<p><span class="font-medium">交付周期:</span> ${quote.delivery_time_days} 天</p>`} </div> </div> ${quote.special_requirements && renderTemplate`<div class="mt-6 pt-6 border-t border-gray-200"> <h3 class="text-sm font-medium text-gray-500 mb-2">特殊要求</h3> <p class="text-gray-700">${quote.special_requirements}</p> </div>`} </div> <!-- 报价明细（如果有） --> ${quote.quote_breakdown_items && quote.quote_breakdown_items.length > 0 && renderTemplate`<div class="bg-white rounded-xl shadow-lg p-8"> <h2 class="text-xl font-bold text-gray-900 mb-6">报价明细</h2> <div class="space-y-4"> ${quote.quote_breakdown_items.map((item) => renderTemplate`<div class="flex justify-between items-center py-3 border-b border-gray-100"> <div> <p class="font-medium">${item.description}</p> ${item.notes && renderTemplate`<p class="text-sm text-gray-600">${item.notes}</p>`} </div> <div class="text-right"> <p class="font-bold">¥${item.amount.toLocaleString()}</p> </div> </div>`)} </div> </div>`} <!-- 沟通记录 --> ${quote.quote_messages && renderTemplate`<div class="bg-white rounded-xl shadow-lg p-8"> <h2 class="text-xl font-bold text-gray-900 mb-6">沟通记录</h2> ${renderComponent($$result2, "MessageThread", MessageThread, { "client:load": true, "quoteId": quote.id, "initialMessages": quote.quote_messages, "userId": session?.user?.id, "userName": quote.contact_name, "currentLang": "zh", "client:component-hydration": "load", "client:component-path": "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/components/MessageThread.tsx", "client:component-export": "default" })} </div>`} <!-- 操作按钮 --> ${quote.status === "quoted" && quote.total_price && renderTemplate`<div class="bg-white rounded-xl shadow-lg p-8"> <div class="flex flex-col sm:flex-row gap-4 justify-center"> <a${addAttribute(`/zh/payment?quote=${quote.id}`, "href")} class="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200"> <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path> </svg>
立即支付订单
</a> <a href="/zh/contact" class="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"> <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path> </svg>
联系客服
</a> </div> </div>`} </div>`} </div> </div> ` })}`;
}, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/zh/quote/[token].astro", void 0);

const $$file = "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/zh/quote/[token].astro";
const $$url = "/zh/quote/[token]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$token,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
