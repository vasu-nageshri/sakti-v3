"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// Button-in-button: arrow nested in its own circle, magnetic hover, press scale.
export function CtaButton({
  children,
  href = "#contact",
  variant = "primary",
}: {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
}) {
  const primary =
    "bg-accent text-ink-950 hover:bg-accent-soft shadow-[0_8px_40px_-12px_rgba(0,229,160,0.6)]";
  const ghost =
    "bg-transparent text-[color:var(--text)] border border-[color:var(--hairline)] hover:border-accent/50";

  return (
    <motion.a
      href={href}
      whileTap={{ scale: 0.97 }}
      className={`group inline-flex items-center gap-3 rounded-full pl-6 pr-2 py-2 text-sm font-medium transition-colors duration-500 ease-smooth ${
        variant === "primary" ? primary : ghost
      }`}
    >
      <span>{children}</span>
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-500 ease-smooth group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
          variant === "primary" ? "bg-ink-950/10" : "bg-[color:var(--surface)]"
        }`}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="transition-transform duration-500 ease-smooth group-hover:rotate-45"
        >
          <path
            d="M3 11L11 3M11 3H5M11 3V9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </motion.a>
  );
}
