/** Lab — grid of experiment tiles. */
export function HomeLabVisual() {
  const tiles = ['well', 'accent', 'well', 'ink', 'ok', 'well', 'sun', 'well'] as const;
  return (
    <div className="mx-auto grid w-full max-w-44 flex-1 grid-cols-4 content-center gap-1.5" aria-hidden="true">
      {tiles.map((tone, i) => (
        <span
          key={i}
          className="aspect-square rounded transition-transform group-hover:scale-95"
          style={{ background: `var(--${tone})`, transitionDelay: `${i * 25}ms` }}
        />
      ))}
    </div>
  );
}
