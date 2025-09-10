/* empty css                                    */
import { d as createAstro, c as createComponent } from '../../chunks/astro/server_Np7zNMWM.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://geppetto.studio");
const $$OrderTracking = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$OrderTracking;
  return Astro2.redirect("/zh/track-order");
}, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/zh/order-tracking.astro", void 0);

const $$file = "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/zh/order-tracking.astro";
const $$url = "/zh/order-tracking";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$OrderTracking,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
