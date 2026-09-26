import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const worlds = [
  {
    title: "Ergonomic Chairs",
    line: "Comfort engineered for the way you work.",
    image: "/images/cat-chairs.jpg",
    alt: "Mesh ergonomic chair at an oak desk beside tall windows",
    focus: "42% 50%",
    href: "/ergonomic-chairs",
  },
  {
    title: "Sofas",
    line: "Crafted for conversation, comfort and connection.",
    image: "/hero/hero-2.png",
    alt: "Curved modular sofa arranged around a low table in a stone interior",
    href: "/sofas",
  },
  {
    title: "Phone Booths",
    line: "Private spaces for focused work.",
    image: "/images/cat-booths.jpg",
    alt: "Acoustic booth glowing with warm light in a navy office",
    href: "/phone-booths",
    focus: "68% 50%",
  },
];

export function ThreeWorlds() {
  return (
    <section id="collection" className="scroll-mt-24 bg-ivory py-24 md:py-36">
      <div className="page-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow" data-reveal="fade">
              The Divano Elegante collection
            </p>
            <h2 className="type-h2 mt-6 max-w-[14ch] text-charcoal" data-reveal="lines">
              Designed for every kind of space.
            </h2>
          </div>
          <p
            className="type-lead max-w-[38ch] text-slate lg:col-span-4 lg:col-start-9"
            data-reveal="fade"
            data-reveal-delay="0.15"
          >
            Three specialised worlds of furniture, each one designed, built and finished on our
            own factory floor.
          </p>
        </div>

        <ul className="mt-16 grid gap-5 md:mt-20 md:grid-cols-3 md:gap-6 lg:gap-8">
          {worlds.map((world, index) => (
            <li key={world.title} className={cn(index === 1 && "md:translate-y-16")}>
              <Link
                href={world.href}
                className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-navy md:aspect-[3/4]"
                data-reveal="image"
                data-reveal-delay={String(index * 0.12)}
              >
                <div data-reveal-inner className="absolute inset-0">
                  <Image
                    src={world.image}
                    alt={world.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-[scale] duration-[1.4s] ease-out group-hover:scale-[1.06]"
                    style={world.focus ? { objectPosition: world.focus } : undefined}
                  />
                </div>
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(0deg,rgba(12,29,45,0.82)_0%,rgba(12,29,45,0.2)_45%,rgba(12,29,45,0)_70%)] transition-opacity duration-700 group-hover:opacity-90"
                />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-7 md:p-8">
                  <div>
                    <h3 className="font-heading text-[30px] leading-none tracking-[-0.01em] text-ivory md:text-[33px]">
                      {world.title}
                    </h3>
                    {/* The one-liner opens up on hover; always shown on touch. */}
                    <div className="grid transition-[grid-template-rows] duration-700 ease-out [grid-template-rows:1fr] md:[grid-template-rows:0fr] md:group-hover:[grid-template-rows:1fr] md:group-focus-visible:[grid-template-rows:1fr]">
                      <p className="overflow-hidden">
                        <span className="block max-w-[26ch] pt-3 text-[14px] leading-relaxed text-ivory/80">
                          {world.line}
                        </span>
                      </p>
                    </div>
                    <span className="mt-5 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-ivory">
                      Explore
                      <span className="block h-px w-6 bg-gold transition-[width] duration-700 ease-out group-hover:w-12" />
                    </span>
                  </div>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ivory/30 text-ivory transition-[background-color,color,border-color,rotate] duration-500 ease-out group-hover:rotate-45 group-hover:border-ivory group-hover:bg-ivory group-hover:text-navy">
                    <ArrowUpRight className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
