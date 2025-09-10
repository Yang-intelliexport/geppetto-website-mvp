// API端点：处理邮件队列并发送邮件
// 可以通过cron job定期调用，或者手动触发

import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

// 邮件服务配置 - 这里使用Resend作为示例
const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

interface EmailQueueRecord {
  id: string;
  recipient_email: string;
  recipient_name: string;
  subject: string;
  template_name: string;
  template_data: any;
  quote_id: string;
  attempts: number;
  max_attempts: number;
  subject_template: string;
  body_template: string;
}

// 简单的模板渲染函数
function renderTemplate(template: string, data: any): string {
  let rendered = template;
  
  // 替换简单的变量 {{variable}}
  Object.keys(data).forEach(key => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    rendered = rendered.replace(regex, data[key] || '');
  });
  
  // 处理条件语句 {{#if variable}}content{{/if}}
  rendered = rendered.replace(/\{\{#if\s+(\w+)\}\}([\s\S]*?)\{\{\/if\}\}/g, (match, variable, content) => {
    return data[variable] ? content : '';
  });
  
  return rendered;
}

// 发送邮件函数 - 使用Resend
async function sendEmailWithResend(to: string, subject: string, html: string, fromName: string = 'Geppetto Team') {
  if (!RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY not configured');
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `${fromName} <noreply@geppetto.studio>`, // 需要验证的域名
      to: [to],
      subject: subject,
      html: html,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Resend API error: ${error}`);
  }

  return await response.json();
}

// 备用发送函数 - 使用SMTP
async function sendEmailWithSMTP(to: string, subject: string, html: string) {
  // 这里可以实现SMTP发送逻辑
  // 或者使用其他邮件服务如SendGrid, AWS SES等
  console.log('SMTP sending not implemented yet');
  throw new Error('SMTP sending not configured');
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // 验证请求认证（支持多种认证方式）
    const authHeader = request.headers.get('authorization');
    const apiToken = import.meta.env.API_SECRET_TOKEN;
    
    // 开发环境可以跳过认证
    const isDev = import.meta.env.DEV;
    
    if (!isDev && (!authHeader || !authHeader.includes('Bearer'))) {
      return new Response(JSON.stringify({ 
        error: 'Unauthorized',
        message: 'API认证失败，请检查Authorization header'
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // 验证token（生产环境）
    if (!isDev && apiToken && !authHeader?.includes(apiToken)) {
      return new Response(JSON.stringify({ 
        error: 'Invalid token',
        message: 'API Token无效'
      }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 调试信息
    const debugMode = import.meta.env.DEBUG_EMAIL === 'true';
    if (debugMode) {
      console.log('邮件处理开始:', {
        isDev,
        hasResendKey: !!RESEND_API_KEY,
        hasSupabaseUrl: !!SUPABASE_URL,
        hasSupabaseKey: !!SUPABASE_SERVICE_KEY
      });
    }

    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
      return new Response(JSON.stringify({ 
        error: 'Supabase not configured',
        message: '请检查SUPABASE环境变量配置',
        debug: debugMode ? {
          supabaseUrl: !!SUPABASE_URL,
          supabaseKey: !!SUPABASE_SERVICE_KEY
        } : undefined
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    // 获取待发送的邮件（带模板信息）
    const { data: emailQueue, error: fetchError } = await supabase
      .from('email_queue')
      .select(`
        *,
        email_templates!inner(subject_template, body_template)
      `)
      .eq('status', 'pending')
      .lte('send_at', new Date().toISOString())
      .lt('attempts', 3) // 最大重试3次
      .order('created_at', { ascending: true })
      .limit(10);

    if (fetchError) {
      throw new Error(`Database error: ${fetchError.message}`);
    }

    const results = {
      processed: 0,
      failed: 0,
      errors: [] as string[]
    };

    // 处理每个邮件
    for (const email of emailQueue || []) {
      try {
        // 渲染邮件内容
        const subject = renderTemplate(email.email_templates.subject_template, email.template_data);
        const body = renderTemplate(email.email_templates.body_template, email.template_data);
        
        // 转换纯文本为HTML（简单实现）
        const htmlBody = body
          .replace(/\n\n/g, '</p><p>')
          .replace(/\n/g, '<br>')
          .replace(/^/, '<p>')
          .replace(/$/, '</p>');

        // 发送邮件
        let sendResult;
        if (RESEND_API_KEY) {
          sendResult = await sendEmailWithResend(
            email.recipient_email,
            subject,
            htmlBody
          );
        } else {
          // 备用方案
          await sendEmailWithSMTP(email.recipient_email, subject, htmlBody);
          sendResult = { id: 'smtp-sent' };
        }

        // 更新邮件状态为已发送
        const { error: updateError } = await supabase
          .from('email_queue')
          .update({
            status: 'sent',
            sent_at: new Date().toISOString(),
            attempts: email.attempts + 1,
            error_message: null
          })
          .eq('id', email.id);

        if (updateError) {
          throw new Error(`Update error: ${updateError.message}`);
        }

        results.processed++;
        console.log(`Email sent successfully to ${email.recipient_email}, ID: ${sendResult.id}`);

      } catch (error) {
        // 更新邮件状态为失败
        const attempts = email.attempts + 1;
        const status = attempts >= email.max_attempts ? 'failed' : 'retry';
        
        const { error: updateError } = await supabase
          .from('email_queue')
          .update({
            status,
            attempts,
            error_message: error instanceof Error ? error.message : 'Unknown error'
          })
          .eq('id', email.id);

        if (updateError) {
          console.error('Failed to update error status:', updateError);
        }

        results.failed++;
        results.errors.push(`${email.recipient_email}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        console.error(`Failed to send email to ${email.recipient_email}:`, error);
      }
    }

    // 获取当前队列状态
    const { data: queueStatus } = await supabase
      .from('email_queue')
      .select('status')
      .eq('status', 'pending');

    const pendingCount = queueStatus?.length || 0;

    return new Response(JSON.stringify({
      success: true,
      results: {
        ...results,
        pending: pendingCount,
        total_processed: emailQueue?.length || 0
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Email processing error:', error);
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const GET: APIRoute = async () => {
  // GET请求返回队列状态
  try {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    const { data: statusData } = await supabase
      .from('email_queue_status')
      .select('*');

    return new Response(JSON.stringify({
      success: true,
      queue_status: statusData || []
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};