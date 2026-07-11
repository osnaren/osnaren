/** Lab / experiment grid (default fallback for projects). */
export function LabProjectVisual() {
  const tones = ['well', 'accent', 'well', 'ink', 'ok', 'well', 'sun', 'well'] as const;
  return (
    <div className="grid h-full grid-cols-4 content-center gap-2 px-6" aria-hidden="true">
      {tones.map((tone, i) => (
        <span key={i} className="aspect-square rounded" style={{ background: `var(--${tone})` }} />
      ))}
    </div>
  );
}
