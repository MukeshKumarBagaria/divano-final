import Link from "next/link";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconBrandYoutube,
} from "@tabler/icons-react";
import { ArrowUp } from "lucide-react";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Collections",
    links: [
      { label: "Ergonomic Chairs", href: "/ergonomic-chairs" },
      { label: "Sofas", href: "/sofas" },
      { label: "Phone Booths", href: "/phone-booths" },
      { label: "All Collections", href: "/collections" },
      { label: "Featured", href: "/#featured" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Story", href: "/about#story" },
      { label: "Our Craft", href: "/about#craft" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Track Order", href: "/contact#order-support" },
      { label: "Shipping", href: "/shipping" },
      { label: "Returns", href: "/returns" },
      { label: "FAQs", href: "/faq" },
    ],
  },
];

// Profiles fall back to "#" until the real URLs are set in lib/site.ts.
const socials = [
  { label: "Instagram", href: site.socials.instagram || "#", icon: IconBrandInstagram },
  { label: "LinkedIn", href: site.socials.linkedin || "#", icon: IconBrandLinkedin },
  { label: "Facebook", href: site.socials.facebook || "#", icon: IconBrandFacebook },
  { label: "YouTube", href: site.socials.youtube || "#", icon: IconBrandYoutube },
];

const legal = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
  { label: "Shipping", href: "/shipping" },
  { label: "Returns", href: "/returns" },
];

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-navy-deep text-ivory">
      <div className="page-x pb-10 pt-24 md:pt-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <p
            className="font-heading text-[clamp(3.5rem,9vw,8.5rem)] leading-[0.98] tracking-[-0.02em] text-ivory lg:col-span-8"
            data-reveal="lines"
          >
            Divano
            <br />
            Elegante
          </p>
          <div className="lg:col-span-4" data-reveal="fade">
            <p className="max-w-[24ch] font-heading text-[23px] leading-snug text-ivory md:text-[26px]">
              Furniture designed around the way you live and work.
            </p>
            <p className="mt-4 text-[12px] uppercase tracking-[0.22em] text-gold">
              Your imagination, our creation
            </p>
          </div>
        </div>

        <span aria-hidden data-draw className="mt-20 block h-px w-full bg-ivory/12 md:mt-28" />

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-12 lg:gap-8">
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title} className="lg:col-span-2">
              <h2 className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-ivory/45">
                {column.title}
              </h2>
              <ul className="mt-6 space-y-3.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-block text-[14.5px] text-ivory/75 transition-[color,translate] duration-500 ease-out hover:translate-x-1 hover:text-ivory"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <nav aria-label="Social" className="lg:col-span-2">
            <h2 className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-ivory/45">
              Follow the journey
            </h2>
            <ul className="mt-6 space-y-3.5">
              {socials.map((social) => (
                <li key={social.label}>
                  <Link
                    href={social.href}
                    className="group inline-flex items-center gap-3 text-[14.5px] text-ivory/75 transition-colors duration-300 hover:text-ivory"
                  >
                    <social.icon size={17} stroke={1.5} className="text-gold/80 transition-colors group-hover:text-gold" />
                    {social.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 lg:col-span-4">
            <h2 className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-ivory/45">
              Let&apos;s stay connected
            </h2>
            <ul className="mt-6 space-y-3.5 text-[14.5px]">
              <li>
                <a href={site.phone.href} className="text-ivory/75 transition-colors hover:text-ivory">
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="text-ivory/75 transition-colors hover:text-ivory">
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-ivory/75 transition-colors hover:text-ivory"
                >
                  <IconBrandWhatsapp size={17} stroke={1.5} className="text-gold/80" />
                  WhatsApp support
                </a>
              </li>
            </ul>
            <Link
              href="/contact"
              className="mt-8 inline-flex h-12 items-center rounded-full border border-ivory/25 px-6 text-[13px] font-semibold text-ivory transition-colors duration-300 hover:border-ivory hover:bg-ivory hover:text-navy"
            >
              Book a consultation
            </Link>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-ivory/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-[12.5px] text-ivory/50">
            © {new Date().getFullYear()} Divano Elegante
          </p>
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-2">
            {legal.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[12.5px] text-ivory/50 transition-colors hover:text-ivory"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 text-[12.5px] text-ivory/60 transition-colors hover:text-ivory"
          >
            Back to top
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ivory/20 transition-transform duration-500 ease-out group-hover:-translate-y-1">
              <ArrowUp className="h-3.5 w-3.5" strokeWidth={1.5} />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
