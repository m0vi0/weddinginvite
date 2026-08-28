import { motion } from 'motion/react'
import { events } from '../../data/wedding'
import { useInView } from '../../hooks/useInView'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { easing } from '../../design-tokens'

const shimmer = {
  backgroundImage:
    'linear-gradient(110deg, transparent 40%, rgba(201,168,76,0.08) 50%, transparent 60%)',
  backgroundSize: '200% 100%',
}

export function EventCard({ index }: { index: number }) {
  const event = events[index]
  const { ref, isInView } = useInView()
  const reduced = useReducedMotion()

  const stagger = reduced ? 0 : index * 0.12

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 44 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: stagger, ease: easing.smooth }}
      className={`group relative border-l-2 border-gold/30 bg-warm-white px-7 py-8 transition-colors duration-500 hover:border-gold hover:bg-blush/40 ${
        index % 2 === 1 ? 'md:mt-16' : ''
      }`}
    >
      {/* subtle shimmer on hover, non-3D, cheap */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={shimmer}
      />

      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold">
            Event {String(index + 1).padStart(2, '0')}
          </p>
          <h3 className="mt-1 font-serif text-3xl text-burgundy">{event.name}</h3>
        </div>
        <span className="font-body text-xl italic text-gold">✦</span>
      </div>

      <div className="mt-5 space-y-1 font-sans text-sm tracking-wide text-charcoal-light">
        <p>{event.date}</p>
        <p className="text-charcoal/80">{event.time}</p>
      </div>

      <div className="mt-5 border-t border-gold/15 pt-4">
        <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-charcoal/70">
          {event.venue}
        </p>
        <p className="mt-2 inline-block rounded-full border border-gold/30 px-3 py-1 font-sans text-[11px] uppercase tracking-[0.2em] text-gold">
          {event.dressCode}
        </p>
      </div>

      <p className="mt-5 font-body text-lg leading-relaxed text-charcoal-light">
        {event.description}
      </p>
    </motion.div>
  )
}