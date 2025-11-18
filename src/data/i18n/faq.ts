export type Locale = 'en' | 'zh'

type CategoryDefinition = {
  id: string
  label: string
  icon: string
  filterClasses: string
  badgeClasses: string
}

type ContactCard = {
  icon?: string
  title: string
  description: string
  note: string
}

type CTA = {
  text: string
  href: string
}

type FaqPageContent = {
  metaTitle: string
  metaDescription: string
  heroTitle: string
  heroSubtitle: string
  quickNavTitle: string
  searchPlaceholder: string
  featuredTitle: string
  featuredSubtitle: string
  categoriesTitle: string
  categoriesSubtitle: string
  categoriesAllLabel: string
  popularBadgeLabel: string
  contactTitle: string
  contactSubtitle: string
  contactCards: ContactCard[]
  contactPrimaryCTA: CTA
  contactSecondaryCTA: CTA
  contactNote: string
  categories: CategoryDefinition[]
}

export const faqPageContent: Record<Locale, FaqPageContent> = {
  en: {
    metaTitle: 'FAQ | Geppetto - AI-Enhanced Expert Manufacturing Partner FAQ',
    metaDescription:
      'Geppetto AI-enhanced expert manufacturing FAQ, covering transparent pricing, AI technology, quality, delivery, MOQ, and other core topics.',
    heroTitle: '💡 Frequently Asked Questions',
    heroSubtitle: 'Everything you need to know about Geppetto AI + Expert Manufacturing',
    quickNavTitle: '🚀 Popular Questions Quick Navigation',
    searchPlaceholder: '🔍 Search questions you care about...',
    featuredTitle: 'Most Popular Questions',
    featuredSubtitle: '90% of customers care about these core questions',
    categoriesTitle: '📚 All Questions by Category',
    categoriesSubtitle: 'Detailed Q&A organized by topic',
    categoriesAllLabel: '🔍 All Categories',
    popularBadgeLabel: '⭐ Popular',
    contactTitle: "🤔 Can't Find Your Answer?",
    contactSubtitle: 'Our expert team is ready to answer any questions you have',
    contactCards: [
      {
        icon: '📞',
        title: 'Phone Support',
        description: '+86 13511091304',
        note: 'Business Hours expert online'
      },
      {
        icon: '💬',
        title: 'Live Chat',
        description: 'Real-time Q&A',
        note: 'Business Hours Global Support Available'
      },
      {
        icon: '✉️',
        title: 'Email Support',
        description: 'hello@geppetto.studio',
        note: 'Response within 8 hours (business days)'
      }
    ],
    contactPrimaryCTA: {
      text: '💬 Contact Expert Now',
      href: '/en/contact'
    },
    contactSecondaryCTA: {
      text: '🤖 AI-Enhanced Expert Quote',
      href: '/en/create-quote'
    },
    contactNote: "💡 Every question is an opportunity to improve our service—don't hesitate to contact us.",
    categories: [
      {
        id: 'pricing',
        label: 'Pricing & Cost',
        icon: '💰',
        filterClasses: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
        badgeClasses: 'bg-blue-100 text-blue-700'
      },
      {
        id: 'ai',
        label: 'AI Technology',
        icon: '🤖',
        filterClasses: 'bg-green-100 text-green-700 hover:bg-green-200',
        badgeClasses: 'bg-green-100 text-green-700'
      },
      {
        id: 'quality',
        label: 'Quality & Precision',
        icon: '🎯',
        filterClasses: 'bg-red-100 text-red-700 hover:bg-red-200',
        badgeClasses: 'bg-red-100 text-red-700'
      },
      {
        id: 'delivery',
        label: 'Delivery Time',
        icon: '⚡',
        filterClasses: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
        badgeClasses: 'bg-yellow-100 text-yellow-700'
      },
      {
        id: 'moq',
        label: 'Minimum Order',
        icon: '📦',
        filterClasses: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200',
        badgeClasses: 'bg-indigo-100 text-indigo-700'
      },
      {
        id: 'materials',
        label: 'Material Support',
        icon: '🔧',
        filterClasses: 'bg-pink-100 text-pink-700 hover:bg-pink-200',
        badgeClasses: 'bg-pink-100 text-pink-700'
      },
      {
        id: 'payments',
        label: 'Payment Terms',
        icon: '💳',
        filterClasses: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
        badgeClasses: 'bg-gray-100 text-gray-700'
      },
      {
        id: 'service',
        label: 'Service Support',
        icon: '🛡️',
        filterClasses: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
        badgeClasses: 'bg-gray-100 text-gray-700'
      },
      {
        id: 'advantages',
        label: 'Competitive Advantages',
        icon: '🏆',
        filterClasses: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
        badgeClasses: 'bg-gray-100 text-gray-700'
      },
      {
        id: 'security',
        label: 'Security & Privacy',
        icon: '🔒',
        filterClasses: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
        badgeClasses: 'bg-gray-100 text-gray-700'
      }
    ]
  },
  zh: {
    metaTitle: '常见问题 | Geppetto - AI驱动精密制造 FAQ',
    metaDescription: 'Geppetto AI+学徒制造常见问题解答，涵盖定价、AI技术、质量精度、交付时间、起订量等核心问题。',
    heroTitle: '💡 常见问题解答',
    heroSubtitle: '关于Geppetto AI+学徒制造的疑问，这里都有答案',
    quickNavTitle: '🚀 热门问题快速导航',
    searchPlaceholder: '🔍 搜索你关心的问题...',
    featuredTitle: '⭐ 最受关注的问题',
    featuredSubtitle: '90%的客户都在关注这些核心问题',
    categoriesTitle: '📚 全部问题分类',
    categoriesSubtitle: '按主题分类的详细问题解答',
    categoriesAllLabel: '🔍 全部分类',
    popularBadgeLabel: '⭐ 热门',
    contactTitle: '🤔 没找到你想要的答案？',
    contactSubtitle: '我们的专家团队随时准备解答你的疑问',
    contactCards: [
      {
        icon: '📞',
        title: '电话支持',
        description: '+86 13511091304',
        note: '工作时间专家在线'
      },
      {
        icon: '💬',
        title: '在线咨询',
        description: '实时互动问答',
        note: '工作时间全球支持'
      },
      {
        icon: '✉️',
        title: '邮件支持',
        description: 'hello@geppetto.studio',
        note: '工作日8小时内回复'
      }
    ],
    contactPrimaryCTA: {
      text: '💬 立即联系专家',
      href: '/zh/contact'
    },
    contactSecondaryCTA: {
      text: '🤖 AI专家报价',
      href: '/zh/create-quote'
    },
    contactNote: '💡 每个问题都是改进服务的机会，随时欢迎联系。',
    categories: [
      {
        id: 'pricing',
        label: '定价成本',
        icon: '💰',
        filterClasses: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
        badgeClasses: 'bg-blue-100 text-blue-700'
      },
      {
        id: 'ai',
        label: 'AI技术',
        icon: '🤖',
        filterClasses: 'bg-green-100 text-green-700 hover:bg-green-200',
        badgeClasses: 'bg-green-100 text-green-700'
      },
      {
        id: 'quality',
        label: '质量精度',
        icon: '🎯',
        filterClasses: 'bg-red-100 text-red-700 hover:bg-red-200',
        badgeClasses: 'bg-red-100 text-red-700'
      },
      {
        id: 'delivery',
        label: '交付时间',
        icon: '⚡',
        filterClasses: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
        badgeClasses: 'bg-yellow-100 text-yellow-700'
      },
      {
        id: 'moq',
        label: '起订量',
        icon: '📦',
        filterClasses: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200',
        badgeClasses: 'bg-indigo-100 text-indigo-700'
      },
      {
        id: 'materials',
        label: '材料能力',
        icon: '🔧',
        filterClasses: 'bg-pink-100 text-pink-700 hover:bg-pink-200',
        badgeClasses: 'bg-pink-100 text-pink-700'
      },
      {
        id: 'payments',
        label: '付款账期',
        icon: '💳',
        filterClasses: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
        badgeClasses: 'bg-gray-100 text-gray-700'
      },
      {
        id: 'service',
        label: '售后服务',
        icon: '🛡️',
        filterClasses: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
        badgeClasses: 'bg-gray-100 text-gray-700'
      },
      {
        id: 'advantages',
        label: '竞争优势',
        icon: '🏆',
        filterClasses: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
        badgeClasses: 'bg-gray-100 text-gray-700'
      },
      {
        id: 'security',
        label: '安全隐私',
        icon: '🔒',
        filterClasses: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
        badgeClasses: 'bg-gray-100 text-gray-700'
      }
    ]
  }
}

export const faqCollectionByLocale: Record<Locale, 'faqs-en' | 'faqs'> = {
  en: 'faqs-en',
  zh: 'faqs'
}
