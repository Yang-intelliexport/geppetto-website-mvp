#!/usr/bin/env node

/**
 * 域名配置验证脚本
 * 用于检查Supabase认证配置与部署域名的一致性
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// 颜色输出函数
const colors = {
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`,
  bold: (text) => `\x1b[1m${text}\x1b[0m`
};

console.log(colors.cyan(colors.bold('\n🔍 Geppetto CNC 域名配置验证')));
console.log('='.repeat(50));

// 读取.env文件
let envConfig = {};
try {
  const envContent = readFileSync(join(projectRoot, '.env'), 'utf8');
  envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value && !key.startsWith('#')) {
      envConfig[key.trim()] = value.trim();
    }
  });
} catch (error) {
  console.log(colors.red('❌ 无法读取 .env 文件'));
  process.exit(1);
}

// 验证配置
const checks = [
  {
    name: 'PUBLIC_SITE_URL 配置',
    check: () => {
      const siteUrl = envConfig.PUBLIC_SITE_URL;
      if (!siteUrl) {
        return { status: 'error', message: '未设置 PUBLIC_SITE_URL' };
      }
      if (!siteUrl.startsWith('https://')) {
        return { status: 'error', message: 'PUBLIC_SITE_URL 必须使用 HTTPS' };
      }
      return { status: 'success', message: `当前配置: ${siteUrl}` };
    }
  },
  {
    name: 'Supabase 配置',
    check: () => {
      const url = envConfig.PUBLIC_SUPABASE_URL;
      const key = envConfig.PUBLIC_SUPABASE_ANON_KEY;
      if (!url || !key) {
        return { status: 'error', message: '缺少 Supabase 配置' };
      }
      return { status: 'success', message: '已配置 Supabase 连接' };
    }
  }
];

// 执行检查
let allPassed = true;
checks.forEach(({ name, check }) => {
  const result = check();
  const icon = result.status === 'success' ? '✅' : 
               result.status === 'warning' ? '⚠️' : '❌';
  const color = result.status === 'success' ? colors.green : 
                result.status === 'warning' ? colors.yellow : colors.red;
  
  console.log(`${icon} ${colors.bold(name)}: ${color(result.message)}`);
  
  if (result.status === 'error') {
    allPassed = false;
  }
});

// 输出建议
console.log('\n' + colors.cyan(colors.bold('🔧 配置建议')));
console.log('='.repeat(30));

console.log(colors.yellow('1. Vercel 部署检查:'));
console.log('   - 访问您的 Vercel 项目，确认实际访问域名');
console.log('   - 检查是否启用了www重定向');

console.log(colors.yellow('\n2. Supabase 认证设置:'));
console.log('   - 登录 Supabase Dashboard');
console.log('   - 进入 Authentication → URL Configuration');
console.log(`   - Site URL: ${envConfig.PUBLIC_SITE_URL || '[待设置]'}`);
console.log(`   - Redirect URLs 添加: ${envConfig.PUBLIC_SITE_URL || '[您的域名]'}/api/auth/callback`);

console.log(colors.yellow('\n3. 环境变量同步:'));
console.log('   - 确保 Vercel 环境变量与本地 .env 一致');
console.log('   - 变量名: PUBLIC_SITE_URL');
console.log('   - 应用到: Production, Preview, Development');

console.log(colors.yellow('\n4. 测试建议:'));
console.log('   - 使用无痕浏览器窗口');
console.log('   - 打开开发者工具 Network 面板');
console.log('   - 勾选 "Preserve log" 选项');
console.log('   - 完整测试登录流程');

if (allPassed) {
  console.log(colors.green(colors.bold('\n🎉 本地配置看起来正常！')));
  console.log(colors.blue('请继续检查 Supabase Dashboard 和 Vercel 设置是否匹配'));
} else {
  console.log(colors.red(colors.bold('\n❌ 发现配置问题，请修复后重试')));
}

// 输出快速修复命令
console.log(colors.cyan(colors.bold('\n⚡ 快速检查命令')));
console.log('='.repeat(35));
console.log(colors.blue('# 检查当前环境变量'));
console.log('grep -E "PUBLIC_SITE_URL|PUBLIC_SUPABASE" .env');
console.log(colors.blue('\n# 测试本地开发服务器'));
console.log('npm run dev');
console.log(colors.blue('\n# 部署到 Vercel'));
console.log('vercel --prod');

console.log('\n');