import { useEffect, useState } from 'react';

export type ThemeMode = 'dark' | 'light';

const STORAGE_KEY = 'theme';
const LIGHT_THEME_COLOR = '#f6f2ea';
const DARK_THEME_COLOR = '#0a0a0a';

function getSystemTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark';
}

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
    return getStoredTheme() ?? getSystemTheme();
  });

  useEffect(() => {
    applyTheme(theme);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Ignore storage failures in private or restricted browsing modes.
    }
  }, [theme]);

  return {
    theme,
    isDark: theme === 'dark',
    toggleTheme: () =>
      setTheme((current) => (current === 'dark' ? 'light' : 'dark')),
  };
}
