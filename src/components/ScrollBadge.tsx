import { scrollToTarget } from '../lib/scroll'

const TEXT = 'scroll to explore ✸ scroll to explore ✸ '
// Circumference of the r=37 path; textLength stretches the text to fit it exactly.
const CIRCUMFERENCE = 2 * Math.PI * 37

/** Round sticker with slowly orbiting text; jumps to the next section. */
export function ScrollBadge({ target }: { target: string }) {
  return (
    <button
      type="button"
      onClick={() => scrollToTarget(target)}
      className="group relative grid size-32 place-items-center rounded-full border-2 border-ink bg-tomato shadow-[4px_4px_0_var(--color-ink)] transition-transform duration-300 hover:scale-105"
      aria-label="Scroll to the next section"
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full [animation:spin-slow_14s_linear_infinite]" aria-hidden="true">
        <defs>
          <path id="badge-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        <text className="fill-ink text-[9px] font-extrabold uppercase">
          <textPath href="#badge-circle" textLength={CIRCUMFERENCE - 2} lengthAdjust="spacing">
            {TEXT}
          </textPath>
        </text>
      </svg>
      <span className="text-2xl font-bold transition-transform duration-300 group-hover:translate-y-1" aria-hidden="true">
        ↓
      </span>
    </button>
  )
}
