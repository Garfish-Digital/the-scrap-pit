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
│   ├── Button.tsx/.css      # <Link> when `to` is given, else <button>; variants primary/accent/victory/ghost
│   ├── PageMeta.tsx         # per-route title/description/OG via effect
│   └── ScrollManager.tsx    # route change -> top; `/route#id` -> scroll to section
├── content/                 # all copy and data, one module per route + site.ts
├── pages/                   # Home, Training, Fighters, About, Contact, NotFound (+ .css each)
└── styles/
    ├── fonts.css            # self-hosted Bebas Neue + Space Mono (pending Phase 2 type study)
    ├── tokens.css           # color, type, space, surface gradients
    ├── global.css           # reset, type hierarchy, layout primitives, surfaces
    └── patterns.css         # shared page patterns (split hero, CTA band, details list)
```

Routes: `/`, `/training` (includes `#striking`, `#grappling`, `#conditioning`, `#pricing`, `#guarantee`), `/fighters`, `/about`, `/contact` (accepts `?plan=warrior|champion|legend`), and `/studies/{type,color,logo}` — the Phase 2 design studies (`src/studies/`, lazy chunk). The studies are published on purpose so the design process can be documented on any device; remove the route and header link before client handoff.

## Conventions

- **Copy lives in `src/content/`**, never inline in pages. Copy carried over from v1 is preserved verbatim; anything new is marked `// NEW COPY (Phase 3) — review` so the owner can revise it deliberately.
- **CSS**: tokens in `tokens.css`; page-specific rules in the page's `.css`; shared patterns in `patterns.css`. Dark sections carry the `dark` class so inverse tokens (`.muted`, `.eyebrow`, `.details`, `.rule`) apply. Keep the ghost-white fields and the two `--gradient-*` surfaces; they are brand foundations.
- **Motion**: currently CSS state changes only. GSAP sequences are Phase 4 (see PLAN.md); do not add scroll reveals or cursor effects ad hoc. No custom cursor, ever.
- **Contact form** is demo-only: validates locally, shows an on-page "not sent" confirmation, never submits anywhere.
- **Placeholder photography**: files in `public/images/new-heroes/` marked with the `placeholder-tag` badge are layout stand-ins (rights/branding concerns noted in PLAN.md). Do not tune signature motion around them.
- Accessibility is a quality bar, not a compliance target: keep focus states, labels, reduced-motion handling, and keyboard use working.

## Design System (Phase 3 baseline — Phase 2 will refine)

- Colors: Ghost White `#F8F8FF`, Iron Black `#1A1A1A`, Blood Red `#E00000`, Championship Gold `#CC9900`
- Type: Bebas Neue (display), Space Mono (body/UI) — under review
- Surface rhythm: ghost white → dark/gradient-dark → gradient-light, alternating per route
