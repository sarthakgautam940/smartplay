"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { HelpCircle, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";
import { useRef } from "react";

type Assurance = {
  icon: LucideIcon;
  title: string;
  text: string;
};

const assurances: Assurance[] = [
  {
    icon: ShieldCheck,
    title: "Live plans labeled as live.",
    text: "Only the athlete Player Membership runs through Stripe today. Coach and program tiers are explicitly pilot-only — there is no hidden self-serve path for teams yet.",
  },
  {
    icon: Sparkles,
    title: "AI bounded, never sold as certainty.",
    text: "Smartplay does not sell medical, therapy, scouting, or computer-vision certainty. Every AI surface labels its confidence, and every fallback announces itself.",
  },
  {
    icon: HelpCircle,
    title: "Conversations, not gates.",
    text: "Larger team and program decisions deserve a real conversation about roster size, support model, and launch readiness — not a pricing form that pretends to price an unknown.",
  },
];

/**
 * BuyerClaritySection — rebuilt as a vertical manifesto, not a card grid.
 *
 *  • Each statement is a horizontal row: large outline numeral on the left,
 *    title + body text on the right, a hairline rule between them.
 *  • On scroll, the section's progress drives a thin vertical rail on the
 *    right — the same language as the homepage week-loop rail.
 *  • Each row's outline number fills in (stroke → solid) as scroll reaches it,
 *    so the eye naturally moves beat-by-beat.
 */
export function BuyerClaritySection() {
  const ref = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 30%"],
  });

  const headY = useTransform(
    scrollYProgress,
    [0, 0.3],
    reduceMotion ? [0, 0] : [48, 0],
  );
  const headOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const railScale = useTransform(scrollYProgress, [0.12, 0.95], [0, 1]);

  return (
    <section
      ref={ref}
      data-surface="dark"
      className="surface-pitch-gradient relative overflow-hidden py-28 sm:py-36"
    >
      {/* Atmospheric wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 85% 18%, rgba(181,255,93,0.07) 0%, transparent 65%)",
        }}
      />

      <div className="section-shell relative">
        <motion.div
          style={{ y: headY, opacity: headOpacity }}
          className="max-w-3xl"
        >
          <div className="kicker kicker-lime">Buyer clarity</div>
          <h2 className="headline mt-5 text-[clamp(2.4rem,4.4vw,3.5rem)] text-white">
            Pricing should build trust before it asks for a card.
          </h2>
          <p className="mt-6 max-w-2xl text-[1rem] leading-7 text-white/60">
            Families read pricing pages to find out what a brand{" "}
            <em>isn&apos;t</em> going to pull. Three things Smartplay declines
            to do — on the record.
          </p>
        </motion.div>

        {/* Manifesto body */}
        <div className="relative mt-16 grid lg:grid-cols-[auto_1fr] lg:gap-12">
          {/* Vertical rail — mirrors the homepage week-loop rail */}
          <div className="relative hidden lg:block">
            <div className="absolute left-3 top-0 h-full w-px bg-white/10" />
            <motion.div
              aria-hidden="true"
              className="absolute left-3 top-0 h-full w-px origin-top bg-[var(--lime)]"
              style={{ scaleY: railScale }}
            />
          </div>

          <div className="flex flex-col">
            {assurances.map((a, i) => (
              <AssuranceRow
                key={a.title}
                assurance={a}
                index={i}
                total={assurances.length}
                scrollYProgress={scrollYProgress}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AssuranceRow({
  assurance,
  index,
  total,
  scrollYProgress,
  reduceMotion,
}: {
  assurance: Assurance;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  reduceMotion: boolean | null;
}) {
  const Icon = assurance.icon;
  const start = 0.15 + index * 0.22;
  const end = start + 0.22;

  const numberFill = useTransform(
    scrollYProgress,
    [start, end],
    reduceMotion ? [1, 1] : [0, 1],
  );
  const contentY = useTransform(
    scrollYProgress,
    [start - 0.05, end],
    reduceMotion ? [0, 0] : [24, 0],
  );
  const contentOpacity = useTransform(
    scrollYProgress,
    [start - 0.05, end - 0.05],
    [0.4, 1],
  );

  return (
    <div className={index === 0 ? "" : "border-t border-white/6"}>
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="grid gap-8 py-14 lg:grid-cols-[auto_1fr] lg:items-baseline lg:gap-16 lg:py-16"
      >
        {/* Outline numeral — large editorial number */}
        <div className="relative shrink-0">
          <div
            className="select-none leading-[0.85]"
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 500,
              fontSize: "clamp(4.5rem, 9vw, 8rem)",
              letterSpacing: "-0.05em",
              color: "transparent",
              WebkitTextStroke: "1px rgba(181, 255, 93, 0.45)",
            }}
          >
            0{index + 1}
          </div>
          {/* Filled overlay that reveals as scroll reaches the row */}
          <motion.div
            aria-hidden="true"
            className="absolute left-0 top-0 overflow-hidden"
            style={{
              width: "100%",
              height: useTransform(numberFill, (v) => `${v * 100}%`),
            }}
          >
            <div
              className="leading-[0.85]"
              style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontWeight: 500,
                fontSize: "clamp(4.5rem, 9vw, 8rem)",
                letterSpacing: "-0.05em",
                color: "var(--lime)",
              }}
            >
              0{index + 1}
            </div>
          </motion.div>
        </div>

        {/* Body */}
        <div className="max-w-2xl">
          <div className="flex items-baseline gap-3">
            <Icon className="size-5 shrink-0 text-[var(--lime)]" />
            <span className="mono-xs uppercase text-white/40">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
          <h3 className="headline mt-4 text-[clamp(1.6rem,2.6vw,2.1rem)] text-white">
            {assurance.title}
          </h3>
          <p className="mt-4 text-[1rem] leading-8 text-white/62">
            {assurance.text}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
