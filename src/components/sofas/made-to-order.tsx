"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Frame",
    body: "Solid hardwood frames are cut and joined on our own floor, sized to the drawing you approved rather than pulled from a warehouse.",
    image: "/images/factory-craft.jpg",
    alt: "A craftsperson fitting a hardwood lounge chair frame in the workshop",
  },
  {
    title: "Foam and fill",
    body: "Seat firmness is chosen, not assumed. Layered foams and fills are built up to how you like to sit: upright and supportive, or deep and soft.",
    image: "/images/factory-film-poster.jpg",
    alt: "The upholstery workshop, with foam stock and finished sofas on the floor",
  },
  {
    title: "Cover",
    body: "Leather is cut from the hide and fabric from the roll, then stitched and fitted by hand so seams and patterns line up.",
    image: "/hero/hero-1.png",
    alt: "Close view of hand-finished bouclé upholstery",
  },
  {
    title: "Finish",
    body: "Legs, piping and final checks by the people who built it, before the sofa is wrapped and sent to your space.",
    image: "/hero/sofa.jpg",
    alt: "Finished cognac leather sofas lined up on the factory floor",
  },
];

/**
 * Scroll-told process: on large screens the photograph holds still while
 * the steps scroll past it and it changes to match the one in focus.
 */
export function MadeToOrder() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.step));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
      <div className="hidden lg:col-span-6 lg:block">
        <div className="sticky top-[calc(var(--header-h)+2.5rem)] h-[calc(100svh-var(--header-h)-5rem)] max-h-[760px]">
          <div className="relative h-full overflow-hidden rounded-2xl bg-navy">
            {steps.map((step, index) => (
              <div
                key={step.image}
                aria-hidden={index !== active}
                className={cn(
                  "absolute inset-0 transition-[opacity,scale] duration-[1100ms] ease-out",
                  index === active ? "scale-100 opacity-100" : "scale-[1.06] opacity-0",
                )}
              >
                <Image src={step.image} alt={step.alt} fill sizes="50vw" className="object-cover" />
              </div>
            ))}
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(0deg,rgba(12,29,45,0.55)_0%,rgba(12,29,45,0)_40%)]"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-7">
              <p className="font-heading text-[26px] leading-none text-ivory">{steps[active].title}</p>
              <ol className="flex gap-2" aria-hidden>
                {steps.map((step, index) => (
                  <li
                    key={step.title}
                    className={cn(
                      "h-1.5 rounded-full transition-[width,background-color] duration-700 ease-out",
                      index === active ? "w-8 bg-gold" : "w-1.5 bg-ivory/40",
                    )}
                  />
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      <ol className="lg:col-span-5 lg:col-start-8">
        {steps.map((step, index) => (
          <li
            key={step.title}
            ref={(el) => {
              stepRefs.current[index] = el;
            }}
            data-step={index}
            className="flex flex-col justify-center border-t border-stone py-10 first:border-t-0 lg:min-h-[62svh] lg:border-t-0 lg:py-0"
          >
            <div className="relative mb-8 aspect-[4/3] overflow-hidden rounded-2xl bg-navy lg:hidden">
              <Image src={step.image} alt={step.alt} fill sizes="100vw" className="object-cover" />
            </div>
            <div
              className={cn(
                "transition-opacity duration-700",
                index === active ? "lg:opacity-100" : "lg:opacity-30",
              )}
            >
              <span className="text-[12px] font-semibold tabular-nums tracking-[0.1em] text-gold">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-heading text-[35px] leading-none text-charcoal md:text-[44px]">{step.title}</h3>
              <p className="mt-5 max-w-[40ch] text-[16px] leading-relaxed text-slate">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
