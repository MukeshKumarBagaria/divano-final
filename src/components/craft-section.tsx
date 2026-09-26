"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Factory, Play, X } from "lucide-react";
import { lockScroll } from "@/components/smooth-scroll";

const steps = [
  { title: "Frame", body: "Hardwood and steel frames are cut and joined in-house." },
  { title: "Upholstery", body: "Foam, fabric and leather are fitted and stitched by hand." },
  { title: "Finish", body: "Every piece is checked by the people who made it before it ships." },
];

const FILM = "/video/Factory-video.mp4";
const POSTER = "/images/factory-film-poster.jpg";

export function CraftSection() {
  const reduceMotion = useReducedMotion();
  const [filmOpen, setFilmOpen] = useState(false);
  const loopRef = useRef<HTMLVideoElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Only run the muted loop while it is on screen.
  useEffect(() => {
    const video = loopRef.current;
    if (!video || reduceMotion) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.2 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduceMotion]);

  useEffect(() => {
    if (!filmOpen) return;
    lockScroll(true);
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setFilmOpen(false);
    window.addEventListener("keydown", onKeyDown);
    const trigger = triggerRef.current;
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [filmOpen]);

  return (
    <section
      id="craft"
      aria-labelledby="craft-heading"
      className="scroll-mt-24 overflow-hidden bg-ivory-deep py-24 md:py-40"
    >
      <div className="page-x grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-x-12">
        <div className="lg:col-span-5">
          <p className="eyebrow" data-reveal="fade">
            Our own factory
          </p>
          <h2
            id="craft-heading"
            className="type-h2 mt-6 max-w-[11ch] text-charcoal"
            data-reveal="lines"
          >
            From our workshop to your space.
          </h2>
          <p className="type-lead mt-7 max-w-[40ch] text-slate" data-reveal="fade">
            Every piece begins with materials, craftsmanship and attention to detail, on our own
            factory floor. We make what we sell, with no resellers in between.
          </p>

          <ol className="mt-12 border-t border-stone" data-reveal="stagger">
            {steps.map((step, index) => (
              <li key={step.title} className="flex gap-6 border-b border-stone py-6">
                <span className="pt-1 text-[12px] font-semibold tabular-nums tracking-[0.1em] text-gold">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="font-heading text-[23px] leading-none text-charcoal">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-slate">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <button
            ref={triggerRef}
            type="button"
            onClick={() => setFilmOpen(true)}
            className="group mt-11 inline-flex h-[52px] items-center gap-3 rounded-full bg-navy pl-2 pr-7 text-[13.5px] font-semibold text-ivory transition-colors duration-300 hover:bg-navy-deep"
            data-reveal="fade"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ivory text-navy transition-transform duration-500 ease-out group-hover:scale-110">
              <Play className="ml-0.5 h-3.5 w-3.5 fill-current" strokeWidth={1.5} />
            </span>
            Discover our craft
          </button>
        </div>

        {/* The film, looping silently while on screen; opens full screen with sound. */}
        <div className="lg:col-span-7">
          <button
            type="button"
            onClick={() => setFilmOpen(true)}
            aria-label="Play the workshop film with sound"
            className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-navy"
            data-reveal="image"
            data-reveal-from="right"
          >
            <div data-reveal-inner className="absolute inset-0">
              <div data-parallax="0.06" className="absolute inset-x-0 -bottom-[8%] -top-[8%]">
                <video
                  ref={loopRef}
                  className="absolute inset-0 h-full w-full object-cover"
                  src={FILM}
                  poster={POSTER}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                />
              </div>
            </div>
            <span className="absolute inset-0 bg-gradient-to-t from-navy-deep/55 via-navy-deep/0 to-navy-deep/20 transition-colors duration-500 group-hover:bg-navy-deep/15" />

            <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-ivory/95 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy backdrop-blur md:left-6 md:top-6">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Filmed in our factory
            </span>

            <span className="absolute bottom-4 left-4 flex items-center gap-3 rounded-full bg-ivory/95 py-1.5 pl-1.5 pr-5 text-[13px] font-semibold text-navy backdrop-blur md:bottom-6 md:left-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-ivory transition-transform duration-500 ease-out group-hover:scale-110">
                <Play className="ml-0.5 h-3.5 w-3.5 fill-current" strokeWidth={1.5} />
              </span>
              Watch with sound
            </span>
          </button>

          <div className="mt-8 flex items-start gap-4" data-reveal="fade">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-stone text-gold">
              <Factory className="h-5 w-5" strokeWidth={1.5} />
            </span>
            <p className="max-w-[52ch] text-[14px] leading-relaxed text-slate">
              <span className="font-semibold text-charcoal">Manufacturer, not a reseller.</span>{" "}
              Frames, foam, fabric and finish are handled by our own team, so you buy directly
              from the people who build it.
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {filmOpen ? (
          <motion.div
            key="film"
            role="dialog"
            aria-modal="true"
            aria-label="Workshop film"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-navy-deep/92 p-4 backdrop-blur-md md:p-10"
            onClick={() => setFilmOpen(false)}
          >
            <motion.div
              initial={{ scale: reduceMotion ? 1 : 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: reduceMotion ? 1 : 0.97, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-6xl overflow-hidden rounded-2xl bg-black"
              onClick={(event) => event.stopPropagation()}
            >
              <video
                className="aspect-video w-full"
                src={FILM}
                poster={POSTER}
                controls
                autoPlay
                playsInline
              />
            </motion.div>
            <button
              type="button"
              autoFocus
              onClick={() => setFilmOpen(false)}
              aria-label="Close film"
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-ivory text-navy transition-transform duration-300 hover:scale-105 md:right-8 md:top-8"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
