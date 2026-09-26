import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

// Stand-in photography: three of these are shot on the factory floor. Swap in
// styled room shots per size as they are photographed.
const sofas = [
  {
    name: "1 Seater",
    href: "/sofas#one-seater",
    line: "An armchair for reading corners, cabins and lounges.",
    image: "/hero/ergonomic-chair.jpg",
    alt: "Olive velvet armchair with a brass-trimmed side panel",
    focus: "38% 55%",
  },
  {
    name: "2 Seater",
    href: "/sofas#two-seater",
    line: "Compact comfort for smaller rooms and receptions.",
    image: "/sofas/showroom.jpg",
    alt: "Cream two- and three-seater sofas with tan cushions",
    focus: "70% 55%",
  },
  {
    name: "3 Seater",
    href: "/sofas#three-seater",
    line: "The centrepiece of the living room.",
    image: "/hero/sofa.jpg",
    alt: "Cognac leather three-seater sofa",
    focus: "20% 55%",
  },
  {
    name: "Lounge",
    href: "/sofas#lounge",
    line: "Low, deep seats for unhurried evenings.",
    image: "/hero/hero-1.png",
    alt: "Bouclé lounge chair with a slim steel leg",
    focus: "50% 50%",
  },
  {
    name: "Modular",
    href: "/sofas#modular",
    line: "Sections that reshape as the room changes.",
    image: "/hero/hero-2.png",
    alt: "Curved modular sofa arranged in a conversation circle",
    focus: "50% 50%",
  },
];

export function SofaCollection() {
  return (
    <section className="bg-ivory py-24 md:py-32" aria-labelledby="sofa-sizes-heading">
      <div className="page-x flex flex-wrap items-end justify-between gap-6">
        <div>
          <h2
            id="sofa-sizes-heading"
            className="type-h3 text-charcoal"
            data-reveal="lines"
          >
            Sofas, by the way you gather
          </h2>
          <p className="mt-3 text-[14px] text-slate" data-reveal="fade">
            From a single armchair to a room-sized modular.
          </p>
        </div>
        <Link
          href="/sofas"
          className="link-draw text-[13px] font-semibold text-navy"
          data-reveal="fade"
        >
          Explore all sofas
          <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
        </Link>
      </div>

      <div className="page-x mt-12">
        <ul className="sofa-accordion no-scrollbar" data-reveal="stagger">
          {sofas.map((sofa) => (
            <li key={sofa.name} className="sofa-panel">
              <Link href={sofa.href} className="absolute inset-0 block">
                <Image
                  src={sofa.image}
                  alt={sofa.alt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 78vw"
                  className="sofa-image object-cover"
                  style={{ objectPosition: sofa.focus }}
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(0deg,rgba(12,29,45,0.8)_0%,rgba(12,29,45,0.1)_50%,rgba(12,29,45,0)_100%)]"
                />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-7">
                  <span className="min-w-0">
                    <span className="block whitespace-nowrap font-heading text-[26px] leading-none text-ivory md:text-[30px]">
                      {sofa.name}
                    </span>
                    <span className="sofa-detail block max-w-[30ch] pt-3 text-[14px] leading-relaxed text-ivory/80">
                      {sofa.line}
                    </span>
                  </span>
                  <span className="sofa-detail flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ivory text-navy">
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-[12px] text-slate" data-reveal="fade">
          Several pieces photographed on our own factory floor, where every frame is built.
        </p>
      </div>
    </section>
  );
}
