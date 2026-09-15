import { useRef } from 'react'
import { Outlet, useLocation } from 'react-router'
import { PitOverlay } from '../motion/PitOverlay'
import { useRounds } from '../motion/useRounds'
import { useSlips } from '../motion/useSlips'
import { Footer } from './Footer'
import { Header } from './Header'
import { ScrollManager } from './ScrollManager'

export function Layout() {
  const main = useRef<HTMLElement>(null)
  const { pathname } = useLocation()
  // Section entrances for the mounted route; re-collected on every path change.
  useRounds(main, pathname)
  useSlips(main, pathname)

  return (
    <>
      <a href="#main" className="skip-link label">
        Skip to content
      </a>
      <ScrollManager />
      <Header />
      <main id="main" ref={main} tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <PitOverlay />
    </>
  )
}
