import { useLayoutEffect, useRef, type RefObject } from "react";
import { gsap, reducedMotion, ScrollTrigger, SplitText } from "./gsap";
import { useReveal } from "./useReveal";
import "./rounds.css";

// Section entrances for whatever route is mounted under `scope`. Hidden states
// are set in a layout effect (before paint); ScrollTriggers are created only
// once the page-altitude overlay has revealed the route, so a section already
// in view enters on the reveal frame, not behind the overlay.

type Round = {
  el: HTMLElement;
  entered: boolean;
  eyebrows: HTMLElement[];
  headings: HTMLElement[];
  slams: HTMLElement[];
  ropes: HTMLElement[];
  rises: HTMLElement[][];
  odometers: HTMLElement[];
  heroMedia: { img: HTMLElement; tl: HTMLElement; br: HTMLElement }[];
  spoken: HTMLElement[];
  lines: HTMLElement[]; // heading lines, split once fonts are ready
  words: HTMLElement[]; // spoken-quote words
};

function collect(scope: HTMLElement): Round[] {
  return Array.from(scope.querySelectorAll<HTMLElement>("[data-round]")).map(
    (el) => ({
      el,
      entered: false,
      eyebrows: Array.from(el.querySelectorAll<HTMLElement>(".eyebrow")),
      headings: Array.from(el.querySelectorAll<HTMLElement>("h1, h2")).filter(
        (h) => !h.closest("[data-rise]") && !h.classList.contains("eyebrow"),
      ),
      slams: Array.from(el.querySelectorAll<HTMLElement>("[data-slam]")),
      ropes: Array.from(
        el.querySelectorAll<HTMLElement>(".section-head, [data-rope]"),
      ),
      rises: Array.from(el.querySelectorAll<HTMLElement>("[data-rise]")).map(
        (g) => Array.from(g.children) as HTMLElement[],
      ),
      odometers: Array.from(
        el.querySelectorAll<HTMLElement>("[data-odometer]"),
      ),
      heroMedia: Array.from(
        el.querySelectorAll<HTMLElement>("[data-hero-media]"),
      ).map((m) => ({
        img: m.querySelector<HTMLElement>("img")!,
        tl: m.querySelector<HTMLElement>(".pit-brackets__tl")!,
        br: m.querySelector<HTMLElement>(".pit-brackets__br")!,
      })),
      spoken: Array.from(el.querySelectorAll<HTMLElement>("[data-spoken]")),
      lines: [],
      words: [],
    }),
  );
}

// Split headings into lines and quotes into words. Runs after fonts are ready
// (line breaks depend on metrics) and before the entrance can fire.
function split(r: Round) {
  r.headings.forEach((h) => {
    const st = new SplitText(h, { type: "lines", linesClass: "wr-line" });
    h.classList.add("is-width-reveal");
    r.lines.push(...(st.lines as HTMLElement[]));
  });
  r.spoken.forEach((q) => {
    const st = new SplitText(q, { type: "words", wordsClass: "spoken-word" });
    r.words.push(...(st.words as HTMLElement[]));
  });
  // the heading itself stays hidden until its lines are ready; from here the lines carry the reveal
  gsap.set(r.lines, { fontVariationSettings: "'wdth' 110" });
  gsap.set(r.words, {
    autoAlpha: 0,
    filter: "blur(6px)",
    fontVariationSettings: "'wdth' 62",
  });
}

function hide(r: Round) {
  gsap.set([...r.eyebrows, ...r.slams], {
    "--slam-text": 0,
    "--slam-x": 0,
    "--slam-o": "left",
  });
  gsap.set(r.headings, { autoAlpha: 0 });
  gsap.set(r.ropes, { "--rope": 0 });
  // opacity only (not visibility): hidden controls must stay focusable
  r.rises.forEach((kids) => gsap.set(kids, { opacity: 0, y: 24 }));
  // up: rest on 0 and climb; down: rest on 9 and fall
  r.odometers.forEach((o) =>
    gsap.set(o.querySelectorAll(".odo__strip"), {
      "--odo-y": o.dataset.odometer === "down" ? "-90%" : "0%",
    }),
  );
  // interior hero media: mono, slightly scaled, brackets parked off the corners
  r.heroMedia.forEach((m) => {
    gsap.set(m.img, { scale: 1.08, filter: "grayscale(1)", y: 0 });
    gsap.set(m.tl, { xPercent: -120, yPercent: -120 });
    gsap.set(m.br, { xPercent: 120, yPercent: 120 });
  });
}

// slam-flash: block wipes in from the left (40 ms), the text is revealed
// beneath it, the block retracts to the right (180 ms).
function slam(tl: gsap.core.Timeline, el: HTMLElement, at: number) {
  tl.set(el, { "--slam-o": "left" }, at)
    .to(el, { "--slam-x": 1, duration: 0.04, ease: "none" }, at)
    .set(el, { "--slam-text": 1 }, at + 0.04)
    .set(el, { "--slam-o": "right" }, at + 0.05)
    .to(el, { "--slam-x": 0, duration: 0.18, ease: "power4.out" }, at + 0.06);
}

function enter(r: Round) {
  if (r.entered) return null;
  r.entered = true;
  const tl = gsap.timeline();
  // Interior hero — the Weigh-in without the three-line slam: brackets snap in
  // (hit), one jolt as the heading starts to resolve, colour settles in, drift.
  r.heroMedia.forEach((m) => {
    const sat = { v: 0 };
    tl.to(
      [m.tl, m.br],
      { xPercent: 0, yPercent: 0, duration: 0.3, ease: "power4.in" },
      0,
    )
      .to(m.img, { y: 3, duration: 0.05, ease: "power4.in" }, 0.3)
      .to(m.img, { y: 0, duration: 0.25, ease: "power3.out" }, 0.35)
      .to(
        sat,
        {
          v: 1,
          duration: 0.9,
          ease: "power2.out",
          onUpdate: () => {
            m.img.style.filter = `grayscale(${1 - sat.v})`;
          },
        },
        0.3,
      )
      .to(m.img, { scale: 1.0, duration: 18, ease: "none" }, 0.3);
  });
  r.eyebrows.forEach((e, i) => slam(tl, e, i * 0.1));
  tl.to(r.ropes, { "--rope": 1, duration: 1.1, ease: "expo.out" }, 0.05);
  // SETTLE — headings tighten along the width axis, line by line, in place
  tl.set(r.headings, { autoAlpha: 1 }, 0.1)
    .to(
      r.lines,
      {
        fontVariationSettings: "'wdth' 62",
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.08,
      },
      0.1,
    )
    .set(r.lines, { clearProps: "fontVariationSettings" }, 1.3);
  // spoken quotes — words arrive as if spoken
  tl.to(
    r.words,
    {
      autoAlpha: 1,
      filter: "blur(0px)",
      fontVariationSettings: "'wdth' 88",
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.03,
    },
    0.5,
  ).set(
    r.words,
    { clearProps: "fontVariationSettings,filter" },
    0.5 + 0.03 * r.words.length + 0.95,
  );
  r.slams.forEach((e, i) => slam(tl, e, 0.45 + i * 0.12));
  r.rises.forEach((kids, g) => {
    tl.to(
      kids,
      { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.08 },
      0.5 + g * 0.1,
    );
  });
  // odometers: digits roll in sequence; the last digit lands with a 1px jolt
  r.odometers.forEach((o, n) => {
    const strips = Array.from(o.querySelectorAll<HTMLElement>(".odo__strip"));
    const at = 0.55 + n * 0.12;
    strips.forEach((strip, i) => {
      tl.to(
        strip,
        {
          "--odo-y": strip.style.getPropertyValue("--odo-final") || "0%",
          duration: 1.1,
          ease: "expo.out",
        },
        at + i * 0.06,
      );
    });
    tl.fromTo(
      o,
      { x: 0 },
      { x: 1, duration: 0.04, yoyo: true, repeat: 1, ease: "power4.in" },
      at + strips.length * 0.06 + 0.55,
    );
  });
  return tl;
}

export function useRounds(
  scope: RefObject<HTMLElement | null>,
  routeKey: string,
) {
  const rounds = useRef<Round[]>([]);
  const ctx = useRef<gsap.Context | null>(null);

  useLayoutEffect(() => {
    const el = scope.current;
    if (!el || reducedMotion()) return;
    ctx.current = gsap.context(() => {
      rounds.current = collect(el);
      rounds.current.forEach(hide);
    }, el);
    return () => {
      ctx.current?.revert();
      ctx.current = null;
      rounds.current = [];
    };
  }, [scope, routeKey]);

  useReveal(
    () => {
      const c = ctx.current;
      if (!c) return;
      // line splitting depends on font metrics: wait for Archivo on cold loads
      document.fonts.ready.then(() => {
        if (ctx.current !== c) return;
        c.add(() => {
          rounds.current.forEach(split);
          rounds.current.forEach((r) => {
            const st = ScrollTrigger.create({
              trigger: r.el,
              start: "top 78%",
              once: true,
              onEnter: () => enter(r),
            });
            // Keyboard: focusing anything inside a round that has not entered yet
            // (a plan button, a gateway link) enters it right away.
            const onFocus = () => {
              if (!r.entered) {
                st.kill();
                enter(r);
              }
            };
            r.el.addEventListener("focusin", onFocus);
            return () => r.el.removeEventListener("focusin", onFocus);
          });
          ScrollTrigger.refresh();
        });
      });
    },
    500,
    routeKey,
  );
}
