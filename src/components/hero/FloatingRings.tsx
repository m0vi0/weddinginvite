import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import type { Group } from 'three'

/**
 * Interlocking golden torus rings — the single elegant 3D centerpiece.
 * Two metallic rings over-rotated into each other like linked wedding bands,
 * drifting on a slow float and gradually rotating. Gold material with a soft
 * distort catches the light for that expensive, jewel-like feel.
 */
export function FloatingRings() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08
      groupRef.current.rotation.z += delta * 0.04
    }
  })

  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.6} floatingRange={[-0.2, 0.3]}>
      <group ref={groupRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.25, 0.055, 40, 120]} />
          <MeshDistortMaterial
            color="#c9a84c"
            metalness={0.92}
            roughness={0.12}
            distort={0.06}
            speed={1.5}
            emissive="#3a2c14"
            emissiveIntensity={0.15}
          />
        </mesh>

        <mesh rotation={[Math.PI / 2, Math.PI / 4, Math.PI / 5]} position={[0.35, 0.05, 0]}>
          <torusGeometry args={[1.25, 0.045, 40, 120]} />
          <MeshDistortMaterial
            color="#d4b96a"
            metalness={0.88}
            roughness={0.18}
            distort={0.05}
            speed={1.8}
            emissive="#3a2c14"
            emissiveIntensity={0.12}
          />
        </mesh>

        {/* A small jewel at the intersection for a focal accent */}
        <mesh position={[0.7, 0.1, 0]} scale={0.1}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#c9a84c"
            metalness={1}
            roughness={0.05}
            emissive="#ffdf8c"
            emissiveIntensity={0.7}
          />
        </mesh>
      </group>
    </Float>
  )
}