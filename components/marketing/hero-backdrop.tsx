"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { type ReactNode, useRef } from "react";

/**
 * Hero backdrop — scroll-driven atmosphere for any page hero.
 *
 * Two soft glow masses that drift laterally on scroll. That's it —
 * no sweeping hairlines, no gridlines, no fake product lighting.
 * The composition carries the work; the backdrop just breathes.
 */
export function HeroBackdrop({
  tone = "pitch",
  variant = "default",
}: {
  tone?: "pitch" | "chalk" | "chalk-2";
  variant?: "default" | "wide";
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 100],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, -50],
  );
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);

  const glowA =
    tone === "pitch"
      ? "rgba(181, 255, 93, 0.08)"
      : tone === "chalk-2"
        ? "rgba(181, 255, 93, 0.12)"
        : "rgba(6, 16, 11, 0.05)";
  const glowB =
    tone === "pitch"
      ? "rgba(207, 230, 242, 0.05)"
      : "rgba(245, 195, 110, 0.09)";

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <motion.div style={{ x, y, scale }} className="absolute inset-0">
        <div
          className="absolute"
          style={{
            top: "8%",
            right: "-12%",
            width: variant === "wide" ? "70vw" : "56vw",
            height: variant === "wide" ? "70vw" : "56vw",
            maxWidth: 880,
            maxHeight: 880,
            borderRadius: "50%",
            background: `radial-gradient(closest-side, ${glowA}, transparent 72%)`,
          }}
        />
        <div
          className="absolute"
          style={{
            bottom: "-14%",
            left: "-8%",
            width: "38vw",
            height: "38vw",
            maxWidth: 560,
            maxHeight: 560,
            borderRadius: "50%",
            background: `radial-gradient(closest-side, ${glowB}, transparent 74%)`,
          }}
        />
      </motion.div>
    </div>
  );
}

/**
 * Entry reveal for hero right-column panels — linear easing, no bounce.
 */
export function ScrollRise({
  children,
  className = "",
  amount = 40,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: amount }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
