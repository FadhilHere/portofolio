import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { Flip } from 'gsap/Flip'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, Flip)

export { gsap, ScrollTrigger, SplitText, Flip, useGSAP }

export const reducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const finePointer = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches

export const isCompact = () => typeof window !== 'undefined' && window.innerWidth < 768
