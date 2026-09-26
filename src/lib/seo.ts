import type { Metadata } from "next";
import { absoluteUrl, site } from "@/lib/site";

type PageMeta = {
  /** Page title; the root layout appends "| Divano Elegante". */
  title: string;
  description: string;
  /** Route path, e.g. "/sofas". Used for the canonical URL and og:url. */
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
  keywords?: string[];
  noindex?: boolean;
};

/** Metadata for a page: canonical URL, Open Graph and Twitter card in one place. */
export function pageMetadata({ title, description, path, image, keywords, noindex }: PageMeta): Metadata {
  // Child openGraph objects replace the parent's wholesale, so every page
  // carries an image of its own, falling back to the brand photograph.
  const img = image ?? { ...site.ogImage, alt: `${site.name}: ergonomic chairs, sofas and phone booths` };
  const images = [{ url: img.url, width: img.width, height: img.height, alt: img.alt }];
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: site.locale,
      url: path,
      title: `${title} | ${site.name}`,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: [img.url],
    },
    // Only set when needed: an explicit undefined would drop the root's robots rules.
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/* ------------------------------------------------------------------ */
/* Structured data (schema.org JSON-LD)                                */
/* ------------------------------------------------------------------ */

export type Crumb = { name: string; path: string };

export const breadcrumbJsonLd = (crumbs: Crumb[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: absoluteUrl(crumb.path),
  })),
});

export const faqJsonLd = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
});

export const itemListJsonLd = (name: string, items: { name: string; path: string; image?: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name,
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    url: absoluteUrl(item.path),
    ...(item.image ? { image: absoluteUrl(item.image) } : {}),
  })),
});

const sameAs = () => Object.values(site.socials).filter(Boolean);

const postalAddress = () =>
  site.address
    ? {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        addressLocality: site.address.locality,
        addressRegion: site.address.region,
        postalCode: site.address.postalCode,
        addressCountry: site.address.country,
      }
    : undefined;

export const organizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": absoluteUrl("/#organization"),
  name: site.name,
  slogan: site.tagline,
  url: site.url,
  logo: absoluteUrl("/brand/logo.png"),
  email: site.email,
  telephone: site.phone.e164,
  description: site.description,
  address: postalAddress(),
  sameAs: sameAs().length ? sameAs() : undefined,
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: site.phone.e164,
      email: site.email,
      contactType: "sales",
      areaServed: "IN",
      availableLanguage: ["English"],
    },
  ],
});

export const websiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absoluteUrl("/#website"),
  name: site.name,
  url: site.url,
  inLanguage: "en-IN",
  publisher: { "@id": absoluteUrl("/#organization") },
});

/** The store itself; only emitted once a real address is configured. */
export const storeJsonLd = () =>
  site.address
    ? {
        "@context": "https://schema.org",
        "@type": "FurnitureStore",
        name: site.name,
        url: site.url,
        image: absoluteUrl(site.ogImage.url),
        telephone: site.phone.e164,
        email: site.email,
        address: postalAddress(),
        parentOrganization: { "@id": absoluteUrl("/#organization") },
      }
    : null;
