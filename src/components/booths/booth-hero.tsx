import Image from "next/image";
import { Breadcrumbs } from "@/components/page/breadcrumbs";
import { HeroFade, HeroTitle } from "@/components/page/hero-title";
import { IndexStrip } from "@/components/page/index-strip";
import { OutlineLink, PillLink } from "@/components/ui/pill-link";
import { boothSizes } from "@/lib/catalog";

/** The phone booth page opens dark, like the booth section on the homepage. */
export function BoothHero() {
  return (
    <section className="relative overflow-hidden bg-navy-deep text-ivory">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-60 top-10 h-[820px] w-[820px] rounded-full bg-[radial-gradient(circle,rgba(240,180,106,0.16)_0%,rgba(240,180,106,0)_62%)]"
      />
      <div className="page-x relative pb-12 pt-8 md:pb-16 md:pt-12">
        <Breadcrumbs tone="light" items={[{ name: "Phone Booths", path: "/phone-booths" }]} />

        <div className="mt-10 grid gap-12 md:mt-14 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-6">
            <HeroFade delay={0.3}>
              <p className="eyebrow">Acoustic phone booths</p>
            </HeroFade>
            <HeroTitle lines={["Somewhere quiet", "to take the call."]} size="md" className="mt-6 text-ivory" />
            <HeroFade delay={0.85}>
              <p className="type-lead mt-7 max-w-[42ch] text-ivory/70">
                Acoustic booths and meeting pods for open-plan floors, built in the same factory as
                our seating, then delivered and installed by our own team.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <PillLink href="#sizes" tone="light">
                  Choose a size
                </PillLink>
                <OutlineLink href="#consultation" tone="light">
                  Plan your floor
                </OutlineLink>
              </div>
            </HeroFade>
          </div>

          <div className="lg:col-span-6">
            <div className="frame-reveal relative aspect-[4/3] overflow-hidden rounded-2xl bg-navy lg:aspect-[5/4]">
              <div className="hero-intro-zoom absolute inset-0">
                <Image
                  src="/images/cat-booths.jpg"
                  alt="A woman working in an acoustic booth lit with warm amber light in a navy office"
                  fill
                  preload
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: "62% 50%" }}
                />
              </div>
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(0deg,rgba(12,29,45,0.5)_0%,rgba(12,29,45,0)_40%)]"
              />
              <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-ivory/95 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy backdrop-blur md:bottom-6 md:left-6">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                Delivered and installed by us
              </span>
            </div>
          </div>
        </div>

        <IndexStrip
          tone="light"
          className="mt-14 md:mt-20"
          label="Booth sizes"
          items={boothSizes.map((size) => ({ label: size.name, href: `#${size.id}` }))}
        />
      </div>
    </section>
  );
}
