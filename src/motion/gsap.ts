import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

// Single GSAP entry for the live site. Plugins are registered here as they
// come into use so pages import from one place.
gsap.registerPlugin(ScrollTrigger, SplitText)

export { gsap, ScrollTrigger, SplitText }

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Events the page-altitude sequences emit so scene-altitude sequences (hero
// entrances, section reveals) can start on the right frame.
export const PIT_EVENTS = {
  /** The preloader's void is opening: the site is being revealed for the first time. */
  boot: 'pit:boot',
  /** The Cut's brackets are sliding off: the new route is being revealed. */
  reveal: 'pit:reveal',
} as const

export function emit(name: (typeof PIT_EVENTS)[keyof typeof PIT_EVENTS]) {
  window.dispatchEvent(new CustomEvent(name))
}
