import { Reveal } from "@/components/reveal";

export function SectionHead({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`flex max-w-2xl flex-col gap-5 ${
        align === "center" ? "mx-auto items-center text-center" : "items-start"
      }`}
    >
      <Reveal>
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="display text-4xl font-light sm:text-5xl lg:text-6xl">
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p className="text-base text-soft sm:text-lg">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
