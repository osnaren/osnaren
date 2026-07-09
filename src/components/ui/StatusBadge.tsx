const tones = {
  ok: 'text-ok border-ok/30 bg-ok/8',
  accent: 'text-accent border-accent/30 bg-accent/8',
  amber: 'text-amber border-amber/40 bg-amber/8',
  muted: 'text-faint border-line bg-transparent',
} as const;

export type StatusTone = keyof typeof tones;

export function StatusBadge({ tone = 'muted', children }: { tone?: StatusTone; children: React.ReactNode }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium tracking-[0.1em] whitespace-nowrap uppercase ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
