import { atom } from 'nanostores';
import type { Session, User } from '@supabase/supabase-js';

// 创建session atom来存储认证会话信息
export const sessionStore = atom<Session | null>(null);

// 创建user atom来存储用户信息（从session中派生）
export const userStore = atom<User | null>(null);

// 创建loading atom来跟踪认证状态加载中
export const authLoadingStore = atom<boolean>(true);

// 辅助函数：更新session和相关状态
export function setSession(session: Session | null) {
  sessionStore.set(session);
  userStore.set(session?.user ?? null);
  authLoadingStore.set(false);
}

// 辅助函数：设置认证加载状态
export function setAuthLoading(loading: boolean) {
  authLoadingStore.set(loading);
}

// 辅助函数：获取当前会话
export function getCurrentSession(): Session | null {
  return sessionStore.get();
}

// 辅助函数：获取当前用户
export function getCurrentUser(): User | null {
  return userStore.get();
}

// 辅助函数：检查用户是否已登录
export function isAuthenticated(): boolean {
  return !!sessionStore.get();
}