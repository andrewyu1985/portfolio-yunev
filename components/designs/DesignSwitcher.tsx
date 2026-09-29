'use client'

import { useRef } from 'react'
import { DESIGNS, DESIGN_COUNT, LINK_DESIGNS, type DesignId } from './registry'

interface Props {
  active: DesignId
  pending: DesignId | null
  onSelect: (id: DesignId, origin?: { x: number; y: number }) => void
  onIntent: (id: DesignId) => void
}

const quote = (s: string) => `«${s}»`
const listOf = (labels: string[]) =>
  labels.length <= 1 ? labels.join('') : `${labels.slice(0, -1).map(quote).join(', ')} и ${quote(labels[labels.length - 1])}`

export default function DesignSwitcher({ active, pending, onSelect, onIntent }: Props) {
  const optRefs = useRef<Partial<Record<DesignId, HTMLLabelElement | null>>>({})
  const activeIdx = DESIGNS.findIndex(d => d.id === active)
  const others = [...DESIGNS.filter(d => d.id !== active), ...LINK_DESIGNS].map(d => d.label)

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
          <span className="ds-caption-k">{DESIGN_COUNT} варианта дизайна этой страницы</span>
          <span className="ds-caption-v">
            Та же страница ещё в трёх стилях — {listOf(others)}
            <span className="ds-arrow" aria-hidden> →</span>
          </span>
          <span className="ds-caption-m">Эта страница в {DESIGN_COUNT} вариантах дизайна — переключите:</span>
        </p>

        <fieldset className="ds-seg" style={{ ['--i' as string]: activeIdx, ['--n' as string]: DESIGN_COUNT }}>
          <legend className="ds-sr">Вариант дизайна страницы</legend>
          <span className="ds-thumb" aria-hidden />
          {DESIGNS.map(d => (
            <label
              key={d.id}
              ref={el => { optRefs.current[d.id] = el }}
              className="ds-opt"
              title={`${d.label} — ${d.tagline}`}
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
          {LINK_DESIGNS.map(d => (
            <a key={d.id} href={d.href} className="ds-opt ds-opt-link" title={`${d.label} — ${d.tagline}`}>
              <span className={`ds-glyph ds-glyph-${d.id}`} aria-hidden />
              <span className="ds-label">{d.label}</span>
            </a>
          ))}
        </fieldset>
      </div>
    </div>
  )
}
