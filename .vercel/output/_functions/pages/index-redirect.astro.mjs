/* empty css                                 */
import { c as createComponent, aj as renderHead, b as renderScript, a as renderTemplate } from '../chunks/astro/server_Np7zNMWM.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                          */
export { renderers } from '../renderers.mjs';

const $$IndexRedirect = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html data-astro-cid-6wroke3x> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Geppetto - 智能弹性工厂</title>${renderHead()}</head> <body data-astro-cid-6wroke3x> <div class="container" data-astro-cid-6wroke3x> <div class="logo" data-astro-cid-6wroke3x>G</div> <h1 data-astro-cid-6wroke3x>Welcome to Geppetto</h1> <p class="subtitle" data-astro-cid-6wroke3x>智能弹性工厂</p> <div class="language-options" data-astro-cid-6wroke3x> <a href="/en" class="language-btn" id="english-btn" data-astro-cid-6wroke3x> <span class="flag" data-astro-cid-6wroke3x>🌍</span> <div data-astro-cid-6wroke3x> <div data-astro-cid-6wroke3x>English</div> <div class="market-info" data-astro-cid-6wroke3x>Global Market</div> </div> </a> <a href="/zh" class="language-btn" id="chinese-btn" data-astro-cid-6wroke3x> <span class="flag" data-astro-cid-6wroke3x>🇨🇳</span> <div data-astro-cid-6wroke3x> <div data-astro-cid-6wroke3x>中文</div> <div class="market-info" data-astro-cid-6wroke3x>中国大陆市场</div> </div> </a> </div> <div class="auto-redirect" data-astro-cid-6wroke3x>
Auto-redirecting to English in <span class="countdown" id="countdown" data-astro-cid-6wroke3x>5</span> seconds
</div> </div> ${renderScript($$result, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/index-redirect.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/index-redirect.astro", void 0);

const $$file = "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/index-redirect.astro";
const $$url = "/index-redirect";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$IndexRedirect,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
