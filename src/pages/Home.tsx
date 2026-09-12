import { Link } from 'react-router'
import { Button } from '../components/Button'
import { PageMeta } from '../components/PageMeta'
import { becomeScrappyHome, forgedInFireHome, hero, trainingGateway } from '../content/home'
import { disciplines } from '../content/training'
import './Home.css'

export function Home() {
  return (
    <>
      <PageMeta />

      {/* 1. Entrance */}
      <section className="home-hero dark" aria-labelledby="home-title">
        <div className="home-hero__media">
          <img src={hero.image} alt="Two fighters mid-exchange inside the Scrap Pit cage" fetchPriority="high" />
        </div>
        <div className="container home-hero__text">
          <h1 id="home-title" className="home-hero__title">
            {hero.title}
          </h1>
          <p className="home-hero__subtitle display">{hero.subtitle}</p>
          <div className="cluster">
            <Button to={hero.primary.to} variant="accent" size="lg">
              {hero.primary.label}
            </Button>
            <Link to={hero.secondary.to} className="text-link">
              {hero.secondary.label}
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Training gateway */}
      <section className="section surface-light" aria-labelledby="gateway-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{trainingGateway.eyebrow}</span>
            <h2 id="gateway-title">{trainingGateway.title}</h2>
          </div>
          <ul role="list" className="gateway">
            {disciplines.map((d, i) => (
              <li key={d.id} className="gateway__item">
                <Link to={`/training#${d.id}`} className="gateway__link">
                  <span className="gateway__index">0{i + 1}</span>
                  <img src={d.image} alt="" loading="lazy" />
                  <span className="gateway__title display">{d.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="gateway__more">
            <Link to="/training" className="text-link">
              {trainingGateway.linkLabel}
            </Link>
          </p>
        </div>
      </section>

      {/* 3. Forged in Fire — compact manifesto */}
      <section className="section surface-light manifesto" aria-labelledby="manifesto-title">
        <div className="container manifesto__grid">
          <div>
            <span className="eyebrow">{forgedInFireHome.subtitle}</span>
            <h2 id="manifesto-title">{forgedInFireHome.title}</h2>
          </div>
          <div className="stack">
            <p className="lede">{forgedInFireHome.body}</p>
            <p>
              <Link to="/about" className="text-link">
                {forgedInFireHome.linkLabel}
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* 4. Become Scrappy */}
      <section className="section surface-gradient-light cta-band" aria-labelledby="scrappy-title">
        <div className="container stack">
          <h2 id="scrappy-title" className="display" style={{ fontSize: 'var(--text-2xl)' }}>
            {becomeScrappyHome.title}
          </h2>
          <p className="cta-band__subtitle display">{becomeScrappyHome.subtitle}</p>
          <p className="lede">{becomeScrappyHome.body}</p>
          <ul role="list" className="details" style={{ justifyContent: 'center' }}>
            {becomeScrappyHome.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <div className="cluster">
            <Button to={becomeScrappyHome.primary.to} variant="accent" size="lg">
              {becomeScrappyHome.primary.label}
            </Button>
            <Button to={becomeScrappyHome.secondary.to} variant="victory">
              {becomeScrappyHome.secondary.label}
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
