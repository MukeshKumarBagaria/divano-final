"use client";

import { Suspense, useActionState, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { sendEnquiry, type EnquiryState } from "@/app/actions";
import { interests } from "@/lib/consultation";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const quantities = ["Just one", "2 – 10", "11 – 50", "More than 50"];
const initialState: EnquiryState = { status: "idle" };

/** Guess the category from a product name passed in the URL. */
const interestFor = (product?: string) => {
  const name = product?.toLowerCase() ?? "";
  if (name.includes("booth")) return "Phone booths";
  if (name.includes("sofa") || name.includes("seater") || name.includes("lounge") || name.includes("modular")) return "Sofas";
  if (name.includes("chair")) return "Ergonomic chairs";
  return "";
};

/**
 * The server-rendered HTML carries the plain form; once hydrated, the
 * version that reads ?product= takes over and pre-fills it.
 */
export function EnquiryForm() {
  const [formKey, setFormKey] = useState(0);
  const reset = () => setFormKey((key) => key + 1);
  return (
    <Suspense fallback={<Form onReset={reset} />}>
      <FormWithProduct key={formKey} onReset={reset} />
    </Suspense>
  );
}

function FormWithProduct({ onReset }: { onReset: () => void }) {
  const product = useSearchParams().get("product")?.slice(0, 120) || undefined;
  return <Form key={product} product={product} onReset={onReset} />;
}

function Form({ product, onReset }: { product?: string; onReset: () => void }) {
  const reduceMotion = useReducedMotion();
  const [state, formAction, pending] = useActionState(sendEnquiry, initialState);
  const values = state.values;
  const defaultInterest = values?.interest ?? interestFor(product);
  const defaultMessage = values?.message ?? (product ? `I'd like to know more about the ${product}.` : "");

  return (
    <div className="rounded-3xl bg-white p-7 shadow-[0_40px_80px_-50px_rgba(12,29,45,0.35)] md:p-12">
      <AnimatePresence mode="wait" initial={false}>
        {state.status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex min-h-[560px] flex-col justify-center"
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
            <h3 className="mt-8 font-heading text-[37px] leading-none text-charcoal">Thank you.</h3>
            <p className="mt-4 max-w-[40ch] text-[15px] leading-relaxed text-slate">
              Your enquiry is with our team. We will call you within one working day to talk through
              sizes, materials and a quote.
            </p>
            <button
              type="button"
              onClick={onReset}
              className="link-draw mt-10 self-start text-[13px] font-semibold text-navy"
            >
              Send another enquiry
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            action={formAction}
            noValidate
            exit={{ opacity: 0, y: reduceMotion ? 0 : -8, transition: { duration: 0.3 } }}
          >
            <input type="hidden" name="product" value={product ?? values?.product ?? ""} />

            {product ? (
              <p className="mb-8 flex items-center gap-3 rounded-full bg-ivory px-4 py-2.5 text-[13px] text-charcoal">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                <span className="truncate">
                  Enquiring about <span className="font-semibold">{product}</span>
                </span>
              </p>
            ) : null}

            <fieldset>
              <legend className="text-[12.5px] font-semibold text-charcoal">What are you looking for?</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <label key={interest} className="cursor-pointer">
                    <input
                      type="radio"
                      name="interest"
                      value={interest}
                      defaultChecked={defaultInterest === interest}
                      className="peer sr-only"
                    />
                    <span className="block rounded-full border border-stone px-4 py-2 text-[13px] text-charcoal transition-colors duration-300 hover:border-navy peer-checked:border-navy peer-checked:bg-navy peer-checked:text-ivory peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold">
                      {interest}
                    </span>
                  </label>
                ))}
              </div>
              {state.errors?.interest ? (
                <p className="mt-2 text-[12.5px] text-[#a8483a]">{state.errors.interest}</p>
              ) : null}
            </fieldset>

            <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
              <Field name="name" label="Full name" autoComplete="name" defaultValue={values?.name} error={state.errors?.name} />
              <Field
                name="phone"
                label="Phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                defaultValue={values?.phone}
                error={state.errors?.phone}
              />
              <Field
                name="email"
                label="Email"
                type="email"
                inputMode="email"
                autoComplete="email"
                defaultValue={values?.email}
                error={state.errors?.email}
              />
              <Field name="company" label="Company (optional)" autoComplete="organization" defaultValue={values?.company} required={false} />
              <Field name="city" label="City" autoComplete="address-level2" defaultValue={values?.city} required={false} />

              <div className="relative">
                <label htmlFor="quantity" className="sr-only">
                  How many pieces?
                </label>
                <select
                  id="quantity"
                  name="quantity"
                  defaultValue={values?.quantity ?? ""}
                  className="peer h-14 w-full cursor-pointer appearance-none border-b border-stone bg-transparent pr-8 text-[16px] text-charcoal outline-none transition-colors invalid:text-slate"
                >
                  <option value="">How many pieces?</option>
                  {quantities.map((quantity) => (
                    <option key={quantity} value={quantity}>
                      {quantity}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-slate"
                  strokeWidth={1.5}
                />
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-navy transition-transform duration-700 ease-out peer-focus:scale-x-100"
                />
              </div>

              <div className="relative sm:col-span-2">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder=" "
                  defaultValue={defaultMessage}
                  className="peer block w-full resize-none border-b border-stone bg-transparent pb-3 pt-7 text-[16px] leading-relaxed text-charcoal outline-none"
                />
                <label
                  htmlFor="message"
                  className="pointer-events-none absolute left-0 top-4 text-[15px] text-slate transition-[top,font-size,color] duration-300 ease-out peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-navy peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px]"
                >
                  Tell us about the space (optional)
                </label>
                <span
                  aria-hidden
                  className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-navy transition-transform duration-700 ease-out peer-focus:scale-x-100"
                />
              </div>
            </div>

            <p className="mt-9 text-[12px] leading-relaxed text-slate">
              By sending an enquiry you agree to our{" "}
              <Link href="/terms" className="underline underline-offset-2 hover:text-charcoal">
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-charcoal">
                Privacy Policy
              </Link>
              .
            </p>

            <button
              type="submit"
              disabled={pending}
              className="group mt-7 inline-flex h-[56px] w-full items-center justify-between gap-3 whitespace-nowrap rounded-full bg-navy pl-8 pr-2 text-[14px] font-semibold text-ivory transition-colors duration-300 hover:bg-navy-deep disabled:opacity-70 sm:w-auto sm:justify-start"
            >
              {pending ? "Sending…" : "Send enquiry"}
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ivory text-navy transition-transform duration-500 ease-out group-hover:translate-x-0.5">
                {pending ? (
                  <span className="h-4 w-4 animate-spin rounded-full border border-navy/30 border-t-navy" />
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
  required = true,
}: {
  name: string;
  label: string;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
  defaultValue?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={type}
          inputMode={inputMode}
          autoComplete={autoComplete}
          defaultValue={defaultValue}
          placeholder=" "
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${name}-error` : undefined}
          className="peer h-14 w-full border-b border-stone bg-transparent pt-4 text-[16px] text-charcoal outline-none aria-invalid:border-[#a8483a]"
        />
        <label
          htmlFor={name}
          className={cn(
            "pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-[15px] text-slate transition-[top,font-size,color] duration-300 ease-out",
            "peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-navy",
            "peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px]",
          )}
        >
          {label}
        </label>
        <span
          aria-hidden
          className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-navy transition-transform duration-700 ease-out peer-focus:scale-x-100"
        />
      </div>
      {error ? (
        <p id={`${name}-error`} className="mt-2 text-[12.5px] text-[#a8483a]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
