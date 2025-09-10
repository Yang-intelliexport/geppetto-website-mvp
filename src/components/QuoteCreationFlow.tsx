import React, { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { sessionStore, userStore, authLoadingStore } from '../stores/sessionStore';
import LoginForm from './LoginForm';
import QuoteForm from './QuoteForm';

interface QuoteCreationFlowProps {
  language?: 'zh' | 'en';
}

export default function QuoteCreationFlow({ language = 'zh' }: QuoteCreationFlowProps) {
  const user = useStore(userStore);
  const loading = useStore(authLoadingStore);
  const session = useStore(sessionStore);

  const text = {
    zh: {
      loading: '正在加载...',
      step1Title: '第一步：验证您的邮箱',
      step1Desc: '请输入您的邮箱以接收一个安全的登录/注册链接。',
      step2Title: '第二步：提交您的报价详情',
      welcomeBack: '欢迎回来！您已登录，邮箱为: ',
      logout: '退出登录'
    },
    en: {
      loading: 'Loading...',
      step1Title: 'Step 1: Verify Your Email',
      step1Desc: 'Please enter your email to receive a secure login/registration link.',
      step2Title: 'Step 2: Submit Your Quote Details',
      welcomeBack: 'Welcome back! You are logged in as: ',
      logout: 'Sign Out'
    }
  };

  const t = text[language];

  const handleSignOut = async () => {
    try {
      // Import supabase client only when needed for signOut
      const { createClient } = await import('../lib/supabase/client');
      const supabase = createClient();
      
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('登出失败:', error);
      }
    } catch (error) {
      console.error('登出异常:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="flex items-center space-x-2">
          <svg className="animate-spin h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="m12 2a10 10 0 0 1 10 10h-4a6 6 0 0 0-6-6v-4z"></path>
          </svg>
          <span className="text-gray-600">{t.loading}</span>
        </div>
      </div>
    );
  }

  // 如果用户未登录，显示登录表单
  if (!user) {
    return (
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.step1Title}</h2>
          <p className="text-gray-600">{t.step1Desc}</p>
        </div>
        <LoginForm currentLang={language} />
      </div>
    );
  }
  
  // 如果用户已登录，显示报价表单
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.step2Title}</h2>
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
          <span>{t.welcomeBack}{user.email}</span>
          <button 
            onClick={handleSignOut}
            className="text-indigo-600 hover:text-indigo-800 underline"
          >
            {t.logout}
          </button>
        </div>
      </div>
      <QuoteForm user={user} language={language} />
    </div>
  );
}