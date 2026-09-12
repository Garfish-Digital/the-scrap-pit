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

