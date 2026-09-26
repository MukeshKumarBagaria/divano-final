"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { useHydrated } from "@/lib/use-hydrated";

export type AnatomyPoint = {
  id: string;
  label: string;
  body: string;
  /** Position as a percentage of the image's width and height. */
  x: number;
  y: number;
};

const STEP_MS = 3600;
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * A photograph with numbered hotspots, paired with a list of the same points.
 * It walks through the points on its own until the visitor takes over.
 */
export function AnatomyExplorer({
  image,
  points,
  tone = "dark",
  heading,
  glow = false,
}: {
  image: { src: string; alt: string; w: number; h: number };
  points: AnatomyPoint[];
  tone?: "dark" | "light";
  heading: React.ReactNode;
  /** Warm light behind a cut-out image that flickers on in view, for the dark booth section. */
  glow?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const hydrated = useHydrated();
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const [inView, setInView] = useState(false);
  // Once lit, the booth stays lit.
  const [lit, setLit] = useState(false);
  if (inView && !lit) setLit(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const dark = tone === "dark";
  const autoplay = hydrated && !reduceMotion && !touched;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const choose = (index: number) => {
    setTouched(true);
    setActive(index);
  };

  return (
    <div ref={rootRef} className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
      <div className="relative lg:col-span-7">
        {glow ? (
          <div
            aria-hidden
            className={cn(
              "absolute left-1/2 top-[45%] aspect-square w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(240,180,106,0.38)_0%,rgba(240,180,106,0.1)_40%,rgba(240,180,106,0)_68%)] blur-2xl",
              lit ? "glow-on" : "glow-off",
            )}
          />
        ) : null}
        <div
          className={cn("relative mx-auto w-full overflow-hidden rounded-2xl", !glow && "bg-[#ecebe8]")}
          style={{ aspectRatio: `${image.w} / ${image.h}`, maxWidth: glow ? 680 : undefined }}
          data-reveal="image"
        >
          <div data-reveal-inner className="absolute inset-0">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className={cn(
                glow ? "object-contain" : "object-cover",
                glow && (lit ? "lights-on" : "lights-off"),
              )}
            />
          </div>

          <ul className="absolute inset-0" data-reveal="fade" data-reveal-delay="1">
            {points.map((point, index) => {
              const isActive = index === active;
              const flip = point.x > 58;
              return (
                <li
                  key={point.id}
                  className="absolute"
                  style={{ left: `${point.x}%`, top: `${point.y}%`, zIndex: isActive ? 2 : 1 }}
                >
                  <button
                    type="button"
                    onClick={() => choose(index)}
                    onMouseEnter={() => choose(index)}
                    aria-label={point.label}
                    aria-pressed={isActive}
                    className="relative flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                  >
                    {isActive ? (
                      <span
                        aria-hidden
                        className="hotspot-ring absolute inset-0 rounded-full border border-gold"
                      />
                    ) : null}
                    <span
                      className={cn(
                        "relative flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold tabular-nums shadow-[0_6px_20px_rgba(12,29,45,0.3)] backdrop-blur transition-[background-color,color,scale] duration-500 ease-out md:h-9 md:w-9",
                        isActive ? "scale-110 bg-navy text-ivory" : "bg-ivory/95 text-navy hover:scale-110",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isActive ? (
                      <motion.span
                        aria-hidden
                        initial={{ opacity: 0, x: reduceMotion ? 0 : flip ? 8 : -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className={cn(
                          "pointer-events-none absolute top-0 hidden -translate-y-1/2 whitespace-nowrap rounded-full bg-ivory px-3.5 py-1.5 text-[12px] font-semibold text-navy shadow-[0_10px_30px_-10px_rgba(12,29,45,0.45)] md:block",
                          flip ? "right-7" : "left-7",
                        )}
                      >
                        {point.label}
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="lg:col-span-5">
        {heading}
        <ol className={cn("mt-10 border-t", dark ? "border-stone" : "border-ivory/15")}>
          {points.map((point, index) => {
            const isActive = index === active;
            return (
              <li key={point.id} className={cn("relative border-b", dark ? "border-stone" : "border-ivory/15")}>
                <button
                  type="button"
                  onClick={() => choose(index)}
                  onMouseEnter={() => choose(index)}
                  onFocus={() => choose(index)}
                  aria-expanded={isActive}
                  className="flex w-full items-baseline gap-5 py-5 text-left"
                >
                  <span className="text-[11.5px] font-semibold tabular-nums tracking-[0.1em] text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span
                      className={cn(
                        "block font-heading text-[21px] leading-tight transition-opacity duration-500 md:text-[25px]",
                        dark ? "text-charcoal" : "text-ivory",
                        !isActive && "opacity-45",
                      )}
                    >
                      {point.label}
                    </span>
                    <span
                      className={cn(
                        "grid transition-[grid-template-rows] duration-700 ease-out",
                        isActive ? "[grid-template-rows:1fr]" : "[grid-template-rows:0fr]",
                      )}
                    >
                      <span className="overflow-hidden">
                        <span
                          className={cn(
                            "block max-w-[42ch] pt-2 text-[14.5px] leading-relaxed",
                            dark ? "text-slate" : "text-ivory/65",
                          )}
                        >
                          {point.body}
                        </span>
                      </span>
                    </span>
                  </span>
                </button>
                {/* The active row's hairline doubles as the autoplay timer. */}
                {isActive && autoplay ? (
                  <span
                    key={active}
                    aria-hidden
                    className="absolute -bottom-px left-0 h-px w-full origin-left bg-gold"
                    style={{
                      animation: `hero-progress ${STEP_MS}ms linear forwards`,
                      animationPlayState: inView ? "running" : "paused",
                    }}
                    onAnimationEnd={() => setActive((current) => (current + 1) % points.length)}
                  />
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
