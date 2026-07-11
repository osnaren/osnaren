import type { ArtifactVisual as VisualKey } from '@/data/artifacts';

/** Each artifact gets a schematic, not a screenshot — honest and weightless. */
export function ArtifactVisual({ visual }: { visual: VisualKey }) {
  switch (visual) {
    case 'route':
      return (
        <svg viewBox="0 0 300 110" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
          {/* shaded side band */}
          <path
            d="M14 88 C90 78 130 36 190 42 S276 66 290 28"
            fill="none"
            stroke="var(--ok)"
            strokeWidth="8"
            opacity="0.3"
          />
          {/* the route, drawing in on mount */}
          <path
            d="M12 84 C88 74 128 32 188 38 S274 62 288 24"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="2.5"
            strokeDasharray="440"
            className="motion-safe:animate-[route-draw_1.15s_ease-out_forwards]"
          />
          <circle cx="12" cy="84" r="5" fill="var(--ink)" />
          <circle cx="288" cy="24" r="5" fill="var(--accent)" />
          <circle cx="240" cy="16" r="9" fill="var(--sun)" />
          <circle cx="240" cy="16" r="9" fill="var(--sun)" opacity="0.35" className="motion-safe:animate-ping" />
        </svg>
      );

    case 'flames': {
      // FLAMES eliminates letters until one survives — here 'L' (Lovers)
      const letters = ['F', 'L', 'A', 'M', 'E', 'S'];
      const survivor = 1;
      return (
        <div className="flex h-full items-center justify-center gap-2" aria-hidden="true">
          {letters.map((letter, i) => (
            <span
              key={letter}
              className={`relative grid size-9 place-items-center rounded-md border font-mono text-sm font-medium ${
                i === survivor ? 'border-accent bg-accent text-white' : 'border-line-strong bg-surface text-faint'
              }`}
            >
              {letter}
              {i !== survivor && (
                <span
                  className="bg-accent/80 absolute top-1/2 left-1 h-0.5 w-7 origin-left -translate-y-1/2 rounded-full motion-safe:animate-[flames-strike_0.5s_ease-out_forwards]"
                  style={{ animationDelay: `${0.15 + i * 0.09}s` }}
                />
              )}
            </span>
          ))}
        </div>
      );
    }

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

    case 'chat':
      return (
        <svg viewBox="0 0 300 110" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
          <path
            d="M36 27 H150 Q160 27 160 37 V57 Q160 67 150 67 H76 L56 82 V67 H36 Q26 67 26 57 V37 Q26 27 36 27Z"
            fill="var(--well)"
          />
          <path
            d="M150 47 H264 Q274 47 274 57 V77 Q274 87 264 87 H244 V100 L226 87 H150 Q140 87 140 77 V57 Q140 47 150 47Z"
            fill="var(--ink)"
          />
          {[48, 70, 92].map((x, index) => (
            <circle key={x} cx={x} cy="47" r="4" fill={index === 1 ? 'var(--accent)' : 'var(--faint)'} opacity="0.9" />
          ))}
          <line
            x1="162"
            y1="64"
            x2="246"
            y2="64"
            stroke="var(--paper)"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.8"
          />
          <line
            x1="162"
            y1="75"
            x2="220"
            y2="75"
            stroke="var(--paper)"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.45"
          />
          <circle cx="260" cy="24" r="5" fill="var(--ok)" />
          <circle
            cx="260"
            cy="24"
            r="9"
            fill="none"
            stroke="var(--ok)"
            opacity="0.35"
            className="motion-safe:animate-ping"
          />
        </svg>
      );

    case 'weather':
      return (
        <svg viewBox="0 0 300 110" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
          <circle cx="72" cy="44" r="22" fill="var(--sun)" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const radians = (angle * Math.PI) / 180;
            return (
              <line
                key={angle}
                x1={72 + Math.cos(radians) * 29}
                y1={44 + Math.sin(radians) * 29}
                x2={72 + Math.cos(radians) * 36}
                y2={44 + Math.sin(radians) * 36}
                stroke="var(--sun)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            );
          })}
          <path
            d="M62 86 H148 C160 86 168 78 168 68 C168 57 159 49 148 49 C144 34 131 24 115 24 C96 24 81 38 80 57 C68 58 58 66 58 76 C58 80 59 83 62 86Z"
            fill="var(--surface)"
            stroke="var(--line-strong)"
            strokeWidth="1.5"
          />
          <text x="194" y="47" fontFamily="var(--font-mono)" fontSize="25" fontWeight="600" fill="var(--ink)">
            27°
          </text>
          <text x="194" y="66" fontFamily="var(--font-mono)" fontSize="8" fill="var(--faint)">
            KOLKATA / 14:20
          </text>
          <line x1="194" y1="79" x2="272" y2="79" stroke="var(--ok)" strokeWidth="4" strokeLinecap="round" />
          <line x1="194" y1="90" x2="244" y2="90" stroke="var(--well)" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'numerology': {
      const values = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
      return (
        <svg viewBox="0 0 300 110" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
          {values.map((value, index) => {
            const col = index % 3;
            const row = Math.floor(index / 3);
            const active = value === '5';
            return (
              <g key={value}>
                <rect
                  x={22 + col * 34}
                  y={10 + row * 30}
                  width="26"
                  height="24"
                  rx="4"
                  fill={active ? 'var(--accent)' : 'var(--well)'}
                />
                <text
                  x={35 + col * 34}
                  y={26 + row * 30}
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                  fontSize="10"
                  fill={active ? 'var(--paper)' : 'var(--faint)'}
                >
                  {value}
                </text>
              </g>
            );
          })}
          <path d="M132 55 H164" stroke="var(--line-strong)" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M157 49 L164 55 L157 61" fill="none" stroke="var(--line-strong)" strokeWidth="1.5" />
          <circle cx="210" cy="55" r="34" fill="var(--surface)" stroke="var(--line-strong)" strokeWidth="1.5" />
          <circle cx="210" cy="55" r="24" fill="none" stroke="var(--sun)" strokeWidth="2" strokeDasharray="2 4" />
          <text
            x="210"
            y="64"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="29"
            fontWeight="600"
            fill="var(--ink)"
          >
            5
          </text>
          <text x="210" y="103" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="var(--faint)">
            MERCURY
          </text>
        </svg>
      );
    }

    case 'timer':
      return (
        <svg viewBox="0 0 300 110" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
          <circle cx="70" cy="55" r="39" fill="none" stroke="var(--well)" strokeWidth="8" />
          <circle
            cx="70"
            cy="55"
            r="39"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="168 245"
            transform="rotate(-90 70 55)"
          />
          <line x1="70" y1="55" x2="70" y2="31" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="70" y1="55" x2="87" y2="64" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="70" cy="55" r="4" fill="var(--ink)" />
          <text x="135" y="27" fontFamily="var(--font-mono)" fontSize="8" fill="var(--faint)">
            CURRENT TASK
          </text>
          <rect x="135" y="36" width="130" height="13" rx="4" fill="var(--ink)" />
          <rect x="135" y="59" width="94" height="8" rx="4" fill="var(--well)" />
          <rect x="135" y="76" width="116" height="8" rx="4" fill="var(--well)" />
          <rect x="135" y="93" width="72" height="8" rx="4" fill="var(--ok)" opacity="0.8" />
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
