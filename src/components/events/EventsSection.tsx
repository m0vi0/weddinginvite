import { Section } from '../layout/Section'
import { AnimatedText } from '../ui/AnimatedText'
import { Divider } from '../ui/Divider'
import { EventCard } from './EventCard'
import { events } from '../../data/wedding'

export function EventsSection() {
  return (
    <Section id="events" bg="ivory" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <p className="font-sans text-[11px] uppercase tracking-[0.45em] text-gold">
            The Celebrations
          </p>
          <AnimatedText
            as="h2"
            text="A festival of days"
            className="mt-4 font-serif text-4xl leading-tight text-burgundy sm:text-5xl md:text-6xl"
          />
          <Divider />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
          {events.map((_, i) => (
            <EventCard key={i} index={i} />
          ))}
        </div>
      </div>
    </Section>
  )
}