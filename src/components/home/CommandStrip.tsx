'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { benchModules } from '@/data/modules';

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
}

/**
 * The command strip replaces the drag-dock from the prototype: it documents
 * the 1–6 keyboard shortcuts and doubles as click/tap navigation.
 */
export function CommandStrip() {
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey || isTypingTarget(event.target)) return;
      const target = benchModules.find((m) => String(m.key) === event.key);
      if (target) router.push(target.href);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [router]);

  return (
    <nav
      aria-label="Module shortcuts"
      className="border-line-strong text-faint flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border-[1.5px] border-dashed px-4 py-3 font-mono text-[11px] tracking-[0.08em]"
    >
      <span className="uppercase">Select a module:</span>
      {benchModules.map((module) => (
        <button
          key={module.id}
          type="button"
          onClick={() => router.push(module.href)}
          className="hover:text-accent group flex items-center gap-1.5 uppercase transition-colors"
        >
          <kbd className="border-line text-ink group-hover:border-accent rounded border px-1.5 py-0.5 font-mono text-[10px]">
            {module.key}
          </kbd>
          {module.name}
        </button>
      ))}
    </nav>
  );
}
