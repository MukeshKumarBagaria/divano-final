import type { Metadata } from "next";
import { PolicyPage, type PolicySection } from "@/components/page/policy-page";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Shipping & Delivery",
  description:
    "How Divano Elegante delivers ergonomic chairs, sofas and phone booths across India: timelines for made-to-order pieces, preparing for delivery, installation and delays.",
  path: "/shipping",
});

// PLACEHOLDER POLICY — a sensible starting draft. Have it reviewed against how
// deliveries actually run (charges, partners, timelines) before launch.
const sections: PolicySection[] = [
  {
    id: "coverage",
    title: "Where we deliver",
    body: [
      "We deliver across India. Any delivery charge depends on your location, the size of the order and access at the site, and is shown on your quote before you confirm.",
    ],
  },
  {
    id: "timelines",
    title: "Delivery timelines",
    body: [
      "Most of our furniture is made to order, so the delivery date depends on the product, the specification and the quantity. We confirm an expected delivery date with your quote.",
      "If anything changes while your order is on the factory floor, we will tell you as soon as we know and agree a revised date with you.",
    ],
  },
  {
    id: "preparing",
    title: "Before delivery",
    body: [
      "A little preparation makes delivery day straightforward:",
      {
        list: [
          "Measure doorways, lifts, stairwells and corridors on the route to the room. Share them with us if you are unsure a piece will fit.",
          "Tell us in advance about building permissions, loading bays, lift bookings or delivery windows at your site.",
          "For phone booths, make sure the floor space and a nearby power point are ready.",
        ],
      },
    ],
  },
  {
    id: "on-the-day",
    title: "On the day",
    body: [
      "Our team or logistics partner will call ahead. Please make sure someone is available to receive the order.",
      "Inspect every item before signing. If you see any damage, note it on the delivery receipt and tell us as soon as possible with photographs, so we can put it right.",
    ],
  },
  {
    id: "installation",
    title: "Assembly and installation",
    body: [
      "Phone booths are delivered in panels and assembled on site by our team. For other furniture, what is included in delivery, assembly and placement is stated on your quote.",
    ],
  },
  {
    id: "delays",
    title: "Delays",
    body: [
      "Occasionally a delivery is delayed by circumstances outside our control, such as weather, transport disruption or site access. If this happens we will keep you informed and arrange the earliest practical new date.",
    ],
  },
];

export default function ShippingPage() {
  return (
    <PolicyPage
      path="/shipping"
      title={["Shipping &", "Delivery"]}
      summary="How your order travels from our factory floor to your space, and what helps it arrive smoothly."
      updated="26 September 2026"
      sections={sections}
    />
  );
}
