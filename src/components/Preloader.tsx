import { useRef, useState } from 'react'
import { gsap, reducedMotion, useGSAP } from '../lib/motion'
import { lockScroll } from '../lib/scroll'
import { profile } from '../data/resume'

// Counts to 100 while fonts settle, then lifts away like a curtain.
// Calls onDone as the curtain starts moving so the hero can animate in under it.
export function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const count = useRef<HTMLSpanElement>(null)
  const [gone, setGone] = useState(false)

  useGSAP(
    () => {
      lockScroll(true)
      const finish = () => {
        lockScroll(false)
        setGone(true)
      }

      if (reducedMotion) {
        onDone()
        gsap.to(root.current, { autoAlpha: 0, duration: 0.3, onComplete: finish })
        return
      }

      const counter = { v: 0 }
      const tl = gsap.timeline({ paused: true })
      tl.to(counter, {
        v: 100,
        duration: 1.5,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(3, '0')
        },
      })
        .to('[data-pre-bar]', { scaleX: 1, duration: 1.5, ease: 'power2.inOut' }, 0)
        .from('[data-pre-word]', { yPercent: 110, duration: 0.8, ease: 'expo.out', stagger: 0.06 }, 0.1)
        .addLabel('exit')
        .to('[data-pre-inner]', { yPercent: -30, autoAlpha: 0, duration: 0.6, ease: 'power3.in' }, 'exit')
        .add(onDone, 'exit+=0.35')
        .to(root.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.0, ease: 'expo.inOut' }, 'exit+=0.2')
        .add(finish)

      // Never hold the page hostage: start once fonts are ready, or after 2.5s.
      let started = false
      let cancelled = false
      const start = () => {
        if (started || cancelled) return
        started = true
        tl.play()
      }
      document.fonts.ready.then(start)
      const fallback = setTimeout(start, 2500)
      return () => {
        cancelled = true
        clearTimeout(fallback)
      }
    },
    { scope: root },
  )

  if (gone) return null

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] bg-indigo text-paper"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      role="status"
      aria-label="Loading"
    >
      <div className="halftone pointer-events-none absolute top-0 right-0 h-1/2 w-1/2 text-paper/20" aria-hidden="true" />
      <div data-pre-inner className="container-x relative flex h-full flex-col justify-between py-8">
        <div className="flex justify-between text-sm font-extrabold tracking-[0.08em] uppercase">
          <span>{profile.name}</span>
          <span>Portfolio {new Date().getFullYear()}</span>
        </div>
        <div>
          <div className="flex flex-wrap gap-x-3 overflow-hidden text-[clamp(1.2rem,2.6vw,2.2rem)] font-extrabold text-paper/80">
            {['Requirements', '→', 'Design', '→', 'Code', '→', 'Production'].map((w, i) => (
              <span key={i} data-pre-word className="inline-block">
                {w}
              </span>
            ))}
          </div>
          <div className="mt-6 flex items-end justify-between gap-6">
            <div className="mb-[0.12em] h-3 flex-1 overflow-hidden rounded-full border-2 border-paper">
              <div data-pre-bar className="h-full origin-left scale-x-0 bg-tomato" />
            </div>
            <span ref={count} className="display text-[clamp(6rem,22vw,18rem)] leading-[0.8]! tabular-nums">
              000
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
