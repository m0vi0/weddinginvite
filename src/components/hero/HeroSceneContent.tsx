import { Canvas } from '@react-three/fiber'
import { FloatingRings } from './FloatingRings'

/**
 * The entire R3F scene (Canvas + meshes + drei + three.js) lives in this
 * module so it can be lazy-loaded as one chunk — keeping three.js out of the
 * initial page bundle entirely. Lit by warm key + gold fill lights.
 */
export default function HeroSceneContent() {
  return (
    <Canvas
      className="absolute inset-0"
      style={{ pointerEvents: 'none' }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.4} color="#fdfcfa" />
      <directionalLight position={[-3, 2, -2]} intensity={0.5} color="#f2e6e0" />
      <pointLight position={[0, 0, 3]} intensity={1.1} color="#c9a84c" />
      <FloatingRings />
    </Canvas>
  )
}