'use client';

import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

export interface CaseChapter {
  id: string;
  label: string;
}

/**
 * Shared case-study layout: a light sticky chapter rail on desktop and a compact
 * chapter indicator on mobile, wrapped around the reading/evidence column. The
 * rail tracks which chapter is in view without narrowing the reading measure.
 */
export function CaseScaffold({
  chapters,
  artifactId,
  prev,
  next,
  children,
}: {
  chapters: CaseChapter[];
  artifactId: string;
  prev?: { label: string; href: string };
  next?: { label: string; href: string };
  children: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(chapters[0]?.id ?? '');
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start 20%', 'end 80%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  useEffect(() => {
    const sections = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [chapters]);

  const activeLabel = chapters.find((chapter) => chapter.id === activeId)?.label ?? chapters[0]?.label ?? '';
  const activeIndex = Math.max(
    0,
    chapters.findIndex((chapter) => chapter.id === activeId)
  );

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <div className="mx-auto max-w-344 px-5 sm:px-8">
      {/* mobile compact chapter indicator */}
      <div className="bg-paper/92 border-line sticky top-16 z-30 -mx-5 border-b px-5 py-2.5 backdrop-blur-sm sm:-mx-8 sm:px-8 lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-[10.5px] font-medium tracking-widest uppercase">
            <span className="text-accent">{String(activeIndex + 1).padStart(2, '0')}</span> · {activeLabel}
          </p>
          <Link
            href="/projects"
            className="text-faint hover:text-accent font-mono text-[9.5px] tracking-[0.08em] uppercase"
          >
            Index
          </Link>
        </div>
        <div className="bg-line mt-2 h-0.5 overflow-hidden rounded-full">
          <motion.div
            className="bg-accent h-full origin-left rounded-full"
            style={{ scaleX: reduceMotion ? 1 : fill }}
          />
        </div>
      </div>

      <div ref={containerRef} className="grid gap-10 py-12 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-14 lg:py-16">
        {/* desktop chapter rail */}
        <aside className="hidden lg:block" aria-label="Case-study chapters">
          <nav className="sticky top-28">
            <p className="text-faint mb-3 font-mono text-[9.5px] font-medium tracking-[0.14em] uppercase">
              Inspecting {artifactId}
            </p>
            <div className="flex gap-3">
              <div className="bg-line relative w-0.5 shrink-0 overflow-hidden rounded-full">
                <motion.div
                  aria-hidden="true"
                  className="bg-accent absolute inset-x-0 top-0 h-full origin-top rounded-full"
                  style={{ scaleY: reduceMotion ? 1 : fill }}
                />
              </div>
              <ol className="flex min-w-0 flex-col gap-0.5">
                {chapters.map((chapter, index) => {
                  const isActive = chapter.id === activeId;
                  return (
                    <li key={chapter.id}>
                      <button
                        type="button"
                        onClick={() => scrollTo(chapter.id)}
                        aria-current={isActive ? 'true' : undefined}
                        className={`group flex w-full items-baseline gap-2 rounded-md px-2 py-1.5 text-left font-mono text-[12px] tracking-[0.02em] transition-colors ${
                          isActive ? 'bg-surface-2 text-ink' : 'text-muted hover:text-ink'
                        }`}
                      >
                        <span className={isActive ? 'text-accent' : 'text-faint'}>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className={isActive ? 'font-medium' : ''}>{chapter.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className="border-line mt-5 flex flex-col gap-2 border-t pt-4 font-mono text-[10px] tracking-[0.08em] uppercase">
              {prev && (
                <Link href={prev.href} className="text-faint hover:text-accent transition-colors">
                  ← {prev.label}
                </Link>
              )}
              {next && (
                <Link href={next.href} className="text-faint hover:text-accent transition-colors">
                  {next.label} →
                </Link>
              )}
              <Link href="/projects" className="text-faint hover:text-accent transition-colors">
                ↳ Back to index
              </Link>
            </div>
          </nav>
        </aside>

        {/* content column */}
        <div className="flex min-w-0 flex-col gap-12">{children}</div>
      </div>
    </div>
  );
}
