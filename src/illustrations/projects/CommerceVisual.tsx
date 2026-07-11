/** Commerce product page schematic. */
export function CommerceVisual() {
  return (
    <svg viewBox="0 0 300 110" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <rect x="16" y="14" width="84" height="84" rx="6" fill="var(--well)" />
      <path d="M32 82 L54 56 L70 70 L86 46" stroke="var(--faint)" strokeWidth="2.5" fill="none" />
      <rect x="118" y="18" width="150" height="10" rx="5" fill="var(--well)" />
      <rect x="118" y="38" width="96" height="8" rx="4" fill="var(--well)" />
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={118 + i * 26}
          y="58"
          width="20"
          height="16"
          rx="3"
          fill={i === 1 ? 'var(--ok)' : 'var(--well)'}
          opacity={i === 1 ? 0.9 : 1}
        />
      ))}
      <rect x="118" y="82" width="112" height="16" rx="5" fill="var(--accent)" />
    </svg>
  );
}
