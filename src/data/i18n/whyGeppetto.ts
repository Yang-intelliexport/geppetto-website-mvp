export type Locale = 'en' | 'zh'

type Statistic = {
  value: string
  label: string
  description: string
}

type AdvantageCard = {
  badge: string
  title: string
  description: string
  bullets: string[]
}

type ComparisonRow = {
  metric: string
  ours: string
  traditional: string
}

type FlowStep = {
  title: string
  description: string
  icon: string
}

type CTA = {
  title: string
  description: string
  highlights: string[]
  primary: { text: string; href: string }
  secondary: { text: string; href: string }
}

type WhyContent = {
  metaTitle: string
  metaDescription: string
  heroTitle: string
  heroSubtitle: string
  heroStats: Statistic[]
  advantages: AdvantageCard[]
  costComparison: ComparisonRow[]
  flowSteps: FlowStep[]
  cta: CTA
}

export const whyGeppettoContent: Record<Locale, WhyContent> = {
  en: {
    metaTitle: 'Why Choose Geppetto | Transparent Manufacturing Advantages | Superior Quality',
    metaDescription:
      'Discover why Geppetto leads AI-powered precision manufacturing: 8-hour quotes, 72-hour production, 50-70% cost savings, and project-specific precision.',
    heroTitle: 'Why Choose Geppetto?',
    heroSubtitle: 'Smart Flexible Factory • Industry-Leading Performance • Transparent Value',
    heroStats: [
      { value: '500+', label: 'Happy Customers', description: 'Startups to Fortune 500' },
      { value: '99.8%', label: 'On-Time Delivery', description: 'Guaranteed performance' },
      { value: '50-70%', label: 'Cost Savings', description: 'vs traditional suppliers' },
      { value: 'Custom', label: 'Precision', description: 'Project-specific standards' }
    ],
    advantages: [
      {
        badge: '8hr',
        title: 'Expert Quote Service',
        description: 'AI-assisted analysis with expert-reviewed quotes within 8 hours (vs 3-7 days).',
        bullets: [
          '2-hour AI feasibility check',
          '8-hour expert validation',
          'Detailed cost breakdown included'
        ]
      },
      {
        badge: '24hr',
        title: 'Rush Order Delivery',
        description: 'AI scheduling enables 24-48h production vs traditional 7-15 days.',
        bullets: [
          'Dedicated fast-track capacity',
          'Digital twin monitoring',
          'Predictable logistics window'
        ]
      },
      {
        badge: '1pc',
        title: 'No MOQ Flexibility',
        description: 'Single-piece production without penalties, perfect for hardware iterations.',
        bullets: [
          'Single-piece to bridge runs',
          'Cost curve clearly mapped',
          'Cash-flow friendly billing'
        ]
      }
    ],
    costComparison: [
      { metric: 'Precision', ours: 'Project-specific, custom standards', traditional: 'Industry baseline only' },
      { metric: 'Cost structure', ours: '50-70% lower, transparent', traditional: 'Fixed margin, hidden fees' },
      { metric: 'On-time rate', ours: '99.8%', traditional: '95-98%' }
    ],
    flowSteps: [
      { icon: '🧠', title: 'AI Feasibility', description: '0-2 hours: CAD analysis & manufacturability feedback' },
      { icon: '👨‍🔧', title: 'Expert Validation', description: '2-8 hours: Cost breakdown + technical review' },
      { icon: '⚙️', title: 'Reserved Production', description: 'Capacity locked, materials staged immediately' },
      { icon: '🚚', title: '72H Production+Shipping', description: 'Live updates and documented QA' }
    ],
    cta: {
      title: 'Experience Geppetto’s Transparent Manufacturing Promise',
      description: 'Upload files, receive a detailed breakdown in 8 hours, and start production within 72 hours.',
      highlights: [
        'No hidden fees • Project-specific precision • Dedicated expert support'
      ],
      primary: { text: '🚀 Get Expert Quote', href: '/en/create-quote' },
      secondary: { text: '💬 Talk to Manufacturing Expert', href: '/en/contact' }
    }
  },
  zh: {
    metaTitle: '为什么选择Geppetto | 透明制造专家 | 初创企业首选',
    metaDescription:
      '了解 Geppetto 如何以 AI 辅助专家报价、72 小时生产、项目定制精度和 100% 成本透明成为初创企业首选制造伙伴。',
    heroTitle: '为什么选择 Geppetto？',
    heroSubtitle: '透明制造专家 • 初创企业首选 • 可靠价值承诺',
    heroStats: [
      { value: '127+', label: '服务初创', description: '专注硬件与具身智能' },
      { value: '99.8%', label: '准时交付', description: '交付绩效承诺' },
      { value: '100%', label: '服务透明', description: '详细成本拆解' },
      { value: '高精度', label: '加工精度', description: '按项目定制标准' }
    ],
    advantages: [
      {
        badge: '8时',
        title: '专家审核报价承诺',
        description: 'AI 辅助分析，8 小时内专家给出详细报价（传统 3-7 天）。',
        bullets: [
          '2 小时内完成 AI 可行性诊断',
          '8 小时专家复核 + 成本拆解',
          '提供工艺建议与优化路径'
        ]
      },
      {
        badge: '24时',
        title: '急单极速交付',
        description: 'AI 排产与专属产能，24-48 小时交付（传统 7-15 天）。',
        bullets: [
          '专属加急产线',
          '数字孪生全程可视化',
          '交付节点可预测'
        ]
      },
      {
        badge: '1件',
        title: '无 MOQ 灵活性',
        description: '单件起做，不额外加价，适合快速迭代与验证。',
        bullets: [
          '单件→小批量同一条产线',
          '成本曲线透明可控',
          '资金占用极低'
        ]
      }
    ],
    costComparison: [
      { metric: '加工精度', ours: '项目定制精度', traditional: '行业基础标准' },
      { metric: '成本结构', ours: '50-70% 降本 + 透明拆解', traditional: '固定利润 + 隐性成本' },
      { metric: '准时率', ours: '99.8%', traditional: '95-98%' }
    ],
    flowSteps: [
      { icon: '🧠', title: 'AI诊断', description: '0-2 小时内反馈可制造性与风险提示' },
      { icon: '👨‍🔧', title: '专家复核', description: '2-8 小时提供详细成本拆解与建议' },
      { icon: '⚙️', title: '锁定产能', description: '确认后立即排产，材料和夹治具同步就位' },
      { icon: '🚚', title: '72小时生产+运输', description: '实时追踪，附带质检与交付文档' }
    ],
    cta: {
      title: '准备体验 Geppetto 透明制造承诺？',
      description: '上传图纸，8 小时内获得专家透明报价，72 小时内启动生产。',
      highlights: [
        '零隐性成本 • 项目专属精度 • 专家全程陪伴'
      ],
      primary: { text: '🚀 获取专家报价', href: '/zh/create-quote' },
      secondary: { text: '💬 联系技术团队', href: '/zh/contact' }
    }
  }
}
