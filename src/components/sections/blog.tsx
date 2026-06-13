"use client";

import { motion } from "framer-motion";
import { SectionHead } from "@/components/section-head";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { blogs } from "@/lib/site";

export function Blog() {
  return (
    <section id="blog" className="px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          eyebrow="Writing"
          title={
            <>
              Notes from the <span className="italic text-accent">build</span>.
            </>
          }
        />

        <RevealGroup className="mt-12 flex flex-col">
          {blogs.map((b, i) => (
            <RevealItem key={i}>
              <motion.a
                href="#"
                whileHover="hover"
                className="group flex items-center justify-between gap-6 border-t border-[color:var(--hairline)] py-7 last:border-b"
              >
                <div className="flex items-baseline gap-5">
                  <span className="hidden font-display text-sm text-soft sm:block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl font-normal transition-colors duration-500 group-hover:text-accent sm:text-2xl">
                    {b.title}
                  </h3>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <span className="hidden text-xs text-soft sm:block">
                    {b.tag} · {b.read}
                  </span>
                  <motion.span
                    variants={{ hover: { x: 4, y: -4 } }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="text-soft transition-colors duration-500 group-hover:text-accent"
                  >
                    <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M3 11L11 3M11 3H5M11 3V9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.span>
                </div>
              </motion.a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
