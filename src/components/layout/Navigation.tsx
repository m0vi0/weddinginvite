import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { easing } from '../../design-tokens'

const sections = [
  'hero',
  'couple',
  'story',
  'events',
  'venue',
  'gallery',
  'rsvp',
  'closing',
] as const

type SectionId = (typeof sections)[number]

export function Navigation() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState<SectionId>('hero')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.4)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (reduced) return
    const observers: IntersectionObserver[] = []

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
              setActive(id)
            }
          })
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: [0.3] }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [reduced])

  const scrollTo = (id: SectionId) => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  if (reduced || !visible) return null

  return (
    <nav
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-3 pr-2"
      aria-label="Section navigation"
    >
      {sections.map((id, i) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          aria-label={id.charAt(0).toUpperCase() + id.slice(1)}
          className="group relative"
        >
          <motion.span
            className="absolute right-0 top-1/2 -translate-y-1/2 w-12 opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100 sm:right-14"
            style={{ transformOrigin: 'right' }}
          >
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold">
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </span>
          </motion.span>
          <motion.div
            initial={reduced ? false : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: easing.smooth }}
            className={`relative h-2.5 w-2.5 rounded-full transition-all duration-500 ${
              active === id
                ? 'bg-gold scale-125 shadow-[0_0_0_4px_rgba(201,168,76,0.3)]'
                : 'bg-ivory/60 hover:bg-gold/60 hover:scale-125'
            }`}
          />
        </button>
      ))}
    </nav>
  )
}