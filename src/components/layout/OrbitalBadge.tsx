'use client';

import { useReducedMotion } from 'framer-motion';

/**
 * OrbitalBadge — the animated "OS" orbital logo.
 *
 * Two concentric orbits with travelling dots, "OS" at the centre,
 * and a small orange superscript "n". Pure SVG — no layout shift,
 * scales cleanly from 24px (favicon) to any size.
 *
 * Respects `prefers-reduced-motion`: when the user prefers reduced
 * motion, all orbits and dots freeze in place.
 */
export function OrbitalBadge({ size = 32, className = '' }: { size?: number; className?: string }) {
  const r = useReducedMotion();

  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className={className} aria-hidden="true" role="img">
      <style>{`
        @keyframes os-orbit { to { transform: rotate(360deg); } }
        @keyframes os-counter { to { transform: rotate(-360deg); } }
        @keyframes os-pulse { 0%,100% { r: 6; opacity: 0.85; } 50% { r: 8; opacity: 1; } }
        .os-orbit { transform-origin: 100px 100px; animation: os-orbit 20s linear infinite; }
        .os-orbit-reverse { transform-origin: 100px 100px; animation: os-counter 28s linear infinite; }
        .os-pulse { animation: os-pulse 3s ease-in-out infinite; }
      `}</style>

      {/* ─── orbits ─── */}
      <circle cx="100" cy="100" r="72" fill="none" stroke="var(--line-strong)" strokeWidth="1" opacity="0.5" />
      <circle cx="100" cy="100" r="52" fill="none" stroke="var(--line-strong)" strokeWidth="0.8" opacity="0.35" />

      {/* ─── orbiting dots ─── */}
      <g className={r ? '' : 'os-orbit'}>
        <circle cx="172" cy="100" r="6" className="os-pulse" style={{ fill: 'var(--accent)' }} />
      </g>
      <g className={r ? '' : 'os-orbit-reverse'}>
        <circle cx="48" cy="100" r="5.5" style={{ fill: 'var(--ok)', opacity: 0.75 }} />
      </g>
      <g className={r ? '' : 'os-orbit'}>
        <circle cx="100" cy="28" r="2.5" style={{ fill: 'var(--line-strong)', opacity: 0.5 }} />
      </g>
      <g className={r ? '' : 'os-orbit-reverse'}>
        <circle cx="100" cy="172" r="2.5" style={{ fill: 'var(--line-strong)', opacity: 0.5 }} />
      </g>
      <g className={r ? '' : 'os-orbit'}>
        <circle cx="155" cy="145" r="2" style={{ fill: 'var(--line-strong)', opacity: 0.4 }} />
      </g>

      {/* ─── centre: OS ─── */}
      <text
        x="93"
        y="112"
        textAnchor="middle"
        fontFamily="var(--font-space-grotesk), var(--font-plex-mono), monospace"
        fontSize="52"
        fontWeight="700"
        fill="var(--ink)"
        letterSpacing="-2"
      >
        OS
      </text>
      <text
        x="126"
        y="88"
        fontFamily="var(--font-plex-mono), monospace"
        fontSize="22"
        fontWeight="500"
        fill="var(--accent)"
      >
        n
      </text>
    </svg>
  );
}
