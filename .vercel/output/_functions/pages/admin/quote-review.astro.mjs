/* empty css                                    */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as renderScript } from '../../chunks/astro/server_Np7zNMWM.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_3sUPClHz.mjs';
export { renderers } from '../../renderers.mjs';

const $$QuoteReview = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Quote Review Dashboard - Geppetto Admin", "description": "Admin dashboard for reviewing and optimizing customer quotes" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gray-50 py-8"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <!-- Header --> <div class="bg-white rounded-lg shadow-sm p-6 mb-8"> <h1 class="text-2xl font-bold text-gray-900 mb-2">报价审核系统</h1> <p class="text-gray-600">第二轮专家优化价格审核和调整</p> <!-- Stats --> <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6"> <div class="bg-blue-50 p-4 rounded-lg"> <div class="text-2xl font-bold text-blue-600">12</div> <div class="text-sm text-blue-800">待审核报价</div> </div> <div class="bg-yellow-50 p-4 rounded-lg"> <div class="text-2xl font-bold text-yellow-600">8</div> <div class="text-sm text-yellow-800">审核中报价</div> </div> <div class="bg-green-50 p-4 rounded-lg"> <div class="text-2xl font-bold text-green-600">35</div> <div class="text-sm text-green-800">已完成审核</div> </div> <div class="bg-purple-50 p-4 rounded-lg"> <div class="text-2xl font-bold text-purple-600">87%</div> <div class="text-sm text-purple-800">平均优化率</div> </div> </div> </div> <!-- Filters --> <div class="bg-white rounded-lg shadow-sm p-6 mb-8"> <div class="flex flex-wrap gap-4"> <select class="border border-gray-300 rounded-lg px-3 py-2"> <option value="">全部状态</option> <option value="pending">待审核</option> <option value="reviewing">审核中</option> <option value="optimized">已优化</option> </select> <select class="border border-gray-300 rounded-lg px-3 py-2"> <option value="">全部材料</option> <option value="aluminum-6061">6061铝合金</option> <option value="aluminum-7075">7075铝合金</option> <option value="stainless-304">304不锈钢</option> <option value="stainless-316">316不锈钢</option> </select> <input type="text" placeholder="搜索客户邮箱或报价ID" class="border border-gray-300 rounded-lg px-3 py-2 flex-1 min-w-64"> <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
搜索
</button> </div> </div> <!-- Quotes List --> <div class="space-y-4" id="quotes-list"> <!-- Quote Item Template --> <div class="bg-white rounded-lg shadow-sm p-6 quote-item" data-quote-id="Q1724720001"> <div class="flex justify-between items-start mb-4"> <div> <h3 class="text-lg font-semibold text-gray-900">报价 #Q1724720001</h3> <p class="text-sm text-gray-600">客户: john@example.com | 提交时间: 2024-08-26 14:30</p> </div> <div class="flex items-center gap-2"> <span class="px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">待审核</span> <span class="px-3 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">紧急</span> </div> </div> <!-- Product Info --> <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"> <div> <h4 class="font-medium text-gray-900 mb-2">产品信息</h4> <div class="text-sm text-gray-600 space-y-1"> <div>文件: bracket_assembly.step</div> <div>材料: 6061铝合金</div> <div>表面处理: 阳极氧化</div> <div>数量: 50件</div> <div>预估重量: 2.5kg</div> </div> </div> <div> <h4 class="font-medium text-gray-900 mb-2">市场锚点价</h4> <div class="text-sm text-gray-600 space-y-1"> <div>合作伙伴成本: $450</div> <div>物流成本: $120</div> <div>服务费: $50</div> <div>标准利润率: 100%</div> <div class="font-semibold text-lg text-blue-600">总计: $1,190</div> </div> </div> <div> <h4 class="font-medium text-gray-900 mb-2">优化建议</h4> <div class="text-sm text-gray-600 space-y-1"> <div>CAD复杂度: 中等</div> <div>制造难度: 标准</div> <div>批量优势: 是</div> <div>材料利用率: 85%</div> <div>建议调整: -15%</div> </div> </div> </div> <!-- Action Buttons --> <div class="flex justify-between items-center pt-4 border-t border-gray-200"> <div class="flex gap-2"> <button class="text-blue-600 hover:text-blue-800 text-sm font-medium" onclick="viewCADFiles('Q1724720001')">
查看CAD文件
</button> <button class="text-green-600 hover:text-green-800 text-sm font-medium" onclick="viewHistory('Q1724720001')">
查看历史报价
</button> </div> <div class="flex gap-2"> <button class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200" onclick="assignToOther('Q1724720001')">
分配给其他专家
</button> <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700" onclick="startReview('Q1724720001')">
开始审核
</button> </div> </div> </div> <!-- More Quote Items --> <div class="bg-white rounded-lg shadow-sm p-6 quote-item" data-quote-id="Q1724720002"> <div class="flex justify-between items-start mb-4"> <div> <h3 class="text-lg font-semibold text-gray-900">报价 #Q1724720002</h3> <p class="text-sm text-gray-600">客户: sarah@company.com | 提交时间: 2024-08-26 13:15</p> </div> <div class="flex items-center gap-2"> <span class="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">审核中</span> <span class="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">标准</span> </div> </div> <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"> <div> <h4 class="font-medium text-gray-900 mb-2">产品信息</h4> <div class="text-sm text-gray-600 space-y-1"> <div>文件: housing_v2.stp</div> <div>材料: 304不锈钢</div> <div>表面处理: 抛光</div> <div>数量: 20件</div> <div>预估重量: 1.8kg</div> </div> </div> <div> <h4 class="font-medium text-gray-900 mb-2">市场锚点价</h4> <div class="text-sm text-gray-600 space-y-1"> <div>合作伙伴成本: $680</div> <div>物流成本: $95</div> <div>服务费: $50</div> <div>标准利润率: 100%</div> <div class="font-semibold text-lg text-blue-600">总计: $1,650</div> </div> </div> <div> <h4 class="font-medium text-gray-900 mb-2">优化建议</h4> <div class="text-sm text-gray-600 space-y-1"> <div>CAD复杂度: 高</div> <div>制造难度: 困难</div> <div>批量优势: 否</div> <div>材料利用率: 70%</div> <div>建议调整: +5%</div> </div> </div> </div> <div class="flex justify-between items-center pt-4 border-t border-gray-200"> <div class="flex gap-2"> <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">
查看CAD文件
</button> <button class="text-green-600 hover:text-green-800 text-sm font-medium">
查看历史报价
</button> </div> <div class="flex gap-2"> <button class="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700" onclick="continueReview('Q1724720002')">
继续审核
</button> </div> </div> </div> </div> </div> </div>  <div id="quote-modal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50"> <div class="flex items-center justify-center min-h-screen p-4"> <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto"> <div class="p-6" id="modal-content"> <!-- Modal content will be loaded here --> </div> </div> </div> </div> ${renderScript($$result2, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/admin/quote-review.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/admin/quote-review.astro", void 0);

const $$file = "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/admin/quote-review.astro";
const $$url = "/admin/quote-review";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$QuoteReview,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
