"use client";

/**
 * One horizontal panel. Desktop: fixed width, EXACTLY one viewport tall,
 * content vertically centered, NO vertical scroll (overflow hidden) — the page
 * only ever moves horizontally. Mobile: collapses to a normal full-width block.
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
      className={`relative flex w-full shrink-0 flex-col justify-center lg:h-[100dvh] lg:overflow-hidden ${width} ${className}`}
    >
      {children}
    </section>
  );
}
