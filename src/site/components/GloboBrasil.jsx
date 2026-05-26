import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// Cidades brasileiras (lat, lon) — incluindo Maceió (sede)
const CIDADES = [
  { nome: 'Maceió', lat: -9.6498, lon: -35.7089, principal: true },
  { nome: 'São Paulo', lat: -23.5505, lon: -46.6333 },
  { nome: 'Rio de Janeiro', lat: -22.9068, lon: -43.1729 },
  { nome: 'Brasília', lat: -15.7801, lon: -47.9292 },
  { nome: 'Salvador', lat: -12.9714, lon: -38.5014 },
  { nome: 'Belo Horizonte', lat: -19.9167, lon: -43.9345 },
  { nome: 'Recife', lat: -8.0476, lon: -34.8770 },
  { nome: 'Fortaleza', lat: -3.7327, lon: -38.5267 },
  { nome: 'Curitiba', lat: -25.4296, lon: -49.2719 },
  { nome: 'Porto Alegre', lat: -30.0346, lon: -51.2177 },
  { nome: 'Manaus', lat: -3.1190, lon: -60.0217 },
  { nome: 'Belém', lat: -1.4558, lon: -48.4902 },
  { nome: 'Natal', lat: -5.7945, lon: -35.2110 },
  { nome: 'João Pessoa', lat: -7.1195, lon: -34.8450 },
  { nome: 'Aracaju', lat: -10.9472, lon: -37.0731 },
  { nome: 'Goiânia', lat: -16.6869, lon: -49.2648 },
  { nome: 'Vitória', lat: -20.3155, lon: -40.3128 },
  { nome: 'Florianópolis', lat: -27.5954, lon: -48.5480 },
  { nome: 'Cuiabá', lat: -15.6014, lon: -56.0979 },
  { nome: 'Teresina', lat: -5.0892, lon: -42.8016 }
]

const RADIUS = 1.6

function latLonToVec3(lat, lon, radius = RADIUS) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const z = radius * Math.sin(phi) * Math.sin(theta)
  const y = radius * Math.cos(phi)
  return new THREE.Vector3(x, y, z)
}

function Sphere() {
  const meshRef = useRef()
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[RADIUS, 64, 64]} />
      <meshBasicMaterial
        color="#003869"
        wireframe
        transparent
        opacity={0.18}
      />
    </mesh>
  )
}

function SphereSolid() {
  return (
    <mesh>
      <sphereGeometry args={[RADIUS * 0.99, 64, 64]} />
      <meshPhongMaterial
        color="#001f3d"
        transparent
        opacity={0.55}
        shininess={5}
      />
    </mesh>
  )
}

function Dot({ position, principal }) {
  const ref = useRef()
  const ringRef = useRef()
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime()
    const scale = 1 + Math.sin(t * 2 + position.x * 5) * 0.2
    ref.current.scale.setScalar(scale)
    if (ringRef.current) {
      const rs = 1 + ((t * 0.5) % 1) * 2.2
      ringRef.current.scale.setScalar(rs)
      ringRef.current.material.opacity = Math.max(0, 0.55 - ((t * 0.5) % 1) * 0.55)
    }
  })
  const color = principal ? '#ffffff' : '#009E3D'
  const size = principal ? 0.045 : 0.028
  return (
    <group position={position}>
      <mesh ref={ref}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {principal && (
        <mesh ref={ringRef}>
          <ringGeometry args={[size * 1.5, size * 2.2, 32]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
      )}
      <mesh>
        <sphereGeometry args={[size * 2.2, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.18} />
      </mesh>
    </group>
  )
}

function Arc({ start, end, delay = 0 }) {
  const mat = useRef()
  const curve = useMemo(() => {
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5)
    const len = start.distanceTo(end)
    mid.normalize().multiplyScalar(RADIUS + len * 0.45)
    return new THREE.QuadraticBezierCurve3(start, mid, end)
  }, [start, end])
  const geometry = useMemo(() => {
    const points = curve.getPoints(48)
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [curve])
  useFrame((state) => {
    if (!mat.current) return
    const t = state.clock.getElapsedTime() + delay
    mat.current.opacity = 0.35 + Math.sin(t * 1.2) * 0.25
  })
  return (
    <line geometry={geometry}>
      <lineBasicMaterial
        ref={mat}
        color="#009E3D"
        transparent
        opacity={0.5}
        linewidth={1}
      />
    </line>
  )
}

function FluxoMaceio({ positions }) {
  const sourceIdx = 0 // Maceió
  const source = positions[sourceIdx]
  return positions.slice(1).map((p, i) => (
    <Arc key={i} start={source} end={p} delay={i * 0.4} />
  ))
}

function ParticulasOrbita() {
  const groupRef = useRef()
  const particulas = useMemo(() => {
    const arr = []
    for (let i = 0; i < 80; i++) {
      const phi = Math.acos(2 * Math.random() - 1)
      const theta = Math.random() * Math.PI * 2
      const r = RADIUS + 0.6 + Math.random() * 0.4
      arr.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        s: 0.005 + Math.random() * 0.01
      })
    }
    return arr
  }, [])
  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
  })
  return (
    <group ref={groupRef}>
      {particulas.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[p.s, 6, 6]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  )
}

function Cena() {
  const groupRef = useRef()
  const positions = useMemo(
    () => CIDADES.map(c => ({ ...c, vec: latLonToVec3(c.lat, c.lon) })),
    []
  )

  useFrame((state) => {
    if (!groupRef.current) return
    // auto-rotação suave + leve oscilação
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.12
    groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.08 - 0.15
  })

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-5, -2, -3]} intensity={0.6} color="#009E3D" />
      <ParticulasOrbita />
      <group ref={groupRef}>
        <SphereSolid />
        <Sphere />
        {positions.map((p, i) => (
          <Dot key={i} position={p.vec} principal={p.principal} />
        ))}
        <FluxoMaceio positions={positions.map(p => p.vec)} />
      </group>
    </>
  )
}

export default function GloboBrasil() {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Cena />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.4}
        />
      </Canvas>
    </div>
  )
}
