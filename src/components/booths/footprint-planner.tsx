"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { boothSizes } from "@/lib/catalog";
import { enquiryHref } from "@/lib/format";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

// The plan is drawn in millimetres on a 3 × 2.1 m sheet, with the booth set
// left of centre so the depth label always fits on the right.
const SHEET = { w: 3000, h: 2100 };
const CUSTOM = { w: 2300, d: 1500 };
const mm = new Intl.NumberFormat("en-IN");

/** Where people sit inside each footprint, as fractions of its width and depth. */
const seats: Record<string, [number, number][]> = {
  solo: [[0.5, 0.45]],
  duo: [
    [0.3, 0.45],
    [0.7, 0.45],
  ],
  meeting: [
    [0.25, 0.28],
    [0.75, 0.28],
    [0.25, 0.72],
    [0.75, 0.72],
  ],
  custom: [],
};

/**
 * Booth sizes as tabs, each with its footprint drawn to scale. The tab
 * buttons carry the size ids, so /phone-booths#duo opens on Duo.
 */
export function FootprintPlanner() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const size = boothSizes[active];
  const plan = size.footprint ?? CUSTOM;
  const x = (SHEET.w - plan.w) / 2 - 150;
  const y = (SHEET.h - plan.d) / 2 + 40;
  const transition = { duration: reduceMotion ? 0 : 0.9, ease: EASE };

  useEffect(() => {
    const fromHash = () => {
      const index = boothSizes.findIndex((entry) => `#${entry.id}` === window.location.hash);
      if (index !== -1) setActive(index);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  return (
    <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-5">
        <p className="eyebrow" data-reveal="fade">
          Choose your footprint
        </p>
        <h2 id="sizes-heading" className="type-h2 mt-6 max-w-[10ch] text-charcoal" data-reveal="lines">
          Sized to your floor.
        </h2>
        <p className="type-lead mt-6 max-w-[40ch] text-slate" data-reveal="fade">
          Sized by how many people need to get in and how much floor you can give up. Each plan is
          drawn to scale.
        </p>

        <div role="tablist" aria-label="Booth sizes" className="mt-10 border-t border-stone" data-reveal="stagger">
          {boothSizes.map((entry, index) => {
            const selected = index === active;
            return (
              <button
                key={entry.id}
                id={entry.id}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls="booth-panel"
                onClick={() => {
                  setActive(index);
                  history.replaceState(null, "", `#${entry.id}`);
                }}
                className="group flex w-full scroll-mt-32 items-center gap-5 border-b border-stone py-5 text-left"
              >
                <span
                  aria-hidden
                  className={cn(
                    "h-px bg-gold transition-[width] duration-700 ease-out",
                    selected ? "w-8" : "w-0 group-hover:w-4",
                  )}
                />
                <span
                  className={cn(
                    "font-heading text-[28px] leading-none text-charcoal transition-opacity duration-500 md:text-[33px]",
                    !selected && "opacity-40 group-hover:opacity-70",
                  )}
                >
                  {entry.name}
                </span>
                <span className={cn("ml-auto text-[13px] text-slate transition-opacity", !selected && "opacity-60")}>
                  {entry.occupancy}
                </span>
              </button>
            );
          })}
        </div>

        <div id="booth-panel" role="tabpanel" aria-labelledby={size.id} className="mt-8 min-h-[220px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={size.id}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <p className="max-w-[42ch] text-[16px] leading-relaxed text-charcoal">{size.use}</p>
              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 text-[14px]">
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate">Footprint</dt>
                  <dd className="mt-1 tabular-nums text-charcoal">
                    {size.footprint ? `${mm.format(size.footprint.w)} × ${mm.format(size.footprint.d)} mm` : "To your drawing"}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate">Height</dt>
                  <dd className="mt-1 tabular-nums text-charcoal">{size.height}</dd>
                </div>
              </dl>
              <ul className="mt-6 flex flex-wrap gap-2">
                {size.features.map((feature) => (
                  <li key={feature} className="rounded-full border border-stone px-3 py-1 text-[12px] text-charcoal">
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={enquiryHref(`${size.name} phone booth`)}
                className="link-draw mt-8 text-[13px] font-semibold text-navy"
              >
                Enquire about a {size.name.toLowerCase()} booth
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="relative lg:sticky lg:top-28 lg:col-span-7 lg:self-start lg:pb-28">
        {/* Installed photograph */}
        <div
          className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-navy lg:ml-auto lg:w-[86%]"
          data-reveal="image"
          data-reveal-from="right"
        >
          <div data-reveal-inner className="absolute inset-0">
            {boothSizes.map((entry, index) => (
              <div
                key={entry.id}
                aria-hidden={index !== active}
                className={cn(
                  "absolute inset-0 transition-[opacity,scale] duration-[1000ms] ease-out",
                  index === active ? "scale-100 opacity-100" : "scale-[1.05] opacity-0",
                )}
              >
                <Image
                  src={entry.image.src}
                  alt={entry.image.alt}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Plan, drawn to scale */}
        <figure
          className="relative mt-5 rounded-2xl border border-hairline bg-white p-5 shadow-[0_30px_60px_-35px_rgba(12,29,45,0.45)] md:p-6 lg:absolute lg:bottom-0 lg:left-0 lg:mt-0 lg:w-[48%]"
          data-reveal="fade"
          data-reveal-delay="0.4"
        >
          <svg viewBox={`0 0 ${SHEET.w} ${SHEET.h}`} className="block h-auto w-full" role="img" aria-label={`Plan view of the ${size.name} booth`}>
            <defs>
              <pattern id="plan-grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#e7e0d4" strokeWidth="4" />
              </pattern>
              <pattern id="plan-grid-major" width="500" height="500" patternUnits="userSpaceOnUse">
                <rect width="500" height="500" fill="url(#plan-grid)" />
                <path d="M 500 0 L 0 0 0 500" fill="none" stroke="#d9d2c5" strokeWidth="6" />
              </pattern>
            </defs>
            <rect width={SHEET.w} height={SHEET.h} fill="url(#plan-grid-major)" />

            {/* Booth outline */}
            <motion.rect
              initial={false}
              animate={{ x, y, width: plan.w, height: plan.d }}
              transition={transition}
              rx="60"
              fill="rgba(16,38,61,0.06)"
              stroke="#10263d"
              strokeWidth="14"
              strokeDasharray={size.footprint ? undefined : "46 30"}
            />
            {/* Door along the front edge */}
            <motion.line
              initial={false}
              animate={{ x1: x + plan.w * 0.3, x2: x + plan.w * 0.7, y1: y + plan.d, y2: y + plan.d }}
              transition={transition}
              stroke="#c6a15b"
              strokeWidth="22"
              strokeLinecap="round"
            />

            {/* Occupants */}
            {[0, 1, 2, 3].map((i) => {
              const seat = seats[size.id][i];
              return (
                <motion.circle
                  key={i}
                  initial={false}
                  animate={{
                    cx: seat ? x + plan.w * seat[0] : SHEET.w / 2,
                    cy: seat ? y + plan.d * seat[1] : SHEET.h / 2,
                    opacity: seat ? 1 : 0,
                  }}
                  transition={transition}
                  r="120"
                  fill="#c6a15b"
                  fillOpacity="0.28"
                  stroke="#c6a15b"
                  strokeWidth="8"
                />
              );
            })}

            {/* Width dimension */}
            <g>
              <motion.line
                initial={false}
                animate={{ x1: x, x2: x + plan.w, y1: y - 130, y2: y - 130 }}
                transition={transition}
                stroke="#69717a"
                strokeWidth="6"
              />
              <motion.line initial={false} animate={{ x1: x, x2: x, y1: y - 175, y2: y - 85 }} transition={transition} stroke="#69717a" strokeWidth="6" />
              <motion.line initial={false} animate={{ x1: x + plan.w, x2: x + plan.w, y1: y - 175, y2: y - 85 }} transition={transition} stroke="#69717a" strokeWidth="6" />
              <motion.text
                initial={false}
                animate={{ x: x + plan.w / 2, y: y - 175 }}
                transition={transition}
                textAnchor="middle"
                fill="#18212b"
                fontSize="96"
                fontFamily="var(--font-manrope)"
                fontWeight="600"
              >
                {size.footprint ? `${mm.format(plan.w)} mm` : "Your width"}
              </motion.text>
            </g>

            {/* Depth dimension */}
            <motion.line
              initial={false}
              animate={{ x1: x + plan.w + 130, x2: x + plan.w + 130, y1: y, y2: y + plan.d }}
              transition={transition}
              stroke="#69717a"
              strokeWidth="6"
            />
            <motion.line initial={false} animate={{ x1: x + plan.w + 85, x2: x + plan.w + 175, y1: y, y2: y }} transition={transition} stroke="#69717a" strokeWidth="6" />
            <motion.line initial={false} animate={{ x1: x + plan.w + 85, x2: x + plan.w + 175, y1: y + plan.d, y2: y + plan.d }} transition={transition} stroke="#69717a" strokeWidth="6" />
            <motion.text
              initial={false}
              animate={{ x: x + plan.w + 210, y: y + plan.d / 2 + 26 }}
              transition={transition}
              fill="#18212b"
              fontSize="96"
              fontFamily="var(--font-manrope)"
              fontWeight="600"
            >
              {size.footprint ? mm.format(plan.d) : "Depth"}
            </motion.text>
          </svg>
          <figcaption className="mt-4 flex items-center justify-between gap-4 text-[11.5px] text-slate">
            <span className="flex items-center gap-2">
              <span aria-hidden className="h-2.5 w-2.5 rounded-full border border-gold bg-gold/30" />
              {size.footprint ? size.occupancy : "Seats to suit"}
              <span aria-hidden className="ml-3 h-1 w-4 rounded-full bg-gold" />
              Door
            </span>
            <span>Grid: 100 mm</span>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
