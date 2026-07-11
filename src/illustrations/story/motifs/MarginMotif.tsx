/** College — circular badge with notebook margin and chapter number. */
export function MarginMotif({ index }: { index: string }) {
  return (
    <svg viewBox="0 0 80 80" className="h-16 w-16 shrink-0 sm:h-20 sm:w-20" aria-hidden="true">
      {/* circle border */}
      <circle cx="40" cy="40" r="37" fill="none" stroke="var(--line-strong)" strokeWidth="1.5" />
      {/* margin line */}
      <line x1="24" y1="10" x2="24" y2="70" stroke="var(--accent)" strokeWidth="1.25" opacity="0.5" />
      {/* ruled lines */}
      <g stroke="var(--line-strong)" strokeWidth="0.5" opacity="0.3">
        {[20, 30, 40, 50, 60].map((y) => (
          <line key={y} x1="28" y1={y} x2="68" y2={y} />
        ))}
      </g>
      {/* chapter number — sits to the right of margin, like handwritten */}
      <text
        x="48"
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
