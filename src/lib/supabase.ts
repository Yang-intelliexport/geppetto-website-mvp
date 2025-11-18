import { createClient } from '@supabase/supabase-js'

// 从环境变量中获取 Supabase 的 URL 和 anon key
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// 创建并导出 Supabase 客户端，确保与SSR客户端域名配置一致
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    flowType: "pkce"  // Astro官方推荐的PKCE流程
  },
})

// 管理员客户端（使用service role key）
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY
export const supabaseAdmin = import.meta.env.SSR && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

// 类型定义
export interface Quote {
  id: string;
  token: string;
  company_name?: string;
  contact_name: string;
  email: string;
  phone?: string;
  country?: string;
  product_name: string;
  material: 'aluminum' | 'steel' | 'stainless_steel' | 'brass' | 'titanium' | 'plastic' | 'other';
  quantity: number;
  surface_finish?: string;
  tolerance?: string;
  special_requirements?: string;
  ai_complexity_score?: number;
  ai_estimated_hours?: number;
  ai_material_cost?: number;
  ai_labor_cost?: number;
  ai_total_estimate?: number;
  ai_confidence_score?: number;
  status: 'pending' | 'processing' | 'quoted' | 'approved' | 'in_production' | 'completed' | 'cancelled';
  priority: number;
  unit_price?: number;
  total_price?: number;
  delivery_time_days?: number;
  cad_file_path?: string;
  created_at: string;
  updated_at: string;
  expires_at: string;
  assigned_to?: string;
  internal_notes?: string;
}

export interface QuoteFile {
  id: string;
  quote_id: string;
  original_filename: string;
  file_path: string;
  file_size: number;
  file_type: string;
  ai_analyzed: boolean;
  ai_geometry_complexity?: number;
  ai_feature_count?: number;
  ai_surface_area?: number;
  ai_material_volume?: number;
  ai_machining_time_estimate?: number;
  created_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  quote_id: string;
  status: 'pending' | 'confirmed' | 'in_production' | 'quality_check' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  production_started_at?: string;
  estimated_completion_at?: string;
  actual_completion_at?: string;
  shipping_address?: string;
  tracking_number?: string;
  shipped_at?: string;
  delivered_at?: string;
  payment_status: string;
  payment_intent_id?: string;
  paid_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Conversation {
  id: string;
  quote_id: string;
  sender_name: string;
  sender_email: string;
  is_internal: boolean;
  subject?: string;
  message: string;
  created_at: string;
}
