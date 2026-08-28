# Amstel Wedding E-Invitation — Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Build a premium, cinematic wedding e-invitation web app with luxury editorial design, a single stunning 3D centerpiece, scroll-driven storytelling, and buttery-smooth animations.

**Architecture:** Single-page React + TypeScript app scaffolded with Vite. Tailwind CSS for utility-first styling with a custom wedding-specific design token system. Motion (Framer Motion) handles page/section transitions, micro-interactions, and entrance animations. A single React Three Fiber + Drei 3D scene provides the hero centerpiece (floating rings / mandala). GSAP ScrollTrigger drives cinematic scroll-pinned choreography for 2-3 key sections. 3D is lazy-loaded so initial paint is fast.

**Tech Stack:**
- React 19 + TypeScript + Vite 6
- Tailwind CSS 4
- Motion (framer-motion v12+)
- @react-three/fiber + @react-three/drei (lazy-loaded)
- GSAP + ScrollTrigger (registered as plugin)
- React Router (optional, likely unnecessary for SPA invite)

**Design Language:**
- Luxury editorial: generous whitespace, refined serif + sans-serif type pairing
- Color palette: deep burgundy/wine (#6B1D2A), warm gold (#C9A84C), ivory (#FAF7F2), charcoal (#2A2A2A), blush (#F2E6E0)
- Typography: Playfair Display (headings) + Cormorant Garamond (body/accent) + Inter (UI/small text)
- Motion: purposeful, cinema-grade — slow reveals, parallax depth, staggered entrances
- Indian wedding motifs: subtle paisley/mandala in SVG, marigold-inspired particle colors, rangoli geometry

---

## Section Architecture

```
┌─────────────────────────────────────────────┐
│  1. HERO — Full-screen cinematic entrance   │
│     - 3D centerpiece (lazy R3F canvas)      │
│     - Floating petals particle system       │
│     - Couple names + date + CTA             │
│     - Parallax depth layers                 │
├─────────────────────────────────────────────┤
│  2. COUPLE — Editorial intro panels         │
│     - Side-by-side or stacked portraits     │
│     - Motion entrance animations            │
│     - Elegant typography bios               │
├─────────────────────────────────────────────┤
│  3. STORY/TIMELINE — Scroll-driven          │
│     - GSAP ScrollTrigger pinned timeline    │
│     - Horizontal scroll or vertical reveal  │
│     - Key moments with dates + captions     │
├─────────────────────────────────────────────┤
│  4. EVENTS — Wedding ceremony details       │
│     - Multiple event cards (Mehendi, Sangeet│
│       Haldi, Wedding, Reception)            │
│     - Motion stagger entrance               │
│     - Date, time, dress code per event      │
├─────────────────────────────────────────────┤
│  5. VENUE — Location + map                  │
│     - Full-bleed venue image                │
│     - Address + directions                  │
│     - Embedded map or link                  │
├─────────────────────────────────────────────┤
│  6. GALLERY — Photo showcase                │
│     - Masonry/grid layout                   │
│     - Motion shared-element lightbox        │
│     - Touch-friendly swipe                  │
├─────────────────────────────────────────────┤
│  7. RSVP — Interactive form                 │
│     - Name, attendance, meal pref, +1       │
│     - Motion form transitions               │
│     - Success animation                     │
├─────────────────────────────────────────────┤
│  8. CLOSING — Final farewell                │
│     - Countdown timer to wedding date       │
│     - Warm closing message                  │
│     - Social links / contact                │
└─────────────────────────────────────────────┘
```

---

## File Structure

```
amstel-wedding-invite/
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── package.json
├── postcss.config.js
├── public/
│   ├── fonts/                    # Self-hosted Google Fonts (woff2)
│   ├── images/
│   │   ├── couple/               # Couple photos (WebP, optimized)
│   │   ├── venue/                # Venue photos
│   │   ├── gallery/              # Gallery photos
│   │   └── og-image.jpg          # Social share preview
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css                 # Tailwind directives + @font-face + global styles
│   ├── design-tokens.ts          # Colors, fonts, spacing, breakpoints
│   ├── hooks/
│   │   ├── useReducedMotion.ts
│   │   ├── useInView.ts
│   │   ├── useLenis.ts           # Smooth scroll (optional — Lenis)
│   │   ├── useCountdown.ts
│   │   └── useMediaQuery.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── SmoothScroll.tsx   # Lenis wrapper or native
│   │   │   ├── Section.tsx        # Reusable full-height section wrapper
│   │   │   └── Navigation.tsx     # Minimal floating nav dots
│   │   ├── hero/
│   │   │   ├── Hero.tsx           # Hero section orchestrator
│   │   │   ├── HeroContent.tsx    # Names, date, CTA (HTML overlay)
│   │   │   ├── HeroScene.tsx      # R3F Canvas (lazy)
│   │   │   ├── FloatingRings.tsx  # 3D rings / mandala geometry
│   │   │   ├── Petals.tsx         # Particle system (R3F points or CSS)
│   │   │   └── ParallaxLayers.tsx # Depth parallax decorative layers
│   │   ├── couple/
│   │   │   └── CoupleSection.tsx
│   │   ├── story/
│   │   │   ├── StorySection.tsx
│   │   │   └── TimelineItem.tsx
│   │   ├── events/
│   │   │   ├── EventsSection.tsx
│   │   │   └── EventCard.tsx
│   │   ├── venue/
│   │   │   └── VenueSection.tsx
│   │   ├── gallery/
│   │   │   ├── GallerySection.tsx
│   │   │   ├── GalleryGrid.tsx
│   │   │   └── Lightbox.tsx
│   │   ├── rsvp/
│   │   │   ├── RSVPSection.tsx
│   │   │   └── RSVPForm.tsx
│   │   ├── closing/
│   │   │   ├── ClosingSection.tsx
│   │   │   └── Countdown.tsx
│   │   └── ui/
│   │       ├── AnimatedText.tsx   # Text reveal/split animations
│   │       ├── ParallaxImage.tsx  # Image with scroll parallax
│   │       ├── MagneticButton.tsx # Hover magnetic effect
│   │       ├── Divider.tsx        # Ornamental section divider
│   │       └── MotionWrapper.tsx  # Reusable entrance animation wrapper
│   ├── lib/
│   │   ├── gsap.ts              # GSAP + ScrollTrigger registration
│   │   └── three-lazy.tsx       # Lazy R3F imports
│   └── data/
│       └── wedding.ts           # All wedding content (couple, events, story, etc.)
└── .gitignore
```

---

## Phase 1: Project Scaffolding & Design System

### Task 1: Scaffold Vite + React + TypeScript project

**Objective:** Initialize the project with Vite, React 19, and TypeScript.

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `index.html`, `src/main.tsx`, `src/App.tsx`

**Step 1: Scaffold with Vite**

```bash
cd /Users/m0vi0/amstel-wedding-invite
npm create vite@latest . -- --template react-ts
```

If the directory isn't empty by then, use `.` with `--force` or init in-place.

**Step 2: Install core dependencies**

```bash
npm install motion @react-three/fiber @react-three/drei three gsap @gsap/react
npm install -D tailwindcss @tailwindcss/vite
```

**Step 3: Verify dev server starts**

```bash
npm run dev -- --host 0.0.0.0
# Expected: Vite dev server on localhost:5173
```

**Step 4: Commit**

```bash
git init
echo "node_modules\ndist\n.DS_Store" > .gitignore
git add -A
git commit -m "chore: scaffold vite + react + ts project with deps"
```

---

### Task 2: Configure Tailwind CSS with wedding design tokens

**Objective:** Set up Tailwind 4 with custom wedding color palette, typography, and spacing.

**Files:**
- Modify: `vite.config.ts` (add Tailwind plugin)
- Create: `src/index.css`
- Create: `src/design-tokens.ts`
- Modify: `src/main.tsx` (import index.css)

**Step 1: Configure Vite for Tailwind 4**

`vite.config.ts`:
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

**Step 2: Create index.css with Tailwind directives + custom theme**

`src/index.css`:
```css
@import "tailwindcss";

@theme {
  --color-ivory: #FAF7F2;
  --color-ivory-dark: #F0EBE3;
  --color-blush: #F2E6E0;
  --color-gold: #C9A84C;
  --color-gold-light: #D4B96A;
  --color-gold-muted: #B89B4A80;
  --color-burgundy: #6B1D2A;
  --color-burgundy-deep: #4A1420;
  --color-charcoal: #2A2A2A;
  --color-charcoal-light: #4A4A4A;
  --color-warm-white: #FDFCFA;

  --font-serif: 'Playfair Display', Georgia, serif;
  --font-body: 'Cormorant Garamond', Garamond, serif;
  --font-sans: 'Inter', system-ui, sans-serif;
}

@font-face {
  font-family: 'Playfair Display';
  src: url('/fonts/PlayfairDisplay-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Playfair Display';
  src: url('/fonts/PlayfairDisplay-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Playfair Display';
  src: url('/fonts/PlayfairDisplay-Italic.woff2') format('woff2');
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: 'Cormorant Garamond';
  src: url('/fonts/CormorantGaramond-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Cormorant Garamond';
  src: url('/fonts/CormorantGaramond-Light.woff2') format('woff2');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Cormorant Garamond';
  src: url('/fonts/CormorantGaramond-SemiBold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

/* Base styles */
html {
  background-color: var(--color-ivory);
  color: var(--color-charcoal);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  overflow-x: hidden;
}

::selection {
  background-color: var(--color-gold-muted);
  color: var(--color-burgundy-deep);
}
```

**Step 3: Create design tokens**

`src/design-tokens.ts`:
```ts
export const colors = {
  ivory: '#FAF7F2',
  ivoryDark: '#F0EBE3',
  blush: '#F2E6E0',
  gold: '#C9A84C',
  goldLight: '#D4B96A',
  burgundy: '#6B1D2A',
  burgundyDeep: '#4A1420',
  charcoal: '#2A2A2A',
  charcoalLight: '#4A4A4A',
  warmWhite: '#FDFCFA',
} as const

export const fonts = {
  serif: "'Playfair Display', Georgia, serif",
  body: "'Cormorant Garamond', Garamond, serif",
  sans: "'Inter', system-ui, sans-serif",
} as const

export const easing = {
  smooth: [0.25, 0.1, 0.25, 1.0] as const,
  cinematic: [0.77, 0, 0.175, 1] as const,
  gentle: [0.4, 0, 0.2, 1] as const,
}

export const duration = {
  fast: 0.3,
  normal: 0.6,
  slow: 1.0,
  cinematic: 1.5,
}
```

**Step 4: Verify Tailwind renders**

Update `src/App.tsx` with a test:
```tsx
export default function App() {
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center">
      <h1 className="font-serif text-6xl text-burgundy">Amstel & Partner</h1>
    </div>
  )
}
```

Run dev server and verify custom colors/fonts apply.

**Step 5: Commit**

```bash
git add -A && git commit -m "style: tailwind 4 + wedding design tokens"
```

---

### Task 3: Download and self-host Google Fonts

**Objective:** Download Playfair Display, Cormorant Garamond, and Inter as woff2 and place in `public/fonts/`.

**Files:**
- Create: `public/fonts/*.woff2`

**Step 1: Download fonts**

Use google-webfonts-helper or direct download:
```bash
mkdir -p public/fonts
# Download from fontsource or Google Fonts API
# Playfair Display: Regular, Bold, Italic
# Cormorant Garamond: Light, Regular, SemiBold
# Inter: Regular, Medium
```

Alternatively, use `@fontsource` packages:
```bash
npm install @fontsource/playfair-display @fontsource/cormorant-garamond @fontsource/inter
```
Then import in `src/index.css` instead of @font-face declarations:
```css
/* Replace @font-face blocks with: */
@import '@fontsource/playfair-display/400.css';
@import '@fontsource/playfair-display/700.css';
@import '@fontsource/playfair-display/400-italic.css';
@import '@fontsource/cormorant-garamond/300.css';
@import '@fontsource/cormorant-garamond/400.css';
@import '@fontsource/cormorant-garamond/600.css';
@import '@fontsource/inter/400.css';
@import '@fontsource/inter/500.css';
```

**Step 2: Verify fonts render in browser**

**Step 3: Commit**

```bash
git add -A && git commit -m "chore: self-host wedding typography via fontsource"
```

---

## Phase 2: Core Infrastructure & Shared Components

### Task 4: Create utility hooks

**Objective:** Build reusable hooks for reduced-motion detection, viewport queries, and countdown timer.

**Files:**
- Create: `src/hooks/useReducedMotion.ts`
- Create: `src/hooks/useMediaQuery.ts`
- Create: `src/hooks/useCountdown.ts`
- Create: `src/hooks/useInView.ts`

**Step 1: useReducedMotion**

```ts
// src/hooks/useReducedMotion.ts
import { useEffect, useState } from 'react'

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return reduced
}
```

**Step 2: useMediaQuery**

```ts
// src/hooks/useMediaQuery.ts
import { useEffect, useState } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const mq = window.matchMedia(query)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [query])

  return matches
}
```

**Step 3: useCountdown**

```ts
// src/hooks/useCountdown.ts
import { useEffect, useState } from 'react'

interface CountdownValues {
  days: number
  hours: number
  minutes: number
  seconds: number
  isComplete: boolean
}

export function useCountdown(targetDate: Date): CountdownValues {
  const calculate = (): CountdownValues => {
    const diff = targetDate.getTime() - Date.now()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true }
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      isComplete: false,
    }
  }

  const [countdown, setCountdown] = useState(calculate)

  useEffect(() => {
    const timer = setInterval(() => setCountdown(calculate()), 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  return countdown
}
```

**Step 4: useInView (thin wrapper around Motion's useInView)**

```ts
// src/hooks/useInView.ts
import { useRef } from 'react'
import { useInView as useMotionInView } from 'motion/react'

export function useInView(options?: { once?: boolean; margin?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useMotionInView(ref, {
    once: options?.once ?? true,
    margin: options?.margin ?? '-100px 0px',
  })
  return { ref, isInView }
}
```

**Step 5: Commit**

```bash
git add -A && git commit -m "feat: utility hooks (reducedMotion, mediaQuery, countdown, inView)"
```

---

### Task 5: Create shared UI components

**Objective:** Build reusable animated text, parallax image, section wrapper, divider, and motion wrapper.

**Files:**
- Create: `src/components/ui/AnimatedText.tsx`
- Create: `src/components/ui/ParallaxImage.tsx`
- Create: `src/components/ui/Divider.tsx`
- Create: `src/components/ui/MotionWrapper.tsx`
- Create: `src/components/ui/MagneticButton.tsx`
- Create: `src/components/layout/Section.tsx`

**Step 1: AnimatedText — character/word split reveal**

```tsx
// src/components/ui/AnimatedText.tsx
import { motion } from 'motion/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useInView } from '../../hooks/useInView'

interface AnimatedTextProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
  splitBy?: 'word' | 'character'
  delay?: number
  staggerDelay?: number
}

export function AnimatedText({
  text,
  as: Tag = 'p',
  className = '',
  splitBy = 'word',
  delay = 0,
  staggerDelay = 0.05,
}: AnimatedTextProps) {
  const reduced = useReducedMotion()
  const { ref, isInView } = useInView()

  if (reduced) {
    return <Tag className={className}>{text}</Tag>
  }

  const units = splitBy === 'word' ? text.split(' ') : text.split('')
  const separator = splitBy === 'word' ? '\u00A0' : ''

  return (
    <Tag className={className} ref={ref as any}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-flex flex-wrap">
        {units.map((unit, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ y: '100%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1],
              delay: delay + i * staggerDelay,
            }}
          >
            {unit}{separator}
          </motion.span>
        ))}
      </span>
    </Tag>
  )
}
```

**Step 2: ParallaxImage**

```tsx
// src/components/ui/ParallaxImage.tsx
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  speed?: number // 0.1 = subtle, 0.5 = dramatic
}

export function ParallaxImage({ src, alt, className = '', speed = 0.2 }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`])

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={reduced ? {} : { y }}
        className="w-full h-[120%] object-cover"
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}
```

**Step 3: Section wrapper**

```tsx
// src/components/layout/Section.tsx
import { forwardRef, type ReactNode } from 'react'

interface SectionProps {
  id: string
  children: ReactNode
  className?: string
  fullHeight?: boolean
  bg?: 'ivory' | 'burgundy' | 'charcoal' | 'blush' | 'warm-white'
}

const bgMap = {
  ivory: 'bg-ivory',
  burgundy: 'bg-burgundy text-ivory',
  charcoal: 'bg-charcoal text-ivory',
  blush: 'bg-blush',
  'warm-white': 'bg-warm-white',
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ id, children, className = '', fullHeight = false, bg = 'ivory' }, ref) => (
    <section
      ref={ref}
      id={id}
      className={`relative w-full ${fullHeight ? 'min-h-screen' : ''} ${bgMap[bg]} ${className}`}
    >
      {children}
    </section>
  )
)

Section.displayName = 'Section'
```

**Step 4: Divider**

```tsx
// src/components/ui/Divider.tsx
import { motion } from 'motion/react'
import { useInView } from '../../hooks/useInView'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function Divider({ className = '' }: { className?: string }) {
  const { ref, isInView } = useInView()
  const reduced = useReducedMotion()

  return (
    <div ref={ref} className={`flex items-center justify-center gap-4 py-8 ${className}`}>
      <motion.span
        className="block h-px w-16 bg-gold/40"
        initial={reduced ? {} : { scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ originX: 1 }}
      />
      <motion.span
        className="text-gold text-lg"
        initial={reduced ? {} : { opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        ✦
      </motion.span>
      <motion.span
        className="block h-px w-16 bg-gold/40"
        initial={reduced ? {} : { scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ originX: 0 }}
      />
    </div>
  )
}
```

**Step 5: MotionWrapper — reusable entrance animation**

```tsx
// src/components/ui/MotionWrapper.tsx
import { type ReactNode } from 'react'
import { motion, type Variant } from 'motion/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useInView } from '../../hooks/useInView'

type AnimationType = 'fadeUp' | 'fadeIn' | 'fadeLeft' | 'fadeRight' | 'scale'

const variants: Record<AnimationType, { hidden: Variant; visible: Variant }> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
}

interface MotionWrapperProps {
  children: ReactNode
  animation?: AnimationType
  delay?: number
  duration?: number
  className?: string
}

export function MotionWrapper({
  children,
  animation = 'fadeUp',
  delay = 0,
  duration = 0.7,
  className = '',
}: MotionWrapperProps) {
  const reduced = useReducedMotion()
  const { ref, isInView } = useInView()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants[animation]}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}
```

**Step 6: MagneticButton**

```tsx
// src/components/ui/MagneticButton.tsx
import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  strength?: number
}

export function MagneticButton({
  children,
  className = '',
  onClick,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  const handleMouse = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * strength)
    y.set((e.clientY - centerY) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      className={className}
      style={reduced ? {} : { x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}
```

**Step 7: Commit**

```bash
git add -A && git commit -m "feat: shared UI components (AnimatedText, ParallaxImage, Section, Divider, MotionWrapper, MagneticButton)"
```

---

### Task 6: Set up GSAP + ScrollTrigger registration and lazy R3F

**Objective:** Register GSAP plugins and create lazy-loading wrapper for React Three Fiber.

**Files:**
- Create: `src/lib/gsap.ts`
- Create: `src/lib/three-lazy.tsx`

**Step 1: GSAP setup**

```ts
// src/lib/gsap.ts
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }
```

**Step 2: Lazy Three.js loading**

```tsx
// src/lib/three-lazy.tsx
import { lazy, Suspense, type ReactNode } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

const LazyCanvas = lazy(() =>
  import('@react-three/fiber').then((mod) => ({ default: mod.Canvas }))
)

interface LazySceneProps {
  children: ReactNode
  className?: string
  fallback?: ReactNode
}

export function LazyScene({ children, className = '', fallback }: LazySceneProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return fallback ? <>{fallback}</> : null
  }

  return (
    <Suspense fallback={fallback || <div className={`${className} bg-ivory`} />}>
      <LazyCanvas
        className={className}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        {children}
      </LazyCanvas>
    </Suspense>
  )
}
```

**Step 3: Commit**

```bash
git add -A && git commit -m "feat: GSAP ScrollTrigger registration + lazy R3F canvas"
```

---

### Task 7: Create wedding data file

**Objective:** Centralize all wedding content in a typed data file.

**Files:**
- Create: `src/data/wedding.ts`

**Step 1: Write data file**

```ts
// src/data/wedding.ts

export const couple = {
  partner1: {
    name: 'Amstel',
    fullName: 'Amstel Kumar',
    image: '/images/couple/partner1.webp',
    bio: 'A dreamer with an old soul who finds poetry in the everyday.',
  },
  partner2: {
    name: 'Partner',
    fullName: 'Partner Name',
    image: '/images/couple/partner2.webp',
    bio: 'An adventurer at heart who turns every moment into a story worth telling.',
  },
}

export const weddingDate = new Date('2027-02-14T18:00:00+05:30')

export const story = [
  {
    date: 'Summer 2022',
    title: 'First Meeting',
    description: 'It started with a conversation that neither wanted to end.',
  },
  {
    date: 'Winter 2023',
    title: 'First Adventure',
    description: 'A spontaneous road trip that became the first of many.',
  },
  {
    date: 'Monsoon 2024',
    title: 'The Question',
    description: 'Under rain-washed skies, a question and an answer that changed everything.',
  },
  {
    date: 'Spring 2025',
    title: 'The Ring',
    description: 'A promise sealed with gold and a lifetime of tomorrows.',
  },
]

export const events = [
  {
    name: 'Mehendi',
    date: 'February 12, 2027',
    time: '4:00 PM onwards',
    venue: 'Pool Lawn',
    dressCode: 'Festive Casual — Greens & Yellows',
    description: 'An afternoon of artistry, music, and celebration.',
  },
  {
    name: 'Sangeet',
    date: 'February 13, 2027',
    time: '7:00 PM onwards',
    venue: 'Grand Ballroom',
    dressCode: 'Cocktail — Jewel Tones',
    description: 'A night of dance, laughter, and unforgettable performances.',
  },
  {
    name: 'Haldi',
    date: 'February 14, 2027',
    time: '10:00 AM',
    venue: 'Garden Terrace',
    dressCode: 'Casual — Whites & Yellows',
    description: 'A morning blessing with turmeric and joy.',
  },
  {
    name: 'Wedding Ceremony',
    date: 'February 14, 2027',
    time: '6:00 PM',
    venue: 'The Grand Mandap',
    dressCode: 'Traditional Indian Formal',
    description: 'The sacred ceremony where two become one.',
  },
  {
    name: 'Reception',
    date: 'February 15, 2027',
    time: '7:30 PM onwards',
    venue: 'Crystal Hall',
    dressCode: 'Black Tie / Formal Indian',
    description: 'An evening of celebration, feasting, and dance.',
  },
]

export const venue = {
  name: 'The Leela Palace',
  city: 'Udaipur',
  address: 'Lake Pichola, Udaipur, Rajasthan 313001',
  mapUrl: 'https://maps.google.com/?q=The+Leela+Palace+Udaipur',
  image: '/images/venue/leela-palace.webp',
  description:
    'Nestled on the banks of Lake Pichola, where centuries of royal grandeur meet the warmth of a new beginning.',
}

export const galleryImages = [
  { src: '/images/gallery/01.webp', alt: 'Couple portrait', aspect: 'portrait' as const },
  { src: '/images/gallery/02.webp', alt: 'Engagement ceremony', aspect: 'landscape' as const },
  { src: '/images/gallery/03.webp', alt: 'Pre-wedding shoot', aspect: 'portrait' as const },
  { src: '/images/gallery/04.webp', alt: 'Together', aspect: 'landscape' as const },
  { src: '/images/gallery/05.webp', alt: 'Candid moment', aspect: 'square' as const },
  { src: '/images/gallery/06.webp', alt: 'Celebration', aspect: 'portrait' as const },
]

export const closing = {
  message: "We can't wait to celebrate with you.",
  tagline: 'Two souls, one journey.',
}
```

**Step 2: Commit**

```bash
git add -A && git commit -m "feat: wedding data file with all content"
```

---

## Phase 3: Hero Section (The Showpiece)

### Task 8: Build Hero section — HTML content layer

**Objective:** Create the full-screen hero with couple names, date, ornamental flourishes, and entrance CTA. This is the HTML overlay; the 3D canvas sits behind it.

**Files:**
- Create: `src/components/hero/Hero.tsx`
- Create: `src/components/hero/HeroContent.tsx`

**Step 1: HeroContent**

The hero content uses Motion for a staggered cinematic entrance: first a subtle line, then the names, then the ampersand, then the date, then the CTA. Typography is the star.

```tsx
// src/components/hero/HeroContent.tsx
import { motion } from 'motion/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { couple, weddingDate } from '../../data/wedding'
import { MagneticButton } from '../ui/MagneticButton'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.25, delayChildren: 0.8 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] },
  },
}

export function HeroContent() {
  const reduced = useReducedMotion()
  const dateStr = weddingDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const content = (
    <>
      <motion.div variants={lineVariants} className="h-px w-24 bg-gold/60 mx-auto" />

      <motion.p
        variants={itemVariants}
        className="font-sans text-xs tracking-[0.35em] uppercase text-charcoal-light/70"
      >
        Together with their families
      </motion.p>

      <motion.h1
        variants={itemVariants}
        className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-burgundy leading-[0.9] tracking-tight"
      >
        {couple.partner1.name}
      </motion.h1>

      <motion.span
        variants={itemVariants}
        className="font-body text-2xl sm:text-3xl text-gold italic"
      >
        &amp;
      </motion.span>

      <motion.h1
        variants={itemVariants}
        className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-burgundy leading-[0.9] tracking-tight"
      >
        {couple.partner2.name}
      </motion.h1>

      <motion.div variants={lineVariants} className="h-px w-24 bg-gold/60 mx-auto" />

      <motion.p
        variants={itemVariants}
        className="font-body text-lg sm:text-xl text-charcoal-light tracking-wide"
      >
        {dateStr}
      </motion.p>

      <motion.p
        variants={itemVariants}
        className="font-body text-base text-charcoal-light/60"
      >
        {venue.city}
      </motion.p>

      <motion.div variants={itemVariants}>
        <MagneticButton
          className="mt-4 px-8 py-3 border border-gold/50 text-gold font-sans text-xs tracking-[0.25em] uppercase
                     hover:bg-gold hover:text-ivory transition-colors duration-500"
          onClick={() => document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })}
        >
          RSVP
        </MagneticButton>
      </motion.div>
    </>
  )

  // Need to import venue at top
  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-4 px-6 text-center"
      variants={reduced ? {} : containerVariants}
      initial={reduced ? {} : 'hidden'}
      animate="visible"
    >
      {content}
    </motion.div>
  )
}
```

(Note: import `venue` from `../../data/wedding` at the top.)

**Step 2: Hero orchestrator**

```tsx
// src/components/hero/Hero.tsx
import { Section } from '../layout/Section'
import { HeroContent } from './HeroContent'

export function Hero() {
  return (
    <Section id="hero" fullHeight bg="ivory" className="flex items-center justify-center">
      {/* 3D scene will be added behind this as a Task 10 */}
      <HeroContent />
    </Section>
  )
}
```

**Step 3: Wire into App.tsx for visual testing**

```tsx
// src/App.tsx
import { Hero } from './components/hero/Hero'

export default function App() {
  return (
    <main>
      <Hero />
    </main>
  )
}
```

**Step 4: Verify hero renders with animations in browser**

**Step 5: Commit**

```bash
git add -A && git commit -m "feat: hero section with cinematic entrance animations"
```

---

### Task 9: Build floating petals particle system

**Objective:** Create a CSS-based falling petal / particle system for the hero. Using CSS instead of R3F keeps it lightweight and avoids adding to the 3D bundle.

**Files:**
- Create: `src/components/hero/Petals.tsx`

**Step 1: CSS petal particles**

```tsx
// src/components/hero/Petals.tsx
import { useMemo } from 'react'
import { motion } from 'motion/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface Petal {
  id: number
  x: number
  delay: number
  duration: number
  size: number
  rotation: number
  opacity: number
}

export function Petals({ count = 20 }: { count?: number }) {
  const reduced = useReducedMotion()

  const petals = useMemo<Petal[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 12,
        size: 6 + Math.random() * 10,
        rotation: Math.random() * 360,
        opacity: 0.15 + Math.random() * 0.35,
      })),
    [count]
  )

  if (reduced) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute rounded-full"
          style={{
            left: `${petal.x}%`,
            top: -20,
            width: petal.size,
            height: petal.size * 1.4,
            backgroundColor: petal.id % 3 === 0 ? '#C9A84C' : petal.id % 3 === 1 ? '#F2E6E0' : '#6B1D2A',
            opacity: petal.opacity,
            borderRadius: '50% 0 50% 0',
            rotate: petal.rotation,
          }}
          animate={{
            y: ['0vh', '105vh'],
            x: [0, Math.sin(petal.id) * 60],
            rotate: [petal.rotation, petal.rotation + 180 + Math.random() * 180],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}
```

**Step 2: Add Petals to Hero**

```tsx
// Update src/components/hero/Hero.tsx
import { Section } from '../layout/Section'
import { HeroContent } from './HeroContent'
import { Petals } from './Petals'

export function Hero() {
  return (
    <Section id="hero" fullHeight bg="ivory" className="flex items-center justify-center overflow-hidden">
      <Petals count={25} />
      <HeroContent />
    </Section>
  )
}
```

**Step 3: Commit**

```bash
git add -A && git commit -m "feat: floating petals particle system"
```

---

### Task 10: Build 3D centerpiece — floating golden torus/rings

**Objective:** Create a lazy-loaded R3F scene with interlocking golden rings that slowly rotate, catching light. This is the single premium 3D element.

**Files:**
- Create: `src/components/hero/HeroScene.tsx`
- Create: `src/components/hero/FloatingRings.tsx`
- Modify: `src/components/hero/Hero.tsx`

**Step 1: FloatingRings 3D component**

```tsx
// src/components/hero/FloatingRings.tsx
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float } from '@react-three/drei'
import type { Group } from 'three'

export function FloatingRings() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1
      groupRef.current.rotation.z += delta * 0.05
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Ring 1 */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.2, 0.06, 32, 100]} />
          <MeshDistortMaterial
            color="#C9A84C"
            metalness={0.9}
            roughness={0.15}
            distort={0.05}
            speed={2}
          />
        </mesh>

        {/* Ring 2 — interlocked */}
        <mesh rotation={[Math.PI / 2, Math.PI / 4, Math.PI / 6]} position={[0.5, 0, 0]}>
          <torusGeometry args={[1.2, 0.06, 32, 100]} />
          <MeshDistortMaterial
            color="#D4B96A"
            metalness={0.85}
            roughness={0.2}
            distort={0.05}
            speed={2}
          />
        </mesh>

        {/* Subtle accent sphere */}
        <mesh position={[0.25, 0, 0]} scale={0.08}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#C9A84C" emissive="#C9A84C" emissiveIntensity={0.5} />
        </mesh>
      </group>
    </Float>
  )
}
```

**Step 2: HeroScene — R3F canvas with lighting**

```tsx
// src/components/hero/HeroScene.tsx
import { FloatingRings } from './FloatingRings'
import { LazyScene } from '../../lib/three-lazy'

export function HeroScene() {
  return (
    <LazyScene
      className="absolute inset-0 z-0"
      fallback={<div className="absolute inset-0 bg-ivory" />}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#FAF7F2" />
      <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#F2E6E0" />
      <pointLight position={[0, 0, 3]} intensity={0.6} color="#C9A84C" />
      <FloatingRings />
    </LazyScene>
  )
}
```

**Step 3: Integrate into Hero**

```tsx
// src/components/hero/Hero.tsx
import { Section } from '../layout/Section'
import { HeroContent } from './HeroContent'
import { HeroScene } from './HeroScene'
import { Petals } from './Petals'

export function Hero() {
  return (
    <Section id="hero" fullHeight bg="ivory" className="relative overflow-hidden">
      <HeroScene />
      <Petals count={25} />
      <HeroContent />
    </Section>
  )
}
```

**Step 4: Verify 3D renders behind text, lazy-loads correctly**

**Step 5: Commit**

```bash
git add -A && git commit -m "feat: 3D golden rings centerpiece (lazy-loaded R3F)"
```

---

## Phase 4: Content Sections

### Task 11: Couple introduction section

**Objective:** Editorial-style couple intro with side-by-side (desktop) or stacked (mobile) portraits and bios.

**Files:**
- Create: `src/components/couple/CoupleSection.tsx`

**Implementation:** Two columns on desktop, stacked on mobile. Each portrait uses `ParallaxImage`. Names animate in with `AnimatedText`. Bios fade up with `MotionWrapper`. A `Divider` separates from the hero.

**Commit:** `"feat: couple introduction section"`

---

### Task 12: Story/Timeline section with GSAP ScrollTrigger

**Objective:** Scroll-pinned timeline that reveals story milestones one by one as the user scrolls. This is where GSAP ScrollTrigger shines — pinning a container while animating children in sequence.

**Files:**
- Create: `src/components/story/StorySection.tsx`
- Create: `src/components/story/TimelineItem.tsx`

**Implementation:**
- The section is pinned using `ScrollTrigger.create({ pin: true })`.
- As the user scrolls through the pinned area, timeline items reveal one by one (opacity + translateX from alternating sides).
- A vertical golden line grows as progress advances.
- Uses `gsap.timeline()` with `scrollTrigger`.
- Each `TimelineItem` has a date, title, description, and a small gold dot on the line.

**Commit:** `"feat: scroll-pinned story timeline with GSAP ScrollTrigger"`

---

### Task 13: Wedding events section

**Objective:** Display all wedding events (Mehendi, Sangeet, Haldi, Wedding, Reception) in elegant cards.

**Files:**
- Create: `src/components/events/EventsSection.tsx`
- Create: `src/components/events/EventCard.tsx`

**Implementation:**
- Section title with `AnimatedText`.
- Cards use `MotionWrapper` with staggered entrance.
- Each card: event name (serif), date + time, venue, dress code, description.
- Layout: single column on mobile, 2-column offset grid on desktop.
- Cards have a subtle gold left border accent.
- Hover: slight lift + gold border intensifies.

**Commit:** `"feat: wedding events section with staggered card animation"`

---

### Task 14: Venue section

**Objective:** Full-bleed venue showcase with parallax image, overlay text, and map link.

**Files:**
- Create: `src/components/venue/VenueSection.tsx`

**Implementation:**
- Full-width `ParallaxImage` of the venue with a dark overlay gradient.
- Venue name and city in large serif text over the image.
- Address + description below.
- A CTA button linking to Google Maps.

**Commit:** `"feat: venue section with parallax image"`

---

### Task 15: Gallery section with lightbox

**Objective:** Masonry photo grid with Motion shared-element lightbox transitions.

**Files:**
- Create: `src/components/gallery/GallerySection.tsx`
- Create: `src/components/gallery/GalleryGrid.tsx`
- Create: `src/components/gallery/Lightbox.tsx`

**Implementation:**
- Responsive masonry: 2 columns mobile, 3 columns desktop.
- `MotionWrapper` for staggered reveal on scroll.
- Click opens a `Lightbox` with `AnimatePresence` + `layoutId` for shared-element transition.
- Lightbox: full-screen overlay, image centered, click/ESC/swipe to close.
- Keyboard navigation (arrow keys) and touch swipe support.

**Commit:** `"feat: gallery with masonry grid + shared-element lightbox"`

---

### Task 16: RSVP form section

**Objective:** Interactive RSVP form with elegant animations and feedback.

**Files:**
- Create: `src/components/rsvp/RSVPSection.tsx`
- Create: `src/components/rsvp/RSVPForm.tsx`

**Implementation:**
- Fields: name, email, attendance (yes/no), number of guests, meal preference, message.
- Custom-styled inputs (no default browser chrome).
- Motion transitions between form steps or within a single form.
- Submit button with `MagneticButton`.
- On submit: success animation (check mark + thank you message using `AnimatePresence`).
- Form data: either `console.log` for now or use a free form backend (formspree, etc.) — note as configurable.

**Commit:** `"feat: RSVP form section with animated feedback"`

---

### Task 17: Closing section with countdown

**Objective:** Warm farewell with countdown timer to the wedding date.

**Files:**
- Create: `src/components/closing/ClosingSection.tsx`
- Create: `src/components/closing/Countdown.tsx`

**Implementation:**
- Closing message in large serif text.
- `useCountdown` hook displaying days/hours/minutes/seconds.
- Each unit in its own animated container.
- Couple names repeated as a footer signature.
- Background: burgundy with ivory text for contrast from the rest.

**Commit:** `"feat: closing section with live countdown"`

---

## Phase 5: Navigation & Polish

### Task 18: Floating dot navigation

**Objective:** Minimal floating navigation dots (right side) showing current section.

**Files:**
- Create: `src/components/layout/Navigation.tsx`

**Implementation:**
- Fixed position, right side, vertically centered.
- Small dots, one per section.
- Active dot highlighted with gold.
- Click scrolls to section.
- Uses Intersection Observer to detect active section.
- Hidden on mobile (or collapsed to a hamburger — keep minimal).
- Motion for active dot transition.

**Commit:** `"feat: floating dot navigation"`

---

### Task 19: Assemble all sections in App.tsx

**Objective:** Wire all sections into the final page.

**Files:**
- Modify: `src/App.tsx`

**Implementation:**

```tsx
import { Hero } from './components/hero/Hero'
import { CoupleSection } from './components/couple/CoupleSection'
import { StorySection } from './components/story/StorySection'
import { EventsSection } from './components/events/EventsSection'
import { VenueSection } from './components/venue/VenueSection'
import { GallerySection } from './components/gallery/GallerySection'
import { RSVPSection } from './components/rsvp/RSVPSection'
import { ClosingSection } from './components/closing/ClosingSection'
import { Navigation } from './components/layout/Navigation'

export default function App() {
  return (
    <main>
      <Navigation />
      <Hero />
      <CoupleSection />
      <StorySection />
      <EventsSection />
      <VenueSection />
      <GallerySection />
      <RSVPSection />
      <ClosingSection />
    </main>
  )
}
```

**Commit:** `"feat: assemble all sections into final page"`

---

### Task 20: Performance & accessibility audit

**Objective:** Ensure 60fps, lazy loading, reduced-motion respect, semantic HTML, proper alt text, and reasonable Lighthouse score.

**Checklist:**
- [ ] All images use `loading="lazy"` and `decoding="async"`
- [ ] R3F canvas lazy-loaded via `React.lazy` + `Suspense`
- [ ] `prefers-reduced-motion` disables all animations (verify each component)
- [ ] Semantic HTML: `<section>`, `<header>`, `<nav>`, `<main>`, `<article>`
- [ ] All images have alt text
- [ ] Form inputs have labels
- [ ] Color contrast meets WCAG AA
- [ ] Tab navigation works through interactive elements
- [ ] No layout shift from lazy content
- [ ] Bundle analyzed — three.js chunk separate from main
- [ ] Test on iPhone Safari and Android Chrome viewport widths

**Commit:** `"fix: accessibility + performance passes"`

---

### Task 21: Add placeholder images and final polish

**Objective:** Add appropriately sized placeholder images so the invite can be previewed, add favicon, OG tags.

**Files:**
- Create: `public/images/` directories with placeholder images
- Modify: `index.html` — add meta tags, OG image, favicon

**Commit:** `"chore: placeholder images + meta tags + favicon"`

---

## Risks, Tradeoffs & Open Questions

1. **Three.js bundle size:** Three.js + R3F + Drei adds ~200-300KB gzipped. Mitigated by lazy loading — the main page renders instantly and 3D loads in background. Consider tree-shaking unused Drei exports.

2. **GSAP licensing:** GSAP's standard license is free for non-commercial use. A wedding invite is likely fine, but if hosting publicly for others to use, check the license. ScrollTrigger is free.

3. **Font loading:** Self-hosted woff2 via fontsource keeps things fast. FOUT (flash of unstyled text) is acceptable with `font-display: swap`. Could add a brief loading screen if FOUT bothers.

4. **Image assets:** The plan uses placeholder paths. Real images need to be optimized (WebP, responsive sizes). Consider using `<picture>` with srcset for mobile/desktop sizes.

5. **RSVP backend:** Currently form data goes nowhere. Options: Formspree (free tier), Google Sheets via Apps Script, Supabase, or a simple Vercel serverless function.

6. **Mobile 3D performance:** Low-end Android phones may struggle with WebGL. The reduced-motion fallback + `dpr={[1, 1.5]}` cap helps, but may need a device-capability check to skip 3D on weak GPUs.

7. **Smooth scroll library:** Lenis is excellent but adds complexity. Can start with native `scroll-behavior: smooth` and add Lenis later if scroll feel isn't good enough.

8. **Couple data:** All names, dates, venues, and content are placeholder. User will need to customize `src/data/wedding.ts`.

---

## Execution Order Summary

| Phase | Tasks | What's Built |
|-------|-------|-------------|
| 1 | 1-3 | Vite + Tailwind + Fonts + Design System |
| 2 | 4-7 | Hooks + UI Components + GSAP/R3F setup + Data |
| 3 | 8-10 | Hero (content + petals + 3D rings) |
| 4 | 11-17 | All content sections |
| 5 | 18-21 | Navigation + Assembly + Polish + Audit |

Total: ~21 tasks, each 2-10 minutes of focused implementation.
