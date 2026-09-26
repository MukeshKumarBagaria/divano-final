"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap } from "@/lib/gsap";

const features = [
  { title: "Acoustic panelling", body: "Lined to keep conversations in and open-plan noise out." },
  { title: "Ventilation and light", body: "Quiet airflow and warm, even light inside." },
  { title: "A desk that works", body: "A worktop for laptop, phone and notes." },
  { title: "Sized to your floor", body: "Solo, duo and meeting formats, or built to order." },
];

const installs = [
  { src: "/booths/booth-1.jpg", w: 1200, h: 1600, alt: "Black booth beside open-plan desks" },
  { src: "/booths/booth-3.jpg", w: 1600, h: 1200, alt: "A row of booths along an office wall" },
  { src: "/booths/booth-4.jpg", w: 930, h: 1600, alt: "Yellow booths on a carpeted floor" },
  { src: "/booths/booth-5.jpg", w: 1200, h: 1600, alt: "Blue booth on a planted office floor" },
  { src: "/booths/booth-6.jpg", w: 1200, h: 1600, alt: "Two booths with stools and worktops" },
  { src: "/booths/booth-2.jpg", w: 1200, h: 1600, alt: "Blue booth door with a stool inside" },
];

export function PhoneBoothsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const boothRef = useRef<HTMLDivElement>(null);
  const floorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const glow = glowRef.current;
      const booth = boothRef.current;

      const floor = floorRef.current;

      // Lights off until the booth scrolls into view.
      gsap.set(glow, { autoAlpha: 0, scale: 0.7 });
      gsap.set(booth, { filter: "brightness(0.32) saturate(0.5)" });
      gsap.set(floor, { autoAlpha: 0, scaleX: 0.6 });

      // Lights on: a couple of flickers, then the amber settles in.
      const tl = gsap.timeline({
        scrollTrigger: { trigger: booth, start: "top 62%", toggleActions: "play none none none" },
      });
      tl.to(glow, { autoAlpha: 0.55, duration: 0.06, ease: "none" }, 0.1)
        .to(glow, { autoAlpha: 0.1, duration: 0.08, ease: "none" })
        .to(glow, { autoAlpha: 0.75, duration: 0.05, ease: "none" })
        .to(glow, { autoAlpha: 0.25, duration: 0.1, ease: "none" })
        .to(glow, { autoAlpha: 1, scale: 1, duration: 1.6, ease: "expo.out" })
        .to(booth, { filter: "brightness(1) saturate(1)", duration: 1.8, ease: "expo.out" }, "<-0.1")
        .to(floor, { autoAlpha: 1, scaleX: 1, duration: 1.6, ease: "expo.out" }, "<");

      gsap.fromTo(
        booth,
        { yPercent: 6 },
        {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="booths-heading"
      className="relative overflow-hidden bg-navy-deep text-ivory"
    >
      <div className="page-x grid gap-16 pb-20 pt-24 md:pt-36 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="relative z-10 lg:col-span-5">
          <p className="eyebrow" data-reveal="fade">
            Phone booths
          </p>
          <h2
            id="booths-heading"
            className="type-h2 mt-6 text-ivory md:text-[clamp(2.6rem,4.7vw,4.6rem)]"
            data-reveal="lines"
          >
            Private space.
            <br />
            Better focus.
          </h2>
          <p className="type-lead mt-7 max-w-[34ch] text-ivory/70" data-reveal="fade">
            Acoustic phone booths designed for modern workplaces.
          </p>

          <dl className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2" data-reveal="stagger">
            {features.map((feature) => (
              <div key={feature.title} className="border-t border-ivory/15 pt-4">
                <dt className="flex items-center gap-2.5 text-[14px] font-semibold text-ivory">
                  <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gold" />
                  {feature.title}
                </dt>
                <dd className="mt-1.5 text-[13.5px] leading-relaxed text-ivory/60">
                  {feature.body}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-11 flex flex-wrap gap-3" data-reveal="fade">
            <Link
              href="/phone-booths"
              className="group inline-flex h-[52px] items-center gap-3 rounded-full bg-ivory pl-7 pr-2 text-[13.5px] font-semibold text-navy transition-colors duration-300 hover:bg-white"
            >
              Explore phone booths
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-ivory transition-transform duration-500 ease-out group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </span>
            </Link>
            <Link
              href="#consultation"
              className="inline-flex h-[52px] items-center rounded-full border border-ivory/25 px-7 text-[13.5px] font-semibold text-ivory transition-colors duration-300 hover:border-ivory hover:bg-ivory/10"
            >
              Plan a booth for your office
            </Link>
          </div>
        </div>

        <div className="relative lg:col-span-7">
          <div className="relative mx-auto aspect-[1310/1200] w-full max-w-[720px]">
            <div
              ref={glowRef}
              aria-hidden
              className="absolute left-1/2 top-[42%] aspect-square w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(240,180,106,0.5)_0%,rgba(240,180,106,0.16)_38%,rgba(240,180,106,0)_68%)] blur-2xl"
            />
            <div
              ref={floorRef}
              aria-hidden
              className="absolute bottom-[3%] left-1/2 h-[10%] w-[70%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse,rgba(240,180,106,0.28)_0%,rgba(0,0,0,0)_70%)]"
            />
            <div ref={boothRef} className="absolute inset-0">
              <Image
                src="/booths/phonebooth.png"
                alt="Black acoustic phone booth with a warmly lit oak interior, a desk and a leather chair"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Installations — real booths on real floors. */}
      <div className="border-t border-ivory/10 pb-20 pt-12 md:pb-28">
        <div className="page-x flex flex-wrap items-baseline justify-between gap-4">
          <p className="font-heading text-[23px] text-ivory md:text-[26px]">
            Built, delivered and installed by us
          </p>
          <p className="text-[13px] text-ivory/55">Recent installations across India</p>
        </div>
        <div className="marquee mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <ul className="marquee-track flex w-max gap-4" style={{ "--marquee-duration": "55s" } as React.CSSProperties}>
            {[...installs, ...installs].map((shot, index) => (
              <li key={`${shot.src}-${index}`} aria-hidden={index >= installs.length}>
                <Image
                  src={shot.src}
                  alt={index >= installs.length ? "" : shot.alt}
                  width={shot.w}
                  height={shot.h}
                  sizes="(min-width: 768px) 380px, 260px"
                  className="h-[240px] w-auto rounded-xl object-cover saturate-[0.85] transition-[filter] duration-500 hover:saturate-100 md:h-[300px]"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
