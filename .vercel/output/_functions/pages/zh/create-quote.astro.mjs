/* empty css                                    */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_Np7zNMWM.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_3sUPClHz.mjs';
import { Q as QuoteCreationFlow } from '../../chunks/QuoteCreationFlow_DUGYBUaO.mjs';
export { renderers } from '../../renderers.mjs';

const $$CreateQuote = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "\u4E13\u4E1ACNC\u62A5\u4EF7 - \u5DE5\u4F5C\u65F6\u95F4\u5185\u56DE\u590D | Geppetto\u667A\u80FD\u5236\u9020", "description": "\u4E0A\u4F20\u60A8\u7684CAD\u6587\u4EF6\uFF0C\u83B7\u5F97\u4E13\u4E1A\u7684CNC\u52A0\u5DE5\u62A5\u4EF7\u3002\u6211\u4EEC\u627F\u8BFA\u5DE5\u4F5C\u65F6\u95F4\u5185\u56DE\u590D\uFF0C\u4EF7\u683C\u900F\u660E\uFF0C\u8D28\u91CF\u4FDD\u8BC1\u3002\u652F\u6301\u94DD\u5408\u91D1\u3001\u4E0D\u9508\u94A2\u7B49\u591A\u79CD\u6750\u6599\u3002", "keywords": [
    "CNC\u62A5\u4EF7",
    "\u673A\u68B0\u52A0\u5DE5\u62A5\u4EF7",
    "\u7CBE\u5BC6\u5236\u9020",
    "CAD\u6587\u4EF6\u62A5\u4EF7",
    "\u94DD\u5408\u91D1\u52A0\u5DE5",
    "\u4E0D\u9508\u94A2\u52A0\u5DE5",
    "\u5FEB\u901F\u62A5\u4EF7",
    "\u4E13\u4E1A\u5236\u9020",
    "\u5DE5\u4F5C\u65F6\u95F4\u56DE\u590D",
    "\u900F\u660E\u5B9A\u4EF7",
    "\u8D28\u91CF\u4FDD\u8BC1",
    "\u667A\u80FD\u5236\u9020"
  ], "ogImage": "/images/og-create-quote-zh.jpg", "structuredData": {
    type: "service",
    data: {
      "@type": "Service",
      "name": "CNC\u5236\u9020\u4E13\u4E1A\u62A5\u4EF7\u670D\u52A1",
      "description": "\u5DE5\u4F5C\u65F6\u95F4\u5185\u4E13\u4E1ACNC\u5236\u9020\u62A5\u4EF7\uFF0C\u652F\u6301\u591A\u79CD\u6750\u6599\u548C\u5DE5\u827A\uFF0C\u4EF7\u683C\u900F\u660E\u8D28\u91CF\u4FDD\u8BC1",
      "provider": {
        "@type": "Organization",
        "name": "Geppetto\u667A\u80FD\u5236\u9020",
        "url": "https://geppetto.com"
      },
      "serviceType": "Manufacturing Quote Service",
      "areaServed": ["China", "Global"],
      "offers": {
        "@type": "Offer",
        "name": "CNC\u5236\u9020\u62A5\u4EF7",
        "description": "\u4E13\u4E1ACNC\u5236\u9020\u62A5\u4EF7\u670D\u52A1",
        "price": "0",
        "priceCurrency": "CNY"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "CNC\u5236\u9020\u670D\u52A1",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "CNC\u94E3\u524A\u52A0\u5DE5"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "CNC\u8F66\u524A\u52A0\u5DE5"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "\u8868\u9762\u5904\u7406\u670D\u52A1"
            }
          }
        ]
      }
    }
  } }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gray-50 py-12"> <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"> <!-- Hero Section --> <div class="text-center mb-12"> <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full mb-6"> <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20"> <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path> <path fill-rule="evenodd" d="M4 5a2 2 0 012-2v1a3 3 0 003 3h2a3 3 0 003-3V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zM8 8a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm1 3a1 1 0 100 2h2a1 1 0 100-2H9z" clip-rule="evenodd"></path> </svg> </div> <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
获取专业<span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">CNC制造</span>报价
</h1> <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
简单上传CAD文件，我们的工程师团队将在工作时间内为您提供详细、专业的制造报价和技术建议
</p> <!-- Key Features --> <div class="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12"> <div class="flex flex-col items-center p-4"> <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2"> <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path> </svg> </div> <h3 class="font-semibold text-gray-900 mb-1">工作时间回复</h3> <p class="text-sm text-gray-600 text-center">专业工程师快速响应</p> </div> <div class="flex flex-col items-center p-4"> <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2"> <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20"> <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path> <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd"></path> </svg> </div> <h3 class="font-semibold text-gray-900 mb-1">透明定价</h3> <p class="text-sm text-gray-600 text-center">无隐藏费用，价格清晰</p> </div> <div class="flex flex-col items-center p-4"> <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2"> <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path> </svg> </div> <h3 class="font-semibold text-gray-900 mb-1">质量保证</h3> <p class="text-sm text-gray-600 text-center">严格质检，品质可靠</p> </div> <div class="flex flex-col items-center p-4"> <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-2"> <svg class="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path> </svg> </div> <h3 class="font-semibold text-gray-900 mb-1">专家团队</h3> <p class="text-sm text-gray-600 text-center">资深工程师技术支持</p> </div> </div> </div> <!-- Quote Creation Flow Section --> ${renderComponent($$result2, "QuoteCreationFlow", QuoteCreationFlow, { "client:load": true, "language": "zh", "client:component-hydration": "load", "client:component-path": "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/components/QuoteCreationFlow.tsx", "client:component-export": "default" })} <!-- Additional Info Sections --> <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16"> <!-- Supported Materials --> <div class="bg-white rounded-2xl shadow-sm p-8"> <h2 class="text-2xl font-bold text-gray-900 mb-6">🔧 支持材料</h2> <div class="grid grid-cols-2 gap-4"> <div class="flex items-center p-3 bg-gray-50 rounded-lg"> <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3"> <span class="text-blue-600 text-sm font-bold">Al</span> </div> <div> <div class="font-medium text-gray-900">铝合金</div> <div class="text-sm text-gray-600">6061, 7075</div> </div> </div> <div class="flex items-center p-3 bg-gray-50 rounded-lg"> <div class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3"> <span class="text-gray-600 text-sm font-bold">SS</span> </div> <div> <div class="font-medium text-gray-900">不锈钢</div> <div class="text-sm text-gray-600">304, 316</div> </div> </div> <div class="flex items-center p-3 bg-gray-50 rounded-lg"> <div class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3"> <span class="text-yellow-600 text-sm font-bold">Cu</span> </div> <div> <div class="font-medium text-gray-900">铜合金</div> <div class="text-sm text-gray-600">黄铜, 紫铜</div> </div> </div> <div class="flex items-center p-3 bg-gray-50 rounded-lg"> <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3"> <span class="text-purple-600 text-sm font-bold">Ti</span> </div> <div> <div class="font-medium text-gray-900">钛合金</div> <div class="text-sm text-gray-600">航空级</div> </div> </div> </div> </div> <!-- Process Capabilities --> <div class="bg-white rounded-2xl shadow-sm p-8"> <h2 class="text-2xl font-bold text-gray-900 mb-6">⚙️ 加工能力</h2> <div class="space-y-4"> <div class="flex items-center"> <svg class="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path> </svg> <span class="text-gray-900">CNC铣削加工（3/4/5轴）</span> </div> <div class="flex items-center"> <svg class="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path> </svg> <span class="text-gray-900">CNC车削加工</span> </div> <div class="flex items-center"> <svg class="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path> </svg> <span class="text-gray-900">精密磨削加工</span> </div> <div class="flex items-center"> <svg class="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path> </svg> <span class="text-gray-900">表面处理（阳极氧化、喷涂等）</span> </div> <div class="flex items-center"> <svg class="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path> </svg> <span class="text-gray-900">装配与检测</span> </div> </div> <div class="mt-6 p-4 bg-blue-50 rounded-lg"> <h3 class="font-semibold text-blue-900 mb-2">精度范围</h3> <div class="text-blue-800 text-sm"> <div>• 常规精度: 常规精度要求</div> <div>• 精密加工: 项目定制精度</div> <div>• 超精密: 严格公差要求</div> </div> </div> </div> </div> <!-- FAQ Section --> <div class="bg-white rounded-2xl shadow-sm p-8 mt-12"> <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">❓ 常见问题</h2> <div class="max-w-3xl mx-auto"> <div class="space-y-6"> <div class="border-l-4 border-purple-500 pl-6"> <h3 class="font-semibold text-gray-900 mb-2">报价需要多长时间？</h3> <p class="text-gray-600">我们承诺工作时间内回复专业报价。对于复杂项目，我们会在2小时内告知详细的报价时间安排。</p> </div> <div class="border-l-4 border-purple-500 pl-6"> <h3 class="font-semibold text-gray-900 mb-2">支持哪些CAD文件格式？</h3> <p class="text-gray-600">我们支持STEP (.stp, .step)、IGES (.igs, .iges)、STL、DWG、DXF等主流格式，文件大小限制为50MB。</p> </div> <div class="border-l-4 border-purple-500 pl-6"> <h3 class="font-semibold text-gray-900 mb-2">最小订单数量是多少？</h3> <p class="text-gray-600">我们接受从样品制作（1件）到批量生产的各种订单，没有最小数量限制。</p> </div> <div class="border-l-4 border-purple-500 pl-6"> <h3 class="font-semibold text-gray-900 mb-2">如何保证文件安全？</h3> <p class="text-gray-600">我们采用企业级安全措施保护您的CAD文件，签署保密协议，确保您的设计机密安全。</p> </div> </div> </div> </div> <!-- Contact Section --> <div class="text-center mt-12"> <div class="bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl p-8 text-white"> <h2 class="text-2xl font-bold mb-4">需要更多帮助？</h2> <p class="text-lg mb-6 opacity-90">我们的专业团队随时为您解答技术问题</p> <div class="flex flex-col sm:flex-row justify-center items-center gap-4"> <a href="mailto:hello@geppetto.studio" class="flex items-center text-white hover:text-blue-200"> <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"> <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path> <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path> </svg>
hello@geppetto.studio
</a> <span class="text-white opacity-50 hidden sm:inline">|</span> <a href="tel:+8613511091304" class="flex items-center text-white hover:text-blue-200"> <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"> <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path> </svg>
+86 13511091304
</a> </div> </div> </div> </div> </div> ` })}`;
}, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/zh/create-quote.astro", void 0);

const $$file = "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/zh/create-quote.astro";
const $$url = "/zh/create-quote";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$CreateQuote,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
