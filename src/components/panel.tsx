"use client";

/**
 * One horizontal panel on desktop (fixed-ish width, full viewport height, own vertical scroll
 * if content overflows). On mobile it collapses to a normal full-width block.
 *
 * `width` is a Tailwind width class for desktop (e.g. "lg:w-screen", "lg:w-[60vw]").
 */
export function Panel({
  children,
  width = "lg:w-screen",
  className = "",
  id,
}: {
  children: React.ReactNode;
  width?: string;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`relative flex w-full shrink-0 flex-col justify-center lg:h-[100dvh] lg:overflow-y-auto ${width} ${className}`}
    >
      {children}
    </section>
  );
}
