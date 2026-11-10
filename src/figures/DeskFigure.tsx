import { IsoPlate } from './IsoPlate'
import { LOG, mount, readoutAt, svg } from './desk'

export function DeskFigure({ className = '' }: { className?: string }) {
  return (
    <IsoPlate
      className={className}
      bare
      fig="Fig 1"
      title="The work log"
      hint="Hover to speed him up"
      readout={readoutAt(0, 0, false)}
      svg={svg}
      mount={mount}
      stageRole="group"
      stageLabel={`A person typing a work log with an AI bot beside him. Right arrow finishes a line, left arrow retypes it. The log: ${LOG.map((l) => l.text).join('; ')}`}
    />
  )
}
