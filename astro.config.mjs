import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'
import react from '@astrojs/react'
import partytown from '@astrojs/partytown'

// Default to apex domain to avoid www/non-www cookie mismatches
const SITE = process.env.SITE_URL || 'https://geppetto.studio'
const PRIMARY_HOST = process.env.PUBLIC_PRIMARY_HOST || 'geppetto.studio'

export default defineConfig({
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  }),

  site: SITE,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false
    }
  },

  redirects: {
    '/ai-quote': '/en/create-quote',
    '/zh/ai-quote': '/zh/create-quote',
    '/instant-quote': '/en/create-quote',
    '/login': '/en/login'
  },

  integrations: [
    react(),
    tailwind(),
    partytown({
      config: {
        forward: ['dataLayer.push'],
        resolveUrl: (url) => {
          const target = new URL(url)
          if (target.hostname.endsWith('geppetto.studio')) {
            target.host = PRIMARY_HOST
            target.protocol = 'https:'
          }
          return target
        }
      }
    }),
    sitemap({
      changefreq: 'weekly', 
      priority: 0.7,
      lastmod: new Date(),
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          zh: 'zh-CN'
        }
      },
      // 手动添加动态路由到sitemap
      customPages: [
        // 主要页面
        'https://geppetto.studio/en/',
        'https://geppetto.studio/zh/',
        'https://geppetto.studio/en/about',
        'https://geppetto.studio/zh/about',
        'https://geppetto.studio/en/services',
        'https://geppetto.studio/zh/services',
        'https://geppetto.studio/en/why-geppetto',
        'https://geppetto.studio/zh/why-geppetto',
        'https://geppetto.studio/en/contact',
        'https://geppetto.studio/zh/contact',
        'https://geppetto.studio/en/create-quote',
        'https://geppetto.studio/zh/create-quote',
        'https://geppetto.studio/en/no-moq',
        'https://geppetto.studio/zh/no-moq',
        'https://geppetto.studio/en/transparent-pricing',
        'https://geppetto.studio/zh/transparent-pricing',
        'https://geppetto.studio/en/faq',
        'https://geppetto.studio/zh/faq',
        'https://geppetto.studio/en/case-studies',
        'https://geppetto.studio/zh/case-studies',
        // 资源页面
        'https://geppetto.studio/en/resources',
        'https://geppetto.studio/zh/resources',
        'https://geppetto.studio/en/resources/category/manufacturing-guides',
        'https://geppetto.studio/zh/resources/category/manufacturing-guides',
        'https://geppetto.studio/en/resources/category/cnc-machining',
        'https://geppetto.studio/zh/resources/category/cnc-machining',
        'https://geppetto.studio/en/resources/category/automation-ai',
        'https://geppetto.studio/zh/resources/category/automation-ai',
        // 新SEO文章
        'https://geppetto.studio/en/resources/hardware-startups-prototyping-pitfalls-guide',
        'https://geppetto.studio/zh/resources/hardware-startups-prototyping-pitfalls-guide',
        'https://geppetto.studio/en/resources/8-hour-detailed-quote-technical-secrets',
        'https://geppetto.studio/en/resources/72-hour-delivery-process-revealed',
        // 现有技术文章
        'https://geppetto.studio/en/resources/cnc-machining-precision-guide',
        'https://geppetto.studio/zh/resources/cnc-jingdu-jiagong-zhinan',
        'https://geppetto.studio/en/resources/5-axis-complex-surface-machining-guide',
        'https://geppetto.studio/zh/resources/5zhou-fuza-qumian-jiagong-zhinan',
        'https://geppetto.studio/en/resources/small-batch-cnc-manufacturing-guide',
        'https://geppetto.studio/zh/resources/cnc-zhizao-wanquan-zhinan',
        'https://geppetto.studio/en/resources/cnc-machining-materials-complete-guide',
        'https://geppetto.studio/zh/resources/cnc-jiagong-chengben-touming-fenxi',
        'https://geppetto.studio/en/resources/advanced-manufacturing-automation-guide',
        'https://geppetto.studio/zh/resources/zhizao-ye-qushi-yu-chuangxin',
        // 案例研究
        'https://geppetto.studio/en/case-studies/aerospace-structural-parts',
        'https://geppetto.studio/zh/case-studies/aerospace-structural-parts',
        'https://geppetto.studio/en/case-studies/medical-device-components',
        'https://geppetto.studio/zh/case-studies/medical-device-components',
        'https://geppetto.studio/en/case-studies/robotics-precision-parts',
        'https://geppetto.studio/zh/case-studies/robotics-precision-parts',
        // 法律页面
        'https://geppetto.studio/en/privacy',
        'https://geppetto.studio/zh/privacy',
        'https://geppetto.studio/en/terms',
        'https://geppetto.studio/zh/terms'
      ],
      filter: (page) => {
        const disallowed = [
          '/quote-view',
          '/order/',
          '/track-order',
          '/ai-quote',
          '/payment',
          '/login',
          '/debug-callback',
          '/auth/error'
        ]
        const path = page?.pathname || ''
        return !disallowed.some((prefix) => path.includes(prefix))
      }
    })
  ],

  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    domains: ['geppetto.studio', 'www.geppetto.studio', 'images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      }
    ]
  },

  build: {
    format: 'directory',
    inlineStylesheets: 'auto'
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },

  vite: {
    css: {
      devSourcemap: true
    }
  }
})
