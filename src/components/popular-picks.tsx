import Image from "next/image";
import Link from "next/link";

// PLACEHOLDER — every card shows the same render until per-category cutouts exist.
const PLACEHOLDER_IMAGE = "/booths/phonebooth.png";

const picks = [
  { name: "Ergonomic Chairs", price: "₹8,500", href: "/ergonomic-chairs" },
  { name: "Sofas", price: "₹34,900", href: "/sofas" },
  { name: "Phone Booths", price: "₹1,85,000", href: "/phone-booths" },
  { name: "Cafeteria Chairs", price: "₹6,400", href: "/ergonomic-chairs" },
  { name: "Visitor Chairs", price: "₹9,750", href: "/ergonomic-chairs" },
  { name: "Lounge Seating", price: "₹24,500", href: "/sofas" },
];

export function PopularPicks() {
  return (
    <section className="w-full bg-background-light py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6">
        <h2 className="font-heading text-[30px] leading-[1.1] tracking-[-0.01em] text-primary-text-dark md:text-[39px]">
          Popular Picks
        </h2>
        <p className="mt-4 font-sans text-base text-secondary-text-dark md:text-lg">
          Explore our most loved products
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {picks.map((pick) => (
            <Link key={pick.name} href={pick.href} className="group block pt-32">
              <div className="relative h-[240px] rounded-2xl bg-[#F0F3FF]">
                <div className="absolute inset-x-4 -top-32 h-[210px] transition-transform duration-500 ease group-hover:-translate-y-2.5 motion-reduce:group-hover:translate-y-0">
                  <Image
                    src={PLACEHOLDER_IMAGE}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 220px, (min-width: 768px) 30vw, 45vw"
                    className="object-contain object-bottom"
                  />
                </div>

                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 rounded-b-2xl opacity-0 transition-opacity duration-500 ease group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(65% 100% at 50% 100%, rgba(30, 58, 95, 0.12), transparent 72%)",
                  }}
                />

                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                  <p className="font-sans text-lg font-semibold text-primary-text-dark">
                    {pick.name}
                  </p>
                  <p className="mt-0.5 whitespace-nowrap font-sans text-xs text-secondary-text-dark md:text-sm">
                    Starting at {pick.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
