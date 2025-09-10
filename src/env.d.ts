/// <reference path="../.astro/types.d.ts" />

// Astro官方Supabase集成 - 标准环境变量类型定义
interface ImportMetaEnv {
  // Supabase配置
  readonly PUBLIC_SUPABASE_URL: string;
  readonly PUBLIC_SUPABASE_ANON_KEY: string;
  readonly SUPABASE_SERVICE_ROLE_KEY: string;
  
  // 邮件服务配置
  readonly RESEND_API_KEY: string;
  readonly RESEND_WEBHOOK_SECRET: string;
  
  // 支付服务配置 (Stripe)
  readonly PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
  
  // 网站配置
  readonly PUBLIC_SITE_URL: string;
  readonly PUBLIC_GA_MEASUREMENT_ID: string;
  readonly PUBLIC_COOKIE_CONSENT_ENABLED: string;
  
  // 邮件配置
  readonly ADMIN_EMAIL: string;
  readonly SUPPORT_EMAIL: string;
  
  // 开发配置
  readonly API_SECRET_TOKEN: string;
  readonly DEBUG_EMAIL: string;
  readonly DEV: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Astro Locals类型定义
declare namespace App {
  interface Locals {
    user?: {
      email: string;
      id?: string;
    };
  }
}