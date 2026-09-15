import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// Control language — "Impact". Static: solid fill. Hover: ghost white slams in
// from the left (a 60 ms hit) and holds; on leave it retracts to the right.
// Press: 60 ms flash, 1 px drop, shockwave ring; release settles with overshoot.
type Props = {
  variant?: 'accent' | 'ink' | 'victory'
  children: React.ReactNode
  className?: string
}

export function ImpactButton({ variant = 'accent', children, className = '' }: Props) {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const btn = ref.current
    if (!btn) return
    const ctx = gsap.context(() => {
      const white = btn.querySelector<HTMLElement>('.impact__white')!
      const flash = btn.querySelector<HTMLElement>('.impact__flash')!
      const ring = btn.querySelector<HTMLElement>('.impact__ring')!
      gsap.set(white, { scaleX: 0, transformOrigin: 'left center' })

      const enter = () => {
        gsap.killTweensOf(white)
        gsap.set(white, { transformOrigin: 'left center' })
        gsap.to(white, { scaleX: 1, duration: 0.06, ease: 'none' })
        btn.classList.add('is-hover')
      }
      const leave = () => {
        gsap.killTweensOf(white)
        gsap.set(white, { transformOrigin: 'right center' })
        gsap.to(white, { scaleX: 0, duration: 0.15, ease: 'power4.out' })
        btn.classList.remove('is-hover')
      }
      const press = () => {
        gsap.killTweensOf([btn, flash, ring])
        gsap.timeline()
          .set(flash, { opacity: 1 })
          .set(ring, { opacity: 1, scale: 1 })
          .to(btn, { y: 1, duration: 0.06, ease: 'power4.in' }, 0)
          .to(flash, { opacity: 0, duration: 0.06 }, 0.06)
          .to(ring, { scale: 1.12, opacity: 0, duration: 0.3, ease: 'power3.out' }, 0)
      }
      const release = () => {
        gsap.to(btn, { y: 0, duration: 0.2, ease: 'back.out(2)' })
      }
      btn.addEventListener('pointerenter', enter)
      btn.addEventListener('pointerleave', () => { leave(); release() })
      btn.addEventListener('focus', enter)
      btn.addEventListener('blur', leave)
      btn.addEventListener('pointerdown', press)
      btn.addEventListener('pointerup', release)
      btn.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') press() })
      btn.addEventListener('keyup', release)
    }, btn)
    return () => ctx.revert()
  }, [])

  return (
    <button ref={ref} type="button" className={`impact impact--${variant} ${className}`.trim()}>
      <span className="impact__white" />
      <span className="impact__flash" />
      <span className="impact__ring" />
      <span className="impact__label">{children}</span>
    </button>
  )
}
