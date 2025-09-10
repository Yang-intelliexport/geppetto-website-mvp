/* empty css                                    */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as renderScript } from '../../chunks/astro/server_Np7zNMWM.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_3sUPClHz.mjs';
export { renderers } from '../../renderers.mjs';

const $$Login = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Admin Login - Geppetto" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"> <div class="max-w-md w-full space-y-8"> <div> <div class="mx-auto h-12 w-12 text-center"> <h1 class="text-3xl font-bold text-gray-900">🔧</h1> </div> <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
Geppetto Admin
</h2> <p class="mt-2 text-center text-sm text-gray-600">
Admin Backend Login
</p> </div> <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"> <div id="error-message" class="hidden mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded"></div> <form id="login-form" class="space-y-6"> <div> <label for="email" class="block text-sm font-medium text-gray-700">
Email Address
</label> <div class="mt-1"> <input id="email" name="email" type="email" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="admin@geppetto.studio"> </div> </div> <div> <label for="password" class="block text-sm font-medium text-gray-700">
Password
</label> <div class="mt-1"> <input id="password" name="password" type="password" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"> </div> </div> <div> <button type="submit" id="submit-btn" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"> <span id="submit-text">Login</span> <span id="loading-text" class="hidden">Logging in...</span> </button> </div> </form> <div class="mt-6"> <div class="relative"> <div class="absolute inset-0 flex items-center"> <div class="w-full border-t border-gray-300"></div> </div> <div class="relative flex justify-center text-sm"> <span class="px-2 bg-white text-gray-500">Authorized Administrators Only</span> </div> </div> </div> </div> </div> </div> ${renderScript($$result2, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/admin/login.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/admin/login.astro", void 0);

const $$file = "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
