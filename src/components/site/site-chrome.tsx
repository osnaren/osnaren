'use client';

import { cn } from '@/lib/utils';
import { BriefcaseBusiness, FileText, FlaskConical, History, Home, Mail, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/work', label: 'Work', icon: BriefcaseBusiness },
  { href: '/lab', label: 'Lab', icon: FlaskConical },
  { href: '/story', label: 'Story', icon: History },
  { href: '/resume', label: 'Resume', icon: FileText },
  { href: '/contact', label: 'Contact', icon: Mail },
];

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteChrome() {
  const pathname = usePathname();
  const [paperMode, setPaperMode] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem('osnaren-theme');
    const shouldUsePaper = stored === 'paper';
    document.documentElement.classList.toggle('paper-mode', shouldUsePaper);
    setPaperMode(shouldUsePaper);
  }, []);

  function toggleTheme() {
    const next = !paperMode;
    setPaperMode(next);
    document.documentElement.classList.toggle('paper-mode', next);
    window.localStorage.setItem('osnaren-theme', next ? 'paper' : 'dark');
  }

  return (
    <header className="site-nav">
      <Link href="/" className="brand-lockup" aria-label="osnaren home">
        <span className="brand-mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span>osnaren</span>
      </Link>

      <nav className="nav-links" aria-label="Primary navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn('nav-link', active && 'is-active')}
              aria-current={active ? 'page' : undefined}
            >
              <Icon aria-hidden="true" size={16} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <button className="icon-button" type="button" onClick={toggleTheme} aria-label="Toggle paper theme">
        {paperMode ? <Moon aria-hidden="true" size={18} /> : <Sun aria-hidden="true" size={18} />}
      </button>
    </header>
  );
}
