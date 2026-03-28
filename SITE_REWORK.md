# THE SCRAP PIT — Site Rework Roadmap

> **Purpose**: Convert The Scrap Pit from a 4-page Astro site to a single long-scroll page.
> **Executor**: Sonnet (follow this document step-by-step)
> **Created**: 2026-03-28 by Opus
> **Status**: Ready for execution

---

## Table of Contents

1. [Overview](#1-overview)
2. [Section Flow & Dark/Light Rhythm](#2-section-flow--darklight-rhythm)
3. [Phase 1 — Consolidate Content into index.astro](#3-phase-1--consolidate-content-into-indexastro)
4. [Phase 2 — Navigation & Smooth Scroll](#4-phase-2--navigation--smooth-scroll)
5. [Phase 3 — Section Headers with Entrance Animations](#5-phase-3--section-headers-with-entrance-animations)
6. [Phase 4 — Scroll-Triggered Section Reveals](#6-phase-4--scroll-triggered-section-reveals)
7. [Phase 5 — Training Block Interactivity](#7-phase-5--training-block-interactivity)
8. [Phase 6 — Fighter Profile Enhancements](#8-phase-6--fighter-profile-enhancements)
9. [Phase 7 — Footer & Link Updates](#9-phase-7--footer--link-updates)
10. [Phase 8 — Cleanup](#10-phase-8--cleanup)
11. [Reference: Current File Inventory](#11-reference-current-file-inventory)
12. [Reference: Design System Values](#12-reference-design-system-values)

---

## 1. Overview

### What We're Doing
- Merging content from `index.astro`, `about.astro`, `pricing.astro`, and `contact.astro` into a single `index.astro`
- Deleting the 3 separate page files after consolidation
- Updating navigation to smooth-scroll anchors
- Adding punchy scroll-triggered entrance animations
- Adding high-action training block interactivity
- Maintaining all existing visual effects (chromatic displacement, duotone filters, mono-to-color, grit cursor)

### What We're NOT Doing
- No copy changes (separate initiative)
- No parallax effects
- No new images or assets
- No changes to the design system colors or typography
- No changes to the GritCursor or CombatButton components (they stay as-is)

---

## 2. Section Flow & Dark/Light Rhythm

This is the exact order of sections in the final single-scroll page. The dark/light pattern creates visual rhythm.

```
┌─────────────────────────────────────────────────────┐
│  1. HERO — "THE ARENA"                              │
│     Background: DARK (hero image with overlay)      │
│     Source: index.astro hero section                 │
│     ID: #hero                                       │
│     Full-viewport, mono-to-color scroll reveal      │
├─────────────────────────────────────────────────────┤
│  2. TRAINING — "THE GAUNTLET STAGES"                │
│     Background: LIGHT 1 (ghost-white #F8F8FF)       │
│     Source: index.astro training section             │
│     ID: #training                                   │
│     3-column grid with duotone images               │
├─────────────────────────────────────────────────────┤
│  3. FIGHTERS — "IRON WILL PROFILES"                 │
│     Background: LIGHT 1 (ghost-white #F8F8FF)       │
│     Source: index.astro fighters section             │
│     ID: #fighters                                   │
│     *** CHANGED FROM bg-dark TO LIGHT ***           │
│     Chromatic displacement + mono-to-color           │
├─────────────────────────────────────────────────────┤
│  4. JOIN THE FIGHT — "THE CALL TO ARMS"             │
│     Background: LIGHT 2 (subtle tri-gradient)       │
│     rgba(26,26,26,0.05) → rgba(224,0,0,0.05)       │
│       → rgba(204,153,0,0.05)                        │
│     Source: index.astro join-fight section           │
│     ID: #join                                       │
├─────────────────────────────────────────────────────┤
│  5. ABOUT HEADER                                    │
│     Background: DARK (iron-black gradient)           │
│     Source: about.astro hero section                 │
│     ID: #about                                      │
│     Title: "FORGED IN FIRE"                         │
│     Subtitle: "THE SCRAP PIT PHILOSOPHY"            │
│     Description: "We don't just train fighters..."  │
│     Staggered entrance animation                    │
├─────────────────────────────────────────────────────┤
│  6. OUR STORY + STATS                               │
│     Background: LIGHT 1 (ghost-white)               │
│     Source: about.astro our-story section            │
│     ID: (child of #about or #our-story)             │
│     2-column grid: story text + stats sidebar       │
├─────────────────────────────────────────────────────┤
│  7. OUR CODE (CORE VALUES)                          │
│     Background: DARK (bg-dark)                      │
│     Source: about.astro core-values section          │
│     ID: #values                                     │
│     2x2 value cards with gold borders               │
│     *** KEEP bg-dark as-is ***                      │
├─────────────────────────────────────────────────────┤
│  8. FORGED LEADERS                                  │
│     Background: LIGHT 1 (ghost-white)               │
│     Source: about.astro leadership section           │
│     ID: #leaders                                    │
│     Leader cards with mono-to-color images          │
├─────────────────────────────────────────────────────┤
│  9. READY TO BE FORGED? (CTA)                       │
│     Background: LIGHT 2 (subtle tri-gradient)       │
│     Source: about.astro about-cta section            │
│     ID: #forged                                     │
│     Keep current gradient background                │
│     Update button hrefs to smooth-scroll anchors    │
├─────────────────────────────────────────────────────┤
│ 10. PRICING HEADER                                  │
│     Background: DARK (iron-black gradient)           │
│     Source: pricing.astro hero section               │
│     ID: #pricing                                    │
│     Title: "CHOOSE YOUR BATTLE"                     │
│     Subtitle: "PRICING PLANS FOR EVERY WARRIOR"     │
│     Description: "From beginner to champion..."     │
│     Staggered entrance animation                    │
├─────────────────────────────────────────────────────┤
│ 11. PRICING PLANS + ADDITIONAL OPTIONS              │
│     Background: LIGHT 1 (ghost-white)               │
│     Source: pricing.astro pricing-plans section      │
│     ID: (child of #pricing or #plans)               │
│     3-tier cards + 4-card options grid              │
├─────────────────────────────────────────────────────┤
│ 12. 30-DAY WARRIOR GUARANTEE                        │
│     Background: LIGHT 1 (ghost-white)               │
│     Source: pricing.astro guarantee section          │
│     *** CHANGED FROM bg-dark TO LIGHT ***           │
│     Restyle for light background                    │
├─────────────────────────────────────────────────────┤
│ 13. CONTACT HEADER                                  │
│     Background: DARK (iron-black gradient)           │
│     Source: contact.astro hero section               │
│     ID: #contact                                    │
│     Title: "CONTACT THE PIT"                        │
│     Subtitle: "READY TO START YOUR JOURNEY?"        │
│     Description: "Step into the arena..."           │
│     Staggered entrance animation                    │
├─────────────────────────────────────────────────────┤
│ 14. CONTACT CONTENT                                 │
│     Background: LIGHT 1 (ghost-white)               │
│     Source: contact.astro contact-content section    │
│     ID: (child of #contact or #contact-form)        │
│     2-column grid: form left, info right            │
│     Quick action buttons → smooth-scroll anchors    │
├─────────────────────────────────────────────────────┤
│ 15. FOOTER                                          │
│     Background: DARK (bg-dark)                      │
│     Source: FightLayout.astro footer                 │
│     Keep current 3-column design                    │
│     Update links to smooth-scroll anchors           │
└─────────────────────────────────────────────────────┘
```

---

## 3. Phase 1 — Consolidate Content into index.astro

### Step 1.1: Build the new index.astro structure

Create the single-scroll page by placing all sections in order within `index.astro`. The page imports `FightLayout` and `CombatButton` as before.

**Section source mapping** (copy HTML content from these locations):

| Section | Source File | Source Section CSS Class |
|---------|-------------|------------------------|
| Hero | `index.astro` | `.section-hero` |
| Training | `index.astro` | `.training` |
| Fighters | `index.astro` | `.fighters` |
| Join the Fight | `index.astro` | `.join-fight` |
| About Header | `about.astro` | `.about-hero` |
| Our Story | `about.astro` | `.our-story` |
| Core Values | `about.astro` | `.core-values` |
| Forged Leaders | `about.astro` | `.leadership` |
| Ready to be Forged | `about.astro` | `.about-cta` |
| Pricing Header | `pricing.astro` | `.pricing-hero` |
| Pricing Plans | `pricing.astro` | `.pricing-plans` |
| 30-Day Guarantee | `pricing.astro` | `.guarantee` |
| Contact Header | `contact.astro` | `.contact-hero` |
| Contact Content | `contact.astro` | `.contact-content` |

### Step 1.2: Assign section IDs

Every scrollable section needs an `id` attribute for navigation:

```
#hero        → Hero section
#training    → Training section
#fighters    → Fighters section
#join        → Join the Fight section
#about       → About header section
#our-story   → Our Story section
#values      → Core Values section
#leaders     → Forged Leaders section
#forged      → Ready to be Forged section
#pricing     → Pricing header section
#plans       → Pricing Plans section
#guarantee   → 30-Day Guarantee section
#contact     → Contact header section
#contact-form → Contact content section
```

### Step 1.3: Consolidate styles

Move all page-scoped `<style lang="scss">` blocks from `about.astro`, `pricing.astro`, and `contact.astro` into the `index.astro` `<style>` block. The styles are already scoped by class name so there should be no conflicts.

### Step 1.4: Background/theme changes

**Fighters section** — change from dark to light:
- Remove `bg-dark` class from the section element
- Change `.section-title` color from `text-inverse` to `text-primary`
- Change `.section-description` color from `text-inverse` to `text-primary` (with opacity)
- Change `.fighter-title` color from `rgba($text-inverse, 0.7)` to `rgba($text-primary, 0.7)`
- The `.fighter-quote` is already `color: $iron-black` — keep it
- The `.fighter-name` is already `color: $championship-gold` — keep it
- The chromatic displacement `border` colors on the fighter images should use `$championship-gold` (currently using debug colors red/blue/green — replace with the gold border)

**30-Day Warrior Guarantee** — change from dark to light:
- Remove `bg-dark` class
- Change `.guarantee-title` color from `$text-inverse` to `$text-primary`
- Change `.guarantee-text` color from implicit inverse to `$text-primary`
- Change `.guarantee-icon` — keep `$championship-gold`
- Keep the text-shadow on the title (`2px 2px 0 $blood-red`)
- Consider adding a gold border treatment (like the "Ready to be Forged" section's guarantee box uses `border: $border-thick solid $championship-gold`)

**Core Values section** — KEEP `bg-dark` as-is. However, note the existing bug: `.value-card p` has `color: $iron-black` with `opacity: 0.9`, which will be nearly invisible on the dark background. This should be `color: $text-inverse` or `color: rgba($ghost-white, 0.9)`. Fix this.

### Step 1.5: Update all internal links

Every `href` that currently points to a page route needs to become a smooth-scroll anchor:

| Old href | New href |
|----------|----------|
| `/about` | `#about` |
| `/pricing` | `#pricing` |
| `/contact` | `#contact` |
| `/#training` | `#training` |
| `/#fighters` | `#fighters` |

This applies to:
- Navigation links in `FightLayout.astro`
- CombatButton `href` props throughout the page
- Footer links
- Quick action buttons in the Contact section ("View Pricing" → `#pricing`, "About Us" → `#about`)
- "Ready to be Forged" section buttons ("Start Your Trial" → `#contact`, "View Pricing" → `#pricing`)
- Hero buttons ("Start Your Journey" → `#contact`, "View Training" → `#training`)
- Join the Fight buttons ("Start Free Trial" → `#contact`, "View Pricing" → `#pricing`)

---

## 4. Phase 2 — Navigation & Smooth Scroll

### Step 2.1: Update nav links in FightLayout.astro

Replace the current nav links:

```html
<ul class="nav-links">
  <li><a href="#training" class="nav-link">TRAINING</a></li>
  <li><a href="#fighters" class="nav-link">FIGHTERS</a></li>
  <li><a href="#about" class="nav-link">ABOUT</a></li>
  <li><a href="#pricing" class="nav-link">PRICING</a></li>
  <li><a href="#contact" class="nav-link">CONTACT</a></li>
</ul>
```

Remove the `currentPath`-based active class logic since everything is now on one page.

### Step 2.2: Implement smooth scrolling

The `html { scroll-behavior: smooth; }` is already in `global.scss`. For the nav links, add JavaScript click handlers that:
1. Prevent default anchor behavior
2. Get the target section by ID
3. Use `element.scrollIntoView({ behavior: 'smooth', block: 'start' })` with an offset for the fixed nav height (80px desktop, 120px mobile)

A cleaner approach: use `scroll-margin-top` on each section to account for the fixed nav:

```scss
section[id] {
  scroll-margin-top: 80px;

  @media (max-width: $breakpoint-md) {
    scroll-margin-top: 120px;
  }
}
```

This way, native anchor scrolling "just works" without custom JS for the scroll offset.

### Step 2.3: Punchy underline hover animation on nav links

Replace the current simple `border-bottom-color` transition with a `::after` pseudo-element underline that animates with `scaleX`:

```scss
.nav-link {
  position: relative;
  border-bottom: none; // Remove the old border approach

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 3px;
    background: $blood-red;
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.15s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    // This cubic-bezier gives a slight overshoot "punch"
  }

  &:hover::after {
    transform: scaleX(1);
  }

  &.active::after {
    transform: scaleX(1);
    background: $championship-gold;
  }
}
```

The `cubic-bezier(0.68, -0.55, 0.27, 1.55)` creates a sharp snap with a tiny overshoot — punchy, not floaty. Duration `0.15s` keeps it fast and decisive.

### Step 2.4: Expand ScrollNavigation class

Update the `ScrollNavigation` class in `FightLayout.astro` to track all major sections:

```javascript
class ScrollNavigation {
  constructor() {
    this.sections = ['training', 'fighters', 'about', 'pricing', 'contact'];
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const sectionId = entry.target.id;
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (navLink) {
          if (entry.isIntersecting) {
            // Remove active from all nav links first
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            navLink.classList.add('active');
          }
        }
      });
    }, {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    });

    this.sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }
}
```

---

## 5. Phase 3 — Section Headers with Entrance Animations

### What gets a section header

Three sections get the dark gradient "chapter header" treatment:
- **About** (`#about`): "FORGED IN FIRE" / "THE SCRAP PIT PHILOSOPHY" / description
- **Pricing** (`#pricing`): "CHOOSE YOUR BATTLE" / "PRICING PLANS FOR EVERY WARRIOR" / description
- **Contact** (`#contact`): "CONTACT THE PIT" / "READY TO START YOUR JOURNEY?" / description

### Staggered entrance animation

Each header has three text elements that enter separately with different delays. All animations are **punchy** — short duration, sharp easing, `translateY` from below:

```scss
// Section header entrance animation
.section-header-animated {
  .display-title,
  .display-subtitle,
  .hero-description {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.3s ease-out, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &.revealed {
    .display-title {
      opacity: 1;
      transform: translateY(0);
      // Enters first — no delay
    }

    .display-subtitle {
      opacity: 1;
      transform: translateY(0);
      transition-delay: 0.12s; // Enters second
    }

    .hero-description {
      opacity: 1;
      transform: translateY(0);
      transition-delay: 0.24s; // Enters third
    }
  }
}
```

The easing `cubic-bezier(0.16, 1, 0.3, 1)` is a sharp deceleration — fast at the start, crisp stop. Duration is 0.3s per element, but they overlap due to staggering so the total sequence is ~0.54s.

### JavaScript trigger

Add a `SectionReveal` class (or extend existing `ScrollColorReveal`) that uses `IntersectionObserver` to add the `.revealed` class when a section header scrolls into view:

```javascript
class SectionReveal {
  constructor() {
    this.init();
  }

  init() {
    const revealTargets = document.querySelectorAll('.section-header-animated, .reveal-on-scroll');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -10% 0px'
    });

    revealTargets.forEach(el => observer.observe(el));
  }
}
```

**Note**: Unlike the mono-to-color effect, section reveals should NOT remove the `.revealed` class when scrolling away. Once revealed, they stay revealed. This is a one-time entrance animation.

### Apply to HTML

Add the `section-header-animated` class to each of the three dark header sections:

```html
<section class="about-hero section section-header-animated" id="about">
  ...
</section>
```

---

## 6. Phase 4 — Scroll-Triggered Section Reveals

Beyond the three dark headers, other content sections should also reveal on scroll. These are simpler — no staggering, just a single punchy entrance.

### Elements to reveal

Add `reveal-on-scroll` class to these elements:
- Each `.training-block` in the Training grid (stagger with CSS `transition-delay` on `:nth-child`)
- Each `.fighter-profile` in the Fighters grid
- The `.story-grid` in Our Story
- Each `.stat-item` in the stats sidebar (stagger)
- Each `.value-card` in Core Values (stagger)
- Each `.leader-card` in Forged Leaders
- The `.join-content` in Join the Fight
- The `.cta-content` in Ready to be Forged
- Each `.pricing-card` in Pricing (stagger)
- Each `.option-card` in Additional Options (stagger)
- The `.guarantee-content` in 30-Day Guarantee
- The `.contact-grid` in Contact Content

### Reveal animation CSS

```scss
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.35s ease-out, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);

  &.revealed {
    opacity: 1;
    transform: translateY(0);
  }
}

// Staggered children — apply to parent containers
.stagger-children.revealed {
  .training-block,
  .fighter-profile,
  .stat-item,
  .value-card,
  .leader-card,
  .pricing-card,
  .option-card {
    opacity: 1;
    transform: translateY(0);
  }

  @for $i from 1 through 6 {
    & > :nth-child(#{$i}),
    & .training-block:nth-child(#{$i}),
    & .fighter-profile:nth-child(#{$i}),
    & .stat-item:nth-child(#{$i}),
    & .value-card:nth-child(#{$i}),
    & .leader-card:nth-child(#{$i}),
    & .pricing-card:nth-child(#{$i}),
    & .option-card:nth-child(#{$i}) {
      transition-delay: #{($i - 1) * 0.08}s;
    }
  }
}
```

Apply `stagger-children` alongside `reveal-on-scroll` on the parent grid containers (`.training-grid`, `.fighters-grid`, `.stats-grid`, `.values-grid`, `.leadership-grid`, `.pricing-grid`, `.options-grid`).

Set the children's initial state:

```scss
.stagger-children {
  .training-block,
  .fighter-profile,
  .stat-item,
  .value-card,
  .leader-card,
  .pricing-card,
  .option-card {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.35s ease-out, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  }
}
```

---

## 7. Phase 5 — Training Block Interactivity

The training blocks (Striking, Grappling, Conditioning) need **high-action** hover and click/tap interactions. All image color displacement/filters must be maintained throughout.

### Current state
- Hover: `translate(-4px, -4px)` + `box-shadow` + image `scale(1.05)` + intensified duotone filter
- This is decent but needs more punch

### Enhanced hover effects

```scss
.training-block {
  transition: transform 0.15s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.15s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: translate(-6px, -6px);
    box-shadow: 10px 10px 0 $iron-black;

    .training-image {
      transform: scale(1.08);
      // Keep existing duotone filter intensification
    }

    .training-content {
      .training-title {
        // Brief color flash to blood-red (already $text-accent, but intensify)
        text-shadow: 2px 2px 0 rgba($blood-red, 0.3);
      }

      .training-stats .stat {
        // Stats badges punch in on hover
        transform: scale(1.05);
        background: $blood-red;
        transition: transform 0.1s cubic-bezier(0.68, -0.55, 0.27, 1.55),
                    background 0.15s ease;
      }
    }
  }
}
```

### Click/tap effect

Add a JavaScript-driven click effect on training blocks:

```javascript
// In the main script block
document.querySelectorAll('.training-block').forEach(block => {
  block.style.cursor = 'pointer';

  block.addEventListener('mousedown', () => {
    block.classList.add('impact');
  });

  block.addEventListener('mouseup', () => {
    block.classList.remove('impact');
  });

  block.addEventListener('mouseleave', () => {
    block.classList.remove('impact');
  });

  // Touch support
  block.addEventListener('touchstart', () => {
    block.classList.add('impact');
  }, { passive: true });

  block.addEventListener('touchend', () => {
    setTimeout(() => block.classList.remove('impact'), 150);
  }, { passive: true });
});
```

```scss
.training-block.impact {
  transform: translate(0, 0) scale(0.97) !important;
  box-shadow: 2px 2px 0 $iron-black !important;
  transition-duration: 0.08s !important;

  .training-image {
    transform: scale(1) !important;
    // Filters stay — image just "compresses" on impact
  }
}
```

This creates a "punching the card" feel — it compresses on click, then springs back on release.

### Image filter integrity

**Critical rule**: Duotone/tritone filters must NEVER be removed during any animation state. The filters are additive — they intensify on hover but never go to `filter: none` (except on mobile where the current code already disables them for performance — keep that behavior).

---

## 8. Phase 6 — Fighter Profile Enhancements

### Chromatic displacement enhancement

The current chromatic displacement shifts `::before` and `::after` pseudo-elements on hover. Enhance the shift distance and add a sharper transition:

```scss
.fighter-image.chromatic-displacement {
  &::before,
  &::after {
    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
                opacity 0.2s ease;
  }

  &:hover {
    &::before {
      opacity: 0.5;  // Increased from 0.4
      transform: translate(-5px, -2px); // Increased from -3px, -1px
    }

    &::after {
      opacity: 0.4;  // Increased from 0.3
      transform: translate(5px, 2px); // Increased from 3px, 1px
    }
  }
}
```

### Debug border cleanup

The fighter images currently have debug borders (`border: 4px solid red`, `blue`, `green`). Replace ALL of these with:

```
border: 4px solid $championship-gold;
```

Similarly, the training images have debug borders (`border: 3px solid red`, `gold`, `blue`). Remove these `!important` debug borders entirely — the training blocks already have `border: $border-primary` on the parent.

### Mono-to-color on fighters

Now that fighters are on a light background, ensure the mono-to-color transition still reads well. The grayscale-to-color effect should be more pronounced — currently controlled by the `ScrollColorReveal` class using `IntersectionObserver`. Keep this behavior.

---

## 9. Phase 7 — Footer & Link Updates

### Footer link updates

Update the footer links in `FightLayout.astro`:

```html
<div class="footer-section">
  <h4>TRAINING</h4>
  <ul>
    <li><a href="#training">Training Programs</a></li>
    <li><a href="#fighters">Fighter Profiles</a></li>
    <li><a href="#pricing">Pricing</a></li>
  </ul>
</div>

<div class="footer-section">
  <h4>CONNECT</h4>
  <ul>
    <li><a href="#contact">Contact Us</a></li>
    <li><a href="#about">About Us</a></li>
    <li><a href="#hero">Back to Top</a></li>
  </ul>
</div>
```

### Copyright year

Update from `2024` to `2025`:
```html
<p>&copy; 2025 The Scrap Pit. All rights reserved.</p>
```

---

## 10. Phase 8 — Cleanup

### Delete page files
After confirming the single-scroll page works correctly:
- Delete `src/pages/about.astro`
- Delete `src/pages/contact.astro`
- Delete `src/pages/pricing.astro`

### Remove unused code from FightLayout.astro
- Remove `currentPath` variable from frontmatter (no longer needed)
- Remove the `currentPath`-based active class logic from nav links
- Clean up the `ScrollNavigation` class (replace with the expanded version)

### Debug artifact cleanup
- Remove all `!important` debug borders from training and fighter image selectors
- Remove `// Debug` comments
- Remove the fallback `background: linear-gradient(...)` on `.fighter-image` that has `!important` (line ~552 of current index.astro) — this overrides the actual images

### Verify
- All smooth-scroll links work correctly
- All section reveal animations trigger properly
- Training block hover/click interactions work on desktop and mobile
- Chromatic displacement still renders correctly on light background
- Mono-to-color transitions work for all images
- Grit cursor still works (no changes expected, but verify)
- Navigation active states update correctly while scrolling
- Mobile responsive layout still functions (stacked grids, etc.)
- No horizontal overflow on any viewport width

---

## 11. Reference: Current File Inventory

### Files to MODIFY
| File | Changes |
|------|---------|
| `src/pages/index.astro` | Complete rewrite — all sections consolidated here |
| `src/layouts/FightLayout.astro` | Nav links, footer links, ScrollNavigation class, remove currentPath logic |

### Files to DELETE
| File | Reason |
|------|--------|
| `src/pages/about.astro` | Content moved to index.astro |
| `src/pages/contact.astro` | Content moved to index.astro |
| `src/pages/pricing.astro` | Content moved to index.astro |

### Files UNCHANGED
| File | Reason |
|------|--------|
| `src/components/CombatButton.astro` | No changes needed |
| `src/components/GritCursor.astro` | No changes needed (standalone component, not used — layout has its own cursor) |
| `src/styles/global.scss` | No changes needed |
| `src/styles/_variables.scss` | No changes needed |
| `src/styles/_color_filters.scss` | No changes needed |
| `public/*` | No asset changes |

---

## 12. Reference: Design System Values

Quick reference for Sonnet when implementing:

```scss
// Colors
$ghost-white: #F8F8FF;        // Light 1 background
$iron-black: #1A1A1A;         // Dark background, text
$blood-red: #E00000;          // Accent, CTAs, aggression
$championship-gold: #CC9900;  // Victory, achievement

// Typography
$font-display: 'Bebas Neue';  // Headlines
$font-body: 'Space Mono';     // Body text

// Key timing values for punchy animations
// Duration: 0.15s - 0.35s (never slower)
// Easing (punchy decel): cubic-bezier(0.16, 1, 0.3, 1)
// Easing (punchy overshoot): cubic-bezier(0.68, -0.55, 0.27, 1.55)
// Stagger delay: 0.08s - 0.12s between children

// Spacing
$space-xs: 0.5rem;
$space-sm: 1rem;
$space-md: 1.5rem;
$space-lg: 2rem;
$space-xl: 4rem;
$space-xxl: 6rem;
$space-mega: 12rem;
```

---

## Execution Notes for Sonnet

1. **Work in phases**. Complete each phase before moving to the next. Test after each phase.
2. **Do not modify copy/text content**. Copy rework is a separate initiative.
3. **Preserve all existing visual effects**. If an effect breaks during consolidation, fix it — don't remove it.
4. **When in doubt, keep it**. If a style rule or element seems unnecessary, leave it. We can trim later.
5. **Animation philosophy**: Every animation should feel like a punch — fast, sharp, decisive. No floaty transitions, no elastic bouncing, no long fades. Think: a boxer's jab, not a dancer's sway.
6. **Debug borders**: The codebase has `!important` debug borders on images. Remove ALL of them. Fighter profile images get `$championship-gold` borders. Training images get no extra borders beyond the parent block's border.
7. **Test on mobile**: After each phase, verify the responsive layout. The stacked nav (below 768px) needs the larger `scroll-margin-top`. Touch interactions on training blocks must work.
