import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Image micro-interaction — "Cut & Slip" (revised September 14). Pointer
// devices: hover/focus slips the halves and snaps colour in. Touch devices
// (no hover): the same sequence plays from ScrollTrigger as the image crosses
// the middle band of the viewport, and reverses when it leaves — so phones
// get the effect by scrolling.
export function CutSlip() {
  const scope = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scope.current
    if (!el) return
    const mm = gsap.matchMedia()
    const cards = el.querySelectorAll<HTMLElement>('.slip')

    const slipOpen = (card: HTMLElement) => {
      const upper = card.querySelector<HTMLElement>('.slip__half--upper')!
      const lower = card.querySelector<HTMLElement>('.slip__half--lower')!
      const imgs = card.querySelectorAll<HTMLElement>('.slip__half img')
      const tl = gsap.timeline({ paused: true })
      tl.to(upper, { x: 8, y: -8, duration: 0.2, ease: 'power4.out' }, 0)
        .to(lower, { x: -8, y: 8, duration: 0.2, ease: 'power4.out' }, 0)
        .to(imgs, { filter: 'grayscale(0)', duration: 0.25, ease: 'power2.out' }, 0)
      return tl
    }
    const slipClose = (card: HTMLElement) => {
      const halves = card.querySelectorAll<HTMLElement>('.slip__half')
      const imgs = card.querySelectorAll<HTMLElement>('.slip__half img')
      gsap.killTweensOf([halves, imgs])
      gsap.to(halves, { x: 0, y: 0, duration: 0.35, ease: 'back.out(1.7)' })
      gsap.to(imgs, { filter: 'grayscale(1)', duration: 0.4, ease: 'power2.out' })
    }

    mm.add('(hover: hover)', () => {
      cards.forEach((card) => {
        const enter = () => { gsap.killTweensOf(card.querySelectorAll('*')); slipOpen(card).play() }
        const leave = () => slipClose(card)
        card.addEventListener('pointerenter', enter)
        card.addEventListener('pointerleave', leave)
        card.addEventListener('focus', enter)
        card.addEventListener('blur', leave)
        return () => {
          card.removeEventListener('pointerenter', enter)
          card.removeEventListener('pointerleave', leave)
          card.removeEventListener('focus', enter)
          card.removeEventListener('blur', leave)
        }
      })
    })

    mm.add('(hover: none)', () => {
      cards.forEach((card) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top 65%',
          end: 'bottom 35%',
          onEnter: () => slipOpen(card).play(),
          onEnterBack: () => slipOpen(card).play(),
          onLeave: () => slipClose(card),
          onLeaveBack: () => slipClose(card),
        })
      })
    })

    return () => mm.revert()
  }, [])

  const images = [
    ['/images/fighter-striking.webp', 'Striking'],
    ['/images/fighters-grappling.webp', 'Grappling'],
    ['/images/fighter-conditioning.webp', 'Conditioning'],
  ]

  return (
    <div className="proto" ref={scope}>
      <div className="slips">
        {images.map(([src, label]) => (
          <a key={label} href="#" className="slip" onClick={(e) => e.preventDefault()}>
            <span className="slip__frame">
              <span className="slip__half slip__half--upper">
                <img src={src} alt="" />
              </span>
              <span className="slip__half slip__half--lower">
                <img src={src} alt="" />
              </span>
            </span>
            <span className="slip__label display">{label}</span>
          </a>
        ))}
      </div>
      <p className="proto__hint muted">Pointer: hover or focus a card. Touch: scroll the card through the middle of the screen.</p>
    </div>
  )
}
