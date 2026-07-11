/** TheFlames — letter tiles with staggered hover animation. */
export function HomeFlamesVisual() {
  const letters = ['F', 'L', 'A', 'M', 'E', 'S'];
  return (
    <div
      className="flex min-w-0 flex-1 items-center justify-center gap-1 min-[1360px]:justify-start"
      aria-hidden="true"
    >
      {letters.map((letter, i) => (
        <span
          key={letter}
          className={`grid size-7 shrink-0 place-items-center rounded-md border font-mono text-[11px] font-medium transition-transform group-hover:-translate-y-0.5 min-[1360px]:size-6 min-[1360px]:text-[10px] ${
            i === 0 ? 'border-accent bg-accent text-white' : 'border-line-strong bg-surface-2 text-muted'
          }`}
          style={{ transitionDelay: `${i * 40}ms` }}
        >
          {letter}
        </span>
      ))}
    </div>
  );
}
