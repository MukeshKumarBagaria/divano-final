"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";

const chairs = [
  { name: "Low back chairs", note: "Designed for dynamic workspaces", image: "/images/chair-low.jpg", href: "/ergonomic-chairs/low-back-chairs" },
  { name: "Mid back chairs", note: "Balanced support for full working days", image: "/images/chair-mid.jpg", href: "/ergonomic-chairs/mid-back-chairs" },
  { name: "High back chairs", note: "Executive comfort for cabins and boardrooms", image: "/images/chair-high.jpg", href: "/ergonomic-chairs/high-back-chairs" },
  { name: "Cafeteria chairs", note: "Flexible seating for social spaces", image: "/images/chair-cafe.jpg", href: "/ergonomic-chairs/cafeteria-chairs" },
  { name: "Visitor chairs", note: "Welcoming every guest", image: "/images/chair-visitor.jpg", href: "/ergonomic-chairs/visitor-chairs" },
];

/**
 * On desktop the section pins and the rail travels sideways with the scroll.
 * Everywhere else it is a native swipeable rail.
 */
export function ChairTypes() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      viewport.style.overflow = "visible";
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const images = track.querySelectorAll("[data-rail-image]");

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
      tl.to(track, { x: () => -distance() }, 0)
        .fromTo(images, { xPercent: 7 }, { xPercent: -7 }, 0)
        .fromTo(progressRef.current, { scaleX: 0 }, { scaleX: 1 }, 0);

      return () => {
        viewport.style.overflow = "";
      };
    });
    return () => mm.revert();
  }, []);

  // Pinning wraps the section in a pin-spacer, so React must own a stable
  // parent above it or unmounting (leaving the page) throws on removeChild.
  return (
    <div>
      <section
        ref={sectionRef}
        aria-labelledby="chair-types-heading"
        className="relative flex flex-col justify-center overflow-hidden bg-ivory-deep py-24 lg:h-svh lg:py-0 lg:pt-[76px]"
      >
        <div className="page-x flex flex-wrap items-end justify-between gap-6">
          <h2
            id="chair-types-heading"
            className="type-h2 text-charcoal"
            data-reveal="lines"
          >
            Shop by chair type
          </h2>
          <div className="flex items-center gap-5" data-reveal="fade">
            <span className="relative hidden h-px w-40 overflow-hidden bg-stone lg:block" aria-hidden>
              <span ref={progressRef} className="absolute inset-0 origin-left bg-navy" />
            </span>
            <Link
              href="/ergonomic-chairs"
              className="link-draw text-[13px] font-semibold text-navy"
            >
              View the full range
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        <div
          ref={viewportRef}
          className="no-scrollbar mt-12 snap-x snap-mandatory overflow-x-auto lg:mt-14"
          data-lenis-prevent-horizontal
        >
          <ul
            ref={trackRef}
            className="flex w-max gap-4 px-5 sm:px-8 md:gap-6 lg:px-14"
          >
            {chairs.map((chair) => (
              <li
                key={chair.name}
                className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[clamp(280px,42vh,440px)]"
              >
                <Link href={chair.href} className="group block">
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#ecebe8]">
                    <div data-rail-image className="absolute -inset-x-[10%] inset-y-0">
                      <Image
                        src={chair.image}
                        alt={chair.name}
                        fill
                        sizes="(min-width: 1024px) 440px, 78vw"
                        className="object-cover transition-[scale] duration-[1.2s] ease-out group-hover:scale-[1.05]"
                      />
                    </div>
                    <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-ivory/90 text-navy opacity-0 backdrop-blur transition-[opacity,rotate] duration-500 ease-out group-hover:rotate-45 group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                  </div>
                  <h3 className="mt-5 font-heading text-[23px] leading-tight text-charcoal md:text-[25px]">
                    {chair.name}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] text-slate">{chair.note}</p>
                </Link>
              </li>
            ))}

            <li className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[clamp(280px,42vh,440px)]">
              <Link
                href="#chair-finder"
                className="group flex aspect-square flex-col justify-between rounded-2xl bg-navy p-8 text-ivory"
              >
                <span className="eyebrow">Not sure where to start?</span>
                <span>
                  <span className="block font-heading text-[30px] leading-[1.02] md:text-[35px]">
                    Find the right chair for the way you work.
                  </span>
                  <span className="mt-6 inline-flex items-center gap-3 text-[13px] font-semibold">
                    Take the chair finder
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/30 transition-[background-color,color] duration-500 group-hover:bg-ivory group-hover:text-navy">
                      <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
