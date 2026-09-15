# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**The Scrap Pit** is a demo website for a fictional combat sports training gym, built by Garfish Digital as a design-capability showcase. Its job is to look expensive and move beautifully; it is not a real business site. v1 (Astro + SCSS, single long-scroll page) is archived separately; this repo is the v2 rebuild.

- **Stack**: Vite 8, React 19, TypeScript, react-router 8 (declarative mode), plain CSS with custom properties
- **Hosting**: standalone at `the-scrap-pit.netlify.app` (`public/_redirects` handles SPA deep links)
- **Roadmap**: `PLAN.md` is the living roadmap and decision log. `SITE_REWORK.md` is the owner's notes file — read it, do not edit it.

## Common Commands

```bash
npm install
npm run dev       # Vite dev server on http://localhost:3000 (strictPort)
npm run build     # tsc -b && vite build -> dist/
npm run preview   # serve dist/ on :3000
npm run lint      # oxlint
```

## Architecture

```
src/
├── main.tsx                 # entry; imports global + pattern CSS
├── App.tsx                  # BrowserRouter + route table
├── components/
│   ├── Layout.tsx           # Header + <Outlet> + Footer, mounts ScrollManager
│   ├── Header.tsx/.css      # sticky nav, NavLink active state, mobile full-menu
│   ├── Footer.tsx/.css
│   ├── Logo.tsx/.css        # PitMark symbol + wordmark lockup (currentColor lower bracket)
│   ├── Button.tsx/.css      # <Link> when `to` is given, else <button>; variants primary/accent/victory/ghost
│   ├── PageMeta.tsx         # per-route title/description/OG via effect
│   └── ScrollManager.tsx    # route change -> top; `/route#id` -> scroll to section
├── motion/                  # live GSAP layer: gsap.ts entry, pit-geometry.ts, PitOverlay (preloader + the Cut)
├── content/                 # all copy and data, one module per route + site.ts
├── pages/                   # Home, Training, Fighters, About, Contact, NotFound (+ .css each)
└── styles/
    ├── fonts.css            # self-hosted Bebas Neue + Space Mono (pending Phase 2 type study)
    ├── tokens.css           # color, type, space, surface gradients
    ├── global.css           # reset, type hierarchy, layout primitives, surfaces
    └── patterns.css         # shared page patterns (split hero, CTA band, details list)
```

Studies: `/studies/{type,color,logo,motion}` (dropped from the build when `VITE_STUDIES=off`, see `src/config.ts`). Routes: `/`, `/training` (includes `#striking`, `#grappling`, `#conditioning`, `#pricing`, `#guarantee`), `/fighters`, `/about`, `/contact` (accepts `?plan=warrior|champion|legend`), and `/studies/{type,color,logo}` — the Phase 2 design studies (`src/studies/`, lazy chunk). The studies are published on purpose so the design process can be documented on any device; remove the route and header link before client handoff.

## Conventions

- **Copy lives in `src/content/`**, never inline in pages. Copy carried over from v1 is preserved verbatim; anything new is marked `// NEW COPY (Phase 3) — review` so the owner can revise it deliberately.
- **CSS**: tokens in `tokens.css`; page-specific rules in the page's `.css`; shared patterns in `patterns.css`. Dark sections carry the `dark` class so inverse tokens (`.muted`, `.eyebrow`, `.details`, `.rule`) apply. Keep the ghost-white fields and the two `--gradient-*` surfaces; they are brand foundations.
- **Motion**: the score is `design/scrap-pit-design/MOTION.md` (characters, owner decisions, rules, as-built specs); prototypes live in `src/studies/motion/` at `/studies/motion`; the live motion layer is `src/motion/` (GSAP 3.15). Page altitude is built: `PitOverlay` runs the once-per-session preloader and the Cut route transition, and emits `pit:boot` / `pit:reveal` — start scene-level sequences on those events, not on mount. Import GSAP from `src/motion/gsap.ts`. Follow the score's rules (hits ≤ 300 ms, settles ≥ 600 ms; animate only transform/opacity/clip-path/font-variation-settings; reduced-motion equivalent alongside every sequence). No custom cursor or cursor-follow, ever.
- **Contact form** is demo-only: validates locally, shows an on-page "not sent" confirmation, never submits anywhere.
- **Placeholder photography**: the WebP files in `public/images/new-heroes/` marked with the `placeholder-tag` badge are layout stand-ins (rights/branding concerns noted in PLAN.md); originals and rejected candidates are in `design/scrap-pit-design/photo-sources/` and must not move back into `public/`.
- Accessibility is a quality bar, not a compliance target: keep focus states, labels, reduced-motion handling, and keyboard use working. Motion must never make content unfocusable — hide with opacity, not visibility, and enter a section on `focusin` (see `useRounds`).

## Design System (approved September 13, 2026)

- **Type:** Archivo variable only (`public/fonts/archivo-*.woff2`, latin + latin-ext, upright + italic). Four roles set by tokens: display 800 / width 62 (`h1–h4`, `.display`), body 400 / 100 (default), label 600 / 100 tracked caps (`.label`, `.eyebrow`, `.text-link`, buttons, nav), numerals 700 / 112 tabular (`.num`), quotes 500 / 88 (`.quote`). Never add a second family.
- **Color:** Ink `#121214`, Iron `#1E1E22`, Steel 700/500/300/100; Red 900/600/400 (`#8E0C1F` / `#C8102E` / `#E62C43`); Gold 800/500/300 (`#8F6F14` / `#C9A227` / `#E8C55A`); Ghost White `#F8F8FF`. Components use semantic aliases (`--accent`, `--accent-strong`, `--victory` for gold surfaces, `--victory-text` for gold text, `--text-muted`, `--rule`, `--rule-strong`, `--focus`); `.dark` re-points them, so never hard-code a dark-surface color in a component.
- **Logo:** Concept D “Pit Frame” — `src/components/Logo.tsx` (`PitMark` symbol + `Logo` lockup; lower bracket is `currentColor`). Source SVGs in `design/scrap-pit-design/logo/d-split-*.svg`; `public/favicon.svg` swaps the lower bracket on dark browser chrome; `public/og-image.jpg` is rendered from `design/scrap-pit-design/logo/og-image-source.html`.
- **Surface rhythm:** ghost white → Ink / gradient-dark → gradient-light, alternating per route. Both gradients keep the v1 135° structure.
