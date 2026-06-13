"use client";

import { Reveal } from "@/components/reveal";
import { CtaButton } from "@/components/cta-button";
import { brand, nav } from "@/lib/site";

export function Contact() {
  return (
    <section id="contact" className="relative px-6 pb-16 pt-28 sm:pt-36">
      {/* closing CTA */}
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-squircle border border-[color:var(--hairline)] px-8 py-20 text-center sm:px-16 sm:py-28">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/3 rounded-full bg-accent/15 blur-[120px]" />

        <Reveal>
          <span className="eyebrow mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Let&apos;s build
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display mx-auto max-w-3xl text-balance text-4xl font-light sm:text-6xl">
            Have a vision? We&apos;ll take it to its{" "}
            <span className="italic text-accent">apex</span>.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-md text-soft">
            Tell us what you&apos;re building. We reply within a day.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <CtaButton href="mailto:hello@sakti.studio">
              hello@sakti.studio
            </CtaButton>
            <CtaButton href="#" variant="ghost">
              Book a call
            </CtaButton>
          </div>
        </Reveal>
      </div>

      {/* footer */}
      <footer className="mx-auto mt-16 flex max-w-6xl flex-col gap-8 border-t border-[color:var(--hairline)] pt-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 font-display text-lg">
          <span className="inline-block h-2 w-2 rounded-full bg-accent" />
          {brand.name}
        </div>
        <nav className="flex flex-wrap gap-x-7 gap-y-2">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-soft transition-colors hover:text-[color:var(--text)]"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <p className="text-xs text-soft">
          © {brand.name}. {brand.tagline}.
        </p>
      </footer>
    </section>
  );
}
