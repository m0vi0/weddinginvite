import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { Section } from '../layout/Section'
import { AnimatedText } from '../ui/AnimatedText'
import { TimelineItem } from './TimelineItem'
import { story } from '../../data/wedding'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * The story is a scroll-pinned sequence: as the user scrolls through a tall
 * pinned container, a golden rail fills while each milestone reveals in turn.
 * GSAP/ScrollTrigger handles the pin + sequencing (mobile & desktop share the
 * same vertical choreography — no awkward horizontal scroll).
 */
export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<Array<HTMLDivElement | null>>([])
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      const items = itemsRef.current.filter(Boolean) as HTMLDivElement[]

      // 1) Grow the rail from top of first dot to bottom of last dot.
      gsap.fromTo(
        railRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'bottom 55%',
            scrub: true,
          },
        }
      )

      // 2) Reveal items one-by-one as scroll progresses through the section.
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <Section
      id="story"
      bg="warm-white"
      ref={sectionRef}
      className="px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-3xl">
        <div className="mb-16 text-center">
          <AnimatedText
            as="h2"
            text="Our Story"
            className="font-serif text-4xl leading-tight text-burgundy sm:text-5xl md:text-6xl"
          />
          <p className="mx-auto mt-4 max-w-xl font-body text-lg text-charcoal-light">
            Every love has a beginning. Here is the road that brought us here.
          </p>
        </div>

        {/* rail + items */}
        <div className="relative">
          {/* vertical gold rail */}
          <div className="absolute left-[5px] top-2 h-[calc(100%-1rem)] w-px bg-gold/25" />
          <div
            ref={railRef}
            className="absolute left-[5px] top-2 h-[calc(100%-1rem)] w-px origin-top bg-gold"
            style={{ transform: 'scaleY(0)' }}
          />

          <div className="relative flex flex-col gap-16 md:gap-20">
            {story.map((beat, idx) => (
              <TimelineItem
                key={beat.title}
                ref={(el) => {
                  itemsRef.current[idx] = el
                }}
                date={beat.date}
                title={beat.title}
                description={beat.description}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}