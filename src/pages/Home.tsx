import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router'
import { Button } from '../components/Button'
import { PageMeta } from '../components/PageMeta'
import { PitBrackets } from '../components/PitBrackets'
import { SlipImage } from '../components/SlipImage'
import { becomeScrappyHome, forgedInFireHome, hero, trainingGateway } from '../content/home'
import { disciplines } from '../content/training'
import { gsap, reducedMotion } from '../motion/gsap'
import { heroWeighIn, setHeroHidden, type HeroParts } from '../motion/heroWeighIn'
import { useReveal } from '../motion/useReveal'
import './Home.css'

const TITLE_LINES = hero.title.split(' ')

export function Home() {
  const heroRef = useRef<HTMLElement>(null)
  const parts = useRef<HeroParts | null>(null)

  // Collect the hero's moving parts and hide them before first paint, so the
  // Weigh-in starts from a clean slate the moment the overlay reveals the page.
  useLayoutEffect(() => {
    const el = heroRef.current
    if (!el || reducedMotion()) return
    const q = (sel: string) => el.querySelector<HTMLElement>(sel)!
    parts.current = {
      img: q('.home-hero__media img'),
      bracketTL: q('.pit-brackets__tl'),
      bracketBR: q('.pit-brackets__br'),
      lines: Array.from(el.querySelectorAll<HTMLElement>('.home-hero__line')),
      subtitle: q('.home-hero__subtitle'),
      cta: q('.home-hero__cta'),
      ctaLabel: q('.home-hero__cta .btn__label'),
    }
    const ctx = gsap.context(() => setHeroHidden(parts.current!), el)
    return () => {
      ctx.revert()
      parts.current = null
    }
  }, [])

  useReveal(() => {
    if (parts.current) heroWeighIn(parts.current)
  })

  return (
    <>
      <PageMeta />

      {/* 1. Entrance — the Weigh-in */}
      <section ref={heroRef} className="home-hero dark" aria-labelledby="home-title">
        <div className="home-hero__media">
          <img src={hero.image} alt="Two fighters mid-exchange inside the Scrap Pit cage" fetchPriority="high" />
          <PitBrackets />
        </div>
        <div className="container home-hero__text">
          <h1 id="home-title" className="home-hero__title" aria-label={hero.title}>
            {TITLE_LINES.map((word) => (
              <span key={word} className="home-hero__mask" aria-hidden="true">
                <span className="home-hero__line">{word}</span>
              </span>
            ))}
          </h1>
          <p className="home-hero__subtitle display">{hero.subtitle}</p>
          <div className="cluster">
            <Button to={hero.primary.to} variant="accent" size="lg" className="home-hero__cta">
              {hero.primary.label}
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Training gateway */}
      <section className="section surface-light" aria-labelledby="gateway-title" data-round>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{trainingGateway.eyebrow}</span>
            <h2 id="gateway-title">{trainingGateway.title}</h2>
          </div>
          <ul role="list" className="gateway" data-rise>
            {disciplines.map((d, i) => (
              <li key={d.id} className="gateway__item">
                <Link to={`/training#${d.id}`} className="gateway__link">
                  <span className="gateway__index">0{i + 1}</span>
                  <SlipImage src={d.image} alt="" ratio="4 / 3" />
                  <span className="gateway__title display">{d.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="gateway__more" data-rise>
            <Button to={trainingGateway.cta.to} variant="victory">
              {trainingGateway.cta.label}
            </Button>
          </div>
        </div>
      </section>

      {/* 3. Forged in Fire — compact manifesto */}
      <section className="section surface-light manifesto" aria-labelledby="manifesto-title" data-round>
        <div className="container manifesto__grid">
          <div data-rope>
            <span className="eyebrow">{forgedInFireHome.subtitle}</span>
            <h2 id="manifesto-title">{forgedInFireHome.title}</h2>
          </div>
          <div className="stack">
            <p className="lede" data-slam>{forgedInFireHome.body}</p>
            <div className="cluster" data-rise>
              <Button to={forgedInFireHome.cta.to} variant="primary">
                {forgedInFireHome.cta.label}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Become Scrappy */}
      <section className="section surface-gradient-light cta-band" aria-labelledby="scrappy-title" data-round>
        <div className="container stack">
          <h2 id="scrappy-title" className="display">
            {becomeScrappyHome.title}
          </h2>
          <p className="cta-band__subtitle display" data-slam>{becomeScrappyHome.subtitle}</p>
          <p className="lede" data-slam>{becomeScrappyHome.body}</p>
          <ul role="list" className="details" style={{ justifyContent: 'center' }} data-rise>
            {becomeScrappyHome.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <div className="cluster" data-rise>
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
