import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "dark" | "light";

const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

/**
 * The site's primary button: a pill with the arrow in its own disc.
 * `dark` is navy for ivory sections; `light` is ivory for navy sections.
 */
export function PillLink({
  href,
  tone = "dark",
  className,
  children,
}: {
  href: string;
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  const external = isExternal(href);
  const Component = external ? "a" : Link;
  return (
    <Component
      href={href}
      {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group inline-flex h-[52px] w-fit items-center gap-3 whitespace-nowrap rounded-full pl-7 pr-2 text-[13.5px] font-semibold transition-colors duration-300",
        tone === "dark" ? "bg-navy text-ivory hover:bg-navy-deep" : "bg-ivory text-navy hover:bg-white",
        className,
      )}
    >
      {children}
      <span
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-500 ease-out group-hover:translate-x-0.5",
          tone === "dark" ? "bg-ivory text-navy" : "bg-navy text-ivory",
        )}
      >
        <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
      </span>
    </Component>
  );
}

/** The quieter partner to PillLink: a hairline outline pill. */
export function OutlineLink({
  href,
  tone = "dark",
  className,
  children,
}: {
  href: string;
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  const external = isExternal(href);
  const Component = external ? "a" : Link;
  return (
    <Component
      href={href}
      {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "inline-flex h-[52px] w-fit items-center gap-2.5 whitespace-nowrap rounded-full border px-7 text-[13.5px] font-semibold transition-colors duration-300",
        tone === "dark"
          ? "border-charcoal/20 text-charcoal hover:border-navy hover:bg-navy hover:text-ivory"
          : "border-ivory/25 text-ivory hover:border-ivory hover:bg-ivory/10",
        className,
      )}
    >
      {children}
    </Component>
  );
}
