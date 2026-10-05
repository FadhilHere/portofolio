import { useEffect, useRef, useState } from 'react'
import { gsap, reducedMotion, SplitText, useGSAP } from '../lib/motion'
import { scrollToTarget } from '../lib/scroll'
import { profile } from '../data/resume'
import { Magnetic } from '../components/Magnetic'
import { SectionShell } from '../components/SectionShell'
import { Sticker } from '../components/Sticker'

function LocalTime() {
  const fmt = () =>
    new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit' }).format(new Date())
  const [time, setTime] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 15_000)
    return () => clearInterval(id)
  }, [])
  return <span className="tabular-nums">{time} WIB</span>
}

export function Contact() {
  const root = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  useGSAP(
    () => {
      if (reducedMotion) return
      SplitText.create('[data-cta]', {
        type: 'chars,lines',
        mask: 'lines',
        linesClass: 'split-line',
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.chars, {
            yPercent: 120,
            rotate: 6,
            duration: 1.2,
            ease: 'expo.out',
            stagger: 0.025,
            scrollTrigger: { trigger: '[data-cta]', start: 'top 80%' },
          }),
      })
      gsap.from('[data-contact-label]', {
        y: -40,
        rotate: -14,
        autoAlpha: 0,
        duration: 1,
        ease: 'back.out(2.2)',
        scrollTrigger: { trigger: root.current, start: 'top 70%' },
      })
      gsap.from('[data-contact-fade]', {
        y: 40,
        autoAlpha: 0,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '[data-contact-links]', start: 'top 92%' },
      })
      gsap.fromTo('[data-dots]', { yPercent: 20 }, { yPercent: -20, ease: 'none', scrollTrigger: { trigger: root.current, scrub: true } })
    },
    { scope: root },
  )

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <SectionShell id="contact" bg="var(--color-indigo)" prev="var(--color-sky)" curtain="iris" openAt="top 45%">
      <div ref={root} className="relative flex min-h-svh flex-col justify-between overflow-hidden pt-[16vh] pb-8 text-paper">
        <div
          data-dots
          className="halftone pointer-events-none absolute -right-10 bottom-24 h-[55%] w-[45%] rotate-6 text-paper/25"
          aria-hidden="true"
        />

        <div className="container-x relative">
          <span data-contact-label className="inline-block">
            <Sticker bg="var(--color-tomato)">06 / Contact</Sticker>
          </span>

          <h2 data-cta className="display mt-10 text-[clamp(4rem,13vw,12.5rem)] leading-[0.84]!">
            Let&rsquo;s build something <span className="text-butter">real.</span>
          </h2>

          <div data-contact-links className="mt-16 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div data-contact-fade className="lg:col-span-7">
              <p className="text-sm font-extrabold tracking-[0.08em] text-paper/70 uppercase">Say hello</p>
              <div className="mt-3 flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="text-[clamp(1.4rem,3.6vw,3rem)] font-extrabold tracking-[-0.03em] break-all underline decoration-butter decoration-[3px] underline-offset-[6px] transition-colors hover:text-butter"
                >
                  {profile.email}
                </a>
                <button
                  type="button"
                  onClick={copy}
                  className="sticker bg-butter! text-ink transition-transform hover:-rotate-3"
                  aria-live="polite"
                >
                  {copied ? 'Copied ✓' : 'Copy'}
                </button>
              </div>
            </div>
            <div data-contact-fade className="flex flex-wrap gap-4 lg:col-span-5 lg:justify-end">
              <Magnetic>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-accent">
                  LinkedIn <span aria-hidden="true">↗</span>
                </a>
              </Magnetic>
              <Magnetic>
                <a href={profile.whatsapp} target="_blank" rel="noreferrer" className="btn">
                  WhatsApp <span aria-hidden="true">↗</span>
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

        <footer className="container-x relative mt-24 flex flex-col gap-4 border-t-2 border-paper/30 pt-6 text-sm font-semibold text-paper/80 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span>
            {profile.location} · <LocalTime />
          </span>
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              scrollToTarget(0)
            }}
            className="transition-colors hover:text-butter"
          >
            Back to top ↑
          </a>
        </footer>
      </div>
    </SectionShell>
  )
}
