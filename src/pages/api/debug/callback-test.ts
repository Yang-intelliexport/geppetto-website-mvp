import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
  if (!import.meta.env.DEV) {
    return new Response('Not Found', { status: 404 });
  }
  const { url, request } = context;
  
  // 收集所有请求信息
  const debugInfo = {
    timestamp: new Date().toISOString(),
    url: {
      full: url.toString(),
      pathname: url.pathname,
      search: url.search,
      hash: url.hash,
      origin: url.origin,
      protocol: url.protocol,
      host: url.host,
      hostname: url.hostname,
      port: url.port
    },
    searchParams: Object.fromEntries(url.searchParams.entries()),
    headers: Object.fromEntries(request.headers.entries()),
    method: request.method,
    environment: {
      PUBLIC_SITE_URL: import.meta.env.PUBLIC_SITE_URL,
      PUBLIC_SUPABASE_URL: import.meta.env.PUBLIC_SUPABASE_URL,
      NODE_ENV: import.meta.env.NODE_ENV,
      PROD: import.meta.env.PROD,
      DEV: import.meta.env.DEV
    },
    cookies: (() => {
      const raw = request.headers.get('Cookie') || ''
      const parsed = raw
        ? Object.fromEntries(
            raw.split(';').map(cookie => {
              const [key, ...rest] = cookie.split('=')
              return [key.trim(), decodeURIComponent(rest.join('=').trim())]
            })
          )
        : {}
      return {
        raw: raw || 'none',
        parsed
      }
    })()
  };

  return new Response(JSON.stringify(debugInfo, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
};
