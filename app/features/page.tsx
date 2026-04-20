import type { Metadata } from "next";

import { ArrowUpRight } from "lucide-react";

import { FeaturesCapabilityMap } from "@/components/marketing/features-capability-map";
import { FeaturesHero } from "@/components/marketing/features-hero";
import { FeaturesRoleArchitecture } from "@/components/marketing/features-role-architecture";
import { PublicShell } from "@/components/marketing/public-shell";
import { TransitionLink } from "@/components/marketing/transition-link";

export const metadata: Metadata = {
  title: "Features — Smartplay",
  description:
    "Eight surfaces. One serious soccer week. Sessions, recovery, film, mindset, goals, nutrition, calendar, and analytics — tied to the week the athlete is actually living.",
};

export default function FeaturesPage() {
  return (
    <PublicShell>
      <FeaturesHero />
      <FeaturesCapabilityMap />
      <FeaturesRoleArchitecture />

      {/* CTA — chalk, restrained */}
      <section data-surface="light" className="surface-chalk section-pad-sm">
        <div className="section-shell">
          <div className="rounded-3xl border border-[var(--on-chalk-1)]/8 bg-white p-8 sm:p-12 lg:p-14">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <div className="kicker kicker-pitch">Try it on your week</div>
                <h2 className="t-display-sm mt-5 max-w-[20ch] text-balance text-[var(--on-chalk-1)]">
                  Spend a week inside the system.
                </h2>
              </div>
              <div className="flex flex-col gap-3 lg:items-end">
                <TransitionLink href="/signup" className="btn-primary focus-ring">
                  Start the trial
                  <ArrowUpRight className="size-4" strokeWidth={2.6} />
                </TransitionLink>
                <TransitionLink href="/pricing" className="btn-ghost-light focus-ring">
                  See pricing
                </TransitionLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
