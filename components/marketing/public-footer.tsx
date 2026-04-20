import { ArrowUpRight } from "lucide-react";

import { BrandWordmark } from "@/components/marketing/brand-mark";
import { TransitionLink } from "@/components/marketing/transition-link";
import { siteNavigation } from "@/lib/constants";

/**
 * Footer — designed as the end of the story, not a default list.
 *
 * Structure:
 *  1. A final CTA line sits at the top of the footer, acting as a closing
 *     chapter rather than a standalone banner.
 *  2. Brand wordmark + short mission paragraph beneath.
 *  3. Compact column of nav links, with typography and spacing consistent
 *     with the rest of the site.
 *  4. A very quiet footer rule at the bottom — just © and year.
 */
export function PublicFooter() {
  return (
    <footer
      data-surface="dark"
      className="surface-pitch relative overflow-hidden"
    >
      {/* Soft atmospheric wash — doesn't feel decorative, just anchors the end */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 80% 0%, rgba(181,255,93,0.05) 0%, transparent 55%), radial-gradient(80% 60% at 0% 100%, rgba(207,230,242,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="section-shell relative">
        {/* Closing line */}
        <div className="grid gap-8 border-b border-white/8 py-14 lg:grid-cols-[1.2fr_auto] lg:items-end lg:gap-14">
          <div>
            <div className="kicker kicker-lime">End of chapter</div>
            <h2 className="headline mt-5 max-w-[18ch] text-[clamp(2rem,4vw,3.4rem)] text-white">
              Ready to play like you have a pro setup?
            </h2>
          </div>
          <div className="flex flex-col gap-2 lg:items-end">
            <TransitionLink
              href="/signup"
              className="focus-ring group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--lime)] px-6 text-[0.88rem] font-extrabold text-[var(--pitch)] transition hover:bg-[var(--lime-soft)]"
            >
              Start the 14-day trial
              <ArrowUpRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2.6}
              />
            </TransitionLink>
            <TransitionLink
              href="/contact"
              className="text-[0.84rem] text-white/58 transition hover:text-white"
            >
              Or open a pilot conversation →
            </TransitionLink>
          </div>
        </div>

        {/* Footer body */}
        <div className="grid gap-14 py-14 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
          <div>
            <BrandWordmark tone="dark" size="lg" />
            <p className="mt-6 max-w-sm text-[0.92rem] leading-7 text-white/55">
              Field intelligence for serious young soccer — training, recovery,
              nutrition, mindset, film, and one clear next action, every week.
            </p>
          </div>

          <FooterColumn
            label="Explore"
            links={siteNavigation.map((item) => ({
              label: item.label,
              href: item.href,
            }))}
          />

          <FooterColumn
            label="Access"
            links={[
              { label: "Start free trial", href: "/signup" },
              { label: "Log in", href: "/login" },
              { label: "Sample athlete profile", href: "/athlete/maya-johnson" },
            ]}
          />

          <div>
            <div className="mono-xs uppercase text-white/42">Say hi</div>
            <a
              href="mailto:contact.smartplay@gmail.com"
              className="mt-5 block text-[0.98rem] font-semibold text-white transition hover:text-[var(--lime)]"
            >
              contact.smartplay@gmail.com
            </a>
            <div className="mt-6 flex flex-col gap-3 text-[0.88rem] text-white/58">
              <TransitionLink
                href="/contact"
                className="inline-flex items-center gap-1.5 transition hover:gap-2.5 hover:text-[var(--lime)]"
              >
                Pilot intake
                <ArrowUpRight className="size-3.5" strokeWidth={2.4} />
              </TransitionLink>
            </div>
          </div>
        </div>

        {/* Bottom rule */}
        <div className="flex items-center justify-between border-t border-white/8 py-6 text-[0.76rem] text-white/36">
          <div>© Smartplay · {new Date().getFullYear()}</div>
          <div className="flex items-center gap-6">
            <TransitionLink href="/about" className="transition hover:text-white/72">
              About
            </TransitionLink>
            <TransitionLink href="/contact" className="transition hover:text-white/72">
              Contact
            </TransitionLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  label,
  links,
}: {
  label: string;
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <div>
      <div className="mono-xs uppercase text-white/42">{label}</div>
      <div className="mt-5 flex flex-col gap-3 text-[0.92rem] text-white/68">
        {links.map((link) => (
          <TransitionLink
            key={link.href}
            href={link.href}
            className="group inline-flex items-center gap-1.5 transition hover:text-white"
          >
            <span>{link.label}</span>
            <ArrowUpRight
              className="size-3 translate-x-0 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
              strokeWidth={2.4}
            />
          </TransitionLink>
        ))}
      </div>
    </div>
  );
}
