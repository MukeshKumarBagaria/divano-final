import { cn } from "@/lib/utils";

/**
 * Eyebrow + heading on the left, a lead or action on the right, all wired to
 * the scroll reveals. Keeps section openings consistent across inner pages.
 */
export function SectionHeader({
  id,
  eyebrow,
  title,
  lead,
  aside,
  tone = "dark",
  align = "split",
  className,
  titleClassName,
}: {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
  aside?: React.ReactNode;
  tone?: "dark" | "light";
  align?: "split" | "center";
  className?: string;
  titleClassName?: string;
}) {
  const dark = tone === "dark";
  if (align === "center") {
    return (
      <div className={cn("flex flex-col items-center text-center", className)}>
        {eyebrow ? (
          <p className="eyebrow eyebrow-center" data-reveal="fade">
            {eyebrow}
          </p>
        ) : null}
        <h2
          id={id}
          className={cn("type-h2 mt-6 max-w-[18ch]", dark ? "text-charcoal" : "text-ivory", titleClassName)}
          data-reveal="lines"
        >
          {title}
        </h2>
        {lead ? (
          <p
            className={cn("type-lead mt-6 max-w-[48ch]", dark ? "text-slate" : "text-ivory/70")}
            data-reveal="fade"
            data-reveal-delay="0.15"
          >
            {lead}
          </p>
        ) : null}
        {aside ? (
          <div className="mt-8" data-reveal="fade" data-reveal-delay="0.2">
            {aside}
          </div>
        ) : null}
      </div>
    );
  }
  return (
    <div className={cn("grid gap-8 lg:grid-cols-12 lg:items-end", className)}>
      <div className="lg:col-span-7">
        {eyebrow ? (
          <p className="eyebrow" data-reveal="fade">
            {eyebrow}
          </p>
        ) : null}
        <h2
          id={id}
          className={cn("type-h2 max-w-[14ch]", eyebrow && "mt-6", dark ? "text-charcoal" : "text-ivory", titleClassName)}
          data-reveal="lines"
        >
          {title}
        </h2>
      </div>
      {lead || aside ? (
        <div className="lg:col-span-4 lg:col-start-9" data-reveal="fade" data-reveal-delay="0.15">
          {lead ? (
            <p className={cn("type-lead max-w-[40ch]", dark ? "text-slate" : "text-ivory/70")}>{lead}</p>
          ) : null}
          {aside ? <div className={cn(lead && "mt-6")}>{aside}</div> : null}
        </div>
      ) : null}
    </div>
  );
}
