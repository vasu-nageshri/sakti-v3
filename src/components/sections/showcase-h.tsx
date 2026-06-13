"use client";

import { Reveal } from "@/components/reveal";

/* mock UI panels (same as v2) */
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
        { n: "postgres", v: "12ms", w: "45%" },
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
    <div className="flex h-full items-center justify-center gap-3 p-5">
      {[0, 1].map((i) => (
        <div key={i} className="h-[80%] w-24 overflow-hidden rounded-[1.4rem] border border-[color:var(--hairline-strong)] bg-[color:var(--surface-tint)] p-2"
          style={{ transform: i === 0 ? "rotate(-4deg)" : "rotate(4deg)" }}>
          <div className="mx-auto mb-2 h-1 w-7 rounded-full bg-[color:var(--hairline)]" />
          <div className="space-y-1.5">
            <div className="h-14 rounded-xl bg-gradient-to-br from-accent/30 to-teal-500/10" />
            <div className="h-2 w-3/4 rounded bg-[color:var(--hairline-strong)]" />
            <div className="mt-2 h-6 rounded-full bg-accent/80" />
          </div>
        </div>
      ))}
    </div>
  );
}
function WebPanel() {
  return (
    <div className="flex h-full flex-col p-6">
      <div className="mb-3 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-2.5 w-2.5 rounded-full bg-[color:var(--hairline-strong)]" />
        ))}
      </div>
      <div className="flex-1 rounded-xl border border-[color:var(--hairline)] bg-[color:var(--surface-tint)] p-4">
        <div className="h-3 w-1/3 rounded bg-accent/60" />
        <div className="mt-3 h-8 w-2/3 rounded bg-[color:var(--hairline-strong)]" />
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-12 rounded-lg bg-[color:var(--surface)] shadow-[var(--shadow-soft)]" />
          ))}
        </div>
      </div>
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
      {["→ querying warehouse", "→ ranking 3 cohorts", "→ drafting plan"].map((l) => (
        <div key={l} className="pl-2 text-soft">{l}</div>
      ))}
      <div className="mt-auto rounded-xl border border-accent/30 bg-accent/5 p-3 text-[color:var(--text)]">
        ✓ 3 experiments proposed
      </div>
    </div>
  );
}

const slides = [
  { id: "cloud", n: "01", label: "Cloud & Infrastructure", headline: "Holds under load", blurb: "Auto-scaling, observability, CI/CD from day one.", panel: <CloudPanel /> },
  { id: "mobile", n: "02", label: "Mobile Development", headline: "Native-feel apps", blurb: "Flutter & React Native, hand-crafted on both platforms.", panel: <MobilePanel /> },
  { id: "web", n: "03", label: "Web Development", headline: "Web that feels expensive", blurb: "Animated, accessible, fast.", panel: <WebPanel /> },
  { id: "ai", n: "04", label: "Agentic AI / Gen AI", headline: "Agents in your product", blurb: "RAG pipelines & autonomous agents that do real work.", panel: <AiPanel /> },
];

/* Horizontal-site variant: capabilities are a row of cards (part of the page's horizontal flow). */
export function ShowcaseH() {
  return (
    <div className="flex h-full flex-col justify-center px-10 lg:px-16">
      <div className="mb-8">
        <span className="eyebrow mb-4">Capabilities</span>
        <h2 className="display text-4xl font-light sm:text-5xl">
          See it <span className="italic text-accent">in motion</span>.
        </h2>
      </div>
      <div className="flex gap-4">
        {slides.map((s, i) => (
          <Reveal key={s.id} delay={i * 0.06}>
            <div className="card card-lift flex w-72 flex-col overflow-hidden">
              <div className="h-48">{s.panel}</div>
              <div className="border-t border-[color:var(--hairline)] p-5">
                <span className="font-display text-sm text-accent">{s.n}</span>
                <h3 className="mt-1 font-display text-xl">{s.headline}</h3>
                <p className="mt-2 text-sm text-soft">{s.blurb}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
