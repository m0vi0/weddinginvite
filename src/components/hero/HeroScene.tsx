import { lazy, Suspense } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

// Entire R3F scene is deferred — three.js + drei load as a separate async
// chunk, never blocking first paint of the hero text & petals.
const HeroSceneContent = lazy(() => import('./HeroSceneContent'))

/**
 * The hero's 3D layer. Kept behind the text (z-0). Renders nothing at all when
 * the user prefers reduced-motion, and shows a transparent fallback while the
 * WebGL chunk streams in.
 */
export function HeroScene() {
  const reduced = useReducedMotion()

  if (reduced) return null

  return (
    <Suspense fallback={<div className="absolute inset-0" />}>
      <HeroSceneContent />
    </Suspense>
  )
}