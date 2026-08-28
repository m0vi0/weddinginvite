import { motion } from 'motion/react'
import { useCountdown } from '../../hooks/useCountdown'
import { weddingDate } from '../../data/wedding'

const CountdownUnit = ({
  label,
  value,
  index,
}: {
  label: string
  value: number
  index: number
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
    className="flex flex-col items-center gap-2 px-4"
  >
    <span className="font-serif text-4xl sm:text-5xl md:text-6xl text-ivory">
      {String(value).padStart(2, '0')}
    </span>
    <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold">
      {label}
    </span>
  </motion.div>
)

export function Countdown() {
  const { days, hours, minutes, seconds, isComplete } = useCountdown(weddingDate)

  if (isComplete) {
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-serif text-3xl text-gold"
      >
        The day has arrived
      </motion.p>
    )
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-8">
      <CountdownUnit label="Days" value={days} index={0} />
      <CountdownUnit label="Hours" value={hours} index={1} />
      <CountdownUnit label="Minutes" value={minutes} index={2} />
      <CountdownUnit label="Seconds" value={seconds} index={3} />
    </div>
  )
}