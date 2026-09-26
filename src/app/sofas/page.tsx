import type { Metadata } from "next";
import { PageHero } from "@/components/page/page-hero";
import { SectionHeader } from "@/components/page/section-header";
import { FaqSection } from "@/components/page/faq-section";
import { RelatedWorlds } from "@/components/page/related-worlds";
import { SofaSizes } from "@/components/sofas/sofa-sizes";
import { MadeToOrder } from "@/components/sofas/made-to-order";
import { MaterialPicker } from "@/components/sofas/material-picker";
import { ConsultationBand } from "@/components/consultation-band";
import { JsonLd } from "@/components/json-ld";
import { OutlineLink, PillLink } from "@/components/ui/pill-link";
import { sofaSizes } from "@/lib/catalog";
import { itemListJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Sofas & Lounge Seating, Made to Order",
  description:
    "Leather, linen, bouclé and velvet sofas upholstered to order in our own factory: armchairs, 2 and 3 seaters, lounge and modular sofas for homes, hotels and offices across India.",
  path: "/sofas",
  keywords: ["custom sofa India", "made to order sofa", "leather sofa", "modular sofa", "3 seater sofa", "hotel lobby sofa"],
  image: {
    url: "/hero/hero-sofa.png",
    width: 1821,
    height: 864,
    alt: "Showroom of leather and fabric sofas around marble coffee tables",
  },
});

const faqs = [
  {
    q: "Are your sofas made to order?",
    a: "Yes. Each sofa is built to the size, cover and finish you choose, on our own factory floor, rather than taken from stock.",
  },
  {
    q: "Can you make a sofa to fit a specific space?",
    a: "Yes. Share the room dimensions or a floor plan and we will suggest a configuration. Sizes between our standard widths are a question of the drawing, not the tooling.",
  },
  {
    q: "Leather or fabric: which is better for everyday use?",
    a: "Both work well. Leather wipes clean and gains character with age; fabric feels warmer and comes in more textures and colours. For busy homes we can suggest harder-wearing weaves.",
  },
  {
    q: "Do you make sofas for hotels, lobbies and offices?",
    a: "Yes. We build lounge and reception seating for hospitality and commercial interiors, matched to the project's palette and quantities.",
  },
  {
    q: "How long does a made-to-order sofa take?",
    a: "It depends on the size, the cover and the current workload on the floor. We confirm a delivery date with your quote, before you commit.",
  },
];

export default function SofasPage() {
  return (
    <>
      <JsonLd
        data={itemListJsonLd(
          "Sofas",
          sofaSizes.map((size) => ({ name: `${size.name} sofa`, path: `/sofas#${size.id}`, image: size.image.src })),
        )}
      />

      <PageHero
        crumbs={[{ name: "Sofas", path: "/sofas" }]}
        eyebrow="Sofas & lounge seating"
        title={["Sofas built", "around your room."]}
        lead="Leather and fabric sofas, upholstered to order in our own factory. Choose the size, the cover and the finish, and we build to that drawing."
        actions={
          <>
            <PillLink href="#sizes">Explore sizes</PillLink>
            <OutlineLink href="#consultation">Request a quote</OutlineLink>
          </>
        }
        image={{
          src: "/hero/hero-sofa.png",
          alt: "Showroom of leather and fabric sofas and lounge chairs around marble coffee tables",
          focus: "50% 62%",
        }}
        index={sofaSizes.map((size) => ({ label: size.name, href: `#${size.id}` }))}
        indexLabel="Sofa sizes"
      />

      <section id="sizes" className="scroll-mt-24 bg-ivory py-24 md:py-36" aria-labelledby="sizes-heading">
        <div className="page-x">
          <SectionHeader
            id="sizes-heading"
            eyebrow="By the way you gather"
            title="Five ways to sit together."
            lead="From a single armchair to a room-sized modular, every size shares the same frame, fill and finish."
          />
          <div className="mt-20 md:mt-28">
            <SofaSizes />
          </div>
        </div>
      </section>

      <section className="bg-ivory-deep py-24 md:py-36" aria-labelledby="process-heading">
        <div className="page-x">
          <SectionHeader
            id="process-heading"
            eyebrow="Made to order, not to stock"
            title="Four stages, one floor."
            titleClassName="max-w-[10ch]"
            lead="We don't build a warehouse of sofas and hope one fits. Your order goes onto the floor as a specification: this frame, this fill, this cover, this leg."
          />
          <div className="mt-16 md:mt-24">
            <MadeToOrder />
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-ivory py-24 md:py-36" aria-labelledby="materials-heading">
        <div className="page-x">
          <MaterialPicker />
        </div>
      </section>

      <FaqSection faqs={faqs} title="Sofas, answered." className="bg-ivory-deep" />

      <RelatedWorlds exclude="sofas" />

      <ConsultationBand
        heading="Send us the room."
        lead="Share dimensions or a floor plan and we will come back with a configuration, a cover shortlist and a price."
        interest="Sofas"
      />
    </>
  );
}
