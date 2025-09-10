/**
 * Track Order API - Mock Implementation
 * 提供订单追踪功能，包含支付按钮测试数据
 */

import type { APIRoute } from 'astro'
import type { ApiResponse } from '../../../config/api'

// Mock数据 - 展示完整的报价到订单流程
const MOCK_ORDERS = [
  // 已报价 - 等待支付（报价阶段最后一步）
  {
    id: 'quote_test_12345',
    shortId: 'A1B2C3D4',
    type: 'quote', // 报价类型
    status: 'quoted',
    statusLabel: '已报价',
    email: 'demo@test.com',
    createdAt: '2025-01-01T10:00:00Z',
    updatedAt: '2025-01-01T15:30:00Z',
    material: 'aluminum-6061',
    materialLabel: '6061铝合金（最常用）',
    quantity: 50,
    quoteTotal: 1299.99,
    unitPrice: 25.99,
    estimatedDeliveryDays: 7,
    processingDays: 1,
    customerNotes: '需要高精度加工，表面阳极氧化处理',
    engineerNotes: '已完成技术评估，报价包含阳极氧化和精密加工费用。生产周期7天。',
    originalFileUrl: '/mock-files/demo-part.step',
    // 价格明细breakdown
    priceBreakdown: {
      engineeringSetup: 65.00,      // 一次性工程与设置费
      materialCost: 45.20,          // 材料费 (6061-T6铝合金)
      manufacturingService: 129.30, // 加工与品控服务
      shipping: 8.00,               // 国际运费
      unitProductionCost: 174.50    // 单件生产成本 (材料+加工)
    }
  },
  
  // 专家审核中 - 报价阶段
  {
    id: 'quote_test_67890',
    shortId: 'B5C6D7E8',
    type: 'quote',
    status: 'expert-reviewing',
    statusLabel: '专家审核',
    email: 'demo@test.com',
    createdAt: '2025-01-01T14:20:00Z',
    updatedAt: '2025-01-01T16:00:00Z',
    material: 'stainless-304',
    materialLabel: '304不锈钢（耐腐蚀）',
    quantity: 20,
    processingDays: 0,
    customerNotes: '用于食品级设备，需要食品级认证',
    originalFileUrl: '/mock-files/food-grade-part.step'
  },
  
  // AI评估中 - 报价阶段初期
  {
    id: 'quote_test_33333',
    shortId: 'C3D4E5F6',
    type: 'quote',
    status: 'ai-reviewing',
    statusLabel: 'AI评估',
    email: 'demo@test.com',
    createdAt: '2025-01-01T16:45:00Z',
    updatedAt: '2025-01-01T17:00:00Z',
    material: 'brass-c360',
    materialLabel: '黄铜（导电性好）',
    quantity: 100,
    processingDays: 0,
    customerNotes: '电子连接器用，要求高导电性',
    originalFileUrl: '/mock-files/connector-part.step'
  },
  
  // 制造中订单 - 订单阶段（已支付后）
  {
    id: 'order_test_11111',
    shortId: 'F9G8H7I6',
    type: 'order', // 订单类型
    status: 'manufacturing',
    statusLabel: '制造中',
    email: 'demo@test.com',
    createdAt: '2024-12-25T09:00:00Z',
    paidAt: '2024-12-26T10:00:00Z',
    updatedAt: '2024-12-28T10:30:00Z',
    material: 'titanium-grade2',
    materialLabel: '钛合金（航空级）',
    quantity: 5,
    quoteTotal: 2599.99,
    unitPrice: 519.99,
    estimatedDeliveryDays: 14,
    processingDays: 6,
    customerNotes: '航空应用，需要材料认证书',
    engineerNotes: '使用航空级钛合金，正在制造中，预计1月5日完成制造。',
    originalFileUrl: '/mock-files/aerospace-component.step',
    // 价格明细breakdown
    priceBreakdown: {
      engineeringSetup: 260.00,     // 一次性工程与设置费
      materialCost: 442.50,         // 材料费 (钛合金)
      manufacturingService: 1897.49, // 加工与品控服务
      shipping: 35.00,              // 国际运费
      unitProductionCost: 2339.99   // 单件生产成本 (材料+加工)
    }
  },
  
  // 质量检测中订单
  {
    id: 'order_test_22222',
    shortId: 'G7H8I9J0',
    type: 'order',
    status: 'quality-check',
    statusLabel: '质量检测',
    email: 'demo@test.com',
    createdAt: '2024-12-20T09:00:00Z',
    paidAt: '2024-12-21T10:00:00Z',
    updatedAt: '2024-12-30T14:30:00Z',
    material: 'aluminum-7075',
    materialLabel: '7075铝合金（高强度）',
    quantity: 10,
    quoteTotal: 899.99,
    unitPrice: 89.99,
    estimatedDeliveryDays: 10,
    processingDays: 11,
    customerNotes: '高强度要求，用于无人机零件',
    engineerNotes: '制造完成，正在进行最终质量检测，确保符合航空标准。',
    originalFileUrl: '/mock-files/drone-part.step'
  },
  
  // 支付确认订单 - 刚支付完成
  {
    id: 'order_test_44444',
    shortId: 'H1I2J3K4',
    type: 'order',
    status: 'payment-confirmed',
    statusLabel: '支付成功',
    email: 'demo@test.com',
    createdAt: '2024-12-31T16:30:00Z',
    paidAt: '2025-01-01T09:15:00Z',
    updatedAt: '2025-01-01T09:15:00Z',
    material: 'aluminum-6061',
    materialLabel: '6061铝合金（最常用）',
    quantity: 25,
    quoteTotal: 649.99,
    unitPrice: 25.99,
    estimatedDeliveryDays: 8,
    processingDays: 0,
    customerNotes: '标准精度即可，用于原型测试',
    engineerNotes: '支付确认，订单已进入生产队列，即将开始制造。',
    originalFileUrl: '/mock-files/prototype-part.step',
    // 价格明细breakdown
    priceBreakdown: {
      engineeringSetup: 65.00,      // 一次性工程与设置费
      materialCost: 148.75,         // 材料费 (6061铝合金)
      manufacturingService: 436.24, // 加工与品控服务
      shipping: 12.00,              // 国际运费
      unitProductionCost: 584.99    // 单件生产成本 (材料+加工)
    }
  },
  
  // 打包中订单
  {
    id: 'order_test_55555',
    shortId: 'I9J0K1L2',
    type: 'order',
    status: 'packaging',
    statusLabel: '打包中',
    email: 'demo@test.com',
    createdAt: '2024-12-15T10:00:00Z',
    paidAt: '2024-12-16T11:00:00Z',
    updatedAt: '2024-12-31T16:45:00Z',
    material: 'stainless-304',
    materialLabel: '304不锈钢（耐腐蚀）',
    quantity: 15,
    quoteTotal: 1199.99,
    unitPrice: 79.99,
    estimatedDeliveryDays: 12,
    processingDays: 17,
    customerNotes: '医疗设备用，需要无菌包装',
    engineerNotes: '制造和质检完成，正在进行无菌打包处理。',
    originalFileUrl: '/mock-files/medical-part.step'
  },
  
  // 另一个邮箱的测试数据 - 报价类型
  {
    id: 'quote_test_66666',
    shortId: 'J3K4L5M6',
    type: 'quote',
    status: 'quoted',
    statusLabel: '已报价',
    email: 'test@geppetto.studio',
    createdAt: '2025-01-01T08:15:00Z',
    updatedAt: '2025-01-01T14:45:00Z',
    material: 'brass-c360',
    materialLabel: '黄铜（导电性好）',
    quantity: 100,
    quoteTotal: 899.99,
    unitPrice: 8.99,
    estimatedDeliveryDays: 5,
    processingDays: 1,
    customerNotes: '电子元件用，需要高导电性',
    engineerNotes: '选用C360黄铜，导电性能优秀，适合电子应用。报价有效期7天。',
    originalFileUrl: '/mock-files/electronic-part.step',
    // 价格明细breakdown
    priceBreakdown: {
      engineeringSetup: 90.00,      // 一次性工程与设置费
      materialCost: 180.00,         // 材料费 (黄铜)
      manufacturingService: 629.99, // 加工与品控服务
      shipping: 15.00,              // 国际运费
      unitProductionCost: 809.99    // 单件生产成本 (材料+加工)
    }
  }
]

// 根据查询条件搜索订单
function searchOrders(query: string): typeof MOCK_ORDERS {
  const searchQuery = query.toLowerCase().trim()
  
  return MOCK_ORDERS.filter(order => {
    // 支持邮箱、订单号、短ID匹配
    return (
      order.email.toLowerCase().includes(searchQuery) ||
      order.id.toLowerCase().includes(searchQuery) ||
      order.shortId.toLowerCase() === searchQuery.toUpperCase() ||
      searchQuery.includes(order.shortId.toLowerCase())
    )
  })
}

// 生成材料本地化标签
function getMaterialLabel(material: string, language: string): string {
  const materials = {
    zh: {
      'aluminum-6061': '6061铝合金（最常用）',
      'aluminum-7075': '7075铝合金（高强度）',
      'stainless-304': '304不锈钢（耐腐蚀）',
      'stainless-316': '316不锈钢（医疗级）',
      'brass-c360': '黄铜（导电性好）',
      'copper-c110': '紫铜（导热性好）',
      'carbon-steel': '碳钢（经济实用）',
      'titanium-grade2': '钛合金（航空级）'
    },
    en: {
      'aluminum-6061': '6061 Aluminum (Most Common)',
      'aluminum-7075': '7075 Aluminum (High Strength)',
      'stainless-304': '304 Stainless Steel (Corrosion Resistant)',
      'stainless-316': '316 Stainless Steel (Medical Grade)',
      'brass-c360': 'Brass C360 (Conductive)',
      'copper-c110': 'Copper C110 (Thermal Conductive)',
      'carbon-steel': 'Carbon Steel (Economic)',
      'titanium-grade2': 'Titanium Grade 2 (Aerospace)'
    }
  }
  
  return materials[language]?.[material] || material
}

// 生成状态本地化标签
function getStatusLabel(status: string, language: string): string {
  const statusLabels = {
    zh: {
      // 报价阶段
      pending: '待处理',
      'ai-reviewing': 'AI评估',
      'expert-reviewing': '专家审核', 
      quoted: '已报价',
      
      // 订单阶段
      'payment-confirmed': '支付成功',
      manufacturing: '制造中',
      'quality-check': '质量检测',
      packaging: '打包中',
      shipping: '物流配送',
      delivered: '已交付',
      
      // 兼容旧状态
      reviewing: '审核中',
      ordered: '已下单',
      archived: '已完成'
    },
    en: {
      // Quote phase
      pending: 'Pending',
      'ai-reviewing': 'AI Review',
      'expert-reviewing': 'Expert Review',
      quoted: 'Quoted',
      
      // Order phase
      'payment-confirmed': 'Payment Confirmed',
      manufacturing: 'Manufacturing',
      'quality-check': 'Quality Check',
      packaging: 'Packaging',
      shipping: 'Shipping',
      delivered: 'Delivered',
      
      // Legacy compatibility
      reviewing: 'Reviewing',
      ordered: 'Ordered', 
      archived: 'Completed'
    }
  }
  
  return statusLabels[language]?.[status] || status
}

export const POST: APIRoute = async ({ request }) => {
  const startTime = Date.now()
  
  try {
    const formData = await request.formData()
    const query = formData.get('query')?.toString()
    const language = formData.get('language')?.toString() || 'zh'
    
    // 验证输入
    if (!query) {
      return new Response(JSON.stringify({
        success: false,
        error: language === 'zh' ? '请输入查询条件' : 'Please enter search query',
        requestId: `track_${Date.now()}`
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    // 模拟查询延迟（让用户看到loading状态）
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // 搜索订单
    const matchingOrders = searchOrders(query)
    
    // 本地化处理
    const localizedOrders = matchingOrders.map(order => ({
      ...order,
      materialLabel: getMaterialLabel(order.material, language),
      statusLabel: getStatusLabel(order.status, language)
    }))
    
    const processingTime = Date.now() - startTime
    
    // 返回结果
    const response: ApiResponse = {
      success: true,
      data: {
        orders: localizedOrders,
        total: localizedOrders.length,
        query: query
      },
      message: localizedOrders.length > 0 
        ? (language === 'zh' ? `找到 ${localizedOrders.length} 个订单` : `Found ${localizedOrders.length} order(s)`)
        : (language === 'zh' ? '未找到匹配的订单' : 'No matching orders found'),
      requestId: `track_${Date.now()}`,
      meta: {
        processingTime,
        processedAt: new Date().toISOString()
      }
    }
    
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    })
    
  } catch (error) {
    console.error('Track order API error:', error)
    
    const errorResponse: ApiResponse = {
      success: false,
      error: 'Internal server error',
      message: 'Failed to track orders',
      requestId: `track_error_${Date.now()}`,
      meta: {
        processingTime: Date.now() - startTime,
        processedAt: new Date().toISOString()
      }
    }
    
    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// 支持GET请求用于健康检查
export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({
    success: true,
    message: 'Track Order API is healthy',
    mockDataAvailable: true,
    testQueries: [
      'demo@test.com - 有3个不同状态的订单，包含支付按钮测试',
      'test@geppetto.studio - 有1个待支付订单',
      'A1B2C3D4 - 直接订单号查询（支付测试）',
      'B5C6D7E8 - 审核中订单',
      'F9G8H7I6 - 生产中订单'
    ]
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}