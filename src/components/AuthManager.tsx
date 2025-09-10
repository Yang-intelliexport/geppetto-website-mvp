import { useEffect } from 'react';
import { createClient } from '../lib/supabase/client';
import { setSession, setAuthLoading } from '../stores/sessionStore';

export default function AuthManager() {
  useEffect(() => {
    const supabase = createClient();
    
    // 首次加载时获取当前session
    const getInitialSession = async () => {
      try {
        setAuthLoading(true);
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('获取初始会话失败:', error);
        }
        
        setSession(session);
        // Initial session loaded
      } catch (error) {
        console.error('AuthManager初始化错误:', error);
        setSession(null);
      }
    };

    getInitialSession();

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        // Auth state change handled
      }
    );

    // 清理监听器
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // 这个组件不渲染任何内容
  return null;
}