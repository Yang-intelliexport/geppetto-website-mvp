import { useEffect } from 'react';
import { createClient } from '../lib/supabase/client';
import { setSession, setAuthLoading } from '../stores/sessionStore';

export default function AuthManager() {
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.debug('🚀 [AuthManager] Initializing auth manager:', {
        timestamp: new Date().toISOString(),
        location: typeof window !== 'undefined' ? window.location.href : 'server'
      });
    }
    const supabase = createClient();
    
    if (typeof window !== 'undefined') {
      // 将 Supabase 客户端挂载到全局，供其他模块复用
      (window as typeof window & { supabaseClient?: ReturnType<typeof createClient> }).supabaseClient = supabase;
    }
    
    // 首次加载时获取当前session
    const getInitialSession = async () => {
      try {
        setAuthLoading(true);
        
        // 详细cookie调试信息
        if (import.meta.env.DEV) {
          console.debug('[AuthManager] 🍪 Checking cookies before session retrieval:', {
            allCookies: document.cookie,
            supabaseTokens: document.cookie.split(';')
              .filter(cookie => cookie.trim().includes('sb-'))
              .map(cookie => cookie.trim()),
            timestamp: new Date().toISOString()
          });
        }
        
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('❌ [AuthManager] 获取初始会话失败:', error);
        }
        
        if (import.meta.env.DEV) {
          console.debug('[AuthManager] 📊 initial session details', {
            hasSession: Boolean(session),
            userEmail: session?.user?.email,
            userId: session?.user?.id,
            accessTokenPrefix: session?.access_token?.substring(0, 20) || 'none',
            expiresAt: session?.expires_at,
            tokenType: session?.token_type,
            timestamp: new Date().toISOString()
          });
        }
        
        setSession(session);
        setAuthLoading(false);
      } catch (error) {
        console.error('❌ [AuthManager] AuthManager初始化错误:', error);
        setSession(null);
        setAuthLoading(false);
      }
    };

    getInitialSession();

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (import.meta.env.DEV) {
          console.debug('[AuthManager] auth state change', {
            event: _event,
            hasSession: Boolean(session),
            userEmail: session?.user?.email
          });
        }
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
