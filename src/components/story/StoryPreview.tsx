import Image from 'next/image';

import type { FieldNote } from '@/data/story';
import type { NoteMedia } from '@/data/story-chapters';

type PreviewKey = FieldNote['preview'];

/**
 * Artifact previews. Real, public-safe media is used where it exists (only the
 * ShadySide premise illustration in this repo); everything else is a designed
 * schematic — never a fabricated photograph, certificate, or workplace screen.
 */
export function StoryPreview({ preview, media }: { preview: PreviewKey; media?: NoteMedia }) {
  const common = 'h-full w-full';

  if (media) {
    return (
      <div className="relative h-full w-full">
        <Image
          src={media.src}
          alt={media.alt}
          fill
          loading="eager"
          sizes="(max-width: 1024px) 100vw, 320px"
          className="object-cover"
        />
      </div>
    );
  }

  switch (preview) {
    case 'route':
      return (
        <svg viewBox="0 0 240 150" className={common} aria-hidden="true">
          <path
            d="M18 120 C70 108 100 62 140 66 S208 90 224 44"
            fill="none"
            stroke="var(--ok)"
            strokeWidth="9"
            opacity="0.3"
          />
          <path d="M16 116 C68 104 98 58 138 62 S206 86 222 40" fill="none" stroke="var(--ink)" strokeWidth="2.5" />
          <circle cx="16" cy="116" r="5" fill="var(--ink)" />
          <circle cx="222" cy="40" r="5" fill="var(--accent)" />
          <circle cx="186" cy="26" r="11" fill="var(--sun)" />
        </svg>
      );

    case 'flames':
      return (
        <div className="grid h-full place-items-center p-4" aria-hidden="true">
          <div className="grid grid-cols-3 gap-2">
            {['F', 'L', 'A', 'M', 'E', 'S'].map((letter, i) => (
              <span
                key={letter}
                className={`grid size-9 place-items-center rounded-md border font-mono text-xs font-medium ${
                  i === 1 ? 'border-accent bg-accent text-white' : 'border-line-strong bg-surface text-muted'
                }`}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
      );

    case 'commerce':
      return (
        <svg viewBox="0 0 240 150" className={common} aria-hidden="true">
          <rect x="16" y="20" width="86" height="110" rx="6" fill="var(--well)" />
          <path d="M32 108 L54 76 L70 92 L88 62" stroke="var(--faint)" strokeWidth="2.5" fill="none" />
          <rect x="118" y="24" width="106" height="10" rx="5" fill="var(--well)" />
          <rect x="118" y="44" width="66" height="8" rx="4" fill="var(--well)" />
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={118 + i * 28}
              y="68"
              width="22"
              height="18"
              rx="3"
              fill={i === 1 ? 'var(--ok)' : 'var(--well)'}
            />
          ))}
          <rect x="118" y="102" width="106" height="20" rx="5" fill="var(--accent)" />
        </svg>
      );

    case 'toolchain':
      return (
        <svg viewBox="0 0 240 150" className={common} aria-hidden="true">
          {[0, 1, 2, 3, 4].map((row) =>
            [0, 1, 2, 3, 4].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={20 + col * 42}
                y={20 + row * 24}
                width="34"
                height="16"
                rx="3"
                fill={row === 2 && col >= 1 && col <= 3 ? 'var(--accent)' : 'var(--well)'}
              />
            ))
          )}
        </svg>
      );

    case 'paper':
      return (
        <svg viewBox="0 0 240 150" className={common} aria-hidden="true">
          <rect
            x="52"
            y="14"
            width="136"
            height="122"
            rx="4"
            fill="var(--surface)"
            stroke="var(--line-strong)"
            strokeWidth="1.5"
          />
          <rect x="68" y="30" width="82" height="7" rx="3.5" fill="var(--ink)" />
          <rect x="68" y="44" width="104" height="4" rx="2" fill="var(--well)" />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x="68" y={62 + i * 11} width={i % 2 ? 88 : 104} height="4" rx="2" fill="var(--well)" />
          ))}
          <rect x="68" y="118" width="44" height="7" rx="3.5" fill="var(--accent)" />
        </svg>
      );

    case 'dataset':
      return (
        <div className="grid h-full place-items-center p-4" aria-hidden="true">
          <div className="grid aspect-3/2 h-full max-h-full w-auto grid-cols-6 gap-1.5">
            {Array.from({ length: 24 }).map((_, i) => {
              const tone = i % 7 === 0 ? 'accent' : i % 5 === 0 ? 'ok' : i % 11 === 0 ? 'sun' : 'well';
              return <span key={i} className="aspect-square rounded-sm" style={{ background: `var(--${tone})` }} />;
            })}
          </div>
        </div>
      );

    case 'camera':
      return (
        <svg viewBox="0 0 240 150" className={common} aria-hidden="true">
          <rect x="48" y="38" width="144" height="86" rx="8" fill="none" stroke="var(--ink)" strokeWidth="2.5" />
          <rect x="92" y="24" width="42" height="16" rx="4" fill="var(--well)" />
          <circle cx="120" cy="82" r="28" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
          <circle cx="120" cy="82" r="12" fill="var(--accent)" opacity="0.25" />
          <circle cx="120" cy="82" r="5" fill="var(--accent)" />
          <circle cx="170" cy="54" r="4" fill="var(--sun)" />
        </svg>
      );

    case 'garden':
      return (
        <svg viewBox="0 0 240 150" className={common} aria-hidden="true">
          <line x1="120" y1="132" x2="120" y2="56" stroke="var(--ok)" strokeWidth="3" />
          <path d="M120 92 C96 88 82 70 84 52 C106 54 120 70 120 92 Z" fill="var(--ok)" opacity="0.75" />
          <path d="M120 78 C144 74 158 56 156 38 C134 40 120 56 120 78 Z" fill="var(--ok)" opacity="0.5" />
          <circle cx="120" cy="46" r="8" fill="var(--accent)" />
          <line x1="70" y1="132" x2="170" y2="132" stroke="var(--line-strong)" strokeWidth="2.5" />
        </svg>
      );

    case 'language':
      return (
        <svg viewBox="0 0 240 150" className={common} aria-hidden="true">
          <path d="M34 118 H206" stroke="var(--line-strong)" strokeWidth="1.5" />
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={i}>
              <rect
                x={36 + i * 21}
                y={106 - i * 9}
                width="15"
                height={12 + i * 9}
                rx="2"
                fill={i === 7 ? 'var(--accent)' : i > 4 ? 'var(--ok)' : 'var(--well)'}
              />
              <text
                x={43.5 + i * 21}
                y="132"
                textAnchor="middle"
                fill="var(--faint)"
                fontSize="7"
                fontFamily="monospace"
              >
                {i + 1}
              </text>
            </g>
          ))}
          <circle cx="199" cy="32" r="10" fill="none" stroke="var(--accent)" strokeWidth="2" />
          <path d="M194 32 L198 36 L205 27" fill="none" stroke="var(--accent)" strokeWidth="2" />
        </svg>
      );

    case 'sapling':
      return (
        <svg viewBox="0 0 240 150" className={common} aria-hidden="true">
          <path d="M28 122 H212" stroke="var(--line-strong)" strokeWidth="2" />
          {[62, 120, 178].map((x, i) => (
            <g key={x}>
              <line x1={x} y1="122" x2={x} y2={72 - i * 8} stroke="var(--ok)" strokeWidth="2.5" />
              <path
                d={`M${x} ${96 - i * 8} C${x - 20} ${92 - i * 8} ${x - 24} ${76 - i * 8} ${x - 22} ${68 - i * 8} C${x - 5} ${70 - i * 8} ${x} ${82 - i * 8} ${x} ${96 - i * 8} Z`}
                fill="var(--ok)"
                opacity="0.52"
              />
              <path
                d={`M${x} ${86 - i * 8} C${x + 18} ${82 - i * 8} ${x + 24} ${66 - i * 8} ${x + 21} ${58 - i * 8} C${x + 6} ${61 - i * 8} ${x} ${72 - i * 8} ${x} ${86 - i * 8} Z`}
                fill="var(--ok)"
                opacity="0.78"
              />
            </g>
          ))}
          <rect x="82" y="20" width="76" height="24" rx="4" fill="var(--surface)" stroke="var(--line-strong)" />
          <text x="120" y="35" textAnchor="middle" fill="var(--accent)" fontSize="10" fontFamily="monospace">
            1,000+ SAPLINGS
          </text>
        </svg>
      );

    case 'mentorship':
      return (
        <svg viewBox="0 0 240 150" className={common} aria-hidden="true">
          <g stroke="var(--line-strong)" strokeWidth="1.5">
            {[48, 96, 144, 192].map((x, i) => (
              <path key={x} d={`M${i < 2 ? 88 : 152} 48 C${i < 2 ? 88 : 152} 76 ${x} 72 ${x} 106`} fill="none" />
            ))}
          </g>
          {[88, 152].map((x) => (
            <circle key={x} cx={x} cy="42" r="13" fill="var(--accent)" opacity="0.82" />
          ))}
          {[48, 96, 144, 192].map((x) => (
            <circle key={x} cx={x} cy="110" r="10" fill="var(--ok)" opacity="0.68" />
          ))}
          <path d="M101 42 H139" stroke="var(--ink)" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
      );

    case 'coordination':
      return (
        <svg viewBox="0 0 240 150" className={common} aria-hidden="true">
          <rect x="94" y="55" width="52" height="40" rx="5" fill="var(--accent)" opacity="0.82" />
          {[
            { x: 24, y: 26 },
            { x: 24, y: 100 },
            { x: 172, y: 26 },
            { x: 172, y: 100 },
          ].map((node) => (
            <g key={`${node.x}-${node.y}`}>
              <path
                d={`M${node.x < 100 ? node.x + 44 : node.x} ${node.y + 12} L${node.x < 100 ? 94 : 146} 75`}
                stroke="var(--line-strong)"
                strokeWidth="1.5"
              />
              <rect x={node.x} y={node.y} width="44" height="24" rx="4" fill="var(--well)" />
            </g>
          ))}
          <circle cx="120" cy="75" r="5" fill="var(--surface)" />
        </svg>
      );

    case 'network':
      return (
        <svg viewBox="0 0 240 150" className={common} aria-hidden="true">
          <circle cx="120" cy="75" r="22" fill="var(--accent)" opacity="0.82" />
          {[
            { x: 182, y: 96 },
            { x: 138, y: 123 },
            { x: 81, y: 116 },
            { x: 52, y: 79 },
            { x: 72, y: 40 },
            { x: 126, y: 25 },
          ].map((node) => (
            <g key={`${node.x}-${node.y}`}>
              <line x1="120" y1="75" x2={node.x} y2={node.y} stroke="var(--line-strong)" strokeWidth="1.5" />
              <circle cx={node.x} cy={node.y} r="9" fill="var(--ok)" opacity="0.7" />
            </g>
          ))}
          <circle cx="120" cy="75" r="6" fill="var(--surface)" />
        </svg>
      );

    case 'service':
      return (
        <svg viewBox="0 0 240 150" className={common} aria-hidden="true">
          <circle
            cx="120"
            cy="75"
            r="48"
            fill="none"
            stroke="var(--line-strong)"
            strokeWidth="1.5"
            strokeDasharray="5 5"
          />
          {[
            { x: 168, y: 75 },
            { x: 144, y: 117 },
            { x: 96, y: 117 },
            { x: 72, y: 75 },
            { x: 96, y: 33 },
            { x: 144, y: 33 },
          ].map((node, i) => (
            <circle
              key={`${node.x}-${node.y}`}
              cx={node.x}
              cy={node.y}
              r="8"
              fill={i % 2 ? 'var(--ok)' : 'var(--accent)'}
              opacity="0.75"
            />
          ))}
          <path
            d="M96 76 C106 62 114 64 120 72 C126 64 134 62 144 76 C136 92 124 101 120 104 C116 101 104 92 96 76 Z"
            fill="var(--sun)"
            opacity="0.72"
          />
        </svg>
      );

    case 'school':
      return (
        <svg viewBox="0 0 240 150" className={common} aria-hidden="true">
          <rect
            x="44"
            y="34"
            width="152"
            height="98"
            rx="4"
            fill="var(--surface)"
            stroke="var(--line-strong)"
            strokeWidth="1.5"
          />
          <path d="M120 24 L188 52 L120 80 L52 52 Z" fill="var(--ink)" />
          <line x1="188" y1="52" x2="188" y2="76" stroke="var(--accent)" strokeWidth="2.5" />
          <circle cx="188" cy="80" r="5" fill="var(--accent)" />
          <rect x="72" y="98" width="96" height="4" rx="2" fill="var(--well)" />
          <rect x="88" y="110" width="64" height="4" rx="2" fill="var(--well)" />
        </svg>
      );

    case 'lab':
    default: {
      const tones = ['well', 'accent', 'well', 'ink', 'ok', 'well', 'sun', 'well', 'well'] as const;
      return (
        <div className="grid h-full place-items-center p-4" aria-hidden="true">
          <div className="grid aspect-square h-full max-h-full w-auto grid-cols-3 gap-2">
            {tones.map((tone, i) => (
              <span key={i} className="aspect-square rounded" style={{ background: `var(--${tone})` }} />
            ))}
          </div>
        </div>
      );
    }
  }
}
