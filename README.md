# Sakti

> Transforming your vision into its ultimate apex.

Portfolio site for Sakti — an engineering + finance studio. High-end agency
aesthetic, light/dark themes, scroll-driven motion.

## Stack

- **Next.js 15** (App Router, static export)
- **Tailwind CSS** — emerald `#00E5A0` brand accent, light theme primary
- **Framer Motion** — scroll reveals, tab transitions, micro-interactions
- **Lenis** — smooth scroll
- **next-themes** — light (default) / dark toggle

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build (static export)

```bash
npm run build    # outputs to ./out
```

## Deploy

Auto-deploys to GitHub Pages via `.github/workflows/deploy.yml` on every push
to `main`. Served at the repo `basePath` (`/sakti`).

## Content

All editable content lives in [`src/lib/site.ts`](src/lib/site.ts):
services, projects, team, blog, nav. Client logos in
[`src/components/sections/trust.tsx`](src/components/sections/trust.tsx).

**Financial Consulting** service is gated behind `SHOW_FINANCE` in `site.ts`
(currently `false`) — flip to `true` once approved.
