"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type GalleryImage = { src: string; alt: string; fit: "contain" | "cover" };

/** The chair page hero image, with thumbnails to flick between the models. */
export function ChairGallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="frame-reveal relative aspect-square overflow-hidden rounded-2xl bg-[#ecebe8]">
        <div className="hero-intro-zoom absolute inset-0">
          {images.map((image, index) => {
            const visible = index === active;
            return (
              <div
                key={image.src}
                aria-hidden={!visible}
                className={cn(
                  "absolute inset-0 transition-[opacity,scale] duration-[900ms] ease-out",
                  image.fit === "contain" ? "bg-white" : "bg-[#ecebe8]",
                  visible ? "scale-100 opacity-100" : "scale-[1.04] opacity-0",
                )}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  preload={index === 0}
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className={image.fit === "contain" ? "object-contain p-[10%]" : "object-cover"}
                />
              </div>
            );
          })}
        </div>
        <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-ivory/95 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy backdrop-blur md:bottom-6 md:left-6">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          Built in our own factory
        </span>
        <span className="absolute bottom-4 right-4 rounded-full bg-ivory/95 px-3 py-2 text-[11px] font-semibold tabular-nums text-navy backdrop-blur md:bottom-6 md:right-6">
          {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>
      </div>

      {images.length > 1 ? (
        <ul className="hero-intro-fade mt-4 flex gap-3" style={{ animationDelay: "1.3s" }}>
          {images.map((image, index) => (
            <li key={image.src}>
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show image ${index + 1}: ${image.alt}`}
                aria-pressed={index === active}
                className={cn(
                  "relative block h-16 w-16 overflow-hidden rounded-xl ring-1 ring-offset-2 ring-offset-ivory transition-[box-shadow,opacity] duration-300 md:h-20 md:w-20",
                  image.fit === "contain" ? "bg-white" : "bg-[#ecebe8]",
                  index === active ? "ring-navy" : "opacity-60 ring-transparent hover:opacity-100",
                )}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="80px"
                  className={image.fit === "contain" ? "object-contain p-1.5" : "object-cover"}
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
