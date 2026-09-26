import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const spaces = [
  {
    name: "Offices",
    promise: "Work better.",
    line: "Task seating, breakout lounges and phone booths for teams of every size.",
    image: "/contact-section-bg.png",
    alt: "Open-plan office with ergonomic chairs at the desks",
    focus: "12% 50%",
  },
  {
    name: "Homes",
    promise: "Live beautifully.",
    line: "Sofas and study chairs made for the rooms you spend the most time in.",
    image: "/images/hero-lifestyle.jpg",
    alt: "Living room with a linen sofa and walnut coffee table",
    focus: "72% 50%",
  },
  {
    name: "Hospitality",
    promise: "Welcome better.",
    line: "Lounge, dining and visitor seating for hotels, cafés and receptions.",
    image: "/hero/hero-3.png",
    alt: "Bouclé dining chairs around a round oak table",
    focus: "50% 50%",
  },
];

export function Applications() {
  return (
    <section className="bg-ivory py-24 md:py-36" aria-labelledby="applications-heading">
      <div className="page-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2
            id="applications-heading"
            className="type-h2 max-w-[12ch] text-charcoal"
            data-reveal="lines"
          >
            Designed for every space.
          </h2>
          <Link
            href="#consultation"
            className="link-draw text-[13px] font-semibold text-navy"
            data-reveal="fade"
          >
            Explore solutions
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>

        <ul className="mt-14 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-6 lg:gap-8">
          {spaces.map((space, index) => (
            <li key={space.name}>
              <Link href="#consultation" className="group block">
                <div
                  className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ivory-deep"
                  data-reveal="image"
                  data-reveal-delay={String(index * 0.12)}
                >
                  <div data-reveal-inner className="absolute inset-0">
                    <Image
                      src={space.image}
                      alt={space.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-[scale] duration-[1.4s] ease-out group-hover:scale-[1.06]"
                      style={{ objectPosition: space.focus }}
                    />
                  </div>
                </div>
                <div className="mt-6 flex items-baseline justify-between gap-4 border-b border-stone pb-5">
                  <h3 className="font-heading text-[28px] leading-none text-charcoal md:text-[32px]">
                    {space.name}
                  </h3>
                  <p className="font-heading text-[18px] italic text-slate transition-colors duration-500 group-hover:text-navy">
                    {space.promise}
                  </p>
                </div>
                <p className="mt-4 max-w-[34ch] text-[14px] leading-relaxed text-slate">
                  {space.line}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
