# The Scrap Pit — Motion score

Phase 4 direction (September 13, 2026). The brief: motion is the most custom and impressive thing about the site; visitors should remember how it moved before they remember what it said. This document proposes three motion *characters*, the signature sequences each one implies, the micro-interactions that carry the language into every control, and a recommended hybrid. Live prototypes of the signature moves are at `/studies/motion`.

## Where the motion comes from

Everything traces back to the mark. The Pit Frame gives us four physical ideas, and every sequence below is built from them:

| Idea | In the mark | As motion |
| --- | --- | --- |
| **The tear** | The rising 45° cut through the frame | Diagonal wipes, slips, masks. The site's way in and out of everything. |
| **The brackets** | Two corners facing off across the void | Framing devices that close on content, open to reveal it, or "square off" on hover. |
| **The void** | The 32-unit hole in the centre | A square aperture that opens to reveal images; the pit that content is dropped into. |
| **Impact** | The mark is a still; impact is what happens in a pit | Very short, very hard hits: 40–120 ms slams, jolts, flashes. Never bouncy, never cute. |

Two tempos, deliberately opposed: **hits** (punchy: `power4.in`, `expo.in`, 80–300 ms, sometimes `steps()`) and **settles** (bezier-smooth: `expo.out`, `power3.out`, custom eases, 700–1400 ms). The contrast between them is the character. A sequence that is all-smooth reads as a template; all-punchy reads as a game.

## Three characters

### 1 · "The Tear" — geometric, brand-integrated

The diagonal is the star. Every transition is a cut; every reveal is a slip; every mask is the frame.

- **Route transition — the Cut.** On navigation, two triangles converge on the rising diagonal: Red 600 from the top-left, Ink from the bottom-right, meeting with a 6px ghost-white gap (the tear) — `power4.in`, 420 ms, *hit*. Hold 120 ms while the Pit Frame resolves at the centre (the void punches out of the overlay). Then both halves slide off along the diagonal in opposite directions revealing the new route — `expo.out`, 800 ms, *settle*. The new page's hero is already staged behind the overlay, so the first frame after the reveal is the hero entrance's first frame.
- **Cut & Slip (images).** Hover / tap on any image: the image splits along the diagonal into two halves that slip 8 px apart along the cut, the gap flashes ghost white, colour snaps in, then the halves snap back with a short `back.out(1.7)` settle — 350 ms total. Grayscale→colour rides on it, so the effect is both the brand device and the v1 "mono-to-colour" idea rebuilt.
- **Diagonal line masks (type).** Headings enter through a diagonal clip that sweeps bottom-left → top-right, `power3.out`, 700 ms. Distinct from the ubiquitous horizontal line-mask.
- **Section boundaries.** Every dark/light boundary is a diagonal edge (a `clip-path` on the section), and on scroll the edge angle scrubs from 0° to 6° — subtle but the whole page feels cut from sheet metal.

*Risk:* if every element uses the diagonal, it becomes wallpaper. Reserve the full-screen Cut for routes; use slips and masks sparingly.

### 2 · "Weigh-in" — cinematic, editorial

Slow, heavy, expensive. Think a title sequence, not a UI. The tempo is long settles with one hit per scene.

- **Hero — the Weigh-in.** Image starts desaturated at 1.08× inside a letterbox of two enormous brackets (the mark at viewport scale, corners just off-screen). Brackets snap to the corners — *hit*. Title lines drop in one at a time — THE / SCRAP / PIT — each with heavy overshoot and a 2° skew that resolves on landing; on each landing the image jolts 2 px and gains 33% saturation — three hits, 90 ms apart. Subtitle resolves through a variable-font width animation (Archivo `wdth` 125 → 62, the letters literally tightening). CTA rises along the diagonal. Idle: 30-second Ken Burns drift, brackets breathe ±1%.
- **Hero on scroll.** The hero pins for 100vh of scroll; the brackets close over the image (the pit closing), the title condenses to a sliver, and the next section slides up through the void. Scrubbed, `none` ease, so it is controlled by the hand on the wheel.
- **Pinned discipline sequence (Training).** The three Gauntlet stages become one pinned scene. Each image opens through the void — a square aperture that expands from 32% to full bleed — while the previous one desaturates and recedes to 0.96×; the stage numeral ticks 01→02→03. Scrub-driven; vertical on phones with the same aperture reveal, no pin.
- **Type.** Lines rise from under a baseline mask, `expo.out`, 1.2 s, 80 ms stagger — the classic, but with the eyebrow *slamming* in first (a 40 ms Red 600 background flash) so each block starts with a hit.
- **Quotes.** Words arrive as if spoken: 30 ms stagger, each word blurs from 6 px to 0 and its `wdth` axis eases from 62 to 88. The whole quote settling into its final width is the finesse move nobody else has, because nobody animates the width axis.

*Risk:* pinned scenes are heavy on low-end phones and can fight the reader. Profile early; the phone version is unpinned by design.

### 3 · "Scoreboard" — mechanical, industrial

The gym as a machine: counters, tickers, scan-lines, hard steps. Cadence over flow.

- **Round counter.** Every section is a round. As a section enters, its numeral (01, 02, …) rolls like an odometer: each digit is a vertical strip scrolled with `expo.out`, staggered 60 ms per digit, and a thin Red 600 rail — the top rope — draws across the section head left to right (`DrawSVG`, scrubbed).
- **Stat odometers.** By the Numbers: each stat rolls up digit by digit, the last digit landing with a 1 px jolt. Tabular numerals make this exact.
- **Ticker.** Under the hero, a constant-speed label ticker (STRIKING · GRAPPLING · CONDITIONING · …). Scroll velocity skews the ticker up to 12° and reverses its direction with scroll direction — the page feels like it has mass.
- **Scan reveals.** Images resolve through a 3-band scan (three horizontal bands revealing at `steps(6)` timing) — a mechanical alternative to fades.
- **Hard steps.** Hover states on labels and nav use `steps(3)` colour changes and 1-frame underline pops. No easing at all reads as decisive.

*Risk:* mechanical motion ages fast and can read as "tech startup". Use it only where numbers and labels already live.

## Recommended hybrid — "Tear · Weigh-in · Scoreboard" by altitude

Use all three, assigned by altitude so they never compete:

| Altitude | Character | Where |
| --- | --- | --- |
| **Page** | The Tear | Preloader (once per session), route transitions, section boundaries |
| **Scene** | Weigh-in | Hero entrance and pin, pinned Gauntlet, image reveals through the void, headings and quotes |
| **Detail** | Scoreboard | Round counters, stat odometers, ticker, label/nav hover |
| **Control** | Impact (shared) | Buttons, form fields, the header mark |

This gives the site one spine (the diagonal), one pace (long settles punctuated by hits), and one texture layer (the machine) without any of them becoming wallpaper.

## Shared micro-interactions (all characters)

- **Impact button.** Hover: Red 600 fills along the diagonal (clip-path wipe bottom-left → top-right, `power3.out`, 250 ms); label nudges 2 px. Press: 60 ms ghost-white flash, 1 px drop, and a 1-px outline ring expands 8 px and fades (a shockwave) — 300 ms. Release: `back.out` settle 200 ms. No magnetic follow: cursor-follow behaviour is out of scope by brief.
- **Header mark.** Hover: the two brackets slip 3 units apart along the cut and snap back. On route change, the mark's void "blinks" (scales to 0 and back) in sync with the Cut.
- **Nav.** Active underline slides between items (`Flip`), 350 ms `power3.inOut`. Hover: label `wdth` eases 100 → 112 and back — the letters widen as if breathing in.
- **Form.** Focus: underline draws in from the left (200 ms). Error: field jolts 3 px ×2 (a shake with no bounce). Submit: the button splits into two brackets that close around the confirmation panel — the message is dropped into the pit — 900 ms.
- **Footer.** The mark's lower bracket slides in from the corner as the footer enters (a single, quiet reveal).

## Rules

1. **Hits are short, settles are long.** A hit never exceeds 300 ms; a settle never dips under 600 ms. Mixed-tempo sequences alternate: hit → settle → hit.
2. **Eases.** Hits: `power4.in`, `expo.in`, `steps(n)`. Settles: `expo.out`, `power3.out`, and one custom ease — `CustomEase "pit": M0,0 C0.2,0 0.1,1 1,1` — used for anything that "lands". Never `elastic` or `bounce`.
3. **Every scroll effect is scrubbed or one-shot, never both.** Scrubbed effects (`scrub: true`) obey the hand; one-shot reveals fire once and stay.
4. **Motion never blocks reading.** No pinned scene longer than 100vh of scroll on desktop; none on phones. Text is legible at every frame of its own reveal (masks, not opacity-to-zero, for body copy).
5. **Reduced motion.** `prefers-reduced-motion: reduce` swaps every sequence for a 200 ms opacity fade, disables pins and scrubs, keeps the tear as a static diagonal edge. The site is complete without motion.
6. **Performance.** Only `transform`, `opacity`, `clip-path`, and `font-variation-settings` animate. Images use `will-change` only during their own sequence. Target 60 fps on a 2020 phone; profile the pinned Gauntlet first because it is the heaviest scene.

## Owner decisions (September 14, 2026)

The hybrid is confirmed by the choices below; these override anything above where they differ.

1. **The Cut** is the route transition. As prototyped.
2. **Hero (Weigh-in):** brackets snap to the corners — keep. Title lines drop on an **ease-in with a heavy slam, no skew** (landing compression instead), spaced ~320 ms apart so each hit is perceived; each landing still adds a third of the colour. The **width-axis reveal** (`wdth` 125 → 62) is the house heading reveal — apply it to the subtitle and, in principle, to **every h2**. The hero CTA is the Impact button, slamming in from the left.
3. **Section entrance (Round):** eyebrow **slam-flash** and the **top-rope draw** are keepers; the slam-flash extends to **section paragraphs** (a red block wipes over the paragraph box and retracts, revealing the copy). The baseline line-mask is **dropped** in favour of the width-axis reveal on headings.
4. **Odometers on every number.** Direction carries meaning: **impressively high numbers roll up** (By the Numbers, the 30 in 30-Day Guarantee); **impressively low numbers roll down** (plan prices, passes, session rates). The **spoken width-axis quote** is reserved for the three fighter quotes.
5. **Cut & Slip on every non-hero image.** Pointer devices: hover/focus. Touch devices: **scroll-driven** — the same open/close plays from ScrollTrigger as the image crosses the middle band of the viewport (`top 65%` → `bottom 35%`), reversing on exit, so phones get the effect by scrolling. Resting tear is a 3 px hairline; the slip is the reveal.
6. **Impact button:** **static = solid fill** (Red 600 / Ink / Gold 500). **Hover = ghost white slams in from the left** (60 ms, `none`) **and holds**; the label takes the button's colour; leave retracts to the right (150 ms `power4.out`). **Press unchanged**: 60 ms ghost-white flash, 1 px drop, 1 px ring expands and fades; release settles `back.out(2)`.

Implementation notes that fall out of these:
- The width-axis reveal needs Archivo's `wdth` axis, which we have; animate `font-variation-settings` and leave `font-stretch` alone during the tween, then restore the token value.
- Odometer direction is a per-instance attribute (`data-direction="up|down"`); content modules should declare it next to the number.
- The slam-flash is one reusable primitive (block wipes in from the left at 40 ms, target revealed, block retracts to the right at 180 ms). Eyebrows, paragraphs, and the Impact hover all use it; only hold behaviour differs.
- Reduced motion: the Cut becomes a 200 ms crossfade; slams become instant reveals; odometers set their final value; width-axis reveals become opacity fades; Cut & Slip shows colour with no slip.

## Sequence specs (as built)

| Sequence | Trigger | Stages (duration · ease) | Purpose | Reduced-motion |
| --- | --- | --- | --- | --- |
| **Preloader** (`src/motion/PitOverlay.tsx`) | first paint of a session (`html.is-booting` set by an inline script in `index.html`; `sessionStorage` `pit:booted`) | closed overlay from first paint → hold 350 ms → void punches open to 14% (250 ms `power4.out`) → hold 400 ms → emit `pit:boot` → void swallows the viewport (900 ms `expo.inOut`) | the site is entered through the mark; no content is ever seen before it forms | skipped entirely; `pit:boot` still emitted |
| **The Cut** (`src/motion/PitOverlay.tsx`) | any same-origin `<a>` click to a different pathname/search (capture-phase listener; modifier clicks, `target`, `download`, anchors on the current route are left to the router) | converge 450 ms `power3.in` → route swap behind the overlay → void punches open to 30% (220 ms `power4.out`) → hold 120 ms → emit `pit:reveal` → brackets slide off along the cut (800 ms `expo.out`) | navigation as an act; the destination glimpsed through the void before it is revealed | no overlay; the router navigates directly |

| **Weigh-in** (`src/motion/heroWeighIn.ts`, wired in `pages/Home.tsx`) | `pit:boot` / `pit:reveal` via `useReveal` (500 ms fallback for back/forward arrivals); parts hidden in a `useLayoutEffect` before first paint | brackets snap to the corners (300 ms `power4.in`) → three title lines drop (280 ms `power4.in`) and slam (scaleY 0.92 → 1, 50 + 220 ms) 320 ms apart, each jolting the image 3 px and adding ⅓ colour → subtitle tightens `wdth` 125 → 62 (1.1 s `expo.out`) → CTA fill slams in from the left (60 ms), label appears, text link follows → 18 s idle drift 1.08 → 1.0 | the entrance is a weigh-in: framed, hit three times, then settled | all parts static and visible; no timeline |
| **Impact** (`src/motion/useImpact.ts`, in `components/Button.tsx`) | pointer/keyboard on any Button | hover: ghost white scaleX 0 → 1 from the left (60 ms `none`), label takes the fill colour; leave: retracts to the right (150 ms `power4.out`); press: 60 ms flash, 1 px drop, ring 1 → 1.12 fading (300 ms); release `back.out(2)` 200 ms | controls hit back | plain inverted hover state, no slam or ring |

| **The Round** (`src/motion/useRounds.ts` + `rounds.css`, driven from `Layout` per route) | one `ScrollTrigger` per `[data-round]` element, `start: 'top 78%'`, `once`; triggers are created on `pit:boot` / `pit:reveal` so in-view sections enter on the reveal frame | eyebrows slam-flash (block in 40 ms `none` → text → block out 180 ms `power4.out`, 100 ms apart) → rope draws under `.section-head` / `[data-rope]` (1.1 s `expo.out`) → `h1`/`h2` tighten `wdth` 125 → 62 with opacity (1.1 s `expo.out`, 80 ms stagger) → `[data-slam]` paragraphs slam-flash (from 450 ms, 120 ms apart) → `[data-rise]` children rise 24 px → 0 with opacity (900 ms `expo.out`, 80 ms stagger) | every section enters like a round starts: a hit, the rope, then the settle | no hidden state is ever applied; all custom-property fallbacks are the resting values |

| **Odometer** (`components/Odometer.tsx`, rolled by `useRounds`) | part of the enclosing Round, from 550 ms in, 120 ms per number | each digit is a 0–9 strip; `direction="up"` rests on 0 and climbs, `direction="down"` rests on 9 and falls, to `--odo-final` (1.1 s `expo.out`, 60 ms per digit); the number lands with a 1 px jolt | numbers are earned, not printed; direction carries meaning (high rolls up, low rolls down) | strips rest on their final digit (CSS fallback) |
| **Cut & Slip** (`components/SlipImage.tsx` + `motion/useSlips.ts`, driven from `Layout`) | pointer devices: `pointerenter`/`focus` on the enclosing link or the image; touch devices (`hover: none`): ScrollTrigger `top 65%` → `bottom 35%`, open on enter (either direction), close on leave | open: halves slip +8/−8 px along the cut (200 ms `power4.out`), grayscale 1 → 0 (250 ms); close: halves return (350 ms `back.out(1.7)`), grayscale back (400 ms) | every non-hero image carries the brand tear; on phones it plays as a consequence of scrolling | colour on hover/in-view via a class, no slip |

| **Interior hero** (`[data-hero-media]`, part of the Round) | the hero section's Round | brackets snap to the pane's corners (300 ms `power4.in`) → one 3 px jolt as the heading starts to resolve → grayscale 1 → 0 over 900 ms → 18 s drift 1.08 → 1.0; the text column runs the standard Round (eyebrow slam, width-axis `h1`, lede slam) | the Weigh-in without the three-line slam; interior pages arrive framed and hit once | static, in colour |
| **Void reveal** (`[data-void]`, part of the Round) | the enclosing Round (each Gauntlet discipline) | `clip-path: inset(34% 34%)` → `inset(0)` (1.1 s `expo.out`) — a square aperture opening to full bleed | the image is seen through the pit before it fills the frame; carries the "open through the void" idea without a pinned scene | no clip |

Geometry lives in `src/motion/pit-geometry.ts`: one square of side `max(104vw, 104vh)` centred on the viewport; red above the rising diagonal (`x + y = 99.5%`), ink below (`x + y = 100.5%`); each piece's ghost-white edge is a `drop-shadow` on its unclipped wrapper. All polygons are six points so triangles morph into brackets.

Markup contract for the Round: `data-round` on the entering element (a section, a `.discipline`, the extras block); `.eyebrow` slams automatically; `data-slam` opts a paragraph in; `.section-head` carries the rope automatically, `data-rope` adds it elsewhere; `data-rise` on a group settles its children. Headings inside a `data-rise` group rise instead of width-revealing; `h2.eyebrow` slams instead.

Where they live: odometers on About's four numbers and value indices, Training's plan prices and extras (down), and the 30 in the guarantee (up). SlipImage on the home gateway, the three disciplines, the three fighter portraits, and the two leader portraits. Heroes are never slipped.

**Pinned Gauntlet — not built, by decision.** Rule 4 (no pinned scene longer than 100vh on desktop, none on phones) plus the reading cost outweigh what it adds now that each discipline enters as its own round with a void reveal and a Cut & Slip image. Revisit only if the client demo needs one showpiece scroll scene.

Known limits: browser back/forward does not play the Cut (the router has already navigated when `popstate` fires). Scene-altitude sequences should start on `pit:boot` / `pit:reveal` rather than on mount.

## Build order

1. Prototype the signature moves in `/studies/motion` (this pass): the Cut, the Weigh-in hero, Cut & Slip, Impact button, odometer + width-axis quote, round rail + line masks.
2. Owner picks the hybrid or a single character; adjust tempo values from feel.
3. Implement page altitude (preloader, Cut) and the hero, then Training's Gauntlet, then the detail layer, then controls.
4. Profile on a phone; write reduced-motion equivalents alongside each sequence, not after.
