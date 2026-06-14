"use client";

import { motion } from "framer-motion";
import { SectionHead } from "@/components/section-head";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { team } from "@/lib/site";

const stats = [
  { v: "10+", l: "Years combined" },
  { v: "40+", l: "Products shipped" },
  { v: "2", l: "Disciplines, one team" },
];

export function About() {
  return (
    <section id="about" className="px-6 py-12 lg:py-0">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          {/* left: narrative */}
          <div className="lg:col-span-7">
            <SectionHead
              eyebrow="About us"
              title={
                <>
                  A studio where{" "}
                  <span className="italic text-accent">code</span> and{" "}
                  <span className="italic text-accent">capital</span> meet.
                </>
              }
              intro="ShrushtiVertex pairs hands-on product engineering with real financial expertise. We don't just build the thing — we help you fund it, model it, and take it to its apex."
            />

            <RevealGroup className="mt-12 grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <RevealItem key={s.l}>
                  <div className="border-l border-[color:var(--hairline)] pl-4">
                    <div className="font-display text-3xl text-accent sm:text-4xl">
                      {s.v}
                    </div>
                    <div className="mt-1 text-xs text-soft sm:text-sm">
                      {s.l}
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          {/* right: team cards */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="mb-5 text-xs uppercase tracking-[0.2em] text-soft">
                The people
              </p>
            </Reveal>
            <RevealGroup className="flex flex-col gap-3">
              {team.map((p) => (
                <RevealItem key={p.name}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="glass flex items-center gap-4 rounded-2xl p-4"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/15 font-display text-sm text-accent">
                      {p.initials}
                    </span>
                    <div className="flex-1">
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-soft">{p.role}</div>
                    </div>
                    <span className="hidden text-xs text-soft sm:block">
                      {p.focus}
                    </span>
                  </motion.div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
