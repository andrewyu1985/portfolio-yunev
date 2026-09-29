'use client'

import { useEffect, useRef, type RefObject } from 'react'

const PX_PER_MM = 96 / 25.4

/* Перекрестие и считывание координат листа, как в САПР.
   Только для мыши (hover + pointer: fine); на сенсорных экранах не монтируется. */
export default function Cursor({ sheet }: { sheet: RefObject<HTMLElement | null> }) {
  const cross = useRef<HTMLDivElement>(null)
  const readout = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)')
    if (!mq.matches) return
    // Своё перекрестие заменяет системный курсор листа (иначе два перекрестия поверх друг друга);
    // над ссылками и кнопками своё прячется, и остаётся обычная «рука».
    const host = sheet.current
    host?.classList.add('has-cross')
    let raf = 0
    let last: PointerEvent | null = null

    const paint = () => {
      raf = 0
      const e = last
      const s = sheet.current
      if (!e || !s || !cross.current || !readout.current) return
      const r = s.getBoundingClientRect()
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom
      const overUi = !!(e.target as Element | null)?.closest?.('a, button, input, [role="button"]')
      cross.current.style.opacity = inside && !overUi ? '1' : '0'
      cross.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      readout.current.style.opacity = inside ? '1' : '0'
      // счётчик — в правом нижнем углу видимой части листа
      readout.current.style.right = `${Math.max(16, window.innerWidth - r.right + 18)}px`
      readout.current.style.bottom = `${Math.max(16, window.innerHeight - r.bottom + 18)}px`
      const mx = (e.clientX - r.left) / PX_PER_MM
      const my = (e.clientY - r.top) / PX_PER_MM
      readout.current.textContent = `X ${mx.toFixed(1).padStart(6, ' ')}   Y ${my.toFixed(1).padStart(7, ' ')}  мм`
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      last = e
      if (!raf) raf = requestAnimationFrame(paint)
    }
    const onLeave = () => {
      if (cross.current) cross.current.style.opacity = '0'
      if (readout.current) readout.current.style.opacity = '0'
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      host?.classList.remove('has-cross')
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [sheet])

  return (
    <>
      <div ref={cross} className="bp-cross" aria-hidden="true"><i /></div>
      <div ref={readout} className="bp-readout" aria-hidden="true" />
    </>
  )
}
