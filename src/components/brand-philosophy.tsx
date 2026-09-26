import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BrandPhilosophy() {
  return (
    <section id="philosophy" className="scroll-mt-24 overflow-hidden bg-ivory pb-28 pt-16 md:pb-40 md:pt-28">
      <div className="page-x grid gap-32 lg:grid-cols-12 lg:items-center lg:gap-10">
        <figure className="relative lg:col-span-7">
          <div
            className="relative aspect-[5/4] overflow-hidden rounded-2xl bg-ivory-deep"
            data-reveal="image"
            data-reveal-from="left"
          >
            <div data-reveal-inner className="absolute inset-0">
              <div data-parallax="0.06" className="absolute inset-x-0 -bottom-[8%] -top-[8%]">
                <Image
                  src="/images/philosophy-img.jpg"
                  alt="A velvet chaise sofa, walnut phone booth and mesh task chair in a stone-walled room"
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Detail inset — drifts faster than the main photograph. */}
          <div
            data-parallax="0.22"
            className="absolute -bottom-14 right-4 w-[38%] md:-bottom-20 md:right-[-3%] md:w-[34%]"
          >
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-xl bg-ivory-deep ring-[6px] ring-ivory md:ring-[10px]"
              data-reveal="image"
              data-reveal-delay="0.35"
            >
              <div data-reveal-inner className="absolute inset-0">
                <Image
                  src="/hero/hero-1.png"
                  alt="Close view of hand-finished bouclé upholstery"
                  fill
                  sizes="(min-width: 1024px) 20vw, 38vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <figcaption
            className="mt-5 max-w-[55%] text-[12px] leading-relaxed text-slate md:max-w-[34ch]"
            data-reveal="fade"
          >
            Velvet chaise, walnut focus booth and mesh task chair, shown in a stone-walled
            residence.
          </figcaption>
        </figure>

        <div className="lg:col-span-4 lg:col-start-9">
          <p className="eyebrow" data-reveal="fade">
            The Divano Elegante philosophy
          </p>
          <h2 className="type-h2 mt-6 text-charcoal" data-reveal="lines">
            Designed around you.
          </h2>
          <div className="type-lead mt-8 space-y-5 text-slate" data-reveal="stagger">
            <p className="font-heading text-[21px] leading-snug text-charcoal md:text-[23px]">
              Furniture should do more than fill a room.
            </p>
            <p>
              It should support the way you work, relax, collaborate and connect. From ergonomic
              seating to private workspaces and refined sofas, every piece is designed with
              purpose.
            </p>
          </div>
          <Link
            href="/about"
            className="link-draw mt-10 text-[13px] font-semibold text-navy"
            data-reveal="fade"
          >
            Discover our story
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
