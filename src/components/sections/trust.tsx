"use client";

import { Reveal } from "@/components/reveal";

// Placeholder client wordmarks — swap for real logos later.
// Styled as a clean muted trust strip (devkrest / sarvam pattern).
const clients = [
  { name: "Vantage", weight: "font-semibold" },
  { name: "Northwind", weight: "font-medium" },
  { name: "PegasusLife", weight: "font-semibold italic" },
  { name: "Helix", weight: "font-bold" },
  { name: "Atlas", weight: "font-medium tracking-tight" },
  { name: "Vault", weight: "font-semibold" },
];

export function Trust() {
  return (
    <section className="px-6 pb-4 pt-8">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="mb-8 text-center text-[11px] uppercase tracking-[0.24em] text-soft">
            Trusted by teams building at the edge
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60 grayscale transition-opacity duration-700 hover:opacity-90">
            {clients.map((c) => (
              <span
                key={c.name}
                className={`font-display text-xl sm:text-2xl ${c.weight}`}
              >
                {c.name}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
