import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { chairHref, chairTypes } from "@/lib/catalog";
import { cn } from "@/lib/utils";

/** Tabs across the five chair pages, with previous / next on either side. */
export function TypeSwitcher({ current }: { current: string }) {
  const index = chairTypes.findIndex((type) => type.slug === current);
  const prev = chairTypes[(index - 1 + chairTypes.length) % chairTypes.length];
  const next = chairTypes[(index + 1) % chairTypes.length];

  return (
    <nav aria-label="Chair types" className="border-y border-hairline bg-ivory">
      <div className="page-x flex h-16 items-center gap-4">
        <Link
          href={chairHref(prev.slug)}
          aria-label={`Previous: ${prev.name}`}
          className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone text-charcoal transition-colors duration-300 hover:border-navy hover:bg-navy hover:text-ivory sm:flex"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
        </Link>
        <ul className="no-scrollbar mx-auto flex items-center gap-1 overflow-x-auto" data-lenis-prevent-horizontal>
          {chairTypes.map((type) => {
            const active = type.slug === current;
            return (
              <li key={type.slug} className="shrink-0">
                <Link
                  href={chairHref(type.slug)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex h-10 items-center gap-2 rounded-full px-4 text-[13px] font-medium transition-colors duration-300",
                    active ? "bg-navy text-ivory" : "text-charcoal/70 hover:bg-ivory-deep hover:text-charcoal",
                  )}
                >
                  <span className={cn("text-[10.5px] tabular-nums", active ? "text-gold" : "text-slate")}>
                    {type.index}
                  </span>
                  {type.short}
                </Link>
              </li>
            );
          })}
        </ul>
        <Link
          href={chairHref(next.slug)}
          aria-label={`Next: ${next.name}`}
          className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone text-charcoal transition-colors duration-300 hover:border-navy hover:bg-navy hover:text-ivory sm:flex"
        >
          <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
        </Link>
      </div>
    </nav>
  );
}
