"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHead } from "@/components/section-head";
import { Reveal } from "@/components/reveal";

const ease = [0.16, 1, 0.3, 1] as const;

type Tab = {
  id: string;
  label: string;
  headline: string;
  blurb: string;
  panel: React.ReactNode;
};

// Tasteful mock UI panels — no stock photos, looks like real product surfaces.
function CloudPanel() {
  return (
    <div className="flex h-full flex-col gap-3 p-6">
      <div className="flex items-center gap-2 text-xs text-soft">
        <span className="h-2 w-2 rounded-full bg-accent animate-pulse-glow" />
        deploy · us-east-1 · healthy
      </div>
      {[
        { n: "api-gateway", v: "99.99%", w: "92%" },
        { n: "worker-pool", v: "auto", w: "68%" },
        { n: "postgres-primary", v: "12ms", w: "45%" },
      ].map((r) => (
        <div key={r.n} className="rounded-xl border border-[color:var(--hairline)] bg-[color:var(--surface-tint)] p-3">
          <div className="flex justify-between text-sm">
            <span className="font-medium">{r.n}</span>
            <span className="text-accent">{r.v}</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[color:var(--hairline)]">
            <div className="h-full rounded-full bg-accent/70" style={{ width: r.w }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function MobilePanel() {
  return (
    <div className="flex h-full items-center justify-center gap-4 p-6">
      {[0, 1].map((i) => (
        <div
          key={i}
          className="h-full w-28 overflow-hidden rounded-[1.6rem] border border-[color:var(--hairline-strong)] bg-[color:var(--surface-tint)] p-2 sm:w-32"
          style={{ transform: i === 0 ? "rotate(-4deg)" : "rotate(4deg)" }}
        >
          <div className="mx-auto mb-2 h-1 w-8 rounded-full bg-[color:var(--hairline)]" />
          <div className="space-y-2">
            <div className="h-16 rounded-xl bg-gradient-to-br from-accent/30 to-teal-500/10" />
            <div className="h-2 w-3/4 rounded bg-[color:var(--hairline-strong)]" />
            <div className="h-2 w-1/2 rounded bg-[color:var(--hairline)]" />
            <div className="mt-3 h-7 rounded-full bg-accent/80" />
          </div>
        </div>
      ))}
    </div>
  );
}

function AiPanel() {
  return (
    <div className="flex h-full flex-col gap-3 p-6 font-mono text-xs">
      <div className="rounded-xl border border-[color:var(--hairline)] bg-[color:var(--surface-tint)] p-3">
        <span className="text-soft">agent.run(</span>
        <span className="text-accent">&quot;analyze churn&quot;</span>
        <span className="text-soft">)</span>
      </div>
      {["→ querying warehouse", "→ ranking 3 cohorts", "→ drafting plan"].map(
        (l, i) => (
          <motion.div
            key={l}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.5, ease }}
            className="pl-2 text-soft"
          >
            {l}
          </motion.div>
        )
      )}
      <div className="mt-auto rounded-xl border border-accent/30 bg-accent/5 p-3 text-[color:var(--text)]">
        ✓ 3 retention experiments proposed
      </div>
    </div>
  );
}

function WebPanel() {
  return (
    <div className="flex h-full flex-col p-6">
      <div className="mb-3 flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--hairline-strong)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--hairline-strong)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--hairline-strong)]" />
      </div>
      <div className="flex-1 rounded-xl border border-[color:var(--hairline)] bg-[color:var(--surface-tint)] p-4">
        <div className="h-3 w-1/3 rounded bg-accent/60" />
        <div className="mt-3 h-8 w-2/3 rounded bg-[color:var(--hairline-strong)]" />
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-14 rounded-lg bg-[color:var(--surface)] shadow-[var(--shadow-soft)]" />
          ))}
        </div>
      </div>
    </div>
  );
}

const tabs: Tab[] = [
  {
    id: "cloud",
    label: "Cloud",
    headline: "Infrastructure that holds under load",
    blurb:
      "Auto-scaling, observability, and CI/CD wired in from day one. Ship without 3am pages.",
    panel: <CloudPanel />,
  },
  {
    id: "mobile",
    label: "Mobile",
    headline: "Native-feel apps, faster",
    blurb:
      "Flutter and React Native builds that feel hand-crafted on both platforms.",
    panel: <MobilePanel />,
  },
  {
    id: "web",
    label: "Web",
    headline: "Web that feels expensive",
    blurb:
      "Animated, accessible, fast. The kind of site that makes a brand look serious.",
    panel: <WebPanel />,
  },
  {
    id: "ai",
    label: "Agentic AI",
    headline: "Agents wired into your product",
    blurb:
      "RAG pipelines and autonomous agents that do real work, not demos.",
    panel: <AiPanel />,
  },
];

export function Showcase() {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  return (
    <section className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          align="center"
          eyebrow="Capabilities"
          title={
            <>
              See it <span className="italic text-accent">in motion</span>.
            </>
          }
        />

        {/* tab bar */}
        <Reveal delay={0.08}>
          <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-1 rounded-full border border-[color:var(--hairline)] bg-[color:var(--surface)] p-1.5 shadow-[var(--shadow-soft)]">
            {tabs.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setActive(i)}
                className="relative rounded-full px-5 py-2 text-sm font-medium transition-colors duration-300"
              >
                {active === i && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ duration: 0.5, ease }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    active === i ? "text-ink-950" : "text-soft"
                  }`}
                >
                  {t.label}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* panel */}
        <Reveal delay={0.12}>
          <div className="mt-8 grid grid-cols-1 items-stretch gap-3 lg:grid-cols-12">
            <div className="card flex flex-col justify-center gap-4 p-8 lg:col-span-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab.id + "-text"}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <h3 className="font-display text-2xl font-normal sm:text-3xl">
                    {tab.headline}
                  </h3>
                  <p className="mt-3 text-soft">{tab.blurb}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="card overflow-hidden lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab.id + "-panel"}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease }}
                  className="h-72 sm:h-80"
                >
                  {tab.panel}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
