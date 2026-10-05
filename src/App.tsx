import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { ScrollTrigger } from './lib/motion'
import { initSmoothScroll, measureSections, sceneState } from './lib/scroll'
import { Preloader } from './components/Preloader'
import { Cursor } from './components/Cursor'
import { Nav } from './components/Nav'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Experience } from './sections/Experience'
import { Projects } from './sections/Projects'
import { Recognition } from './sections/Recognition'
import { Skills } from './sections/Skills'
import { Contact } from './sections/Contact'

// three.js is the heaviest chunk — load it in parallel with the preloader.
const Scene = lazy(() => import('./three/Scene'))

export default function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const stop = initSmoothScroll()
    ScrollTrigger.addEventListener('refresh', measureSections)
    // Fonts change line breaks, which moves every trigger.
    document.fonts.ready.then(() => ScrollTrigger.refresh())
    return () => {
      stop()
      ScrollTrigger.removeEventListener('refresh', measureSections)
    }
  }, [])

  const onLoaded = useCallback(() => {
    sceneState.ready = true
    setReady(true)
  }, [])

  return (
    <>
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      <Preloader onDone={onLoaded} />
      <Cursor />
      <Nav />
      <div className="grain" aria-hidden="true" />
      {/* No position/z-index here: section backgrounds must stay in the root
          stacking context so the fixed WebGL layer can sit between them and
          the content (see SectionShell). */}
      <main>
        <Hero ready={ready} />
        <About />
        <Experience />
        <Projects />
        <Recognition />
        <Skills />
        <Contact />
      </main>
    </>
  )
}
