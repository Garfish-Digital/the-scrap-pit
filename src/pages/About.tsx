import { Button } from '../components/Button'
import { PageMeta } from '../components/PageMeta'
import { code, mission, numbers, readyCta, story } from '../content/about'
import './About.css'

export function About() {
  return (
    <>
      <PageMeta title="About" description={mission.body} />

      {/* 1. Entrance — dark backdrop, bounded mission statement. Placeholder image. */}
      <section className="about-hero dark" aria-labelledby="about-title">
        <div className="about-hero__media">
          <img src="/images/new-heroes/about-hero.png" alt="" fetchPriority="high" />
          <span className="placeholder-tag">Placeholder image</span>
        </div>
        <div className="container about-hero__text">
          <span className="eyebrow">{mission.subtitle}</span>
          <h1 id="about-title">{mission.title}</h1>
          <p className="lede">{mission.body}</p>
        </div>
      </section>

      {/* 2. Our Story — narrow reading measure */}
      <section className="section surface-light" aria-labelledby="story-title">
        <div className="container story">
          <h2 id="story-title">{story.title}</h2>
          <div className="story__body">
            {story.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* 3. By the Numbers — typographic band */}
      <section className="section surface-gradient-dark dark" aria-labelledby="numbers-title">
        <div className="container">
          <h2 id="numbers-title" className="eyebrow numbers__title">
            {numbers.title}
          </h2>
          <dl className="numbers">
            {numbers.stats.map((s) => (
              <div key={s.label} className="number">
                <dd className="number__value num">{s.value}</dd>
                <dt className="number__label muted">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 4. Our Code — four values, 2x2 on desktop */}
      <section className="section surface-light" aria-labelledby="code-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Values</span>
            <h2 id="code-title">{code.title}</h2>
          </div>
          <ol className="values">
            {code.values.map((v, i) => (
              <li key={v.title} className="value">
                <span className="value__index num">0{i + 1}</span>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. Ready for the Pit? */}
      <section className="section surface-gradient-light cta-band" aria-labelledby="ready-title">
        <div className="container stack">
          <h2 id="ready-title">{readyCta.title}</h2>
          <p className="lede">{readyCta.body}</p>
          <div className="cluster">
            <Button to={readyCta.primary.to} variant="accent" size="lg">
              {readyCta.primary.label}
            </Button>
            <Button to={readyCta.secondary.to} variant="victory">
              {readyCta.secondary.label}
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
