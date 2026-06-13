"use client";

import { motion } from "framer-motion";
import { SectionHead } from "@/components/section-head";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { visibleServices, type Service } from "@/lib/site";

function ServiceCard({ s, index }: { s: Service; index: number }) {
  return (
    <RevealItem className={`${s.span} h-full`}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="card card-lift group h-full"
      >
        <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[1.5rem] p-7">
          {/* hover glow */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/0 blur-3xl transition-all duration-700 ease-smooth group-hover:bg-accent/15" />

          <div className="flex items-start justify-between">
            <span className="font-display text-sm text-soft">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--hairline)] text-soft transition-all duration-500 ease-smooth group-hover:border-accent/50 group-hover:text-accent">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 11L11 3M11 3H5M11 3V9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>

          <div className="mt-10">
            <h3 className="font-display text-2xl font-normal">{s.title}</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-soft">
              {s.blurb}
            </p>
          </div>
        </div>
      </motion.div>
    </RevealItem>
  );
}

export function Services() {
  return (
    <section id="services" className="px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          eyebrow="What we do"
          title={
            <>
              Services built to <span className="italic text-accent">scale</span>.
            </>
          }
          intro="One team across the full product lifecycle — from infrastructure to interface to capital."
        />

        <RevealGroup className="mt-14 grid auto-rows-[200px] grid-cols-1 gap-3 md:grid-cols-6">
          {visibleServices.map((s, i) => (
            <ServiceCard key={s.id} s={s} index={i} />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
