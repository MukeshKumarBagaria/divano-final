import type { Metadata } from "next";
import { BoothHero } from "@/components/booths/booth-hero";
import { FootprintPlanner } from "@/components/booths/footprint-planner";
import { BoothBento } from "@/components/booth-bento";
import { AnatomyExplorer, type AnatomyPoint } from "@/components/page/anatomy-explorer";
import { FaqSection } from "@/components/page/faq-section";
import { RelatedWorlds } from "@/components/page/related-worlds";
import { ConsultationBand } from "@/components/consultation-band";
import { JsonLd } from "@/components/json-ld";
import { boothSizes } from "@/lib/catalog";
import { itemListJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Acoustic Phone Booths & Office Pods",
  description:
    "Acoustic phone booths and meeting pods for open-plan offices: solo, duo, four-person and custom multi-bay booths, built in our own factory and installed across India by Divano Elegante.",
  path: "/phone-booths",
  keywords: [
    "office phone booth",
    "acoustic pod India",
    "meeting pod",
    "soundproof booth for office",
    "focus pod",
  ],
  image: {
    url: "/hero/hero-phonebooth.png",
    width: 1820,
    height: 864,
    alt: "Black, blue and yellow acoustic phone booths along an office floor",
  },
});

const anatomy: AnatomyPoint[] = [
  {
    id: "light",
    label: "Warm, even light",
    body: "An overhead light and a warm LED line keep faces well lit on video calls, without glare.",
    x: 53,
    y: 18,
  },
  {
    id: "panels",
    label: "Acoustic felt lining",
    body: "Felt-lined walls soak up voices, so your call stays inside and the open floor stays outside.",
    x: 33,
    y: 32,
  },
  {
    id: "door",
    label: "Full-height glass door",
    body: "A sealed glass door keeps the booth private without making it feel closed in.",
    x: 57.5,
    y: 47,
  },
  {
    id: "desk",
    label: "Worktop with power",
    body: "A solid worktop with power points for a laptop, a phone and a notebook.",
    x: 50,
    y: 55.5,
  },
  {
    id: "air",
    label: "Quiet ventilation",
    body: "Fans draw fresh air through the side vents, so the booth stays comfortable on long calls.",
    x: 68,
    y: 42,
  },
];

const faqs = [
  {
    q: "How private is a phone booth?",
    a: "Booths are lined with acoustic panels and closed with a sealed glass door, which keeps conversations private and cuts distraction from the open floor. If you need a particular level of acoustic performance, tell us and we will advise on the right build.",
  },
  {
    q: "Does a booth need to be fixed to the floor or walls?",
    a: "No. Booths are freestanding, so they can be relocated when your floor plan changes.",
  },
  {
    q: "What does a booth need on site?",
    a: "Floor space for the footprint plus room for the door to open, and a power point nearby for the light, ventilation and sockets. We confirm the requirements with you before installation.",
  },
  {
    q: "How is a booth delivered and installed?",
    a: "Booths arrive in panels and are assembled on site by our team. Timing depends on the size and number of booths, and we agree an installation slot with you in advance.",
  },
  {
    q: "Can booths be made in our brand colours or to a custom size?",
    a: "Yes. Shell colour, interior finish and fabrics can be specified, and multi-bay or one-off sizes are built to a drawing of your space.",
  },
];

export default function PhoneBoothsPage() {
  return (
    <>
      <JsonLd
        data={itemListJsonLd(
          "Phone booths",
          boothSizes.map((size) => ({ name: `${size.name} phone booth`, path: `/phone-booths#${size.id}`, image: size.image.src })),
        )}
      />

      <BoothHero />

      <section id="sizes" className="scroll-mt-24 bg-ivory py-24 md:py-36" aria-labelledby="sizes-heading">
        <div className="page-x">
          <FootprintPlanner />
        </div>
      </section>

      <section
        className="relative overflow-hidden bg-navy-deep py-24 text-ivory md:py-36"
        aria-labelledby="inside-heading"
      >
        <div className="page-x">
          <AnatomyExplorer
            tone="light"
            glow
            image={{
              src: "/booths/phonebooth.png",
              alt: "Black acoustic phone booth with a warmly lit oak interior, a worktop and a leather chair",
              w: 1310,
              h: 1200,
            }}
            points={anatomy}
            heading={
              <>
                <p className="eyebrow" data-reveal="fade">
                  Inside the booth
                </p>
                <h2 id="inside-heading" className="type-h2 mt-6 max-w-[12ch] text-ivory" data-reveal="lines">
                  Everything a quiet room needs.
                </h2>
              </>
            }
          />
        </div>
      </section>

      <BoothBento />

      <FaqSection faqs={faqs} title="Booths, answered." className="bg-ivory-deep" />

      <RelatedWorlds exclude="booths" />

      <ConsultationBand
        heading="How many booths does the floor need?"
        lead="Send us a floor plan and headcount. We will suggest a mix of sizes, where they sit and what the lead time looks like."
        interest="Phone booths"
      />
    </>
  );
}
