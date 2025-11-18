export type Locale = 'en' | 'zh'

type HeroStat = {
  label: string
  value: string
}

type ValueCard = {
  icon: string
  title: string
  description: string
}

type Leader = {
  name: string
  role: string
  description: string
}

type Highlight = {
  icon: string
  title: string
  description: string
}

type CTA = {
  title: string
  subtitle: string
  primary: { label: string; href: string }
  secondary: { label: string; href: string }
}

type AboutContent = {
  seo: {
    title: string
    description: string
  }
  hero: {
    title: string
    subtitle: string
    stats: HeroStat[]
  }
  story: string[]
  missionSubtitle: string
  values: ValueCard[]
  leadership: Leader[]
  qualityHighlights: Highlight[]
  cta: CTA
}

export const aboutContent: Record<Locale, AboutContent> = {
  en: {
    seo: {
      title: 'About Geppetto | Precision Manufacturing Partner',
      description:
        'Bridging the gap between design and manufacturing. Our engineer-led team combines AI efficiency with craftsmanship to deliver parts that meet strict industrial standards.'
    },
    hero: {
      title: 'Building the Most Trusted Manufacturing Partner for Startups',
      subtitle:
        'We merge AI + expert review to deliver quotes in hours, 72-hour production, and a radical level of transparency for hardware teams.',
      stats: [
        { label: 'Average Production Lead Time', value: '<72h' },
        { label: 'Manufacturing Partners', value: '120+' },
        { label: 'Quote Accuracy', value: '±3%' },
        { label: 'Repeat Customers', value: '78%' }
      ]
    },
    story: [
      'Geppetto started with a simple frustration: hardware founders spend weeks chasing reliable manufacturing partners and transparent quotes.',
      'Today we operate a distributed manufacturing network across Shenzhen, Shanghai, and Suzhou, powered by an AI review engine and a vetted expert team.',
      'Every quote is broken down line-by-line so founders, engineers, and finance teams can make confident decisions without hidden fees.'
    ],
    missionSubtitle: 'AI-assisted transparency with expert craftsmanship—designed for fast-moving teams.',
    values: [
      {
        icon: '🤝',
        title: 'Radical Transparency',
        description: 'Every quote includes a clear explanation of material, machining, finishing, and logistics costs.'
      },
      {
        icon: '⚙️',
        title: 'Craft Excellence',
        description: 'Our partner shops pass 60+ inspection checkpoints covering equipment, metrology, and process control.'
      },
      {
        icon: '🚀',
        title: 'Founder Speed',
        description: 'Minutes to request, hours to quote, three days to ship. We build for teams that iterate fast.'
      }
    ],
    leadership: [
      {
        name: 'Lena Zhou',
        role: 'Head of Manufacturing',
        description: '15 years managing precision machining programs for aerospace and robotics OEMs.'
      },
      {
        name: 'Ethan Wang',
        role: 'AI Systems Lead',
        description: 'Former ML infra engineer at a global tech company; now focused on manufacturability intelligence.'
      },
      {
        name: 'Maria Chen',
        role: 'Customer Success Director',
        description: 'Previously led operations at a hardware accelerator, helping 200+ startups launch physical products.'
      }
    ],
    qualityHighlights: [
      {
        icon: '🧪',
        title: 'DFM + AI Review',
        description: 'Automated geometry extraction with AI confidence score and human verification.'
      },
      {
        icon: '📏',
        title: 'Precision Playbooks',
        description: 'Documented tolerance playbooks covering 3/4/5-axis CNC, turning, and finishing.'
      },
      {
        icon: '🔍',
        title: 'Full Traceability',
        description: 'Every job includes inspection photos, reports, and lot-level material certificates.'
      },
      {
        icon: '💡',
        title: 'Continuous Improvement',
        description: 'Feedback from each run feeds the partner scoring system and quoting heuristics.'
      }
    ],
    cta: {
      title: 'Ready to experience transparent manufacturing?',
      subtitle: 'Upload CAD files for a zero-obligation quote with expert review in 8 hours.',
      primary: { label: 'Get a Quote', href: '/create-quote' },
      secondary: { label: 'Talk to Engineering', href: '/contact' }
    }
  },
  zh: {
    seo: {
      title: '关于 Geppetto | 透明制造伙伴',
      description: '了解 Geppetto 如何用 AI + 专家审核，为创业团队提供透明可验证的 CNC 报价与 72 小时交付能力。'
    },
    hero: {
      title: '让硬件团队更快获得可信赖的制造伙伴',
      subtitle: 'AI 预审 + 专家复核，8 小时报价，72 小时生产，确保每一笔费用都清晰可追溯。',
      stats: [
        { label: '平均生产周期', value: '<72小时' },
        { label: '合作工厂', value: '120+' },
        { label: '报价精度', value: '±3%' },
        { label: '回头客户占比', value: '78%' }
      ]
    },
    story: [
      '我们源于一个共同痛点：硬件团队花费大量时间沟通制造商，却难以拿到透明可靠的报价。',
      'Geppetto 以深圳为枢纽，连接华东、华南优质工厂，以 AI 报价引擎 + 专家团队确保质量与速度。',
      '每份报价都会拆解材料、加工、质检、物流成本，帮助创始人和财务快速评估。'
    ],
    missionSubtitle: 'AI 透明度结合专家工艺，为高速迭代的团队而生。',
    values: [
      { icon: '🤝', title: '透明可验证', description: '报价包含每一项成本，方便财务与工程团队共同决策。' },
      { icon: '⚙️', title: '工艺即品牌', description: '合作工厂需通过 60+ 架构化审核，覆盖设备、量检、流程。' },
      { icon: '🚀', title: '创业速度', description: '分钟提交需求、小时级获取报价，三天内完成生产并发货。' }
    ],
    leadership: [
      { name: '周岚', role: '制造负责人', description: '15 年航空与机器人制造项目经验，擅长交付管理。' },
      { name: '王毅', role: 'AI 系统负责人', description: '前国际科技公司机器学习工程师，现专注制造智能。' },
      { name: '陈瑶', role: '客户成功负责人', description: '曾服务 200+ 硬件初创团队，负责交付与沟通。' }
    ],
    qualityHighlights: [
      { icon: '🧪', title: 'AI+专家双重审核', description: '自动提取关键几何参数，并由工程师二次确认。' },
      { icon: '📏', title: '公差手册', description: '覆盖 3/4/5 轴、车削与表面处理的标准化工艺手册。' },
      { icon: '🔍', title: '全链路溯源', description: '每个批次附带检测报告与材质证书，便于追踪。' },
      { icon: '💡', title: '持续优化', description: '每次生产反馈都会反哺报价模型与工厂评分。' }
    ],
    cta: {
      title: '体验透明、快速、可靠的制造服务',
      subtitle: '上传 CAD 文件，8 小时内收到专家复核报价。',
      primary: { label: '立即获取报价', href: '/create-quote' },
      secondary: { label: '联系工程师团队', href: '/contact' }
    }
  }
}
