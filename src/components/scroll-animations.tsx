"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";

/**
 * One driver for the page's declarative scroll motion, so sections can stay
 * Server Components and opt in with data attributes:
 *
 *   data-reveal="lines"   heading rises line by line out of a mask
 *   data-reveal="image"   curtain wipe; [data-reveal-inner] settles from a zoom
 *   data-reveal="fade"    soft rise + fade
 *   data-reveal="stagger" direct children rise in sequence
 *   data-reveal-delay     seconds to wait once triggered
 *   data-reveal-from      image curtain origin: bottom (default) | left | right | top
 *   data-parallax="0.1"   drifts against the scroll, as a fraction of its height
 *   data-draw             hairline draws in from the left
 *
 * Elements animated here must not carry CSS transitions on transform or
 * clip-path, or the transition will fight every GSAP frame.
 */

const START = "top 86%";
// Play on first entry and never reverse. Deliberately not `once: true`: a
// once-trigger created while the page is still scrolled deep (mid-navigation)
// completes and kills itself inside ScrollTrigger's refresh loop, which then
// reads past the end of its own list and throws.
const PLAY_ONCE = "play none none none";

const curtainFrom: Record<string, string> = {
  bottom: "inset(100% 0% 0% 0%)",
  top: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

export function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    const mm = gsap.matchMedia();
    const splits: SplitText[] = [];

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const delayOf = (el: Element) =>
        parseFloat((el as HTMLElement).dataset.revealDelay ?? "0") || 0;

      gsap.utils.toArray<HTMLElement>('[data-reveal="lines"]').forEach((el) => {
        const split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit(self) {
            self.masks.forEach((mask) => mask.classList.add("split-line-mask"));
            return gsap.from(self.lines, {
              yPercent: 115,
              duration: 1.25,
              stagger: 0.09,
              delay: delayOf(el),
              scrollTrigger: { trigger: el, start: START, toggleActions: PLAY_ONCE },
            });
          },
        });
        splits.push(split);
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="image"]').forEach((el) => {
        const from = curtainFrom[el.dataset.revealFrom ?? "bottom"] ?? curtainFrom.bottom;
        const inner = el.querySelector<HTMLElement>("[data-reveal-inner]");
        const tl = gsap.timeline({
          delay: delayOf(el),
          scrollTrigger: { trigger: el, start: START, toggleActions: PLAY_ONCE },
        });
        tl.fromTo(
          el,
          { clipPath: from },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut" },
        );
        if (inner) {
          tl.fromTo(inner, { scale: 1.28 }, { scale: 1, duration: 2, ease: "expo.out" }, 0.1);
        }
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="fade"]').forEach((el) => {
        gsap.from(el, {
          y: 28,
          autoAlpha: 0,
          duration: 1.3,
          delay: delayOf(el),
          scrollTrigger: { trigger: el, start: START, toggleActions: PLAY_ONCE },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="stagger"]').forEach((el) => {
        gsap.from(el.children, {
          y: 36,
          autoAlpha: 0,
          duration: 1.3,
          stagger: 0.1,
          delay: delayOf(el),
          scrollTrigger: { trigger: el, start: START, toggleActions: PLAY_ONCE },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-draw]").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 1.6,
            ease: "expo.inOut",
            delay: delayOf(el),
            scrollTrigger: { trigger: el, start: START, toggleActions: PLAY_ONCE },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = parseFloat(el.dataset.parallax ?? "0.1") * 100;
        gsap.fromTo(
          el,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    });

    // Fonts and late images change heights; re-measure once they settle.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      splits.forEach((split) => split.revert());
      mm.revert();
    };
  }, [pathname]);

  return null;
}
