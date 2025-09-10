// 报价状态配置 - Quote流程
export const QUOTE_STATUSES = {
  ai_quote: {
    id: 'ai_quote',
    name: {
      en: 'AI Quote Processing',
      zh: 'AI报价分析'
    },
    description: {
      en: 'AI analyzing your CAD files and generating initial quote',
      zh: 'AI正在分析您的CAD文件并生成初步报价'
    },
    icon: 'AI',
    color: 'blue',
    progress: 20,
    estimatedHours: 0.5,
    stage: 'quote'
  },
  expert_review: {
    id: 'expert_review',
    name: {
      en: 'Expert Review',
      zh: '专家评审'
    },
    description: {
      en: 'Manufacturing experts reviewing and validating the quote',
      zh: '制造专家正在审核和验证报价'
    },
    icon: 'EXP',
    color: 'orange',
    progress: 40,
    estimatedHours: 8,
    stage: 'quote'
  },
  quote_complete: {
    id: 'quote_complete',
    name: {
      en: 'Quote Complete',
      zh: '报价完成'
    },
    description: {
      en: 'Final quote ready, awaiting payment to start production',
      zh: '最终报价已完成，等待付款后开始生产'
    },
    icon: 'RDY',
    color: 'green',
    progress: 60,
    estimatedHours: 0,
    stage: 'quote'
  }
} as const;

// 订单状态配置 - Order流程 (付款成功后)
export const ORDER_STATUSES = {
  payment_success: {
    id: 'payment_success',
    name: {
      en: 'Payment Confirmed',
      zh: '付款成功'
    },
    description: {
      en: 'Payment received successfully, production will begin shortly',
      zh: '付款已确认，即将开始生产'
    },
    icon: 'PAY',
    color: 'green',
    progress: 65,
    estimatedHours: 0,
    stage: 'order'
  },
  production_prep: {
    id: 'production_prep', 
    name: {
      en: 'Production Prep',
      zh: '生产准备'
    },
    description: {
      en: 'Preparing materials and setting up production line',
      zh: '准备材料，设置生产线'
    },
    icon: 'SET',
    color: 'orange',
    progress: 70,
    estimatedHours: 8,
    stage: 'order'
  },
  in_production: {
    id: 'in_production',
    name: {
      en: 'In Production',
      zh: '生产中'
    },
    description: {
      en: 'Your parts are being manufactured with precision',
      zh: '正在精密制造您的零件'
    },
    icon: 'MFG',
    color: 'purple',
    progress: 85,
    estimatedHours: 48,
    stage: 'order'
  },
  quality_check: {
    id: 'quality_check',
    name: {
      en: 'Quality Check',
      zh: '质量检测'
    },
    description: {
      en: 'Final quality inspection and measurements',
      zh: '最终质量检验和测量'
    },
    icon: 'QC',
    color: 'green',
    progress: 92,
    estimatedHours: 8,
    stage: 'order'
  },
  packaging: {
    id: 'packaging',
    name: {
      en: 'Packaging & Shipping',
      zh: '打包发货'
    },
    description: {
      en: 'Carefully packaging and shipping your order',
      zh: '精心包装并发送您的订单'
    },
    icon: 'PKG',
    color: 'blue',
    progress: 96,
    estimatedHours: 4,
    stage: 'order'
  },
  delivered: {
    id: 'delivered',
    name: {
      en: 'Delivered',
      zh: '已到达'
    },
    description: {
      en: 'Order successfully delivered to your address',
      zh: '订单已成功送达您的地址'
    },
    icon: 'OK',
    color: 'green',
    progress: 100,
    estimatedHours: 0,
    stage: 'order'
  }
} as const;

// 合并所有状态
export const ALL_STATUSES = {
  ...QUOTE_STATUSES,
  ...ORDER_STATUSES
} as const;

// 类型定义
export type QuoteStatusId = keyof typeof QUOTE_STATUSES;
export type OrderStatusId = keyof typeof ORDER_STATUSES;
export type AllStatusId = keyof typeof ALL_STATUSES;
export type Language = 'en' | 'zh';

// 获取状态信息的工具函数
export function getStatusInfo(statusId: AllStatusId, language: Language = 'en') {
  const status = ALL_STATUSES[statusId];
  return {
    ...status,
    name: status.name[language],
    description: status.description[language]
  };
}

// 获取当前阶段的所有状态
export function getStageStatuses(stage: 'quote' | 'order'): AllStatusId[] {
  return Object.keys(ALL_STATUSES).filter(
    statusId => ALL_STATUSES[statusId as AllStatusId].stage === stage
  ) as AllStatusId[];
}

// 计算预计完成时间
export function calculateEstimatedCompletion(currentStatus: AllStatusId, startTime: Date): Date {
  const allStatusKeys = Object.keys(ALL_STATUSES) as AllStatusId[];
  const currentIndex = allStatusKeys.indexOf(currentStatus);
  
  let remainingHours = 0;
  for (let i = currentIndex + 1; i < allStatusKeys.length; i++) {
    remainingHours += ALL_STATUSES[allStatusKeys[i]].estimatedHours;
  }
  
  const completionTime = new Date(startTime);
  completionTime.setHours(completionTime.getHours() + remainingHours);
  
  return completionTime;
}

// 数据结构定义
export interface QuoteTrackingData {
  quoteId: string;
  customerEmail: string;
  currentStatus: QuoteStatusId;
  startTime: string;
  lastUpdated: string;
  notes?: string;
  estimatedCompletion: string;
  quoteAmount?: number;
  currency?: string;
}

export interface OrderTrackingData {
  orderId: string;
  quoteId?: string; // 关联的报价ID
  customerEmail: string;
  currentStatus: OrderStatusId;
  startTime: string;
  lastUpdated: string;
  trackingNumber?: string;
  notes?: string;
  estimatedCompletion: string;
  paymentAmount?: number;
  currency?: string;
}

// 统一追踪数据结构
export interface UnifiedTrackingData {
  id: string; // quoteId 或 orderId
  type: 'quote' | 'order';
  customerEmail: string;
  currentStatus: AllStatusId;
  startTime: string;
  lastUpdated: string;
  trackingNumber?: string;
  notes?: string;
  estimatedCompletion: string;
  amount?: number;
  currency?: string;
}