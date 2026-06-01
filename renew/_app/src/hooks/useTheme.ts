import { useEffect, useState } from 'react';
import type React from 'react';

export type ThemeMode = 'dark' | 'light';

const STORAGE_KEY = 'theme';
const LIGHT_THEME_COLOR = '#f6f2ea';
const DARK_THEME_COLOR = '#0a0a0a';

function getStoredTheme(): ThemeMode | null {
  if (typeof window === 'undefined') return null;
  let stored: string | null = null;
  try {
    stored = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
  return stored === 'light' || stored === 'dark' ? stored : null;
}

function applyTheme(theme: ThemeMode) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;

  const themeColorMeta = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"]',
  );
  if (themeColorMeta) {
    themeColorMeta.setAttribute(
      'content',
      theme === 'light' ? LIGHT_THEME_COLOR : DARK_THEME_COLOR,
    );
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    return getStoredTheme() ?? 'dark';
  });

  useEffect(() => {
    applyTheme(theme);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Ignore storage failures in private or restricted browsing modes.
    }
  }, [theme]);

  function toggleTheme(e?: React.MouseEvent) {
    const root = document.documentElement;
    if (e) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      root.style.setProperty('--theme-toggle-x', Math.round(rect.left + rect.width / 2) + 'px');
      root.style.setProperty('--theme-toggle-y', Math.round(rect.top + rect.height / 2) + 'px');
    }

    const next = theme === 'dark' ? 'light' : 'dark';

    if (!document.startViewTransition) {
      setTheme(next);
      return;
    }

    document.startViewTransition(() => {
      setTheme(next);
    });
  }

  return {
    theme,
    isDark: theme === 'dark',
    toggleTheme,
  };
}
