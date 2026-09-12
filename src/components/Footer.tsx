import { Link } from 'react-router'
import { routes, site } from '../content/site'
import './Footer.css'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer dark">
      <div className="container footer__grid">
        <div className="footer__brand">
          <p className="display footer__wordmark">{site.name}</p>
          <p className="muted">{site.footerLine}</p>
        </div>

        <nav aria-label="Footer">
          <ul role="list" className="footer__links">
            {routes.map((r) => (
              <li key={r.path}>
                <Link to={r.path} className="footer__link">
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="footer__address">
          {site.address.street}
          <br />
          {site.address.city}, {site.address.state} {site.address.zip}
          <br />
          <a href={site.phoneHref}>{site.phoneDisplay}</a>
          <br />
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </address>
      </div>

      <div className="container footer__bottom">
        <hr className="rule" />
        <p className="muted footer__copy">
          &copy; {year} {site.name}. All rights reserved. Demo site — details are fictional.
        </p>
      </div>
    </footer>
  )
}
