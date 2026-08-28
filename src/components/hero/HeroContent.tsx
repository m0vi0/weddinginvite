import { motion } from 'motion/react'
import { couple, venue, weddingDate } from '../../data/wedding'
import { MagneticButton } from '../ui/MagneticButton'
import { easing } from '../../design-tokens'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.22, delayChildren: 1.0 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: easing.smooth },
  },
}

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.4, ease: easing.cinematic },
  },
}

export function HeroContent() {
  const dateStr = weddingDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const scrollToRsvp = () => {
    document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-5 px-6 py-24 text-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center gap-5"
      >
        <motion.p
          variants={itemVariants}
          className="font-sans text-[11px] uppercase tracking-[0.45em] text-charcoal-light/80 sm:text-xs"
        >
          Together with their families
        </motion.p>

        <motion.span
          variants={lineVariants}
          className="h-px w-24 bg-gold/60"
          style={{ originX: 0.5 }}
        />

        <motion.h1
          variants={itemVariants}
          className="font-serif text-[19vw] leading-[0.92] tracking-tight text-burgundy sm:text-7xl md:text-8xl lg:text-[7.5rem]"
        >
          {couple.partner1.name}
        </motion.h1>

        <motion.span
          variants={itemVariants}
          className="-my-1 font-body text-3xl italic text-gold sm:text-4xl"
        >
          &amp;
        </motion.span>

        <motion.h1
          variants={itemVariants}
          className="font-serif text-[19vw] leading-[0.92] tracking-tight text-burgundy sm:text-7xl md:text-8xl lg:text-[7.5rem]"
        >
          {couple.partner2.name}
        </motion.h1>

        <motion.span
          variants={lineVariants}
          className="h-px w-24 bg-gold/60"
          style={{ originX: 0.5 }}
        />

        <motion.p
          variants={itemVariants}
          className="font-body text-lg tracking-wide text-charcoal sm:text-xl"
        >
          {dateStr}
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="-mt-2 font-sans text-[11px] uppercase tracking-[0.4em] text-charcoal-light/70 sm:text-xs"
        >
          {venue.city}
        </motion.p>

        <motion.div variants={itemVariants}>
          <MagneticButton
            className="mt-5 border border-gold/50 px-9 py-3.5 font-sans text-[11px] uppercase tracking-[0.3em] text-gold transition-colors duration-500 hover:bg-gold hover:text-ivory"
            onClick={scrollToRsvp}
          >
            View Invitation
          </MagneticButton>
        </motion.div>
      </motion.div>
    </div>
  )
}