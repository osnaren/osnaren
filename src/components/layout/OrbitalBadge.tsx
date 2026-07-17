'use client';

import { useReducedMotion } from 'framer-motion';

/**
 * OrbitalBadge — the animated "osn" orbital logo.
 *
 * Three concentric orbits with signal nodes, "os" at the centre,
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
        @keyframes os-pulse { 0%,100% { opacity: 0.8; } 50% { opacity: 1; } }
        .os-orbit { transform-origin: 100px 100px; animation: os-orbit 22s linear infinite; }
        .os-orbit-reverse { transform-origin: 100px 100px; animation: os-counter 30s linear infinite; }
        .os-pulse { animation: os-pulse 3s ease-in-out infinite; }
      `}</style>

      {/* ─── three orbits (scaled from 512-viewbox reference) ─── */}
      <circle cx="100" cy="100" r="69" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.88" />
      <circle cx="100" cy="100" r="52" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.92" />
      <circle
        cx="100"
        cy="100"
        r="32"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeDasharray="2 4"
        opacity="0.62"
      />

      {/* ─── neutral orbit nodes ─── */}
      <g className={r ? '' : 'os-orbit'}>
        <circle cx="37" cy="73" r="4" fill="var(--logo-bg, #17191e)" stroke="currentColor" strokeWidth="1.2" />
      </g>
      <g className={r ? '' : 'os-orbit-reverse'}>
        <circle cx="82" cy="52" r="4" fill="var(--logo-bg, #17191e)" stroke="currentColor" strokeWidth="1.2" />
      </g>
      <g className={r ? '' : 'os-orbit'}>
        <circle cx="164" cy="122" r="4" fill="var(--logo-bg, #17191e)" stroke="currentColor" strokeWidth="1.2" />
      </g>

      {/* ─── brand signal nodes ─── */}
      <g className={r ? '' : 'os-orbit-reverse'}>
        <circle cx="144" cy="35" r="8" className="os-pulse" fill="#E86B2A" />
      </g>
      <g className={r ? '' : 'os-orbit'}>
        <circle cx="69" cy="152" r="7" fill="#8BCB88" opacity="0.85" />
      </g>

      {/* ─── centre monogram ─── */}
      <text
        x="98"
        y="113"
        textAnchor="middle"
        fontFamily="var(--font-coda), Space Grotesk, Inter, system-ui, sans-serif"
        fontSize="49"
        fontWeight="400"
        fill="currentColor"
        letterSpacing="-5"
      >
        os
      </text>
      <text
        x="129"
        y="84"
        fontFamily="var(--font-coda), IBM Plex Mono, monospace"
        fontSize="18"
        fontWeight="600"
        fill="#E86B2A"
      >
        n
      </text>
    </svg>
  );
}
