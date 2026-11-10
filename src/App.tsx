import { useCallback, useEffect, useState } from 'react'
import { ScrollTrigger } from './lib/motion'
import { initSmoothScroll } from './lib/scroll'
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

export default function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const stop = initSmoothScroll()
    // Fonts change line breaks, which moves every trigger.
    document.fonts.ready.then(() => ScrollTrigger.refresh())
    return stop
  }, [])

  const onLoaded = useCallback(() => setReady(true), [])

  return (
    <>
      <Preloader onDone={onLoaded} />
      <Cursor />
      <Nav />
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
