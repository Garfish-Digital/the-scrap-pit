import { useEffect, useRef } from 'react'
import { PIT_EVENTS } from './gsap'

// Runs `onReveal` once, the moment the page-altitude overlay starts revealing
// this route (`pit:boot` on first load, `pit:reveal` after the Cut). If neither
// arrives — back/forward navigation, or the overlay already parked — a short
// fallback fires it anyway so a scene never stays hidden. Pass `key` (e.g. the
// pathname) from long-lived components so the listener re-arms per route.
export function useReveal(onReveal: () => void, fallbackMs = 500, key: string = '') {
  const cb = useRef(onReveal)
  useEffect(() => {
    cb.current = onReveal
  })

  useEffect(() => {
    let done = false
    const fire = () => {
      if (done) return
      done = true
      cb.current()
    }
    window.addEventListener(PIT_EVENTS.boot, fire)
    window.addEventListener(PIT_EVENTS.reveal, fire)
    const t = window.setTimeout(fire, fallbackMs)
    return () => {
      window.removeEventListener(PIT_EVENTS.boot, fire)
      window.removeEventListener(PIT_EVENTS.reveal, fire)
      window.clearTimeout(t)
    }
  }, [fallbackMs, key])
}
