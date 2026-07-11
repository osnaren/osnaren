/** Retinal OCT classification — concentric circles with scan lines. */
export function RetinaVisual() {
  return (
    <svg viewBox="0 0 300 110" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <circle cx="150" cy="55" r="44" fill="none" stroke="var(--line-strong)" strokeWidth="1.5" />
      <circle cx="150" cy="55" r="30" fill="none" stroke="var(--ok)" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="150" cy="55" r="15" fill="var(--ink)" />
      <circle cx="150" cy="55" r="6" fill="var(--accent)" />
      {[0, 1, 2, 3].map((i) => (
        <line
          key={`l-${i}`}
          x1="20"
          y1={30 + i * 17}
          x2="88"
          y2={30 + i * 17}
          stroke="var(--well)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <line
          key={`r-${i}`}
          x1="212"
          y1={30 + i * 17}
          x2="280"
          y2={30 + i * 17}
          stroke="var(--well)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
