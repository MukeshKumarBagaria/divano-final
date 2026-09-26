"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

// PLACEHOLDER CATALOGUE — product names and prices are stand-ins; replace
// with the live catalogue before launch.
const products = [
  { name: "Aurelia High Back Chair", category: "Ergonomic chairs", price: 24999, image: "/products/aurelia-executive.png", href: "/ergonomic-chairs/high-back-chairs", badge: "Bestseller" },
  { name: "Arden Visitor Chair", category: "Visitor chairs", price: 9750, image: "/products/arden-lounge.png", href: "/ergonomic-chairs/visitor-chairs", badge: "New arrival" },
  { name: "Nila Accent Chair", category: "Lounge seating", price: 12499, image: "/products/blue-accent-chair.png", href: "/sofas#one-seater", badge: "New arrival" },
  { name: "Elara Bentwood Chair", category: "Cafeteria chairs", price: 6900, image: "/products/elara-wood-chair.png", href: "/ergonomic-chairs/cafeteria-chairs" },
  { name: "Orion Executive Chair", category: "Ergonomic chairs", price: 18900, image: "/chairs/high-back-chair.jpg", href: "/ergonomic-chairs/high-back-chairs" },
  { name: "Vela Mesh Chair", category: "Ergonomic chairs", price: 11200, image: "/chairs/mid-back-chair.jpg", href: "/ergonomic-chairs/mid-back-chairs", badge: "Bestseller" },
  { name: "Strata Task Chair", category: "Ergonomic chairs", price: 8500, image: "/chairs/low-back-chair.jpg", href: "/ergonomic-chairs/low-back-chairs" },
  { name: "Cove Visitor Chair", category: "Visitor chairs", price: 9750, image: "/chairs/visitor-chair.jpg", href: "/ergonomic-chairs/visitor-chairs" },
  { name: "Pace Stacking Chair", category: "Cafeteria chairs", price: 6400, image: "/chairs/cafeteria-chair.jpg", href: "/ergonomic-chairs/cafeteria-chairs" },
];

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function FeaturedProducts() {
  const [emblaRef, embla] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [saved, setSaved] = useState<Set<string>>(() => new Set());
  const progressRef = useRef<HTMLSpanElement>(null);

  const sync = useCallback(() => {
    if (!embla) return;
    setCanPrev(embla.canScrollPrev());
    setCanNext(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    const onScroll = () => {
      const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${0.12 + progress * 0.88})`;
    };
    onScroll();
    embla.on("select", sync).on("reInit", sync).on("scroll", onScroll).on("reInit", onScroll);
    return () => {
      embla.off("select", sync).off("reInit", sync).off("scroll", onScroll).off("reInit", onScroll);
    };
  }, [embla, sync]);

  const toggleSaved = (name: string) =>
    setSaved((current) => {
      const next = new Set(current);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });

  return (
    <section id="featured" className="scroll-mt-24 bg-ivory pb-24 md:pb-36" aria-labelledby="featured-heading">
      <div className="page-x">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <h2 id="featured-heading" className="type-h2 text-charcoal" data-reveal="lines">
              Featured pieces
            </h2>
            <p className="mt-4 text-[15px] text-slate" data-reveal="fade">
              A few of the pieces our clients ask for most.
            </p>
          </div>
          <div className="flex items-center gap-6" data-reveal="fade">
            <span className="relative hidden h-px w-32 overflow-hidden bg-stone sm:block" aria-hidden>
              <span
                ref={progressRef}
                className="absolute inset-0 origin-left bg-navy transition-transform duration-300 ease-out"
                style={{ transform: "scaleX(0.12)" }}
              />
            </span>
            <div className="flex gap-2">
              <CarouselButton label="Previous pieces" disabled={!canPrev} onClick={() => embla?.scrollPrev()}>
                <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
              </CarouselButton>
              <CarouselButton label="Next pieces" disabled={!canNext} onClick={() => embla?.scrollNext()}>
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </CarouselButton>
            </div>
          </div>
        </div>

        <div className="mt-12 overflow-hidden md:mt-14" ref={emblaRef}>
          <ul className="-ml-4 flex touch-pan-y md:-ml-6" data-reveal="stagger">
            {products.map((product) => {
              const isSaved = saved.has(product.name);
              return (
                <li
                  key={product.name}
                  className="min-w-0 shrink-0 grow-0 basis-[78%] pl-4 sm:basis-[46%] md:basis-[33.333%] md:pl-6 lg:basis-[25%]"
                >
                  <article className="group relative">
                    <Link href={product.href} className="block">
                      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 78vw"
                          className="object-contain p-8 transition-[scale] duration-[1.2s] ease-out group-hover:scale-[1.05] md:p-10"
                        />
                        {product.badge ? (
                          <span className="absolute left-4 top-4 rounded-full border border-gold/60 bg-ivory px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7d6027]">
                            {product.badge}
                          </span>
                        ) : null}
                        <span className="absolute inset-x-4 bottom-4 flex h-11 translate-y-3 items-center justify-center rounded-full bg-navy text-[12.5px] font-semibold text-ivory opacity-0 transition-[opacity,translate] duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                          View details
                        </span>
                      </div>
                      <p className="mt-5 text-[12px] tracking-[0.02em] text-slate">{product.category}</p>
                      <h3 className="mt-1.5 font-heading text-[20px] leading-tight text-charcoal">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-[14px] font-semibold tabular-nums text-charcoal">
                        {inr.format(product.price)}
                      </p>
                    </Link>

                    <button
                      type="button"
                      onClick={() => toggleSaved(product.name)}
                      aria-pressed={isSaved}
                      aria-label={isSaved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-ivory/90 text-navy backdrop-blur transition-colors duration-300 hover:bg-ivory"
                    >
                      <motion.span
                        key={String(isSaved)}
                        initial={{ scale: isSaved ? 0.4 : 1 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 18 }}
                        className="flex"
                      >
                        <Heart
                          className={cn("h-[17px] w-[17px]", isSaved && "fill-navy")}
                          strokeWidth={1.5}
                        />
                      </motion.span>
                    </button>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

function CarouselButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-stone text-charcoal transition-[background-color,color,border-color,opacity] duration-300 hover:border-navy hover:bg-navy hover:text-ivory disabled:pointer-events-none disabled:opacity-35"
    >
      {children}
    </button>
  );
}
