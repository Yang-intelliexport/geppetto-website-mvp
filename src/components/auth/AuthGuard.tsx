import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
  fallback?: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  redirectTo,
  fallback 
}) => {
  const { user, loading } = useAuth();

  useEffect(() => {
    // 如果不在加载中且用户未登录，则跳转到登录页
    if (!loading && !user && redirectTo !== false) {
      const currentPath = window.location.pathname;
      const loginUrl = redirectTo || `/login?redirect=${encodeURIComponent(currentPath)}`;
      window.location.href = loginUrl;
    }
  }, [user, loading, redirectTo]);

  // 加载中显示加载状态
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="flex items-center space-x-2">
          <div className="animate-spin h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full"></div>
          <span className="text-gray-600">加载中...</span>
        </div>
      </div>
    );
  }

  // 未登录且有fallback组件则显示fallback
  if (!user && fallback) {
    return <>{fallback}</>;
  }

  // 未登录且没有fallback则不渲染内容（等待跳转）
  if (!user) {
    return null;
  }

  // 已登录则渲染子组件
  return <>{children}</>;
};

export default AuthGuard;