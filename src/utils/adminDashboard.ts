// 管理后台工具函数
import { supabase, getQuoteRequests, updateQuoteStatus } from './supabase';

export interface DashboardStats {
  totalSubmissions: number;
  pendingQuotes: number;
  completedQuotes: number;
  avgResponseTime: number;
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: 'contact' | 'quote' | 'calculation';
  title: string;
  description: string;
  timestamp: string;
  status?: string;
}

// 获取仪表板统计数据
export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    // 并行获取各种统计数据
    const [contactStats, quoteStats, calcStats] = await Promise.all([
      getContactStats(),
      getQuoteStats(),
      getCalculationStats()
    ]);

    const recentActivity = await getRecentActivity();

    return {
      totalSubmissions: contactStats.total + quoteStats.total,
      pendingQuotes: quoteStats.pending,
      completedQuotes: quoteStats.completed,
      avgResponseTime: quoteStats.avgResponseTime,
      recentActivity
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw new Error('获取统计数据失败');
  }
}

// 获取联系表单统计
async function getContactStats() {
  const { data, error } = await supabase
    .from('contact_submissions')
    .select('id, created_at')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return {
    total: data?.length || 0,
    today: data?.filter(item => isToday(item.created_at)).length || 0,
    thisWeek: data?.filter(item => isThisWeek(item.created_at)).length || 0
  };
}

// 获取报价请求统计
async function getQuoteStats() {
  const { data, error } = await supabase
    .from('quote_requests')
    .select('id, status, created_at, updated_at')
    .order('created_at', { ascending: false });

  if (error) throw error;

  const pending = data?.filter(item => item.status === 'pending').length || 0;
  const reviewing = data?.filter(item => item.status === 'reviewing').length || 0;
  const completed = data?.filter(item => item.status === 'completed').length || 0;

  // 计算平均响应时间（小时）
  const completedItems = data?.filter(item => item.status === 'completed' && item.updated_at) || [];
  let avgResponseTime = 0;
  
  if (completedItems.length > 0) {
    const totalResponseTime = completedItems.reduce((sum, item) => {
      const created = new Date(item.created_at);
      const updated = new Date(item.updated_at);
      return sum + (updated.getTime() - created.getTime());
    }, 0);
    
    avgResponseTime = totalResponseTime / completedItems.length / (1000 * 60 * 60); // 转换为小时
  }

  return {
    total: data?.length || 0,
    pending,
    reviewing,
    completed,
    avgResponseTime: Math.round(avgResponseTime * 10) / 10
  };
}

// 获取成本计算统计
async function getCalculationStats() {
  const { data, error } = await supabase
    .from('cost_calculations')
    .select('id, created_at, total_cost')
    .order('created_at', { ascending: false });

  if (error) throw error;

  const totalValue = data?.reduce((sum, item) => sum + (item.total_cost || 0), 0) || 0;

  return {
    total: data?.length || 0,
    totalValue: Math.round(totalValue),
    today: data?.filter(item => isToday(item.created_at)).length || 0
  };
}

// 获取最近活动
async function getRecentActivity(): Promise<ActivityItem[]> {
  const activities: ActivityItem[] = [];

  try {
    // 获取最近的联系表单提交
    const { data: contacts } = await supabase
      .from('contact_submissions')
      .select('id, name, email, created_at, source')
      .order('created_at', { ascending: false })
      .limit(5);

    contacts?.forEach(contact => {
      activities.push({
        id: contact.id,
        type: 'contact',
        title: `新的咨询提交`,
        description: `${contact.name} (${contact.email}) 通过${contact.source}提交了咨询`,
        timestamp: contact.created_at
      });
    });

    // 获取最近的报价请求
    const { data: quotes } = await supabase
      .from('quote_requests')
      .select('id, name, email, status, material, quantity, created_at')
      .order('created_at', { ascending: false })
      .limit(5);

    quotes?.forEach(quote => {
      activities.push({
        id: quote.id,
        type: 'quote',
        title: `新的报价请求`,
        description: `${quote.name} 请求${quote.material}材料，数量${quote.quantity}件`,
        timestamp: quote.created_at,
        status: quote.status
      });
    });

    // 获取最近的成本计算
    const { data: calculations } = await supabase
      .from('cost_calculations')
      .select('id, project_name, total_cost, created_at')
      .order('created_at', { ascending: false })
      .limit(5);

    calculations?.forEach(calc => {
      activities.push({
        id: calc.id,
        type: 'calculation',
        title: `成本计算完成`,
        description: `项目"${calc.project_name}"，估算成本￥${calc.total_cost}`,
        timestamp: calc.created_at
      });
    });

    // 按时间排序并返回最近的10条
    return activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10);

  } catch (error) {
    console.error('Error fetching recent activity:', error);
    return [];
  }
}

// 获取待处理的报价请求
export async function getPendingQuotes() {
  try {
    const { data, error } = await supabase
      .from('quote_requests')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching pending quotes:', error);
    throw new Error('获取待处理报价失败');
  }
}

// 更新报价状态和信息
export async function updateQuote(id: string, updates: {
  status?: 'pending' | 'reviewing' | 'quoted' | 'completed';
  expert_notes?: string;
  final_quote?: number;
  delivery_days?: number;
}) {
  try {
    const { data, error } = await updateQuoteStatus(id, updates.status || 'reviewing', updates);
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating quote:', error);
    throw new Error('更新报价失败');
  }
}

// 发送报价邮件
export async function sendQuoteEmail(quoteId: string, quoteData: {
  customerEmail: string;
  customerName: string;
  finalQuote: number;
  deliveryDays: number;
  expertNotes?: string;
}) {
  try {
    // 调用Supabase Edge Function发送邮件
    const { data, error } = await supabase.functions.invoke('send-quote-email', {
      body: {
        quote_id: quoteId,
        to: quoteData.customerEmail,
        customer_name: quoteData.customerName,
        final_quote: quoteData.finalQuote,
        delivery_days: quoteData.deliveryDays,
        expert_notes: quoteData.expertNotes
      }
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error sending quote email:', error);
    throw new Error('发送报价邮件失败');
  }
}

// 导出数据
export async function exportData(type: 'contacts' | 'quotes' | 'calculations', format: 'csv' | 'json' = 'csv') {
  try {
    let data;
    let filename;

    switch (type) {
      case 'contacts':
        const { data: contacts } = await supabase
          .from('contact_submissions')
          .select('*')
          .order('created_at', { ascending: false });
        data = contacts;
        filename = `contacts_${new Date().toISOString().split('T')[0]}`;
        break;

      case 'quotes':
        const { data: quotes } = await supabase
          .from('quote_requests')
          .select('*')
          .order('created_at', { ascending: false });
        data = quotes;
        filename = `quotes_${new Date().toISOString().split('T')[0]}`;
        break;

      case 'calculations':
        const { data: calculations } = await supabase
          .from('cost_calculations')
          .select('*')
          .order('created_at', { ascending: false });
        data = calculations;
        filename = `calculations_${new Date().toISOString().split('T')[0]}`;
        break;
    }

    if (!data) {
      throw new Error('没有数据可导出');
    }

    if (format === 'csv') {
      return exportToCSV(data, filename);
    } else {
      return exportToJSON(data, filename);
    }
  } catch (error) {
    console.error('Error exporting data:', error);
    throw new Error('导出数据失败');
  }
}

// 导出为CSV
function exportToCSV(data: any[], filename: string) {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => {
      const value = row[header];
      // 处理包含逗号或引号的值
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    }).join(','))
  ].join('\n');

  downloadFile(csvContent, `${filename}.csv`, 'text/csv');
}

// 导出为JSON
function exportToJSON(data: any[], filename: string) {
  const jsonContent = JSON.stringify(data, null, 2);
  downloadFile(jsonContent, `${filename}.json`, 'application/json');
}

// 下载文件
function downloadFile(content: string, filename: string, contentType: string) {
  const blob = new Blob([content], { type: contentType });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}

// 时间辅助函数
function isToday(dateString: string): boolean {
  const date = new Date(dateString);
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

function isThisWeek(dateString: string): boolean {
  const date = new Date(dateString);
  const today = new Date();
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  return date >= weekAgo;
}

// 格式化时间
export function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return '刚刚';
  if (diffMins < 60) return `${diffMins}分钟前`;
  if (diffHours < 24) return `${diffHours}小时前`;
  if (diffDays < 7) return `${diffDays}天前`;
  
  return date.toLocaleDateString('zh-CN');
}

// 状态转换
export function getStatusText(status: string): string {
  const statusMap: Record<string, string> = {
    'pending': '待处理',
    'reviewing': '审核中',
    'quoted': '已报价',
    'completed': '已完成'
  };
  return statusMap[status] || status;
}

export function getStatusColor(status: string): string {
  const colorMap: Record<string, string> = {
    'pending': 'text-yellow-600 bg-yellow-50',
    'reviewing': 'text-blue-600 bg-blue-50',
    'quoted': 'text-purple-600 bg-purple-50',
    'completed': 'text-green-600 bg-green-50'
  };
  return colorMap[status] || 'text-gray-600 bg-gray-50';
}