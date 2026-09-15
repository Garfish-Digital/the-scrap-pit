# The Scrap Pit

Demo website for a fictional combat sports gym — a Garfish Digital design showcase. Its job is to demonstrate art direction and motion craft; it is not a real business site.

**Stack:** Vite 8 · React 19 · TypeScript · react-router 8 · plain CSS · GSAP 3.15

```sh
npm install
npm run dev       # http://localhost:3000
npm run build     # production build -> dist/
npm run preview   # preview dist/ on :3000
npm run lint      # oxlint
```

## Routes

`/`, `/training` (`#striking` `#grappling` `#conditioning` `#pricing` `#guarantee`), `/fighters`, `/about`, `/contact` (`?plan=warrior|champion|legend` pre-selects a plan). Deployed to Netlify; `public/_redirects` routes deep links to `index.html`.

`/studies/{type,color,logo,motion}` document the design process (Phase 2 type/color/logo studies and the Phase 4 motion prototypes). They ship by default so the process can be viewed on any device. **For a client-facing deploy, set `VITE_STUDIES=off`** in the build environment: the routes and the header links are dropped from the bundle.

## Where things are

| | |
| --- | --- |
| `PLAN.md` | roadmap and decision log, phase by phase |
| `design/MOTION.md` | the motion score: characters, owner decisions, rules, as-built sequence specs |
| `design/logo/` | logo sources (SVG), OG image source |
| `src/content/` | all copy and data, one module per route |
| `src/motion/` | live GSAP layer: preloader + route Cut (`PitOverlay`), hero Weigh-in, section Rounds, Cut & Slip, Impact buttons |
| `src/studies/` | the published studies |
| `src/styles/tokens.css` | the approved palette and type roles (Archivo variable, self-hosted) |

## Intentionally demo-only

- **Contact form** validates locally and shows an on-page confirmation. Nothing is sent anywhere.
- **Business details** (address, phone, hours, prices, stats, fighter and coach bios) are fictional. The vanity number `(555) 321-SCRAP` dials `+1 555 321 7272`.
- **Placeholder photography:** the Training hero and About backdrop carry a visible "Placeholder image" badge (event marks and sponsor logos visible in the source photos). Replace before any public use; the originals and WebP derivatives are in `public/images/new-heroes/`.
- **Preloader** plays once per browser session (`sessionStorage` key `pit:booted`); open a new tab to see it again.
- **`noindex`** is set on every page.

## Motion

Every sequence has a reduced-motion equivalent; with `prefers-reduced-motion: reduce` the preloader and route transition are skipped, section content is never hidden, buttons use a plain inverted hover, and images show colour without the slip. Content that has not yet entered stays keyboard-focusable and enters on focus.
