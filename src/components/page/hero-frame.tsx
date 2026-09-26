"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/** Matches the page-x gutters, so the framed image lines up with the copy above it. */
const gutter = () => (window.innerWidth >= 1024 ? 56 : window.innerWidth >= 640 ? 32 : 20);

/**
 * The inner-page hero photograph. It arrives behind a curtain, sits framed
 * within the page gutters, then opens out to full bleed as the page scrolls.
 */
export function HeroFrame({
  src,
  alt,
  focus,
  className,
  children,
}: {
  src: string;
  alt: string;
  focus?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const driftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const drift = driftRef.current;
    if (!frame || !drift) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        frame,
        { clipPath: () => `inset(0px ${gutter()}px 0px ${gutter()}px round 20px)` },
        {
          clipPath: "inset(0px 0px 0px 0px round 0px)",
          ease: "none",
          scrollTrigger: {
            trigger: frame,
            // Framed at the top of the page, fully open once it nears the header.
            start: 0,
            end: "top 12%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
      gsap.fromTo(
        drift,
        { yPercent: 0 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: { trigger: frame, start: "top top", end: "bottom top", scrub: true },
        },
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <div
      ref={frameRef}
      className={cn(
        "relative overflow-hidden bg-ivory-deep [clip-path:inset(0_1.25rem_round_20px)] sm:[clip-path:inset(0_2rem_round_20px)] lg:[clip-path:inset(0_3.5rem_round_20px)]",
        className,
      )}
    >
      <div className="frame-reveal absolute inset-0">
        <div ref={driftRef} className="absolute inset-x-0 -top-[4%] bottom-[-10%]">
          <div className="hero-intro-zoom absolute inset-0">
            <Image
              src={src}
              alt={alt}
              fill
              preload
              sizes="100vw"
              className="object-cover"
              style={focus ? { objectPosition: focus } : undefined}
            />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
