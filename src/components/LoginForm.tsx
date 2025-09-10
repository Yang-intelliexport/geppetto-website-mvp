import React, { useState } from 'react';
import { createClient } from '../lib/supabase/client';

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

  // 多语言文本
  const texts = {
    zh: {
      emailLabel: '邮箱地址',
      emailPlaceholder: 'your.email@company.com',
      sendButton: '发送登录链接',
      sending: '发送中...',
      emailRequired: '请输入邮箱地址',
      successMessage: '登录链接已发送到您的邮箱！请检查您的邮件（包括垃圾邮件文件夹）。',
      errorMessage: '发送失败，请稍后重试',
      securityNote: '我们使用安全的无密码登录方式',
      instruction: '点击邮件中的链接即可安全登录'
    },
    en: {
      emailLabel: 'Email Address',
      emailPlaceholder: 'your.email@company.com',
      sendButton: 'Send Login Link',
      sending: 'Sending...',
      emailRequired: 'Please enter your email address',
      successMessage: 'Login link sent to your email! Please check your inbox (including spam folder).',
      errorMessage: 'Failed to send. Please try again later.',
      securityNote: 'We use secure passwordless authentication',
      instruction: 'Click the link in the email to log in securely'
    }
  };

  const t = texts[currentLang];

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
      // 使用环境变量确保域名一致性
      const siteUrl = import.meta.env.PUBLIC_SITE_URL || window.location.origin;
      // 构建包含next参数的callback URL，指向当前页面或者指定的redirectUrl
      const currentPath = window.location.pathname;
      const nextUrl = redirectUrl === '/' ? currentPath : redirectUrl;
      const callbackUrl = `${siteUrl}/api/auth/callback?next=${encodeURIComponent(nextUrl)}`;
      
      // Magic link sending - production ready
      
      // 使用Supabase内置魔法链接功能
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: callbackUrl
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
      setMessage(t.successMessage);
      setMessageType('success');
    } catch (error: any) {
      console.error('❌ [LoginForm] Magic link error:', {
        message: error.message,
        status: error.status,
        details: error,
        timestamp: new Date().toISOString()
      });
      setMessage(error.message || t.errorMessage);
      setMessageType('error');
    } finally {
      setLoading(false);
      console.log('🏁 [LoginForm] Submit process completed');
    }
  };

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