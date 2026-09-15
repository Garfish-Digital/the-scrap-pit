I need to rebuild this website in a big way. At a high level, here are the things I know I want to change:

1. Replace Astro and SCSS with React/TS and CSS.
2. Create separate navigable pages instead of having one long scroll.
3. Refine the existing design to improve motion, style, and overall UX.
4. Remove the custom cursor and cursor follow.
5. Design a better branding for "The Scrap Pit" primary logo (NOTE: I am a skilled Figma user).
6. Add a package that provides extremely professional-level motion, such as GSAP. Some of the effects we want will be multi-stage. Some will need to be punchy, while others will need to be bezier smooth. We will want to focus strongly on the "artistic" approach to the motion effects applied.

In one form or another, I would like to reuse the following:

1. Existing images, but we do not have to use every one of them.
2. I am willing to fine-tune the color palette (make the golds and reds more rich), but I want to keep the large ghostwhite areas and the linear-gradient section BGs (see index.astro lines 900-904).
3. The copy is fine, but I might make some updates manually.

This is a demo website, and it needs to impress potential clients. We intend to use this for "Look at our skill level", as opposed to "Look what you can have". We want it to scream expensive design and buttery smooth motion effects. We want to make sure it does *not* scream AI-generated, which I think it does now because it's dated (from 2025).

Please read any of the files necessary to get oriented and conduct a proper evaluation of the project. This SITE_REWORK.md file is where I like to scratch out notes. You are free to write in PLAN.md as you see fit so we have lines to point to as we iterate over ideas and shape a roadmap to move forward with on the revisions. There is no deadline and no hurry, so let's take our time and do the best work we can do.

___

1. I have the v1 of this project archived elsewhere locally.
2. I continously run a local dev server to monitor the UI/UX with human eyes. I am currently runnig on PORT 4321, but once the build is switched over to Vite, I'll switch over to their PORT (which I believe is 3000). You are welcome to run builds and servers as you see fit to test various tasks for success.
3. We do not need to adhere to WCAG to a T. This site will not be intended to promote, educate, etc. Its purpose is to show a very specific client our web dev capabilities in design.
4. The Contact form can be a local message simply so the user isn't left hanging. We won't send. This site is strictly for demonstrating skills.
5. I feel like the font stack is all over the place, so we will need to revisit it with a keen eye and close scrutiny.
6. By breaking the site into spearate pages, we may need additional hero images. I am willing to acquire more MMA heroes, and I will indicate with [Hero] where I think those might go.
7. Let's absorb Pricing into training, so that will give us the routes of /, /training, /fighters, /about, and /contact seem like a good starting point. Each will share the same footer. As an initial decision about sitemap sections, let's start with those I've listed below (using header text for reference). Please feel free to make suggestions for this arrangement where you see room for improvement.
-Home: Hero and CTA (maybe the Training CTA as well, you decide), Forged in Fire, Become Scrappy
-Training: [hero], The Gauntlet Stages, Become Scrappy, Choose Your Training, Pricing Plan Section
-Fighters: [hero], Iron Will Profiles, Forged in Fire, Hardened Leaders, 30-Day Warrior Guarantee
-About: [hero], Our Story, By the Numbers, Value cards (all 4),  Ready for the Pit?
-Contact: [hero], Contact the Pit, Get in Touch, Find the Pit

___

-These are really great results. Here are my thoughts on each motion section:
-1. The Cut: Yes, this will be exactly what we want for our page transitions.
-2. The "width-axis" effect on `home-hero__subtitle` is very good, and it is probable I will want this effect on all h2 elements throughout. I like the brackets snapping to the corners. The three title lines dropping with a skew needs adjusted. Maybe we can try an easi-in with a heavy slam on the end, no skew. We can still do a third of the color applied with each hit, but space the timing out a little further so it can be perceived better. We will change the CTA effect to match what I have described below in #6.
-3. The eyebrow slamming in with a flash is a great effect, and I think I will want to use that on more than just eyebrows (perhaps on the p elements in the sections). The top rope draw is excellent. I am unsure about the heading rising from under a baseline mask, because I am much more partial to the "width-axis" effect from #2.
-4. I would like to use the odometer effect on all of our numbers. The impressively high numbers should roll upward ("30" on 30-Day Guarantee on Training page, and all numbers in "Byt the numbers" section), while impressively low numbers should roll down (training package prices on Training page). The spoken quote effect is good for quotes only, of which we only have 3 (on the FIghters page).
-5. These are perfect, and this effect should be on all images that are not hero images. How will this translate to mobile? I would like to preserve the effect, so maybe we can activate it on scroll somehow so mobile users will experience it.
-6. First, I want to say I love the press: a 60 ms ghost-white flash, a 1px drop, and a 1px ring expands and fades — a shockwave where the release settles with a short overshoot. Let's not change a thing on the press. I do want to change the static and hover. I want to explore the concept of having their static state as their current hover state, meaning solid backgrounds. Then, on hover, the "white" slams in fram the side (similar to the eyebrow flash in #3, only here it holds while hovered). So basically, on hover they will become as they look now statically, but the effect will slam in from the side.

___




The preloader and the Cut are live on your :3000 server. Nothing committed.

What's built (src/motion/)

One fixed overlay serves both sequences: a square of side max(104vw, 104vh) centred on the viewport, Red 600 above the rising diagonal, Ink below, each with a ghost-white edge along the cut (a drop-shadow on an unclipped wrapper, so it shows over any content). All clip polygons are six points, so triangles morph into brackets — the geometry is in pit-geometry.ts, shared by both.

Preloader — once per session. A tiny inline script in index.html sets html.is-booting before React runs, and CSS paints the closed overlay from the first frame, so no content is ever seen before the mark forms. Then: hold 350 ms → the void punches open to 14% (power4.out, 250 ms) with the hero glimpsed through it → hold 400 ms → the void swallows the viewport (expo.inOut, 900 ms). Total ≈ 1.9 s. Reload to see it again: sessionStorage.removeItem('pit:booted') in the console, or open a new tab.

The Cut — a capture-phase click listener catches every same-origin link to a different route (header, footer, mobile menu, CTAs, pricing ?plan= links). Modifier-clicks, target, download, and anchors on the current route (/training#pricing while on Training) are left to the router. Sequence: converge 450 ms → route swaps behind the overlay (scroll-to-top happens hidden) → void punches open to 30% with the destination glimpsed → hold 120 ms → brackets slide off along the cut.

Events for what comes next: the overlay emits pit:boot and pit:reveal at the moment the page starts being revealed. The hero and section sequences will start on those, not on mount — otherwise the Weigh-in would play behind the overlay.

Reduced motion: no preloader, no overlay, plain navigation.

Verified headless: frame sequences of both, session gating, anchor bypass, reduced-motion bypass, zero console errors. GSAP core adds ~28 KB gzipped to the main bundle.

Two things I hit and fixed
- The study's 12.5% tear was a 160 px slot at viewport scale; the live tear is 1% with the white edges doing the work.
- useNavigate hands out a new function per location, which re-ran my effect mid-transition and parked the overlay. It's held in a ref now.

Things to judge by eye

- Tempo. The preloader hold and the Cut's slide-off (expo.out is mostly done in its first 200 ms) are the two numbers I'd expect you to want to touch. Both are single values in PitOverlay.tsx.
- Back/forward doesn't play the Cut — the router has already moved when popstate fires. It's a known limit rather than a bug; a reveal-only half-Cut on popstate is possible later if it bothers you.

Next: the hero Weigh-in, starting on pit:boot / pit:reveal.