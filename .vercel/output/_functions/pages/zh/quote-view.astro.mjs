/* empty css                                    */
import { c as createComponent, r as renderComponent, b as renderScript, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_Np7zNMWM.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_3sUPClHz.mjs';
export { renderers } from '../../renderers.mjs';

const $$QuoteView = createComponent(($$result, $$props, $$slots) => {
  const mockQuoteData = {
    quoteId: "Q1730875234567",
    timestamp: "2024-11-06T10:30:00Z",
    validUntil: "2024-11-13T10:30:00Z",
    files: [
      {
        name: "bracket_assembly.step",
        size: 2048576,
        dimensions: {
          length: 150,
          width: 80,
          height: 25
        },
        volume: 300,
        complexity: "\u4E2D\u7B49",
        material: "6061\u94DD\u5408\u91D1",
        quantity: 5
      }
    ],
    pricing: {
      // 价格明细breakdown
      priceBreakdown: {
        engineeringSetup: 65,
        // 一次性工程与设置费
        materialCost: 285,
        // 材料费 (6061铝合金)
        manufacturingService: 960,
        // 加工与品控服务
        shipping: 8,
        // 国际运费
        unitProductionCost: 1245
        // 单件生产成本 (材料+加工)
      },
      total: 1318,
      savings: 882},
    manufacturing: {
      shippingOptions: [
        { method: "\u987A\u4E30\u901F\u8FD0", time: "1-2\u5929", cost: 25 },
        { method: "\u90AE\u653FEMS", time: "2-3\u5929", cost: 15 },
        { method: "\u4E09\u901A\u4E00\u8FBE", time: "3-5\u5929", cost: 10 }
      ],
      precision: "\u9879\u76EE\u5B9A\u5236\u7CBE\u5EA6",
      processes: ["CNC\u94E3\u524A", "\u9633\u6781\u6C27\u5316", "\u8D28\u91CF\u68C0\u6D4B"]},
    guarantees: {
      priceAccuracy: "\xB13%",
      productionCompensation: "\u751F\u4EA7\u5EF6\u671F\u8D54\u4ED810%",
      qualityAssurance: "\u4E0D\u5408\u683C100%\u91CD\u505A"
    }
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `\u62A5\u4EF7\u8BE6\u60C5 ${mockQuoteData.quoteId} | \u900F\u660E\u5236\u9020\u62A5\u4EF7 | Geppetto`, "description": `\u67E5\u770B\u8BE6\u7EC6\u7684CNC\u5236\u9020\u62A5\u4EF7\uFF0C\u5305\u542B\u5B8C\u6574\u6210\u672C\u5206\u89E3\u548C\u4EA4\u4ED8\u627F\u8BFA\u3002\u62A5\u4EF7\u7F16\u53F7\uFF1A${mockQuoteData.quoteId}`, "keywords": ["\u62A5\u4EF7\u8BE6\u60C5", "\u5236\u9020\u62A5\u4EF7", "CNC\u62A5\u4EF7\u67E5\u770B", "\u900F\u660E\u5B9A\u4EF7", "\u6210\u672C\u5206\u89E3"], "ogImage": "/images/og-quote-view-zh.jpg" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen bg-gray-50 py-8"> <div class="container mx-auto px-6"> <div class="max-w-6xl mx-auto"> <!-- 报价标题区域 --> <div class="bg-white rounded-lg shadow-sm p-6 mb-6"> <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4"> <div> <h1 class="text-3xl font-bold text-[#111827] mb-2">
透明制造报价
</h1> <p class="text-lg text-gray-600">
报价编号：<span class="font-mono text-[#7F00FF]">${mockQuoteData.quoteId}</span> </p> </div> <div class="mt-4 md:mt-0"> <div class="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium">
专家审核完成
</div> </div> </div> <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600"> <div> <span class="font-medium">生成时间：</span> ${new Date(mockQuoteData.timestamp).toLocaleString("zh-CN")} </div> <div> <span class="font-medium">有效期至：</span> ${new Date(mockQuoteData.validUntil).toLocaleString("zh-CN")} </div> <div> <span class="font-medium">报价状态：</span> <span class="text-[#7F00FF] font-semibold">AI评估 → 专家审核完成</span> </div> </div> </div> <!-- 核心数据展示 --> <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6"> <!-- 总价 --> <div class="bg-white rounded-lg shadow-sm p-6 border-l-4 border-[#7F00FF]"> <div class="text-center"> <div class="text-3xl font-bold text-[#111827] mb-2">
¥${mockQuoteData.pricing.total.toLocaleString()} </div> <div class="text-gray-600 text-sm">总报价</div> <div class="text-green-600 text-sm mt-2">
相比市场价节省 ¥${mockQuoteData.pricing.savings.toLocaleString()} </div> </div> </div> <!-- 生产时间 --> <div class="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500"> <div class="text-center"> <div class="text-3xl font-bold text-blue-600 mb-2">
72小时
</div> <div class="text-gray-600 text-sm">生产完成时间</div> <div class="text-blue-600 text-sm mt-2">
生产延期赔付10%
</div> </div> </div> <!-- 精度保证 --> <div class="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500"> <div class="text-center"> <div class="text-lg font-bold text-green-600 mb-2"> ${mockQuoteData.manufacturing.precision} </div> <div class="text-gray-600 text-sm">加工精度</div> <div class="text-green-600 text-sm mt-2">
不合格100%重做
</div> </div> </div> </div> <!-- 物流选项 --> <div class="bg-white rounded-lg shadow-sm p-6 mb-6"> <h2 class="text-xl font-bold text-[#111827] mb-4">物流配送选项</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"> ${mockQuoteData.manufacturing.shippingOptions.map((option, index) => renderTemplate`<div class="border border-gray-200 rounded-lg p-4 hover:border-[#7F00FF] cursor-pointer transition-colors"> <div class="flex items-center justify-between mb-2"> <h3 class="font-semibold text-[#111827]">${option.method}</h3> <span class="text-[#7F00FF] font-bold">¥${option.cost}</span> </div> <div class="text-sm text-gray-600">
预计 ${option.time} 送达
</div> <div class="text-xs text-gray-500 mt-2"> ${index === 0 ? "\u63A8\u8350\u9009\u62E9" : index === 1 ? "\u7ECF\u6D4E\u5B9E\u60E0" : "\u6807\u51C6\u914D\u9001"} </div> </div>`)} </div> <div class="mt-4 p-3 bg-blue-50 rounded-lg"> <div class="text-sm text-blue-800"> <strong>说明：</strong>我们保证72小时内完成生产并发货，物流时间由快递公司负责。
              如生产超时，自动赔付订单金额10%。
</div> </div> </div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"> <!-- 文件信息 --> <div class="bg-white rounded-lg shadow-sm p-6"> <h2 class="text-xl font-bold text-[#111827] mb-4">文件信息</h2> ${mockQuoteData.files.map((file) => renderTemplate`<div class="border border-gray-200 rounded-lg p-4 mb-4"> <div class="flex items-center justify-between mb-3"> <div class="font-semibold text-[#111827]">${file.name}</div> <div class="text-sm text-gray-500"> ${(file.size / 1024 / 1024).toFixed(1)} MB
</div> </div> <div class="grid grid-cols-2 gap-4 text-sm"> <div> <div class="text-gray-600">尺寸 (mm)</div> <div class="font-medium"> ${file.dimensions.length} × ${file.dimensions.width} × ${file.dimensions.height} </div> </div> <div> <div class="text-gray-600">体积</div> <div class="font-medium">${file.volume} cm³</div> </div> <div> <div class="text-gray-600">材料</div> <div class="font-medium">${file.material}</div> </div> <div> <div class="text-gray-600">数量</div> <div class="font-medium">${file.quantity} 件</div> </div> </div> </div>`)} </div> <!-- 价格明细 --> <div class="bg-white rounded-lg shadow-sm p-6"> <h2 class="text-xl font-bold text-[#111827] mb-2">价格明细</h2> <p class="text-sm text-gray-600 mb-6">透明的成本分解 - 每项费用清晰明了</p> <div class="space-y-4"> <!-- 一次性工程与设置费 --> <div class="border border-gray-200 rounded-lg p-4 bg-gray-50"> <div class="flex justify-between items-center"> <div> <h3 class="font-bold text-gray-900">一次性工程与设置费</h3> <p class="text-xs text-gray-600 mt-1">CAM编程、机床设置、首件检验等一次性工作</p> </div> <div class="text-lg font-bold text-[#7F00FF]">¥${mockQuoteData.pricing.priceBreakdown.engineeringSetup}</div> </div> </div> <!-- 国际运费 --> <div class="border border-gray-200 rounded-lg p-4 bg-gray-50"> <div class="flex justify-between items-center"> <div> <h3 class="font-bold text-gray-900">国际运费</h3> <p class="text-xs text-gray-600 mt-1">透明的第三方物流成本</p> </div> <div class="text-lg font-bold text-[#7F00FF]">¥${mockQuoteData.pricing.priceBreakdown.shipping}</div> </div> </div> <!-- 单件生产成本 --> <div class="border-2 border-purple-200 rounded-lg p-4 bg-purple-50"> <div class="flex justify-between items-center mb-3"> <div> <h3 class="font-bold text-purple-900">单件生产成本</h3> <p class="text-xs text-purple-700 mt-1">材料费 + 加工与品控服务</p> </div> <div class="text-xl font-bold text-purple-700">¥${mockQuoteData.pricing.priceBreakdown.unitProductionCost}</div> </div> <!-- 单件生产成本明细 --> <div class="ml-4 space-y-2 border-l-2 border-purple-300 pl-4"> <div class="flex justify-between items-center"> <div> <span class="text-sm font-medium text-purple-800">材料费</span> <p class="text-xs text-purple-600 mt-1">6061铝合金（最常用）</p> </div> <span class="text-sm font-semibold text-purple-700">¥${mockQuoteData.pricing.priceBreakdown.materialCost}</span> </div> <div class="flex justify-between items-center"> <div> <span class="text-sm font-medium text-purple-800">加工与品控服务</span> <p class="text-xs text-purple-600 mt-1">CNC加工、表面处理、质量检验、包装处理</p> </div> <span class="text-sm font-semibold text-purple-700">¥${mockQuoteData.pricing.priceBreakdown.manufacturingService}</span> </div> </div> </div> <!-- 报价总计 --> <div class="flex justify-between items-center py-6 bg-gradient-to-r from-[#7F00FF] to-purple-700 rounded-lg px-6 mt-6 text-white"> <div> <div class="text-xl font-bold">报价总计</div> <div class="text-sm text-purple-100">透明定价 + 专业服务</div> </div> <div class="text-3xl font-bold">¥${mockQuoteData.pricing.total}</div> </div> <!-- 价值优势说明 --> <div class="bg-gray-50 rounded-lg p-4 mt-4"> <h4 class="font-bold text-gray-800 mb-2">为什么选择我们的透明定价？</h4> <div class="text-sm text-gray-700 space-y-1"> <p>• <strong>透明成本</strong>：每项费用清晰明了，没有隐藏费用</p> <p>• <strong>专业保障</strong>：8小时AI辅助专家审核 vs 行业2-7天标准</p> <p>• <strong>品质承诺</strong>：项目定制精度标准，不合格100%重做</p> <p>• <strong>合理定价</strong>：一次性费用合理分摊，长期合作更优惠</p> </div> </div> </div> </div> </div> <!-- 制造详情 --> <div class="bg-white rounded-lg shadow-sm p-6 mt-6"> <h2 class="text-xl font-bold text-[#111827] mb-4">制造工艺详情</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <div> <h3 class="font-semibold text-[#111827] mb-3">加工工序</h3> <div class="space-y-2"> ${mockQuoteData.manufacturing.processes.map((process, index) => renderTemplate`<div class="flex items-center"> <div class="w-6 h-6 bg-[#7F00FF] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3"> ${index + 1} </div> <span class="text-gray-700">${process}</span> </div>`)} </div> </div> <div> <h3 class="font-semibold text-[#111827] mb-3">质量保证</h3> <div class="space-y-2"> <div class="flex items-center"> <span class="text-green-500 mr-2">•</span> <span class="text-gray-700">首件检验确认</span> </div> <div class="flex items-center"> <span class="text-green-500 mr-2">•</span> <span class="text-gray-700">过程质量监控</span> </div> <div class="flex items-center"> <span class="text-green-500 mr-2">•</span> <span class="text-gray-700">成品全检出厂</span> </div> <div class="flex items-center"> <span class="text-green-500 mr-2">•</span> <span class="text-gray-700">7天售后保障</span> </div> </div> </div> </div> </div> <!-- 核心承诺 --> <div class="bg-gradient-to-r from-[#7F00FF] to-purple-700 rounded-lg shadow-sm p-6 mt-6 text-white"> <h2 class="text-xl font-bold mb-4">Geppetto核心承诺</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-6"> <div class="text-center"> <div class="text-2xl font-bold mb-2">${mockQuoteData.guarantees.priceAccuracy}</div> <div class="text-purple-100">价格精度保证</div> </div> <div class="text-center"> <div class="text-lg font-bold mb-2">${mockQuoteData.guarantees.productionCompensation}</div> <div class="text-purple-100">生产时间承诺</div> </div> <div class="text-center"> <div class="text-lg font-bold mb-2">${mockQuoteData.guarantees.qualityAssurance}</div> <div class="text-purple-100">品质保证承诺</div> </div> </div> </div> <!-- 操作按钮 --> <div class="flex flex-col sm:flex-row gap-4 justify-center mt-8"> <button id="confirm-order-btn" class="bg-[#7F00FF] text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-purple-700 transition-colors duration-200">
确认订单
</button> <button id="download-quote-btn" class="border-2 border-[#7F00FF] text-[#7F00FF] px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#7F00FF] hover:text-white transition-colors duration-200">
下载报价单
</button> <button id="contact-expert-btn" class="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
咨询专家
</button> </div> <!-- 有效期提醒 --> <div class="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-6 text-center"> <div class="text-orange-800"> <span class="font-medium">报价有效期：</span>
本报价单有效期至 ${new Date(mockQuoteData.validUntil).toLocaleString("zh-CN")}，
            请在有效期内确认订单以享受当前价格。
</div> </div> </div> </div> </main> ` })} ${renderScript($$result, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/zh/quote-view.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/zh/quote-view.astro", void 0);

const $$file = "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/zh/quote-view.astro";
const $$url = "/zh/quote-view";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$QuoteView,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
