/** ShadySide route with animated draw-in and travelling sun. */
export function RouteVisual() {
  return (
    <svg viewBox="0 0 300 110" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <path
        d="M14 88 C90 78 130 36 190 42 S276 66 290 28"
        fill="none"
        stroke="var(--ok)"
        strokeWidth="8"
        opacity="0.3"
      />
      <path
        d="M12 84 C88 74 128 32 188 38 S274 62 288 24"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="2.5"
        strokeDasharray="440"
        className="motion-safe:animate-[route-draw_1.15s_ease-out_forwards]"
      />
      <circle cx="12" cy="84" r="5" fill="var(--ink)" />
      <circle cx="288" cy="24" r="5" fill="var(--accent)" />
      <circle cx="240" cy="16" r="9" fill="var(--sun)" />
      <circle cx="240" cy="16" r="9" fill="var(--sun)" opacity="0.35" className="motion-safe:animate-ping" />
    </svg>
  );
}
