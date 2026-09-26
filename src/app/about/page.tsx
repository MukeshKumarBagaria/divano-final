import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page/page-hero";
import { ScrubText } from "@/components/page/scrub-text";
import { CraftSection } from "@/components/craft-section";
import { ConsultationBand } from "@/components/consultation-band";
import { OutlineLink, PillLink } from "@/components/ui/pill-link";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "Divano Elegante designs and builds ergonomic chairs, sofas and acoustic phone booths in its own factory in India. Our story, our craft and how we work with homes, offices and hospitality spaces.",
  path: "/about",
  image: {
    url: "/images/philosophy-img.jpg",
    width: 1200,
    height: 896,
    alt: "A velvet chaise, walnut phone booth and mesh task chair in a stone-walled room",
  },
});

const pillars = [
  { figure: "3", label: "worlds", body: "Ergonomic seating, sofas and acoustic workspaces, designed to live together." },
  { figure: "1", label: "factory", body: "Every piece is built on our own floor, from the frame to the final stitch." },
  { figure: "0", label: "resellers", body: "You buy directly from the people who build it, and talk to them after." },
];

const principles = [
  {
    title: "Comfort is engineered.",
    body: "Good seating is measured in hours. Posture, support and adjustment come first, and the styling follows.",
  },
  {
    title: "Made, not sourced.",
    body: "We build what we sell, so quality is something we control on our own floor rather than something we hope for.",
  },
  {
    title: "Built around the brief.",
    body: "Sizes, covers and finishes follow your space and your people, not the limits of a catalogue.",
  },
  {
    title: "Restraint lasts.",
    body: "Quiet design, honest materials and proportions that still look right long after the room around them has changed.",
  },
];

const process = [
  { title: "Consult", body: "We listen to how the space works: who sits where, for how long, and what it should feel like." },
  { title: "Specify", body: "Pieces, sizes, covers and mechanisms are chosen with you, with samples and drawings where they help." },
  { title: "Build", body: "Your order goes onto our factory floor as a specification and is built to it." },
  { title: "Deliver & install", body: "Our own team delivers, assembles and places every piece, from one chair to a full floor." },
  { title: "Stay in touch", body: "The people who built it stay a phone call away for anything you need afterwards." },
];

const gallery = [
  [
    { src: "/images/factory-craft.jpg", alt: "A craftsperson fitting a hardwood frame", ratio: "aspect-[4/5]" },
    { src: "/sofas/showroom.jpg", alt: "Cream sofas finished on the showroom floor", ratio: "aspect-[4/3]" },
  ],
  [
    { src: "/hero/sofa.jpg", alt: "Cognac leather sofas on the factory floor", ratio: "aspect-[4/3]" },
    { src: "/hero/ergonomic-chair.jpg", alt: "An olive velvet armchair in the workshop", ratio: "aspect-[4/5]" },
  ],
  [
    { src: "/images/factory-film-poster.jpg", alt: "The upholstery workshop with foam stock", ratio: "aspect-[4/5]" },
    { src: "/booths/booth-6.jpg", alt: "Two finished booths with stools and worktops", ratio: "aspect-[4/3]" },
  ],
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "About Us", path: "/about" }]}
        eyebrow="About Divano Elegante"
        title={["Your imagination,", "our creation."]}
        lead="We design and build ergonomic chairs, sofas and acoustic phone booths in our own factory, for the homes, offices and hospitality spaces of modern India."
        actions={
          <>
            <PillLink href="#story">Our story</PillLink>
            <OutlineLink href="/contact">Contact us</OutlineLink>
          </>
        }
        image={{
          src: "/images/philosophy-img.jpg",
          alt: "A velvet chaise sofa, walnut phone booth and mesh task chair in a stone-walled room",
          focus: "50% 55%",
        }}
      />

      {/* Story */}
      <section id="story" className="scroll-mt-24 bg-ivory py-24 md:py-40" aria-labelledby="story-heading">
        <div className="page-x">
          <div className="grid gap-10 lg:grid-cols-12">
            <h2 id="story-heading" className="eyebrow self-start lg:col-span-3 lg:mt-4" data-reveal="fade">
              Our story
            </h2>
            <ScrubText
              className="font-heading text-[28px] leading-[1.18] tracking-[-0.01em] text-charcoal md:text-[39px] lg:col-span-9 lg:text-[46px]"
              text="Divano Elegante is a manufacturer first. We build ergonomic chairs, sofas and acoustic phone booths ourselves, frame, foam, fabric and finish, on our own factory floor. It means the piece you approve is the piece that arrives, and the people who made it are only a phone call away."
            />
          </div>

          <ul className="mt-24 grid gap-12 border-t border-stone pt-14 md:mt-32 md:grid-cols-3 md:gap-8" data-reveal="stagger">
            {pillars.map((pillar) => (
              <li key={pillar.label}>
                <p className="flex items-baseline gap-3">
                  <span className="font-heading text-[82px] font-light leading-[0.8] text-navy lining-nums md:text-[102px]">
                    {pillar.figure}
                  </span>
                  <span className="font-heading text-[25px] italic text-gold md:text-[28px]">{pillar.label}</span>
                </p>
                <p className="mt-6 max-w-[30ch] text-[15px] leading-relaxed text-slate">{pillar.body}</p>
              </li>
            ))}
          </ul>

          <Link href="/collections" className="link-draw mt-14 text-[13px] font-semibold text-navy" data-reveal="fade">
            Explore the collection
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      <CraftSection />

      {/* Principles */}
      <section className="bg-ivory py-24 md:py-40" aria-labelledby="principles-heading">
        <div className="page-x grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow" data-reveal="fade">
                What we believe
              </p>
              <h2 id="principles-heading" className="type-h2 mt-6 max-w-[11ch] text-charcoal" data-reveal="lines">
                Four things we don’t compromise on.
              </h2>
            </div>
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {principles.map((principle, index) => (
              <li
                key={principle.title}
                className="grid grid-cols-[auto_1fr] gap-x-6 border-t border-stone py-10 last:border-b md:gap-x-10 md:py-14"
                data-reveal="fade"
              >
                <span className="font-heading text-[48px] font-light leading-[0.85] text-gold lining-nums tabular-nums md:text-[68px]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-heading text-[26px] leading-tight text-charcoal md:text-[35px]">{principle.title}</h3>
                  <p className="mt-4 max-w-[44ch] text-[15.5px] leading-relaxed text-slate">{principle.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Process */}
      <section className="relative overflow-hidden bg-navy-deep py-24 text-ivory md:py-36" aria-labelledby="process-heading">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(198,161,91,0.14)_0%,rgba(198,161,91,0)_65%)]"
        />
        <div className="page-x relative">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow" data-reveal="fade">
                How we work
              </p>
              <h2 id="process-heading" className="type-h2 mt-6 max-w-[12ch] text-ivory" data-reveal="lines">
                From first call to final placement.
              </h2>
            </div>
            <p className="type-lead max-w-[40ch] text-ivory/65 lg:col-span-4 lg:col-start-9" data-reveal="fade">
              One team from the first conversation to the day it is installed, whether that is a
              single armchair or a whole floor.
            </p>
          </div>

          <div className="relative mt-20 md:mt-28">
            <span aria-hidden data-draw className="absolute left-0 right-0 top-[5px] hidden h-px bg-ivory/20 lg:block" />
            <ol className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8" data-reveal="stagger" data-reveal-delay="0.3">
              {process.map((step, index) => (
                <li key={step.title} className="relative">
                  <span aria-hidden className="block h-[11px] w-[11px] rotate-45 border border-gold bg-navy-deep" />
                  <p className="mt-8 text-[12px] font-semibold tabular-nums tracking-[0.1em] text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-heading text-[25px] leading-tight text-ivory md:text-[26px]">{step.title}</h3>
                  <p className="mt-3 max-w-[30ch] text-[14px] leading-relaxed text-ivory/60">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Workshop gallery */}
      <section className="overflow-hidden bg-ivory py-24 md:py-36" aria-labelledby="workshop-heading">
        <div className="page-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="workshop-heading" className="type-h2 max-w-[12ch] text-charcoal" data-reveal="lines">
              Inside the workshop.
            </h2>
            <p className="max-w-[36ch] text-[14px] leading-relaxed text-slate" data-reveal="fade">
              Frames, foam, fabric and finished pieces, photographed where they are made.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-4 md:mt-20 md:grid-cols-3 md:gap-6">
            {gallery.map((column, columnIndex) => (
              <div
                key={columnIndex}
                className={columnIndex === 2 ? "hidden md:block" : undefined}
              >
                <div
                  data-parallax={columnIndex === 1 ? "-0.06" : "0.06"}
                  className="space-y-4 md:space-y-6"
                >
                  {column.map((shot) => (
                    <div
                      key={shot.src}
                      className={`relative ${shot.ratio} overflow-hidden rounded-2xl bg-ivory-deep`}
                      data-reveal="image"
                      data-reveal-delay={String(columnIndex * 0.12)}
                    >
                      <div data-reveal-inner className="absolute inset-0">
                        <Image src={shot.src} alt={shot.alt} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ConsultationBand />
    </>
  );
}
