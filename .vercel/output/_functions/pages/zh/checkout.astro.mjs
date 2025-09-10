/* empty css                                    */
import { c as createComponent, r as renderComponent, a as renderTemplate } from '../../chunks/astro/server_Np7zNMWM.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_3sUPClHz.mjs';
import { $ as $$CheckoutForm } from '../../chunks/CheckoutForm_CVGXpII_.mjs';
export { renderers } from '../../renderers.mjs';

const $$Checkout = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "\u786E\u8BA4\u8BA2\u5355 - \u9009\u62E9\u7269\u6D41\u548C\u652F\u4ED8\u65B9\u5F0F | Geppetto\u667A\u80FD\u5236\u9020", "description": "\u786E\u8BA4\u60A8\u7684CNC\u52A0\u5DE5\u8BA2\u5355\uFF0C\u9009\u62E9\u7269\u6D41\u65B9\u5F0F\uFF08\u7279\u5FEB\u7A7A\u8FD0\u3001\u6807\u51C6\u5FEB\u9012\u3001\u7ECF\u6D4E\u6D77\u8FD0\uFF09\u548C\u652F\u4ED8\u65B9\u5F0F\u3002\u900F\u660E\u5B9A\u4EF7\uFF0C\u5B89\u5168\u652F\u4ED8\u3002", "keywords": [
    "\u8BA2\u5355\u786E\u8BA4",
    "CNC\u5236\u9020\u8BA2\u5355",
    "\u7269\u6D41\u9009\u62E9",
    "\u652F\u4ED8\u65B9\u5F0F\u9009\u62E9",
    "\u7279\u5FEB\u7A7A\u8FD0",
    "\u6807\u51C6\u5FEB\u9012",
    "\u7ECF\u6D4E\u6D77\u8FD0",
    "\u5236\u9020\u8BA2\u5355\u652F\u4ED8",
    "\u94F6\u884C\u8F6C\u8D26",
    "PayPal\u652F\u4ED8",
    "\u56FD\u9645\u7535\u6C47",
    "\u5206\u671F\u4ED8\u6B3E"
  ], "ogImage": "/images/og-checkout-zh.jpg", "structuredData": {
    type: "webpage",
    data: {
      "@type": "CheckoutPage",
      "name": "\u8BA2\u5355\u786E\u8BA4\u9875\u9762",
      "description": "\u786E\u8BA4CNC\u5236\u9020\u8BA2\u5355\uFF0C\u9009\u62E9\u7269\u6D41\u548C\u652F\u4ED8\u65B9\u5F0F",
      "provider": {
        "@type": "Organization",
        "name": "Geppetto\u667A\u80FD\u5236\u9020"
      }
    }
  } }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CheckoutForm", $$CheckoutForm, { "language": "zh" })} ` })}`;
}, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/zh/checkout.astro", void 0);

const $$file = "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/zh/checkout.astro";
const $$url = "/zh/checkout";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Checkout,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
