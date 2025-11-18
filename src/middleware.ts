// Admin认证中间件 + 自动语言路由 + Supabase session处理
import { defineMiddleware, sequence } from "astro:middleware";
import { createClient } from './lib/supabase/server';

const SUPPORTED_LOCALES = ['en', 'zh'] as const;
type Locale = typeof SUPPORTED_LOCALES[number];
// Use apex domain by default; can be overridden via env
const PRIMARY_HOST = import.meta.env.PUBLIC_PRIMARY_HOST || 'geppetto.studio';
const ALLOWED_HOSTS = (import.meta.env.PUBLIC_ALLOWED_HOSTS || '')
  .split(',')
  .map((host: string) => host.trim().toLowerCase())
  .filter(Boolean);
const IS_DEV = import.meta.env.DEV;

const getPreferredLocale = (acceptLanguageHeader: string | null): Locale => {
  if (!acceptLanguageHeader) return 'en';
  const normalized = acceptLanguageHeader.toLowerCase();
  if (normalized.startsWith('zh')) return 'zh';
  return 'en';
};

const shouldBypassLocale = (pathname: string) => {
  return pathname.startsWith('/admin')
    || pathname.startsWith('/api')
    || pathname.startsWith('/_astro')
    || pathname.startsWith('/_image')
    || pathname.startsWith('/public')
    || pathname.startsWith('/assets');
};

// 🔒 Security Headers + 主机重定向
const securityAndHostRedirect = defineMiddleware(async (context, next) => {
  // 🔒 Critical Security: 强制HTTPS (生产环境)
  if (!IS_DEV && context.request.url.startsWith('http://')) {
    const httpsUrl = context.request.url.replace('http://', 'https://');
    return context.redirect(httpsUrl, 301);
  }

  // 生产环境禁用自定义主机重定向，交由Vercel处理
  if (!IS_DEV) {
    const response = await next();
    
    // 🔒 Critical Security: 添加安全头
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    
    // 🔒 CSP Header (根据需要调整)
    const cspPolicy = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https: wss:",
      "frame-ancestors 'none'"
    ].join('; ');
    response.headers.set('Content-Security-Policy', cspPolicy);
    
    return response;
  }
  
  // 开发环境保留原逻辑
  const host = context.request.headers.get('host');
  if (!host) {
    return next();
  }

  const normalized = host.toLowerCase();
  const isPreview = normalized.endsWith('.vercel.app');

  if (IS_DEV || normalized === PRIMARY_HOST || normalized.includes('localhost') || isPreview || ALLOWED_HOSTS.includes(normalized)) {
    return next();
  }

  const url = new URL(context.request.url);
  url.protocol = 'https:';
  url.host = PRIMARY_HOST;
  return context.redirect(url.toString(), 301);
});

const hasLocalePrefix = (pathname: string) => {
  return SUPPORTED_LOCALES.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
};

// 移除自定义locale重定向，使用Astro内置i18n路由

const supabaseSession = defineMiddleware(async (context, next) => {
  // 为所有请求刷新Supabase session（Supabase SSR要求）
  const supabase = createClient(context);
  
  // getSession会自动处理token刷新并设置cookie
  await supabase.auth.getSession();
  
  return next();
});

const adminGuard = defineMiddleware(async (context, next) => {
  const pathname = context.url.pathname;
  
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const accessToken = context.cookies.get('sb-access-token')?.value;
    
    if (!accessToken) {
      return context.redirect('/admin/login');
    }

    // 🔒 Critical Security Fix: 验证token有效性
    try {
      const supabase = createClient(context);
      const { data: { user }, error } = await supabase.auth.getUser(accessToken);
      
      if (error || !user) {
        console.warn('🚨 Invalid admin token detected:', error?.message);
        // 清除无效token
        context.cookies.delete('sb-access-token');
        return context.redirect('/admin/login');
      }

      // 验证用户是否为管理员
      if (user.email !== 'admin@geppetto.studio') {
        console.warn('🚨 Non-admin user attempted admin access:', user.email);
        return context.redirect('/admin/login');
      }

      (context.locals as any).user = { email: user.email, id: user.id };
    } catch (err: any) {
      console.error('🚨 Admin auth validation failed:', err.message);
      context.cookies.delete('sb-access-token');
      return context.redirect('/admin/login');
    }
  }
  
  return next();
});

export const onRequest = sequence(
  securityAndHostRedirect,
  supabaseSession,
  adminGuard
);
