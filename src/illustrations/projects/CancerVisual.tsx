/** Multi-cancer classification — fan diagram from 8 classes. */
export function CancerVisual() {
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
}
