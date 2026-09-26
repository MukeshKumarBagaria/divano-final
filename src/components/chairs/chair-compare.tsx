import Image from "next/image";
import Link from "next/link";
import { chairHref, chairTypes, type ChairType } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const rows: { key: keyof ChairType["compare"]; label: string }[] = [
  { key: "use", label: "Best for" },
  { key: "support", label: "Back support" },
  { key: "adjust", label: "Adjustments" },
  { key: "upholstery", label: "Upholstery" },
  { key: "hours", label: "Made for" },
];

/** All five chair types side by side; `highlight` marks the page you're on. */
export function ChairCompare({ highlight }: { highlight?: string }) {
  return (
    <div className="no-scrollbar -mx-5 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0" data-lenis-prevent-horizontal>
      <table className="w-full min-w-[920px] border-collapse text-left" data-reveal="fade">
        <caption className="sr-only">Comparison of the five ergonomic chair types</caption>
        <thead>
          <tr>
            <th scope="col" className="w-[15%] pb-6 align-bottom">
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate">Compare</span>
            </th>
            {chairTypes.map((type) => {
              const current = type.slug === highlight;
              return (
                <th
                  key={type.slug}
                  scope="col"
                  className={cn("w-[17%] px-4 pb-6 align-bottom font-normal", current && "rounded-t-2xl bg-white")}
                >
                  <Link href={chairHref(type.slug)} className="group block pt-4">
                    <span className="relative block aspect-square w-16 overflow-hidden rounded-xl bg-[#ecebe8]">
                      <Image src={type.image.src} alt="" fill sizes="64px" className="object-cover" />
                    </span>
                    <span className="mt-4 block font-heading text-[21px] leading-none text-charcoal transition-colors group-hover:text-navy">
                      {type.short}
                    </span>
                    <span className="mt-1.5 block text-[12px] tabular-nums text-slate">{type.backHeight}</span>
                    {current ? (
                      <span className="mt-3 inline-block rounded-full border border-gold/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7d6027]">
                        You&apos;re here
                      </span>
                    ) : null}
                  </Link>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={row.key}>
              <th scope="row" className="border-t border-stone py-5 pr-4 align-top text-[12.5px] font-semibold text-charcoal">
                {row.label}
              </th>
              {chairTypes.map((type) => {
                const current = type.slug === highlight;
                return (
                  <td
                    key={type.slug}
                    className={cn(
                      "border-t border-stone px-4 py-5 align-top text-[14px] leading-relaxed text-slate",
                      current && "bg-white text-charcoal",
                      current && rowIndex === rows.length - 1 && "rounded-b-2xl",
                    )}
                  >
                    {type.compare[row.key]}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
