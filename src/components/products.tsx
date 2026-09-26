"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const variantFilters = [
  "none",
  "sepia(0.55) saturate(2.4) hue-rotate(330deg)",
  "grayscale(1) brightness(1.15)",
];

const products = [
  { name: "Aurelia Executive", image: "/products/aurelia-executive.png" },
  { name: "Arden Lounge", image: "/products/arden-lounge.png" },
  { name: "Elara Wood Chair", image: "/products/elara-wood-chair.png" },
];

export function Products() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

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
    <section id="products" className="w-full scroll-mt-24 bg-background-light py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-[46ch]">
            <h2 className="font-heading text-[30px] leading-[1.1] tracking-[-0.01em] text-primary-text-dark md:text-[39px]">
              Signature pieces
            </h2>
            <p className="mt-4 font-sans text-base text-secondary-text-dark md:text-lg">
              Upholstered to order in the fabric, leather and finish you
              specify.
            </p>
          </div>

          <div className="hidden shrink-0 gap-2 md:flex">
            <button
              type="button"
              aria-label="Previous product"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-borders-light text-primary-text-dark transition-colors duration-150 ease hover:bg-surface-light disabled:opacity-30"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              aria-label="Next product"
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canScrollNext}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-borders-light text-primary-text-dark transition-colors duration-150 ease hover:bg-surface-light disabled:opacity-30"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="mt-12 md:mt-16">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-5 md:gap-6">
              {products.map((product) => (
                <div
                  key={product.name}
                  className="flex-[0_0_82%] sm:flex-[0_0_48%] lg:flex-[0_0_calc((100%-3rem)/3)]"
                >
                  <div className="rounded-2xl bg-surface-light px-6 pb-8 pt-10">
                    <div className="relative aspect-[4/5]">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(min-width: 768px) 25vw, 80vw"
                        className="object-contain mix-blend-multiply"
                      />
                    </div>

                    <p className="mt-6 text-center font-sans text-base font-medium text-secondary-text-dark">
                      {product.name}
                    </p>

                    <div className="mt-5 flex justify-center gap-4">
                      {variantFilters.map((filter, index) => (
                        <button
                          key={filter}
                          type="button"
                          aria-label={`${product.name} colour ${index + 1}`}
                          className="relative h-12 w-12 overflow-hidden rounded-full bg-borders-light transition-shadow duration-150 ease hover:shadow-[0_0_0_1px_var(--borders-light)]"
                        >
                          <Image
                            src={product.image}
                            alt=""
                            fill
                            sizes="48px"
                            style={{ filter }}
                            className="scale-90 object-contain mix-blend-multiply"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
