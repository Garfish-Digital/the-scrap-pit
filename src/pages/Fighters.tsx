import { Button } from '../components/Button'
import { PageMeta } from '../components/PageMeta'
import {
  fighters,
  fightersInvitation,
  forgedInFireFighters,
  leaders,
  leadersSection,
  profiles,
} from '../content/fighters'
import './Fighters.css'

export function Fighters() {
  return (
    <>
      <PageMeta title="Fighters" description={profiles.description} />

      {/* 1. Entrance — contained photo, title on the adjacent solid field */}
      <section className="hero-split hero-split--media-right dark" aria-labelledby="fighters-title">
        <div className="hero-split__media">
          <img src="/images/new-heroes/fighter-hero-2.png" alt="Two fighters standing together in the training cage" fetchPriority="high" />
        </div>
        <div className="hero-split__text">
          <span className="eyebrow">Fighters</span>
          <h1 id="fighters-title">{profiles.title}</h1>
          <p className="lede muted">{profiles.description}</p>
        </div>
      </section>

      {/* 2. Iron Will Profiles — three voices */}
      <section className="section surface-light" aria-label="Fighter stories">
        <div className="container voices">
          {fighters.map((f, i) => (
            <figure key={f.name} className="voice">
              <img src={f.image} alt={`Portrait of ${f.name}`} className="voice__portrait" loading={i === 0 ? 'eager' : 'lazy'} />
              <blockquote className="voice__quote">
                <p className="display">{f.quote}</p>
              </blockquote>
              <figcaption className="voice__cite">
                <span className="voice__name">{f.name}</span>
                <span className="muted">{f.title}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* 3. Forged in Fire — bridge from testimony to coaching */}
      <section className="section surface-gradient-dark dark bridge" aria-labelledby="bridge-title">
        <div className="container bridge__grid">
          <div>
            <span className="eyebrow">{forgedInFireFighters.subtitle}</span>
            <h2 id="bridge-title">{forgedInFireFighters.title}</h2>
          </div>
          <p className="lede">{forgedInFireFighters.body}</p>
        </div>
      </section>

      {/* 4. Hardened Leaders */}
      <section className="section surface-light" aria-labelledby="leaders-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Coaching</span>
            <h2 id="leaders-title">{leadersSection.title}</h2>
          </div>
          <div className="leaders">
            {leaders.map((l) => (
              <article key={l.name} className="leader">
                <img src={l.image} alt={`Portrait of ${l.name}`} className="leader__portrait" loading="lazy" />
                <div className="leader__text">
                  <h3>{l.name}</h3>
                  <p className="eyebrow leader__role">{l.role}</p>
                  <p>{l.bio}</p>
                  <ul role="list" className="details">
                    {l.credentials.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Invitation */}
      <section className="section surface-gradient-light cta-band" aria-labelledby="invite-title">
        <div className="container stack">
          <h2 id="invite-title">{fightersInvitation.title}</h2>
          <p className="lede">{fightersInvitation.body}</p>
          <div className="cluster">
            <Button to={fightersInvitation.primary.to} variant="accent" size="lg">
              {fightersInvitation.primary.label}
            </Button>
            <Button to={fightersInvitation.secondary.to} variant="ghost">
              {fightersInvitation.secondary.label}
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
