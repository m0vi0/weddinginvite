import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { music } from '../../data/wedding'

/**
 * Floating mute/unmute control for the site's background song.
 *
 * Browsers block audio that autoplays with sound until the user interacts, so:
 *  - we attempt a muted autoplay on mount (always permitted),
 *  - we upgrade to audible on the first pointer/key gesture anywhere,
 *  - the button toggles play/pause at any time.
 *
 * Under prefers-reduced-motion the audio never auto-starts — only the manual
 * button is offered.
 */
export function MusicPlayer() {
  const reduced = useReducedMotion()
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.35
    audio.loop = true

    // Attempt muted autoplay (allowed); flip to audible on first gesture.
    const startMuted = () => {
      audio.muted = true
      audio
        .play()
        .then(() => {
          setMounted(true)
          const onGesture = () => {
            if (audio.paused) return
            audio.muted = false
            setPlaying(true)
            cleanup()
          }
          const cleanup = () => {
            window.removeEventListener('pointerdown', onGesture)
            window.removeEventListener('keydown', onGesture)
          }
          window.addEventListener('pointerdown', onGesture, { once: true })
          window.addEventListener('keydown', onGesture, { once: true })
        })
        .catch(() => {
          // Fully blocked even muted (rare) — rely on manual button.
          setMounted(true)
        })
    }
    startMuted()

    return () => {
      audio.pause()
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.muted = false
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {})
    }
  }

  // Reduced-motion: no autoplay, just a manual button.
  if (reduced) {
    return (
      <button
        onClick={toggle}
        aria-label="Play music"
        className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 bg-ivory/80 text-gold backdrop-blur transition-colors hover:bg-gold hover:text-ivory"
      >
        ♪
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <audio ref={audioRef} src={music.src} preload="auto" />
      <AnimatePresence>
        {mounted && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={toggle}
            aria-label={playing ? 'Mute music' : 'Play music'}
            aria-pressed={playing}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 bg-ivory/80 text-lg text-gold backdrop-blur transition-colors hover:bg-gold hover:text-ivory"
          >
            {playing ? '♫' : '♪'}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}