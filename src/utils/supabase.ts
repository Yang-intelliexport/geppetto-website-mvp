import { createClient } from '@supabase/supabase-js'
import { 
  safeApiCall, 
  createApiResponse, 
  createErrorResponse, 
  ErrorCode, 
  handleSupabaseError,
  FileUploadError,
  ValidationError,
  DatabaseError,
  type ApiResponse
} from './errorHandler'

// Supabase配置
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 数据库表接口定义
export interface ContactSubmission {
  id?: string
  name: string
  email: string
  company?: string
  phone?: string
  message: string
  service?: string
  quantity?: string
  contact_preference?: string
  source: 'contact_form' | 'ai_quote' | 'calculator'
  created_at?: string
}

export interface QuoteRequest {
  id?: string
  name: string
  email: string
  company?: string
  phone?: string
  material?: string
  quantity: number
  requirements?: string
  file_urls?: string[]
  estimated_cost?: number
  status: 'pending' | 'reviewing' | 'quoted' | 'completed'
  created_at?: string
}

export interface CostCalculation {
  id?: string
  project_name: string
  parameters: Record<string, any>
  results: Record<string, any>
  total_cost: number
  unit_cost: number
  user_email?: string
  created_at?: string
}

// 联系表单提交（使用标准化错误处理）
export async function submitContactForm(data: Omit<ContactSubmission, 'id' | 'created_at'>): Promise<ApiResponse<ContactSubmission[]>> {
  return safeApiCall(async () => {
    // 输入验证
    if (!data.name?.trim()) {
      throw new ValidationError('姓名不能为空');
    }
    if (!data.email?.trim()) {
      throw new ValidationError('邮箱不能为空');
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      throw new ValidationError('邮箱格式不正确');
    }
    if (!data.message?.trim()) {
      throw new ValidationError('消息内容不能为空');
    }

    // 数据清理和消毒
    const sanitizedData = {
      ...data,
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      company: data.company?.trim() || null,
      phone: data.phone?.trim() || null,
      message: data.message.trim(),
      service: data.service?.trim() || null,
      quantity: data.quantity?.trim() || null,
      contact_preference: data.contact_preference?.trim() || 'email'
    };

    const { data: result, error } = await supabase
      .from('contact_submissions')
      .insert([sanitizedData])
      .select();

    if (error) {
      throw new DatabaseError('提交联系表单失败', error);
    }

    return result || [];
  }, 'submitContactForm');
}

// AI报价请求提交（使用标准化错误处理）
export async function submitQuoteRequest(data: Omit<QuoteRequest, 'id' | 'created_at'>): Promise<ApiResponse<QuoteRequest[]>> {
  return safeApiCall(async () => {
    // 输入验证
    if (!data.name?.trim()) {
      throw new ValidationError('姓名不能为空');
    }
    if (!data.email?.trim()) {
      throw new ValidationError('邮箱不能为空');
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      throw new ValidationError('邮箱格式不正确');
    }
    if (!data.material?.trim()) {
      throw new ValidationError('请选择材料类型');
    }
    if (!data.quantity || data.quantity < 1) {
      throw new ValidationError('数量必须大于0');
    }

    // 数据清理和消毒
    const sanitizedData = {
      ...data,
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      company: data.company?.trim() || null,
      phone: data.phone?.trim() || null,
      material: data.material.trim(),
      quantity: data.quantity,
      precision: data.precision?.trim() || null,
      delivery: data.delivery?.trim() || null,
      requirements: data.requirements?.trim() || null,
      status: 'pending'
    };

    const { data: result, error } = await supabase
      .from('quote_requests')
      .insert([sanitizedData])
      .select();

    if (error) {
      throw new DatabaseError('提交报价请求失败', error);
    }

    return result || [];
  }, 'submitQuoteRequest');
}

// 成本计算结果保存
export async function saveCostCalculation(data: Omit<CostCalculation, 'id' | 'created_at'>) {
  const { data: result, error } = await supabase
    .from('cost_calculations')
    .insert([data])
    .select()

  if (error) {
    console.error('Error saving cost calculation:', error)
    throw new Error('保存失败，请稍后重试')
  }

  return result
}

// 文件上传到Supabase Storage（增强安全性）
export async function uploadFile(file: File, bucket = 'cad-files'): Promise<{ path: string; url: string; fileName: string }> {
  try {
    // 1. 文件类型验证
    const allowedTypes = ['.step', '.stp', '.stl', '.iges', '.igs', '.dwg', '.dxf', '.obj', '.ply', '.3mf'];
    const fileExt = ('.' + file.name.split('.').pop()?.toLowerCase()) || '';
    
    if (!allowedTypes.includes(fileExt)) {
      throw new Error(`不支持的文件类型。允许的格式: ${allowedTypes.join(', ')}`);
    }

    // 2. 文件大小验证
    const maxSizeMB = 50;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      throw new Error(`文件大小超过${maxSizeMB}MB限制`);
    }

    // 3. 文件名安全性验证
    const unsafeChars = /[<>:"/\\|?*\x00-\x1f]/;
    if (unsafeChars.test(file.name)) {
      throw new Error('文件名包含不安全字符');
    }

    // 4. 生成安全的文件名
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const randomId = crypto.getRandomValues(new Uint8Array(8))
      .reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), '');
    const sanitizedOriginalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `${timestamp}_${randomId}_${sanitizedOriginalName}`;
    
    // 5. 按年月组织文件路径
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const filePath = `uploads/${year}/${month}/${fileName}`;

    // 6. 上传文件
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type || 'application/octet-stream'
      });

    if (error) {
      console.error('Upload error:', error);
      if (error.message.includes('already exists')) {
        throw new Error('文件已存在，请重新上传');
      }
      throw new Error(`上传失败: ${error.message}`);
    }

    // 7. 获取公共URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return {
      path: data.path,
      url: publicUrl,
      fileName: fileName
    };
  } catch (error) {
    console.error('Upload file error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('文件上传失败，请稍后重试');
  }
}

// 获取报价请求列表（用于后台管理）
export async function getQuoteRequests(status?: string) {
  let query = supabase
    .from('quote_requests')
    .select('*')
    .order('created_at', { ascending: false })

  if (status) {
    query = query.eq('status', status)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching quote requests:', error)
    throw new Error('获取数据失败')
  }

  return data
}

// 更新报价请求状态
export async function updateQuoteStatus(id: string, status: QuoteRequest['status'], updates?: Partial<QuoteRequest>) {
  const { data, error } = await supabase
    .from('quote_requests')
    .update({ status, ...updates })
    .eq('id', id)
    .select()

  if (error) {
    console.error('Error updating quote status:', error)
    throw new Error('更新状态失败')
  }

  return data
}

// 邮件通知（集成第三方邮件服务）
export async function sendNotificationEmail(to: string, subject: string, content: string) {
  // 这里可以集成SendGrid、Resend等邮件服务
  // 或者使用Supabase Edge Functions
  console.log('Email notification:', { to, subject, content })
  
  // 示例：调用Edge Function发送邮件
  const { data, error } = await supabase.functions.invoke('send-email', {
    body: { to, subject, content }
  })

  if (error) {
    console.error('Error sending email:', error)
    // 不抛出错误，因为邮件发送失败不应该影响主流程
  }

  return data
}