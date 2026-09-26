"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const ACCENT = "#C76A2D";

const filters = [
  "All",
  "L Shape Sofa",
  "Lounge Chairs",
  "1 Seater Sofas",
  "3+1+1 Sofa Sets",
  "Recliners",
] as const;

// PLACEHOLDER CATALOG — names and prices need replacing with real product data.
const arrivals = [
  {
    name: "Albus L-Shape 4 Seater Right Aligned Sofa (Leather, Cottage Ivory)",
    image: "/sofas/showroom.jpg",
    alt: "Cream four seater sofa set styled on a showroom floor",
    price: 54999,
    originalPrice: 82999,
  },
  {
    name: "Alvaro 3+1+1 Seater Sofa Set with Wooden Accents (Leather, Cognac Tan)",
    image: "/hero/sofa.jpg",
    alt: "Tan leather three piece sofa set on the factory floor",
    price: 112999,
    originalPrice: 173999,
  },
  {
    name: "Danon Lounge Chair (Bouclé, Beige Pomme)",
    image: "/hero/hero-1.png",
    alt: "Cream bouclé lounge chair with slim metal legs",
    price: 23989,
    originalPrice: 39822,
  },
  {
    name: "Lorenz 1 Seater Lounge Chair (Velvet, Olive Green)",
    image: "/hero/ergonomic-chair.jpg",
    alt: "Olive green velvet lounge chair with brass detailing",
    price: 26999,
    originalPrice: 53599,
  },
  {
    name: "Marcio Dining Chair, Set of 2 (Bouclé, Cocoa)",
    image: "/hero/hero-3.png",
    alt: "Two bouclé dining chairs around a round oak table",
    price: 18499,
    originalPrice: 28999,
  },
  {
    name: "Solo Acoustic Work Pod (Steel, Graphite)",
    image: "/booths/booth-5.jpg",
    alt: "Single occupancy acoustic work pod on an office floor",
    price: 185000,
    originalPrice: 245000,
  },
] as const;

function formatInr(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export function NewArrivals() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("All");

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="w-full py-12 md:py-16">
      <div className="mx-auto max-w-[1440px] px-6">
        <div className="relative overflow-hidden rounded-3xl bg-[#EDDDCA] p-6 md:p-10">
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
          >
            <defs>
              <pattern
                id="new-arrivals-diamonds"
                width="64"
                height="64"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <path
                  d="M0 0 H64 V64 H0 Z"
                  fill="none"
                  stroke="#E3CFB0"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#new-arrivals-diamonds)"
            />
          </svg>

          <div className="relative">
            <h2 className="font-heading text-[26px] leading-[1.1] tracking-[-0.01em] text-primary-text-dark md:text-[35px]">
              New Arrivals
            </h2>
            <p className="mt-2 font-sans text-base text-secondary-text-dark">
              Explore our collection of contemporary furniture and home
              accessories, crafted to enhance your living environment.
            </p>

            {/* Visual filter only — not wired to per-category inventory yet. */}
            <div className="mt-6 flex flex-wrap gap-3">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={activeFilter === filter}
                  style={
                    activeFilter === filter
                      ? { backgroundColor: ACCENT, borderColor: ACCENT }
                      : undefined
                  }
                  className={cn(
                    "rounded-full border px-6 py-2.5 font-sans text-[15px] transition-colors duration-150 ease",
                    activeFilter === filter
                      ? "text-primary-text-light"
                      : "border-borders-light bg-background-light text-primary-text-dark",
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="relative mt-6">
              <div ref={emblaRef} className="overflow-hidden">
                <div className="flex items-stretch gap-5">
                  {arrivals.map((item) => {
                    const discount = Math.round(
                      ((item.originalPrice - item.price) / item.originalPrice) *
                        100,
                    );
                    return (
                      <div
                        key={item.name}
                        className="flex-[0_0_84%] sm:flex-[0_0_48%] lg:flex-[0_0_calc((100%-3.75rem)/4)]"
                      >
                        <div className="flex h-full flex-col rounded-2xl bg-background-light p-3">
                          <div className="relative aspect-[9/8] overflow-hidden rounded-xl">
                            <Image
                              src={item.image}
                              alt={item.alt}
                              fill
                              sizes="(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 80vw"
                              className="object-cover"
                            />
                          </div>

                          <div className="flex flex-1 flex-col px-1 pb-2 pt-4">
                            <p className="font-sans text-[15px] leading-snug text-primary-text-dark">
                              {item.name}
                            </p>
                            <div className="mt-auto flex flex-wrap items-baseline gap-x-2.5 gap-y-1 pt-5">
                              <span className="font-sans text-xl font-bold text-primary-text-dark">
                                {formatInr(item.price)}
                              </span>
                              <span className="font-sans text-[15px] text-secondary-text-dark line-through">
                                {formatInr(item.originalPrice)}
                              </span>
                              <span className="font-sans text-[15px] font-medium text-[#46A046]">
                                {discount}% OFF
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                aria-label="Previous arrival"
                onClick={() => emblaApi?.scrollPrev()}
                disabled={!canScrollPrev}
                className="absolute left-3 top-1/2 hidden h-10 w-9 -translate-y-1/2 items-center justify-center rounded-lg bg-background-light text-primary-text-dark shadow-[0_2px_8px_rgba(28,20,12,0.16)] transition-opacity duration-150 ease disabled:pointer-events-none disabled:opacity-40 md:flex"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
              </button>
              <button
                type="button"
                aria-label="Next arrival"
                onClick={() => emblaApi?.scrollNext()}
                disabled={!canScrollNext}
                className="absolute right-3 top-1/2 hidden h-10 w-9 -translate-y-1/2 items-center justify-center rounded-lg bg-background-light text-primary-text-dark shadow-[0_2px_8px_rgba(28,20,12,0.16)] transition-opacity duration-150 ease disabled:pointer-events-none disabled:opacity-40 md:flex"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
              </button>
            </div>

            <Link
              href="/#products"
              style={{ color: ACCENT, borderColor: ACCENT }}
              className="mt-8 inline-flex rounded-full border px-8 py-3 font-sans text-base transition-colors duration-150 ease hover:bg-[#C76A2D] hover:text-primary-text-light"
            >
              View All
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
