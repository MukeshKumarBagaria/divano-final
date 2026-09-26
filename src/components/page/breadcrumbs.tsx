import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo";
import { cn } from "@/lib/utils";

/** Visible trail plus its BreadcrumbList structured data. "Home" is added for you. */
export function Breadcrumbs({
  items,
  tone = "dark",
  className,
}: {
  items: Crumb[];
  tone?: "dark" | "light";
  className?: string;
}) {
  const trail = [{ name: "Home", path: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className={cn("hero-intro-fade", className)} style={{ animationDelay: "0.2s" }}>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] tracking-[0.02em]">
        {trail.map((crumb, index) => {
          const last = index === trail.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-3">
              {index > 0 ? (
                <span aria-hidden className="h-1 w-1 rotate-45 bg-gold" />
              ) : null}
              {last ? (
                <span aria-current="page" className={tone === "dark" ? "text-charcoal" : "text-ivory"}>
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.path}
                  className={cn(
                    "transition-colors duration-300",
                    tone === "dark" ? "text-slate hover:text-navy" : "text-ivory/60 hover:text-ivory",
                  )}
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
