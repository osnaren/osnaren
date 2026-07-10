import type { StoryChapter } from '@/data/story-chapters';

/**
 * A small, decorative emblem that gives each chapter a distinct texture while
 * staying inside the existing token system. Purely aria-hidden ornamentation —
 * no information depends on it.
 */
export function ChapterMotif({ motif }: { motif: StoryChapter['motif'] }) {
  const common = 'h-14 w-24 shrink-0';

  switch (motif) {
    case 'grid': // Origins — graph paper
      return (
        <svg viewBox="0 0 96 56" className={common} aria-hidden="true">
          <g stroke="var(--line-strong)" strokeWidth="0.75">
            {[10, 22, 34, 46].map((y) => (
              <line key={y} x1="4" y1={y} x2="92" y2={y} />
            ))}
            {[16, 32, 48, 64, 80].map((x) => (
              <line key={x} x1={x} y1="4" x2={x} y2="52" />
            ))}
          </g>
          <rect x="48" y="22" width="16" height="12" fill="var(--accent)" opacity="0.7" />
        </svg>
      );
    case 'margin': // College — notebook margin + ruled lines
      return (
        <svg viewBox="0 0 96 56" className={common} aria-hidden="true">
          <line x1="20" y1="4" x2="20" y2="52" stroke="var(--accent)" strokeWidth="1.25" opacity="0.7" />
          <g stroke="var(--line-strong)" strokeWidth="0.75">
            {[14, 24, 34, 44].map((y) => (
              <line key={y} x1="26" y1={y} x2="90" y2={y} />
            ))}
          </g>
        </svg>
      );
    case 'paper': // Research — annotated document
      return (
        <svg viewBox="0 0 96 56" className={common} aria-hidden="true">
          <rect x="28" y="6" width="40" height="44" rx="2" fill="var(--surface)" stroke="var(--line-strong)" />
          {[14, 22, 30, 38].map((y) => (
            <line key={y} x1="34" y1={y} x2="62" y2={y} stroke="var(--well)" strokeWidth="2" />
          ))}
          <circle cx="68" cy="14" r="4" fill="var(--amber)" opacity="0.8" />
        </svg>
      );
    case 'blocks': // Soliton — interface blocks / scheduler
      return (
        <svg viewBox="0 0 96 56" className={common} aria-hidden="true">
          {[0, 1, 2].map((row) =>
            [0, 1, 2, 3].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={16 + col * 18}
                y={12 + row * 14}
                width="14"
                height="9"
                rx="1.5"
                fill={row === 1 && col >= 1 && col <= 2 ? 'var(--accent)' : 'var(--well)'}
                opacity={row === 1 && col >= 1 && col <= 2 ? 0.75 : 1}
              />
            ))
          )}
        </svg>
      );
    case 'flow': // Commerce — product states / experience flow
      return (
        <svg viewBox="0 0 96 56" className={common} aria-hidden="true">
          <rect x="10" y="20" width="18" height="16" rx="2" fill="var(--well)" />
          <rect x="39" y="20" width="18" height="16" rx="2" fill="var(--ok)" opacity="0.7" />
          <rect x="68" y="20" width="18" height="16" rx="2" fill="var(--accent)" opacity="0.75" />
          <path d="M28 28 H39 M57 28 H68" stroke="var(--faint)" strokeWidth="1.25" />
        </svg>
      );
    case 'signal': // Product Lab — route / signal path
      return (
        <svg viewBox="0 0 96 56" className={common} aria-hidden="true">
          <path d="M8 44 C32 40 40 16 64 20 S86 16 90 10" fill="none" stroke="var(--accent)" strokeWidth="1.75" />
          <circle cx="8" cy="44" r="3" fill="var(--ink)" />
          <circle cx="90" cy="10" r="4" fill="var(--sun)" />
        </svg>
      );
    case 'growth': // Ongoing — organic growth lines
    default:
      return (
        <svg viewBox="0 0 96 56" className={common} aria-hidden="true">
          <line x1="48" y1="52" x2="48" y2="22" stroke="var(--ok)" strokeWidth="1.5" />
          <path d="M48 36 C36 34 30 24 31 16 C42 17 48 26 48 36 Z" fill="var(--ok)" opacity="0.6" />
          <path d="M48 30 C60 28 66 18 65 10 C54 11 48 20 48 30 Z" fill="var(--ok)" opacity="0.42" />
          <circle cx="48" cy="16" r="3.5" fill="var(--accent)" />
        </svg>
      );
  }
}
