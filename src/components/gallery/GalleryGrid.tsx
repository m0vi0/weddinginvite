import { motion } from 'motion/react'
import { galleryImages } from '../../data/wedding'
import { useInView } from '../../hooks/useInView'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { easing } from '../../design-tokens'

const aspectClass = {
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  square: 'aspect-square',
} as const

/**
 * A simple, robust masonry: items are distributed into N CSS columns so varied
 * aspect ratios pack naturally. Each cell shares a layoutId with the lightbox
 * for a seamless shared-element open/close.
 */
export function GalleryGrid({ onOpen }: { onOpen: (i: number) => void }) {
  const reduced = useReducedMotion()
  const { ref, isInView } = useInView()

  return (
    <div ref={ref} className="columns-2 gap-4 md:columns-3 [&>*]:mb-4">
      {galleryImages.map((img, i) => (
        <motion.button
          key={img.src}
          layoutId={reduced ? undefined : `gallery-${i}`}
          onClick={() => onOpen(i)}
          initial={reduced ? false : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: easing.smooth }}
          className="group relative block w-full overflow-hidden bg-blush/40"
          aria-label={`Open image: ${img.alt}`}
        >
          <div className={`relative ${aspectClass[img.aspect]}`}>
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-charcoal/0 transition-colors duration-500 group-hover:bg-charcoal/20" />
            <span className="absolute bottom-3 right-3 font-serif text-xl text-ivory opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              ⤢
            </span>
          </div>
        </motion.button>
      ))}
    </div>
  )
}