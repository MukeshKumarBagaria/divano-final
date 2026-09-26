import type { Metadata, Viewport } from "next";
import { Playfair_Display, Manrope, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollAnimations } from "@/components/scroll-animations";
import { JsonLd } from "@/components/json-ld";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

// Display face for headings (variable, 400–900) with its italics for accents.
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Divano Elegante | Ergonomic Chairs, Sofas & Phone Booths",
    template: "%s | Divano Elegante",
  },
  description: site.description,
  applicationName: site.name,
  creator: site.name,
  publisher: site.name,
  category: "furniture",
  keywords: [
    "ergonomic office chairs",
    "office furniture India",
    "made to order sofas",
    "acoustic phone booths",
    "office pods",
    "furniture manufacturer India",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: "/",
    title: "Divano Elegante | Ergonomic Chairs, Sofas & Phone Booths",
    description: site.description,
    images: [{ ...site.ogImage, alt: "Divano Elegante: ergonomic chairs, sofas and phone booths" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Divano Elegante | Ergonomic Chairs, Sofas & Phone Booths",
    description: site.description,
    images: [site.ogImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#f7f4ee",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${playfair.variable} ${manrope.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <div id="top" />
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-navy px-5 py-3 text-sm font-semibold text-ivory focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <SmoothScroll />
        <ScrollAnimations />
      </body>
    </html>
  );
}
