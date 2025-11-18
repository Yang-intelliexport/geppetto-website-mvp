# Geppetto Web i18n Status

## 2025-11-10
- Migrated FAQ, Terms, and Privacy experiences to the shared `src/pages/[lang]/` routes so both locales now share a single template per page.
- Added `src/data/i18n/faq.ts` for hero/categorisation copy and `src/data/i18n/legal.ts` for legal content across locales.
- Removed the legacy `/en` and `/zh` page copies to prevent drift.
- Updated `CookieConsent` to link to the locale-aware privacy route and ran `npm run check` after the migration.

## 2025-11-10 (Resources)
- 新增 `src/data/i18n/resources.ts`，集中管理资源页的 SEO、文案、分类标签与 CTA。
- 创建 `src/pages/[lang]/resources(.astro|/category/[category].astro|/[category]/[slug].astro)`，根据 `Astro.currentLocale` 自动读取对应内容集合并渲染列表/分类/详情。
- 删除 `src/pages/en|zh/resources*` 旧页面，所有资源路由统一走 `[lang]` 版本。

## 2025-11-10 (Track Order)
- 新建 `src/data/i18n/orderTracking.ts`，抽象订单追踪页的英雄区、功能卡片、帮助提示与状态步骤。
- 新页面 `src/pages/[lang]/track-order.astro` & `order-tracking.astro` 覆盖原 `/en|zh` 路由，自动根据 `Astro.currentLocale` 渲染 `AuthenticatedOrderTracker` 与文案。
- 删除旧的 `src/pages/en|zh/track-order(.astro)`、`order-tracking.astro`，所有入口统一至 `[lang]` 路径。

## 2025-11-10 (Payment Center)
- `src/data/i18n/payment.ts` 汇总支付中心、成功/取消页所需文案与结构化内容。
- 新增 `src/pages/[lang]/payment/index|success|cancel.astro`，覆盖原 `/en|zh/payment*` 路由，自动根据 locale 渲染支付方式、保障信息以及支付结果提示，可携带 `quote_id` 返回对应订单支付页。
- 清理遗留的 `/en|zh/payment*.astro` 文件。

## 2025-11-10 (Home & About)
- 新建 `src/data/i18n/home.ts` 与 `src/pages/[lang]/index.astro`，统一首页 Hero/优势/客户评价/计算器等内容，删除 `src/pages/en|zh/index.astro`。
- 新建 `src/data/i18n/about.ts` 与 `src/pages/[lang]/about.astro`，以数据驱动的方式呈现品牌故事、价值观与核心团队，删除旧的 `/en|zh/about.astro`。

## 2025-11-12 (Resources SEO pass)
- `src/data/i18n/resources.ts` 扩展 `popularTagsSection` 与 `internalLinksSection`，用于定义多语言标签云文案与跨页面 CTA 卡片。
- `src/pages/[lang]/resources/index.astro` 新增标签统计与 `?tag=` 过滤逻辑，渲染热门主题、筛选提示与空状态，并插入服务/案例/报价三张内部链接卡片。
- `src/pages/[lang]/resources/category/[category].astro` 在分类页顶部展示该分类下的热门标签，引导到 `/[lang]/resources?tag=xxx`，并追加相同的内部链接卡片组。
- `src/components/seo/StructuredData.astro` 增加 `CollectionPage` 支持，资源列表/分类页通过 BaseLayout 输出 CollectionPage + BreadcrumbList JSON-LD，ResourceLayout 注入详情页面包屑 schema。
- `src/content/resources*` 与 `resources-en*` 全量补齐 `seo.metaDescription`、`seo.canonicalUrl`，保持中英 SERP 摘要与 canonical 一致。
- `src/pages/[lang]/case-studies/[slug].astro` 上线，链接 `case-studies` & `case-studies-en` 内容集合；`caseStudiesContent` 增加 slug 字段，列表页按钮直达详情并输出 CaseStudy/Breadcrumb schema。
- `src/pages/[lang]/case-studies.astro` 直接读取 content collections（`case-studies*`），CTA 链接附带 `case_study_click` 埋点；详情页加载触发 `case_study_view`，资源页 `?tag=` 过滤同步推送 `resources_tag_filter` 事件。
