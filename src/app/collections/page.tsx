import type { Metadata } from "next";
import { PageHero } from "@/components/page/page-hero";
import { CollectionChapter } from "@/components/page/collection-chapter";
import { ConsultationBand } from "@/components/consultation-band";
import { JsonLd } from "@/components/json-ld";
import { PillLink } from "@/components/ui/pill-link";
import { boothSizes, chairHref, chairTypes, sofaSizes } from "@/lib/catalog";
import { itemListJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "The Collection",
  description:
    "The full Divano Elegante collection: ergonomic office chairs in five back heights, made-to-order sofas and acoustic phone booths for homes, offices and hospitality spaces.",
  path: "/collections",
  image: {
    url: "/images/hero-lifestyle.jpg",
    width: 1376,
    height: 768,
    alt: "A living room and study with a linen sofa and an ergonomic chair",
  },
});

export default function CollectionsPage() {
  return (
    <>
      <JsonLd
        data={itemListJsonLd("The Divano Elegante collection", [
          { name: "Ergonomic Chairs", path: "/ergonomic-chairs" },
          { name: "Sofas", path: "/sofas" },
          { name: "Phone Booths", path: "/phone-booths" },
        ])}
      />

      <PageHero
        crumbs={[{ name: "Collections", path: "/collections" }]}
        eyebrow="The Divano Elegante collection"
        title={["Three worlds", "of comfort."]}
        lead="Ergonomic seating, sofas and acoustic workspaces, each designed, built and finished on our own factory floor, and made to sit well together."
        actions={<PillLink href="#chairs">Start exploring</PillLink>}
        image={{
          src: "/images/hero-lifestyle.jpg",
          alt: "A living room and study with a linen sofa, a walnut desk and an ergonomic chair",
          focus: "60% 50%",
        }}
        index={[
          { label: "Ergonomic chairs", href: "#chairs" },
          { label: "Sofas", href: "#sofas" },
          { label: "Phone booths", href: "#booths" },
        ]}
        indexLabel="Collections"
      />

      <CollectionChapter
        id="chairs"
        numeral="I"
        eyebrow="Ergonomic chairs"
        title="Comfort engineered for long days."
        line="Five back heights for every seat in the building, from hot desks and cabins to cafeterias and reception."
        cover={{ src: "/images/cat-chairs.jpg", alt: "Mesh ergonomic chair at an oak desk", focus: "42% 50%" }}
        entries={chairTypes.map((type) => ({
          name: type.name,
          note: type.note,
          href: chairHref(type.slug),
          image: type.image,
        }))}
        all={{ label: "Explore all ergonomic chairs", href: "/ergonomic-chairs" }}
      />

      <CollectionChapter
        id="sofas"
        numeral="II"
        eyebrow="Sofas"
        title="Where comfort becomes part of the room."
        line="Armchairs to modular sofas, upholstered to order in leather, linen, bouclé or velvet."
        cover={{ src: "/images/cat-sofas.jpg", alt: "Deep linen sofa facing floor-to-ceiling windows", focus: "40% 60%" }}
        entries={sofaSizes.map((size) => ({
          name: size.name,
          note: size.line,
          href: `/sofas#${size.id}`,
          image: size.image,
        }))}
        all={{ label: "Explore all sofas", href: "/sofas" }}
        flip
      />

      <CollectionChapter
        id="booths"
        numeral="III"
        eyebrow="Phone booths"
        title="Private space. Better focus."
        line="Acoustic booths and meeting pods that bring quiet to open-plan floors."
        cover={{ src: "/images/cat-booths.jpg", alt: "Acoustic booth glowing with warm light", focus: "66% 50%" }}
        entries={boothSizes.map((size) => ({
          name: size.name,
          note: size.occupancy,
          href: `/phone-booths#${size.id}`,
          image: size.image,
        }))}
        all={{ label: "Explore all phone booths", href: "/phone-booths" }}
      />

      <ConsultationBand />
    </>
  );
}
