import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '@nanostores/react';
import { userStore } from '../../stores/sessionStore';

type Props = {
  currentLang?: 'zh' | 'en';
  currentPath?: string;
  initialUserEmail?: string | null;
};

const labels = {
  en: {
    signIn: 'Sign In',
    menuTitle: 'Signed in as',
    signOut: 'Sign Out'
  },
  zh: {
    signIn: '登录',
    menuTitle: '当前账号',
    signOut: '退出登录'
  }
} as const;

const getInitials = (email?: string | null) => {
  if (!email) return 'U';
  const namePart = email.split('@')[0] || email;
  return namePart.slice(0, 2).toUpperCase();
};

export default function UserMenu({ currentLang = 'en', currentPath = '/', initialUserEmail = null }: Props) {
  const user = useStore(userStore);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const t = labels[currentLang];

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.debug('[UserMenu] 👤 User state changed:', {
        storeUser: user ? { email: user.email, id: user.id } : null,
        initialUserEmail,
        isHydrated: Boolean(user),
        effectiveEmail: user?.email ?? initialUserEmail ?? null,
        willShowLogin: !Boolean(user?.email ?? initialUserEmail ?? null),
        timestamp: new Date().toISOString()
      });
    }
  }, [user, initialUserEmail]);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const redirectTarget = currentPath || '/';
  const loginUrl = `/${currentLang}/login?redirect=${encodeURIComponent(redirectTarget)}`;

  const handleLogout = async () => {
    setLoading(true);
    try {
      const { createClient } = await import('../../lib/supabase/client');
      const supabase = createClient();
      await supabase.auth.signOut();
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const effectiveEmail = user?.email ?? initialUserEmail ?? null;
  const isLoggedIn = Boolean(effectiveEmail);

  if (!isLoggedIn) {
    if (import.meta.env.DEV) {
      console.debug('[UserMenu] 🔐 Rendering login link:', { 
        loginUrl, 
        initialUserEmail, 
        storeEmail: user?.email,
        effectiveEmail,
        isLoggedIn,
        userStore: user,
        timestamp: new Date().toISOString()
      });
    }
    return (
      <a
        href={loginUrl}
        className="inline-flex items-center px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:text-purple-600 hover:border-purple-400 transition-colors"
      >
        {t.signIn}
      </a>
    );
  }

  const initials = getInitials(effectiveEmail);

  if (import.meta.env.DEV) {
    console.debug('[UserMenu] 👥 Rendering user menu:', { 
      email: effectiveEmail, 
      initials,
      userStore: user,
      initialUserEmail,
      timestamp: new Date().toISOString()
    });
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 shadow-sm hover:border-purple-400 transition-colors"
      >
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-purple-600 text-xs font-semibold text-white">
          {initials}
        </span>
        <span className="hidden sm:inline text-sm text-gray-700 max-w-[120px] truncate">{effectiveEmail}</span>
        <svg
          className={`h-4 w-4 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-gray-100 bg-white shadow-xl z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-xs uppercase tracking-wide text-gray-400">{t.menuTitle}</p>
            <p className="mt-1 text-sm font-medium text-gray-900 truncate">{effectiveEmail}</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            disabled={loading}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 disabled:opacity-50"
          >
            <svg className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M3 4.5A1.5 1.5 0 014.5 3h6a1.5 1.5 0 011.5 1.5V6a.5.5 0 01-1 0V4.5a.5.5 0 00-.5-.5h-6a.5.5 0 00-.5.5v11a.5.5 0 00.5.5h6a.5.5 0 00.5-.5V14a.5.5 0 011 0v1.5A1.5 1.5 0 0110.5 17h-6A1.5 1.5 0 013 15.5v-11z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M7.854 10.354a.5.5 0 010-.708l3-3a.5.5 0 11.708.708L9.707 9.5H16.5a.5.5 0 010 1H9.707l1.855 1.854a.5.5 0 01-.708.708l-3-3z"
                clipRule="evenodd"
              />
            </svg>
            {t.signOut}
          </button>
        </div>
      )}
    </div>
  );
}
