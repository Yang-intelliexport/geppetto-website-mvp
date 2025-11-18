export type Locale = 'en' | 'zh'

type Seo = {
  title: string
  description: string
}

type Hero = {
  title: string
  subtitle: string
}

type PaymentMethod = {
  icon: string
  title: string
  subtitle: string
  description: string
}

type ActionLink = {
  label: string
  href: string
}

type InfoBox = {
  title: string
  items: string[]
}

type PaymentPageContent = {
  seo: Seo
  hero: Hero
  methods: PaymentMethod[]
  securityTitle: string
  securityItems: string[]
  supportTitle: string
  supportItems: string[]
}

type PaymentSuccessContent = {
  seo: Seo
  hero: Hero
  highlights: string[]
  infoBox: InfoBox
  actions: {
    primary: ActionLink
    secondary: ActionLink
  }
  support: string[]
  notice?: {
    title: string
    description: string
  }
}

type PaymentCancelContent = {
  seo: Seo
  hero: Hero
  highlights: string[]
  infoBox: InfoBox
  support: string[]
  retryButtonLabel?: string
  retryDescription?: string
  actions: {
    primary: ActionLink
    secondary: ActionLink
  }
}

export const paymentPageContent: Record<Locale, PaymentPageContent> = {
  en: {
    seo: {
      title: 'Payment Options | Secure Checkout | Geppetto Manufacturing',
      description:
        'Choose a secure payment option for your CNC manufacturing orders. Supports Stripe, bank transfer, and enterprise invoicing.'
    },
    hero: {
      title: 'Secure Payment Experience',
      subtitle: 'Multiple settlement options with enterprise-grade security, full invoices, and dedicated support.'
    },
    methods: [
      {
        icon: '💳',
        title: 'Stripe Card',
        subtitle: 'Visa / MasterCard / AmEx',
        description: 'Instant confirmation, ideal for prototyping or small batch orders.'
      },
      {
        icon: '🏦',
        title: 'Bank Transfer',
        subtitle: 'USD / EUR / CNY',
        description: 'Enterprise-friendly wire transfer with downloadable invoice and PO support.'
      },
      {
        icon: '🧾',
        title: 'VAT / Fapiao',
        subtitle: 'Digital invoice within 24h',
        description: 'Issue local invoices that integrate with your finance workflow.'
      },
      {
        icon: '🤝',
        title: 'Milestone Payment',
        subtitle: 'For large programs',
        description: 'Split payments by production stage with escrow-like reporting.'
      }
    ],
    securityTitle: 'Security & Compliance',
    securityItems: [
      'PCI-DSS Level 1 compliant payment processor',
      'All traffic protected via TLS 1.3',
      'SOC 2 Type II hosting providers',
      'Two-person review for every manual transfer'
    ],
    supportTitle: 'Support',
    supportItems: [
      'Finance hotline: +86 13511091304',
      'Email: billing@geppetto.studio',
      'Working hours: 09:00-19:00 CST',
      'Urgent requests handled within 30 minutes'
    ]
  },
  zh: {
    seo: {
      title: '支付方式 | 安全结算 | Geppetto 智能制造',
      description: '支持 Stripe 信用卡、对公转账、增值税发票等多种方式，确保制造订单快速、安全结算。'
    },
    hero: {
      title: '安全可靠的支付体验',
      subtitle: '多币种、多渠道支付，支持对公发票、合同与审批流程。'
    },
    methods: [
      {
        icon: '💳',
        title: 'Stripe / 信用卡',
        subtitle: 'Visa / MasterCard / AmEx',
        description: '实时确认支付，适合样件或小批量订单。'
      },
      {
        icon: '🏦',
        title: '对公转账',
        subtitle: '支持 USD / EUR / CNY',
        description: '提供正式合同与发票，方便企业财务入账。'
      },
      {
        icon: '🧾',
        title: '增值税发票',
        subtitle: '24 小时内开具电子专票/普票',
        description: '可按照项目节点开票，满足审计与报销需求。'
      },
      {
        icon: '🤝',
        title: '分阶段付款',
        subtitle: '适用于大额项目',
        description: '按照产前/产中/交付节点分期，提供里程碑报告。'
      }
    ],
    securityTitle: '安全与合规',
    securityItems: ['PCI-DSS 一级合规', '全站 TLS 1.3 加密', 'SOC2 Type II 云基础设施', '人工复核每一笔大额转账'],
    supportTitle: '财务支持',
    supportItems: ['财务热线：+86 13511091304', '邮箱：billing@geppetto.studio', '工作时间：09:00-19:00', '紧急请求 30 分钟响应']
  }
}

export const paymentSuccessContent: Record<Locale, PaymentSuccessContent> = {
  en: {
    seo: {
      title: 'Payment Successful | Order Scheduled | Geppetto',
      description: 'Payment confirmed. Production capacity is locked and engineers will keep you updated throughout the build.'
    },
    hero: {
      title: 'Payment Received — Production Scheduled',
      subtitle: 'Your order has entered the production queue. The engineering team will push updates to your dashboard.'
    },
    highlights: [
      'Capacity reserved for your order',
      'Engineering checklists initiated',
      'Quality inspection slots booked'
    ],
    infoBox: {
      title: 'Timeline Overview',
      items: ['0-8h: Final engineering audit', '8-48h: Machining + finishing', '48-72h: QA & logistics booking']
    },
    actions: {
      primary: { label: 'View Order Dashboard', href: '/track-order' },
      secondary: { label: 'Download Invoice', href: '/resources' }
    },
    support: ['Need to update files? Reply to the confirmation email.', 'Urgent changes: hello@geppetto.studio'],
    notice: {
      title: 'Production Starts After File Freeze',
      description: 'Changes requested after machining begins may incur additional costs or timeline adjustments.'
    }
  },
  zh: {
    seo: {
      title: '支付成功 | 工单已排产 | Geppetto',
      description: '支付确认完成，产能已锁定，工程团队会在制造过程中持续同步进度。'
    },
    hero: {
      title: '支付完成 · 进入生产排期',
      subtitle: '订单已进入生产队列，工程师会在每个关键节点同步进展。'
    },
    highlights: ['产能已锁定', '工程核查进行中', '质检排期已预约'],
    infoBox: {
      title: '关键时间表',
      items: ['0-8 小时：工程复核', '8-48 小时：加工与表面处理', '48-72 小时：质检与物流']
    },
    actions: {
      primary: { label: '查看订单进度', href: '/track-order' },
      secondary: { label: '下载发票', href: '/resources' }
    },
    support: ['如需更新文件，请回复确认邮件', '紧急变更：hello@geppetto.studio'],
    notice: {
      title: '文件确认后才会启动加工',
      description: '若在加工过程中修改设计，可能产生额外费用与延迟。'
    }
  }
}

export const paymentCancelContent: Record<Locale, PaymentCancelContent> = {
  en: {
    seo: {
      title: 'Payment Pending | Complete Checkout | Geppetto',
      description: 'Your payment was cancelled or expired. You can retry checkout or contact support for help.'
    },
    hero: {
      title: 'Payment Not Completed',
      subtitle: 'No charges were made. You can retry the payment flow or choose another method.'
    },
    highlights: [
      'Quote remains valid until the stated deadline.',
      'Production will start once payment is confirmed.',
      'Contact finance if you need a revised invoice.'
    ],
    infoBox: {
      title: 'Recommended Actions',
      items: ['Retry the Stripe checkout link', 'Switch to bank transfer', 'Request milestone payment']
    },
    support: ['billing@geppetto.studio', '+86 13511091304 (09:00-19:00 CST)'],
    retryButtonLabel: 'Retry Payment',
    retryDescription: 'If the issue persists, send the error screenshot to finance for manual follow-up.',
    actions: {
      primary: { label: 'Choose Another Method', href: '/payment' },
      secondary: { label: 'Talk to Support', href: '/contact' }
    }
  },
  zh: {
    seo: {
      title: '支付未完成 | 继续结算 | Geppetto',
      description: '尚未扣款，可重新发起支付或联系财务支持，确认合适的付款方式。'
    },
    hero: {
      title: '支付未成功',
      subtitle: '我们尚未收到款项，可重新发起支付，或与财务协商其他方式。'
    },
    highlights: ['报价仍在有效期内', '确认付款后立即排产', '如需修改发票，请联系财务'],
    infoBox: {
      title: '建议操作',
      items: ['重新打开 Stripe 支付链接', '改为对公转账', '申请分阶段付款']
    },
    support: ['billing@geppetto.studio', '热线：+86 13511091304（09:00-19:00）'],
    retryButtonLabel: '重新支付',
    retryDescription: '若多次失败，请将报错信息发送给财务，以便人工协助。',
    actions: {
      primary: { label: '查看支付方式', href: '/payment' },
      secondary: { label: '联系财务支持', href: '/contact' }
    }
  }
}
