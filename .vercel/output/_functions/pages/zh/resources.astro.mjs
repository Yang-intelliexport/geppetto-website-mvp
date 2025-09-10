/* empty css                                    */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../../chunks/astro/server_Np7zNMWM.mjs';
import 'kleur/colors';
import { g as getCollection } from '../../chunks/_astro_content_DZH6zQ1u.mjs';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_3sUPClHz.mjs';
/* empty css                                        */
export { renderers } from '../../renderers.mjs';

const $$Resources = createComponent(async ($$result, $$props, $$slots) => {
  const allResources = await getCollection("resources", ({ data }) => {
    return !data.draft;
  });
  const sortedResources = allResources.sort(
    (a, b) => new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime()
  );
  const featuredResources = sortedResources.filter((resource) => resource.data.featured);
  const categories = [
    "manufacturing-guides",
    "cnc-machining",
    "materials-science",
    "design-tips",
    "industry-insights",
    "automation-ai",
    "quality-control",
    "cost-optimization"
  ];
  const categoryMap = {
    "manufacturing-guides": "\u5236\u9020\u6307\u5357",
    "cnc-machining": "CNC\u52A0\u5DE5",
    "materials-science": "\u6750\u6599\u79D1\u5B66",
    "design-tips": "\u8BBE\u8BA1\u6280\u5DE7",
    "industry-insights": "\u884C\u4E1A\u6D1E\u5BDF",
    "automation-ai": "\u81EA\u52A8\u5316\u4E0EAI",
    "quality-control": "\u8D28\u91CF\u63A7\u5236",
    "cost-optimization": "\u6210\u672C\u4F18\u5316"
  };
  const resourcesByCategory = categories.reduce((acc, category) => {
    acc[category] = sortedResources.filter((resource) => resource.data.category === category);
    return acc;
  }, {});
  const seoData = {
    title: "Geppetto\u5236\u9020\u8D44\u6E90 - CNC\u52A0\u5DE5\u6307\u5357\u4E0E\u884C\u4E1A\u6D1E\u5BDF",
    description: "\u6DF1\u5165\u4E86\u89E3CNC\u52A0\u5DE5\u3001\u6750\u6599\u79D1\u5B66\u3001\u8BBE\u8BA1\u4F18\u5316\u7B49\u5236\u9020\u9886\u57DF\u4E13\u4E1A\u77E5\u8BC6\u3002\u83B7\u53D6\u4E13\u5BB6\u7EA7\u5236\u9020\u6307\u5357\uFF0C\u63D0\u5347\u4EA7\u54C1\u8D28\u91CF\u548C\u751F\u4EA7\u6548\u7387\u3002",
    keywords: ["CNC\u52A0\u5DE5\u6307\u5357", "\u5236\u9020\u4E1A\u77E5\u8BC6", "\u6750\u6599\u79D1\u5B66", "\u8BBE\u8BA1\u4F18\u5316", "\u8D28\u91CF\u63A7\u5236", "\u6210\u672C\u4F18\u5316", "\u667A\u80FD\u5236\u9020", "AI\u5236\u9020"]
  };
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" });
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": seoData.title, "description": seoData.description, "keywords": seoData.keywords, "data-astro-cid-hyliotyx": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 text-white py-20" data-astro-cid-hyliotyx> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-astro-cid-hyliotyx> <div class="text-center" data-astro-cid-hyliotyx> <h1 class="text-5xl lg:text-6xl font-bold mb-6" data-astro-cid-hyliotyx>
制造知识库
</h1> <p class="text-2xl text-blue-100 mb-8 max-w-3xl mx-auto" data-astro-cid-hyliotyx>
深度制造洞察 • 专家级指南 • 行业最佳实践
</p> <div class="flex flex-col sm:flex-row gap-4 justify-center" data-astro-cid-hyliotyx> <a href="/zh/create-quote" class="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors" data-astro-cid-hyliotyx>
获取专家报价
</a> <a href="#categories" class="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors" data-astro-cid-hyliotyx>
浏览资源
</a> </div> </div> </div> </section>  ${featuredResources.length > 0 && renderTemplate`<section class="py-20 bg-gray-50" data-astro-cid-hyliotyx> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-astro-cid-hyliotyx> <div class="text-center mb-12" data-astro-cid-hyliotyx> <h2 class="text-4xl font-bold text-gray-900 mb-4" data-astro-cid-hyliotyx>
⭐ 推荐文章
</h2> <p class="text-xl text-gray-600" data-astro-cid-hyliotyx>
精选专家深度解析，助力制造决策
</p> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-astro-cid-hyliotyx> ${featuredResources.slice(0, 6).map((resource) => renderTemplate`<article class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300" data-astro-cid-hyliotyx> ${resource.data.image && renderTemplate`<img${addAttribute(resource.data.image, "src")}${addAttribute(resource.data.imageAlt || resource.data.title, "alt")} class="w-full h-48 object-cover" loading="lazy" data-astro-cid-hyliotyx>`} <div class="p-6" data-astro-cid-hyliotyx> <div class="flex items-center space-x-2 mb-3" data-astro-cid-hyliotyx> <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800" data-astro-cid-hyliotyx> ${categoryMap[resource.data.category] || resource.data.category} </span> <span class="text-xs text-gray-500" data-astro-cid-hyliotyx> ${resource.data.readingTime} 分钟
</span> </div> <h3 class="text-xl font-bold text-gray-900 mb-3 line-clamp-2" data-astro-cid-hyliotyx> <a${addAttribute(`/zh/resources/${resource.slug}`, "href")} class="hover:text-purple-600 transition-colors" data-astro-cid-hyliotyx> ${resource.data.title} </a> </h3> <p class="text-gray-600 mb-4 line-clamp-3" data-astro-cid-hyliotyx> ${resource.data.description} </p> <div class="flex items-center justify-between text-sm text-gray-500" data-astro-cid-hyliotyx> <span data-astro-cid-hyliotyx>${resource.data.author}</span> <time${addAttribute(resource.data.publishDate.toISOString(), "datetime")} data-astro-cid-hyliotyx> ${formatDate(resource.data.publishDate)} </time> </div> </div> </article>`)} </div> </div> </section>`} <section id="categories" class="py-20" data-astro-cid-hyliotyx> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-astro-cid-hyliotyx> <div class="text-center mb-12" data-astro-cid-hyliotyx> <h2 class="text-4xl font-bold text-gray-900 mb-4" data-astro-cid-hyliotyx>
📂 分类浏览
</h2> <p class="text-xl text-gray-600" data-astro-cid-hyliotyx>
按专业领域深入学习制造知识
</p> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-astro-cid-hyliotyx> ${categories.map((category) => {
    const categoryResources = resourcesByCategory[category] || [];
    const categoryName = categoryMap[category];
    if (categoryResources.length === 0) return null;
    return renderTemplate`<div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col" data-astro-cid-hyliotyx> <div class="p-6 flex flex-col h-full" data-astro-cid-hyliotyx> <!-- Header Section - Fixed Height --> <div class="text-center mb-4 flex-shrink-0" data-astro-cid-hyliotyx> <div class="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4" data-astro-cid-hyliotyx> <span class="text-2xl" data-astro-cid-hyliotyx> ${category === "manufacturing-guides" ? "\u{1F3ED}" : category === "cnc-machining" ? "\u2699\uFE0F" : category === "materials-science" ? "\u{1F9EA}" : category === "design-tips" ? "\u270F\uFE0F" : category === "industry-insights" ? "\u{1F4C8}" : category === "automation-ai" ? "\u{1F916}" : category === "quality-control" ? "\u{1F3AF}" : category === "cost-optimization" ? "\u{1F4B0}" : "\u{1F4DA}"} </span> </div> <h3 class="text-xl font-bold text-gray-900 mb-2 min-h-[2.5rem] flex items-center justify-center" data-astro-cid-hyliotyx> ${categoryName} </h3> <p class="text-gray-600 text-sm" data-astro-cid-hyliotyx> ${categoryResources.length} 篇文章
</p> </div> <!-- Content Section - Flexible Height --> <div class="flex-grow mb-6" data-astro-cid-hyliotyx> <div class="space-y-3" data-astro-cid-hyliotyx> ${categoryResources.slice(0, 3).map((resource) => renderTemplate`<a${addAttribute(`/zh/resources/${resource.slug}`, "href")} class="block text-sm text-gray-700 hover:text-purple-600 transition-colors line-clamp-2 hover:bg-purple-50 p-2 rounded leading-tight" data-astro-cid-hyliotyx> ${resource.data.title} </a>`)} </div> </div> <!-- Footer Button - Fixed at Bottom --> <div class="flex-shrink-0 mt-auto" data-astro-cid-hyliotyx> <a${addAttribute(`/zh/resources/category/${category}`, "href")} class="block w-full text-center bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium" data-astro-cid-hyliotyx>
查看全部
</a> </div> </div> </div>`;
  })} </div> </div> </section>  <section class="bg-gradient-to-r from-purple-600 to-blue-600 py-16" data-astro-cid-hyliotyx> <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8" data-astro-cid-hyliotyx> <h2 class="text-3xl lg:text-4xl font-bold text-white mb-4" data-astro-cid-hyliotyx>
将知识转化为实际生产
</h2> <p class="text-xl text-blue-100 mb-8" data-astro-cid-hyliotyx>
获取透明报价，体验专家制造服务
</p> <div class="flex flex-col sm:flex-row gap-4 justify-center" data-astro-cid-hyliotyx> <a href="/zh/create-quote" class="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors" data-astro-cid-hyliotyx>
上传文件获取报价
</a> <a href="/zh/contact" class="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors" data-astro-cid-hyliotyx>
💬 咨询专家
</a> </div> </div> </section> ` })} `;
}, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/zh/resources.astro", void 0);

const $$file = "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/zh/resources.astro";
const $$url = "/zh/resources";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Resources,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
