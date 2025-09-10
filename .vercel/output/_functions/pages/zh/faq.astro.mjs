/* empty css                                    */
import { c as createComponent, r as renderComponent, b as renderScript, a as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../../chunks/astro/server_Np7zNMWM.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_3sUPClHz.mjs';
import { g as getCollection } from '../../chunks/_astro_content_DZH6zQ1u.mjs';
export { renderers } from '../../renderers.mjs';

const $$Faq = createComponent(async ($$result, $$props, $$slots) => {
  const allFAQs = await getCollection("faqs");
  const faqs = allFAQs.sort((a, b) => a.data.order - b.data.order);
  const featuredFAQs = faqs.filter((faq) => faq.data.featured);
  const faqsByCategory = faqs.reduce((acc, faq) => {
    const category = faq.data.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(faq);
    return acc;
  }, {});
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "\u5E38\u89C1\u95EE\u9898 | Geppetto - AI\u9A71\u52A8\u7CBE\u5BC6\u5236\u9020FAQ", "description": "Geppetto AI+\u5B66\u5F92\u5236\u9020\u5E38\u89C1\u95EE\u9898\u89E3\u7B54\uFF0C\u6DB5\u76D6\u5B9A\u4EF7\u6210\u672C\u3001AI\u6280\u672F\u3001\u8D28\u91CF\u7CBE\u5EA6\u3001\u4EA4\u4ED8\u65F6\u95F4\u3001\u8D77\u8BA2\u91CF\u7B49\u6838\u5FC3\u95EE\u9898\uFF0C\u5E2E\u60A8\u5FEB\u901F\u4E86\u89E3\u6211\u4EEC\u7684\u670D\u52A1\u4F18\u52BF\u3002" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen"> <!-- Hero Section --> <section class="bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 text-white py-20"> <div class="container mx-auto px-6"> <div class="max-w-4xl mx-auto text-center"> <h1 class="text-5xl font-bold mb-6">
💡 常见问题解答
</h1> <p class="text-2xl text-blue-100 mb-8">
关于Geppetto AI+学徒制造的一切疑问，这里都有答案
</p> <!-- 快速导航 --> <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8"> <h3 class="text-xl font-semibold mb-4">🚀 热门问题快速导航</h3> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> ${featuredFAQs.map((faq) => renderTemplate`<a${addAttribute(`#faq-${faq.slug}`, "href")} class="bg-white/10 rounded-xl p-3 hover:bg-white/20 transition-colors duration-300 text-left"> <div class="text-sm font-medium line-clamp-2">${faq.data.question}</div> </a>`)} </div> </div> <!-- 搜索框 --> <div class="max-w-2xl mx-auto"> <div class="relative"> <input type="text" id="faq-search" placeholder="🔍 搜索你关心的问题..." class="w-full px-6 py-4 pr-12 rounded-2xl text-gray-800 text-lg focus:outline-none focus:ring-4 focus:ring-yellow-300"> <svg class="w-6 h-6 absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path> </svg> </div> </div> </div> </div> </section> <!-- 特色FAQ展示 --> <section class="py-20 bg-gray-50"> <div class="container mx-auto px-6"> <div class="max-w-6xl mx-auto"> <div class="text-center mb-16"> <h2 class="text-4xl font-bold text-gray-800 mb-6">
⭐ 最受关注的问题
</h2> <p class="text-xl text-gray-600">
90%的客户都在关心这些核心问题
</p> </div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-8"> ${await Promise.all(featuredFAQs.map(async (faq) => {
    const { Content } = await faq.render();
    return renderTemplate`<div${addAttribute(`faq-${faq.slug}`, "id")} class="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300"> <div class="flex items-start space-x-4 mb-6"> <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0"> <span class="text-white font-bold">Q</span> </div> <div class="flex-1"> <span class="bg-purple-100 text-purple-700 text-xs font-medium px-3 py-1 rounded-full mb-3 inline-block"> ${faq.data.category} </span> <h3 class="text-xl font-bold text-gray-800 mb-4">${faq.data.question}</h3> </div> </div> <div class="prose prose-gray max-w-none ml-16"> ${renderComponent($$result2, "Content", Content, {})} </div> </div>`;
  }))} </div> </div> </div> </section> <!-- 分类FAQ列表 --> <section class="py-20 bg-white"> <div class="container mx-auto px-6"> <div class="max-w-6xl mx-auto"> <div class="text-center mb-16"> <h2 class="text-4xl font-bold text-gray-800 mb-6">
📚 全部问题分类
</h2> <p class="text-xl text-gray-600">
按主题分类的详细问题解答
</p> </div> <!-- 分类标签 --> <div class="flex flex-wrap justify-center gap-4 mb-12"> <button class="category-filter bg-purple-100 text-purple-700 px-6 py-3 rounded-full font-semibold hover:bg-purple-200 transition-colors duration-300 active" data-category="all">
🔍 全部分类
</button> ${Object.keys(faqsByCategory).map((category) => renderTemplate`<button${addAttribute(`category-filter px-6 py-3 rounded-full font-semibold transition-colors duration-300 ${category === "\u5B9A\u4EF7\u6210\u672C" ? "bg-blue-100 text-blue-700 hover:bg-blue-200" : category === "AI\u6280\u672F" ? "bg-green-100 text-green-700 hover:bg-green-200" : category === "\u8D28\u91CF\u7CBE\u5EA6" ? "bg-red-100 text-red-700 hover:bg-red-200" : category === "\u4EA4\u4ED8\u65F6\u95F4" ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200" : category === "\u8D77\u8BA2\u91CF" ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-200" : category === "\u6750\u6599\u80FD\u529B" ? "bg-pink-100 text-pink-700 hover:bg-pink-200" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`, "class")}${addAttribute(category, "data-category")}> ${category === "\u5B9A\u4EF7\u6210\u672C" ? "\u{1F4B0}" : category === "AI\u6280\u672F" ? "\u{1F916}" : category === "\u8D28\u91CF\u7CBE\u5EA6" ? "\u{1F3AF}" : category === "\u4EA4\u4ED8\u65F6\u95F4" ? "\u26A1" : category === "\u8D77\u8BA2\u91CF" ? "\u{1F4E6}" : category === "\u6750\u6599\u80FD\u529B" ? "\u{1F527}" : category === "\u4ED8\u6B3E\u8D26\u671F" ? "\u{1F4B3}" : category === "\u552E\u540E\u670D\u52A1" ? "\u{1F6E1}\uFE0F" : category === "\u7ADE\u4E89\u4F18\u52BF" ? "\u{1F3C6}" : category === "\u5B89\u5168\u9690\u79C1" ? "\u{1F512}" : "\u2753"} ${category} </button>`)} </div> <!-- FAQ列表 --> <div class="space-y-4" id="faq-list"> ${await Promise.all(faqs.map(async (faq, index) => {
    const { Content } = await faq.render();
    return renderTemplate`<div class="faq-item bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300"${addAttribute(faq.data.category, "data-category")}> <button class="faq-toggle w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 rounded-xl transition-colors duration-300"${addAttribute(`toggleFaq(${index})`, "onclick")}> <div class="flex items-center space-x-4 flex-1"> <div class="w-8 h-8 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0"> <span class="text-purple-600 font-bold text-sm">Q</span> </div> <div class="flex-1"> <span${addAttribute(`text-xs font-medium px-2 py-1 rounded-full mr-3 ${faq.data.category === "\u5B9A\u4EF7\u6210\u672C" ? "bg-blue-100 text-blue-700" : faq.data.category === "AI\u6280\u672F" ? "bg-green-100 text-green-700" : faq.data.category === "\u8D28\u91CF\u7CBE\u5EA6" ? "bg-red-100 text-red-700" : faq.data.category === "\u4EA4\u4ED8\u65F6\u95F4" ? "bg-yellow-100 text-yellow-700" : faq.data.category === "\u8D77\u8BA2\u91CF" ? "bg-indigo-100 text-indigo-700" : faq.data.category === "\u6750\u6599\u80FD\u529B" ? "bg-pink-100 text-pink-700" : "bg-gray-100 text-gray-700"}`, "class")}> ${faq.data.category} </span> <h3 class="text-lg font-semibold text-gray-800">${faq.data.question}</h3> ${faq.data.featured && renderTemplate`<span class="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full ml-2">⭐ 热门</span>`} </div> </div> <svg${addAttribute(`w-5 h-5 text-gray-400 transform transition-transform duration-300 faq-icon-${index}`, "class")} fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path> </svg> </button> <div${addAttribute(`faq-content-${index}`, "id")} class="faq-content hidden px-8 pb-6"> <div class="ml-12 prose prose-gray max-w-none"> ${renderComponent($$result2, "Content", Content, {})} </div> </div> </div>`;
  }))} </div> </div> </div> </section> <!-- 没找到答案？联系我们 --> <section class="py-20 bg-gradient-to-r from-purple-900 to-blue-900 text-white"> <div class="container mx-auto px-6 text-center"> <h2 class="text-4xl font-bold mb-6">
🤔 没找到你想要的答案？
</h2> <p class="text-2xl text-blue-100 mb-12">
我们的专家团队随时为您解答任何疑问
</p> <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"> <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6"> <div class="text-4xl mb-4"></div> <h3 class="text-xl font-semibold mb-2">电话咨询</h3> <p class="text-blue-100">+86 13511091304</p> <p class="text-sm text-blue-200">7x工作时间专家在线</p> </div> <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6"> <div class="text-4xl mb-4">💬</div> <h3 class="text-xl font-semibold mb-2">在线客服</h3> <p class="text-blue-100">实时问答</p> <p class="text-sm text-blue-200">工作日9:00-18:00</p> </div> <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6"> <div class="text-4xl mb-4"></div> <h3 class="text-xl font-semibold mb-2">邮件支持</h3> <p class="text-blue-100">support@geppetto.ai</p> <p class="text-sm text-blue-200">工作时间内回复</p> </div> </div> <div class="flex flex-col sm:flex-row gap-6 justify-center items-center"> <a href="/contact" class="bg-gradient-to-r from-yellow-400 to-orange-500 text-purple-900 px-12 py-4 rounded-full text-xl font-bold hover:from-yellow-300 hover:to-orange-400 transform hover:scale-105 transition-all duration-300 shadow-2xl">
💬 立即咨询专家
</a> <a href="/create-quote" class="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-purple-900 transition-all duration-300">
🤖 AI检测+专家报价
</a> </div> <div class="mt-8 text-blue-100"> <p class="text-lg">
💡 每个问题都是改进我们服务的机会，请不要犹豫联系我们
</p> </div> </div> </section> </main> ` })} ${renderScript($$result, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/zh/faq.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/zh/faq.astro", void 0);

const $$file = "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/zh/faq.astro";
const $$url = "/zh/faq";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Faq,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
