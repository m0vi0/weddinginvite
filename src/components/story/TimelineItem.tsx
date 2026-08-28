import { forwardRef, type ElementRef } from 'react'

interface TimelineItemProps {
  date: string
  title: string
  description: string
}

/**
 * A single story beat on the timeline. On mobile the rail sits left with the
 * card to its right; on desktop the rail is centered and cards alternate
 * sides. GSAP animates the reveal; structure is a plain card + gold dot.
 */
export const TimelineItem = forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ date, title, description }, ref) => {
    return (
      <div ref={ref} className="relative flex w-full items-start gap-6">
        {/* dot on the rail */}
        <span className="relative left-0 top-1.5 z-10 h-2.5 w-2.5 shrink-0 rounded-full bg-gold shadow-[0_0_0_4px_rgba(201,168,76,0.15)]" />

        <div className="w-full">
          <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold">{date}</p>
          <h4 className="mt-2 font-serif text-2xl text-burgundy sm:text-3xl">{title}</h4>
          <p className="mt-3 max-w-md font-body text-lg leading-relaxed text-charcoal-light">
            {description}
          </p>
        </div>
      </div>
    )
  }
)

TimelineItem.displayName = 'TimelineItem'

export type TimelineItemRef = ElementRef<typeof TimelineItem>