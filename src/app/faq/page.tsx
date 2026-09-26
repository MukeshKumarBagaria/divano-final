import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { Breadcrumbs } from "@/components/page/breadcrumbs";
import { HeroFade, HeroTitle } from "@/components/page/hero-title";
import { FaqBrowser } from "@/components/page/faq-browser";
import { JsonLd } from "@/components/json-ld";
import { PillLink } from "@/components/ui/pill-link";
import { allFaqs, faqGroups } from "@/lib/faqs";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "FAQs",
  description:
    "Answers to common questions about Divano Elegante orders, quotes, customisation, delivery across India, installation, care and business orders.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(allFaqs)} />

      <section className="bg-ivory pb-16 pt-8 md:pb-24 md:pt-12">
        <div className="page-x">
          <Breadcrumbs items={[{ name: "FAQs", path: "/faq" }]} />
          <div className="mt-12 grid gap-10 md:mt-20 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <HeroFade delay={0.3}>
                <p className="eyebrow">Help centre</p>
              </HeroFade>
              <HeroTitle lines={["Questions,", "answered."]} className="mt-6 text-charcoal" />
            </div>
            <HeroFade delay={0.85} className="lg:col-span-4 lg:pb-2">
              <p className="type-lead max-w-[40ch] text-slate">
                Everything from quotes and custom sizes to delivery and care. Search, or browse by
                topic.
              </p>
            </HeroFade>
          </div>
        </div>
      </section>

      <section className="bg-ivory pb-24 md:pb-36">
        <div className="page-x border-t border-hairline pt-14 md:pt-20">
          <FaqBrowser groups={faqGroups} />
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy py-20 text-ivory md:py-28" aria-labelledby="still-heading">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(198,161,91,0.16)_0%,rgba(198,161,91,0)_65%)]"
        />
        <div className="page-x relative grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <h2 id="still-heading" className="type-h2 max-w-[12ch] text-ivory" data-reveal="lines">
              Still have a question?
            </h2>
            <p className="type-lead mt-6 max-w-[40ch] text-ivory/70" data-reveal="fade">
              Talk to the people who build it. We are happy to help, whether or not you are ready to
              order.
            </p>
            <div className="mt-9" data-reveal="fade">
              <PillLink href="/contact" tone="light">
                Contact our team
              </PillLink>
            </div>
          </div>
          <ul className="grid gap-3 lg:col-span-5 lg:col-start-8" data-reveal="stagger">
            {[
              { icon: Phone, label: site.phone.display, href: site.phone.href },
              { icon: IconBrandWhatsapp, label: "Chat on WhatsApp", href: site.whatsapp },
              { icon: Mail, label: site.email, href: `mailto:${site.email}` },
            ].map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-4 rounded-2xl border border-ivory/12 px-5 py-4 transition-colors duration-300 hover:border-gold/60 hover:bg-ivory/5"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20 text-gold">
                    <item.icon size={17} className="h-[17px] w-[17px]" strokeWidth={1.5} />
                  </span>
                  <span className="text-[15px] text-ivory">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
