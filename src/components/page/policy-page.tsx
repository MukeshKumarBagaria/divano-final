import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/page/breadcrumbs";
import { HeroFade, HeroTitle } from "@/components/page/hero-title";
import { PolicyToc } from "@/components/page/policy-toc";
import { site } from "@/lib/site";

export type PolicySection = {
  id: string;
  title: string;
  body: (string | { list: string[] })[];
};

const related = [
  { label: "Shipping & Delivery", href: "/shipping" },
  { label: "Returns & Warranty", href: "/returns" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms" },
];

/** Long-form policy layout: sticky contents on the left, the policy on the right. */
export function PolicyPage({
  path,
  title,
  eyebrow = "Policies",
  summary,
  updated,
  sections,
}: {
  path: string;
  title: string[];
  eyebrow?: string;
  summary: string;
  updated: string;
  sections: PolicySection[];
}) {
  const name = title.join(" ");
  return (
    <>
      <section className="bg-ivory pb-14 pt-8 md:pb-20 md:pt-12">
        <div className="page-x">
          <Breadcrumbs items={[{ name, path }]} />
          <div className="mt-12 grid gap-10 md:mt-20 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <HeroFade delay={0.3}>
                <p className="eyebrow">{eyebrow}</p>
              </HeroFade>
              <HeroTitle lines={title} size="md" className="mt-6 text-charcoal" />
            </div>
            <HeroFade delay={0.85} className="lg:col-span-4 lg:pb-2">
              <p className="type-lead max-w-[40ch] text-slate">{summary}</p>
              <p className="mt-5 text-[12px] uppercase tracking-[0.18em] text-slate">
                Last updated <time className="text-charcoal">{updated}</time>
              </p>
            </HeroFade>
          </div>
        </div>
      </section>

      <section className="bg-ivory pb-24 md:pb-36">
        <div className="page-x grid gap-12 border-t border-hairline pt-14 md:pt-20 lg:grid-cols-12 lg:gap-10">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-32">
              <PolicyToc items={sections.map((section) => ({ id: section.id, title: section.title }))} />
              <div className="mt-10 hidden border-t border-stone pt-6 lg:block">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate">Related</p>
                <ul className="mt-4 space-y-2.5">
                  {related
                    .filter((item) => item.href !== path)
                    .map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className="text-[14px] text-slate transition-colors hover:text-navy">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </aside>

          <article className="lg:col-span-8 lg:col-start-5">
            {sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-32 border-b border-stone py-10 first:pt-0 md:py-14"
                aria-labelledby={`${section.id}-title`}
              >
                <div className="grid gap-4 md:grid-cols-[3.5rem_1fr]">
                  <span className="pt-2 text-[12px] font-semibold tabular-nums tracking-[0.1em] text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 id={`${section.id}-title`} className="font-heading text-[26px] leading-tight text-charcoal md:text-[32px]">
                      {section.title}
                    </h2>
                    <div className="mt-5 max-w-[66ch] space-y-4 text-[15.5px] leading-[1.8] text-slate">
                      {section.body.map((block, blockIndex) =>
                        typeof block === "string" ? (
                          <p key={blockIndex}>{block}</p>
                        ) : (
                          <ul key={blockIndex} className="space-y-2.5">
                            {block.list.map((item) => (
                              <li key={item} className="flex gap-3">
                                <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </section>
            ))}

            <div className="mt-14 flex flex-col gap-6 rounded-3xl bg-ivory-deep p-8 md:flex-row md:items-center md:justify-between md:p-10">
              <div>
                <p className="font-heading text-[25px] leading-tight text-charcoal">Questions about this policy?</p>
                <p className="mt-2 text-[14px] text-slate">
                  Write to{" "}
                  <a href={`mailto:${site.email}`} className="text-navy underline underline-offset-2">
                    {site.email}
                  </a>{" "}
                  or call {site.phone.display}.
                </p>
              </div>
              <Link href="/contact" className="link-draw shrink-0 text-[13px] font-semibold text-navy">
                Contact us
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
