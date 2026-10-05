import { useRef, type ReactNode } from 'react'
import { gsap, reducedMotion, SplitText, useGSAP } from '../lib/motion'
import { Sticker } from './Sticker'

type Props = {
  index: string
  label: string
  title: ReactNode
  stickerBg?: string
  className?: string
}

/** Sticker label that drops in, and an Anton title that rises line by line. */
export function SectionHeading({ index, label, title, stickerBg = 'var(--color-tomato)', className = '' }: Props) {
  const root = useRef<HTMLElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)

  useGSAP(
    () => {
      if (reducedMotion) return
      gsap.from('[data-label]', {
        y: -40,
        rotate: -14,
        autoAlpha: 0,
        duration: 1,
        ease: 'back.out(2.2)',
        scrollTrigger: { trigger: root.current, start: 'top 85%' },
      })
      SplitText.create(heading.current, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'split-line',
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.08,
            scrollTrigger: { trigger: root.current, start: 'top 80%' },
          }),
      })
    },
    { scope: root },
  )

  return (
    <header ref={root} className={className}>
      <span data-label className="inline-block">
        <Sticker bg={stickerBg}>
          {index} / {label}
        </Sticker>
      </span>
      <h2 ref={heading} className="display mt-7 max-w-6xl text-[clamp(3.4rem,9.5vw,9rem)] text-balance">
        {title}
      </h2>
    </header>
  )
}
