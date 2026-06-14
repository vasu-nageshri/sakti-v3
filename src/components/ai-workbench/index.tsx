"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* =========================================================================
   AI Workbench — 4-wedge technology dial. A radial fan of four service
   wedges auto-cycles: the active wedge POPS outward, its left-grid tech
   tiles light up (brand-coloured via CSS mask), and its detail cards swap
   in on the right. A pulse glides along the arc to the active wedge.

   Fully theme-aware (light + dark) — every surface/line/text colour reads
   from the host CSS vars (--surface, --text, --hairline, …). Accent =
   Sakti emerald (#00E5A0). Animation driven by framer-motion so the pop +
   scale + swap are reliable across browsers.
   ========================================================================= */

const ACCENT = "#00E5A0";

// Static export serves public assets under basePath; raw <img>/CSS-mask URLs
// are NOT auto-prefixed, so prepend the build-resolved basePath manually.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
const asset = (p: string) => `${BASE}${p}`;

const W = 1200;
const H = 430;
const DIAL_CX = W / 2;
const DIAL_CY = 330; // baseline lifted so the full fan + glow clears the nav
const DIAL_INNER_R = 140;
const DIAL_OUTER_R = 250;

const polar = (cx: number, cy: number, r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
};

const wedgePath = (cx: number, cy: number, r: number, R: number, a0: number, a1: number) => {
  const is = polar(cx, cy, r, a0);
  const os = polar(cx, cy, R, a0);
  const oe = polar(cx, cy, R, a1);
  const ie = polar(cx, cy, r, a1);
  const large = a1 - a0 <= 180 ? "0" : "1";
  return ["M", is.x, is.y, "L", os.x, os.y, "A", R, R, 0, large, 1, oe.x, oe.y, "L", ie.x, ie.y, "A", r, r, 0, large, 0, is.x, is.y, "Z"].join(" ");
};

const arcTopPath = (r: number) => {
  const s = polar(DIAL_CX, DIAL_CY, r, -180);
  const e = polar(DIAL_CX, DIAL_CY, r, 0);
  return `M ${s.x} ${s.y} A ${r} ${r} 0 0 1 ${e.x} ${e.y}`;
};

// Wires originate ON THE OUTER CIRCLE (dial arc edge) and fan out to the
// side panels — left to the tech tiles, right to the cards. Endpoints are
// taken as points on the outer arc so each line clearly grows from the ring.
const OUTER = DIAL_OUTER_R + 14;
// arc points (degrees on the top semicircle): left ~200°/160° map below.
const oL1 = polar(DIAL_CX, DIAL_CY, OUTER, -150); // upper-left of arc
const oL2 = polar(DIAL_CX, DIAL_CY, OUTER, -175); // lower-left of arc
const oR1 = polar(DIAL_CX, DIAL_CY, OUTER, -30); // upper-right of arc
const oR2 = polar(DIAL_CX, DIAL_CY, OUTER, -5); // lower-right of arc

const LEFT_WIRES = [
  `M ${oL1.x.toFixed(0)} ${oL1.y.toFixed(0)} C ${oL1.x - 90} ${oL1.y - 10}, 380 215, 290 215`,
  `M ${oL2.x.toFixed(0)} ${oL2.y.toFixed(0)} C ${oL2.x - 70} ${oL2.y + 6}, 380 300, 290 300`,
];

const RIGHT_WIRES = [
  `M ${oR1.x.toFixed(0)} ${oR1.y.toFixed(0)} C ${oR1.x + 90} ${oR1.y - 10}, 820 215, 910 215`,
  `M ${oR2.x.toFixed(0)} ${oR2.y.toFixed(0)} C ${oR2.x + 70} ${oR2.y + 6}, 820 300, 910 300`,
];

type Cat = { id: string; label: string; icon: string };
const CATEGORIES: Cat[] = [
  { id: "cloud", label: "Cloud & Infra", icon: "/tech/aws.svg" },
  { id: "ai", label: "AI & Gen AI", icon: "/tech/openai.svg" },
  { id: "web", label: "Web & Mobile", icon: "/tech/react.svg" },
  { id: "blockchain", label: "Blockchain", icon: "/tech/blockchain.svg" },
];

type LeftIcon = { name: string; cat: string; icon: string };
const LEFT_ICONS: LeftIcon[] = [
  { name: "React", cat: "web", icon: "/tech/react.svg" },
  { name: "Next.js", cat: "web", icon: "/tech/nextjs.svg" },
  { name: "Node.js", cat: "web", icon: "/tech/nodejs.svg" },
  { name: "Flutter", cat: "web", icon: "/tech/flutter.svg" },
  { name: "Laravel", cat: "web", icon: "/tech/laravel.svg" },
  { name: "AWS", cat: "cloud", icon: "/tech/aws.svg" },
  { name: "Azure", cat: "cloud", icon: "/tech/azure.svg" },
  { name: "MongoDB", cat: "cloud", icon: "/tech/mongodb.svg" },
  { name: "OpenAI", cat: "ai", icon: "/tech/openai.svg" },
  { name: "Python", cat: "ai", icon: "/tech/python.svg" },
  { name: "Web3", cat: "blockchain", icon: "/tech/blockchain.svg" },
  { name: "Smart Cont.", cat: "blockchain", icon: "/tech/blockchain.svg" },
];

type RightCard = { title: string; sub: string; cat: string; icon: string };
const RIGHT_CARDS: RightCard[] = [
  { title: "Cloud Systems", sub: "Scalable & secure", cat: "cloud", icon: "☁️" },
  { title: "DevOps", sub: "CI/CD Pipeline", cat: "cloud", icon: "⚙️" },
  { title: "AI Integration", sub: "Agentic & Gen AI", cat: "ai", icon: "🤖" },
  { title: "LLM Solutions", sub: "Custom models", cat: "ai", icon: "🧠" },
  { title: "Web Apps", sub: "Responsive & fast", cat: "web", icon: "💻" },
  { title: "Mobile Apps", sub: "iOS · Android · RN", cat: "web", icon: "📱" },
  { title: "Smart Contracts", sub: "DeFi & Web3", cat: "blockchain", icon: "🔗" },
  { title: "DApps", sub: "Decentralized Apps", cat: "blockchain", icon: "🌐" },
];

export type AIWorkbenchProps = {
  /** Seconds each wedge is held before advancing. Default 4s. */
  stepInterval?: number;
  /** Caption pill under the dial. Pass null to hide. Default null. */
  caption?: string | null;
  className?: string;
};

const mask = (icon: string, color: string) => ({
  backgroundColor: color,
  maskImage: `url(${asset(icon)})`,
  maskSize: "contain",
  maskRepeat: "no-repeat",
  maskPosition: "center",
  WebkitMaskImage: `url(${asset(icon)})`,
  WebkitMaskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
});

export function AIWorkbench({ stepInterval = 4, caption = null, className = "" }: AIWorkbenchProps) {
  const [active, setActive] = useState(0);
  const dialWrapRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  // Render the animated dial only after mount. framer-motion's SVG <motion.*>
  // components inject transform styles that differ from SSR output, causing a
  // hydration mismatch — gating on mount sidesteps it cleanly.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % CATEGORIES.length), Math.max(1, stepInterval) * 1000);
    return () => clearInterval(id);
  }, [stepInterval]);

  useEffect(() => {
    const el = dialWrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setScale(Math.min(1, el.clientWidth / W)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const activeCat = CATEGORIES[active].id;

  const wedges = CATEGORIES.map((cat, i) => {
    const a0 = -180 + i * 45;
    const a1 = -180 + (i + 1) * 45;
    const gap = 1;
    const mid = (a0 + a1) / 2;
    const isActive = active === i;
    return {
      ...cat,
      isActive,
      mid,
      dir: { x: Math.cos((mid * Math.PI) / 180), y: Math.sin((mid * Math.PI) / 180) },
      path: wedgePath(DIAL_CX, DIAL_CY, DIAL_INNER_R, DIAL_OUTER_R, a0 + gap, a1 - gap),
      labelPt: polar(DIAL_CX, DIAL_CY, (DIAL_INNER_R + DIAL_OUTER_R) / 2, mid),
      rotation: mid + 90,
    };
  });

  const POP = 16; // px the active wedge travels outward
  const spring = { type: "spring" as const, stiffness: 220, damping: 22 };

  return (
    <div
      className={`aiw w-full ${className}`}
      // Theme tokens consumed below. Values come from the host's CSS vars so
      // the dial flips with light/dark automatically.
      style={
        {
          "--aiw-surface": "var(--surface)",
          "--aiw-tint": "var(--surface-tint)",
          "--aiw-text": "var(--text)",
          "--aiw-text-soft": "var(--text-soft)",
          "--aiw-line": "var(--hairline)",
          "--aiw-line-strong": "var(--hairline-strong)",
          // wedge fills — explicit so they read in BOTH themes
          "--aiw-wedge": "rgba(120,130,128,0.10)",
          "--aiw-wedge-active": "var(--surface)",
        } as React.CSSProperties
      }
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-[color:var(--aiw-line)] bg-[color:var(--aiw-surface)] shadow-[var(--shadow-lift)]">
        {/* ambient emerald glow — soft pulsing wash behind the dial */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center overflow-hidden">
          <motion.div
            aria-hidden
            animate={{ scale: [1, 1.08, 1], opacity: [0.10, 0.18, 0.10] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="h-[420px] w-[680px] translate-y-1/3 rounded-full blur-[110px]"
            style={{ background: `radial-gradient(circle, ${ACCENT} 0%, ${ACCENT}66 45%, transparent 70%)` }}
          />
        </div>

        <div className="relative z-10 px-6 py-8 lg:px-14">
          {/* ── MOBILE: vertical stack ── */}
          <div className="block space-y-3 lg:hidden">
            {CATEGORIES.map((cat, i) => {
              const on = cat.id === activeCat;
              return (
                <button
                  key={`mob-${cat.id}`}
                  onClick={() => setActive(i)}
                  className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300 ${
                    on
                      ? "scale-[1.02] border-accent/40 bg-[color:var(--aiw-surface)] shadow-[0_8px_24px_rgba(0,229,160,0.12)]"
                      : "border-[color:var(--aiw-line)] bg-[color:var(--aiw-tint)] opacity-70"
                  }`}
                >
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${on ? "bg-accent/10" : "bg-[color:var(--aiw-tint)]"}`}>
                    <span className="h-6 w-6" style={mask(cat.icon, on ? ACCENT : "var(--aiw-text-soft)")} />
                  </span>
                  <span className="text-[15px] font-bold" style={{ color: on ? "var(--aiw-text)" : "var(--aiw-text-soft)" }}>
                    {cat.label}
                  </span>
                </button>
              );
            })}
            <AnimatePresence mode="wait">
              <motion.div
                key={`mob-cards-${activeCat}`}
                className="grid grid-cols-1 gap-3 sm:grid-cols-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {RIGHT_CARDS.filter((c) => c.cat === activeCat).map((card) => (
                  <div key={card.title} className="flex items-center gap-3 rounded-2xl border border-accent/20 bg-[color:var(--aiw-surface)] p-4 shadow-sm">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-xl">{card.icon}</span>
                    <div>
                      <p className="text-[15px] font-bold" style={{ color: "var(--aiw-text)" }}>{card.title}</p>
                      <p className="mt-0.5 text-xs" style={{ color: "var(--aiw-text-soft)" }}>{card.sub}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── DESKTOP: SVG dial (scaled to fit container) ── */}
          <div ref={dialWrapRef} className="hidden lg:block" style={{ height: H * scale }}>
            {mounted && (
            <div className="relative mx-auto" style={{ width: W * scale, height: H * scale }}>
            <div className="relative h-[430px] w-[1200px]" style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}>
              {/* WIRES — behind everything (z-0): the animated data-flow lines
                  feeding in from the left tiles and out to the right cards. */}
              <svg width={W} height={H} className="pointer-events-none absolute inset-0 z-0">
                <defs>
                  <linearGradient id="aiwWire" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={ACCENT} stopOpacity="0" />
                    <stop offset="50%" stopColor={ACCENT} stopOpacity="0.6" />
                    <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Incoming data flow: LEFT tech tiles → into the dial */}
                {LEFT_WIRES.map((d, i) => (
                  <g key={`lw-${i}`}>
                    <path d={d} fill="none" stroke="url(#aiwWire)" strokeWidth="1.4" />
                    <circle r="3.5" fill={ACCENT}>
                      <animateMotion dur="2.4s" begin={`${i * 0.5}s`} repeatCount="indefinite" path={d} />
                    </circle>
                    <circle r="8" fill={ACCENT} opacity="0.18">
                      <animateMotion dur="2.4s" begin={`${i * 0.5}s`} repeatCount="indefinite" path={d} />
                    </circle>
                  </g>
                ))}

                {/* Outgoing data flow: dial → RIGHT cards */}
                {RIGHT_WIRES.map((d, i) => (
                  <g key={`rw-${i}`}>
                    <path d={d} fill="none" stroke="url(#aiwWire)" strokeWidth="1.4" />
                    <circle r="3.5" fill={ACCENT}>
                      <animateMotion dur="2.2s" begin={`${i * 0.6 + 1}s`} repeatCount="indefinite" path={d} />
                    </circle>
                    <circle r="8" fill={ACCENT} opacity="0.18">
                      <animateMotion dur="2.2s" begin={`${i * 0.6 + 1}s`} repeatCount="indefinite" path={d} />
                    </circle>
                  </g>
                ))}
              </svg>

              {/* DIAL — wedges + rings, above the wires (z-10) */}
              <svg width={W} height={H} className="pointer-events-none absolute inset-0 z-10">
                <defs>
                  <filter id="aiwWedge" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="6" stdDeviation="9" floodColor="#0f172a" floodOpacity="0.06" />
                  </filter>
                  <filter id="aiwWedgeActive" x="-40%" y="-40%" width="180%" height="180%">
                    <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor={ACCENT} floodOpacity="0.30" />
                  </filter>
                  <clipPath id="aiwTopClip">
                    <rect x="0" y="0" width={W} height={DIAL_CY} />
                  </clipPath>
                </defs>

                {/* single outer orbit arc (the only half-circle ring) */}
                <path d={arcTopPath(DIAL_OUTER_R + 14)} fill="none" stroke={ACCENT} strokeOpacity="0.3" strokeWidth="1.5" />

                {/* slow rotating dashed orbit ring around the hub */}
                <g clipPath="url(#aiwTopClip)">
                  <circle cx={DIAL_CX} cy={DIAL_CY} r={DIAL_INNER_R - 26} fill="none" stroke={ACCENT} strokeWidth="1.2" strokeDasharray="3 14" strokeLinecap="round" opacity="0.6">
                    <animateTransform attributeName="transform" type="rotate" from={`0 ${DIAL_CX} ${DIAL_CY}`} to={`360 ${DIAL_CX} ${DIAL_CY}`} dur="18s" repeatCount="indefinite" />
                  </circle>
                </g>

                {/* wedges — framer-motion drives the outward pop */}
                {wedges.map((w, i) => (
                  <motion.path
                    key={`wedge-${w.id}`}
                    d={w.path}
                    onClick={() => setActive(i)}
                    animate={{ x: w.isActive ? w.dir.x * POP : 0, y: w.isActive ? w.dir.y * POP : 0 }}
                    transition={spring}
                    fill={w.isActive ? "rgba(0,229,160,0.14)" : "var(--aiw-wedge)"}
                    stroke={w.isActive ? ACCENT : "var(--aiw-line-strong)"}
                    strokeWidth={w.isActive ? 2 : 1}
                    strokeOpacity={w.isActive ? 0.7 : 1}
                    filter={w.isActive ? "url(#aiwWedgeActive)" : "url(#aiwWedge)"}
                    className="pointer-events-auto cursor-pointer"
                    style={{ transition: "fill .5s ease, stroke .5s ease" }}
                  />
                ))}
              </svg>

              {/* Left tech grid */}
              <div className="absolute left-6 top-1/2 z-10 w-[250px] -translate-y-1/2">
                <div className="grid grid-cols-3 gap-3">
                  {LEFT_ICONS.map((ic, i) => {
                    const on = ic.cat === activeCat;
                    return (
                      <motion.div
                        key={i}
                        title={ic.name}
                        animate={{ scale: on ? 1 : 0.9, opacity: on ? 1 : 0.4 }}
                        transition={spring}
                        className={`flex aspect-square items-center justify-center rounded-2xl border bg-[color:var(--aiw-surface)] ${
                          on ? "border-accent/30 shadow-[0_6px_18px_rgba(0,229,160,0.18)]" : "border-[color:var(--aiw-line)] grayscale"
                        }`}
                      >
                        <div className="flex h-1/2 w-1/2 items-center justify-center">
                          {on ? (
                            <span className="h-full w-full" style={mask(ic.icon, ACCENT)} />
                          ) : (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={asset(ic.icon)} alt={ic.name} className="h-full w-full object-contain opacity-80 dark:invert dark:opacity-60" />
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Wedge labels + icons — pop + scale via framer-motion */}
              {wedges.map((w) => (
                <motion.div
                  key={`label-${w.id}`}
                  className="pointer-events-none absolute z-20 flex flex-col items-center justify-center"
                  style={{ left: w.labelPt.x, top: w.labelPt.y }}
                  animate={{
                    x: "-50%",
                    y: "-50%",
                    translateX: w.isActive ? w.dir.x * POP : 0,
                    translateY: w.isActive ? w.dir.y * POP : 0,
                  }}
                  transition={spring}
                >
                  <div
                    style={{ transform: `rotate(${w.rotation}deg)` }}
                    className="flex flex-col items-center"
                  >
                    <motion.div
                      animate={{ scale: w.isActive ? 1.12 : 0.95, opacity: w.isActive ? 1 : 0.5 }}
                      transition={spring}
                      className="flex flex-col items-center gap-1.5"
                    >
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full shadow-sm ${w.isActive ? "border border-accent/25 bg-accent/10" : "border border-[color:var(--aiw-line)] bg-[color:var(--aiw-surface)]"}`}>
                        {w.isActive ? (
                          <span className="h-5 w-5" style={mask(w.icon, ACCENT)} />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={asset(w.icon)} alt={w.label} className="h-5 w-5 object-contain opacity-80 dark:invert dark:opacity-60" />
                        )}
                      </div>
                      <h3 className="text-[12px] font-bold" style={{ color: w.isActive ? "var(--aiw-text)" : "var(--aiw-text-soft)" }}>
                        {w.label}
                      </h3>
                    </motion.div>
                  </div>
                </motion.div>
              ))}

              {/* Center brand hub */}
              <div className="absolute z-10 flex flex-col items-center justify-end" style={{ left: DIAL_CX - DIAL_INNER_R, top: DIAL_CY - DIAL_INNER_R, width: DIAL_INNER_R * 2, height: DIAL_INNER_R }}>
                <div className="relative z-10 flex items-center gap-2 pb-6">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-base font-bold text-black">S</span>
                  <span className="text-xl font-semibold" style={{ color: "var(--aiw-text)" }}>
                    Shrushti<span className="text-accent">Vertex</span>
                  </span>
                </div>
                {/* single inner glow half-circle (the 2nd one removed) */}
                <div className="absolute bottom-0 left-1/2 h-[140px] w-[280px] -translate-x-1/2 rounded-t-full border border-b-0 border-accent/25 bg-accent/[0.06]" />
              </div>

              {/* Right cards */}
              <div className="pointer-events-none absolute right-6 top-1/2 z-20 w-[260px] -translate-y-1/2">
                <AnimatePresence mode="wait">
                  <motion.div key={`cards-${activeCat}`} className="flex flex-col gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                    {RIGHT_CARDS.filter((c) => c.cat === activeCat).map((card, idx) => (
                      <motion.div
                        key={card.title}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.1, type: "spring", stiffness: 110, damping: 18 }}
                        className="pointer-events-auto flex w-full items-center gap-4 rounded-2xl border border-accent/15 bg-[color:var(--aiw-surface)] p-4 shadow-[0_10px_30px_rgba(0,229,160,0.12)] transition-colors hover:border-accent/40"
                      >
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent/15 bg-accent/10 text-2xl">{card.icon}</span>
                        <div>
                          <h4 className="text-[15px] font-bold" style={{ color: "var(--aiw-text)" }}>{card.title}</h4>
                          <p className="mt-0.5 text-xs leading-snug" style={{ color: "var(--aiw-text-soft)" }}>{card.sub}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIWorkbench;
