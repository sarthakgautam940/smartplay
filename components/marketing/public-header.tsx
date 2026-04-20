"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, LogIn } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { BrandWordmark } from "@/components/marketing/brand-mark";
import { TransitionLink } from "@/components/marketing/transition-link";
import { siteNavigation } from "@/lib/constants";

/**
 * Header — solid pitch at all times, no backdrop-blur washout.
 *
 *  • Before any scroll: header is fully flush with the content below it
 *    (no hairline separator, no translucency). The top state looks like a
 *    natural extension of the hero, not a separate floating bar.
 *  • Once the user has scrolled past a small threshold, a hairline fades
 *    in at the bottom edge — the separator becomes warranted because the
 *    content above it is now different from the content below.
 *  • Scroll progress bar along the bottom is preserved but subtle.
 */
export function PublicHeader() {
  const pathname = usePathname();
  const { scrollYProgress, scrollY } = useScroll();
  const [detached, setDetached] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    setDetached(v > 4);
  });

  return (
    <header
      data-detached={detached ? "true" : "false"}
      className="public-header sticky top-0 z-40 text-[var(--on-pitch-1)] transition-[box-shadow] duration-300"
      style={{
        background: "#06100b",
      }}
    >
      <div className="section-shell flex h-[72px] items-center justify-between gap-6">
        <TransitionLink
          href="/"
          className="focus-ring group inline-flex items-center"
          aria-label="Smartplay home"
        >
          <BrandWordmark tone="dark" size="sm" />
        </TransitionLink>

        <nav className="hidden items-center gap-0.5 md:flex">
          {siteNavigation.map((item) => {
            const active = pathname === item.href;
            return (
              <TransitionLink
                key={item.href}
                href={item.href}
                data-active={active ? "true" : "false"}
                className="focus-ring group relative rounded-md px-3.5 py-2 text-[0.82rem] font-medium text-white/58 transition-colors duration-200 hover:text-white data-[active=true]:text-white"
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-3.5 -bottom-1 h-px origin-center scale-x-0 bg-[var(--lime)] transition-transform duration-300 group-hover:scale-x-100 group-data-[active=true]:scale-x-100"
                />
              </TransitionLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <TransitionLink
            href="/login"
            className="focus-ring inline-flex h-9 items-center justify-center gap-2 rounded-full px-3 text-[0.82rem] font-semibold text-white/72 transition-colors hover:text-white sm:px-4"
          >
            <LogIn className="size-3.5" />
            <span className="hidden sm:inline">Log in</span>
          </TransitionLink>
          <TransitionLink
            href="/signup"
            className="focus-ring group inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-[var(--lime)] px-4 text-[0.82rem] font-extrabold text-[var(--pitch)] transition hover:bg-[var(--lime-soft)]"
          >
            Start free
            <ArrowUpRight
              className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2.6}
            />
          </TransitionLink>
        </div>
      </div>

      {/* Hairline + scroll progress — both fade in only after scroll begins */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/8 transition-opacity duration-300"
        style={{ opacity: detached ? 1 : 0 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left"
        style={{
          background: "var(--lime)",
          scaleX: scrollYProgress,
          opacity: detached ? 0.9 : 0,
          transition: "opacity 300ms ease",
        }}
      />
    </header>
  );
}
