// 向后兼容重定向到v1版本
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  // 重定向到新的v1接口
  const url = new URL(request.url);
  const newUrl = url.origin + '/api/v1/health';
  
  // 转发请求到新接口
  const response = await fetch(newUrl, {
    method: 'GET',
    headers: request.headers
  });
  
  return response;
};