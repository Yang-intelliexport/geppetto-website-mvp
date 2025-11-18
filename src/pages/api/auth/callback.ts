import type { APIRoute } from "astro";
import { createClient } from "../../../lib/supabase/server";

export const GET: APIRoute = async (context) => {
  const { url, redirect, request } = context;
  
  // 详细日志记录请求信息
  const timestamp = new Date().toISOString();
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const referer = request.headers.get('referer') || 'direct';
  
  console.log(`\n\n🚨🚨🚨 [${timestamp}] ===== AUTH CALLBACK STARTED ===== 🚨🚨🚨`);
  console.log(`📨 [Callback] Request details:`, {
    url: url.toString(),
    userAgent: userAgent.substring(0, 100),
    referer,
    origin: request.headers.get('origin'),
    host: request.headers.get('host'),
    method: request.method,
    cookies: request.headers.get('cookie') ? 'present' : 'none'
  });

  // 提取URL参数
  const code = url.searchParams.get("code");
  let next = url.searchParams.get("next") || "/zh";
  
  // 如果没有next参数，尝试从用户数据中获取
  if (next === "/zh") {
    try {
      const supabase = createClient(context);
      const { data } = await supabase.auth.getUser();
      const redirectTo = data.user?.user_metadata?.redirectTo;
      if (redirectTo) {
        next = redirectTo;
      }
    } catch (error) {
      console.debug('Could not get redirect from user metadata:', error);
    }
  }
  const error_description = url.searchParams.get("error_description");
  const error_code = url.searchParams.get("error");
  const access_token = url.searchParams.get("access_token");
  const refresh_token = url.searchParams.get("refresh_token");
  const token_type = url.searchParams.get("token_type");
  
  console.log(`🔍 [Callback] URL parameters extracted:`, {
    code: code ? `${code.substring(0, 20)}...` : null,
    next,
    error_code,
    error_description,
    access_token: access_token ? 'present' : 'absent',
    refresh_token: refresh_token ? 'present' : 'absent',
    token_type
  });

  // 处理认证错误
  if (error_code || error_description) {
    console.error(`❌ [${timestamp}] ===== AUTH ERROR DETECTED =====`);
    console.error(`❌ [Callback] Authentication error:`, { 
      error_code, 
      error_description,
      full_url: url.toString()
    });
    return redirect(`/auth/error?message=${encodeURIComponent(error_description || 'Authentication failed')}`);
  }

  // 验证必需参数
  if (!code) {
    console.error(`❌ [${timestamp}] ===== MISSING AUTHORIZATION CODE =====`);
    console.error(`❌ [Callback] No authorization code provided:`, {
      all_params: Object.fromEntries(url.searchParams.entries()),
      url_hash: url.hash,
      full_url: url.toString()
    });
    return redirect("/auth/error?message=Invalid%20callback%20request%20-%20no%20authorization%20code");
  }

  try {
    // 创建Supabase客户端
    console.log(`🔧 [${timestamp}] Creating Supabase server client...`);
    const supabase = createClient(context);
    
    // 检查当前会话状态
    console.log(`🔍 [${timestamp}] Checking existing session before exchange...`);
    const { data: currentSession } = await supabase.auth.getSession();
    console.log(`📊 [${timestamp}] Pre-exchange session status:`, {
      hasSession: !!currentSession.session,
      hasUser: !!currentSession.session?.user,
      userEmail: currentSession.session?.user?.email || 'none',
      expiresAt: currentSession.session?.expires_at,
      tokenType: currentSession.session?.token_type
    });
    
    // 交换授权码获取会话
    console.log(`🔄 [${timestamp}] Exchanging authorization code for session...`);
    console.log(`🔑 [Callback] Code exchange attempt:`, {
      codeLength: code.length,
      codePrefix: code.substring(0, 8),
      timestamp: new Date().toISOString()
    });
    
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error(`❌ [${timestamp}] ===== CODE EXCHANGE FAILED =====`);
      console.error(`❌ [Callback] Code exchange error:`, {
        error_message: error.message,
        error_name: error.name,
        error_status: error.status,
        error_code: error.code,
        full_error: error,
        timestamp: new Date().toISOString()
      });
      return redirect(`/auth/error?message=${encodeURIComponent(`Code exchange failed: ${error.message}`)}`);
    }

    console.log(`[${timestamp}] Code exchange result:`, {
      hasData: !!data,
      hasSession: !!data?.session,
      hasUser: !!data?.user,
      sessionId: data?.session?.access_token?.substring(0, 20) + '...' || 'none',
      userEmail: data?.user?.email || 'none',
      userRole: data?.user?.role || 'none'
    });

    // 验证会话是否成功创建
    if (!data.session || !data.user) {
      console.error(`[${timestamp}] Session creation failed:`, {
        data_keys: data ? Object.keys(data) : 'no data',
        session_present: !!data?.session,
        user_present: !!data?.user,
        raw_data: data
      });
      return redirect("/auth/error?message=Session%20creation%20failed%20-%20no%20session%20or%20user%20data");
    }

    // 验证新会话
    console.log(`[${timestamp}] Verifying new session...`);
    const { data: newSession } = await supabase.auth.getSession();
    console.log(`[${timestamp}] New session verification:`, {
      hasSession: !!newSession.session,
      hasUser: !!newSession.session?.user,
      userEmail: newSession.session?.user?.email,
      expiresAt: newSession.session?.expires_at
    });

    console.log(`[${timestamp}] User successfully authenticated:`, {
      email: data.user.email,
      id: data.user.id,
      confirmed_at: data.user.email_confirmed_at,
      last_sign_in: data.user.last_sign_in_at,
      redirecting_to: next
    });
    
    // 成功重定向到目标页面
    console.log(`\n🎉🎉🎉 [${timestamp}] SUCCESS! Redirecting to: ${next} 🎉🎉🎉\n`);
    return redirect(next);
    
  } catch (error: any) {
    console.error(`[${timestamp}] Unexpected error in auth callback:`, {
      error_message: error?.message || 'unknown',
      error_name: error?.name || 'unknown',
      error_stack: error?.stack || 'no stack',
      error_object: error
    });
    return redirect(`/auth/error?message=${encodeURIComponent(`Unexpected error: ${error?.message || 'unknown error'}`)}`);
  }
};