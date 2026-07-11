/** Forest fire detection — four class swatches. */
export function FireVisual() {
  return (
    <svg viewBox="0 0 300 110" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      {[
        { x: 18, fill: 'var(--accent)', label: 'fire' },
        { x: 90, fill: 'var(--ok)', label: 'nofire' },
        { x: 162, fill: 'var(--faint)', label: 'smoke' },
        { x: 234, fill: 'var(--sun)', label: 'smokefire' },
      ].map((cell) => (
        <g key={cell.label}>
          <rect x={cell.x} y="18" width="52" height="52" rx="6" fill={cell.fill} opacity="0.9" />
          <text
            x={cell.x + 26}
            y="88"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="8"
            fill="var(--faint)"
          >
            {cell.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
