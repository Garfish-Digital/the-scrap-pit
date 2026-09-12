# The Scrap Pit — rebuild working plan

This is the working roadmap for the direction in `SITE_REWORK.md`. It records the current state and decisions to test, not a mandate to preserve the existing implementation. The goal is a client-facing design showcase with deliberate art direction, polished navigation, and motion that feels precise and expensive.

## What exists today

- Astro 5 and Sass, with one route (`/`). `src/pages/index.astro` contains 14 sections and its own large SCSS block; `src/layouts/FightLayout.astro` owns the shell, navigation, footer, cursor, and scroll behaviors. `CombatButton.astro` is the only actively imported component. `GritCursor.astro` appears to be an unused second cursor implementation.
- The existing 14 sections supply a starting set for the five requested routes. The current header has five section links, but they all point into the same page.
- Assets worth evaluating for reuse: hero, three training images, three fighter portraits, two leader portraits, local Bebas Neue and Space Mono fonts, favicon, and OG image. The ghost-white field, dark sections, and subtle black/red/gold linear gradients are useful brand foundations. The light gradient is defined in the join and about CTA sections; the hero and section headers use darker gradients.
- Baseline `npm run build` passes (September 12, 2026). Sass emits deprecation warnings. The contact form has no `action` or submit handler, so it needs an intentional demo behavior or a real destination before it can claim to work. The current footer says 2025. A remote Font Awesome kit is used for icons.

## Direction and decisions

1. **Experience architecture.** Replace the single-scroll page with a React + TypeScript app and plain CSS. A Vite-based React setup is a reasonable default for this demo; configure its dev port around the user's existing local preview workflow when migration starts. The initial sitemap is `/`, `/training`, `/fighters`, `/about`, and `/contact`, with pricing inside Training, shared footer, route-specific metadata, and working cross-page CTAs.
2. **Visual language.** Keep expansive ghost-white areas and selected linear-gradient section backgrounds. Refine the red and gold as a small set of coherent tokens alongside black and neutral tones. Audit the font stack closely: display, body, numerals, labels, and fallback behavior should each have an intentional role. Establish a grid, typography scale, spacing system, image treatment rules, and restrained use of borders/shadows. Keep the combat-sports character while moving away from repeated generic cards, identical scroll reveals, emoji feature icons, and decorative effects that compete with the work. Accessibility is a quality check for usability and polish, without treating strict WCAG conformance as the project's brief.
3. **Branding.** Treat the wordmark and symbol as a design workstream, not an automatic font swap. Prepare two or three distinct logo concepts and test them in the header, favicon, social image, and dark/light settings. The user's Figma skill makes editable vector concepts and clear construction rules more valuable than a baked bitmap. Final logo direction should be chosen before fine-tuning page layouts around it.
4. **Motion.** Build a motion score with a few signature sequences: a staged hero entrance, image/text transitions that follow the composition, intentional route changes, and strong but short button feedback. Evaluate GSAP for timeline and scroll choreography when implementation begins; use CSS for simple state changes. Document timing, easing, trigger, and purpose per sequence. Remove all custom cursor and cursor-follow behavior. Honor reduced-motion preferences and keep navigation, forms, and content usable before animation loads.
5. **Functional polish.** The contact form will validate locally and show a clear on-page confirmation; it will not send a message. Audit placeholder business details and claims, including address, phone, fighter credentials, pricing, and guarantee, so the demo reads consistently. Preserve or intentionally revise copy rather than silently rewriting it during migration. The user has archived v1 separately, so the live project can evolve without making its old layout the source of truth.

## Decisions locked (September 12, 2026)

- **Hosting:** standalone at `the-scrap-pit.netlify.app`. Use `BrowserRouter` with clean routes and a `public/_redirects` rule (`/* /index.html 200`) so deep links and refreshes resolve. No base path.
- **Dev tooling:** Vite + React + TypeScript. Vite defaults to port 5173; pin `server.port` in `vite.config.ts` to whatever the user wants to watch (3000 unless told otherwise).
- **Migration:** replace Astro at the repo root in one switchover. Scaffold the Vite app outside the repo, then swap it in and delete Astro, Sass, both cursor implementations, and the Font Awesome kit. v1 is archived, so nothing in the old tree is precious.
- **Logo workflow:** Claude drafts two or three editable SVG concepts with construction notes; the user refines and chooses in Figma. A placeholder wordmark can occupy the header until then.
- **Flagged photography:** `fighter-hero-1.jpg` (recognizable UFC champion, UFC gloves), `training-hero-1.jpg` (UFC Fight Pass banner, sponsor marks), and `about-hero.png` (arena sponsor marks) are layout placeholders only. Test crops with them, keep the shot list active, and do not tune signature motion around them. `fighter-hero-2.png` and the existing image set are clean.
- **GSAP licensing:** GSAP and all its plugins (ScrollTrigger, SplitText, Flip, etc.) are free since the Webflow acquisition, so plugin choice is a design decision, not a cost one.
- **Consistency sweep for Phase 5:** footer year says 2025; phone reads `(555) 321-SCRAP` but the `tel:` link is `+15551234567`; the guarantee copy differs between the join and guarantee sections ("refund every penny" vs. "never had to honor it"). Reconcile these during the claims audit.

## Proposed sequence

### Phase 1 — Content, asset, and route audit

- Inventory each existing section, its copy and images, and what earns a place on the new routes. Check asset resolution and likely crop constraints from the source files. Record typography issues for the Phase 2 type study. The user is already watching the site on a local dev server; use separate previews when new pages are available without disrupting that workflow.
- Use the following page outlines as the first wireframe pass. Bracketed hero slots are new-image opportunities, not a requirement to source images immediately.

  | Route | Initial section order |
  | --- | --- |
  | `/` | Existing hero + CTA; consider a concise Training teaser; Forged in Fire; Become Scrappy |
  | `/training` | [Hero]; The Gauntlet Stages; Become Scrappy; Choose Your Training; pricing plans and extras; 30-Day Warrior Guarantee |
  | `/fighters` | [Hero]; Iron Will Profiles; fighter-specific take on Forged in Fire; Hardened Leaders; fighter-specific invitation |
  | `/about` | [Hero]; Our Story; By the Numbers; four value cards; Ready for the Pit? |
  | `/contact` | [Hero] / Contact the Pit; Get in Touch; Find the Pit |

- Accepted editorial direction: the guarantee follows Training pricing, while Fighters closes with an invitation tied to its people and stories. Home and Fighters both list “Forged in Fire,” and Home and Training both list “Become Scrappy”; each instance needs a distinct job and treatment rather than a duplicated long block. Contact's [Hero] and “Contact the Pit” become one opening section.
- Decide where additional MMA hero photography will materially improve a route, then give the user a shot list with aspect ratio, subject, negative space, and intended text placement. Review existing assets before requesting new ones.
- Sketch the navigation and a low-fidelity layout for each route. Pick two or three visual references for the desired level of craft, with notes about *why* they work.
- Deliverable: working sitemap, page outlines, asset/hero shot list, typography audit, and a short art-direction brief. These are enough to begin designing and building; visual QA follows implementation.

### Phase 2 — Brand and design system

- Explore logo concepts in Figma; settle on a responsive wordmark/symbol set.
- Define CSS tokens, type hierarchy, layout grid, color use, image grading, icon approach, and interaction states. Prototype one representative light section and one dark section before applying the system site-wide.
- Deliverable: small design system and representative page studies.

**Status (September 12, 2026): studies delivered, decisions pending.** Three dev-only routes on the local server (excluded from production builds): `/studies/type`, `/studies/color`, `/studies/logo`. Source in `src/studies/`; logo SVGs in `design/logo/`.

- **Type study** — three systems rendered on identical real-copy specimens (nav, hero, section head + body, numbers band, plan card, quote, form field), with a 390px view and per-system full-width views. A = Bebas Neue + Space Mono tuned (control); B = Archivo variable, width axis 62/100/112 for display/body/numerals; C = Big Shoulders + IBM Plex Sans + IBM Plex Mono. Recommendation: **B** for “expensive system”, **C** if the brand should lean industrial. Candidate faces load from Google Fonts in the study only; the winner gets self-hosted and subset.
- **Color study** — current vs proposed palettes on identical samples (light field, gradient-light, dark field with elevated panel, gradient-dark). Proposal: Ink `#121214` / Iron `#1E1E22` / Steel 700–100 neutral ramp; Red 900/600/400 (`#8E0C1F` / `#C8102E` / `#E62C43`); Gold 800/500/300 (`#8F6F14` / `#C9A227` / `#E8C55A`); gradient-light re-pigmented at 5–7%; gradient-dark becomes an Ink→Iron sweep. Usage rules are written on the study page.
- **Logo concepts** — A “The Pit” (block with square pit, entrance slot, ember), B “Scrap S” (stencil S torn on a 45° line, lower piece red), C “Cage Bar” (wordmark with a red rail cut through cap-midpoint; SP monogram). Each shown on white, on ink, at 96/32/16, in the header, and as a favicon. Recommendation: **C** as primary wordmark with **A** as the small-size mark if the SP monogram fails at 16px. Wordmarks are live text in Bebas Neue as a stand-in for the chosen display face; geometry is on an 8-unit grid.

Decisions needed from the owner before Phase 2 closes:
1. Type system (A / B / C, or a hybrid such as B display + C mono labels).
2. Color proposal accepted as-is, or adjustments to the red/gold values.
3. Logo direction to take into Figma; final files come back as SVG (header lockup, favicon symbol) plus a 1200×630 OG image.

After those: apply tokens and faces site-wide, replace the placeholder wordmark, regenerate favicon/OG, then move to Phase 4.

### Phase 3 — React foundation and route migration

- Set up React/TS, plain CSS, routing, page metadata, shared shell, and reusable components. Move content and assets route by route; update every CTA and footer link to real destinations. Remove Astro, Sass, and both cursor implementations once the replacement is working.
- Deliverable: complete navigable site with static content, responsive layouts, and no broken links. Keep motion minimal at this stage so layout quality can be judged directly.

**Status (September 12, 2026): foundation delivered.** Vite 8 + React 19 + TypeScript + react-router 8 replaced Astro at the repo root; Sass, both cursors, and the Font Awesome kit are gone. All five routes follow the Phase 1 wireframe section orders, with `src/content/` holding the copy (v1 copy preserved; new bridging copy marked `NEW COPY`). Dev server is pinned to `:3000`. Verified: build, lint, hash navigation to Training sections, `?plan=` prefill on Contact, local form validation and confirmation with preserved values, 404 route, mobile menu, and desktop/mobile screenshots of every route. Styling is intentionally plain; icons are gone entirely (numbered indices and labels do that job for now).

Open items carried forward:
- The home hero title is constrained to the left ~45% of the frame so it clears the central figures at wide widths; judge this on a real display and against the mobile contained-image variant.
- Fighter quotes render in Bebas Neue (all caps by design of the face); the Phase 2 type study should decide whether quotes deserve a reading face.
- Three placeholder photos carry a visible "Placeholder image" badge (Training, About heroes). Fighters uses the clean `fighter-hero-2.png` without a badge.
- The stale memory folder inside the repo at `.claude/projects/.../memory/` describes the March 2026 single-scroll direction and can be deleted.

### Phase 4 — Motion direction and build

- Prototype the hero and one interior-page transition first. Tune the motion against real images and typography, then extend the language to sections, controls, and page changes. Profile mobile and slower devices; avoid scroll effects that interfere with reading or input.
- Deliverable: documented motion rules and implemented sequences, including reduced-motion equivalents.

### Phase 5 — Finish and QA

- Verify the local form confirmation and placeholder claims. Review 320px through wide desktop layouts, touch/keyboard use, focus states, contrast, motion preference, navigation history, asset loading, metadata, and performance. Update README with the new stack and commands.
- Deliverable: production build, manual QA notes, and a clear list of any intentionally demo-only functionality.

## Immediate next move

Use the Phase 1 audit and wireframe directions below to begin the type/visual studies and React foundation. Judge responsive crops and interactions in the browser as each new route is implemented.

## Phase 1 audit — first pass

This is a source and asset audit. The user added six candidate heroes in `public/images/new-heroes/`; the assignments below are provisional wireframe placeholders to test once the new pages exist.

### Assets and typography

| Asset group | Finding | Direction |
| --- | --- | --- |
| Existing home hero | `hero-octagon-scrap.webp`, 1920×1280. Active fight scene; bright yellow cage posts dominate the palette and figures occupy the center/lower half. | Strong candidate for Home, but test headline placement over the crop at desktop and mobile. Avoid making every page feel like the same stock-photo hero. |
| Training photography | Striking, grappling, and conditioning images are each 2121×1414. They show distinct disciplines and can carry generous editorial crops. | Keep for discipline sections; consider one as a temporary Training hero during design studies, then judge whether a dedicated hero adds more. |
| Fighter profiles | Three square portraits: 400, 300, and 450 px. | Fine for modest portrait cards, weak for large-screen hero or deep zoom motion. Source higher-resolution portraits if Fighters uses an immersive opening. |
| Leader portraits | Two squares: 400 and 250 px. | Keep small unless replacements become available. Do not animate scale beyond their usable resolution. |
| Brand support | Local Bebas Neue (regular) and Space Mono (regular/bold), favicon SVG, OG image, remote Font Awesome kit. | Audit typography in context, then decide whether to retain either typeface. Replace icon dependence with a deliberate, small icon system if needed. Revise favicon and OG image with the new identity. |

#### New hero candidates (September 12, 2026)

| File | Size | Visual assessment and provisional use |
| --- | --- | --- |
| `training-hero-1.jpg` | 1951×1280 | Bright, low-angle live bout with two fighters filling most of the frame. Strong action but limited text-safe space and identifiable event marks. Test as the Training hero only with a deliberate split layout or separate text field; it does not literally show a training session. |
| `training-hero-2.avif` | 512×512 | Grainy square gym/cage detail with a figure partly obscured. Useful as an atmospheric inset or texture, too small and soft for a full-width hero. |
| `fighter-hero-1.jpg` | 1920×1280 | Recognizable professional fighter centered against an arena crowd. Technically suitable for a wide hero; editorially implies a connection between that athlete and this fictional gym. Keep as a comparison image, not the default Fighters hero. |
| `fighter-hero-2.png` | 1374×916 | Two athletes facing camera in a training cage. More personal and relevant to a Fighters story; centered subjects leave little space for overlay text. Provisional Fighters hero in a split composition, with type outside the image. |
| `fighter-hero-3.jpg` | 1024×683 | Ground-fighting moment with a strong red corner and lower resolution. Better as a supporting editorial image or tight section break than a large hero. |
| `about-hero.png` | 1200×800 | Dark, empty event cage with generous black space for type, but it tells an arena story rather than a gym/founder story. Provisional About backdrop for layout exploration; replace or reframe if the page's mission needs a more human opening. |

The files are untouched. For the final portfolio presentation, evaluate whether event marks and recognizable athletes make the fictional gym feel falsely associated with real organizations or people; the visual mismatch is as important as crop quality. Contact still does not need a photograph to start.

The current style system uses Bebas for nearly all headings and Space Mono for nearly all body/UI copy. This creates an abrupt condensed-versus-monospace split, while repeated uppercase labels, variable letter spacing, and many local font-size overrides weaken hierarchy. First type study: a display face for only the loudest statements, a more fluid reading face for paragraphs and form text, and a single consistent treatment for numbers, eyebrow labels, navigation, and CTAs. Test both fonts already in the repo before adding one; use actual page copy and mobile widths, not specimen text alone.

### Low-fidelity route wireframes

These describe hierarchy and pacing rather than finished design. Each route gets the same navigation and footer, with a clear current-page state. Subsections remain anchorable within their route.

| Route | Opening → middle → close | What should feel distinct |
| --- | --- | --- |
| Home | Full-screen image and one primary CTA → short Training gateway → compact “Forged in Fire” manifesto → “Become Scrappy” handoff to Training or Contact. | A confident editorial introduction, with generous empty space. Tease the world rather than repeating whole interior pages. |
| Training | Discipline-specific hero → three Gauntlet Stages as varied image/text compositions → “Become Scrappy” as a transition into commitment → plan comparison and extras → guarantee → Contact CTA. | Technique and choice. Make plan details scannable instead of letting three nearly identical cards dominate. |
| Fighters | Portrait-led or documentary hero → fighter stories → “Forged in Fire” interpreted through their voices → leaders → invitation to meet/train with the team. | Human presence and credibility. Let portraits, quotes, and asymmetrical rhythm carry this page; no pricing guarantee here. |
| About | Place/mission hero → Our Story → By the Numbers → four values → “Ready for the Pit?” CTA. | A persuasive narrative with room for long-form copy. Numbers and claims should read as clearly demo content if they remain fictional. |
| Contact | One “Contact the Pit” opening, with image only if it adds meaning → form and location/hours in an editorial split → clear local confirmation after submit. | Direct and calm. The form is the main interaction; avoid motion behind fields or a redundant second hero. |

### Hero shot list to source or test

- **Training:** test `training-hero-1.jpg` in a split hero, with the existing striking image as an alternate because it depicts actual training. For a later replacement, seek an in-progress technique moment with clear body geometry, room for a headline, and enough height for a phone crop.
- **Fighters:** test `fighter-hero-2.png` in a split hero. A later replacement should connect visually to the people represented in the stories below, at sufficient resolution for a wide crop and subtle movement.
- **About:** test `about-hero.png` as a dark backdrop. A later replacement should show the gym environment, coach interaction, or equipment detail that tells a story about the place.
- **Contact:** optional location/entrance or quiet gym detail. This route can open with typography and the existing light/dark surface language if no photograph earns its space.

### Composition and motion questions for implementation review

- Does the 1920×1280 home image support both a wide hero and a narrow phone crop without hiding the action or text?
- Which existing gradient sections feel intentional at full-page scale, and which need more negative space or a stronger boundary?
- Can the header show five routes cleanly on narrow screens without a crowded two-row navigation?
- Which reveal effects help direct attention, and where do repeated reveals make the page feel templated? Capture examples before defining the new motion score.

## Phase 1 wireframe pass — layout instructions

The following is a buildable composition brief. Crop and spacing judgments below come from inspecting the source and image files; they will be tested on the new pages as they are implemented.

### Shared shell

- **Desktop:** wordmark at left, five route links at right, Contact differentiated by position/treatment rather than an extra floating CTA. Keep the header shallow enough that the first image remains visible. Footer repeats the five routes and closes with a short brand statement.
- **Mobile:** one clear menu trigger and an intentional full menu state; avoid shrinking five labels into the current crowded horizontal row. The current page must stay legible in both header modes. Route changes return to the top; in-page links target only sections on the current route.
- **Surface rhythm:** alternate large ghost-white editorial fields with selective dark or subtle red/gold gradient fields. Let images and type establish hierarchy before adding decorative lines, boxes, or movement.

### Home (`/`)

1. **Entrance:** retain `hero-octagon-scrap.webp`; stage the identity and single lead statement in a text zone that does not cover the central figures. One main link to `/training`, secondary text link to `/fighters`. Test a contained image pane if a full-bleed mobile crop loses the action.
2. **Training gateway:** a short three-discipline index, using the existing training images sparingly rather than recreating the full Gauntlet section. Each item leads to `/training#striking`, `#grappling`, or `#conditioning`.
3. **Forged in Fire:** a compact brand manifesto on a light field. Its job is to explain the ethos in a few lines and point toward `/about`; the deeper story stays on About.
4. **Become Scrappy:** one strong closing invitation on the subtle tri-color gradient, linking to `/contact` and the Training plans.

### Training (`/training`)

1. **Entrance:** test `training-hero-1.jpg` in a two-part composition, image on one side and headline/intro on a solid surface. Keep event marks and fighter faces out from under type. Compare it with the existing `fighter-striking.webp`, which depicts practice rather than competition.
2. **Gauntlet:** three disciplines as an editorial sequence, not three identical cards. Give each a large image, concise technique summary, and small factual details. Alternate image alignment or crop without changing the reading order on mobile.
3. **Become Scrappy:** a short commitment hinge between disciplines and costs; here it means choosing a way to train, not repeating Home's broad brand invitation.
4. **Choose Your Training:** plan heading followed by a legible comparison of Warrior, Champion, and Legend; add day/weekly/personal/group options as a quieter secondary tier. Pricing calls to action go to `/contact`, potentially with a chosen-plan query or label.
5. **Guarantee:** place the 30-day statement immediately after plans and before the final contact invitation. Keep it as a clear copy block, not another competing pricing card.

### Fighters (`/fighters`)

1. **Entrance:** use `fighter-hero-2.png` as a contained photo with the page title on an adjacent solid field. Its two centered subjects should remain visible on narrow screens; a stacked crop is safer than forcing full-bleed text overlay.
2. **Iron Will Profiles:** let the three voices lead, with portrait/citation pairs and more whitespace than the current repeated profile cards. Existing portraits can stay modest in size; avoid scaling the 300px image into a hero.
3. **Forged in Fire:** present this as a bridge from fighter testimony to coaching, with distinct text or a short quote treatment. Do not duplicate Home's manifesto.
4. **Hardened Leaders:** two coach profiles with enough biography to justify their place; 250px Sarah portrait needs a restrained display size or replacement.
5. **Invitation:** end with a clear invitation to train with or meet the people behind the page, linking to `/contact` and `/training`.

### About (`/about`)

1. **Entrance:** test `about-hero.png` as a dark background with the mission statement in a bounded text area. It has abundant negative space but is an arena image, so keep a place-centered replacement on the shot list.
2. **Our Story:** longer-form editorial copy on ghost white with a narrower reading measure. Pair with an image only if it adds context about the gym or founders.
3. **By the Numbers:** four metrics as a distinct typographic band rather than cards. Review fictional claims before polishing this section.
4. **Our Code:** four values in a deliberate two-by-two layout on desktop and a simple ordered stack on mobile. Differentiate them through hierarchy and writing, not four competing icons.
5. **Ready for the Pit?:** the existing gradient language can close this route, with links to `/training` and `/contact`.

### Contact (`/contact`)

1. **Entrance:** “Contact the Pit” is the page hero; a type-led opening can be stronger than reusing an unrelated cage photograph. Keep it brief so the form appears early.
2. **Get in Touch / Find the Pit:** a desktop split between form and location/hours, stacked with the form first on mobile. Label the form's local-only demo behavior near the submit control.
3. **Feedback:** validate required fields; after submit, show an on-page confirmation that explicitly says the message was not sent. Preserve entered values unless the interaction has a clear reason to clear them.

### Checks during design and implementation

- Run a focused type study with existing local fonts and at least one alternative reading face during Phase 2.
- As each route is built, test its hero crop, headline lengths, and interactions at wide desktop, laptop, and narrow phone widths. Decide whether the event photography fits the fictional-gym narrative or needs replacing.
