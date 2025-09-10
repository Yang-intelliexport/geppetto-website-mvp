import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { g as getCurrentSession, s as sendMagicLink, a as getUserQuotes } from './supabase_cGWeccMZ.mjs';
import { map, atom } from 'nanostores';

// 权限验证工具函数
// 基于Magic Link的安全访问控制


/**
 * 权限缓存键名
 */
const AUTH_CACHE_KEY = 'geppetto_auth_cache';
const CACHE_DURATION = 15 * 24 * 60 * 60 * 1000; // 15天毫秒数

/**
 * 权限缓存数据结构
 * @typedef {Object} AuthCache
 * @property {string} email - 已验证的邮箱
 * @property {number} timestamp - 验证时间戳
 * @property {string} sessionId - 会话标识
 */

/**
 * 检查用户是否已验证邮箱权限
 * @param {string} email - 邮箱地址
 * @returns {boolean} 是否已验证
 */
function hasValidAuth(email) {
  try {
    const cached = localStorage.getItem(AUTH_CACHE_KEY);
    if (!cached) return false;

    const authData = JSON.parse(cached);
    
    // 检查邮箱匹配
    if (authData.email !== email) return false;
    
    // 检查是否过期（15天）
    const now = Date.now();
    if (now - authData.timestamp > CACHE_DURATION) {
      // 过期，清除缓存
      clearAuthCache();
      return false;
    }
    
    console.log('✅ 邮箱权限验证有效:', email);
    return true;
  } catch (error) {
    console.error('❌ 权限验证检查失败:', error);
    clearAuthCache();
    return false;
  }
}

/**
 * 保存邮箱验证权限到本地缓存
 * @param {string} email - 已验证的邮箱
 * @param {string} sessionId - 会话标识（可选）
 */
function saveAuthCache(email, sessionId = null) {
  try {
    const authData = {
      email,
      timestamp: Date.now(),
      sessionId: sessionId || generateSessionId()
    };
    
    localStorage.setItem(AUTH_CACHE_KEY, JSON.stringify(authData));
    console.log('✅ 邮箱权限缓存已保存:', email, '有效期15天');
  } catch (error) {
    console.error('❌ 保存权限缓存失败:', error);
  }
}

/**
 * 清除权限缓存
 */
function clearAuthCache() {
  try {
    localStorage.removeItem(AUTH_CACHE_KEY);
    console.log('🧹 权限缓存已清除');
  } catch (error) {
    console.error('❌ 清除权限缓存失败:', error);
  }
}

/**
 * 需要邮箱验证时的处理函数
 * @param {string} email - 需要验证的邮箱
 * @param {string} purpose - 验证目的（如'quote_submit', 'order_query'）
 * @param {string} redirectUrl - 验证成功后的重定向地址
 * @returns {Promise<boolean>} 是否发送成功
 */
async function requireEmailVerification(email, purpose, redirectUrl) {
  try {
    console.log('📧 需要邮箱验证:', email, 'purpose:', purpose);
    
    // 构造验证成功后的回调URL，包含必要参数
    const callbackUrl = new URL(redirectUrl, window.location.origin);
    callbackUrl.searchParams.set('auth_email', email);
    callbackUrl.searchParams.set('auth_purpose', purpose);
    callbackUrl.searchParams.set('auth_timestamp', Date.now().toString());
    
    await sendMagicLink(email, callbackUrl.toString());
    
    console.log('✅ Magic Link已发送至:', email);
    return true;
  } catch (error) {
    console.error('❌ 发送验证邮件失败:', error);
    throw error;
  }
}

/**
 * 处理Magic Link验证回调
 * @param {URLSearchParams} urlParams - URL参数
 * @returns {Object|null} 验证结果
 */
async function handleAuthCallback(urlParams) {
  try {
    const email = urlParams.get('auth_email');
    const purpose = urlParams.get('auth_purpose');
    const timestamp = urlParams.get('auth_timestamp');
    
    if (!email || !purpose) {
      console.log('⚠️ 无效的认证回调参数');
      return null;
    }
    
    // 检查Supabase会话是否有效
    const session = await getCurrentSession();
    if (!session || !session.user || session.user.email !== email) {
      console.log('❌ Supabase会话无效或邮箱不匹配');
      return null;
    }
    
    // 验证成功，保存权限缓存
    saveAuthCache(email, session.access_token);
    
    console.log('✅ Magic Link验证成功:', email);
    
    return {
      email,
      purpose,
      timestamp: parseInt(timestamp),
      sessionId: session.access_token
    };
  } catch (error) {
    console.error('❌ 处理认证回调失败:', error);
    return null;
  }
}

/**
 * 生成简单的会话ID
 * @returns {string} 会话ID
 */
function generateSessionId() {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 验证邮箱格式
 * @param {string} email - 邮箱地址
 * @returns {boolean} 是否有效
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 用户友好的权限检查函数
 * @param {string} email - 邮箱地址
 * @param {string} action - 操作名称（用于显示）
 * @returns {Object} 检查结果
 */
function checkUserPermission(email, action = '访问') {
  if (!email || !isValidEmail(email)) {
    return {
      hasPermission: false,
      reason: 'invalid_email',
      message: '请输入有效的邮箱地址'
    };
  }
  
  if (hasValidAuth(email)) {
    return {
      hasPermission: true,
      message: `邮箱 ${email} 已验证，可以${action}`
    };
  }
  
  return {
    hasPermission: false,
    reason: 'need_verification',
    message: `需要验证邮箱 ${email} 才能${action}`
  };
}

// Modal状态管理 - 使用Nanostores

// 模态框状态
const modalState = map({
  isOpen: false,
  type: 'info', // 'success', 'error', 'warning', 'info', 'confirm', 'loading'
  title: '',
  message: '',
  options: {},
  id: null
});

// Toast状态 - 支持多个toast同时存在
atom([]);

// 计数器用于生成唯一ID
let modalIdCounter = 0;

/**
 * 打开模态框
 * @param {string} type - 模态框类型
 * @param {string} title - 标题
 * @param {string} message - 消息内容
 * @param {Object} options - 额外选项
 * @returns {string} 模态框ID
 */
function openModal(type, title, message, options = {}) {
  const id = `modal_${++modalIdCounter}`;
  
  modalState.set({
    isOpen: true,
    type,
    title,
    message,
    options,
    id
  });
  
  return id
}

/**
 * 显示错误模态框
 * @param {string} title - 标题
 * @param {string} message - 消息内容
 * @param {Object} options - 额外选项
 */
function showError(title, message, options = {}) {
  return openModal('error', title, message, options)
}

function MyOrdersList({ initialEmail = "", authResult = null, currentLang = "zh" }) {
  const [email, setEmail] = useState(initialEmail);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [needsVerification, setNeedsVerification] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const texts = {
    zh: {
      emailLabel: "邮箱地址",
      emailPlaceholder: "输入您的邮箱地址",
      viewOrdersButton: "查看我的订单",
      verifying: "验证中...",
      loading: "加载中...",
      changeEmail: "更换邮箱",
      orderHistory: "的订单历史",
      noOrdersTitle: "暂无订单记录",
      noOrdersDesc: "使用此邮箱地址未找到任何订单",
      getQuoteButton: "立即获取报价",
      verificationSentTitle: "验证邮件已发送",
      verificationSentDesc: "我们已向",
      checkEmailNote: "请检查您的邮箱（包括垃圾邮件箱）",
      verificationInstructions: "点击邮件中的链接完成验证，验证成功后会自动显示您的订单",
      verificationValidity: "验证权限将保存15天，期间无需重复验证",
      backToInput: "← 返回重新输入邮箱",
      processingQuote: "报价处理中",
      material: "材料",
      quantity: "数量",
      deliveryTime: "交期",
      days: "天",
      // 状态映射
      statusMap: {
        "pending": "待处理",
        "processing": "处理中",
        "quoted": "已报价",
        "approved": "已确认",
        "in_production": "生产中",
        "completed": "已完成",
        "cancelled": "已取消"
      },
      // 材料映射
      materialMap: {
        "aluminum": "铝合金",
        "steel": "碳钢",
        "stainless_steel": "不锈钢",
        "brass": "黄铜",
        "titanium": "钛合金",
        "plastic": "塑料",
        "other": "其他"
      }
    },
    en: {
      emailLabel: "Email Address",
      emailPlaceholder: "Enter your email address",
      viewOrdersButton: "View My Orders",
      verifying: "Verifying...",
      loading: "Loading...",
      changeEmail: "Change Email",
      orderHistory: "'s Order History",
      noOrdersTitle: "No Order Records",
      noOrdersDesc: "No orders found for this email address",
      getQuoteButton: "Get Quote Now",
      verificationSentTitle: "Verification Email Sent",
      verificationSentDesc: "We have sent a verification email to",
      checkEmailNote: "Please check your inbox (including spam folder)",
      verificationInstructions: "Click the link in the email to complete verification. Your orders will be displayed automatically after verification.",
      verificationValidity: "Verification permission will be saved for 15 days, no need to verify again during this period",
      backToInput: "← Back to re-enter email",
      processingQuote: "Quote Processing",
      material: "Material",
      quantity: "Quantity",
      deliveryTime: "Delivery",
      days: "days",
      // 状态映射
      statusMap: {
        "pending": "Pending",
        "processing": "Processing",
        "quoted": "Quoted",
        "approved": "Approved",
        "in_production": "In Production",
        "completed": "Completed",
        "cancelled": "Cancelled"
      },
      // 材料映射
      materialMap: {
        "aluminum": "Aluminum",
        "steel": "Steel",
        "stainless_steel": "Stainless Steel",
        "brass": "Brass",
        "titanium": "Titanium",
        "plastic": "Plastic",
        "other": "Other"
      }
    }
  };
  const t = texts[currentLang];
  const statusColorMap = {
    "pending": "bg-yellow-100 text-yellow-800",
    "processing": "bg-blue-100 text-blue-800",
    "quoted": "bg-green-100 text-green-800",
    "approved": "bg-purple-100 text-purple-800",
    "in_production": "bg-indigo-100 text-indigo-800",
    "completed": "bg-green-100 text-green-800",
    "cancelled": "bg-red-100 text-red-800"
  };
  useEffect(() => {
    if (authResult) {
      try {
        const result = JSON.parse(authResult);
        if (result && result.email) {
          setEmail(result.email);
          setIsVerified(true);
          setMessage(currentLang === "zh" ? "邮箱验证成功！" : "Email verification successful!");
          loadOrders(result.email);
        }
      } catch (error2) {
        console.error("解析认证结果失败:", error2);
      }
    }
  }, [authResult]);
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email || !isValidEmail(email)) {
      showError(
        currentLang === "zh" ? "邮箱格式错误" : "Invalid Email Format",
        currentLang === "zh" ? "请输入有效的邮箱地址" : "Please enter a valid email address"
      );
      return;
    }
    const permissionCheck = checkUserPermission(email, "查看订单");
    if (permissionCheck.hasPermission) {
      await loadOrders(email);
    } else if (permissionCheck.reason === "need_verification") {
      await sendVerificationEmail();
    } else {
      showError(
        currentLang === "zh" ? "权限错误" : "Permission Error",
        permissionCheck.message
      );
    }
  };
  const sendVerificationEmail = async () => {
    try {
      setLoading(true);
      setError("");
      setMessage(currentLang === "zh" ? "正在发送验证邮件..." : "Sending verification email...");
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set("email", email);
      await requireEmailVerification(email, "order_query", currentUrl.toString());
      setNeedsVerification(true);
      setMessage("");
      setError("");
    } catch (error2) {
      showError(
        currentLang === "zh" ? "发送失败" : "Send Failed",
        currentLang === "zh" ? "发送验证邮件失败: " + (error2.message || "未知错误") : "Failed to send verification email: " + (error2.message || "Unknown error")
      );
      setMessage("");
    } finally {
      setLoading(false);
    }
  };
  const loadOrders = async (emailAddress) => {
    try {
      setLoading(true);
      setError("");
      setMessage("");
      setNeedsVerification(false);
      const quotesData = await getUserQuotes(emailAddress);
      setQuotes(quotesData || []);
      setIsVerified(true);
      if (!quotesData || quotesData.length === 0) {
        setMessage(
          currentLang === "zh" ? "未找到相关订单记录。请确认邮箱地址是否正确。" : "No order records found. Please confirm if the email address is correct."
        );
      }
    } catch (error2) {
      console.error("加载订单失败:", error2);
      showError(
        currentLang === "zh" ? "加载失败" : "Loading Failed",
        currentLang === "zh" ? "加载订单失败: " + (error2.message || "未知错误") : "Failed to load orders: " + (error2.message || "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLang === "zh" ? "zh-CN" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  const handleQuoteClick = (token) => {
    window.location.href = `/${currentLang}/quote/${token}`;
  };
  if (needsVerification) {
    return /* @__PURE__ */ jsx("div", { className: "max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8", children: /* @__PURE__ */ jsxs("div", { className: "text-center space-y-4", children: [
      /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxs("svg", { className: "w-8 h-8 text-blue-600", fill: "currentColor", viewBox: "0 0 20 20", children: [
        /* @__PURE__ */ jsx("path", { d: "M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" }),
        /* @__PURE__ */ jsx("path", { d: "M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" })
      ] }) }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-gray-900", children: t.verificationSentTitle }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-600", children: [
        t.verificationSentDesc,
        " ",
        /* @__PURE__ */ jsx("strong", { className: "text-purple-600", children: email }),
        " ",
        currentLang === "zh" ? "发送了验证邮件" : "sent a verification email"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm text-gray-500", children: [
        /* @__PURE__ */ jsx("p", { children: t.checkEmailNote }),
        /* @__PURE__ */ jsx("p", { children: t.verificationInstructions }),
        /* @__PURE__ */ jsx("p", { children: t.verificationValidity })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "pt-4 border-t", children: /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setNeedsVerification(false),
          className: "text-purple-600 hover:text-purple-700 font-medium",
          children: t.backToInput
        }
      ) })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    !isVerified && /* @__PURE__ */ jsxs("div", { className: "max-w-md mx-auto bg-white rounded-lg shadow-md p-6", children: [
      /* @__PURE__ */ jsxs("form", { onSubmit: handleEmailSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700 mb-2", children: t.emailLabel }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              id: "email",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              required: true,
              className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent",
              placeholder: t.emailPlaceholder
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: loading,
            className: "w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
            children: loading ? t.verifying : t.viewOrdersButton
          }
        )
      ] }),
      message && /* @__PURE__ */ jsx("div", { className: "mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-blue-700 text-sm", children: message })
    ] }),
    isVerified && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold text-gray-900", children: [
          email,
          t.orderHistory
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              setIsVerified(false);
              setQuotes([]);
              setEmail("");
            },
            className: "text-sm text-gray-500 hover:text-gray-700",
            children: t.changeEmail
          }
        )
      ] }),
      loading ? /* @__PURE__ */ jsxs("div", { className: "text-center py-8", children: [
        /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-gray-600", children: t.loading })
      ] }) : quotes.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-12 bg-white rounded-lg shadow-md", children: [
        /* @__PURE__ */ jsx("svg", { className: "w-16 h-16 text-gray-400 mx-auto mb-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: t.noOrdersTitle }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-4", children: t.noOrdersDesc }),
        /* @__PURE__ */ jsx("a", { href: `/${currentLang}/ai-quote`, className: "inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors", children: t.getQuoteButton })
      ] }) : /* @__PURE__ */ jsx("div", { className: "grid gap-4", children: quotes.map((quote) => /* @__PURE__ */ jsx(
        "div",
        {
          onClick: () => handleQuoteClick(quote.token),
          className: "bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer",
          children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 mb-2", children: [
                /* @__PURE__ */ jsxs("h3", { className: "font-semibold text-gray-900", children: [
                  "#",
                  quote.token
                ] }),
                /* @__PURE__ */ jsx("span", { className: `px-2 py-1 rounded-full text-xs font-medium ${statusColorMap[quote.status]}`, children: t.statusMap[quote.status] })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-2", children: quote.product_name }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-6 text-sm text-gray-500", children: [
                /* @__PURE__ */ jsxs("span", { children: [
                  t.material,
                  ": ",
                  t.materialMap[quote.material] || quote.material
                ] }),
                /* @__PURE__ */ jsxs("span", { children: [
                  t.quantity,
                  ": ",
                  quote.quantity
                ] }),
                quote.delivery_time_days && /* @__PURE__ */ jsxs("span", { children: [
                  t.deliveryTime,
                  ": ",
                  quote.delivery_time_days,
                  " ",
                  t.days
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
              quote.total_price ? /* @__PURE__ */ jsxs("div", { className: "text-lg font-semibold text-purple-600", children: [
                "$",
                quote.total_price.toFixed(2)
              ] }) : /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: t.processingQuote }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400 mt-1", children: formatDate(quote.created_at) })
            ] })
          ] })
        },
        quote.id
      )) })
    ] })
  ] });
}

export { MyOrdersList as M, handleAuthCallback as h };
