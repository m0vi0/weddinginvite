import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { easing } from '../../design-tokens'

type Attendance = 'yes' | 'no' | ''
type Meal = 'vegetarian' | 'non-vegetarian' | 'vegan' | ''

const fieldBase =
  'w-full border-b border-charcoal/20 bg-transparent py-3 font-body text-xl text-charcoal outline-none transition-colors duration-300 focus:border-gold placeholder:text-charcoal/30'

const labelBase =
  'mb-2 block font-sans text-[11px] uppercase tracking-[0.3em] text-charcoal/60'

export function RSVPForm() {
  const reduced = useReducedMotion()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    attendance: '' as Attendance,
    guests: '1',
    meal: '' as Meal,
    message: '',
  })

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // TODO: wire to Formspree / Supabase / Google Sheets endpoint.
    // For now we just show a confirmation; wire `form` to your backend.
    console.log('RSVP submission:', form)
    setSubmitted(true)
  }

  const reset = () => {
    setForm({ name: '', email: '', attendance: '', guests: '1', meal: '', message: '' })
    setSubmitted(false)
  }

  if (submitted) {
    return (
      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: easing.smooth }}
        className="mx-auto max-w-xl rounded-sm border border-gold/30 bg-warm-white px-8 py-14 text-center"
      >
        <motion.div
          initial={reduced ? false : { scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold text-3xl text-gold"
        >
          ✦
        </motion.div>
        <h3 className="font-serif text-3xl text-burgundy">Thank you</h3>
        <p className="mt-3 font-body text-lg text-charcoal-light">
          Your response means the world to us. We can't wait to celebrate together.
        </p>
        <button
          onClick={reset}
          className="mt-8 font-sans text-[11px] uppercase tracking-[0.3em] text-gold underline-offset-4 hover:underline"
        >
          Submit another response
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-8">
      <div>
        <label className={labelBase} htmlFor="rsvp-name">
          Your Name
        </label>
        <input
          id="rsvp-name"
          required
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          placeholder="e.g. Aanya Kapoor"
          className={fieldBase}
        />
      </div>

      <div>
        <label className={labelBase} htmlFor="rsvp-email">
          Email
        </label>
        <input
          id="rsvp-email"
          type="email"
          required
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          placeholder="you@example.com"
          className={fieldBase}
        />
      </div>

      <fieldset>
        <legend className={labelBase}>Will you join us?</legend>
        <div className="flex gap-3">
          {(['yes', 'no'] as Attendance[]).map((opt) => (
            <button
              type="button"
              key={opt}
              onClick={() => update('attendance', opt)}
              className={`flex-1 border px-4 py-3 font-sans text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
                form.attendance === opt
                  ? 'border-gold bg-gold text-ivory'
                  : 'border-charcoal/20 text-charcoal hover:border-gold/50'
              }`}
            >
              {opt === 'yes' ? 'Joyfully accepts' : 'Regretfully declines'}
            </button>
          ))}
        </div>
      </fieldset>

      <AnimatePresence>
        {form.attendance === 'yes' && (
          <motion.div
            initial={reduced ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={reduced ? undefined : { opacity: 0, height: 0 }}
            className="space-y-8 overflow-hidden"
          >
            <div>
              <label className={labelBase} htmlFor="rsvp-guests">
                Number of Guests (including you)
              </label>
              <input
                id="rsvp-guests"
                type="number"
                min={1}
                max={6}
                value={form.guests}
                onChange={(e) => update('guests', e.target.value)}
                className={fieldBase}
              />
            </div>

            <div>
              <span className={labelBase}>Meal Preference</span>
              <div className="flex flex-wrap gap-3">
                {(['vegetarian', 'non-vegetarian', 'vegan'] as Meal[]).map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => update('meal', opt)}
                    className={`rounded-full border px-4 py-2 font-sans text-xs uppercase tracking-[0.15em] transition-colors duration-300 ${
                      form.meal === opt
                        ? 'border-gold bg-gold text-ivory'
                        : 'border-charcoal/20 text-charcoal hover:border-gold/50'
                    }`}
                  >
                    {opt.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <label className={labelBase} htmlFor="rsvp-message">
          A Note for the Couple
        </label>
        <textarea
          id="rsvp-message"
          rows={3}
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          placeholder="Share a memory or a blessing…"
          className={`${fieldBase} resize-none`}
        />
      </div>

      <button
        type="submit"
        className="w-full border border-gold/50 px-9 py-4 font-sans text-[11px] uppercase tracking-[0.3em] text-gold transition-colors duration-500 hover:bg-gold hover:text-ivory"
      >
        Send RSVP
      </button>
    </form>
  )
}