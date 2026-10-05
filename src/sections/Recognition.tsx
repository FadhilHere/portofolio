import { useRef } from 'react'
import { gsap, reducedMotion, useGSAP } from '../lib/motion'
import { achievements, organizations } from '../data/resume'
import { SectionHeading } from '../components/SectionHeading'
import { SectionShell } from '../components/SectionShell'
import { Sticker } from '../components/Sticker'

export function Recognition() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (reducedMotion) return
      gsap.utils.toArray<HTMLElement>('[data-award]').forEach((row) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 85%' } })
        tl.from(row.querySelector('[data-award-line]'), { scaleX: 0, duration: 1.2, ease: 'expo.inOut' })
          .from(row.querySelector('[data-award-year]'), { yPercent: 110, duration: 1, ease: 'expo.out' }, 0.2)
          .from(row.querySelectorAll('[data-award-text] > *'), { y: 24, autoAlpha: 0, duration: 0.9, ease: 'expo.out', stagger: 0.06 }, 0.3)
      })
      gsap.from('[data-org]', {
        y: 100,
        rotate: (i) => (i % 2 ? 5 : -5),
        autoAlpha: 0,
        duration: 1.1,
        ease: 'back.out(1.4)',
        stagger: 0.12,
        scrollTrigger: { trigger: '[data-orgs]', start: 'top 85%' },
      })
    },
    { scope: root },
  )

  return (
    <SectionShell id="recognition" bg="var(--color-peach)" prev="var(--color-mint)" curtain="split">
      <div ref={root} className="container-x py-[16vh]">
        <SectionHeading
          index="04"
          label="Recognition"
          stickerBg="var(--color-lavender)"
          title={
            <>
              Recognised <span className="text-indigo">along the way.</span>
            </>
          }
        />

        <ul className="mt-16">
          {achievements.map((a) => (
            <li key={a.title} data-award className="group relative">
              <span data-award-line className="absolute inset-x-0 top-0 h-[3px] origin-left bg-ink" aria-hidden="true" />
              <span
                className="absolute inset-0 origin-left scale-x-0 bg-cream transition-transform duration-500 ease-out-expo group-hover:scale-x-100"
                aria-hidden="true"
              />
              <div className="relative grid gap-4 px-2 py-8 md:grid-cols-12 md:items-baseline md:gap-8">
                <div className="overflow-hidden md:col-span-2">
                  <span
                    data-award-year
                    className="display block text-6xl transition-colors duration-300 group-hover:text-indigo"
                  >
                    {a.year}
                  </span>
                </div>
                <div data-award-text className="md:col-span-5">
                  <h3 className="text-xl font-extrabold tracking-tight md:text-2xl">{a.title}</h3>
                  <p className="mt-1 text-sm font-bold text-muted">{a.org}</p>
                </div>
                <div data-award-text className="md:col-span-5">
                  <p className="leading-relaxed font-medium">{a.detail}</p>
                  {a.link && (
                    <a
                      href={a.link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-block text-sm font-bold break-all text-indigo underline decoration-2 underline-offset-4 hover:text-tomato"
                    >
                      {a.link.label} ↗
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
          <li className="h-[3px] bg-ink" aria-hidden="true" />
        </ul>

        <div className="mt-28">
          <Sticker bg="var(--color-butter)" tilt={-2}>
            Leadership & community
          </Sticker>
          <div data-orgs className="mt-8 grid gap-6 md:grid-cols-2">
            {organizations.map((o) => (
              <article key={o.title} data-org className="card p-7 md:p-8">
                <p className="text-sm font-extrabold text-indigo">{o.period}</p>
                <h3 className="display mt-3 text-4xl leading-[0.95]!">{o.title}</h3>
                <p className="mt-2 text-sm font-bold text-muted">{o.org}</p>
                <ul className="mt-6 space-y-3">
                  {o.points.map((pt) => (
                    <li key={pt} className="flex gap-3 leading-relaxed font-medium">
                      <span className="mt-[0.55em] size-2 shrink-0 rotate-45 bg-tomato outline-2 outline-ink" aria-hidden="true" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
