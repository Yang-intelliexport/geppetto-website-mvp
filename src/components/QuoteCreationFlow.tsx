import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';
import LoginForm from './LoginForm';
import QuoteForm from './QuoteForm';

interface QuoteCreationFlowProps {
  language?: 'zh' | 'en';
}

export default function QuoteCreationFlow({ language = 'zh' }: QuoteCreationFlowProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    // 检查用户当前的登录状态
    const checkSession = async () => {
      try {
        console.log('🔍 开始检查用户会话状态...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('❌ 获取会话失败:', error);
          setUser(null);
        } else if (session?.user) {
          console.log('✅ 用户已登录:', {
            userId: session.user.id,
            userEmail: session.user.email,
            hasValidSession: true
          });
          setUser(session.user);
        } else {
          console.log('❌ 没有有效的用户会话');
          setUser(null);
        }
      } catch (error) {
        console.error('❌ 检查会话异常:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // 监听认证状态的变化（例如，用户在另一个标签页登录）
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('🔄 认证状态变化详情:', {
        event,
        hasSession: !!session,
        userEmail: session?.user?.email,
        userId: session?.user?.id,
        sessionObject: session
      });
      
      if (event === 'SIGNED_IN' && session?.user) {
        console.log('✅ 用户登录成功:', session.user.email);
        setUser(session.user);
      } else if (event === 'SIGNED_OUT') {
        console.log('👋 用户登出');
        setUser(null);
      } else if (session?.user) {
        console.log('🔄 更新用户状态:', session.user.email);
        setUser(session.user);
      } else {
        console.log('❌ 清空用户状态, event:', event);
        setUser(null);
      }
      setLoading(false);
    });

    // 组件卸载时取消监听
    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
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
        <LoginForm language={language} />
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