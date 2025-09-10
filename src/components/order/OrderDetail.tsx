import React, { useState, useEffect } from 'react';
import { createClient } from '../../lib/supabase/client';
import { useStore } from '@nanostores/react';
import { userStore } from '../../stores/sessionStore';

interface OrderDetailProps {
  quoteId: string;
  language?: 'zh' | 'en';
  onBack: () => void;
}

interface QuoteDetail {
  id: string | number;
  token: string;
  contact_name: string;
  email: string;
  product_name: string;
  material: string;
  quantity: number;
  total_amount?: number;
  status: string;
  created_at: string;
  special_requirements?: string;
  delivery_time_days?: number;
  quote_breakdown_items?: Array<{
    description: string;
    quantity: number;
    unit_price: number;
    total_price: number;
  }>;
}

export default function OrderDetail({ quoteId, language = 'zh', onBack }: OrderDetailProps) {
  const supabase = createClient();
  const user = useStore(userStore);
  const [quote, setQuote] = useState<QuoteDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const text = {
    zh: {
      backToList: '返回订单列表',
      orderDetail: '订单详情',
      loading: '加载中...',
      notFound: '订单不存在或无权限访问',
      basicInfo: '基本信息',
      productName: '产品名称',
      material: '材料',
      quantity: '数量',
      pieces: '件',
      status: '状态',
      created: '创建时间',
      specialReq: '特殊要求',
      deliveryTime: '预计交期',
      days: '天',
      priceBreakdown: '报价明细',
      item: '项目',
      unitPrice: '单价',
      total: '小计',
      grandTotal: '总计',
      payNow: '立即支付',
      viewPaymentPage: '查看详细支付页面',
      materials: {
        'aluminum': '铝合金',
        'steel': '碳钢',
        'stainless_steel': '不锈钢',
        'brass': '黄铜',
        'titanium': '钛合金',
        'plastic': '塑料',
        'other': '其他'
      },
      statusMap: {
        'new': '新订单',
        'pending': '待处理',
        'processing': '处理中',
        'quoted': '已报价',
        'approved': '已确认',
        'in_production': '生产中',
        'completed': '已完成',
        'cancelled': '已取消'
      }
    },
    en: {
      backToList: 'Back to Order List',
      orderDetail: 'Order Detail',
      loading: 'Loading...',
      notFound: 'Order not found or access denied',
      basicInfo: 'Basic Information',
      productName: 'Product Name',
      material: 'Material',
      quantity: 'Quantity',
      pieces: 'pcs',
      status: 'Status',
      created: 'Created',
      specialReq: 'Special Requirements',
      deliveryTime: 'Estimated Delivery',
      days: 'days',
      priceBreakdown: 'Price Breakdown',
      item: 'Item',
      unitPrice: 'Unit Price',
      total: 'Total',
      grandTotal: 'Grand Total',
      payNow: 'Pay Now',
      viewPaymentPage: 'View Payment Page',
      materials: {
        'aluminum': 'Aluminum',
        'steel': 'Carbon Steel',
        'stainless_steel': 'Stainless Steel',
        'brass': 'Brass',
        'titanium': 'Titanium',
        'plastic': 'Plastic',
        'other': 'Other'
      },
      statusMap: {
        'new': 'New',
        'pending': 'Pending',
        'processing': 'Processing',
        'quoted': 'Quoted',
        'approved': 'Approved',
        'in_production': 'In Production',
        'completed': 'Completed',
        'cancelled': 'Cancelled'
      }
    }
  };

  const t = text[language];

  useEffect(() => {
    if (!user || !quoteId) return;

    const loadQuoteDetail = async () => {
      try {
        console.log('🔍 加载订单详情，quote_id:', quoteId);
        
        const { data: quoteData, error } = await supabase
          .from('quotes')
          .select(`
            *,
            quote_breakdown_items (
              description,
              quantity,
              unit_price,
              total_price
            )
          `)
          .eq('id', quoteId)
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('❌ 查询订单详情失败:', error);
          setError(t.notFound);
        } else if (quoteData) {
          console.log('✅ 成功加载订单详情');
          setQuote(quoteData);
        } else {
          setError(t.notFound);
        }
      } catch (error) {
        console.error('❌ 加载订单详情异常:', error);
        setError(t.notFound);
      } finally {
        setLoading(false);
      }
    };

    loadQuoteDetail();
  }, [user, quoteId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'new': 'bg-blue-100 text-blue-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'processing': 'bg-orange-100 text-orange-800',
      'quoted': 'bg-purple-100 text-purple-800',
      'approved': 'bg-green-100 text-green-800',
      'in_production': 'bg-indigo-100 text-indigo-800',
      'completed': 'bg-gray-100 text-gray-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-2">
            <div className="animate-spin h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full"></div>
            <span className="text-gray-600">{t.loading}</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !quote) {
    return (
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.137 0-4.146-.832-5.657-2.343"></path>
          </svg>
          <p className="text-gray-500 text-lg mb-4">{error || t.notFound}</p>
          <button
            onClick={onBack}
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            {t.backToList}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* 顶部导航 */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          {t.backToList}
        </button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t.orderDetail}</h1>
            <p className="text-gray-600 font-mono">#{String(quote.id).slice(0, 8)}</p>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(quote.status)}`}>
            {t.statusMap[quote.status] || quote.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧：订单信息 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 基本信息 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t.basicInfo}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">{t.productName}</label>
                <p className="mt-1 text-gray-900">{quote.product_name}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500">{t.material}</label>
                <p className="mt-1 text-gray-900">{t.materials[quote.material] || quote.material}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500">{t.quantity}</label>
                <p className="mt-1 text-gray-900">{quote.quantity} {t.pieces}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500">{t.created}</label>
                <p className="mt-1 text-gray-900">{formatDate(quote.created_at)}</p>
              </div>

              {quote.delivery_time_days && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">{t.deliveryTime}</label>
                  <p className="mt-1 text-gray-900">{quote.delivery_time_days} {t.days}</p>
                </div>
              )}
            </div>

            {quote.special_requirements && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-500">{t.specialReq}</label>
                <p className="mt-1 text-gray-900">{quote.special_requirements}</p>
              </div>
            )}
          </div>

          {/* 报价明细 */}
          {(quote.total_amount || quote.quote_breakdown_items?.length > 0) && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t.priceBreakdown}</h2>
              
              {quote.quote_breakdown_items && quote.quote_breakdown_items.length > 0 ? (
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 font-semibold text-gray-900">{t.item}</th>
                          <th className="text-center py-2 font-semibold text-gray-900">{t.quantity}</th>
                          <th className="text-right py-2 font-semibold text-gray-900">{t.unitPrice}</th>
                          <th className="text-right py-2 font-semibold text-gray-900">{t.total}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {quote.quote_breakdown_items.map((item, index) => (
                          <tr key={index} className="border-b border-gray-100">
                            <td className="py-2">{item.description}</td>
                            <td className="py-2 text-center">{item.quantity}</td>
                            <td className="py-2 text-right">¥{item.unit_price.toFixed(2)}</td>
                            <td className="py-2 text-right font-semibold">¥{item.total_price.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span className="text-gray-900">{t.grandTotal}</span>
                      <span className="text-purple-600">¥{quote.total_amount?.toFixed(2) || '0.00'}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="text-2xl font-bold text-purple-600">
                    ¥{quote.total_amount?.toFixed(2) || '待报价'}
                  </div>
                </div>
              )}

              {/* 支付按钮 */}
              {quote.status === 'quoted' && quote.total_amount && (
                <div className="mt-6 space-y-3">
                  <a
                    href={`/${language}/order/${quote.id}/payment`}
                    className="block w-full text-center bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold py-3 px-6 rounded-md hover:from-purple-700 hover:to-blue-600 transition-colors"
                  >
                    {t.payNow} ¥{quote.total_amount.toFixed(2)}
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 右侧：联系信息和操作 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {language === 'zh' ? '联系信息' : 'Contact Info'}
            </h2>
            
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-500">
                  {language === 'zh' ? '联系人：' : 'Contact: '}
                </span>
                <span className="font-medium">{quote.contact_name}</span>
              </div>
              <div>
                <span className="text-gray-500">
                  {language === 'zh' ? '邮箱：' : 'Email: '}
                </span>
                <span className="font-medium">{quote.email}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={onBack}
                className="w-full bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
              >
                {t.backToList}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}