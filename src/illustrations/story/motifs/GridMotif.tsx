/** Origins — circular badge with graph paper grid and chapter number. */
export function GridMotif({ index }: { index: string }) {
  return (
    <svg viewBox="0 0 80 80" className="h-16 w-16 shrink-0 sm:h-20 sm:w-20" aria-hidden="true">
      {/* circle border */}
      <circle cx="40" cy="40" r="37" fill="none" stroke="var(--line-strong)" strokeWidth="1.5" />
      {/* grid lines */}
      <g stroke="var(--line-strong)" strokeWidth="0.5" opacity="0.35">
        {[16, 26, 36, 46, 56, 66].map((y) => (
          <line key={`h-${y}`} x1="8" y1={y} x2="72" y2={y} />
        ))}
        {[16, 26, 36, 46, 56, 66].map((x) => (
          <line key={`v-${x}`} x1={x} y1="8" x2={x} y2="72" />
        ))}
      </g>
      {/* highlighted cell behind number */}
      <rect x="24" y="24" width="32" height="32" rx="2" fill="var(--accent)" opacity="0.12" />
      {/* chapter number */}
      <text
        x="40"
        y="46"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="26"
        fontWeight="700"
        fill="var(--ink)"
        opacity="0.85"
      >
        {index}
      </text>
    </svg>
  );
}
