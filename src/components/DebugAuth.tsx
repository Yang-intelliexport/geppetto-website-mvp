import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function DebugAuth() {
  const [authState, setAuthState] = useState<any>(null);
  const [envVars, setEnvVars] = useState<any>({});
  const [testEmail, setTestEmail] = useState('');

  useEffect(() => {
    // 检查环境变量
    setEnvVars({
      supabaseUrl: import.meta.env.PUBLIC_SUPABASE_URL,
      hasAnonKey: !!import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
      anonKeyLength: import.meta.env.PUBLIC_SUPABASE_ANON_KEY?.length
    });

    // 检查 Supabase 客户端状态
    const checkAuth = async () => {
      try {
        console.log('🔍 调试 - 检查认证状态');
        
        // 检查当前会话
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        // 检查当前用户
        const { data: userData, error: userError } = await supabase.auth.getUser();
        
        // 尝试一个简单的数据库查询来测试连接
        const { data: testData, error: testError } = await supabase
          .from('quotes')
          .select('id')
          .limit(1);
        
        setAuthState({
          session: {
            data: sessionData,
            error: sessionError?.message
          },
          user: {
            data: userData,
            error: userError?.message
          },
          dbConnection: {
            working: !testError,
            error: testError?.message
          }
        });
        
      } catch (error) {
        console.error('调试检查失败:', error);
        setAuthState({ generalError: error.message });
      }
    };

    checkAuth();

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('🔄 调试 - 认证状态变化:', { event, session: !!session });
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleTestLogin = async () => {
    if (!testEmail) return;
    
    try {
      console.log('🧪 测试发送魔法链接:', testEmail);
      const { error } = await supabase.auth.signInWithOtp({
        email: testEmail,
        options: {
          emailRedirectTo: window.location.origin + window.location.pathname
        }
      });
      
      if (error) {
        console.error('❌ 发送失败:', error);
        alert(`发送失败: ${error.message}`);
      } else {
        alert('✅ 魔法链接已发送！请检查邮箱');
      }
    } catch (error) {
      console.error('❌ 测试登录异常:', error);
      alert(`测试失败: ${error.message}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">🔍 认证状态调试</h2>
      
      <div className="space-y-4">
        <div className="bg-white p-4 rounded">
          <h3 className="font-semibold mb-2">测试登录</h3>
          <div className="flex gap-2">
            <input
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              placeholder="输入邮箱测试登录"
              className="flex-1 px-3 py-2 border rounded"
            />
            <button
              onClick={handleTestLogin}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              发送测试链接
            </button>
          </div>
        </div>

        <div className="bg-white p-4 rounded">
          <h3 className="font-semibold mb-2">环境变量</h3>
          <pre className="text-sm bg-gray-100 p-2 rounded overflow-auto">
            {JSON.stringify(envVars, null, 2)}
          </pre>
        </div>
        
        <div className="bg-white p-4 rounded">
          <h3 className="font-semibold mb-2">认证状态</h3>
          <pre className="text-sm bg-gray-100 p-2 rounded overflow-auto">
            {JSON.stringify(authState, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}