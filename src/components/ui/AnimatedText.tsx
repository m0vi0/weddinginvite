import { motion } from 'motion/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useInView } from '../../hooks/useInView'

interface AnimatedTextProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
  splitBy?: 'word' | 'character'
  delay?: number
  staggerDelay?: number
}

/**
 * Animates text in as characters or words spill up from below — used for
 * headings and key editorial copy. Respects prefers-reduced-motion.
 */
export function AnimatedText({
  text,
  as: Tag = 'p',
  className = '',
  splitBy = 'word',
  delay = 0,
  staggerDelay = 0.05,
}: AnimatedTextProps) {
  const reduced = useReducedMotion()
  const { ref, isInView } = useInView()

  if (reduced) {
    return <Tag className={className}>{text}</Tag>
  }

  const units = splitBy === 'word' ? text.split(' ') : text.split('')
  const separator = splitBy === 'word' ? '\u00A0' : ''

  return (
    <Tag ref={ref as never} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-flex flex-wrap">
        {units.map((unit, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: '110%', opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1],
              delay: delay + i * staggerDelay,
            }}
          >
            {unit}
            {separator}
          </motion.span>
        ))}
      </span>
    </Tag>
  )
}