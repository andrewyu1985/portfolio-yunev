'use client'

import { useRef } from 'react'
import { DESIGNS, type DesignId } from './registry'

interface Props {
  active: DesignId
  pending: DesignId | null
  onSelect: (id: DesignId, origin?: { x: number; y: number }) => void
  onIntent: (id: DesignId) => void
}

export default function DesignSwitcher({ active, pending, onSelect, onIntent }: Props) {
  const optRefs = useRef<Partial<Record<DesignId, HTMLLabelElement | null>>>({})
  const activeIdx = DESIGNS.findIndex(d => d.id === active)
  const current = DESIGNS[activeIdx]

  const originOf = (id: DesignId) => {
    const el = optRefs.current[id]
    if (!el) return undefined
    const r = el.getBoundingClientRect()
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
  }

  return (
    <div className="ds-bar" data-active={active}>
      <div className="ds-bar-in">
        <p className="ds-caption">
          <span className="ds-caption-k">Одна страница · три дизайна</span>
          <span className="ds-caption-v">{current.label} — {current.tagline}</span>
        </p>

        <fieldset className="ds-seg" style={{ ['--i' as string]: activeIdx }}>
          <legend className="ds-sr">Дизайн страницы</legend>
          <span className="ds-thumb" aria-hidden />
          {DESIGNS.map(d => (
            <label
              key={d.id}
              ref={el => { optRefs.current[d.id] = el }}
              className="ds-opt"
              data-on={d.id === active || undefined}
              data-pending={d.id === pending || undefined}
              onPointerEnter={() => onIntent(d.id)}
              onTouchStart={() => onIntent(d.id)}
            >
              <input
                type="radio"
                name="page-design"
                value={d.id}
                checked={d.id === active}
                onChange={() => onSelect(d.id, originOf(d.id))}
                onFocus={() => onIntent(d.id)}
                className="ds-input"
              />
              <span className={`ds-glyph ds-glyph-${d.id}`} aria-hidden />
              <span className="ds-label">{d.label}</span>
            </label>
          ))}
        </fieldset>
      </div>
    </div>
  )
}
