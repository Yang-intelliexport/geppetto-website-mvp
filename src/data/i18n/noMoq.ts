export type Locale = 'en' | 'zh'

type Stat = { label: string; value: string }
type ProofPoint = { title: string; description: string }
type IndustryCard = { name: string; detail: string }
type ProcessStep = { label: string; detail: string }
type CTA = {
  title: string
  description: string
  primary: { text: string; href: string }
  secondary: { text: string; href: string }
  note: string
}
type UseCase = {
  title: string
  description: string
  href: string
  cta: string
}

type NoMoqContent = {
  metaTitle: string
  metaDescription: string
  metaKeywords: string[]
  hero: {
    badge: string
    title: string
    subtitle: string
    stats: Stat[]
    primaryLink: { text: string; href: string }
    secondaryLink: { text: string; href: string }
  }
  proofPoints: ProofPoint[]
  industries: IndustryCard[]
  useCases: UseCase[]
  process: ProcessStep[]
  cta: CTA
}

export const noMoqContent: Record<Locale, NoMoqContent> = {
  en: {
    metaTitle: 'No MOQ Manufacturing | Startup-Friendly Production | Geppetto',
    metaDescription:
      'Break MOQ barriers with AI-assisted expert quotes in 8 hours and production kickoff within 72 hours. Perfect for prototypes & pilot runs.',
    metaKeywords: [
      'no MOQ manufacturing',
      'low volume cnc',
      'prototype machining',
      'small batch production',
      'pilot run manufacturing',
      'startup manufacturing services'
    ],
    hero: {
      badge: 'No MOQ Manufacturing',
      title: 'Small-Batch Manufacturing Without Compromise',
      subtitle:
        'From single prototypes to 200-piece pilot runs, get expert-reviewed quotes in 8 hours and production kicked off within 72 hours.',
      stats: [
        { label: 'Minimum order', value: '1 piece' },
        { label: 'Quote speed', value: '≤ 8 hours' },
        { label: 'Production start', value: '≤ 72 hours' },
        { label: 'Cost control', value: 'Transparent breakdown' }
      ],
      primaryLink: { text: 'Get an 8-Hour Quote', href: '/en/create-quote' },
      secondaryLink: { text: 'Estimate Small-Batch Cost', href: '/en/calculator' }
    },
    proofPoints: [
      {
        title: 'Cash-Flow Friendly',
        description:
          'Avoid locking tens of thousands into unwanted inventory. Order exactly what you need for the next milestone.'
      },
      {
        title: 'Engineering Collaboration',
        description:
          'Upload CAD, receive AI-assisted manufacturability notes, and talk with bilingual engineers before production.'
      },
      {
        title: 'Predictable Timelines',
        description:
          'Quotes, confirmations, machining, finishing, and logistics updates are timestamped so sprints stay on track.'
      }
    ],
    industries: [
      { name: 'Robotics & AMR', detail: 'Iterate end-effectors and chassis without keeping costly spares.' },
      { name: 'Electronics enclosures', detail: 'Low-volume CNC housings with custom finishing.' },
      { name: 'Medical prototypes', detail: 'Tight-tolerance fixtures with transparent QA steps.' },
      { name: 'University labs', detail: 'Rapid revisions during academic research cycles.' }
    ],
    useCases: [
      {
        title: 'Robotics Pilot Builds',
        description: 'Validate gearboxes, end-effectors, and chassis revisions without locking cash in inventory.',
        href: '/en/case-studies',
        cta: 'View Robotics Case Studies'
      },
      {
        title: 'Medical Device Trials',
        description: 'Produce fixture sets and pre-clinical instruments with full traceability.',
        href: '/en/services',
        cta: 'Explore Service Capabilities'
      },
      {
        title: 'Cost Planning & Transparency',
        description: 'Use our transparent pricing model to forecast per-unit cost as you scale from 1 → 200 pieces.',
        href: '/en/transparent-pricing',
        cta: 'See Cost Breakdown'
      }
    ],
    process: [
      { label: 'Upload CAD', detail: 'STEP, STL, DXF, or native files + key tolerances.' },
      { label: 'AI + Expert review (≤8h)', detail: 'Feasibility check, cost breakdown, timeline commitment.' },
      { label: 'Production window (≤72h)', detail: 'Slot booked, materials staged, machining begins.' },
      { label: 'Pilot run & feedback', detail: 'Standard CMM report, collect feedback, queue next iteration.' }
    ],
    cta: {
      title: 'Ready to Stop Negotiating MOQ?',
      description:
        'Upload your CAD once, receive a transparent breakdown in 8 hours, and kick off the pilot run without hidden fees.',
      primary: { text: 'Start with 1 piece', href: '/en/create-quote' },
      secondary: { text: 'Talk to an engineer', href: '/en/contact' },
      note: 'Zero hidden fees • Detailed breakdown • English/Chinese support'
    }
  },
  zh: {
    metaTitle: '无MOQ制造 | 中小批量透明加工 | Geppetto',
    metaDescription:
      '1件起做 · 8小时专家透明报价 · 确认后72小时开工，现金流友好，完美适配小批量项目与初创团队。',
    metaKeywords: [
      '无起订量制造',
      '小批量加工',
      '小批量CNC',
      '快速打样',
      '低起订量生产'
    ],
    hero: {
      badge: '无MOQ制造',
      title: '小批量制造无需妥协',
      subtitle: '1件起做 · 8小时专家透明报价 · 确认后72小时内开工，让现金流和交付节奏完全可控。',
      stats: [
        { label: '最小起订量', value: '1件' },
        { label: '报价速度', value: '≤8小时' },
        { label: '生产启动', value: '≤72小时' },
        { label: '费用结构', value: '材料/加工/运营拆解' }
      ],
      primaryLink: { text: '获取8小时专家报价', href: '/zh/create-quote' },
      secondaryLink: { text: '估算小批量成本', href: '/zh/calculator' }
    },
    proofPoints: [
      {
        title: '现金流友好',
        description: '无需为100+件MOQ一次性付款，有多少需求就做多少，融资前也能持续迭代。'
      },
      {
        title: '工程协同',
        description: 'AI先诊断可制造性，专家再复核精度、表面与包装要求，避免返工。'
      },
      {
        title: '节点可追踪',
        description: '报价、确认、加工、质检、发货都有时间戳，硬件冲刺节奏清晰可控。'
      }
    ],
    industries: [
      { name: '机器人/具身智能', detail: '末端执行器、底盘零件快速试制，避免囤货。' },
      { name: '电子设备外壳', detail: '低批量 CNC 外壳，支持阳极、喷漆、丝印等表面处理。' },
      { name: '医疗治具（预认证）', detail: '紧固治具/辅具试制，附透明质检流程。' },
      { name: '高校/科研实验室', detail: '学期内需要多轮修改，必须快速锁定小批量产能。' }
    ],
    useCases: [
      {
        title: '机器人/具身智能试制',
        description: '末端执行器、底盘模块迭代无需囤货，配合透明报价控制现金流。',
        href: '/zh/case-studies',
        cta: '查看机器人案例'
      },
      {
        title: '医疗治具小批量',
        description: '有限数量的治具/辅具依然附带质检报告与可追溯记录。',
        href: '/zh/services',
        cta: '了解能力'
      },
      {
        title: '预算规划',
        description: '借助透明定价模型，提前对比不同材料、批量的单价，避免被 MOQ 限制。',
        href: '/zh/transparent-pricing',
        cta: '查看定价'
      }
    ],
    process: [
      { label: '上传文件', detail: 'STEP、STL、DXF 或原生格式 + 关键尺寸/公差说明。' },
      { label: 'AI+专家复核（≤8h）', detail: '可制造性反馈 + 成本拆解，附修改建议。' },
      { label: '锁定产能（≤72h）', detail: '确认后立即排程，材料、夹具与检具同步就位。' },
      { label: '小批量交付', detail: '附 CMM/检测报告，收集反馈，准备下一轮迭代。' }
    ],
    cta: {
      title: '准备告别“MOQ起步价”了吗？',
      description: '一次上传 CAD，8 小时获取透明报价，确认后立即排程，中文工程师全程跟进。',
      primary: { text: '从1件开始', href: '/zh/create-quote' },
      secondary: { text: '预约工程师沟通', href: '/zh/contact' },
      note: '零隐藏费用 • 透明进度 • 中英双语技术支持'
    }
  }
}
