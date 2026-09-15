import { useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useReplay } from './useReplay'

gsap.registerPlugin(SplitText)

// Detail layer (revised September 14). Odometers everywhere a number lives:
// impressively high numbers roll UP to their value; impressively low numbers
// (prices) roll DOWN to it. The spoken width-axis quote is reserved for the
// three fighter quotes.
const UP = [
  ['2,500+', 'Fighters trained'],
  ['150+', 'Fight victories'],
  ['50,000+', 'Hours of training'],
]
const QUOTE = "The Scrap Pit didn't just teach me to fight. It taught me to conquer the voice in my head that says I can't."

function Odometer({ value, direction = 'up' }: { value: string; direction?: 'up' | 'down' }) {
  return (
    <span className="odo num" data-direction={direction} aria-label={value}>
      {value.split('').map((ch, i) =>
        /\d/.test(ch) ? (
          <span key={i} className="odo__digit" data-digit={ch}>
            <span className="odo__strip">
              {Array.from({ length: 10 }, (_, d) => (
                <span key={d}>{d}</span>
              ))}
            </span>
          </span>
        ) : (
          <span key={i} className="odo__glyph">
            {ch}
          </span>
        ),
      )}
    </span>
  )
}

export function Scoreboard() {
  const scope = useRef<HTMLDivElement>(null)
  const { replay } = useReplay(scope, (tl, el) => {
    el.querySelectorAll<HTMLElement>('.odo').forEach((odo, s) => {
      const up = odo.dataset.direction !== 'down'
      const digits = odo.querySelectorAll<HTMLElement>('.odo__digit')
      const at = 0.2 + s * 0.12
      digits.forEach((digit, i) => {
        const strip = digit.querySelector<HTMLElement>('.odo__strip')!
        const target = Number(digit.dataset.digit)
        // up: start on 0 and climb; down: start on 9 and fall
        tl.fromTo(strip, { yPercent: up ? 0 : -90 }, { yPercent: -target * 10, duration: 1.1, ease: 'expo.out' }, at + i * 0.06)
      })
      tl.fromTo(odo, { x: 0 }, { x: 1, duration: 0.04, yoyo: true, repeat: 1, ease: 'power4.in' }, at + digits.length * 0.06 + 0.5)
    })
    tl.fromTo(el.querySelector('.sb__rail'), { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'expo.out' }, 0.2)

    const split = new SplitText(el.querySelector('.sb__quote')!, { type: 'words' })
    tl.fromTo(
      split.words,
      { autoAlpha: 0, filter: 'blur(6px)', fontVariationSettings: "'wdth' 62" },
      { autoAlpha: 1, filter: 'blur(0px)', fontVariationSettings: "'wdth' 88", duration: 0.9, ease: 'power3.out', stagger: 0.03 },
      0.8,
    )
  })

  return (
    <div className="proto" ref={scope}>
      <div className="stage sb dark">
        <span className="eyebrow">By the numbers — rolls up</span>
        <div className="sb__rail" />
        <dl className="sb__stats">
          {UP.map(([v, l]) => (
            <div key={l}>
              <dd>
                <Odometer value={v} />
              </dd>
              <dt className="muted">{l}</dt>
            </div>
          ))}
        </dl>
        <dl className="sb__stats sb__stats--mixed">
          <div>
            <dd>
              <Odometer value="30" />
              <span className="sb__unit display">-Day</span>
            </dd>
            <dt className="muted">Guarantee — rolls up</dt>
          </div>
          <div>
            <dd>
              <span className="sb__unit num">$</span>
              <Odometer value="149" direction="down" />
              <span className="sb__per muted">/month</span>
            </dd>
            <dt className="muted">Champion plan — rolls down</dt>
          </div>
          <div>
            <dd>
              <span className="sb__unit num">$</span>
              <Odometer value="25" direction="down" />
            </dd>
            <dt className="muted">Day pass — rolls down</dt>
          </div>
        </dl>
        <p className="sb__quote quote">“{QUOTE}”</p>
      </div>
      <button type="button" className="btn btn--sm btn--ghost" onClick={replay}>
        Replay
      </button>
    </div>
  )
}
