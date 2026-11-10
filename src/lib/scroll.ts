import Lenis from 'lenis'
import { gsap, ScrollTrigger, reducedMotion } from './motion'

let lenis: Lenis | null = null

export function initSmoothScroll() {
  if (!reducedMotion) {
    lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 })
    // The preloader may have locked scrolling before Lenis existed.
    if (document.documentElement.classList.contains('is-locked')) lenis.stop()
    lenis.on('scroll', () => ScrollTrigger.update())
  }
  const raf = (time: number) => lenis?.raf(time * 1000)
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)

  return () => {
    gsap.ticker.remove(raf)
    lenis?.destroy()
    lenis = null
  }
}

export function scrollToTarget(target: string | HTMLElement | number) {
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) })
    return
  }
  if (typeof target === 'number') window.scrollTo({ top: target })
  else (typeof target === 'string' ? document.querySelector(target) : target)?.scrollIntoView()
}

export function lockScroll(locked: boolean) {
  document.documentElement.classList.toggle('is-locked', locked)
  if (locked) lenis?.stop()
  else lenis?.start()
}
