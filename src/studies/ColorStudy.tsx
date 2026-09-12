import type { CSSProperties } from 'react'
import { palettes, type Palette } from './palettes'
import './ColorStudy.css'

function Sample({ p }: { p: Palette }) {
  return (
    <div className="pal" style={p.vars as CSSProperties}>
      <div className="pal__swatches">
        {p.swatches.map((s) => (
          <div key={s.hex + s.name} className="swatch">
            <span className="swatch__chip" style={{ background: s.hex }} />
            <span className="swatch__name">{s.name}</span>
            <span className="swatch__hex">{s.hex}</span>
            <span className="swatch__role">{s.role}</span>
          </div>
        ))}
      </div>

      {/* Light field */}
      <div className="pal__light">
        <span className="pal-eyebrow">The Scrap Pit philosophy</span>
        <h3 className="pal-h">Forged in Fire</h3>
        <p className="pal-body">
          We don’t just train fighters. We build warriors who refuse to accept limits, who turn pain into power.
        </p>
        <p className="pal-muted">Muted supporting text on white — must still read at 14px.</p>
        <div className="pal__row">
          <span className="pal-btn pal-btn--accent">Start Free Trial</span>
          <span className="pal-btn pal-btn--victory">View Pricing</span>
          <span className="pal-btn pal-btn--ghost">See the Training</span>
          <span className="pal-link">Read our story</span>
        </div>
        <p className="pal-gold-text">Gold as text on white: “Most popular”</p>
        <hr className="pal-rule" />
        <span className="pal-error">That email does not look right.</span>
      </div>

      {/* Gradient light */}
      <div className="pal__grad-light">
        <h3 className="pal-h">Become Scrappy</h3>
        <p className="pal-sub">And learn to fight</p>
        <div className="pal__row">
          <span className="pal-btn pal-btn--accent">Start Free Trial</span>
          <span className="pal-btn pal-btn--victory">View Pricing</span>
        </div>
      </div>

      {/* Dark field */}
      <div className="pal__dark">
        <span className="pal-eyebrow pal-eyebrow--dark">By the numbers</span>
        <div className="pal__nums">
          <div>
            <div className="pal-num">2,500+</div>
            <div className="pal-muted-inv">Fighters trained</div>
          </div>
          <div>
            <div className="pal-num">150+</div>
            <div className="pal-muted-inv">Fight victories</div>
          </div>
        </div>
        <div className="pal__row">
          <span className="pal-btn pal-btn--accent-dark">Book a Visit</span>
          <span className="pal-btn pal-btn--victory">Start Risk-Free Trial</span>
          <span className="pal-btn pal-btn--ghost-dark">See the Training</span>
        </div>
        <div className="pal__panel">
          <span className="pal-eyebrow pal-eyebrow--dark">Elevated panel</span>
          <p className="pal-body-inv">Iron on ink: a card or menu surface that sits above the dark field.</p>
        </div>
      </div>

      {/* Gradient dark */}
      <div className="pal__grad-dark">
        <span className="pal-eyebrow pal-eyebrow--dark">Ready to start your journey?</span>
        <h3 className="pal-h pal-h--inv">Contact the Pit</h3>
        <p className="pal-muted-inv">Step into our octagon. Tell us where you are.</p>
      </div>
    </div>
  )
}

export function ColorStudy() {
  return (
    <div className="study">
      <header className="study__head container">
        <span className="eyebrow">Phase 2 · Color study</span>
        <h1>Richer red and gold, a neutral ramp</h1>
        <p className="lede">
          Left is today’s token set; right is the proposal. Every sample uses the same markup, so the only difference
          is pigment. Look at the accent button on white, gold as text, the eyebrows on dark, and the two gradient
          surfaces.
        </p>
      </header>

      <div className="study__grid study__grid--2 container">
        {palettes.map((p) => (
          <section key={p.id} className="study__col">
            <h2 className="study__sysname">{p.name}</h2>
            <p className="study__thesis">{p.summary}</p>
            <div className="study__frame">
              <Sample p={p} />
            </div>
          </section>
        ))}
      </div>

      <footer className="study__foot container">
        <h2>Usage rules (proposal)</h2>
        <ul className="study__rules">
          <li>
            <strong>Red 600</strong> is the only red on white: CTAs, eyebrows, active nav, errors. <strong>Red 900</strong>{' '}
            is its hover/pressed state. <strong>Red 400</strong> replaces it on dark surfaces so it does not sink.
          </li>
          <li>
            <strong>Gold 500</strong> is a surface color (victory button, rules, badges). As <em>text</em> on white use{' '}
            <strong>Gold 800</strong>; on dark use <strong>Gold 300</strong>. Never Gold 500 as small text on white.
          </li>
          <li>
            <strong>Ink</strong> replaces Iron Black for text and the deepest field. <strong>Iron</strong> is reserved for
            panels that sit on Ink (mobile menu, plan card on a dark section). Steel 700/500/300/100 cover rules and
            muted text; no more rgba() neutrals.
          </li>
          <li>
            Gradient-light keeps its 135° structure with the new pigments at 5–7% so it stays a whisper. Gradient-dark
            becomes an Ink → Iron sweep instead of a translucent overlay, which removes the muddy mid-tone.
          </li>
          <li>Focus ring: Red 600 on white, Gold 300 on dark, 3px offset 3px.</li>
        </ul>
      </footer>
    </div>
  )
}
