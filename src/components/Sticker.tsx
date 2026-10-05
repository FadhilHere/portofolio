import type { ReactNode } from 'react'

type Props = { children: ReactNode; className?: string; tilt?: number; bg?: string }

/** Ink-bordered pill with a hard shadow, slapped on at a slight angle. */
export function Sticker({ children, className = '', tilt = -2, bg }: Props) {
  return (
    <span className={`sticker ${className}`} style={{ rotate: `${tilt}deg`, background: bg }}>
      {children}
    </span>
  )
}
