import { useRef } from 'react'
import { gsap, reducedMotion, useGSAP } from '../lib/motion'
import { experience } from '../data/resume'
import { SectionHeading } from '../components/SectionHeading'
import { SectionShell } from '../components/SectionShell'
import { Sticker } from '../components/Sticker'

export function Experience() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (reducedMotion) return

      // The timeline spine fills as you read down it.
      gsap.fromTo(
        '[data-spine]',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: '[data-timeline]', start: 'top 70%', end: 'bottom 70%', scrub: 0.4 },
        },
      )

      gsap.utils.toArray<HTMLElement>('[data-role]').forEach((role) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: role, start: 'top 78%' } })
        tl.from(role.querySelector('[data-node]'), { scale: 0, duration: 0.6, ease: 'back.out(3)' })
          .from(role.querySelectorAll('[data-role-head] > *'), { x: -50, autoAlpha: 0, duration: 1, ease: 'expo.out', stagger: 0.07 }, 0)
          .from(role.querySelector('[data-role-body]'), { y: 70, rotate: 2, autoAlpha: 0, duration: 1.1, ease: 'expo.out' }, 0.1)
      })
    },
    { scope: root },
  )

  return (
    <SectionShell id="experience" bg="var(--color-butter)" prev="var(--color-lavender)" curtain="blinds">
      <div ref={root} className="container-x py-[16vh]">
        <SectionHeading
          index="02"
          label="Experience"
          stickerBg="var(--color-sky)"
          title={
            <>
              From refinery floors to <span className="text-indigo">production servers.</span>
            </>
          }
        />

        <ol data-timeline className="relative mt-20">
          <span className="absolute top-0 bottom-0 left-[8px] w-[3px] rounded-full bg-ink/15" aria-hidden="true" />
          <span
            data-spine
            className="absolute top-0 bottom-0 left-[8px] w-[3px] origin-top rounded-full bg-indigo"
            aria-hidden="true"
          />

          {experience.map((job) => (
            <li key={job.company} data-role className="relative grid gap-6 pb-20 pl-12 last:pb-0 lg:grid-cols-12 lg:gap-10">
              <span
                data-node
                className="absolute top-1.5 left-0 grid size-[19px] place-items-center rounded-full border-[3px] border-ink bg-tomato"
                aria-hidden="true"
              />

              <div data-role-head className="lg:sticky lg:top-32 lg:col-span-4 lg:self-start">
                <span className="inline-block">
                  <Sticker tilt={-2}>{job.period}</Sticker>
                </span>
                <p className="display mt-5 text-[clamp(3rem,5.5vw,5rem)]">{job.short}</p>
                <p className="mt-2 font-bold text-muted">{job.role}</p>
              </div>

              <div data-role-body className="card p-6 md:p-8 lg:col-span-8">
                <h3 className="text-xl font-extrabold tracking-tight md:text-2xl">
                  {job.role} <span className="text-muted">at</span> {job.company}
                </h3>
                {job.context && <p className="mt-1 text-sm font-medium text-muted">{job.context}</p>}
                <ul className="mt-6 space-y-3">
                  {job.points.map((pt) => (
                    <li key={pt} className="flex gap-3 leading-relaxed font-medium">
                      <span className="mt-[0.55em] size-2 shrink-0 rotate-45 bg-tomato outline-2 outline-ink" aria-hidden="true" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap items-center gap-2">
                  {job.stack.map((s) => (
                    <span key={s} className="tag">
                      {s}
                    </span>
                  ))}
                  {job.link && (
                    <a
                      href={job.link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-auto font-bold text-indigo underline decoration-2 underline-offset-4 hover:text-tomato"
                    >
                      {job.link.label} ↗
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </SectionShell>
  )
}
