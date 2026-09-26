import type { Metadata } from "next";
import { PolicyPage, type PolicySection } from "@/components/page/policy-page";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Returns & Warranty",
  description:
    "Divano Elegante's approach to made-to-order furniture: cancellations, damage in transit, manufacturing defects, warranty cover and how to raise a request.",
  path: "/returns",
});

// PLACEHOLDER POLICY — confirm cancellation terms, reporting windows and
// warranty cover with the business (and ideally legal counsel) before launch.
const sections: PolicySection[] = [
  {
    id: "made-to-order",
    title: "Made-to-order furniture",
    body: [
      "Most of our pieces are built to the size, cover and finish you choose, so they cannot be returned for a change of mind once production has started.",
      "Please review the specification on your quote carefully, including dimensions and colours, before you confirm. We are happy to send swatches or arrange samples first.",
    ],
  },
  {
    id: "cancellations",
    title: "Changes and cancellations",
    body: [
      "If you need to change or cancel an order, tell us as early as possible. Before production begins we can usually make changes; once materials are cut, changes or cancellation may not be possible or may carry a charge, which we will explain before anything is agreed.",
    ],
  },
  {
    id: "damage",
    title: "Damage in transit",
    body: [
      "Inspect your order when it arrives. If anything is damaged, note it on the delivery receipt and contact us as soon as possible with your order details and photographs. We will arrange to repair or replace the affected item.",
    ],
  },
  {
    id: "defects",
    title: "Manufacturing defects",
    body: [
      "If you notice a fault in how a piece was made, contact us with your order number, a short description and photographs. Warranty cover depends on the product and is stated on your quote and invoice.",
    ],
  },
  {
    id: "exclusions",
    title: "What is not covered",
    body: [
      {
        list: [
          "Normal wear and tear, including the natural softening of foam and upholstery over time.",
          "Damage from misuse, accidents, pets, or cleaning products and methods not suited to the material.",
          "Fading or changes caused by strong direct sunlight, heat or moisture.",
          "Repairs or alterations made by anyone other than our team.",
          "Natural variation in leather, wood grain and fabric dye lots, which is part of the character of these materials.",
        ],
      },
    ],
  },
  {
    id: "requests",
    title: "How to raise a request",
    body: [
      "Call us, message us on WhatsApp or email us with your order number and photographs. We will acknowledge your request and agree the next steps with you.",
    ],
  },
];

export default function ReturnsPage() {
  return (
    <PolicyPage
      path="/returns"
      title={["Returns &", "Warranty"]}
      summary="Made to order means made for you. Here is how we handle changes, damage and anything that isn't right."
      updated="26 September 2026"
      sections={sections}
    />
  );
}
