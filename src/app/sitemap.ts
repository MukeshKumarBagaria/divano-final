import type { MetadataRoute } from "next";
import { chairHref, chairTypes } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/site";

type Entry = { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; images?: string[] };

const entries: Entry[] = [
  { path: "/", priority: 1, changeFrequency: "weekly", images: ["/hero/hero-ergonomic-chairs.png", "/hero/hero-sofa.png", "/hero/hero-phonebooth.png"] },
  { path: "/collections", priority: 0.8, changeFrequency: "monthly", images: ["/images/hero-lifestyle.jpg"] },
  { path: "/ergonomic-chairs", priority: 0.9, changeFrequency: "weekly", images: ["/hero/hero-ergonomic-chairs.png"] },
  ...chairTypes.map((type) => ({
    path: chairHref(type.slug),
    priority: 0.8,
    changeFrequency: "weekly" as const,
    images: [type.image.src, ...type.models.map((model) => model.image.src)],
  })),
  { path: "/sofas", priority: 0.9, changeFrequency: "weekly", images: ["/hero/hero-sofa.png"] },
  { path: "/phone-booths", priority: 0.9, changeFrequency: "weekly", images: ["/hero/hero-phonebooth.png", "/booths/phonebooth.png"] },
  { path: "/about", priority: 0.6, changeFrequency: "monthly", images: ["/images/philosophy-img.jpg"] },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  { path: "/faq", priority: 0.5, changeFrequency: "monthly" },
  { path: "/careers", priority: 0.3, changeFrequency: "monthly" },
  { path: "/shipping", priority: 0.3, changeFrequency: "yearly" },
  { path: "/returns", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return entries.map((entry) => ({
    url: absoluteUrl(entry.path),
    lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
    images: entry.images ? [...new Set(entry.images)].map((src) => absoluteUrl(src)) : undefined,
  }));
}
