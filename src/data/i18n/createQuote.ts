export type Locale = 'en' | 'zh'

type HeroContent = {
  title: {
    prefix: string
    highlight: string
    suffix: string
  }
  subtitle: string
}

type Feature = {
  title: string
  description: string
}

type IndustryHighlight = {
  title: string
  description: string
  link: {
    href: string
    label: string
  }
  keywords: string[]
}

type LinkBlock = {
  title: string
  description: string
  href: string
  cta: string
}

type StructuredData = {
  type: 'service'
  data: Record<string, any>
}

type ProcessSection = {
  title: string
  items: string[]
}

type ToleranceSection = {
  title: string
  items: string[]
}

type FAQ = {
  question: string
  answer: string
}

type CTASection = {
  title: string
  subtitle: string
  emailLabel: string
  phoneLabel: string
  email: string
  phone: string
}

export type CreateQuoteContent = {
  seo: {
    title: string
    description: string
    keywords: string[]
    ogImage: string
  }
  structuredData: StructuredData
  hero: HeroContent
  features: Feature[]
  industries: IndustryHighlight[]
  linkBlocks: LinkBlock[]
  process: ProcessSection
  tolerance: ToleranceSection
  faqs: FAQ[]
  cta: CTASection
}

export const createQuoteContent: Record<Locale, CreateQuoteContent> = {
  en: {
    seo: {
      title: 'Get Instant CNC Quote | Free DFM Analysis | Geppetto',
      description:
        'Upload your CAD files for an instant quote with expert design-for-manufacturability (DFM) feedback. Support for STEP/IGES files. ISO-standard quality control.',
      keywords: [
        'CNC quote',
        'machining quote',
        'precision manufacturing',
        'CAD file quote',
        'aluminum machining',
        'steel machining',
        'titanium machining',
        'rapid prototype quote',
        'robotics cnc',
        'medical device machining',
        'aerospace prototyping',
        'low volume cnc',
        'fast response manufacturing',
        'transparent cnc pricing',
        'smart manufacturing'
      ],
      ogImage: '/images/og-create-quote-en.jpg'
    },
    structuredData: {
      type: 'service',
      data: {
        '@type': 'Service',
        name: 'Professional CNC Manufacturing Quote Service',
        description:
          'Fast professional CNC manufacturing quotes supporting multiple materials and processes with transparent pricing and quality guarantee for robotics, medical and aerospace teams.',
        provider: {
          '@type': 'Organization',
          name: 'Geppetto Smart Manufacturing',
          url: import.meta.env.PUBLIC_SITE_URL || 'https://www.geppetto.studio'
        },
        serviceType: 'Manufacturing Quote Service',
        areaServed: ['Global', 'United States', 'Europe', 'Asia'],
        category: 'CNC machining',
        audience: ['Startups', 'Hardware teams', 'Robotics companies', 'Medical device makers'],
        offers: {
          '@type': 'Offer',
          name: 'CNC Manufacturing Quote',
          description: 'Professional CNC manufacturing quote service with no minimum order quantity and 72-hour production rhythm.',
          price: '0',
          priceCurrency: 'USD'
        }
      }
    },
    hero: {
      title: {
        prefix: 'Get Professional ',
        highlight: 'CNC Manufacturing',
        suffix: ' Quote'
      },
      subtitle:
        'Upload your CAD files and our engineering team will deliver detailed quotes and technical recommendations during business hours.'
    },
    features: [
      {
        title: 'Fast Response',
        description: 'Professional engineers review and respond quickly during business hours.'
      },
      {
        title: 'Transparent Pricing',
        description: 'Clear cost breakdown with no hidden fees.'
      },
      {
        title: 'Quality Guarantee',
        description: 'Strict inspection process ensures reliable parts.'
      },
      {
        title: 'Expert Team',
        description: 'Seasoned engineers provide manufacturability feedback.'
      }
    ],
    industries: [
      {
        title: 'Robotics & Automation',
        description: 'Precision gearboxes, end-effectors and housings with ±0.02 mm tolerances for autonomous systems.',
        keywords: ['robotics cnc', 'automation machining', 'end effector quote'],
        link: {
          href: '/en/case-studies',
          label: 'View Robotics Case Studies →'
        }
      },
      {
        title: 'Medical Devices',
        description: 'Biocompatible materials, ISO-ready finishing and traceability for surgical tools and diagnostic rigs.',
        keywords: ['medical cnc machining', 'biocompatible prototyping'],
        link: {
          href: '/en/resources',
          label: 'See Manufacturing Guides →'
        }
      },
      {
        title: 'Aerospace Prototyping',
        description: 'High-strength alloys and lightweight fixtures with inspection reports for flight hardware iterations.',
        keywords: ['aerospace prototyping', 'titanium cnc quote'],
        link: {
          href: '/en/services',
          label: 'Explore Aerospace Capabilities →'
        }
      }
    ],
    linkBlocks: [
      {
        title: 'Featured Case Studies',
        description: 'See how robotics and medical teams compress lead time from concept to production.',
        href: '/en/case-studies',
        cta: 'Browse Case Studies'
      },
      {
        title: 'Manufacturing Resources',
        description: 'DFM checklists, material cheat-sheets and cost breakdown playbooks updated weekly.',
        href: '/en/resources',
        cta: 'Visit Resource Hub'
      },
      {
        title: 'Transparent Pricing',
        description: 'Understand how machining, finishing and QA costs stack up before you approve budgets.',
        href: '/en/transparent-pricing',
        cta: 'See Pricing Model'
      }
    ],
    process: {
      title: '⚙️ Process Capabilities',
      items: [
        'CNC Milling (3/4/5-axis)',
        'CNC Turning',
        'Precision Grinding',
        'Surface Treatment (Anodizing, Coating)',
        'Assembly & Inspection'
      ]
    },
    tolerance: {
      title: 'Tolerance Range',
      items: [
        'Standard: General tolerance requirements',
        'Precision: Project-specific precision',
        'Ultra Precision: Strict tolerance standards'
      ]
    },
    faqs: [
      {
        question: 'How long does it take to receive a quote?',
        answer:
          'We deliver quotes during business hours. For complex projects we let you know the detailed timeline within 2 hours.'
      },
      {
        question: 'What CAD file formats are supported?',
        answer:
          'STEP (.stp, .step), IGES (.igs, .iges), STL, DWG, and DXF up to 50MB. Contact us if you need other formats.'
      },
      {
        question: 'Is there a minimum order quantity?',
        answer: 'No. We support everything from single prototypes to large batches.'
      },
      {
        question: 'How do you keep files secure?',
        answer:
          'We use enterprise-grade encryption, access control, and NDAs to protect every CAD file and project document.'
      }
    ],
    cta: {
      title: 'Need More Help?',
      subtitle: 'Our professional team is ready to answer any technical questions.',
      emailLabel: 'hello@geppetto.studio',
      phoneLabel: '+86 13511091304',
      email: 'hello@geppetto.studio',
      phone: '+8613511091304'
    }
  },
  zh: {
    seo: {
      title: '专业CNC报价 - 工作时间快速回复 | Geppetto智能制造',
      description:
        '上传 CAD 文件即可获得机器人、医疗、航空等行业的 CNC 加工报价。支持铝合金、不锈钢、钛合金等材料，价格透明、72 小时生产。',
      keywords: [
        'CNC报价',
        '机械加工报价',
        '精密制造',
        'CAD文件报价',
        '铝合金加工',
        '不锈钢加工',
        '钛合金加工',
        '快速打样',
        '低起订量CNC',
        '机器人零件加工',
        '医疗器械加工',
        '航空航天打样',
        '透明定价',
        '智能制造'
      ],
      ogImage: '/images/og-create-quote-zh.jpg'
    },
    structuredData: {
      type: 'service',
      data: {
        '@type': 'Service',
        name: 'CNC制造专业报价服务',
        description: '工作时间内提供机器人、医疗、航空等行业的 CNC 制造报价，支持多种材料与工艺，价格透明质量保证',
        provider: {
          '@type': 'Organization',
          name: 'Geppetto智能制造',
          url: import.meta.env.PUBLIC_SITE_URL || 'https://www.geppetto.studio'
        },
        serviceType: 'Manufacturing Quote Service',
        areaServed: ['China', 'Global'],
        category: 'CNC加工',
        audience: ['硬件初创团队', '机器人企业', '医疗器械团队', '航空航天研发'],
        offers: {
          '@type': 'Offer',
          name: 'CNC制造报价',
          description: '专业CNC制造报价服务，72小时完成生产，支持低起订量。',
          price: '0',
          priceCurrency: 'CNY'
        }
      }
    },
    hero: {
      title: {
        prefix: '获取专业',
        highlight: 'CNC制造',
        suffix: '报价'
      },
      subtitle: '上传CAD文件，工程师团队将在工作时间内给出详细报价与技术建议。'
    },
    features: [
      { title: '工作时间回复', description: '专业工程师快速响应需求。' },
      { title: '透明定价', description: '无隐藏费用，价格构成清晰。' },
      { title: '质量保证', description: '严格质检流程确保可靠交付。' },
      { title: '专家团队', description: '资深工程师提供可制造性建议。' }
    ],
    industries: [
      {
        title: '机器人与自动化',
        description: '关节、减速器、末端执行器等零件提供 ±0.02mm 精度与表面处理，适合批量迭代。',
        keywords: ['机器人加工', '自动化零件CNC'],
        link: {
          href: '/zh/case-studies',
          label: '查看机器人案例 →'
        }
      },
      {
        title: '医疗器械',
        description: '支持 316L、PEEK 等材料，覆盖医用级表面处理与质检流程，满足注册检验需求。',
        keywords: ['医疗器械加工', '医用材料CNC'],
        link: {
          href: '/zh/resources',
          label: '阅读制造指南 →'
        }
      },
      {
        title: '航空航天原型',
        description: '高强度合金、轻量化夹具与全流程可追溯，适合飞行器研发迭代。',
        keywords: ['航空航天打样', '钛合金CNC'],
        link: {
          href: '/zh/services',
          label: '了解航空航天能力 →'
        }
      }
    ],
    linkBlocks: [
      {
        title: '精选案例',
        description: '从机器人到医疗器械，了解我们如何把交付周期压缩到 72 小时。',
        href: '/zh/case-studies',
        cta: '查看案例'
      },
      {
        title: '制造知识库',
        description: 'DFM 清单、材料速查表、成本拆解等内容持续更新。',
        href: '/zh/resources',
        cta: '进入知识库'
      },
      {
        title: '透明定价模型',
        description: '了解材料、加工、质检、物流如何构成最终报价。',
        href: '/zh/transparent-pricing',
        cta: '查看定价'
      }
    ],
    process: {
      title: '⚙️ 加工能力',
      items: ['CNC铣削加工（3/4/5轴）', 'CNC车削加工', '精密磨削', '表面处理（阳极/涂层）', '装配与检验']
    },
    tolerance: {
      title: '公差范围',
      items: ['标准：常规公差需求', '精密：按项目定制公差', '超精密：严格公差标准']
    },
    faqs: [
      {
        question: '多久可以收到报价？',
        answer: '工作时间内保证回复，复杂项目会在2小时内告知具体时间表。'
      },
      {
        question: '支持哪些CAD文件格式？',
        answer: '支持 STEP、IGES、STL、DWG、DXF（单个文件≤50MB），如需其他格式可与我们沟通。'
      },
      {
        question: '是否有起订量限制？',
        answer: '无MOQ限制，1件原型到批量生产都可以。'
      },
      {
        question: '如何保证文件安全？',
        answer: '采用企业级加密与访问控制，并可签署保密协议，确保设计信息安全。'
      }
    ],
    cta: {
      title: '需要更多帮助？',
      subtitle: '专业团队随时解答您的技术问题。',
      emailLabel: 'hello@geppetto.studio',
      phoneLabel: '+86 13511091304',
      email: 'hello@geppetto.studio',
      phone: '+8613511091304'
    }
  }
}
