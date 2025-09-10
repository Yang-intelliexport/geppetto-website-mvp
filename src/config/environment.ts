/**
 * 🌍 环境配置管理 - 完全解耦
 * 
 * 统一管理不同环境下的配置参数
 */

export interface EnvironmentConfig {
  api: {
    baseUrl: string;
    timeout: number;
    retries: number;
  };
  features: {
    enableFileUpload: boolean;
    maxFileSize: number;
    supportedFileTypes: string[];
  };
  ui: {
    enableDebugLogs: boolean;
    autoHideSuccess: number;
    autoHideError: number;
  };
}

/**
 * 开发环境配置
 */
const developmentConfig: EnvironmentConfig = {
  api: {
    baseUrl: '',
    timeout: 10000,
    retries: 1
  },
  features: {
    enableFileUpload: true,
    maxFileSize: 50 * 1024 * 1024, // 50MB
    supportedFileTypes: ['.step', '.stp', '.stl', '.iges', '.igs', '.dwg', '.dxf', '.obj', '.ply', '.3mf']
  },
  ui: {
    enableDebugLogs: true,
    autoHideSuccess: 3000,
    autoHideError: 5000
  }
};

/**
 * 生产环境配置
 */
const productionConfig: EnvironmentConfig = {
  api: {
    baseUrl: '',
    timeout: 30000,
    retries: 3
  },
  features: {
    enableFileUpload: true,
    maxFileSize: 50 * 1024 * 1024, // 50MB
    supportedFileTypes: ['.step', '.stp', '.stl', '.iges', '.igs', '.dwg', '.dxf', '.obj', '.ply', '.3mf']
  },
  ui: {
    enableDebugLogs: false,
    autoHideSuccess: 3000,
    autoHideError: 5000
  }
};

/**
 * 测试环境配置
 */
const testConfig: EnvironmentConfig = {
  api: {
    baseUrl: '',
    timeout: 5000,
    retries: 0
  },
  features: {
    enableFileUpload: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB (测试环境限制更小)
    supportedFileTypes: ['.step', '.stl'] // 测试环境只支持主要格式
  },
  ui: {
    enableDebugLogs: true,
    autoHideSuccess: 1000,
    autoHideError: 2000
  }
};

/**
 * 获取当前环境配置
 */
export function getEnvironmentConfig(): EnvironmentConfig {
  // 在浏览器环境中检测
  if (typeof window !== 'undefined') {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return developmentConfig;
    }
    
    if (window.location.hostname.includes('test') || window.location.hostname.includes('staging')) {
      return testConfig;
    }
    
    return productionConfig;
  }

  // 在Node.js环境中检测
  const nodeEnv = process.env.NODE_ENV || 'development';
  const mode = import.meta?.env?.MODE || nodeEnv;
  
  switch (mode) {
    case 'production':
      return productionConfig;
    case 'test':
    case 'testing':
      return testConfig;
    default:
      return developmentConfig;
  }
}

/**
 * 当前环境配置实例
 */
export const config = getEnvironmentConfig();

/**
 * 环境检测工具
 */
export const env = {
  isDev: config === developmentConfig,
  isProd: config === productionConfig,
  isTest: config === testConfig,
  
  get current() {
    if (this.isDev) return 'development';
    if (this.isProd) return 'production';
    if (this.isTest) return 'test';
    return 'unknown';
  }
};

/**
 * 特性标志检测
 */
export const features = {
  fileUpload: config.features.enableFileUpload,
  debugLogs: config.ui.enableDebugLogs,
  
  // 文件上传限制
  maxFileSize: config.features.maxFileSize,
  supportedFileTypes: config.features.supportedFileTypes,
  
  // UI配置
  successTimeout: config.ui.autoHideSuccess,
  errorTimeout: config.ui.autoHideError
};

/**
 * API配置快捷方式
 */
export const apiConfig = config.api;

/**
 * 调试日志工具
 */
export const logger = {
  info: (...args: any[]) => {
    if (features.debugLogs) {
      console.log('[GEPPETTO]', ...args);
    }
  },
  
  error: (...args: any[]) => {
    if (features.debugLogs) {
      console.error('[GEPPETTO ERROR]', ...args);
    }
  },
  
  warn: (...args: any[]) => {
    if (features.debugLogs) {
      console.warn('[GEPPETTO WARN]', ...args);
    }
  }
};

/**
 * 验证当前环境配置
 */
export function validateConfig(): boolean {
  try {
    const cfg = getEnvironmentConfig();
    
    // 检查必需字段
    if (!cfg.api || typeof cfg.api.timeout !== 'number') {
      logger.error('Invalid API configuration');
      return false;
    }
    
    if (!cfg.features || !Array.isArray(cfg.features.supportedFileTypes)) {
      logger.error('Invalid features configuration');
      return false;
    }
    
    logger.info('Environment configuration validated successfully', {
      env: env.current,
      apiTimeout: cfg.api.timeout,
      maxFileSize: cfg.features.maxFileSize,
      debugLogs: cfg.ui.enableDebugLogs
    });
    
    return true;
  } catch (error) {
    logger.error('Configuration validation failed:', error);
    return false;
  }
}