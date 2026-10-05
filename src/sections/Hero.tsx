import { useRef } from 'react'
import { finePointer, gsap, reducedMotion, useGSAP } from '../lib/motion'
import { scrollToTarget } from '../lib/scroll'
import { profile } from '../data/resume'
import { Magnetic } from '../components/Magnetic'
import { Sticker } from '../components/Sticker'
import { ScrollBadge } from '../components/ScrollBadge'
import { SectionShell } from '../components/SectionShell'

function Letters({ text }: { text: string }) {
  return text.split('').map((ch, i) => (
    <span key={i} data-char className="inline-block">
      {ch}
    </span>
  ))
}

function RotatingWord({ words }: { words: string[] }) {
  const root = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      if (reducedMotion) return
      const items = gsap.utils.toArray<HTMLElement>('[data-word]')
      gsap.set(items, { yPercent: 110 })
      gsap.set(items[0], { yPercent: 0 })
      const tl = gsap.timeline({ repeat: -1, delay: 2.4 })
      items.forEach((el, i) => {
        const next = items[(i + 1) % items.length]
        tl.to(el, { yPercent: -110, duration: 0.6, ease: 'expo.inOut' }, '+=1.6').fromTo(
          next,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.6, ease: 'expo.inOut', immediateRender: false },
          '<',
        )
      })
    },
    { scope: root },
  )

  if (reducedMotion) return <span>{words.join(' · ')}</span>

  return (
    <span
      ref={root}
      className="relative ml-1.5 inline-grid overflow-hidden rounded-lg border-2 border-ink bg-tomato px-2.5 align-middle shadow-[3px_3px_0_var(--color-ink)]"
    >
      {words.map((w, i) => (
        <span key={w} data-word className="col-start-1 row-start-1 py-0.5" aria-hidden={i > 0}>
          {w}
        </span>
      ))}
    </span>
  )
}

export function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLDivElement>(null)

  // Entrance — waits for the preloader to hand over.
  useGSAP(
    () => {
      if (!ready || reducedMotion) return
      const lines = gsap.utils.toArray<HTMLElement>('[data-hero-line]')
      const tl = gsap.timeline({
        defaults: { ease: 'expo.out' },
        // Let letters hop above the line once they have landed.
        onComplete: () => gsap.set(lines, { overflow: 'visible' }),
      })
      lines.forEach((line, i) => {
        tl.from(line.querySelectorAll('[data-char]'), { yPercent: 110, rotate: 8, duration: 1.3, stagger: 0.04 }, i * 0.12)
      })
      tl.from('[data-hero-sticker]', { scale: 0, rotate: -30, duration: 0.9, ease: 'back.out(2.5)', stagger: 0.1 }, 0.35)
        .from('[data-hero-fade]', { y: 30, autoAlpha: 0, duration: 1, stagger: 0.08 }, 0.55)
        .from('[data-hero-badge]', { scale: 0, rotate: 120, duration: 1.1, ease: 'back.out(1.8)' }, 0.8)
    },
    { scope: root, dependencies: [ready] },
  )

  // Letters hop when the pointer brushes past them.
  useGSAP(
    (_, contextSafe) => {
      if (!finePointer || reducedMotion || !contextSafe) return
      const chars = gsap.utils.toArray<HTMLElement>('[data-char]')
      const hop = contextSafe((e: Event) => {
        const el = e.currentTarget as HTMLElement
        if (gsap.isTweening(el)) return
        gsap
          .timeline()
          .to(el, { y: '-0.12em', rotate: gsap.utils.random(-8, 8), duration: 0.22, ease: 'power2.out' })
          .to(el, { y: 0, rotate: 0, duration: 0.7, ease: 'elastic.out(1, 0.35)' })
      })
      chars.forEach((c) => c.addEventListener('pointerenter', hop))
      return () => chars.forEach((c) => c.removeEventListener('pointerenter', hop))
    },
    { scope: root },
  )

  // Scroll-out: name drifts up at different speeds.
  useGSAP(
    () => {
      if (reducedMotion) return
      const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true }
      gsap.to('[data-hero-line]:nth-child(1)', { yPercent: -30, ease: 'none', scrollTrigger: st })
      gsap.to('[data-hero-line]:nth-child(2)', { yPercent: -12, ease: 'none', scrollTrigger: st })
    },
    { scope: root },
  )

  return (
    <SectionShell id="hero" bg="var(--color-paper)">
      <div ref={root} className="relative flex min-h-svh flex-col justify-end pt-32 pb-[8vh]">
        <div className="container-x">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span data-hero-sticker className="inline-block">
              <Sticker bg="var(--color-butter)" tilt={-3}>
                Now — {profile.role} @ IATMI
              </Sticker>
            </span>
            <span data-hero-sticker className="inline-block">
              <Sticker tilt={2}>{profile.location}</Sticker>
            </span>
          </div>

          <h1 className="display text-[clamp(5rem,26vw,17rem)] leading-[0.84]!">
            <span className="sr-only">{profile.name}</span>
            <span aria-hidden="true" className="block">
              <span data-hero-line className="block overflow-hidden whitespace-nowrap">
                <Letters text={profile.firstName} />
              </span>
              <span data-hero-line className="block overflow-hidden whitespace-nowrap text-indigo">
                <Letters text={profile.lastName} />
              </span>
            </span>
          </h1>

          <div className="mt-8 grid items-end gap-8 md:grid-cols-12">
            <div className="md:col-span-7 lg:col-span-6">
              <p data-hero-fade className="text-xl font-bold md:text-2xl">
                {profile.role} <RotatingWord words={profile.disciplines} />
              </p>
              <p data-hero-fade className="mt-4 max-w-xl text-lg leading-relaxed font-medium text-muted">
                {profile.tagline}
              </p>
            </div>
            <div data-hero-fade className="flex flex-wrap gap-4 md:col-span-5 md:justify-end lg:col-span-6">
              <Magnetic>
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToTarget('#projects')
                  }}
                  className="btn btn-primary"
                >
                  View selected work <span aria-hidden="true">→</span>
                </a>
              </Magnetic>
              <Magnetic>
                <a href={profile.cv} download className="btn">
                  Download CV <span aria-hidden="true">↓</span>
                </a>
              </Magnetic>
            </div>
          </div>
        </div>

        <div data-hero-badge className="absolute top-28 right-[clamp(1rem,4vw,3rem)] hidden lg:block">
          <ScrollBadge target="#about" />
        </div>
      </div>
    </SectionShell>
  )
}
