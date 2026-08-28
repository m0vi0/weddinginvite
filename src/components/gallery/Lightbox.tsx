import { useEffect } from 'react'
import { motion } from 'motion/react'
import { galleryImages } from '../../data/wedding'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function Lightbox({
  index,
  onClose,
  onNav,
}: {
  index: number
  onClose: () => void
  onNav: (dir: number) => void
}) {
  const reduced = useReducedMotion()
  const img = galleryImages[index]

  // Keyboard navigation + ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNav(1)
      if (e.key === 'ArrowLeft') onNav(-1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, onNav])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${index + 1} of ${galleryImages.length}: ${img.alt}`}
    >
      <button
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        aria-label="Close"
        className="absolute right-6 top-6 font-sans text-[11px] uppercase tracking-[0.3em] text-ivory/70 transition hover:text-ivory"
      >
        Close ✕
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation()
          onNav(-1)
        }}
        aria-label="Previous image"
        className="absolute left-3 top-1/2 -translate-y-1/2 px-4 py-6 font-serif text-4xl text-ivory/70 transition hover:text-ivory sm:left-10"
      >
        ‹
      </button>

      <motion.img
        key={index}
        layoutId={reduced ? undefined : `gallery-${index}`}
        src={img.src}
        alt={img.alt}
        className="max-h-[82vh] w-auto max-w-[88vw] object-contain shadow-2xl"
        initial={reduced ? { opacity: 0 } : false}
        animate={reduced ? { opacity: 1 } : undefined}
        onClick={(e) => e.stopPropagation()}
      />

      <button
        onClick={(e) => {
          e.stopPropagation()
          onNav(1)
        }}
        aria-label="Next image"
        className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-6 font-serif text-4xl text-ivory/70 transition hover:text-ivory sm:right-10"
      >
        ›
      </button>

      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-[11px] uppercase tracking-[0.3em] text-ivory/50">
        {img.alt}
      </p>
    </motion.div>
  )
}