"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { nav, brand } from "@/lib/site";

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--hairline)] transition-colors duration-500 ease-smooth hover:border-accent/50"
    >
      {mounted && (
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {isDark ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.4" />
              <path
                d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          )}
        </motion.span>
      )}
    </button>
  );
}

// Which nav section is currently in view.
// Works for both layouts: desktop = horizontal track (section is "active" when
// its box straddles viewport center on X); mobile = vertical (straddles on Y).
function useActiveSection() {
  const [active, setActive] = useState<string>(nav[0].href);

  useEffect(() => {
    let raf = 0;
    const compute = () => {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      let current = nav[0].href;
      for (const item of nav) {
        const el = document.querySelector(item.href) as HTMLElement | null;
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const hit = isDesktop
          ? r.left <= centerX && r.right >= centerX
          : r.top <= centerY && r.bottom >= centerY;
        if (hit) {
          current = item.href;
          break;
        }
      }
      setActive(current);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return active;
}

export function NavBar() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();

  // lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed inset-x-0 bottom-5 z-40 flex justify-center px-4"
      >
        <nav className="glass flex w-full max-w-3xl items-center justify-between rounded-full py-2 pl-5 pr-2">
          <a href="#" className="flex items-center gap-2 font-display text-lg font-medium">
            <span className="inline-block h-2 w-2 rounded-full bg-accent animate-pulse-glow" />
            {brand.name}
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {nav.map((item) => {
              const isActive = item.href === active;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className="relative flex flex-col items-center text-sm transition-colors duration-300"
                >
                  {/* active dot in brand primary */}
                  <span className="absolute -top-2.5 h-1.5 w-1.5">
                    <motion.span
                      initial={false}
                      animate={{ scale: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(0,229,160,0.6)]"
                    />
                  </span>
                  <span
                    className={
                      isActive
                        ? "text-[color:var(--text)]"
                        : "text-soft hover:text-[color:var(--text)]"
                    }
                  >
                    {item.label}
                  </span>
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden rounded-full bg-accent px-4 py-2 text-sm font-medium text-ink-950 transition-colors duration-500 ease-smooth hover:bg-accent-soft sm:inline-block"
            >
              Let&apos;s talk
            </a>
            <ThemeToggle />
            <button
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--hairline)] md:hidden"
            >
              <span className="relative block h-3 w-4">
                <motion.span
                  className="absolute left-0 top-0 h-[1.5px] w-4 bg-[color:var(--text)]"
                  animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.span
                  className="absolute bottom-0 left-0 h-[1.5px] w-4 bg-[color:var(--text)]"
                  animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile full-screen morph overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="glass fixed inset-0 z-30 flex flex-col items-center justify-center gap-2 md:hidden"
            style={{ backdropFilter: "blur(40px)" }}
          >
            {nav.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.05 * i,
                }}
                className="font-display text-4xl font-light"
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
