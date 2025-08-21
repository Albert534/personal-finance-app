// src/hooks/useAuth.ts
import { useEffect, useState } from 'react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('logged') === 'true'
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem('logged') === 'true');
    };

    // Listen to localStorage changes (cross-tab + same tab)
    window.addEventListener('storage', handleStorageChange);

    // For same-tab updates (e.g. login/logout inside app)
    const overrideSetItem = (key: string, value: string) => {
      localStorage.setItem(key, value);
      handleStorageChange();
    };

    // Monkey-patch localStorage.setItem for same-tab sync
    (window as any).setAuthItem = overrideSetItem;

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return isAuthenticated;
}
