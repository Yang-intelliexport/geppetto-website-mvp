import React, { useState, useEffect } from 'react';
import { createClient } from '../../lib/supabase/client';
import { useStore } from '@nanostores/react';
import { userStore } from '../../stores/sessionStore';

interface OrderTrackerProps {
  language?: 'zh' | 'en';
}

interface Quote {
  id: string | number;
  contact_name: string;
  email: string;
  material: string;
  quantity: number;
  total_amount?: number;
  currency?: string;
  status: string;
  created_at: string;
  product_name?: string;
}

export default function OrderTracker({ language = 'zh' }: OrderTrackerProps) {
  const user = useStore(userStore);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  const text = {
    zh: {
      title: '我的订单',
      noOrders: '暂无订单',
      createQuote: '立即创建报价请求',
      viewDetails: '查看详情',
      payNow: '立即支付',
      loggedInAs: '登录为',
      quantity: '数量',
      amount: '金额',
      created: '创建时间',
      pieces: '件'
    },
    en: {
      title: 'My Orders',
      noOrders: 'No orders yet',
      createQuote: 'Create Quote Request',
      viewDetails: 'View Details',
      payNow: 'Pay Now',
      loggedInAs: 'Logged in as',
      quantity: 'Quantity',
      amount: 'Amount',
      created: 'Created',
      pieces: 'pcs'
    }
  };

  const t = text[language];

  // 加载用户订单
  useEffect(() => {
    if (!user) return;

    const loadOrders = async () => {
      try {
        console.log('🔍 加载用户订单，user_id:', user.id);
        
        const { data: quotesData, error } = await supabase
          .from('quotes')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('❌ 查询订单失败:', error);
        } else {
          console.log('✅ 成功加载订单:', quotesData?.length || 0, '条');
          setQuotes(quotesData || []);
        }
      } catch (error) {
        console.error('❌ 加载订单异常:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [user]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'new': 'bg-blue-100 text-blue-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'processing': 'bg-orange-100 text-orange-800',
      'quoted': 'bg-purple-100 text-purple-800',
      'approved': 'bg-green-100 text-green-800',
      'paid': 'bg-green-100 text-green-800',
      'in_production': 'bg-indigo-100 text-indigo-800',
      'completed': 'bg-gray-100 text-gray-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };


  const OrderRow = ({ quote, index }: { quote: Quote; index: number }) => (
    <div className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* 左侧：序号和基本信息 */}
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
            {index + 1}
          </div>
          
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-3">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {quote.product_name || `${quote.material} ${language === 'zh' ? '加工件' : 'Part'}`}
              </h3>
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(quote.status)}`}>
                {quote.status}
              </span>
            </div>
            <p className="text-xs text-gray-500 font-mono mt-1">#{String(quote.id).slice(0, 8)}</p>
          </div>
        </div>

        {/* 中间：关键数据 */}
        <div className="hidden md:flex items-center space-x-8 text-sm">
          <div className="text-center">
            <div className="text-gray-500 text-xs">{t.quantity}</div>
            <div className="font-medium">{quote.quantity} {t.pieces}</div>
          </div>
          
          <div className="text-center">
            <div className="text-gray-500 text-xs">{t.amount}</div>
            <div className="font-medium text-green-600">
              {quote.total_amount ? `$${quote.total_amount.toFixed(2)} ${(quote.currency || 'USD').toUpperCase()}` : (language === 'zh' ? '待报价' : 'Pending')}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-gray-500 text-xs">{t.created}</div>
            <div className="font-medium">{formatDate(quote.created_at)}</div>
          </div>
        </div>

        {/* 右侧：操作按钮 */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              const currentUrl = new URL(window.location.href);
              currentUrl.searchParams.set('quote_id', String(quote.id));
              window.history.pushState(null, '', currentUrl.toString());
              window.location.reload();
            }}
            className="px-3 py-1.5 text-xs border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
          >
            {t.viewDetails}
          </button>
          {quote.status === 'quoted' && quote.total_amount && (
            <a
              href={`/${language}/order/${quote.id}/payment`}
              className="px-3 py-1.5 text-xs bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              {t.payNow}
            </a>
          )}
        </div>
      </div>

      {/* 移动端：显示额外信息 */}
      <div className="md:hidden px-6 pb-4">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-500 text-xs">{t.quantity}:</span>
            <div className="font-medium">{quote.quantity} {t.pieces}</div>
          </div>
          <div>
            <span className="text-gray-500 text-xs">{t.amount}:</span>
            <div className="font-medium text-green-600">
              {quote.total_amount ? `$${quote.total_amount.toFixed(2)}` : (language === 'zh' ? '待报价' : 'Pending')}
            </div>
          </div>
          <div>
            <span className="text-gray-500 text-xs">{t.created}:</span>
            <div className="font-medium">{formatDate(quote.created_at)}</div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center space-x-2">
          <div className="animate-spin h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full"></div>
          <span className="text-gray-600">{language === 'zh' ? '加载中...' : 'Loading...'}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* 用户信息和订单标题 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{t.title}</h2>
          <div className="text-sm text-gray-600">
            {t.loggedInAs}: {user?.email}
          </div>
        </div>
        
        {quotes.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2m-2 0V3a2 2 0 112 0v2m-2 0a2 2 0 110 0"></path>
            </svg>
            <p className="text-gray-500 text-lg mb-4">{t.noOrders}</p>
            <a 
              href={`/${language}/create-quote`}
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              {t.createQuote}
            </a>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* 表头 */}
            <div className="hidden md:block bg-gray-50 border-b border-gray-200 px-6 py-3">
              <div className="flex items-center justify-between text-xs font-medium text-gray-500 uppercase tracking-wide">
                <div className="flex items-center space-x-4">
                  <div className="w-8"></div> {/* 序号占位 */}
                  <div className="flex-1">
                    {language === 'zh' ? '订单信息' : 'Order Info'}
                  </div>
                </div>
                <div className="flex items-center space-x-8">
                  <div className="text-center">{t.quantity}</div>
                  <div className="text-center">{t.amount}</div>
                  <div className="text-center">{t.created}</div>
                  <div className="w-24">{language === 'zh' ? '操作' : 'Actions'}</div>
                </div>
              </div>
            </div>
            
            {/* 订单队列 */}
            <div className="divide-y divide-gray-200">
              {quotes.map((quote, index) => (
                <OrderRow key={quote.id} quote={quote} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}