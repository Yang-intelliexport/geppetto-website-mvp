# Geppetto CNC制造网站 - 部署文档

## 🚀 快速部署指南

### 环境要求
- Node.js 18+
- Supabase 账户
- Vercel 账户 (推荐) 或其他支持 Astro SSR 的平台
- Stripe 账户 (支付功能)

## 📋 部署前准备

### 1. 环境变量配置

创建 `.env` 文件并配置以下环境变量：

```bash
# Supabase 配置
PUBLIC_SUPABASE_URL=your-supabase-url
PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# 网站配置
SITE_URL=https://your-domain.com
PUBLIC_SITE_URL=https://your-domain.com

# Stripe 配置 (可选)
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret

# 邮件服务 (可选)
RESEND_API_KEY=your-resend-api-key
```

### 2. Supabase 数据库设置

使用提供的 SQL 文件初始化数据库：

```sql
-- 创建 quotes 表
CREATE TABLE quotes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  token TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  company_name TEXT,
  phone TEXT,
  country TEXT,
  product_name TEXT NOT NULL,
  material TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  surface_finish TEXT,
  tolerance TEXT,
  special_requirements TEXT,
  status TEXT DEFAULT 'pending',
  priority INTEGER DEFAULT 1,
  unit_price DECIMAL(10,2),
  total_price DECIMAL(10,2),
  delivery_time_days INTEGER,
  cad_file_path TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days'),
  assigned_to TEXT,
  internal_notes TEXT
);

-- 创建索引
CREATE INDEX idx_quotes_email ON quotes(email);
CREATE INDEX idx_quotes_token ON quotes(token);
CREATE INDEX idx_quotes_status ON quotes(status);
CREATE INDEX idx_quotes_created_at ON quotes(created_at);

-- RLS 策略
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "quotes_select_policy" ON quotes
  FOR SELECT USING (true);

CREATE POLICY "quotes_insert_policy" ON quotes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "quotes_update_policy" ON quotes
  FOR UPDATE USING (true);
```

## 🌐 部署到 Vercel

### 1. 安装 Vercel CLI

```bash
npm i -g vercel
```

### 2. 项目配置

确保 `astro.config.mjs` 配置正确：

```javascript
import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'
import react from '@astrojs/react'

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  site: process.env.SITE_URL || 'https://geppetto.studio',
  integrations: [
    react(),
    tailwind(),
    sitemap()
  ]
})
```

### 3. 部署命令

```bash
# 构建项目
npm run build

# 部署到 Vercel
vercel --prod
```

### 4. 环境变量设置

在 Vercel 控制台中设置所有必需的环境变量：

1. 进入 Vercel 项目设置
2. 点击 "Environment Variables"
3. 添加所有 `.env` 中的变量

## 🔧 生产环境优化

### 1. 性能优化
- ✅ 图片已优化为 WebP 格式
- ✅ CSS 和 JS 已压缩
- ✅ 启用了预取功能
- ✅ 配置了 CDN 缓存

### 2. SEO 优化
- ✅ 多语言支持 (中文/英文)
- ✅ 结构化数据
- ✅ 站点地图自动生成
- ✅ 元标签优化

### 3. 安全配置
- ✅ HTTPS 强制重定向
- ✅ 环境变量安全存储
- ✅ CORS 配置
- ✅ RLS 数据库安全

## 📊 监控和维护

### 1. 数据库监控
定期检查 Supabase 数据库性能和存储使用情况。

### 2. 错误监控
建议集成错误监控服务如 Sentry。

### 3. 备份策略
- 定期备份 Supabase 数据
- 代码版本控制已配置

## 🎯 品牌配置

### 联系信息
- 电话：+86 13511091304
- 邮箱：hello@geppetto.studio (通用), business@geppetto.studio (商务)
- 公司：奇塑科技(深圳)有限公司

### 服务时间
- 工作时间：10:00-19:00 (UTC+8)
- 周末：紧急项目支持

## 🔍 故障排除

### 常见问题

1. **构建失败**
   - 检查 Node.js 版本 (需要 18+)
   - 确认所有依赖安装完整：`npm install`

2. **Supabase 连接问题**
   - 验证环境变量设置正确
   - 检查 Supabase 项目状态

3. **图片不显示**
   - 确认图片路径正确
   - 检查 Vercel 静态资源配置

4. **邮件功能异常**
   - 验证 Resend API 密钥
   - 检查邮件模板配置

## 📱 移动端优化

- ✅ 响应式设计已实现
- ✅ 触摸友好界面
- ✅ 移动端性能优化

## 🌍 国际化

- ✅ 中文 (默认)：/zh/
- ✅ 英文：/en/
- 支持添加更多语言

## 📈 分析和追踪

建议添加：
- Google Analytics
- Google Search Console
- 热力图工具

---

## 🆘 支持

如需技术支持，请联系：
- 技术邮箱：hello@geppetto.studio
- 开发团队：详见项目 README.md

**最后更新：2025年1月**