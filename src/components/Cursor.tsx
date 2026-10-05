import { useRef } from 'react'
import { finePointer, gsap, reducedMotion, useGSAP } from '../lib/motion'

const INTERACTIVE = 'a, button, [data-cursor]'

function CursorFollower() {
  const ring = useRef<HTMLDivElement>(null)
  const dot = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const ringX = gsap.quickTo(ring.current, 'x', { duration: 0.5, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring.current, 'y', { duration: 0.5, ease: 'power3.out' })
    const dotX = gsap.quickTo(dot.current, 'x', { duration: 0.12, ease: 'power3.out' })
    const dotY = gsap.quickTo(dot.current, 'y', { duration: 0.12, ease: 'power3.out' })
    gsap.set([ring.current, dot.current], { xPercent: -50, yPercent: -50, autoAlpha: 0 })

    let shown = false
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      if (!shown) {
        shown = true
        gsap.set([ring.current, dot.current], { x: e.clientX, y: e.clientY })
        gsap.to([ring.current, dot.current], { autoAlpha: 1, duration: 0.3 })
      }
      ringX(e.clientX)
      ringY(e.clientY)
      dotX(e.clientX)
      dotY(e.clientY)
    }
    const over = (e: PointerEvent) => {
      const hit = (e.target as Element | null)?.closest?.(INTERACTIVE)
      gsap.to(ring.current, {
        scale: hit ? 1.9 : 1,
        backgroundColor: hit ? 'rgba(255,91,46,0.25)' : 'rgba(255,91,46,0)',
        borderColor: hit ? 'rgba(26,24,48,1)' : 'rgba(26,24,48,0.6)',
        duration: 0.35,
        ease: 'power3.out',
      })
    }
    const leave = () => {
      shown = false
      gsap.to([ring.current, dot.current], { autoAlpha: 0, duration: 0.3 })
    }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  })

  return (
    <>
      <div
        ref={ring}
        className="pointer-events-none fixed top-0 left-0 z-[90] size-9 rounded-full border-2 border-ink/60"
        aria-hidden="true"
      />
      <div ref={dot} className="pointer-events-none fixed top-0 left-0 z-[90] size-2 rounded-full bg-tomato" aria-hidden="true" />
    </>
  )
}

/** Trailing ring + dot for mouse users. The native cursor stays visible. */
export function Cursor() {
  if (!finePointer || reducedMotion) return null
  return <CursorFollower />
}
