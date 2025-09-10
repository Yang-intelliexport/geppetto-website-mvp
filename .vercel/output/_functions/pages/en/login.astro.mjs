/* empty css                                    */
import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_Np7zNMWM.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_3sUPClHz.mjs';
import { L as LoginForm } from '../../chunks/LoginForm_QxAa8lkj.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://geppetto.studio");
const $$Login = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  const redirectUrl = Astro2.url.searchParams.get("redirect") || "/en";
  const errorType = Astro2.url.searchParams.get("error");
  let errorMessage = "";
  if (errorType === "unauthorized") {
    errorMessage = "You do not have access permission. Please log in with the correct email address.";
  } else if (errorType === "session_expired") {
    errorMessage = "Your session has expired. Please log in again.";
  }
  const isAdminLogin = redirectUrl.includes("/admin");
  const pageTitle = isAdminLogin ? "Admin Login" : "Access Your Orders";
  const pageDescription = isAdminLogin ? "Admin system login" : "Log in with your email to view your order status";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${pageTitle} - Geppetto CNC Manufacturing`, "description": pageDescription, "currentLang": "en" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"> <div class="max-w-md w-full space-y-8"> <!-- Header --> <div class="text-center"> <div class="mx-auto h-20 w-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mb-6"> <svg class="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path> </svg> </div> <h2 class="text-3xl font-bold text-gray-900 mb-2">${pageTitle}</h2> <p class="text-gray-600 mb-8">${pageDescription}</p> ${errorMessage && renderTemplate`<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6"> <p class="text-sm">${errorMessage}</p> </div>`} </div> <!-- Login Form --> ${renderComponent($$result2, "LoginForm", LoginForm, { "client:load": true, "redirectUrl": redirectUrl, "currentLang": "en", "client:component-hydration": "load", "client:component-path": "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/components/LoginForm.tsx", "client:component-export": "default" })} <!-- Help Text --> <div class="text-center"> <div class="bg-blue-50 rounded-lg p-4 text-sm text-blue-800"> <div class="flex items-start space-x-3"> <svg class="h-5 w-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> <div> <p class="font-medium">Secure Login Information</p> <p class="mt-1">We'll send a secure login link to your email. No password required - simply click the link to log in.</p> </div> </div> </div> </div> </div> </div> ` })}`;
}, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/en/login.astro", void 0);

const $$file = "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/en/login.astro";
const $$url = "/en/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
