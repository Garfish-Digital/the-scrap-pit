import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { emit, gsap, PIT_EVENTS, reducedMotion } from './gsap'
import { BOOT_VOID, CUT_VOID, INK_CLOSED, OPEN_VOID, RED_CLOSED, inkBracket, redBracket } from './pit-geometry'
import './pit-overlay.css'

const BOOT_KEY = 'pit:booted'

// Page-altitude motion: the once-per-session preloader and the Cut between
// routes. One fixed overlay square (side = max(vw, vh)) holds two pieces —
// Red 600 above the rising diagonal, Ink below — moved by their wrappers and
// shaped by clip-path. A drop-shadow on each unclipped wrapper draws a
// ghost-white edge along the cut so the tear reads over any content.
export function PitOverlay() {
  const root = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const location = useLocation()
  const locationRef = useRef(location)
  const navigateRef = useRef(navigate)
  const busy = useRef(false)

  // react-router hands out a new `navigate` per location; keep the latest in
  // refs so the sequence effect below runs exactly once.
  useEffect(() => {
    locationRef.current = location
    navigateRef.current = navigate
  }, [location, navigate])

  useEffect(() => {
    const el = root.current
    if (!el) return
    const red = el.querySelector<HTMLElement>('.pit-overlay__red')!
    const ink = el.querySelector<HTMLElement>('.pit-overlay__ink')!
    const redWrap = red.parentElement!
    const inkWrap = ink.parentElement!

    const park = () => {
      gsap.set(redWrap, { xPercent: -110, yPercent: -110 })
      gsap.set(inkWrap, { xPercent: 110, yPercent: 110 })
      el.classList.remove('is-active')
      document.documentElement.classList.remove('is-booting')
      busy.current = false
    }

    // ---- Preloader: once per session ----
    // index.html paints the closed overlay (html.is-booting) before React runs,
    // so the page is never seen before the mark forms.
    const booting = document.documentElement.classList.contains('is-booting')
    if (!booting || reducedMotion()) {
      park()
      queueMicrotask(() => emit(PIT_EVENTS.boot))
    } else {
      sessionStorage.setItem(BOOT_KEY, '1')
      busy.current = true
      el.classList.add('is-active')
      gsap.set(red, { clipPath: RED_CLOSED })
      gsap.set(ink, { clipPath: INK_CLOSED })
      gsap.set([redWrap, inkWrap], { xPercent: 0, yPercent: 0 })
      gsap
        .timeline({ onComplete: park })
        // HIT — the mark forms: the void punches open
        .to(red, { clipPath: redBracket(...BOOT_VOID), duration: 0.25, ease: 'power4.out' }, 0.35)
        .to(ink, { clipPath: inkBracket(...BOOT_VOID), duration: 0.25, ease: 'power4.out' }, '<')
        // hold — the site glimpsed through the void
        .to({}, { duration: 0.4 })
        // SETTLE — the void swallows the viewport
        .call(() => emit(PIT_EVENTS.boot))
        .to(red, { clipPath: redBracket(...OPEN_VOID), duration: 0.9, ease: 'expo.inOut' })
        .to(ink, { clipPath: inkBracket(...OPEN_VOID), duration: 0.9, ease: 'expo.inOut' }, '<')
    }

    // ---- The Cut: intercept internal navigation ----
    const cutTo = (to: string) => {
      if (busy.current) return
      busy.current = true
      el.classList.add('is-active')
      gsap.set(red, { clipPath: RED_CLOSED })
      gsap.set(ink, { clipPath: INK_CLOSED })
      gsap.set(redWrap, { xPercent: -100, yPercent: -100 })
      gsap.set(inkWrap, { xPercent: 100, yPercent: 100 })
      gsap
        .timeline({ onComplete: park })
        // HIT — converge
        .to([redWrap, inkWrap], { xPercent: 0, yPercent: 0, duration: 0.45, ease: 'power3.in' })
        // route swaps behind the overlay
        .call(() => navigateRef.current(to))
        .to({}, { duration: 0.06 })
        // HIT — the void punches open into the mark
        .to(red, { clipPath: redBracket(...CUT_VOID), duration: 0.22, ease: 'power4.out' })
        .to(ink, { clipPath: inkBracket(...CUT_VOID), duration: 0.22, ease: 'power4.out' }, '<')
        // hold
        .to({}, { duration: 0.12 })
        // SETTLE — brackets leave along the cut
        .call(() => emit(PIT_EVENTS.reveal))
        .to(redWrap, { xPercent: -110, yPercent: -110, duration: 0.8, ease: 'expo.out' })
        .to(inkWrap, { xPercent: 110, yPercent: 110, duration: 0.8, ease: 'expo.out' }, '<')
    }

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!a || a.hasAttribute('download') || (a.target && a.target !== '_self')) return
      const url = new URL(a.href, window.location.href)
      if (url.origin !== window.location.origin) return
      const cur = locationRef.current
      // Same route (anchors, ?plan= on the same page): let the router handle it.
      if (url.pathname === cur.pathname && url.search === cur.search) return
      if (reducedMotion()) return // router navigates; ScrollManager handles the rest
      e.preventDefault()
      e.stopPropagation()
      cutTo(url.pathname + url.search + url.hash)
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  return (
    <div ref={root} className="pit-overlay" aria-hidden="true">
      <div className="pit-overlay__square">
        <div className="pit-overlay__wrap pit-overlay__wrap--red">
          <div className="pit-overlay__red" />
        </div>
        <div className="pit-overlay__wrap pit-overlay__wrap--ink">
          <div className="pit-overlay__ink" />
        </div>
      </div>
    </div>
  )
}
