import Image from "next/image";
import Link from "next/link";

// PLACEHOLDER OFFER — confirm the discount, eligible pieces and dates before
// this campaign goes live.
const offer = {
  title: "The Festive Edit",
  headline: "A refined collection for spaces worth celebrating.",
  discount: "10%",
  terms: "On selected sofas and lounge seating, for a limited time.",
  href: "/sofas",
};

/** The seasonal campaign, set like a print advertisement rather than a sale banner. */
export function PromoBanner() {
  return (
    <section
      id="festive-offer"
      className="relative scroll-mt-24 overflow-hidden bg-navy-deep text-ivory"
      aria-labelledby="festive-heading"
    >
      <div className="absolute inset-0">
        <div data-parallax="0.1" className="absolute inset-x-0 -bottom-[12%] -top-[12%]">
          <Image
            src="/images/festive-banner.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "50% 60%" }}
          />
        </div>
        <div aria-hidden className="absolute inset-0 bg-navy-deep/70" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(12,29,45,0)_0%,rgba(12,29,45,0.55)_75%)]"
        />
      </div>

      <div className="page-x relative flex min-h-[88svh] flex-col items-center justify-center py-24 text-center">
        <p
          className="flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold"
          data-reveal="fade"
        >
          <span aria-hidden data-draw className="block h-px w-10 bg-gold" />
          {offer.title}
          <span aria-hidden data-draw className="block h-px w-10 bg-gold" />
        </p>

        <h2
          id="festive-heading"
          className="type-h3 mt-8 max-w-[20ch] text-ivory md:text-[44px]"
          data-reveal="lines"
        >
          {offer.headline}
        </h2>

        <div className="mt-12 flex flex-col items-center">
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.3em] text-ivory/70"
            data-reveal="fade"
            data-reveal-delay="0.2"
          >
            Up to
          </span>
          <span
            className="font-heading text-[clamp(6rem,14vw,12.5rem)] leading-[0.9] tracking-[-0.03em] text-ivory lining-nums"
            data-reveal="lines"
            data-reveal-delay="0.25"
          >
            {offer.discount}
          </span>
          <span
            className="font-heading text-[26px] italic leading-none text-gold md:text-[32px]"
            data-reveal="fade"
            data-reveal-delay="0.45"
          >
            off
          </span>
        </div>

        <div className="mt-12 flex flex-col items-center" data-reveal="fade" data-reveal-delay="0.5">
          <Link
            href={offer.href}
            className="inline-flex h-[52px] items-center rounded-full border border-ivory/40 px-9 text-[12px] font-semibold uppercase tracking-[0.2em] text-ivory transition-colors duration-500 hover:border-ivory hover:bg-ivory hover:text-navy"
          >
            Explore the offer
          </Link>
          <p className="mt-6 text-[12px] text-ivory/55">{offer.terms}</p>
        </div>
      </div>
    </section>
  );
}
