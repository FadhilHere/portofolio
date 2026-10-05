import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { buildShapes } from './shapes'
import { SCENES } from './scenes'
import { fragmentShader, vertexShader } from './shaders'
import { getSceneProgress, sceneState } from '../lib/scroll'
import { finePointer, reducedMotion } from '../lib/motion'

const { damp, lerp, clamp } = THREE.MathUtils
const smooth = (t: number) => t * t * (3 - 2 * t)
const PALETTES = SCENES.map((s) => s.palette.map((hex) => new THREE.Color(hex)))
const scratch = new THREE.Color()

export function ParticleMorph({ count, compact }: { count: number; compact: boolean }) {
  const points = useRef<THREE.Points>(null!)
  const { camera } = useThree()

  const geometry = useMemo(() => {
    const shapes = buildShapes(count)
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(shapes[0], 3))
    shapes.forEach((s, i) => g.setAttribute(`aS${i}`, new THREE.BufferAttribute(s, 3)))
    const random = new Float32Array(count)
    const size = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      random[i] = Math.random()
      size[i] = 0.45 + Math.pow(Math.random(), 5) * 2.2
    }
    g.setAttribute('aRandom', new THREE.BufferAttribute(random, 1))
    g.setAttribute('aSize', new THREE.BufferAttribute(size, 1))
    return g
  }, [count])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uFrom: { value: 0 },
      uTo: { value: 0 },
      uMix: { value: 0 },
      uIntro: { value: reducedMotion ? 1 : 0 },
      uSize: { value: compact ? 32 : 24 },
      uPixelRatio: { value: 1 },
      uScatter: { value: 0 },
      uMouse: { value: new THREE.Vector3(99, 99, 0) },
      uMouseStrength: { value: 0 },
      uColorA: { value: PALETTES[0][0].clone() },
      uColorB: { value: PALETTES[0][1].clone() },
      uColorC: { value: PALETTES[0][2].clone() },
      uBalance: { value: SCENES[0].balance },
      uOpacity: { value: 0 },
    }),
    [compact],
  )

  const material = useRef<THREE.ShaderMaterial>(null!)
  const live = useRef({ ...SCENES[0], spinAngle: 0, rx: 0, ry: 0 })

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 20)
    // Always write to the uniforms the material actually holds: under StrictMode
    // the memoised object above is not guaranteed to be the one it was built with.
    const u = material.current.uniforms as typeof uniforms
    const cur = live.current

    // Which two scenes are we between, and how far along?
    const progress = getSceneProgress(window.scrollY)
    const from = Math.min(Math.floor(progress), SCENES.length - 1)
    const to = Math.min(from + 1, SCENES.length - 1)
    const mix = progress - from
    const A = SCENES[from]
    const B = SCENES[to]
    u.uFrom.value = A.shape
    u.uTo.value = B.shape
    u.uMix.value = mix

    // Layout eases between presets, then damps for weight. Narrow screens
    // centre the cloud behind the copy and shrink it to fit.
    const e = smooth(mix)
    const aspect = state.size.width / state.size.height
    const fit = clamp(aspect / 1.7, 0.45, 1)
    const target = {
      x: compact ? 0 : lerp(A.x, B.x, e) * fit,
      y: lerp(A.y, B.y, e) * (compact ? 0.6 : 1),
      scale: lerp(A.scale, B.scale, e) * (compact ? 0.62 : Math.max(fit, 0.8)),
      tilt: lerp(A.tilt, B.tilt, e),
      spin: lerp(A.spin, B.spin, e),
      opacity: lerp(A.opacity, B.opacity, e) * (compact ? 0.6 : 1),
      balance: lerp(A.balance, B.balance, e),
    }
    cur.x = damp(cur.x, target.x, 3.5, dt)
    cur.y = damp(cur.y, target.y, 3.5, dt)
    cur.scale = damp(cur.scale, target.scale, 3.5, dt)
    cur.tilt = damp(cur.tilt, target.tilt, 3.5, dt)
    cur.opacity = damp(cur.opacity, target.opacity, 3, dt)
    cur.balance = damp(cur.balance, target.balance, 3, dt)

    // Ink colours follow the section too (light dots on the indigo contact).
    const k = 1 - Math.exp(-3 * dt)
    const inks = [u.uColorA, u.uColorB, u.uColorC]
    for (let i = 0; i < 3; i++) inks[i].value.lerp(scratch.lerpColors(PALETTES[from][i], PALETTES[to][i], e), k)

    if (!reducedMotion) {
      u.uTime.value += dt
      cur.spinAngle += target.spin * dt
    }

    // Pointer: parallax tilt + repulsion field in world space.
    const { pointer } = sceneState
    const interactive = finePointer && !reducedMotion && pointer.active
    const cam = camera as THREE.PerspectiveCamera
    const halfH = Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)) * cam.position.z
    u.uMouse.value.x = damp(u.uMouse.value.x, pointer.x * halfH * aspect, 8, dt)
    u.uMouse.value.y = damp(u.uMouse.value.y, pointer.y * halfH, 8, dt)
    u.uMouseStrength.value = damp(u.uMouseStrength.value, interactive ? 1 : 0, 4, dt)
    cur.rx = damp(cur.rx, interactive ? -pointer.y * 0.12 : 0, 2.5, dt)
    cur.ry = damp(cur.ry, interactive ? pointer.x * 0.2 : 0, 2.5, dt)

    // Fast scrolling briefly shakes the cloud loose.
    const scatter = reducedMotion ? 0 : clamp(Math.abs(sceneState.velocity) / 60, 0, 1)
    u.uScatter.value = damp(u.uScatter.value, scatter, 4, dt)
    // Lenis only reports velocity while scrolling; let a stale value fade out.
    sceneState.velocity = damp(sceneState.velocity, 0, 5, dt)

    if (sceneState.ready && u.uIntro.value < 1) u.uIntro.value = Math.min(1, u.uIntro.value + dt / 2.6)

    u.uOpacity.value = cur.opacity * Math.min(1, u.uIntro.value * 2.5)
    u.uBalance.value = cur.balance
    u.uPixelRatio.value = state.gl.getPixelRatio()

    const p = points.current
    p.position.set(cur.x, cur.y, 0)
    p.scale.setScalar(cur.scale)
    p.rotation.set(cur.tilt + cur.rx, cur.spinAngle + cur.ry, 0)
  })

  return (
    <points ref={points} geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  )
}
