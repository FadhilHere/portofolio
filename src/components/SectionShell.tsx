import { useRef, type ReactNode } from 'react'
import { gsap, reducedMotion, useGSAP } from '../lib/motion'

export type CurtainKind = 'split' | 'blinds' | 'iris'

type Props = {
  id: string
  /** This section's background colour. */
  bg: string
  /** The previous section's colour — the curtain is painted in it. */
  prev?: string
  curtain?: CurtainKind
  /** Scroll position (of the section top) where the curtain is fully open. */
  openAt?: string
  className?: string
  children: ReactNode
}

const SLATS = 6

/**
 * Stacking order, bottom to top:
 *   section background + curtain (z -10, painted in the root stacking context)
 *   fixed WebGL particles (z 0)
 *   section content (z 10)
 * For that to work, neither <main> nor <section> may create a stacking context.
 */
export function SectionShell({ id, bg, prev, curtain, openAt = 'top 30%', className = '', children }: Props) {
  const root = useRef<HTMLElement>(null)
  const hasCurtain = Boolean(prev && curtain && !reducedMotion)

  useGSAP(
    () => {
      if (!hasCurtain) return
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: openAt, scrub: true },
      })
      if (curtain === 'split') {
        tl.to('[data-door="l"]', { xPercent: -101, ease: 'power2.in' }, 0).to(
          '[data-door="r"]',
          { xPercent: 101, ease: 'power2.in' },
          0,
        )
      } else if (curtain === 'blinds') {
        tl.to('[data-slat]', { yPercent: -101, ease: 'power2.inOut', stagger: { each: 0.1, from: 'edges' } })
      } else {
        tl.fromTo(
          '[data-iris]',
          { clipPath: 'circle(0% at 50% 85%)' },
          { clipPath: 'circle(150% at 50% 85%)', ease: 'power2.in' },
        )
      }
    },
    { scope: root },
  )

  return (
    <section ref={root} id={id} className={`relative ${className}`}>
      <div className="absolute inset-0 -z-10" style={{ background: bg }} aria-hidden="true">
        {hasCurtain && (
          <div className="absolute inset-x-0 top-0 h-svh overflow-hidden">
            {curtain === 'split' && (
              <>
                <div data-door="l" className="absolute inset-y-0 left-0 w-[50.2%] border-r-[3px] border-ink" style={{ background: prev }} />
                <div data-door="r" className="absolute inset-y-0 right-0 w-[50.2%] border-l-[3px] border-ink" style={{ background: prev }} />
              </>
            )}
            {curtain === 'blinds' && (
              <div className="absolute inset-0 flex">
                {Array.from({ length: SLATS }, (_, i) => (
                  <div key={i} data-slat className="h-full flex-1 border-b-[3px] border-ink" style={{ background: prev }} />
                ))}
              </div>
            )}
            {curtain === 'iris' && (
              <div className="absolute inset-0" style={{ background: prev }}>
                <div data-iris className="absolute inset-0" style={{ background: bg }} />
              </div>
            )}
          </div>
        )}
      </div>
      <div className="relative z-10">{children}</div>
    </section>
  )
}
