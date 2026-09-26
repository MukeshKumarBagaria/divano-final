import Image from "next/image";

type CategoryHeroProps = {
  image: string;
  alt: string;
  title: string;
  lead: string;
};

export function CategoryHero({ image, alt, title, lead }: CategoryHeroProps) {
  return (
    <section className="relative flex h-[78vh] min-h-[480px] w-full items-end overflow-hidden">
      <Image
        src={image}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.85),rgba(0,0,0,0.35)_45%,rgba(0,0,0,0.15))]"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-14 md:pb-20">
        <h1 className="max-w-[14ch] font-heading text-[35px] leading-[1.04] tracking-[-0.02em] text-primary-text-light sm:text-[46px] md:text-[58px]">
          {title}
        </h1>
        <p className="mt-5 max-w-[52ch] font-sans text-base text-primary-text-light/85 md:text-lg">
          {lead}
        </p>
      </div>
    </section>
  );
}
