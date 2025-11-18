import { createServerClient, parseCookieHeader, type CookieMethodsServer } from "@supabase/ssr";
import type { AstroGlobal } from "astro";

export function createClient(Astro: AstroGlobal) {
  const cookies: CookieMethodsServer = {
    getAll() {
      const header = Astro.request.headers.get('cookie') ?? '';
      const parsed = parseCookieHeader(header).map(({ name, value }) => ({
        name,
        value: value ?? '',
      }));
      return parsed.length ? parsed : null;
    },
    setAll(cookieList) {
      cookieList.forEach(({ name, value, options }) => {
        try {
          Astro.cookies.set(name, value, { path: '/', ...options });
        } catch (error: any) {
          const isResponseSentError =
            error?.name === 'AstroError' && error?.title === 'Unable to set response.';
          if (isResponseSentError) {
            if (import.meta.env.DEV) {
              console.warn(`⚠️ [Astro Supabase] Skip setting cookie ${name}: response already sent.`);
            }
            return;
          }
          throw error;
        }
      });
    },
  };

  return createServerClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
    { cookies }
  );
}
