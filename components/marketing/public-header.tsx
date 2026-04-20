"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, LogIn } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { BrandWordmark } from "@/components/marketing/brand-mark";
import { TransitionLink } from "@/components/marketing/transition-link";
import { siteNavigation } from "@/lib/constants";

/**
 * Glass banner — dark pitch translucency over whatever the page surface is.
 *
 *  Hidden state triggers on scroll-down past a threshold; returns on
 *  scroll-up or when the cursor approaches the top 80px of the viewport
 *  (desktop only). Reduced-motion users get an instant snap instead of a
 *  slide transition.
 */
export function PublicHeader() {
  const pathname = usePathname();
  const { scrollYProgress, scrollY } = useScroll();
  const [detached, setDetached] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastYRef = useRef(0);
  const cursorNearTopRef = useRef(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    const last = lastYRef.current;
    const delta = v - last;
    lastYRef.current = v;

    setDetached(v > 4);

    // Near the top — always visible
    if (v < 120) {
      setHidden(false);
      return;
    }
    // Cursor is near the top edge — keep visible
    if (cursorNearTopRef.current) {
      setHidden(false);
      return;
    }
    // Only reveal/hide on meaningful scroll deltas to avoid jitter
    if (delta > 6) setHidden(true);
    else if (delta < -6) setHidden(false);
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Touch devices don't get cursor-proximity reveal — scroll-up already
    // serves that purpose there.
    const fineHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fineHover.matches) return;

    function onMove(e: MouseEvent) {
      const nearTop = e.clientY <= 80;
      if (nearTop !== cursorNearTopRef.current) {
        cursorNearTopRef.current = nearTop;
        if (nearTop) setHidden(false);
      }
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <header
        data-hidden={hidden ? "true" : "false"}
        data-detached={detached ? "true" : "false"}
        className="glass-banner"
      >
        <div className="section-shell flex h-[68px] items-center justify-between gap-6 md:h-[72px]">
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
                  className="focus-ring group relative rounded-md px-3.5 py-2 text-[0.82rem] font-medium text-white/60 transition-colors duration-200 hover:text-white data-[active=true]:text-white"
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

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left"
          style={{
            background: "var(--lime)",
            scaleX: scrollYProgress,
            opacity: detached ? 0.85 : 0,
            transition: "opacity 300ms ease",
          }}
        />
      </header>
      <div aria-hidden="true" className="glass-banner-spacer" />
    </>
  );
}
