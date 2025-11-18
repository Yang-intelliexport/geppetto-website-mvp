/**
 * 🔍 统一验证模式 - 前后端共享
 * 
 * 提供一致的数据验证规则，确保前后端验证逻辑同步
 */

// 支持的材料类型
export const ALLOWED_MATERIALS = [
  'aluminum-6061',
  'aluminum-7075', 
  'stainless-304',
  'stainless-316',
  'brass',
  'copper',
  'carbon-steel',
  'titanium',
  'other'
] as const;

// 支持的文件类型
export const ALLOWED_FILE_TYPES = {
  '.step': ['application/step', 'application/stp', 'text/plain'],
  '.stp': ['application/step', 'application/stp', 'text/plain'],
  '.stl': ['application/sla', 'application/vnd.ms-pki.stl', 'application/x-navistyle'],
  '.iges': ['application/iges', 'model/iges'],
  '.igs': ['application/iges', 'model/iges'],
  '.dwg': ['application/acad', 'application/x-dwg', 'application/x-autocad'],
  '.dxf': ['application/dxf', 'application/x-autocad', 'text/plain'],
  '.obj': ['application/x-tgif', 'text/plain'],
  '.ply': ['application/octet-stream', 'text/plain'],
  '.3mf': ['model/3mf', 'application/vnd.ms-3mfdocument']
} as const;

// 验证规则接口
export interface ValidationRule {
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: RegExp;
  enum?: readonly string[];
  custom?: (value: any) => boolean | string;
}

export interface FileValidationRule {
  required?: boolean;
  maxSize?: number;
  maxCount?: number;
  allowedTypes?: Record<string, readonly string[]>;
  custom?: (files: File[]) => boolean | string;
}

// 报价表单验证规则
export const QuoteFormSchema = {
  // 联系信息
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    custom: (value: string) => {
      if (value.length > 254) return '邮箱地址过长';
      return true;
    }
  } as ValidationRule,

  name: {
    required: false,
    max: 100,
    pattern: /^[a-zA-Z\u4e00-\u9fa5\s'-]+$/,
    custom: (value: string) => {
      if (value && value.trim().length < 2) return '姓名至少需要2个字符';
      return true;
    }
  } as ValidationRule,

  company: {
    required: false,
    max: 200,
    custom: (value: string) => {
      if (value && /[<>"\&]/.test(value)) return '公司名称包含非法字符';
      return true;
    }
  } as ValidationRule,

  phone: {
    required: false,
    pattern: /^[\+]?[\d\s\-\(\)]{10,20}$/,
    custom: (value: string) => {
      if (value && value.replace(/[\s\-\(\)\+]/g, '').length < 10) {
        return '电话号码格式不正确';
      }
      return true;
    }
  } as ValidationRule,

  // 产品规格
  material: {
    required: true,
    enum: ALLOWED_MATERIALS
  } as ValidationRule,

  quantity: {
    required: true,
    min: 1,
    max: 100000,
    custom: (value: number) => {
      if (!Number.isInteger(value)) return '数量必须为整数';
      return true;
    }
  } as ValidationRule,

  notes: {
    required: false,
    max: 2000,
    custom: (value: string) => {
      if (value && /[<>"\&]/.test(value)) return '备注包含非法字符';
      return true;
    }
  } as ValidationRule,

  // 文件上传
  files: {
    required: true,
    maxSize: 50 * 1024 * 1024, // 50MB
    maxCount: 10,
    allowedTypes: ALLOWED_FILE_TYPES,
    custom: (files: File[]) => {
      if (files.some(file => file.size === 0)) return '不允许上传空文件';
      return true;
    }
  } as FileValidationRule
};

// 验证器类
export class FormValidator {
  private errors: Record<string, string[]> = {};

  /**
   * 验证单个字段
   */
  validateField(fieldName: string, value: any, rule: ValidationRule): string[] {
    const errors: string[] = [];

    // 必填验证
    if (rule.required && (value === null || value === undefined || value === '')) {
      errors.push(`${fieldName} 是必填字段`);
      return errors; // 如果必填验证失败，不继续其他验证
    }

    // 如果值为空且非必填，跳过其他验证
    if (!value && !rule.required) {
      return errors;
    }

    // 字符串长度验证
    if (typeof value === 'string') {
      if (rule.min && value.length < rule.min) {
        errors.push(`${fieldName} 至少需要 ${rule.min} 个字符`);
      }
      if (rule.max && value.length > rule.max) {
        errors.push(`${fieldName} 不能超过 ${rule.max} 个字符`);
      }
    }

    // 数字范围验证
    if (typeof value === 'number') {
      if (rule.min && value < rule.min) {
        errors.push(`${fieldName} 不能小于 ${rule.min}`);
      }
      if (rule.max && value > rule.max) {
        errors.push(`${fieldName} 不能大于 ${rule.max}`);
      }
    }

    // 正则表达式验证
    if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
      errors.push(`${fieldName} 格式不正确`);
    }

    // 枚举值验证
    if (rule.enum && !rule.enum.includes(value)) {
      errors.push(`${fieldName} 不是有效选项`);
    }

    // 自定义验证
    if (rule.custom) {
      const customResult = rule.custom(value);
      if (customResult !== true) {
        errors.push(typeof customResult === 'string' ? customResult : `${fieldName} 验证失败`);
      }
    }

    return errors;
  }

  /**
   * 验证文件字段
   */
  validateFileField(fieldName: string, files: File[], rule: FileValidationRule): string[] {
    const errors: string[] = [];

    // 必填验证
    if (rule.required && (!files || files.length === 0)) {
      errors.push(`${fieldName} 是必填字段`);
      return errors;
    }

    // 如果没有文件且非必填，跳过其他验证
    if (!files || files.length === 0) {
      return errors;
    }

    // 文件数量验证
    if (rule.maxCount && files.length > rule.maxCount) {
      errors.push(`${fieldName} 最多只能上传 ${rule.maxCount} 个文件`);
    }

    // 验证每个文件
    for (const file of files) {
      // 文件大小验证
      if (rule.maxSize && file.size > rule.maxSize) {
        errors.push(`文件 "${file.name}" 超过大小限制 ${this.formatFileSize(rule.maxSize)}`);
      }

      // 文件类型验证
      if (rule.allowedTypes) {
        const extension = '.' + file.name.split('.').pop()?.toLowerCase();
        if (!Object.keys(rule.allowedTypes).includes(extension)) {
          errors.push(`文件 "${file.name}" 类型不支持`);
        }
      }

      // 文件名验证
      if (file.name.length > 255) {
        errors.push(`文件名 "${file.name}" 过长`);
      }

      if (/[<>:"|?*\x00-\x1f]/.test(file.name)) {
        errors.push(`文件名 "${file.name}" 包含非法字符`);
      }
    }

    // 自定义验证
    if (rule.custom) {
      const customResult = rule.custom(files);
      if (customResult !== true) {
        errors.push(typeof customResult === 'string' ? customResult : `${fieldName} 验证失败`);
      }
    }

    return errors;
  }

  /**
   * 验证整个表单
   */
  validateForm(data: Record<string, any>, schema: Record<string, ValidationRule | FileValidationRule>): boolean {
    this.errors = {};

    for (const [fieldName, rule] of Object.entries(schema)) {
      const value = data[fieldName];
      
      if (fieldName === 'files' && 'allowedTypes' in rule) {
        // 文件字段特殊处理
        const fileErrors = this.validateFileField(fieldName, value, rule as FileValidationRule);
        if (fileErrors.length > 0) {
          this.errors[fieldName] = fileErrors;
        }
      } else {
        // 普通字段验证
        const fieldErrors = this.validateField(fieldName, value, rule as ValidationRule);
        if (fieldErrors.length > 0) {
          this.errors[fieldName] = fieldErrors;
        }
      }
    }

    return Object.keys(this.errors).length === 0;
  }

  /**
   * 获取验证错误
   */
  getErrors(): Record<string, string[]> {
    return this.errors;
  }

  /**
   * 获取所有错误信息的数组
   */
  getAllErrors(): string[] {
    return Object.values(this.errors).flat();
  }

  /**
   * 格式化文件大小
   */
  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

// 便捷的验证函数
export function validateQuoteForm(data: {
  email: string;
  name?: string;
  company?: string;
  phone?: string;
  material: string;
  quantity: number;
  notes?: string;
  files: File[];
}): { success: boolean; errors: Record<string, string[]> } {
  const validator = new FormValidator();
  const success = validator.validateForm(data, QuoteFormSchema);
  
  return {
    success,
    errors: validator.getErrors()
  };
}

// 错误信息本地化
export const ErrorMessages = {
  zh: {
    required: '{{field}} 是必填字段',
    email: '邮箱格式不正确',
    minLength: '{{field}} 至少需要 {{min}} 个字符',
    maxLength: '{{field}} 不能超过 {{max}} 个字符',
    pattern: '{{field}} 格式不正确',
    enum: '{{field}} 不是有效选项',
    fileSize: '文件 "{{filename}}" 超过大小限制',
    fileType: '文件 "{{filename}}" 类型不支持',
    fileCount: '最多只能上传 {{max}} 个文件'
  },
  en: {
    required: '{{field}} is required',
    email: 'Invalid email format',
    minLength: '{{field}} must be at least {{min}} characters',
    maxLength: '{{field}} cannot exceed {{max}} characters',
    pattern: '{{field}} format is invalid',
    enum: '{{field}} is not a valid option',
    fileSize: 'File "{{filename}}" exceeds size limit',
    fileType: 'File "{{filename}}" type not supported',
    fileCount: 'Maximum {{max}} files allowed'
  }
};

// 导出类型定义
export type MaterialType = typeof ALLOWED_MATERIALS[number];
export type FileExtension = keyof typeof ALLOWED_FILE_TYPES;
