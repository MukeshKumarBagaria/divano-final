import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type WorldKey = "chairs" | "sofas" | "booths";

const worlds: Record<WorldKey, { title: string; line: string; image: string; alt: string; href: string; focus?: string }> = {
  chairs: {
    title: "Ergonomic Chairs",
    line: "Comfort engineered for the way you work.",
    image: "/images/cat-chairs.jpg",
    alt: "Mesh ergonomic chair at an oak desk beside tall windows",
    href: "/ergonomic-chairs",
    focus: "42% 50%",
  },
  sofas: {
    title: "Sofas",
    line: "Crafted for conversation, comfort and connection.",
    image: "/images/cat-sofas.jpg",
    alt: "Deep linen sofa facing floor-to-ceiling windows",
    href: "/sofas",
    focus: "40% 60%",
  },
  booths: {
    title: "Phone Booths",
    line: "Private spaces for focused work.",
    image: "/images/cat-booths.jpg",
    alt: "Acoustic booth glowing with warm light in a navy office",
    href: "/phone-booths",
    focus: "68% 50%",
  },
};

/** Cross-links to the other two worlds at the foot of a category page. */
export function RelatedWorlds({ exclude }: { exclude: WorldKey }) {
  const others = (Object.keys(worlds) as WorldKey[]).filter((key) => key !== exclude);
  return (
    <section className="bg-ivory pb-24 md:pb-36" aria-labelledby="related-heading">
      <div className="page-x">
        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-hairline pt-16 md:pt-24">
          <h2 id="related-heading" className="type-h3 text-charcoal" data-reveal="lines">
            Continue exploring
          </h2>
          <p className="text-[14px] text-slate" data-reveal="fade">
            One brand, three worlds of comfort.
          </p>
        </div>
        <ul className="mt-10 grid gap-5 md:mt-14 md:grid-cols-2 md:gap-6">
          {others.map((key, index) => {
            const world = worlds[key];
            return (
              <li key={key}>
                <Link
                  href={world.href}
                  className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-navy md:aspect-[16/11]"
                  data-reveal="image"
                  data-reveal-delay={String(index * 0.12)}
                >
                  <div data-reveal-inner className="absolute inset-0">
                    <Image
                      src={world.image}
                      alt={world.alt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-[scale] duration-[1.4s] ease-out group-hover:scale-[1.06]"
                      style={world.focus ? { objectPosition: world.focus } : undefined}
                    />
                  </div>
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(0deg,rgba(12,29,45,0.8)_0%,rgba(12,29,45,0.15)_50%,rgba(12,29,45,0)_75%)]"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-7 md:p-9">
                    <div>
                      <h3 className="font-heading text-[30px] leading-none text-ivory md:text-[37px]">{world.title}</h3>
                      <p className="mt-3 max-w-[30ch] text-[14px] leading-relaxed text-ivory/80">{world.line}</p>
                    </div>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ivory/30 text-ivory transition-[background-color,color,border-color,rotate] duration-500 ease-out group-hover:rotate-45 group-hover:border-ivory group-hover:bg-ivory group-hover:text-navy">
                      <ArrowUpRight className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
