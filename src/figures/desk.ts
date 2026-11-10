/**
 * Fig 1 — "The work log": a faceless person at a desk, typing.
 *
 * Every keystroke puts one more character on the monitor, and every line is
 * something that was actually done (taken from src/data/resume.ts): the roles,
 * the systems shipped, the numbers. A small AI bot hovers at his shoulder and
 * beams onto the line being written; he is the one at the keyboard. When the
 * log is complete it holds, clears and starts again.
 *
 * Built with the Anatomy kit (src/iso, MIT): static paths are computed once,
 * the live loop only moves the hands and the bot and writes text.
 */
import * as k from '../iso/iso-kit'
import type { Flat, Plan, Plane, Point3, SolidPaths } from '../iso/iso-kit'
import { experience, stats } from '../data/resume'

export const WIDTH = 560
export const HEIGHT = 420

// ---------- What gets typed: true lines from the resume ----------
const job = (short: string) => experience.find((e) => e.short === short)
const stat = (label: string) => stats.find((s) => s.label.includes(label))
const sus = stat('Usability')
export const LOG: { text: string; tag: string }[] = [
  { text: `${job('IATMI')?.short} · ${job('IATMI')?.role}`, tag: 'IATMI · now' },
  { text: 'PCR · 5 user roles shipped', tag: 'PCR · 2026' },
  { text: `Expo · ${stat('Tenant')?.value}${stat('Tenant')?.suffix} tenant teams`, tag: 'Expo platform' },
  { text: `SUS 78.7 → ${sus?.value.toFixed(2)}`, tag: 'usability' },
  { text: `Pertamina · ${stat('Intern')?.value}${stat('Intern')?.suffix} digitised`, tag: 'Pertamina RU II' },
  { text: `Assist.id · backend ${job('Assist.id')?.period.slice(-4)}`, tag: 'Assist.id' },
  { text: `CGPA ${stat('CGPA')?.value.toFixed(2)} / 4.00`, tag: 'CGPA' },
]

// ---------- World layout (units ≈ cm) ----------
const FLOOR: Plan = { x: -92, y: -50, w: 176, d: 128, r: 10 }
const DESK: Plan = { x: -76, y: -42, w: 150, d: 68, r: 2 }
const DESK_Z = 71
const DESK_TOP = 75
const PED: Plan = { x: 30, y: -38, w: 40, d: 60, r: 1.5 }

const MON_X = 14 // the monitor sits right of centre, so the person never hides it
const MON: Plan = { x: MON_X - 45, y: -36, w: 90, d: 6, r: 2 }
const MON_Z = 86
const MON_TOP = 142
const SCREEN_Y = MON.y + MON.d // the +y face
const SCREEN: [number, number, number, number] = [MON.x + 4, MON.x + MON.w - 4, MON_Z + 4, MON_TOP - 4] // x0 x1 z0 z1
const TEXT_SIZE = 4.3
const CHAR_W = TEXT_SIZE * 0.6
const LINE_GAP = 6
const TEXT_X = SCREEN[0] + 3
const lineZ = (i: number) => SCREEN[3] - 9 - i * LINE_GAP

const PERSON: Plane = [-30, 44] // hip centre
const KEYB: Plan = { x: PERSON[0] - 22, y: 4, w: 44, d: 14, r: 1.5 }
const CHAIR: Plane = [PERSON[0], 48]
const BOT: Point3 = [PERSON[0] - 24, 30, 114]

export const P = k.fitProjection(
  [...k.boxCorners(FLOOR, -3, 0), ...k.boxCorners(MON, MON_Z, MON_TOP), [PERSON[0], PERSON[1], 124], [BOT[0], BOT[1], BOT[2] + 12], ...k.boxCorners(DESK, 0, DESK_TOP)],
  WIDTH,
  HEIGHT,
  { pad: 16, azimuth: 58 },
)

// ---------- Helpers ----------
const at = (point: Point3) => k.iso(point, P)
const S = (paths: SolidPaths, style?: k.SolidStyle) => k.solidSvg(paths, style)
const L = (d: string, style?: k.LineStyle) => k.lineSvg(d, style)
const D = (points: Flat[], style?: { size?: number; tone?: k.Tone; pulse?: boolean }) => k.dotsSvg(points, style)
const faceRectY = (x0: number, x1: number, z0: number, z1: number, y: number) =>
  k.pathOf([at([x0, y, z0]), at([x1, y, z0]), at([x1, y, z1]), at([x0, y, z1])], true)
const faceRectX = (y0: number, y1: number, z0: number, z1: number, x: number) =>
  k.pathOf([at([x, y0, z0]), at([x, y1, z0]), at([x, y1, z1]), at([x, y0, z1])], true)
/** A box standing on the floor at `c`, turned to `angle`: `length` along it, `width` across. */
const turnedBox = (c: Plane, angle: number, length: number, width: number): Plane[] => {
  const u: Plane = [Math.cos(angle), Math.sin(angle)]
  const v: Plane = [-u[1], u[0]]
  const l = length / 2
  const w = width / 2
  return [
    [c[0] - u[0] * l - v[0] * w, c[1] - u[1] * l - v[1] * w],
    [c[0] + u[0] * l - v[0] * w, c[1] + u[1] * l - v[1] * w],
    [c[0] + u[0] * l + v[0] * w, c[1] + u[1] * l + v[1] * w],
    [c[0] - u[0] * l + v[0] * w, c[1] - u[1] * l + v[1] * w],
  ]
}

// ---------- Floor ----------
function floor() {
  const out = [`<path class="iso-halo" d="${k.haloOf(FLOOR, -3, 3, P)}"/>`]
  out.push(S(k.slabOf(FLOOR, -3, 3, P, 10, 1.2), { tone: 'mid' }))
  out.push(L(k.planOutline(k.insetPlan(FLOOR, 6), 0, P, 10), { tone: 'lo' }))
  out.push(L(k.planOutline(k.insetPlan(FLOOR, 8.5), 0, P, 10), { tone: 'faint' }))
  return out.join('')
}

// ---------- Chair (under the person) ----------
function chairBase() {
  const [cx, cy] = CHAIR
  const out = [`<path class="iso-halo" d="${k.haloOf({ x: cx - 22, y: cy - 22, w: 44, d: 44, r: 22 }, 0, 0.1, P)}" style="filter:blur(4px)"/>`]
  const angles = Array.from({ length: 5 }, (_, i) => (i / 5) * Math.PI * 2 + 0.3)
  const casters = angles.map((a): Plane => [cx + Math.cos(a) * 21, cy + Math.sin(a) * 21])
  const sorted = casters.map((c, i) => ({ c, a: angles[i] })).sort((p, q) => k.depthOf([p.c[0], p.c[1], 0], P) - k.depthOf([q.c[0], q.c[1], 0], P))
  for (const { c } of sorted) out.push(S(k.cylinder(c[0], c[1], 2.6, 0, 3.6, P, 18), { tone: 'lo' }))
  for (const { a } of sorted) {
    const mid: Plane = [cx + Math.cos(a) * 10.5, cy + Math.sin(a) * 10.5]
    out.push(S(k.extrude(turnedBox(mid, a, 21, 3.2), 3.6, 2.2, P), { tone: 'mid' }))
  }
  out.push(S(k.cylinder(cx, cy, 4.2, 3.6, 3, P, 24, 0.4), { tone: 'mid' }))
  out.push(S(k.cylinder(cx, cy, 2.4, 6.6, 34, P, 18), { tone: 'mid', crease: 'none', inner: L(k.sideArc(cx, cy, 2.4, 22, P, 12), { tone: 'faint' }) }))
  const seat: Plan = { x: cx - 21, y: cy - 20, w: 42, d: 40, r: 7 }
  out.push(S(k.slabOf(seat, 40, 6, P, 8, 1.2), { tone: 'mid', inner: L(k.sideSeam(seat, 43, P, 8), { tone: 'faint' }) }))
  return out.join('')
}

function chairBack() {
  const [cx, cy] = CHAIR
  const out: string[] = []
  out.push(S(k.slabOf({ x: cx - 2, y: cy + 17, w: 4, d: 3, r: 0.8 }, 46, 12, P, 2), { tone: 'mid', crease: 'none' }))
  const back: Plan = { x: cx - 19, y: cy + 16, w: 38, d: 5, r: 2.4 }
  out.push(S(k.slabOf(back, 58, 22, P, 6, 1), { tone: 'mid', inner: L(k.sideSeam(back, 62, P, 6), { tone: 'faint' }) }))
  return out.join('')
}

// ---------- Desk ----------
function deskBody() {
  const out: string[] = []
  // Modesty panel at the back, two legs on the left, the drawer pedestal on the right.
  out.push(S(k.slabOf({ x: DESK.x + 4, y: DESK.y + 2, w: 104, d: 2, r: 0.4 }, 30, DESK_Z - 30, P, 2), { tone: 'lo' }))
  for (const y of [DESK.y + 4, DESK.y + DESK.d - 9]) {
    out.push(S(k.slabOf({ x: DESK.x + 4, y, w: 5, d: 5, r: 1 }, 0, DESK_Z, P, 3), { tone: 'mid', crease: 'none' }))
    out.push(S(k.slabOf({ x: DESK.x + 3.4, y: y - 0.6, w: 6.2, d: 6.2, r: 1.2 }, 0, 1.6, P, 3), { tone: 'lo' }))
  }
  out.push(S(k.slabOf(PED, 0, DESK_Z, P, 3, 0.8), { tone: 'mid' }))
  const front = PED.y + PED.d
  for (const [z0, z1] of [[4, 24], [27, 47], [50, 68]]) {
    out.push(L(faceRectY(PED.x + 2.5, PED.x + PED.w - 2.5, z0, z1, front), { tone: 'lo' }))
    out.push(S(k.slabOf({ x: PED.x + PED.w / 2 - 6, y: front, w: 12, d: 1.6, r: 0.6 }, z1 - 6, 2, P, 2), { tone: 'mid' }))
  }
  out.push(L(faceRectX(PED.y + 6, PED.y + PED.d - 6, 8, DESK_Z - 8, PED.x + PED.w), { tone: 'faint' }))
  return out.join('')
}

function deskTop() {
  return S(k.slabOf(DESK, DESK_Z, DESK_TOP - DESK_Z, P, 4, 1), { tone: 'mid', inner: L(k.sideSeam(DESK, DESK_Z + 2, P, 4), { tone: 'faint' }) })
}

function monitor() {
  const out: string[] = []
  out.push(S(k.slabOf({ x: MON_X - 14, y: -32, w: 28, d: 16, r: 3 }, DESK_TOP, 1.6, P, 4, 0.4), { tone: 'mid' }))
  out.push(S(k.slabOf({ x: MON_X - 3, y: -33, w: 6, d: 5, r: 1.2 }, DESK_TOP + 1.6, MON_Z - DESK_TOP, P, 3), { tone: 'mid', crease: 'none' }))
  out.push(S(k.slabOf(MON, MON_Z, MON_TOP - MON_Z, P, 4, 0.8), { tone: 'mid' }))
  out.push(L(faceRectY(MON.x + 1.6, MON.x + MON.w - 1.6, MON_Z + 1.6, MON_TOP - 1.6, SCREEN_Y), { tone: 'mid' }))
  out.push(`<path class="iso-fill" d="${faceRectY(SCREEN[0], SCREEN[1], SCREEN[2], SCREEN[3], SCREEN_Y)}" style="fill:var(--anatomy-face)"/>`)
  out.push(L(faceRectY(SCREEN[0], SCREEN[1], SCREEN[2], SCREEN[3], SCREEN_Y), { tone: 'lo' }))
  // Title bar with three window dots, and a power LED under the screen.
  out.push(L(k.pathOf([at([SCREEN[0], SCREEN_Y, SCREEN[3] - 4.4]), at([SCREEN[1], SCREEN_Y, SCREEN[3] - 4.4])]), { tone: 'faint' }))
  out.push(D([0, 1, 2].map((i) => at([SCREEN[0] + 3 + i * 2.6, SCREEN_Y, SCREEN[3] - 2.2])), { size: 0.55, tone: 'mid' }))
  out.push(D([at([MON.x + MON.w - 5, SCREEN_Y, MON_Z + 1.1])], { size: 0.6, tone: 'hi' }))
  // Cable from the back of the stand down behind the desk.
  out.push(k.wireSvg(at([MON_X, -34, DESK_TOP + 6]), at([MON_X + 4, DESK.y + 3, DESK_TOP]), { via: [at([MON_X + 2, -37, DESK_TOP + 2])], tone: 'lo', size: 0.8 }))
  return out.join('')
}

/** The log lines on the screen, clipped to the glass; written character by character. */
function screenText() {
  const clip = `<clipPath id="fig1-screen"><path d="${faceRectY(SCREEN[0] + 0.6, SCREEN[1] - 0.6, SCREEN[2] + 0.6, SCREEN[3] - 5, SCREEN_Y)}"/></clipPath>`
  const header = k.faceTextSvg(k.sideMatrix([TEXT_X + 9, SCREEN_Y + 0.05], SCREEN[3] - 3, P, 'left'), 'fadhil — work.log', { size: 2.8, tone: 'lo' })
  const lines = LOG.map((_, i) =>
    k.faceTextSvg(k.sideMatrix([TEXT_X, SCREEN_Y + 0.05], lineZ(i) - TEXT_SIZE * 0.35, P, 'left'), '', { size: TEXT_SIZE, tone: 'hi' }).replace('<text ', `<text data-line="${i}" `),
  ).join('')
  const cursor = `<path data-part="cursor" class="iso-line" data-tone="lit" d="" style="fill:var(--anatomy-lit);stroke:none"/>`
  return `${clip}${header}<g clip-path="url(#fig1-screen)">${lines}${cursor}</g>`
}

export const cursorPath = (line: number, chars: number) => {
  const x = TEXT_X + chars * CHAR_W + 0.4
  const z = lineZ(line)
  return faceRectY(x, x + CHAR_W * 0.9, z - TEXT_SIZE * 0.45, z + TEXT_SIZE * 0.55, SCREEN_Y + 0.08)
}

const KEY_COLS = 12
const KEY_ROWS = 4
function keyboard() {
  const out: string[] = []
  out.push(S(k.slabOf(KEYB, DESK_TOP, 2, P, 4, 0.5), { tone: 'mid' }))
  const keys: Flat[] = []
  for (let row = 0; row < KEY_ROWS; row++) for (let col = 0; col < KEY_COLS; col++) keys.push(at([KEYB.x + 2.6 + col * 3.55, KEYB.y + 2.2 + row * 2.6, DESK_TOP + 2]))
  out.push(`<g data-part="keys">${D(keys, { size: 0.6, tone: 'mid' })}</g>`)
  out.push(L(k.lineOnTop([KEYB.x + 12, KEYB.y + KEYB.d - 1.6], [KEYB.x + 32, KEYB.y + KEYB.d - 1.6], DESK_TOP + 2, P), { tone: 'lo' }))
  return out.join('')
}

function deskThings() {
  const out: string[] = []
  // Mouse on its pad.
  out.push(S(k.slabOf({ x: -2, y: 2, w: 18, d: 18, r: 2 }, DESK_TOP, 0.4, P, 3), { tone: 'lo', crease: 'none' }))
  out.push(S(k.slabOf({ x: 4, y: 6, w: 6, d: 10, r: 3 }, DESK_TOP + 0.4, 2.4, P, 6, 0.6), { tone: 'mid' }))
  out.push(L(k.lineOnTop([7, 6.4], [7, 10], DESK_TOP + 2.8, P), { tone: 'lo' }))
  // A stack of books and a mug.
  ;[0, 1, 2].forEach((i) => {
    const book: Plan = { x: 46 + i * 1.2, y: -2 + i * 0.8, w: 22, d: 16, r: 0.6 }
    out.push(S(k.slabOf(book, DESK_TOP + i * 3, 3, P, 2, 0.3), { tone: i === 1 ? 'lo' : 'mid', inner: L(k.sideSeam(k.insetPlan(book, 0.4), DESK_TOP + i * 3 + 1.5, P, 2), { tone: 'faint' }) }))
  })
  out.push(S(k.slabOf({ x: 31, y: 14, w: 3, d: 2, r: 0.8 }, DESK_TOP + 2.5, 5, P, 2), { tone: 'mid', crease: 'none' }))
  out.push(S(k.cylinder(27, 13, 4, DESK_TOP, 10, P, 28, 0.5), { tone: 'mid', inner: L(k.sideArc(27, 13, 4, DESK_TOP + 7.5, P, 20), { tone: 'faint' }) }))
  out.push(L(k.ring(27, 13, 3.2, DESK_TOP + 9.6, P, 24), { tone: 'lo' }))
  return out.join('')
}

// ---------- The person (faceless) ----------
const [PX, PY] = PERSON
function legs() {
  const out: string[] = []
  for (const dx of [-5, 5]) {
    out.push(S(k.slabOf({ x: PX + dx - 3, y: 0, w: 6, d: 10, r: 2.4 }, 0, 3, P, 4, 0.3), { tone: 'hi' })) // shoe
    out.push(S(k.cylinder(PX + dx, 6, 2.3, 3, 42, P, 18), { tone: 'hi', crease: 'none' })) // shin
    out.push(S(k.slabOf({ x: PX + dx - 2.8, y: 4, w: 5.6, d: PY - 2, r: 2.4 }, 44, 6, P, 4), { tone: 'hi' })) // thigh
  }
  return out.join('')
}

/** One forearm + hand resting on the keyboard; bobs down on each keystroke. */
const handAt = (ex: number) => {
  const forearm = S(k.slabOf({ x: ex - 2, y: 14, w: 4, d: PY - 18, r: 1.8 }, 77.4, 3.6, P, 4), { tone: 'hi' })
  const hand = S(k.slabOf({ x: ex - 2.8, y: 8.4, w: 5.6, d: 7.4, r: 2.4 }, 77.2, 2.8, P, 4, 0.3), { tone: 'hi' })
  return forearm + hand
}

function upperBody() {
  const out: string[] = []
  out.push(`<g data-part="hand-l">${handAt(PX - 6)}</g>`)
  out.push(`<g data-part="hand-r">${handAt(PX + 6)}</g>`)
  const hips: Plan = { x: PX - 9, y: PY - 6, w: 18, d: 12, r: 4 }
  out.push(S(k.slabOf(hips, 46, 9, P, 6), { tone: 'hi' }))
  out.push(S(k.cylinder(PX - 11.4, PY - 2, 2.3, 78, 22, P, 16), { tone: 'hi', crease: 'none' })) // left upper arm
  const torso: Plan = { x: PX - 10, y: PY - 7, w: 20, d: 11, r: 4.4 }
  out.push(S(k.slabOf(torso, 54, 46, P, 8, 0.8), { tone: 'hi', inner: L(k.sideSeam(torso, 96, P, 8), { tone: 'mid' }) }))
  out.push(S(k.cylinder(PX + 11.4, PY - 2, 2.3, 78, 22, P, 16), { tone: 'hi', crease: 'none' })) // right upper arm
  out.push(S(k.cylinder(PX, PY - 2, 2.6, 100, 5, P, 18), { tone: 'hi', crease: 'none' })) // neck
  out.push(S(k.cylinder(PX, PY - 2, 6.6, 104.6, 11, P, 44, 1.2), { tone: 'hi' })) // head: no face
  out.push(S(k.cylinder(PX, PY - 2, 5, 115.6, 2.2, P, 36, 0.8), { tone: 'hi' }))
  return out.join('')
}

// ---------- The AI bot ----------
function bot() {
  const out: string[] = []
  out.push(S(k.cylinder(0, 0, 5, 0, 3.4, P, 40, 0.5), { tone: 'hi', lit: true, inner: L(k.sideArc(0, 0, 5, 1.7, P, 28), { tone: 'lit' }) }))
  out.push(S(k.cylinder(0, 0, 3, 3.4, 1.8, P, 32, 0.4), { tone: 'hi', lit: true }))
  out.push(L(k.rise([0, 0], 5.2, 9.6, P), { tone: 'lit' }))
  out.push(D([at([0, 0, 9.6])], { size: 1, tone: 'hi', pulse: true }))
  return out.join('')
}

export const svg = k.figureSvg({
  width: WIDTH,
  height: HEIGHT,
  label: `A faceless person sits at a desk on an office chair, typing on a keyboard, with a small AI bot hovering at his shoulder. Each keystroke adds a character to a work log on the monitor: ${LOG.map((l) => l.text).join('; ')}.`,
  body: [
    floor(),
    chairBase(),
    legs(),
    deskBody(),
    deskTop(),
    monitor(),
    screenText(),
    deskThings(),
    keyboard(),
    upperBody(),
    chairBack(),
    `<path data-part="beam" class="iso-line" data-tone="lit" data-flow="" opacity="0" d="" style="stroke-width:0.9"/>`,
    `<g data-part="bot">${bot()}</g>`,
  ],
})

// ---------- Live behaviour ----------
const CPS = 15 // characters per second
const LINE_PAUSE = 0.45
const HOLD = 3.2 // full log stays up this long before it clears

export function readoutAt(line: number, chars: number, done: boolean) {
  if (done) return `log · ${LOG.length} entries · built with AI`
  const entry = LOG[Math.min(line, LOG.length - 1)]
  return `typing · ${Math.min(line + 1, LOG.length)}/${LOG.length} · ${chars ? entry.tag : '…'}`
}

export function mount(stage: HTMLElement, readout: HTMLElement | null) {
  const svgEl = stage.querySelector('svg')!
  const q = <E extends Element>(sel: string) => svgEl.querySelector<E>(sel)!
  const lineEls = [...svgEl.querySelectorAll<SVGTextElement>('[data-line]')]
  const cursor = q<SVGPathElement>('[data-part="cursor"]')
  const hands = [q<SVGGElement>('[data-part="hand-l"]'), q<SVGGElement>('[data-part="hand-r"]')]
  const keyDots = [...svgEl.querySelectorAll<SVGCircleElement>('[data-part="keys"] circle')]
  const botEl = q<SVGGElement>('[data-part="bot"]')
  const beamEl = q<SVGPathElement>('[data-part="beam"]')
  const still = matchMedia('(prefers-reduced-motion: reduce)')

  let line = 0
  let chars = 0
  let carry = 0 // fractional characters owed
  let pause = 0
  let hold = 0
  let done = false
  let clock = 0
  let strokes = 0
  const press = [0, 0] // age of each hand's last keystroke (s)
  let lastKey = -1
  let keyAge = 1
  let beam = 0
  let boost = 1
  let frame = 0
  let last = 0
  let visible = false
  let boostTimer = 0

  const write = () => {
    lineEls.forEach((el, i) => {
      const text = i < line ? LOG[i].text : i === line && !done ? LOG[i].text.slice(0, chars) : done ? LOG[i].text : ''
      const shown = `› ${text}`
      if (i > line && !done) {
        if (el.textContent) el.textContent = ''
      } else if (el.textContent !== shown) el.textContent = shown
    })
  }

  const showAll = () => {
    line = LOG.length - 1
    chars = LOG[line].text.length
    done = true
    write()
  }

  const keystroke = () => {
    strokes++
    const hand = strokes % 2
    press[hand] = 0
    // Light the key under the finger: left hand on the left half, right on the right.
    const col = hand === 0 ? (strokes * 7) % 6 : 6 + ((strokes * 5) % 6)
    const row = (strokes * 3) % KEY_ROWS
    lastKey = row * KEY_COLS + col
    keyAge = 0
  }

  function step(dt: number) {
    clock += dt
    press[0] += dt
    press[1] += dt
    keyAge += dt
    if (done) {
      hold += dt
      if (hold > HOLD) {
        line = 0
        chars = 0
        done = false
        hold = 0
        pause = 0.6
        write()
      }
      return
    }
    if (pause > 0) {
      pause -= dt
      return
    }
    carry += dt * CPS * boost * (0.75 + 0.5 * Math.abs(Math.sin(clock * 3.7)))
    while (carry >= 1 && !done) {
      carry -= 1
      chars++
      keystroke()
      if (chars >= LOG[line].text.length) {
        if (line === LOG.length - 1) {
          done = true
          hold = 0
        } else {
          line++
          chars = 0
          pause = LINE_PAUSE
          carry = 0
          break
        }
      }
    }
    write()
  }

  function draw(calm: boolean) {
    // Hands dip on each keystroke (a short attack, a quick release).
    hands.forEach((el, i) => {
      const age = press[i]
      const dip = calm ? 0 : age < 0.05 ? (age / 0.05) * 0.9 : Math.max(0, 0.9 * Math.exp(-(age - 0.05) / 0.06))
      if (dip > 0.02) el.setAttribute('transform', k.translateAlong(P, [0, 0, -dip]))
      else el.removeAttribute('transform')
    })
    keyDots.forEach((c, i) => {
      const on = i === lastKey && keyAge < 0.12
      if (on) c.setAttribute('style', 'opacity:1;fill:var(--anatomy-lit)')
      else if (c.hasAttribute('style')) c.removeAttribute('style')
    })
    const typing = !done && pause <= 0
    const caretOn = !done && (calm || Math.floor(clock * 2.6) % 2 === 0 || typing)
    cursor.setAttribute('d', cursorPath(line, chars))
    cursor.setAttribute('opacity', caretOn ? '1' : '0')
    // The bot hovers and beams onto the line being written.
    const bob = calm ? 0 : Math.sin(clock * 2.1) * 1.6
    const botAt: Point3 = [BOT[0], BOT[1], BOT[2] + bob]
    botEl.setAttribute('transform', k.translateAlong(P, botAt))
    if (beam > 0.01) beamEl.setAttribute('d', k.pathOf([at(botAt), at([TEXT_X + Math.max(chars, 1) * CHAR_W, SCREEN_Y + 0.1, lineZ(line)])]))
    beamEl.setAttribute('opacity', String(Math.round(beam * 100) / 100))
    const text = readoutAt(line, chars, done)
    if (readout && readout.textContent !== text) readout.textContent = text
    stage.setAttribute('aria-valuetext', text)
  }

  function tick(now: number) {
    const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60
    last = now
    step(dt)
    const typing = !done && pause <= 0
    beam += ((typing ? 0.7 : 0) - beam) * (1 - Math.exp(-dt / 0.15))
    draw(false)
    frame = visible ? requestAnimationFrame(tick) : 0
  }
  const run = () => {
    if (!frame && visible && !still.matches) {
      last = 0
      frame = requestAnimationFrame(tick)
    }
  }

  const io = new IntersectionObserver(
    (entries) => {
      visible = entries[entries.length - 1].isIntersecting
      if (visible) run()
    },
    { rootMargin: '120px 0px' },
  )
  io.observe(stage)

  // Hover: he types faster while you watch. Arrow keys finish or restart the current line.
  const onMove = () => {
    boost = 2.4
    window.clearTimeout(boostTimer)
    boostTimer = window.setTimeout(() => (boost = 1), 600)
  }
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'End') {
      e.preventDefault()
      if (e.key === 'End') showAll()
      else if (!done) {
        chars = LOG[line].text.length
        if (line < LOG.length - 1) {
          line++
          chars = 0
        } else done = true
        write()
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'Home') {
      e.preventDefault()
      line = e.key === 'Home' ? 0 : Math.max(0, line - (chars ? 0 : 1))
      chars = 0
      done = false
      write()
    } else return
    if (still.matches) draw(true)
  }
  stage.addEventListener('pointermove', onMove)
  stage.addEventListener('keydown', onKey)

  if (still.matches) {
    showAll()
    draw(true)
  } else {
    write()
    draw(false)
  }

  return () => {
    cancelAnimationFrame(frame)
    window.clearTimeout(boostTimer)
    io.disconnect()
    stage.removeEventListener('pointermove', onMove)
    stage.removeEventListener('keydown', onKey)
  }
}
