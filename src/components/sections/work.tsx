"use client";

import { motion } from "framer-motion";
import { SectionHead } from "@/components/section-head";
import { Reveal } from "@/components/reveal";
import { projects } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1] as const;

// Per-project mock UI — tasteful, looks like a real product shot, no stock photos.
function MockUI({ id, tone }: { id: string; tone: string }) {
  if (id === "p1")
    // Helix Health — mobile health app
    return (
      <div className="flex h-full items-center justify-center gap-3">
        <div className="w-32 rounded-[1.4rem] border border-[color:var(--hairline-strong)] bg-[color:var(--surface)] p-2.5 shadow-[var(--shadow-soft)]">
          <div className="mx-auto mb-2 h-1 w-7 rounded-full bg-[color:var(--hairline-strong)]" />
          <div className="h-20 rounded-xl bg-gradient-to-br from-accent/40 to-teal-500/10" />
          <div className="mt-2 flex items-end gap-1">
            {[40, 70, 50, 90, 60].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm bg-accent/60" style={{ height: h / 3 }} />
            ))}
          </div>
          <div className="mt-2 h-2 w-2/3 rounded bg-[color:var(--hairline-strong)]" />
        </div>
      </div>
    );
  if (id === "p2")
    // Northwind Cloud — infra dashboard
    return (
      <div className="flex h-full flex-col justify-center gap-2 px-8">
        {[
          { w: "88%", v: "live" },
          { w: "62%", v: "98ms" },
          { w: "45%", v: "ok" },
        ].map((r, i) => (
          <div key={i} className="rounded-lg border border-[color:var(--hairline)] bg-[color:var(--surface)] p-2.5 shadow-[var(--shadow-soft)]">
            <div className="flex justify-between text-[11px]">
              <span className="h-2 w-16 rounded bg-[color:var(--hairline-strong)]" />
              <span className="text-accent">{r.v}</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[color:var(--hairline)]">
              <div className="h-full rounded-full bg-accent/70" style={{ width: r.w }} />
            </div>
          </div>
        ))}
      </div>
    );
  if (id === "p3")
    // Atlas Commerce — web storefront
    return (
      <div className="flex h-full flex-col px-8 py-6">
        <div className="mb-2 flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2 w-2 rounded-full bg-[color:var(--hairline-strong)]" />
          ))}
        </div>
        <div className="flex-1 rounded-xl border border-[color:var(--hairline)] bg-[color:var(--surface)] p-3 shadow-[var(--shadow-soft)]">
          <div className="h-3 w-1/3 rounded bg-accent/60" />
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="aspect-square rounded-lg bg-gradient-to-br from-accent/20 to-transparent" />
            ))}
          </div>
        </div>
      </div>
    );
  // p4 Vault Finance — fintech card
  return (
    <div className="flex h-full items-center justify-center px-8">
      <div className="w-full max-w-[15rem] rounded-2xl bg-gradient-to-br from-ink-900 to-ink-700 p-5 shadow-[var(--shadow-lift)]">
        <div className="flex justify-between">
          <span className="h-2 w-12 rounded bg-white/30" />
          <span className="text-accent">✦</span>
        </div>
        <div className="mt-8 font-display text-lg text-white/90">$84,210</div>
        <div className="mt-1 flex gap-2">
          <span className="h-1.5 w-8 rounded bg-white/20" />
          <span className="h-1.5 w-8 rounded bg-white/20" />
          <span className="h-1.5 w-8 rounded bg-accent/70" />
        </div>
      </div>
    </div>
  );
}

export function Work() {
  return (
    <section id="work" className="px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            eyebrow="Selected work"
            title={
              <>
                Projects that hit their{" "}
                <span className="italic text-accent">apex</span>.
              </>
            }
          />
          <Reveal delay={0.1}>
            <span className="text-sm text-soft">2024 — 2025</span>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 0.08}>
              <motion.a
                href="#contact"
                whileHover="hover"
                className="card card-lift group block overflow-hidden"
              >
                {/* mock UI visual panel */}
                <div className="relative overflow-hidden">
                  <motion.div
                    variants={{ hover: { scale: 1.03 } }}
                    transition={{ duration: 0.8, ease }}
                    className={`relative aspect-[16/9] bg-gradient-to-br ${p.tone}`}
                  >
                    <MockUI id={p.id} tone={p.tone} />
                  </motion.div>
                  <span className="absolute right-5 top-5 font-display text-sm text-soft">
                    {p.year}
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-[color:var(--hairline)] p-6">
                  <div>
                    <h3 className="font-display text-2xl font-normal">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm text-soft">{p.category}</p>
                  </div>
                  <motion.span
                    variants={{ hover: { x: 4, y: -4 } }}
                    transition={{ duration: 0.5, ease }}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-ink-950"
                  >
                    <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M3 11L11 3M11 3H5M11 3V9"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.span>
                </div>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
