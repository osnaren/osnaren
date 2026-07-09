import type { ArtifactVisual as VisualKey } from '@/data/artifacts';

/** Each artifact gets a schematic, not a screenshot — honest and weightless. */
export function ArtifactVisual({ visual }: { visual: VisualKey }) {
  switch (visual) {
    case 'route':
      return (
        <svg viewBox="0 0 300 110" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
          <path
            d="M14 88 C90 78 130 36 190 42 S276 66 290 28"
            fill="none"
            stroke="var(--ok)"
            strokeWidth="8"
            opacity="0.3"
          />
          <path d="M12 84 C88 74 128 32 188 38 S274 62 288 24" fill="none" stroke="var(--ink)" strokeWidth="2.5" />
          <circle cx="12" cy="84" r="5" fill="var(--ink)" />
          <circle cx="288" cy="24" r="5" fill="var(--accent)" />
          <circle cx="240" cy="16" r="9" fill="var(--sun)" />
        </svg>
      );

    case 'flames':
      return (
        <div className="flex h-full items-center justify-center gap-2" aria-hidden="true">
          {['F', 'L', 'A', 'M', 'E', 'S'].map((letter, i) => (
            <span
              key={letter}
              className={`grid size-9 place-items-center rounded-md border font-mono text-sm font-medium ${
                i === 1 ? 'border-accent bg-accent text-white' : 'border-line-strong bg-surface text-muted'
              }`}
            >
              {letter}
            </span>
          ))}
        </div>
      );

    case 'fire':
      // four class swatches: fire / nofire / smoke / smokefire
      return (
        <svg viewBox="0 0 300 110" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
          {[
            { x: 18, fill: 'var(--accent)', label: 'fire' },
            { x: 90, fill: 'var(--ok)', label: 'nofire' },
            { x: 162, fill: 'var(--faint)', label: 'smoke' },
            { x: 234, fill: 'var(--sun)', label: 'smokefire' },
          ].map((cell) => (
            <g key={cell.label}>
              <rect x={cell.x} y="18" width="52" height="52" rx="6" fill={cell.fill} opacity="0.9" />
              <text
                x={cell.x + 26}
                y="88"
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="8"
                fill="var(--faint)"
              >
                {cell.label}
              </text>
            </g>
          ))}
        </svg>
      );

    case 'retina':
      return (
        <svg viewBox="0 0 300 110" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
          <circle cx="150" cy="55" r="44" fill="none" stroke="var(--line-strong)" strokeWidth="1.5" />
          <circle cx="150" cy="55" r="30" fill="none" stroke="var(--ok)" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="150" cy="55" r="15" fill="var(--ink)" />
          <circle cx="150" cy="55" r="6" fill="var(--accent)" />
          {/* OCT scan lines */}
          {[0, 1, 2, 3].map((i) => (
            <line
              key={i}
              x1="20"
              y1={30 + i * 17}
              x2="88"
              y2={30 + i * 17}
              stroke="var(--well)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <line
              key={i}
              x1="212"
              y1={30 + i * 17}
              x2="280"
              y2={30 + i * 17}
              stroke="var(--well)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          ))}
        </svg>
      );

    case 'cancer':
      // 8 classes → 26 subclasses, drawn as a fan
      return (
        <svg viewBox="0 0 300 110" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
          <circle cx="150" cy="20" r="9" fill="var(--ink)" />
          {Array.from({ length: 8 }).map((_, i) => {
            const x = 30 + i * 34.3;
            const fill = i % 3 === 0 ? 'var(--accent)' : i % 3 === 1 ? 'var(--ok)' : 'var(--sun)';
            return (
              <g key={i}>
                <line x1="150" y1="20" x2={x} y2="76" stroke="var(--line-strong)" strokeWidth="1.2" />
                <circle cx={x} cy="82" r="7" fill={fill} opacity="0.85" />
              </g>
            );
          })}
        </svg>
      );

    case 'commerce':
      return (
        <svg viewBox="0 0 300 110" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
          <rect x="16" y="14" width="84" height="84" rx="6" fill="var(--well)" />
          <path d="M32 82 L54 56 L70 70 L86 46" stroke="var(--faint)" strokeWidth="2.5" fill="none" />
          <rect x="118" y="18" width="150" height="10" rx="5" fill="var(--well)" />
          <rect x="118" y="38" width="96" height="8" rx="4" fill="var(--well)" />
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={118 + i * 26}
              y="58"
              width="20"
              height="16"
              rx="3"
              fill={i === 1 ? 'var(--ok)' : 'var(--well)'}
              opacity={i === 1 ? 0.9 : 1}
            />
          ))}
          <rect x="118" y="82" width="112" height="16" rx="5" fill="var(--accent)" />
        </svg>
      );

    case 'toolchain':
      return (
        <svg viewBox="0 0 300 110" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
          {[0, 1, 2, 3].map((row) =>
            [0, 1, 2, 3, 4, 5].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={20 + col * 44}
                y={16 + row * 22}
                width="38"
                height="16"
                rx="3"
                fill={row === 1 && col >= 1 && col <= 3 ? 'var(--accent)' : 'var(--well)'}
                opacity={row === 1 && col >= 1 && col <= 3 ? 0.9 : 1}
              />
            ))
          )}
        </svg>
      );

    case 'lab':
    default: {
      const tones = ['well', 'accent', 'well', 'ink', 'ok', 'well', 'sun', 'well'] as const;
      return (
        <div className="grid h-full grid-cols-4 content-center gap-2 px-6" aria-hidden="true">
          {tones.map((tone, i) => (
            <span key={i} className="aspect-square rounded" style={{ background: `var(--${tone})` }} />
          ))}
        </div>
      );
    }
  }
}
