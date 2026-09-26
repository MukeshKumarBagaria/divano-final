"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";

export function Newsletter() {
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

  return (
    <section className="bg-ivory py-24 md:py-32" aria-labelledby="edit-heading">
      <div className="page-x flex flex-col items-center text-center">
        <h2
          id="edit-heading"
          className="font-heading text-[54px] font-light leading-none tracking-[-0.03em] text-charcoal md:text-[82px]"
          data-reveal="lines"
        >
          The Edit
        </h2>
        <p className="mt-5 max-w-[34ch] text-[15px] leading-relaxed text-slate" data-reveal="fade">
          New collections. Design inspiration. Furniture insights.
        </p>

        <form
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            const email = new FormData(event.currentTarget).get("email")?.toString().trim() ?? "";
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
              setStatus("error");
              return;
            }
            // PLACEHOLDER — connect this to the newsletter service.
            setStatus("done");
            event.currentTarget.reset();
          }}
          className="mt-10 w-full max-w-[520px]"
          data-reveal="fade"
          data-reveal-delay="0.1"
        >
          <label htmlFor="edit-email" className="sr-only">
            Email address
          </label>
          <div className="group relative flex items-center border-b border-charcoal/30">
            <input
              id="edit-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              aria-invalid={status === "error" ? true : undefined}
              aria-describedby="edit-status"
              onChange={() => status !== "idle" && setStatus("idle")}
              className="peer h-14 w-full bg-transparent text-[16px] text-charcoal outline-none placeholder:text-slate/70"
            />
            <button
              type="submit"
              aria-label="Subscribe to The Edit"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy text-ivory transition-transform duration-500 ease-out hover:translate-x-1"
            >
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </button>
            <span
              aria-hidden
              className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-navy transition-transform duration-700 ease-out peer-focus:scale-x-100"
            />
          </div>
          <div id="edit-status" aria-live="polite" className="mt-4 h-5 text-[13px]">
            <AnimatePresence mode="wait">
              {status === "done" ? (
                <motion.p
                  key="done"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="inline-flex items-center gap-2 text-navy"
                >
                  <Check className="h-4 w-4 text-gold" strokeWidth={2} />
                  You&apos;re on the list. The next Edit is on its way.
                </motion.p>
              ) : status === "error" ? (
                <motion.p
                  key="error"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[#a8483a]"
                >
                  Enter an email like name@example.com
                </motion.p>
              ) : null}
            </AnimatePresence>
          </div>
        </form>
      </div>
    </section>
  );
}
