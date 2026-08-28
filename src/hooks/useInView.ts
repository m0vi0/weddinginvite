import { useRef, type RefObject } from 'react'
import { useInView as useMotionInView, type UseInViewOptions as MotionInViewOptions } from 'motion/react'

interface UseInViewOptions {
  once?: boolean
  margin?: MotionInViewOptions['margin']
}

interface UseInViewResult<T extends HTMLElement> {
  ref: RefObject<T | null>
  isInView: boolean
}

export function useInView<T extends HTMLElement = HTMLDivElement>(
  options?: UseInViewOptions
): UseInViewResult<T> {
  const ref = useRef<T>(null)
  const isInView = useMotionInView(ref, {
    once: options?.once ?? true,
    margin: options?.margin ?? '-100px 0px',
  })
  return { ref, isInView }
}