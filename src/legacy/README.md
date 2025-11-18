# Legacy Frontend Assets

此目录用于暂存目前上线版本未使用、但可能后续参考的页面与组件。放入这里的文件默认不会被 Astro 构建/路由解析，可避免 `astro check` 报错或用户访问到未完成的功能。

## 结构约定
- `src/legacy/en` / `src/legacy/zh`：历史页面（如旧版支付、登录、反馈等）。
- `src/legacy/components/**`：不再引用的组件，例如 `forms/AIQuoteForm.astro`。若未来需要恢复，可将文件移回 `src/components/...` 并重新接入。

## 现有内容（2025-11-04）
- `en/`：checkout、feedback、login、my-orders、payment 系列。
- `zh/`：checkout、feedback、login、my-orders。
- `components/forms/AIQuoteForm.astro`：旧版 AI 报价表单（未在任何页面引用，且导致 `astro check` 报错）。

> 注意：迁入 legacy 前请确认页面未在导航或跳转中使用；如需真正废弃，可在版本管理中直接删除。
