/** ShadySide — route line, travelling sun, shade band. */
export function HomeRouteVisual() {
  const ROUTE_PATH = 'M10 96 C80 86 120 38 180 44 S270 72 292 28';
  return (
    <div className="bg-surface-2 relative aspect-5/2 w-full self-center overflow-hidden rounded-lg">
      <svg viewBox="0 0 300 120" className="h-full w-full" aria-hidden="true">
        <path
          d="M10 102 C80 92 120 44 180 50 S270 78 292 34"
          fill="none"
          stroke="var(--ok)"
          strokeWidth="5"
          opacity="0.35"
        />
        <path d={ROUTE_PATH} fill="none" stroke="var(--ink)" strokeWidth="2" />
        <circle cx="10" cy="96" r="4" fill="var(--ink)" />
        <circle cx="292" cy="28" r="4" fill="var(--accent)" />
        <circle
          cx="246"
          cy="58"
          r="7"
          fill="var(--sun)"
          className="transition-transform duration-500 ease-out group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5 motion-reduce:transition-none"
        />
      </svg>
      <span className="bg-ink text-paper absolute bottom-2 left-2.5 rounded px-2 py-1 font-mono text-[9px] font-medium tracking-[0.08em]">
        SIT LEFT · SHADE 82% OF ROUTE
      </span>
    </div>
  );
}
