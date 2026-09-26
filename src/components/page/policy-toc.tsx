"use client";

import { useEffect, useState } from "react";
import { scrollToTarget } from "@/components/smooth-scroll";
import { cn } from "@/lib/utils";

/** Contents list that follows the reader down a long policy. */
export function PolicyToc({ items }: { items: { id: string; title: string }[] }) {
  const [current, setCurrent] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.isIntersecting && setCurrent(entry.target.id));
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate">On this page</p>
      <ol className="mt-4 space-y-1">
        {items.map((item, index) => {
          const active = current === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToTarget(`#${item.id}`);
                  history.replaceState(null, "", `#${item.id}`);
                }}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "flex items-baseline gap-3 py-1.5 text-[14px] leading-snug transition-colors duration-300",
                  active ? "text-charcoal" : "text-slate hover:text-charcoal",
                )}
              >
                <span className={cn("text-[11px] tabular-nums", active ? "text-gold" : "text-slate/60")}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
