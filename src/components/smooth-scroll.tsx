"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

let lenis: Lenis | null = null;

/** The running Lenis instance, or null when native scrolling is in use. */
export const getLenis = () => lenis;

/** Pause / resume page scrolling, e.g. while a full-screen menu is open. */
export function lockScroll(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

/** Scroll to an element, leaving room for the sticky header. */
export function scrollToTarget(target: string | HTMLElement) {
  const el =
    typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  if (!el) return false;
  const offset = -parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--header-h") || "76",
  );
  if (lenis) {
    lenis.scrollTo(el, { offset, duration: 1.6 });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }
  return true;
}

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;

    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // One loop: GSAP's ticker drives Lenis (seconds → ms), and every Lenis
    // scroll updates ScrollTrigger so pins and scrubs never read a stale position.
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // A new page must not inherit a smooth scroll still gliding on the old one,
  // or it opens part-way down and its scroll triggers are measured mid-flight.
  // stop() + start() is Lenis's public way to drop the current animation;
  // skipped while something (like an open menu) has scrolling stopped.
  useLayoutEffect(() => {
    if (!lenis || lenis.isStopped) return;
    lenis.stop();
    lenis.start();
  }, [pathname]);

  // Same-page hash links glide to their section instead of jumping.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as HTMLElement).closest("a");
      if (!anchor) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname !== window.location.pathname || !url.hash) return;
      if (scrollToTarget(decodeURIComponent(url.hash))) {
        event.preventDefault();
        history.replaceState(null, "", url.hash);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Arriving from another page with a hash (e.g. /#consultation).
  useEffect(() => {
    if (!window.location.hash) return;
    const id = window.location.hash;
    const timer = window.setTimeout(() => scrollToTarget(id), 350);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}
