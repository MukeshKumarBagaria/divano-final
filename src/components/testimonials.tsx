"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useHydrated } from "@/lib/use-hydrated";

// PLACEHOLDER TESTIMONIALS — replace with real client quotes, used with the
// client's permission, before launch. Attributions are deliberately generic.
const quotes = [
  {
    quote:
      "The chairs completely transformed our workspace. The team noticed the difference within the first week.",
    name: "Head of Administration",
    company: "IT services company, Pune",
  },
  {
    quote:
      "They built our lounge sofas to the exact size of the room and matched the fabric to our interiors.",
    name: "Founder",
    company: "Boutique hotel, Jaipur",
  },
  {
    quote:
      "The phone booths solved the noise in our open-plan floor. Calls finally feel private again.",
    name: "Workplace Manager",
    company: "Co-working space, Bengaluru",
  },
];

const ROTATE_MS = 8000;
const EASE = [0.22, 1, 0.36, 1] as const;

export function Testimonials() {
  const reduceMotion = useReducedMotion();
  const hydrated = useHydrated();
  const reduce = hydrated && !!reduceMotion;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = quotes[index];

  const go = (next: number) => setIndex((next + quotes.length) % quotes.length);

  return (
    <section
      className="bg-ivory py-24 md:py-36"
      aria-roledescription="carousel"
      aria-label="What our clients say"
      onPointerEnter={(event) => event.pointerType === "mouse" && setPaused(true)}
      onPointerLeave={(event) => event.pointerType === "mouse" && setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="page-x flex flex-col items-center text-center">
        <p className="eyebrow eyebrow-center" data-reveal="fade">
          What our clients say
        </p>

        <span
          aria-hidden
          className="mt-10 font-heading text-[82px] leading-[0.5] text-gold md:text-[102px]"
          data-reveal="fade"
        >
          &ldquo;
        </span>

        <div className="mt-4 grid min-h-[260px] w-full place-items-center md:min-h-[300px]" data-reveal="fade">
          <AnimatePresence mode="wait" initial={false}>
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 18, filter: reduceMotion ? "none" : "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : -12, filter: reduceMotion ? "none" : "blur(4px)" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="col-start-1 row-start-1"
            >
              <blockquote className="mx-auto max-w-[24ch] font-heading text-[28px] leading-[1.15] tracking-[-0.01em] text-charcoal md:text-[44px]">
                {current.quote}
              </blockquote>
              <figcaption className="mt-10">
                <span className="block text-[14px] font-semibold text-charcoal">{current.name}</span>
                <span className="mt-1 block text-[13px] text-slate">{current.company}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {/* ● ─── ○ ─── ○  — the segment after the active dot doubles as its timer. */}
        <div className="mt-12 flex items-center gap-5" data-reveal="fade">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full text-charcoal transition-colors duration-300 hover:bg-ivory-deep"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          </button>

          {/* The rotation clock; the visible segments mirror it. */}
          {!reduce ? (
            <span
              key={index}
              aria-hidden
              className="pointer-events-none absolute h-px w-px opacity-0"
              style={{
                animation: `hero-progress ${ROTATE_MS}ms linear forwards`,
                animationPlayState: paused ? "paused" : "running",
              }}
              onAnimationEnd={() => go(index + 1)}
            />
          ) : null}

          <ol className="flex items-center">
            {quotes.map((entry, i) => (
              <li key={entry.company} className="flex items-center">
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                  className="flex h-8 w-8 items-center justify-center"
                >
                  <span
                    className={cn(
                      "h-2.5 w-2.5 rounded-full border transition-colors duration-500",
                      i === index ? "border-gold bg-gold" : "border-slate/50 bg-transparent",
                    )}
                  />
                </button>
                {i < quotes.length - 1 ? (
                  <span aria-hidden className="relative block h-px w-12 overflow-hidden bg-stone md:w-16">
                    {i === index && !reduce ? (
                      <span
                        key={index}
                        className="absolute inset-0 origin-left bg-gold"
                        style={{
                          animation: `hero-progress ${ROTATE_MS}ms linear forwards`,
                          animationPlayState: paused ? "paused" : "running",
                        }}
                      />
                    ) : null}
                  </span>
                ) : null}
              </li>
            ))}
          </ol>

          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full text-charcoal transition-colors duration-300 hover:bg-ivory-deep"
          >
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
