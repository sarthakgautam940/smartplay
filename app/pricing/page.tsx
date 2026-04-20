import type { Metadata } from "next";

import { ArrowUpRight, CheckCircle2, Circle, Minus } from "lucide-react";

import { BuyerClaritySection } from "@/components/marketing/buyer-clarity-section";
import { PricingAnchor } from "@/components/marketing/pricing-anchor";
import { PricingFaq } from "@/components/marketing/pricing-faq";
import { Reveal } from "@/components/marketing/motion-primitives";
import { PublicShell } from "@/components/marketing/public-shell";
import { TransitionLink } from "@/components/marketing/transition-link";

export const metadata: Metadata = {
  title: "Pricing — Smartplay",
  description:
    "One live plan: $12/month Player Membership, 14-day free trial, no card upfront. Team Pilot and Community Program by conversation.",
};

const matrix = [
  ["Athlete dashboard + analytics", true, true, true],
  ["Session, wellness, nutrition, mindset logs", true, true, true],
  ["Video review (AI + coach comments)", true, true, true],
  ["Public recruiting profile", true, true, true],
  ["Coach command center + roster", false, true, true],
  ["Drill assignment + review queue", false, true, true],
  ["Parent visibility boundaries", "Personal", true, true],
  ["Admin adoption snapshots", false, false, true],
  ["Implementation + rollout support", false, "Lite", true],
] as const;

export default function PricingPage() {
  return (
    <PublicShell>
      <PricingAnchor />

      {/* Team + Community — editorial paragraphs, not plan cards */}
      <section data-surface="light" className="surface-chalk section-pad-sm">
        <div className="section-shell">
          <div className="grid gap-14 lg:grid-cols-2">
            <Reveal>
              <article className="group relative rounded-2xl border border-[var(--on-chalk-1)]/10 bg-white/70 p-8 transition-colors duration-300 hover:bg-white sm:p-10">
                <div className="flex items-center justify-between">
                  <div className="kicker kicker-pitch">When it&apos;s a team</div>
                  <span className="mono-xs uppercase text-[var(--on-chalk-4)]">02</span>
                </div>
                <h3 className="t-h2 mt-5 text-[var(--on-chalk-1)]">
                  Team Pilot.
                </h3>
                <p className="mt-4 text-[0.98rem] leading-8 text-[var(--on-chalk-2)]">
                  For coaches who need roster visibility, readiness alerts,
                  clip review, threaded comments, and development planning.
                  We shape pricing to the roster and the season — not a
                  per-seat table that pretends one club is another.
                </p>
                <p className="mt-4 text-[0.92rem] leading-7 text-[var(--on-chalk-3)]">
                  Pilot rollouts start with a single age group and expand when
                  the work earns it.
                </p>
                <TransitionLink
                  href="/contact"
                  className="mt-7 inline-flex items-center gap-2 text-[0.9rem] font-bold text-[var(--on-chalk-1)] transition-[gap] group-hover:gap-3"
                >
                  Discuss team fit
                  <ArrowUpRight className="size-4" strokeWidth={2.6} />
                </TransitionLink>
              </article>
            </Reveal>

            <Reveal delay={0.08}>
              <article className="group relative rounded-2xl border border-[var(--on-chalk-1)]/10 bg-white/70 p-8 transition-colors duration-300 hover:bg-white sm:p-10">
                <div className="flex items-center justify-between">
                  <div className="kicker kicker-pitch">When it&apos;s a program</div>
                  <span className="mono-xs uppercase text-[var(--on-chalk-4)]">03</span>
                </div>
                <h3 className="t-h2 mt-5 text-[var(--on-chalk-1)]">
                  Community Program.
                </h3>
                <p className="mt-4 text-[0.98rem] leading-8 text-[var(--on-chalk-2)]">
                  For schools, nonprofits, clubs, and access-focused programs
                  that need athlete support without premium-resource
                  assumptions. Boundaries for parents, adoption signal for
                  admins, access-aware training and nutrition guidance built in.
                </p>
                <p className="mt-4 text-[0.92rem] leading-7 text-[var(--on-chalk-3)]">
                  Access model is custom — built around your program&apos;s
                  funding, not ours.
                </p>
                <TransitionLink
                  href="/contact"
                  className="mt-7 inline-flex items-center gap-2 text-[0.9rem] font-bold text-[var(--on-chalk-1)] transition-[gap] group-hover:gap-3"
                >
                  Plan a pilot
                  <ArrowUpRight className="size-4" strokeWidth={2.6} />
                </TransitionLink>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Comparison matrix */}
      <section data-surface="light" className="surface-chalk section-pad-sm">
        <div className="section-shell">
          <div className="kicker kicker-pitch">What&apos;s included</div>
          <h2 className="t-display-sm mt-4 max-w-[22ch] text-balance text-[var(--on-chalk-1)]">
            Compare the surfaces by plan.
          </h2>

          <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--on-chalk-1)]/10 bg-white">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[var(--on-chalk-1)]/10 text-[0.78rem] uppercase tracking-[0.16em] text-[var(--on-chalk-3)]">
                  <th className="p-5 font-bold">Capability</th>
                  <th className="p-5 font-bold">Player · $12</th>
                  <th className="p-5 font-bold">Team Pilot</th>
                  <th className="p-5 font-bold">Community</th>
                </tr>
              </thead>
              <tbody>
                {matrix.map(([label, ...cells]) => (
                  <tr
                    key={label as string}
                    className="border-b border-[var(--on-chalk-1)]/6 transition last:border-0 hover:bg-[var(--chalk)]"
                  >
                    <td className="p-5 text-[0.92rem] font-semibold text-[var(--on-chalk-1)]">
                      {label}
                    </td>
                    {cells.map((cell, i) => (
                      <td key={i} className="p-5">
                        <MatrixCell value={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <BuyerClaritySection />

      <PricingFaq />
    </PublicShell>
  );
}

function MatrixCell({ value }: { value: boolean | string }) {
  if (value === true) {
    return <CheckCircle2 className="size-5 text-[var(--pitch)]" />;
  }
  if (value === false) {
    return <Minus className="size-5 text-[var(--on-chalk-4)]" />;
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-[0.82rem] font-semibold text-[var(--on-chalk-2)]">
      <Circle className="size-3 fill-[var(--lime)] stroke-none" />
      {value}
    </span>
  );
}
