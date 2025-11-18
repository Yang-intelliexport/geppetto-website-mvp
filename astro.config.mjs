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
      prefixDefaultLocale: false,
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
      filter: (page) => {
        const disallowed = [
          '/en/quote-view',
          '/zh/quote-view',
          '/en/order/',
          '/zh/order/',
          '/en/track-order',
          '/zh/track-order'
        ]
        const path = page?.pathname || ''
        return !disallowed.some((prefix) => path.startsWith(prefix))
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
