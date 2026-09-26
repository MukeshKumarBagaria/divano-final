import { cn } from "@/lib/utils";

/**
 * A page H1 whose lines rise out of a mask on first paint. Pure CSS, so it
 * plays before hydration and again on every client-side navigation.
 */
export function HeroTitle({
  lines,
  className,
  delay = 0.45,
  size = "lg",
  as: Tag = "h1",
}: {
  lines: string[];
  className?: string;
  delay?: number;
  size?: "lg" | "md";
  as?: "h1" | "p";
}) {
  return (
    <Tag className={cn(size === "lg" ? "type-hero" : "type-hero-md", className)}>
      {lines.map((text, i) => (
        <span key={text} className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
          {i > 0 ? " " : null}
          <span className="hero-intro-line block" style={{ animationDelay: `${delay + i * 0.1}s` }}>
            {text}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/** Soft rise for the copy around a HeroTitle. */
export function HeroFade({
  delay,
  className,
  children,
}: {
  delay: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("hero-intro-fade", className)} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}
