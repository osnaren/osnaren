/** Timer / pomodoro clock with task list. */
export function TimerVisual() {
  return (
    <svg viewBox="0 0 300 110" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <circle cx="70" cy="55" r="39" fill="none" stroke="var(--well)" strokeWidth="8" />
      <circle
        cx="70"
        cy="55"
        r="39"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray="168 245"
        transform="rotate(-90 70 55)"
      />
      <line x1="70" y1="55" x2="70" y2="31" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="70" y1="55" x2="87" y2="64" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="70" cy="55" r="4" fill="var(--ink)" />
      <text x="135" y="27" fontFamily="var(--font-mono)" fontSize="8" fill="var(--faint)">
        CURRENT TASK
      </text>
      <rect x="135" y="36" width="130" height="13" rx="4" fill="var(--ink)" />
      <rect x="135" y="59" width="94" height="8" rx="4" fill="var(--well)" />
      <rect x="135" y="76" width="116" height="8" rx="4" fill="var(--well)" />
      <rect x="135" y="93" width="72" height="8" rx="4" fill="var(--ok)" opacity="0.8" />
    </svg>
  );
}
