import type { Metadata } from "next";
import { PolicyPage, type PolicySection } from "@/components/page/policy-page";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use",
  description:
    "The terms that apply when you use the Divano Elegante website, request a quote or place an order for our furniture.",
  path: "/terms",
});

// PLACEHOLDER TERMS — a plain-language draft, not legal advice. Add the
// registered entity, jurisdiction and payment terms, and have it reviewed.
const sections: PolicySection[] = [
  {
    id: "acceptance",
    title: "Using this website",
    body: [
      `By using this website you agree to these terms. If you do not agree, please do not use the site. The website is operated by ${site.name}.`,
    ],
  },
  {
    id: "product-information",
    title: "Product information",
    body: [
      "We take care to describe and photograph our furniture accurately. Colours on screen vary with display settings, natural materials vary from piece to piece, and some photographs show optional finishes or styling.",
      "Specifications may change as we refine our products. The specification on your written quote is the one that applies to your order.",
    ],
  },
  {
    id: "prices",
    title: "Prices and quotes",
    body: [
      "Prices shown on the website are indicative starting points for standard builds. Your price depends on the specification, quantity, delivery and installation, and is confirmed in a written quote, which is valid for the period stated on it.",
    ],
  },
  {
    id: "orders",
    title: "Orders",
    body: [
      "An order is confirmed when we accept it in writing and any payment set out on the quote is received. Because most pieces are made to order, please check your specification carefully before confirming. Our Returns & Warranty policy explains how changes, damage and defects are handled.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    body: [
      "The content of this website, including text, photographs, designs, logos and graphics, belongs to us or our licensors. You may view and share it for personal, non-commercial purposes, but not copy, reproduce or use it commercially without our written permission.",
    ],
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    body: [
      "Please do not misuse the website: for example, by attempting to gain unauthorised access, interfering with how it works, or submitting false or misleading information through our forms.",
    ],
  },
  {
    id: "links",
    title: "Links to other sites",
    body: [
      "The website may link to other websites, such as social media or messaging services. We are not responsible for the content or practices of those sites.",
    ],
  },
  {
    id: "liability",
    title: "Liability",
    body: [
      "We provide this website for general information. To the extent permitted by law, we are not liable for losses arising from its use or from temporary unavailability. Nothing in these terms limits any rights you have under applicable consumer protection law.",
    ],
  },
  {
    id: "law",
    title: "Governing law",
    body: [
      "These terms are governed by the laws of India, and any disputes are subject to the jurisdiction of the competent courts in India.",
    ],
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: ["We may update these terms from time to time. The latest version will always be on this page."],
  },
];

export default function TermsPage() {
  return (
    <PolicyPage
      path="/terms"
      title={["Terms", "of Use"]}
      summary="The ground rules for using this website, requesting a quote and ordering from us."
      updated="26 September 2026"
      sections={sections}
    />
  );
}
