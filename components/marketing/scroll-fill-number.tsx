"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Scroll-linked outline→fill numeral.
 *
 * Same language as the Buyer Clarity numerals on /pricing:
 *  • Base: numeral rendered in outline (text-stroke) with the `outline` color.
 *  • Overlay: same numeral in solid `fill` color, masked by a motion `height`
 *    that grows from 0% → 100% as the element's scroll range progresses.
 *  • Linear interpolation by default — no bouncy easing.
 *
 * Keep the usage subtle: one scroll-fill moment per section, not every number
 * on the page. It's a detail, not a theme.
 */
export function ScrollFillNumber({
  children,
  size = "clamp(3rem, 6vw, 5rem)",
  weight = 500,
  letterSpacing = "-0.05em",
  outlineColor = "rgba(181, 255, 93, 0.38)",
  fillColor = "var(--lime)",
  fillStart = 0.08,
  fillEnd = 0.55,
  className = "",
}: {
  children: ReactNode;
  size?: string;
  weight?: number;
  letterSpacing?: string;
  outlineColor?: string;
  fillColor?: string;
  fillStart?: number;
  fillEnd?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "center 45%"],
  });
  const heightPct = useTransform(
    scrollYProgress,
    [fillStart, fillEnd],
    reduceMotion ? ["100%", "100%"] : ["0%", "100%"],
  );

  const baseStyle: React.CSSProperties = {
    fontFamily: "var(--font-space-grotesk), sans-serif",
    fontWeight: weight,
    fontSize: size,
    letterSpacing,
    lineHeight: 0.85,
  };

  return (
    <div ref={ref} className={`relative inline-block select-none ${className}`}>
      <div
        style={{
          ...baseStyle,
          color: "transparent",
          WebkitTextStroke: `1px ${outlineColor}`,
        }}
      >
        {children}
      </div>
      <motion.div
        aria-hidden="true"
        className="absolute left-0 top-0 overflow-hidden"
        style={{ width: "100%", height: heightPct }}
      >
        <div style={{ ...baseStyle, color: fillColor }}>{children}</div>
      </motion.div>
    </div>
  );
}
