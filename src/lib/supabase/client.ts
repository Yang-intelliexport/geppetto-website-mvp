import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
  const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
  
  console.log('🔧 [Browser Client] Creating Supabase client:', {
    url: supabaseUrl,
    keyPrefix: supabaseKey ? `${supabaseKey.substring(0, 20)}...` : 'NOT_SET',
    timestamp: new Date().toISOString()
  });

  const client = createBrowserClient(supabaseUrl, supabaseKey);
  
  // 添加认证状态监听器
  client.auth.onAuthStateChange((event, session) => {
    console.log('🔐 [Browser Client] Auth state changed:', {
      event,
      hasSession: !!session,
      userEmail: session?.user?.email,
      expiresAt: session?.expires_at,
      timestamp: new Date().toISOString()
    });
  });

  return client;
}