"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown, Mail, Phone } from "lucide-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { requestConsultation, type ConsultationState } from "@/app/actions";
import { interests } from "@/lib/consultation";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

const initialState: ConsultationState = { status: "idle" };
const EASE = [0.22, 1, 0.36, 1] as const;

const contacts = [
  { icon: Phone, label: site.phone.display, href: site.phone.href },
  { icon: IconBrandWhatsapp, label: "Chat on WhatsApp", href: site.whatsapp },
  { icon: Mail, label: site.email, href: `mailto:${site.email}` },
];

type Interest = (typeof interests)[number];

export function ConsultationBand({
  heading = "Let\u2019s design your space.",
  lead = "Looking for furniture for your home, office or commercial space? Talk to our team about your requirements.",
  interest,
}: {
  heading?: string;
  lead?: string;
  /** Pre-selects "What are you looking for?" on category pages. */
  interest?: Interest;
} = {}) {
  const [formKey, setFormKey] = useState(0);

  return (
    <section
      id="consultation"
      aria-labelledby="consultation-heading"
      className="relative scroll-mt-20 overflow-hidden bg-navy py-24 text-ivory md:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(198,161,91,0.16)_0%,rgba(198,161,91,0)_65%)]"
      />
      <div className="page-x relative grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <h2
            id="consultation-heading"
            className="type-h2 max-w-[10ch] text-ivory"
            data-reveal="lines"
          >
            {heading}
          </h2>
          <p className="type-lead mt-7 max-w-[38ch] text-ivory/70" data-reveal="fade">
            {lead}
          </p>

          <div className="mt-12 border-t border-ivory/15 pt-8" data-reveal="fade">
            <p className="text-[13px] text-ivory/55">Prefer to talk now?</p>
            <ul className="mt-5 space-y-4">
              {contacts.map((contact) => (
                <li key={contact.label}>
                  <a
                    href={contact.href}
                    target={contact.href.startsWith("http") ? "_blank" : undefined}
                    rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group inline-flex items-center gap-3.5 text-[15px] text-ivory"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20 text-gold transition-colors duration-300 group-hover:border-gold">
                      <contact.icon size={17} className="h-[17px] w-[17px]" strokeWidth={1.5} />
                    </span>
                    <span className="border-b border-transparent transition-colors duration-300 group-hover:border-ivory/40">
                      {contact.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7" data-reveal="fade" data-reveal-delay="0.15">
          <ConsultationForm
            key={formKey}
            interest={interest}
            onReset={() => setFormKey((key) => key + 1)}
          />
        </div>
      </div>
    </section>
  );
}

function ConsultationForm({ interest, onReset }: { interest?: Interest; onReset: () => void }) {
  const reduceMotion = useReducedMotion();
  const [state, formAction, pending] = useActionState(requestConsultation, initialState);

  return (
    <div className="rounded-3xl border border-ivory/10 bg-navy-deep/50 p-7 backdrop-blur-sm md:p-12">
      <AnimatePresence mode="wait" initial={false}>
        {state.status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex min-h-[440px] flex-col justify-center"
            aria-live="polite"
          >
            <svg viewBox="0 0 52 52" className="h-14 w-14 text-gold" aria-hidden>
              <motion.circle
                cx="26"
                cy="26"
                r="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                initial={{ pathLength: reduceMotion ? 1 : 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, ease: EASE }}
              />
              <motion.path
                d="M16 27 L23 34 L37 19"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: reduceMotion ? 1 : 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
              />
            </svg>
            <h3 className="mt-8 font-heading text-[35px] leading-none text-ivory">
              Request received
            </h3>
            <p className="mt-4 max-w-[38ch] text-[15px] leading-relaxed text-ivory/70">
              Our team will call you within one working day to talk through sizes, materials
              and a quote.
            </p>
            <button
              type="button"
              onClick={onReset}
              className="link-draw mt-10 self-start text-[13px] font-semibold text-ivory"
            >
              Send another request
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            action={formAction}
            noValidate
            exit={{ opacity: 0, y: reduceMotion ? 0 : -8, transition: { duration: 0.3 } }}
          >
            <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
              <Field
                name="name"
                label="Full name"
                autoComplete="name"
                defaultValue={state.values?.name}
                error={state.errors?.name}
                className="sm:col-span-2"
              />
              <Field
                name="phone"
                label="Phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                defaultValue={state.values?.phone}
                error={state.errors?.phone}
              />
              <Field
                name="email"
                label="Email"
                type="email"
                inputMode="email"
                autoComplete="email"
                defaultValue={state.values?.email}
                error={state.errors?.email}
              />

              <div className="sm:col-span-2">
                <label htmlFor="interest" className="sr-only">
                  What are you looking for?
                </label>
                <div className="group relative">
                  <select
                    id="interest"
                    name="interest"
                    required
                    defaultValue={state.values?.interest ?? interest ?? ""}
                    aria-invalid={state.errors?.interest ? true : undefined}
                    aria-describedby={state.errors?.interest ? "interest-error" : undefined}
                    className="peer h-14 w-full cursor-pointer appearance-none border-b border-ivory/25 bg-transparent pr-8 text-[16px] text-ivory outline-none transition-colors invalid:text-ivory/55 aria-invalid:border-[#e8a598]"
                  >
                    <option value="" disabled className="text-charcoal">
                      What are you looking for?
                    </option>
                    {interests.map((interest) => (
                      <option key={interest} value={interest} className="text-charcoal">
                        {interest}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-ivory/60"
                    strokeWidth={1.5}
                  />
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-700 ease-out peer-focus:scale-x-100"
                  />
                </div>
                {state.errors?.interest ? (
                  <p id="interest-error" className="mt-2 text-[12.5px] text-[#e8a598]">
                    {state.errors.interest}
                  </p>
                ) : null}
              </div>
            </div>

            <p className="mt-9 text-[12px] leading-relaxed text-ivory/50">
              By requesting a consultation you agree to our{" "}
              <Link href="/terms" className="underline underline-offset-2 hover:text-ivory">
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-ivory">
                Privacy Policy
              </Link>
              .
            </p>

            <button
              type="submit"
              disabled={pending}
              className="group mt-7 inline-flex h-[56px] w-full items-center justify-between gap-3 whitespace-nowrap rounded-full bg-ivory pl-8 pr-2 text-[14px] font-semibold text-navy transition-colors duration-300 hover:bg-white disabled:opacity-70 sm:w-auto sm:justify-start"
            >
              {pending ? "Sending…" : "Request a consultation"}
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-ivory transition-transform duration-500 ease-out group-hover:translate-x-0.5">
                {pending ? (
                  <span className="h-4 w-4 animate-spin rounded-full border border-ivory/30 border-t-ivory" />
                ) : (
                  <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                )}
              </span>
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  inputMode,
  autoComplete,
  defaultValue,
  error,
  className,
}: {
  name: string;
  label: string;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
  defaultValue?: string;
  error?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={type}
          inputMode={inputMode}
          autoComplete={autoComplete}
          defaultValue={defaultValue}
          placeholder=" "
          required
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${name}-error` : undefined}
          className="peer h-14 w-full border-b border-ivory/25 bg-transparent pt-4 text-[16px] text-ivory outline-none aria-invalid:border-[#e8a598]"
        />
        <label
          htmlFor={name}
          className={cn(
            "pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-[15px] text-ivory/55 transition-[top,font-size,color] duration-300 ease-out",
            "peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-gold",
            "peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px]",
          )}
        >
          {label}
        </label>
        <span
          aria-hidden
          className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-700 ease-out peer-focus:scale-x-100"
        />
      </div>
      {error ? (
        <p id={`${name}-error`} className="mt-2 text-[12.5px] text-[#e8a598]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
