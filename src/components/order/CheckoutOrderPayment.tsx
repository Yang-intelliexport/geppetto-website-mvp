import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { userStore, sessionStore, authLoadingStore } from '../../stores/sessionStore';
import { createClient } from '../../lib/supabase/client';
import { createPaymentSession } from '../../utils/supabase';
import type { User } from '@supabase/supabase-js';

interface CheckoutOrderPaymentProps {
  orderId: string;
  language?: 'zh' | 'en';
}

interface Quote {
  id: string | number;
  material: string;
  quantity: number;
  total_amount?: number;
  product_name?: string;
  status: string;
  currency?: string;
  created_at?: string;
  profiles?: {
    contact_name: string;
    email: string;
  };
  quote_breakdown_items?: Array<{
    description: string;
    quantity: number;
    unit_price: number;
    total_price: number;
  }>;
}

export default function CheckoutOrderPayment({ orderId, language = 'zh' }: CheckoutOrderPaymentProps) {
  const supabase = createClient();
  const user = useStore(userStore);
  const session = useStore(sessionStore);
  const authLoading = useStore(authLoadingStore);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [paymentLoading, setPaymentLoading] = useState(false);

  const text = {
    zh: {
      title: '订单支付',
      loading: '加载中...',
      loginRequired: '请登录后进行支付',
      orderNotFound: '订单不存在或无权限访问',
      orderInfo: '订单信息',
      productName: '产品名称',
      material: '材料',
      quantity: '数量',
      pieces: '件',
      priceBreakdown: '价格明细',
      item: '项目',
      unitPrice: '单价',
      total: '小计',
      grandTotal: '总计',
      paymentSection: '支付信息',
      securePayment: '安全支付',
      paymentNote: '点击下方按钮将跳转到安全的 Stripe 支付页面',
      checkoutButton: '前往支付',
      processing: '跳转中...',
      paymentFailed: '支付跳转失败，请重试',
      materials: {
        'aluminum': '铝合金',
        'steel': '碳钢',
        'stainless_steel': '不锈钢',
        'brass': '黄铜',
        'titanium': '钛合金',
        'plastic': '塑料',
        'other': '其他'
      }
    },
    en: {
      title: 'Order Payment',
      loading: 'Loading...',
      loginRequired: 'Please login to make payment',
      orderNotFound: 'Order not found or access denied',
      orderInfo: 'Order Information',
      productName: 'Product Name',
      material: 'Material',
      quantity: 'Quantity',
      pieces: 'pcs',
      priceBreakdown: 'Price Breakdown',
      item: 'Item',
      unitPrice: 'Unit Price',
      total: 'Total',
      grandTotal: 'Grand Total',
      paymentSection: 'Payment Information',
      securePayment: 'Secure Payment',
      paymentNote: 'Click the button below to proceed to secure Stripe payment page',
      checkoutButton: 'Proceed to Payment',
      processing: 'Redirecting...',
      paymentFailed: 'Payment redirect failed, please try again',
      materials: {
        'aluminum': 'Aluminum',
        'steel': 'Carbon Steel',
        'stainless_steel': 'Stainless Steel',
        'brass': 'Brass',
        'titanium': 'Titanium',
        'plastic': 'Plastic',
        'other': 'Other'
      }
    }
  };

  const t = text[language];

  useEffect(() => {
    const checkAuthAndLoadOrder = async () => {
      try {
        console.log('🔍 [CheckoutOrderPayment] 认证状态检查:', {
          authLoading,
          hasUser: !!user,
          hasSession: !!session,
          userId: user?.id,
          orderId,
          timestamp: new Date().toISOString()
        });
        
        // 等待认证状态完全加载
        if (authLoading) {
          return;
        }
        
        if (!user || !session) {
          console.log('❌ [CheckoutOrderPayment] 认证失败，需要登录');
          setMessage(t.loginRequired);
          return;
        }
        
        console.log('✅ [CheckoutOrderPayment] 认证成功，开始查询订单:', {
          userId: user.id,
          orderId
        });

        // 先查询订单信息
        const { data: quoteData, error: quoteError } = await supabase
          .from('quotes')
          .select(`
            id,
            material,
            quantity,
            total_amount,
            status,
            currency,
            created_at,
            customer_notes,
            user_id,
            quote_breakdown_items (
              description,
              quantity,
              unit_price,
              total_price
            )
          `)
          .eq('id', orderId)
          .eq('user_id', user.id)
          .single();

        if (quoteError || !quoteData) {
          console.error('❌ [CheckoutOrderPayment] 查询订单失败:', {
            error: quoteError,
            orderId,
            userId: user.id,
            hasData: !!quoteData
          });
          setMessage(t.orderNotFound);
          return;
        }

        // 暂时不查询profiles，使用默认数据
        const displayData = {
          ...quoteData,
          profiles: { 
            contact_name: 'Customer', 
            email: user.email || 'user@example.com' 
          }
        };

        console.log('📊 订单数据:', {
          id: displayData.id,
          total_amount: displayData.total_amount,
          status: displayData.status,
          material: displayData.material,
          quantity: displayData.quantity
        });

        setQuote(displayData);
      } catch (error) {
        console.error('加载订单失败:', error);
        setMessage(t.orderNotFound);
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndLoadOrder();
  }, [orderId, language, user, session, authLoading]);

  const handleCheckout = async () => {
    if (!quote || paymentLoading) return;

    console.log('🛒 开始支付流程:', { 
      quoteId: quote.id, 
      totalAmount: quote.total_amount,
      email: quote.profiles?.email 
    });

    setPaymentLoading(true);
    setMessage('');

    try {
      console.log('🔄 创建支付会话，订单ID:', quote.id);
      
      // 调用现有的 createPaymentSession 函数
      const paymentData = await createPaymentSession(String(quote.id));
      
      console.log('📋 支付数据返回:', paymentData);
      
      if (paymentData && paymentData.url) {
        console.log('✅ 支付会话创建成功，跳转到:', paymentData.url);
        window.location.href = paymentData.url;
      } else {
        console.error('❌ 支付数据格式错误:', paymentData);
        throw new Error('未返回支付URL');
      }
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      console.error('❌ 创建支付会话失败:', {
        error: errorMessage,
        stack: errorStack,
        quoteId: quote.id
      });
      setMessage(errorMessage || t.paymentFailed);
    } finally {
      setPaymentLoading(false);
    }
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

  if (message && !quote) {
    return (
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-800">{message}</p>
        </div>
      </div>
    );
  }

  if (!quote) return null;

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{t.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧：订单信息 */}
          <div className="space-y-6">
            {/* 基本信息 */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t.orderInfo}</h2>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-500">{t.productName}</label>
                  <p className="mt-1 text-gray-900">{quote.product_name || 'CNC Machined Part'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">{t.material}</label>
                  <p className="mt-1 text-gray-900">{t.materials[quote.material as keyof typeof t.materials] || quote.material}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">{t.quantity}</label>
                  <p className="mt-1 text-gray-900">{quote.quantity} {t.pieces}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">状态 / Status</label>
                  <p className="mt-1 text-gray-900">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      quote.status === 'paid' ? 'bg-green-100 text-green-800' :
                      quote.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {quote.status === 'paid' ? 'Paid' : quote.status}
                    </span>
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">总金额 / Amount</label>
                  <p className="mt-1 text-gray-900 text-lg font-semibold">
                    ${quote.total_amount?.toFixed(2) || '0.00'} {quote.currency?.toUpperCase() || 'USD'}
                  </p>
                </div>

                {quote.created_at && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">创建时间 / Created</label>
                    <p className="mt-1 text-gray-900">
                      {new Date(quote.created_at).toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* 价格明细 */}
            {quote.quote_breakdown_items && quote.quote_breakdown_items.length > 0 && (
              <div className="border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{t.priceBreakdown}</h2>
                
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
                          <td className="py-2 text-right">${item.unit_price.toFixed(2)}</td>
                          <td className="py-2 text-right font-semibold">${item.total_price.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-gray-900">{t.grandTotal}</span>
                    <span className="text-purple-600">${quote.total_amount?.toFixed(2) || '0.00'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* 简化显示（无明细时） */}
            {(!quote.quote_breakdown_items || quote.quote_breakdown_items.length === 0) && quote.total_amount && (
              <div className="border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{t.priceBreakdown}</h2>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    ${quote.total_amount.toFixed(2)}
                  </div>
                  <p className="text-gray-600 mt-2">{t.grandTotal}</p>
                </div>
              </div>
            )}
          </div>

          {/* 右侧：支付区域 */}
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">🔒 {t.securePayment}</h2>
              
              <div className="text-center space-y-6">
                {/* Stripe Logo */}
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-gray-600">{language === 'zh' ? '安全支付由' : 'Secure payment powered by'}</span>
                  <img 
                    src="https://js.stripe.com/v3/fingerprinted/img/stripe-logo-slate_small-3d0c0f37c.png" 
                    alt="Stripe" 
                    className="h-6 opacity-80"
                  />
                </div>

                <p className="text-gray-600">{t.paymentNote}</p>

                {/* 支付按钮 */}
                <button
                  onClick={handleCheckout}
                  disabled={paymentLoading || !quote.total_amount}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold py-4 px-6 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {paymentLoading ? (
                    <>
                      <span className="inline-flex items-center">
                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-3"></div>
                        {t.processing}
                      </span>
                    </>
                  ) : (
                    `🔒 ${t.checkoutButton} $${quote.total_amount?.toFixed(2) || '0.00'}`
                  )}
                </button>

                {/* 错误消息 */}
                {message && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 text-sm">{message}</p>
                  </div>
                )}

                {/* 支付保障 */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-green-800 font-medium">
                      {language === 'zh' ? '安全保障' : 'Secure Payment'}
                    </span>
                  </div>
                  <div className="text-green-700 text-sm space-y-1">
                    <div>• {language === 'zh' ? '256位SSL加密' : '256-bit SSL encryption'}</div>
                    <div>• {language === 'zh' ? '支持信用卡、PayPal' : 'Credit cards & PayPal supported'}</div>
                    <div>• {language === 'zh' ? '支付完成后立即开始生产' : 'Production starts immediately after payment'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}