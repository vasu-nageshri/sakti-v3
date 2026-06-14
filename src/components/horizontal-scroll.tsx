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
// Deterministic PRNG (mulberry32) — seeded, so the "random" path is identical
// on server + client (no Math.random in render → export determinism preserved).
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function HorizontalScroll({ children }: { children: React.ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const nodeRef = useRef<SVGGElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [trackWidth, setTrackWidth] = useState(0);
  const [progress, setProgress] = useState(0);
  // The last (#contact) panel carries its own in-page footer/bar, so the global
  // progress bar is hidden once that panel straddles the viewport center.
  const [atContact, setAtContact] = useState(false);

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
      // Vertical scroll range must map EXACTLY onto horizontal travel.
      // Horizontal travel = w - viewportWidth; max vertical scroll = bodyHeight
      // - viewportHeight. Setting bodyHeight = w would over-scroll by
      // (viewportWidth - viewportHeight), pushing the last panel too far left
      // and leaving a gap on the right. So offset by (vh - vw).
      document.body.style.height = `${w - window.innerWidth + window.innerHeight}px`;
    };
    measure();

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = track.scrollWidth - window.innerWidth;
        const y = window.scrollY;
        const p = max > 0 ? Math.min(1, y / max) : 0;
        track.style.transform = `translate3d(${-y}px,0,0)`;
        setProgress(p);

        // hide progress bar on the last (#contact) panel — it has its own footer bar
        const contactEl = document.querySelector("#contact") as HTMLElement | null;
        if (contactEl) {
          const r = contactEl.getBoundingClientRect();
          const cx = window.innerWidth / 2;
          setAtContact(r.left <= cx && r.right >= cx);
        }

        // ride the glow node along the draw front
        const path = pathRef.current;
        const node = nodeRef.current;
        if (path && node) {
          const len = path.getTotalLength();
          const pt = path.getPointAtLength(len * p);
          node.style.transform = `translate(${pt.x}px, ${pt.y}px)`;
        }
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

  // Organic "random" thread, kept in the TOP band so it never crosses the
  // center where content lives. Seeded PRNG → deterministic waypoints, smoothed
  // with Catmull-Rom → cubic Bézier so it reads as a hand-drawn flowing line.
  const h = trackWidth > 0 ? window.innerHeight || 800 : 800;
  const wavePath = (() => {
    if (trackWidth <= 0) return "";
    const rand = mulberry32(0x5a47); // fixed seed → same path every render
    const topMin = h * 0.04; // roam full visible screen height
    const topMax = h * 0.96;
    const segStep = 480; // avg px between waypoints — wider = fewer dips, less jagged
    const pts: { x: number; y: number }[] = [];
    let x = 0;
    while (x <= trackWidth + segStep) {
      const jitter = (rand() - 0.5) * segStep * 0.5;
      pts.push({
        x: Math.min(trackWidth, x + jitter),
        y: topMin + rand() * (topMax - topMin),
      });
      x += segStep;
    }
    // Catmull-Rom → Bézier
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;
      const c1x = p1.x + (p2.x - p0.x) / 6;
      const c1y = p1.y + (p2.y - p0.y) / 6;
      const c2x = p2.x - (p3.x - p1.x) / 6;
      const c2y = p2.y - (p3.y - p1.y) / 6;
      d += ` C ${c1x} ${c1y} ${c2x} ${c2y} ${p2.x} ${p2.y}`;
    }
    return d;
  })();

  return (
    <>
      {/* fixed horizontal track */}
      <div className="fixed inset-0 overflow-hidden">
        <div
          ref={trackRef}
          className="relative flex h-[100dvh] w-max items-stretch will-change-transform"
        >
          {/* organic thread in the top band — behind content, never disturbs it */}
          {trackWidth > 0 && (
            <svg
              className="pointer-events-none absolute inset-0 z-0 h-full"
              width={trackWidth}
              height="100%"
              viewBox={`0 0 ${trackWidth} ${h}`}
              preserveAspectRatio="none"
              aria-hidden
            >
              {/* faint full guide */}
              <path
                d={wavePath}
                fill="none"
                stroke="var(--hairline)"
                strokeWidth={1.25}
                strokeLinecap="round"
              />
              {/* emerald draw-on-scroll */}
              <path
                ref={pathRef}
                d={wavePath}
                fill="none"
                stroke="#00E5A0"
                strokeOpacity={0.5}
                strokeWidth={1.75}
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - progress}
                style={{ filter: "drop-shadow(0 0 5px rgba(0,229,160,0.4))" }}
              />
              {/* leading glow node riding the draw front */}
              <g ref={nodeRef} style={{ willChange: "transform" }}>
                <circle r={9} fill="rgba(0,229,160,0.18)" />
                <circle r={4} fill="#00E5A0" />
                <circle
                  r={4}
                  fill="none"
                  stroke="#00E5A0"
                  strokeWidth={1}
                  style={{ filter: "drop-shadow(0 0 8px rgba(0,229,160,0.9))" }}
                />
              </g>
            </svg>
          )}
          {/* content sits above the thread */}
          <div className="relative z-10 flex w-max items-stretch">{children}</div>
        </div>
      </div>

      {/* horizontal progress bar (raised above bottom nav) — hidden on #contact */}
      <div
        className={`fixed bottom-20 left-1/2 z-40 hidden h-0.5 w-48 -translate-x-1/2 overflow-hidden rounded-full bg-[color:var(--hairline)] transition-opacity duration-300 lg:block ${
          atContact ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </>
  );
}
