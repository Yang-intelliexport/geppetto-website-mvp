export type Locale = 'en' | 'zh'

type Stat = {
  value: string
  label: string
  description: string
}

type CaseCard = {
  slug: string
  icon: string
  category: string
  note?: string
  title: string
  subtitle?: string
  description: string
  bullets: string[]
  metrics: Array<{ label: string; value: string }>
  resultTitle: string
  resultDescription: string
}

type DetailSection = {
  id: string
  title: string
  subtitle: string
  highlights: string[]
  quote?: { text: string; attribution: string }
}

type CTA = {
  title: string
  subtitle: string
  primary: { text: string; href: string }
  secondary: { text: string; href: string }
  note: string
}

type CaseStudiesContent = {
  metaTitle: string
  metaDescription: string
  heroTitle: string
  heroSubtitle: string
  structuredData: {
    '@type': string
    name: string
    description: string
  }
  stats: Stat[]
  caseCards?: CaseCard[]
  details?: DetailSection[]
  testimonials?: Array<{ quote: string; author: string; context: string }>
  cta: CTA
}

export const caseStudiesContent: Record<Locale, CaseStudiesContent> = {
  en: {
    metaTitle: 'Customer Success Stories | Manufacturing Case Studies | CNC Examples | Geppetto',
    metaDescription:
      'Real customer success stories: 85% cost reduction, 98% satisfaction. Discover how 100+ companies accelerated manufacturing with Geppetto.',
    heroTitle: 'Customer Success Stories',
    heroSubtitle: 'Real projects, real results, real customers who trust Geppetto for precision manufacturing.',
    structuredData: {
      '@type': 'CollectionPage',
      name: 'Customer Success Stories',
      description: 'Precision manufacturing case studies showcasing transparent pricing and flexible production.'
    },
    stats: [
      { value: '100+', label: 'Companies Served', description: 'Across 15 industries' },
      { value: '85%', label: 'Avg. Cost Reduction', description: 'vs traditional suppliers' },
      { value: '24h', label: 'Average delivery', description: 'vs 2-3 weeks traditional' },
      { value: '98%', label: 'Customer satisfaction', description: 'Would recommend us' }
    ],
    caseCards: [],
    details: [
      {
        id: 'robotics',
        title: '🤖 Robotics Success Blueprint',
        subtitle: 'How flexible manufacturing unleashes hardware iteration speed.',
        highlights: [
          'Single-piece production for every iteration sprint.',
          '72H production + shipping kept investors updated weekly.',
          'Precision logs fed directly into their digital twin environment.'
        ],
        quote: {
          text: '“Geppetto’s transparency and speed took us from concept to demo in record time.”',
          attribution: 'CTO, Humanoid Robotics Startup'
        }
      },
      {
        id: 'aerospace',
        title: '✈️ Aerospace Freeform Success',
        subtitle: 'How multi-axis automation de-risks structural innovation.',
        highlights: [
          'AI CAM shrank programming from weeks to hours.',
          'Material planning plus adaptive roughing improved utilization 2.5×.',
          'Full QA + log data connected to the customer’s digital thread.'
        ]
      },
      {
        id: 'medical',
        title: '🏥 Medical Device Reliability',
        subtitle: 'Precision + compliance from prototype to pre-production.',
        highlights: [
          'Titanium machining with Ra0.2 µm finish and documentation.',
          'DFM checklist aligned with FDA submission timelines.',
          'Long-term partnership covering pilot and production phases.'
        ]
      }
    ],
    testimonials: [
      {
        quote:
          'For the first time, I understood exactly what I was paying for. The transparency let us fund another prototype iteration.',
        author: 'Hardware Startup Founder',
        context: 'Electronics Industry'
      }
    ],
    cta: {
      title: 'Ready to Join Our Success Stories?',
      subtitle: 'Experience the same breakthrough results with our flexible manufacturing approach.',
      primary: { text: '🚀 Start Your Success Story', href: '/en/create-quote' },
      secondary: { text: '💬 Discuss Your Project', href: '/en/contact' },
      note: '🏆 Join 100+ companies • 💫 Risk-Free Trial • 📊 Transparent Pricing'
    }
  },
  zh: {
    metaTitle: '客户案例_成功案例展示_Geppetto AI制造',
    metaDescription:
      '查看 Geppetto 在机器人、航空航天、医疗器械等行业的成功案例，了解 AI+学徒制造模式如何帮助客户实现 40%+ 成本节省。',
    heroTitle: '🌟 客户成功案例',
    heroSubtitle: '真实案例见证 AI+学徒制造模式的卓越成效。',
    structuredData: {
      '@type': 'CollectionPage',
      name: '客户成功案例',
      description: 'Geppetto AI 智能制造客户成功案例'
    },
    stats: [
      { value: '40%', label: '平均成本节省', description: '超越行业标准' },
      { value: 'project-specific', label: '平均精度水平', description: '远超客户期望' },
      { value: '24-72小时', label: '极速交付', description: '传统交期的 1/10' },
      { value: '99%+', label: '客户满意度', description: '持续合作伙伴' }
    ],
    caseCards: [],
    details: [
      {
        id: 'robotics',
        title: '🤖 机器人行业成功经验',
        subtitle: 'AI+柔性制造帮助机器人客户快速量产验证。',
        highlights: [
          '单件起做，支持高频迭代与快速验证',
          '72 小时生产 + 运输，研发周期缩短 50%',
          '精度数据可追溯，便于数字孪生模型更新'
        ]
      },
      {
        id: 'aerospace',
        title: '✈️ 航空航天复杂曲面',
        subtitle: '多轴自动化+透明工艺，保障拓扑优化件快速验证。',
        highlights: [
          'AI CAM 将编程周期压缩至数小时。',
          '薄壁+自由曲面通过实时监控避免变形。',
          '材料利用率提升 2.5 倍，削减毛料成本。'
        ]
      },
      {
        id: 'medical',
        title: '🏥 医疗器械案例亮点',
        subtitle: '兼顾高精度与合规要求，助力客户快速通过注册。',
        highlights: [
          'Ti-6Al-4V 医疗级加工，附带检测报告',
          'DFM 咨询 + 质量体系支持',
          '从样件到小批量保持一致性'
        ]
      }
    ],
    cta: {
      title: '准备加入成功案例了吗？',
      subtitle: '体验同样的透明制造与极速交付，开启属于你的成功故事。',
      primary: { text: '🚀 立即获取专家报价', href: '/zh/create-quote' },
      secondary: { text: '💬 联系技术团队', href: '/zh/contact' },
      note: '🏆 服务500+企业 • ⚡ 72小时生产 • 📊 成本透明可追溯'
    }
  }
}
