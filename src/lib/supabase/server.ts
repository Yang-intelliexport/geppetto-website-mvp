import { createServerClient, parseCookieHeader, type CookieMethodsServer } from "@supabase/ssr";
import type { APIContext } from "astro";

export function createClient(context: APIContext) {
  const cookies: CookieMethodsServer = {
    getAll() {
      const header = context.request.headers.get('cookie') ?? '';
      const parsed = parseCookieHeader(header).map(({ name, value }) => ({
        name,
        value: value ?? '',
      }));
      
      if (import.meta.env.DEV) {
        console.debug('🍪 [Server] Getting all cookies:', {
          headerLength: header.length,
          parsedCount: parsed.length,
          supabaseCookies: parsed.filter(c => c.name.includes('sb-')),
          timestamp: new Date().toISOString()
        });
      }
      
      return parsed;
    },
    setAll(cookieList) {
      if (import.meta.env.DEV) {
        console.debug('🍪 [Server] Setting cookies:', {
          cookieCount: cookieList.length,
          cookieNames: cookieList.map(c => c.name),
          supabaseCookies: cookieList.filter(c => c.name.includes('sb-')).map(c => ({
            name: c.name,
            valuePrefix: c.value?.substring(0, 20) + '...' || 'empty',
            options: c.options
          })),
          timestamp: new Date().toISOString()
        });
      }
      
      cookieList.forEach(({ name, value, options }) => {
        const cookieOptions = { 
          path: '/', 
          httpOnly: name.includes('refresh-token'), // 只有refresh token需要httpOnly
          secure: import.meta.env.PROD, // 生产环境使用secure
          sameSite: 'lax' as const,
          ...options 
        };
        
        if (import.meta.env.DEV) {
          console.debug(`🍪 [Server] Setting cookie ${name}:`, {
            name,
            valueLength: value?.length || 0,
            options: cookieOptions
          });
        }

        try {
          context.cookies.set(name, value, cookieOptions);
        } catch (error: any) {
          const isResponseSentError =
            error?.name === 'AstroError' && error?.title === 'Unable to set response.';
          if (isResponseSentError) {
            if (import.meta.env.DEV) {
              console.warn(`⚠️ [Server] Skipped setting cookie ${name} because response was already sent.`);
            }
            return;
          }
          throw error;
        }
      });
    },
  };

  if (import.meta.env.DEV) {
    console.debug('🔧 [Server] Creating Supabase server client:', {
      url: import.meta.env.PUBLIC_SUPABASE_URL,
      keyPrefix: import.meta.env.PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20) + '...',
      timestamp: new Date().toISOString()
    });
  }

  return createServerClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
    { cookies }
  );
}
