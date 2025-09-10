/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Np7zNMWM.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_3sUPClHz.mjs';
import { s as supabase } from '../chunks/supabase_2zlJawaa.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Admin = createComponent(async ($$result, $$props, $$slots) => {
  let stats = { pending: 0, reviewing: 0, quoted: 0, ordered: 0 };
  try {
    const { data: quotes, error } = await supabase.from("mvp_quotes").select("status").order("created_at", { ascending: false });
    if (!error && quotes) {
      stats = quotes.reduce((acc, quote) => {
        acc[quote.status] = (acc[quote.status] || 0) + 1;
        return acc;
      }, {});
    }
  } catch (error) {
    console.error("Failed to load stats:", error);
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Admin Dashboard - Geppetto CNC Manufacturing", "description": "Geppetto Admin Dashboard for real quote management and order processing" }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", '<div class="min-h-screen bg-gray-50"> <!-- Header --> <div class="bg-white shadow-sm border-b"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="flex justify-between items-center py-6"> <div> <h1 class="text-2xl font-bold text-gray-900">Admin Dashboard</h1> <p class="text-gray-600">\u6781\u7B80\u62A5\u4EF7\u7BA1\u7406\u7CFB\u7EDF - Simple Quote Management</p> </div> <div class="flex items-center space-x-4"> <span class="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">\n\u{1F517} \u76F4\u8FDESupabase\n</span> </div> </div> </div> </div> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"> <!-- Loading State --> <div id="loading-state" class="text-center py-12"> <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div> <p class="text-gray-600 mt-4">Loading data...</p> </div> <!-- Statistics Cards --> <div id="stats-section" class="hidden grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"> <div class="bg-white rounded-lg shadow-sm p-6"> <div class="flex items-center"> <div class="flex-shrink-0"> <div class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">\n\u23F3\n</div> </div> <div class="ml-5"> <p class="text-sm font-medium text-gray-500">Pending</p> <p class="text-2xl font-semibold text-gray-900" id="pending-count">', '</p> </div> </div> </div> <div class="bg-white rounded-lg shadow-sm p-6"> <div class="flex items-center"> <div class="flex-shrink-0"> <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">\n\u{1F50D}\n</div> </div> <div class="ml-5"> <p class="text-sm font-medium text-gray-500">Reviewing</p> <p class="text-2xl font-semibold text-gray-900" id="reviewing-count">', '</p> </div> </div> </div> <div class="bg-white rounded-lg shadow-sm p-6"> <div class="flex items-center"> <div class="flex-shrink-0"> <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">\n\u2705\n</div> </div> <div class="ml-5"> <p class="text-sm font-medium text-gray-500">Quoted</p> <p class="text-2xl font-semibold text-gray-900" id="quoted-count">', '</p> </div> </div> </div> <div class="bg-white rounded-lg shadow-sm p-6"> <div class="flex items-center"> <div class="flex-shrink-0"> <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">\n\u{1F4E6}\n</div> </div> <div class="ml-5"> <p class="text-sm font-medium text-gray-500">Ordered</p> <p class="text-2xl font-semibold text-gray-900" id="ordered-count">', `</p> </div> </div> </div> </div> <!-- Actions Section --> <div id="actions-section" class="hidden bg-white rounded-lg shadow-sm p-6 mb-8"> <div class="flex flex-wrap gap-4 items-center justify-between"> <div class="flex items-center space-x-4"> <h2 class="text-lg font-medium text-gray-900">\u62A5\u4EF7\u7BA1\u7406</h2> <span class="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">
\u{1F517} Supabase\u5B9E\u65F6\u8FDE\u63A5
</span> </div> <div class="flex items-center space-x-4"> <select id="status-filter" class="border border-gray-300 rounded-lg px-3 py-2"> <option value="">All Status</option> <option value="pending">Pending</option> <option value="reviewing">Reviewing</option> <option value="quoted">Quoted</option> <option value="accepted">Accepted</option> <option value="ordered">Ordered</option> </select> <input type="text" id="search-input" placeholder="Search quotes..." class="border border-gray-300 rounded-lg px-3 py-2"> <button id="refresh-btn" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
\u5237\u65B0
</button> <button id="create-quote-btn" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
\u65B0\u5EFA\u62A5\u4EF7
</button> </div> </div> </div> <!-- Table Section --> <div id="table-section" class="hidden bg-white shadow-sm rounded-lg overflow-hidden"> <table class="min-w-full divide-y divide-gray-200"> <thead class="bg-gray-50"> <tr> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
Customer
</th> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
Product
</th> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
Status
</th> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
Amount
</th> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
Date
</th> <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
Actions
</th> </tr> </thead> <tbody id="quotes-table-body" class="bg-white divide-y divide-gray-200"> <!-- \u52A8\u6001\u52A0\u8F7D\u5185\u5BB9 --> </tbody> </table> </div> <!-- Error State --> <div id="error-state" class="hidden bg-red-50 border border-red-200 rounded-lg p-6 text-center"> <div class="text-red-600 mb-2"> <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 48 48"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> </div> <h3 class="text-lg font-medium text-red-800 mb-2">Loading Error</h3> <p class="text-red-600 mb-4" id="error-message">Failed to load data</p> <button id="retry-btn" class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
Retry
</button> </div> <!-- Empty State --> <div id="empty-state" class="hidden bg-white rounded-lg shadow-sm p-12 text-center"> <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48"> <path d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A9.971 9.971 0 0124 24c4.004 0 7.625 2.349 9.287 6m-9.287-6c-4.004 0-7.625 2.349-9.287 6m0 0A9.971 9.971 0 0014 32.286" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </svg> <h3 class="mt-2 text-sm font-medium text-gray-900">No quotes found</h3> <p class="mt-1 text-sm text-gray-500">Get started by creating your first quote.</p> <div class="mt-6"> <button id="empty-create-btn" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
\u521B\u5EFA\u7B2C\u4E00\u4E2A\u62A5\u4EF7
</button> </div> </div> </div> </div>  <div id="quote-modal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 hidden"> <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white"> <div class="mt-3" id="modal-content"> <!-- \u52A8\u6001\u52A0\u8F7D\u5185\u5BB9 --> </div> </div> </div>  <div id="create-modal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 hidden"> <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white"> <div class="mt-3"> <h3 class="text-lg font-medium text-gray-900 mb-6" id="create-modal-title">\u521B\u5EFA\u65B0\u62A5\u4EF7</h3> <form id="quote-form" class="space-y-4"> <input type="hidden" id="quote-id" name="id"> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> <div> <label for="customer-name" class="block text-sm font-medium text-gray-700 mb-1">\u5BA2\u6237\u59D3\u540D</label> <input type="text" id="customer-name" name="customer_name" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"> </div> <div> <label for="customer-email" class="block text-sm font-medium text-gray-700 mb-1">\u5BA2\u6237\u90AE\u7BB1</label> <input type="email" id="customer-email" name="customer_email" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"> </div> </div> <div> <label for="company-name" class="block text-sm font-medium text-gray-700 mb-1">\u516C\u53F8\u540D\u79F0\uFF08\u53EF\u9009\uFF09</label> <input type="text" id="company-name" name="company_name" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> <div> <label for="material" class="block text-sm font-medium text-gray-700 mb-1">\u6750\u6599</label> <select id="material" name="material" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"> <option value="">\u9009\u62E9\u6750\u6599</option> <option value="aluminum">\u94DD\u5408\u91D1</option> <option value="steel">\u4E0D\u9508\u94A2</option> <option value="brass">\u9EC4\u94DC</option> <option value="plastic">\u5851\u6599</option> <option value="titanium">\u949B\u5408\u91D1</option> </select> </div> <div> <label for="quantity" class="block text-sm font-medium text-gray-700 mb-1">\u6570\u91CF</label> <input type="number" id="quantity" name="quantity" min="1" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"> </div> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> <div> <label for="quote-total" class="block text-sm font-medium text-gray-700 mb-1">\u62A5\u4EF7\u91D1\u989D\uFF08\u53EF\u9009\uFF09</label> <input type="number" id="quote-total" name="quote_total" step="0.01" min="0" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"> </div> <div> <label for="status" class="block text-sm font-medium text-gray-700 mb-1">\u72B6\u6001</label> <select id="status" name="status" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"> <option value="pending">Pending</option> <option value="reviewing">Reviewing</option> <option value="quoted">Quoted</option> <option value="accepted">Accepted</option> <option value="rejected">Rejected</option> </select> </div> </div> <div> <label for="notes" class="block text-sm font-medium text-gray-700 mb-1">\u5907\u6CE8</label> <textarea id="notes" name="notes" rows="3" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500" placeholder="\u8F93\u5165\u62A5\u4EF7\u76F8\u5173\u5907\u6CE8..."></textarea> </div> <div class="flex justify-end space-x-3 pt-4 border-t"> <button type="button" onclick="closeCreateModal()" class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
\u53D6\u6D88
</button> <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
\u4FDD\u5B58\u62A5\u4EF7
</button> </div> </form> </div> </div> </div> <script type="module">
    import { supabase } from '/src/lib/supabase.ts';
    import { ApiDataProcessor } from '/src/middleware/ApiDataProcessor.ts';
    
    // \u521D\u59CB\u5316\u670D\u52A1
    const apiProcessor = new ApiDataProcessor();
    
    // Global state
    let quotes = [];
    let filteredQuotes = [];
    
    // DOM Elements
    let loadingState, statsSection, actionsSection, tableSection, emptyState, errorState;
    let tableBody, statusFilter, searchInput, modal, modalContent, createModal;
    
    function initializeDOMElements() {
      loadingState = document.getElementById('loading-state');
      statsSection = document.getElementById('stats-section');
      actionsSection = document.getElementById('actions-section');
      tableSection = document.getElementById('table-section');
      emptyState = document.getElementById('empty-state');
      errorState = document.getElementById('error-state');
      tableBody = document.getElementById('quotes-table-body');
      statusFilter = document.getElementById('status-filter');
      searchInput = document.getElementById('search-input');
      modal = document.getElementById('quote-modal');
      modalContent = document.getElementById('modal-content');
      createModal = document.getElementById('create-modal');
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', function() {
      console.log('\u{1F680} Real Admin Dashboard initializing...');
      initializeDOMElements();
      setupEventListeners();
      loadQuotes();
    });

    // Setup event listeners  
    function setupEventListeners() {
      // \u5B89\u5168\u83B7\u53D6\u5143\u7D20\uFF0C\u907F\u514Dnull\u5F15\u7528\u9519\u8BEF
      const refreshBtn = document.getElementById('refresh-btn');
      const retryBtn = document.getElementById('retry-btn');
      const createQuoteBtn = document.getElementById('create-quote-btn');
      const emptyCreateBtn = document.getElementById('empty-create-btn');
      const quoteForm = document.getElementById('quote-form');

      // Refresh
      if (refreshBtn) refreshBtn.addEventListener('click', loadQuotes);
      if (retryBtn) retryBtn.addEventListener('click', loadQuotes);

      // Filter and search
      if (statusFilter) statusFilter.addEventListener('change', filterQuotes);
      if (searchInput) searchInput.addEventListener('input', filterQuotes);

      // Modals
      if (modal) {
        modal.addEventListener('click', function(e) {
          if (e.target === modal) closeModal();
        });
      }
      
      if (createModal) {
        createModal.addEventListener('click', function(e) {
          if (e.target === createModal) closeCreateModal();
        });
      }

      // Create quote buttons
      if (createQuoteBtn) createQuoteBtn.addEventListener('click', openCreateModal);
      if (emptyCreateBtn) emptyCreateBtn.addEventListener('click', openCreateModal);
      
      // Quote form
      if (quoteForm) quoteForm.addEventListener('submit', handleQuoteSubmit);
    }

    // \u771F\u5B9E\u6570\u636E\u52A0\u8F7D - \u76F4\u63A5\u4ECESupabase\u83B7\u53D6
    async function loadQuotes() {
      console.log('\u{1F504} Loading quotes from Supabase...');
      showLoading();
      
      try {
        const { data: quotesData, error } = await supabase
          .from('mvp_quotes')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) {
          throw new Error(\`Supabase error: \${error.message}\`);
        }
        
        quotes = quotesData || [];
        filteredQuotes = quotes;
        
        console.log('\u2705 Supabase data loaded:', quotes.length, 'quotes');
        
        updateStats();
        
        if (quotes.length === 0) {
          showEmpty();
        } else {
          renderTable();
          showContent();
        }
        
      } catch (error) {
        console.error('\u{1F4A5} Error loading quotes:', error);
        showError(error.message);
      }
    }

    // \u66F4\u65B0\u7EDF\u8BA1\u6570\u636E
    function updateStats() {
      const stats = quotes.reduce((acc, quote) => {
        acc[quote.status] = (acc[quote.status] || 0) + 1;
        return acc;
      }, {});

      document.getElementById('pending-count').textContent = stats.pending || 0;
      document.getElementById('reviewing-count').textContent = stats.reviewing || 0;
      document.getElementById('quoted-count').textContent = stats.quoted || 0;
      document.getElementById('ordered-count').textContent = stats.ordered || 0;
    }

    // \u6E32\u67D3\u8868\u683C
    function renderTable() {
      if (filteredQuotes.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" class="text-center py-8 text-gray-500">No matching quotes found</td></tr>';
        return;
      }

      const renderQuoteRow = (quote) => {
        const customerName = quote.customer_name || 'Not provided';
        const companyDiv = quote.company_name ? '<div class="text-xs text-gray-400">' + quote.company_name + '</div>' : '';
        const priceDisplay = quote.quote_total ? '$' + parseFloat(quote.quote_total).toFixed(2) : '-';
        const createdDate = new Date(quote.created_at).toLocaleString('en-US');
        
        return '<tr class="hover:bg-gray-50">' +
          '<td class="px-6 py-4 whitespace-nowrap">' +
            '<div>' +
              '<div class="text-sm font-medium text-gray-900">' + customerName + '</div>' +
              '<div class="text-sm text-gray-500">' + quote.customer_email + '</div>' +
              companyDiv +
            '</div>' +
          '</td>' +
          '<td class="px-6 py-4 whitespace-nowrap">' +
            '<div class="text-sm text-gray-900">' + quote.material + '</div>' +
            '<div class="text-sm text-gray-500">Qty: ' + quote.quantity + '</div>' +
          '</td>' +
          '<td class="px-6 py-4 whitespace-nowrap">' +
            '<span class="px-2 py-1 text-xs font-semibold rounded-full ' + getStatusColor(quote.status) + '">' +
              getStatusText(quote.status) +
            '</span>' +
          '</td>' +
          '<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">' + priceDisplay + '</td>' +
          '<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">' + createdDate + '</td>' +
          '<td class="px-6 py-4 whitespace-nowrap text-sm font-medium">' +
            '<button onclick="viewQuote(\\'' + quote.id + '\\')" class="text-blue-600 hover:text-blue-900 mr-2">View</button>' +
            '<button onclick="editQuote(\\'' + quote.id + '\\')" class="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>' +
            '<button onclick="deleteQuote(\\'' + quote.id + '\\')" class="text-red-600 hover:text-red-900">Delete</button>' +
          '</td>' +
        '</tr>';
      };
      
      tableBody.innerHTML = filteredQuotes.map(renderQuoteRow).join('');
    }

    // \u67E5\u770B\u62A5\u4EF7\u8BE6\u60C5
    window.viewQuote = async function(quoteId) {
      try {
        console.log('\u{1F4CB} Loading quote details for:', quoteId);
        
        const quote = quotes.find(q => q.id === quoteId);
        if (!quote) {
          throw new Error('Quote not found');
        }
        
        // \u6A21\u62DF\u589E\u5F3AAPI\u54CD\u5E94\u6570\u636E\u7ED3\u6784
        const mockEnhancedResponse = {
          success: true,
          data: {
            operation: {
              type: 'quote_view',
              quoteId: quote.id,
              expertId: 'expert-001',
              updatedAt: quote.updated_at,
              changes: {}
            },
            quote: {
              id: quote.id,
              status: quote.status,
              statusLabel: getStatusText(quote.status),
              total: quote.quote_total || 0,
              currency: quote.currency || 'USD',
              material: quote.material,
              materialLabel: quote.material,
              quantity: quote.quantity,
              notes: quote.notes || '',
              estimatedDeliveryDays: 7,
              createdAt: quote.created_at,
              updatedAt: quote.updated_at,
              progress: {
                percentage: getProgressPercentage(quote.status),
                category: 'manufacturing',
                nextStep: getNextStep(quote.status),
                estimatedNext: '2-3 days'
              },
              transparentBreakdown: generateTransparentBreakdown(quote.quote_total || 1000)
            },
            customer: {
              email: quote.customer_email,
              name: quote.customer_name,
              company: quote.company_name,
              totalOrders: 3,
              registrationDate: quote.created_at
            },
            expert: {
              id: 'expert-001',
              name: 'Admin Expert',
              role: 'Senior Manufacturing Engineer'
            },
            context: {
              recentMessages: [
                {
                  id: 'msg-1',
                  senderType: 'customer',
                  senderName: quote.customer_name || 'Customer',
                  content: '\u8BF7\u95EE\u62A5\u4EF7\u4EC0\u4E48\u65F6\u5019\u80FD\u5B8C\u6210\uFF1F',
                  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
                },
                {
                  id: 'msg-2', 
                  senderType: 'expert',
                  senderName: 'Admin Expert',
                  content: '\u6211\u4EEC\u6B63\u5728\u51C6\u5907\u8BE6\u7EC6\u62A5\u4EF7\uFF0C\u9884\u8BA1\u4ECA\u5929\u4E0B\u5348\u5B8C\u6210\u3002',
                  createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString()
                }
              ],
              relatedOrders: [],
              suggestedActions: [
                { action: 'finalize_quote', label: '\u5B8C\u6210\u62A5\u4EF7', priority: 'high' },
                { action: 'send_message', label: '\u8054\u7CFB\u5BA2\u6237', priority: 'medium' },
                { action: 'schedule_review', label: '\u5B89\u6392\u8BC4\u5BA1', priority: 'low' }
              ]
            },
            ui: {
              canEdit: true,
              canMessage: true,
              canUpdateOrder: true,
              statusColor: getStatusColor(quote.status),
              urgencyLevel: 'medium'
            }
          },
          meta: {
            processedAt: new Date().toISOString(),
            apiVersion: '2.1',
            dataVersion: '1.0'
          }
        };
        
        const processedData = apiProcessor.processQuoteUpdateResponse(mockEnhancedResponse, 'admin');
        showQuoteModal(processedData);
        
      } catch (error) {
        console.error('View quote error:', error);
        alert('\u65E0\u6CD5\u52A0\u8F7D\u62A5\u4EF7\u8BE6\u60C5: ' + error.message);
      }
    };

    // \u7F16\u8F91\u62A5\u4EF7
    window.editQuote = function(quoteId) {
      const quote = quotes.find(q => q.id === quoteId);
      if (!quote) {
        alert('Quote not found');
        return;
      }
      
      // \u586B\u5145\u8868\u5355
      document.getElementById('create-modal-title').textContent = '\u7F16\u8F91\u62A5\u4EF7';
      document.getElementById('quote-id').value = quote.id;
      document.getElementById('customer-name').value = quote.customer_name || '';
      document.getElementById('customer-email').value = quote.customer_email || '';
      document.getElementById('company-name').value = quote.company_name || '';
      document.getElementById('material').value = quote.material || '';
      document.getElementById('quantity').value = quote.quantity || '';
      document.getElementById('quote-total').value = quote.quote_total || '';
      document.getElementById('status').value = quote.status || 'pending';
      document.getElementById('notes').value = quote.customer_notes || '';
      
      createModal.classList.remove('hidden');
    };

    // \u5220\u9664\u62A5\u4EF7
    window.deleteQuote = async function(quoteId) {
      if (!confirm('\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u62A5\u4EF7\u5417\uFF1F\u6B64\u64CD\u4F5C\u65E0\u6CD5\u64A4\u9500\u3002')) {
        return;
      }
      
      try {
        const { error } = await supabase
          .from('mvp_quotes')
          .delete()
          .eq('id', quoteId);
          
        if (error) {
          throw new Error(error.message);
        }
        
        alert('\u62A5\u4EF7\u5DF2\u6210\u529F\u5220\u9664');
        loadQuotes(); // \u91CD\u65B0\u52A0\u8F7D\u6570\u636E
        
      } catch (error) {
        console.error('Delete quote error:', error);
        alert('\u5220\u9664\u5931\u8D25: ' + error.message);
      }
    };

    // \u5904\u7406\u8868\u5355\u63D0\u4EA4
    async function handleQuoteSubmit(e) {
      e.preventDefault();
      
      try {
        const formData = new FormData(e.target);
        const quoteData = Object.fromEntries(formData.entries());
        
        // \u6E05\u7406\u548C\u9A8C\u8BC1\u6570\u636E
        if (!quoteData.customer_email || !quoteData.material || !quoteData.quantity) {
          throw new Error('\u8BF7\u586B\u5199\u5FC5\u586B\u5B57\u6BB5');
        }
        
        // \u8F6C\u6362\u6570\u636E\u7C7B\u578B
        quoteData.quantity = parseInt(quoteData.quantity);
        if (quoteData.quote_total) {
          quoteData.quote_total = parseFloat(quoteData.quote_total);
        }
        
        // \u5B57\u6BB5\u6620\u5C04\uFF1A\u5C06admin\u754C\u9762\u5B57\u6BB5\u6620\u5C04\u5230mvp_quotes\u8868\u5B57\u6BB5
        const mvpQuoteData = {
          customer_email: quoteData.customer_email,
          customer_name: quoteData.customer_name,
          company_name: quoteData.company_name,
          material: quoteData.material,
          quantity: quoteData.quantity,
          status: quoteData.status,
          quote_total: quoteData.quote_total,
          customer_notes: quoteData.notes, // notes -> customer_notes
          estimated_price: quoteData.quote_total, // \u590D\u5236quote_total\u5230estimated_price
          priority_level: 1, // \u9ED8\u8BA4\u4F18\u5148\u7EA7
          source: 'admin_panel', // \u6807\u8BB0\u6765\u6E90
          original_file_key: 'admin-' + Date.now() + '-' + Math.random().toString(36).substr(2, 8).toUpperCase(), // \u5FC5\u586B\u5B57\u6BB5
          reply_to_email: 'admin@geppetto.studio' // \u9ED8\u8BA4\u56DE\u590D\u90AE\u7BB1
        };
        
        // \u5982\u679C\u662F\u7F16\u8F91\uFF0C\u4FDD\u7559ID
        if (quoteData.id) {
          mvpQuoteData.id = quoteData.id;
        }
        
        const isEdit = !!quoteData.id;
        
        if (isEdit) {
          // \u66F4\u65B0\u62A5\u4EF7\uFF08\u79FB\u9664\u4E0D\u53EF\u66F4\u65B0\u5B57\u6BB5\uFF09
          const updateData = { ...mvpQuoteData };
          delete updateData.original_file_key; // \u4E0D\u66F4\u65B0\u6587\u4EF6key
          delete updateData.source; // \u4E0D\u66F4\u65B0\u6765\u6E90
          
          const { error } = await supabase
            .from('mvp_quotes')
            .update(updateData)
            .eq('id', quoteData.id);
            
          if (error) throw new Error(error.message);
          alert('\u62A5\u4EF7\u66F4\u65B0\u6210\u529F');
        } else {
          // \u521B\u5EFA\u65B0\u62A5\u4EF7
          delete mvpQuoteData.id; // \u79FB\u9664\u7A7A\u7684ID\u5B57\u6BB5
          const { error } = await supabase
            .from('mvp_quotes')
            .insert([mvpQuoteData]);
            
          if (error) throw new Error(error.message);
          alert('\u62A5\u4EF7\u521B\u5EFA\u6210\u529F');
        }
        
        closeCreateModal();
        loadQuotes(); // \u91CD\u65B0\u52A0\u8F7D\u6570\u636E
        
      } catch (error) {
        console.error('Quote submit error:', error);
        alert('\u64CD\u4F5C\u5931\u8D25: ' + error.message);
      }
    }

    // \u6CE8\u9500
    async function handleLogout() {
      try {
        await supabase.auth.signOut();
        window.location.href = '/login';
      } catch (error) {
        console.error('Logout error:', error);
        alert('\u6CE8\u9500\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5');
      }
    }

    // Modal functions
    function showQuoteModal(processedData) {
      // \u4F7F\u7528\u4E0Etest-admin\u76F8\u540C\u7684\u6A21\u6001\u6846\u5185\u5BB9\u751F\u6210\u903B\u8F91
      const modalContent = generateQuoteModalContent(processedData);
      document.getElementById('modal-content').innerHTML = modalContent;
      modal.classList.remove('hidden');
    }

    window.closeModal = function() {
      modal.classList.add('hidden');
    };

    function openCreateModal() {
      // \u91CD\u7F6E\u8868\u5355
      document.getElementById('quote-form').reset();
      document.getElementById('create-modal-title').textContent = '\u521B\u5EFA\u65B0\u62A5\u4EF7';
      createModal.classList.remove('hidden');
    }

    window.closeCreateModal = function() {
      createModal.classList.add('hidden');
    };

    // Utility functions
    function getStatusColor(status) {
      const colors = {
        'pending': 'bg-yellow-100 text-yellow-800',
        'reviewing': 'bg-blue-100 text-blue-800',
        'quoted': 'bg-green-100 text-green-800',
        'accepted': 'bg-purple-100 text-purple-800',
        'ordered': 'bg-purple-100 text-purple-800'
      };
      return colors[status] || 'bg-gray-100 text-gray-800';
    }

    function getStatusText(status) {
      const texts = {
        'pending': 'Pending',
        'reviewing': 'Reviewing', 
        'quoted': 'Quoted',
        'accepted': 'Accepted',
        'ordered': 'Ordered'
      };
      return texts[status] || status;
    }

    function getProgressPercentage(status) {
      const percentages = {
        'pending': 20,
        'reviewing': 50,
        'quoted': 80,
        'accepted': 90,
        'ordered': 100
      };
      return percentages[status] || 0;
    }

    function getNextStep(status) {
      const steps = {
        'pending': '\u7B49\u5F85\u4E13\u5BB6\u5BA1\u6838',
        'reviewing': '\u51C6\u5907\u8BE6\u7EC6\u62A5\u4EF7',
        'quoted': '\u7B49\u5F85\u5BA2\u6237\u786E\u8BA4',
        'accepted': '\u51C6\u5907\u751F\u4EA7',
        'ordered': '\u751F\u4EA7\u4E2D'
      };
      return steps[status] || '\u5904\u7406\u4E2D';
    }

    // Generate transparent breakdown pricing data
    function generateTransparentBreakdown(total) {
      const baseAmount = total || 1250;
      return {
        materialCost: baseAmount * 0.125,
        surfaceFinishCost: baseAmount * 0.0375, 
        transparentThirdPartyCost: baseAmount * 0.1625,
        engineeringDesignFee: baseAmount * 0.1842,
        manufacturingQualityService: baseAmount * 0.6474,
        operationalManagementFee: baseAmount * 0.2553,
        subtotal: baseAmount,
        quantityDiscount: baseAmount * 0.05,
        finalTotal: baseAmount * 0.95
      };
    }

    // Generate modal content (simplified version)
    function generateQuoteModalContent(processedData) {
      return \`
        <div class="flex justify-between items-start mb-6">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">
              \u{1F4CB} \u62A5\u4EF7\u8BE6\u60C5 #\${processedData.quote.id.substring(0, 8)}
            </h3>
            <p class="text-sm text-gray-500 mt-1">
              \u6700\u540E\u66F4\u65B0: \${processedData.quote.formattedUpdatedAt}
            </p>
          </div>
          <div class="flex items-center gap-2">
            <span class="\${processedData.ui.statusBadge}">\${processedData.quote.statusLabel}</span>
            <span class="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">\u{1F4BE} \u6570\u636E\u5E93\u8FDE\u63A5</span>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div class="bg-blue-50 p-4 rounded-lg">
            <h4 class="font-medium text-gray-900 mb-3">\u{1F4CB} \u5BA2\u6237\u4FE1\u606F</h4>
            <div class="space-y-2 text-sm">
              <div><strong>\u5BA2\u6237:</strong> \${processedData.customer.displayName}</div>
              <div><strong>\u90AE\u7BB1:</strong> \${processedData.customer.email}</div>
              \${processedData.customer.company ? \`<div><strong>\u516C\u53F8:</strong> \${processedData.customer.company}</div>\` : ''}
              <div><strong>\u5BA2\u6237\u7C7B\u578B:</strong> <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">\u5236\u9020\u4E1A\u5BA2\u6237</span></div>
              <div><strong>\u5386\u53F2\u8BA2\u5355:</strong> \${processedData.customer.totalOrders} \u4E2A</div>
            </div>
          </div>
          
          <div class="bg-green-50 p-4 rounded-lg">
            <h4 class="font-medium text-gray-900 mb-3">\u{1F527} \u4EA7\u54C1\u4FE1\u606F</h4>
            <div class="space-y-2 text-sm">
              <div><strong>\u6750\u6599:</strong> \${processedData.quote.materialLabel}</div>
              <div><strong>\u6570\u91CF:</strong> \${processedData.quote.quantity} \u4EF6</div>
              <div><strong>\u62A5\u4EF7:</strong> <span class="text-lg font-semibold text-green-600">\${processedData.quote.formattedTotal}</span></div>
              <div><strong>\u9884\u8BA1\u4EA4\u671F:</strong> \${processedData.quote.estimatedCompletion}</div>
            </div>
          </div>
        </div>
        
        <div class="flex justify-end space-x-3 pt-4 border-t">
          <button onclick="closeModal()" class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
            \u5173\u95ED
          </button>
          <button onclick="editQuote('\${processedData.quote.id}')" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            \u{1F4DD} \u7F16\u8F91\u62A5\u4EF7
          </button>
        </div>
      \`;
    }

    // Filter quotes
    function filterQuotes() {
      const statusValue = statusFilter.value;
      const searchValue = searchInput.value.toLowerCase();
      
      filteredQuotes = quotes.filter(quote => {
        const matchesStatus = !statusValue || quote.status === statusValue;
        const matchesSearch = !searchValue || 
          quote.customer_email.toLowerCase().includes(searchValue) ||
          (quote.customer_name && quote.customer_name.toLowerCase().includes(searchValue)) ||
          (quote.company_name && quote.company_name.toLowerCase().includes(searchValue)) ||
          quote.material.toLowerCase().includes(searchValue);
        
        return matchesStatus && matchesSearch;
      });
      
      updateStats();
      renderTable();
    }

    // UI State functions
    function showContent() {
      loadingState.classList.add('hidden');
      statsSection.classList.remove('hidden');
      actionsSection.classList.remove('hidden');
      tableSection.classList.remove('hidden');
      emptyState.classList.add('hidden');
      errorState.classList.add('hidden');
    }

    function showLoading() {
      loadingState.classList.remove('hidden');
      statsSection.classList.add('hidden');
      actionsSection.classList.add('hidden');
      tableSection.classList.add('hidden');
      emptyState.classList.add('hidden');
      errorState.classList.add('hidden');
    }

    function showError(message) {
      loadingState.classList.add('hidden');
      statsSection.classList.add('hidden');
      actionsSection.classList.add('hidden');
      tableSection.classList.add('hidden');
      emptyState.classList.add('hidden');
      errorState.classList.remove('hidden');
      
      const errorElement = document.getElementById('error-message');
      if (errorElement) {
        errorElement.textContent = message;
      }
    }

    function showEmpty() {
      loadingState.classList.add('hidden');
      statsSection.classList.add('hidden');
      actionsSection.classList.add('hidden');
      tableSection.classList.add('hidden');
      emptyState.classList.remove('hidden');
      errorState.classList.add('hidden');
    }
  <\/script> `], [" ", '<div class="min-h-screen bg-gray-50"> <!-- Header --> <div class="bg-white shadow-sm border-b"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="flex justify-between items-center py-6"> <div> <h1 class="text-2xl font-bold text-gray-900">Admin Dashboard</h1> <p class="text-gray-600">\u6781\u7B80\u62A5\u4EF7\u7BA1\u7406\u7CFB\u7EDF - Simple Quote Management</p> </div> <div class="flex items-center space-x-4"> <span class="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">\n\u{1F517} \u76F4\u8FDESupabase\n</span> </div> </div> </div> </div> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"> <!-- Loading State --> <div id="loading-state" class="text-center py-12"> <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div> <p class="text-gray-600 mt-4">Loading data...</p> </div> <!-- Statistics Cards --> <div id="stats-section" class="hidden grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"> <div class="bg-white rounded-lg shadow-sm p-6"> <div class="flex items-center"> <div class="flex-shrink-0"> <div class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">\n\u23F3\n</div> </div> <div class="ml-5"> <p class="text-sm font-medium text-gray-500">Pending</p> <p class="text-2xl font-semibold text-gray-900" id="pending-count">', '</p> </div> </div> </div> <div class="bg-white rounded-lg shadow-sm p-6"> <div class="flex items-center"> <div class="flex-shrink-0"> <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">\n\u{1F50D}\n</div> </div> <div class="ml-5"> <p class="text-sm font-medium text-gray-500">Reviewing</p> <p class="text-2xl font-semibold text-gray-900" id="reviewing-count">', '</p> </div> </div> </div> <div class="bg-white rounded-lg shadow-sm p-6"> <div class="flex items-center"> <div class="flex-shrink-0"> <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">\n\u2705\n</div> </div> <div class="ml-5"> <p class="text-sm font-medium text-gray-500">Quoted</p> <p class="text-2xl font-semibold text-gray-900" id="quoted-count">', '</p> </div> </div> </div> <div class="bg-white rounded-lg shadow-sm p-6"> <div class="flex items-center"> <div class="flex-shrink-0"> <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">\n\u{1F4E6}\n</div> </div> <div class="ml-5"> <p class="text-sm font-medium text-gray-500">Ordered</p> <p class="text-2xl font-semibold text-gray-900" id="ordered-count">', `</p> </div> </div> </div> </div> <!-- Actions Section --> <div id="actions-section" class="hidden bg-white rounded-lg shadow-sm p-6 mb-8"> <div class="flex flex-wrap gap-4 items-center justify-between"> <div class="flex items-center space-x-4"> <h2 class="text-lg font-medium text-gray-900">\u62A5\u4EF7\u7BA1\u7406</h2> <span class="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">
\u{1F517} Supabase\u5B9E\u65F6\u8FDE\u63A5
</span> </div> <div class="flex items-center space-x-4"> <select id="status-filter" class="border border-gray-300 rounded-lg px-3 py-2"> <option value="">All Status</option> <option value="pending">Pending</option> <option value="reviewing">Reviewing</option> <option value="quoted">Quoted</option> <option value="accepted">Accepted</option> <option value="ordered">Ordered</option> </select> <input type="text" id="search-input" placeholder="Search quotes..." class="border border-gray-300 rounded-lg px-3 py-2"> <button id="refresh-btn" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
\u5237\u65B0
</button> <button id="create-quote-btn" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
\u65B0\u5EFA\u62A5\u4EF7
</button> </div> </div> </div> <!-- Table Section --> <div id="table-section" class="hidden bg-white shadow-sm rounded-lg overflow-hidden"> <table class="min-w-full divide-y divide-gray-200"> <thead class="bg-gray-50"> <tr> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
Customer
</th> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
Product
</th> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
Status
</th> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
Amount
</th> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
Date
</th> <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
Actions
</th> </tr> </thead> <tbody id="quotes-table-body" class="bg-white divide-y divide-gray-200"> <!-- \u52A8\u6001\u52A0\u8F7D\u5185\u5BB9 --> </tbody> </table> </div> <!-- Error State --> <div id="error-state" class="hidden bg-red-50 border border-red-200 rounded-lg p-6 text-center"> <div class="text-red-600 mb-2"> <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 48 48"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> </div> <h3 class="text-lg font-medium text-red-800 mb-2">Loading Error</h3> <p class="text-red-600 mb-4" id="error-message">Failed to load data</p> <button id="retry-btn" class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
Retry
</button> </div> <!-- Empty State --> <div id="empty-state" class="hidden bg-white rounded-lg shadow-sm p-12 text-center"> <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48"> <path d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A9.971 9.971 0 0124 24c4.004 0 7.625 2.349 9.287 6m-9.287-6c-4.004 0-7.625 2.349-9.287 6m0 0A9.971 9.971 0 0014 32.286" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </svg> <h3 class="mt-2 text-sm font-medium text-gray-900">No quotes found</h3> <p class="mt-1 text-sm text-gray-500">Get started by creating your first quote.</p> <div class="mt-6"> <button id="empty-create-btn" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
\u521B\u5EFA\u7B2C\u4E00\u4E2A\u62A5\u4EF7
</button> </div> </div> </div> </div>  <div id="quote-modal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 hidden"> <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white"> <div class="mt-3" id="modal-content"> <!-- \u52A8\u6001\u52A0\u8F7D\u5185\u5BB9 --> </div> </div> </div>  <div id="create-modal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 hidden"> <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white"> <div class="mt-3"> <h3 class="text-lg font-medium text-gray-900 mb-6" id="create-modal-title">\u521B\u5EFA\u65B0\u62A5\u4EF7</h3> <form id="quote-form" class="space-y-4"> <input type="hidden" id="quote-id" name="id"> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> <div> <label for="customer-name" class="block text-sm font-medium text-gray-700 mb-1">\u5BA2\u6237\u59D3\u540D</label> <input type="text" id="customer-name" name="customer_name" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"> </div> <div> <label for="customer-email" class="block text-sm font-medium text-gray-700 mb-1">\u5BA2\u6237\u90AE\u7BB1</label> <input type="email" id="customer-email" name="customer_email" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"> </div> </div> <div> <label for="company-name" class="block text-sm font-medium text-gray-700 mb-1">\u516C\u53F8\u540D\u79F0\uFF08\u53EF\u9009\uFF09</label> <input type="text" id="company-name" name="company_name" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> <div> <label for="material" class="block text-sm font-medium text-gray-700 mb-1">\u6750\u6599</label> <select id="material" name="material" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"> <option value="">\u9009\u62E9\u6750\u6599</option> <option value="aluminum">\u94DD\u5408\u91D1</option> <option value="steel">\u4E0D\u9508\u94A2</option> <option value="brass">\u9EC4\u94DC</option> <option value="plastic">\u5851\u6599</option> <option value="titanium">\u949B\u5408\u91D1</option> </select> </div> <div> <label for="quantity" class="block text-sm font-medium text-gray-700 mb-1">\u6570\u91CF</label> <input type="number" id="quantity" name="quantity" min="1" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"> </div> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> <div> <label for="quote-total" class="block text-sm font-medium text-gray-700 mb-1">\u62A5\u4EF7\u91D1\u989D\uFF08\u53EF\u9009\uFF09</label> <input type="number" id="quote-total" name="quote_total" step="0.01" min="0" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"> </div> <div> <label for="status" class="block text-sm font-medium text-gray-700 mb-1">\u72B6\u6001</label> <select id="status" name="status" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"> <option value="pending">Pending</option> <option value="reviewing">Reviewing</option> <option value="quoted">Quoted</option> <option value="accepted">Accepted</option> <option value="rejected">Rejected</option> </select> </div> </div> <div> <label for="notes" class="block text-sm font-medium text-gray-700 mb-1">\u5907\u6CE8</label> <textarea id="notes" name="notes" rows="3" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500" placeholder="\u8F93\u5165\u62A5\u4EF7\u76F8\u5173\u5907\u6CE8..."></textarea> </div> <div class="flex justify-end space-x-3 pt-4 border-t"> <button type="button" onclick="closeCreateModal()" class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
\u53D6\u6D88
</button> <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
\u4FDD\u5B58\u62A5\u4EF7
</button> </div> </form> </div> </div> </div> <script type="module">
    import { supabase } from '/src/lib/supabase.ts';
    import { ApiDataProcessor } from '/src/middleware/ApiDataProcessor.ts';
    
    // \u521D\u59CB\u5316\u670D\u52A1
    const apiProcessor = new ApiDataProcessor();
    
    // Global state
    let quotes = [];
    let filteredQuotes = [];
    
    // DOM Elements
    let loadingState, statsSection, actionsSection, tableSection, emptyState, errorState;
    let tableBody, statusFilter, searchInput, modal, modalContent, createModal;
    
    function initializeDOMElements() {
      loadingState = document.getElementById('loading-state');
      statsSection = document.getElementById('stats-section');
      actionsSection = document.getElementById('actions-section');
      tableSection = document.getElementById('table-section');
      emptyState = document.getElementById('empty-state');
      errorState = document.getElementById('error-state');
      tableBody = document.getElementById('quotes-table-body');
      statusFilter = document.getElementById('status-filter');
      searchInput = document.getElementById('search-input');
      modal = document.getElementById('quote-modal');
      modalContent = document.getElementById('modal-content');
      createModal = document.getElementById('create-modal');
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', function() {
      console.log('\u{1F680} Real Admin Dashboard initializing...');
      initializeDOMElements();
      setupEventListeners();
      loadQuotes();
    });

    // Setup event listeners  
    function setupEventListeners() {
      // \u5B89\u5168\u83B7\u53D6\u5143\u7D20\uFF0C\u907F\u514Dnull\u5F15\u7528\u9519\u8BEF
      const refreshBtn = document.getElementById('refresh-btn');
      const retryBtn = document.getElementById('retry-btn');
      const createQuoteBtn = document.getElementById('create-quote-btn');
      const emptyCreateBtn = document.getElementById('empty-create-btn');
      const quoteForm = document.getElementById('quote-form');

      // Refresh
      if (refreshBtn) refreshBtn.addEventListener('click', loadQuotes);
      if (retryBtn) retryBtn.addEventListener('click', loadQuotes);

      // Filter and search
      if (statusFilter) statusFilter.addEventListener('change', filterQuotes);
      if (searchInput) searchInput.addEventListener('input', filterQuotes);

      // Modals
      if (modal) {
        modal.addEventListener('click', function(e) {
          if (e.target === modal) closeModal();
        });
      }
      
      if (createModal) {
        createModal.addEventListener('click', function(e) {
          if (e.target === createModal) closeCreateModal();
        });
      }

      // Create quote buttons
      if (createQuoteBtn) createQuoteBtn.addEventListener('click', openCreateModal);
      if (emptyCreateBtn) emptyCreateBtn.addEventListener('click', openCreateModal);
      
      // Quote form
      if (quoteForm) quoteForm.addEventListener('submit', handleQuoteSubmit);
    }

    // \u771F\u5B9E\u6570\u636E\u52A0\u8F7D - \u76F4\u63A5\u4ECESupabase\u83B7\u53D6
    async function loadQuotes() {
      console.log('\u{1F504} Loading quotes from Supabase...');
      showLoading();
      
      try {
        const { data: quotesData, error } = await supabase
          .from('mvp_quotes')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) {
          throw new Error(\\\`Supabase error: \\\${error.message}\\\`);
        }
        
        quotes = quotesData || [];
        filteredQuotes = quotes;
        
        console.log('\u2705 Supabase data loaded:', quotes.length, 'quotes');
        
        updateStats();
        
        if (quotes.length === 0) {
          showEmpty();
        } else {
          renderTable();
          showContent();
        }
        
      } catch (error) {
        console.error('\u{1F4A5} Error loading quotes:', error);
        showError(error.message);
      }
    }

    // \u66F4\u65B0\u7EDF\u8BA1\u6570\u636E
    function updateStats() {
      const stats = quotes.reduce((acc, quote) => {
        acc[quote.status] = (acc[quote.status] || 0) + 1;
        return acc;
      }, {});

      document.getElementById('pending-count').textContent = stats.pending || 0;
      document.getElementById('reviewing-count').textContent = stats.reviewing || 0;
      document.getElementById('quoted-count').textContent = stats.quoted || 0;
      document.getElementById('ordered-count').textContent = stats.ordered || 0;
    }

    // \u6E32\u67D3\u8868\u683C
    function renderTable() {
      if (filteredQuotes.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" class="text-center py-8 text-gray-500">No matching quotes found</td></tr>';
        return;
      }

      const renderQuoteRow = (quote) => {
        const customerName = quote.customer_name || 'Not provided';
        const companyDiv = quote.company_name ? '<div class="text-xs text-gray-400">' + quote.company_name + '</div>' : '';
        const priceDisplay = quote.quote_total ? '$' + parseFloat(quote.quote_total).toFixed(2) : '-';
        const createdDate = new Date(quote.created_at).toLocaleString('en-US');
        
        return '<tr class="hover:bg-gray-50">' +
          '<td class="px-6 py-4 whitespace-nowrap">' +
            '<div>' +
              '<div class="text-sm font-medium text-gray-900">' + customerName + '</div>' +
              '<div class="text-sm text-gray-500">' + quote.customer_email + '</div>' +
              companyDiv +
            '</div>' +
          '</td>' +
          '<td class="px-6 py-4 whitespace-nowrap">' +
            '<div class="text-sm text-gray-900">' + quote.material + '</div>' +
            '<div class="text-sm text-gray-500">Qty: ' + quote.quantity + '</div>' +
          '</td>' +
          '<td class="px-6 py-4 whitespace-nowrap">' +
            '<span class="px-2 py-1 text-xs font-semibold rounded-full ' + getStatusColor(quote.status) + '">' +
              getStatusText(quote.status) +
            '</span>' +
          '</td>' +
          '<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">' + priceDisplay + '</td>' +
          '<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">' + createdDate + '</td>' +
          '<td class="px-6 py-4 whitespace-nowrap text-sm font-medium">' +
            '<button onclick="viewQuote(\\\\'' + quote.id + '\\\\')" class="text-blue-600 hover:text-blue-900 mr-2">View</button>' +
            '<button onclick="editQuote(\\\\'' + quote.id + '\\\\')" class="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>' +
            '<button onclick="deleteQuote(\\\\'' + quote.id + '\\\\')" class="text-red-600 hover:text-red-900">Delete</button>' +
          '</td>' +
        '</tr>';
      };
      
      tableBody.innerHTML = filteredQuotes.map(renderQuoteRow).join('');
    }

    // \u67E5\u770B\u62A5\u4EF7\u8BE6\u60C5
    window.viewQuote = async function(quoteId) {
      try {
        console.log('\u{1F4CB} Loading quote details for:', quoteId);
        
        const quote = quotes.find(q => q.id === quoteId);
        if (!quote) {
          throw new Error('Quote not found');
        }
        
        // \u6A21\u62DF\u589E\u5F3AAPI\u54CD\u5E94\u6570\u636E\u7ED3\u6784
        const mockEnhancedResponse = {
          success: true,
          data: {
            operation: {
              type: 'quote_view',
              quoteId: quote.id,
              expertId: 'expert-001',
              updatedAt: quote.updated_at,
              changes: {}
            },
            quote: {
              id: quote.id,
              status: quote.status,
              statusLabel: getStatusText(quote.status),
              total: quote.quote_total || 0,
              currency: quote.currency || 'USD',
              material: quote.material,
              materialLabel: quote.material,
              quantity: quote.quantity,
              notes: quote.notes || '',
              estimatedDeliveryDays: 7,
              createdAt: quote.created_at,
              updatedAt: quote.updated_at,
              progress: {
                percentage: getProgressPercentage(quote.status),
                category: 'manufacturing',
                nextStep: getNextStep(quote.status),
                estimatedNext: '2-3 days'
              },
              transparentBreakdown: generateTransparentBreakdown(quote.quote_total || 1000)
            },
            customer: {
              email: quote.customer_email,
              name: quote.customer_name,
              company: quote.company_name,
              totalOrders: 3,
              registrationDate: quote.created_at
            },
            expert: {
              id: 'expert-001',
              name: 'Admin Expert',
              role: 'Senior Manufacturing Engineer'
            },
            context: {
              recentMessages: [
                {
                  id: 'msg-1',
                  senderType: 'customer',
                  senderName: quote.customer_name || 'Customer',
                  content: '\u8BF7\u95EE\u62A5\u4EF7\u4EC0\u4E48\u65F6\u5019\u80FD\u5B8C\u6210\uFF1F',
                  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
                },
                {
                  id: 'msg-2', 
                  senderType: 'expert',
                  senderName: 'Admin Expert',
                  content: '\u6211\u4EEC\u6B63\u5728\u51C6\u5907\u8BE6\u7EC6\u62A5\u4EF7\uFF0C\u9884\u8BA1\u4ECA\u5929\u4E0B\u5348\u5B8C\u6210\u3002',
                  createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString()
                }
              ],
              relatedOrders: [],
              suggestedActions: [
                { action: 'finalize_quote', label: '\u5B8C\u6210\u62A5\u4EF7', priority: 'high' },
                { action: 'send_message', label: '\u8054\u7CFB\u5BA2\u6237', priority: 'medium' },
                { action: 'schedule_review', label: '\u5B89\u6392\u8BC4\u5BA1', priority: 'low' }
              ]
            },
            ui: {
              canEdit: true,
              canMessage: true,
              canUpdateOrder: true,
              statusColor: getStatusColor(quote.status),
              urgencyLevel: 'medium'
            }
          },
          meta: {
            processedAt: new Date().toISOString(),
            apiVersion: '2.1',
            dataVersion: '1.0'
          }
        };
        
        const processedData = apiProcessor.processQuoteUpdateResponse(mockEnhancedResponse, 'admin');
        showQuoteModal(processedData);
        
      } catch (error) {
        console.error('View quote error:', error);
        alert('\u65E0\u6CD5\u52A0\u8F7D\u62A5\u4EF7\u8BE6\u60C5: ' + error.message);
      }
    };

    // \u7F16\u8F91\u62A5\u4EF7
    window.editQuote = function(quoteId) {
      const quote = quotes.find(q => q.id === quoteId);
      if (!quote) {
        alert('Quote not found');
        return;
      }
      
      // \u586B\u5145\u8868\u5355
      document.getElementById('create-modal-title').textContent = '\u7F16\u8F91\u62A5\u4EF7';
      document.getElementById('quote-id').value = quote.id;
      document.getElementById('customer-name').value = quote.customer_name || '';
      document.getElementById('customer-email').value = quote.customer_email || '';
      document.getElementById('company-name').value = quote.company_name || '';
      document.getElementById('material').value = quote.material || '';
      document.getElementById('quantity').value = quote.quantity || '';
      document.getElementById('quote-total').value = quote.quote_total || '';
      document.getElementById('status').value = quote.status || 'pending';
      document.getElementById('notes').value = quote.customer_notes || '';
      
      createModal.classList.remove('hidden');
    };

    // \u5220\u9664\u62A5\u4EF7
    window.deleteQuote = async function(quoteId) {
      if (!confirm('\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u62A5\u4EF7\u5417\uFF1F\u6B64\u64CD\u4F5C\u65E0\u6CD5\u64A4\u9500\u3002')) {
        return;
      }
      
      try {
        const { error } = await supabase
          .from('mvp_quotes')
          .delete()
          .eq('id', quoteId);
          
        if (error) {
          throw new Error(error.message);
        }
        
        alert('\u62A5\u4EF7\u5DF2\u6210\u529F\u5220\u9664');
        loadQuotes(); // \u91CD\u65B0\u52A0\u8F7D\u6570\u636E
        
      } catch (error) {
        console.error('Delete quote error:', error);
        alert('\u5220\u9664\u5931\u8D25: ' + error.message);
      }
    };

    // \u5904\u7406\u8868\u5355\u63D0\u4EA4
    async function handleQuoteSubmit(e) {
      e.preventDefault();
      
      try {
        const formData = new FormData(e.target);
        const quoteData = Object.fromEntries(formData.entries());
        
        // \u6E05\u7406\u548C\u9A8C\u8BC1\u6570\u636E
        if (!quoteData.customer_email || !quoteData.material || !quoteData.quantity) {
          throw new Error('\u8BF7\u586B\u5199\u5FC5\u586B\u5B57\u6BB5');
        }
        
        // \u8F6C\u6362\u6570\u636E\u7C7B\u578B
        quoteData.quantity = parseInt(quoteData.quantity);
        if (quoteData.quote_total) {
          quoteData.quote_total = parseFloat(quoteData.quote_total);
        }
        
        // \u5B57\u6BB5\u6620\u5C04\uFF1A\u5C06admin\u754C\u9762\u5B57\u6BB5\u6620\u5C04\u5230mvp_quotes\u8868\u5B57\u6BB5
        const mvpQuoteData = {
          customer_email: quoteData.customer_email,
          customer_name: quoteData.customer_name,
          company_name: quoteData.company_name,
          material: quoteData.material,
          quantity: quoteData.quantity,
          status: quoteData.status,
          quote_total: quoteData.quote_total,
          customer_notes: quoteData.notes, // notes -> customer_notes
          estimated_price: quoteData.quote_total, // \u590D\u5236quote_total\u5230estimated_price
          priority_level: 1, // \u9ED8\u8BA4\u4F18\u5148\u7EA7
          source: 'admin_panel', // \u6807\u8BB0\u6765\u6E90
          original_file_key: 'admin-' + Date.now() + '-' + Math.random().toString(36).substr(2, 8).toUpperCase(), // \u5FC5\u586B\u5B57\u6BB5
          reply_to_email: 'admin@geppetto.studio' // \u9ED8\u8BA4\u56DE\u590D\u90AE\u7BB1
        };
        
        // \u5982\u679C\u662F\u7F16\u8F91\uFF0C\u4FDD\u7559ID
        if (quoteData.id) {
          mvpQuoteData.id = quoteData.id;
        }
        
        const isEdit = !!quoteData.id;
        
        if (isEdit) {
          // \u66F4\u65B0\u62A5\u4EF7\uFF08\u79FB\u9664\u4E0D\u53EF\u66F4\u65B0\u5B57\u6BB5\uFF09
          const updateData = { ...mvpQuoteData };
          delete updateData.original_file_key; // \u4E0D\u66F4\u65B0\u6587\u4EF6key
          delete updateData.source; // \u4E0D\u66F4\u65B0\u6765\u6E90
          
          const { error } = await supabase
            .from('mvp_quotes')
            .update(updateData)
            .eq('id', quoteData.id);
            
          if (error) throw new Error(error.message);
          alert('\u62A5\u4EF7\u66F4\u65B0\u6210\u529F');
        } else {
          // \u521B\u5EFA\u65B0\u62A5\u4EF7
          delete mvpQuoteData.id; // \u79FB\u9664\u7A7A\u7684ID\u5B57\u6BB5
          const { error } = await supabase
            .from('mvp_quotes')
            .insert([mvpQuoteData]);
            
          if (error) throw new Error(error.message);
          alert('\u62A5\u4EF7\u521B\u5EFA\u6210\u529F');
        }
        
        closeCreateModal();
        loadQuotes(); // \u91CD\u65B0\u52A0\u8F7D\u6570\u636E
        
      } catch (error) {
        console.error('Quote submit error:', error);
        alert('\u64CD\u4F5C\u5931\u8D25: ' + error.message);
      }
    }

    // \u6CE8\u9500
    async function handleLogout() {
      try {
        await supabase.auth.signOut();
        window.location.href = '/login';
      } catch (error) {
        console.error('Logout error:', error);
        alert('\u6CE8\u9500\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5');
      }
    }

    // Modal functions
    function showQuoteModal(processedData) {
      // \u4F7F\u7528\u4E0Etest-admin\u76F8\u540C\u7684\u6A21\u6001\u6846\u5185\u5BB9\u751F\u6210\u903B\u8F91
      const modalContent = generateQuoteModalContent(processedData);
      document.getElementById('modal-content').innerHTML = modalContent;
      modal.classList.remove('hidden');
    }

    window.closeModal = function() {
      modal.classList.add('hidden');
    };

    function openCreateModal() {
      // \u91CD\u7F6E\u8868\u5355
      document.getElementById('quote-form').reset();
      document.getElementById('create-modal-title').textContent = '\u521B\u5EFA\u65B0\u62A5\u4EF7';
      createModal.classList.remove('hidden');
    }

    window.closeCreateModal = function() {
      createModal.classList.add('hidden');
    };

    // Utility functions
    function getStatusColor(status) {
      const colors = {
        'pending': 'bg-yellow-100 text-yellow-800',
        'reviewing': 'bg-blue-100 text-blue-800',
        'quoted': 'bg-green-100 text-green-800',
        'accepted': 'bg-purple-100 text-purple-800',
        'ordered': 'bg-purple-100 text-purple-800'
      };
      return colors[status] || 'bg-gray-100 text-gray-800';
    }

    function getStatusText(status) {
      const texts = {
        'pending': 'Pending',
        'reviewing': 'Reviewing', 
        'quoted': 'Quoted',
        'accepted': 'Accepted',
        'ordered': 'Ordered'
      };
      return texts[status] || status;
    }

    function getProgressPercentage(status) {
      const percentages = {
        'pending': 20,
        'reviewing': 50,
        'quoted': 80,
        'accepted': 90,
        'ordered': 100
      };
      return percentages[status] || 0;
    }

    function getNextStep(status) {
      const steps = {
        'pending': '\u7B49\u5F85\u4E13\u5BB6\u5BA1\u6838',
        'reviewing': '\u51C6\u5907\u8BE6\u7EC6\u62A5\u4EF7',
        'quoted': '\u7B49\u5F85\u5BA2\u6237\u786E\u8BA4',
        'accepted': '\u51C6\u5907\u751F\u4EA7',
        'ordered': '\u751F\u4EA7\u4E2D'
      };
      return steps[status] || '\u5904\u7406\u4E2D';
    }

    // Generate transparent breakdown pricing data
    function generateTransparentBreakdown(total) {
      const baseAmount = total || 1250;
      return {
        materialCost: baseAmount * 0.125,
        surfaceFinishCost: baseAmount * 0.0375, 
        transparentThirdPartyCost: baseAmount * 0.1625,
        engineeringDesignFee: baseAmount * 0.1842,
        manufacturingQualityService: baseAmount * 0.6474,
        operationalManagementFee: baseAmount * 0.2553,
        subtotal: baseAmount,
        quantityDiscount: baseAmount * 0.05,
        finalTotal: baseAmount * 0.95
      };
    }

    // Generate modal content (simplified version)
    function generateQuoteModalContent(processedData) {
      return \\\`
        <div class="flex justify-between items-start mb-6">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">
              \u{1F4CB} \u62A5\u4EF7\u8BE6\u60C5 #\\\${processedData.quote.id.substring(0, 8)}
            </h3>
            <p class="text-sm text-gray-500 mt-1">
              \u6700\u540E\u66F4\u65B0: \\\${processedData.quote.formattedUpdatedAt}
            </p>
          </div>
          <div class="flex items-center gap-2">
            <span class="\\\${processedData.ui.statusBadge}">\\\${processedData.quote.statusLabel}</span>
            <span class="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">\u{1F4BE} \u6570\u636E\u5E93\u8FDE\u63A5</span>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div class="bg-blue-50 p-4 rounded-lg">
            <h4 class="font-medium text-gray-900 mb-3">\u{1F4CB} \u5BA2\u6237\u4FE1\u606F</h4>
            <div class="space-y-2 text-sm">
              <div><strong>\u5BA2\u6237:</strong> \\\${processedData.customer.displayName}</div>
              <div><strong>\u90AE\u7BB1:</strong> \\\${processedData.customer.email}</div>
              \\\${processedData.customer.company ? \\\`<div><strong>\u516C\u53F8:</strong> \\\${processedData.customer.company}</div>\\\` : ''}
              <div><strong>\u5BA2\u6237\u7C7B\u578B:</strong> <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">\u5236\u9020\u4E1A\u5BA2\u6237</span></div>
              <div><strong>\u5386\u53F2\u8BA2\u5355:</strong> \\\${processedData.customer.totalOrders} \u4E2A</div>
            </div>
          </div>
          
          <div class="bg-green-50 p-4 rounded-lg">
            <h4 class="font-medium text-gray-900 mb-3">\u{1F527} \u4EA7\u54C1\u4FE1\u606F</h4>
            <div class="space-y-2 text-sm">
              <div><strong>\u6750\u6599:</strong> \\\${processedData.quote.materialLabel}</div>
              <div><strong>\u6570\u91CF:</strong> \\\${processedData.quote.quantity} \u4EF6</div>
              <div><strong>\u62A5\u4EF7:</strong> <span class="text-lg font-semibold text-green-600">\\\${processedData.quote.formattedTotal}</span></div>
              <div><strong>\u9884\u8BA1\u4EA4\u671F:</strong> \\\${processedData.quote.estimatedCompletion}</div>
            </div>
          </div>
        </div>
        
        <div class="flex justify-end space-x-3 pt-4 border-t">
          <button onclick="closeModal()" class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
            \u5173\u95ED
          </button>
          <button onclick="editQuote('\\\${processedData.quote.id}')" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            \u{1F4DD} \u7F16\u8F91\u62A5\u4EF7
          </button>
        </div>
      \\\`;
    }

    // Filter quotes
    function filterQuotes() {
      const statusValue = statusFilter.value;
      const searchValue = searchInput.value.toLowerCase();
      
      filteredQuotes = quotes.filter(quote => {
        const matchesStatus = !statusValue || quote.status === statusValue;
        const matchesSearch = !searchValue || 
          quote.customer_email.toLowerCase().includes(searchValue) ||
          (quote.customer_name && quote.customer_name.toLowerCase().includes(searchValue)) ||
          (quote.company_name && quote.company_name.toLowerCase().includes(searchValue)) ||
          quote.material.toLowerCase().includes(searchValue);
        
        return matchesStatus && matchesSearch;
      });
      
      updateStats();
      renderTable();
    }

    // UI State functions
    function showContent() {
      loadingState.classList.add('hidden');
      statsSection.classList.remove('hidden');
      actionsSection.classList.remove('hidden');
      tableSection.classList.remove('hidden');
      emptyState.classList.add('hidden');
      errorState.classList.add('hidden');
    }

    function showLoading() {
      loadingState.classList.remove('hidden');
      statsSection.classList.add('hidden');
      actionsSection.classList.add('hidden');
      tableSection.classList.add('hidden');
      emptyState.classList.add('hidden');
      errorState.classList.add('hidden');
    }

    function showError(message) {
      loadingState.classList.add('hidden');
      statsSection.classList.add('hidden');
      actionsSection.classList.add('hidden');
      tableSection.classList.add('hidden');
      emptyState.classList.add('hidden');
      errorState.classList.remove('hidden');
      
      const errorElement = document.getElementById('error-message');
      if (errorElement) {
        errorElement.textContent = message;
      }
    }

    function showEmpty() {
      loadingState.classList.add('hidden');
      statsSection.classList.add('hidden');
      actionsSection.classList.add('hidden');
      tableSection.classList.add('hidden');
      emptyState.classList.remove('hidden');
      errorState.classList.add('hidden');
    }
  <\/script> `])), maybeRenderHead(), stats.pending || 0, stats.reviewing || 0, stats.quoted || 0, stats.ordered || 0) })}`;
}, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/admin.astro", void 0);

const $$file = "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/admin.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Admin,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
