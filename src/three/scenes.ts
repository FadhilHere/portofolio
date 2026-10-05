// One preset per page section, in the same order as SECTION_IDS in lib/scroll.ts.
// shape: index into buildShapes(); x/y: world offset (desktop); tilt: rotation
// about X applied after the spin, so flat shapes spin in their own plane;
// palette: three dot colours; balance: share of the second colour (0..1).
export type ScenePreset = {
  shape: number
  x: number
  y: number
  scale: number
  tilt: number
  spin: number
  opacity: number
  balance: number
  palette: [string, string, string]
}

const INK = '#1a1830'
const INDIGO = '#3b32f0'
const TOMATO = '#ff5b2e'
const PAPER = '#f4f1ea'
const BUTTER = '#ffedaa'

const PRINT: ScenePreset['palette'] = [INDIGO, TOMATO, INK]

export const SCENES: ScenePreset[] = [
  { shape: 0, x: 3.3, y: -0.15, scale: 0.78, tilt: 0, spin: 0.08, opacity: 0.95, balance: 0.3, palette: PRINT }, // hero — core
  { shape: 1, x: -2.9, y: 0, scale: 0.95, tilt: 0, spin: 0.06, opacity: 0.75, balance: 0.5, palette: PRINT }, // about — orbit
  { shape: 2, x: 3.4, y: 0, scale: 0.95, tilt: 0, spin: 0.14, opacity: 0.55, balance: 0.25, palette: PRINT }, // experience — helix
  { shape: 3, x: 0, y: -1.7, scale: 1.1, tilt: 0.7, spin: 0.05, opacity: 0.45, balance: 0.6, palette: PRINT }, // projects — data field
  { shape: 4, x: -4.6, y: 0, scale: 0.85, tilt: 0, spin: 0.1, opacity: 0.55, balance: 0.35, palette: PRINT }, // recognition — crystal
  { shape: 5, x: 0, y: 0, scale: 1.1, tilt: 1.05, spin: 0.09, opacity: 0.5, balance: 0.5, palette: PRINT }, // skills — galaxy
  { shape: 0, x: 2.9, y: 0.2, scale: 0.95, tilt: 0, spin: 0.06, opacity: 0.55, balance: 0.35, palette: [PAPER, TOMATO, BUTTER] }, // contact — on indigo
]
