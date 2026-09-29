'use client'

import { useCallback, useEffect, useState, type ComponentType, type ReactNode } from 'react'
import { flushSync } from 'react-dom'
import DesignSwitcher from './DesignSwitcher'
import { DESIGNS, isDesignId, type DesignId } from './registry'
import './shell.css'

type AltId = Exclude<DesignId, 'classic'>

// Модули альтернативных дизайнов грузятся по требованию и кэшируются здесь,
// чтобы к моменту снимка View Transition новый дизайн рисовался сразу, без заглушки
const loaders: Record<AltId, () => Promise<{ default: ComponentType }>> = {
  newspaper: () => import('./newspaper/Newspaper'),
  blueprint: () => import('./blueprint/Blueprint'),
}
const cache: Partial<Record<AltId, ComponentType>> = {}
const inflight: Partial<Record<AltId, Promise<ComponentType>>> = {}

export function preloadDesign(id: DesignId): Promise<unknown> {
  if (id === 'classic') return Promise.resolve()
  if (cache[id]) return Promise.resolve(cache[id])
  inflight[id] ??= loaders[id]().then(m => (cache[id] = m.default)).catch(err => {
    delete inflight[id]
    throw err
  })
  return inflight[id]
}

function setRootAttr(id: DesignId) {
  const root = document.documentElement
  if (id === 'classic') root.removeAttribute('data-design')
  else root.setAttribute('data-design', id)
}

function syncUrl(id: DesignId) {
  const url = new URL(window.location.href)
  if (id === 'classic') url.searchParams.delete('design')
  else url.searchParams.set('design', id)
  url.hash = ''
  window.history.replaceState(null, '', url.pathname + url.search)
}

export default function DesignShell({ children }: { children: ReactNode }) {
  // Гидрация всегда с классикой — как на сервере; ссылку ?design=… подхватываем после
  const [design, setDesign] = useState<DesignId>('classic')
  const [pending, setPending] = useState<DesignId | null>(null)
  const [announce, setAnnounce] = useState('')

  useEffect(() => {
    const initial = document.documentElement.getAttribute('data-design')
    if (!isDesignId(initial) || initial === 'classic') return
    preloadDesign(initial)
      .then(() => setDesign(initial))
      .catch(() => setRootAttr('classic'))
  }, [])

  const switchTo = useCallback(async (next: DesignId, origin?: { x: number; y: number }) => {
    if (next === design || pending) return
    setPending(next)
    try {
      await preloadDesign(next)
    } catch {
      setPending(null)
      setAnnounce('Не удалось загрузить дизайн — проверьте соединение')
      return
    }

    const label = DESIGNS.find(d => d.id === next)?.label ?? next
    const apply = () => {
      flushSync(() => {
        setDesign(next)
        setPending(null)
      })
      setRootAttr(next)
      syncUrl(next)
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || typeof document.startViewTransition !== 'function') {
      apply()
    } else {
      const t = document.startViewTransition(apply)
      if (origin) {
        const r = Math.hypot(
          Math.max(origin.x, window.innerWidth - origin.x),
          Math.max(origin.y, window.innerHeight - origin.y),
        )
        t.ready.then(() => {
          document.documentElement.animate(
            { clipPath: [`circle(0px at ${origin.x}px ${origin.y}px)`, `circle(${r}px at ${origin.x}px ${origin.y}px)`] },
            { duration: 720, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', pseudoElement: '::view-transition-new(root)' },
          )
        }).catch(() => {})
      }
    }
    setAnnounce(`Включён дизайн «${label}»`)
  }, [design, pending])

  const Alt = design === 'classic' ? null : cache[design] ?? null

  return (
    <>
      <DesignSwitcher active={design} pending={pending} onSelect={switchTo} onIntent={id => { preloadDesign(id).catch(() => {}) }} />
      <p className="ds-sr" aria-live="polite">{announce}</p>
      {Alt ? (
        <Alt />
      ) : (
        <>
          {/* Заглушка видна, только пока по ссылке ?design=… грузится другой дизайн */}
          <div className="ds-boot" aria-hidden><span className="ds-boot-dot" /> Загружаю дизайн…</div>
          <div className="ds-classic">{children}</div>
        </>
      )}
    </>
  )
}
