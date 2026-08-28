import { forwardRef, type ReactNode } from 'react'

interface SectionProps {
  id: string
  children: ReactNode
  className?: string
  fullHeight?: boolean
  bg?: 'ivory' | 'burgundy' | 'charcoal' | 'blush' | 'warm-white'
}

const bgMap = {
  ivory: 'bg-ivory text-charcoal',
  burgundy: 'bg-burgundy text-ivory',
  charcoal: 'bg-charcoal text-ivory',
  blush: 'bg-blush text-charcoal',
  'warm-white': 'bg-warm-white text-charcoal',
} as const

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ id, children, className = '', fullHeight = false, bg = 'ivory' }, ref) => (
    <section
      ref={ref}
      id={id}
      aria-label={id}
      className={`relative w-full ${fullHeight ? 'min-h-screen' : ''} ${bgMap[bg]} ${className}`}
    >
      {children}
    </section>
  )
)

Section.displayName = 'Section'