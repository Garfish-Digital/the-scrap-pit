import { useEffect, useId, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { routes, site } from '../content/site'
import './Header.css'

export function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const menuId = useId()

  // Close the mobile menu whenever the route changes (state derived during render).
  const [seenPath, setSeenPath] = useState(pathname)
  if (seenPath !== pathname) {
    setSeenPath(pathname)
    setOpen(false)
  }

  // Lock page scroll behind the full-screen menu and close on Escape.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className={`header ${open ? 'is-open' : ''}`}>
      <div className="container header__bar">
        {/* Placeholder wordmark until the Phase 2 logo direction is chosen. */}
        <Link to="/" className="header__brand display" aria-label={`${site.name} home`}>
          {site.name}
        </Link>

        <nav className="header__nav" aria-label="Primary">
          <ul role="list" className="header__links">
            {routes.map((r) => (
              <li key={r.path}>
                <NavLink to={r.path} end={'end' in r && r.end} className="header__link">
                  {r.label}
                </NavLink>
              </li>
            ))}
            {import.meta.env.DEV && (
              <li>
                <NavLink to="/studies" className="header__link header__link--dev">
                  Studies
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <button
          type="button"
          className="header__toggle"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="header__toggle-label">{open ? 'Close' : 'Menu'}</span>
          <span className="header__toggle-icon" aria-hidden="true" />
        </button>
      </div>

      <div id={menuId} className="header__menu" hidden={!open}>
        <nav aria-label="Primary, mobile">
          <ul role="list" className="header__menu-links">
            {routes.map((r, i) => (
              <li key={r.path}>
                <NavLink to={r.path} end={'end' in r && r.end} className="header__menu-link display">
                  <span className="header__menu-index">0{i + 1}</span>
                  {r.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <p className="header__menu-foot muted">{site.footerLine}</p>
      </div>
    </header>
  )
}
