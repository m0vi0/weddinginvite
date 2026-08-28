import { Section } from '../layout/Section'
import { MotionWrapper } from '../ui/MotionWrapper'
import { AnimatedText } from '../ui/AnimatedText'
import { ParallaxImage } from '../ui/ParallaxImage'
import { Divider } from '../ui/Divider'
import { couple } from '../../data/wedding'

function Portrait({
  image,
  alt,
  className = '',
}: {
  image: string
  alt: string
  className?: string
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <ParallaxImage
        src={image}
        alt={alt}
        speed={0.12}
        className="aspect-[3/4] w-full"
      />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/20" />
    </div>
  )
}

export function CoupleSection() {
  return (
    <Section id="couple" bg="ivory" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-20 text-center">
          <MotionWrapper animation="fadeIn">
            <p className="font-sans text-[11px] uppercase tracking-[0.45em] text-gold">
              The Bride &amp; Groom
            </p>
          </MotionWrapper>
          <AnimatedText
            as="h2"
            text="Two stories, one beginning"
            className="mt-4 font-serif text-4xl leading-tight text-burgundy sm:text-5xl md:text-6xl"
          />
          <Divider />
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          {/* Partner 1 */}
          <div className="flex flex-col gap-6 md:pr-6">
            <Portrait image={couple.partner1.image} alt={`Portrait of ${couple.partner1.fullName}`} />
            <div>
              <MotionWrapper animation="fadeUp">
                <h3 className="font-serif text-3xl text-burgundy sm:text-4xl">
                  {couple.partner1.fullName}
                </h3>
              </MotionWrapper>
              <MotionWrapper animation="fadeUp" delay={0.1}>
                <p className="mt-4 max-w-md font-body text-lg leading-relaxed text-charcoal-light">
                  {couple.partner1.bio}
                </p>
              </MotionWrapper>
            </div>
          </div>

          {/* Partner 2 */}
          <div className="flex flex-col gap-6 md:pt-20 md:pl-6">
            <Portrait image={couple.partner2.image} alt={`Portrait of ${couple.partner2.fullName}`} />
            <div>
              <MotionWrapper animation="fadeUp">
                <h3 className="font-serif text-3xl text-burgundy sm:text-4xl">
                  {couple.partner2.fullName}
                </h3>
              </MotionWrapper>
              <MotionWrapper animation="fadeUp" delay={0.1}>
                <p className="mt-4 max-w-md font-body text-lg leading-relaxed text-charcoal-light">
                  {couple.partner2.bio}
                </p>
              </MotionWrapper>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}