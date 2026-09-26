import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { ThreeWorlds } from "@/components/three-worlds";
import { BrandPhilosophy } from "@/components/brand-philosophy";
import { ErgonomicChairs } from "@/components/ergonomic-chairs";
import { ChairTypes } from "@/components/chair-types";
import { ChairFinder } from "@/components/chair-finder";
import { SofasSection } from "@/components/sofas-section";
import { SofaCollection } from "@/components/sofa-collection";
import { PhoneBoothsSection } from "@/components/phone-booths-section";
import { MadeForModernSpaces } from "@/components/made-for-modern-spaces";
import { WhyDivano } from "@/components/why-divano";
import { CraftSection } from "@/components/craft-section";
import { Applications } from "@/components/applications";
import { FeaturedProducts } from "@/components/featured-products";
import { PromoBanner } from "@/components/promo-banner";
import { ClientLogos } from "@/components/client-logos";
import { Testimonials } from "@/components/testimonials";
import { ConsultationBand } from "@/components/consultation-band";
import { Newsletter } from "@/components/newsletter";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Section order follows the homepage hierarchy in Divano-telegante-promp.md §23.
export default function Home() {
  return (
    <>
      <Hero />
      <ThreeWorlds />
      <BrandPhilosophy />
      <ErgonomicChairs />
      <ChairTypes />
      <ChairFinder />
      <SofasSection />
      <SofaCollection />
      <PhoneBoothsSection />
      <MadeForModernSpaces />
      <WhyDivano />
      <CraftSection />
      <Applications />
      <FeaturedProducts />
      <PromoBanner />
      <ClientLogos />
      <Testimonials />
      <ConsultationBand />
      <Newsletter />
    </>
  );
}
