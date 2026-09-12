import { Button } from '../components/Button'
import { PageMeta } from '../components/PageMeta'

export function NotFound() {
  return (
    <>
      <PageMeta title="Not found" />
      <section className="hero-type surface-gradient-dark dark" aria-labelledby="nf-title">
        <div className="container stack">
          <span className="eyebrow">404</span>
          <h1 id="nf-title">Nothing in this corner</h1>
          <p className="lede muted">That page is not in the pit.</p>
          <div className="cluster">
            <Button to="/" variant="victory">
              Back to the entrance
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
