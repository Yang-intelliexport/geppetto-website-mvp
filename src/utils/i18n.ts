// Internationalization utilities
export const languages = {
  en: 'English',
  zh: '中文'
} as const;

export type Language = keyof typeof languages;

export const defaultLanguage: Language = 'en';

// URL structure: /en/... for English, /zh/... for Chinese
export function getLanguageFromUrl(url: URL): Language {
  const pathname = url.pathname;
  const langCode = pathname.split('/')[1];
  
  if (langCode && langCode in languages) {
    return langCode as Language;
  }
  
  return defaultLanguage;
}

// Get localized path
export function getLocalizedPath(path: string, lang: Language): string {
  if (lang === defaultLanguage) {
    return path === '/' ? '/en' : `/en${path}`;
  }
  return path === '/' ? `/${lang}` : `/${lang}${path}`;
}

// Remove language prefix from path
export function removeLanguagePrefix(path: string): string {
  const segments = path.split('/');
  if (segments[1] && segments[1] in languages) {
    return '/' + segments.slice(2).join('/') || '/';
  }
  return path;
}

// Check if path has language prefix
export function hasLanguagePrefix(path: string): boolean {
  const segments = path.split('/');
  return segments[1] && segments[1] in languages;
}

// Translations
export const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'Why Geppetto',
    'nav.contact': 'Contact',
    'nav.quote': 'Get Quote',
    
    // Common
    'common.getQuote': 'Get Quote',
    'common.contactUs': 'Contact Us',
    'common.learnMore': 'Learn More',
    'common.phone': 'Phone',
    'common.email': 'Email',
    'common.precision': 'Precision',
    'common.delivery': 'Delivery',
    'common.costSaving': 'Cost Saving',
    'common.noMOQ': 'No MOQ',
    
    // Home page
    'home.title': 'CNC Quote | AI-Powered Precision Manufacturing | Geppetto',
    'home.description': 'Get instant CNC quotes with AI analysis in seconds, expert validation in 4-8 hours. ±0.05mm precision, 24-hour delivery, no MOQ limits. Leading US precision manufacturing.',
    'home.hero.title': 'Get Instant CNC Quotes',
    'home.hero.subtitle': '🚀 AI-Powered Manufacturing Revolution',
    'home.hero.description': 'AI analysis in seconds, expert validation in 4-8 hours with precise quotes.\n±0.05mm precision • 24-hour delivery • No MOQ limits • 50-70% cost savings',
    
    // Advantages
    'advantages.smartQuote.title': 'Instant CNC Quote Promise',
    'advantages.smartQuote.description': 'AI analysis in seconds, expert technical validation within 4-8 hours with precise quotes',
    'advantages.fastDelivery.title': '24-Hour Rush Order Delivery',
    'advantages.fastDelivery.description': 'AI-optimized production scheduling and intelligent process planning for industry-leading delivery speed',
    'advantages.noMOQ.title': 'No MOQ - Single Part Manufacturing',
    'advantages.noMOQ.description': 'AI-driven smart manufacturing makes small-batch production economically viable',
    'advantages.costEfficiency.title': 'Maximum Cost Efficiency',
    'advantages.costEfficiency.description': 'AI+expert model dramatically reduces labor costs, direct supply chain eliminates middlemen',
    
    // Contact
    'contact.title': 'Contact Us | Geppetto AI Manufacturing | Get Quote',
    'contact.hero.title': 'Contact Geppetto Expert Team',
    'contact.hero.subtitle': '24/7 Support • AI-Powered Quotes • Professional Engineering Services',
    'contact.phone.number': '+1-800-XXX-XXXX',
    'contact.phone.hours': 'Business Hours: 8AM-6PM EST',
    'contact.email.address': 'quotes@geppetto.com',
    'contact.email.response': 'Response within 4 hours',
    
    // Trust indicators
    'trust.title': 'Trusted by Industry Leaders',
    'trust.certifications': 'Industry certifications and quality standards',
    'trust.customers': 'Satisfied Customers',
    'trust.onTimeDelivery': 'On-Time Delivery',
    'trust.support': 'Engineering Support',
    'trust.setupFees': 'Setup Fees'
  },
  
  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.services': '服务',
    'nav.about': '为什么选择我们',
    'nav.contact': '联系我们',
    'nav.quote': '获取报价',
    
    // Common
    'common.getQuote': '获取报价',
    'common.contactUs': '联系我们',
    'common.learnMore': '了解更多',
    'common.phone': '电话',
    'common.email': '邮箱',
    'common.precision': '精度',
    'common.delivery': '交付',
    'common.costSaving': '成本节省',
    'common.noMOQ': '无起订量',
    
    // Home page
    'home.title': 'Geppetto - AI驱动的精密制造革命',
    'home.description': '体验Geppetto智能报价承诺：AI秒级分析，专家团队4-8工作小时内完成技术复核与精确报价。±0.05mm精度，24小时交付，无MOQ限制。',
    'home.hero.title': '体验 Geppetto智能报价承诺',
    'home.hero.subtitle': '🚀 AI驱动制造革命',
    'home.hero.description': 'AI秒级分析，专家团队4-8工作小时内完成技术复核与精确报价。\n±0.05mm精度 • 24小时交付 • 无MOQ限制 • 成本节省50-70%',
    
    // Advantages
    'advantages.smartQuote.title': 'Geppetto智能报价承诺',
    'advantages.smartQuote.description': 'AI秒级分析，专家团队4-8工作小时内完成技术复核与精确报价',
    'advantages.fastDelivery.title': '24小时极速交付',
    'advantages.fastDelivery.description': 'AI优化生产调度，智能工艺规划，实现行业领先的交付速度',
    'advantages.noMOQ.title': '单件起做 无MOQ限制',
    'advantages.noMOQ.description': 'AI驱动的智能制造模式，让小批量生产也具备经济性',
    'advantages.costEfficiency.title': '极致性价比',
    'advantages.costEfficiency.description': 'AI+专家模式大幅降低人力成本，直供模式减少中间环节',
    
    // Contact
    'contact.title': '联系我们 | Geppetto - AI智能制造',
    'contact.hero.title': '联系Geppetto专业团队',
    'contact.hero.subtitle': '24小时在线支持 • AI智能报价 • 专业工程师服务',
    'contact.phone.number': '400-XXX-XXXX',
    'contact.phone.hours': '工作时间: 9:00-18:00',
    'contact.email.address': 'business@geppetto.com',
    'contact.email.response': '24小时内回复',
    
    // Trust indicators
    'trust.title': '行业领先认证',
    'trust.certifications': '行业认证和质量标准确保制造符合最高要求',
    'trust.customers': '满意客户',
    'trust.onTimeDelivery': '准时交付',
    'trust.support': '技术支持',
    'trust.setupFees': '设置费用'
  }
} as const;

// Get translation function
export function getTranslations(lang: Language) {
  return translations[lang];
}

// Translate function
export function t(key: string, lang: Language): string {
  // Direct key lookup for flat structure
  const value = translations[lang]?.[key];
  
  if (!value) {
    console.warn(`Translation missing for key: ${key}, lang: ${lang}`);
    return key;
  }
  
  return value;
}