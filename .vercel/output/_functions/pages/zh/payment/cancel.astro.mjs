/* empty css                                       */
import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../../../chunks/astro/server_Np7zNMWM.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../../chunks/BaseLayout_3sUPClHz.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://geppetto.studio");
const $$Cancel = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Cancel;
  const url = new URL(Astro2.request.url);
  const quoteId = url.searchParams.get("quote_id") || url.searchParams.get("session_id");
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "\u652F\u4ED8\u53D6\u6D88 - \u60A8\u7684\u8BA2\u5355\u4ECD\u5728\u7B49\u5F85\u652F\u4ED8 | Geppetto\u667A\u80FD\u5236\u9020", "description": "\u652F\u4ED8\u5DF2\u53D6\u6D88\u3002\u60A8\u7684\u8BA2\u5355\u4ECD\u7136\u6709\u6548\uFF0C\u60A8\u53EF\u4EE5\u968F\u65F6\u91CD\u65B0\u8FDB\u884C\u652F\u4ED8\u6216\u8054\u7CFB\u6211\u4EEC\u7684\u5BA2\u670D\u56E2\u961F\u3002" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gray-50 py-12"> <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"> <!-- Cancel Header --> <div class="text-center mb-12"> <div class="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-6"> <svg class="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> </div> <h1 class="text-4xl font-bold text-gray-900 mb-4">⏸️ 支付已取消</h1> <p class="text-xl text-gray-600 max-w-2xl mx-auto">
没问题！您的订单仍然有效，您可以随时继续完成支付。
</p> </div> <!-- Cancel Content --> <div class="bg-white rounded-lg shadow-lg p-8"> <div class="grid grid-cols-1 md:grid-cols-2 gap-8"> <!-- Left: Status Info --> <div class="space-y-6"> <div class="border-l-4 border-orange-500 pl-6"> <h2 class="text-2xl font-semibold text-gray-900 mb-3">📋 当前状态</h2> <div class="space-y-2 text-gray-600"> <p>• 支付流程已取消</p> <p>• 您的订单信息已保存</p> <p>• 没有产生任何费用</p> <p>• 您可以随时重新支付</p> </div> </div> <div class="bg-blue-50 border border-blue-200 rounded-lg p-4"> <h3 class="text-lg font-semibold text-blue-900 mb-2">💡 为什么选择我们？</h3> <div class="text-blue-800 text-sm space-y-1"> <p>• 高精度CNC加工，误差控制在±0.05mm</p> <p>• 快速交付，标准件3-7个工作日</p> <p>• 材料丰富，支持铝合金、不锈钢等</p> <p>• 专业工程师1对1服务支持</p> </div> </div> <div class="bg-gray-50 border border-gray-200 rounded-lg p-4"> <h4 class="font-semibold text-gray-900 mb-2">🤔 遇到问题了吗？</h4> <div class="text-gray-600 text-sm space-y-1"> <p>如果您在支付过程中遇到了技术问题：</p> <p>📧 邮箱: <a href="mailto:hello@geppetto.studio" class="text-purple-600 hover:underline">hello@geppetto.studio</a></p> <p>📱 微信: GeppettoStudio</p> <p>⏰ 工作时间: 周一至周五 9:00-18:00</p> </div> </div> </div> <!-- Right: Actions --> <div class="space-y-6"> <div class="border border-gray-200 rounded-lg p-6"> <h3 class="text-xl font-semibold text-gray-900 mb-4">🚀 继续您的订单</h3> <div class="space-y-4"> ${quoteId && renderTemplate`<a${addAttribute(`/zh/order/${quoteId}/payment`, "href")} class="flex items-center justify-between w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-colors"> <span>重新支付此订单</span> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path> </svg> </a>`} <a href="/zh/track-order" class="flex items-center justify-between w-full border border-purple-300 text-purple-700 font-medium py-3 px-4 rounded-lg hover:bg-purple-50 transition-colors"> <span>查看我的所有订单</span> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path> </svg> </a> <a href="/zh/quote" class="flex items-center justify-between w-full border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"> <span>提交新的报价请求</span> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path> </svg> </a> </div> </div> <!-- Alternative Payment Methods --> <div class="bg-green-50 border border-green-200 rounded-lg p-4"> <h4 class="font-semibold text-green-900 mb-2">💳 支付方式</h4> <div class="text-green-800 text-sm space-y-1"> <p>我们支持多种安全的支付方式：</p> <div class="flex flex-wrap gap-2 mt-2"> <span class="bg-white border border-green-200 px-2 py-1 rounded text-xs">信用卡</span> <span class="bg-white border border-green-200 px-2 py-1 rounded text-xs">PayPal</span> <span class="bg-white border border-green-200 px-2 py-1 rounded text-xs">微信支付</span> <span class="bg-white border border-green-200 px-2 py-1 rounded text-xs">支付宝</span> </div> </div> </div> </div> </div> <!-- Reassurance Message --> <div class="mt-8 bg-purple-50 border border-purple-200 rounded-lg p-4"> <div class="flex items-start"> <svg class="w-5 h-5 text-purple-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path> </svg> <div> <h4 class="text-purple-800 font-semibold mb-1">放心支付</h4> <p class="text-purple-700 text-sm">
我们使用Stripe等国际知名支付平台，采用银行级别的安全加密技术保护您的支付信息。
                您的订单将保留30天，期间您可以随时完成支付。
</p> </div> </div> </div> </div> </div> </div> ` })}`;
}, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/zh/payment/cancel.astro", void 0);

const $$file = "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/zh/payment/cancel.astro";
const $$url = "/zh/payment/cancel";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Cancel,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
