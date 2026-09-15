import { useRef } from 'react'
import { useReplay } from './useReplay'

// Route transition — "the Cut". Two triangles converge on the rising diagonal
// (hit), the void punches open into the Pit Frame (hit), then both brackets
// slide off along the cut revealing the next route (settle).
//
// Clip-paths use six points throughout so GSAP can morph triangle → bracket:
// the three middle points sit on the hypotenuse's midpoint in the closed state.
// The void opens to 30% of the overlay (35%–65%): tighter than the mark's 50%
// so the frame reads at viewport scale.
const RED_CLOSED = 'polygon(0% 0%, 93.75% 0%, 46.875% 46.875%, 46.875% 46.875%, 46.875% 46.875%, 0% 93.75%)'
const RED_OPEN = 'polygon(0% 0%, 93.75% 0%, 58.75% 35%, 35% 35%, 35% 58.75%, 0% 93.75%)'
const INK_CLOSED = 'polygon(100% 100%, 6.25% 100%, 53.125% 53.125%, 53.125% 53.125%, 53.125% 53.125%, 100% 6.25%)'
const INK_OPEN = 'polygon(100% 100%, 6.25% 100%, 41.25% 65%, 65% 65%, 65% 41.25%, 100% 6.25%)'

export function Cut() {
  const scope = useRef<HTMLDivElement>(null)
  const { replay } = useReplay(scope, (tl, el) => {
    const red = el.querySelector<HTMLElement>('.cut__red')!
    const ink = el.querySelector<HTMLElement>('.cut__ink')!
    const redWrap = red.parentElement!
    const inkWrap = ink.parentElement!
    const pageA = el.querySelector<HTMLElement>('.cut__page--a')!
    const pageB = el.querySelector<HTMLElement>('.cut__page--b')!

    tl.set(red, { clipPath: RED_CLOSED })
      .set(ink, { clipPath: INK_CLOSED })
      .set(redWrap, { xPercent: -100, yPercent: -100 })
      .set(inkWrap, { xPercent: 100, yPercent: 100 })
      .set(pageA, { autoAlpha: 1 })
      .set(pageB, { autoAlpha: 0 })
      // HIT — converge
      .to([redWrap, inkWrap], { xPercent: 0, yPercent: 0, duration: 0.45, ease: 'power3.in' }, 0.4)
      // swap pages behind the overlay, then punch the void open
      .set(pageA, { autoAlpha: 0 })
      .set(pageB, { autoAlpha: 1 })
      .to(red, { clipPath: RED_OPEN, duration: 0.22, ease: 'power4.out' })
      .to(ink, { clipPath: INK_OPEN, duration: 0.22, ease: 'power4.out' }, '<')
      // hold — the mark resolves
      .to({}, { duration: 0.12 })
      // SETTLE — brackets leave along the cut
      .to(redWrap, { xPercent: -110, yPercent: -110, duration: 0.8, ease: 'expo.out' })
      .to(inkWrap, { xPercent: 110, yPercent: 110, duration: 0.8, ease: 'expo.out' }, '<')
  })

  return (
    <div className="proto" ref={scope}>
      <div className="stage stage--wide cut">
        <div className="cut__page cut__page--a">
          <span className="eyebrow">Home</span>
          <h3 className="display">Three paths. One pit.</h3>
        </div>
        <div className="cut__page cut__page--b dark">
          <span className="eyebrow">Training</span>
          <h3 className="display">The Gauntlet Stages</h3>
        </div>
        <div className="cut__overlay" aria-hidden="true">
          <div className="cut__wrap cut__wrap--red">
            <div className="cut__red" />
          </div>
          <div className="cut__wrap cut__wrap--ink">
            <div className="cut__ink" />
          </div>
        </div>
      </div>
      <button type="button" className="btn btn--sm btn--ghost" onClick={replay}>
        Replay
      </button>
    </div>
  )
}
