import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ChairModel } from "@/lib/catalog";
import { enquiryHref, inr } from "@/lib/format";
import { cn } from "@/lib/utils";

/** A product card in the homepage's restrained style; the whole card opens an enquiry. */
export function ModelCard({ model, delay = 0 }: { model: ChairModel; delay?: number }) {
  return (
    <article>
      <Link href={enquiryHref(model.name)} className="group block">
        <div
          className={cn(
            "relative aspect-[4/5] overflow-hidden rounded-2xl",
            model.fit === "contain" ? "bg-white" : "bg-[#ecebe8]",
          )}
          data-reveal="image"
          data-reveal-delay={String(delay)}
        >
          <div data-reveal-inner className="absolute inset-0">
            <Image
              src={model.image.src}
              alt={model.image.alt}
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
              className={cn(
                "transition-[scale] duration-[1.2s] ease-out group-hover:scale-[1.05]",
                model.fit === "contain" ? "object-contain p-[12%]" : "object-cover",
              )}
            />
          </div>
          {model.badge ? (
            <span className="absolute left-4 top-4 rounded-full border border-gold/60 bg-ivory px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7d6027]">
              {model.badge}
            </span>
          ) : null}
          <span className="absolute inset-x-4 bottom-4 flex h-11 translate-y-3 items-center justify-center gap-2 rounded-full bg-navy text-[12.5px] font-semibold text-ivory opacity-0 transition-[opacity,translate] duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            Enquire about this chair
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
          </span>
        </div>
        <p className="mt-5 text-[12px] tracking-[0.02em] text-slate">{model.note}</p>
        <h3 className="mt-1.5 font-heading text-[22px] leading-tight text-charcoal">{model.name}</h3>
        <p className="mt-2 text-[14px] tabular-nums text-charcoal">
          <span className="font-semibold">{inr.format(model.price)}</span>
          <span className="ml-1.5 text-[12px] text-slate">onwards</span>
        </p>
      </Link>
    </article>
  );
}
