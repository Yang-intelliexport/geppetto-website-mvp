export type Locale = 'en' | 'zh'

type Stat = {
  value: string
  label: string
  description: string
}

type ServiceCard = {
  icon: string
  title: string
  description: string
  image?: {
    src: string
    alt: string
  }
  columns: Array<{
    title: string
    items: string[]
  }>
  cta?: {
    text: string
    href: string
  }
}

type AdvantageCard = {
  icon: string
  title: string
  description: string
  bullets: string[]
  accent?: 'purple' | 'blue' | 'green' | 'orange' | 'red'
}

type ComparisonList = {
  title: string
  accent: 'red' | 'green'
  items: string[]
}

type PillarCard = {
  icon: string
  title: string
  description: string
  highlightTitle: string
  highlights: string
  accent: 'purple' | 'blue' | 'green'
}

type Metric = {
  value: string
  label: string
  note: string
}

type IndustryCard = {
  icon: string
  title: string
  description: string
  items: string[]
}

type SimpleCard = {
  icon: string
  title: string
  description: string
}

type Spotlight = {
  title: string
  subtitle: string
  image: {
    src: string
    alt: string
  }
  highlights: Array<{
    icon: string
    title: string
    description: string
  }>
}

type CTA = {
  title: string
  subtitle: string
  highlights: Array<{
    title: string
    description: string
  }>
  primary: {
    text: string
    href: string
  }
  secondary: {
    text: string
    href: string
  }
  disclaimer: string
}

type LinkBlock = {
  title: string
  description: string
  href: string
  cta: string
}

type ServicesContent = {
  metaTitle: string
  metaDescription: string
  metaKeywords: string[]
  hero: {
    title: string
    subtitle: string
    stats: Stat[]
  }
  heroIntro: {
    title: string
    paragraphs: string[]
  }
  coreServices: {
    title: string
    description: string
    cards: ServiceCard[]
  }
  advantages: {
    title: string
    description: string
    cards: AdvantageCard[]
  }
  quality: {
    title: string
    description: string
    cards: AdvantageCard[]
  }
  comparison: {
    title: string
    description: string
    lists: ComparisonList[]
  }
  pillars: {
    title: string
    cards: PillarCard[]
  }
  metrics: {
    title: string
    items: Metric[]
  }
  industries: {
    title: string
    description: string
    cards: IndustryCard[]
  }
  global: {
    title: string
    description: string
    cards: SimpleCard[]
  }
  linkBlocks: LinkBlock[]
  spotlight: Spotlight
  cta: CTA
}

export const servicesContent: Record<Locale, ServicesContent> = {
  en: {
    metaTitle: 'CNC Milling & Turning Services | 3/4/5-Axis Machining | Geppetto',
    metaDescription:
      'Comprehensive CNC machining capabilities including 5-axis milling and precision turning. We handle complex geometries with engineering-grade materials (Aluminum, Steel, Titanium).',
    metaKeywords: [
      'CNC manufacturing services',
      'precision machining services',
      'robotics machining partner',
      'medical device manufacturing',
      'aerospace cnc provider',
      'low volume manufacturing',
      'transparent cnc pricing',
      'ai assisted quoting'
    ],
    hero: {
      title: 'Transparent Precision Manufacturing Services',
      subtitle: 'Transparent • Reliable • Startup-Friendly',
      stats: [
        { value: '72H', label: 'Production Rhythm', description: 'Production complete plus shipping time' },
        { value: 'Custom', label: 'Precision', description: 'Tailored to every project requirement' },
        { value: '50+', label: 'Materials', description: 'Extensive metals and polymers catalog' },
        { value: '100%', label: 'Cost Transparency', description: 'Every service item clearly listed' }
      ]
    },
    heroIntro: {
      title: 'Full-stack CNC manufacturing for robotics, medical, and aerospace teams',
      paragraphs: [
        'From single-piece validation builds to 200-unit pilot runs, Geppetto blends AI-driven CAD analysis with senior manufacturing engineers to guarantee ±0.02 mm tolerances, bilingual collaboration, and 72-hour production kickoffs.',
        'Our transparent pricing, cost breakdown dashboards, and no-MOQ approach keep hardware founders, finance partners, and supply teams aligned from quote to delivery.'
      ]
    },
    coreServices: {
      title: '🔧 Core Manufacturing Services',
      description: 'Complete manufacturing chain from prototyping to production',
      cards: [
        {
          icon: '⚙️',
          title: 'CNC Precision Machining',
          description: 'Industry-leading CNC machining services with 3-5 axis capabilities.',
          image: {
            src: '/images/facility/workshop-overview-1.jpg',
            alt: 'CNC machining workshop'
          },
          columns: [
            {
              title: 'Capabilities',
              items: [
                'Custom precision per project',
                'Surface finish Ra0.8-Ra3.2',
                'Max size 1500×1000×800mm',
                '50+ material options'
              ]
            },
            {
              title: 'Applications',
              items: [
                'Aerospace components',
                'Automotive parts',
                'Robotics components',
                'Medical devices'
              ]
            }
          ],
          cta: {
            text: 'Get a CNC Quote →',
            href: '/en/create-quote'
          }
        },
        {
          icon: '🖨️',
          title: '3D Printing Solutions',
          description: 'Rapid prototyping to small-batch production across metals and polymers.',
          columns: [
            {
              title: 'Technologies',
              items: [
                'FDM • SLA • SLS • SLM',
                'Layer accuracy per spec',
                'Metal & engineering plastics',
                'Complete post-processing'
              ]
            },
            {
              title: 'Use Cases',
              items: [
                'Rapid concept validation',
                'Complex internal structures',
                'Bridge production batches',
                'Functional test parts'
              ]
            }
          ],
          cta: {
            text: 'Discuss Additive Approach',
            href: '/en/contact'
          }
        },
        {
          icon: '✨',
          title: 'Surface Finishing',
          description: 'Professional finishing for both performance and appearance.',
          columns: [
            {
              title: 'Processes',
              items: [
                'Anodizing / Plating / Coating',
                'Corrosion resistance >240hrs',
                'RAL & Pantone color control',
                'Laser engraving customization'
              ]
            },
            {
              title: 'Benefits',
              items: [
                'Premium appearance',
                'Functional coatings',
                'Brand customization',
                'Protection + durability'
              ]
            }
          ],
          cta: {
            text: 'See Finishing Options',
            href: '/en/transparent-pricing'
          }
        }
      ]
    },
    advantages: {
      title: '💎 Transparent Manufacturing Advantages',
      description: 'Clear pricing, reliable delivery, and startup-friendly approach',
      cards: [
        {
          icon: '🧠',
          title: 'Transparent Cost Analysis',
          description: 'Complete visibility into every cost component.',
          bullets: [
            'Detailed material breakdown',
            'Labor hours & hourly rates',
            'Equipment + overhead disclosure',
            'Fair profit structure'
          ],
          accent: 'purple'
        },
        {
          icon: '📊',
          title: 'Smart Production Scheduling',
          description: 'AI-driven scheduling keeps every order on track.',
          bullets: [
            'Real-time equipment monitoring',
            'Intelligent resource allocation',
            'Dynamic plan adjustments',
            'Predictable delivery windows'
          ],
          accent: 'blue'
        },
        {
          icon: '🎯',
          title: 'Quality Intelligence Monitoring',
          description: 'Live quality feedback ensures consistent precision.',
          bullets: [
            'Process monitoring at every step',
            'Early anomaly detection',
            'Quality data analytics',
            'Automatic parameter optimization'
          ],
          accent: 'orange'
        }
      ]
    },
    quality: {
      title: '🤖 AI-Enhanced Manufacturing Advantages',
      description: 'Where AI intelligence meets traditional craftsmanship',
      cards: [
          {
            icon: '🧮',
            title: 'Cost Control',
            description: 'AI optimization reduces material waste by 30%.',
            bullets: []
          },
          {
            icon: '⚡',
            title: 'Efficiency Boost',
            description: 'Apprentice model lowers manual cost by 50%.',
            bullets: []
          },
          {
            icon: '🏆',
            title: 'Quality & Speed',
            description: 'Master supervision + AI scheduling ensure 72H production + logistics.',
            bullets: []
          }
      ]
    },
    comparison: {
      title: '🔄 Flexible Manufacturing Excellence',
      description: 'How our flexible factory approach transforms traditional limitations',
      lists: [
        {
          title: '❌ Traditional Manufacturing',
          accent: 'red',
          items: [
            'High MOQ requirements (100-1000 pieces)',
            'Fixed setup costs regardless of quantity',
            '2-3 weeks lead time for standard parts',
            'Inventory risk & cash flow pressure',
            'Limited iteration capability',
            'Quality inconsistency at low volumes',
            'Rigid production schedules'
          ]
        },
        {
          title: '✅ Our Flexible Factory',
          accent: 'green',
          items: [
            'Single-piece production capability',
            'Smart cost distribution across volumes',
            '72-hour production + shipping',
            'Zero inventory risk, pay as needed',
            'Rapid design iteration support',
            'Project-specific precision consistency',
            'AI-optimized flexible scheduling'
          ]
        }
      ]
    },
    pillars: {
      title: 'Three Pillars of Flexible Manufacturing',
      cards: [
        {
          icon: '🎯',
          title: 'Demand-Driven Production',
          description: 'Produce exactly what you need, when you need it.',
          highlightTitle: 'Key Benefits:',
          highlights: 'Zero inventory waste • On-time delivery • Healthier cash flow • Scale on demand',
          accent: 'purple'
        },
        {
          icon: '⚡',
          title: 'Intelligent Responsiveness',
          description: 'Digital twin + optimization deliver true 72H cycles.',
          highlightTitle: 'Speed Advantage:',
          highlights: '72H vs 2-3 week industry norm • Real-time optimization • Rapid feedback loops',
          accent: 'blue'
        },
        {
          icon: '🔄',
          title: 'Seamless Volume Flexibility',
          description: 'Prototype-to-production with consistent quality.',
          highlightTitle: 'Volume Range:',
          highlights: '1 to 1000+ pieces • Smart cost scaling • No volume penalties',
          accent: 'green'
        }
      ]
    },
    metrics: {
      title: 'Flexible Manufacturing Success Metrics',
      items: [
        { value: '85%', label: 'Cost Reduction', note: 'vs traditional single-piece manufacturing' },
        { value: '72H', label: 'Production Complete', note: 'Plus logistics window' },
        { value: '1 → 1000+', label: 'Volume Range', note: 'Consistent quality scaling' },
        { value: 'Custom', label: 'Precision', note: 'Project-specific tolerance strategy' }
      ]
    },
    industries: {
      title: '🌟 Industry Applications',
      description: 'Serving robotics, electronics, aerospace, and medical innovators',
      cards: [
        {
          icon: '🤖',
          title: 'Robotics',
          description: 'Precision parts for robotics systems.',
          items: [
            'Joint bearings • Gearbox housings',
            'Sensor brackets • Cable protection'
          ]
        },
        {
          icon: '✈️',
          title: 'Aerospace',
          description: 'High-performance components.',
          items: [
            'Engine blades • Structural parts',
            'Specialty fasteners • Test fixtures'
          ]
        },
        {
          icon: '🏥',
          title: 'Medical Devices',
          description: 'Biocompatible manufacturing.',
          items: [
            'Surgical instruments • Implants',
            'Sensor housings • Rehab fixtures'
          ]
        },
        {
          icon: '📱',
          title: 'Electronics',
          description: 'Precision enclosures & thermal solutions.',
          items: [
            'Heat sinks • EMI shields',
            'Precision connectors • Ultra-thin housings'
          ]
        }
      ]
    },
    global: {
      title: '🌍 Global Manufacturing Excellence',
      description: 'Comprehensive services aligned with international standards',
      cards: [
        {
          icon: '📋',
          title: 'International Standards',
          description: 'ANSI / ASTM / ASME compliant workflows, medical & aerospace quality systems in progress.'
        },
        {
          icon: '🚚',
          title: 'Express Logistics',
          description: 'Worldwide logistics partners with tracked express shipping options.'
        },
        {
          icon: '💳',
          title: 'Global Payments',
          description: 'Corporate cards, international wires, PayPal Business, multi-currency billing.'
        },
        {
          icon: '🌎',
          title: 'Global Coverage',
          description: '15+ hours daily live support across time zones with bilingual engineers.'
        }
      ]
    },
    linkBlocks: [
      {
        title: 'Case Studies',
        description: 'See how robotics, medical, and aerospace teams compress build time with our flexible manufacturing stack.',
        href: '/en/case-studies',
        cta: 'Browse Case Studies'
      },
      {
        title: 'Manufacturing Resources',
        description: 'DFM checklists, material cheat-sheets, and budgeting guides for hardware founders and supply teams.',
        href: '/en/resources',
        cta: 'Visit Resource Hub'
      },
      {
        title: 'Transparent Pricing',
        description: 'Understand materials, machining, finishing, QA, and logistics costs before approving a PO.',
        href: '/en/transparent-pricing',
        cta: 'Explore Cost Breakdown'
      }
    ],
    spotlight: {
      title: '🎓 AI + Apprentice Manufacturing Model',
      subtitle: 'AI precision + master craftsmanship = a new manufacturing standard',
      image: {
        src: '/images/manufacturing/cnc-operator.jpg',
        alt: 'AI + apprenticeship manufacturing workflow'
      },
      highlights: [
        { icon: '🧮', title: 'Cost Control', description: 'AI optimization reduces material waste by 30%.' },
        { icon: '⚡', title: 'Efficiency', description: 'Apprentice execution lowers labor cost by 50%.' },
        { icon: '🏆', title: 'Quality', description: 'Master supervision maintains premium workmanship.' },
        { icon: '🚀', title: 'Speed', description: 'AI scheduling keeps every order on 72H cadence.' }
      ]
    },
    cta: {
      title: '🚀 Get Professional Manufacturing Services Now',
      subtitle: 'Choose Geppetto to experience transparent manufacturing with AI-enhanced expert services.',
      highlights: [
        { title: 'Free First Order', description: 'Prototype fees waived' },
        { title: 'Quality Guarantee', description: '100% remake if defective' },
        { title: '72H Production', description: 'Plus shipping window' },
        { title: 'Technical Support', description: 'Expert team guidance' }
      ],
      primary: {
        text: '💎 Get Transparent Quote • 8-Hour Expert Review',
        href: '/en/create-quote'
      },
      secondary: {
        text: 'Contact Expert Team • +86 13511091304',
        href: 'tel:+8613511091304'
      },
      disclaimer: 'Zero hidden fees • Transparent progress • Dedicated technical partner'
    }
  },
  zh: {
    metaTitle: 'CNC精密加工 | 透明制造服务 | Geppetto',
    metaDescription:
      'Geppetto 提供透明的精密制造服务，涵盖 CNC、3D 打印与表面处理。72 小时生产 + 运输，项目定制精度保证。',
    metaKeywords: [
      'CNC制造服务',
      '精密加工服务',
      '机器人零件加工',
      '医疗器械制造',
      '航空航天加工',
      '低起订量制造',
      '透明制造报价'
    ],
    hero: {
      title: '透明精密制造服务',
      subtitle: '透明 • 可靠 • 初创友好',
      stats: [
        { value: '72小时', label: '生产节奏', description: '生产完成后立即发货' },
        { value: '按需定制', label: '加工精度', description: '完全匹配项目要求' },
        { value: '50+', label: '材料选择', description: '覆盖金属与工程塑料' },
        { value: '100%', label: '成本透明', description: '每一项服务均清晰列示' }
      ]
    },
    heroIntro: {
      title: '服务机器人、医疗、航空航天等高要求行业',
      paragraphs: [
        'Geppetto 结合 AI 可制造性分析与资深工程师经验，可在 ±0.02mm 精度下完成机器人/医疗/航空零件的小批量试制与验证，确保 72 小时内锁定产能。',
        '透明成本拆解、实时进度仪表盘以及零 MOQ 策略，让创始人、硬件负责人、财务都能清楚掌握每一个制造节点。'
      ]
    },
    coreServices: {
      title: '🔧 核心制造服务',
      description: '覆盖从原型到批量生产的完整制造链条',
      cards: [
        {
          icon: '⚙️',
          title: 'CNC精密加工',
          description: '业界领先的 3-5 轴数控加工能力，满足工业级制造需求。',
          image: {
            src: '/images/facility/workshop-overview-1.jpg',
            alt: 'CNC精密加工车间'
          },
          columns: [
            {
              title: '加工能力',
              items: [
                '精度按项目定制',
                '表面粗糙度可达 Ra0.8',
                '最大尺寸 1500×1000×800mm',
                '50+ 材料可选'
              ]
            },
            {
              title: '应用领域',
              items: [
                '机器人/具身智能核心部件',
                '航空航天结构件',
                '医疗器械零件',
                '电子设备精密组件'
              ]
            }
          ],
          cta: {
            text: '获取 CNC 报价 →',
            href: '/zh/create-quote'
          }
        },
        {
          icon: '🖨️',
          title: '3D打印服务',
          description: '从概念验证到小批量桥接生产，金属与塑料同样高效。',
          columns: [
            {
              title: '技术能力',
              items: [
                'FDM / SLA / SLS / SLM',
                '层厚精度随项目定制',
                '支持金属及工程塑料',
                '完善后处理服务'
              ]
            },
            {
              title: '应用场景',
              items: [
                '快速原型验证',
                '复杂内腔结构',
                '小批量定制生产',
                '功能性测试件'
              ]
            }
          ],
          cta: {
            text: '咨询 3D 打印方案',
            href: '/zh/contact'
          }
        },
        {
          icon: '✨',
          title: '表面处理',
          description: '兼顾性能与外观的专业表面处理方案。',
          columns: [
            {
              title: '处理工艺',
              items: [
                '阳极氧化 / 电镀 / 喷涂',
                '防腐性能 >240 小时',
                'RAL / 潘通色卡匹配',
                '激光雕刻个性化'
              ]
            },
            {
              title: '应用效果',
              items: [
                '外观质感全面提升',
                '品牌定制更突出',
                '功能性涂层选择',
                '长期耐用与防护'
              ]
            }
          ],
          cta: {
            text: '了解表面处理方案',
            href: '/zh/transparent-pricing'
          }
        }
      ]
    },
    advantages: {
      title: '🤖 AI智能制造优势',
      description: 'AI 智能与传统工艺深度融合',
      cards: [
        {
          icon: '🧠',
          title: 'AI工艺规划',
          description: '自动识别图纸特征，智能生成最优加工方案。',
          bullets: [
            '图纸几何特征自动识别',
            'AI 推荐最优加工路径',
            '智能设定切削参数',
            '精确预测加工时间'
          ],
          accent: 'purple'
        },
        {
          icon: '📊',
          title: '智能排产调度',
          description: '实时设备监控 + AI 排产，交付节奏可预期。',
          bullets: [
            '实时设备状态监控',
            '智能排产算法优化',
            '最优资源分配',
            '动态调整生产计划'
          ],
          accent: 'blue'
        },
        {
          icon: '🎯',
          title: '质量智能监控',
          description: '全过程质量反馈，异常提前预警。',
          bullets: [
            '加工过程实时监控',
            '异常情况提前预警',
            '质量数据深度分析',
            '工艺参数自动优化'
          ],
          accent: 'orange'
        }
      ]
    },
    quality: {
      title: '🎓 AI+学徒制造模式',
      description: 'AI 精准计算 × 资深师傅工艺经验',
      cards: [
        {
          icon: '🧮',
          title: '成本控制',
          description: 'AI 优化降低 30% 材料浪费。',
          bullets: []
        },
        {
          icon: '⚡',
          title: '效率提升',
          description: '学徒执行降低 50% 人工成本。',
          bullets: []
        },
        {
          icon: '🏆',
          title: '品质速度',
          description: '师傅监督 + AI 排产，工作时间交付。',
          bullets: []
        }
      ]
    },
    comparison: {
      title: '🔄 柔性制造 vs 传统制造',
      description: '柔性智能工厂彻底改变传统“刚性产线”',
      lists: [
        {
          title: '❌ 传统制造模式',
          accent: 'red',
          items: [
            'MOQ 高（100-1000 件起）',
            '固定开机费无法摊薄',
            '2-3 周交付周期',
            '库存/现金流压力大',
            '设计迭代周期长',
            '小批量质量不稳定',
            '排产僵硬无法插单'
          ]
        },
        {
          title: '✅ Geppetto柔性工厂',
          accent: 'green',
          items: [
            '1 件起做，支持逐件验证',
            '智能成本分摊，费用可控',
            '72 小时生产 + 运输',
            '零库存风险，按需支付',
            '快速迭代、随时修改',
            '精度一致，按项目定制',
            'AI 排产灵活调度'
          ]
        }
      ]
    },
    pillars: {
      title: '柔性制造三大支柱',
      cards: [
        {
          icon: '🎯',
          title: '需求驱动生产',
          description: '只生产真正需要的数量，AI 排程消灭库存浪费。',
          highlightTitle: '核心价值：',
          highlights: '零库存浪费 • 准时交付 • 现金流友好 • 按需扩展',
          accent: 'purple'
        },
        {
          icon: '⚡',
          title: '智能响应速度',
          description: '数字孪生 + 实时优化，72 小时交付成为常态。',
          highlightTitle: '速度优势：',
          highlights: '72 小时 vs 传统 2-3 周 • 实时优化 • 快速反馈',
          accent: 'blue'
        },
        {
          icon: '🔄',
          title: '弹性产量调度',
          description: '从样件到小批量，质量与成本始终保持一致。',
          highlightTitle: '产量范围：',
          highlights: '1-1000+ 件 • 智能成本曲线 • 无产量惩罚',
          accent: 'green'
        }
      ]
    },
    metrics: {
      title: '柔性制造关键指标',
      items: [
        { value: '85%', label: '成本节省', note: 'vs 传统单件制造' },
        { value: '72小时', label: '生产周期', note: '含运输窗口' },
        { value: '1→1000+', label: '产量范围', note: '批次品质一致' },
        { value: '按需定制', label: '精度策略', note: '匹配项目公差' }
      ]
    },
    industries: {
      title: '🌟 行业应用案例',
      description: '深耕机器人与电子制造，同时服务航空航天与医疗客户',
      cards: [
        {
          icon: '🤖',
          title: '机器人制造专家',
          description: '服务具身智能与工业机器人客户。',
          items: [
            '关节轴承、减速器外壳',
            '传感器支架、线缆保护件'
          ]
        },
        {
          icon: '✈️',
          title: '航空航天',
          description: '高强度材料与复杂曲面零件。',
          items: [
            '发动机叶片、结构件',
            '特种紧固件、测试夹具'
          ]
        },
        {
          icon: '🏥',
          title: '医疗器械',
          description: '符合生物兼容性的精密部件。',
          items: [
            '手术器械、植入物',
            '检测设备外壳、康复组件'
          ]
        },
        {
          icon: '📱',
          title: '电子制造',
          description: '高精度外壳与热管理方案。',
          items: [
            '散热器、EMI 屏蔽罩',
            '精密连接器、超薄外壳'
          ]
        }
      ]
    },
    global: {
      title: '🌍 全球制造服务能力',
      description: '面向国际客户的全链路交付体系',
      cards: [
        {
          icon: '📋',
          title: '国际标准',
          description: '遵循 ANSI/ASTM/ASME，医疗与航空认证体系建设中。'
        },
        {
          icon: '🚚',
          title: '全球物流',
          description: '国际物流合作伙伴，提供加急与可追踪的跨境方案。'
        },
        {
          icon: '💳',
          title: '多币种结算',
          description: '支持企业信用卡、国际电汇、PayPal Business，多币种报价。'
        },
        {
          icon: '🌎',
          title: '全球支持',
          description: '跨时区实时响应，双语工程师全程陪伴。'
        }
      ]
    },
    linkBlocks: [
      {
        title: '成功案例',
        description: '了解我们如何为机器人、医疗、航空项目实现透明制造与加速交付。',
        href: '/zh/case-studies',
        cta: '查看案例'
      },
      {
        title: '制造知识库',
        description: 'DFM 清单、材料速查表、成本拆解等内容，帮助团队更快评估制造方案。',
        href: '/zh/resources',
        cta: '进入知识库'
      },
      {
        title: '透明定价模型',
        description: '了解材料、加工、质检、物流如何构成最终价格，避免隐形费用。',
        href: '/zh/transparent-pricing',
        cta: '了解定价'
      }
    ],
    spotlight: {
      title: '🎓 AI+学徒制造模式',
      subtitle: 'AI 精准计算 × 资深师傅工艺经验 = 制造降维打击',
      image: {
        src: '/images/manufacturing/cnc-operator.jpg',
        alt: 'AI+学徒制造操作现场'
      },
      highlights: [
        { icon: '🧮', title: '成本控制', description: 'AI 优化降低 30% 材料浪费' },
        { icon: '⚡', title: '效率提升', description: '学徒执行降低 50% 人工成本' },
        { icon: '🏆', title: '质量保证', description: '师傅监督确保工艺标准' },
        { icon: '🚀', title: '速度保障', description: 'AI 排产实现工作时间交付' }
      ]
    },
    cta: {
      title: '🚀 立即体验专业制造服务',
      subtitle: '选择 Geppetto，体验透明制造与 AI 辅助专家服务',
      highlights: [
        { title: '首单免费', description: '打样费全免' },
        { title: '质量承诺', description: '不合格免费重做' },
        { title: '72小时生产', description: '含运输窗口' },
        { title: '技术支持', description: '专家团队全程陪伴' }
      ],
      primary: {
        text: '💎 8 小时专家透明报价',
        href: '/zh/create-quote'
      },
      secondary: {
        text: '联系技术团队 • +86 13511091304',
        href: 'tel:+8613511091304'
      },
      disclaimer: '零隐藏费用 • 实时生产进度 • 专属技术顾问'
    }
  }
}
