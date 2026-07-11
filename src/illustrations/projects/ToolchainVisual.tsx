/** Toolchain / Soliton scheduler grid. */
export function ToolchainVisual() {
  return (
    <svg viewBox="0 0 300 110" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2, 3, 4, 5].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={20 + col * 44}
            y={16 + row * 22}
            width="38"
            height="16"
            rx="3"
            fill={row === 1 && col >= 1 && col <= 3 ? 'var(--accent)' : 'var(--well)'}
            opacity={row === 1 && col >= 1 && col <= 3 ? 0.9 : 1}
          />
        ))
      )}
    </svg>
  );
}
