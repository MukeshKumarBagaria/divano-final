import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

const chairs = [
  {
    name: "Low Back Chair",
    image: "/chairs/low-back-chair.jpg",
    tagline: "Compact task seating",
    detail: "Pneumatic height adjust",
    price: "₹8,500",
    rating: "4.8",
    reviews: 42,
    badge: "Best seller",
  },
  {
    name: "Mid Back Chair",
    image: "/chairs/mid-back-chair.jpg",
    tagline: "Breathable mesh support",
    detail: "Flip-up armrests",
    price: "₹11,200",
    rating: "4.9",
    reviews: 67,
    badge: "Best seller",
  },
  {
    name: "High Back Chair",
    image: "/chairs/high-back-chair.jpg",
    tagline: "Executive lumbar recline",
    detail: "Headrest included",
    price: "₹18,900",
    rating: "5.0",
    reviews: 23,
    badge: null,
  },
  {
    name: "Cafeteria Chairs",
    image: "/chairs/cafeteria-chair.jpg",
    tagline: "Stackable canteen seating",
    detail: "Set of 4",
    price: "₹6,400",
    rating: "4.6",
    reviews: 85,
    badge: null,
  },
  {
    name: "Visitor Chairs",
    image: "/chairs/visitor-chair.jpg",
    tagline: "Cantilever guest seating",
    detail: "Set of 2",
    price: "₹9,750",
    rating: "4.7",
    reviews: 31,
    badge: null,
  },
];

export function ErgonomicSitting() {
  return (
    <section className="w-full bg-surface-light py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6">
        <h2 className="font-heading text-[30px] leading-[1.1] tracking-[-0.01em] text-primary-text-dark md:text-[39px]">
          Ergonomic Sitting
        </h2>
        <p className="mt-4 max-w-[46ch] font-sans text-base text-secondary-text-dark md:text-lg">
          Chairs shaped around the way you work, from quick desk sessions to
          full days in the boardroom.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 xl:grid-cols-5">
          {chairs.map((chair) => (
            <Link
              key={chair.name}
              href="/ergonomic-chairs"
              className="group block"
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-borders-light bg-background-light">
                <Image
                  src={chair.image}
                  alt={chair.name}
                  fill
                  sizes="(min-width: 1280px) 18vw, (min-width: 768px) 30vw, 45vw"
                  className="object-contain p-5 mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {chair.badge ? (
                  <span className="absolute left-4 top-4 rounded-full bg-background-light px-3 py-1.5 font-sans text-xs font-semibold text-primary-text-dark shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
                    {chair.badge}
                  </span>
                ) : null}
              </div>

              <div className="mt-4 flex items-start justify-between gap-3">
                <h3 className="font-sans text-base font-medium text-primary-text-dark">
                  {chair.name}
                </h3>
                <span className="flex shrink-0 items-center gap-1 font-sans text-sm text-primary-text-dark">
                  <Star className="h-3.5 w-3.5 fill-primary-text-dark" />
                  {chair.rating}
                  <span className="text-secondary-text-dark">
                    ({chair.reviews})
                  </span>
                </span>
              </div>

              <p className="mt-1 font-sans text-base text-secondary-text-dark">
                {chair.tagline}
              </p>
              <p className="font-sans text-base text-secondary-text-dark">
                {chair.detail}
              </p>
              <p className="mt-1 font-sans text-base text-primary-text-dark">
                <span className="font-semibold">{chair.price}</span> onwards
              </p>
            </Link>
          ))}
        </div>

        <Link
          href="/ergonomic-chairs"
          className="mt-12 inline-flex rounded-full border border-borders-light px-7 py-3 font-sans text-base font-semibold text-primary-text-dark transition-colors duration-150 ease hover:bg-background-light"
        >
          Explore more
        </Link>
      </div>
    </section>
  );
}
