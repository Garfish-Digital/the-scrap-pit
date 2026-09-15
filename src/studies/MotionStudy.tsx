import { Cut } from './motion/Cut'
import { CutSlip } from './motion/CutSlip'
import { Impact } from './motion/Impact'
import { Round } from './motion/Round'
import { Scoreboard } from './motion/Scoreboard'
import { WeighIn } from './motion/WeighIn'
import './MotionStudy.css'

type Proto = {
  id: string
  character: string
  altitude: string
  name: string
  what: string
  tempo: string
  eases: string
  el: React.ReactNode
}

const protos: Proto[] = [
  {
    id: 'cut',
    character: 'The Tear',
    altitude: 'Page',
    name: 'The Cut — route transition',
    what: 'Red and Ink converge on the rising diagonal, the void punches open into the Pit Frame, then both brackets slide off along the cut revealing the next route. The mark is literally the door between pages.',
    tempo: 'hit 420 ms → hit 220 ms → hold 120 ms → settle 800 ms',
    eases: 'power4.in · power4.out · expo.out',
    el: <Cut />,
  },
  {
    id: 'weighin',
    character: 'Weigh-in',
    altitude: 'Scene',
    name: 'The Weigh-in — hero entrance',
    what: 'Revised. Brackets snap to the corners. Three title lines drop on an ease-in and slam — no skew, a landing compression — spaced 320 ms apart so each hit reads; each landing jolts the image and adds a third of its colour. The subtitle tightens along Archivo’s width axis (125 → 62); the same reveal is proposed for every h2. The CTA is the Impact button, slamming in from the left.',
    tempo: 'hit 300 ms → 3 × hit 280 ms (320 ms apart) → settle 1.1 s → hit 60 ms',
    eases: 'power4.in · power3.out · expo.out · none',
    el: <WeighIn />,
  },
  {
    id: 'round',
    character: 'Weigh-in + Scoreboard',
    altitude: 'Scene',
    name: 'The Round — section entrance',
    what: 'Revised. Eyebrow slams in with a 40 ms red flash, the round numeral rolls, the top rope draws across, the heading resolves along the width axis instead of a baseline mask, and the lede gets the same slam-flash as the eyebrow. On the site this fires once per section from ScrollTrigger.',
    tempo: 'hit 40 ms → settle 900 ms / 1.1 s / 1.1 s → hit 40 ms',
    eases: 'none · expo.out · power4.out',
    el: <Round />,
  },
  {
    id: 'scoreboard',
    character: 'Scoreboard + Weigh-in',
    altitude: 'Detail',
    name: 'Odometers and the spoken quote',
    what: 'Revised. Every number is an odometer: impressively high numbers roll up to their value (stats, the 30-day guarantee); impressively low numbers roll down (plan prices, passes). Digits stagger and the last one lands with a 1px jolt. The spoken width-axis quote is reserved for the three fighter quotes.',
    tempo: 'settle 1.1 s (60 ms per digit) + hit 40 ms · words 900 ms staggered 30 ms',
    eases: 'expo.out · power3.out',
    el: <Scoreboard />,
  },
  {
    id: 'slip',
    character: 'The Tear',
    altitude: 'Detail',
    name: 'Cut & Slip — image hover',
    what: 'Every non-hero image is split on the rising diagonal. Pointer: hover slips the halves 8px apart along the cut, the ghost-white gap flashes, colour snaps in; leave snaps them back. Touch: the same sequence plays from ScrollTrigger as the image crosses the middle band of the viewport and reverses when it leaves — phones get it by scrolling.',
    tempo: 'hit 200 ms · settle 350 ms',
    eases: 'power4.out · back.out(1.7)',
    el: <CutSlip />,
  },
  {
    id: 'impact',
    character: 'Impact',
    altitude: 'Control',
    name: 'Impact — button',
    what: 'Revised. Static is the solid fill. Hover: ghost white slams in from the left (a 60 ms hit, like the eyebrow flash) and holds while hovered; the label takes the button’s colour; leave retracts it to the right. Press unchanged: a 60 ms flash, a 1px drop, and a 1px ring expands and fades — a shockwave; release settles with a short overshoot.',
    tempo: 'hover 60 ms in / 150 ms out · press 60 ms + 300 ms · release 200 ms',
    eases: 'none · power4.out · power4.in · back.out(2)',
    el: <Impact />,
  },
]

export function MotionStudy() {
  return (
    <div className="study">
      <header className="study__head container">
        <span className="eyebrow">Phase 4 · Motion study</span>
        <h1>Six signature moves</h1>
        <p className="lede">
          Working GSAP prototypes of the sequences proposed in <code>design/MOTION.md</code>. Three characters —{' '}
          <strong>The Tear</strong> (geometric, from the mark’s diagonal), <strong>Weigh-in</strong> (cinematic, long
          settles punctuated by hits), <strong>Scoreboard</strong> (mechanical, counters and rails) — assigned by
          altitude: page, scene, detail, control. Judge the tempo and the character, not the polish; every value here
          is a starting number.
        </p>
      </header>

      <div className="container motion-list">
        {protos.map((p, i) => (
          <section key={p.id} className="motion-item" aria-labelledby={`m-${p.id}`}>
            <div className="motion-item__meta">
              <span className="motion-item__index num">0{i + 1}</span>
              <h2 id={`m-${p.id}`} className="motion-item__name">
                {p.name}
              </h2>
              <dl className="motion-item__spec">
                <div>
                  <dt>Character</dt>
                  <dd>{p.character}</dd>
                </div>
                <div>
                  <dt>Altitude</dt>
                  <dd>{p.altitude}</dd>
                </div>
                <div>
                  <dt>Tempo</dt>
                  <dd>{p.tempo}</dd>
                </div>
                <div>
                  <dt>Eases</dt>
                  <dd>{p.eases}</dd>
                </div>
              </dl>
              <p className="motion-item__what">{p.what}</p>
            </div>
            <div className="motion-item__proto">{p.el}</div>
          </section>
        ))}
      </div>

      <footer className="study__foot container">
        <h2>Not prototyped here, proposed in the score</h2>
        <ul className="study__rules">
          <li>
            <strong>Hero on scroll</strong> — pinned for 100vh: brackets close over the image, the title condenses, the
            next section rises through the void. Scrub-driven.
          </li>
          <li>
            <strong>Pinned Gauntlet</strong> — the three disciplines as one scene; each image opens through the void as
            the previous desaturates and recedes; unpinned on phones.
          </li>
          <li>
            <strong>Preloader</strong> — once per session: the mark assembles, then the site is revealed through the
            void expanding. Shares the Cut’s geometry.
          </li>
          <li>
            <strong>Ticker</strong> — constant-speed label ticker under the hero; scroll velocity skews it and flips its
            direction.
          </li>
          <li>
            <strong>Nav</strong> — active underline slides between items (Flip); hover widens the label along the width
            axis.
          </li>
          <li>
            <strong>Form</strong> — focus draws the underline; error jolts; submit closes two brackets around the
            confirmation — the message dropped into the pit.
          </li>
          <li>
            <strong>Reduced motion</strong> — every sequence becomes a 200 ms fade; pins and scrubs off; the tear stays
            as a static diagonal edge.
          </li>
        </ul>
        <h2>Decision</h2>
        <p>
          Recommended: the hybrid — Tear at page altitude, Weigh-in for scenes, Scoreboard for details, Impact on
          controls. If one character has to go, drop Scoreboard first (it ages fastest) and keep odometers only on the
          About numbers.
        </p>
      </footer>
    </div>
  )
}
