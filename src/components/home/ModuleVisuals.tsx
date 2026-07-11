import type { ModuleVisual } from '@/data/modules';

const ROUTE_PATH = 'M10 58 C80 50 120 22 180 26 S270 44 292 18';

/** ShadySide — route line, travelling sun, shade band, blunt answer. */
function RouteVisual() {
  return (
    <div className="bg-surface-2 relative flex-1 overflow-hidden rounded-lg">
      <svg viewBox="0 0 300 72" className="h-full w-full" aria-hidden="true" preserveAspectRatio="none">
        <path
          d="M10 62 C80 54 120 26 180 30 S270 48 292 22"
          fill="none"
          stroke="var(--ok)"
          strokeWidth="5"
          opacity="0.35"
        />
        <path d={ROUTE_PATH} fill="none" stroke="var(--ink)" strokeWidth="2" />
        <circle cx="10" cy="58" r="4" fill="var(--ink)" />
        <circle cx="292" cy="18" r="4" fill="var(--accent)" />
      </svg>
      {/* sun dot rides the route on hover (motion-safe only) */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 size-3.5 rounded-full motion-safe:group-hover:animate-[sun-travel_1.6s_ease-in-out_forwards] motion-safe:group-focus-visible:animate-[sun-travel_1.6s_ease-in-out_forwards]"
        style={{ background: 'var(--sun)', offsetPath: `path('${ROUTE_PATH}')`, offsetDistance: '82%' }}
      />
      <span className="bg-ink text-paper absolute bottom-2 left-2.5 rounded px-2 py-1 font-mono text-[9px] font-medium tracking-[0.08em]">
        SIT LEFT · SHADE 82% OF ROUTE
      </span>
    </div>
  );
}

/** TheFlames — letter tiles with one live outcome. */
function FlamesVisual() {
  const letters = ['F', 'L', 'A', 'M', 'E', 'S'];
  return (
    <div className="flex min-w-0 flex-1 items-center justify-center gap-1 lg:justify-start" aria-hidden="true">
      {letters.map((letter, i) => (
        <span
          key={letter}
          className={`grid size-7 shrink-0 place-items-center rounded-md border font-mono text-[11px] font-medium transition-transform group-hover:-translate-y-0.5 lg:size-6 lg:text-[10px] ${
            i === 0 ? 'border-accent bg-accent text-white' : 'border-line-strong bg-surface-2 text-muted'
          }`}
          style={{ transitionDelay: `${i * 40}ms` }}
        >
          {letter}
        </span>
      ))}
    </div>
  );
}

/** Work — a schematic product page: gallery, title lines, size chips, CTA. */
function CommerceVisual() {
  return (
    <svg viewBox="0 0 140 56" className="w-full flex-1" aria-hidden="true">
      <rect x="4" y="6" width="44" height="44" rx="4" fill="var(--well)" />
      <path d="M12 40 L24 26 L32 34 L40 22" stroke="var(--faint)" strokeWidth="1.5" fill="none" />
      <rect x="56" y="8" width="70" height="6" rx="3" fill="var(--well)" />
      <rect x="56" y="18" width="46" height="5" rx="2.5" fill="var(--well)" />
      <rect x="56" y="28" width="10" height="8" rx="2" fill="var(--well)" />
      <rect x="69" y="28" width="10" height="8" rx="2" fill="var(--ok)" opacity="0.85" />
      <rect x="82" y="28" width="10" height="8" rx="2" fill="var(--well)" />
      <rect x="56" y="42" width="52" height="9" rx="3" fill="var(--accent)" />
    </svg>
  );
}

/** Lab — grid of experiment tiles. */
function LabVisual() {
  const tiles = ['well', 'accent', 'well', 'ink', 'ok', 'well', 'sun', 'well'] as const;
  return (
    <div className="grid flex-1 grid-cols-4 content-center gap-1.5" aria-hidden="true">
      {tiles.map((tone, i) => (
        <span
          key={i}
          className="aspect-square rounded transition-transform group-hover:scale-95"
          style={{ background: `var(--${tone})`, transitionDelay: `${i * 25}ms` }}
        />
      ))}
    </div>
  );
}

/** Story — dated field-note pins. */
function StoryVisual() {
  const notes = [
    { year: '2026 — the lab opens', active: true },
    { year: '2025 — shipped shadyside', active: false },
    { year: '2021 — first prod deploy', active: false },
  ];
  return (
    <div className="text-muted flex flex-1 flex-col justify-center gap-1.5 font-mono text-[10px]" aria-hidden="true">
      {notes.map((note) => (
        <div key={note.year} className="flex items-center gap-2">
          <span className={`size-1.5 rounded-full ${note.active ? 'bg-accent' : 'bg-line-strong'}`} />
          {note.year}
        </div>
      ))}
    </div>
  );
}

/** Resume — spec-sheet skeleton lines (rendered on the inverted card). */
function ResumeVisual() {
  return (
    <div className="flex flex-1 flex-col justify-center gap-1.5" aria-hidden="true">
      {['80%', '60%', '70%'].map((width, i) => (
        <span key={i} className="h-1.5 rounded-sm bg-[#3a3d45]" style={{ width }} />
      ))}
    </div>
  );
}

const visuals: Record<ModuleVisual, () => React.ReactNode> = {
  route: RouteVisual,
  flames: FlamesVisual,
  commerce: CommerceVisual,
  lab: LabVisual,
  story: StoryVisual,
  resume: ResumeVisual,
};

export function ModuleVisualFor({ visual }: { visual: ModuleVisual }) {
  const Visual = visuals[visual];
  return <Visual />;
}
