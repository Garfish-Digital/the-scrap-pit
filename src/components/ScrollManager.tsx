import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router'

// Route changes return to the top. In-page links (`/training#pricing`) scroll
// to the target section once the new route has rendered. Back/forward (POP)
// is left to the browser so the previous scroll position is restored.
export function ScrollManager() {
  const { pathname, hash } = useLocation()
  const navType = useNavigationType()

  useEffect(() => {
    if (navType === 'POP' && !hash) return
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      return
    }

    const id = decodeURIComponent(hash.slice(1))
    // Defer one frame so the target route has mounted.
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(id)
      if (target) {
        target.scrollIntoView({ block: 'start', behavior: 'instant' })
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash, navType])

  return null
}
