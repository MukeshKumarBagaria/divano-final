"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Faq } from "@/lib/catalog";

const EASE = [0.22, 1, 0.36, 1] as const;

/** One question open at a time. Pair it with faqJsonLd for rich results. */
export function FaqAccordion({
  faqs,
  tone = "dark",
  defaultOpen = 0,
}: {
  faqs: Faq[];
  tone?: "dark" | "light";
  defaultOpen?: number | null;
}) {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();
  const dark = tone === "dark";

  return (
    <ul className={cn("border-t", dark ? "border-stone" : "border-ivory/15")} data-reveal="stagger">
      {faqs.map((faq, index) => {
        const isOpen = open === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;
        return (
          <li key={faq.q} className={cn("border-b", dark ? "border-stone" : "border-ivory/15")}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className="group flex w-full items-start gap-5 py-6 text-left md:gap-8 md:py-7"
              >
                <span className="pt-2 font-sans text-[11.5px] font-semibold tabular-nums tracking-[0.1em] text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "flex-1 font-heading text-[19px] leading-snug transition-colors duration-300 md:text-[24px]",
                    dark ? "text-charcoal" : "text-ivory",
                  )}
                >
                  {faq.q}
                </span>
                <span
                  className={cn(
                    "mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-[background-color,border-color,color] duration-500",
                    dark
                      ? isOpen
                        ? "border-navy bg-navy text-ivory"
                        : "border-stone text-charcoal group-hover:border-navy"
                      : isOpen
                        ? "border-ivory bg-ivory text-navy"
                        : "border-ivory/25 text-ivory group-hover:border-ivory",
                  )}
                >
                  <Plus
                    className={cn("h-4 w-4 transition-transform duration-500 ease-out", isOpen && "rotate-45")}
                    strokeWidth={1.5}
                  />
                </span>
              </button>
            </h3>
            {/* Answers stay in the HTML when closed, so they are crawlable. */}
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.55, ease: EASE }}
              inert={!isOpen}
              className="overflow-hidden"
            >
              <p
                className={cn(
                  "max-w-[62ch] pb-7 pl-[calc(1.25rem+18px)] text-[15px] leading-relaxed md:pl-[calc(2rem+18px)] md:text-[16px]",
                  dark ? "text-slate" : "text-ivory/70",
                )}
              >
                {faq.a}
              </p>
            </motion.div>
          </li>
        );
      })}
    </ul>
  );
}
