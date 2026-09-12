import { useState } from 'react'
import { Specimen } from './Specimen'
import { systems } from './systems'
import './TypeStudy.css'

type View = 'compare' | 'phone' | 'a' | 'b' | 'c'

export function TypeStudy() {
  const [view, setView] = useState<View>('compare')
  const shown = view === 'compare' || view === 'phone' ? systems : systems.filter((s) => s.id === view)

  return (
    <div className="study">
      <header className="study__head container">
        <span className="eyebrow">Phase 2 · Type study</span>
        <h1>Three type systems, real copy</h1>
        <p className="lede">
          Same markup and copy in every column: nav, hero, section head with body, the numbers band, a plan card, a
          fighter quote, and a form field. Compare at desktop, then switch to the 390px view; the phone crop is where
          hierarchy usually breaks.
        </p>
        <div className="study__controls" role="group" aria-label="View">
          {(
            [
              ['compare', 'Compare 3-up'],
              ['phone', 'Phone 390px'],
              ['a', 'A full width'],
              ['b', 'B full width'],
              ['c', 'C full width'],
            ] as [View, string][]
          ).map(([v, label]) => (
            <button
              key={v}
              type="button"
              className={`study__ctl ${view === v ? 'is-active' : ''}`}
              aria-pressed={view === v}
              onClick={() => setView(v)}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <div className={`study__grid container study__grid--${view}`}>
        {shown.map((s) => (
          <section key={s.id} className="study__col" aria-labelledby={`sys-${s.id}`}>
            <h2 id={`sys-${s.id}`} className="study__sysname">
              {s.name}
            </h2>
            <p className="study__thesis">{s.thesis}</p>
            <div className="study__frame">
              <Specimen system={s} />
            </div>
            <dl className="study__roles">
              {s.roles.map((r) => (
                <div key={r.role}>
                  <dt>{r.role}</dt>
                  <dd>{r.face}</dd>
                </div>
              ))}
            </dl>
            <div className="study__notes">
              <h3>Strengths</h3>
              <ul>
                {s.strengths.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <h3>Risks</h3>
              <ul>
                {s.risks.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <footer className="study__foot container">
        <h2>Recommendation</h2>
        <p>
          <strong>B (Archivo)</strong> is the strongest fit for “expensive design”: one skeleton across every role reads as
          a system, the width axis gives poster-condensed headlines without a second face, and tabular figures fix
          pricing alignment. <strong>C</strong> has the most personality and is the pick if the brand should feel more
          industrial than editorial; its cost is three families and small-size quirks. <strong>A</strong> is the control:
          tuning helps, but Bebas + Space Mono is the pairing that dates the site.
        </p>
        <p>
          Whichever wins gets self-hosted and subset (latin only), and the winner’s roles become the
          <code>--font-*</code> tokens. The logo wordmark is a separate decision; see the logo study.
        </p>
      </footer>
    </div>
  )
}
