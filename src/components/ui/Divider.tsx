import { motion } from 'motion/react'
import { useInView } from '../../hooks/useInView'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function Divider({ className = '' }: { className?: string }) {
  const { ref, isInView } = useInView()
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <div ref={ref} className={`flex items-center justify-center gap-4 py-10 ${className}`}>
        <span className="block h-px w-16 bg-gold/40" />
        <span className="text-gold text-lg leading-none">✦</span>
        <span className="block h-px w-16 bg-gold/40" />
      </div>
    )
  }

  return (
    <div ref={ref} className={`flex items-center justify-center gap-4 py-10 ${className}`}>
      <motion.span
        className="block h-px w-16 bg-gold/40"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ originX: 1 }}
      />
      <motion.span
        className="text-gold text-lg leading-none"
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        ✦
      </motion.span>
      <motion.span
        className="block h-px w-16 bg-gold/40"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ originX: 0 }}
      />
    </div>
  )
}