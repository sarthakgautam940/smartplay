import {
  ArrowUpRight,
  CheckCircle2,
  Circle,
  Minus,
  ShieldCheck,
} from "lucide-react";

import { BuyerClaritySection } from "@/components/marketing/buyer-clarity-section";
import { HeroBackdrop, ScrollRise } from "@/components/marketing/hero-backdrop";
import { Reveal } from "@/components/marketing/motion-primitives";
import { PublicShell } from "@/components/marketing/public-shell";
import { TransitionLink } from "@/components/marketing/transition-link";
import { faqItems } from "@/lib/constants";

const plans = [
  {
    id: "athlete",
    name: "Player Membership",
    price: "$12",
    cadence: "/ month",
    label: "Live",
    badge: "primary",
    description:
      "For the individual athlete who wants one connected place for training, recovery, nutrition, mindset, film, goals, calendar, and recruiting profile.",
    href: "/billing/start",
    cta: "Start the 14-day trial",
    sub: "No card upfront",
    bullets: [
      "14-day free trial",
      "Athlete dashboard + analytics",
      "Session, nutrition, wellness, mindset logs",
      "Video review with honest AI fallback",
      "Public recruiting profile (athlete controls)",
    ],
  },
  {
    id: "team",
    name: "Team Pilot",
    price: "Pilot",
    cadence: "by conversation",
    label: "Coach fit",
    badge: "ghost",
    description:
      "For coaches who need roster visibility, readiness alerts, clip review, threaded comments, and development planning.",
    href: "/contact",
    cta: "Discuss team fit",
    sub: "Pricing shaped to roster",
    bullets: [
      "Coach command center",
      "Roster readiness + review queue",
      "Drill assignment structure",
      "Team analytics direction",
      "Pilot rollout planning",
    ],
  },
  {
    id: "community",
    name: "Community Program",
    price: "Custom",
    cadence: "access model",
    label: "Program fit",
    badge: "ghost",
    description:
      "For schools, nonprofits, clubs, and access-focused programs that need athlete support without premium-resource assumptions.",
    href: "/contact",
    cta: "Plan a pilot",
    sub: "Built for access-first",
    bullets: [
      "Parent visibility boundaries",
      "Admin adoption snapshots",
      "Access-aware training + nutrition",
      "Program health signals",
      "Implementation support",
    ],
  },
];

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
      {/* Hero */}
      <section
        data-surface="light"
        className="surface-chalk-2 relative overflow-hidden"
      >
        <HeroBackdrop tone="chalk-2" />
        <div className="section-shell relative z-10 grid gap-14 py-24 sm:py-32 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="max-w-3xl">
            <div className="kicker kicker-pitch">Pricing</div>
            <h1 className="headline-mega mt-6 text-[clamp(3rem,7vw,6rem)] text-[var(--on-chalk-1)]">
              Honest pricing.
              <br />
              <span className="text-[var(--pitch)]/55">
                One live plan.
              </span>{" "}
              <span>Two real conversations.</span>
            </h1>
            <p className="mt-8 max-w-xl text-[1.1rem] leading-8 text-[var(--on-chalk-3)]">
              Start the athlete trial with a click. Bring a team or a program?
              Email us — Smartplay scales when it earns the right to.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <TransitionLink href="/signup" className="btn-primary focus-ring">
                Start free trial
                <ArrowUpRight className="size-4" strokeWidth={2.6} />
              </TransitionLink>
              <TransitionLink href="/contact" className="btn-ghost-light focus-ring">
                Talk pilot fit
              </TransitionLink>
            </div>
          </div>

          {/* Anchor card — single live plan summary */}
          <ScrollRise>
            <div className="card-chalk relative overflow-hidden p-7">
              <div className="flex items-center justify-between">
                <div className="kicker kicker-pitch">Live checkout</div>
                <span className="signal-dot" />
              </div>
              <div className="mt-6 flex items-baseline gap-2">
                <div className="headline-mega text-[4.4rem] leading-none text-[var(--on-chalk-1)]">
                  $12
                </div>
                <div className="pb-2 text-[var(--on-chalk-3)]">/ month</div>
              </div>
              <div className="mt-2 text-[0.92rem] text-[var(--on-chalk-3)]">
                Player Membership · 14-day free trial
              </div>
              <div className="hair-divider-light mt-6" />
              <div className="mt-5 grid gap-3">
                {[
                  "No card upfront for the trial",
                  "Cancel any time in the Stripe portal",
                  "Family-friendly to explain",
                ].map((row) => (
                  <div
                    key={row}
                    className="flex items-center gap-3 text-[0.88rem] text-[var(--on-chalk-2)]"
                  >
                    <CheckCircle2 className="size-4 text-[var(--pitch)]" />
                    {row}
                  </div>
                ))}
              </div>
            </div>
          </ScrollRise>
        </div>
      </section>

      {/* Plans */}
      <section data-surface="light" className="surface-chalk py-24 sm:py-28">
        <div className="section-shell">
          <div className="grid gap-4 lg:grid-cols-3">
            {plans.map((plan, i) => (
              <Reveal key={plan.id} delay={i * 0.05}>
                <PlanCard plan={plan} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison matrix */}
      <section data-surface="light" className="surface-chalk pb-24 sm:pb-28">
        <div className="section-shell">
          <div className="kicker kicker-pitch">What&apos;s included</div>
          <h2 className="headline mt-4 max-w-[20ch] text-[clamp(2rem,3.6vw,3rem)] text-[var(--on-chalk-1)]">
            Compare the surfaces by plan.
          </h2>

          <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--on-chalk-1)]/10 bg-white">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[var(--on-chalk-1)]/10 text-[0.78rem] uppercase tracking-[0.16em] text-[var(--on-chalk-3)]">
                  <th className="p-5 font-bold">Capability</th>
                  <th className="p-5 font-bold">Player</th>
                  <th className="p-5 font-bold">Team Pilot</th>
                  <th className="p-5 font-bold">Community</th>
                </tr>
              </thead>
              <tbody>
                {matrix.map(([label, ...cells]) => (
                  <tr
                    key={label as string}
                    className="border-b border-[var(--on-chalk-1)]/6 last:border-0 transition hover:bg-[var(--chalk)]"
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

      {/* Trust assurances */}
      <BuyerClaritySection />

      {/* FAQ */}
      <section data-surface="light" className="surface-chalk py-24 sm:py-28">
        <div className="section-shell">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal>
              <div>
                <div className="kicker kicker-pitch">Common questions</div>
                <h2 className="headline mt-5 max-w-[18ch] text-[clamp(2rem,3.6vw,3rem)] text-[var(--on-chalk-1)]">
                  Quick answers, plain language.
                </h2>
              </div>
            </Reveal>
            <div className="space-y-3">
              {faqItems.map((item, i) => (
                <Reveal key={item.question} delay={i * 0.04}>
                  <details
                    className="group card-chalk-soft p-6 transition hover:bg-white"
                    {...(i === 0 ? { open: true } : {})}
                  >
                    <summary className="flex cursor-pointer items-center justify-between gap-4 text-[1rem] font-bold text-[var(--on-chalk-1)] [&::-webkit-details-marker]:hidden">
                      {item.question}
                      <span className="grid size-7 place-items-center rounded-full bg-[var(--pitch)] text-[var(--lime)] transition group-open:rotate-45">
                        <ArrowUpRight className="size-3.5" strokeWidth={2.6} />
                      </span>
                    </summary>
                    <p className="mt-4 text-[0.95rem] leading-7 text-[var(--on-chalk-3)]">
                      {item.answer}
                    </p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}

function PlanCard({ plan }: { plan: (typeof plans)[number] }) {
  const featured = plan.badge === "primary";
  return (
    <div
      data-surface={featured ? "dark" : "light"}
      className={
        featured
          ? "relative flex h-full flex-col overflow-hidden rounded-2xl bg-[var(--pitch)] p-8 text-white shadow-[0_30px_80px_-30px_rgba(6,16,11,0.4)]"
          : "card-chalk relative flex h-full flex-col p-8"
      }
      style={
        featured
          ? {
              boxShadow:
                "0 30px 80px -30px rgba(6,16,11,0.4), inset 0 0 0 1px rgba(255,255,255,0.08)",
            }
          : undefined
      }
    >
      {featured && (
        <div
          aria-hidden="true"
          className="grid-pitch absolute inset-0 opacity-40"
          style={{
            maskImage: "radial-gradient(60% 50% at 90% 10%, black, transparent)",
          }}
        />
      )}
      <div className="relative flex flex-1 flex-col">
        <div className="flex items-center justify-between">
          <span
            className={
              featured
                ? "kicker kicker-lime"
                : "kicker kicker-pitch"
            }
          >
            {plan.label}
          </span>
          <ShieldCheck
            className={
              featured ? "size-4 text-[var(--lime)]" : "size-4 text-[var(--pitch)]"
            }
          />
        </div>
        <div
          className={
            featured
              ? "headline mt-7 text-[2.1rem] text-white"
              : "headline mt-7 text-[2.1rem] text-[var(--on-chalk-1)]"
          }
        >
          {plan.name}
        </div>
        <div className="mt-5 flex items-baseline gap-2">
          <div
            className={
              featured
                ? "headline-mega text-[3.6rem] leading-none text-white"
                : "headline-mega text-[3.6rem] leading-none text-[var(--on-chalk-1)]"
            }
          >
            {plan.price}
          </div>
          <div
            className={
              featured ? "pb-2 text-white/52" : "pb-2 text-[var(--on-chalk-3)]"
            }
          >
            {plan.cadence}
          </div>
        </div>
        <p
          className={
            featured
              ? "mt-5 text-[0.92rem] leading-7 text-white/64"
              : "mt-5 text-[0.92rem] leading-7 text-[var(--on-chalk-3)]"
          }
        >
          {plan.description}
        </p>

        <TransitionLink
          href={plan.href}
          className={
            featured
              ? "btn-primary focus-ring mt-7 w-full"
              : "btn-ghost-light focus-ring mt-7 w-full"
          }
        >
          {plan.cta}
          <ArrowUpRight className="size-4" strokeWidth={2.6} />
        </TransitionLink>
        <div
          className={
            featured
              ? "mt-2 text-[0.78rem] text-white/45"
              : "mt-2 text-[0.78rem] text-[var(--on-chalk-4)]"
          }
        >
          {plan.sub}
        </div>

        <div
          className={
            featured ? "hair-divider mt-7" : "hair-divider-light mt-7"
          }
        />
        <div className="mt-6 space-y-3">
          {plan.bullets.map((b) => (
            <div key={b} className="flex gap-3 text-[0.88rem] leading-6">
              <CheckCircle2
                className={
                  featured
                    ? "mt-0.5 size-4 shrink-0 text-[var(--lime)]"
                    : "mt-0.5 size-4 shrink-0 text-[var(--pitch)]"
                }
              />
              <span
                className={featured ? "text-white/72" : "text-[var(--on-chalk-2)]"}
              >
                {b}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
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
