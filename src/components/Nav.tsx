import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { gsap, reducedMotion, ScrollTrigger, useGSAP } from '../lib/motion'
import { lockScroll, scrollToTarget } from '../lib/scroll'
import { profile } from '../data/resume'

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Work' },
  { id: 'recognition', label: 'Recognition' },
  { id: 'skills', label: 'Toolkit' },
  { id: 'contact', label: 'Contact' },
]

export function Nav() {
  const bar = useRef<HTMLElement>(null)
  const menu = useRef<HTMLDivElement>(null)
  const pill = useRef<HTMLSpanElement>(null)
  const links = useRef<Record<string, HTMLAnchorElement | null>>({})
  const hide = useRef<gsap.core.Tween | null>(null)
  const [active, setActive] = useState('hero')
  const [open, setOpen] = useState(false)

  useGSAP(() => {
    // Scroll progress bar.
    gsap.to('[data-progress]', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
    })

    // Hide on scroll down, reveal on scroll up.
    const tween = gsap.to(bar.current, { yPercent: -160, paused: true, duration: 0.45, ease: 'power3.out' })
    hide.current = tween
    ScrollTrigger.create({
      start: 160,
      end: 'max',
      onUpdate: (self) => (self.direction === 1 ? tween.play() : tween.reverse()),
      onLeaveBack: () => tween.reverse(),
    })

    // Active section tracking.
    ;['hero', ...NAV_LINKS.map((l) => l.id)].forEach((id) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top 50%',
        end: 'bottom 50%',
        onToggle: (self) => self.isActive && setActive(id),
      }),
    )
  })

  // The highlight pill slides to whichever link is active.
  useGSAP(
    () => {
      const target = links.current[active]
      const el = pill.current
      if (!el) return
      if (!target) {
        gsap.to(el, { autoAlpha: 0, scale: 0.6, duration: 0.3 })
        return
      }
      gsap.to(el, {
        x: target.offsetLeft,
        width: target.offsetWidth,
        autoAlpha: 1,
        scale: 1,
        duration: reducedMotion ? 0 : 0.6,
        ease: 'elastic.out(1, 0.7)',
      })
    },
    { dependencies: [active] },
  )

  // Full-screen mobile menu.
  useGSAP(
    () => {
      if (!open || reducedMotion) return
      gsap.from(menu.current, { clipPath: 'circle(0% at 100% 0%)', duration: 0.8, ease: 'expo.inOut' })
      gsap.from('[data-menu-link]', { yPercent: 120, rotate: 6, duration: 0.8, ease: 'expo.out', stagger: 0.05, delay: 0.3 })
    },
    { dependencies: [open], scope: menu },
  )

  useEffect(() => {
    if (!open) return
    // The close button lives in the bar, so it must be on screen while open.
    hide.current?.reverse()
    lockScroll(true)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      lockScroll(false)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const go = (e: MouseEvent, id: string) => {
    e.preventDefault()
    setOpen(false)
    // Let the menu unlock scrolling before travelling.
    requestAnimationFrame(() => scrollToTarget(`#${id}`))
  }

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[60] h-1">
        <div data-progress className="h-1 origin-left scale-x-0 bg-indigo" />
      </div>

      <header ref={bar} className="fixed inset-x-0 top-4 z-50">
        <nav
          className="container-x flex items-center justify-between gap-3 lg:grid lg:grid-cols-[1fr_auto_1fr]"
          aria-label="Primary"
        >
          <a
            href="#hero"
            onClick={(e) => go(e, 'hero')}
            className="display grid size-12 shrink-0 place-items-center rounded-full border-2 border-ink bg-indigo text-xl text-paper shadow-[3px_3px_0_var(--color-ink)] transition-transform hover:-rotate-12 lg:justify-self-start"
            aria-label={`${profile.name} — back to top`}
          >
            FP
          </a>

          <ul className="relative hidden items-center rounded-full border-2 border-ink bg-cream p-1.5 shadow-[4px_4px_0_var(--color-ink)] lg:flex">
            <span
              ref={pill}
              className="absolute top-1.5 bottom-1.5 left-0 rounded-full border-2 border-ink bg-butter opacity-0"
              aria-hidden="true"
            />
            {NAV_LINKS.map((l) => (
              <li key={l.id} className="relative">
                <a
                  ref={(el) => {
                    links.current[l.id] = el
                  }}
                  href={`#${l.id}`}
                  onClick={(e) => go(e, l.id)}
                  aria-current={active === l.id ? 'true' : undefined}
                  className="block rounded-full px-4 py-2 text-sm font-bold"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 lg:justify-self-end">
            <a href={profile.cv} download className="btn btn-accent hidden py-2.5! text-sm! sm:inline-flex">
              Download CV
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid size-12 place-items-center rounded-full border-2 border-ink bg-cream shadow-[3px_3px_0_var(--color-ink)] lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 h-[2.5px] w-5 rounded bg-ink transition-all duration-300 ${open ? 'top-1.5 rotate-45' : 'top-0'}`}
                />
                <span
                  className={`absolute left-0 h-[2.5px] w-5 rounded bg-ink transition-all duration-300 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div
          ref={menu}
          id="mobile-menu"
          className="fixed inset-0 z-40 flex flex-col justify-between bg-indigo pt-28 pb-10 text-paper lg:hidden"
        >
          <ul className="container-x space-y-1">
            {NAV_LINKS.map((l, i) => (
              <li key={l.id} className="overflow-hidden">
                <a
                  data-menu-link
                  href={`#${l.id}`}
                  onClick={(e) => go(e, l.id)}
                  className="display flex items-baseline gap-4 text-[clamp(3rem,15vw,5rem)] uppercase"
                >
                  <span className="font-sans text-sm font-extrabold text-butter">0{i + 1}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="container-x flex flex-wrap gap-3">
            <a href={profile.cv} download className="btn btn-accent">
              Download CV
            </a>
            <a href={`mailto:${profile.email}`} className="btn">
              Email me
            </a>
          </div>
        </div>
      )}
    </>
  )
}
