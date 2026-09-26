import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { sofaSizes } from "@/lib/catalog";
import { enquiryHref } from "@/lib/format";
import { cn } from "@/lib/utils";

/** Each sofa size as an editorial spread, alternating sides down the page. */
export function SofaSizes() {
  return (
    <ol className="space-y-24 md:space-y-36">
      {sofaSizes.map((size, index) => {
        const flip = index % 2 === 1;
        return (
          <li
            key={size.id}
            id={size.id}
            className="grid scroll-mt-28 gap-10 lg:grid-cols-12 lg:items-center lg:gap-10"
          >
            <div className={cn("lg:col-span-7", flip && "lg:order-2 lg:col-start-6")}>
              <div
                className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ivory-deep"
                data-reveal="image"
                data-reveal-from={flip ? "right" : "left"}
              >
                <div data-reveal-inner className="absolute inset-0">
                  <div data-parallax="0.06" className="absolute inset-x-0 -bottom-[8%] -top-[8%]">
                    <Image
                      src={size.image.src}
                      alt={size.image.alt}
                      fill
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      className="object-cover"
                      style={size.focus ? { objectPosition: size.focus } : undefined}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={cn("lg:col-span-4", flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-9")}>
              <p className="text-[12px] font-semibold tabular-nums tracking-[0.1em] text-gold" data-reveal="fade">
                {String(index + 1).padStart(2, "0")}
                <span className="text-slate"> / {String(sofaSizes.length).padStart(2, "0")}</span>
              </p>
              <h3 className="type-h2 mt-5 text-charcoal" data-reveal="lines">
                {size.name}
              </h3>
              <div data-reveal="fade" data-reveal-delay="0.15">
                <p className="mt-4 font-heading text-[21px] italic leading-snug text-navy">{size.line}</p>
                <p className="mt-4 max-w-[40ch] text-[15px] leading-relaxed text-slate">{size.body}</p>
                <dl className="mt-8 grid grid-cols-2 border-y border-stone">
                  <div className="py-4 pr-4">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate">Typical width</dt>
                    <dd className="mt-1.5 text-[15px] tabular-nums text-charcoal">{size.width}</dd>
                  </div>
                  <div className="border-l border-stone py-4 pl-4">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate">Seats</dt>
                    <dd className="mt-1.5 text-[15px] tabular-nums text-charcoal">{size.seats}</dd>
                  </div>
                </dl>
                <Link
                  href={enquiryHref(`${size.name} sofa`)}
                  className="link-draw mt-8 text-[13px] font-semibold text-navy"
                >
                  Enquire about a {size.name.toLowerCase()}
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
