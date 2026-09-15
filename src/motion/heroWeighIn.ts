import { gsap } from './gsap'

// Scene altitude — the home hero's "Weigh-in" (design/MOTION.md, owner
// decisions #2). Brackets snap to the corners (hit). Three title lines drop on
// an ease-in and slam — no skew, a landing compression — 320 ms apart; each
// landing jolts the image and adds a third of its colour. The subtitle tightens
// along the width axis (settle). The CTA slams in from the left; the text link
// follows. Then an 18-second idle drift.

export type HeroParts = {
  img: HTMLElement
  bracketTL: HTMLElement
  bracketBR: HTMLElement
  lines: HTMLElement[]
  subtitle: HTMLElement
  cta: HTMLElement
  ctaLabel: HTMLElement
  link: HTMLElement
}

export function setHeroHidden(p: HeroParts) {
  gsap.set(p.img, { scale: 1.08, filter: 'grayscale(1)', y: 0 })
  gsap.set(p.bracketTL, { xPercent: -120, yPercent: -120 })
  gsap.set(p.bracketBR, { xPercent: 120, yPercent: 120 })
  gsap.set(p.lines, { yPercent: -120, scaleY: 1, transformOrigin: 'bottom' })
  gsap.set(p.subtitle, { autoAlpha: 0, fontVariationSettings: "'wdth' 125" })
  gsap.set(p.cta, { scaleX: 0, transformOrigin: 'left center' })
  gsap.set(p.ctaLabel, { autoAlpha: 0 })
  gsap.set(p.link, { autoAlpha: 0, x: -12 })
}

export function heroWeighIn(p: HeroParts) {
  const sat = { v: 0 }
  const tl = gsap.timeline()

  // HIT — brackets snap in
  tl.to([p.bracketTL, p.bracketBR], { xPercent: 0, yPercent: 0, duration: 0.3, ease: 'power4.in' }, 0.1)

  // three hits, 320 ms apart — ease-in drop, slam, image jolt, a third of the colour
  p.lines.forEach((line, i) => {
    const at = 0.55 + i * 0.32
    tl.to(line, { yPercent: 0, duration: 0.28, ease: 'power4.in' }, at)
      .to(line, { scaleY: 0.92, duration: 0.05, ease: 'power4.out' }, at + 0.28)
      .to(line, { scaleY: 1, duration: 0.22, ease: 'power3.out' }, at + 0.33)
      .to(p.img, { y: 3, duration: 0.05, ease: 'power4.in' }, at + 0.28)
      .to(p.img, { y: 0, duration: 0.25, ease: 'power3.out' }, at + 0.33)
      .to(
        sat,
        {
          v: (i + 1) / 3,
          duration: 0.3,
          ease: 'power2.out',
          onUpdate: () => {
            p.img.style.filter = `grayscale(${1 - sat.v})`
          },
        },
        at + 0.28,
      )
  })

  const after = 0.55 + (p.lines.length - 1) * 0.32 + 0.33
  tl
    // SETTLE — subtitle tightens along the width axis
    .to(p.subtitle, { autoAlpha: 1, fontVariationSettings: "'wdth' 62", duration: 1.1, ease: 'expo.out' }, after)
    // HIT — CTA slams in from the left, label appears; the text link follows
    .to(p.cta, { scaleX: 1, duration: 0.06, ease: 'none' }, after + 0.35)
    .to(p.ctaLabel, { autoAlpha: 1, duration: 0.12, ease: 'none' }, after + 0.41)
    .to(p.link, { autoAlpha: 1, x: 0, duration: 0.5, ease: 'power3.out' }, after + 0.5)
    // idle drift
    .to(p.img, { scale: 1.0, duration: 18, ease: 'none' }, after + 0.4)
    // release the inline width axis so the token value governs from here on
    .set(p.subtitle, { clearProps: 'fontVariationSettings' }, after + 1.2)

  return tl
}
