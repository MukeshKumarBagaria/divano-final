import type { Metadata } from "next";
import { PageHero } from "@/components/page/page-hero";
import { SectionHeader } from "@/components/page/section-header";
import { AnatomyExplorer, type AnatomyPoint } from "@/components/page/anatomy-explorer";
import { FaqSection } from "@/components/page/faq-section";
import { RelatedWorlds } from "@/components/page/related-worlds";
import { ChairRangeGrid } from "@/components/chairs/chair-range-grid";
import { ChairCompare } from "@/components/chairs/chair-compare";
import { ChairFinishes } from "@/components/chairs/chair-finishes";
import { ChairFinder } from "@/components/chair-finder";
import { ConsultationBand } from "@/components/consultation-band";
import { JsonLd } from "@/components/json-ld";
import { OutlineLink, PillLink } from "@/components/ui/pill-link";
import { chairHref, chairTypes } from "@/lib/catalog";
import { itemListJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Ergonomic Office Chairs",
  description:
    "Ergonomic office chairs in five back heights: low back, mid back, high back, cafeteria and visitor chairs. Built to order in our own factory for offices and homes across India.",
  path: "/ergonomic-chairs",
  keywords: [
    "ergonomic office chairs",
    "office chairs India",
    "mesh chairs",
    "executive chairs",
    "cafeteria chairs",
    "visitor chairs",
  ],
  image: {
    url: "/hero/hero-ergonomic-chairs.png",
    width: 1821,
    height: 864,
    alt: "The five Divano Elegante chair types lined up in a sunlit office",
  },
});

const anatomy: AnatomyPoint[] = [
  {
    id: "headrest",
    label: "Adjustable headrest",
    body: "Takes the weight of your head when you lean back, and slides to meet your neck rather than the other way round.",
    x: 62,
    y: 13,
  },
  {
    id: "lumbar",
    label: "Lumbar support",
    body: "Holds the natural curve of the lower spine, the first thing to tire over a long day at the desk.",
    x: 55,
    y: 46,
  },
  {
    id: "arms",
    label: "3D armrests",
    body: "Up, down, in, out and angled, so your shoulders stay relaxed while you type.",
    x: 36,
    y: 45.5,
  },
  {
    id: "seat",
    label: "Contoured seat",
    body: "Moulded foam with a rounded front edge that eases pressure behind the knees.",
    x: 34,
    y: 59,
  },
  {
    id: "mechanism",
    label: "Synchro mechanism",
    body: "Seat and back recline together at a steady ratio, with a lock for upright, focused work.",
    x: 53,
    y: 64,
  },
  {
    id: "base",
    label: "Base and castors",
    body: "A five-star base on smooth-rolling castors, in nylon, chrome or polished aluminium.",
    x: 51,
    y: 84,
  },
];

const faqs = [
  {
    q: "How do I choose the right ergonomic chair?",
    a: "Start with how long you sit and where. Mid back chairs suit full days at a desk, high back chairs suit long hours and reclining, low back chairs suit shared desks, cafeteria chairs suit dining and breakout spaces, and visitor chairs suit receptions and meeting rooms. The chair finder on this page narrows it down in one step.",
  },
  {
    q: "Do you make chairs for home offices as well as companies?",
    a: "Yes. We supply single chairs for home offices as well as full-floor orders for companies, co-working spaces and institutions.",
  },
  {
    q: "Can I customise the fabric, colour or armrests?",
    a: "Yes. Chairs are built to order, so upholstery, frame finish and armrest type can be specified. Some combinations affect the lead time, which we confirm with your quote.",
  },
  {
    q: "Do you offer pricing for bulk and corporate orders?",
    a: "Yes. Pricing for larger orders depends on quantity and specification. Share your requirements and we will send a detailed quote.",
  },
  {
    q: "Do you deliver across India?",
    a: "Yes, we deliver across India. The delivery date, and installation where it is needed, are confirmed when you place your order.",
  },
];

export default function ErgonomicChairsPage() {
  return (
    <>
      <JsonLd
        data={itemListJsonLd(
          "Ergonomic chairs",
          chairTypes.map((type) => ({ name: type.name, path: chairHref(type.slug), image: type.image.src })),
        )}
      />

      <PageHero
        crumbs={[{ name: "Ergonomic Chairs", path: "/ergonomic-chairs" }]}
        eyebrow="Ergonomic office chairs"
        title={["Chairs measured", "by the hours you sit."]}
        lead="Five back heights, one factory. Every chair is specified to the fabric, mechanism and arms your space needs, then built on our own floor."
        actions={
          <>
            <PillLink href="#chair-finder">Find your chair</PillLink>
            <OutlineLink href="#consultation">Request a quote</OutlineLink>
          </>
        }
        image={{
          src: "/hero/hero-ergonomic-chairs.png",
          alt: "Low back, mid back, high back, cafeteria and visitor chairs lined up in a sunlit office",
          focus: "50% 50%",
        }}
        index={chairTypes.map((type) => ({ label: type.short, href: chairHref(type.slug) }))}
        indexLabel="Chair types"
      />

      <section className="bg-ivory py-24 md:py-36" aria-labelledby="range-heading">
        <div className="page-x">
          <SectionHeader
            id="range-heading"
            eyebrow="The range"
            title="Five back heights, one standard."
            lead="Back height changes how a chair feels over eight hours, so it is how we organise the range. Start with how the chair will be used."
          />
          <div className="mt-16 md:mt-20">
            <ChairRangeGrid />
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-ivory-deep py-24 md:py-36" aria-labelledby="anatomy-heading">
        <div className="page-x">
          <AnatomyExplorer
            image={{
              src: "/images/chair-high.jpg",
              alt: "High back ergonomic chair with a headrest, mesh lumbar panel, 3D arms and an aluminium base",
              w: 1024,
              h: 1024,
            }}
            points={anatomy}
            heading={
              <>
                <p className="eyebrow" data-reveal="fade">
                  Anatomy of a good chair
                </p>
                <h2 id="anatomy-heading" className="type-h2 mt-6 max-w-[11ch] text-charcoal" data-reveal="lines">
                  What actually adjusts.
                </h2>
              </>
            }
          />
        </div>
      </section>

      <section className="bg-ivory py-24 md:py-36" aria-labelledby="compare-heading">
        <div className="page-x">
          <SectionHeader
            id="compare-heading"
            eyebrow="Side by side"
            title="Which chair, where?"
            lead="The same factory standard across the range, tuned to very different jobs."
          />
          <div className="mt-14 md:mt-16">
            <ChairCompare />
          </div>
        </div>
      </section>

      <section
        className="relative overflow-hidden bg-navy-deep py-24 text-ivory md:py-36"
        aria-labelledby="finishes-heading"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 -top-40 h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(198,161,91,0.14)_0%,rgba(198,161,91,0)_65%)]"
        />
        <div className="page-x relative">
          <SectionHeader
            id="finishes-heading"
            tone="light"
            eyebrow="Made to your specification"
            title="Specify it your way."
            titleClassName="max-w-[11ch]"
            lead="Every chair is built to order, so the upholstery, the frame and the arms are yours to choose."
          />
          <span aria-hidden data-draw className="mt-16 block h-px w-full bg-ivory/12 md:mt-20" />
          <div className="mt-14">
            <ChairFinishes />
          </div>
        </div>
      </section>

      <ChairFinder />

      <FaqSection faqs={faqs} className="bg-ivory-deep" />

      <RelatedWorlds exclude="chairs" />

      <ConsultationBand
        heading="Seating a whole floor?"
        lead="Tell us the headcount and how the space is used. We will recommend a mix, arrange samples to sit on and send a quote."
        interest="Ergonomic chairs"
      />
    </>
  );
}
