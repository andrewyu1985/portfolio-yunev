'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import type { Disc } from './data'
import { frontTexture, backTexture } from './textures'

// Сцена: ряд дисков, активный — в центре. Прокрутка сдвигает ряд, смена категории
// переворачивает все диски: пока они спиной к зрителю, обложки подменяются.

export interface SceneProps {
  discs: Disc[]
  index: number
  flipped: boolean          // активный диск повёрнут оборотом (по клику/пробелу)
  flipTick: number          // растёт при смене категории — запускает общий переворот
  drag: number              // смещение от перетаскивания, в единицах сцены
  onPick: (i: number) => void
  onReady: () => void
  mobile: boolean
}

const SPACING = 2.9
const DAMP = 5.5

function damp(cur: number, target: number, dt: number, k = DAMP) {
  return THREE.MathUtils.damp(cur, target, k, dt)
}

function DiscMesh({ d, i, index, flipped, flipPhase, drag, onPick, mobile, onLoaded }: {
  d: Disc; i: number; index: number; flipped: boolean; flipPhase: number; drag: number
  onPick: (i: number) => void; mobile: boolean; onLoaded: () => void
}) {
  const group = useRef<THREE.Group>(null)
  const [front, setFront] = useState<THREE.Texture | null>(null)
  const [back, setBack] = useState<THREE.Texture | null>(null)
  const { pointer } = useThree()

  useEffect(() => {
    let alive = true
    Promise.all([frontTexture(d), backTexture(d)]).then(([f, b]) => {
      if (!alive) return
      setFront(f); setBack(b); onLoaded()
    })
    return () => { alive = false }
  }, [d, onLoaded])

  const geo = useMemo(() => new THREE.RingGeometry(0.115, 1, 160, 1), [])
  const rim = useMemo(() => new THREE.CylinderGeometry(1, 1, 0.022, 160, 1, true), [])
  const bore = useMemo(() => new THREE.CylinderGeometry(0.115, 0.115, 0.022, 64, 1, true), [])

  useFrame((_, dt) => {
    const g = group.current
    if (!g) return
    const rel = i - index
    const dist = Math.abs(rel)
    const active = rel === 0
    const sp = mobile ? SPACING * 0.92 : SPACING
    const tx = rel * sp + drag
    const tz = active ? 0 : -0.6 - dist * 0.3
    const ty = active ? 0 : -0.06 * dist
    const scale = active ? 1 : 0.78
    const flipY = flipPhase * Math.PI + (active && flipped ? Math.PI : 0)
    const yaw = active ? pointer.x * 0.16 : THREE.MathUtils.clamp(-rel * 0.38, -0.7, 0.7)
    const tilt = active ? -0.12 + pointer.y * -0.08 : -0.18
    g.position.x = damp(g.position.x, tx, dt)
    g.position.y = damp(g.position.y, ty, dt)
    g.position.z = damp(g.position.z, tz, dt)
    g.rotation.y = damp(g.rotation.y, yaw + flipY, dt, 6)
    g.rotation.x = damp(g.rotation.x, tilt, dt)
    const s = damp(g.scale.x, scale, dt)
    g.scale.setScalar(s)
    g.visible = dist <= 3
  })

  const fallback = useMemo(() => new THREE.Color(d.hue), [d.hue])

  return (
    <group ref={group} onClick={e => { e.stopPropagation(); onPick(i) }}>
      {/* лицо */}
      <mesh geometry={geo} position={[0, 0, 0.011]}>
        {/* key: при появлении текстуры материал пересоздаётся — иначе three не перекомпилирует шейдер */}
        <meshPhysicalMaterial key={front ? 'f-tex' : 'f-plain'} map={front ?? undefined} color={front ? '#ffffff' : fallback} roughness={0.42} metalness={0.05} clearcoat={0.55} clearcoatRoughness={0.3} transparent side={THREE.FrontSide} />
      </mesh>
      {/* оборот */}
      <mesh geometry={geo} position={[0, 0, -0.011]} rotation={[0, Math.PI, 0]}>
        <meshPhysicalMaterial key={back ? 'b-tex' : 'b-plain'} map={back ?? undefined} color={back ? '#ffffff' : '#ece9df'} roughness={0.7} metalness={0.02} clearcoat={0.15} transparent side={THREE.FrontSide} />
      </mesh>
      {/* ребро и отверстие */}
      <mesh geometry={rim} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#d9d9d4" roughness={0.35} metalness={0.2} side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={bore} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#cfcfca" roughness={0.4} side={THREE.BackSide} />
      </mesh>
    </group>
  )
}

function Rig({ mobile }: { mobile: boolean }) {
  const { camera } = useThree()
  useEffect(() => {
    // на телефоне камера смотрит выше диска — диск уходит в нижнюю половину экрана, под карточку
    camera.position.set(0, mobile ? 0.7 : 0.15, mobile ? 9.4 : 6.4)
    camera.lookAt(0, mobile ? 0.7 : 0, 0)
  }, [camera, mobile])
  return null
}

function Discs(props: SceneProps) {
  const { discs, index, flipped, flipTick, drag, onPick, onReady, mobile } = props
  // Общий переворот: фаза 0 → 1 за ~0.9 с; на середине родитель подменяет список дисков
  const phase = useRef(0)
  const [phaseState, setPhaseState] = useState(0)
  const lastTick = useRef(flipTick)
  useEffect(() => {
    if (flipTick !== lastTick.current) { lastTick.current = flipTick; phase.current = 0 }
  }, [flipTick])
  useFrame((_, dt) => {
    if (flipTick === 0) return
    if (phase.current < 1) {
      phase.current = Math.min(1, phase.current + dt / 0.9)
      setPhaseState(phase.current)
    }
  })
  // вторая половина переворота: диски уже новые, крутим от -0.5π к 0
  const flipPhase = flipTick === 0 ? 0 : (phaseState < 0.5 ? phaseState : phaseState - 1)

  const loaded = useRef(0)
  const onLoaded = useMemo(() => () => { loaded.current += 1; if (loaded.current >= 1) onReady() }, [onReady])

  return (
    <>
      {discs.map((d, i) => (
        <DiscMesh key={d.project.id} d={d} i={i} index={index} flipped={flipped} flipPhase={flipPhase} drag={drag} onPick={onPick} mobile={mobile} onLoaded={onLoaded} />
      ))}
    </>
  )
}

export default function Scene(props: SceneProps) {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ fov: 30, near: 0.1, far: 40, position: [0, 0.15, 6.4] }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Rig mobile={props.mobile} />
      <ambientLight intensity={1.15} />
      <directionalLight position={[3, 4, 6]} intensity={1.7} />
      <directionalLight position={[-5, 1, 2]} intensity={0.5} color="#ffe9d0" />
      <directionalLight position={[0, -3, 4]} intensity={0.35} color="#dfe8ff" />
      <Discs {...props} />
    </Canvas>
  )
}
