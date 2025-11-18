import type { Locale } from './contact'

// Re-export Locale to avoid circular imports
export type ResourcesLocale = Locale

export const resourceCategories = [
  'manufacturing-guides',
  'cnc-machining',
  'materials-science',
  'design-tips',
  'industry-insights',
  'automation-ai',
  'quality-control',
  'cost-optimization'
] as const

export type ResourceCategory = (typeof resourceCategories)[number]

export const resourceCollections: Record<ResourcesLocale, 'resources-en' | 'resources'> = {
  en: 'resources-en',
  zh: 'resources'
}

export const resourceCategoryIcons: Record<ResourceCategory, string> = {
  'manufacturing-guides': '🏭',
  'cnc-machining': '⚙️',
  'materials-science': '🧪',
  'design-tips': '✏️',
  'industry-insights': '📈',
  'automation-ai': '🤖',
  'quality-control': '🎯',
  'cost-optimization': '💰'
}

export const resourceCategoryLabels: Record<ResourcesLocale, Record<ResourceCategory, string>> = {
  en: {
    'manufacturing-guides': 'Manufacturing Guides',
    'cnc-machining': 'CNC Machining',
    'materials-science': 'Materials Science',
    'design-tips': 'Design Tips',
    'industry-insights': 'Industry Insights',
    'automation-ai': 'Automation & AI',
    'quality-control': 'Quality Control',
    'cost-optimization': 'Cost Optimization'
  },
  zh: {
    'manufacturing-guides': '制造指南',
    'cnc-machining': 'CNC加工',
    'materials-science': '材料科学',
    'design-tips': '设计技巧',
    'industry-insights': '行业洞察',
    'automation-ai': '自动化与AI',
    'quality-control': '质量控制',
    'cost-optimization': '成本优化'
  }
}

type CTA = {
  text: string
  href: string
  isAnchor?: boolean
}

type ResourcesPageContent = {
  seo: {
    title: string
    description: string
    keywords: string[]
  }
  hero: {
    title: string
    subtitle: string
    primary: CTA
    secondary: CTA
  }
  featured: {
    title: string
    subtitle: string
  }
  categoriesSection: {
    title: string
    subtitle: string
    viewAllLabel: string
    countSuffix: string
  }
  readingTimeUnit: string
  categoryPage: {
    breadcrumbHome: string
    breadcrumbResources: string
    heroDescriptionPrefix: string
    heroDescriptionSuffix: string
    articleCountSuffix: string
    readingTimeUnit: string
    featuredLabel: string
    readMoreLabel: string
    emptyTitle: string
    emptyDescription: string
    browseAllLabel: string
    getQuoteLabel: string
  }
  popularTagsSection: {
    title: string
    subtitle: string
    activeFilterLabel: string
    clearFilterLabel: string
    emptyLabel: string
  }
  internalLinksSection: {
    title: string
    subtitle: string
    cards: {
      title: string
      description: string
      href: string
      linkLabel: string
      icon: string
    }[]
  }
  related: {
    title: string
  }
  cta: {
    title: string
    subtitle: string
    primary: CTA
    secondary: CTA
  }
}

export const resourcesPageContent: Record<ResourcesLocale, ResourcesPageContent> = {
  en: {
    seo: {
      title: 'Geppetto Manufacturing Resources - CNC Guides & Industry Insights',
      description:
        'Deep dive into CNC machining, materials science, design optimization and manufacturing expertise. Get professional manufacturing guides to improve quality and efficiency.',
      keywords: [
        'CNC machining guide',
        'manufacturing knowledge',
        'materials science',
        'design optimization',
        'quality control',
        'cost optimization',
        'smart manufacturing',
        'transparent manufacturing'
      ]
    },
    hero: {
      title: 'Manufacturing Knowledge Hub',
      subtitle: 'Deep Manufacturing Insights • Expert Guides • Industry Best Practices',
      primary: { text: 'Get Expert Quote', href: '/create-quote' },
      secondary: { text: 'Browse Resources', href: '#categories', isAnchor: true }
    },
    featured: {
      title: 'Featured Articles',
      subtitle: 'Expert insights to power your manufacturing decisions'
    },
    categoriesSection: {
      title: 'Browse by Category',
      subtitle: 'Deep dive into manufacturing knowledge by expertise area',
      viewAllLabel: 'View All',
      countSuffix: 'articles'
    },
    readingTimeUnit: 'min',
    categoryPage: {
      breadcrumbHome: 'Home',
      breadcrumbResources: 'Resources',
      heroDescriptionPrefix: 'Explore professional articles and manufacturing guides related to ',
      heroDescriptionSuffix: '',
      articleCountSuffix: 'articles',
      readingTimeUnit: 'min',
      featuredLabel: '⭐ Featured',
      readMoreLabel: 'Read Full Article →',
      emptyTitle: 'No Articles Yet',
      emptyDescription: 'There are no published articles in this category yet',
      browseAllLabel: '📚 Browse All Resources',
      getQuoteLabel: '🚀 Get Manufacturing Quote'
    },
    popularTagsSection: {
      title: 'Popular Topics',
      subtitle: 'Engineers most frequently search these sourcing keywords',
      activeFilterLabel: 'Filtering articles by tag {tag}',
      clearFilterLabel: 'Clear filter',
      emptyLabel: 'No articles are published under this tag yet'
    },
    internalLinksSection: {
      title: 'Extend your sourcing journey',
      subtitle: 'Bridge resources with services, proof, and transparent quotes.',
      cards: [
        {
          title: 'Manufacturing Services',
          description: 'Compare CNC, finishing, and flexible production packages built for startup and SMB hardware teams.',
          href: '/services',
          linkLabel: 'Explore Services →',
          icon: '🛠️'
        },
        {
          title: 'Transparent Quotes',
          description: 'Upload drawings for 8-hour AI pre-check plus expert validation with itemized pricing.',
          href: '/create-quote',
          linkLabel: 'Upload Files →',
          icon: '🧮'
        },
        {
          title: 'Customer Proof',
          description: 'See how similar teams shipped production runs with Geppetto.',
          href: '/case-studies',
          linkLabel: 'Browse Case Studies →',
          icon: '📂'
        }
      ]
    },
    related: {
      title: 'Related Articles'
    },
    cta: {
      title: 'Turn Knowledge into Real Production',
      subtitle: 'Get transparent quotes and experience expert manufacturing services',
      primary: { text: 'Upload Files for Quote', href: '/create-quote' },
      secondary: { text: '💬 Consult Expert', href: '/contact' }
    }
  },
  zh: {
    seo: {
      title: 'Geppetto制造资源 - CNC加工指南与行业洞察',
      description: '深入了解CNC加工、材料科学、设计优化等制造领域专业知识。获取专家级制造指南，提升产品质量和生产效率。',
      keywords: [
        'CNC加工指南',
        '制造业知识',
        '材料科学',
        '设计优化',
        '质量控制',
        '成本优化',
        '智能制造',
        'AI制造'
      ]
    },
    hero: {
      title: '制造知识库',
      subtitle: '深度制造洞察 • 专家级指南 • 行业最佳实践',
      primary: { text: '获取专家报价', href: '/create-quote' },
      secondary: { text: '浏览资源', href: '#categories', isAnchor: true }
    },
    featured: {
      title: '⭐ 推荐文章',
      subtitle: '精选专家深度解析，助力制造决策'
    },
    categoriesSection: {
      title: '按主题浏览',
      subtitle: '按领域解锁更多高价值制造知识',
      viewAllLabel: '查看全部',
      countSuffix: '篇文章'
    },
    readingTimeUnit: '分钟',
    categoryPage: {
      breadcrumbHome: '首页',
      breadcrumbResources: '资源',
      heroDescriptionPrefix: '深入了解',
      heroDescriptionSuffix: '相关的制造知识与实战经验',
      articleCountSuffix: '篇文章',
      readingTimeUnit: '分钟',
      featuredLabel: '⭐ 推荐',
      readMoreLabel: '阅读全文 →',
      emptyTitle: '暂时没有文章',
      emptyDescription: '该分类暂未发布文章，敬请期待。',
      browseAllLabel: '📚 返回全部资源',
      getQuoteLabel: '🚀 获取制造报价'
    },
    popularTagsSection: {
      title: '热门主题',
      subtitle: '工程采购团队最常搜索的制造问题',
      activeFilterLabel: '当前按标签 {tag} 进行筛选',
      clearFilterLabel: '清除筛选',
      emptyLabel: '该标签暂时没有文章'
    },
    internalLinksSection: {
      title: '把知识转化为行动',
      subtitle: '结合服务、案例与透明报价，迅速推进项目决策。',
      cards: [
        {
          title: '制造服务目录',
          description: '查看 CNC、柔性生产、表面处理等服务包，匹配初创与中小批量团队。',
          href: '/services',
          linkLabel: '查看服务 →',
          icon: '🛠️'
        },
        {
          title: '透明报价中心',
          description: '上传图纸，8 小时内获得 AI 预审 + 专家复核的拆解式报价。',
          href: '/create-quote',
          linkLabel: '获取报价 →',
          icon: '🧮'
        },
        {
          title: '客户成功案例',
          description: '了解相似团队如何通过 Geppetto 完成量产。',
          href: '/case-studies',
          linkLabel: '浏览案例 →',
          icon: '📂'
        }
      ]
    },
    related: {
      title: '相关文章'
    },
    cta: {
      title: '让知识转化为实际生产力',
      subtitle: '立即获取透明报价，体验专家级制造服务',
      primary: { text: '上传文件获取报价', href: '/create-quote' },
      secondary: { text: '💬 咨询制造专家', href: '/contact' }
    }
  }
}
