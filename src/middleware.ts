// Admin认证中间件 - 临时简化版本（开发阶段）
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  // 只对admin路由进行认证检查（除了登录页面）
  if (context.url.pathname.startsWith('/admin') && !context.url.pathname.startsWith('/admin/login')) {
    
    // 开发阶段：简单的cookie检查
    const accessToken = context.cookies.get('sb-access-token')?.value;
    
    if (!accessToken) {
      // 未登录，重定向到登录页
      return context.redirect('/admin/login');
    }
    
    // 开发阶段：暂时跳过API验证，直接通过
    // TODO: 生产环境需要启用真实的API验证
    context.locals.user = { email: 'admin@geppetto.studio' };
  }
  
  return next();
});