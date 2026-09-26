"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

// Hotspot coordinates are percentages of /contact-section-bg.png.
const worlds = [
  {
    id: "seating",
    name: "Ergonomic seating",
    line: "Mesh task chairs at every desk, set up for long days.",
    href: "/ergonomic-chairs",
    x: 9.5,
    y: 60,
    align: "left" as const,
  },
  {
    id: "sofas",
    name: "Sofas",
    line: "A deep modular lounge for breaks, guests and informal meetings.",
    href: "/sofas",
    x: 52,
    y: 63,
    align: "center" as const,
  },
  {
    id: "booths",
    name: "Acoustic workspaces",
    line: "A walnut-lined booth for calls that need a closed door.",
    href: "/phone-booths",
    x: 87.5,
    y: 45,
    align: "right" as const,
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function MadeForModernSpaces() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState<string | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!frameRef.current?.contains(event.target as Node)) setOpen(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const hover = (id: string | null) => {
    window.clearTimeout(closeTimer.current);
    if (id) setOpen(id);
    else closeTimer.current = window.setTimeout(() => setOpen(null), 180);
  };

  return (
    <section className="bg-ivory py-24 md:py-36" aria-labelledby="modern-spaces-heading">
      <div className="page-x text-center">
        <p className="eyebrow eyebrow-center" data-reveal="fade">
          Made for modern spaces
        </p>
        <h2
          id="modern-spaces-heading"
          className="type-h2 mx-auto mt-6 text-charcoal"
          data-reveal="lines"
        >
          One brand.
          <br />
          Three worlds of comfort.
        </h2>
      </div>

      <div className="page-x mt-14 md:mt-20">
        <div ref={frameRef} className="relative">
          <div
            className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ivory-deep md:aspect-[1983/793]"
            data-reveal="image"
          >
            <div data-reveal-inner className="absolute inset-0">
              <Image
                src="/contact-section-bg.png"
                alt="An office lounge with mesh task chairs at the desks, a cream modular sofa and an acoustic booth"
                fill
                sizes="(min-width: 1440px) 1330px, 100vw"
                className="object-cover object-[30%_50%] md:object-center"
              />
            </div>
          </div>

          {/* Hotspots need the image's true aspect ratio, so desktop only. */}
          <ul
            className="absolute inset-0 hidden md:block"
            data-reveal="fade"
            data-reveal-delay="1.1"
          >
            {worlds.map((world, index) => {
              const isOpen = open === world.id;
              return (
                <li
                  key={world.id}
                  className="absolute"
                  style={{ left: `${world.x}%`, top: `${world.y}%` }}
                  onMouseEnter={() => hover(world.id)}
                  onMouseLeave={() => hover(null)}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`hotspot-${world.id}`}
                    aria-label={`About ${world.name}`}
                    onClick={() => setOpen(isOpen ? null : world.id)}
                    onFocus={() => setOpen(world.id)}
                    className="relative -translate-x-1/2 -translate-y-1/2"
                  >
                    <span
                      aria-hidden
                      className="hotspot-ring absolute inset-0 rounded-full border border-ivory"
                      style={{ animationDelay: `${index * 0.6}s` }}
                    />
                    <span
                      className={cn(
                        "relative flex h-9 w-9 items-center justify-center rounded-full bg-ivory/95 text-navy shadow-[0_6px_20px_rgba(12,29,45,0.35)] backdrop-blur transition-[background-color,color,scale] duration-500 ease-out",
                        isOpen ? "scale-110 bg-navy text-ivory" : "hover:scale-110",
                      )}
                    >
                      <Plus
                        className={cn(
                          "h-4 w-4 transition-transform duration-500 ease-out",
                          isOpen && "rotate-45",
                        )}
                        strokeWidth={1.75}
                      />
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen ? (
                      <motion.div
                        id={`hotspot-${world.id}`}
                        role="dialog"
                        aria-label={world.name}
                        initial={{ opacity: 0, y: reduceMotion ? 0 : 10, scale: reduceMotion ? 1 : 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className={cn(
                          "absolute bottom-8 z-10 w-72 rounded-2xl bg-ivory p-5 text-left shadow-[0_24px_60px_-20px_rgba(12,29,45,0.55)]",
                          world.align === "left" && "left-0",
                          world.align === "center" && "left-1/2 -translate-x-1/2",
                          world.align === "right" && "right-0",
                        )}
                      >
                        <p className="font-heading text-[21px] leading-tight text-charcoal">
                          {world.name}
                        </p>
                        <p className="mt-2 text-[13.5px] leading-relaxed text-slate">{world.line}</p>
                        <Link
                          href={world.href}
                          className="link-draw mt-4 text-[12.5px] font-semibold text-navy"
                        >
                          Explore
                          <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                        </Link>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>

        <ul className="mt-12 grid gap-8 md:mt-16 md:grid-cols-3 md:gap-0" data-reveal="stagger">
          {worlds.map((world, index) => (
            <li
              key={world.id}
              className={cn(
                "flex flex-col items-center text-center md:px-8",
                index > 0 && "md:border-l md:border-stone",
              )}
            >
              <span aria-hidden className="h-2 w-2 rotate-45 border border-gold" />
              <Link
                href={world.href}
                className="mt-5 font-heading text-[25px] leading-none text-charcoal transition-colors duration-300 hover:text-navy md:text-[28px]"
              >
                {world.name}
              </Link>
              <p className="mt-3 max-w-[30ch] text-[14px] leading-relaxed text-slate">{world.line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
