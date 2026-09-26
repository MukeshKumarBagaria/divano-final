/**
 * Business facts used across the site, metadata and structured data.
 * Change them here once rather than hunting through components.
 */
export const site = {
  name: "Divano Elegante",
  tagline: "Your imagination, our creation",
  description:
    "Ergonomic office chairs, made-to-order sofas and acoustic phone booths for homes, offices and hospitality spaces, designed and built in our own factory in India.",
  // PLACEHOLDER — confirm the production domain (or set NEXT_PUBLIC_SITE_URL).
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://divanoelegante.com").replace(/\/$/, ""),
  locale: "en_IN",
  phone: { display: "+91 93144 44747", href: "tel:+919314444747", e164: "+919314444747" },
  whatsapp: "https://wa.me/919314444747",
  email: "hello@divanoelegante.com",
  // PLACEHOLDER — no careers inbox confirmed yet.
  careersEmail: "careers@divanoelegante.com",
  // PLACEHOLDER — point these at the real profiles.
  socials: {
    instagram: "",
    linkedin: "",
    facebook: "",
    youtube: "",
  },
  /**
   * PLACEHOLDER — the factory / showroom address. Left null so nothing false is
   * published; once filled in, the contact page, footer and structured data
   * show it automatically.
   */
  address: null as null | {
    street: string;
    locality: string;
    region: string;
    postalCode: string;
    country: string;
    mapUrl?: string;
  },
  ogImage: { url: "/images/philosophy-img.jpg", width: 1200, height: 896 },
} as const;

export const absoluteUrl = (path = "/") => `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
