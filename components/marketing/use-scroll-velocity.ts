"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Momentum-preserving scroll velocity hook. Returns current velocity
 * (px/frame) plus a smoothed value that decays to a non-zero floor in
 * the last-observed direction — so driven animations keep moving
 * slowly when the user stops scrolling, and reverse their baseline
 * when the user flips direction.
 *
 * Used by the chapter 4 comet-glow to rotate clockwise at a slow
 * baseline, speed up with downward scroll, and reverse/slow when the
 * user scrolls up.
 */
export function useScrollVelocity({
  baseline = 12, // degrees-per-second floor at rest
  boost = 1.6, // multiplier applied to raw scroll velocity
  decay = 0.92, // per-frame damping of the boost term
  max = 160, // absolute dps cap
}: {
  baseline?: number;
  boost?: number;
  decay?: number;
  max?: number;
} = {}) {
  const [direction, setDirection] = useState<1 | -1>(1);
  const velocityRef = useRef(0); // smoothed velocity in dps (can be ±)
  const lastScrollY = useRef(0);
  const lastTimestamp = useRef(0);
  const rafId = useRef<number | null>(null);
  const subscribersRef = useRef<Set<(value: number) => void>>(new Set());

  useEffect(() => {
    if (typeof window === "undefined") return;
    lastScrollY.current = window.scrollY;
    lastTimestamp.current = performance.now();

    function onScroll() {
      const now = performance.now();
      const dy = window.scrollY - lastScrollY.current;
      const dt = Math.max(1, now - lastTimestamp.current);
      lastScrollY.current = window.scrollY;
      lastTimestamp.current = now;

      // Raw velocity in px/ms -> scaled to dps
      const rawDps = (dy / dt) * 1000 * 0.04 * boost; // tuned factor

      // Update direction only on a clear scroll move
      if (Math.abs(dy) > 0.5) {
        const d = dy > 0 ? 1 : -1;
        if (d !== direction) setDirection(d);
      }

      // Push velocity with bounded magnitude
      velocityRef.current = Math.max(-max, Math.min(max, velocityRef.current + rawDps));
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    function tick() {
      const dir = velocityRef.current >= 0 ? 1 : -1;
      // Decay boost toward zero
      velocityRef.current *= decay;
      // Apply direction-aware baseline so motion continues at rest
      const idleFloor = baseline * dir;
      const output = velocityRef.current + idleFloor;
      // Clamp again
      const clamped = Math.max(-max, Math.min(max, output));

      subscribersRef.current.forEach((fn) => fn(clamped));
      rafId.current = requestAnimationFrame(tick);
    }
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [baseline, boost, decay, max, direction]);

  const subscribe = (fn: (value: number) => void) => {
    subscribersRef.current.add(fn);
    return () => subscribersRef.current.delete(fn);
  };

  return { subscribe, direction };
}
