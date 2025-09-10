import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'
import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  // Astro官方Supabase集成 - 启用SSR按需渲染
  output: 'server',
  adapter: vercel(),
  
  site: process.env.SITE_URL || 'https://geppetto.studio',
  
  // 多语言重定向配置
  redirects: {
    '/about': '/zh/about',
    '/ai-quote': '/zh/ai-quote',
    '/calculator': '/zh/calculator',
    '/case-studies': '/zh/case-studies',
    '/contact': '/zh/contact',
    '/faq': '/zh/faq',
    '/login': '/zh/login',
    '/my-orders': '/zh/my-orders',
    '/no-moq': '/zh/no-moq',
    '/order-tracking': '/zh/order-tracking',
    '/payment': '/zh/payment',
    '/payment/success': '/zh/payment/success',
    '/payment/cancel': '/zh/payment/cancel',
    '/privacy': '/zh/privacy',
    '/quote/:token': '/zh/quote/:token',
    '/quote-result/:token': '/zh/quote/:token',
    '/quote-status/:token': '/zh/quote/:token',
    '/resources': '/zh/resources',
    '/services': '/zh/services',
    '/terms': '/zh/terms',
    '/track-order': '/zh/track-order'
  },
  
  integrations: [
    react(),
    tailwind(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      // 更新后的页面列表（已删除冗余页面）
      customPages: [
        `${process.env.SITE_URL || 'https://geppetto.studio'}/`,
        `${process.env.SITE_URL || 'https://geppetto.studio'}/ai-quote`,
        `${process.env.SITE_URL || 'https://geppetto.studio'}/create-quote`,
        `${process.env.SITE_URL || 'https://geppetto.studio'}/services`,
        `${process.env.SITE_URL || 'https://geppetto.studio'}/why-geppetto`,
        `${process.env.SITE_URL || 'https://geppetto.studio'}/transparent-pricing`,
        `${process.env.SITE_URL || 'https://geppetto.studio'}/no-moq`,
        `${process.env.SITE_URL || 'https://geppetto.studio'}/case-studies`,
        `${process.env.SITE_URL || 'https://geppetto.studio'}/about`,
        `${process.env.SITE_URL || 'https://geppetto.studio'}/faq`,
        `${process.env.SITE_URL || 'https://geppetto.studio'}/contact`,
        `${process.env.SITE_URL || 'https://geppetto.studio'}/calculator`,
        // 中文页面
        `${process.env.SITE_URL || 'https://geppetto.studio'}/zh/`,
        `${process.env.SITE_URL || 'https://geppetto.studio'}/zh/ai-quote`,
        `${process.env.SITE_URL || 'https://geppetto.studio'}/zh/create-quote`,
        `${process.env.SITE_URL || 'https://geppetto.studio'}/zh/services`,
        `${process.env.SITE_URL || 'https://geppetto.studio'}/zh/why-geppetto`,
        `${process.env.SITE_URL || 'https://geppetto.studio'}/zh/transparent-pricing`,
        `${process.env.SITE_URL || 'https://geppetto.studio'}/zh/no-moq`,
        `${process.env.SITE_URL || 'https://geppetto.studio'}/zh/case-studies`,
        `${process.env.SITE_URL || 'https://geppetto.studio'}/zh/about`,
        `${process.env.SITE_URL || 'https://geppetto.studio'}/zh/faq`,
        `${process.env.SITE_URL || 'https://geppetto.studio'}/zh/contact`,
        `${process.env.SITE_URL || 'https://geppetto.studio'}/zh/calculator`
      ]
    })
  ],
  
  // 图片优化配置
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    domains: ['geppetto.studio', 'images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      }
    ]
  },
  
  build: {
    format: 'directory',
    // 启用内联CSS优化
    inlineStylesheets: 'auto'
  },
  
  // 预取策略优化
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },
  
  vite: {
    build: {
      rollupOptions: {
        external: ['resend', 'stripe']
      }
    },
    // CSS优化
    css: {
      devSourcemap: true
    }
  }
})