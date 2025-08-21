# Google Analytics 4 测试指南

## 测试方法

### 1. 开发环境测试

#### 启用开发模式GA (可选)
```bash
# 创建 .env 文件
echo "PUBLIC_GA_MEASUREMENT_ID=G-TEST123456" > .env
echo "PUBLIC_GA_ENABLE_DEV=true" >> .env
echo "PUBLIC_COOKIE_CONSENT_ENABLED=true" >> .env
```

#### 启动开发服务器
```bash
npm run dev
```

访问: http://localhost:4321

#### 开发模式特性
- 默认情况下GA在开发模式被禁用
- 控制台会显示模拟的GA事件
- Cookie同意功能正常工作

### 2. 生产环境测试

#### 构建并预览
```bash
npm run build
npm run preview
```

#### 配置真实的GA ID
```bash
# 在 .env 中设置真实的 Measurement ID
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. 功能测试清单

#### Cookie同意测试
- [ ] 首次访问显示cookie横幅
- [ ] 点击"接受所有"隐藏横幅并启用GA
- [ ] 点击"拒绝"隐藏横幅但不启用GA
- [ ] 点击"设置"打开详细选项
- [ ] 在设置中切换分析/营销cookie
- [ ] 刷新页面确认设置被保存

#### 多语言测试
- [ ] 中文页面显示中文cookie横幅
- [ ] 英文页面显示英文cookie横幅
- [ ] 语言切换后横幅语言正确

#### GA事件测试
打开浏览器开发者工具，在控制台执行：

```javascript
// 测试报价请求事件
window.trackQuoteRequest({
  quoteId: 'TEST123',
  estimatedValue: 500
});

// 测试文件上传事件
window.trackFileUpload({
  fileType: 'CAD',
  fileSize: 1024
});

// 测试联系表单事件
window.trackContactForm('general_inquiry');
```

### 4. Google Analytics仪表板验证

#### 实时报告检查
1. 登录 [Google Analytics](https://analytics.google.com)
2. 选择你的属性
3. 查看"实时"报告
4. 访问网站页面
5. 确认实时用户数增加

#### 事件验证
1. 在GA4中进入"实时" > "事件"
2. 触发自定义事件
3. 确认事件出现在实时报告中

### 5. 浏览器测试

#### Chrome DevTools
```javascript
// 检查GA加载状态
console.log('GA loaded:', typeof window.gtag !== 'undefined');

// 检查cookie同意状态
console.log('Cookie consent:', window.getCookieConsent());

// 监听同意变化
window.addEventListener('cookieConsentChanged', (e) => {
  console.log('Consent changed:', e.detail);
});
```

#### 网络标签验证
- 查看对 `googletagmanager.com` 的请求
- 确认GA脚本加载（仅在同意后）
- 检查发送到GA的事件数据

### 6. 隐私合规测试

#### GDPR合规检查
- [ ] 默认状态：GA被禁用
- [ ] 明确同意后：GA被启用
- [ ] 拒绝同意：GA保持禁用
- [ ] 撤回同意功能正常

#### Cookie检查
打开开发者工具 > Application > Storage:
- `localStorage`: 检查 `geppetto_cookie_consent`
- `Cookies`: GA cookies仅在同意后出现

### 7. 常见问题排查

#### GA不工作
1. 检查 `PUBLIC_GA_MEASUREMENT_ID` 是否设置
2. 确认cookie同意已授予
3. 验证GA Measurement ID格式正确

#### Cookie横幅不显示
1. 检查 `PUBLIC_COOKIE_CONSENT_ENABLED=true`
2. 清除localStorage中的同意记录
3. 硬刷新页面

#### 开发模式问题
1. 确认 `PUBLIC_GA_ENABLE_DEV=true`（如需在开发中测试）
2. 检查控制台的模拟事件日志

### 8. 自动化测试脚本

创建测试脚本 `test-ga.js`:
```javascript
// 自动化GA测试脚本
function testGAIntegration() {
  const tests = [];
  
  // 测试GA函数存在
  tests.push({
    name: 'GA Mock Functions',
    test: () => typeof window.trackQuoteRequest === 'function'
  });
  
  // 测试cookie同意函数
  tests.push({
    name: 'Cookie Consent Function',
    test: () => typeof window.getCookieConsent === 'function'
  });
  
  // 运行测试
  tests.forEach(test => {
    console.log(`${test.name}: ${test.test() ? '✅ PASS' : '❌ FAIL'}`);
  });
}

// 在控制台运行
testGAIntegration();
```

### 9. 生产环境部署前检查

- [ ] 设置真实的GA Measurement ID
- [ ] 在GA4中配置自定义维度
- [ ] 测试所有页面的GA加载
- [ ] 验证cookie政策页面链接
- [ ] 确认隐私政策包含GA使用说明

---

**提示**: 使用Google Analytics DebugView可以实时查看事件数据的详细信息。