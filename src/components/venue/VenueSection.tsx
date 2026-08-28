import { motion } from 'motion/react'
import { Section } from '../layout/Section'
import { ParallaxImage } from '../ui/ParallaxImage'
import { venue } from '../../data/wedding'
import { useInView } from '../../hooks/useInView'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { easing } from '../../design-tokens'

export function VenueSection() {
  const { ref, isInView } = useInView()
  const reduced = useReducedMotion()

  return (
    <Section id="venue" bg="charcoal" className="relative">
      {/* Full-bleed parallax hero image */}
      <div className="relative h-[60vh] min-h-[420px] w-full md:h-[75vh]">
        <ParallaxImage
          src={venue.image}
          alt={`${venue.name}, ${venue.city}`}
          speed={0.18}
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-charcoal/30" />
      </div>

      <motion.div
        ref={ref}
        initial={reduced ? false : { opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: easing.smooth }}
        className="relative z-10 mx-auto -mt-28 max-w-3xl px-6 pb-24 text-center sm:-mt-40"
      >
        <p className="font-sans text-[11px] uppercase tracking-[0.45em] text-gold">
          The Venue
        </p>
        <h2 className="mt-4 font-serif text-5xl leading-tight text-ivory sm:text-6xl md:text-7xl">
          {venue.name}
        </h2>
        <p className="mt-2 font-body text-2xl italic text-gold">{venue.city}</p>

        <p className="mx-auto mt-8 max-w-xl font-body text-xl leading-relaxed text-ivory/80">
          {venue.description}
        </p>

        <address className="mt-8 font-sans text-sm not-italic tracking-wide text-ivory/60">
          {venue.address}
        </address>

        <a
          href={venue.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block border border-gold/50 px-9 py-3.5 font-sans text-[11px] uppercase tracking-[0.3em] text-gold transition-colors duration-500 hover:bg-gold hover:text-charcoal"
        >
          Get Directions
        </a>
      </motion.div>
    </Section>
  )
}