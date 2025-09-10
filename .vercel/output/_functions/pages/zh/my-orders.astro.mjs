/* empty css                                    */
import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_Np7zNMWM.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_3sUPClHz.mjs';
import { h as handleAuthCallback, M as MyOrdersList } from '../../chunks/MyOrdersList_DfsQKOvg.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://geppetto.studio");
const $$MyOrders = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MyOrders;
  const urlParams = new URLSearchParams(Astro2.url.searchParams);
  const authResult = await handleAuthCallback(urlParams);
  const emailFromUrl = urlParams.get("email") || "";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "\u6211\u7684\u8BA2\u5355 - Geppetto CNC Manufacturing", "description": "\u67E5\u770B\u60A8\u7684CNC\u52A0\u5DE5\u8BA2\u5355\u72B6\u6001\u3001\u8FDB\u5EA6\u548C\u8BE6\u7EC6\u4FE1\u606F", "currentLang": "zh" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gray-50 py-8"> <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"> <!-- 页面标题 --> <div class="mb-8 text-center"> <h1 class="text-4xl font-bold text-gray-900 mb-4">我的订单</h1> <p class="text-xl text-gray-600 max-w-2xl mx-auto">
查看您的CNC加工订单状态、生产进度和交付信息
</p> </div> <!-- 认证成功提示 --> ${authResult?.success && renderTemplate`<div class="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg"> <div class="flex items-center"> <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> <span>登录成功！正在加载您的订单...</span> </div> </div>`} <!-- 认证错误提示 --> ${authResult?.error && renderTemplate`<div class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg"> <div class="flex items-center"> <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path> </svg> <span>登录失败：${authResult.error}</span> </div> </div>`} <!-- 订单列表组件 --> ${renderComponent($$result2, "MyOrdersList", MyOrdersList, { "client:load": true, "initialEmail": emailFromUrl, "authResult": authResult ? JSON.stringify(authResult) : null, "currentLang": "zh", "client:component-hydration": "load", "client:component-path": "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/components/MyOrdersList.tsx", "client:component-export": "default" })} <!-- 帮助信息 --> <div class="mt-12 bg-blue-50 rounded-xl p-6"> <h3 class="text-lg font-semibold text-blue-900 mb-4">需要帮助？</h3> <div class="grid md:grid-cols-2 gap-4 text-sm text-blue-800"> <div> <h4 class="font-medium mb-2">找不到您的订单？</h4> <p>请确保使用提交报价时的邮箱地址登录，或联系我们的客服团队。</p> </div> <div> <h4 class="font-medium mb-2">订单状态说明</h4> <ul class="space-y-1"> <li>• <span class="font-medium">报价中</span> - 我们正在为您准备详细报价</li> <li>• <span class="font-medium">生产中</span> - 您的订单正在CNC加工</li> <li>• <span class="font-medium">已发货</span> - 订单已发出，请查看物流信息</li> </ul> </div> </div> <div class="mt-4 pt-4 border-t border-blue-200"> <a href="/zh/contact" class="inline-flex items-center text-blue-700 hover:text-blue-900 font-medium"> <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path> </svg>
联系客服团队
</a> </div> </div> </div> </div> ` })}`;
}, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/zh/my-orders.astro", void 0);

const $$file = "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/zh/my-orders.astro";
const $$url = "/zh/my-orders";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$MyOrders,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
