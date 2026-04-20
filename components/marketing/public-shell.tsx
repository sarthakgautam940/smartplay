"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { FluidCursor } from "@/components/marketing/fluid-cursor";
import { PublicFooter } from "@/components/marketing/public-footer";
import { PublicHeader } from "@/components/marketing/public-header";

/**
 * Public-page shell.
 *
 *  • Mounts the tactical cursor (no-op on touch / reduced-motion)
 *  • Renders header + footer
 *  • Route-change transition is opacity only — no y translation.
 *    Y translation on mount caused first-scroll jank because the page
 *    was still settling into its final position when the user began
 *    scrolling, which made scroll-linked motion snap on the first frame.
 */
export function PublicShell({
  children,
  hideFooter = false,
}: {
  children: ReactNode;
  hideFooter?: boolean;
}) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <div className="public-site">
      <FluidCursor />
      <PublicHeader />
      <motion.main
        key={pathname}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={reduceMotion ? undefined : { opacity: 1 }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.main>
      {!hideFooter && <PublicFooter />}
    </div>
  );
}
