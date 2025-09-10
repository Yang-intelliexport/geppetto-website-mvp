# 🔧 Callback回调问题排查指南

## 问题定位

您已确认问题出现在魔法链接点击后的callback处理环节。让我们系统性地排查这个问题。

## 🚨 立即检查清单

### 1. 检查魔法链接的实际URL格式
在邮件中，魔法链接应该类似：
```
https://www.geppetto.studio/api/auth/callback?code=xxx&next=/zh/create-quote
```

**检查点**：
- [ ] 域名是否为 `www.geppetto.studio`
- [ ] 路径是否为 `/api/auth/callback`
- [ ] 是否包含 `code` 参数
- [ ] `code` 参数是否有值

### 2. 使用调试端点检查请求详情
访问这个调试URL（用您的实际域名）：
```
https://www.geppetto.studio/api/debug/callback-test
```
这会显示完整的请求信息，包括：
- 请求头信息
- 环境变量
- Cookie状态
- URL参数

### 3. 检查服务器日志
在Vercel Dashboard中查看Function Logs，搜索：
- `Auth callback started`
- `exchangeCodeForSession`
- `Session creation failed`

## 🔍 常见Callback问题和解决方案

### 问题1: 域名不匹配导致Cookie拒绝
**症状**: 回调成功但用户仍显示未登录
**排查**: 
```bash
# 检查浏览器开发者工具 > Application > Cookies
# 查看是否有 sb-xxx-auth-token Cookie
```
**解决**: 确保Supabase Site URL与实际访问域名完全匹配

### 问题2: Authorization Code无效或过期
**症状**: `Failed to exchange code for session` 错误
**原因**: 
- 魔法链接被多次点击
- 链接已过期（通常1小时）
- Code格式错误

**排查方法**:
```javascript
// 在callback.ts中查看日志
console.log('Code received:', code);
```

### 问题3: Cookie设置问题
**症状**: 会话创建成功但Cookie未保存
**排查**:
1. 检查浏览器是否阻止第三方Cookie
2. 查看Cookie的Domain属性是否正确
3. 确认HTTPS配置正确

### 问题4: 重定向循环
**症状**: 页面无限重定向
**原因**: callback处理后重定向到需要认证的页面，但Cookie未正确设置

## 🛠️ 增强的Callback实现

我已经为您更新了 `src/pages/api/auth/callback.ts`，新增功能：

### 新增调试功能：
- 详细的时间戳日志
- 请求头信息记录  
- URL参数完整解析
- 会话验证步骤
- 错误详情记录

### 新增检查步骤：
1. **请求信息记录** - 记录User-Agent、Referer等
2. **参数验证** - 检查所有可能的URL参数
3. **现有会话检查** - 验证之前是否已有会话
4. **代码交换** - 详细记录交换过程
5. **会话验证** - 确认新会话创建成功
6. **最终检查** - 重新获取会话确认状态

## 🧪 测试步骤

### 1. 本地测试
```bash
# 启动开发服务器
npm run dev

# 访问创建报价页面
open http://localhost:4321/zh/create-quote

# 尝试登录流程
```

### 2. 线上测试
```bash
# 访问调试端点
curl https://www.geppetto.studio/api/debug/callback-test

# 检查返回的环境变量是否正确
```

### 3. 浏览器开发者工具测试
1. 打开 Network 标签页
2. 勾选 "Preserve log"
3. 完成整个登录流程
4. 查找 `/api/auth/callback` 请求
5. 检查请求和响应详情

## 🎯 重点排查方向

基于魔法链接发送成功，问题可能在：

### 1. **URL格式问题** (可能性: 高)
- Supabase生成的回调URL域名不匹配
- 回调路径配置错误

### 2. **Cookie域名问题** (可能性: 高)  
- Set-Cookie的Domain属性与浏览器域名不符
- SameSite设置导致Cookie被拒绝

### 3. **代码交换失败** (可能性: 中)
- Authorization Code格式问题
- Supabase服务器通信问题

### 4. **会话存储问题** (可能性: 中)
- 服务器端会话创建成功但客户端未接收
- Cookie写入权限问题

## 📊 下一步行动

1. **立即执行**: 查看增强后的callback日志
2. **访问调试端点**: 检查环境配置
3. **浏览器测试**: 使用开发者工具详细观察
4. **提供日志**: 分享具体的错误信息

## 🆘 如果问题持续存在

请提供以下信息：
1. Vercel Function Logs中的callback日志
2. 浏览器开发者工具中的Network请求详情
3. 调试端点返回的环境信息
4. 具体的错误信息或异常行为描述

---
**文件位置**: 
- 增强的callback: `src/pages/api/auth/callback.ts`
- 调试端点: `src/pages/api/debug/callback-test.ts`
- 错误页面: `src/pages/auth/error.astro`