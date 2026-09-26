import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { FaqAccordion } from "@/components/page/faq-accordion";
import { faqJsonLd } from "@/lib/seo";
import type { Faq } from "@/lib/catalog";

/** Sticky heading beside an accordion, with FAQPage structured data. */
export function FaqSection({
  faqs,
  eyebrow = "Questions, answered",
  title = "Before you ask.",
  className = "bg-ivory",
}: {
  faqs: Faq[];
  eyebrow?: string;
  title?: string;
  className?: string;
}) {
  return (
    <section className={`${className} py-24 md:py-36`} aria-labelledby="faq-heading">
      <JsonLd data={faqJsonLd(faqs)} />
      <div className="page-x grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow" data-reveal="fade">
              {eyebrow}
            </p>
            <h2 id="faq-heading" className="type-h2 mt-6 max-w-[10ch] text-charcoal" data-reveal="lines">
              {title}
            </h2>
            <p className="mt-6 max-w-[34ch] text-[15px] leading-relaxed text-slate" data-reveal="fade">
              Can&apos;t see your question? Browse every answer, or ask our team directly.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4" data-reveal="fade">
              <Link href="/faq" className="link-draw text-[13px] font-semibold text-navy">
                All FAQs
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
              <Link href="/contact" className="link-draw text-[13px] font-semibold text-navy">
                Ask a question
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <FaqAccordion faqs={faqs} />
        </div>
      </div>
    </section>
  );
}
