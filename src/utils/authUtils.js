// 权限验证工具函数
// 基于Magic Link的安全访问控制

import { sendMagicLink, getCurrentSession } from './supabase.js';

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
export function hasValidAuth(email) {
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
export function saveAuthCache(email, sessionId = null) {
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
export function clearAuthCache() {
  try {
    localStorage.removeItem(AUTH_CACHE_KEY);
    console.log('🧹 权限缓存已清除');
  } catch (error) {
    console.error('❌ 清除权限缓存失败:', error);
  }
}

/**
 * 获取当前缓存的邮箱
 * @returns {string|null} 缓存的邮箱或null
 */
export function getCachedEmail() {
  try {
    const cached = localStorage.getItem(AUTH_CACHE_KEY);
    if (!cached) return null;

    const authData = JSON.parse(cached);
    
    // 检查是否过期
    const now = Date.now();
    if (now - authData.timestamp > CACHE_DURATION) {
      clearAuthCache();
      return null;
    }
    
    return authData.email;
  } catch (error) {
    console.error('❌ 获取缓存邮箱失败:', error);
    clearAuthCache();
    return null;
  }
}

/**
 * 需要邮箱验证时的处理函数
 * @param {string} email - 需要验证的邮箱
 * @param {string} purpose - 验证目的（如'quote_submit', 'order_query'）
 * @param {string} redirectUrl - 验证成功后的重定向地址
 * @returns {Promise<boolean>} 是否发送成功
 */
export async function requireEmailVerification(email, purpose, redirectUrl) {
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
export async function handleAuthCallback(urlParams) {
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
  return `session_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
}

/**
 * 验证邮箱格式
 * @param {string} email - 邮箱地址
 * @returns {boolean} 是否有效
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 用户友好的权限检查函数
 * @param {string} email - 邮箱地址
 * @param {string} action - 操作名称（用于显示）
 * @returns {Object} 检查结果
 */
export function checkUserPermission(email, action = '访问') {
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

/**
 * 权限状态枚举
 */
export const AuthStatus = {
  VALID: 'valid',
  EXPIRED: 'expired',
  INVALID: 'invalid',
  MISSING: 'missing'
};
