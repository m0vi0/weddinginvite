import { motion } from 'motion/react'
import { Section } from '../layout/Section'
import { AnimatedText } from '../ui/AnimatedText'
import { Countdown } from './Countdown'
import { closing, couple } from '../../data/wedding'
import { useInView } from '../../hooks/useInView'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { easing } from '../../design-tokens'

export function ClosingSection() {
  const { ref, isInView } = useInView()
  const reduced = useReducedMotion()

  return (
    <Section
      id="closing"
      bg="burgundy"
      ref={ref}
      className="relative overflow-hidden px-6 py-24 sm:py-32"
    >
      {/* subtle vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-burgundy-deep/20 to-transparent" />

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: easing.smooth }}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <AnimatedText
          as="h2"
          text={closing.message}
          className="font-serif text-4xl leading-tight text-ivory sm:text-5xl md:text-6xl"
        />

        <Countdown />

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: easing.smooth }}
          className="mt-16 font-body text-2xl italic text-gold"
        >
          {closing.tagline}
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8, ease: easing.smooth }}
          className="mt-10 flex items-center justify-center gap-4 text-ivory/70"
        >
          <span className="font-serif text-4xl">✦</span>
          <span className="font-sans text-xs uppercase tracking-[0.4em]">
            {couple.partner1.name} & {couple.partner2.name}
          </span>
          <span className="font-serif text-4xl">✦</span>
        </motion.div>
      </motion.div>
    </Section>
  )
}