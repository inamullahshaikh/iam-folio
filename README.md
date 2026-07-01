# Inamullah Shaikh — Portfolio

Personal engineering portfolio. Editorial, left-aligned, no vibe-coded slop.

## Stack

- React 18 + TypeScript + Vite 6
- Tailwind CSS v4 (`@tailwindcss/vite`)
- React Router v6

## Design system

- Warm off-white background `#F7F6F3`, near-black text `#1A1A1A`, single rust accent `#C45C26`
- Source Serif 4 (display, sparingly), IBM Plex Sans (body), IBM Plex Mono (stack/code/dates)
- No purple, no glassmorphism, no card grids, no skill bars, no fake metrics

## Source of truth

All copy and facts come from the portfolio context JSON, encoded in
`src/data/portfolio.ts`. If you keep the raw JSON, drop it at
`docs/portfolio_context.json`. Never invent tools or metrics — omit stats that
aren't in the data.

## Commands

```bash
npm install      # install dependencies
npm run dev      # local dev server
npm run build    # typecheck + production build
npm run preview  # preview the production build
```

## Structure

```
src/
  components/   Layout, Nav, Footer, ProjectRow, CaseStudy
  pages/        Home, Projects, About, Experience, Contact, case studies, NotFound
  data/         portfolio.ts — typed content
  lib/          usePageMeta — per-page SEO title/description
```

## Fill before publishing

- GitHub repo + live demo URLs per project (currently omitted, not shown as "coming soon")
- ForeSyte demo video / screenshots
- Quantified metrics (latency, accuracy, documents indexed) — only add if real

## Deploy

Static build. `vercel.json` and `public/_redirects` handle SPA routing on
Vercel/Netlify. Build command `npm run build`, output `dist/`.
