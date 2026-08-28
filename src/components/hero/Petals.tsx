import { useMemo } from 'react'
import { motion } from 'motion/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { petals } from '../../data/wedding'

interface PetalSeed {
  id: number
  x: number
  delay: number
  duration: number
  size: number
  color: string
  sway: number
  swayDur: number
  rotateTarget: number
  opacity: number
}

/**
 * Lightweight falling petal field, done in CSS/DOM (no WebGL cost).
 * Petals drift down with a sinusoidal sway and spin. Fully disabled for
 * reduced-motion users. `pointer-events-none` so it never blocks interaction.
 */
export function Petals({ count = 22 }: { count?: number }) {
  const reduced = useReducedMotion()

  const seeds = useMemo<PetalSeed[]>(() => {
    const colors = petals.colors
    return Array.from({ length: count }, (_, i) => {
      const color = colors[i % colors.length]
      return {
        id: i,
        x: Math.random() * 100,
        delay: -Math.random() * 16, // stagger start so the field is already populated
        duration: 12 + Math.random() * 10,
        size: 7 + Math.random() * 9,
        sway: 20 + Math.random() * 70,
        swayDur: 3 + Math.random() * 4,
        rotateTarget: 180 + Math.random() * 360,
        opacity: 0.35 + Math.random() * 0.5,
        color,
      }
    })
  }, [count])

  if (reduced) return null

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {seeds.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-[50%_0_50%_0]"
          style={{
            left: `${p.x}%`,
            top: -20,
            width: p.size,
            height: p.size * 1.35,
            backgroundColor: p.color,
            opacity: p.opacity,
            boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
          }}
          animate={{
            y: ['-5vh', '108vh'],
            x: [0, p.sway, 0, -p.sway * 0.6, 0],
            rotate: [0, p.rotateTarget],
          }}
          transition={{
            y: { duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' },
            x: { duration: p.swayDur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: p.duration * 1.6, delay: p.delay, repeat: Infinity, ease: 'linear' },
          }}
        />
      ))}
    </div>
  )
}