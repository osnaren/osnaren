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
