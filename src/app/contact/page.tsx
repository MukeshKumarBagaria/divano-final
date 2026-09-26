import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Building2, Mail, MapPin, PackageCheck, Phone } from "lucide-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { Breadcrumbs } from "@/components/page/breadcrumbs";
import { HeroFade, HeroTitle } from "@/components/page/hero-title";
import { FaqSection } from "@/components/page/faq-section";
import { EnquiryForm } from "@/components/contact/enquiry-form";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata, storeJsonLd } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Talk to Divano Elegante about ergonomic chairs, sofas and acoustic phone booths. Call, WhatsApp or email our team, or send an enquiry for a quote, samples or a factory visit.",
  path: "/contact",
  image: { url: "/images/factory-film-poster.jpg", width: 1280, height: 720, alt: "The Divano Elegante workshop floor" },
});

const methods = [
  {
    icon: Phone,
    label: "Call us",
    value: site.phone.display,
    href: site.phone.href,
  },
  {
    icon: IconBrandWhatsapp,
    label: "WhatsApp",
    value: "Chat with our team",
    href: site.whatsapp,
  },
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
];

const steps = [
  { title: "We call you back", body: "Within one working day, to understand the space, the numbers and the timeline." },
  { title: "We shortlist", body: "Pieces, sizes and finishes that suit the brief, with samples or drawings where they help." },
  { title: "You get a quote", body: "A detailed quote with lead time, delivery and installation, before you commit to anything." },
];

const faqs = [
  {
    q: "Can I visit to see the furniture in person?",
    a: "Yes, by appointment. Call or message us on WhatsApp and we will arrange a time and share directions.",
  },
  {
    q: "Do you work with architects, interior designers and contractors?",
    a: "Yes. We quote against drawings and specifications, and can build to the finishes a project calls for.",
  },
  {
    q: "What details help you quote faster?",
    a: "The type and number of pieces, the city, your timeline and, for larger spaces, a floor plan or photographs. Send whatever you have and we will ask for the rest.",
  },
];

export default function ContactPage() {
  const address = site.address;
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Divano Elegante",
            url: absoluteUrl("/contact"),
            about: { "@id": absoluteUrl("/#organization") },
          },
          storeJsonLd(),
        ]}
      />

      {/* Hero */}
      <section className="bg-ivory pb-24 pt-8 md:pb-32 md:pt-12">
        <div className="page-x">
          <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
          <div className="mt-12 grid gap-14 md:mt-20 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="min-w-0 lg:col-span-7">
              <HeroFade delay={0.3}>
                <p className="eyebrow">Contact us</p>
              </HeroFade>
              <HeroTitle lines={["Let’s talk about", "your space."]} className="mt-6 text-charcoal" />
              <HeroFade delay={0.85}>
                <p className="type-lead mt-8 max-w-[44ch] text-slate">
                  Whether it&apos;s one chair for a home office or a floor of phone booths, you&apos;ll
                  speak to the people who build it.
                </p>
              </HeroFade>
            </div>

            <HeroFade delay={1} className="min-w-0 lg:col-span-5">
              <ul className="space-y-3">
                {methods.map((method) => (
                  <li key={method.label}>
                    <a
                      href={method.href}
                      {...(method.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group relative flex items-center gap-5 overflow-hidden rounded-2xl border border-stone bg-white/60 p-5 transition-colors duration-500 hover:border-navy md:p-6"
                    >
                      <span
                        aria-hidden
                        className="absolute inset-0 origin-bottom scale-y-0 bg-navy transition-transform duration-700 ease-out group-hover:scale-y-100"
                      />
                      <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-stone text-gold transition-colors duration-500 group-hover:border-ivory/25">
                        <method.icon size={19} className="h-[19px] w-[19px]" strokeWidth={1.5} />
                      </span>
                      <span className="relative min-w-0 flex-1">
                        <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate transition-colors duration-500 group-hover:text-ivory/60">
                          {method.label}
                        </span>
                        <span className="mt-1 block font-heading text-[19px] leading-tight [overflow-wrap:anywhere] sm:text-[21px] text-charcoal transition-colors duration-500 group-hover:text-ivory md:text-[23px]">
                          {method.value}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="relative h-5 w-5 shrink-0 text-charcoal transition-[color,rotate] duration-500 group-hover:rotate-45 group-hover:text-ivory"
                        strokeWidth={1.5}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </HeroFade>
          </div>
        </div>
      </section>

      {/* Enquiry */}
      <section id="enquiry" className="scroll-mt-20 bg-ivory-deep py-24 md:py-36" aria-labelledby="enquiry-heading">
        <div className="page-x grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow" data-reveal="fade">
                Send an enquiry
              </p>
              <h2 id="enquiry-heading" className="type-h2 mt-6 max-w-[10ch] text-charcoal" data-reveal="lines">
                Tell us about the project.
              </h2>
              <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate" data-reveal="fade">
                What happens next
              </p>
              <ol className="mt-5 border-t border-stone" data-reveal="stagger">
                {steps.map((step, index) => (
                  <li key={step.title} className="flex gap-5 border-b border-stone py-5">
                    <span className="pt-1 text-[12px] font-semibold tabular-nums tracking-[0.1em] text-gold">
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="font-heading text-[20px] leading-none text-charcoal">{step.title}</h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-slate">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6" data-reveal="fade" data-reveal-delay="0.15">
            <EnquiryForm />
          </div>
        </div>
      </section>

      {/* Ways we can help */}
      <section className="bg-ivory py-24 md:py-32" aria-labelledby="help-heading">
        <div className="page-x">
          <h2 id="help-heading" className="type-h3 text-charcoal" data-reveal="lines">
            Other ways we can help
          </h2>
          <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8" data-reveal="stagger">
            <li className="flex flex-col border-t border-stone pt-8">
              <MapPin className="h-6 w-6 text-gold" strokeWidth={1.25} />
              <h3 className="mt-6 font-heading text-[26px] leading-none text-charcoal">Visit the factory</h3>
              {address ? (
                <address className="mt-4 text-[15px] not-italic leading-relaxed text-slate">
                  {address.street}
                  <br />
                  {address.locality}, {address.region} {address.postalCode}
                </address>
              ) : (
                <p className="mt-4 max-w-[34ch] text-[15px] leading-relaxed text-slate">
                  See frames, fabrics and finished pieces where they are made. Visits are by
                  appointment, so we can have the right people on the floor.
                </p>
              )}
              <a
                href={address?.mapUrl ?? site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="link-draw mt-auto self-start pt-8 text-[13px] font-semibold text-navy"
              >
                {address?.mapUrl ? "Get directions" : "Book a visit on WhatsApp"}
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </a>
            </li>
            <li id="order-support" className="flex scroll-mt-28 flex-col border-t border-stone pt-8">
              <PackageCheck className="h-6 w-6 text-gold" strokeWidth={1.25} />
              <h3 className="mt-6 font-heading text-[26px] leading-none text-charcoal">Order support</h3>
              <p className="mt-4 max-w-[34ch] text-[15px] leading-relaxed text-slate">
                Already ordered? For delivery updates, installation or changes to an order, message
                us with your order number or the name it was placed under.
              </p>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="link-draw mt-auto self-start pt-8 text-[13px] font-semibold text-navy"
              >
                Track an order on WhatsApp
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </a>
            </li>
            <li className="flex flex-col border-t border-stone pt-8">
              <Building2 className="h-6 w-6 text-gold" strokeWidth={1.25} />
              <h3 className="mt-6 font-heading text-[26px] leading-none text-charcoal">Business &amp; bulk</h3>
              <p className="mt-4 max-w-[34ch] text-[15px] leading-relaxed text-slate">
                Furnishing an office, hotel or campus? Send floor plans and quantities and we will
                propose a mix, arrange samples and quote the project.
              </p>
              <Link
                href="#enquiry"
                className="link-draw mt-auto self-start pt-8 text-[13px] font-semibold text-navy"
              >
                Start a project enquiry
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <FaqSection faqs={faqs} eyebrow="Good to know" title="Before you get in touch." className="bg-ivory-deep" />
    </>
  );
}
