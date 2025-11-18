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

const primaryHostRedirect = defineMiddleware(async (context, next) => {
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

const autoLocaleRedirect = defineMiddleware(async (context, next) => {
  const pathname = context.url.pathname;

  if (hasLocalePrefix(pathname) || shouldBypassLocale(pathname)) {
    return next();
  }

  const preferred = getPreferredLocale(context.request.headers.get('accept-language'));
  const normalizedPath = pathname === '/' ? '' : pathname.replace(/^\/+/, '');
  const suffix = normalizedPath ? `/${normalizedPath}` : '';
  const target = `/${preferred}${suffix}`;

  return context.redirect(target, 302);
});

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
    // Attach a lightweight admin marker; cast to satisfy types
    (context.locals as any).user = { email: 'admin@geppetto.studio' };
  }
  
  return next();
});

export const onRequest = sequence(
  primaryHostRedirect,
  autoLocaleRedirect,
  supabaseSession,
  adminGuard
);
