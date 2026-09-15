import { useRef } from 'react'
import { ImpactButton } from './ImpactButton'
import { useReplay } from './useReplay'

// Hero entrance — "the Weigh-in" (revised September 14).
// Brackets snap to the corners (hit). Three title lines drop on an ease-in and
// slam — no skew, a landing compression instead — spaced 320 ms apart so each
// hit reads; each landing jolts the image and adds a third of its colour. The
// subtitle tightens along the width axis (settle). The CTA slams in like a
// control: its solid fill wipes in from the left, then the label appears.
export function WeighIn() {
  const scope = useRef<HTMLDivElement>(null)
  const { replay } = useReplay(scope, (tl, el) => {
    const img = el.querySelector<HTMLElement>('.wi__img')!
    const brTL = el.querySelector<HTMLElement>('.wi__bracket--tl')!
    const brBR = el.querySelector<HTMLElement>('.wi__bracket--br')!
    const lines = el.querySelectorAll<HTMLElement>('.wi__line')
    const sub = el.querySelector<HTMLElement>('.wi__sub')!
    const cta = el.querySelector<HTMLElement>('.wi__cta')!
    const ctaLabel = cta.querySelector<HTMLElement>('.impact__label')!
    const sat = { v: 0 }

    tl.set(img, { scale: 1.08, filter: 'grayscale(1)', x: 0, y: 0 })
      .set(brTL, { xPercent: -120, yPercent: -120 })
      .set(brBR, { xPercent: 120, yPercent: 120 })
      .set(lines, { yPercent: -120, scaleY: 1, autoAlpha: 1, transformOrigin: 'bottom' })
      .set(sub, { autoAlpha: 0, fontVariationSettings: "'wdth' 125" })
      .set(cta, { scaleX: 0, transformOrigin: 'left center' })
      .set(ctaLabel, { autoAlpha: 0 })
      // HIT — brackets snap in
      .to([brTL, brBR], { xPercent: 0, yPercent: 0, duration: 0.3, ease: 'power4.in' }, 0.3)
    // three hits, 320 ms apart — ease-in drop, slam, image jolt, a third of the colour
    lines.forEach((line, i) => {
      const at = 0.8 + i * 0.32
      tl.to(line, { yPercent: 0, duration: 0.28, ease: 'power4.in' }, at)
        .to(line, { scaleY: 0.92, duration: 0.05, ease: 'power4.out' }, at + 0.28)
        .to(line, { scaleY: 1, duration: 0.22, ease: 'power3.out' }, at + 0.33)
        .to(img, { y: 3, duration: 0.05, ease: 'power4.in' }, at + 0.28)
        .to(img, { y: 0, duration: 0.25, ease: 'power3.out' }, at + 0.33)
        .to(sat, { v: (i + 1) / 3, duration: 0.3, ease: 'power2.out', onUpdate: () => { img.style.filter = `grayscale(${1 - sat.v})` } }, at + 0.28)
    })
    const after = 0.8 + 2 * 0.32 + 0.33
    tl
      // SETTLE — subtitle tightens along the width axis
      .to(sub, { autoAlpha: 1, fontVariationSettings: "'wdth' 62", duration: 1.1, ease: 'expo.out' }, after)
      // HIT — CTA slams in from the left, label appears
      .to(cta, { scaleX: 1, duration: 0.06, ease: 'none' }, after + 0.35)
      .to(ctaLabel, { autoAlpha: 1, duration: 0.12, ease: 'none' }, after + 0.41)
      // idle drift
      .to(img, { scale: 1.0, duration: 18, ease: 'none' }, after + 0.4)
  })

  return (
    <div className="proto" ref={scope}>
      <div className="stage stage--wide wi dark">
        <img className="wi__img" src="/images/hero-octagon-scrap.webp" alt="" />
        <div className="wi__shade" />
        <svg className="wi__bracket wi__bracket--tl" viewBox="0 0 64 64" aria-hidden="true">
          <path fill="var(--red-600)" d="M0 0H60L44 16H16V44L0 60Z" />
        </svg>
        <svg className="wi__bracket wi__bracket--br" viewBox="0 0 64 64" aria-hidden="true">
          <path fill="var(--ghost-white)" d="M64 64H4L20 48H48V20L64 4Z" />
        </svg>
        <div className="wi__text">
          <h3 className="wi__title display">
            {['The', 'Scrap', 'Pit'].map((w) => (
              <span key={w} className="wi__mask">
                <span className="wi__line">{w}</span>
              </span>
            ))}
          </h3>
          <p className="wi__sub display">Forget potential - bring the output</p>
          <ImpactButton variant="accent" className="wi__cta">
            View Training
          </ImpactButton>
        </div>
      </div>
      <button type="button" className="btn btn--sm btn--ghost" onClick={replay}>
        Replay
      </button>
    </div>
  )
}
