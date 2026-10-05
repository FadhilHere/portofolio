// Point-cloud generators. Every generator returns exactly `n` xyz triplets so any
// two shapes can be morphed particle-for-particle in the vertex shader.

type Vec3 = [number, number, number]

const rand = (min = 0, max = 1) => min + Math.random() * (max - min)
const gauss = () => {
  // Box–Muller, clamped to avoid rare far outliers.
  const u = 1 - Math.random()
  const v = Math.random()
  return Math.max(-3, Math.min(3, Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)))
}

function rotateX([x, y, z]: Vec3, a: number): Vec3 {
  const c = Math.cos(a)
  const s = Math.sin(a)
  return [x, y * c - z * s, y * s + z * c]
}

function rotateZ([x, y, z]: Vec3, a: number): Vec3 {
  const c = Math.cos(a)
  const s = Math.sin(a)
  return [x * c - y * s, x * s + y * c, z]
}

function fill(n: number, pointAt: (i: number) => Vec3) {
  const out = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) {
    const [x, y, z] = pointAt(i)
    out[i * 3] = x
    out[i * 3 + 1] = y
    out[i * 3 + 2] = z
  }
  return out
}

/** Fibonacci-sphere shell with a sparse inner volume — the "core". */
export function sphere(n: number, radius = 2) {
  const golden = Math.PI * (3 - Math.sqrt(5))
  return fill(n, (i) => {
    if (i % 7 === 0) {
      const r = radius * 0.85 * Math.cbrt(Math.random())
      const t = rand(0, Math.PI * 2)
      const p = Math.acos(rand(-1, 1))
      return [r * Math.sin(p) * Math.cos(t), r * Math.cos(p), r * Math.sin(p) * Math.sin(t)]
    }
    const y = 1 - (i / (n - 1)) * 2
    const ring = Math.sqrt(1 - y * y)
    const theta = golden * i
    const r = radius * (1 + gauss() * 0.012)
    return [Math.cos(theta) * ring * r, y * r, Math.sin(theta) * ring * r]
  })
}

/** Tilted torus with a faint outer orbit disk. */
export function ring(n: number) {
  return fill(n, (i) => {
    const t = rand(0, Math.PI * 2)
    let p: Vec3
    if (i % 4 === 0) {
      const r = rand(2.7, 3.4)
      p = [Math.cos(t) * r, gauss() * 0.03, Math.sin(t) * r]
    } else {
      const u = rand(0, Math.PI * 2)
      const minor = 0.1 + Math.abs(gauss()) * 0.12
      const R = 2.1 + Math.cos(u) * minor
      p = [Math.cos(t) * R, Math.sin(u) * minor, Math.sin(t) * R]
    }
    return rotateZ(rotateX(p, 1.15), 0.35)
  })
}

/** Vertical double helix with rungs — reads as a timeline. */
export function helix(n: number) {
  const height = 7.5
  const radius = 1.15
  const turns = 3.2
  const rungs = 30
  const strandPoint = (t: number, strand: number): Vec3 => {
    const a = t * turns * Math.PI * 2 + strand * Math.PI
    return [Math.cos(a) * radius, (t - 0.5) * height, Math.sin(a) * radius]
  }
  return fill(n, (i) => {
    const kind = i % 10
    if (kind < 6) {
      const [x, y, z] = strandPoint(Math.random(), i % 2)
      return [x + gauss() * 0.04, y + gauss() * 0.04, z + gauss() * 0.04]
    }
    if (kind < 9) {
      const t = (Math.floor(Math.random() * rungs) + 0.5) / rungs
      const a = strandPoint(t, 0)
      const b = strandPoint(t, 1)
      const u = Math.random()
      return [a[0] + (b[0] - a[0]) * u, a[1] + gauss() * 0.015, a[2] + (b[2] - a[2]) * u]
    }
    const r = rand(1.6, 2.6)
    const t = rand(0, Math.PI * 2)
    return [Math.cos(t) * r, rand(-height / 2, height / 2), Math.sin(t) * r]
  })
}

/** Flat phyllotaxis disc with a rippled surface — a field of data. Tilt is
 *  applied by the scene preset so the disc can spin in its own plane. */
export function waveField(n: number) {
  const golden = Math.PI * (3 - Math.sqrt(5))
  const radius = 4.2
  return fill(n, (i) => {
    const r = Math.sqrt((i + 0.5) / n) * radius
    const a = i * golden
    const x = Math.cos(a) * r
    const z = Math.sin(a) * r
    const y = Math.sin(r * 1.6) * 0.22 * (1 - r / radius) + Math.sin(x * 0.9 + z * 0.5) * 0.18
    return [x, y, z]
  })
}

function icosahedron(radius: number) {
  const t = (1 + Math.sqrt(5)) / 2
  const raw: Vec3[] = [
    [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
    [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
    [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1],
  ]
  const verts = raw.map(([x, y, z]) => {
    const len = Math.hypot(x, y, z)
    return [(x / len) * radius, (y / len) * radius, (z / len) * radius] as Vec3
  })
  const edgeLen = Math.hypot(verts[0][0] - verts[1][0], verts[0][1] - verts[1][1], verts[0][2] - verts[1][2])
  const edges: [Vec3, Vec3][] = []
  for (let a = 0; a < verts.length; a++)
    for (let b = a + 1; b < verts.length; b++) {
      const d = Math.hypot(verts[a][0] - verts[b][0], verts[a][1] - verts[b][1], verts[a][2] - verts[b][2])
      if (Math.abs(d - edgeLen) < 1e-3) edges.push([verts[a], verts[b]])
    }
  return { verts, edges }
}

/** Nested icosahedral crystal — structure, precision, achievement. */
export function crystal(n: number) {
  const outer = icosahedron(2.2)
  const inner = icosahedron(1.0)
  return fill(n, (i) => {
    const kind = i % 20
    if (kind < 11) {
      const [a, b] = outer.edges[Math.floor(Math.random() * outer.edges.length)]
      const u = Math.random()
      return [a[0] + (b[0] - a[0]) * u + gauss() * 0.02, a[1] + (b[1] - a[1]) * u + gauss() * 0.02, a[2] + (b[2] - a[2]) * u + gauss() * 0.02]
    }
    if (kind < 14) {
      const v = outer.verts[Math.floor(Math.random() * outer.verts.length)]
      return [v[0] + gauss() * 0.07, v[1] + gauss() * 0.07, v[2] + gauss() * 0.07]
    }
    const [a, b] = inner.edges[Math.floor(Math.random() * inner.edges.length)]
    const u = Math.random()
    const p: Vec3 = [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u, a[2] + (b[2] - a[2]) * u]
    return rotateZ(rotateX(p, 0.6), 0.4)
  })
}

/** Four-armed spiral galaxy in the XZ plane (tilted by its scene preset). */
export function galaxy(n: number) {
  const arms = 4
  const radius = 3.6
  return fill(n, (i) => {
    const r = Math.pow(Math.random(), 1.5) * radius
    const branch = ((i % arms) / arms) * Math.PI * 2
    const spin = r * 1.15
    const scatter = (axis: number) => Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.45 * (r + 0.2) * axis
    return [Math.cos(branch + spin) * r + scatter(1), scatter(0.35), Math.sin(branch + spin) * r + scatter(1)]
  })
}

export function buildShapes(n: number) {
  return [sphere(n), ring(n), helix(n), waveField(n), crystal(n), galaxy(n)]
}
