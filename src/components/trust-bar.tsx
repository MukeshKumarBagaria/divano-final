"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  IconHeartHandshake,
  IconTruckDelivery,
  IconTools,
  IconShieldCheck,
} from "@tabler/icons-react";

const points = [
  {
    icon: IconHeartHandshake,
    title: "Trusted By 20 Lakh+",
    body: "Customers",
  },
  {
    icon: IconTruckDelivery,
    title: "Free Delivery",
    body: "Shipped across India",
  },
  {
    icon: IconTools,
    title: "In-House Manufacturing",
    body: "Built on our own factory floor",
  },
  {
    icon: IconShieldCheck,
    title: "Best Warranty*",
    body: "On every frame we build",
  },
];

export function TrustBar() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="w-full py-12">
      <div className="mx-auto max-w-[1440px] px-6">
        <motion.div
          className="grid gap-x-8 gap-y-10 rounded-3xl bg-brand px-8 py-10 sm:grid-cols-2 md:px-10 lg:grid-cols-4 lg:py-12"
          initial={{
            opacity: 0,
            transform: reduceMotion ? "translateY(0px)" : "translateY(24px)",
          }}
          whileInView={{ opacity: 1, transform: "translateY(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          {points.map((point) => (
            <div key={point.title} className="flex items-center gap-4">
              <point.icon
                size={44}
                stroke={1.25}
                className="shrink-0 text-brand-light"
              />
              <div>
                <p className="font-sans text-lg font-semibold leading-tight text-primary-text-light">
                  {point.title}
                </p>
                <p className="mt-1 font-sans text-sm text-primary-text-light/70">
                  {point.body}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
