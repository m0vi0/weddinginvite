import { Section } from '../layout/Section'
import { AnimatedText } from '../ui/AnimatedText'
import { Divider } from '../ui/Divider'
import { RSVPForm } from './RSVPForm'

export function RSVPSection() {
  return (
    <Section id="rsvp" bg="ivory" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="mb-16 text-center">
          <p className="font-sans text-[11px] uppercase tracking-[0.45em] text-gold">
            Kindly Respond
          </p>
          <AnimatedText
            as="h2"
            text="Your presence is our present"
            className="mt-4 font-serif text-4xl leading-tight text-burgundy sm:text-5xl md:text-6xl"
          />
          <Divider />
          <p className="mx-auto mt-8 max-w-xl font-body text-lg leading-relaxed text-charcoal-light">
            Please let us know by <strong className="font-sans text-charcoal">January 15, 2027</strong>.
            We'd be honored to have you there.
          </p>
        </div>

        <RSVPForm />
      </div>
    </Section>
  )
}