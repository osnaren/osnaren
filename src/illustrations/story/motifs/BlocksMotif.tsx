/** Soliton — circular badge with scheduler grid and chapter number. */
export function BlocksMotif({ index }: { index: string }) {
  return (
    <svg viewBox="0 0 80 80" className="h-16 w-16 shrink-0 sm:h-20 sm:w-20" aria-hidden="true">
      {/* circle border */}
      <circle cx="40" cy="40" r="37" fill="none" stroke="var(--line-strong)" strokeWidth="1.5" />
      {/* grid blocks */}
      {[0, 1, 2].map((row) =>
        [0, 1, 2, 3].map((col) => {
          const isActive = row === 1 && col >= 1 && col <= 2;
          return (
            <rect
              key={`${row}-${col}`}
              x={12 + col * 15}
              y={20 + row * 14}
              width="12"
              height="10"
              rx="1.5"
              fill={isActive ? 'var(--accent)' : 'var(--well)'}
              opacity={isActive ? 0.7 : 1}
            />
          );
        })
      )}
      {/* chapter number centered */}
      <text
        x="40"
        y="47"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="22"
        fontWeight="700"
        fill="var(--ink)"
        opacity="0.95"
      >
        {index}
      </text>
    </svg>
  );
}
