'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Menu, X } from 'lucide-react';

import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { nav, site } from '@/data/site';

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // close the mobile menu on navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="border-line bg-paper/90 sticky top-0 z-40 border-b backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="osnaren.lab — home">
          <span className="bg-ink text-paper grid size-8 place-items-center rounded-lg font-mono text-[11px] font-semibold">
            ON
          </span>
          <span className="font-mono text-[13px] font-semibold tracking-[0.08em]">
            OSNAREN<span className="text-accent">.LAB</span>
          </span>
          <span className="border-line text-faint hidden rounded-full border px-2.5 py-1 font-mono text-[10px] sm:inline">
            {site.version} · SALEM, IN
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={`font-mono text-xs font-medium tracking-[0.06em] uppercase transition-colors ${
                isActive(item.href) ? 'text-accent' : 'text-muted hover:text-ink'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-ink text-paper hover:bg-accent rounded-md px-4 py-2 font-mono text-xs font-medium tracking-[0.06em] uppercase transition-colors"
          >
            Contact
          </Link>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
            className="border-line grid size-8 place-items-center rounded-md border font-mono text-sm"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-nav" aria-label="Primary" className="border-line border-t px-5 pt-2 pb-4 md:hidden">
          <ul className="flex flex-col">
            {[...nav, { label: 'Contact', href: '/contact' }].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`block py-3 font-mono text-sm tracking-[0.06em] uppercase ${
                    isActive(item.href) ? 'text-accent' : 'text-ink'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
