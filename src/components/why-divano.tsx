const points = [
  {
    title: "Thoughtful design",
    body: "Proportions, mechanisms and details considered for how each piece is actually used.",
  },
  {
    title: "Premium materials",
    body: "Fabrics, leathers, foams and frames specified piece by piece.",
  },
  {
    title: "Designed for modern spaces",
    body: "For homes, offices and hospitality, and the ways they now overlap.",
  },
  {
    title: "Made for business",
    body: "Bulk orders, custom configurations and expert consultation.",
  },
];

export function WhyDivano() {
  return (
    <section className="bg-ivory pb-24 md:pb-32" aria-labelledby="why-heading">
      <div className="page-x">
        <div className="border-t border-hairline pt-24 text-center md:pt-32">
          <h2 id="why-heading" className="eyebrow eyebrow-center" data-reveal="fade">
            Why Divano Elegante
          </h2>

          <div className="relative mt-14 md:mt-20">
            <span
              aria-hidden
              data-draw
              className="absolute left-[12.5%] right-[12.5%] top-[5px] hidden h-px bg-stone md:block"
            />
            <ul className="grid grid-cols-2 gap-x-5 gap-y-14 md:grid-cols-4 md:gap-8" data-reveal="stagger" data-reveal-delay="0.3">
              {points.map((point) => (
                <li key={point.title} className="relative flex flex-col items-center">
                  <span aria-hidden className="h-[11px] w-[11px] rotate-45 border border-gold bg-ivory" />
                  <h3 className="mt-8 max-w-[12ch] font-heading text-[21px] leading-[1.05] text-charcoal md:text-[26px]">
                    {point.title}
                  </h3>
                  <p className="mt-4 max-w-[28ch] text-[14px] leading-relaxed text-slate">
                    {point.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <p
            className="mx-auto mt-20 max-w-[22ch] font-heading text-[30px] italic leading-tight text-navy md:mt-28 md:text-[41px]"
            data-reveal="lines"
          >
            Crafted with purpose. Designed to last.
          </p>
        </div>
      </div>
    </section>
  );
}
