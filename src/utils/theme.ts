import { useState, useEffect } from 'react';

export type ThemeMode = 'system' | 'light' | 'dark';

const THEME_STORAGE_KEY = 'relomatch_theme_mode';

export function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return 'dark';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function getStoredTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'system';
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
      return saved;
    }
  } catch (e) {}
  return 'system';
}

export function applyTheme(theme: ThemeMode): 'light' | 'dark' {
  if (typeof document === 'undefined') return 'dark';
  const effective = theme === 'system' ? getSystemTheme() : theme;
  const root = document.documentElement;

  if (effective === 'dark') {
    root.classList.add('dark');
    root.style.colorScheme = 'dark';
  } else {
    root.classList.remove('dark');
    root.style.colorScheme = 'light';
  }

  return effective;
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>(() => getStoredTheme());
  const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>(() => {
    const initial = getStoredTheme();
    return initial === 'system' ? getSystemTheme() : initial;
  });

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (e) {}
    const eff = applyTheme(newTheme);
    setEffectiveTheme(eff);
  };

  useEffect(() => {
    // Apply on mount
    const eff = applyTheme(theme);
    setEffectiveTheme(eff);

    // Listen to system changes
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      const currentStored = getStoredTheme();
      if (currentStored === 'system') {
        const updated = applyTheme('system');
        setEffectiveTheme(updated);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const toggleTheme = () => {
    const next = effectiveTheme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  };

  return { theme, effectiveTheme, setTheme, toggleTheme };
}
