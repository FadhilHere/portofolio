import Lenis from 'lenis'
import { gsap, ScrollTrigger, reducedMotion } from './motion'

// Mutable state shared between the DOM (scroll, pointer) and the WebGL scene.
// Read inside useFrame — never put it in React state, it changes every frame.
export const sceneState = {
  ready: false,
  velocity: 0,
  pointer: { x: 0, y: 0, active: false },
}

let lenis: Lenis | null = null

export function initSmoothScroll() {
  if (!reducedMotion) {
    lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 })
    // The preloader may have locked scrolling before Lenis existed.
    if (document.documentElement.classList.contains('is-locked')) lenis.stop()
    lenis.on('scroll', (l: Lenis) => {
      sceneState.velocity = l.velocity
      ScrollTrigger.update()
    })
  }
  const raf = (time: number) => lenis?.raf(time * 1000)
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)

  const onPointer = (e: PointerEvent) => {
    sceneState.pointer.x = (e.clientX / window.innerWidth) * 2 - 1
    sceneState.pointer.y = -(e.clientY / window.innerHeight) * 2 + 1
    sceneState.pointer.active = e.pointerType === 'mouse'
  }
  const onLeave = () => (sceneState.pointer.active = false)
  window.addEventListener('pointermove', onPointer, { passive: true })
  document.documentElement.addEventListener('pointerleave', onLeave)

  return () => {
    gsap.ticker.remove(raf)
    window.removeEventListener('pointermove', onPointer)
    document.documentElement.removeEventListener('pointerleave', onLeave)
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

// Section order drives the 3D scene: every section id maps to one scene preset
// in three/scenes.ts. The float returned here is "which scene am I in", with the
// fractional part being the morph progress towards the next one.
export const SECTION_IDS = ['hero', 'about', 'experience', 'projects', 'recognition', 'skills', 'contact'] as const

let sectionTops: number[] = []

export function measureSections() {
  sectionTops = SECTION_IDS.map((id) => {
    const el = document.getElementById(id)
    return el ? el.getBoundingClientRect().top + window.scrollY : 0
  })
}

export function getSceneProgress(scrollY: number) {
  if (!sectionTops.length) measureSections()
  const vh = window.innerHeight
  let progress = 0
  for (let i = 1; i < sectionTops.length; i++) {
    // Morph while the next section travels from 85% to 25% of the viewport.
    const start = sectionTops[i] - vh * 0.85
    const end = sectionTops[i] - vh * 0.25
    progress += gsap.utils.clamp(0, 1, (scrollY - start) / (end - start))
  }
  return progress
}
