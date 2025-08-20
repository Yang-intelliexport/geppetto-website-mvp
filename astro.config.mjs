import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  site: 'https://geppetto.com',
  integrations: [
    tailwind(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      customPages: [
        'https://geppetto.com/',
        'https://geppetto.com/ai-quote',
        'https://geppetto.com/services',
        'https://geppetto.com/precision-capability',
        'https://geppetto.com/platform-comparison',
        'https://geppetto.com/why-geppetto',
        'https://geppetto.com/embodied-ai',
        'https://geppetto.com/no-moq',
        'https://geppetto.com/case-studies',
        'https://geppetto.com/about',
        'https://geppetto.com/faq',
        'https://geppetto.com/contact',
        'https://geppetto.com/calculator',
      ]
    })
  ],
  
  build: {
    inlineStylesheets: 'auto',
    split: true,
    format: 'directory'
  },

  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['@astrojs/tailwind'],
            'utils': ['./src/utils/i18n.ts', './src/utils/supabase.ts']
          }
        }
      }
    }
  }
})