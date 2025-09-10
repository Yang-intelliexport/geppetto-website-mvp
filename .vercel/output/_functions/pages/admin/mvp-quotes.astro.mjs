/* empty css                                    */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as renderScript } from '../../chunks/astro/server_Np7zNMWM.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_3sUPClHz.mjs';
export { renderers } from '../../renderers.mjs';

const $$MvpQuotes = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "MVP\u62A5\u4EF7\u7BA1\u7406 - \u7BA1\u7406\u540E\u53F0 | Geppetto\u667A\u80FD\u5236\u9020", "description": "MVP\u7248\u672C\u62A5\u4EF7\u7BA1\u7406\u7CFB\u7EDF\uFF0C\u5904\u7406\u5BA2\u6237\u62A5\u4EF7\u7533\u8BF7\uFF0C\u8DDF\u8E2A\u72B6\u6001\uFF0C\u7BA1\u7406\u8BA2\u5355\u6D41\u7A0B" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gray-50"> <!-- Header --> <div class="bg-white shadow-sm border-b"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="flex justify-between items-center py-6"> <div> <h1 class="text-2xl font-bold text-gray-900">MVP报价管理</h1> <p class="text-gray-600">手动驱动型报价系统管理后台</p> </div> <div class="flex items-center space-x-4"> <button onclick="refreshQuotes()" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
刷新数据
</button> <button onclick="exportData()" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
导出数据
</button> </div> </div> </div> </div> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"> <!-- Statistics Cards --> <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"> <div class="bg-white rounded-lg shadow-sm p-6"> <div class="flex items-center"> <div class="flex-shrink-0"> <div class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center"> <svg class="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20"> <path d="M10 2L3 7v11a1 1 0 001 1h3v-8h6v8h3a1 1 0 001-1V7l-7-5z"></path> </svg> </div> </div> <div class="ml-5"> <p class="text-sm font-medium text-gray-500">待处理</p> <p class="text-2xl font-semibold text-gray-900" id="pending-count">-</p> </div> </div> </div> <div class="bg-white rounded-lg shadow-sm p-6"> <div class="flex items-center"> <div class="flex-shrink-0"> <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center"> <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20"> <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> </div> </div> <div class="ml-5"> <p class="text-sm font-medium text-gray-500">审核中</p> <p class="text-2xl font-semibold text-gray-900" id="reviewing-count">-</p> </div> </div> </div> <div class="bg-white rounded-lg shadow-sm p-6"> <div class="flex items-center"> <div class="flex-shrink-0"> <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center"> <svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path> </svg> </div> </div> <div class="ml-5"> <p class="text-sm font-medium text-gray-500">已报价</p> <p class="text-2xl font-semibold text-gray-900" id="quoted-count">-</p> </div> </div> </div> <div class="bg-white rounded-lg shadow-sm p-6"> <div class="flex items-center"> <div class="flex-shrink-0"> <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center"> <svg class="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20"> <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path> </svg> </div> </div> <div class="ml-5"> <p class="text-sm font-medium text-gray-500">今日新增</p> <p class="text-2xl font-semibold text-gray-900" id="today-count">-</p> </div> </div> </div> </div> <!-- Filters and Search --> <div class="bg-white rounded-lg shadow-sm p-6 mb-8"> <div class="flex flex-wrap gap-4 items-center"> <div> <select id="status-filter" class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"> <option value="">全部状态</option> <option value="pending">待处理</option> <option value="reviewing">审核中</option> <option value="quoted">已报价</option> <option value="ordered">已下单</option> <option value="archived">已归档</option> </select> </div> <div> <select id="priority-filter" class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"> <option value="">全部优先级</option> <option value="5">紧急</option> <option value="4">高</option> <option value="3">中等</option> <option value="2">正常</option> <option value="1">低</option> </select> </div> <div> <select id="material-filter" class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"> <option value="">全部材料</option> <option value="aluminum-6061">6061铝合金</option> <option value="aluminum-7075">7075铝合金</option> <option value="stainless-304">304不锈钢</option> <option value="stainless-316">316不锈钢</option> <option value="brass">黄铜</option> <option value="copper">紫铜</option> <option value="titanium">钛合金</option> </select> </div> <div class="flex-1 min-w-64"> <input type="text" id="search-input" placeholder="搜索客户邮箱或公司名称..." class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"> </div> <button onclick="applyFilters()" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
🔍 搜索
</button> <button onclick="resetFilters()" class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
🔄 重置
</button> </div> </div> <!-- Loading State --> <div id="loading-state" class="text-center py-12"> <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div> <p class="text-gray-600 mt-2">加载中...</p> </div> <!-- Quotes Table --> <div id="quotes-container" class="bg-white rounded-lg shadow-sm overflow-hidden hidden"> <div class="overflow-x-auto"> <table class="min-w-full divide-y divide-gray-200"> <thead class="bg-gray-50"> <tr> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
客户信息
</th> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
产品规格
</th> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
状态/优先级
</th> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
提交时间
</th> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
报价信息
</th> <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
操作
</th> </tr> </thead> <tbody id="quotes-list" class="bg-white divide-y divide-gray-200"> <!-- 动态加载内容 --> </tbody> </table> </div> <!-- Pagination --> <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"> <div class="flex-1 flex justify-between sm:hidden"> <button onclick="previousPage()" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
上一页
</button> <button onclick="nextPage()" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
下一页
</button> </div> <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"> <div> <p class="text-sm text-gray-700">
显示第 <span id="page-start" class="font-medium">1</span> 到 <span id="page-end" class="font-medium">10</span> 条，
                共 <span id="total-count" class="font-medium">0</span> 条记录
</p> </div> <div> <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" id="pagination-controls"> <!-- 动态生成分页控件 --> </nav> </div> </div> </div> </div> <!-- Empty State --> <div id="empty-state" class="bg-white rounded-lg shadow-sm p-12 text-center hidden"> <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48"> <path d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A9.971 9.971 0 0124 24c4.004 0 7.625 2.349 9.287 6m-9.287-6c-4.004 0-7.625 2.349-9.287 6m0 0A9.971 9.971 0 0014 32.286" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </svg> <h3 class="mt-2 text-sm font-medium text-gray-900">暂无报价数据</h3> <p class="mt-1 text-sm text-gray-500">当客户提交报价申请时，数据将显示在这里。</p> </div> </div> </div>  <div id="quote-modal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 hidden"> <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white"> <div class="mt-3" id="modal-content"> <!-- 动态加载内容 --> </div> </div> </div> ${renderScript($$result2, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/admin/mvp-quotes.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/admin/mvp-quotes.astro", void 0);

const $$file = "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/admin/mvp-quotes.astro";
const $$url = "/admin/mvp-quotes";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$MvpQuotes,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
