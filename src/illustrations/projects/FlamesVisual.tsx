/** TheFlames letter tiles with strike-through animation. */
export function FlamesVisual() {
  const letters = ['F', 'L', 'A', 'M', 'E', 'S'];
  const survivor = 1;
  return (
    <div className="flex h-full items-center justify-center gap-2" aria-hidden="true">
      {letters.map((letter, i) => (
        <span
          key={letter}
          className={`relative grid size-9 place-items-center rounded-md border font-mono text-sm font-medium ${
            i === survivor ? 'border-accent bg-accent text-white' : 'border-line-strong bg-surface text-faint'
          }`}
        >
          {letter}
          {i !== survivor && (
            <span
              className="bg-accent/80 absolute top-1/2 left-1 h-0.5 w-7 origin-left -translate-y-1/2 rounded-full motion-safe:animate-[flames-strike_0.5s_ease-out_forwards]"
              style={{ animationDelay: `${0.15 + i * 0.09}s` }}
            />
          )}
        </span>
      ))}
    </div>
  );
}
