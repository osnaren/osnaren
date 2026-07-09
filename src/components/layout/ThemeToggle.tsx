'use client';

import { useEffect, useState } from 'react';

import { Moon, Sun } from 'lucide-react';

type Theme = 'light' | 'dark';

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.setAttribute('data-theme-transition', '');
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  window.setTimeout(() => root.removeAttribute('data-theme-transition'), 350);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  // data-theme on <html> is the single source of truth; observing it keeps
  // every toggle instance (desktop + mobile header) in sync.
  useEffect(() => {
    const root = document.documentElement;
    const read = () => setTheme((root.dataset.theme as Theme) ?? 'light');
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const next: Theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* private mode — theme just won't persist */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      className="border-line hover:border-line-strong flex items-center rounded-full border p-0.5 transition-colors"
    >
      <span
        aria-hidden="true"
        className={`grid size-6 place-items-center rounded-full text-[11px] ${
          theme !== 'dark' ? 'bg-ink text-paper' : 'text-faint'
        }`}
      >
        <Sun className="size-3.5" />
      </span>
      <span
        aria-hidden="true"
        className={`grid size-6 place-items-center rounded-full text-[11px] ${
          theme === 'dark' ? 'bg-ink text-paper' : 'text-faint'
        }`}
      >
        <Moon className="size-3.5" />
      </span>
    </button>
  );
}
