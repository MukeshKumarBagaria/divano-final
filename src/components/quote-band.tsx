import Link from "next/link";

type QuoteBandProps = {
  heading: string;
  body: string;
};

export function QuoteBand({ heading, body }: QuoteBandProps) {
  return (
    <section className="w-full bg-ink-deep py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-6">
        <div className="max-w-[44ch]">
          <h2 className="font-heading text-[28px] leading-[1.1] tracking-[-0.01em] text-primary-text-light md:text-[37px]">
            {heading}
          </h2>
          <p className="mt-5 font-sans text-base text-ink-soft md:text-lg">
            {body}
          </p>
        </div>

        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="#contact"
            className="rounded-full bg-brand px-7 py-3 font-sans text-base font-semibold text-primary-text-light transition-colors duration-150 ease hover:bg-brand/90"
          >
            Request a quote
          </Link>
          <Link
            href="/"
            className="rounded-full border border-ink-line px-7 py-3 font-sans text-base font-semibold text-primary-text-light transition-colors duration-150 ease hover:border-brand-light hover:text-brand-light"
          >
            See the factory
          </Link>
        </div>
      </div>
    </section>
  );
}
