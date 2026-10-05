import { useRef } from 'react'
import { gsap, reducedMotion, SplitText, useGSAP } from '../lib/motion'
import { education, spokenLanguages, stats } from '../data/resume'
import { SectionHeading } from '../components/SectionHeading'
import { SectionShell } from '../components/SectionShell'

const STATEMENT =
  "I'm a software engineer from Riau, Indonesia who owns the whole build — from the first requirements meeting to the production server. I've shipped systems for one of Indonesia's largest refineries, a national petroleum engineering association, and my own campus, often as the sole developer."

// Each stat card gets its own printed colour.
const CARD_STYLES = [
  'bg-cream',
  'bg-tomato',
  'bg-cream',
  'bg-indigo text-paper',
]

const format = (v: number, decimals: number) => v.toFixed(decimals)

export function About() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (reducedMotion) return

      // Statement lights up word by word as it scrolls through the viewport.
      SplitText.create('[data-statement]', {
        type: 'words',
        autoSplit: true,
        onSplit: (self) =>
          gsap.fromTo(
            self.words,
            { opacity: 0.18 },
            {
              opacity: 1,
              stagger: 0.1,
              ease: 'none',
              scrollTrigger: { trigger: '[data-statement]', start: 'top 78%', end: 'bottom 50%', scrub: true },
            },
          ),
      })

      gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
        const target = Number(el.dataset.count)
        const decimals = Number(el.dataset.decimals)
        const obj = { v: 0 }
        el.textContent = format(0, decimals)
        gsap.to(obj, {
          v: target,
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
          onUpdate: () => (el.textContent = format(obj.v, decimals)),
        })
      })

      // Cards get tossed onto the page at slightly different angles. Explicit
      // end values + clearProps guarantee they always land flat, whatever
      // happens mid-flight (refreshes, re-renders).
      gsap.fromTo(
        '[data-stat]',
        { y: 120, rotate: (i) => [-8, 6, -5, 9][i % 4], autoAlpha: 0 },
        {
          y: 0,
          rotate: 0,
          autoAlpha: 1,
          duration: 1.1,
          ease: 'back.out(1.4)',
          stagger: 0.1,
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: { trigger: '[data-stats]', start: 'top 85%', once: true },
        },
      )
      gsap.fromTo(
        '[data-edu]',
        { y: 60, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: 'expo.out',
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: { trigger: '[data-edu]', start: 'top 90%', once: true },
        },
      )
    },
    { scope: root },
  )

  return (
    <SectionShell id="about" bg="var(--color-lavender)" prev="var(--color-paper)" curtain="split">
      <div ref={root} className="container-x py-[16vh]">
        <SectionHeading
          index="01"
          label="About"
          title={
            <>
              Engineer of the <span className="text-indigo">whole build.</span>
            </>
          }
        />

        <p
          data-statement
          className="mt-14 max-w-5xl text-[clamp(1.4rem,2.9vw,2.6rem)] leading-[1.25] font-bold tracking-[-0.02em] md:ml-[8%]"
        >
          {STATEMENT}
        </p>

        <div data-stats className="mt-24 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            // GSAP animates the outer element; the CSS hover lift lives on the
            // inner one so the two never fight over the same transform.
            <div key={s.label} data-stat>
              <div
                className={`card flex h-full flex-col justify-between gap-10 p-6 transition-transform duration-300 hover:-translate-y-1.5 ${CARD_STYLES[i % 4]}`}
              >
                <span className="text-xs font-extrabold tracking-[0.08em] uppercase opacity-80">{s.note}</span>
                <div>
                  <div className="display text-7xl tabular-nums">
                    <span data-count={s.value} data-decimals={s.decimals}>
                      {format(s.value, s.decimals)}
                    </span>
                    {s.suffix}
                  </div>
                  <p className="mt-2 text-sm font-semibold">{s.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div data-edu className="card mt-8 grid gap-6 p-7 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <p className="text-xs font-extrabold tracking-[0.08em] text-muted uppercase">Education</p>
            <p className="display mt-2 text-4xl">{education.school}</p>
            <p className="mt-1 font-semibold text-muted">{education.degree}</p>
          </div>
          <div className="md:col-span-3">
            <p className="text-xs font-extrabold tracking-[0.08em] text-muted uppercase">Period</p>
            <p className="mt-2 font-bold">{education.period}</p>
          </div>
          <div className="md:col-span-4">
            <p className="text-xs font-extrabold tracking-[0.08em] text-muted uppercase">Languages</p>
            <ul className="mt-2 space-y-1 font-bold">
              {spokenLanguages.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
