# 线上环境认证问题排查指南

## 问题诊断

根据日志分析，魔法链接验证过程完成但用户未成功登录，这通常是由于**域名配置不匹配**导致的Cookie设置失败。

## 排查步骤

### 1. 检查当前部署域名
- 访问您的 Vercel 项目设置
- 确认您的主域名是什么（例如：`geppetto.studio` 还是 `www.geppetto.studio`）
- 记录完整的域名包括协议：`https://[您的域名]`

### 2. 检查 Supabase Auth 配置
登录 Supabase Dashboard → Authentication → URL Configuration

需要检查以下配置：

#### Site URL (站点URL)
```
当前配置：https://geppetto.studio
需要匹配：[您的实际部署域名]
```

#### Redirect URLs (重定向URL)
确保包含以下URL：
```
https://[您的域名]/api/auth/callback
https://[您的域名]/zh/create-quote
https://[您的域名]/en/create-quote
```

### 3. 浏览器调试验证
1. 打开**无痕窗口**
2. 按F12打开开发者工具
3. 切换到 **Network** 标签页
4. ✅ 勾选 **Preserve log** 选项
5. 尝试登录流程：
   - 输入邮箱发送魔法链接
   - 点击邮件中的链接
6. 在Network面板中找到 `verify` 请求
7. 点击该请求，查看 **Response Headers**
8. 检查 `Set-Cookie` 的 `Domain` 属性

### 4. 验证Cookie设置
查看 `Set-Cookie` 响应头应该类似：
```
Set-Cookie: sb-[project-id]-auth-token=...; Domain=[您的域名]; ...
```

**如果Domain不匹配您的浏览器地址栏域名，这就是问题所在！**

## 常见问题和解决方案

### 问题1：www vs 非www域名不匹配
- **症状**：Supabase设置为 `https://geppetto.studio`，但浏览器访问的是 `https://www.geppetto.studio`
- **解决**：统一使用一个域名，建议使用非www版本

### 问题2：环境变量不一致
- **症状**：本地 `.env` 文件和 Vercel 环境变量设置不同
- **解决**：确保 Vercel 环境变量 `PUBLIC_SITE_URL` 与实际域名匹配

### 问题3：callback URL缺失
- **症状**：魔法链接点击后跳转到错误页面
- **解决**：在Supabase Redirect URLs中添加callback路径

## 修复检查清单

- [ ] 确认 Vercel 部署的实际访问域名
- [ ] 更新 Supabase Site URL 匹配部署域名
- [ ] 添加所有必要的 Redirect URLs
- [ ] 更新 Vercel 环境变量 `PUBLIC_SITE_URL`
- [ ] 重新部署项目
- [ ] 使用无痕窗口测试登录流程
- [ ] 验证 Cookie 的 Domain 属性正确

## 紧急修复方案

如果需要立即修复，请执行以下步骤：

1. **确定正确的域名**：访问您的网站，复制地址栏的完整URL
2. **更新Supabase配置**：
   - Site URL: `https://[正确域名]`
   - Redirect URLs: 添加 `https://[正确域名]/api/auth/callback`
3. **更新Vercel环境变量**：
   - `PUBLIC_SITE_URL` = `https://[正确域名]`
4. **触发重新部署**

## 验证修复

修复后，请：
1. 清除浏览器缓存或使用无痕窗口
2. 尝试完整的登录流程
3. 检查浏览器开发者工具中的Cookie是否正确设置
4. 确认登录后能访问需要认证的页面

---

**重要提醒**：域名配置必须完全匹配，包括协议(https://)、子域名(www或不带www)，任何微小的差异都会导致Cookie设置失败。