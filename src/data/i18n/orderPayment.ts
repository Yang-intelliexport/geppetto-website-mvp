export type Locale = 'en' | 'zh'

type PaymentStep = {
  title: string
  description: string
}

export type OrderPaymentContent = {
  seo: {
    title: string
    description: string
  }
  hero: {
    title: string
    subtitle: string
  }
  steps: PaymentStep[]
  security: {
    title: string
    items: string[]
    contact: string
  }
}

export const orderPaymentContent: Record<Locale, OrderPaymentContent> = {
  en: {
    seo: {
      title: 'Order Payment - Secure Checkout | Geppetto Manufacturing',
      description:
        'Complete payment for your CNC manufacturing order through our secure checkout. Multiple payment methods with enterprise-grade protection.'
    },
    hero: {
      title: '💳 Order Payment',
      subtitle: 'Your quote is ready — complete payment to begin production immediately.'
    },
    steps: [
      { title: '1. Confirm Order Reference', description: 'Verify the quote or order ID before proceeding.' },
      { title: '2. Choose Payment Method', description: 'Select Stripe, bank transfer, or milestone invoicing.' },
      { title: '3. Notify Finance', description: 'Upload the receipt or email billing@geppetto.studio for instant confirmation.' }
    ],
    security: {
      title: '🔒 Security Guarantee',
      items: [
        'SSL encryption protects every transaction',
        'Multiple secure payment options: Credit Card, PayPal, Stripe',
        'Production starts as soon as payment succeeds',
        'Need assistance? Contact hello@geppetto.studio'
      ],
      contact: 'hello@geppetto.studio'
    }
  },
  zh: {
    seo: {
      title: '订单支付 - 安全快捷 | Geppetto智能制造',
      description: '为您的CNC制造订单提供安全便捷的支付流程，支持多种支付方式并采用行业级安全防护。'
    },
    hero: {
      title: '💳 订单支付',
      subtitle: '报价已确认，请完成支付以立即启动生产流程。'
    },
    steps: [
      { title: '1. 确认订单编号', description: '请核对报价/订单编号，确保收款信息正确。' },
      { title: '2. 选择支付方式', description: '可使用信用卡、对公转账或分阶段付款。' },
      { title: '3. 通知财务', description: '上传水单或邮件至 billing@geppetto.studio 以便快速核销。' }
    ],
    security: {
      title: '🔒 安全保障',
      items: [
        '全站SSL加密保护支付信息',
        '支持微信支付 / 支付宝 / 银行卡等安全方式',
        '支付成功后即时排产，进入制造流程',
        '如需帮助，请联系 hello@geppetto.studio'
      ],
      contact: 'hello@geppetto.studio'
    }
  }
}
