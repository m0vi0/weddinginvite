import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  speed?: number // fraction of container height the image travels; 0.15 subtle, 0.5 dramatic
}

/**
 * Image that drifts vertically against scroll for subtle editorial depth.
 * The image is oversized inside an overflow-hidden frame so it never reveals
 * empty space at either scroll extreme.
 */
export function ParallaxImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  speed = 0.15,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={reduced ? undefined : { y }}
        className={`pointer-events-none h-[125%] w-full min-h-full object-cover ${imgClassName}`}
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}