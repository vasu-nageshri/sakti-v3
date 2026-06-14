"use client";

import { Reveal } from "@/components/reveal";
import { CtaButton } from "@/components/cta-button";
import { brand, nav } from "@/lib/site";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative w-full px-6 pb-24 pt-28 sm:pt-36 lg:px-14 lg:pb-16 lg:pt-0"
    >
      <div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,440px)_1fr] lg:gap-20">
        {/* LEFT — closing CTA */}
        <div className="relative overflow-hidden rounded-squircle border border-[color:var(--hairline)] px-8 py-16 text-center sm:px-12 sm:py-20 lg:text-left">
          <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/3 rounded-full bg-accent/15 blur-[120px] lg:left-0 lg:-translate-x-1/3" />

          <Reveal>
            <span className="eyebrow mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Let&apos;s build
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display mx-auto max-w-3xl text-balance text-4xl font-light sm:text-5xl lg:mx-0">
              Have a vision? We&apos;ll take it to its{" "}
              <span className="italic text-accent">apex</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-md text-soft lg:mx-0">
              Tell us what you&apos;re building. We reply within a day.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <CtaButton href="mailto:contact@shrushtivertex.com">
                contact@shrushtivertex.com
              </CtaButton>
              <CtaButton href="tel:+916355248452" variant="ghost">
                +91 63552 48452
              </CtaButton>
            </div>
          </Reveal>
        </div>

        {/* RIGHT — footer / sitemap, fills the wide panel's right side */}
        <Reveal delay={0.1}>
          <footer className="flex w-full flex-col gap-10">
            {/* top row: brand + link columns spread across full width */}
            <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
              {/* brand + tagline */}
              <div className="lg:max-w-xs">
                <div className="flex items-center gap-2 font-display text-2xl">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent animate-pulse-glow" />
                  {brand.name}
                </div>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-soft">
                  {brand.tagline}.
                </p>
              </div>

              {/* link columns */}
              <div className="grid grid-cols-2 gap-x-16 gap-y-8 sm:grid-cols-3">
              <div className="flex flex-col gap-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-soft">
                  Explore
                </p>
                {nav.map((n) => (
                  <a
                    key={n.href}
                    href={n.href}
                    className="text-sm text-soft transition-colors hover:text-[color:var(--text)]"
                  >
                    {n.label}
                  </a>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-soft">
                  Contact
                </p>
                <a
                  href="mailto:contact@shrushtivertex.com"
                  className="text-sm text-soft transition-colors hover:text-[color:var(--text)]"
                >
                  contact@shrushtivertex.com
                </a>
                <a
                  href="tel:+916355248452"
                  className="text-sm text-soft transition-colors hover:text-[color:var(--text)]"
                >
                  +91 63552 48452
                </a>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-soft">
                  Social
                </p>
                <a
                  href="#"
                  className="text-sm text-soft transition-colors hover:text-[color:var(--text)]"
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="text-sm text-soft transition-colors hover:text-[color:var(--text)]"
                >
                  X / Twitter
                </a>
                <a
                  href="#"
                  className="text-sm text-soft transition-colors hover:text-[color:var(--text)]"
                >
                  GitHub
                </a>
              </div>
              </div>
            </div>

            {/* copyright row */}
            <div className="flex flex-col gap-3 border-t border-[color:var(--hairline)] pt-6 text-xs text-soft sm:flex-row sm:items-center sm:justify-between">
              <p>© {brand.name}. All rights reserved.</p>
              <div className="flex gap-5">
                <a href="#" className="transition-colors hover:text-[color:var(--text)]">
                  Privacy
                </a>
                <a href="#" className="transition-colors hover:text-[color:var(--text)]">
                  Terms
                </a>
              </div>
            </div>
          </footer>
        </Reveal>
      </div>
    </section>
  );
}
