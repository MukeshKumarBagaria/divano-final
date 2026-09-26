"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";
import { FaqAccordion } from "@/components/page/faq-accordion";
import { scrollToTarget } from "@/components/smooth-scroll";
import type { FaqGroup } from "@/lib/faqs";
import { cn } from "@/lib/utils";

/** Sticky topic list and search beside the grouped questions. */
export function FaqBrowser({ groups }: { groups: FaqGroup[] }) {
  const [query, setQuery] = useState("");
  const [current, setCurrent] = useState(groups[0].id);
  const q = query.trim().toLowerCase();

  const filtered = useMemo(
    () =>
      q
        ? groups
            .map((group) => ({
              ...group,
              faqs: group.faqs.filter((faq) => `${faq.q} ${faq.a}`.toLowerCase().includes(q)),
            }))
            .filter((group) => group.faqs.length)
        : groups,
    [groups, q],
  );
  const matches = filtered.reduce((sum, group) => sum + group.faqs.length, 0);

  // Highlight the topic in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.isIntersecting && setCurrent(entry.target.id));
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    groups.forEach((group) => {
      const el = document.getElementById(group.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [groups, filtered]);

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
      <aside className="lg:col-span-3">
        <div className="lg:sticky lg:top-32">
          <label htmlFor="faq-search" className="sr-only">
            Search questions
          </label>
          <div className="group relative flex items-center border-b border-charcoal/25">
            <Search className="h-4 w-4 shrink-0 text-slate" strokeWidth={1.5} />
            <input
              id="faq-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search questions"
              autoComplete="off"
              className="peer h-12 w-full bg-transparent pl-3 text-[15px] text-charcoal outline-none placeholder:text-slate/70 [&::-webkit-search-cancel-button]:hidden"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate hover:bg-ivory-deep hover:text-charcoal"
              >
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>
            ) : null}
            <span
              aria-hidden
              className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-navy transition-transform duration-700 ease-out peer-focus:scale-x-100"
            />
          </div>
          <p className="mt-3 h-5 text-[12px] text-slate" aria-live="polite">
            {q ? `${matches} ${matches === 1 ? "answer" : "answers"} for “${query.trim()}”` : null}
          </p>

          <nav aria-label="Topics" className="mt-6 hidden lg:block">
            <ul className="space-y-1">
              {groups.map((group) => {
                const available = filtered.some((entry) => entry.id === group.id);
                return (
                  <li key={group.id}>
                    <a
                      href={`#${group.id}`}
                      onClick={(event) => {
                        event.preventDefault();
                        scrollToTarget(`#${group.id}`);
                      }}
                      className={cn(
                        "flex items-center gap-3 py-2 text-[14px] transition-colors duration-300",
                        current === group.id ? "text-charcoal" : "text-slate hover:text-charcoal",
                        !available && "pointer-events-none opacity-35",
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "h-px bg-gold transition-[width] duration-500 ease-out",
                          current === group.id ? "w-6" : "w-0",
                        )}
                      />
                      {group.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>

      <div className="lg:col-span-8 lg:col-start-5">
        <AnimatePresence mode="wait" initial={false}>
          {filtered.length ? (
            <motion.div
              key={q || "all"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-20"
            >
              {filtered.map((group) => (
                <section key={group.id} id={group.id} className="scroll-mt-32" aria-labelledby={`${group.id}-title`}>
                  <h2 id={`${group.id}-title`} className="type-h3 text-charcoal">
                    {group.title}
                  </h2>
                  <div className="mt-8">
                    <FaqAccordion faqs={group.faqs} defaultOpen={q ? 0 : null} />
                  </div>
                </section>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-3xl border border-dashed border-stone p-10 text-center"
            >
              <p className="font-heading text-[26px] text-charcoal">No answers match that yet.</p>
              <p className="mt-2 text-[14px] text-slate">Try another word, or ask our team directly below.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
