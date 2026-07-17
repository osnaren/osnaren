/** Resume — spec-sheet skeleton lines. */
export function HomeResumeVisual() {
  return (
    <div className="flex flex-1 flex-col justify-center gap-1.5" aria-hidden="true">
      {['80%', '60%', '70%'].map((width, i) => (
        <span key={i} className="h-1.5 rounded-sm bg-[#3a3d45]" style={{ width }} />
      ))}
    </div>
  );
}
