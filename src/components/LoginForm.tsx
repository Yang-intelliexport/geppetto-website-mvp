import React, { useState } from 'react';
import { createClient } from '../lib/supabase/client';
import { loginFormTexts } from '../utils/i18n-components';

interface LoginFormProps {
  redirectUrl?: string;
  currentLang?: 'zh' | 'en';
}

export default function LoginForm({ redirectUrl = '/', currentLang = 'zh' }: LoginFormProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [email, setEmail] = useState('');

  const supabase = createClient();
  const t = loginFormTexts[currentLang];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    console.log('📧 [LoginForm] Form submitted with email:', email.trim());
    
    if (!email.trim()) {
      console.log('❌ [LoginForm] Email validation failed - empty email');
      setMessage(t.emailRequired);
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');
    setMessageType('');

    try {
      // 以实际访问域名作为回调基础，避免本地/preview 环境跳到生产
      const siteUrl = typeof window !== 'undefined'
        ? window.location.origin
        : (import.meta.env.PUBLIC_SITE_URL || 'http://localhost:4321');
      // 构建包含next参数的callback URL，指向当前页面或者指定的redirectUrl
      const currentPath = window.location.pathname;
      let nextUrl = redirectUrl || currentPath;
      
      // 如果从登录页来的，默认跳转到首页
      if (nextUrl === '/zh/login' || nextUrl === '/en/login') {
        nextUrl = currentPath.startsWith('/zh') ? '/zh' : '/en';
      }
      
      // 确保URL格式正确
      if (!nextUrl.startsWith('/')) {
        nextUrl = '/' + nextUrl;
      }
      
      const callbackUrl = `${siteUrl}/api/auth/callback?next=${encodeURIComponent(nextUrl)}`;
      
      console.log('🔗 [LoginForm] Callback URL constructed:', {
        siteUrl,
        currentPath,
        redirectUrl,
        nextUrl,
        callbackUrl
      });
      
      // Magic link sending - production ready
      
      // 强制使用我们的回调端点
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: `${siteUrl}/api/auth/callback`,
          data: {
            redirectTo: nextUrl
          }
        }
      });

      if (error) {
        console.error('❌ [LoginForm] Magic link send failed:', {
          error: error.message,
          code: error.status,
          timestamp: new Date().toISOString()
        });
        throw error;
      }
      
      console.log('✅ [LoginForm] Magic link sent successfully');
      console.log('🎯 [LoginForm] Setting success message:', t.successMessage);
      setMessage(t.successMessage);
      setMessageType('success');
      console.log('🎯 [LoginForm] Message state updated');
    } catch (error: any) {
      console.error('❌ [LoginForm] Magic link error:', {
        message: error.message,
        status: error.status,
        details: error,
        timestamp: new Date().toISOString()
      });
      console.log('🎯 [LoginForm] Setting error message:', error.message || t.errorMessage);
      setMessage(error.message || t.errorMessage);
      setMessageType('error');
      console.log('🎯 [LoginForm] Error message state updated');
    } finally {
      setLoading(false);
      console.log('🏁 [LoginForm] Submit process completed');
    }
  };

  console.log('🎨 [LoginForm] Rendering with state:', {
    loading,
    message,
    messageType,
    email
  });

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
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
          {loading ? t.sending : t.sendButton}
        </button>
        
        {message && (
          <div className={`p-4 rounded-md text-sm ${
            messageType === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message}
            {import.meta.env.DEV && (
              <div className="mt-2 text-xs text-gray-500">
                Debug: type={messageType}, len={message.length}
              </div>
            )}
          </div>
        )}
        
        {import.meta.env.DEV && (
          <div className="p-2 bg-gray-100 text-xs text-gray-600 rounded">
            Debug: message="{message}" | type={messageType} | loading={loading}
          </div>
        )}
      </form>
      
      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>{t.securityNote}</p>
        <p>{t.instruction}</p>
      </div>
    </div>
  );
}
