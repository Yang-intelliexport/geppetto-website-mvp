/**
 * 组件级国际化工具系统
 * 用于统一管理组件的多语言文本和提供类型安全的国际化支持
 */

export type Language = 'zh' | 'en';

// 通用文本定义 - 跨组件复用的常见文本
export const commonTexts = {
  zh: {
    // 通用操作
    loading: '加载中...',
    submit: '提交',
    cancel: '取消',
    confirm: '确认',
    save: '保存',
    delete: '删除',
    edit: '编辑',
    view: '查看',
    back: '返回',
    next: '下一步',
    previous: '上一步',
    close: '关闭',
    retry: '重试',
    
    // 状态文本
    success: '成功',
    error: '错误',
    warning: '警告',
    info: '信息',
    pending: '待处理',
    processing: '处理中',
    completed: '已完成',
    failed: '失败',
    
    // 表单相关
    required: '必填',
    optional: '可选',
    email: '邮箱',
    password: '密码',
    name: '姓名',
    phone: '电话',
    company: '公司',
    address: '地址',
    
    // 文件操作
    upload: '上传',
    download: '下载',
    fileSelected: '已选择文件',
    fileTooLarge: '文件太大',
    invalidFileType: '不支持的文件类型',
    
    // 时间相关
    today: '今天',
    yesterday: '昨天',
    tomorrow: '明天',
    thisWeek: '本周',
    thisMonth: '本月',
    
    // 数据状态
    noData: '暂无数据',
    emptyList: '列表为空',
    searchNoResults: '未找到匹配结果'
  },
  en: {
    // 通用操作
    loading: 'Loading...',
    submit: 'Submit',
    cancel: 'Cancel', 
    confirm: 'Confirm',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    close: 'Close',
    retry: 'Retry',
    
    // 状态文本
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    info: 'Info',
    pending: 'Pending',
    processing: 'Processing',
    completed: 'Completed',
    failed: 'Failed',
    
    // 表单相关
    required: 'Required',
    optional: 'Optional',
    email: 'Email',
    password: 'Password',
    name: 'Name',
    phone: 'Phone',
    company: 'Company',
    address: 'Address',
    
    // 文件操作
    upload: 'Upload',
    download: 'Download',
    fileSelected: 'File Selected',
    fileTooLarge: 'File Too Large',
    invalidFileType: 'Invalid File Type',
    
    // 时间相关
    today: 'Today',
    yesterday: 'Yesterday',
    tomorrow: 'Tomorrow',
    thisWeek: 'This Week',
    thisMonth: 'This Month',
    
    // 数据状态
    noData: 'No Data',
    emptyList: 'Empty List',
    searchNoResults: 'No Results Found'
  }
} as const;

// 业务数据映射 - 常用的业务状态和类型映射
export const businessMappings = {
  // 订单状态映射
  orderStatus: {
    zh: {
      'pending': '待处理',
      'processing': '处理中', 
      'quoted': '已报价',
      'approved': '已确认',
      'in_production': '生产中',
      'completed': '已完成',
      'cancelled': '已取消',
      'shipped': '已发货',
      'delivered': '已交付'
    },
    en: {
      'pending': 'Pending',
      'processing': 'Processing',
      'quoted': 'Quoted', 
      'approved': 'Approved',
      'in_production': 'In Production',
      'completed': 'Completed',
      'cancelled': 'Cancelled',
      'shipped': 'Shipped',
      'delivered': 'Delivered'
    }
  },
  
  // 材料类型映射
  materials: {
    zh: {
      'aluminum': '铝合金',
      'steel': '碳钢',
      'stainless_steel': '不锈钢',
      'brass': '黄铜',
      'titanium': '钛合金',
      'plastic': '塑料',
      'other': '其他'
    },
    en: {
      'aluminum': 'Aluminum',
      'steel': 'Steel',
      'stainless_steel': 'Stainless Steel',
      'brass': 'Brass',
      'titanium': 'Titanium',
      'plastic': 'Plastic',
      'other': 'Other'
    }
  }
} as const;

// 组件专用文本存储
interface ComponentTexts {
  [componentName: string]: {
    zh: Record<string, string>;
    en: Record<string, string>;
  };
}

const componentTexts: ComponentTexts = {};

/**
 * 注册组件的多语言文本
 */
export function registerComponentTexts<T extends Record<string, string>>(
  componentName: string,
  texts: { zh: T; en: T }
): void {
  componentTexts[componentName] = texts;
}

/**
 * 获取组件的国际化文本
 */
export function getComponentTexts<T extends Record<string, string>>(
  componentName: string,
  language: Language
): T {
  const texts = componentTexts[componentName];
  if (!texts) {
    console.warn(`Component texts not found for: ${componentName}`);
    return {} as T;
  }
  return texts[language] as T;
}

/**
 * 获取通用文本
 */
export function getCommonTexts(language: Language) {
  return commonTexts[language];
}

/**
 * 获取业务映射文本
 */
export function getBusinessMapping(
  type: keyof typeof businessMappings,
  language: Language
) {
  return businessMappings[type][language];
}

/**
 * 格式化日期时间
 */
export function formatDateTime(
  dateString: string,
  language: Language,
  options: Intl.DateTimeFormatOptions = {}
): string {
  const date = new Date(dateString);
  const locale = language === 'zh' ? 'zh-CN' : 'en-US';
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  return date.toLocaleDateString(locale, { ...defaultOptions, ...options });
}

/**
 * 创建组件国际化Hook工厂
 */
export function createI18nHook<T extends Record<string, string>>(
  componentName: string,
  defaultTexts: { zh: T; en: T }
) {
  // 注册组件文本
  registerComponentTexts(componentName, defaultTexts);
  
  return function useI18n(language: Language = 'zh') {
    const componentTexts = getComponentTexts<T>(componentName, language);
    const commonTexts = getCommonTexts(language);
    
    // 业务映射快捷方法
    const getOrderStatus = (status: string) => 
      (getBusinessMapping('orderStatus', language) as any)[status] || status;
    
    const getMaterial = (material: string) =>
      (getBusinessMapping('materials', language) as any)[material] || material;
    
    const formatDate = (dateString: string, options?: Intl.DateTimeFormatOptions) =>
      formatDateTime(dateString, language, options);
    
    return {
      t: componentTexts,
      common: commonTexts,
      getOrderStatus,
      getMaterial,
      formatDate,
      language
    };
  };
}

/**
 * 通用国际化Hook - 用于没有专门注册文本的组件
 */
export function useCommonI18n(language: Language = 'zh') {
  const common = getCommonTexts(language);
  
  const getOrderStatus = (status: string) => 
    (getBusinessMapping('orderStatus', language) as any)[status] || status;
  
  const getMaterial = (material: string) =>
    (getBusinessMapping('materials', language) as any)[material] || material;
    
  const formatDate = (dateString: string, options?: Intl.DateTimeFormatOptions) =>
    formatDateTime(dateString, language, options);
  
  return {
    common,
    getOrderStatus,
    getMaterial,
    formatDate,
    language
  };
}

// 类型安全的文本key验证
export type TextKey<T> = keyof T;
export type CommonTextKey = keyof typeof commonTexts.zh;
export type OrderStatusKey = keyof typeof businessMappings.orderStatus.zh;
export type MaterialKey = keyof typeof businessMappings.materials.zh;

export const loginFormTexts = {
  zh: {
    emailLabel: '邮箱地址',
    emailPlaceholder: 'your.email@company.com',
    sendButton: '发送登录链接',
    sending: '发送中...',
    emailRequired: '请输入邮箱地址',
    successMessage: '登录链接已发送到您的邮箱！请检查您的邮件（包括垃圾邮件文件夹）。',
    errorMessage: '发送失败，请稍后重试',
    securityNote: '我们使用安全的无密码登录方式',
    instruction: '点击邮件中的链接即可安全登录'
  },
  en: {
    emailLabel: 'Email Address',
    emailPlaceholder: 'your.email@company.com',
    sendButton: 'Send Login Link',
    sending: 'Sending...',
    emailRequired: 'Please enter your email address',
    successMessage: 'Login link sent to your email! Please check your inbox (including spam folder).',
    errorMessage: 'Failed to send. Please try again later.',
    securityNote: 'We use secure passwordless authentication',
    instruction: 'Click the link in the email to log in securely'
  }
} as const;

export const quoteFormTexts = {
  zh: {
    title: '提交报价请求',
    contactSection: '联系信息',
    emailLabel: '邮箱地址',
    emailPlaceholder: 'your@email.com',
    contactNameLabel: '联系人姓名',
    contactNamePlaceholder: '请输入您的姓名',
    companyNameLabel: '公司名称',
    companyNamePlaceholder: '请输入公司名称 (可选)',
    phoneLabel: '电话号码',
    phonePlaceholder: '+86 138 0000 0000 (可选)',
    productSection: '产品规格',
    materialLabel: '材料',
    quantityLabel: '数量',
    quantityPlaceholder: '请输入数量',
    fileSection: '模型文件',
    fileLabel: 'CAD文件上传',
    fileHelp: '支持格式: STEP, STL, IGES, DWG, DXF 等',
    notesLabel: '特殊要求 / 备注',
    notesPlaceholder: '请描述表面处理、公差要求、交期等特殊要求...',
    submitButton: '提交报价请求',
    submitting: '正在提交...',
    fileRequired: '请上传至少一个CAD文件',
    emailRequired: '请输入邮箱地址',
    contactNameRequired: '请输入联系人姓名',
    successMessage: '您的报价请求已成功提交！我们将在24小时内回复。',
    customMaterialLabel: '请输入材料名称',
    customMaterialPlaceholder: '例如：碳纤维、陶瓷等',
    materialGroups: {
      aluminum: '铝合金系列',
      stainless: '不锈钢系列',
      carbon_steel: '碳钢系列',
      tool_steel: '工具钢系列',
      titanium: '钛合金系列',
      copper_alloy: '铜合金系列',
      engineering_plastic: '工程塑料',
      other: '其他'
    },
    materials: {
      aluminum_6061: '铝合金 6061-T6 (通用结构件)',
      aluminum_7075: '铝合金 7075-T6 (高强度航空)',
      aluminum_2024: '铝合金 2024-T3 (航空结构)',
      aluminum_5052: '铝合金 5052-H32 (耐腐蚀)',
      aluminum_6063: '铝合金 6063-T6 (挤压型材)',
      stainless_304: '不锈钢 304 (通用耐腐蚀)',
      stainless_316: '不锈钢 316 (海洋级耐腐蚀)',
      stainless_316L: '不锈钢 316L (低碳耐腐蚀)',
      stainless_17_4PH: '不锈钢 17-4PH (析出硬化)',
      steel_1018: '碳钢 1018 (低碳钢)',
      steel_1045: '碳钢 1045 (中碳钢)',
      steel_4140: '合金钢 4140 (高强度)',
      steel_a36: '结构钢 A36 (焊接结构)',
      tool_steel_d2: '工具钢 D2 (高碳高铬)',
      tool_steel_a2: '工具钢 A2 (空气硬化)',
      tool_steel_o1: '工具钢 O1 (油淬)',
      titanium_gr2: '钛合金 Grade 2 (商业纯钛)',
      titanium_6al4v: '钛合金 Ti-6Al-4V (航空级)',
      brass_360: '黄铜 360 (易切削)',
      brass_c110: '紫铜 C110 (导电)',
      bronze_932: '青铜 932 (轴承合金)',
      plastic_abs: '工程塑料 ABS',
      plastic_pom: '工程塑料 POM (聚甲醛)',
      plastic_nylon6: '工程塑料 PA6 (尼龙6)',
      plastic_peek: '工程塑料 PEEK (高性能)',
      plastic_pei: '工程塑料 PEI (琥珀色)',
      other: '其他材料 (请在下方详细说明)'
    },
    sessionNotReady: '错误：表单或用户会话尚未准备好。',
    statusUpdatingProfile: '正在更新联系人档案...',
    statusUploadingFiles: '正在上传文件...',
    statusSubmittingQuote: '正在提交报价请求...',
    uploadFailedPrefix: '文件上传失败',
    submitFailedPrefix: '提交失败'
  },
  en: {
    title: 'Submit Quote Request',
    contactSection: 'Contact Information',
    emailLabel: 'Email Address',
    emailPlaceholder: 'your@email.com',
    contactNameLabel: 'Contact Name',
    contactNamePlaceholder: 'Enter your name',
    companyNameLabel: 'Company Name',
    companyNamePlaceholder: 'Enter company name (optional)',
    phoneLabel: 'Phone Number',
    phonePlaceholder: '+1 (555) 123-4567 (optional)',
    productSection: 'Product Specifications',
    materialLabel: 'Material',
    quantityLabel: 'Quantity',
    quantityPlaceholder: 'Enter quantity',
    fileSection: 'Model File',
    fileLabel: 'CAD File Upload',
    fileHelp: 'Supported formats: STEP, STL, IGES, DWG, DXF, etc.',
    notesLabel: 'Special Requirements / Notes',
    notesPlaceholder: 'Please describe surface finish, tolerances, delivery requirements, etc...',
    submitButton: 'Submit Quote Request',
    submitting: 'Submitting...',
    fileRequired: 'Please upload at least one CAD file',
    emailRequired: 'Please enter email address',
    contactNameRequired: 'Please enter contact name',
    successMessage: 'Your quote request has been submitted successfully! We will respond within 24 hours.',
    customMaterialLabel: 'Please enter material name',
    customMaterialPlaceholder: 'e.g. Carbon Fiber, Ceramic, etc.',
    materialGroups: {
      aluminum: 'Aluminum Series',
      stainless: 'Stainless Steel Series',
      carbon_steel: 'Carbon Steel Series',
      tool_steel: 'Tool Steel Series',
      titanium: 'Titanium Series',
      copper_alloy: 'Copper Alloy Series',
      engineering_plastic: 'Engineering Plastics',
      other: 'Other'
    },
    materials: {
      aluminum_6061: 'Aluminum 6061-T6 (General Structural)',
      aluminum_7075: 'Aluminum 7075-T6 (High Strength Aviation)',
      aluminum_2024: 'Aluminum 2024-T3 (Aircraft Structure)',
      aluminum_5052: 'Aluminum 5052-H32 (Corrosion Resistant)',
      aluminum_6063: 'Aluminum 6063-T6 (Extrusion)',
      stainless_304: 'Stainless Steel 304 (General Corrosion Resistant)',
      stainless_316: 'Stainless Steel 316 (Marine Grade)',
      stainless_316L: 'Stainless Steel 316L (Low Carbon)',
      stainless_17_4PH: 'Stainless Steel 17-4PH (Precipitation Hardening)',
      steel_1018: 'Carbon Steel 1018 (Low Carbon)',
      steel_1045: 'Carbon Steel 1045 (Medium Carbon)',
      steel_4140: 'Alloy Steel 4140 (High Strength)',
      steel_a36: 'Structural Steel A36 (Weldable)',
      tool_steel_d2: 'Tool Steel D2 (High Carbon Chromium)',
      tool_steel_a2: 'Tool Steel A2 (Air Hardening)',
      tool_steel_o1: 'Tool Steel O1 (Oil Hardening)',
      titanium_gr2: 'Titanium Grade 2 (Commercial Pure)',
      titanium_6al4v: 'Titanium Ti-6Al-4V (Aviation Grade)',
      brass_360: 'Brass 360 (Free Machining)',
      brass_c110: 'Copper C110 (Electrical)',
      bronze_932: 'Bronze 932 (Bearing Alloy)',
      plastic_abs: 'Engineering Plastic ABS',
      plastic_pom: 'Engineering Plastic POM (Acetal)',
      plastic_nylon6: 'Engineering Plastic PA6 (Nylon 6)',
      plastic_peek: 'Engineering Plastic PEEK (High Performance)',
      plastic_pei: 'Engineering Plastic PEI (Amber)',
      other: 'Other Material (please specify below)'
    },
    sessionNotReady: 'Error: Form or user session is not ready.',
    statusUpdatingProfile: 'Updating contact profile...',
    statusUploadingFiles: 'Uploading files...',
    statusSubmittingQuote: 'Submitting quote request...',
    uploadFailedPrefix: 'File upload failed',
    submitFailedPrefix: 'Submission failed'
  }
} as const;
