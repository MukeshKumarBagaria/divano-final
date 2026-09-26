import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { chairHref, chairTypes } from "@/lib/catalog";
import { cn } from "@/lib/utils";

/** The five chair types as an editorial grid: two large, three small. */
export function ChairRangeGrid() {
  return (
    <ul className="grid gap-x-5 gap-y-12 md:grid-cols-2 md:gap-x-6 lg:grid-cols-6 lg:gap-y-16">
      {chairTypes.map((type, index) => {
        const large = index < 2;
        return (
          <li
            key={type.slug}
            className={cn(large ? "lg:col-span-3" : "lg:col-span-2", index === 4 && "md:col-span-2 lg:col-span-2")}
          >
            <Link href={chairHref(type.slug)} className="group block">
              <div
                className={cn(
                  "relative overflow-hidden rounded-2xl bg-[#ecebe8]",
                  large ? "aspect-[5/4]" : "aspect-square",
                  index === 4 && "md:aspect-[16/9] lg:aspect-square",
                )}
                data-reveal="image"
                data-reveal-delay={String((index % 3) * 0.1)}
              >
                <div data-reveal-inner className="absolute inset-0">
                  <Image
                    src={type.image.src}
                    alt={type.image.alt}
                    fill
                    sizes={large ? "(min-width: 1024px) 48vw, (min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 32vw, (min-width: 768px) 50vw, 100vw"}
                    className="object-cover transition-[scale] duration-[1.4s] ease-out group-hover:scale-[1.05]"
                  />
                </div>
                <span className="absolute left-4 top-4 rounded-full bg-ivory/90 px-3 py-1 text-[11px] font-semibold tabular-nums tracking-[0.12em] text-navy backdrop-blur md:left-5 md:top-5">
                  {type.index}
                </span>
                <span className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-navy text-ivory opacity-0 transition-[opacity,rotate] duration-500 ease-out group-hover:rotate-45 group-hover:opacity-100 md:right-5 md:top-5">
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                </span>
              </div>
              <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-stone pb-5">
                <h3 className="font-heading text-[26px] leading-none text-charcoal md:text-[32px]">{type.name}</h3>
                <span className="text-[12px] tabular-nums text-slate">Back height {type.backHeight}</span>
              </div>
              <p className="mt-4 flex items-center gap-3 text-[14px] text-slate">
                <span aria-hidden className="block h-px w-5 bg-gold transition-[width] duration-700 ease-out group-hover:w-10" />
                {type.note}
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
