import { useEffect, useRef } from 'react'
import '../iso/iso.css'
import './figures.css'

export interface LegendKey {
  mark: 'lit' | 'raised' | 'flat' | 'dim'
  label: string
}

interface Props {
  fig: string
  title: string
  hint: string
  readout: string
  svg: string
  /** Wires the live behaviour to the rendered stage; returns a cleanup. */
  mount: (stage: HTMLElement, readout: HTMLElement | null) => () => void
  stageLabel: string
  stageRole?: 'slider' | 'group'
  keys?: LegendKey[]
  caption?: string
  className?: string
  /** No card: just the drawing on the page. The readout stays for screen readers only. */
  bare?: boolean
}

function Swatch({ mark }: { mark: LegendKey['mark'] }) {
  return (
    <svg className="iso-swatch" data-mark={mark} viewBox="0 0 16 10" aria-hidden="true" focusable="false">
      <path d={mark === 'flat' ? 'M2 6.5 8 3.5 14 6.5 8 9.5Z' : 'M2 4.5 8 1.5 14 4.5 14 6 8 9 2 6Z'} />
      {mark === 'flat' ? null : <path className="iso-swatch-crease" d="M2 4.5 8 7.5 14 4.5" />}
    </svg>
  )
}

/**
 * An Anatomy figure card (Fig n · title · hint · live readout) in the
 * portfolio's neo-brutalist frame. The SVG is static markup built once by the
 * figure module; `mount` moves its parts without re-rendering React.
 */
export function IsoPlate({ fig, title, hint, readout, svg, mount, stageLabel, stageRole = 'slider', keys = [], caption, className = '', bare = false }: Props) {
  const stage = useRef<HTMLDivElement>(null)
  const out = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!stage.current) return
    return mount(stage.current, out.current)
  }, [mount])

  if (bare) {
    return (
      <figure className={`iso fig-theme fig-bare iso-figure ${className}`} data-theme="light">
        <div
          ref={stage}
          className="iso-stage"
          tabIndex={0}
          role={stageRole}
          aria-label={stageLabel}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
        <span ref={out} className="sr-only" data-readout="">
          {readout}
        </span>
      </figure>
    )
  }

  return (
    <figure className={`iso fig-theme iso-figure ${className}`} data-theme="light">
      <div className="iso-plate">
        <div className="iso-plate-corners" aria-hidden="true">
          <span className="iso-plate-corner" data-corner="fig">
            {fig}
          </span>
          <span className="iso-plate-corner" data-corner="title">
            {title}
          </span>
          <span className="iso-plate-corner" data-corner="hint">
            {hint}
          </span>
          <span ref={out} className="iso-plate-corner" data-corner="readout" data-readout="">
            {readout}
          </span>
        </div>
        <div
          ref={stage}
          className="iso-stage"
          tabIndex={0}
          role={stageRole}
          aria-label={stageLabel}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>
      {keys.length || caption ? (
        <figcaption className="iso-legend">
          {keys.length ? (
            <span className="iso-keys">
              {keys.map((key) => (
                <span className="iso-key" key={key.label}>
                  <Swatch mark={key.mark} />
                  {key.label}
                </span>
              ))}
            </span>
          ) : null}
          {caption ? <span className="iso-caption">{caption}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  )
}
