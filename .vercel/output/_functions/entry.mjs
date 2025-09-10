import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CVEHp1CO.mjs';
import { manifest } from './manifest_CpQ1ZuUV.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/email-management.astro.mjs');
const _page2 = () => import('./pages/admin/login.astro.mjs');
const _page3 = () => import('./pages/admin/mvp-quotes.astro.mjs');
const _page4 = () => import('./pages/admin/quote-review.astro.mjs');
const _page5 = () => import('./pages/admin.astro.mjs');
const _page6 = () => import('./pages/api/email/process-queue.astro.mjs');
const _page7 = () => import('./pages/api/functions/track-order.astro.mjs');
const _page8 = () => import('./pages/api/health.astro.mjs');
const _page9 = () => import('./pages/api/webhooks/resend-reply.astro.mjs');
const _page10 = () => import('./pages/en/about.astro.mjs');
const _page11 = () => import('./pages/en/ai-quote.astro.mjs');
const _page12 = () => import('./pages/en/calculator.astro.mjs');
const _page13 = () => import('./pages/en/case-studies.astro.mjs');
const _page14 = () => import('./pages/en/checkout.astro.mjs');
const _page15 = () => import('./pages/en/contact.astro.mjs');
const _page16 = () => import('./pages/en/create-quote.astro.mjs');
const _page17 = () => import('./pages/en/faq.astro.mjs');
const _page18 = () => import('./pages/en/feedback.astro.mjs');
const _page19 = () => import('./pages/en/login.astro.mjs');
const _page20 = () => import('./pages/en/my-orders.astro.mjs');
const _page21 = () => import('./pages/en/no-moq.astro.mjs');
const _page22 = () => import('./pages/en/order/_id_/payment.astro.mjs');
const _page23 = () => import('./pages/en/order-tracking.astro.mjs');
const _page24 = () => import('./pages/en/payment/cancel.astro.mjs');
const _page25 = () => import('./pages/en/payment/success.astro.mjs');
const _page26 = () => import('./pages/en/payment.astro.mjs');
const _page27 = () => import('./pages/en/privacy.astro.mjs');
const _page28 = () => import('./pages/en/quote/_token_.astro.mjs');
const _page29 = () => import('./pages/en/quote-view.astro.mjs');
const _page30 = () => import('./pages/en/resources/category/_category_.astro.mjs');
const _page31 = () => import('./pages/en/resources/_category_/_slug_.astro.mjs');
const _page32 = () => import('./pages/en/resources.astro.mjs');
const _page33 = () => import('./pages/en/services.astro.mjs');
const _page34 = () => import('./pages/en/terms.astro.mjs');
const _page35 = () => import('./pages/en/track-order.astro.mjs');
const _page36 = () => import('./pages/en/transparent-pricing.astro.mjs');
const _page37 = () => import('./pages/en/why-geppetto.astro.mjs');
const _page38 = () => import('./pages/en.astro.mjs');
const _page39 = () => import('./pages/index-redirect.astro.mjs');
const _page40 = () => import('./pages/zh/about.astro.mjs');
const _page41 = () => import('./pages/zh/ai-quote.astro.mjs');
const _page42 = () => import('./pages/zh/calculator.astro.mjs');
const _page43 = () => import('./pages/zh/case-studies.astro.mjs');
const _page44 = () => import('./pages/zh/checkout.astro.mjs');
const _page45 = () => import('./pages/zh/contact.astro.mjs');
const _page46 = () => import('./pages/zh/create-quote.astro.mjs');
const _page47 = () => import('./pages/zh/faq.astro.mjs');
const _page48 = () => import('./pages/zh/feedback.astro.mjs');
const _page49 = () => import('./pages/zh/login.astro.mjs');
const _page50 = () => import('./pages/zh/my-orders.astro.mjs');
const _page51 = () => import('./pages/zh/no-moq.astro.mjs');
const _page52 = () => import('./pages/zh/order/_id_/payment.astro.mjs');
const _page53 = () => import('./pages/zh/order-tracking.astro.mjs');
const _page54 = () => import('./pages/zh/payment/cancel.astro.mjs');
const _page55 = () => import('./pages/zh/payment/success.astro.mjs');
const _page56 = () => import('./pages/zh/payment.astro.mjs');
const _page57 = () => import('./pages/zh/privacy.astro.mjs');
const _page58 = () => import('./pages/zh/quote/_token_.astro.mjs');
const _page59 = () => import('./pages/zh/quote-view.astro.mjs');
const _page60 = () => import('./pages/zh/resources/category/_category_.astro.mjs');
const _page61 = () => import('./pages/zh/resources/_category_/_slug_.astro.mjs');
const _page62 = () => import('./pages/zh/resources.astro.mjs');
const _page63 = () => import('./pages/zh/resources-backup.astro.mjs');
const _page64 = () => import('./pages/zh/services.astro.mjs');
const _page65 = () => import('./pages/zh/terms.astro.mjs');
const _page66 = () => import('./pages/zh/track-order.astro.mjs');
const _page67 = () => import('./pages/zh/transparent-pricing.astro.mjs');
const _page68 = () => import('./pages/zh/why-geppetto.astro.mjs');
const _page69 = () => import('./pages/zh.astro.mjs');
const _page70 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/admin/email-management.astro", _page1],
    ["src/pages/admin/login.astro", _page2],
    ["src/pages/admin/mvp-quotes.astro", _page3],
    ["src/pages/admin/quote-review.astro", _page4],
    ["src/pages/admin.astro", _page5],
    ["src/pages/api/email/process-queue.ts", _page6],
    ["src/pages/api/functions/track-order.ts", _page7],
    ["src/pages/api/health.ts", _page8],
    ["src/pages/api/webhooks/resend-reply.ts", _page9],
    ["src/pages/en/about.astro", _page10],
    ["src/pages/en/ai-quote.astro", _page11],
    ["src/pages/en/calculator.astro", _page12],
    ["src/pages/en/case-studies.astro", _page13],
    ["src/pages/en/checkout.astro", _page14],
    ["src/pages/en/contact.astro", _page15],
    ["src/pages/en/create-quote.astro", _page16],
    ["src/pages/en/faq.astro", _page17],
    ["src/pages/en/feedback.astro", _page18],
    ["src/pages/en/login.astro", _page19],
    ["src/pages/en/my-orders.astro", _page20],
    ["src/pages/en/no-moq.astro", _page21],
    ["src/pages/en/order/[id]/payment.astro", _page22],
    ["src/pages/en/order-tracking.astro", _page23],
    ["src/pages/en/payment/cancel.astro", _page24],
    ["src/pages/en/payment/success.astro", _page25],
    ["src/pages/en/payment.astro", _page26],
    ["src/pages/en/privacy.astro", _page27],
    ["src/pages/en/quote/[token].astro", _page28],
    ["src/pages/en/quote-view.astro", _page29],
    ["src/pages/en/resources/category/[category].astro", _page30],
    ["src/pages/en/resources/[category]/[slug].astro", _page31],
    ["src/pages/en/resources.astro", _page32],
    ["src/pages/en/services.astro", _page33],
    ["src/pages/en/terms.astro", _page34],
    ["src/pages/en/track-order.astro", _page35],
    ["src/pages/en/transparent-pricing.astro", _page36],
    ["src/pages/en/why-geppetto.astro", _page37],
    ["src/pages/en/index.astro", _page38],
    ["src/pages/index-redirect.astro", _page39],
    ["src/pages/zh/about.astro", _page40],
    ["src/pages/zh/ai-quote.astro", _page41],
    ["src/pages/zh/calculator.astro", _page42],
    ["src/pages/zh/case-studies.astro", _page43],
    ["src/pages/zh/checkout.astro", _page44],
    ["src/pages/zh/contact.astro", _page45],
    ["src/pages/zh/create-quote.astro", _page46],
    ["src/pages/zh/faq.astro", _page47],
    ["src/pages/zh/feedback.astro", _page48],
    ["src/pages/zh/login.astro", _page49],
    ["src/pages/zh/my-orders.astro", _page50],
    ["src/pages/zh/no-moq.astro", _page51],
    ["src/pages/zh/order/[id]/payment.astro", _page52],
    ["src/pages/zh/order-tracking.astro", _page53],
    ["src/pages/zh/payment/cancel.astro", _page54],
    ["src/pages/zh/payment/success.astro", _page55],
    ["src/pages/zh/payment.astro", _page56],
    ["src/pages/zh/privacy.astro", _page57],
    ["src/pages/zh/quote/[token].astro", _page58],
    ["src/pages/zh/quote-view.astro", _page59],
    ["src/pages/zh/resources/category/[category].astro", _page60],
    ["src/pages/zh/resources/[category]/[slug].astro", _page61],
    ["src/pages/zh/resources.astro", _page62],
    ["src/pages/zh/resources-backup.astro", _page63],
    ["src/pages/zh/services.astro", _page64],
    ["src/pages/zh/terms.astro", _page65],
    ["src/pages/zh/track-order.astro", _page66],
    ["src/pages/zh/transparent-pricing.astro", _page67],
    ["src/pages/zh/why-geppetto.astro", _page68],
    ["src/pages/zh/index.astro", _page69],
    ["src/pages/index.astro", _page70]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "f53b9cb1-7dc5-4aec-b475-a79a2f48ba88",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
