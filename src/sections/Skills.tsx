import { useRef } from 'react'
import { gsap, reducedMotion, ScrollTrigger, useGSAP } from '../lib/motion'
import { skills } from '../data/resume'
import { SectionHeading } from '../components/SectionHeading'
import { SectionShell } from '../components/SectionShell'
import { Sticker } from '../components/Sticker'

const all = skills.filter((g) => g.marquee !== false).flatMap((g) => g.items)
const half = Math.ceil(all.length / 2)

// Two printed tapes crossing each other like caution tape.
const TAPES = [
  { items: all.slice(0, half), className: 'bg-indigo text-paper -rotate-[3deg]', star: 'text-butter' },
  { items: all.slice(half), className: 'bg-tomato text-ink rotate-[2deg] -mt-6', star: 'text-paper' },
]

export function Skills() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (reducedMotion) return

      // Tapes run in opposite directions. Scrolling speeds them up and flips
      // their direction to follow the scroll.
      const tweens = gsap.utils.toArray<HTMLElement>('[data-marquee]').map((row, i) =>
        gsap.fromTo(
          row,
          { xPercent: i % 2 ? -50 : 0 },
          { xPercent: i % 2 ? 0 : -50, duration: 40, ease: 'none', repeat: -1 },
        ),
      )
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const dir = self.direction
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 250, 6)
          tweens.forEach((t) => {
            gsap.to(t, { timeScale: dir * boost, duration: 0.15, overwrite: true })
            gsap.to(t, { timeScale: dir, duration: 1.2, delay: 0.15, ease: 'power2.out' })
          })
        },
      })

      gsap.from('[data-tape]', {
        xPercent: (i) => (i % 2 ? 30 : -30),
        autoAlpha: 0,
        duration: 1.3,
        ease: 'expo.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '[data-tapes]', start: 'top 85%' },
      })
      gsap.from('[data-skill-group]', {
        y: 90,
        rotate: (i) => [-4, 3, -2, 4, -3, 2][i % 6],
        autoAlpha: 0,
        duration: 1.1,
        ease: 'back.out(1.4)',
        stagger: 0.08,
        scrollTrigger: { trigger: '[data-skill-grid]', start: 'top 85%' },
      })
    },
    { scope: root },
  )

  return (
    <SectionShell id="skills" bg="var(--color-sky)" prev="var(--color-peach)" curtain="blinds" className="overflow-x-clip">
      <div ref={root} className="py-[16vh]">
        <div className="container-x">
          <SectionHeading
            index="05"
            label="Toolkit"
            stickerBg="var(--color-mint)"
            title={
              <>
                Tools I <span className="text-indigo">reach for.</span>
              </>
            }
          />
        </div>

        <div data-tapes className="relative mt-20 -mx-[5vw] select-none" aria-hidden="true">
          {TAPES.map((tape, i) => (
            <div key={i} data-tape className={`relative flex overflow-hidden border-y-[3px] border-ink py-3 ${tape.className}`}>
              <div data-marquee className="flex shrink-0 items-center whitespace-nowrap">
                {[...tape.items, ...tape.items].map((s, k) => (
                  <span key={k} className="display flex items-center text-[clamp(2.6rem,6vw,5.2rem)] leading-none uppercase">
                    {s}
                    <span className={`mx-[0.4em] text-[0.5em] ${tape.star}`}>✸</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="container-x">
          <div data-skill-grid className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((g) => (
              <div key={g.group} data-skill-group className="card p-6">
                <Sticker bg="var(--color-butter)" tilt={-2}>
                  {g.group}
                </Sticker>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li key={s} className="tag bg-paper">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
