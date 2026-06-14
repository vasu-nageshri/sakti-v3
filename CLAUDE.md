# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> Sakti Portfolio (v3, FINAL) — engineering + finance studio portfolio.
> Tagline: "Transforming your vision into its ultimate apex."
> Brief: premium, animated, **not** AI-generic. Refs used: devkrest.com, sarvam.ai, outpacestudios.com.

## Status

**v3 (pure horizontal scroll) is the client's chosen final version (2026-06-14).**
This branch (`v3-deploy`) is the source of truth for the live site.
Next work: **client feedback on v3.**

Live: https://vasu-nageshri.github.io/sakti-v3/
Repo: https://github.com/vasu-nageshri/sakti-v3

## Stack

- **Next.js 15** App Router, **static export** (`output: 'export'` → GitHub Pages)
- **Tailwind CSS** — brand accent emerald `#00E5A0` (single token: `accent` in `tailwind.config.ts` + CSS vars in `globals.css`)
- **Framer Motion** — reveals, parallax hero, hover micro-interactions
- **Lenis** — smooth scroll (DISABLED on v3, see below)
- **next-themes** — light = default/primary, dark toggle
- Fonts: **Geist** (sans) + **Fraunces** (serif display). Banned: Inter/Roboto/Arial.

## v3 = whole-site HORIZONTAL scroll (the defining feature)

The entire page scrolls horizontally only — **no vertical scroll anywhere**.

- `src/components/horizontal-scroll.tsx` — the engine. A tall `<body>` spacer creates
  native vertical scroll *range*; a `position:fixed; overflow:hidden` track is translated
  on X by `scrollY`. So wheel/trackpad (vertical input) moves the page LEFT→RIGHT.
  Horizontal progress bar bottom-center. Nav anchor links remap target X → scrollTop.
  **Desktop only** (`lg+`); below `lg` it returns children as a normal vertical page.
- `src/components/panel.tsx` — each section wrapped in `<Panel>`: desktop = fixed width,
  exactly `100dvh` tall, `overflow:hidden`, content vertically centered. NO nested scroll.
- `src/components/sections/showcase-h.tsx` — v3 Capabilities = horizontal card ROW
  (v2's vertical pinned card-swap can't nest inside horizontal scroll).
- **Lenis is disabled on v3** (removed from `layout.tsx`) — it fights the scroll→X engine.
- Sections use `lg:py-0` and Work is `lg:grid-cols-4` (4-across) so every panel fits 100vh.

Panel order/widths in `src/app/page.tsx`: Hero(screen) · Trust+Marquee(55vw) ·
Services(95vw) · Capabilities(92vw) · Work(screen) · About(92vw) · Blog(80vw) · Contact(92vw).

## Sections

`src/components/sections/`: hero, trust, marquee, services, showcase-h, work, about, blog, contact.
Nav: `src/components/nav-bar.tsx` (floating glass pill, theme toggle, "Let's talk" CTA, mobile morph menu).
Shared: `reveal.tsx` (scroll reveals), `cta-button.tsx` (button-in-button magnetic CTA), `section-head.tsx`.

## Content — edit here

**All content is centralized in `src/lib/site.ts`** — services, projects, team, blog, nav, brand.

- **Financial Consulting** service gated behind `SHOW_FINANCE` (currently `false`).
  Flip to `true` once Gaurav + Sujal approve → card appears in Services bento.
- Project cards use **designed mock UI panels** (in `work.tsx` `MockUI`), not real screenshots — swap when real assets exist.
- Client logos in `src/components/sections/trust.tsx` are placeholder wordmarks.
- Placeholder copy/stats/email (`hello@sakti.studio`) throughout — replace with real.

## Develop

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # static export → ./out  (BASE_PATH=sakti-v3 for prod path)
npm run lint           # next lint
```

No test suite — verify visually in the browser. `npm start` serves the prod build but is
moot for a static export; use the `./out` files (or `npx serve out`) to check the export.

Note: after restarting dev server, warm Tailwind JIT by loading the page once (CSS compiles on first request).

## Deploy

Auto-deploys to GitHub Pages on push to `main` via `.github/workflows/deploy.yml`.
`basePath` auto-derives from repo name (`GITHUB_REPOSITORY`), so the same code works for any repo.

From the local checkout, push v3:
```bash
git checkout v3-deploy
git push v3 v3-deploy:main     # remote `v3` = github.com/vasu-nageshri/sakti-v3
```

## Gotchas

- `suppressHydrationWarning` on `<html>` AND `<body>` — needed for next-themes class swap + browser extensions (e.g. ColorZilla injects `cz-shortcut-listen`).
- No `Math.random()`/`Date.now()` in render (SSR/export determinism).
- Free GitHub plan blocks Pages on private repos → repo is public.
- Other versions for reference: sakti-v1 (classic vertical), sakti-v2 (animated vertical).
- **Dead v2 files still in tree, NOT used by v3** — don't edit them for v3 work:
  `src/components/smooth-scroll.tsx` (Lenis wrapper, no longer imported) and
  `src/components/sections/showcase.tsx` (v2 pinned card-swap, replaced by `showcase-h.tsx`).
- `next.config.mjs`: `images.unoptimized` + `trailingSlash` are required for Pages export
  (no image-optimization server, directory-style URLs); `assetPrefix`/`basePath` only apply
  when `NODE_ENV=production`, so dev stays at `/`.
