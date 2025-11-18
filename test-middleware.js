// 测试middleware重定向逻辑
const SUPPORTED_LOCALES = ['en', 'zh'];

const hasLocalePrefix = (pathname) => {
  return SUPPORTED_LOCALES.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
};

const shouldBypassLocale = (pathname) => {
  return pathname.startsWith('/admin')
    || pathname.startsWith('/api')
    || pathname.startsWith('/_astro')
    || pathname.startsWith('/_image')
    || pathname.startsWith('/public')
    || pathname.startsWith('/assets');
};

const testCases = ['/', '/en', '/zh', '/api/test', '/en/', '/zh/', '/en/about'];
console.log('=== Middleware重定向测试 ===');
testCases.forEach(path => {
  const hasPrefix = hasLocalePrefix(path);
  const shouldBypass = shouldBypassLocale(path);
  const needsRedirect = !hasPrefix && !shouldBypass;
  
  console.log(`Path: ${path}`);
  console.log(`  hasLocalePrefix: ${hasPrefix}`);
  console.log(`  shouldBypassLocale: ${shouldBypass}`);
  console.log(`  需要重定向: ${needsRedirect}`);
  
  if (needsRedirect) {
    const preferred = 'en'; // 假设默认英文
    const normalizedPath = path === '/' ? '' : path.replace(/^\/+/, '');
    const suffix = normalizedPath ? `/${normalizedPath}` : '';
    const target = `/${preferred}${suffix}`;
    console.log(`  重定向目标: ${target}`);
  }
  console.log('---');
});