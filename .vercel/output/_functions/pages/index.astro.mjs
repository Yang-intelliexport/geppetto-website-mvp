/* empty css                                 */
import { c as createComponent, b as renderScript, aj as renderHead, a as renderTemplate } from '../chunks/astro/server_Np7zNMWM.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderScript($$result, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/index.astro?astro&type=script&index=0&lang.ts")} <html> <head><meta charset="UTF-8"><meta http-equiv="refresh" content="0; url=/en"><title>Redirecting...</title>${renderHead()}</head> <body> <p>Redirecting to your preferred language...</p> <p><a href="/en">English</a> | <a href="/zh">中文</a></p> </body></html>`;
}, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/index.astro", void 0);

const $$file = "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
