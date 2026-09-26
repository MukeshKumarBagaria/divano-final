"use client";

import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { chairHref } from "@/lib/catalog";

type Need = "long-hours" | "executive" | "meeting" | "visitor" | "cafeteria";

const needs: { id: Need; label: string }[] = [
  { id: "long-hours", label: "Long work hours" },
  { id: "executive", label: "Executive workspace" },
  { id: "meeting", label: "Meeting room" },
  { id: "visitor", label: "Visitor seating" },
  { id: "cafeteria", label: "Cafeteria" },
];

// Descriptions and features mirror the range on /ergonomic-chairs.
const picks: Record<Need, { name: string; why: string; features: string[]; image: string; href: string }> = {
  "long-hours": {
    href: chairHref("mid-back-chairs"),
    name: "Mid back chair",
    why: "Breathable mesh and lumbar support, built to stay comfortable through full working days.",
    features: ["Mesh back", "Lumbar support", "Tilt lock"],
    image: "/images/chair-mid.jpg",
  },
  executive: {
    href: chairHref("high-back-chairs"),
    name: "High back chair",
    why: "A full-height back and headrest, upholstered in leather or fabric for cabins and boardrooms.",
    features: ["Headrest", "Synchro recline", "Aluminium base"],
    image: "/images/chair-high.jpg",
  },
  meeting: {
    href: chairHref("low-back-chairs"),
    name: "Low back chair",
    why: "A compact back that tucks neatly under the table between meetings.",
    features: ["Height adjust", "Compact footprint", "Fixed arms"],
    image: "/images/chair-low.jpg",
  },
  visitor: {
    href: chairHref("visitor-chairs"),
    name: "Visitor chair",
    why: "A cantilever frame with no moving parts, for reception areas and guest seating.",
    features: ["Cantilever frame", "Upholstered arms", "No mechanism"],
    image: "/images/chair-visitor.jpg",
  },
  cafeteria: {
    href: chairHref("cafeteria-chairs"),
    name: "Cafeteria chair",
    why: "Shell chairs that stack, wipe clean and store flat between shifts.",
    features: ["Stackable", "Steel frame", "Wipe-clean shell"],
    image: "/images/chair-cafe.jpg",
  },
};

const EASE = [0.22, 1, 0.36, 1] as const;

export function ChairFinder() {
  const reduceMotion = useReducedMotion();
  const [choice, setChoice] = useState<Need | null>(null);
  const [result, setResult] = useState<Need | null>(null);
  const legendId = useId();
  const pick = result ? picks[result] : null;

  return (
    <section id="chair-finder" className="scroll-mt-24 bg-ivory py-24 md:py-36">
      <div className="page-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <h2 className="type-h2 max-w-[11ch] text-charcoal" data-reveal="lines">
            Find your perfect chair
          </h2>
          <p className="type-lead mt-6 max-w-[40ch] text-slate" data-reveal="fade">
            Tell us where the chair will live and we&apos;ll point you to the right part of the
            range.
          </p>

          <form
            className="mt-10"
            onSubmit={(event) => {
              event.preventDefault();
              if (choice) setResult(choice);
            }}
          >
            <fieldset aria-labelledby={legendId}>
              <p id={legendId} className="text-[13px] font-semibold text-charcoal">
                What are you looking for?
              </p>
              <div className="mt-4 border-t border-stone" data-reveal="stagger">
                {needs.map((need) => {
                  const checked = choice === need.id;
                  return (
                    <label
                      key={need.id}
                      className="group flex cursor-pointer items-center gap-4 border-b border-stone py-4"
                    >
                      <input
                        type="radio"
                        name="need"
                        value={need.id}
                        checked={checked}
                        onChange={() => setChoice(need.id)}
                        className="peer sr-only"
                      />
                      <span
                        aria-hidden
                        className="relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate/60 transition-colors duration-300 group-hover:border-navy peer-checked:border-navy peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold"
                      >
                        <span
                          className={cn(
                            "h-2.5 w-2.5 rounded-full bg-navy transition-transform duration-300 ease-out",
                            checked ? "scale-100" : "scale-0",
                          )}
                        />
                      </span>
                      <span
                        className={cn(
                          "text-[16px] transition-[color,translate] duration-500 ease-out",
                          checked ? "translate-x-1 text-charcoal" : "text-charcoal/75",
                        )}
                      >
                        {need.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <button
              type="submit"
              disabled={!choice}
              className="group mt-9 inline-flex h-[52px] items-center gap-3 rounded-full bg-navy pl-7 pr-2 text-[13.5px] font-semibold text-ivory transition-[opacity,background-color] duration-300 hover:bg-navy-deep disabled:cursor-not-allowed disabled:opacity-40"
            >
              Find my chair
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ivory text-navy transition-transform duration-500 ease-out group-enabled:group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </span>
            </button>
          </form>
        </div>

        <div className="lg:col-span-6 lg:col-start-7" aria-live="polite" data-reveal="fade">
          <AnimatePresence mode="wait" initial={false}>
            {pick ? (
              <motion.article
                key={result}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
                className="grid h-full gap-8 rounded-3xl bg-white p-6 sm:grid-cols-2 md:p-8"
              >
                <motion.div
                  initial={{ clipPath: reduceMotion ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  transition={{ duration: 1, ease: EASE }}
                  className="relative aspect-square overflow-hidden rounded-2xl bg-[#ecebe8] sm:aspect-auto sm:min-h-[340px]"
                >
                  <motion.div
                    initial={{ scale: reduceMotion ? 1 : 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.4, ease: EASE }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={pick.image}
                      alt={pick.name}
                      fill
                      sizes="(min-width: 1024px) 24vw, 90vw"
                      className="object-cover"
                    />
                  </motion.div>
                </motion.div>

                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
                  className="flex flex-col py-2"
                >
                  {[
                    <p key="eyebrow" className="eyebrow">
                      We recommend
                    </p>,
                    <h3 key="name" className="mt-5 font-heading text-[35px] leading-none text-charcoal">
                      {pick.name}
                    </h3>,
                    <p key="why" className="mt-4 text-[15px] leading-relaxed text-slate">
                      {pick.why}
                    </p>,
                    <ul key="features" className="mt-6 flex flex-wrap gap-2">
                      {pick.features.map((feature) => (
                        <li
                          key={feature}
                          className="rounded-full border border-stone px-3 py-1 text-[12px] text-charcoal"
                        >
                          {feature}
                        </li>
                      ))}
                    </ul>,
                    <div key="actions" className="mt-auto flex flex-wrap items-center gap-5 pt-8">
                      <Link
                        href={pick.href}
                        className="link-draw text-[13px] font-semibold text-navy"
                      >
                        Explore {pick.name.toLowerCase()}s
                        <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setResult(null);
                          setChoice(null);
                        }}
                        className="inline-flex items-center gap-1.5 text-[12.5px] text-slate transition-colors hover:text-charcoal"
                      >
                        <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
                        Start again
                      </button>
                    </div>,
                  ].map((child) => (
                    <motion.div
                      key={child.key}
                      variants={{
                        hidden: { opacity: 0, y: reduceMotion ? 0 : 14 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
                      }}
                      className={child.key === "actions" ? "mt-auto" : undefined}
                    >
                      {child}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.article>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
                className="flex h-full min-h-[420px] flex-col justify-center rounded-3xl border border-dashed border-stone p-8 md:p-10"
              >
                <div aria-hidden className="grid grid-cols-5 gap-2.5 md:gap-3">
                  {Object.values(picks).map((entry) => (
                    <div
                      key={entry.name}
                      className="relative aspect-[3/5] overflow-hidden rounded-xl bg-[#ecebe8] opacity-70 grayscale"
                    >
                      <Image src={entry.image} alt="" fill sizes="10vw" className="object-cover" />
                    </div>
                  ))}
                </div>
                <p className="mt-10 font-heading text-[26px] leading-tight text-charcoal">
                  Five chairs, one right answer.
                </p>
                <p className="mt-2 max-w-[36ch] text-[14px] text-slate">
                  Choose how the chair will be used and your recommendation appears here.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
