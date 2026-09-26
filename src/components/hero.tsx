"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowRight, Pause, Play } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { useHydrated } from "@/lib/use-hydrated";

const SLIDE_MS = 5000;
/** Seconds the curtain wipe between slides takes; the carousel is locked meanwhile. */
const WIPE = 1.2;
const EASE = [0.22, 1, 0.36, 1] as const;
const EASE_IN = [0.7, 0, 0.84, 0] as const;

type Slide = {
  id: string;
  label: string;
  cta: { label: string; href: string };
  image: string;
  alt: string;
  /** Focal point in the source image, used when the viewport crops it. */
  focus: string;
  /** Focal point from md up, where upright tablets crop wider than phones. */
  focusMd?: string;
  /** Mirror the photograph so the brightest furniture sits clear of the headline. */
  mirror?: boolean;
} & (
  | { kind: "story"; eyebrow: string; lines: string[]; body: string }
  /** Finished campaign artwork that carries its own headline — shown without copy. */
  | { kind: "banner" }
);

const slides: Slide[] = [
  {
    id: "festive",
    kind: "banner",
    label: "Festive sale",
    cta: { label: "The Festive Season Sale: up to 10% off. See the offer", href: "#festive-offer" },
    image: "/hero/hero-offer.png",
    alt: "The Festive Season Sale, up to 10% off: a linen sofa, an ergonomic chair and an acoustic phone booth",
    focus: "50% 50%",
  },
  {
    id: "chairs",
    kind: "story",
    label: "Ergonomic chairs",
    eyebrow: "Ergonomic office chairs",
    lines: ["Work Comfortably", "Everywhere."],
    body: "A complete range of ergonomic seating solutions for modern workplaces.",
    cta: { label: "Explore Chairs", href: "/ergonomic-chairs" },
    image: "/hero/hero-ergonomic-chairs.png",
    alt: "Low back, mid back, high back, cafeteria and visitor chairs lined up in a sunlit office",
    // Crops that keep every label they show whole: Mid Back and High Back on a
    // phone, plus Cafeteria on an upright tablet.
    focus: "52% 50%",
    focusMd: "64% 50%",
  },
  {
    id: "booths",
    kind: "story",
    label: "Phone booths",
    eyebrow: "Acoustic phone booths",
    lines: ["Private spaces", "for focused work."],
    body: "Acoustic phone booths that bring quiet to open-plan floors.",
    cta: { label: "Explore Phone Booths", href: "/phone-booths" },
    image: "/hero/hero-phonebooth.png",
    alt: "Black, blue and yellow acoustic phone booths and a four-bay booth along an office floor",
    focus: "63% 50%",
  },
  {
    id: "sofas",
    kind: "story",
    label: "Sofas",
    eyebrow: "Sofas & lounge seating",
    lines: ["Crafted for conversation,", "comfort and connection."],
    body: "Sofas upholstered to order in the fabric, leather and finish you choose.",
    cta: { label: "Explore Sofas", href: "/sofas" },
    image: "/hero/hero-sofa.png",
    alt: "Showroom of leather and fabric sofas and lounge chairs around marble coffee tables",
    focus: "46% 50%",
    mirror: true,
  },
];

const block: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.28 } },
  exit: { transition: { staggerChildren: 0.03 } },
};
const line: Variants = {
  hidden: { y: "115%" },
  show: { y: "0%", transition: { duration: 1, ease: EASE } },
  exit: { y: "-115%", transition: { duration: 0.45, ease: EASE_IN } },
};
const soft: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.35, ease: EASE_IN } },
};

export function Hero() {
  const reduceMotion = useReducedMotion();
  // Server HTML assumes motion; honour the preference once hydrated.
  const hydrated = useHydrated();
  const reduce = hydrated && !!reduceMotion;
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [hovered, setHovered] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [inView, setInView] = useState(true);
  // The first slide's entrance is CSS-driven so it plays before hydration.
  const [intro, setIntro] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const busy = useRef(false);

  const slide = slides[index];
  const autoplay = !reduce && !stopped;
  const running = autoplay && !hovered && inView;

  const go = useCallback(
    (next: number) => {
      if (next === index || busy.current) return;
      setPrev(index);
      setIndex(next);
      setIntro(false);
    },
    [index],
  );

  // Curtain wipe between slides, then a slow push-in for the rest of the slide.
  useEffect(() => {
    const current = slideRefs.current[index];
    const media = current?.querySelector<HTMLElement>("[data-media]");
    if (!current || !media) return;

    // No previous slide means the opening one. Keyed on state rather than a ref so
    // Strict Mode's double effect doesn't mistake the intro for a transition.
    if (prev === null) {
      if (reduceMotion) return;
      const drift = gsap.fromTo(
        media,
        { scale: 1.06 },
        { scale: 1, duration: SLIDE_MS / 1000 + 2, ease: "none" },
      );
      return () => {
        drift.kill();
      };
    }

    if (reduceMotion) {
      gsap.set(current, { clipPath: "inset(0% 0% 0% 0%)" });
      return;
    }

    const previous = slideRefs.current[prev]?.querySelector<HTMLElement>("[data-media]");

    // Locked only for the wipe; the push-in that follows must not block the
    // autoplay timer, which fires before it ends.
    busy.current = true;
    const tl = gsap.timeline();
    tl.fromTo(
      current,
      { clipPath: "inset(0% 0% 0% 100%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: WIPE, ease: "expo.inOut" },
      0,
    )
      .fromTo(
        media,
        { scale: 1.3, xPercent: 10 },
        { scale: 1.06, xPercent: 0, duration: WIPE + 0.4, ease: "expo.out" },
        0.05,
      )
      .to(media, { scale: 1, duration: SLIDE_MS / 1000, ease: "none" })
      .call(() => void (busy.current = false), undefined, WIPE);
    if (previous) tl.to(previous, { xPercent: -8, duration: WIPE, ease: "expo.inOut" }, 0);

    return () => {
      tl.kill();
      busy.current = false;
    };
    // `prev` is always set in the same update as `index`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, reduceMotion]);

  // Pause the rotation while the hero is off screen.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.25,
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // As the page scrolls away, the photograph sinks and the copy lifts and fades.
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const trigger = { trigger: sectionRef.current, start: 0, end: "bottom top", scrub: true };
      gsap.to(mediaRef.current, { yPercent: 14, ease: "none", scrollTrigger: trigger });
      gsap.to(contentRef.current, {
        y: -90,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: { ...trigger, end: "65% top" },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label="Divano Elegante collections"
      onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={(event) => event.pointerType === "mouse" && setHovered(false)}
      className="relative h-[calc(100svh-110px)] min-h-[600px] w-full overflow-hidden bg-navy-deep text-ivory md:landscape:aspect-[1821/864] md:landscape:h-auto md:landscape:max-h-[calc(100svh-110px)] md:landscape:min-h-[440px]"
    >
      <h1 className="sr-only">
        Divano Elegante: ergonomic chairs, sofas and acoustic phone booths designed for modern
        spaces
      </h1>

      <div ref={mediaRef} className="absolute inset-0">
        {slides.map((entry, i) => (
          <div
            key={entry.id}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            aria-hidden={i !== index}
            className="absolute inset-0 overflow-hidden"
            style={{
              zIndex: i === index ? 2 : i === prev ? 1 : 0,
              visibility: i === index || i === prev ? "visible" : "hidden",
            }}
          >
            <div data-media className="absolute inset-0">
              <div className={cn("absolute inset-0", i === 0 && "hero-intro-zoom")}>
                {entry.kind === "banner" ? (
                  // Cropping would cut the artwork's lettering on tall screens, so
                  // portrait shows it whole over a blurred wash of itself.
                  <Image
                    src={entry.image}
                    alt=""
                    aria-hidden
                    fill
                    sizes="100vw"
                    className="hidden scale-110 object-cover blur-2xl brightness-75 portrait:block"
                  />
                ) : null}
                <Image
                  src={entry.image}
                  alt={entry.alt}
                  fill
                  sizes="100vw"
                  preload={i === 0}
                  className={cn(
                    "object-cover object-(--focus) md:object-(--focus-md)",
                    entry.kind === "banner" && "portrait:object-contain",
                    entry.mirror && "-scale-x-100",
                  )}
                  style={
                    {
                      "--focus": entry.focus,
                      "--focus-md": entry.focusMd ?? entry.focus,
                    } as CSSProperties
                  }
                />
              </div>
            </div>

            <div
              aria-hidden
              className={cn(
                "absolute inset-0",
                entry.kind === "banner" ? "hero-scrim-banner" : "hero-scrim",
              )}
            />
          </div>
        ))}
      </div>

      <div
        ref={contentRef}
        className="page-x relative z-10 flex h-full flex-col justify-end pb-32 md:landscape:justify-start md:landscape:pb-0"
      >
        {/* On wide screens the copy hangs from the top: the artwork's product
            labels run through the middle band, and the copy stays above them. */}
        <div aria-hidden className="hidden h-[8%] shrink-0 md:landscape:block" />
        <AnimatePresence mode="wait" initial={false}>
          {slide.kind === "banner" ? (
            // The artwork is the message, so the whole slide opens the offer. Its exit
            // holds the next copy back as long as a copy exit would, keeping pace even.
            <motion.div
              key={slide.id}
              exit={{ opacity: 0, transition: { duration: 0.4 } }}
              className="absolute inset-0"
            >
              <Link
                href={slide.cta.href}
                className="absolute inset-0 focus-visible:outline-offset-[-6px]"
              >
                <span className="sr-only">{slide.cta.label}</span>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key={slide.id}
              variants={block}
              initial="hidden"
              animate="show"
              exit="exit"
              className="w-full [text-shadow:0_2px_28px_rgb(0_0_0/0.3)]"
            >
              <motion.p
                variants={soft}
                className="mb-5 text-[11px] font-medium uppercase tracking-[0.3em] text-ivory/90 md:mb-6 md:text-[12.5px]"
              >
                <span
                  className={cn("block", intro && "hero-intro-fade")}
                  style={intro ? { animationDelay: "0.65s" } : undefined}
                >
                  {slide.eyebrow}
                </span>
              </motion.p>

              <p className="type-display text-ivory">
                {slide.lines.map((text, i) => (
                  <span key={text} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
                    <motion.span variants={line} className="block">
                      <span
                        className={cn("block", intro && "hero-intro-line")}
                        style={intro ? { animationDelay: `${0.75 + i * 0.1}s` } : undefined}
                      >
                        {text}
                      </span>
                    </motion.span>
                  </span>
                ))}
              </p>

              <motion.div variants={soft}>
                <div
                  className={cn(intro && "hero-intro-fade")}
                  style={intro ? { animationDelay: "1.1s" } : undefined}
                >
                  <p className="mt-5 max-w-[40ch] text-[15px] leading-relaxed text-ivory/85 md:mt-6 md:text-[17px] md:landscape:max-w-[min(18rem,22vw)]">
                    {slide.body}
                  </p>
                  <Link
                    href={slide.cta.href}
                    className="group mt-8 flex h-[52px] w-fit items-center gap-3 rounded-full bg-ivory pl-7 pr-2 text-[13.5px] font-semibold text-navy transition-colors duration-300 [text-shadow:none] hover:bg-white"
                  >
                    {slide.cta.label}
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-ivory transition-transform duration-500 ease-out group-hover:translate-x-0.5">
                      <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Slide index — doubles as the autoplay timer. */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div
          className={cn("page-x flex items-end gap-6 pb-7 md:pb-10", intro && "hero-intro-fade")}
          style={intro ? { animationDelay: "1.4s" } : undefined}
        >
          <ol className="grid flex-1 grid-cols-4 gap-3 md:max-w-[780px] md:gap-6">
            {slides.map((entry, i) => {
              const isActive = i === index;
              return (
                <li key={entry.id}>
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Show ${entry.label}`}
                    aria-current={isActive ? "true" : undefined}
                    className="group block w-full pt-3 text-left"
                  >
                    <span className="relative block h-px w-full overflow-hidden bg-ivory/25">
                      <span
                        className="absolute inset-0 origin-left bg-ivory"
                        style={
                          isActive
                            ? autoplay
                              ? {
                                  animation: `hero-progress ${SLIDE_MS}ms linear forwards`,
                                  animationPlayState: running ? "running" : "paused",
                                }
                              : { transform: "scaleX(1)" }
                            : { transform: "scaleX(0)" }
                        }
                        onAnimationEnd={() => {
                          if (isActive) go((index + 1) % slides.length);
                        }}
                      />
                    </span>
                    <span className="mt-3 flex items-baseline gap-2.5 text-[11px] tracking-[0.04em] md:text-[12.5px]">
                      <span className="tabular-nums text-gold">0{i + 1}</span>
                      <span
                        className={cn(
                          "hidden truncate transition-colors duration-300 sm:inline",
                          isActive ? "text-ivory" : "text-ivory/55 group-hover:text-ivory",
                        )}
                      >
                        {entry.label}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {!reduce ? (
            <button
              type="button"
              onClick={() => setStopped((value) => !value)}
              aria-label={stopped ? "Play slideshow" : "Pause slideshow"}
              className="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ivory/30 text-ivory/80 transition-colors duration-300 hover:border-ivory hover:text-ivory"
            >
              {stopped ? (
                <Play className="h-3.5 w-3.5" strokeWidth={1.75} />
              ) : (
                <Pause className="h-3.5 w-3.5" strokeWidth={1.75} />
              )}
            </button>
          ) : null}

          <div className="ml-auto hidden flex-col items-center gap-3 lg:flex" aria-hidden>
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.24em] text-ivory/70 [writing-mode:vertical-rl]">
              Scroll
            </span>
            <span className="relative block h-14 w-px overflow-hidden bg-ivory/20">
              <span className="scroll-cue-line absolute inset-0 bg-ivory" />
            </span>
          </div>
        </div>
      </div>

      {/* Opening curtain, lifted on first paint. */}
      <div aria-hidden className="hero-curtain pointer-events-none absolute inset-0 z-20 bg-navy-deep" />
    </section>
  );
}
