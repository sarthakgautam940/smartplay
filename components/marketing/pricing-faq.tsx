"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

import { faqItems } from "@/lib/constants";

export function PricingFaq() {
  const reduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section data-surface="light" className="surface-chalk section-pad-sm">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="kicker kicker-pitch">Common questions</div>
            <h2 className="t-display-sm mt-5 max-w-[18ch] text-balance text-[var(--on-chalk-1)]">
              Quick answers, plain language.
            </h2>
            <p className="t-lede mt-6 max-w-md text-pretty text-[var(--on-chalk-3)]">
              If a question isn&apos;t here, just ask — short answers beat long
              fine print.
            </p>
          </div>

          <div className="space-y-2.5">
            {faqItems.map((item, i) => {
              const open = openIndex === i;
              return (
                <motion.div
                  key={item.question}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={
                    reduceMotion ? undefined : { opacity: 1, y: 0 }
                  }
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.42,
                    delay: reduceMotion ? 0 : i * 0.04,
                  }}
                  className="overflow-hidden rounded-2xl border border-[var(--on-chalk-1)]/10 bg-white/70 transition-colors duration-300 hover:bg-white"
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="flex w-full items-center justify-between gap-5 p-6 text-left focus-ring"
                  >
                    <span className="text-[1rem] font-bold text-[var(--on-chalk-1)]">
                      {item.question}
                    </span>
                    <span
                      className={`grid size-8 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
                        open
                          ? "bg-[var(--lime)] text-[var(--pitch)]"
                          : "bg-[var(--pitch)] text-[var(--lime)]"
                      }`}
                    >
                      {open ? (
                        <Minus className="size-3.5" strokeWidth={2.8} />
                      ) : (
                        <Plus className="size-3.5" strokeWidth={2.8} />
                      )}
                    </span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: open ? "auto" : 0,
                      opacity: open ? 1 : 0,
                    }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.32,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{ overflow: "hidden" }}
                  >
                    <p className="px-6 pb-6 text-[0.95rem] leading-7 text-[var(--on-chalk-3)]">
                      {item.answer}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
