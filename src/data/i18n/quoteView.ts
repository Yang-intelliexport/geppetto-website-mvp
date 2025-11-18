export type Locale = 'en' | 'zh'

type QuoteFile = {
  name: string
  size: number
  quantity: number
  dimensions: { length: number; width: number; height: number }
  volume: number
  complexity: string
  material: string
}

type ShippingOption = {
  method: string
  time: string
  cost: number
}

type PriceBreakdown = {
  engineeringSetup: number
  materialCost: number
  manufacturingService: number
  shipping: number
  unitProductionCost: number
}

type QuoteManufacturing = {
  productionTime: string
  shippingOptions: ShippingOption[]
  precision: string
  processes: string[]
  aiConfidence: number
  expertReviewed: boolean
}

type QuoteGuarantees = {
  priceAccuracy: string
  productionGuarantee: string
  productionCompensation: string
  qualityAssurance: string
}

type QuoteData = {
  quoteId: string
  timestamp: string
  validUntil: string
  statusBadge: string
  files: QuoteFile[]
  pricing: {
    priceBreakdown: PriceBreakdown
    total: number
    marketPrice: number
    savings: number
    currency: string
  }
  manufacturing: QuoteManufacturing
  guarantees: QuoteGuarantees
}

export type QuoteViewContent = {
  seo: {
    title: string
    description: string
    keywords: string[]
    ogImage: string
  }
  heroTitle: string
  metaLabels: {
    generated: string
    valid: string
    status: string
  }
  summaryBadges: {
    totalTitle: string
    productionTitle: string
    precisionTitle: string
    delayCompensation: string
    remakeGuarantee: string
  }
  shippingTitle: string
  shippingSubtitle: string
  priceBreakdownTitle: string
  breakdownLabels: {
    engineering: string
    material: string
    manufacturing: string
    shipping: string
    unitCost: string
  }
  filesTitle: string
  filesSubtitle: string
  fileMetrics: {
    quantityLabel: string
    volumeLabel: string
    sizeLabel: string
  }
  guaranteeTitle: string
  conversationTitle: string
  conversationDesc: string
  conversationCTA: string
  mockQuote: QuoteData
}

const basePriceBreakdown: PriceBreakdown = {
  engineeringSetup: 65,
  materialCost: 285,
  manufacturingService: 960,
  shipping: 8,
  unitProductionCost: 1245
}

export const quoteViewContent: Record<Locale, QuoteViewContent> = {
  en: {
    seo: {
      title: 'Quote Details | Transparent Manufacturing Quote | Geppetto',
      description:
        'Review a detailed CNC manufacturing quote with transparent pricing, delivery commitments, and AI + expert analysis summary.',
      keywords: ['quote details', 'manufacturing quote', 'CNC quote', 'transparent pricing', 'cost breakdown'],
      ogImage: '/images/og-quote-view.jpg'
    },
    heroTitle: 'Transparent Manufacturing Quote',
    metaLabels: {
      generated: 'Generated',
      valid: 'Valid Until',
      status: 'Quote Status'
    },
    summaryBadges: {
      totalTitle: 'Total Quote',
      productionTitle: 'Production Completion',
      precisionTitle: 'Manufacturing Precision',
      delayCompensation: '10% refund for production delays',
      remakeGuarantee: '100% remake if unqualified'
    },
    shippingTitle: 'Shipping & Delivery Options',
    shippingSubtitle: 'Choose the shipping speed that fits your project timeline.',
    priceBreakdownTitle: 'Cost Breakdown',
    breakdownLabels: {
      engineering: 'Engineering & Setup',
      material: 'Material Cost',
      manufacturing: 'Manufacturing & QA',
      shipping: 'Shipping Cost',
      unitCost: 'Per-Unit Production Cost'
    },
    filesTitle: 'Uploaded Files & Geometry',
    filesSubtitle: 'AI automatically extracts key geometry parameters for manufacturability analysis.',
    fileMetrics: {
      quantityLabel: 'Quantity',
      volumeLabel: 'Volume',
      sizeLabel: 'File Size'
    },
    guaranteeTitle: 'Service Guarantees',
    conversationTitle: 'Collaborate with the Expert Team',
    conversationDesc: 'All engineering notes and chat history are stored with every quote for full transparency.',
    conversationCTA: 'Message Engineering Team',
    mockQuote: {
      quoteId: 'Q1730875234567',
      timestamp: '2024-11-06T10:30:00Z',
      validUntil: '2024-11-13T10:30:00Z',
      statusBadge: 'Expert Review Complete',
      files: [
        {
          name: 'bracket_assembly.step',
          size: 2048576,
          quantity: 5,
          dimensions: { length: 150, width: 80, height: 25 },
          volume: 300,
          complexity: 'Medium',
          material: '6061 Aluminum'
        }
      ],
      pricing: {
        priceBreakdown: basePriceBreakdown,
        total: 1318,
        marketPrice: 2200,
        savings: 882,
        currency: 'USD'
      },
      manufacturing: {
        productionTime: '72 hours production',
        shippingOptions: [
          { method: 'Express Shipping', time: '1-2 days', cost: 25 },
          { method: 'Standard Shipping', time: '3-5 days', cost: 15 },
          { method: 'Economy Shipping', time: '5-7 days', cost: 8 }
        ],
        precision: 'Custom precision',
        processes: ['CNC Milling', 'Anodizing', 'Quality Inspection'],
        aiConfidence: 92,
        expertReviewed: true
      },
      guarantees: {
        priceAccuracy: 'Price accuracy ±3%',
        productionGuarantee: '72-hour production guarantee',
        productionCompensation: '10% refund for production delays',
        qualityAssurance: '100% remake if unqualified'
      }
    }
  },
  zh: {
    seo: {
      title: '报价详情 | 透明制造报价 | Geppetto智能制造',
      description: '查看完整的CNC制造报价，包含成本拆解、交付承诺与AI+专家分析摘要，帮助您快速决策。',
      keywords: ['报价详情', '制造报价', 'CNC报价', '透明定价', '成本拆解'],
      ogImage: '/images/og-quote-view-zh.jpg'
    },
    heroTitle: '透明制造报价',
    metaLabels: {
      generated: '生成时间',
      valid: '有效期至',
      status: '报价状态'
    },
    summaryBadges: {
      totalTitle: '报价总额',
      productionTitle: '72小时完成生产',
      precisionTitle: '项目定制精度',
      delayCompensation: '生产延期赔付10%',
      remakeGuarantee: '质量不合格100%重做'
    },
    shippingTitle: '配送与交付方案',
    shippingSubtitle: '根据项目时效选择最合适的物流方式。',
    priceBreakdownTitle: '成本拆解',
    breakdownLabels: {
      engineering: '工程与设置费',
      material: '材料费',
      manufacturing: '加工与质检费',
      shipping: '物流费',
      unitCost: '单件生产成本'
    },
    filesTitle: '上传文件与几何特征',
    filesSubtitle: 'AI自动提取关键几何参数，辅助评估可制造性。',
    fileMetrics: {
      quantityLabel: '数量',
      volumeLabel: '体积',
      sizeLabel: '文件大小'
    },
    guaranteeTitle: '服务保障',
    conversationTitle: '与工程师团队协作',
    conversationDesc: '所有工程备注与沟通记录均保存，确保决策透明可追溯。',
    conversationCTA: '联系工程师团队',
    mockQuote: {
      quoteId: 'Q1730875234567',
      timestamp: '2024-11-06T10:30:00Z',
      validUntil: '2024-11-13T10:30:00Z',
      statusBadge: '专家审核完成',
      files: [
        {
          name: 'bracket_assembly.step',
          size: 2048576,
          quantity: 5,
          dimensions: { length: 150, width: 80, height: 25 },
          volume: 300,
          complexity: '中等',
          material: '6061铝合金'
        }
      ],
      pricing: {
        priceBreakdown: { ...basePriceBreakdown },
        total: 1318,
        marketPrice: 2200,
        savings: 882,
        currency: 'CNY'
      },
      manufacturing: {
        productionTime: '72小时完成生产',
        shippingOptions: [
          { method: '顺丰速运', time: '1-2天', cost: 25 },
          { method: '邮政EMS', time: '2-3天', cost: 15 },
          { method: '经济物流', time: '3-5天', cost: 10 }
        ],
        precision: '项目定制精度',
        processes: ['CNC铣削', '阳极氧化', '质量检测'],
        aiConfidence: 92,
        expertReviewed: true
      },
      guarantees: {
        priceAccuracy: '报价精度 ±3%',
        productionGuarantee: '72小时生产承诺',
        productionCompensation: '生产延迟赔偿10%',
        qualityAssurance: '不合格100%重做'
      }
    }
  }
}
