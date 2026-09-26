"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(ScrollTrigger, Flip);

const shots = [
  {
    src: "/booths/booth-1.jpg",
    alt: "Dark acoustic booth standing beside open-plan desks",
  },
  { src: "/booths/booth-4.jpg", alt: "Yellow and black booths side by side" },
  // Third in the grid is the one that opens to full width, so it gets the
  // widest, sharpest photograph.
  {
    src: "/booths/booth-3.jpg",
    alt: "A row of booths installed along an office corridor",
  },
  { src: "/booths/booth-5.jpg", alt: "Blue booth on a planted office floor" },
  {
    src: "/booths/booth-6.jpg",
    alt: "Booth interiors with stools and worktops",
  },
  { src: "/booths/booth-2.jpg", alt: "Close view of a booth door and handle" },
];

export function BoothBento() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const grid = gridRef.current;
    if (!wrap || !grid) return;

    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => {
        const items = grid.querySelectorAll(".booth-bento__item");

        // Capture the expanded layout, revert to the compact one, then let
        // Flip tween the difference as the pinned section scrubs.
        grid.classList.add("booth-bento--final");
        const finalState = Flip.getState(items);
        grid.classList.remove("booth-bento--final");

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: wrap,
            start: "center center",
            // Pin only for as long as the expansion takes, so the page
            // resumes scrolling the moment the middle image fills the screen.
            end: "+=100%",
            scrub: true,
            pin: wrap,
            anticipatePin: 1,
          },
        });

        // A linear scrub makes the growth consume the whole pin: the image
        // reaches full width on the exact frame the pin releases, so there is
        // no stretch of scrolling where the section sits finished but stuck.
        timeline.add(Flip.to(finalState, { simple: true, ease: "none" }));

        return () => {
          gsap.set(items, { clearProps: "all" });
        };
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section className="w-full bg-ivory" aria-labelledby="installed-heading">
      <div className="page-x pt-24 md:pt-36">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow" data-reveal="fade">
              Installed
            </p>
            <h2 id="installed-heading" className="type-h2 mt-6 max-w-[12ch] text-charcoal" data-reveal="lines">
              Booths on real floors.
            </h2>
            <p className="mt-5 max-w-[44ch] text-[15px] leading-relaxed text-slate" data-reveal="fade">
              Every one of these we built, delivered and installed.
              <span className="hidden md:inline"> Keep scrolling to move in closer.</span>
            </p>
          </div>

          <Link
            href="#consultation"
            className="link-draw text-[13px] font-semibold text-navy"
            data-reveal="fade"
          >
            Plan booths for your office
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>
      </div>

      <div
        ref={wrapRef}
        className="relative mt-12 flex w-full items-center justify-center overflow-hidden px-5 pb-24 sm:px-8 md:mt-0 md:h-dvh md:px-0 md:pb-0"
      >
        <div ref={gridRef} className="booth-bento">
          {shots.map((shot) => (
            <div key={shot.src} className="booth-bento__item">
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="(min-width: 768px) 70vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
