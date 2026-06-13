"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Whole-site horizontal scroll (outpace-style).
 * User scrolls vertically (wheel / trackpad / keys) → the page travels LEFT→RIGHT.
 *
 * How it works:
 *  - A tall spacer (height = total horizontal width) gives the browser real
 *    vertical scroll range, so native scrollbar + momentum + anchor links work.
 *  - The content track is fixed and translated on X by the vertical scrollTop.
 *  - Below `lg` we bail out entirely and render a normal vertical page.
 */
export function HorizontalScroll({ children }: { children: React.ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [trackWidth, setTrackWidth] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      document.body.style.height = "";
      return;
    }
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const w = track.scrollWidth;
      setTrackWidth(w);
      // vertical scroll range = horizontal overflow + one viewport
      document.body.style.height = `${w}px`;
    };
    measure();

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = track.scrollWidth - window.innerWidth;
        const y = window.scrollY;
        track.style.transform = `translate3d(${-y}px,0,0)`;
        setProgress(max > 0 ? Math.min(1, y / max) : 0);
      });
    };
    onScroll();

    // anchor links: map target's horizontal X → vertical scrollTop
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id) as HTMLElement | null;
      if (!el) return;
      e.preventDefault();
      const x = el.getBoundingClientRect().left + window.scrollY;
      window.scrollTo({ top: x - 40, behavior: "smooth" });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    document.addEventListener("click", onClick);
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      document.removeEventListener("click", onClick);
      ro.disconnect();
      cancelAnimationFrame(raf);
      document.body.style.height = "";
    };
  }, [isDesktop, trackWidth]);

  if (!isDesktop) {
    // mobile / tablet: plain vertical flow
    return <div className="lg:hidden">{children}</div>;
  }

  return (
    <>
      {/* fixed horizontal track */}
      <div className="fixed inset-0 overflow-hidden">
        <div
          ref={trackRef}
          className="flex h-[100dvh] w-max items-stretch will-change-transform"
        >
          {children}
        </div>
      </div>

      {/* horizontal progress bar */}
      <div className="fixed bottom-6 left-1/2 z-40 hidden h-0.5 w-48 -translate-x-1/2 overflow-hidden rounded-full bg-[color:var(--hairline)] lg:block">
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </>
  );
}
