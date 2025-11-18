export type Locale = 'en' | 'zh'

type Stat = { label: string; value: string }
type Feature = { icon: string; title: string; description: string }
type FAQ = { question: string; answer: string }
type CTA = {
  title: string
  subtitle: string
  primary: { text: string; href: string }
  secondary: { text: string; href: string }
}

type CalculatorContent = {
  metaTitle: string
  metaDescription: string
  heroTitle: string
  heroSubtitle: string
  heroStats: Stat[]
  features: Feature[]
  faq: FAQ[]
  cta: CTA
}

export const calculatorContent: Record<Locale, CalculatorContent> = {
  en: {
    metaTitle: 'Manufacturing Cost Calculator | Fast Estimates | Geppetto',
    metaDescription:
      'Get fast manufacturing cost estimates with our AI-powered calculator. Upload CAD files and receive preliminary pricing guidance in under a minute.',
    heroTitle: 'Manufacturing Cost Calculator',
    heroSubtitle: 'Get fast directional cost estimates for your manufacturing projects.',
    heroStats: [
      { label: 'Estimate speed', value: '≈1 minute' },
      { label: 'Materials supported', value: '50+' },
      { label: 'Estimate accuracy', value: '±5%' }
    ],
    features: [
      {
        icon: '⚡',
        title: 'Fast Results',
        description: 'Generate preliminary cost estimates in under a minute—ideal for early budgeting.'
      },
      {
        icon: '🤖',
        title: 'AI Powered',
        description: 'Backed by real manufacturing data and machine learning to reflect true production costs.'
      },
      {
        icon: '✓',
        title: 'No Commitment',
        description: 'Free to use, no login required, and no obligation to purchase—upgrade to AI quote anytime.'
      }
    ],
    faq: [
      {
        question: 'How accurate are the results?',
        answer:
          'The calculator provides ±5% directional estimates based on geometry, materials, and finish requirements. Upload your CAD for an exact AI quote.'
      },
      {
        question: 'Which materials and processes are supported?',
        answer:
          '50+ metals and polymers with CNC, turning, finishing, and more. Use the AI quote flow to specify custom requirements.'
      },
      {
        question: 'Can I save or compare estimates?',
        answer:
          'Yes. Save results or export them for budgeting. When you are ready, submit the CAD file for a detailed expert-reviewed quote.'
      }
    ],
    cta: {
      title: 'Ready for a Precise Quote?',
      subtitle: 'Upload your CAD file for an AI-powered quote with detailed analysis and 8-hour expert review.',
      primary: { text: 'Get AI Quote Now', href: '/en/create-quote' },
      secondary: { text: 'Talk to an Engineer', href: '/en/contact' }
    }
  },
  zh: {
    metaTitle: '成本计算器 | Geppetto - 精密制造成本估算工具',
    metaDescription:
      '使用 Geppetto 成本计算器快速估算精密制造项目成本。支持多种材料、工艺和批量，提供透明的成本分解与参考。',
    heroTitle: '🧮 成本计算器',
    heroSubtitle: '快速评估您的精密制造项目成本，获得透明详尽的价格分析。',
    heroStats: [
      { label: '计算速度', value: '约1分钟' },
      { label: '材料选择', value: '50+' },
      { label: '精度保证', value: '±5%' }
    ],
    features: [
      {
        icon: '🎯',
        title: '精度保证',
        description: '基于 1000+ 实际项目训练，考虑材料波动和工艺复杂度，预估精度达 ±5%。'
      },
      {
        icon: '⚡',
        title: '极速计算',
        description: 'AI 驱动算法在约 1 分钟内完成复杂成本分析，支持多种材料和工艺组合。'
      },
      {
        icon: '💎',
        title: '透明分解',
        description: '材料、加工、表面处理等费用逐项展示，让预算规划一目了然。'
      }
    ],
    faq: [
      {
        question: '计算结果可靠吗？',
        answer:
          '算法基于大量真实项目数据训练，可提供 ±5% 的预估参考。若需准确报价，请上传 CAD 由专家复核。'
      },
      {
        question: '支持哪些材料和工艺？',
        answer:
          '支持 50+ 常用材料（铝、不锈钢、钛合金等）以及铣削、车削、表面处理等主要工艺。'
      },
      {
        question: '结果可以保存吗？',
        answer: '可以保存历史记录并导出用于预算。提交 CAD 后可获得详细的专家报价与技术建议。'
      }
    ],
    cta: {
      title: '准备获取精准报价？',
      subtitle: '计算器只是开始，上传 CAD 由 AI + 专家提供 8 小时透明报价与技术建议。',
      primary: { text: '📄 上传文件获取报价', href: '/zh/create-quote' },
      secondary: { text: '💬 联系技术专家', href: '/zh/contact' }
    }
  }
}
