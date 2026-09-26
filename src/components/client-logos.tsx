// The brief asks for a "Trusted by" logo wall using real clients shown with
// their permission. Until those are cleared, this band names the kinds of
// spaces the range is built for instead of implying endorsements.
const sectors = [
  "Corporate offices",
  "Co-working spaces",
  "Hotels and resorts",
  "Restaurants and cafés",
  "Homes and residences",
  "Clinics",
  "Schools and campuses",
];

export function ClientLogos() {
  return (
    <section className="border-y border-hairline bg-ivory py-12 md:py-16" aria-label="Spaces we furnish">
      <p className="page-x text-center text-[12px] text-slate" data-reveal="fade">
        Furnishing spaces of every kind
      </p>
      <div className="marquee mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <ul className="marquee-track flex w-max items-center" style={{ "--marquee-duration": "48s" } as React.CSSProperties}>
          {[...sectors, ...sectors].map((sector, index) => (
            <li
              key={`${sector}-${index}`}
              aria-hidden={index >= sectors.length}
              className="flex items-center"
            >
              <span className="whitespace-nowrap px-8 font-heading text-[30px] italic leading-none text-charcoal/80 md:px-12 md:text-[41px]">
                {sector}
              </span>
              <span aria-hidden className="h-2 w-2 rotate-45 border border-gold" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
