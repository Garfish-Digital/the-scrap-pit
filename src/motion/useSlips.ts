import { useEffect, type RefObject } from 'react'
import { gsap, reducedMotion, ScrollTrigger } from './gsap'

// Cut & Slip behaviour for every [data-slip] under `scope`. Pointer devices:
// hover/focus (on the nearest link, if any) opens, leave closes. Touch devices:
// a ScrollTrigger opens the image as it crosses the middle band of the viewport
// and closes it when it leaves, in either direction.

function open(card: HTMLElement) {
  const upper = card.querySelector<HTMLElement>('.slip__half--upper')!
  const lower = card.querySelector<HTMLElement>('.slip__half--lower')!
  const imgs = card.querySelectorAll<HTMLElement>('img')
  gsap.killTweensOf([upper, lower, imgs])
  gsap.to(upper, { x: 8, y: -8, duration: 0.2, ease: 'power4.out' })
  gsap.to(lower, { x: -8, y: 8, duration: 0.2, ease: 'power4.out' })
  gsap.to(imgs, { filter: 'grayscale(0)', duration: 0.25, ease: 'power2.out' })
}

function close(card: HTMLElement) {
  const halves = card.querySelectorAll<HTMLElement>('.slip__half')
  const imgs = card.querySelectorAll<HTMLElement>('img')
  gsap.killTweensOf([halves, imgs])
  gsap.to(halves, { x: 0, y: 0, duration: 0.35, ease: 'back.out(1.7)' })
  gsap.to(imgs, { filter: 'grayscale(1)', duration: 0.4, ease: 'power2.out' })
}

export function useSlips(scope: RefObject<HTMLElement | null>, routeKey: string) {
  useEffect(() => {
    const el = scope.current
    if (!el) return
    const cards = Array.from(el.querySelectorAll<HTMLElement>('[data-slip]'))
    if (cards.length === 0) return
    // The hover target is the enclosing link when there is one, so the whole
    // card (image + label) is the hit area.
    const targetOf = (card: HTMLElement) => (card.closest('a') as HTMLElement | null) ?? card

    if (reducedMotion()) {
      const offs = cards.map((card) => {
        const t = targetOf(card)
        const on = () => card.classList.add('is-open')
        const off = () => card.classList.remove('is-open')
        t.addEventListener('pointerenter', on)
        t.addEventListener('pointerleave', off)
        t.addEventListener('focus', on)
        t.addEventListener('blur', off)
        return () => {
          t.removeEventListener('pointerenter', on)
          t.removeEventListener('pointerleave', off)
          t.removeEventListener('focus', on)
          t.removeEventListener('blur', off)
        }
      })
      return () => offs.forEach((f) => f())
    }

    const mm = gsap.matchMedia()
    mm.add('(hover: hover)', () => {
      const offs = cards.map((card) => {
        const t = targetOf(card)
        const on = () => open(card)
        const off = () => close(card)
        t.addEventListener('pointerenter', on)
        t.addEventListener('pointerleave', off)
        t.addEventListener('focus', on)
        t.addEventListener('blur', off)
        return () => {
          t.removeEventListener('pointerenter', on)
          t.removeEventListener('pointerleave', off)
          t.removeEventListener('focus', on)
          t.removeEventListener('blur', off)
        }
      })
      return () => offs.forEach((f) => f())
    })
    mm.add('(hover: none)', () => {
      cards.forEach((card) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top 65%',
          end: 'bottom 35%',
          onEnter: () => open(card),
          onEnterBack: () => open(card),
          onLeave: () => close(card),
          onLeaveBack: () => close(card),
        })
      })
    })
    return () => mm.revert()
  }, [scope, routeKey])
}
