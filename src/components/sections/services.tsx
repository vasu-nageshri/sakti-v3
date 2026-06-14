"use client";

import { SectionHead } from "@/components/section-head";
import { AIWorkbench } from "@/components/ai-workbench";

export function Services() {
  return (
    <section id="services" className="px-6 py-12 lg:py-0">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHead
          eyebrow="What we do"
          title={
            <>
              Services built to <span className="italic text-accent">scale</span>.
            </>
          }
          intro="One team across the full product lifecycle — from infrastructure to interface to capital."
        />

        <div className="mt-12 w-full">
          <AIWorkbench stepInterval={4} />
        </div>
      </div>
    </section>
  );
}
