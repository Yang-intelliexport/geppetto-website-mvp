export type Locale = 'en' | 'zh'

type HeroCTA = {
  text: string
  href: string
}

type HeroContent = {
  title: string
  subtitle: string
  description: string
  cta: {
    primary: HeroCTA
    secondary?: HeroCTA
  }
  features: Array<{ title: string; description: string; icon?: string }>
}

type Advantage = {
  id: string
  title: string
  description: string
  icon: string
  stats?: string
  color: 'purple' | 'blue' | 'green' | 'orange'
}

type Testimonial = {
  name: string
  company: string
  content: string
  stats?: {
    precision?: string
    cost_saving?: string
    delivery_time?: string
    quality_rate?: string
  }
}

type HomeContent = {
  seo: {
    title: string
    description: string
    keywords: string[]
  }
  structuredData: Record<string, any>
  hero: HeroContent
  advantages: Advantage[]
  testimonials: Testimonial[]
}

const structuredData = {
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AI Manufacturing Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI-Assisted Quote Review',
          description: 'AI parsing + expert validation deliver precise quotes within business hours'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Flexible CNC Manufacturing',
          description: '72-hour production rhythm with tailored precision & zero MOQ'
        }
      }
    ]
  }
}

export const homeContent: Record<Locale, HomeContent> = {
  en: {
    seo: {
      title: 'CNC Machining Services & Rapid Prototyping | Zero MOQ | Geppetto',
      description:
        'On-demand manufacturing factory. From rapid prototyping to volume production with AI-driven DFM analysis. 72-hour delivery, ±0.01mm precision, and transparent pricing.',
      keywords: [
        'flexible smart factory',
        'transparent manufacturing',
        'ai manufacturing',
        'cnc machining',
        'rapid prototyping',
        'digital manufacturing'
      ]
    },
    structuredData,
    hero: {
      title: 'Flexible Smart Factory, Match Your Innovation Rhythm',
      subtitle: 'Transparent manufacturing expert, ending pricing confusion.',
      description:
        'Intelligent analysis + expert validation • Transparent pricing • 72-hour production + logistics\n±0.1mm standard precision • Zero MOQ • No hidden fees guarantee',
      cta: {
        primary: { text: 'Get Expert Quote in 8 Hours', href: '/create-quote' },
        secondary: { text: 'See Why Teams Switch to Geppetto', href: '/why-geppetto' }
      },
      features: [
        { title: 'Transparent Manufacturing', description: 'AI verification + expert review keep every cost visible.', icon: '💎' },
        { title: 'Startup Friendly', description: '1-piece minimum, 72-hour production & global shipping.', icon: '🚀' },
        { title: 'Precision Guaranteed', description: 'Tailored tolerances with 99.5% pass rate.', icon: '🎯' }
      ]
    },
    advantages: [
      {
        id: 'pricing-transparency',
        title: 'Intelligent Verification System',
        description: 'AI cost analysis plus expert review deliver transparent manufacturing service packages.',
        icon: '💡',
        stats: 'Zero hidden fees • Detailed value stack',
        color: 'purple'
      },
      {
        id: 'flexible-manufacturing',
        title: 'Startup-Friendly Manufacturing',
        description: '1-piece MOQ, 72-hour production cadence, cashflow friendly for product teams.',
        icon: '🧩',
        stats: '1 pc MOQ • 72H production + shipping',
        color: 'blue'
      },
      {
        id: 'precision',
        title: 'Custom Precision Guarantee',
        description: 'Project-specific tolerance plans, rigorous QC and documentation.',
        icon: '🎯',
        stats: 'Custom tolerances • 99.5% quality rate',
        color: 'green'
      },
      {
        id: 'communication',
        title: 'Transparent Communication',
        description: '8-hour expert quotes, real-time production updates, clear milestone commitments.',
        icon: '📬',
        stats: '8H quote • Real-time tracking',
        color: 'orange'
      }
    ],
    testimonials: [
      {
        name: 'Hardware Lead, Robotics Startup',
        company: 'Confidential',
        content:
          'Traditional suppliers gave wildly different quotes. Geppetto explains every cost item, met our ±0.05mm tolerance, and delivered pilots in 72 hours.',
        stats: {
          precision: '±0.05mm custom',
          cost_saving: '42% vs legacy vendor',
          delivery_time: '72H manufacturing'
        }
      }
    ]
  },
  zh: {
    seo: {
      title: '柔性智能工厂 | 透明制造专家 | 72小时交付 | 零起订量CNC | Geppetto',
      description:
        '柔性智能工厂响应创新节奏：智能分析+专家验证，标准精度±0.1mm，72小时生产周期，零起订量，价格完全透明。',
      keywords: ['柔性工厂', '透明制造', '智能制造', 'CNC精密加工', '快速原型', '数字工厂']
    },
    structuredData,
    hero: {
      title: '柔性智能工厂，响应您的创新节奏',
      subtitle: '透明制造专家，终结制造报价混乱',
      description: '智能分析+专家验证 • 透明定价体系 • 72小时快速交付\n标准精度±0.1mm • 零起订量 • 无隐藏费用承诺',
      cta: {
        primary: { text: '8小时专家报价', href: '/create-quote' },
        secondary: { text: '了解我们的不同', href: '/why-geppetto' }
      },
      features: [
        { title: '透明制造', description: '智能验证+专家审核，成本结构一目了然。', icon: '💡' },
        { title: '创业友好', description: '1件起做，72小时生产+物流，现金流友好。', icon: '🚀' },
        { title: '项目定制精度', description: 'Tailored Precision体系保障99.5%合格率。', icon: '🎯' }
      ]
    },
    advantages: [
      {
        id: 'pricing-transparency',
        title: '智能验证体系',
        description: 'AI分析+专家技术审核=透明报价，价值结构完全可见。',
        icon: '💎',
        stats: '智能验证 • 无隐藏费用',
        color: 'purple'
      },
      {
        id: 'flexible-manufacturing',
        title: '柔性制造响应',
        description: '1件起做，72小时生产完成，适配快节奏迭代。',
        icon: '🧩',
        stats: '1件起做 • 72小时生产+运输',
        color: 'blue'
      },
      {
        id: 'precision',
        title: '项目定制精度保证',
        description: '满足工业/电子行业精度需求，质量体系完善。',
        icon: '🎯',
        stats: 'Tailored Precision • 99.5%合格率',
        color: 'green'
      },
      {
        id: 'communication',
        title: '全程透明沟通',
        description: '8小时专家报价，实时生产进度更新，节点清晰。',
        icon: '📬',
        stats: '8小时报价 • 实时进度',
        color: 'orange'
      }
    ],
    testimonials: [
      {
        name: '张工程师',
        company: '具身智能初创团队',
        content:
          '传统供应商报价差异巨大。Geppetto的双重验证体系详细拆解了成本，价格合理透明，72小时内交付样件。',
        stats: {
          precision: '按需定制',
          delivery_time: '72小时生产'
        }
      }
    ]
  }
}
