import type { Locale } from './contact'

type Feature = {
  icon: string
  title: string
  description: string
}

type HelpSection = {
  title: string
  instructionsTitle: string
  instructions: string[]
  fallback: string
  contactLabel: string
  contactEmail: string
}

type StatusStep = {
  icon: string
  title: string
  description: string
}

type StatusSection = {
  title: string
  subtitle?: string
  steps: StatusStep[]
}

export type OrderTrackingContent = {
  metaTitle: string
  metaDescription: string
  keywords: string[]
  heroTitle: string
  heroSubtitle: string
  features: Feature[]
  help: HelpSection
  statusGuideTitle: string
  statusSections: StatusSection[]
  trackerLanguage: Locale
}

export const orderTrackingContent: Record<Locale, OrderTrackingContent> = {
  en: {
    metaTitle: 'Order Tracking - Track Quotes & Orders | Geppetto',
    metaDescription:
      'Track your Geppetto quotes and orders in real time. Enter your email or order ID to see live status, engineer notes, and estimated delivery windows.',
    keywords: [
      'track order',
      'quote status',
      'manufacturing progress',
      'Geppetto order tracking',
      'CNC quote tracking'
    ],
    heroTitle: 'Order Tracking Center',
    heroSubtitle: 'Enter your email address or order ID to view real-time updates for every quote and order.',
    features: [
      {
        icon: '🔍',
        title: 'Quick Search',
        description: 'Use your registered email or 8-digit order ID to instantly find every quote and order.'
      },
      {
        icon: '⚡',
        title: 'Real-time Status',
        description: 'Transparent updates from quote review through production, inspection, and delivery.'
      },
      {
        icon: '📝',
        title: 'Detailed Information',
        description: 'See engineer notes, pricing, and estimated delivery windows in one secure dashboard.'
      }
    ],
    help: {
      title: 'Need Help?',
      instructionsTitle: 'Search Methods:',
      instructions: [
        'Use the email address you submitted with your quote.',
        'Enter the 8-character order ID from your confirmation email (e.g., A1B2C3D4).',
        'Paste the full order UUID (supports partial matches).'
      ],
      fallback:
        "Can't find your order? Please double-check your email address or contact our support team:",
      contactLabel: 'hello@geppetto.studio',
      contactEmail: 'hello@geppetto.studio'
    },
    statusGuideTitle: '📋 Order Status Guide',
    statusSections: [
      {
        title: 'Quote & Order Lifecycle',
        steps: [
          { icon: '📋', title: 'Pending', description: 'Quote request received' },
          { icon: '🔍', title: 'Reviewing', description: 'Engineer review in progress' },
          { icon: '💰', title: 'Quoted', description: 'Quote ready for approval' },
          { icon: '📦', title: 'Ordered', description: 'In production and QA' },
          { icon: '✅', title: 'Completed', description: 'Order fulfilled and archived' }
        ]
      }
    ],
    trackerLanguage: 'en'
  },
  zh: {
    metaTitle: '订单追踪 - 查询报价与订单状态 | Geppetto',
    metaDescription:
      '输入邮箱或订单编号即可实时查询Geppetto的报价申请与订单进度，掌握工程师备注、价格细节与预计交付时间。',
    keywords: ['订单追踪', '订单查询', '报价进度', '制造订单状态', 'Geppetto订单'],
    heroTitle: '订单追踪中心',
    heroSubtitle: '输入邮箱地址或订单编号，实时查看报价申请与订单的最新状态。',
    features: [
      {
        icon: '🔍',
        title: '快速查询',
        description: '使用注册邮箱或8位订单编号，即刻找到所有报价与订单。'
      },
      {
        icon: '⚡',
        title: '实时状态',
        description: '从AI预审到生产发货，全流程透明跟踪。'
      },
      {
        icon: '📝',
        title: '详细信息',
        description: '查看工程师备注、价格细节与预计交期。'
      }
    ],
    help: {
      title: '需要帮助？',
      instructionsTitle: '查询方式：',
      instructions: [
        '使用提交报价时填写的邮箱地址。',
        '输入确认邮件中的8位订单编号（如：A1B2C3D4）。',
        '粘贴完整订单UUID（支持完整或部分匹配）。'
      ],
      fallback: '仍未找到订单？请检查邮箱是否正确，或联系客户成功团队：',
      contactLabel: 'hello@geppetto.studio',
      contactEmail: 'hello@geppetto.studio'
    },
    statusGuideTitle: '📋 订单状态说明',
    statusSections: [
      {
        title: '📝 报价阶段',
        subtitle: 'Quote Phase',
        steps: [
          { icon: '📋', title: '待处理', description: '报价申请已收到' },
          { icon: '🤖', title: 'AI评估', description: '智能分析零件特征' },
          { icon: '🔍', title: '专家审核', description: '工程师复核中' },
          { icon: '💰', title: '已报价', description: '可确认并支付' }
        ]
      },
      {
        title: '📦 订单阶段',
        subtitle: 'Order Phase',
        steps: [
          { icon: '💳', title: '支付成功', description: '排产并准备加工' },
          { icon: '⚙️', title: '制造中', description: '车铣/后处理进行中' },
          { icon: '🔎', title: '质量检测', description: '精度与外观检测' },
          { icon: '📦', title: '打包中', description: '出货准备' },
          { icon: '✅', title: '已交付', description: '订单完成归档' }
        ]
      }
    ],
    trackerLanguage: 'zh'
  }
}
