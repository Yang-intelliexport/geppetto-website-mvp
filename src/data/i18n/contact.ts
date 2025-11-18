export type Locale = 'en' | 'zh'

type QuickContact = {
  title: string
  value: string
  note: string
  href?: string
  icon?: string
}

type FormField = {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'textarea'
  placeholder?: string
  required?: boolean
  span?: 'full' | 'half'
}

type InfoCard = {
  icon: string
  title: string
  description: string
}

type SectionCard = {
  icon: string
  title: string
  description: string
}

type Section = {
  title: string
  description?: string
  cards: SectionCard[]
  variant?: 'grid3' | 'grid4'
}

type ContactContent = {
  metaTitle: string
  metaDescription: string
  heroTitle: string
  heroSubtitle: string
  quickContacts: QuickContact[]
  quoteCTA: {
    href: string
    text: string
    note: string
  }
  form: {
    id: string
    submitText: string
    submittingText: string
    successMessage: string
    errorMessage: string
    networkError: string
    fields: FormField[]
  }
  infoCard: {
    image: string
    imageAlt: string
    title: string
    items: InfoCard[]
  }
  whyUsTitle: string
  whyUsItems: string[]
  sections: Section[]
}

export const contactContent: Record<Locale, ContactContent> = {
  en: {
    metaTitle: 'Contact Us | Geppetto Transparent Manufacturing | Get Quote',
    metaDescription:
      'Contact Geppetto\'s expert team for AI-assisted expert quotes and manufacturing solutions. Business Hours online support with professional engineers at your service.',
    heroTitle: 'Contact Geppetto Expert Team',
    heroSubtitle: 'Business Hours Support • AI-Assisted Expert Quotes • Professional Engineering Services',
    quickContacts: [
      {
        icon: '📞',
        title: 'Call Us Now',
        value: '+86 13511091304',
        note: 'Business Hours Available'
      },
      {
        icon: '✉️',
        title: 'Email Support',
        value: 'hello@geppetto.studio',
        note: 'Response within 8 hours'
      },
      {
        icon: '🚀',
        title: 'Expert Quote Service',
        value: 'Get Quote Now →',
        note: 'Expert review in 8 hours',
        href: '/en/create-quote'
      }
    ],
    quoteCTA: {
      href: '/en/create-quote',
      text: 'Get Quote Now →',
      note: 'Expert review in 8 hours'
    },
    form: {
      id: 'contact-form',
      submitText: 'Submit Request',
      submittingText: 'Submitting...',
      successMessage: 'Thanks! We will reply shortly.',
      errorMessage: 'An error occurred. Please try again.',
      networkError: 'Network error. Please check your connection and try again.',
      fields: [
        {
          name: 'firstName',
          label: 'First Name',
          type: 'text',
          span: 'half',
          required: true
        },
        {
          name: 'lastName',
          label: 'Last Name',
          type: 'text',
          span: 'half',
          required: true
        },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          required: true
        },
        {
          name: 'company',
          label: 'Company',
          type: 'text',
          required: true
        },
        {
          name: 'phone',
          label: 'Phone',
          type: 'tel'
        },
        {
          name: 'projectDetails',
          label: 'Project Details',
          type: 'textarea',
          placeholder: 'Describe your manufacturing requirements...',
          required: true
        }
      ]
    },
    infoCard: {
      image: '/images/facility/storage-area.jpg',
      imageAlt: 'Geppetto manufacturing facility',
      title: 'Contact Information',
      items: [
        {
          icon: '📍',
          title: 'Shenzhen Headquarters',
          description: 'Shenzhen Bay Technology Eco-Park, Nanshan District'
        },
        {
          icon: '📞',
          title: 'Phone Support',
          description: '+86 13511091304'
        },
        {
          icon: '✉️',
          title: 'Email Support',
          description: 'hello@geppetto.studio'
        },
        {
          icon: '🕒',
          title: 'Business Hours',
          description: 'Business Hours Support Available\nExpert Response: 8 hours\nWeekend: Emergency Support'
        }
      ]
    },
    whyUsTitle: 'Why Contact Us?',
    whyUsItems: [
      'Free consultation with manufacturing experts',
      'Custom solutions for your specific needs',
      'Technical feasibility assessment',
      'Cost optimization recommendations'
    ],
    sections: [
      {
        title: '🌍 Global Manufacturing Services',
        description: 'Comprehensive solutions designed for international manufacturing excellence',
        cards: [
          {
            icon: '🌎',
            title: 'Global Time Zone Coverage',
            description:
              'Professional support coverage during Beijing business hours (10:00-19:00 UTC+8). Real-time communication with dedicated technical support team'
          },
          {
            icon: '📋',
            title: 'International Standards Compliance',
            description:
              'Quality systems established, relevant certifications in progress. Full traceability for regulated industries'
          },
          {
            icon: '💳',
            title: 'Global Payment Methods',
            description:
              'Corporate credit cards, international wire transfers, PayPal Business, flexible terms for qualified accounts. Multi-currency pricing available'
          }
        ],
        variant: 'grid3'
      },
      {
        title: '🚀 Additional Global Manufacturing Benefits',
        cards: [
          {
            icon: '🛡️',
            title: 'International Legal Protection',
            description:
              'International contracts, global IP protection, and legal recourse under international standards'
          },
          {
            icon: '⚡',
            title: 'Express Logistics',
            description: 'Global logistics partnerships, express shipping worldwide, international tracking'
          },
          {
            icon: '🔧',
            title: 'Global Support Network',
            description:
              'International engineering team, remote consultation, global quality assurance services'
          },
          {
            icon: '📊',
            title: 'Global Market Expertise',
            description:
              'Deep understanding of international manufacturing requirements, industry standards, and business practices'
          }
        ],
        variant: 'grid4'
      }
    ]
  },
  zh: {
    metaTitle: '联系我们 | Geppetto - AI智能制造',
    metaDescription:
      '联系Geppetto专业团队，获取AI检测+专家报价和制造解决方案。工作时间在线支持，专业工程师为您服务。',
    heroTitle: '联系Geppetto专业团队',
    heroSubtitle: '工作时间专业支持 • AI辅助专家报价 • 专业工程师服务',
    quickContacts: [
      {
        icon: '📞',
        title: '热线电话',
        value: '+86 13511091304',
        note: '工作时间: 10:00-19:00 (UTC+8)'
      },
      {
        icon: '✉️',
        title: '邮箱咨询',
        value: 'business@geppetto.studio',
        note: '工作时间回复 (10:00-19:00)'
      },
      {
        icon: '🚀',
        title: 'AI辅助专家报价',
        value: '立即体验 →',
        note: 'AI检测+专家8小时报价',
        href: '/zh/create-quote'
      }
    ],
    quoteCTA: {
      href: '/zh/create-quote',
      text: '立即体验 →',
      note: 'AI检测+专家8小时报价'
    },
    form: {
      id: 'contact-form-zh',
      submitText: '提交需求',
      submittingText: '提交中...',
      successMessage: '感谢提交！我们会尽快联系您。',
      errorMessage: '提交失败，请稍后再试。',
      networkError: '网络异常，请检查后重试。',
      fields: [
        {
          name: 'name',
          label: '姓名',
          type: 'text',
          span: 'half',
          required: true
        },
        {
          name: 'position',
          label: '职位',
          type: 'text',
          span: 'half'
        },
        {
          name: 'email',
          label: '邮箱',
          type: 'email',
          required: true
        },
        {
          name: 'company',
          label: '公司名称',
          type: 'text',
          required: true
        },
        {
          name: 'phone',
          label: '联系电话',
          type: 'tel'
        },
        {
          name: 'projectDetails',
          label: '项目详情',
          type: 'textarea',
          placeholder: '请描述您的制造需求...',
          required: true
        }
      ]
    },
    infoCard: {
      image: '/images/facility/storage-area.jpg',
      imageAlt: '深圳总部办公环境',
      title: '联系方式',
      items: [
        {
          icon: '📍',
          title: '深圳总部',
          description: '广东省深圳市南山区\n科技园南区深圳湾科技生态园'
        },
        {
          icon: '📞',
          title: '客服热线',
          description: '+86 13511091304'
        },
        {
          icon: '✉️',
          title: '商务邮箱',
          description: 'business@geppetto.studio'
        },
        {
          icon: '🕒',
          title: '服务时间',
          description: '周一至周五: 9:00 - 18:00\n周末: 紧急项目支持'
        }
      ]
    },
    whyUsTitle: '为什么选择我们？',
    whyUsItems: [
      '制造专家免费技术咨询',
      '针对需求定制解决方案',
      '技术可行性评估分析',
      '成本优化建议方案'
    ],
    sections: [
      {
        title: '专为中国客户提供的特色服务',
        cards: [
          {
            icon: '🚀',
            title: '本土化服务',
            description: '深圳本地团队，同时区沟通，现场技术支持，无时差协作'
          },
          {
            icon: '💰',
            title: '人民币结算',
            description: '避免汇率风险，本地化供应链，成本更可控，资金周转更灵活'
          },
          {
            icon: '🤝',
            title: '灵活交付',
            description: '按项目节点交付，支持小批量快速验证与持续迭代'
          }
        ],
        variant: 'grid3'
      },
      {
        title: '更多优势',
        cards: [
          {
            icon: '🛡️',
            title: '质量保障',
            description: '成熟质量体系，相关认证办理中，关键零件全流程可追踪'
          },
          {
            icon: '🚚',
            title: '快速物流',
            description: '与国内物流合作，提供紧急件加急配送与跨境物流方案'
          },
          {
            icon: '🔧',
            title: '工程支撑',
            description: '双语工程师团队，提供工艺优化、成本结构与生产建议'
          },
          {
            icon: '📊',
            title: '透明沟通',
            description: '实时生产进度，数字化仪表盘，关键节点全量可视化'
          }
        ],
        variant: 'grid4'
      }
    ]
  }
}
