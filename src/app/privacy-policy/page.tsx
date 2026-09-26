import type { Metadata } from "next";
import { PolicyPage, type PolicySection } from "@/components/page/policy-page";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Divano Elegante collects, uses and protects the personal information you share through our website, enquiries and orders.",
  path: "/privacy-policy",
});

// PLACEHOLDER POLICY — a plain-language draft. Update it to match the tools the
// site actually uses (analytics, CRM, newsletter) and have it legally reviewed.
const sections: PolicySection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: [
      `This policy explains how ${site.name} ("we", "us") handles personal information collected through this website and when you enquire about or order our furniture.`,
    ],
  },
  {
    id: "what-we-collect",
    title: "Information we collect",
    body: [
      {
        list: [
          "Details you give us in enquiry and consultation forms: your name, phone number, email address, company, city and anything you write about your requirements.",
          "Your email address if you subscribe to our newsletter.",
          "Order, delivery and billing details when you buy from us.",
          "Basic technical information such as your browser type and the pages you visit, which may be collected through cookies or similar technologies.",
        ],
      },
    ],
  },
  {
    id: "how-we-use",
    title: "How we use it",
    body: [
      {
        list: [
          "To respond to your enquiry, prepare quotes and arrange samples or visits.",
          "To make, deliver, install and support the furniture you order.",
          "To send you our newsletter or updates, where you have asked for them. You can unsubscribe at any time.",
          "To keep the website secure and understand how it is used, so we can improve it.",
          "To meet our legal, tax and accounting obligations.",
        ],
      },
    ],
  },
  {
    id: "sharing",
    title: "Sharing your information",
    body: [
      "We do not sell your personal information. We share it only with those who help us serve you, such as delivery and logistics partners, payment providers and the service providers who host our website and systems, and only as far as they need it. We may also disclose information where the law requires it.",
    ],
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: [
      "We keep personal information for as long as we need it for the purposes above, including any period required for legal, tax or warranty reasons, and then delete or anonymise it.",
    ],
  },
  {
    id: "security",
    title: "Keeping it safe",
    body: [
      "We use reasonable technical and organisational measures to protect your information. No method of transmission or storage is completely secure, but we work to protect what you share with us.",
    ],
  },
  {
    id: "your-rights",
    title: "Your choices and rights",
    body: [
      "You can ask to see the personal information we hold about you, correct it, or ask us to delete it, and you can withdraw consent for marketing at any time. We handle these requests in line with applicable Indian law, including the Digital Personal Data Protection Act, 2023.",
      `To make a request, email ${site.email}.`,
    ],
  },
  {
    id: "cookies",
    title: "Cookies",
    body: [
      "The website may use cookies and similar technologies to remember your preferences and understand how the site is used. You can control cookies through your browser settings; blocking some cookies may affect how parts of the site work.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: [
      "We may update this policy from time to time. The latest version will always be on this page, with the date it was last updated.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage
      path="/privacy-policy"
      title={["Privacy", "Policy"]}
      summary="What we collect when you enquire or order, why we need it, and the choices you have."
      updated="26 September 2026"
      sections={sections}
    />
  );
}
