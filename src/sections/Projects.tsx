import { useLayoutEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { finePointer, Flip, gsap, reducedMotion, ScrollTrigger, useGSAP } from '../lib/motion'
import { projects, type Project, type ProjectCategory } from '../data/resume'
import { SectionHeading } from '../components/SectionHeading'
import { SectionShell } from '../components/SectionShell'
import { Sticker } from '../components/Sticker'

type Filter = 'All' | ProjectCategory
const FILTERS: Filter[] = ['All', 'Full-stack', 'AI / ML', 'Data & BI', 'Mobile & UI/UX']

const CATEGORY_BG: Record<ProjectCategory, string> = {
  'Full-stack': 'var(--color-butter)',
  'AI / ML': 'var(--color-lavender)',
  'Data & BI': 'var(--color-sky)',
  'Mobile & UI/UX': 'var(--color-peach)',
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const inner = useRef<HTMLDivElement>(null)

  // The card tilts a few degrees toward the pointer.
  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = inner.current
    if (!el || !finePointer || reducedMotion) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    gsap.to(el, {
      rotateY: (px - 0.5) * 7,
      rotateX: (0.5 - py) * 7,
      transformPerspective: 1200,
      duration: 0.6,
      ease: 'power3.out',
    })
  }
  const onLeave = () => {
    if (inner.current) gsap.to(inner.current, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'expo.out' })
  }

  return (
    <div
      ref={inner}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="card group flex h-full flex-col p-7 transition-shadow duration-300 hover:shadow-[10px_10px_0_var(--color-ink)] md:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="display text-5xl text-indigo">{String(index + 1).padStart(2, '0')}</span>
        <Sticker bg={CATEGORY_BG[project.category]} tilt={3}>
          {project.category}
        </Sticker>
      </div>
      <p className="mt-6 text-sm font-bold text-muted">{project.period}</p>
      <h3 className="display mt-2 text-[clamp(2rem,3vw,2.8rem)] leading-[0.95]!">{project.title}</h3>
      <p className="mt-4 leading-relaxed font-medium text-muted">{project.summary}</p>
      <ul className="mt-5 space-y-2 text-sm font-medium">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-3">
            <span className="mt-[0.5em] size-1.5 shrink-0 rotate-45 bg-ink" aria-hidden="true" />
            {h}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-8">
        {project.metric && (
          <p className="mb-5">
            <span className="inline-block -rotate-1 rounded-md border-2 border-ink bg-tomato px-2.5 py-1 font-extrabold">
              {project.metric}
            </span>
          </p>
        )}
        <div className="flex flex-wrap items-center gap-2">
          {project.stack.map((s) => (
            <span key={s} className="tag">
              {s}
            </span>
          ))}
          {project.link && (
            <a
              href={project.link.href}
              target="_blank"
              rel="noreferrer"
              className="ml-auto font-bold text-indigo underline decoration-2 underline-offset-4 hover:text-tomato"
            >
              {project.link.label} ↗
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export function Projects() {
  const root = useRef<HTMLDivElement>(null)
  const grid = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState<Filter>('All')
  const flipState = useRef<{ flip: Flip.FlipState; height: number } | null>(null)

  useGSAP(
    () => {
      if (reducedMotion) return
      gsap.from('[data-card]', {
        y: 120,
        rotate: (i) => (i % 2 ? 4 : -4),
        autoAlpha: 0,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.08,
        clearProps: 'transform,opacity,visibility',
        scrollTrigger: { trigger: grid.current, start: 'top 82%' },
      })
      gsap.from('[data-filter]', {
        y: 24,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'back.out(2)',
        stagger: 0.05,
        clearProps: 'transform,opacity,visibility',
        scrollTrigger: { trigger: '[data-filters]', start: 'top 90%' },
      })
    },
    { scope: root },
  )

  // Cards stay mounted; filtering toggles display so Flip can animate both
  // the cards that move and the ones that leave or enter.
  useLayoutEffect(() => {
    const state = flipState.current
    if (!state) {
      ScrollTrigger.refresh()
      return
    }
    flipState.current = null
    const el = grid.current!
    // Ease the grid between its old and new height so the sections below glide
    // instead of jumping, then re-measure every trigger (and the 3D scene map).
    gsap.fromTo(
      el,
      { height: state.height },
      {
        height: el.offsetHeight,
        duration: 0.75,
        ease: 'expo.inOut',
        clearProps: 'height',
        onComplete: () => ScrollTrigger.refresh(),
      },
    )
    Flip.from(state.flip, {
      targets: el.querySelectorAll('[data-card]'),
      duration: 0.75,
      ease: 'expo.inOut',
      absolute: true,
      scale: true,
      stagger: 0.03,
      onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.6, delay: 0.25 }),
      onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.9, duration: 0.4 }),
    })
  }, [filter])

  const choose = (f: Filter) => {
    if (f === filter) return
    if (!reducedMotion) {
      const el = grid.current!
      flipState.current = { flip: Flip.getState(el.querySelectorAll('[data-card]')), height: el.offsetHeight }
    }
    setFilter(f)
  }

  const count = (f: Filter) => (f === 'All' ? projects.length : projects.filter((p) => p.category === f).length)

  return (
    <SectionShell id="projects" bg="var(--color-mint)" prev="var(--color-butter)" curtain="iris">
      <div ref={root} className="container-x py-[16vh]">
        <SectionHeading
          index="03"
          label="Selected work"
          stickerBg="var(--color-butter)"
          title={
            <>
              Systems that went <span className="text-indigo">live.</span>
            </>
          }
        />

        <div data-filters className="mt-14 flex flex-wrap gap-3" role="group" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              data-filter
              onClick={() => choose(f)}
              aria-pressed={filter === f}
              className={`rounded-full border-2 border-ink px-4 py-2 text-sm font-bold transition-all duration-200 ${
                filter === f
                  ? 'translate-x-[2px] translate-y-[2px] bg-indigo text-paper shadow-[1px_1px_0_var(--color-ink)]'
                  : 'bg-cream shadow-[3px_3px_0_var(--color-ink)] hover:bg-butter'
              }`}
            >
              {f}
              <sup className="ml-1 text-[0.65rem] opacity-70">{count(f)}</sup>
            </button>
          ))}
        </div>

        <div ref={grid} className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => {
            const visible = filter === 'All' || p.category === filter
            return (
              <div key={p.title} data-card style={{ display: visible ? undefined : 'none' }}>
                <ProjectCard project={p} index={i} />
              </div>
            )
          })}
        </div>
      </div>
    </SectionShell>
  )
}
