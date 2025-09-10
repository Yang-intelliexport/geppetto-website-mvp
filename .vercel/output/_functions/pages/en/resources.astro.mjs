/* empty css                                    */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../../chunks/astro/server_Np7zNMWM.mjs';
import 'kleur/colors';
import { g as getCollection } from '../../chunks/_astro_content_DZH6zQ1u.mjs';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_3sUPClHz.mjs';
/* empty css                                        */
export { renderers } from '../../renderers.mjs';

const $$Resources = createComponent(async ($$result, $$props, $$slots) => {
  const allResources = await getCollection("resources-en", ({ data }) => {
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
    "manufacturing-guides": "Manufacturing Guides",
    "cnc-machining": "CNC Machining",
    "materials-science": "Materials Science",
    "design-tips": "Design Tips",
    "industry-insights": "Industry Insights",
    "automation-ai": "Automation & AI",
    "quality-control": "Quality Control",
    "cost-optimization": "Cost Optimization"
  };
  const resourcesByCategory = categories.reduce((acc, category) => {
    acc[category] = sortedResources.filter((resource) => resource.data.category === category);
    return acc;
  }, {});
  const seoData = {
    title: "Geppetto Manufacturing Resources - CNC Guides & Industry Insights",
    description: "Deep dive into CNC machining, materials science, design optimization and manufacturing expertise. Get professional manufacturing guides to improve quality and efficiency.",
    keywords: ["CNC machining guide", "manufacturing knowledge", "materials science", "design optimization", "quality control", "cost optimization", "smart manufacturing", "transparent manufacturing"]
  };
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": seoData.title, "description": seoData.description, "keywords": seoData.keywords, "data-astro-cid-bkcv3667": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 text-white py-20" data-astro-cid-bkcv3667> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-astro-cid-bkcv3667> <div class="text-center" data-astro-cid-bkcv3667> <h1 class="text-5xl lg:text-6xl font-bold mb-6" data-astro-cid-bkcv3667>
Manufacturing Knowledge Hub
</h1> <p class="text-2xl text-blue-100 mb-8 max-w-3xl mx-auto" data-astro-cid-bkcv3667>
Deep Manufacturing Insights • Expert Guides • Industry Best Practices
</p> <div class="flex flex-col sm:flex-row gap-4 justify-center" data-astro-cid-bkcv3667> <a href="/en/create-quote" class="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors" data-astro-cid-bkcv3667>
Get Expert Quote
</a> <a href="#categories" class="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors" data-astro-cid-bkcv3667>
Browse Resources
</a> </div> </div> </div> </section>  ${featuredResources.length > 0 && renderTemplate`<section class="py-20 bg-gray-50" data-astro-cid-bkcv3667> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-astro-cid-bkcv3667> <div class="text-center mb-12" data-astro-cid-bkcv3667> <h2 class="text-4xl font-bold text-gray-900 mb-4" data-astro-cid-bkcv3667>
Featured Articles
</h2> <p class="text-xl text-gray-600" data-astro-cid-bkcv3667>
Expert insights to power your manufacturing decisions
</p> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-astro-cid-bkcv3667> ${featuredResources.slice(0, 6).map((resource) => renderTemplate`<article class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300" data-astro-cid-bkcv3667> ${resource.data.image && renderTemplate`<img${addAttribute(resource.data.image, "src")}${addAttribute(resource.data.imageAlt || resource.data.title, "alt")} class="w-full h-48 object-cover" loading="lazy" data-astro-cid-bkcv3667>`} <div class="p-6" data-astro-cid-bkcv3667> <div class="flex items-center space-x-2 mb-3" data-astro-cid-bkcv3667> <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800" data-astro-cid-bkcv3667> ${categoryMap[resource.data.category] || resource.data.category} </span> <span class="text-xs text-gray-500" data-astro-cid-bkcv3667> ${resource.data.readingTime} min
</span> </div> <h3 class="text-xl font-bold text-gray-900 mb-3 line-clamp-2" data-astro-cid-bkcv3667> <a${addAttribute(`/en/resources/${resource.slug}`, "href")} class="hover:text-purple-600 transition-colors" data-astro-cid-bkcv3667> ${resource.data.title} </a> </h3> <p class="text-gray-600 mb-4 line-clamp-3" data-astro-cid-bkcv3667> ${resource.data.description} </p> <div class="flex items-center justify-between text-sm text-gray-500" data-astro-cid-bkcv3667> <span data-astro-cid-bkcv3667>${resource.data.author}</span> <time${addAttribute(resource.data.publishDate.toISOString(), "datetime")} data-astro-cid-bkcv3667> ${formatDate(resource.data.publishDate)} </time> </div> </div> </article>`)} </div> </div> </section>`} <section id="categories" class="py-20" data-astro-cid-bkcv3667> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-astro-cid-bkcv3667> <div class="text-center mb-12" data-astro-cid-bkcv3667> <h2 class="text-4xl font-bold text-gray-900 mb-4" data-astro-cid-bkcv3667>
Browse by Category
</h2> <p class="text-xl text-gray-600" data-astro-cid-bkcv3667>
Deep dive into manufacturing knowledge by expertise area
</p> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-astro-cid-bkcv3667> ${categories.map((category) => {
    const categoryResources = resourcesByCategory[category] || [];
    const categoryName = categoryMap[category];
    if (categoryResources.length === 0) return null;
    return renderTemplate`<div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col" data-astro-cid-bkcv3667> <div class="p-6 flex flex-col h-full" data-astro-cid-bkcv3667> <!-- Header Section - Fixed Height --> <div class="text-center mb-4 flex-shrink-0" data-astro-cid-bkcv3667> <div class="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4" data-astro-cid-bkcv3667> <span class="text-2xl" data-astro-cid-bkcv3667> ${category === "manufacturing-guides" ? "\u{1F3ED}" : category === "cnc-machining" ? "\u2699\uFE0F" : category === "materials-science" ? "\u{1F9EA}" : category === "design-tips" ? "\u270F\uFE0F" : category === "industry-insights" ? "\u{1F4C8}" : category === "automation-ai" ? "\u{1F916}" : category === "quality-control" ? "\u{1F3AF}" : category === "cost-optimization" ? "\u{1F4B0}" : "\u{1F4DA}"} </span> </div> <h3 class="text-xl font-bold text-gray-900 mb-2 min-h-[2.5rem] flex items-center justify-center" data-astro-cid-bkcv3667> ${categoryName} </h3> <p class="text-gray-600 text-sm" data-astro-cid-bkcv3667> ${categoryResources.length} articles
</p> </div> <!-- Content Section - Flexible Height --> <div class="flex-grow mb-6" data-astro-cid-bkcv3667> <div class="space-y-3" data-astro-cid-bkcv3667> ${categoryResources.slice(0, 3).map((resource) => renderTemplate`<a${addAttribute(`/en/resources/${resource.slug}`, "href")} class="block text-sm text-gray-700 hover:text-purple-600 transition-colors line-clamp-2 hover:bg-purple-50 p-2 rounded leading-tight" data-astro-cid-bkcv3667> ${resource.data.title} </a>`)} </div> </div> <!-- Footer Button - Fixed at Bottom --> <div class="flex-shrink-0 mt-auto" data-astro-cid-bkcv3667> <a${addAttribute(`/en/resources/category/${category}`, "href")} class="block w-full text-center bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium" data-astro-cid-bkcv3667>
View All
</a> </div> </div> </div>`;
  })} </div> </div> </section>  <section class="bg-gradient-to-r from-purple-600 to-blue-600 py-16" data-astro-cid-bkcv3667> <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8" data-astro-cid-bkcv3667> <h2 class="text-3xl lg:text-4xl font-bold text-white mb-4" data-astro-cid-bkcv3667>
Turn Knowledge into Real Production
</h2> <p class="text-xl text-blue-100 mb-8" data-astro-cid-bkcv3667>
Get transparent quotes and experience expert manufacturing services
</p> <div class="flex flex-col sm:flex-row gap-4 justify-center" data-astro-cid-bkcv3667> <a href="/en/create-quote" class="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors" data-astro-cid-bkcv3667>
Upload Files for Quote
</a> <a href="/en/contact" class="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors" data-astro-cid-bkcv3667>
💬 Consult Expert
</a> </div> </div> </section> ` })} `;
}, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/en/resources.astro", void 0);

const $$file = "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/en/resources.astro";
const $$url = "/en/resources";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Resources,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
