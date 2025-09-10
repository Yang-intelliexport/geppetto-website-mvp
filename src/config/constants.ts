// 网站配置常量 - 统一管理所有硬编码内容
export const SITE_CONFIG = {
  // 基本信息
  name: 'Geppetto',
  tagline: '智能弹性 Precision Manufacturing',
  domain: 'geppetto.studio',
  supportEmail: 'business@geppetto.studio',
  businessEmail: 'business@geppetto.studio',
  quotesEmail: 'hello@geppetto.studio',
  
  // 联系信息
  contact: {
    phone: {
      international: '+86 13511091304',
      cn: '+86 13511091304',
      hours: {
        en: 'Global Support: 工作时间 Available',
        zh: '工作时间: 9:00-18:00'
      }
    },
    response: {
      email: '4 hours',
      quote: '4-8 hours'
    }
  },

  // 技术规格
  manufacturing: {
    precision: 'Project-specific',
    delivery: '24 hours',
    minOrderQty: 1,
    costSavings: '50-70%',
    materials: [
      { id: 'aluminum-6061', name: '6061-T6 铝合金', nameEn: '6061-T6 Aluminum', price: 18 },
      { id: 'stainless-304', name: '304不锈钢', nameEn: '304 Stainless Steel', price: 25 },
      { id: 'carbon-steel', name: '碳钢', nameEn: 'Carbon Steel', price: 15 },
      { id: 'abs-plastic', name: 'ABS塑料', nameEn: 'ABS Plastic', price: 8 },
      { id: 'custom', name: '其他材料', nameEn: 'Custom Material', price: 0 }
    ],
    finishes: [
      { id: 'anodized', name: '阳极氧化', nameEn: 'Anodized' },
      { id: 'powder-coating', name: '粉末涂装', nameEn: 'Powder Coating' },
      { id: 'electroplating', name: '电镀', nameEn: 'Electroplating' },
      { id: 'raw', name: '原始表面', nameEn: 'Raw Finish' }
    ]
  },

  // 文件上传
  fileUpload: {
    maxSize: 50, // MB
    allowedTypes: ['.step', '.stp', '.stl', '.iges', '.igs', '.dwg', '.dxf', '.obj', '.ply', '.3mf'],
    maxFiles: 5
  },

  // 表单验证
  validation: {
    name: {
      minLength: 2,
      maxLength: 50
    },
    company: {
      maxLength: 100
    },
    phone: {
      pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$|^(?:(?:\+|00)86)?(?:0\d{2,3}-?)?\d{7,8}$|^[\+]?[1-9][\d]{0,15}$/
    },
    quantity: {
      min: 1,
      max: 10000
    }
  },

  // UI配置
  ui: {
    defaultLanguage: 'zh',
    supportedLanguages: ['zh', 'en'],
    theme: {
      primary: '#7F00FF',
      secondary: '#00BFFF',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444'
    }
  },

  // 第三方服务
  services: {
    analytics: {
      googleId: process.env.PUBLIC_GA_MEASUREMENT_ID,
      hotjarId: process.env.HOTJAR_ID
    }
  }
} as const;

// 类型定义
export type MaterialType = typeof SITE_CONFIG.manufacturing.materials[number];
export type FinishType = typeof SITE_CONFIG.manufacturing.finishes[number];
export type Language = typeof SITE_CONFIG.ui.supportedLanguages[number];

// 辅助函数
export const getMaterialById = (id: string) => 
  SITE_CONFIG.manufacturing.materials.find(m => m.id === id);

export const getContactInfo = (lang: Language = 'zh') => ({
  phone: lang === 'zh' ? SITE_CONFIG.contact.phone.cn : SITE_CONFIG.contact.phone.international,
  hours: SITE_CONFIG.contact.phone.hours[lang],
  email: SITE_CONFIG.quotesEmail
});