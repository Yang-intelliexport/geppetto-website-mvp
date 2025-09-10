// Supabase 集成工具模块
// 用于Astro组件和JavaScript脚本

import { createClient } from '../lib/supabase/client.ts';

// 创建统一的Supabase客户端实例
const supabase = createClient();

/**
 * 提交报价请求到Supabase数据库
 * @param {Object} quoteData - 报价数据
 * @returns {Promise} Supabase响应
 */
export async function submitQuoteRequest(quoteData) {
  try {
    console.log('🚀 提交报价请求到Supabase:', quoteData);
    
    // 准备数据库插入数据
    const insertData = {
      company_name: quoteData.company || null,
      contact_name: quoteData.name,
      email: quoteData.email,
      phone: quoteData.phone || null,
      country: quoteData.country || null,
      product_name: quoteData.product_name || `${quoteData.material}零件加工`,
      material: mapMaterialValue(quoteData.material),
      quantity: parseInt(quoteData.quantity) || 1,
      surface_finish: quoteData.surface_finish || null,
      tolerance: quoteData.tolerance || null,
      special_requirements: quoteData.requirements || null,
      status: 'pending',
      // 添加主要CAD文件路径（取第一个文件的存储路径作为主要文件）
      cad_file_path: quoteData.file_uploads && quoteData.file_uploads.length > 0 
        ? quoteData.file_uploads[0].path
        : (quoteData.file_urls && quoteData.file_urls.length > 0 
           ? quoteData.file_urls[0] 
           : null)
    };

    // 插入到quotes表
    const { data, error } = await supabase
      .from('quotes')
      .insert([insertData])
      .select()
      .single();

    if (error) {
      console.error('❌ Supabase插入错误:', error);
      throw new Error(`数据库插入失败: ${error.message}`);
    }

    console.log('✅ 报价请求创建成功:', data);
    
    // 如果有文件信息，插入到quote_files表
    if (quoteData.file_uploads && quoteData.file_uploads.length > 0) {
      await insertQuoteFiles(data.id, quoteData.file_uploads);
    } else if (quoteData.file_urls && quoteData.file_urls.length > 0) {
      // 兼容旧版本只有URL的情况
      const fileUploads = quoteData.file_urls.map((url, index) => ({
        url,
        path: url,
        size: 0,
        type: 'unknown',
        name: `CAD_File_${index + 1}`
      }));
      await insertQuoteFiles(data.id, fileUploads);
    }

    return [data]; // 保持与原API兼容的返回格式
  } catch (error) {
    console.error('❌ 提交报价请求失败:', error);
    throw error;
  }
}

/**
 * 插入报价文件记录
 * @param {string} quoteId - 报价ID
 * @param {Array} fileUploads - 文件上传信息数组
 */
async function insertQuoteFiles(quoteId, fileUploads) {
  const fileRecords = fileUploads.map((fileInfo) => ({
    quote_id: quoteId,
    original_filename: fileInfo.name || 'Unknown_File',
    file_path: fileInfo.path || fileInfo.url,
    file_size: fileInfo.size || 0,
    file_type: fileInfo.type || 'application/octet-stream',
    ai_analyzed: false
  }));

  const { error } = await supabase
    .from('quote_files')
    .insert(fileRecords);

  if (error) {
    console.error('❌ 文件记录插入失败:', error);
    // 不抛出错误，因为主要报价已成功
  }
}

/**
 * 上传文件到Supabase Storage
 * @param {File} file - 文件对象
 * @returns {Promise} 上传结果
 */
export async function uploadFile(file) {
  try {
    console.log('📁 上传文件:', file.name);
    
    // 生成唯一文件名
    const timestamp = Date.now();
    const extension = file.name.split('.').pop();
    const fileName = `${timestamp}_${Math.random().toString(36).substring(2, 11)}.${extension}`;
    const filePath = `cad-files/${fileName}`;

    // 上传到Supabase Storage
    const { error } = await supabase.storage
      .from('quote-files')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('❌ 文件上传失败:', error);
      throw new Error(`文件上传失败: ${error.message}`);
    }

    // 获取公共URL
    const { data: urlData } = supabase.storage
      .from('quote-files')
      .getPublicUrl(filePath);

    console.log('✅ 文件上传成功:', urlData.publicUrl);
    
    return {
      url: urlData.publicUrl,
      path: filePath,
      size: file.size,
      type: file.type,
      name: file.name
    };
  } catch (error) {
    console.error('❌ 文件上传错误:', error);
    throw error;
  }
}

/**
 * 映射材料值到数据库枚举
 * @param {string} materialValue - 前端材料值
 * @returns {string} 数据库枚举值
 */
function mapMaterialValue(materialValue) {
  const materialMap = {
    '6061-t6': 'aluminum',
    '7075-t6': 'aluminum', 
    '2024-t3': 'aluminum',
    '304-stainless': 'stainless_steel',
    '316l-stainless': 'stainless_steel',
    '17-4ph-stainless': 'stainless_steel',
    'ti-6al-4v': 'titanium',
    'grade-2-titanium': 'titanium',
    'c360-brass': 'brass',
    'peek': 'plastic',
    'pom': 'plastic',
    'aluminum': 'aluminum',
    'steel': 'steel',
    'stainless_steel': 'stainless_steel',
    'brass': 'brass',
    'titanium': 'titanium',
    'plastic': 'plastic'
  };
  
  return materialMap[materialValue] || 'other';
}

/**
 * 获取报价详情 (V1.1版本 - 包含明细和消息)
 * @param {string} quoteId - 报价ID或token
 * @returns {Promise} 报价详情
 */
export async function getQuoteDetails(quoteId) {
  try {
    console.log('🔍 获取报价详情 (V1.1):', quoteId);
    
    // V1.1版本：获取完整报价信息包含明细和消息
    let query = supabase
      .from('quotes')
      .select(`
        *,
        quote_breakdown_items (*),
        quote_messages (*),
        quote_files (*)
      `);
    
    // 判断是否为UUID格式
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(quoteId);
    
    if (isUUID) {
      query = query.eq('id', quoteId);
    } else {
      query = query.eq('token', quoteId);
    }
    
    const { data, error } = await query.single();
    
    if (error) {
      console.error('❌ 获取报价详情失败:', error);
      throw new Error(`获取报价失败: ${error.message}`);
    }
    
    console.log('✅ 报价详情获取成功 (V1.1):', data);
    return data;
  } catch (error) {
    console.error('❌ 获取报价详情错误:', error);
    throw error;
  }
}

/**
 * 获取用户的报价列表
 * @param {string} email - 用户邮箱
 * @returns {Promise} 报价列表
 */
export async function getUserQuotes(email) {
  try {
    console.log('📋 获取用户报价列表:', email);
    
    const { data, error } = await supabase
      .from('quotes')
      .select(`
        id,
        token,
        contact_name,
        product_name,
        material,
        quantity,
        status,
        total_price,
        created_at,
        delivery_time_days
      `)
      .eq('email', email)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('❌ 获取报价列表失败:', error);
      throw new Error(`获取报价列表失败: ${error.message}`);
    }
    
    console.log('✅ 报价列表获取成功:', data);
    return data;
  } catch (error) {
    console.error('❌ 获取报价列表错误:', error);
    throw error;
  }
}

/**
 * 用户认证 - 发送魔法链接
 * @param {string} email - 用户邮箱
 * @param {string} redirectTo - 重定向URL
 * @returns {Promise} 认证结果
 */
export async function sendMagicLink(email, redirectTo) {
  try {
    console.log('🔑 发送魔法链接:', email);
    
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: redirectTo
      }
    });
    
    if (error) {
      console.error('❌ 发送魔法链接失败:', error);
      throw new Error(`发送登录链接失败: ${error.message}`);
    }
    
    console.log('✅ 魔法链接发送成功');
    return { success: true };
  } catch (error) {
    console.error('❌ 发送魔法链接错误:', error);
    throw error;
  }
}

/**
 * 获取当前用户会话
 * @returns {Promise} 用户会话
 */
export async function getCurrentSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('❌ 获取会话失败:', error);
      return null;
    }
    
    return session;
  } catch (error) {
    console.error('❌ 获取会话错误:', error);
    return null;
  }
}

/**
 * 用户登出
 * @returns {Promise} 登出结果
 */
export async function signOut() {
  try {
    console.log('👋 用户登出');
    
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('❌ 登出失败:', error);
      throw new Error(`登出失败: ${error.message}`);
    }
    
    console.log('✅ 登出成功');
    return { success: true };
  } catch (error) {
    console.error('❌ 登出错误:', error);
    throw error;
  }
}

// ========== V1.1 新增API函数 ==========

/**
 * 发送报价消息 (V1.1版本)
 * @param {Object} messageData - 消息数据
 * @returns {Promise} 发送结果
 */
export async function sendQuoteMessage(messageData) {
  try {
    console.log('💬 发送报价消息 (V1.1):', messageData);
    
    const { data, error } = await supabase
      .from('quote_messages')
      .insert([{
        quote_id: messageData.quote_id,
        sender_id: messageData.sender_id,
        message_content: messageData.message_content
      }])
      .select()
      .single();

    if (error) {
      console.error('❌ 发送消息失败:', error);
      throw new Error(`发送消息失败: ${error.message}`);
    }

    console.log('✅ 消息发送成功 (V1.1):', data);
    return data;
  } catch (error) {
    console.error('❌ 发送消息错误:', error);
    throw error;
  }
}

/**
 * 监听报价消息 (V1.1版本 - 实时订阅)
 * @param {string} quoteId - 报价ID
 * @param {function} callback - 回调函数
 * @returns {Object} 订阅对象
 */
export function subscribeToQuoteMessages(quoteId, callback) {
  console.log('📡 订阅报价消息 (V1.1):', quoteId);
  
  const channel = supabase
    .channel(`quote-messages-${quoteId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'quote_messages',
        filter: `quote_id=eq.${quoteId}`
      },
      (payload) => {
        console.log('📨 收到新消息:', payload.new);
        callback(payload.new);
      }
    )
    .subscribe();

  return channel;
}

/**
 * 创建支付会话 (V1.1版本) - 正确的Supabase Edge Function架构
 * @param {string} quoteId - 报价ID
 * @returns {Promise} 支付URL
 */
export async function createPaymentSession(quoteId) {
  try {
    console.log('💳 创建支付会话 (V1.1):', quoteId);
    console.log('🔗 Supabase项目URL:', supabase.supabaseUrl);
    console.log('🌐 准备调用Edge Function: stripe-payment');
    
    // 添加调用前的详细日志
    const requestPayload = { quote_id: quoteId };
    console.log('📤 Edge Function请求参数:', requestPayload);
    
    // 记录调用开始时间
    const callStartTime = Date.now();
    console.log('⏰ Edge Function调用开始时间:', new Date(callStartTime).toISOString());
    
    // 正确的架构：调用现有的Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('stripe-payment', {
      body: requestPayload
    });

    // 记录调用结束时间和耗时
    const callEndTime = Date.now();
    const duration = callEndTime - callStartTime;
    console.log('⏰ Edge Function调用结束时间:', new Date(callEndTime).toISOString());
    console.log('⏱️ Edge Function调用耗时:', duration + 'ms');

    if (error) {
      console.error('❌ 创建支付会话失败 - 详细错误信息:', {
        errorMessage: error.message,
        errorCode: error.code,
        errorDetails: error.details,
        errorHint: error.hint,
        fullError: error,
        duration: duration + 'ms'
      });
      throw new Error(`创建支付失败: ${error.message}`);
    }

    console.log('✅ 支付会话创建成功 (V1.1):', {
      data,
      duration: duration + 'ms',
      responseTime: new Date().toISOString()
    });
    return data;
  } catch (error) {
    console.error('❌ 创建支付会话错误 - 捕获到异常:', {
      errorType: error.constructor.name,
      errorMessage: error.message,
      errorStack: error.stack,
      timestamp: new Date().toISOString()
    });
    throw error;
  }
}

/**
 * 生成安全的文件名（移除特殊字符，保留基本信息）
 * @param {string} originalName - 原始文件名
 * @returns {string} 安全的文件名
 */
function generateSafeFileName(originalName) {
  // Supabase Storage对文件名有严格要求，需要移除特殊字符
  // 保留字母、数字、点号、连字符和下划线
  const sanitized = originalName
    .replace(/[^a-zA-Z0-9.\-_]/g, '_') // 将特殊字符替换为下划线
    .replace(/_{2,}/g, '_') // 将多个连续下划线合并为一个
    .replace(/^_|_$/g, ''); // 移除开头和结尾的下划线
  
  // 如果处理后为空或只有扩展名，生成一个默认名称
  if (!sanitized || sanitized.startsWith('.')) {
    const timestamp = Date.now();
    const extension = originalName.split('.').pop()?.toLowerCase() || 'file';
    return `uploaded_file_${timestamp}.${extension}`;
  }
  
  return sanitized;
}

/**
 * 文件上传到cad-files存储桶 (V1.1版本 - 支持中文文件名)
 * @param {File} file - 文件对象
 * @param {string} userId - 用户ID
 * @returns {Promise} 上传结果
 */
export async function uploadCADFile(file, userId) {
  try {
    console.log('📁 上传CAD文件 (V1.1):', { filename: file.name, userId });
    
    // 生成安全的文件名（移除特殊字符）
    const sanitizedFileName = generateSafeFileName(file.name);
    const filePath = `public/${userId}/${Date.now()}_${sanitizedFileName}`;

    console.log('🔄 文件名处理:', {
      original: file.name,
      sanitized: sanitizedFileName,
      path: filePath
    });

    // 上传到cad-files存储桶
    const { data, error } = await supabase.storage
      .from('cad-files')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('❌ CAD文件上传失败:', error);
      throw new Error(`文件上传失败: ${error.message}`);
    }

    console.log('✅ CAD文件上传成功 (V1.1):', data.path);
    return {
      path: data.path,
      url: supabase.storage.from('cad-files').getPublicUrl(data.path).data.publicUrl,
      size: file.size,
      type: file.type,
      name: file.name,
      originalName: file.name,
      sanitizedFileName: sanitizedFileName
    };
  } catch (error) {
    console.error('❌ CAD文件上传错误:', error);
    throw error;
  }
}

/**
 * 保存成本计算结果
 * @param {Object} calculationData - 计算数据
 * @returns {Promise} 保存结果
 */
export async function saveCostCalculation(calculationData) {
  try {
    console.log('💰 保存成本计算:', calculationData);
    
    const { data, error } = await supabase
      .from('cost_calculations')
      .insert([{
        material: calculationData.material,
        volume: calculationData.volume,
        surface_area: calculationData.surfaceArea,
        complexity_factor: calculationData.complexityFactor,
        quantity: calculationData.quantity,
        material_cost: calculationData.materialCost,
        machining_cost: calculationData.machiningCost,
        setup_cost: calculationData.setupCost,
        total_cost: calculationData.totalCost,
        unit_cost: calculationData.unitCost,
        calculation_method: calculationData.method || 'web_calculator',
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('❌ 保存成本计算失败:', error);
      throw new Error(`保存计算失败: ${error.message}`);
    }

    console.log('✅ 成本计算保存成功:', data);
    return data;
  } catch (error) {
    console.error('❌ 保存成本计算错误:', error);
    throw error;
  }
}