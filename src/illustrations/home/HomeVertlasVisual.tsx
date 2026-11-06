import { Search } from 'lucide-react';

const aliases = ['Hidden Heiress', 'Heiress in Hiding', '+2'];
const trackStates = ['Want to Watch', 'Watching', 'Watched'];

function Meter({ label, value }: { label: string; value: number }) {
  return (
    <span className="flex items-center gap-1">
      {label}
      <span className="flex gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={`size-1.5 rounded-full ${i < value ? 'bg-accent' : 'bg-line-strong'}`} />
        ))}
      </span>
    </span>
  );
}

/** Vertlas — a half-remembered title resolves to one canonical 9:16 drama. */
export function HomeVertlasVisual() {
  return (
    <div
      className="bg-surface-2 relative flex w-full flex-col justify-center gap-2.5 self-stretch overflow-hidden rounded-lg p-3"
      aria-hidden="true"
    >
      <div className="border-line-strong bg-surface flex items-center gap-2 rounded-md border px-2.5 py-1.5 font-mono text-[10px]">
        <Search className="text-faint size-3 shrink-0" />
        <span className="text-ink truncate">hidden heiress</span>
        <span className="bg-accent h-3 w-px shrink-0 animate-pulse motion-reduce:animate-none" />
        <kbd className="border-line text-faint ml-auto rounded border px-1 font-mono text-[9px]">/</kbd>
      </div>

      <div className="flex items-center gap-3">
        <div className="border-accent from-accent/40 via-accent/15 to-surface relative aspect-9/16 w-[22%] max-w-18 shrink-0 min-[1360px]:w-[26%] min-[1360px]:max-w-20 overflow-hidden rounded-md border bg-linear-to-b transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5 motion-reduce:transition-none">
          <span className="text-ink/60 absolute top-1 left-1.5 font-mono text-[7px]">9:16</span>
          <span className="bg-ink/30 absolute bottom-3.5 left-1.5 h-1 w-1/2 rounded-full" />
          <span className="bg-ink/60 absolute inset-x-1.5 bottom-1.5 h-1 rounded-full" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-accent font-mono text-[8.5px] font-medium tracking-widest uppercase">Best match</p>
          <p className="truncate text-[13px] font-semibold">The Heiress Returns</p>
          <p className="text-faint truncate font-mono text-[9px]">千金归来 · 80 episodes</p>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {aliases.map((alias, i) => (
              <span
                key={alias}
                className={`rounded border px-1.5 py-0.5 font-mono text-[8.5px] ${
                  i === 0 ? 'border-accent text-accent' : 'border-line-strong text-muted'
                }`}
              >
                {alias}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* the tracking half of the loop, shown where the primary card has room */}
      <div className="border-line hidden flex-col gap-2 border-t pt-2.5 min-[1360px]:flex">
        <div className="flex gap-1 font-mono text-[8.5px] tracking-[0.06em] uppercase">
          {trackStates.map((state) => (
            <span
              key={state}
              className={`rounded border px-1.5 py-0.5 ${
                state === 'Watched' ? 'border-ok bg-ok text-white' : 'border-line-strong text-faint'
              }`}
            >
              {state}
            </span>
          ))}
        </div>
        <div className="text-muted flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[9px]">
          <span>
            <span className="text-ink font-semibold">8.5</span>/10
          </span>
          <Meter label="Spice" value={2} />
          <Meter label="Sweet" value={4} />
        </div>
      </div>

      <span className="bg-ink text-paper self-start rounded px-2 py-1 font-mono text-[9px] font-medium tracking-[0.08em]">
        4 TITLES · 1 DRAMA
      </span>
    </div>
  );
}
