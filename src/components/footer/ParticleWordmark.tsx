'use client';

import { useEffect, useRef } from 'react';

import { useReducedMotion } from 'framer-motion';

interface Particle {
  /** home position — where the particle belongs in the wordmark */
  hx: number;
  hy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** 0 = ink, 1 = accent, 2 = ok */
  tone: 0 | 1 | 2;
  /** phase offset for idle drift */
  ph: number;
}

const SPRING = 0.02;
const DAMPING = 0.86;
const REPEL_RADIUS = 72;
const REPEL_FORCE = 2.6;
const IDLE_AMP = 0.7;
const MAX_PARTICLES = 3000;

function readTokens(): [string, string, string] {
  const style = getComputedStyle(document.documentElement);
  return [
    style.getPropertyValue('--ink').trim() || '#17191e',
    style.getPropertyValue('--accent').trim() || '#d96e30',
    style.getPropertyValue('--ok').trim() || '#2c7a5b',
  ];
}

/**
 * "OSNAREN" formed from dots on a single canvas. One rAF loop drives plain
 * objects (no React state per particle). The loop runs only while `active`
 * is true and the tab is visible — the parent passes reveal progress rather
 * than an IntersectionObserver, because a sticky-pinned footer is always
 * "intersecting" even when fully covered by the page above it. Reduced
 * motion renders the dotted wordmark once, statically, with no loop.
 */
export function ParticleWordmark({ text = 'OSNAREN', active = true }: { text?: string; active?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);
  const controlsRef = useRef<{ start: () => void; stop: () => void } | null>(null);

  const reduceMotion = useReducedMotion();

  // one-time engine setup (re-created only if reduced-motion preference flips)
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const engine = {
      particles: [] as Particle[],
      w: 0,
      h: 0,
      colors: readTokens(),
      pointerX: -1e4,
      pointerY: -1e4,
      raf: 0,
      running: false,
    };
    let disposed = false;

    const draw = (settle: boolean) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, engine.w, engine.h);
      // batch by tone: three fillStyle changes per frame, not thousands
      for (let tone = 0; tone < 3; tone++) {
        ctx.fillStyle = engine.colors[tone];
        for (const p of engine.particles) {
          if (p.tone !== tone) continue;
          if (settle) {
            p.x = p.hx;
            p.y = p.hy;
          }
          ctx.fillRect(p.x - 1.1, p.y - 1.1, 2.2, 2.2);
        }
      }
    };

    const sample = () => {
      if (disposed) return;
      const w = container.clientWidth;
      if (w === 0) return;
      const h = Math.round(Math.min(180, Math.max(88, w * 0.165)));
      const dpr = Math.min(2, window.devicePixelRatio || 1);

      engine.w = w;
      engine.h = h;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.height = `${h}px`;
      container.style.height = `${h}px`;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // rasterise the wordmark offscreen, then sample alpha into home positions
      const off = document.createElement('canvas');
      off.width = w;
      off.height = h;
      const octx = off.getContext('2d');
      if (!octx) return;
      const family = getComputedStyle(document.body).fontFamily || 'sans-serif';
      let fontSize = h * 0.82;
      octx.font = `700 ${fontSize}px ${family}`;
      const measured = octx.measureText(text).width;
      if (measured > w * 0.96) fontSize *= (w * 0.96) / measured;
      octx.font = `700 ${fontSize}px ${family}`;
      octx.textAlign = 'center';
      octx.textBaseline = 'middle';
      octx.fillStyle = '#fff';
      octx.fillText(text, w / 2, h * 0.54);

      const data = octx.getImageData(0, 0, w, h).data;
      let step = Math.max(4, Math.round(w / 175));
      const homes: { x: number; y: number }[] = [];
      const collect = () => {
        homes.length = 0;
        for (let y = 0; y < h; y += step) {
          for (let x = 0; x < w; x += step) {
            if (data[(y * w + x) * 4 + 3] > 128) homes.push({ x, y });
          }
        }
      };
      collect();
      while (homes.length > MAX_PARTICLES) {
        step += 1;
        collect();
      }

      // reuse live particles across resizes so the field doesn't "explode"
      const prev = engine.particles;
      engine.particles = homes.map((home, i) => {
        const old = prev[i];
        return {
          hx: home.x,
          hy: home.y,
          x: old ? old.x : home.x + (Math.random() - 0.5) * w * 0.4,
          y: old ? old.y : h + Math.random() * h * 0.8,
          vx: old ? old.vx : 0,
          vy: old ? old.vy : 0,
          // ~92% ink, ~6% signal orange, ~2% verified green
          tone: old ? old.tone : Math.random() < 0.06 ? 1 : Math.random() < 0.021 ? 2 : 0,
          ph: old ? old.ph : Math.random() * Math.PI * 2,
        };
      });

      if (reduceMotion) draw(true);
    };

    const tick = (t: number) => {
      if (!engine.running) return;
      for (const p of engine.particles) {
        // idle drift: the letters breathe very slightly
        const tx = p.hx + Math.sin(t * 0.0006 + p.ph) * IDLE_AMP;
        const ty = p.hy + Math.cos(t * 0.0007 + p.ph) * IDLE_AMP;
        let ax = (tx - p.x) * SPRING;
        let ay = (ty - p.y) * SPRING;
        const dx = p.x - engine.pointerX;
        const dy = p.y - engine.pointerY;
        const dist = Math.hypot(dx, dy);
        if (dist < REPEL_RADIUS && dist > 0.1) {
          const push = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_FORCE;
          ax += (dx / dist) * push;
          ay += (dy / dist) * push;
        }
        p.vx = (p.vx + ax) * DAMPING;
        p.vy = (p.vy + ay) * DAMPING;
        p.x += p.vx;
        p.y += p.vy;
      }
      draw(false);
      engine.raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (engine.running || reduceMotion || disposed) return;
      engine.running = true;
      container.dataset.particles = 'running';
      engine.raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      engine.running = false;
      container.dataset.particles = 'paused';
      cancelAnimationFrame(engine.raf);
    };
    controlsRef.current = { start, stop };

    // pointer scatter — mouse only; touch keeps ambient motion alone
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const rect = canvas.getBoundingClientRect();
      engine.pointerX = event.clientX - rect.left;
      engine.pointerY = event.clientY - rect.top;
    };
    const onPointerLeave = () => {
      engine.pointerX = -1e4;
      engine.pointerY = -1e4;
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else if (activeRef.current) start();
    };

    const resizeObserver = new ResizeObserver(() => sample());
    const themeObserver = new MutationObserver(() => {
      engine.colors = readTokens();
      if (reduceMotion || !engine.running) draw(!!reduceMotion);
    });

    document.fonts.ready.then(() => {
      if (disposed) return;
      sample();
      resizeObserver.observe(container);
      themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
      if (reduceMotion) {
        draw(true);
        return;
      }
      container.addEventListener('pointermove', onPointerMove);
      container.addEventListener('pointerleave', onPointerLeave);
      document.addEventListener('visibilitychange', onVisibility);
      if (activeRef.current && !document.hidden) start();
    });

    return () => {
      disposed = true;
      stop();
      controlsRef.current = null;
      resizeObserver.disconnect();
      themeObserver.disconnect();
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reduceMotion, text]);

  // cheap start/stop as the footer is revealed and covered again
  useEffect(() => {
    activeRef.current = active;
    if (!controlsRef.current) return;
    if (active && !document.hidden) controlsRef.current.start();
    else controlsRef.current.stop();
  }, [active]);

  return (
    <div ref={containerRef} className="relative w-full" data-particles="paused">
      <span className="sr-only">{text}</span>
      <canvas ref={canvasRef} aria-hidden="true" className="block w-full" />
    </div>
  );
}
