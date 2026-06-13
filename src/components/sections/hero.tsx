"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CtaButton } from "@/components/cta-button";

const ease = [0.16, 1, 0.3, 1] as const;

const wordVariants = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 0.9, ease, delay: 0.3 + i * 0.08 },
  }),
};

function MaskLine({ words, start = 0 }: { words: string[]; start?: number }) {
  return (
    <span className="block overflow-hidden pb-[0.12em]">
      <span className="flex flex-wrap justify-center gap-x-[0.25em]">
        {words.map((w, i) => (
          <motion.span
            key={w + i}
            custom={start + i}
            variants={wordVariants}
            initial="hidden"
            animate="show"
            className="inline-block"
          >
            {w}
          </motion.span>
        ))}
      </span>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // multi-speed parallax: each layer moves at a different rate for depth
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]); // content
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const yGrid = useTransform(scrollYProgress, [0, 1], [0, 80]); // grid drifts slow
  const yShardSlow = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yShardFast = useTransform(scrollYProgress, [0, 1], [0, 260]);
  const yGlow = useTransform(scrollYProgress, [0, 1], [0, -60]); // glow rises opposite

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-6"
    >
      {/* Emerald + mint DAWN — LIVING glow. Breathes on its own + parallax-rises on scroll. */}
      <motion.div
        style={{ scale: glowScale, y: yGlow }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        {/* main dawn rise — slow breathing */}
        <div className="absolute -bottom-32 left-1/2 h-[55rem] w-[80rem] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(0,229,160,0.24),rgba(16,184,138,0.09)_45%,transparent_70%)] blur-[40px] animate-breathe dark:bg-[radial-gradient(ellipse_at_center,rgba(0,229,160,0.2),rgba(16,184,138,0.07)_45%,transparent_70%)]" />
        {/* side mint orbs — independent slow drift */}
        <div className="absolute right-[8%] top-[20%] h-72 w-72 rounded-full bg-emerald-300/20 blur-[110px] animate-drift-a dark:bg-emerald-400/12" />
        <div className="absolute left-[10%] top-[32%] h-80 w-80 rounded-full bg-teal-200/30 blur-[120px] animate-drift-b dark:bg-teal-500/12" />
      </motion.div>

      {/* Floating glass shards — multi-speed parallax depth (no meaningless blobs: thin glass slivers) */}
      <motion.div style={{ y: yShardSlow }} className="pointer-events-none absolute inset-0 -z-10">
        <div className="glass absolute left-[14%] top-[26%] h-20 w-20 rounded-2xl rotate-12 animate-float [--r:12deg]" />
        <div className="glass absolute right-[18%] bottom-[30%] h-14 w-28 rounded-xl -rotate-6 animate-float [--r:-6deg]" style={{ animationDelay: "1.5s" }} />
      </motion.div>
      <motion.div style={{ y: yShardFast }} className="pointer-events-none absolute inset-0 -z-10">
        <div className="glass absolute right-[12%] top-[30%] h-10 w-10 rounded-full animate-float" style={{ animationDelay: "0.8s" }} />
        <div className="glass absolute left-[20%] bottom-[24%] h-12 w-12 rounded-2xl rotate-45 animate-float [--r:45deg]" style={{ animationDelay: "2.2s" }} />
      </motion.div>

      {/* subtle technical grid — slow parallax drift */}
      <motion.div
        style={{ y: yGrid }}
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.5]"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(var(--hairline) 1px, transparent 1px), linear-gradient(90deg, var(--hairline) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(ellipse 75% 65% at 50% 40%, black 25%, transparent 72%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 75% 65% at 50% 40%, black 25%, transparent 72%)",
          }}
        />
      </motion.div>

      <motion.div style={{ y, opacity }} className="relative z-10 text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="eyebrow mb-8"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Engineering & Finance · One Studio
        </motion.span>

        <h1 className="display mx-auto max-w-5xl text-balance text-5xl font-light sm:text-7xl lg:text-[5.5rem]">
          <MaskLine words={["Transforming", "your", "vision"]} start={0} />
          <MaskLine words={["into", "its"]} start={3} />
          <span className="block overflow-hidden pb-[0.12em]">
            <motion.span
              custom={5}
              variants={wordVariants}
              initial="hidden"
              animate="show"
              className="inline-block italic text-accent"
            >
              ultimate&nbsp;apex.
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease, delay: 1 }}
          className="mx-auto mt-8 max-w-xl text-balance text-base text-soft sm:text-lg"
        >
          We design and build{" "}
          <span className="text-[color:var(--text)]">cloud, mobile, web</span>{" "}
          and <span className="text-[color:var(--text)]">AI</span> products with
          agency-grade craft — backed by sharp financial strategy.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 1.15 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <CtaButton href="#contact">Start a project</CtaButton>
          <CtaButton href="#work" variant="ghost">
            View our work
          </CtaButton>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-[color:var(--hairline)] p-1.5">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-accent"
          />
        </div>
      </motion.div>
    </section>
  );
}
