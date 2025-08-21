# Geppetto Website MVP

AI驱动的精密制造服务网站 - MVP版本

## 🚀 项目概览

基于Astro构建的高性能静态网站，展示Geppetto的四大核心优势：
- **Geppetto智能报价承诺** - AI秒级分析，专家4-8小时确认
- **24小时极速交付** - 行业领先的交付速度
- **单件起做无MOQ** - AI驱动的经济性革命
- **±0.05mm精度保证** - 超越行业标准的质量承诺

## 🛠 技术栈

- **框架**: Astro 5.x + SSG
- **样式**: Tailwind CSS 3.x
- **交互**: React 19 + Vue 3 (按需加载)
- **部署**: Vercel/Netlify + GitHub Actions
- **内容**: Markdown + Front Matter

## 📁 项目结构

```
src/
├── components/          # 可复用组件
│   ├── ui/             # 基础UI组件
│   ├── marketing/      # 营销组件
│   ├── interactive/    # 交互功能组件 (React)
│   └── calculators/    # 计算器组件 (Vue)
├── layouts/            # 页面布局模板
├── pages/              # 路由页面
│   ├── index.astro     # 首页
│   ├── why-geppetto/   # 核心营销页面
│   ├── services/       # 服务页面
│   └── instant-quote/  # AI报价工具
├── styles/             # 样式文件
└── utils/              # 工具函数
```

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

网站将在 `http://localhost:4321` 启动

### 3. 构建生产版本

```bash
npm run build
```

### 4. 预览生产版本

```bash
npm run preview
```

## 🎨 设计系统

### 品牌色彩

```css
:root {
  --color-brand-purple: #7F00FF;  /* Geppetto主品牌色 */
  --color-brand-blue: #00BFFF;    /* 辅助品牌色 */
  --color-text-primary: #111827;   /* 主文本色 */
  --color-background: #FFFFFF;     /* 背景色 */
}
```

### 核心组件

- `BaseLayout.astro` - 统一的页面布局
- `HeroSection` - 首页Hero区域
- `AdvantagesGrid` - 四大优势展示
- `QuoteEngine` - AI报价工具 (React)
- `CostCalculator` - 成本分析器 (Vue)

## 📱 响应式设计

- **移动优先** - Mobile-first设计方法
- **断点系统** - 基于Tailwind的响应式断点
- **性能优化** - 图片懒加载、组件按需加载

## 🚀 部署

### Vercel (推荐)

1. 连接GitHub仓库到Vercel
2. 设置环境变量
3. 自动部署配置

### 环境变量

复制 `.env.example` 到 `.env` 并配置以下环境变量：

#### 必需配置

```bash
# Google Analytics 4 (生产环境必需)
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Supabase数据库 (如果使用数据库功能)
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

#### 可选配置

```bash
# 开发环境Google Analytics测试
PUBLIC_GA_ENABLE_DEV=false

# Cookie同意横幅
PUBLIC_COOKIE_CONSENT_ENABLED=true

# 网站URL
PUBLIC_SITE_URL=https://geppetto.com
```

#### 如何获取配置值

1. **Google Analytics**: 在[Google Analytics](https://analytics.google.com)创建GA4属性获取Measurement ID
2. **Supabase**: 在[Supabase Dashboard](https://supabase.com/dashboard)项目设置中获取URL和API密钥

**注意**: 生产环境请确保设置真实的GA Measurement ID以启用网站分析。

## 📊 性能优化

- **静态生成** - 所有页面预生成HTML
- **代码分割** - 按路由和组件分割
- **图片优化** - WebP格式和懒加载
- **CDN缓存** - 静态资源CDN加速

## 🔍 SEO优化

- **元数据管理** - 统一的SEO配置
- **结构化数据** - Schema.org标记
- **性能指标** - Core Web Vitals优化
- **语义化HTML** - 良好的可访问性

## 📈 Analytics & 隐私

### Google Analytics 4集成

网站集成了隐私优先的Google Analytics 4：

- **GDPR合规** - Cookie同意横幅和精细权限控制
- **隐私保护** - IP匿名化，禁用广告功能
- **自定义事件** - B2B转化跟踪（报价请求、文件上传、联系表单）
- **多语言支持** - 中英文cookie同意界面

### 隐私功能

- 默认拒绝所有跟踪，需要用户明确同意
- 支持分类同意（必需、分析、营销）
- 用户可随时撤回同意
- 开发环境自动禁用追踪

## 📞 联系我们

- **官网**: https://geppetto.com
- **邮箱**: hello@geppetto.com  
- **电话**: 400-XXX-XXXX

---

**体验Geppetto智能报价承诺，感受AI驱动制造的革命性变革！** 🚀
