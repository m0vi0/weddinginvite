import { useState, useCallback } from 'react'
import { AnimatePresence } from 'motion/react'
import { Section } from '../layout/Section'
import { AnimatedText } from '../ui/AnimatedText'
import { GalleryGrid } from './GalleryGrid'
import { Lightbox } from './Lightbox'
import { galleryImages } from '../../data/wedding'

export function GallerySection() {
  const [active, setActive] = useState<number | null>(null)

  const open = useCallback((i: number) => setActive(i), [])
  const close = useCallback(() => setActive(null), [])
  const nav = useCallback(
    (dir: number) =>
      setActive((cur) =>
        cur === null ? cur : (cur + dir + galleryImages.length) % galleryImages.length
      ),
    []
  )

  return (
    <Section id="gallery" bg="blush" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="font-sans text-[11px] uppercase tracking-[0.45em] text-gold">
            In Frames
          </p>
          <AnimatedText
            as="h2"
            text="Moments in the making"
            className="mt-4 font-serif text-4xl leading-tight text-burgundy sm:text-5xl md:text-6xl"
          />
        </div>

        <GalleryGrid onOpen={open} />
      </div>

      <AnimatePresence>
        {active !== null && (
          <Lightbox index={active} onClose={close} onNav={nav} />
        )}
      </AnimatePresence>
    </Section>
  )
}