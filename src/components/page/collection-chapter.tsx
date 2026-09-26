"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Entry = { name: string; note: string; href: string; image: { src: string; alt: string } };

/**
 * One world of the collection: a sticky photograph beside its sub-categories.
 * Hovering a row brings its photograph forward.
 */
export function CollectionChapter({
  id,
  numeral,
  eyebrow,
  title,
  line,
  cover,
  entries,
  all,
  flip = false,
}: {
  id: string;
  numeral: string;
  eyebrow: string;
  title: string;
  line: string;
  cover: { src: string; alt: string; focus?: string };
  entries: Entry[];
  all: { label: string; href: string };
  flip?: boolean;
}) {
  const [active, setActive] = useState(-1);
  const layers = [{ src: cover.src, alt: cover.alt }, ...entries.map((entry) => entry.image)];

  return (
    <section id={id} className="scroll-mt-24 bg-ivory py-24 md:py-32" aria-labelledby={`${id}-heading`}>
      <div className="page-x">
        <div className="grid gap-12 border-t border-hairline pt-16 md:pt-24 lg:grid-cols-12 lg:gap-10">
          <div className={cn("lg:col-span-5", flip && "lg:order-2 lg:col-start-8")}>
            <div className="lg:sticky lg:top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ivory-deep" data-reveal="image">
                <div data-reveal-inner className="absolute inset-0">
                  {layers.map((layer, index) => {
                    const visible = index === active + 1;
                    return (
                      <div
                        key={`${layer.src}-${index}`}
                        aria-hidden={!visible}
                        className={cn(
                          "absolute inset-0 transition-[opacity,scale] duration-[900ms] ease-out",
                          visible ? "scale-100 opacity-100" : "scale-[1.05] opacity-0",
                        )}
                      >
                        <Image
                          src={layer.src}
                          alt={layer.alt}
                          fill
                          sizes="(min-width: 1024px) 40vw, 100vw"
                          className="object-cover"
                          style={index === 0 && cover.focus ? { objectPosition: cover.focus } : undefined}
                        />
                      </div>
                    );
                  })}
                </div>
                <span className="absolute left-5 top-5 font-heading text-[35px] italic leading-none text-ivory [text-shadow:0_2px_20px_rgb(0_0_0/0.35)]">
                  {numeral}
                </span>
              </div>
            </div>
          </div>

          <div className={cn("lg:col-span-6", flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-7")}>
            <p className="eyebrow" data-reveal="fade">
              {eyebrow}
            </p>
            <h2 id={`${id}-heading`} className="type-h2 mt-6 max-w-[12ch] text-charcoal" data-reveal="lines">
              {title}
            </h2>
            <p className="type-lead mt-6 max-w-[42ch] text-slate" data-reveal="fade">
              {line}
            </p>

            <ul className="mt-12 border-t border-stone" onMouseLeave={() => setActive(-1)} data-reveal="stagger">
              {entries.map((entry, index) => {
                const isActive = index === active;
                const dimmed = active !== -1 && !isActive;
                return (
                  <li key={entry.href} className="border-b border-stone">
                    <Link
                      href={entry.href}
                      onMouseEnter={() => setActive(index)}
                      onFocus={() => setActive(index)}
                      onBlur={() => setActive(-1)}
                      className="group flex items-center gap-5 py-5 md:py-6"
                    >
                      <span className="w-6 text-[11.5px] font-semibold tabular-nums tracking-[0.1em] text-gold">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "font-heading text-[25px] leading-none text-charcoal transition-[opacity,translate] duration-500 ease-out md:text-[30px]",
                          dimmed && "opacity-35",
                          isActive && "translate-x-1.5",
                        )}
                      >
                        {entry.name}
                      </span>
                      <span
                        className={cn(
                          "ml-auto hidden text-right text-[13px] text-slate transition-opacity duration-500 sm:block",
                          dimmed && "opacity-40",
                        )}
                      >
                        {entry.note}
                      </span>
                      <ArrowUpRight
                        className={cn(
                          "ml-auto h-4 w-4 shrink-0 text-navy transition-[opacity,rotate] duration-500 ease-out sm:ml-0",
                          isActive ? "rotate-45 opacity-100" : "opacity-30",
                        )}
                        strokeWidth={1.5}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Link href={all.href} className="link-draw mt-10 text-[13px] font-semibold text-navy" data-reveal="fade">
              {all.label}
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
