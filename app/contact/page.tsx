import {
  ArrowUpRight,
  Building2,
  HeartHandshake,
  Mail,
  School,
  Users,
} from "lucide-react";

import { ContactIntakeCard } from "@/components/marketing/contact-intake-card";
import { HeroBackdrop } from "@/components/marketing/hero-backdrop";
import { Reveal } from "@/components/marketing/motion-primitives";
import { PublicShell } from "@/components/marketing/public-shell";

const paths = [
  {
    icon: Users,
    title: "Coach or club",
    bullet: "Roster-first",
    text: "Readiness alerts, video review flow, drill assignments, and athlete development structure for a team of any size.",
  },
  {
    icon: School,
    title: "School program",
    bullet: "Student-athlete fit",
    text: "Schedule realities, parent trust, admin visibility, and support for athletes balancing school and training loads.",
  },
  {
    icon: HeartHandshake,
    title: "Nonprofit or community",
    bullet: "Access-aware",
    text: "Access-aware training, budget nutrition, home-session planning, and practical rollout for programs without premium budgets.",
  },
  {
    icon: Building2,
    title: "Partner conversation",
    bullet: "Aligned growth",
    text: "Product feedback, pilot structure, research, sponsorship, or aligned growth opportunities.",
  },
];

const emailSubject = encodeURIComponent("Smartplay pilot conversation");
const emailBody = encodeURIComponent(
  [
    "Hi Smartplay,",
    "",
    "I want to talk about a pilot or partnership.",
    "",
    "Who we support:",
    "Primary goal:",
    "Approximate athlete count:",
    "Timeline:",
    "",
    "Thanks,",
  ].join("\n"),
);

const mailto = `mailto:contact.smartplay@gmail.com?subject=${emailSubject}&body=${emailBody}`;

export default function ContactPage() {
  return (
    <PublicShell>
      {/* Hero */}
      <section
        data-surface="dark"
        className="surface-pitch-gradient relative overflow-hidden"
      >
        <HeroBackdrop tone="pitch" />
        <div className="section-shell relative z-10 grid gap-14 py-24 sm:py-32 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:py-36">
          <div className="max-w-3xl">
            <div className="kicker kicker-lime">Contact</div>
            <h1 className="headline-mega mt-6 text-[clamp(3rem,7vw,6rem)] text-white">
              Pilot Smartplay with the athletes who need it now.
            </h1>
            <p className="mt-8 max-w-xl text-[1.1rem] leading-8 text-white/64">
              For coaches, schools, clubs, nonprofits, and community programs
              exploring a practical youth soccer performance system — not a
              generic demo.
            </p>
            <a href={mailto} className="btn-primary focus-ring mt-10">
              Email Smartplay
              <Mail className="size-4" />
            </a>
          </div>

          {/* Pilot intake card — animated */}
          <ContactIntakeCard />
        </div>
      </section>

      {/* Paths */}
      <section data-surface="light" className="surface-chalk py-24 sm:py-28">
        <div className="section-shell">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-xl">
              <div className="kicker kicker-pitch">Pilot paths</div>
              <h2 className="headline mt-5 text-[clamp(2.2rem,4vw,3.5rem)] text-[var(--on-chalk-1)]">
                The conversation starts with who you support.
              </h2>
            </div>
            <p className="max-w-sm text-[1rem] leading-7 text-[var(--on-chalk-3)]">
              Smartplay is early enough to shape around real deployment needs.
              The goal isn&apos;t a generic demo. It&apos;s a useful first week.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {paths.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={(i % 2) * 0.05}>
                  <div className="card-chalk group h-full p-6 transition hover:-translate-y-1 hover:bg-white sm:p-7">
                    <div className="flex items-center justify-between">
                      <div className="grid size-10 place-items-center rounded-[10px] bg-[var(--pitch)] text-[var(--lime)]">
                        <Icon className="size-5" strokeWidth={2} />
                      </div>
                      <span className="mono-xs uppercase text-[var(--on-chalk-4)]">
                        {p.bullet}
                      </span>
                    </div>
                    <div className="headline mt-7 text-[1.55rem] text-[var(--on-chalk-1)]">
                      {p.title}
                    </div>
                    <p className="mt-3 text-[0.92rem] leading-7 text-[var(--on-chalk-3)]">
                      {p.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Real channel */}
      <section
        data-surface="dark"
        className="surface-pitch-gradient py-24 sm:py-28"
      >
        <div className="section-shell">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-12 lg:p-16">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <div className="kicker kicker-lime">Reliable channel</div>
                <h2 className="headline mt-5 max-w-[20ch] text-[clamp(2.2rem,4.4vw,3.5rem)] text-white">
                  Send a real note. Get a real pilot conversation.
                </h2>
                <p className="mt-6 max-w-xl text-[1rem] leading-7 text-white/62">
                  Email keeps the first conversation specific — who you
                  support, what&apos;s hard right now, and what a useful first
                  week should prove.
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--lime)]/22 bg-[var(--lime)]/6 p-6">
                <div className="mono-xs uppercase text-[var(--lime)]/80">
                  Write to
                </div>
                <div className="headline mt-2 text-[1.4rem] text-white">
                  contact.smartplay@gmail.com
                </div>
                <a href={mailto} className="btn-primary focus-ring mt-6 w-full">
                  Open email draft
                  <ArrowUpRight className="size-4" strokeWidth={2.6} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
