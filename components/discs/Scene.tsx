'use client'

import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import type { Disc } from './data'
import { frontTexture, backTexture } from './textures'

// Сцена: веер дисков внахлёст, активный — в центре. Диски живут в фиксированных «слотах»
// и никогда не пересоздаются: при смене категории все слоты доворачиваются на пол-оборота,
// а обложки подменяются в момент, когда диск стоит ребром к зрителю.

export interface SceneProps {
  discs: Disc[]
  index: number
  flipped: boolean          // активный диск повёрнут оборотом (по клику/пробелу)
  flipTick: number          // растёт при смене категории — каждый шаг добавляет пол-оборота
  drag: number              // смещение от перетаскивания, в единицах сцены
  onPick: (i: number) => void
  onReady: () => void
  mobile: boolean
}

export const SLOTS = 7
const SPACING = 1.32
const SPACING_MOBILE = 1.05

const damp = (cur: number, target: number, dt: number, k = 5.5) => THREE.MathUtils.damp(cur, target, k, dt)

function Slot({ i, disc, index, flipped, flipTick, drag, onPick, mobile, onLoaded }: {
  i: number; disc: Disc | null; index: number; flipped: boolean; flipTick: number; drag: number
  onPick: (i: number) => void; mobile: boolean; onLoaded: () => void
}) {
  const group = useRef<THREE.Group>(null)
  const frontMat = useRef<THREE.MeshPhysicalMaterial>(null)
  const backMat = useRef<THREE.MeshPhysicalMaterial>(null)
  const shown = useRef<Disc | null>(null)     // чьи обложки сейчас на диске
  const pending = useRef<Disc | null>(null)   // чьи обложки ждут момента «ребром»
  const { pointer } = useThree()

  const geo = useMemo(() => new THREE.RingGeometry(0.115, 1, 160, 1), [])
  const rim = useMemo(() => new THREE.CylinderGeometry(1, 1, 0.022, 160, 1, true), [])
  const bore = useMemo(() => new THREE.CylinderGeometry(0.115, 0.115, 0.022, 64, 1, true), [])

  useEffect(() => { pending.current = disc }, [disc])

  // После каждого пол-оборота к зрителю смотрит другая сторона меша,
  // поэтому при нечётной чётности обложка и этикетка меняются местами
  const apply = (d: Disc, parity: number) => {
    shown.current = d
    pending.current = null
    Promise.all([frontTexture(d), backTexture(d)]).then(([f, b]) => {
      if (shown.current !== d) return
      const fm = frontMat.current, bm = backMat.current
      const [ft, bt] = parity ? [b, f] : [f, b]
      if (fm) { fm.map = ft; fm.color.set('#ffffff'); fm.needsUpdate = true }
      if (bm) { bm.map = bt; bm.color.set('#ffffff'); bm.needsUpdate = true }
      onLoaded()
    })
  }

  useFrame((_, dt) => {
    const g = group.current
    if (!g) return
    const rel = i - index
    const dist = Math.abs(rel)
    const active = rel === 0
    const sp = mobile ? SPACING_MOBILE : SPACING
    const tx = rel * sp + drag
    // левые соседи уходят глубже и мельче: там стоит карточка проекта
    const left = rel < 0
    const tz = active ? 0 : (left ? -0.4 * dist - 0.25 : -0.22 * dist - 0.15)
    const ty = active ? 0 : -0.04 * dist
    const scale = active ? 1 : (left ? 0.86 : 0.92)
    const side = rel === 0 ? 0 : (rel > 0 ? -1 : 1)
    const parity = flipTick % 2
    const yaw = active ? -0.08 + pointer.x * 0.14 : side * 0.62
    const tilt = active ? -0.1 + pointer.y * -0.06 : -0.14
    // наклон задаётся в мировых осях: пол-оборота его не зеркалит, знак один для любой чётности
    const target = yaw + flipTick * Math.PI + (active && flipped ? Math.PI : 0)

    g.position.x = damp(g.position.x, tx, dt)
    g.position.y = damp(g.position.y, ty, dt)
    g.position.z = damp(g.position.z, tz, dt)
    g.rotation.y = damp(g.rotation.y, target, dt, 6)
    g.rotation.x = damp(g.rotation.x, tilt, dt)
    g.scale.setScalar(damp(g.scale.x, scale, dt))
    g.visible = disc !== null && dist <= 3

    // Подмена обложек: ждём, пока до цели останется меньше четверти оборота
    // (то есть диск прошёл положение «ребром»), а без переворота — сразу
    const p = pending.current
    if (p && p !== shown.current) {
      const remaining = Math.abs(target - g.rotation.y)
      if (remaining < Math.PI / 2) apply(p, parity)
    } else if (p && p === shown.current) {
      pending.current = null
    }
  })

  const fallback = disc?.hue ?? '#d9d9d4'

  return (
    <group ref={group} onClick={e => { e.stopPropagation(); onPick(i) }}>
      <mesh geometry={geo} position={[0, 0, 0.011]}>
        <meshPhysicalMaterial ref={frontMat} color={fallback} roughness={0.42} metalness={0.05} clearcoat={0.55} clearcoatRoughness={0.3} transparent side={THREE.FrontSide} />
      </mesh>
      <mesh geometry={geo} position={[0, 0, -0.011]} rotation={[0, Math.PI, 0]}>
        <meshPhysicalMaterial ref={backMat} color="#ece9df" roughness={0.7} metalness={0.02} clearcoat={0.15} transparent side={THREE.FrontSide} />
      </mesh>
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
  const loaded = useRef(false)
  const onLoaded = useMemo(() => () => { if (!loaded.current) { loaded.current = true; onReady() } }, [onReady])
  return (
    <>
      {Array.from({ length: SLOTS }, (_, i) => (
        <Slot key={i} i={i} disc={discs[i] ?? null} index={index} flipped={flipped} flipTick={flipTick} drag={drag} onPick={onPick} mobile={mobile} onLoaded={onLoaded} />
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
