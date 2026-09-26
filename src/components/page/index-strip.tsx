import Link from "next/link";
import { cn } from "@/lib/utils";

export type IndexItem = { label: string; href: string };

/**
 * A numbered contents strip, echoing the homepage hero's slide index: a
 * hairline per entry that fills on hover.
 */
export function IndexStrip({
  items,
  tone = "dark",
  className,
  label = "In this collection",
}: {
  items: IndexItem[];
  tone?: "dark" | "light";
  className?: string;
  label?: string;
}) {
  return (
    <nav aria-label={label} className={cn("hero-intro-fade", className)} style={{ animationDelay: "1.2s" }}>
      <ol
        className="no-scrollbar -mx-5 flex gap-4 overflow-x-auto px-5 sm:mx-0 sm:grid sm:gap-6 sm:overflow-visible sm:px-0"
        style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
      >
        {items.map((item, index) => (
          <li key={item.href} className="w-[42vw] shrink-0 sm:w-auto">
            <Link href={item.href} className="group block pt-3">
              <span
                className={cn(
                  "relative block h-px w-full overflow-hidden",
                  tone === "dark" ? "bg-stone" : "bg-ivory/20",
                )}
              >
                <span
                  className={cn(
                    "absolute inset-0 origin-left scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100",
                    tone === "dark" ? "bg-navy" : "bg-ivory",
                  )}
                />
              </span>
              <span className="mt-3 flex items-baseline gap-2.5 text-[12.5px] tracking-[0.02em]">
                <span className="tabular-nums text-gold">{String(index + 1).padStart(2, "0")}</span>
                <span
                  className={cn(
                    "truncate transition-colors duration-300",
                    tone === "dark"
                      ? "text-charcoal/70 group-hover:text-charcoal"
                      : "text-ivory/60 group-hover:text-ivory",
                  )}
                >
                  {item.label}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
