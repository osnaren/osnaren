/** Chat / messaging bubbles with typing indicator. */
export function ChatVisual() {
  return (
    <svg viewBox="0 0 300 110" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <path
        d="M36 27 H150 Q160 27 160 37 V57 Q160 67 150 67 H76 L56 82 V67 H36 Q26 67 26 57 V37 Q26 27 36 27Z"
        fill="var(--well)"
      />
      <path
        d="M150 47 H264 Q274 47 274 57 V77 Q274 87 264 87 H244 V100 L226 87 H150 Q140 87 140 77 V57 Q140 47 150 47Z"
        fill="var(--ink)"
      />
      {[48, 70, 92].map((x, index) => (
        <circle key={x} cx={x} cy="47" r="4" fill={index === 1 ? 'var(--accent)' : 'var(--faint)'} opacity="0.9" />
      ))}
      <line
        x1="162"
        y1="64"
        x2="246"
        y2="64"
        stroke="var(--paper)"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.8"
      />
      <line
        x1="162"
        y1="75"
        x2="220"
        y2="75"
        stroke="var(--paper)"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.45"
      />
      <circle cx="260" cy="24" r="5" fill="var(--ok)" />
      <circle
        cx="260"
        cy="24"
        r="9"
        fill="none"
        stroke="var(--ok)"
        opacity="0.35"
        className="motion-safe:animate-ping"
      />
    </svg>
  );
}
