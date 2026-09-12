import { Button } from '../components/Button'
import { PageMeta } from '../components/PageMeta'
import {
  becomeScrappyTraining,
  disciplines,
  extras,
  gauntlet,
  guarantee,
  plans,
  pricing,
} from '../content/training'
import './Training.css'

export function Training() {
  return (
    <>
      <PageMeta title="Training" description={gauntlet.description} />

      {/* 1. Entrance — split hero. Image is a flagged placeholder (see PLAN.md). */}
      <section className="hero-split dark" aria-labelledby="training-title">
        <div className="hero-split__media">
          <img src="/images/new-heroes/training-hero-1.jpg" alt="" fetchPriority="high" />
          <span className="placeholder-tag">Placeholder image</span>
        </div>
        <div className="hero-split__text">
          <span className="eyebrow">Training</span>
          <h1 id="training-title">{gauntlet.title}</h1>
          <p className="lede muted">{gauntlet.description}</p>
        </div>
      </section>

      {/* 2. Gauntlet — three disciplines as an editorial sequence */}
      <section className="section surface-light" aria-label="Disciplines">
        <div className="container gauntlet">
          {disciplines.map((d, i) => (
            <article key={d.id} id={d.id} className="discipline">
              <div className="discipline__media">
                <img src={d.image} alt={d.alt} loading={i === 0 ? 'eager' : 'lazy'} />
              </div>
              <div className="discipline__text">
                <span className="eyebrow">Stage 0{i + 1}</span>
                <h2>{d.title}</h2>
                <p className="lede">{d.summary}</p>
                <ul role="list" className="details">
                  {d.details.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Become Scrappy — hinge into commitment */}
      <section className="section surface-gradient-light cta-band" aria-labelledby="hinge-title">
        <div className="container stack">
          <h2 id="hinge-title">{becomeScrappyTraining.title}</h2>
          <p className="cta-band__subtitle display">{becomeScrappyTraining.subtitle}</p>
          <p className="lede">{becomeScrappyTraining.body}</p>
        </div>
      </section>

      {/* 4. Choose Your Training — plans and extras */}
      <section id="pricing" className="section surface-light" aria-labelledby="pricing-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{pricing.subtitle}</span>
            <h2 id="pricing-title">{pricing.title}</h2>
            <p className="lede">{pricing.description}</p>
          </div>

          <div className="plans">
            {plans.map((p) => (
              <article key={p.id} className={`plan ${p.popular ? 'plan--popular' : ''}`} aria-labelledby={`plan-${p.id}`}>
                <header className="plan__head">
                  {p.popular && <span className="plan__badge">Most popular</span>}
                  <h3 id={`plan-${p.id}`}>{p.name}</h3>
                  <p className="muted">{p.subtitle}</p>
                </header>
                <p className="plan__price">
                  <span className="plan__amount display">${p.price}</span>
                  <span className="plan__period">{p.period}</span>
                </p>
                <ul role="list" className="plan__features">
                  {p.features.map((f) => (
                    <li key={f.text} className={f.included ? '' : 'plan__feature--excluded'}>
                      <span aria-hidden="true">{f.included ? '+' : '–'}</span>
                      {f.text}
                      {!f.included && <span className="sr-only"> (not included)</span>}
                    </li>
                  ))}
                </ul>
                <Button to={`/contact?plan=${p.id}`} variant={p.popular ? 'accent' : 'ghost'} className="plan__cta">
                  {p.cta}
                </Button>
              </article>
            ))}
          </div>

          <div className="extras">
            <h3 className="extras__title">{extras.title}</h3>
            <ul role="list" className="extras__list">
              {extras.items.map((x) => (
                <li key={x.name} className="extra">
                  <span className="extra__name">{x.name}</span>
                  <span className="extra__price display">{x.price}</span>
                  <span className="extra__note muted">{x.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Guarantee + contact invitation */}
      <section id="guarantee" className="section surface-gradient-light cta-band" aria-labelledby="guarantee-title">
        <div className="container stack">
          <span className="eyebrow">Zero risk</span>
          <h2 id="guarantee-title">{guarantee.title}</h2>
          <p className="lede">{guarantee.body}</p>
          <div className="cluster">
            <Button to="/contact" variant="victory" size="lg">
              {guarantee.cta}
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
