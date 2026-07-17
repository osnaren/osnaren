/** Ongoing — circular badge with organic growth and chapter number. */
export function GrowthMotif({ index }: { index: string }) {
  return (
    <svg viewBox="0 0 80 80" className="h-16 w-16 shrink-0 sm:h-20 sm:w-20" aria-hidden="true">
      {/* circle border */}
      <circle cx="40" cy="40" r="37" fill="none" stroke="var(--line-strong)" strokeWidth="1.5" />
      {/* ground */}
      <line x1="14" y1="62" x2="66" y2="62" stroke="var(--line-strong)" strokeWidth="1.5" opacity="0.5" />
      {/* stem */}
      <line x1="40" y1="62" x2="40" y2="28" stroke="var(--ok)" strokeWidth="2" />
      {/* leaves */}
      <path d="M40 46 C30 44 26 34 28 26 C36 27 40 36 40 46 Z" fill="var(--ok)" opacity="0.5" />
      <path d="M40 38 C50 36 54 26 52 18 C44 19 40 28 40 38 Z" fill="var(--ok)" opacity="0.35" />
      {/* chapter number at the top — the "blossom" */}
      <circle cx="40" cy="18" r="9" fill="var(--accent)" opacity="0.2" />
      <circle cx="40" cy="18" r="6" fill="var(--accent)" opacity="0.85" />
      <text
        x="40"
        y="21.5"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="10"
        fontWeight="700"
        fill="var(--paper)"
      >
        {index}
      </text>
    </svg>
  );
}
