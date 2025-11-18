export type Locale = 'en' | 'zh'

type HeroCard = { icon: string; title: string; description: string }
type CrisisItem = { title: string; description: string }
type CrisisExample = { label: string; value: string; note: string }
type ComparisonRow = { problem: string; solution: string; traditional: string }
type BenefitCard = { icon: string; title: string; description: string }

export type TransparentPricingContent = {
  metaTitle: string
  metaDescription: string
  keywords: string[]
  heroTitle: string
  heroSubtitle: string
  heroCards: HeroCard[]
  crisisTitle: string
  crisisSubtitle: string
  crisisItems: CrisisItem[]
  crisisExample: CrisisExample[]
  comparisonTitle: string
  comparisonSubtitle: string
  comparisonRows: ComparisonRow[]
  benefitTitle: string
  benefitSubtitle: string
  benefitCards: BenefitCard[]
  ctaTitle: string
  ctaSubtitle: string
  primaryCta: { text: string; href: string }
  secondaryCta?: { text: string; href: string }
  faqs: Array<{ question: string; answer: string }>
}

export const transparentPricingContent: Record<Locale, TransparentPricingContent> = {
  en: {
    metaTitle: 'Transparent CNC Pricing | Digital Twin Analysis | Zero Hidden Fees | Geppetto',
    metaDescription:
      'Professional manufacturing service packages with digital twin cost analysis, AI assistance, and zero hidden fees. Detailed quotes within 8 hours.',
    keywords: [
      'transparent cnc pricing',
      'cnc cost breakdown',
      'digital twin manufacturing',
      'no hidden manufacturing fees',
      'cnc quote analysis',
      'manufacturing pricing transparency'
    ],
    heroTitle: '🔍 Transparent Manufacturing Through Digital Intelligence',
    heroSubtitle: 'Our flexible factory’s digital foundation enables unprecedented pricing clarity.',
    heroCards: [
      {
        icon: '🧠',
        title: 'AI Analysis',
        description:
          'Digital twin simulates your part in a virtual environment, calculating precise material usage, machining time, and tool wear.'
      },
      {
        icon: '📊',
        title: 'Real-Time Costing',
        description:
          'Live connection to material prices, machine rates, and process optimization ensures accurate costs without padding.'
      },
      {
        icon: '📱',
        title: 'Live Dashboard',
        description: 'Track manufacturing progress in real time and know exactly where every dollar is spent.'
      }
    ],
    crisisTitle: '🚨 The Manufacturing Pricing Crisis',
    crisisSubtitle: 'Why traditional quotes confuse and frustrate hardware teams.',
    crisisItems: [
      { title: 'Black Box Estimates', description: 'Quotes jump from $180 to $3,500 with no explanation.' },
      { title: 'Hidden Fees', description: 'Setup, tooling, rush, inspection fees appear mid-production.' },
      { title: 'Prediction Failure', description: 'Budgeting becomes guesswork, delaying launches and funding.' }
    ],
    crisisExample: [
      { label: 'Software Estimate', value: '$180', note: 'Simple aluminum bracket' },
      { label: 'Supplier Quote', value: '$3,500', note: 'Traditional factory response' },
      { label: 'Gap', value: '19× difference', note: 'Zero visibility into cost structure' }
    ],
    comparisonTitle: '✨ Our Transparent Factory Solution',
    comparisonSubtitle: 'Digital twin technology replaces guesswork with real numbers.',
    comparisonRows: [
      {
        problem: 'Pricing Confusion',
        solution: 'Comprehensive service package with materials, machining, finishing, and operations broken down.',
        traditional: '“Trust us” lump-sum quote with hidden fees.'
      },
      {
        problem: 'Small Batch Penalties',
        solution: 'Single-piece pricing with smart cost distribution.',
        traditional: 'MOQ enforced or 5× premium for low volume.'
      },
      {
        problem: 'Delivery Risk',
        solution: '72H production + shipping committed, real-time dashboard.',
        traditional: 'Ambiguous “maybe” timelines and status opacity.'
      },
      {
        problem: 'Trust & Accountability',
        solution: 'Digital audit trail + expert validation for every quote.',
        traditional: 'No documentation, no traceability.'
      }
    ],
    benefitTitle: '💡 Why Transparent Pricing Wins',
    benefitSubtitle: 'Manufacturing teams deserve clarity before committing budgets.',
    benefitCards: [
      {
        icon: '🧾',
        title: 'Auditable Breakdown',
        description: 'Materials, machining, finishing, operations, and margin disclosed line by line.'
      },
      {
        icon: '⚖️',
        title: 'Predictable Finance',
        description: 'Budget exactly what you approve; invoices match quotes within ±1.5%.'
      },
      {
        icon: '🚀',
        title: 'Faster Decisions',
        description: 'Founders and finance teams align quickly, accelerating iteration cycles.'
      }
    ],
    ctaTitle: 'Ready to End Pricing Guesswork?',
    ctaSubtitle:
      'Upload your CAD once, receive a transparent breakdown in 8 hours, and start production without hidden fees.',
    primaryCta: {
      text: '💎 Get Professional Service Quote',
      href: '/en/create-quote'
    },
    secondaryCta: {
      text: 'See how no-MOQ works →',
      href: '/en/no-moq'
    },
    faqs: [
      {
        question: 'How is the CNC quote calculated?',
        answer:
          'Our digital twin engine simulates machining time, material usage, finishing labor, logistics, and quality operations, then itemizes each component in the quote.'
      },
      {
        question: 'Are there additional fees after I approve the quote?',
        answer:
          'No hidden fees. If engineering changes require extra steps, we send a revised, line-item breakdown for approval before continuing.'
      },
      {
        question: 'Can I see cost differences between materials or batch sizes?',
        answer:
          'Yes. Request alternative materials or quantities in the quote notes—our system recomputes the BOM and machine hours so you can compare scenarios instantly.'
      }
    ]
  },
  zh: {
    metaTitle: '透明CNC定价 | 数字孪生成本分析 | 零隐藏费用 | Geppetto',
    metaDescription:
      '通过数字孪生和 AI 分析实现透明制造定价。详细成本拆解、零隐藏费用、8 小时专家审核。',
    keywords: [
      '透明CNC定价',
      '制造成本拆解',
      '数字孪生成本分析',
      '零隐藏费用',
      '制造透明报价'
    ],
    heroTitle: '🔍 数字智能实现透明制造',
    heroSubtitle: '柔性工厂的数字化基础让成本结构完全可见。',
    heroCards: [
      {
        icon: '🧠',
        title: 'AI分析',
        description: '数字孪生仿真零件制造，精准计算材料、工时、刀具磨损。'
      },
      {
        icon: '📊',
        title: '实时定价',
        description: '实时连接材料价格、机床费率和工艺优化，完全杜绝“估价拍脑袋”。'
      },
      {
        icon: '📱',
        title: '实时仪表盘',
        description: '制造过程全程可视化，资金去向与进度一目了然。'
      }
    ],
    crisisTitle: '🚨 制造定价危机',
    crisisSubtitle: '传统报价为何让硬件团队困惑和崩溃？',
    crisisItems: [
      { title: '黑箱报价', description: '$180 软件估算变成 $3,500 供应商报价，无法解释差异。' },
      { title: '隐形费用', description: '开机费、刀具费、加急费、质检费在生产中途突然出现。' },
      { title: '预算不可控', description: '无法提前做财务规划，导致项目延期甚至融资受阻。' }
    ],
    crisisExample: [
      { label: '软件估价', value: '$180', note: '简单铝件' },
      { label: '传统报价', value: '$3,500', note: '没有任何明细' },
      { label: '差异', value: '19倍', note: '成本结构完全不可见' }
    ],
    comparisonTitle: '✨ Geppetto 透明工厂方案',
    comparisonSubtitle: '数字孪生 + AI 替代人为猜测，让每一分钱都清楚。',
    comparisonRows: [
      {
        problem: '价格失真',
        solution: '材料、加工、表面处理、运营成本逐项展示。',
        traditional: '模糊总价 + 各种附加费用。'
      },
      {
        problem: '小批量加价',
        solution: '单件起做，智能成本分摊，无额外惩罚。',
        traditional: '高额起订或 5 倍加价。'
      },
      {
        problem: '交付不可控',
        solution: '72 小时生产 + 运输承诺，实时仪表盘可追踪。',
        traditional: '交期模糊，状态不可见。'
      },
      {
        problem: '信任缺失',
        solution: '每个报价都有明细 + 专家复核，完整可追溯。',
        traditional: '无文档、无责任主体。'
      }
    ],
    benefitTitle: '💡 透明定价的真正价值',
    benefitSubtitle: '让技术、财务、创始人都能放心决策。',
    benefitCards: [
      { icon: '🧾', title: '可审计拆解', description: '材料/工时/运营/利润逐项公开，清楚每一分钱。' },
      { icon: '⚖️', title: '预算可控', description: '发票与报价保持 ±1.5% 内，一次审批即可执行。' },
      { icon: '🚀', title: '决策加速', description: '创始人与财务快速对齐，迭代速度提升。' }
    ],
    ctaTitle: '准备彻底终结报价混乱了吗？',
    ctaSubtitle: '一次上传文件，8 小时拿到透明报价，72 小时启动生产。',
    primaryCta: {
      text: '💎 获取透明报价',
      href: '/zh/create-quote'
    },
    secondaryCta: {
      text: '了解无MOQ方案 →',
      href: '/zh/no-moq'
    },
    faqs: [
      {
        question: '报价里的每一项成本如何计算？',
        answer: '数字孪生会模拟材料损耗、机床工时、刀具磨损、表面处理和质检物流，每个环节都有对应数字，报价单会以表格形式呈现。'
      },
      {
        question: '确认后还会加价吗？',
        answer: '不会。若工程变更需要额外工序，我们会发送新的拆解明细，需您确认后才会继续。'
      },
      {
        question: '能否对比不同材料/批量的成本？',
        answer: '可以。备注中写明备选材料或数量，我们会同步生成多种场景的成本拆解，方便您快速决策。'
      }
    ]
  }
}
