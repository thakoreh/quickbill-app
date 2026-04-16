'use client';
import { useState, useEffect } from 'react';

export function useTheme() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDark(isDark);
  }, []);

  const toggle = () => {
    setDark(prev => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      localStorage.setItem('quickbill-theme', next ? 'dark' : 'light');
      return next;
    });
  };

  return { dark, toggle };
}
