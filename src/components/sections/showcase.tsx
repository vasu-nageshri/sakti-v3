"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { Reveal } from "@/components/reveal";

const ease = [0.16, 1, 0.3, 1] as const;

/* ---------- mock UI panels (no stock photos) ---------- */
function CloudPanel() {
  return (
    <div className="flex h-full flex-col gap-3 p-6 sm:p-8">
      <div className="flex items-center gap-2 text-xs text-soft">
        <span className="h-2 w-2 rounded-full bg-accent animate-pulse-glow" />
        deploy · us-east-1 · healthy
      </div>
      {[
        { n: "api-gateway", v: "99.99%", w: "92%" },
        { n: "worker-pool", v: "auto", w: "68%" },
        { n: "postgres-primary", v: "12ms", w: "45%" },
      ].map((r) => (
        <div
          key={r.n}
          className="rounded-xl border border-[color:var(--hairline)] bg-[color:var(--surface-tint)] p-3"
        >
          <div className="flex justify-between text-sm">
            <span className="font-medium">{r.n}</span>
            <span className="text-accent">{r.v}</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[color:var(--hairline)]">
            <div
              className="h-full rounded-full bg-accent/70"
              style={{ width: r.w }}
            />
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
          className="h-[80%] w-28 overflow-hidden rounded-[1.6rem] border border-[color:var(--hairline-strong)] bg-[color:var(--surface-tint)] p-2 sm:w-32"
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
function WebPanel() {
  return (
    <div className="flex h-full flex-col p-6 sm:p-8">
      <div className="mb-3 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-2.5 w-2.5 rounded-full bg-[color:var(--hairline-strong)]"
          />
        ))}
      </div>
      <div className="flex-1 rounded-xl border border-[color:var(--hairline)] bg-[color:var(--surface-tint)] p-4">
        <div className="h-3 w-1/3 rounded bg-accent/60" />
        <div className="mt-3 h-8 w-2/3 rounded bg-[color:var(--hairline-strong)]" />
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-14 rounded-lg bg-[color:var(--surface)] shadow-[var(--shadow-soft)]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
function AiPanel() {
  return (
    <div className="flex h-full flex-col gap-3 p-6 font-mono text-xs sm:p-8">
      <div className="rounded-xl border border-[color:var(--hairline)] bg-[color:var(--surface-tint)] p-3">
        <span className="text-soft">agent.run(</span>
        <span className="text-accent">&quot;analyze churn&quot;</span>
        <span className="text-soft">)</span>
      </div>
      {["→ querying warehouse", "→ ranking 3 cohorts", "→ drafting plan"].map(
        (l) => (
          <div key={l} className="pl-2 text-soft">
            {l}
          </div>
        )
      )}
      <div className="mt-auto rounded-xl border border-accent/30 bg-accent/5 p-3 text-[color:var(--text)]">
        ✓ 3 retention experiments proposed
      </div>
    </div>
  );
}

const slides = [
  {
    id: "cloud",
    n: "01",
    label: "Cloud & Infrastructure",
    headline: "Infrastructure that holds under load",
    blurb:
      "Auto-scaling, observability, and CI/CD wired in from day one. Ship without 3am pages.",
    panel: <CloudPanel />,
  },
  {
    id: "mobile",
    n: "02",
    label: "Mobile Development",
    headline: "Native-feel apps, faster",
    blurb:
      "Flutter and React Native builds that feel hand-crafted on both platforms.",
    panel: <MobilePanel />,
  },
  {
    id: "web",
    n: "03",
    label: "Web Development",
    headline: "Web that feels expensive",
    blurb:
      "Animated, accessible, fast. The kind of site that makes a brand look serious.",
    panel: <WebPanel />,
  },
  {
    id: "ai",
    n: "04",
    label: "Agentic AI / Gen AI",
    headline: "Agents wired into your product",
    blurb:
      "RAG pipelines and autonomous agents that do real work, not demos.",
    panel: <AiPanel />,
  },
];

/* ---------- one scroll-driven slide ---------- */
function Slide({
  slide,
  index,
  total,
  progress,
}: {
  slide: (typeof slides)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // each slide owns a window of scroll progress
  const seg = 1 / total;
  const start = index * seg;
  const end = start + seg;
  // fade/slide in over first 35% of its window, out over last 35%
  const opacity = useTransform(
    progress,
    [start, start + seg * 0.3, end - seg * 0.3, end],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    progress,
    [start, start + seg * 0.3, end - seg * 0.3, end],
    [60, 0, 0, -60]
  );
  const scale = useTransform(
    progress,
    [start, start + seg * 0.3, end - seg * 0.3, end],
    [0.96, 1, 1, 0.96]
  );

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute inset-0 grid grid-cols-1 items-center gap-6 lg:grid-cols-12"
    >
      {/* text */}
      <div className="lg:col-span-5">
        <span className="font-display text-sm text-accent">{slide.n}</span>
        <h3 className="mt-3 font-display text-3xl font-normal sm:text-4xl lg:text-5xl">
          {slide.headline}
        </h3>
        <p className="mt-4 max-w-md text-soft">{slide.blurb}</p>
        <span className="eyebrow mt-6">{slide.label}</span>
      </div>
      {/* panel */}
      <div className="card h-72 overflow-hidden sm:h-80 lg:col-span-7 lg:h-[26rem]">
        {slide.panel}
      </div>
    </motion.div>
  );
}

export function Showcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(slides.length - 1, Math.floor(v * slides.length));
    if (i !== active) setActive(i);
  });

  // progress rail fill
  const railFill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="capabilities">
      {/* tall scroll track — height = (slides) * 100vh drives the pin duration */}
      <div ref={ref} className="relative" style={{ height: `${slides.length * 75}vh` }}>
        {/* sticky stage */}
        <div className="sticky top-0 flex h-[100dvh] items-center overflow-hidden px-6">
          <div className="mx-auto w-full max-w-6xl">
            {/* header + rail */}
            <div className="mb-10 flex items-end justify-between gap-6">
              <div>
                <span className="eyebrow mb-4">Capabilities</span>
                <h2 className="display text-4xl font-light sm:text-5xl">
                  See it <span className="italic text-accent">in motion</span>.
                </h2>
              </div>
              {/* numbered progress rail (desktop) */}
              <div className="hidden items-center gap-4 sm:flex">
                <span className="font-display text-sm text-soft">
                  {String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                </span>
                <div className="relative h-24 w-0.5 overflow-hidden rounded-full bg-[color:var(--hairline)]">
                  <motion.div
                    style={{ height: railFill }}
                    className="absolute left-0 top-0 w-full rounded-full bg-accent"
                  />
                </div>
              </div>
            </div>

            {/* slides stage */}
            <div className="relative h-72 sm:h-80 lg:h-[26rem]">
              {slides.map((s, i) => (
                <Slide
                  key={s.id}
                  slide={s}
                  index={i}
                  total={slides.length}
                  progress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Mobile (<lg): scroll-jack feels bad on touch — render a simple stacked list.
   Toggled purely by CSS: the pinned version is hidden below lg via the parent. */
export function ShowcaseMobile() {
  return (
    <section className="px-6 py-20 lg:hidden">
      <div className="mx-auto max-w-2xl">
        <span className="eyebrow mb-4">Capabilities</span>
        <h2 className="display text-4xl font-light">
          See it <span className="italic text-accent">in motion</span>.
        </h2>
        <div className="mt-10 flex flex-col gap-4">
          {slides.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.05}>
              <div className="card overflow-hidden">
                <div className="h-56">{s.panel}</div>
                <div className="border-t border-[color:var(--hairline)] p-6">
                  <span className="font-display text-sm text-accent">{s.n}</span>
                  <h3 className="mt-1 font-display text-xl">{s.headline}</h3>
                  <p className="mt-2 text-sm text-soft">{s.blurb}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
