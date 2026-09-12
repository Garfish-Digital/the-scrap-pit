import { useEffect } from 'react'
import { NavLink, Outlet } from 'react-router'
import { PageMeta } from '../components/PageMeta'
import { systems } from './systems'

// Wrapper for the Phase 2 studies. Loads the candidate typefaces from
// Google Fonts for evaluation; the winning faces get self-hosted in the app.
export function StudiesLayout() {
  useEffect(() => {
    const families = systems
      .map((s) => s.fonts)
      .filter(Boolean)
      .join('&family=')
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `https://fonts.googleapis.com/css2?family=${families}&display=swap`
    document.head.appendChild(link)
    return () => {
      link.remove()
    }
  }, [])

  return (
    <>
      <PageMeta title="Studies" />
      <nav className="container" aria-label="Studies" style={{ paddingTop: 'var(--space-4)' }}>
        <div className="cluster">
          <span className="eyebrow">Design process</span>
          {[
            ['type', 'Type'],
            ['color', 'Color'],
            ['logo', 'Logo'],
          ].map(([p, label]) => (
            <NavLink key={p} to={`/studies/${p}`} className="text-link">
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
      <Outlet />
    </>
  )
}
