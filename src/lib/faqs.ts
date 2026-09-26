import type { Faq } from "@/lib/catalog";

export type FaqGroup = { id: string; title: string; faqs: Faq[] };

/**
 * The help centre. Answers avoid specific timelines and warranty terms on
 * purpose; PLACEHOLDER — confirm the care, warranty and damage answers
 * against the real policies before launch.
 */
export const faqGroups: FaqGroup[] = [
  {
    id: "orders",
    title: "Orders & quotes",
    faqs: [
      {
        q: "How do I get a quote?",
        a: "Send an enquiry from our contact page, call us or message us on WhatsApp. Tell us what you need, how many and where, and we will come back with a detailed quote.",
      },
      {
        q: "Is there a minimum order?",
        a: "No. We make single pieces for homes as well as large orders for offices, hotels and institutions.",
      },
      {
        q: "Can I see or try samples before ordering?",
        a: "Yes. For chairs we can arrange samples to sit on, and for sofas we can share cover swatches. Ask when you enquire.",
      },
      {
        q: "Are the prices on the website final?",
        a: "Prices shown are starting points for the standard build. Your final price depends on the specification, quantity and delivery, and is confirmed in writing on your quote.",
      },
    ],
  },
  {
    id: "custom",
    title: "Customisation",
    faqs: [
      {
        q: "Can I choose my own fabric, leather or colour?",
        a: "Yes. Everything is built to order, so covers, colours and finishes are chosen per order. We can share swatches before you confirm.",
      },
      {
        q: "Can you build to a custom size?",
        a: "Yes. Sofas and phone booths in particular are often built to a drawing of the space. Share dimensions or a floor plan and we will suggest a configuration.",
      },
      {
        q: "Can furniture match our brand or interior palette?",
        a: "Yes. Upholstery, shell colours and frame finishes can be matched to a brand or an interior scheme, which works especially well on larger orders.",
      },
    ],
  },
  {
    id: "delivery",
    title: "Delivery & installation",
    faqs: [
      {
        q: "Do you deliver across India?",
        a: "Yes. We deliver across India. Any delivery charge depends on your location and order size and is shown on your quote.",
      },
      {
        q: "How long will my order take?",
        a: "Most pieces are made to order, so timing depends on the product, the specification and the quantity. We confirm an expected delivery date with your quote.",
      },
      {
        q: "Do you install the furniture?",
        a: "Phone booths are assembled on site by our team. For other furniture, what is included in delivery and set-up is stated on your quote.",
      },
    ],
  },
  {
    id: "care",
    title: "Care & warranty",
    faqs: [
      {
        q: "How do I care for leather and fabric upholstery?",
        a: "Dust leather regularly and condition it a couple of times a year. Vacuum fabric with a soft brush and blot spills rather than rubbing. Keep all upholstery out of strong direct sunlight.",
      },
      {
        q: "Is my furniture covered by a warranty?",
        a: "Warranty cover depends on the product and is stated on your quote and invoice. If something is not right, contact us and we will help.",
      },
      {
        q: "What if something arrives damaged?",
        a: "Check your order on delivery and note any visible damage on the delivery receipt, then tell us as soon as possible with photographs so we can put it right.",
      },
    ],
  },
  {
    id: "business",
    title: "Business orders",
    faqs: [
      {
        q: "Do you work with companies, architects and designers?",
        a: "Yes. We furnish offices, co-working spaces, hotels and institutions, and quote against drawings and specifications from architects and designers.",
      },
      {
        q: "Can you furnish a whole office?",
        a: "Yes. Ergonomic seating, breakout sofas and phone booths can be planned together, so a floor is furnished by one team to one standard.",
      },
      {
        q: "Do you offer pricing for bulk orders?",
        a: "Yes. Pricing for larger orders depends on quantity and specification. Send your requirements and we will prepare a project quote.",
      },
    ],
  },
];

export const allFaqs = faqGroups.flatMap((group) => group.faqs);
