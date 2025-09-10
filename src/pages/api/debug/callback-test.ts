import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
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
    cookies: {
      raw: request.headers.get('Cookie') || 'none',
      parsed: context.cookies.getAll()
    }
  };

  return new Response(JSON.stringify(debugInfo, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
};