/** Story — dated field-note pins. */
export function HomeStoryVisual() {
  const notes = [
    { year: '2026 — the lab opens', active: true },
    { year: '2025 — shipped shadyside', active: false },
    { year: '2021 — first prod deploy', active: false },
  ];
  return (
    <div className="text-muted flex flex-1 flex-col justify-center gap-1.5 font-mono text-[10px]" aria-hidden="true">
      {notes.map((note) => (
        <div key={note.year} className="flex items-center gap-2">
          <span className={`size-1.5 rounded-full ${note.active ? 'bg-accent' : 'bg-line-strong'}`} />
          {note.year}
        </div>
      ))}
    </div>
  );
}
