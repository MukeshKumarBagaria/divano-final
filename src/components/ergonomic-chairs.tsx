"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const chairTypes = [
  { name: "Low back", note: "For dynamic workspaces", image: "/images/chair-low.jpg", href: "/ergonomic-chairs/low-back-chairs" },
  { name: "Mid back", note: "Balanced everyday support", image: "/images/chair-mid.jpg", href: "/ergonomic-chairs/mid-back-chairs" },
  { name: "High back", note: "Executive comfort", image: "/images/chair-high.jpg", href: "/ergonomic-chairs/high-back-chairs" },
  { name: "Cafeteria", note: "Flexible social spaces", image: "/images/chair-cafe.jpg", href: "/ergonomic-chairs/cafeteria-chairs" },
  { name: "Visitor", note: "Welcoming every guest", image: "/images/chair-visitor.jpg", href: "/ergonomic-chairs/visitor-chairs" },
];

const DEFAULT = {
  image: "/images/ergo-main.jpg",
  caption: "Mesh task chair in a home study",
};

export function ErgonomicChairs() {
  const [active, setActive] = useState(-1);
  const current = chairTypes[active];

  return (
    <section className="bg-ivory pb-28 md:pb-40">
      <div className="page-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <figure className="lg:col-span-6">
          <div
            className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#ecebe8]"
            data-reveal="image"
          >
            <div data-reveal-inner className="absolute inset-0">
              {[DEFAULT.image, ...chairTypes.map((type) => type.image)].map((src, i) => {
                const visible = i === active + 1;
                return (
                  <div
                    key={src}
                    className={cn(
                      "absolute inset-0 transition-[opacity,scale] duration-[900ms] ease-out",
                      visible ? "scale-100 opacity-100" : "scale-[1.04] opacity-0",
                    )}
                  >
                    <Image
                      src={src}
                      alt={i === 0 ? "Mesh ergonomic chair at a walnut desk" : `${chairTypes[i - 1].name} chair`}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <figcaption className="mt-5 flex h-5 items-center gap-3 overflow-hidden text-[12px] text-slate">
            <span className="h-px w-6 bg-gold" aria-hidden />
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={active}
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {current ? `${current.name} chair, ${current.note.toLowerCase()}` : DEFAULT.caption}
              </motion.span>
            </AnimatePresence>
          </figcaption>
        </figure>

        <div className="flex flex-col justify-center lg:col-span-5 lg:col-start-8">
          <p className="eyebrow" data-reveal="fade">
            Ergonomic seating
          </p>
          <h2 className="type-h2 mt-6 max-w-[12ch] text-charcoal" data-reveal="lines">
            Comfort engineered for long days.
          </h2>

          <ul
            className="mt-12 border-t border-stone"
            onMouseLeave={() => setActive(-1)}
            data-reveal="stagger"
          >
            {chairTypes.map((type, index) => {
              const isActive = active === index;
              const dimmed = active !== -1 && !isActive;
              return (
                <li key={type.name} className="border-b border-stone">
                  <Link
                    href={type.href}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    onBlur={() => setActive(-1)}
                    className="group flex items-center gap-5 py-5 md:py-6"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "h-px bg-gold transition-[width] duration-700 ease-out",
                        isActive ? "w-8" : "w-0",
                      )}
                    />
                    <span
                      className={cn(
                        "font-heading text-[26px] leading-none tracking-[-0.01em] text-charcoal transition-opacity duration-500 md:text-[32px]",
                        dimmed && "opacity-35",
                      )}
                    >
                      {type.name}
                    </span>
                    <span
                      className={cn(
                        "ml-auto text-right text-[13px] text-slate transition-opacity duration-500",
                        dimmed && "opacity-40",
                      )}
                    >
                      {type.note}
                    </span>
                    <ArrowUpRight
                      className={cn(
                        "h-4 w-4 shrink-0 text-navy transition-[opacity,rotate] duration-500 ease-out",
                        isActive ? "rotate-45 opacity-100" : "opacity-0",
                      )}
                      strokeWidth={1.5}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/ergonomic-chairs"
            className="link-draw mt-12 self-start text-[13px] font-semibold text-navy"
            data-reveal="fade"
          >
            Explore ergonomic chairs
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
