/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, e as addAttribute, aq as renderTransition } from '../chunks/astro/server_Np7zNMWM.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_3sUPClHz.mjs';
import { $ as $$HeroSection, a as $$CompactCostCalculator, b as $$AdvantagesGrid, c as $$TestimonialSection } from '../chunks/CompactCostCalculator_B_OqQ0V8.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const data = {
    seo: {
      title: "\u67D4\u6027\u667A\u80FD\u5DE5\u5382 | \u900F\u660E\u5236\u9020\u4E13\u5BB6 | 72\u5C0F\u65F6\u5FEB\u901F\u4EA4\u4ED8 | \u96F6\u8D77\u8BA2\u91CFCNC\u52A0\u5DE5 | Geppetto",
      description: "\u67D4\u6027\u667A\u80FD\u5DE5\u5382\u54CD\u5E94\u60A8\u7684\u521B\u65B0\u8282\u594F\uFF1A\u667A\u80FD\u5206\u6790+\u4E13\u5BB6\u9A8C\u8BC1\u3001\u6807\u51C6\u7CBE\u5EA6\xB10.1mm\u300172\u5C0F\u65F6\u751F\u4EA7\u5468\u671F\u3001\u96F6\u8D77\u8BA2\u91CF\u3002\u4E13\u4E3A\u521B\u4E1A\u516C\u53F8\u6253\u9020\u7684\u900F\u660E\u5236\u9020\u89E3\u51B3\u65B9\u6848\u3002",
      keywords: ["\u67D4\u6027\u667A\u80FD\u5DE5\u5382", "\u900F\u660E\u5236\u9020", "\u667A\u80FD\u5236\u9020", "\u6570\u5B57\u5316\u5236\u9020", "\u667A\u80FD\u5DE5\u5382", "CNC\u7CBE\u5BC6\u52A0\u5DE5", "\u5FEB\u901F\u539F\u578B\u5236\u9020", "\u5FAE\u7CBE\u52A0\u5DE5", "CNC\u81EA\u52A8\u5316", "\u5236\u9020\u521B\u65B0", "\u67D4\u6027\u5DE5\u5382", "\u6570\u5B57\u5B6A\u751F\u5236\u9020", "\u673A\u5668\u4EBA\u5236\u9020", "\u7535\u5B50\u5236\u9020", "\u7CBE\u5BC6\u5236\u9020"]
    },
    hero: {
      title: "\u67D4\u6027\u667A\u80FD\u5DE5\u5382\uFF0C\u54CD\u5E94\u60A8\u7684\u521B\u65B0\u8282\u594F",
      subtitle: "\u900F\u660E\u5236\u9020\u4E13\u5BB6\uFF0C\u7EC8\u7ED3\u5236\u9020\u62A5\u4EF7\u6DF7\u4E71",
      description: "\u667A\u80FD\u5206\u6790+\u4E13\u5BB6\u9A8C\u8BC1 \u2022 \u900F\u660E\u5B9A\u4EF7\u4F53\u7CFB \u2022 72\u5C0F\u65F6\u5FEB\u901F\u4EA4\u4ED8\n\u6807\u51C6\u7CBE\u5EA6\xB10.1mm \u2022 \u96F6\u8D77\u8BA2\u91CF\u751F\u4EA7 \u2022 \u65E0\u9690\u85CF\u8D39\u7528\u627F\u8BFA",
      cta: {
        primary: {
          text: "\u7ACB\u5373\u83B7\u53D6\u62A5\u4EF7",
          href: "/zh/create-quote"
        },
        secondary: {
          text: "\u770B\u6211\u4EEC\u7684\u4E0D\u540C\u4E4B\u5904",
          href: "/zh/why-geppetto"
        }
      }
    },
    advantages: [
      {
        id: "pricing-transparency",
        title: "\u667A\u80FD\u9A8C\u8BC1\u4F53\u7CFB",
        description: "\u7EC8\u7ED3\u5236\u9020\u62A5\u4EF7\u6DF7\u4E71\u3002\u667A\u80FD\u5206\u6790+\u4E13\u5BB6\u6280\u672F\u5BA1\u6838=\u900F\u660E\u62A5\u4EF7\u4F53\u7CFB\uFF0C\u4E13\u5BB6\u4E3B\u5BFC\u786E\u4FDD\u670D\u52A1\u8D28\u91CF\uFF0C\u5B8C\u5168\u4EF7\u503C\u7ED3\u6784\u53EF\u89C1\u3002",
        icon: "",
        stats: "\u667A\u80FD\u9A8C\u8BC1 \u2022 \u65E0\u9690\u85CF\u8D39\u7528",
        color: "purple"
      },
      {
        id: "startup-friendly-manufacturing",
        title: "\u67D4\u6027\u5236\u9020\u54CD\u5E94",
        description: "1\u4EF6\u8D77\u505A\uFF0C72\u5C0F\u65F6\u751F\u4EA7\u5B8C\u6210\u3002\u67D4\u6027\u667A\u80FD\u5DE5\u5382\u54CD\u5E94\u60A8\u7684\u521B\u65B0\u8282\u594F\uFF0C\u65E0MOQ\u9650\u5236\uFF0C\u73B0\u91D1\u6D41\u53CB\u597D\u3002",
        icon: "",
        stats: "1\u4EF6\u8D77\u505A \u2022 72\u5C0F\u65F6\u751F\u4EA7+\u8FD0\u8F93 \u2022 \u65E0MOQ",
        color: "blue"
      },
      {
        id: "precision-guarantee",
        title: "\u9879\u76EE\u5B9A\u5236\u7CBE\u5EA6\u4FDD\u8BC1",
        description: "\u6EE1\u8DB3\u5DE5\u4E1A\u5236\u9020\u3001\u7535\u5B50\u8BBE\u5907\u7B49\u884C\u4E1A\u7CBE\u5EA6\u8981\u6C42\u3002\u9879\u76EE\u5B9A\u5236\u7CBE\u5EA6\u6807\u51C6\uFF0C\u8D28\u91CF\u4F53\u7CFB\u5B8C\u5584\uFF0C\u76F8\u5173\u8BA4\u8BC1\u83B7\u53D6\u4E2D\u3002",
        icon: "",
        stats: "\u6839\u636E\u9700\u6C42\u5B9A\u5236 \u2022 100%\u7B26\u5408\u6027 \u2022 \u8D28\u91CF\u4FDD\u8BC1",
        color: "green"
      },
      {
        id: "transparent-communication",
        title: "\u5168\u7A0B\u900F\u660E\u6C9F\u901A",
        description: "8\u5C0F\u65F6\u4E13\u5BB6\u5BA1\u6838\u62A5\u4EF7\uFF0C\u5B9E\u65F6\u751F\u4EA7\u8FDB\u5EA6\u66F4\u65B0\u3002\u6CA1\u6709\u6A21\u7CCA\u627F\u8BFA\uFF0C\u53EA\u6709\u6E05\u6670\u65F6\u95F4\u8282\u70B9\u548C\u53EF\u9760\u4EA4\u4ED8\u3002",
        icon: "",
        stats: "8\u5C0F\u65F6\u62A5\u4EF7 \u2022 \u5B9E\u65F6\u8FDB\u5EA6 \u2022 \u6E05\u6670\u65F6\u95F4\u8282\u70B9",
        color: "orange"
      }
    ],
    testimonials: [
      {
        name: "\u5F20\u5DE5\u7A0B\u5E08",
        company: "\u67D0\u5177\u8EAB\u667A\u80FD\u521D\u521B\u516C\u53F8",
        content: "\u5236\u9020\u62A5\u4EF7\u4E00\u76F4\u8BA9\u6211\u4EEC\u5F88\u56F0\u60D1\uFF0C\u4F20\u7EDF\u4F9B\u5E94\u5546\u62A5\u4EF7\u5DEE\u5F02\u5DE8\u5927\u3002Geppetto\u7684\u53CC\u91CD\u9A8C\u8BC1\u4F53\u7CFB\u8BE6\u7EC6\u5206\u89E3\u4E86\u6210\u672C\u6784\u6210\uFF0C\u6700\u7EC8\u4EF7\u683C\u5408\u7406\u900F\u660E\uFF0C\u7CBE\u5EA6\u5B8C\u5168\u7B26\u5408\u9879\u76EE\u8981\u6C42\u3002\u73B0\u5728\u6211\u4EEC\u6240\u6709\u539F\u578B\u90FD\u627E\u4ED6\u4EEC\u505A\u3002",
        stats: {
          precision: "\u6309\u9700\u5B9A\u5236",
          transparency: "100%\u900F\u660E",
          delivery_time: "72\u5C0F\u65F6\u751F\u4EA7",
          satisfaction: "\u521D\u521B\u9996\u9009"
        }
      }
    ],
    features: [
      {
        title: "\u900F\u660E\u5236\u9020\u4E13\u5BB6",
        description: "\u7EC8\u7ED3\u5236\u9020\u62A5\u4EF7\u6DF7\u4E71\uFF0C\u4E3A\u521D\u521B\u4F01\u4E1A\u63D0\u4F9B\u6E05\u6670\u53EF\u9760\u7684\u5236\u9020\u670D\u52A1",
        icon: "\u2713"
      },
      {
        title: "127+\u521D\u521B\u4F01\u4E1A",
        description: "\u4E13\u95E8\u670D\u52A1\u521D\u521B\u4F01\u4E1A\uFF0C\u7406\u89E3\u5C0F\u6279\u91CF\u3001\u5FEB\u8282\u594F\u3001\u6210\u672C\u654F\u611F\u7684\u9700\u6C42",
        icon: "\u2713"
      },
      {
        title: "8\u5C0F\u65F6\u4E13\u5BB6\u62A5\u4EF7",
        description: "\u4E13\u4E1A\u5DE5\u7A0B\u5E08\u5BA1\u6838\uFF0C\u63D0\u4F9B\u8BE6\u7EC6\u670D\u52A1\u5206\u89E3\u548C\u6280\u672F\u5EFA\u8BAE",
        icon: "\u2713"
      }
    ]
  };
  const structuredData = {
    type: "organization",
    data: {
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        "name": "AI\u667A\u80FD\u5236\u9020\u670D\u52A1",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "AI\u8F85\u52A9\u5206\u6790\uFF0C\u4E13\u5BB6\u62A5\u4EF7\u670D\u52A1",
              "description": "AI\u8F85\u52A9\u5206\u6790CAD\u6587\u4EF6\uFF0C\u4E13\u5BB68\u5C0F\u65F6\u5185\u63D0\u4F9B\u8BE6\u7EC6\u62A5\u4EF7"
            },
            "priceSpecification": {
              "@type": "PriceSpecification",
              "priceCurrency": "CNY",
              "price": "0",
              "description": "\u514D\u8D39AI\u8F85\u52A9\u5206\u6790\u670D\u52A1\uFF0C\u4E13\u5BB6\u5BA1\u6838\u62A5\u4EF7"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Industry Standards\u7CBE\u5BC6CNC\u52A0\u5DE5",
              "description": "\u8D85\u9AD8\u7CBE\u5EA6\u6309\u9700\u5B9A\u5236"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "72\u5C0F\u65F6\u5FEB\u901F\u751F\u4EA7\u4EA4\u4ED8",
              "description": "\u4E13\u95E8\u4EA7\u80FD\u914D\u7F6E\uFF0C72\u5C0F\u65F6\u5185\u5B8C\u6210\u751F\u4EA7+\u7269\u6D41"
            }
          }
        ]
      }
    }
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": data.seo.title, "description": data.seo.description, "keywords": data.seo.keywords, "structuredData": structuredData }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<div${addAttribute(renderTransition($$result2, "dgtnjdut", "slide", "hero-section"), "data-astro-transition-scope")}> ${renderComponent($$result2, "HeroSection", $$HeroSection, { "hero": data.hero, "features": data.features, "language": "zh" })} </div>  <section class="py-16 bg-white"${addAttribute(renderTransition($$result2, "i442p33a", "fade", "calculator-section"), "data-astro-transition-scope")}> <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-12"> <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
成本预估参考
</h2> <p class="text-xl text-gray-600 max-w-3xl mx-auto">
输入基本参数获得大概成本范围。仅供参考，精准报价需要AI辅助分析CAD文件，专家8小时内审核确认。
</p> </div> <div class="max-w-2xl mx-auto"> ${renderComponent($$result2, "CompactCostCalculator", $$CompactCostCalculator, { "language": "zh", "className": "shadow-xl" })} </div> <div class="mt-8 text-center text-sm text-gray-500">
注意：此为粗略估算，AI辅助初步分析，专家8小时内审核提供详细报价 | 零隐藏费用保证
</div> </div> </section>  <div${addAttribute(renderTransition($$result2, "fpmgl2qn", "fade", "advantages-section"), "data-astro-transition-scope")}> ${renderComponent($$result2, "AdvantagesGrid", $$AdvantagesGrid, { "advantages": data.advantages, "language": "zh" })} </div>  <div${addAttribute(renderTransition($$result2, "tx7fbecb", "slide", "testimonials-section"), "data-astro-transition-scope")}> ${renderComponent($$result2, "TestimonialSection", $$TestimonialSection, { "testimonials": data.testimonials, "language": "zh" })} </div>  <section class="py-20 bg-gradient-to-r from-purple-600 to-blue-500"${addAttribute(renderTransition($$result2, "6klyw4gp", "fade", "cta-section"), "data-astro-transition-scope")}> <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8"> <h2 class="text-3xl lg:text-4xl font-bold text-white mb-6">
准备体验Geppetto透明制造承诺？
</h2> <p class="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
上传您的图纸，AI辅助分析后，专家8小时内完成技术审核与价值分解，提供详细报价
</p> <div class="flex flex-col sm:flex-row gap-4 justify-center"> <a href="/zh/create-quote" class="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-lg">
立即获取专业服务报价
</a> <a href="tel:+86 13511091304" class="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-purple-600 transition-colors duration-200">
技术专家咨询
</a> </div> <div class="mt-8 text-purple-100 text-sm">
无风险试用 • 质量承诺 • 工作时间技术支持
</div> </div> </section>  <section class="py-16 bg-gray-50"${addAttribute(renderTransition($$result2, "225mzxuh", "slide", "china-advantages"), "data-astro-transition-scope")}> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-12"> <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
专为中国市场打造的制造优势
</h2> <p class="text-xl text-gray-600 max-w-3xl mx-auto">
深度理解中国制造业需求，提供最适合的智能制造解决方案
</p> </div> <div class="grid md:grid-cols-3 gap-8"> <div class="bg-white rounded-lg p-6 shadow-md"> <div class="text-4xl mb-4 text-center"></div> <h3 class="text-xl font-bold text-gray-900 mb-3 text-center">深圳总部优势</h3> <ul class="space-y-2 text-gray-600"> <li class="flex items-center"><span class="text-green-500 mr-2">✓</span>本土化服务团队</li> <li class="flex items-center"><span class="text-green-500 mr-2">✓</span>粤港澳大湾区制造网络</li> <li class="flex items-center"><span class="text-green-500 mr-2">✓</span>中文技术支持</li> <li class="flex items-center"><span class="text-green-500 mr-2">✓</span>国内物流配送</li> </ul> </div> <div class="bg-white rounded-lg p-6 shadow-md"> <div class="text-4xl mb-4 text-center"></div> <h3 class="text-xl font-bold text-gray-900 mb-3 text-center">成本控制优势</h3> <ul class="space-y-2 text-gray-600"> <li class="flex items-center"><span class="text-green-500 mr-2">✓</span>AI+学徒制降本模式</li> <li class="flex items-center"><span class="text-green-500 mr-2">✓</span>无汇率风险</li> <li class="flex items-center"><span class="text-green-500 mr-2">✓</span>人民币计价结算</li> <li class="flex items-center"><span class="text-green-500 mr-2">✓</span>本地化供应链</li> </ul> </div> <div class="bg-white rounded-lg p-6 shadow-md"> <div class="text-4xl mb-4 text-center"></div> <h3 class="text-xl font-bold text-gray-900 mb-3 text-center">服务响应优势</h3> <ul class="space-y-2 text-gray-600"> <li class="flex items-center"><span class="text-green-500 mr-2">✓</span>同时区实时沟通</li> <li class="flex items-center"><span class="text-green-500 mr-2">✓</span>现场技术支持</li> <li class="flex items-center"><span class="text-green-500 mr-2">✓</span>定制化解决方案</li> <li class="flex items-center"><span class="text-green-500 mr-2">✓</span>快速迭代优化</li> </ul> </div> </div> </div> </section> ` })}`;
}, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/zh/index.astro", "self");

const $$file = "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/zh/index.astro";
const $$url = "/zh";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
