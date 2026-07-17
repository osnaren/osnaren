/** Product Lab — circular badge with route signal and chapter number. */
export function SignalMotif({ index }: { index: string }) {
  return (
    <svg viewBox="0 0 80 80" className="h-16 w-16 shrink-0 sm:h-20 sm:w-20" aria-hidden="true">
      {/* circle border */}
      <circle cx="40" cy="40" r="37" fill="none" stroke="var(--line-strong)" strokeWidth="1.5" />
      {/* signal path */}
      <path
        d="M14 56 C28 50 36 24 50 28 S66 22 68 16"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.75"
        opacity="0.6"
      />
      {/* start dot */}
      <circle cx="14" cy="56" r="3" fill="var(--ink)" opacity="0.6" />
      {/* chapter number as the destination node */}
      <circle cx="68" cy="16" r="11" fill="var(--sun)" opacity="0.2" />
      <circle cx="68" cy="16" r="7" fill="var(--accent)" opacity="0.85" />
      <text
        x="68"
        y="19.5"
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
