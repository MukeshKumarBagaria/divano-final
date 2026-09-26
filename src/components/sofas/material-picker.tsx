"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Swatch = { name: string; color: string };
type Material = { id: string; name: string; body: string; care: string; texture: string; swatches: Swatch[] };

// PLACEHOLDER SWATCHES — indicative colours only; swap in the stocked covers
// (and ideally real swatch photography) before launch.
const materials: Material[] = [
  {
    id: "leather",
    name: "Leather",
    body: "Hides that soften and deepen with use. Cut on our own floor and stitched by hand.",
    care: "Dust weekly and condition a couple of times a year.",
    texture:
      "radial-gradient(120% 90% at 25% 15%, rgba(255,255,255,0.22), transparent 55%), radial-gradient(110% 100% at 85% 100%, rgba(0,0,0,0.38), transparent 60%)",
    swatches: [
      { name: "Cognac", color: "#8b4a2b" },
      { name: "Tan", color: "#b07a4f" },
      { name: "Espresso", color: "#3b2a22" },
      { name: "Black", color: "#1c1c1e" },
      { name: "Ivory", color: "#e7dccb" },
    ],
  },
  {
    id: "fabric",
    name: "Linen & weaves",
    body: "Linen blends and tight weaves in quiet, natural colours, including harder-wearing weaves for busy rooms.",
    care: "Vacuum with a soft brush; blot spills rather than rubbing.",
    texture:
      "repeating-linear-gradient(0deg, rgba(255,255,255,0.07) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(0,0,0,0.07) 0 1px, transparent 1px 3px), radial-gradient(120% 100% at 80% 100%, rgba(0,0,0,0.22), transparent 60%)",
    swatches: [
      { name: "Oat", color: "#cdbfa6" },
      { name: "Stone", color: "#aaa295" },
      { name: "Sage", color: "#8c957c" },
      { name: "Harbour", color: "#3f5166" },
      { name: "Charcoal", color: "#45474a" },
    ],
  },
  {
    id: "boucle",
    name: "Bouclé",
    body: "A looped yarn with a soft, pebbled surface that catches the light. Warm, tactile and quietly modern.",
    care: "Vacuum gently; avoid sharp objects that can pull the loops.",
    texture:
      "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1.1px, transparent 1.8px) 0 0 / 6px 6px, radial-gradient(circle at 4px 5px, rgba(0,0,0,0.12) 1.3px, transparent 2.2px) 0 0 / 7px 7px, radial-gradient(120% 100% at 80% 100%, rgba(0,0,0,0.18), transparent 60%)",
    swatches: [
      { name: "Cream", color: "#ece5d8" },
      { name: "Oatmeal", color: "#d6c8b0" },
      { name: "Pebble", color: "#a9a097" },
      { name: "Mocha", color: "#7a6453" },
    ],
  },
  {
    id: "velvet",
    name: "Velvet",
    body: "A dense pile with a deep, shifting sheen, for sofas meant to anchor a room.",
    care: "Brush with the pile; steam lightly to lift pressure marks.",
    texture:
      "linear-gradient(115deg, rgba(255,255,255,0.2) 0%, transparent 32%, rgba(0,0,0,0.3) 68%, rgba(255,255,255,0.1) 100%)",
    swatches: [
      { name: "Olive", color: "#5b5f3a" },
      { name: "Emerald", color: "#1f4a3f" },
      { name: "Midnight", color: "#1c2a44" },
      { name: "Rust", color: "#8f4a2c" },
      { name: "Blush", color: "#c99a8e" },
    ],
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/** A swatch book: pick a cover, then a colour, and the sample card changes to match. */
export function MaterialPicker() {
  const reduceMotion = useReducedMotion();
  const [materialIndex, setMaterialIndex] = useState(0);
  const [swatchIndex, setSwatchIndex] = useState(0);
  const material = materials[materialIndex];
  const swatch = material.swatches[swatchIndex];
  const behind = [
    material.swatches[(swatchIndex + 1) % material.swatches.length],
    material.swatches[(swatchIndex + 2) % material.swatches.length],
  ];

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-0">
      {/* Heading first in the source, so phones read heading → card → controls. */}
      <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:self-end">
        <p className="eyebrow" data-reveal="fade">
          Covers and colours
        </p>
        <h2 id="materials-heading" className="type-h2 mt-6 max-w-[11ch] text-charcoal" data-reveal="lines">
          Choose what you sink into.
        </h2>
      </div>

      {/* The sample cards */}
      <div className="lg:col-span-6 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-center" data-reveal="fade">
        <div className="relative mx-auto aspect-[4/5] w-[78%] max-w-[460px] md:w-[62%] lg:w-[72%]">
          {behind.map((card, index) => (
            <div
              key={index}
              aria-hidden
              className="absolute inset-0 rounded-2xl shadow-[0_30px_60px_-30px_rgba(12,29,45,0.45)] transition-[background-color,rotate,translate] duration-700 ease-out"
              style={{
                backgroundColor: card.color,
                rotate: index === 0 ? "-5deg" : "4deg",
                translate: index === 0 ? "-7% 2%" : "7% 3%",
              }}
            >
              <div className="absolute inset-0 rounded-2xl" style={{ background: material.texture }} />
            </div>
          ))}
          <div
            className="absolute inset-0 overflow-hidden rounded-2xl shadow-[0_40px_80px_-30px_rgba(12,29,45,0.55)] transition-[background-color] duration-700 ease-out"
            style={{ backgroundColor: swatch.color }}
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={material.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.6 }}
                className="absolute inset-0"
                style={{ background: material.texture }}
              />
            </AnimatePresence>
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-ivory px-6 py-5">
              <div>
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-slate">{material.name}</p>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={`${material.id}-${swatch.name}`}
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="mt-1 font-heading text-[26px] leading-none text-charcoal"
                  >
                    {swatch.name}
                  </motion.p>
                </AnimatePresence>
              </div>
              <span className="font-heading text-[13px] italic text-slate">Divano Elegante</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="lg:col-span-5 lg:col-start-8 lg:row-start-2">
        <div role="tablist" aria-label="Cover material" className="flex flex-wrap gap-2 lg:mt-10" data-reveal="fade">
          {materials.map((entry, index) => {
            const selected = index === materialIndex;
            return (
              <button
                key={entry.id}
                role="tab"
                type="button"
                id={`material-tab-${entry.id}`}
                aria-selected={selected}
                aria-controls="material-panel"
                onClick={() => {
                  setMaterialIndex(index);
                  setSwatchIndex(0);
                }}
                className={cn(
                  "rounded-full border px-5 py-2.5 text-[13px] font-medium transition-colors duration-300",
                  selected
                    ? "border-navy bg-navy text-ivory"
                    : "border-stone text-charcoal hover:border-navy",
                )}
              >
                {entry.name}
              </button>
            );
          })}
        </div>

        <div
          id="material-panel"
          role="tabpanel"
          aria-labelledby={`material-tab-${material.id}`}
          className="mt-8 min-h-[250px]"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={material.id}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <p className="max-w-[42ch] text-[16px] leading-relaxed text-slate">{material.body}</p>

              <fieldset className="mt-8">
                <legend className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate">
                  Colour <span className="normal-case tracking-normal text-charcoal">· {swatch.name}</span>
                </legend>
                <div className="mt-4 flex flex-wrap gap-3">
                  {material.swatches.map((entry, index) => {
                    const selected = index === swatchIndex;
                    return (
                      <label key={entry.name} className="cursor-pointer">
                        <input
                          type="radio"
                          name="swatch"
                          value={entry.name}
                          checked={selected}
                          onChange={() => setSwatchIndex(index)}
                          className="peer sr-only"
                        />
                        <span className="sr-only">{entry.name}</span>
                        <span
                          aria-hidden
                          className={cn(
                            "block h-11 w-11 rounded-full ring-1 ring-offset-[3px] ring-offset-ivory transition-[box-shadow,scale] duration-300 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-gold",
                            selected ? "scale-105 ring-navy" : "ring-stone hover:scale-105",
                          )}
                          style={{ backgroundColor: entry.color }}
                        />
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <p className="mt-8 flex gap-3 border-t border-stone pt-5 text-[13px] leading-relaxed text-slate">
                <span className="font-semibold text-charcoal">Care</span>
                {material.care}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        <p className="mt-6 text-[12px] text-slate">
          Colours on screen are indicative. Ask us for physical swatches before you order.
        </p>
      </div>
    </div>
  );
}
