import { s as supabase } from './supabase_2zlJawaa.mjs';

// Supabase 集成工具模块
// 用于Astro组件和JavaScript脚本


/**
 * 获取报价详情 (V1.1版本 - 包含明细和消息)
 * @param {string} quoteId - 报价ID或token
 * @returns {Promise} 报价详情
 */
async function getQuoteDetails(quoteId) {
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
async function getUserQuotes(email) {
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
async function sendMagicLink(email, redirectTo) {
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
async function getCurrentSession() {
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
 * 创建支付会话 (V1.1版本) - 正确的Supabase Edge Function架构
 * @param {string} quoteId - 报价ID
 * @returns {Promise} 支付URL
 */
async function createPaymentSession(quoteId) {
  try {
    console.log('💳 创建支付会话 (V1.1):', quoteId);
    
    // 正确的架构：调用现有的Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('stripe-payment', {
      body: { quote_id: quoteId }
    });

    if (error) {
      console.error('❌ 创建支付会话失败:', error);
      throw new Error(`创建支付失败: ${error.message}`);
    }

    console.log('✅ 支付会话创建成功 (V1.1):', data);
    return data;
  } catch (error) {
    console.error('❌ 创建支付会话错误:', error);
    throw error;
  }
}

export { getUserQuotes as a, getQuoteDetails as b, createPaymentSession as c, getCurrentSession as g, sendMagicLink as s };
