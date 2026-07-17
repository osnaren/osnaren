'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { benchModules } from '@/data/modules';

function isInteractiveTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return Boolean(
    target.closest(
      'input, textarea, select, button, a, [contenteditable="true"], [role="slider"], [role="spinbutton"], [role="menu"], [role="listbox"]'
    )
  );
}

/**
 * The command strip replaces the drag-dock from the prototype: it documents
 * the 1–6 keyboard shortcuts and doubles as click/tap navigation.
 */
export function CommandStrip({ activeId, onSelect }: { activeId: string; onSelect: (id: string) => void }) {
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.repeat ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey ||
        isInteractiveTarget(event.target)
      )
        return;
      const target = benchModules.find((m) => String(m.key) === event.key);
      if (target) {
        onSelect(target.id);
        router.push(target.href);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onSelect, router]);

  return (
    <nav
      aria-label="Module shortcuts"
      className="border-line-strong bg-paper/78 text-faint hidden items-center gap-1 rounded-md border px-2 py-2 font-mono text-[9px] tracking-[0.06em] backdrop-blur-sm lg:flex"
    >
      <span className="mr-1.5 whitespace-nowrap uppercase">Select module</span>
      {benchModules.map((module) => (
        <button
          key={module.id}
          type="button"
          onPointerEnter={() => onSelect(module.id)}
          onFocus={() => onSelect(module.id)}
          onClick={() => {
            onSelect(module.id);
            router.push(module.href);
          }}
          aria-current={activeId === module.id ? 'true' : undefined}
          className={`group flex min-h-8 items-center gap-1.5 rounded px-1.5 uppercase transition-colors ${
            activeId === module.id ? 'bg-surface-2 text-ink' : 'hover:text-accent'
          }`}
        >
          <kbd className="border-line text-ink group-hover:border-accent rounded border px-1.5 py-0.5 font-mono text-[9px]">
            {module.key}
          </kbd>
          <span className="hidden xl:inline">{module.name}</span>
        </button>
      ))}
    </nav>
  );
}
