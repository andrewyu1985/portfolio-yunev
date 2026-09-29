'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import { statusLabel } from '@/data/profile'
import { layerOf, type Item } from './model'
import { rich } from './rich'

interface Props {
  visible: Item[]
  activeTag: string | null
  open: Set<string>
  hoverId: string | null
  onHover: (id: string | null) => void
  onToggle: (id: string) => void
  onOpen: (id: string) => void
}

export const LinkArrow = () => (
  <svg className="bp-arrow" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
    <path d="M2.5 9.5 9 3M4 2.75h5.25V8" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

// Браузер умеет раскрывать hidden="until-found" при поиске (событие beforematch)
const FIND_OPENS = typeof window !== 'undefined' && 'onbeforematch' in HTMLElement.prototype

interface RowProps {
  p: Item
  isOpen: boolean
  hot: boolean
  onHover: Props['onHover']
  onToggle: Props['onToggle']
  onOpen: Props['onOpen']
}

function Row({ p, isOpen, hot, onHover, onToggle, onOpen }: RowProps) {
  const bodyId = `bp-pd-${p.id}`
  const body = useRef<HTMLDivElement>(null)
  const links = [
    p.link ? { href: p.link, label: p.linkLabel ?? 'Открыть' } : null,
    p.demoLink ? { href: p.demoLink, label: p.demoLabel ?? 'Демо' } : null,
  ].filter(Boolean) as { href: string; label: string }[]

  // Свёрнутое тело строки: hidden="until-found" — поиск браузера (Ctrl+F) находит текст
  // и сам раскрывает строку. React знает hidden только как булев атрибут, поэтому значение
  // ставим после рендера и только там, где браузер его поддерживает (иначе — обычный hidden).
  useLayoutEffect(() => {
    const el = body.current
    if (el && !isOpen && FIND_OPENS) el.setAttribute('hidden', 'until-found')
  }, [isOpen])

  useEffect(() => {
    const el = body.current
    if (!el) return
    const onMatch = () => onOpen(p.id)
    el.addEventListener('beforematch', onMatch)
    return () => el.removeEventListener('beforematch', onMatch)
  }, [onOpen, p.id])

  const status = statusLabel[p.status]

  return (
    <article
      id={`bp-p-${p.id}`}
      className={`bp-row${p.featured ? ' is-flag' : ''}${hot ? ' is-hot' : ''}${isOpen ? ' is-open' : ''}`}
      onMouseEnter={() => onHover(p.id)}
      onMouseLeave={() => onHover(null)}
    >
      <h3 className="bp-row-h">
        <button
          type="button"
          id={`bp-pb-${p.id}`}
          className="bp-row-btn"
          aria-expanded={isOpen}
          aria-controls={bodyId}
          aria-label={`Поз. ${p.pos}. ${p.title}, ${status}${p.featured ? ', флагман' : ''}`}
          onClick={() => onToggle(p.id)}
          onFocus={() => onHover(p.id)}
          onBlur={() => onHover(null)}
        >
          <span className="c-pos">{p.pos}</span>
          <span className="c-name">
            {rich(p.title)}
            {p.featured ? <span className="bp-flagnote">флагман</span> : null}
          </span>
          <span className="c-meta">
            <span className="c-code">{p.code}</span>
            <span className={`c-status s-${p.status}`}><i />{status}</span>
            <span className="c-note">
              {p.tags.map(t => {
                const l = layerOf(t)
                return (
                  <span key={t} className="bp-lmark" style={{ ['--c' as string]: l?.color }}>
                    <i />{t}
                  </span>
                )
              })}
            </span>
          </span>
          <span className="c-tog" />
        </button>
      </h3>
      <div ref={body} id={bodyId} className="bp-row-body" role="region" aria-label={p.title} hidden={!isOpen}>
        <div className="bp-row-main">
          <p className="bp-vh">Слои: {p.tags.join(', ')}.</p>
          <p className="bp-row-desc">{rich(p.description)}</p>
          <p className="bp-row-k">Состав</p>
          <ul className="bp-row-feat">
            {p.features.map(f => <li key={f}>{rich(f)}</li>)}
          </ul>
        </div>
        <div className="bp-row-side">
          <p className="bp-row-k">Материал</p>
          <ul className="bp-row-stack">
            {p.stack.map(s => <li key={s}>{rich(s)}</li>)}
          </ul>
          {links.length ? (
            <div className="bp-row-links">
              {links.map(l => (
                <a key={l.href} className="bp-btn bp-btn-ghost" href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label}<LinkArrow />
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export default function Spec({ visible, activeTag, open, hoverId, onHover, onToggle, onOpen }: Props) {
  return (
    <div className="bp-spec">
      <div className="bp-spec-head" aria-hidden="true">
        <span>Поз.</span>
        <span>Обозначение</span>
        <span>Наименование</span>
        <span>Статус</span>
        <span>Примечание</span>
        <span />
      </div>
      <p className="bp-spec-group">{activeTag ? `Слой «${activeTag}»` : 'Сборочные единицы'}</p>
      {visible.length === 0 ? (
        <p className="bp-spec-empty">По тегу «{activeTag}» проектов пока нет. Включите другой слой или все слои сразу.</p>
      ) : (
        visible.map(p => (
          <Row key={p.id} p={p} isOpen={open.has(p.id)} hot={hoverId === p.id} onHover={onHover} onToggle={onToggle} onOpen={onOpen} />
        ))
      )}
    </div>
  )
}
