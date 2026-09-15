import { useRef } from 'react'
import { useReplay } from './useReplay'

// Scene layer — a section head entering as a "round" (revised September 14).
// The eyebrow slams in with a 40 ms red flash (hit), the round numeral rolls,
// the top rope draws across, the heading resolves along the width axis
// (settle), and the lede gets the same slam-flash as the eyebrow.
export function Round() {
  const scope = useRef<HTMLDivElement>(null)
  const { replay } = useReplay(scope, (tl, el) => {
    const eyebrow = el.querySelector<HTMLElement>('.rd__eyebrow')!
    const flash = el.querySelector<HTMLElement>('.rd__flash')!
    const strip = el.querySelector<HTMLElement>('.rd__strip')!
    const rail = el.querySelector<HTMLElement>('.rd__rail')!
    const title = el.querySelector<HTMLElement>('.rd__title')!
    const lede = el.querySelector<HTMLElement>('.rd__lede')!
    const ledeFlash = el.querySelector<HTMLElement>('.rd__lede-flash')!

    // slam-flash: a red block wipes in from the left (hit), the text is revealed
    // beneath it, then the block retracts to the right.
    const slam = (block: HTMLElement, text: HTMLElement, at: number) => {
      tl.to(block, { scaleX: 1, duration: 0.04, ease: 'none', transformOrigin: 'left' }, at)
        .set(text, { autoAlpha: 1 }, at + 0.04)
        .set(block, { transformOrigin: 'right' }, at + 0.05)
        .to(block, { scaleX: 0, duration: 0.18, ease: 'power4.out' }, at + 0.06)
    }

    tl.set([eyebrow, lede], { autoAlpha: 0 })
      .set([flash, ledeFlash], { scaleX: 0, transformOrigin: 'left' })
      .set(strip, { yPercent: 0 })
      .set(rail, { scaleX: 0, transformOrigin: 'left' })
      .set(title, { autoAlpha: 0, fontVariationSettings: "'wdth' 125" })
    slam(flash, eyebrow, 0.2)
    tl.to(strip, { yPercent: -33.333, duration: 0.9, ease: 'expo.out' }, 0.26)
      .to(rail, { scaleX: 1, duration: 1.1, ease: 'expo.out' }, 0.3)
      // SETTLE — heading tightens along the width axis
      .to(title, { autoAlpha: 1, fontVariationSettings: "'wdth' 62", duration: 1.1, ease: 'expo.out' }, 0.4)
    slam(ledeFlash, lede, 1.05)
  })

  return (
    <div className="proto" ref={scope}>
      <div className="stage rd">
        <div className="rd__head">
          <span className="rd__round num" aria-hidden="true">
            <span className="rd__strip">
              {['00', '01', '02'].map((n) => (
                <span key={n}>{n}</span>
              ))}
            </span>
          </span>
          <span className="rd__slam">
            <span className="rd__flash" />
            <span className="rd__eyebrow eyebrow">Stage 01</span>
          </span>
        </div>
        <div className="rd__rail" />
        <h3 className="rd__title display">Master the art of controlled violence</h3>
        <span className="rd__slam rd__slam--block">
          <span className="rd__lede-flash" />
          <p className="rd__lede lede">Boxing, Muay Thai, and kickboxing fundamentals that make you precise under pressure.</p>
        </span>
      </div>
      <button type="button" className="btn btn--sm btn--ghost" onClick={replay}>
        Replay
      </button>
    </div>
  )
}
