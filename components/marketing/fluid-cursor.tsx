"use client";

import { useEffect, useRef } from "react";

/**
 * Smartplay tactical cursor — v3.
 *
 *   ┌─      ─┐
 *       ·       ← tiny live dot at center
 *   └─      ─┘          ∿∿∿∿∿∿∿∿∿   ← one drawn green line trailing
 *
 * Design language (single authored system, not confetti):
 *
 *   • Reticle: four L-shaped bracket corners + a pulsing center dot.
 *     Scales up on hover, tints lime.
 *   • Trail: one continuous fluid line drawn behind the pointer.
 *     Not particles. Not dots. A smoothed path stroked with tapering
 *     alpha + width, so the newest segment is bold and it recedes
 *     gently into the surface. Quadratic midpoint smoothing to avoid
 *     polyline kinks.
 *   • Click: a short-lived tactical "+" mark.
 *   • Auto-tone: walks up from `elementFromPoint` — on light surfaces
 *     the line + reticle shift to a deep forest green. No
 *     mix-blend-mode anywhere (unreliable across gradients).
 *
 * Performance:
 *   • One canvas, `requestAnimationFrame` loop.
 *   • Trail points are age-based, capped at ~40 nodes max; old points
 *     are dropped — not redrawn forever.
 *   • Everything else is CSS transforms on the reticle div.
 */

const DARK_STROKE = "rgba(247, 248, 239, 0.92)"; // chalk — over pitch
const LIGHT_STROKE = "#0a2518"; // deep forest — reticle over chalk
const TRAIL_DARK = { r: 181, g: 255, b: 93 }; // lime over dark surfaces
const TRAIL_LIGHT = { r: 6, g: 48, b: 22 }; // deep forest green over light surfaces
const ACCENT = "#b5ff5d";

export function FluidCursor() {
  const reticleRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!finePointer || reduceMotion) return;

    const reticle = reticleRef.current;
    const canvas = canvasRef.current;
    if (!reticle || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.max(1, window.devicePixelRatio || 1);
    function resize() {
      if (!canvas || !ctx) return;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }
    resize();
    window.addEventListener("resize", resize);

    type TrailPoint = { x: number; y: number; age: number };
    type Mark = { x: number; y: number; age: number };
    const trail: TrailPoint[] = [];
    const marks: Mark[] = [];
    const TRAIL_LIFE_MS = 520;
    const MAX_TRAIL_POINTS = 42;

    const target = { x: -100, y: -100 };
    const reticlePos = { x: -100, y: -100 };
    const lastPos = { x: 0, y: 0 };
    let hover = false;
    let visible = false;
    let down = false;
    let onLight = false;

    // Bounding-rect region detection.
    //
    // Earlier versions used `document.elementFromPoint` + `closest()` to walk
    // the ancestor chain from whatever was under the cursor. That kept failing
    // intermittently — likely because the page has translucent / pointer-event
    // shenanigans (parallax-translated sections, hero atmosphere layers, etc.)
    // that confused the topmost-element lookup.
    //
    // This version is foolproof: query every element with a `data-surface`
    // attribute, read their *visual* bounding rects (which already include
    // any framer-motion transforms), and pick the topmost (last DOM sibling)
    // whose rect contains the cursor's clientY. No ancestor walking, no
    // pointer-events edge cases.
    function inspectSurface(_x: number, y: number) {
      const sections = document.querySelectorAll<HTMLElement>("[data-surface]");
      for (let i = sections.length - 1; i >= 0; i--) {
        const s = sections[i];
        const rect = s.getBoundingClientRect();
        if (y >= rect.top && y <= rect.bottom) {
          return s.dataset.surface === "light";
        }
      }
      return false;
    }

    function applySurface() {
      reticle!.style.setProperty(
        "--ret-stroke",
        onLight ? LIGHT_STROKE : DARK_STROKE,
      );
    }
    applySurface();

    function onMove(e: PointerEvent) {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        visible = true;
        reticle!.style.opacity = "1";
      }
      // Re-inspect surface on every move — pointerover alone misses cases
      // where the pointer crosses a section boundary without actually
      // entering a new immediate element (e.g. moving inside a deeply
      // nested element that spans both surfaces).
      const next = inspectSurface(e.clientX, e.clientY);
      if (next !== onLight) {
        onLight = next;
        applySurface();
      }
    }

    function onHoverDetect(e: PointerEvent) {
      const el = e.target as Element | null;
      const isInteractive = !!el?.closest(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]',
      );
      if (isInteractive !== hover) {
        hover = isInteractive;
        reticle!.dataset.state = hover ? "hover" : "idle";
      }
      const light = el?.closest(
        '[data-surface="light"], .surface-chalk, .surface-chalk-2, .card-chalk, .card-chalk-soft',
      );
      const dark = el?.closest(
        '[data-surface="dark"], .surface-pitch, .surface-pitch-gradient, .hero-pitch, .card-pitch',
      );
      let next = onLight;
      if (light && !dark) next = true;
      else if (dark && !light) next = false;
      else if (light && dark) {
        next = !(light as HTMLElement).contains(dark as HTMLElement);
      }
      if (next !== onLight) {
        onLight = next;
        applySurface();
      }
    }

    function onLeave() {
      visible = false;
      reticle!.style.opacity = "0";
      trail.length = 0;
    }

    function onDown(e: PointerEvent) {
      down = true;
      reticle!.dataset.pressed = "true";
      marks.push({ x: e.clientX, y: e.clientY, age: 0 });
    }

    function onUp() {
      down = false;
      reticle!.dataset.pressed = "false";
    }

    let lastInspect = 0;
    function maybeInspect(now: number) {
      if (now - lastInspect < 80) return;
      lastInspect = now;
      const next = inspectSurface(target.x, target.y);
      if (next !== onLight) {
        onLight = next;
        applySurface();
      }
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onHoverDetect, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener(
      "scroll",
      () => maybeInspect(performance.now()),
      { passive: true },
    );
    document.documentElement.addEventListener("pointerleave", onLeave);

    let rafId = 0;
    let lastT = performance.now();

    function tick(now: number) {
      const dt = Math.min(40, now - lastT);
      lastT = now;

      // Reticle follows pointer with a gentle lerp
      reticlePos.x += (target.x - reticlePos.x) * 0.32;
      reticlePos.y += (target.y - reticlePos.y) * 0.32;

      const vx = target.x - lastPos.x;
      const vy = target.y - lastPos.y;
      lastPos.x = target.x;
      lastPos.y = target.y;
      const speed = Math.hypot(vx, vy);
      const angle = Math.atan2(vy, vx) * (180 / Math.PI);
      const tilt = Math.max(-6, Math.min(6, (angle / 90) * (speed > 1 ? 3 : 0)));

      // Feed the trail — only when actually moving, but space points nicely.
      if (visible && speed > 0.6) {
        const last = trail[trail.length - 1];
        // skip points that are too close to avoid dense clusters
        if (!last || Math.hypot(target.x - last.x, target.y - last.y) > 2.5) {
          trail.push({ x: target.x, y: target.y, age: 0 });
          if (trail.length > MAX_TRAIL_POINTS) trail.shift();
        }
      }

      // Age + drop trail points
      for (let i = trail.length - 1; i >= 0; i--) {
        trail[i].age += dt;
        if (trail[i].age > TRAIL_LIFE_MS) trail.splice(i, 1);
      }

      // Age click marks
      for (let i = marks.length - 1; i >= 0; i--) {
        marks[i].age += dt;
        if (marks[i].age > 1200) marks.splice(i, 1);
      }

      // Reticle transform
      const scale = hover ? 1.8 : down ? 0.82 : 1;
      reticle!.style.transform = `translate3d(${reticlePos.x - 14}px, ${reticlePos.y - 14}px, 0) rotate(${tilt}deg) scale(${scale})`;

      // Paint
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas!.width / dpr, canvas!.height / dpr);

      // --- Single fluid line trail ---
      if (trail.length >= 2) {
        const c = onLight ? TRAIL_LIGHT : TRAIL_DARK;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        // Walk pairs; draw each segment with its own alpha + width so the
        // line fades and tapers as it ages. Quadratic midpoint smoothing
        // keeps the whole thing reading as one curve, not a polyline.
        for (let i = 0; i < trail.length - 1; i++) {
          const p0 = trail[i];
          const p1 = trail[i + 1];
          const k = 1 - p0.age / TRAIL_LIFE_MS; // 1 = newest, 0 = dead
          if (k <= 0) continue;
          const alpha = Math.pow(k, 1.2) * (onLight ? 0.88 : 0.75);
          const width = 0.6 + k * 2.4; // taper: 3px near pointer → 0.6px at tail

          ctx.beginPath();
          ctx.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha})`;
          ctx.lineWidth = width;

          if (i + 2 < trail.length) {
            const p2 = trail[i + 2];
            const mx = (p1.x + p2.x) / 2;
            const my = (p1.y + p2.y) / 2;
            ctx.moveTo(p0.x, p0.y);
            ctx.quadraticCurveTo(p1.x, p1.y, mx, my);
          } else {
            ctx.moveTo(p0.x, p0.y);
            ctx.lineTo(p1.x, p1.y);
          }
          ctx.stroke();
        }

        // Extend the freshest segment all the way to the pointer so the
        // line feels connected to the reticle, not trailing behind it.
        const tail = trail[trail.length - 1];
        const dHead = Math.hypot(target.x - tail.x, target.y - tail.y);
        if (dHead > 0.5) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${onLight ? 0.88 : 0.75})`;
          ctx.lineWidth = 3;
          ctx.moveTo(tail.x, tail.y);
          ctx.lineTo(target.x, target.y);
          ctx.stroke();
        }
      }

      // --- Click marks: tactical "+" ---
      for (const m of marks) {
        const k = 1 - m.age / 1200;
        const size = 8 + (1 - k) * 10;
        const c = onLight ? TRAIL_LIGHT : TRAIL_DARK;
        ctx.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${k * 0.9})`;
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.moveTo(m.x - size, m.y);
        ctx.lineTo(m.x + size, m.y);
        ctx.moveTo(m.x, m.y - size);
        ctx.lineTo(m.x, m.y + size);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(m.x, m.y, size * 0.42, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${k * 0.35})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onHoverDetect);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("resize", resize);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="cursor-trail-canvas"
        aria-hidden="true"
      />
      <div
        ref={reticleRef}
        data-state="idle"
        data-pressed="false"
        className="cursor-reticle"
        aria-hidden="true"
        style={{
          width: 28,
          height: 28,
          opacity: 0,
          transition: "opacity 180ms ease-out",
          ["--ret-stroke" as unknown as string]: DARK_STROKE,
        } as React.CSSProperties}
      >
        <svg viewBox="0 0 28 28" width="28" height="28" fill="none">
          <path d="M 2 8 V 2 H 8" stroke="var(--ret-stroke)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 26 8 V 2 H 20" stroke="var(--ret-stroke)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 2 20 V 26 H 8" stroke="var(--ret-stroke)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 26 20 V 26 H 20" stroke="var(--ret-stroke)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="14" cy="14" r="1.4" fill="var(--lime)" className="reticle-center" />
        </svg>
      </div>
      <style>{`
        .cursor-reticle {
          transition: color 260ms cubic-bezier(0.22,1,0.36,1);
        }
        .cursor-reticle[data-state="hover"] {
          --ret-stroke: ${ACCENT} !important;
          filter: drop-shadow(0 0 6px rgba(181,255,93,0.45));
        }
        .cursor-reticle .reticle-center {
          transform-origin: 14px 14px;
          animation: reticle-pulse 2s ease-in-out infinite;
        }
        @keyframes reticle-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.8); opacity: 0.5; }
        }
      `}</style>
    </>
  );
}
