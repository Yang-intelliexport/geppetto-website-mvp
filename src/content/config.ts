import { defineCollection, z } from 'astro:content'

// 页面内容集合
const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.array(z.string()).optional(),
    layout: z.string().optional(),
    seo: z.object({
      title: z.string(),
      description: z.string(),
      keywords: z.array(z.string()).optional(),
      ogImage: z.string().optional(),
    }).optional(),
    hero: z.object({
      title: z.string(),
      subtitle: z.string().optional(),
      description: z.string().optional(),
      image: z.string().optional(),
      cta: z.object({
        primary: z.object({
          text: z.string(),
          href: z.string(),
        }),
        secondary: z.object({
          text: z.string(),
          href: z.string(),
        }).optional(),
      }).optional(),
    }).optional(),
    advantages: z.array(z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      icon: z.string(),
      stats: z.string().optional(),
      details: z.string().optional(),
      color: z.string().optional(),
    })).optional(),
    features: z.array(z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string().optional(),
      image: z.string().optional(),
    })).optional(),
    testimonials: z.array(z.object({
      name: z.string(),
      company: z.string(),
      content: z.string(),
      avatar: z.string().optional(),
      stats: z.object({
        precision: z.string().optional(),
        cost_saving: z.string().optional(),
        delivery_time: z.string().optional(),
        quality_rate: z.string().optional(),
      }).optional(),
    })).optional(),
    navigation: z.object({
      prev: z.object({
        title: z.string(),
        url: z.string(),
      }).optional(),
      next: z.object({
        title: z.string(),
        url: z.string(),
      }).optional(),
    }).optional(),
  })
})

// 博客文章集合
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  })
})

// 案例研究集合
const caseStudies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    company: z.string(),
    industry: z.string(),
    challenge: z.string(),
    solution: z.string(),
    results: z.object({
      precision: z.string().optional(),
      cost_saving: z.string().optional(),
      delivery_time: z.string().optional(),
      quality_improvement: z.string().optional(),
    }),
    testimonial: z.object({
      content: z.string(),
      author: z.string(),
      position: z.string(),
    }),
    featured: z.boolean().default(false),
    pubDate: z.date(),
  })
})

// FAQ集合
const faqs = defineCollection({
  type: 'content',
  schema: z.object({
    question: z.string(),
    category: z.string(),
    order: z.number(),
    featured: z.boolean().default(false),
  })
})

// 英文FAQ集合
const faqsEn = defineCollection({
  type: 'content',
  schema: z.object({
    question: z.string(),
    category: z.string(),
    order: z.number(),
    featured: z.boolean().default(false),
  })
})

export const collections = {
  pages,
  blog,
  'case-studies': caseStudies,
  faqs,
  'faqs-en': faqsEn,
}