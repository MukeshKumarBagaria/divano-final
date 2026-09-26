import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HeroFade, HeroTitle } from "@/components/page/hero-title";
import { OutlineLink, PillLink } from "@/components/ui/pill-link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const worlds = [
  { title: "Ergonomic Chairs", href: "/ergonomic-chairs", image: "/images/cat-chairs.jpg", focus: "42% 50%" },
  { title: "Sofas", href: "/sofas", image: "/images/cat-sofas.jpg", focus: "40% 60%" },
  { title: "Phone Booths", href: "/phone-booths", image: "/images/cat-booths.jpg", focus: "66% 50%" },
];

export default function NotFound() {
  return (
    <section className="bg-ivory pb-24 pt-16 md:pb-32 md:pt-24">
      <div className="page-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <HeroFade delay={0.2}>
              <p className="eyebrow">Error 404</p>
            </HeroFade>
            <HeroTitle lines={["This room", "is still empty."]} className="mt-6 text-charcoal" />
          </div>
          <HeroFade delay={0.8} className="lg:col-span-4 lg:pb-2">
            <p className="type-lead max-w-[36ch] text-slate">
              The page you were looking for has moved or never existed. Let us take you somewhere
              more comfortable.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PillLink href="/">Back to home</PillLink>
              <OutlineLink href="/contact">Contact us</OutlineLink>
            </div>
          </HeroFade>
        </div>

        <HeroFade delay={1.1}>
          <ul className="mt-16 grid gap-5 md:mt-24 md:grid-cols-3 md:gap-6">
            {worlds.map((world) => (
              <li key={world.href}>
                <Link href={world.href} className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-navy">
                  <Image
                    src={world.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-[scale] duration-[1.4s] ease-out group-hover:scale-[1.06]"
                    style={{ objectPosition: world.focus }}
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(0deg,rgba(12,29,45,0.78)_0%,rgba(12,29,45,0)_60%)]"
                  />
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                    <span className="font-heading text-[26px] leading-none text-ivory">{world.title}</span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/30 text-ivory transition-[background-color,color,rotate] duration-500 ease-out group-hover:rotate-45 group-hover:bg-ivory group-hover:text-navy">
                      <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </HeroFade>
      </div>
    </section>
  );
}
