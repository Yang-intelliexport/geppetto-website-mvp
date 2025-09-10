// Modal状态管理 - 使用Nanostores
import { atom, map } from 'nanostores'

// 模态框状态
export const modalState = map({
  isOpen: false,
  type: 'info', // 'success', 'error', 'warning', 'info', 'confirm', 'loading'
  title: '',
  message: '',
  options: {},
  id: null
})

// Toast状态 - 支持多个toast同时存在
export const toastList = atom([])

// 计数器用于生成唯一ID
let modalIdCounter = 0
let toastIdCounter = 0

/**
 * 打开模态框
 * @param {string} type - 模态框类型
 * @param {string} title - 标题
 * @param {string} message - 消息内容
 * @param {Object} options - 额外选项
 * @returns {string} 模态框ID
 */
export function openModal(type, title, message, options = {}) {
  const id = `modal_${++modalIdCounter}`
  
  modalState.set({
    isOpen: true,
    type,
    title,
    message,
    options,
    id
  })
  
  return id
}

/**
 * 关闭模态框
 */
export function closeModal() {
  modalState.setKey('isOpen', false)
}

/**
 * 显示成功模态框
 * @param {string} title - 标题
 * @param {string} message - 消息内容
 * @param {Object} options - 额外选项
 */
export function showSuccess(title, message, options = {}) {
  return openModal('success', title, message, options)
}

/**
 * 显示错误模态框
 * @param {string} title - 标题
 * @param {string} message - 消息内容
 * @param {Object} options - 额外选项
 */
export function showError(title, message, options = {}) {
  return openModal('error', title, message, options)
}

/**
 * 显示警告模态框
 * @param {string} title - 标题
 * @param {string} message - 消息内容
 * @param {Object} options - 额外选项
 */
export function showWarning(title, message, options = {}) {
  return openModal('warning', title, message, options)
}

/**
 * 显示信息模态框
 * @param {string} title - 标题
 * @param {string} message - 消息内容
 * @param {Object} options - 额外选项
 */
export function showInfo(title, message, options = {}) {
  return openModal('info', title, message, options)
}

/**
 * 显示确认模态框
 * @param {string} title - 标题
 * @param {string} message - 消息内容
 * @param {Object} options - 额外选项（包含onConfirm, onCancel回调）
 */
export function showConfirm(title, message, options = {}) {
  return openModal('confirm', title, message, {
    confirmText: '确认',
    cancelText: '取消',
    ...options
  })
}

/**
 * 显示加载模态框
 * @param {string} message - 加载消息
 * @param {Object} options - 额外选项
 */
export function showLoading(message = '加载中...', options = {}) {
  return openModal('loading', '', message, { closable: false, ...options })
}

/**
 * 显示Toast通知
 * @param {string} message - 消息内容
 * @param {string} type - 类型：success, error, info, warning
 * @param {number} duration - 显示时长（毫秒）
 */
export function showToast(message, type = 'info', duration = 3000) {
  const id = `toast_${++toastIdCounter}`
  const toast = {
    id,
    message,
    type,
    duration,
    createdAt: Date.now()
  }
  
  // 添加到toast列表
  const currentToasts = toastList.get()
  toastList.set([...currentToasts, toast])
  
  // 自动移除
  if (duration > 0) {
    setTimeout(() => {
      removeToast(id)
    }, duration)
  }
  
  return id
}

/**
 * 移除Toast
 * @param {string} toastId - Toast ID
 */
export function removeToast(toastId) {
  const currentToasts = toastList.get()
  toastList.set(currentToasts.filter(toast => toast.id !== toastId))
}

/**
 * 清除所有Toast
 */
export function clearAllToasts() {
  toastList.set([])
}

// Promise版本的确认对话框
export function confirmAsync(title, message, options = {}) {
  return new Promise((resolve) => {
    showConfirm(title, message, {
      ...options,
      onConfirm: () => resolve(true),
      onCancel: () => resolve(false)
    })
  })
}