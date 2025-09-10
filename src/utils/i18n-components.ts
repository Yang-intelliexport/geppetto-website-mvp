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
      getBusinessMapping('orderStatus', language)[status] || status;
    
    const getMaterial = (material: string) =>
      getBusinessMapping('materials', language)[material] || material;
    
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
    getBusinessMapping('orderStatus', language)[status] || status;
  
  const getMaterial = (material: string) =>
    getBusinessMapping('materials', language)[material] || material;
    
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