import React, { useState, useEffect } from 'react';
import { getUserQuotes } from '../../utils/supabase.js';
import { hasValidAuth, requireEmailVerification, checkUserPermission, isValidEmail } from '../../utils/authUtils.js';
import { showError } from '../../stores/modalStore.js';
import { createI18nHook, type Language } from '../../utils/i18n-components.ts';

// 组件专用文本定义
const myOrdersTexts = {
  zh: {
    emailLabel: '邮箱地址',
    emailPlaceholder: '输入您的邮箱地址',
    viewOrdersButton: '查看我的订单',
    verifying: '验证中...',
    loading: '加载中...',
    changeEmail: '更换邮箱',
    orderHistory: '的订单历史',
    noOrdersTitle: '暂无订单记录',
    noOrdersDesc: '使用此邮箱地址未找到任何订单',
    getQuoteButton: '立即获取报价',
    verificationSentTitle: '验证邮件已发送',
    verificationSentDesc: '我们已向',
    sentVerificationEmail: '发送了验证邮件',
    checkEmailNote: '请检查您的邮箱（包括垃圾邮件箱）',
    verificationInstructions: '点击邮件中的链接完成验证，验证成功后会自动显示您的订单',
    verificationValidity: '验证权限将保存15天，期间无需重复验证',
    backToInput: '← 返回重新输入邮箱',
    processingQuote: '报价处理中',
    material: '材料',
    quantity: '数量',
    deliveryTime: '交期',
    days: '天',
    emailVerificationSuccess: '邮箱验证成功！',
    invalidEmailFormat: '邮箱格式错误',
    enterValidEmail: '请输入有效的邮箱地址',
    permissionError: '权限错误',
    sendingVerificationEmail: '正在发送验证邮件...',
    sendFailed: '发送失败',
    verificationEmailFailed: '发送验证邮件失败',
    unknownError: '未知错误',
    noOrdersFoundConfirmEmail: '未找到相关订单记录。请确认邮箱地址是否正确。',
    loadingFailed: '加载失败',
    loadOrdersFailed: '加载订单失败'
  },
  en: {
    emailLabel: 'Email Address',
    emailPlaceholder: 'Enter your email address',
    viewOrdersButton: 'View My Orders',
    verifying: 'Verifying...',
    loading: 'Loading...',
    changeEmail: 'Change Email',
    orderHistory: '\'s Order History',
    noOrdersTitle: 'No Order Records',
    noOrdersDesc: 'No orders found for this email address',
    getQuoteButton: 'Get Quote Now',
    verificationSentTitle: 'Verification Email Sent',
    verificationSentDesc: 'We have sent a verification email to',
    sentVerificationEmail: 'sent a verification email',
    checkEmailNote: 'Please check your inbox (including spam folder)',
    verificationInstructions: 'Click the link in the email to complete verification. Your orders will be displayed automatically after verification.',
    verificationValidity: 'Verification permission will be saved for 15 days, no need to verify again during this period',
    backToInput: '← Back to re-enter email',
    processingQuote: 'Quote Processing',
    material: 'Material',
    quantity: 'Quantity',
    deliveryTime: 'Delivery',
    days: 'days',
    emailVerificationSuccess: 'Email verification successful!',
    invalidEmailFormat: 'Invalid Email Format',
    enterValidEmail: 'Please enter a valid email address',
    permissionError: 'Permission Error',
    sendingVerificationEmail: 'Sending verification email...',
    sendFailed: 'Send Failed',
    verificationEmailFailed: 'Failed to send verification email',
    unknownError: 'Unknown error',
    noOrdersFoundConfirmEmail: 'No order records found. Please confirm if the email address is correct.',
    loadingFailed: 'Loading Failed',
    loadOrdersFailed: 'Failed to load orders'
  }
} as const;

// 创建专用的国际化Hook
const useMyOrdersI18n = createI18nHook('MyOrdersList', myOrdersTexts);

interface Quote {
  id: string;
  token: string;
  contact_name: string;
  product_name: string;
  material: string;
  quantity: number;
  status: 'pending' | 'processing' | 'quoted' | 'approved' | 'in_production' | 'completed' | 'cancelled';
  total_price?: number;
  created_at: string;
  delivery_time_days?: number;
}

interface ImprovedMyOrdersListProps {
  initialEmail?: string;
  authResult?: string | null;
  currentLang?: Language;
}

export default function ImprovedMyOrdersList({ 
  initialEmail = '', 
  authResult = null, 
  currentLang = 'zh' 
}: ImprovedMyOrdersListProps) {
  const [email, setEmail] = useState(initialEmail);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [needsVerification, setNeedsVerification] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // 使用国际化Hook
  const { t, common, getOrderStatus, getMaterial, formatDate } = useMyOrdersI18n(currentLang);

  // 状态配色映射
  const statusColorMap = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'processing': 'bg-blue-100 text-blue-800',
    'quoted': 'bg-green-100 text-green-800',
    'approved': 'bg-purple-100 text-purple-800',
    'in_production': 'bg-indigo-100 text-indigo-800',
    'completed': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800'
  };

  useEffect(() => {
    // 检查是否有认证回调
    if (authResult) {
      try {
        const result = JSON.parse(authResult);
        if (result && result.email) {
          setEmail(result.email);
          setIsVerified(true);
          setMessage(t.emailVerificationSuccess);
          // 自动加载订单
          loadOrders(result.email);
        }
      } catch (error) {
        console.error('解析认证结果失败:', error);
      }
    }
  }, [authResult]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !isValidEmail(email)) {
      showError(t.invalidEmailFormat, t.enterValidEmail);
      return;
    }

    // 检查邮箱权限
    const permissionCheck = checkUserPermission(email, '查看订单');
    if (permissionCheck.hasPermission) {
      // 已验证，直接加载订单
      await loadOrders(email);
    } else if (permissionCheck.reason === 'need_verification') {
      // 需要验证
      await sendVerificationEmail();
    } else {
      showError(t.permissionError, permissionCheck.message);
    }
  };

  const sendVerificationEmail = async () => {
    try {
      setLoading(true);
      setError('');
      setMessage(t.sendingVerificationEmail);
      
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('email', email);
      
      await requireEmailVerification(email, 'order_query', currentUrl.toString());
      
      setNeedsVerification(true);
      setMessage('');
      setError('');
    } catch (error: any) {
      showError(
        t.sendFailed,
        `${t.verificationEmailFailed}: ${error.message || t.unknownError}`
      );
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  const loadOrders = async (emailAddress: string) => {
    try {
      setLoading(true);
      setError('');
      setMessage('');
      setNeedsVerification(false);
      
      const quotesData = await getUserQuotes(emailAddress);
      setQuotes(quotesData || []);
      setIsVerified(true);
      
      if (!quotesData || quotesData.length === 0) {
        setMessage(t.noOrdersFoundConfirmEmail);
      }
    } catch (error: any) {
      console.error('加载订单失败:', error);
      showError(
        t.loadingFailed,
        `${t.loadOrdersFailed}: ${error.message || t.unknownError}`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleQuoteClick = (token: string) => {
    window.location.href = `/${currentLang}/quote/${token}`;
  };

  if (needsVerification) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
            </svg>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900">{t.verificationSentTitle}</h3>
          <p className="text-gray-600">
            {t.verificationSentDesc} <strong className="text-purple-600">{email}</strong> {t.sentVerificationEmail}
          </p>
          
          <div className="space-y-2 text-sm text-gray-500">
            <p>{t.checkEmailNote}</p>
            <p>{t.verificationInstructions}</p>
            <p>{t.verificationValidity}</p>
          </div>
          
          <div className="pt-4 border-t">
            <button
              onClick={() => setNeedsVerification(false)}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              {t.backToInput}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 邮箱输入表单 */}
      {!isVerified && (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t.emailLabel}
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder={t.emailPlaceholder}
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? t.verifying : t.viewOrdersButton}
            </button>
          </form>
          
          {message && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-blue-700 text-sm">
              {message}
            </div>
          )}
        </div>
      )}

      {/* 订单列表 */}
      {isVerified && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {email}{t.orderHistory}
            </h2>
            <button
              onClick={() => {
                setIsVerified(false);
                setQuotes([]);
                setEmail('');
              }}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              {t.changeEmail}
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">{common.loading}</p>
            </div>
          ) : quotes.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t.noOrdersTitle}</h3>
              <p className="text-gray-600 mb-4">{t.noOrdersDesc}</p>
              <a href={`/${currentLang}/ai-quote`} className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                {t.getQuoteButton}
              </a>
            </div>
          ) : (
            <div className="grid gap-4">
              {quotes.map((quote) => (
                <div
                  key={quote.id}
                  onClick={() => handleQuoteClick(quote.token)}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900">#{quote.token}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColorMap[quote.status]}`}>
                          {getOrderStatus(quote.status)}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-2">{quote.product_name}</p>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <span>{t.material}: {getMaterial(quote.material)}</span>
                        <span>{t.quantity}: {quote.quantity}</span>
                        {quote.delivery_time_days && (
                          <span>{t.deliveryTime}: {quote.delivery_time_days} {t.days}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      {quote.total_price ? (
                        <div className="text-lg font-semibold text-purple-600">
                          ${quote.total_price.toFixed(2)}
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500">
                          {t.processingQuote}
                        </div>
                      )}
                      <div className="text-xs text-gray-400 mt-1">
                        {formatDate(quote.created_at)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}