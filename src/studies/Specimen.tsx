import type { CSSProperties } from 'react'
import { hero } from '../content/home'
import { mission, numbers, story } from '../content/about'
import { fighters } from '../content/fighters'
import { plans } from '../content/training'
import { routes } from '../content/site'
import { systemVars, type TypeSystem } from './systems'

// One in-context specimen: the same real copy, styled by a type system's
// custom properties. Sections mirror the live pages' loudest and quietest moments.
export function Specimen({ system }: { system: TypeSystem }) {
  const champion = plans.find((p) => p.popular)!
  const quote = fighters[0]

  return (
    <div className="spec" style={systemVars(system) as CSSProperties}>
      <div className="spec__nav">
        {routes.map((r) => (
          <span key={r.path} className={`spec-label ${r.path === '/training' ? 'is-active' : ''}`}>
            {r.label}
          </span>
        ))}
      </div>

      <div className="spec__hero">
        <h1 className="spec-display spec-display--hero">{hero.title}</h1>
        <p className="spec-display spec-display--sub">{hero.subtitle}</p>
        <div className="spec__row">
          <span className="spec-btn spec-label">{hero.primary.label}</span>
          <span className="spec-textlink spec-label">Meet the Fighters</span>
        </div>
      </div>

      <div className="spec__section">
        <span className="spec-label spec-eyebrow">{mission.subtitle}</span>
        <h2 className="spec-display spec-display--h2">{mission.title}</h2>
        <p className="spec-body spec-body--lede">{mission.body}</p>
        <p className="spec-body">{story.paragraphs[0]}</p>
        <span className="spec-textlink spec-label">Read our story</span>
      </div>

      <div className="spec__dark">
        <span className="spec-label spec-eyebrow spec-eyebrow--gold">{numbers.title}</span>
        <div className="spec__numbers">
          {numbers.stats.slice(0, 4).map((s) => (
            <div key={s.label}>
              <div className="spec-num">{s.value}</div>
              <div className="spec-body spec-body--sm spec-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="spec__section spec__plan">
        <span className="spec-label spec-eyebrow">Most popular</span>
        <h3 className="spec-display spec-display--h3">{champion.name}</h3>
        <p className="spec-body spec-body--sm spec-muted">{champion.subtitle}</p>
        <p className="spec__price">
          <span className="spec-num spec-num--price">${champion.price}</span>
          <span className="spec-body spec-body--sm spec-muted">{champion.period}</span>
        </p>
        <ul className="spec__features spec-body spec-body--sm">
          {champion.features.slice(0, 3).map((f) => (
            <li key={f.text}>{f.text}</li>
          ))}
        </ul>
        <span className="spec-btn spec-btn--accent spec-label">{champion.cta}</span>
      </div>

      <div className="spec__section">
        <p className="spec-quote">“{quote.quote}”</p>
        <p className="spec-body spec-body--sm">
          <strong>{quote.name}</strong> <span className="spec-muted">{quote.title}</span>
        </p>
      </div>

      <div className="spec__section spec__field">
        <span className="spec-label spec-label--field">Email</span>
        <span className="spec-input spec-body">fighter@example.com</span>
        <span className="spec-body spec-body--sm spec-error">That email does not look right.</span>
      </div>
    </div>
  )
}
