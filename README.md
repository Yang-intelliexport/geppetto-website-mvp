# 🏭 Geppetto CNC 智能制造网站

> AI驱动的精密制造服务平台 - 专为初创企业设计的透明制造解决方案

## 📖 项目概述

Geppetto 是一个现代化的CNC制造服务网站，专注于为初创企业和机器人行业提供透明、快速、高质量的制造服务。采用 "AI检测+专家报价" 的创新模式，72小时生产完成，无MOQ限制。

### 🎯 核心价值主张

1. **双重验证体系** - AI辅助分析 + 专家技术审核 = 透明报价体系
2. **初创企业友好** - 1件起做，72小时生产完成，无MOQ限制
3. **项目定制精度** - 满足工业制造、电子设备等行业精度要求
4. **全程透明沟通** - 8小时专家审核报价，实时生产进度更新

## 🛠️ 技术栈

### 前端框架
- **Astro 5.13+** - 现代化全栈框架，SSR支持
- **React 19** - 动态组件和交互功能
- **TypeScript** - 类型安全开发
- **Tailwind CSS** - 实用优先的CSS框架

### 后端服务
- **Supabase** - 数据库、认证、实时功能
- **Vercel** - 部署和托管平台
- **Vercel Edge Functions** - 服务端逻辑

### 集成服务
- **Stripe** - 支付处理 (测试模式)
- **Resend** - 邮件服务
- **Magic Link** - 无密码认证

## 🌟 主要功能

### 🔐 用户功能
- ✅ Magic Link 无密码登录
- ✅ 报价申请和文件上传
- ✅ 订单追踪和状态查看
- ✅ 实时消息沟通
- ✅ 多语言支持 (中文/英文)

### 💼 业务功能
- ✅ AI辅助报价分析
- ✅ 专家审核工作流
- ✅ 透明定价系统
- ✅ 支付集成 (Stripe)
- ✅ 邮件通知系统

### 🎨 设计特色
- ✅ 响应式设计，移动端优化
- ✅ 现代化UI，符合制造业专业形象
- ✅ 紫色梯度品牌色调
- ✅ 直观的用户体验流程

## 🚀 快速开始

### 环境要求
- Node.js 18+
- npm 或 yarn
- Supabase 账户
- Vercel 账户 (部署)

### 安装步骤

```bash
# 克隆项目
git clone https://github.com/your-repo/geppetto-website-mvp.git
cd geppetto-website-mvp

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件，填入必要的配置

# 启动开发服务器
npm run dev
```

### 环境变量配置

```bash
# Supabase 配置
PUBLIC_SUPABASE_URL=your-supabase-url
PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# 网站配置
SITE_URL=http://localhost:4321
PUBLIC_SITE_URL=http://localhost:4321

# Stripe 配置 (可选)
STRIPE_SECRET_KEY=your-stripe-secret-key

# 邮件服务 (可选)
RESEND_API_KEY=your-resend-api-key
```

## 📁 项目结构

```
src/
├── components/           # React 组件
│   ├── QuoteCreationFlow.tsx    # 报价创建流程
│   ├── MessageThread.tsx       # 消息线程
│   └── sections/               # 页面模块组件
├── layouts/             # Astro 布局模板
│   └── BaseLayout.astro        # 基础布局
├── pages/               # 页面路由
│   ├── en/             # 英文页面
│   ├── zh/             # 中文页面
│   └── api/            # API 端点
├── lib/                # 工具库
│   ├── supabase.ts     # Supabase 客户端
│   └── utils.ts        # 通用工具函数
├── styles/             # 样式文件
└── types/              # TypeScript 类型定义
```

## 🌍 多语言支持

### 支持语言
- 🇨🇳 简体中文 (默认) - `/zh/`
- 🇺🇸 English - `/en/`

### 语言切换
用户可以通过顶部导航栏的语言切换器在中英文之间切换。URL重定向规则确保了SEO友好的多语言体验。

## 📊 数据库架构

### 主要数据表

#### quotes 表
```sql
- id: UUID (主键)
- token: TEXT (唯一访问令牌)
- email: TEXT (客户邮箱)
- contact_name: TEXT (联系人姓名)
- product_name: TEXT (产品名称)
- material: TEXT (材料类型)
- quantity: INTEGER (数量)
- status: TEXT (状态: pending/processing/quoted/approved)
- total_price: DECIMAL (总价格)
- created_at: TIMESTAMPTZ (创建时间)
```

## 🎨 设计系统

### 品牌色彩
- **主色调**: AI渐变 `linear-gradient(90deg, #7F00FF, #00BFFF)`
- **行动色**: 活力紫 `#7F00FF`
- **背景色**: 纯净白 `#FFFFFF`
- **文本色**: 深度灰黑 `#111827`

### 响应式断点
- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`

## 🔒 安全特性

- ✅ Row Level Security (RLS) 数据库安全
- ✅ 环境变量安全存储
- ✅ HTTPS 强制重定向
- ✅ 输入验证和消毒
- ✅ Magic Link 安全认证

## 📈 性能优化

- ✅ 图片懒加载和 WebP 格式
- ✅ CSS 和 JS 代码分割
- ✅ 预取关键资源
- ✅ CDN 内容分发
- ✅ 服务端渲染 (SSR)

## 🔧 开发命令

```bash
# 开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview

# 类型检查
npm run type-check

# 代码格式化
npm run format
```

## 🧪 测试

### 测试邮箱
- 开发测试：`zn.yang@intelliexport.com`

### Stripe 测试卡
- 测试卡号：`4242 4242 4242 4242`
- 过期日期：任意未来日期
- CVC：任意3位数字

## 📋 部署检查清单

- [ ] 环境变量配置完成
- [ ] Supabase 数据库初始化
- [ ] 域名和SSL证书配置
- [ ] 邮件服务测试
- [ ] 支付功能测试
- [ ] 移动端兼容性测试
- [ ] SEO 配置验证

## 🎯 品牌信息

### 公司信息
- **公司名称**: 奇塑科技(深圳)有限公司
- **品牌名称**: Geppetto智能制造
- **服务时间**: 工作时间 10:00-19:00 (UTC+8)

### 联系方式
- **通用邮箱**: hello@geppetto.studio
- **商务邮箱**: business@geppetto.studio
- **客服电话**: +86 13511091304

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🆘 支持

### 技术支持
- 📧 Email: hello@geppetto.studio
- 📱 Phone: +86 13511091304

### 文档链接
- [部署指南](DEPLOYMENT.md)
- [API 文档](docs/API.md)
- [设计系统](docs/DESIGN_SYSTEM.md)

---

## 🏆 项目特色

这个项目展示了现代全栈开发的最佳实践：
- 🚀 **现代技术栈** - Astro + React + TypeScript + Supabase
- 🎨 **优秀设计** - 符合制造业专业形象的现代UI
- 🌍 **国际化** - 完整的中英文双语支持
- 📱 **移动优先** - 响应式设计，完美适配所有设备
- 🔒 **企业级安全** - 完整的安全措施和最佳实践
- ⚡ **高性能** - 优化的加载速度和用户体验

**由 Claude Code 和团队协作开发** ⚡

---

*最后更新: 2025年1月*