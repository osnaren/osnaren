/** Commerce — circular badge with product state flow and chapter number. */
export function FlowMotif({ index }: { index: string }) {
  return (
    <svg viewBox="0 0 80 80" className="h-16 w-16 shrink-0 sm:h-20 sm:w-20" aria-hidden="true">
      {/* circle border */}
      <circle cx="40" cy="40" r="37" fill="none" stroke="var(--line-strong)" strokeWidth="1.5" />
      {/* three state boxes */}
      <rect x="10" y="32" width="16" height="16" rx="3" fill="var(--well)" />
      <rect x="32" y="32" width="16" height="16" rx="3" fill="var(--ok)" opacity="0.7" />
      <rect x="54" y="32" width="16" height="16" rx="3" fill="var(--accent)" opacity="0.75" />
      {/* arrows */}
      <path d="M26 40 H32 M48 40 H54" stroke="var(--faint)" strokeWidth="1.25" />
      {/* chapter number below flow */}
      <text
        x="40"
        y="62"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="14"
        fontWeight="700"
        fill="var(--ink)"
        opacity="0.75"
      >
        {index}
      </text>
    </svg>
  );
}
