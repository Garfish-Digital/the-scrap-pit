import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

// Builds a GSAP timeline inside a context scoped to `scope`, plays it on mount,
// and exposes a replay. The context reverts on unmount (StrictMode-safe).
export function useReplay(
  scope: React.RefObject<HTMLElement | null>,
  build: (tl: gsap.core.Timeline, el: HTMLElement) => void,
) {
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const buildRef = useRef(build)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    buildRef.current = build
  })

  useEffect(() => {
    const el = scope.current
    if (!el) return
    let ctx: gsap.Context | undefined
    let cancelled = false
    document.fonts.ready.then(() => {
      if (cancelled) return
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ paused: true })
        buildRef.current(tl, el)
        tlRef.current = tl
        tl.play()
      }, el)
      setReady(true)
    })
    return () => {
      cancelled = true
      ctx?.revert()
      tlRef.current = null
    }
  }, [scope])

  const replay = useCallback(() => {
    tlRef.current?.restart()
  }, [])

  return { replay, ready }
}
