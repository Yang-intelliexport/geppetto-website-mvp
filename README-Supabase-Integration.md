# Geppetto网站 - Supabase集成指南

## 🎯 集成概述

已成功将Supabase后端服务集成到Geppetto网站，实现完整的表单提交、文件上传和数据管理功能。

## 📋 已实现功能

### ✅ 核心功能
- **联系表单提交** - 完整的客户咨询收集
- **AI报价请求** - CAD文件上传和报价管理  
- **成本计算器** - 计算结果云端保存
- **文件上传** - Supabase Storage集成
- **管理后台** - 完整的数据管理界面

### ✅ 数据表结构
```sql
-- 联系表单提交
contact_submissions (id, name, email, company, phone, message, source, created_at)

-- AI报价请求  
quote_requests (id, name, email, company, phone, material, quantity, requirements, file_urls, estimated_cost, status, expert_notes, final_quote, delivery_days, created_at, updated_at)

-- 成本计算结果
cost_calculations (id, project_name, parameters, results, total_cost, unit_cost, user_email, created_at)
```

### ✅ 文件上传
- **存储桶**: `cad-files`
- **支持格式**: STEP, STL, IGES, DWG, DXF, OBJ, PLY, 3MF
- **文件大小限制**: 50MB
- **自动重命名**: 时间戳 + 随机字符串

## 🚀 部署步骤

### 1. 创建Supabase项目
1. 访问 [supabase.com](https://supabase.com)
2. 创建新项目
3. 记录项目URL和API密钥

### 2. 设置数据库
1. 在Supabase SQL编辑器中执行 `supabase-setup.sql`
2. 验证所有表和索引创建成功
3. 检查RLS策略设置

### 3. 配置环境变量
创建 `.env` 文件：
```bash
# 复制示例文件
cp .env.example .env

# 编辑配置
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
PUBLIC_SITE_URL=https://your-domain.com
```

### 4. 设置Storage
1. 在Supabase控制台创建 `cad-files` 存储桶
2. 设置为公开访问
3. 配置上传策略

### 5. 部署网站
```bash
# 安装依赖
npm install

# 构建项目
npm run build

# 部署到Vercel/Netlify
# 确保环境变量正确配置
```

## 🔧 文件说明

### 核心集成文件
- `src/utils/supabase.ts` - Supabase客户端和API函数
- `src/utils/formValidation.ts` - 表单验证工具
- `src/utils/adminDashboard.ts` - 管理后台工具函数

### 组件更新
- `src/components/forms/ContactForm.astro` - 联系表单Supabase集成
- `src/components/forms/AIQuoteForm.astro` - AI报价表单（新增）
- `src/pages/calculator.astro` - 成本计算器数据保存

### 管理后台
- `admin-dashboard.html` - 独立的管理后台页面
- 功能：查看提交、处理报价、导出数据

## 📊 数据流程

### 联系表单流程
1. 用户填写表单
2. 可选文件上传到Storage
3. 表单数据保存到 `contact_submissions`
4. 邮件通知（可选）

### AI报价流程  
1. 用户上传CAD文件和填写信息
2. 文件上传到 `cad-files` Storage
3. 报价请求保存到 `quote_requests` (status: pending)
4. 管理员在后台处理报价
5. 更新状态为 quoted/completed
6. 发送报价邮件给客户

### 成本计算流程
1. 用户使用计算器
2. 点击保存按钮
3. 计算参数和结果保存到 `cost_calculations`
4. 本地存储作为备份

## 🔐 安全配置

### RLS策略
- **读取权限**: 仅认证用户可查看数据
- **写入权限**: 公开可插入新记录
- **更新权限**: 仅认证用户可更新

### 文件上传安全
- 文件类型验证
- 文件大小限制
- 自动重命名避免冲突
- 公开访问但路径随机化

## 🎮 管理后台使用

### 访问后台
1. 打开 `admin-dashboard.html`
2. 配置Supabase连接信息
3. 查看统计数据和待处理项目

### 处理报价
1. 在待处理列表中选择报价
2. 填写最终报价和交期
3. 添加技术说明
4. 提交更新状态

### 导出数据
- 支持CSV格式导出
- 包含所有表单提交和报价数据
- 按日期自动命名文件

## 🐛 常见问题

### 1. 环境变量不生效
- 确保变量名以 `PUBLIC_` 开头（前端使用）
- 重启开发服务器
- 检查Vercel/Netlify环境变量配置

### 2. 文件上传失败
- 检查Storage桶是否存在
- 验证上传策略配置
- 确认文件大小和格式限制

### 3. 表单提交失败
- 检查RLS策略配置
- 验证必填字段
- 查看浏览器控制台错误

### 4. 管理后台无法连接
- 确认Supabase URL和密钥正确
- 检查网络连接
- 验证数据库表是否存在

## 📈 性能优化

### 数据库优化
- 已创建关键字段索引
- 使用分页查询大数据集
- 定期清理过期数据

### 文件存储优化  
- 压缩上传文件
- 使用CDN加速访问
- 设置合理的缓存策略

### 前端优化
- 表单验证减少无效提交
- 文件上传进度显示
- 错误处理和重试机制

## 🔄 后续扩展

### 邮件系统
- 集成SendGrid/Resend
- 创建邮件模板
- 实现自动通知

### 实时功能
- WebSocket连接
- 实时状态更新
- 管理员通知

### 高级分析
- 转化率追踪
- 用户行为分析  
- 业务指标仪表板

---

## 📞 技术支持

如遇到集成问题，请检查：
1. Supabase项目配置
2. 环境变量设置
3. 数据库表结构
4. RLS策略配置

集成已测试可用，按照此指南操作即可成功部署完整的后端功能。