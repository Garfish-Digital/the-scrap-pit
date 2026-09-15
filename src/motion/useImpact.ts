import { useEffect, type RefObject } from 'react'
import { gsap, reducedMotion } from './gsap'

// Control language — "Impact" — for the live Button.
// Static: solid fill. Hover/focus: ghost white slams in from the left (60 ms)
// and holds; leave retracts it to the right (150 ms). Press: 60 ms ghost-white
// flash, 1 px drop, 1 px ring expands and fades; release settles back.out(2).
export function useImpact(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const white = el.querySelector<HTMLElement>('.btn__white')
    const flash = el.querySelector<HTMLElement>('.btn__flash')
    const ring = el.querySelector<HTMLElement>('.btn__ring')
    if (!white || !flash || !ring) return
    if (reducedMotion()) {
      // plain, instant hover state
      const on = () => el.classList.add('is-hover')
      const off = () => el.classList.remove('is-hover')
      el.addEventListener('pointerenter', on)
      el.addEventListener('pointerleave', off)
      el.addEventListener('focus', on)
      el.addEventListener('blur', off)
      gsap.set(white, { scaleX: 1 })
      el.classList.add('is-reduced')
      return () => {
        el.removeEventListener('pointerenter', on)
        el.removeEventListener('pointerleave', off)
        el.removeEventListener('focus', on)
        el.removeEventListener('blur', off)
      }
    }

    const ctx = gsap.context(() => {
      gsap.set(white, { scaleX: 0, transformOrigin: 'left center' })
      const enter = () => {
        gsap.killTweensOf(white)
        gsap.set(white, { transformOrigin: 'left center' })
        gsap.to(white, { scaleX: 1, duration: 0.06, ease: 'none' })
        el.classList.add('is-hover')
      }
      const leave = () => {
        gsap.killTweensOf(white)
        gsap.set(white, { transformOrigin: 'right center' })
        gsap.to(white, { scaleX: 0, duration: 0.15, ease: 'power4.out' })
        el.classList.remove('is-hover')
      }
      const press = () => {
        gsap.killTweensOf([el, flash, ring])
        gsap
          .timeline()
          .set(flash, { opacity: 1 })
          .set(ring, { opacity: 1, scale: 1 })
          .to(el, { y: 1, duration: 0.06, ease: 'power4.in' }, 0)
          .to(flash, { opacity: 0, duration: 0.06 }, 0.06)
          .to(ring, { scale: 1.12, opacity: 0, duration: 0.3, ease: 'power3.out' }, 0)
      }
      const release = () => gsap.to(el, { y: 0, duration: 0.2, ease: 'back.out(2)' })
      const onLeave = () => {
        leave()
        release()
      }
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === ' ' || e.key === 'Enter') press()
      }
      el.addEventListener('pointerenter', enter)
      el.addEventListener('pointerleave', onLeave)
      el.addEventListener('focus', enter)
      el.addEventListener('blur', leave)
      el.addEventListener('pointerdown', press)
      el.addEventListener('pointerup', release)
      el.addEventListener('keydown', onKeyDown)
      el.addEventListener('keyup', release)
      return () => {
        el.removeEventListener('pointerenter', enter)
        el.removeEventListener('pointerleave', onLeave)
        el.removeEventListener('focus', enter)
        el.removeEventListener('blur', leave)
        el.removeEventListener('pointerdown', press)
        el.removeEventListener('pointerup', release)
        el.removeEventListener('keydown', onKeyDown)
        el.removeEventListener('keyup', release)
      }
    }, el)
    return () => ctx.revert()
  }, [ref])
}
