import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/page/breadcrumbs";
import { HeroFade, HeroTitle } from "@/components/page/hero-title";
import { SectionHeader } from "@/components/page/section-header";
import { FaqSection } from "@/components/page/faq-section";
import { ChairGallery } from "@/components/chairs/chair-gallery";
import { TypeSwitcher } from "@/components/chairs/type-switcher";
import { ModelCard } from "@/components/chairs/model-card";
import { ChairCompare } from "@/components/chairs/chair-compare";
import { ConsultationBand } from "@/components/consultation-band";
import { JsonLd } from "@/components/json-ld";
import { OutlineLink, PillLink } from "@/components/ui/pill-link";
import { chairHref, chairTypes, getChairType } from "@/lib/catalog";
import { enquiryHref, inr } from "@/lib/format";
import { itemListJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return chairTypes.map((type) => ({ type: type.slug }));
}

export async function generateMetadata({ params }: PageProps<"/ergonomic-chairs/[type]">): Promise<Metadata> {
  const type = getChairType((await params).type);
  if (!type) return {};
  return pageMetadata({
    title: type.seo.title,
    description: type.seo.description,
    keywords: type.seo.keywords,
    path: chairHref(type.slug),
    image: { url: type.image.src, width: type.image.w ?? 1024, height: type.image.h ?? 1024, alt: type.image.alt },
  });
}

/** "Mid back chairs" → ["Mid back", "chairs"], so the H1 breaks where it reads best. */
const titleLines = (name: string) => {
  const words = name.split(" ");
  return [words.slice(0, -1).join(" "), words[words.length - 1]];
};

export default async function ChairTypePage({ params }: PageProps<"/ergonomic-chairs/[type]">) {
  const type = getChairType((await params).type);
  if (!type) notFound();

  const position = chairTypes.findIndex((entry) => entry.slug === type.slug) + 1;
  const from = Math.min(...type.models.map((model) => model.price));
  const others = chairTypes.filter((entry) => entry.slug !== type.slug);
  const gallery = [
    { src: type.image.src, alt: type.image.alt, fit: "cover" as const },
    ...type.models
      .filter((model) => model.image.src !== type.image.src)
      .map((model) => ({ src: model.image.src, alt: model.image.alt, fit: model.fit })),
  ];
  const cutout = type.models.find((model) => model.fit === "contain") ?? type.models[0];

  return (
    <>
      <JsonLd
        data={itemListJsonLd(
          `${type.name} models`,
          type.models.map((model) => ({ name: model.name, path: `${chairHref(type.slug)}#models`, image: model.image.src })),
        )}
      />

      {/* Hero */}
      <section className="bg-ivory pb-16 pt-8 md:pb-24 md:pt-12">
        <div className="page-x">
          <Breadcrumbs
            items={[
              { name: "Ergonomic Chairs", path: "/ergonomic-chairs" },
              { name: type.name, path: chairHref(type.slug) },
            ]}
          />
          <div className="mt-10 grid gap-12 md:mt-14 lg:grid-cols-12 lg:items-center lg:gap-10">
            <div className="lg:col-span-5">
              <HeroFade delay={0.3}>
                <p className="eyebrow">
                  Ergonomic chairs
                  <span className="tabular-nums text-slate">
                    {String(position).padStart(2, "0")} / {String(chairTypes.length).padStart(2, "0")}
                  </span>
                </p>
              </HeroFade>
              <HeroTitle lines={titleLines(type.name)} size="md" className="mt-6 text-charcoal" />
              <HeroFade delay={0.8}>
                <p className="mt-6 font-heading text-[21px] italic leading-snug text-navy md:text-[25px]">
                  {type.tagline}
                </p>
                <p className="type-lead mt-5 max-w-[46ch] text-slate">{type.intro}</p>
              </HeroFade>

              <HeroFade delay={1}>
                <dl className="mt-9 grid grid-cols-3 border-y border-stone">
                  {[
                    { label: "Back height", value: type.backHeight },
                    { label: "From", value: inr.format(from) },
                    { label: "Best for", value: type.bestFor[0] },
                  ].map((fact, index) => (
                    <div key={fact.label} className={index > 0 ? "border-l border-stone pl-4 py-4" : "py-4 pr-4"}>
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate">{fact.label}</dt>
                      <dd className="mt-1.5 font-heading text-[18px] leading-tight text-charcoal lining-nums tabular-nums md:text-[19px]">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-9 flex flex-wrap gap-3">
                  <PillLink href="#consultation">Request a quote</PillLink>
                  <OutlineLink href={site.whatsapp}>WhatsApp us</OutlineLink>
                </div>
              </HeroFade>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <ChairGallery images={gallery} />
            </div>
          </div>
        </div>
      </section>

      <TypeSwitcher current={type.slug} />

      {/* Why this chair */}
      <section className="bg-ivory py-24 md:py-36" aria-labelledby="why-heading">
        <div className="page-x">
          <SectionHeader
            id="why-heading"
            eyebrow={`Why a ${type.singular.toLowerCase()}`}
            title="Built for the job it does."
            lead={`Where a ${type.singular.toLowerCase()} earns its place, and what we build into every one.`}
          />
          <ol className="mt-16 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-8" data-reveal="stagger">
            {type.highlights.map((item, index) => (
              <li key={item.title}>
                <span className="text-[12px] font-semibold tabular-nums tracking-[0.1em] text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span aria-hidden className="mt-4 block h-px w-full bg-stone" />
                <h3 className="mt-6 font-heading text-[25px] leading-tight text-charcoal md:text-[28px]">{item.title}</h3>
                <p className="mt-3 max-w-[36ch] text-[15px] leading-relaxed text-slate">{item.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-16 flex flex-wrap items-center gap-3 md:mt-20" data-reveal="fade">
            <span className="mr-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate">Best for</span>
            {type.bestFor.map((use) => (
              <span key={use} className="rounded-full border border-stone px-4 py-2 text-[13px] text-charcoal">
                {use}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Models */}
      <section id="models" className="scroll-mt-24 bg-ivory-deep py-24 md:py-36" aria-labelledby="models-heading">
        <div className="page-x">
          <SectionHeader
            id="models-heading"
            eyebrow="The models"
            title={`${type.short} models`}
            lead="Shown in their standard finish. Every model can be upholstered and finished to order."
            aside={
              <Link href={enquiryHref(type.name)} className="link-draw text-[13px] font-semibold text-navy">
                Ask about a custom build
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            }
          />
          <ul className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
            {type.models.map((model, index) => (
              <li key={model.name}>
                <ModelCard model={model} delay={index * 0.12} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Specification */}
      <section className="bg-ivory py-24 md:py-36" aria-labelledby="spec-heading">
        <div className="page-x grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="eyebrow" data-reveal="fade">
              Specification
            </p>
            <h2 id="spec-heading" className="type-h2 mt-6 max-w-[10ch] text-charcoal" data-reveal="lines">
              The standard build.
            </h2>
            <p className="type-lead mt-6 max-w-[40ch] text-slate" data-reveal="fade">
              Figures describe the standard build. Most of them can change for your order, so ask
              for a custom specification if you need one.
            </p>
            <div
              className="relative mt-12 hidden aspect-[4/3] max-w-[440px] overflow-hidden rounded-2xl bg-white lg:block"
              data-reveal="image"
            >
              <div data-reveal-inner className="absolute inset-0">
                <Image
                  src={cutout.image.src}
                  alt={cutout.image.alt}
                  fill
                  sizes="440px"
                  className={cutout.fit === "contain" ? "object-contain p-8" : "object-cover"}
                />
              </div>
            </div>
          </div>
          <dl className="border-t border-stone lg:col-span-6 lg:col-start-7" data-reveal="stagger">
            {type.specs.map((spec) => (
              <div key={spec.label} className="grid grid-cols-[1fr_1.4fr] gap-6 border-b border-stone py-5 md:py-6">
                <dt className="text-[13px] text-slate">{spec.label}</dt>
                <dd className="text-[15px] text-charcoal md:text-[16px]">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Compare */}
      <section className="bg-ivory-deep py-24 md:py-36" aria-labelledby="compare-heading">
        <div className="page-x">
          <SectionHeader
            id="compare-heading"
            eyebrow="Side by side"
            title="How it compares."
            lead="Five chair types, one factory standard. Here is where this one sits in the range."
          />
          <div className="mt-14 md:mt-16">
            <ChairCompare highlight={type.slug} />
          </div>
        </div>
      </section>

      <FaqSection faqs={type.faqs} title={`${type.short}, answered.`} />

      {/* Other types */}
      <section className="bg-ivory pb-24 md:pb-36" aria-labelledby="other-types-heading">
        <div className="page-x">
          <div className="flex flex-wrap items-end justify-between gap-6 border-t border-hairline pt-16 md:pt-24">
            <h2 id="other-types-heading" className="type-h3 text-charcoal" data-reveal="lines">
              Other chair types
            </h2>
            <Link href="/ergonomic-chairs" className="link-draw text-[13px] font-semibold text-navy" data-reveal="fade">
              All ergonomic chairs
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:mt-14 lg:grid-cols-4 lg:gap-x-6" data-reveal="stagger">
            {others.map((other) => (
              <li key={other.slug}>
                <Link href={chairHref(other.slug)} className="group block">
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#ecebe8]">
                    <Image
                      src={other.image.src}
                      alt={other.image.alt}
                      fill
                      sizes="(min-width: 1024px) 24vw, 45vw"
                      className="object-cover transition-[scale] duration-[1.2s] ease-out group-hover:scale-[1.05]"
                    />
                    <span className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-ivory/90 text-navy opacity-0 backdrop-blur transition-[opacity,rotate] duration-500 ease-out group-hover:rotate-45 group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                  </div>
                  <h3 className="mt-4 font-heading text-[19px] leading-tight text-charcoal md:text-[23px]">{other.name}</h3>
                  <p className="mt-1 text-[13px] text-slate">{other.note}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ConsultationBand
        heading={`${type.short} chairs for your space.`}
        lead={`Tell us how many ${type.name.toLowerCase()} you need and where they will go. We will confirm the specification, arrange samples and send a quote.`}
        interest="Ergonomic chairs"
      />
    </>
  );
}
