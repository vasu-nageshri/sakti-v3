const items = [
  "Cloud",
  "Mobile",
  "Web",
  "UI / UX",
  "Agentic AI",
  "Gen AI",
  "Finance",
  "Infrastructure",
];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <section className="border-y border-[color:var(--hairline)] py-6">
      <div className="relative flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee gap-12 pr-12">
          {row.map((it, i) => (
            <span
              key={i}
              className="flex items-center gap-12 whitespace-nowrap font-display text-2xl font-light text-soft"
            >
              {it}
              <span className="text-accent">✦</span>
            </span>
          ))}
        </div>
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[color:var(--bg)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[color:var(--bg)] to-transparent" />
      </div>
    </section>
  );
}
