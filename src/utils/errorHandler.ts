// 标准化错误处理工具
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

export enum ErrorCode {
  // 认证错误
  AUTH_REQUIRED = 'AUTH_REQUIRED',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  
  // 验证错误
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',
  MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',
  
  // 文件处理错误
  FILE_TOO_LARGE = 'FILE_TOO_LARGE',
  INVALID_FILE_TYPE = 'INVALID_FILE_TYPE',
  UPLOAD_FAILED = 'UPLOAD_FAILED',
  
  // 数据库错误
  DATABASE_ERROR = 'DATABASE_ERROR',
  RECORD_NOT_FOUND = 'RECORD_NOT_FOUND',
  DUPLICATE_ENTRY = 'DUPLICATE_ENTRY',
  
  // 网络错误
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  
  // 未知错误
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

// 创建标准API响应
export function createApiResponse<T>(data: T): ApiResponse<T> {
  return {
    success: true,
    data
  };
}

export function createErrorResponse(
  code: ErrorCode, 
  message: string, 
  details?: any
): ApiResponse {
  return {
    success: false,
    error: {
      code,
      message,
      details,
      timestamp: new Date().toISOString()
    }
  };
}

// 安全的API调用包装器
export async function safeApiCall<T>(
  operation: () => Promise<T>,
  context?: string
): Promise<ApiResponse<T>> {
  try {
    const data = await operation();
    return createApiResponse(data);
  } catch (error) {
    console.error(`API Error${context ? ` in ${context}` : ''}:`, error);
    
    // 根据错误类型返回相应的错误响应
    if (error instanceof ValidationError) {
      return createErrorResponse(
        ErrorCode.VALIDATION_ERROR,
        error.message,
        error.details
      );
    }
    
    if (error instanceof FileUploadError) {
      return createErrorResponse(
        error.code,
        error.message,
        error.details
      );
    }
    
    if (error instanceof DatabaseError) {
      return createErrorResponse(
        ErrorCode.DATABASE_ERROR,
        '数据库操作失败',
        process.env.NODE_ENV === 'development' ? error.details : undefined
      );
    }
    
    if (error instanceof NetworkError) {
      return createErrorResponse(
        ErrorCode.NETWORK_ERROR,
        '网络连接失败，请检查网络设置',
        error.details
      );
    }
    
    // 处理未知错误
    return createErrorResponse(
      ErrorCode.UNKNOWN_ERROR,
      error instanceof Error ? error.message : '未知错误',
      process.env.NODE_ENV === 'development' ? error : undefined
    );
  }
}

// 自定义错误类
export class ValidationError extends Error {
  constructor(
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class FileUploadError extends Error {
  constructor(
    public code: ErrorCode,
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'FileUploadError';
  }
}

export class DatabaseError extends Error {
  constructor(
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'DatabaseError';
  }
}

export class NetworkError extends Error {
  constructor(
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'NetworkError';
  }
}

// 错误处理中间件
export function handleSupabaseError(error: any): ApiError {
  const timestamp = new Date().toISOString();
  
  // Supabase 认证错误
  if (error.message?.includes('JWT')) {
    return {
      code: ErrorCode.SESSION_EXPIRED,
      message: '会话已过期，请重新登录',
      timestamp
    };
  }
  
  // Supabase RLS错误
  if (error.message?.includes('policy')) {
    return {
      code: ErrorCode.AUTH_REQUIRED,
      message: '权限不足',
      timestamp
    };
  }
  
  // Supabase 网络错误
  if (error.message?.includes('fetch')) {
    return {
      code: ErrorCode.NETWORK_ERROR,
      message: '网络连接失败',
      details: error.message,
      timestamp
    };
  }
  
  // 默认数据库错误
  return {
    code: ErrorCode.DATABASE_ERROR,
    message: error.message || '数据库操作失败',
    details: process.env.NODE_ENV === 'development' ? error : undefined,
    timestamp
  };
}

// 前端错误显示工具
export function showErrorNotification(error: ApiError | string) {
  const errorMessage = typeof error === 'string' ? error : error.message;
  const errorCode = typeof error === 'string' ? '' : error.code;
  
  // 创建错误通知元素
  const notification = document.createElement('div');
  notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-md';
  notification.innerHTML = `
    <div class="flex items-start space-x-3">
      <svg class="w-6 h-6 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
      </svg>
      <div class="flex-1">
        <h4 class="font-semibold mb-1">操作失败</h4>
        <p class="text-sm">${errorMessage}</p>
        ${errorCode ? `<p class="text-xs mt-1 opacity-75">错误代码: ${errorCode}</p>` : ''}
      </div>
      <button onclick="this.parentElement.parentElement.remove()" class="text-white hover:text-gray-200">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </button>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // 自动移除通知
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}

export function showSuccessNotification(message: string) {
  const notification = document.createElement('div');
  notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-md';
  notification.innerHTML = `
    <div class="flex items-start space-x-3">
      <svg class="w-6 h-6 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
      </svg>
      <div class="flex-1">
        <h4 class="font-semibold mb-1">操作成功</h4>
        <p class="text-sm">${message}</p>
      </div>
      <button onclick="this.parentElement.parentElement.remove()" class="text-white hover:text-gray-200">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </button>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 3000);
}

// 重试机制
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: any;
  
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      
      if (i === maxRetries) {
        throw lastError;
      }
      
      // 等待后重试
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
    }
  }
  
  throw lastError;
}

// 加载状态管理
export class LoadingManager {
  private loadingCount = 0;
  private loadingElement: HTMLElement | null = null;
  
  constructor(elementId?: string) {
    if (elementId) {
      this.loadingElement = document.getElementById(elementId);
    }
  }
  
  start() {
    this.loadingCount++;
    this.updateUI();
  }
  
  finish() {
    this.loadingCount = Math.max(0, this.loadingCount - 1);
    this.updateUI();
  }
  
  private updateUI() {
    const isLoading = this.loadingCount > 0;
    
    if (this.loadingElement) {
      this.loadingElement.style.display = isLoading ? 'block' : 'none';
    }
    
    // 更新所有提交按钮的状态
    const buttons = document.querySelectorAll('button[type="submit"]');
    buttons.forEach(button => {
      const btn = button as HTMLButtonElement;
      btn.disabled = isLoading;
    });
  }
}