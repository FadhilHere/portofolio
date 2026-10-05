import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import { ParticleMorph } from './ParticleMorph'
import { isCompact } from '../lib/motion'

// Fixed, transparent WebGL layer. It sits above the section backgrounds and
// below the section content (see SectionShell for the stacking order).
export default function Scene() {
  const [compact] = useState(isCompact)
  const [dpr, setDpr] = useState(compact ? 1.5 : 2)

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 7], fov: 45, near: 0.1, far: 60 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} />
        <ParticleMorph count={compact ? 7000 : 16000} compact={compact} />
      </Canvas>
    </div>
  )
}
