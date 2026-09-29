'use client'

import { useRef } from 'react'
import { DESIGN_COUNT, SWITCHER_ITEMS, captionCount, captionMobile, captionOthers, type DesignId } from './registry'

interface Props {
  active: DesignId
  pending: DesignId | null
  onSelect: (id: DesignId, origin?: { x: number; y: number }) => void
  onIntent: (id: DesignId) => void
}

export default function DesignSwitcher({ active, pending, onSelect, onIntent }: Props) {
  const optRefs = useRef<Partial<Record<DesignId, HTMLLabelElement | null>>>({})
  const activeIdx = SWITCHER_ITEMS.findIndex(d => d.kind === 'design' && d.id === active)
  const others = SWITCHER_ITEMS.filter(d => d.kind === 'link' || d.id !== active).map(d => d.label)

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
          <span className="ds-caption-k">{captionCount()}</span>
          <span className="ds-caption-v">
            {captionOthers(others)}
            <span className="ds-arrow" aria-hidden> →</span>
          </span>
          <span className="ds-caption-m">{captionMobile()}</span>
        </p>

        <fieldset className="ds-seg" style={{ ['--i' as string]: activeIdx, ['--n' as string]: DESIGN_COUNT }}>
          <legend className="ds-sr">Вариант дизайна страницы</legend>
          <span className="ds-thumb" aria-hidden />
          {SWITCHER_ITEMS.map(d => d.kind === 'link' ? (
            <a key={d.id} href={d.href} className="ds-opt ds-opt-link" title={`${d.label} — ${d.tagline}`}>
              <span className={`ds-glyph ds-glyph-${d.id}`} aria-hidden />
              <span className="ds-label">{d.label}</span>
            </a>
          ) : (
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
        </fieldset>
      </div>
    </div>
  )
}
