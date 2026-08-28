import { Section } from '../layout/Section'
import { HeroContent } from './HeroContent'
import { HeroScene } from './HeroScene'
import { Petals } from './Petals'

export function Hero() {
  return (
    <Section
      id="hero"
      fullHeight
      bg="ivory"
      className="relative overflow-hidden flex items-center justify-center"
    >
      {/* 3D centerpiece behind the text (lazy, z-0) */}
      <HeroScene />

      {/* floating marigold petals */}
      <Petals count={22} />

      {/* names / date / CTA */}
      <HeroContent />

      {/* subtle bottom vignette to ground the hero */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ivory to-transparent" />
    </Section>
  )
}