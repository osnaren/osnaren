/** Research — circular badge with document page and chapter number as title. */
export function PaperMotif({ index }: { index: string }) {
  return (
    <svg viewBox="0 0 80 80" className="h-16 w-16 shrink-0 sm:h-20 sm:w-20" aria-hidden="true">
      {/* circle border */}
      <circle cx="40" cy="40" r="37" fill="none" stroke="var(--line-strong)" strokeWidth="1.5" />
      {/* page outline */}
      <rect
        x="22"
        y="12"
        width="36"
        height="50"
        rx="3"
        fill="var(--surface)"
        stroke="var(--line-strong)"
        strokeWidth="0.75"
      />
      {/* chapter number as document title */}
      <text
        x="40"
        y="30"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="14"
        fontWeight="700"
        fill="var(--ink)"
        opacity="0.8"
      >
        {index}
      </text>
      {/* text lines below */}
      <g stroke="var(--well)" strokeWidth="1.5" strokeLinecap="round">
        <line x1="28" y1="36" x2="52" y2="36" />
        <line x1="28" y1="42" x2="48" y2="42" />
        <line x1="28" y1="48" x2="50" y2="48" />
        <line x1="28" y1="54" x2="42" y2="54" />
      </g>
      {/* annotation dot */}
      <circle cx="62" cy="18" r="4" fill="var(--accent)" opacity="0.7" />
    </svg>
  );
}
