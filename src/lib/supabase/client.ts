import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
  const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

  if (import.meta.env.DEV) {
    console.debug('🔧 [Supabase Client] Creating browser client with config:', {
      url: supabaseUrl,
      keyPrefix: supabaseKey?.substring(0, 20) + '...' || 'missing',
      timestamp: new Date().toISOString()
    });
  }

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment configuration.');
  }

  const client = createBrowserClient(supabaseUrl, supabaseKey);

  if (import.meta.env.DEV) {
    client.auth.onAuthStateChange((event, session) => {
      console.debug('[Supabase Auth] 🔄 state changed', {
        event,
        hasSession: Boolean(session),
        userEmail: session?.user?.email,
        userId: session?.user?.id,
        accessTokenPrefix: session?.access_token?.substring(0, 20) || 'none',
        refreshTokenPrefix: session?.refresh_token?.substring(0, 20) || 'none',
        expiresAt: session?.expires_at,
        timestamp: new Date().toISOString()
      });
      
      // 检查cookie状态 (仅在浏览器环境)
      if (typeof document !== 'undefined') {
        const cookies = document.cookie.split(';')
          .filter(cookie => cookie.trim().includes('sb-'))
          .map(cookie => cookie.trim());
        console.debug('[Supabase Auth] 🍪 Cookie state after auth change:', {
          supabaseCookies: cookies,
          totalCookieLength: document.cookie.length
        });
      } else {
        console.debug('[Supabase Auth] 🍪 Cookie check skipped (server environment)');
      }
    });
  }

  return client;
}
