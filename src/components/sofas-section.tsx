"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap } from "@/lib/gsap";

/** A framed photograph that opens out to full bleed as it scrolls into view. */
export function SofasSection() {
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const image = imageRef.current;
    if (!frame || !image) return;

    const mm = gsap.matchMedia();
    mm.add(
      {
        desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const inset = context.conditions?.desktop ? "7% 5% 7% 5%" : "4% 5% 4% 5%";
        const opening = {
          trigger: frame,
          start: "top bottom",
          end: "top 10%",
          scrub: true,
        };
        gsap.fromTo(
          frame,
          { clipPath: `inset(${inset} round 28px)` },
          { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", scrollTrigger: opening },
        );
        gsap.fromTo(image, { scale: 1.25 }, { scale: 1, ease: "none", scrollTrigger: opening });
        gsap.to(image, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: { trigger: frame, start: "top top", end: "bottom top", scrub: true },
        });
      },
    );
    return () => mm.revert();
  }, []);

  return (
    <section className="bg-ivory" aria-labelledby="sofas-heading">
      <div
        ref={frameRef}
        className="relative h-[88svh] min-h-[600px] overflow-hidden bg-navy-deep text-ivory"
      >
        <div ref={imageRef} className="absolute inset-0">
          <Image
            src="/images/cat-sofas.jpg"
            alt="Deep linen sofa facing floor-to-ceiling windows in a sunlit living room"
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "35% 60%" }}
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(20deg,rgba(12,29,45,0.82)_0%,rgba(12,29,45,0.35)_40%,rgba(12,29,45,0)_70%)]"
        />

        <div className="page-x relative flex h-full flex-col justify-end pb-14 md:pb-20">
          <p className="eyebrow" data-reveal="fade">
            Sofas
          </p>
          <h2
            id="sofas-heading"
            className="type-h2 mt-6 max-w-[13ch] text-ivory md:text-[clamp(2.6rem,5vw,5rem)]"
            data-reveal="lines"
          >
            Where comfort becomes part of the room.
          </h2>
          <div
            className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-6"
            data-reveal="fade"
            data-reveal-delay="0.2"
          >
            <Link
              href="/sofas"
              className="group inline-flex h-[52px] items-center gap-3 rounded-full bg-ivory pl-7 pr-2 text-[13.5px] font-semibold text-navy transition-colors duration-300 hover:bg-white"
            >
              Explore sofas
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-ivory transition-transform duration-500 ease-out group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </span>
            </Link>
            <p className="max-w-[36ch] text-[14px] leading-relaxed text-ivory/75">
              Upholstered to order in the fabric, leather and finish you choose.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
