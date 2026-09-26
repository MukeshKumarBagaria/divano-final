"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  IconMoodSmile,
  IconTruckDelivery,
  IconShieldCheck,
  IconTools,
  IconArrowRight,
} from "@tabler/icons-react";

const features = [
  { icon: IconMoodSmile, label: "20 Lakh+ Customers" },
  { icon: IconTruckDelivery, label: "Free Delivery" },
  { icon: IconShieldCheck, label: "Best Warranty*" },
  { icon: IconTools, label: "In House Mfg." },
];

export function FactoryVideo() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="factory" className="mt-40 w-full scroll-mt-24">
      <div className="mx-auto max-w-[1440px] px-6">
        <div className="rounded-3xl bg-[#FFF2F2] p-8 md:p-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.5fr] md:gap-12">
            <motion.div
              className="flex flex-col"
              initial={{
                opacity: 0,
                transform: reduceMotion
                  ? "translateY(0px)"
                  : "translateY(24px)",
              }}
              whileInView={{ opacity: 1, transform: "translateY(0px)" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            >
              <div>
                <h2 className="font-heading text-[28px] font-bold text-primary-text-dark">
                  Built In-House, From Frame to Finish
                </h2>
                <p className="mt-4 font-sans text-base font-medium text-secondary-text-dark">
                  Our own factory, our own craftsmen — every piece is checked by
                  the people who made it before it reaches you.
                </p>
                <Link
                  href="#"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary-text-dark px-6 py-3 font-sans text-base font-semibold text-primary-text-light transition-colors duration-150 ease hover:bg-primary-text-dark/90"
                >
                  Explore
                  <IconArrowRight size={18} stroke={2} />
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {features.map((feature) => (
                  <div
                    key={feature.label}
                    className="flex items-center gap-3 rounded-2xl border border-borders-light bg-background-light p-4"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/15 text-primary-text-dark">
                      <feature.icon size={20} stroke={1.75} />
                    </span>
                    <span className="font-sans text-sm text-primary-text-dark">
                      {feature.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl md:aspect-auto md:h-[520px]">
              <motion.video
                className="absolute inset-0 h-full w-full object-cover"
                src="/video/Factory-video.mp4"
                poster="/hero/hero-2.png"
                autoPlay
                muted
                loop
                playsInline
                initial={{
                  opacity: 0,
                  transform: reduceMotion ? "scale(1)" : "scale(1.06)",
                }}
                whileInView={{ opacity: 1, transform: "scale(1)" }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
