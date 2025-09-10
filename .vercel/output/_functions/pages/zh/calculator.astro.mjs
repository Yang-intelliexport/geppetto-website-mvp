/* empty css                                    */
import { d as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, b as renderScript, a as renderTemplate, r as renderComponent, aq as renderTransition } from '../../chunks/astro/server_Np7zNMWM.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_3sUPClHz.mjs';
import 'clsx';
/* empty css                                         */
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://geppetto.studio");
const $$CostCalculatorWidget = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CostCalculatorWidget;
  const { className = "", initialValues = {} } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div id="cost-calculator-widget"${addAttribute(`cost-calculator-container ${className}`, "class")} data-astro-cid-ivsn2mit> <!-- 计算器表单UI --> <form id="cost-calculator-form" class="space-y-6" data-astro-cid-ivsn2mit> <!-- 项目基本信息 --> <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6" data-astro-cid-ivsn2mit> <h3 class="text-xl font-bold text-gray-800 mb-6 flex items-center" data-astro-cid-ivsn2mit>
📐 项目信息
</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-astro-cid-ivsn2mit> <div class="md:col-span-2" data-astro-cid-ivsn2mit> <label for="project-name" class="block text-sm font-semibold text-gray-700 mb-2" data-astro-cid-ivsn2mit>
项目名称
</label> <input type="text" id="project-name"${addAttribute(initialValues.projectName || "", "value")} class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300" placeholder="请输入项目名称" data-astro-cid-ivsn2mit> </div> <div data-astro-cid-ivsn2mit> <label for="quantity" class="block text-sm font-semibold text-gray-700 mb-2" data-astro-cid-ivsn2mit>
数量
</label> <input type="number" id="quantity"${addAttribute(initialValues.quantity || 1, "value")} min="1" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300" placeholder="1" data-astro-cid-ivsn2mit> </div> </div> </div> <!-- 尺寸信息 --> <div class="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6" data-astro-cid-ivsn2mit> <h3 class="text-xl font-bold text-gray-800 mb-6 flex items-center" data-astro-cid-ivsn2mit>
📏 零件尺寸 (mm)
</h3> <div class="grid grid-cols-1 md:grid-cols-3 gap-4" data-astro-cid-ivsn2mit> <div data-astro-cid-ivsn2mit> <label for="length" class="block text-sm font-semibold text-gray-700 mb-2" data-astro-cid-ivsn2mit>
长度 (L)
</label> <input type="number" id="length"${addAttribute(initialValues.length || 100, "value")} step="0.1" min="0.1" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300" placeholder="100" data-astro-cid-ivsn2mit> </div> <div data-astro-cid-ivsn2mit> <label for="width" class="block text-sm font-semibold text-gray-700 mb-2" data-astro-cid-ivsn2mit>
宽度 (W)
</label> <input type="number" id="width"${addAttribute(initialValues.width || 50, "value")} step="0.1" min="0.1" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300" placeholder="50" data-astro-cid-ivsn2mit> </div> <div data-astro-cid-ivsn2mit> <label for="thickness" class="block text-sm font-semibold text-gray-700 mb-2" data-astro-cid-ivsn2mit>
厚度 (T)
</label> <input type="number" id="thickness"${addAttribute(initialValues.thickness || 10, "value")} step="0.1" min="0.1" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300" placeholder="10" data-astro-cid-ivsn2mit> </div> </div> </div> <!-- 材料选择 --> <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6" data-astro-cid-ivsn2mit> <h3 class="text-xl font-bold text-gray-800 mb-6 flex items-center" data-astro-cid-ivsn2mit>
🔧 材料规格
</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-astro-cid-ivsn2mit> <div data-astro-cid-ivsn2mit> <label for="material-type" class="block text-sm font-semibold text-gray-700 mb-2" data-astro-cid-ivsn2mit>
材料类型
</label> <select id="material-type" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300" data-astro-cid-ivsn2mit> <option value="aluminum" data-astro-cid-ivsn2mit>铝合金</option> <option value="steel" data-astro-cid-ivsn2mit>不锈钢</option> <option value="titanium" data-astro-cid-ivsn2mit>钛合金</option> <option value="brass" data-astro-cid-ivsn2mit>黄铜</option> <option value="plastic" data-astro-cid-ivsn2mit>工程塑料</option> </select> </div> <div data-astro-cid-ivsn2mit> <label for="material-grade" class="block text-sm font-semibold text-gray-700 mb-2" data-astro-cid-ivsn2mit>
牌号规格
</label> <select id="material-grade" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300" data-astro-cid-ivsn2mit> <option value="6061-t6" data-astro-cid-ivsn2mit>6061-T6</option> <option value="7075-t6" data-astro-cid-ivsn2mit>7075-T6</option> <option value="2024-t3" data-astro-cid-ivsn2mit>2024-T3</option> </select> </div> </div> </div> <!-- 加工要求 --> <div class="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6" data-astro-cid-ivsn2mit> <h3 class="text-xl font-bold text-gray-800 mb-6 flex items-center" data-astro-cid-ivsn2mit>
⚙️ 加工要求
</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-astro-cid-ivsn2mit> <div data-astro-cid-ivsn2mit> <label for="tolerance-level" class="block text-sm font-semibold text-gray-700 mb-2" data-astro-cid-ivsn2mit>
公差等级
</label> <select id="tolerance-level" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300" data-astro-cid-ivsn2mit> <option value="standard" data-astro-cid-ivsn2mit>Standard (General tolerance requirements)</option> <option value="high" data-astro-cid-ivsn2mit>Precision (Project-customized precision)</option> <option value="ultra" data-astro-cid-ivsn2mit>Ultra-precision (Strict tolerance standards)</option> <option value="extreme" data-astro-cid-ivsn2mit>Extreme (Maximum precision standards)</option> </select> </div> <div data-astro-cid-ivsn2mit> <label for="complexity" class="block text-sm font-semibold text-gray-700 mb-2" data-astro-cid-ivsn2mit>
复杂程度
</label> <select id="complexity" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300" data-astro-cid-ivsn2mit> <option value="simple" data-astro-cid-ivsn2mit>简单 (基础几何)</option> <option value="medium" data-astro-cid-ivsn2mit>中等 (多特征)</option> <option value="complex" data-astro-cid-ivsn2mit>复杂 (精密特征)</option> <option value="very-complex" data-astro-cid-ivsn2mit>极复杂 (超精密)</option> </select> </div> <div data-astro-cid-ivsn2mit> <label for="surface-finish" class="block text-sm font-semibold text-gray-700 mb-2" data-astro-cid-ivsn2mit>
表面处理
</label> <select id="surface-finish" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300" data-astro-cid-ivsn2mit> <option value="none" data-astro-cid-ivsn2mit>无需处理</option> <option value="anodizing" data-astro-cid-ivsn2mit>阳极氧化</option> <option value="powder-coating" data-astro-cid-ivsn2mit>喷粉涂装</option> <option value="plating" data-astro-cid-ivsn2mit>电镀处理</option> <option value="polishing" data-astro-cid-ivsn2mit>抛光处理</option> </select> </div> <div data-astro-cid-ivsn2mit> <label for="delivery-time" class="block text-sm font-semibold text-gray-700 mb-2" data-astro-cid-ivsn2mit>
交付要求
</label> <select id="delivery-time" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300" data-astro-cid-ivsn2mit> <option value="standard" data-astro-cid-ivsn2mit>标准交付 (7-10天)</option> <option value="fast" data-astro-cid-ivsn2mit>快速交付 (3-5天)</option> <option value="express" data-astro-cid-ivsn2mit>加急交付 (1-2天)</option> <option value="immediate" data-astro-cid-ivsn2mit>极速交付 (工作时间)</option> </select> </div> </div> </div> <!-- 质量认证 --> <div class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6" data-astro-cid-ivsn2mit> <h3 class="text-xl font-bold text-gray-800 mb-6 flex items-center" data-astro-cid-ivsn2mit>
📜 质量认证
</h3> <div class="grid grid-cols-1 md:grid-cols-3 gap-4" data-astro-cid-ivsn2mit> <label class="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-indigo-50 transition-colors cursor-pointer" data-astro-cid-ivsn2mit> <input type="checkbox" id="iso9001" class="form-checkbox text-indigo-600" data-astro-cid-ivsn2mit> <span class="text-sm font-medium text-gray-700" data-astro-cid-ivsn2mit>ISO 9001 质量管理</span> </label> <label class="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-indigo-50 transition-colors cursor-pointer" data-astro-cid-ivsn2mit> <input type="checkbox" id="as9100" class="form-checkbox text-indigo-600" data-astro-cid-ivsn2mit> <span class="text-sm font-medium text-gray-700" data-astro-cid-ivsn2mit>AS 9100 航空航天</span> </label> <label class="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-indigo-50 transition-colors cursor-pointer" data-astro-cid-ivsn2mit> <input type="checkbox" id="quality_certifications" class="form-checkbox text-indigo-600" data-astro-cid-ivsn2mit> <span class="text-sm font-medium text-gray-700" data-astro-cid-ivsn2mit>quality certifications 医疗器械</span> </label> </div> </div> <!-- 计算按钮 --> <div class="flex justify-center" data-astro-cid-ivsn2mit> <button type="button" id="calculate-cost" class="px-12 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-2xl hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-2xl" data-astro-cid-ivsn2mit>
🧮 智能成本分析
</button> </div> </form> <!-- 计算结果显示区域 --> <div id="calculation-results" class="hidden mt-8" data-astro-cid-ivsn2mit> <!-- 结果内容将通过JavaScript动态生成 --> </div> <!-- 错误提示 --> <div id="error-message" class="hidden mt-4 p-4 bg-red-50 border border-red-200 rounded-lg" data-astro-cid-ivsn2mit> <div class="flex items-center" data-astro-cid-ivsn2mit> <svg class="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20" data-astro-cid-ivsn2mit> <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" data-astro-cid-ivsn2mit></path> </svg> <span id="error-text" class="text-red-700 font-medium" data-astro-cid-ivsn2mit></span> </div> </div> </div> ${renderScript($$result, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/components/islands/CostCalculatorWidget.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/components/islands/CostCalculatorWidget.astro", void 0);

const $$Calculator = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "\u6210\u672C\u8BA1\u7B97\u5668 | Geppetto - \u7CBE\u5BC6\u5236\u9020\u6210\u672C\u4F30\u7B97\u5DE5\u5177", "description": "\u4F7F\u7528Geppetto\u6210\u672C\u8BA1\u7B97\u5668\uFF0C\u5FEB\u901F\u4F30\u7B97\u60A8\u7684\u7CBE\u5BC6\u5236\u9020\u9879\u76EE\u6210\u672C\u3002\u652F\u6301\u591A\u79CD\u6750\u6599\u3001\u5DE5\u827A\u548C\u6279\u91CF\uFF0C\u63D0\u4F9B\u8BE6\u7EC6\u7684\u6210\u672C\u5206\u89E3\u548C\u5BF9\u6BD4\u5206\u6790\uFF0C\u5E2E\u52A9\u60A8\u505A\u51FA\u660E\u667A\u7684\u5236\u9020\u51B3\u7B56\u3002" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen"> <!-- Hero Section --> <section class="bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 text-white py-20"${addAttribute(renderTransition($$result2, "u5natw3q", "slide", "hero-section"), "data-astro-transition-scope")}> <div class="container mx-auto px-6"> <div class="max-w-4xl mx-auto text-center"> <h1 class="text-5xl font-bold mb-6">
🧮 成本计算器
</h1> <p class="text-2xl text-blue-100 mb-8">
快速评估您的精密制造项目成本，获得透明详细的价格分析
</p> <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6"> <div class="grid grid-cols-1 md:grid-cols-3 gap-6"> <div class="text-center"> <div class="text-3xl font-bold text-yellow-300 mb-2">3秒</div> <div class="text-sm text-blue-200">快速计算</div> </div> <div class="text-center"> <div class="text-3xl font-bold text-yellow-300 mb-2">50+</div> <div class="text-sm text-blue-200">材料选择</div> </div> <div class="text-center"> <div class="text-3xl font-bold text-yellow-300 mb-2">±5%</div> <div class="text-sm text-blue-200">精度保证</div> </div> </div> </div> </div> </div> </section> <!-- 计算器主体 - Island组件 --> <section class="py-20 bg-gray-50"${addAttribute(renderTransition($$result2, "px74thpz", "fade", "calculator-section"), "data-astro-transition-scope")}> <div class="container mx-auto px-6"> <div class="max-w-7xl mx-auto"> <!-- 使用CostCalculatorWidget Island组件 --> ${renderComponent($$result2, "CostCalculatorWidget", $$CostCalculatorWidget, {})} </div> </div> </section> <!-- 优势展示 --> <section class="py-16 bg-white"${addAttribute(renderTransition($$result2, "cz2p7ahq", "slide", "advantages-section"), "data-astro-transition-scope")}> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-12"> <h2 class="text-3xl font-bold text-gray-900 mb-4">
为什么选择Geppetto成本计算器？
</h2> <p class="text-xl text-gray-600">
基于真实项目数据训练的智能算法，为您提供最准确的成本预估
</p> </div> <div class="grid grid-cols-1 md:grid-cols-3 gap-8"> <div class="text-center p-6"> <div class="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
🎯
</div> <h3 class="text-xl font-bold text-gray-900 mb-3">精度保证</h3> <p class="text-gray-600">基于1000+实际项目数据，预估精度达到±5%，为您的预算规划提供可靠依据</p> </div> <div class="text-center p-6"> <div class="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
⚡
</div> <h3 class="text-xl font-bold text-gray-900 mb-3">极速计算</h3> <p class="text-gray-600">AI驱动的智能算法，3秒内完成复杂成本分析，支持多种材料和工艺组合</p> </div> <div class="text-center p-6"> <div class="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
💎
</div> <h3 class="text-xl font-bold text-gray-900 mb-3">透明分解</h3> <p class="text-gray-600">详细的成本分解，包含材料、加工、表面处理等所有费用项目，让您明明白白消费</p> </div> </div> </div> </section> <!-- FAQ段 --> <section class="py-16 bg-gray-50"${addAttribute(renderTransition($$result2, "t27rhtif", "fade", "faq-section"), "data-astro-transition-scope")}> <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-12"> <h2 class="text-3xl font-bold text-gray-900 mb-4">常见问题</h2> <p class="text-xl text-gray-600">关于成本计算器的常见疑问解答</p> </div> <div class="space-y-6"> <div class="bg-white rounded-lg p-6 shadow-sm"> <h3 class="text-lg font-semibold text-gray-900 mb-2">计算结果的准确性如何？</h3> <p class="text-gray-600">我们的算法基于1000+真实项目数据训练，考虑了材料价格波动、工艺复杂度等因素，预估精度可达±5%。</p> </div> <div class="bg-white rounded-lg p-6 shadow-sm"> <h3 class="text-lg font-semibold text-gray-900 mb-2">支持哪些材料和工艺？</h3> <p class="text-gray-600">支持50+种常用材料，包括各种铝合金、不锈钢、钛合金等，涵盖铣削、车削、表面处理等主要工艺。</p> </div> <div class="bg-white rounded-lg p-6 shadow-sm"> <h3 class="text-lg font-semibold text-gray-900 mb-2">计算结果可以保存吗？</h3> <p class="text-gray-600">可以保存计算历史，方便后续查看和对比。同时支持导出报告，便于项目预算制定。</p> </div> </div> </div> </section> <!-- CTA区域 --> <section class="py-20 bg-gradient-to-r from-purple-600 to-blue-500"${addAttribute(renderTransition($$result2, "mjzsosig", "slide", "cta-section"), "data-astro-transition-scope")}> <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8"> <h2 class="text-3xl font-bold text-white mb-6">
准备获取精确报价？
</h2> <p class="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
计算器只是开始，上传您的CAD文件获得专业工程师的详细报价和技术建议
</p> <div class="flex flex-col sm:flex-row gap-4 justify-center"> <a href="/zh/create-quote" class="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-lg">
📄 上传文件获取报价
</a> <a href="/zh/contact" class="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-purple-600 transition-colors duration-200">
💬 联系技术专家
</a> </div> </div> </section> </main> ` })}`;
}, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/zh/calculator.astro", "self");

const $$file = "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/zh/calculator.astro";
const $$url = "/zh/calculator";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Calculator,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
