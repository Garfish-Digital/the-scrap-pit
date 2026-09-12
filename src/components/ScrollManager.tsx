import { useEffect } from 'react'
import { useLocation } from 'react-router'

// Route changes return to the top. In-page links (`/training#pricing`) scroll
// to the target section once the new route has rendered.
export function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
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
  }, [pathname, hash])

  return null
}
