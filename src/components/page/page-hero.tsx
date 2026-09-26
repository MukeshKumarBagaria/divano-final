import { Breadcrumbs } from "@/components/page/breadcrumbs";
import { HeroFade, HeroTitle } from "@/components/page/hero-title";
import { HeroFrame } from "@/components/page/hero-frame";
import { IndexStrip, type IndexItem } from "@/components/page/index-strip";
import type { Crumb } from "@/lib/seo";

type PageHeroProps = {
  crumbs: Crumb[];
  eyebrow: string;
  title: string[];
  lead: string;
  actions?: React.ReactNode;
  image?: { src: string; alt: string; focus?: string };
  index?: IndexItem[];
  indexLabel?: string;
};

/**
 * The editorial hero shared by inner pages: headline set on ivory, then a
 * framed photograph that opens to full bleed as you scroll.
 */
export function PageHero({ crumbs, eyebrow, title, lead, actions, image, index, indexLabel }: PageHeroProps) {
  return (
    <section className="relative bg-ivory pt-8 md:pt-12">
      <div className="page-x">
        <Breadcrumbs items={crumbs} />
        <div className="mt-12 grid gap-10 md:mt-20 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-8">
            <HeroFade delay={0.3}>
              <p className="eyebrow">{eyebrow}</p>
            </HeroFade>
            <HeroTitle lines={title} className="mt-6 text-charcoal" />
          </div>
          <HeroFade delay={0.85} className="lg:col-span-4 lg:pb-2">
            <p className="type-lead max-w-[40ch] text-slate">{lead}</p>
            {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
          </HeroFade>
        </div>
      </div>

      {image ? (
        <HeroFrame
          src={image.src}
          alt={image.alt}
          focus={image.focus}
          className="mt-12 h-[58svh] min-h-[360px] md:mt-20 md:h-[82svh] md:max-h-[880px]"
        />
      ) : null}

      {index ? (
        <div className="page-x mt-8 md:mt-10">
          <IndexStrip items={index} label={indexLabel} />
        </div>
      ) : null}
    </section>
  );
}
