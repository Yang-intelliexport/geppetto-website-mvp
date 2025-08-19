// 表单验证工具类
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings?: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  service?: string;
  quantity?: string;
  contact_preference: string;
  privacy: boolean;
}

export interface QuoteFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  material: string;
  quantity: number;
  precision?: string;
  delivery?: string;
  requirements?: string;
}

// 通用验证函数
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  // 支持中国大陆手机号和固话格式
  const phoneRegex = /^(?:(?:\+|00)86)?1[3-9]\d{9}$|^(?:(?:\+|00)86)?(?:0\d{2,3}-?)?\d{7,8}$/;
  return phoneRegex.test(phone.replace(/[\s-]/g, ''));
}

export function validateRequired(value: string): boolean {
  return value && value.trim().length > 0;
}

export function validateFileType(file: File, allowedTypes: string[]): boolean {
  const extension = '.' + file.name.split('.').pop()?.toLowerCase();
  return allowedTypes.includes(extension || '');
}

export function validateFileSize(file: File, maxSizeMB: number): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
}

// 联系表单验证
export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // 必填字段验证
  if (!validateRequired(data.name)) {
    errors.push('请输入姓名');
  }

  if (!validateRequired(data.email)) {
    errors.push('请输入邮箱地址');
  } else if (!validateEmail(data.email)) {
    errors.push('请输入有效的邮箱地址');
  }

  if (!validateRequired(data.message)) {
    errors.push('请输入项目描述');
  } else if (data.message.length < 10) {
    warnings.push('项目描述建议不少于10个字符');
  }

  if (!validateRequired(data.contact_preference)) {
    errors.push('请选择联系偏好');
  }

  if (!data.privacy) {
    errors.push('请阅读并同意隐私政策');
  }

  // 可选字段验证
  if (data.phone && !validatePhone(data.phone)) {
    errors.push('请输入有效的手机号码');
  }

  // 业务逻辑验证
  if (data.service === 'other' && (!data.message || !data.message.includes('服务'))) {
    warnings.push('选择"其他服务"时，建议在描述中详细说明所需服务类型');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

// AI报价表单验证
export function validateQuoteForm(data: QuoteFormData): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // 必填字段验证
  if (!validateRequired(data.name)) {
    errors.push('请输入姓名');
  }

  if (!validateRequired(data.email)) {
    errors.push('请输入邮箱地址');
  } else if (!validateEmail(data.email)) {
    errors.push('请输入有效的邮箱地址');
  }

  if (!validateRequired(data.material)) {
    errors.push('请选择材料类型');
  }

  if (!data.quantity || data.quantity < 1) {
    errors.push('请输入有效的数量（至少1件）');
  } else if (data.quantity > 10000) {
    warnings.push('大批量订单（>10000件）建议联系销售团队获取专门报价');
  }

  // 可选字段验证
  if (data.phone && !validatePhone(data.phone)) {
    errors.push('请输入有效的手机号码');
  }

  // 业务逻辑验证
  if (data.precision === 'extreme' && data.quantity > 100) {
    warnings.push('极限精度（±0.01mm）大批量生产成本较高，建议考虑是否所有尺寸都需要此精度');
  }

  if (data.delivery === 'immediate' && data.quantity > 10) {
    warnings.push('极急交期（12小时）适合小批量，大批量可能无法按时完成');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

// 文件验证
export function validateUploadedFiles(files: FileList | File[], options: {
  maxFiles?: number;
  maxSizeMB?: number;
  allowedTypes?: string[];
} = {}): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  const {
    maxFiles = 10,
    maxSizeMB = 50,
    allowedTypes = ['.step', '.stp', '.stl', '.iges', '.igs', '.dwg', '.dxf', '.obj', '.ply', '.3mf']
  } = options;

  const fileArray = Array.from(files);

  // 文件数量检查
  if (fileArray.length === 0) {
    errors.push('请至少上传一个文件');
    return { isValid: false, errors, warnings };
  }

  if (fileArray.length > maxFiles) {
    errors.push(`最多只能上传${maxFiles}个文件`);
  }

  // 逐个文件检查
  for (const file of fileArray) {
    // 文件大小检查
    if (!validateFileSize(file, maxSizeMB)) {
      errors.push(`文件"${file.name}"超过${maxSizeMB}MB大小限制`);
    }

    // 文件类型检查
    if (!validateFileType(file, allowedTypes)) {
      errors.push(`文件"${file.name}"格式不支持，请上传${allowedTypes.join(', ')}格式的文件`);
    }

    // 文件名检查
    if (file.name.length > 100) {
      warnings.push(`文件"${file.name}"名称过长，建议重命名后上传`);
    }

    if (!/^[\w\-. ]+$/.test(file.name)) {
      warnings.push(`文件"${file.name}"名称包含特殊字符，可能影响处理`);
    }
  }

  // 业务逻辑检查
  const totalSize = fileArray.reduce((sum, file) => sum + file.size, 0);
  const totalSizeMB = totalSize / (1024 * 1024);
  
  if (totalSizeMB > 100) {
    warnings.push(`总文件大小${totalSizeMB.toFixed(1)}MB较大，上传可能需要较长时间`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

// 实时验证辅助函数
export function createRealTimeValidator(
  element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  validationFn: (value: string) => ValidationResult,
  errorContainer?: HTMLElement
) {
  let timeout: NodeJS.Timeout;

  const validateAndShow = () => {
    const result = validationFn(element.value);
    
    // 移除之前的验证状态
    element.classList.remove('border-red-500', 'border-green-500');
    
    if (errorContainer) {
      errorContainer.innerHTML = '';
    }

    if (element.value.trim()) {
      if (result.isValid) {
        element.classList.add('border-green-500');
      } else {
        element.classList.add('border-red-500');
        
        if (errorContainer && result.errors.length > 0) {
          errorContainer.innerHTML = `
            <div class="text-red-600 text-sm mt-1">
              ${result.errors[0]}
            </div>
          `;
        }
      }
    }
  };

  // 防抖验证
  element.addEventListener('input', () => {
    clearTimeout(timeout);
    timeout = setTimeout(validateAndShow, 300);
  });

  // 失焦时立即验证
  element.addEventListener('blur', validateAndShow);
}

// 表单提交前的最终验证
export function validateFormBeforeSubmit(form: HTMLFormElement): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // 检查所有必填字段
  const requiredFields = form.querySelectorAll('[required]');
  requiredFields.forEach((field) => {
    const input = field as HTMLInputElement;
    if (!input.value.trim()) {
      const label = form.querySelector(`label[for="${input.id}"]`)?.textContent || input.name;
      errors.push(`请填写${label}`);
    }
  });

  // 检查复选框
  const checkboxes = form.querySelectorAll('input[type="checkbox"][required]');
  checkboxes.forEach((checkbox) => {
    const input = checkbox as HTMLInputElement;
    if (!input.checked) {
      const label = form.querySelector(`label[for="${input.id}"]`)?.textContent || '必选项';
      errors.push(`请选择${label}`);
    }
  });

  // 检查单选按钮组
  const radioGroups = new Set<string>();
  const radios = form.querySelectorAll('input[type="radio"][required]');
  radios.forEach((radio) => {
    const input = radio as HTMLInputElement;
    radioGroups.add(input.name);
  });

  radioGroups.forEach((groupName) => {
    const checkedRadio = form.querySelector(`input[name="${groupName}"]:checked`);
    if (!checkedRadio) {
      errors.push(`请选择${groupName}`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

// 显示验证错误的工具函数
export function showValidationErrors(
  errors: string[],
  container?: HTMLElement
) {
  if (!container) {
    // 如果没有指定容器，创建一个临时通知
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-md';
    notification.innerHTML = `
      <div class="flex items-start space-x-3">
        <svg class="w-6 h-6 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
        </svg>
        <div>
          <h4 class="font-semibold mb-2">请修正以下问题：</h4>
          <ul class="text-sm space-y-1">
            ${errors.map(error => `<li>• ${error}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 5000);
  } else {
    container.innerHTML = `
      <div class="bg-red-50 border border-red-200 rounded-lg p-4">
        <div class="flex items-start space-x-3">
          <svg class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
          </svg>
          <div>
            <h4 class="text-red-800 font-semibold mb-2">请修正以下问题：</h4>
            <ul class="text-red-700 text-sm space-y-1">
              ${errors.map(error => `<li>• ${error}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;
  }
}