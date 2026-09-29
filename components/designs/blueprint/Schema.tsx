'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { items, layers, type Item } from './model'
import { rich, splitArrows } from './rich'

interface Props {
  visible: Item[]
  activeTag: string | null
  hoverId: string | null
  onHover: (id: string | null) => void
  onPick: (id: string) => void
}

// Наклон подписей узлов: читаются слева направо снизу вверх, без поворота головы на 90°
const ANGLE = 58
const SIN = Math.sin((ANGLE * Math.PI) / 180)
const COS = Math.cos((ANGLE * Math.PI) / 180)
const FS = 13 // кегль подписи узла
const LABELS = items.map(p => ({ id: p.id, ...splitArrows(p.title) }))
const MAX_CH = Math.max(...LABELS.map(l => l.plain.length))

/* Десктоп: шины-слои горизонтально, узлы-проекты сверху, отводы вниз до шин.
   Точка на пересечении — проект относится к слою. */
function SchemaWide({ visible, activeTag, hoverId, onHover, onPick }: Props) {
  const box = useRef<HTMLDivElement>(null)
  const probe = useRef<SVGTextElement>(null)
  const nodes = useRef<(HTMLElement | SVGElement | null)[]>([])
  const [w, setW] = useState(1100)
  const [chW, setChW] = useState(FS * 0.5)
  const [drawn, setDrawn] = useState(false)
  const [cur, setCur] = useState(0)

  useEffect(() => {
    const el = box.current
    if (!el) return
    // ширина знака моноширинного шрифта — по факту, после загрузки шрифтов
    let alive = true
    const measure = () => {
      const t = probe.current
      if (!alive || !t) return
      const len = t.getComputedTextLength()
      if (len > 0) setChW(len / 20)
    }
    const ro = new ResizeObserver(([e]) => {
      setW(Math.max(640, Math.round(e.contentRect.width)))
      measure()
    })
    ro.observe(el)
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setDrawn(true); io.disconnect() }
    }, { threshold: 0.2 })
    io.observe(el)
    document.fonts?.ready.then(measure)
    return () => { alive = false; ro.disconnect(); io.disconnect() }
  }, [])

  const leftW = 216
  const x0 = leftW + 18
  const n = Math.max(visible.length, 1)
  const labelLen = MAX_CH * chW
  // Шаг колонок: каждая наклонная подпись должна уместиться справа в ширину схемы
  const colW = visible.reduce((m, p, i) => {
    const len = (LABELS.find(l => l.id === p.id)?.plain.length ?? p.title.length) * chW
    return Math.min(m, (w - x0 - 14 - len * COS) / (i + 0.5))
  }, 96)
  const labelH = Math.ceil(labelLen * SIN) + 22
  const nodeY = labelH + 8
  const nodeS = Math.min(24, colW - 4)
  const busY0 = nodeY + nodeS + 40
  const busGap = 38
  const busY = (i: number) => busY0 + i * busGap
  const h = busY(layers.length - 1) + 34
  const busEnd = Math.min(w - 4, x0 + colW * n + 14)
  const curIdx = Math.min(cur, n - 1)

  const onKey = (e: KeyboardEvent<Element>, i: number) => {
    let j: number | null = null
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') j = (i + 1) % n
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') j = (i - 1 + n) % n
    else if (e.key === 'Home') j = 0
    else if (e.key === 'End') j = n - 1
    if (j === null) return
    e.preventDefault()
    setCur(j)
    nodes.current[j]?.focus()
  }

  return (
    <div ref={box} className={`bp-schema-wide${drawn ? ' is-drawn' : ''}`}>
      <p className="bp-vh" id="bp-sc-kbd">Переход между узлами — клавиши со стрелками, открыть позицию — Enter.</p>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} role="group" aria-label="Схема структурная: проекты и слои" aria-describedby="bp-sc-kbd">
        <defs>
          {layers.map((l, i) => (
            <marker key={l.tag} id={`bp-bus-end-${i}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" fill={l.color} />
            </marker>
          ))}
        </defs>

        <text ref={probe} className="bp-sc-title bp-sc-probe" x={-9999} y={-9999} aria-hidden="true">{'0'.repeat(20)}</text>

        {/* подсветка столбца под наведённым узлом */}
        {visible.map((p, i) =>
          p.id === hoverId ? (
            <rect key={'hl' + p.id} className="bp-sc-band" x={x0 + colW * i + 1} y={nodeY - 6} width={colW - 2} height={h - nodeY + 2} />
          ) : null,
        )}

        {/* условные обозначения */}
        <g className="bp-sc-legend" aria-hidden="true">
          <text x={8} y={labelH - 78} className="bp-sc-lgh">Обозначения</text>
          <rect x={8} y={labelH - 60} width={20} height={20} className="bp-sc-box" />
          <text x={18} y={labelH - 46} textAnchor="middle" className="bp-sc-pos">n</text>
          <text x={38} y={labelH - 46}>позиция спецификации</text>
          <path d={`M8 ${labelH - 18} H28`} className="bp-sc-lgl" />
          <circle cx={18} cy={labelH - 18} r={4.5} fill="var(--ink2)" className="bp-sc-dot" />
          <text x={38} y={labelH - 14}>проект входит в слой</text>
        </g>

        {/* шины-слои */}
        {layers.map((l, i) => {
          const dim = activeTag && activeTag !== l.tag
          const y = busY(i)
          return (
            <g key={l.tag} className={`bp-sc-bus${dim ? ' is-dim' : ''}${activeTag === l.tag ? ' is-on' : ''}`} style={{ color: l.color }} aria-hidden="true">
              <rect className="bp-sc-block" x={8} y={y - 13} width={leftW - 28} height={26} />
              <rect x={8} y={y - 13} width={30} height={26} fill={l.color} />
              <text className="bp-sc-code" x={23} y={y + 4.5} textAnchor="middle">{l.code}</text>
              <text className="bp-sc-bname" x={46} y={y + 4.5}>{l.tag}</text>
              <text className="bp-sc-bcount" x={leftW - 28} y={y + 4.5} textAnchor="end">{l.count}</text>
              <path className="bp-draw" pathLength={1} d={`M${leftW - 20} ${y} H${busEnd}`} stroke={l.color} strokeWidth={activeTag === l.tag ? 3 : 2} markerEnd={`url(#bp-bus-end-${i})`} />
            </g>
          )
        })}

        {/* узлы-проекты */}
        {visible.map((p, i) => {
          const cx = x0 + colW * i + colW / 2
          const idx = p.tags.map(t => layers.findIndex(l => l.tag === t)).filter(k => k >= 0)
          const lastY = idx.length ? busY(Math.max(...idx)) : nodeY + nodeS
          const hot = p.id === hoverId
          const lab = LABELS.find(l => l.id === p.id) ?? splitArrows(p.title)
          const tx = cx + 3
          const ty = nodeY - 7
          return (
            <a
              key={p.id}
              ref={el => { nodes.current[i] = el }}
              href={`#bp-p-${p.id}`}
              tabIndex={i === curIdx ? 0 : -1}
              className={`bp-sc-node${hot ? ' is-hot' : ''}${p.featured ? ' is-flag' : ''}`}
              aria-label={`Поз. ${p.pos}. ${p.title}. Открыть в спецификации`}
              onMouseEnter={() => onHover(p.id)}
              onMouseLeave={() => onHover(null)}
              onFocus={() => { setCur(i); onHover(p.id) }}
              onBlur={() => onHover(null)}
              onKeyDown={e => onKey(e, i)}
              onClick={e => { e.preventDefault(); setCur(i); onPick(p.id) }}
            >
              <title>{`${p.pos}. ${p.title}`}</title>
              <rect className="bp-sc-hit" x={cx - colW / 2} y={nodeY - 8} width={colW} height={lastY - nodeY + 16} />
              <g transform={`translate(${tx} ${ty}) rotate(${-ANGLE})`}>
                <rect className="bp-sc-hit" x={-4} y={-FS - 2} width={lab.plain.length * chW + 10} height={FS + 8} />
                <text className="bp-sc-title" x={2} y={0}>{lab.plain}</text>
                {lab.at.map(a => {
                  const ax = 2 + a * chW
                  const y = -FS * 0.34
                  return <path key={a} className="bp-sc-arr" d={`M${ax + 1} ${y} H${ax + 2 * chW - 2} M${ax + 2 * chW - 6} ${y - 3.5} L${ax + 2 * chW - 2} ${y} L${ax + 2 * chW - 6} ${y + 3.5}`} />
                })}
              </g>
              <path className="bp-draw bp-sc-stub" pathLength={1} d={`M${cx} ${nodeY + nodeS} V${lastY}`} style={{ transitionDelay: `${i * 18}ms` }} />
              <rect className="bp-sc-box" x={cx - nodeS / 2} y={nodeY} width={nodeS} height={nodeS} />
              <text className="bp-sc-pos" x={cx} y={nodeY + nodeS / 2 + 4} textAnchor="middle">{p.pos}</text>
              {idx.map(k => (
                <circle key={k} className="bp-sc-dot" cx={cx} cy={busY(k)} r={4.5} fill={layers[k].color} />
              ))}
            </a>
          )
        })}
      </svg>
    </div>
  )
}

/* Планшет и телефон: та же схема, повёрнутая на 90°: строки-позиции, столбцы-шины. */
function SchemaTall({ visible, activeTag, hoverId, onHover, onPick }: Props) {
  const [all, setAll] = useState(false)
  const LIMIT = 8
  const cutList = !all && visible.length > LIMIT + 2
  const rows = cutList ? visible.slice(0, LIMIT) : visible

  return (
    <div className="bp-schema-tall" style={{ ['--nl' as string]: layers.length }}>
      <div className="bp-mx-head" aria-hidden="true">
        <span className="bp-mx-hpos">Поз.</span>
        <span className="bp-mx-hname">Наименование</span>
        {layers.map(l => (
          <span key={l.tag} className={`bp-mx-hcode${activeTag && activeTag !== l.tag ? ' is-dim' : ''}`} style={{ ['--c' as string]: l.color }} title={l.tag}>{l.code}</span>
        ))}
      </div>
      <ul className="bp-mx">
        {rows.map(p => (
          <li key={p.id}>
            <button
              type="button"
              className={`bp-mx-row${p.featured ? ' is-flag' : ''}${hoverId === p.id ? ' is-hot' : ''}`}
              onClick={() => onPick(p.id)}
              onMouseEnter={() => onHover(p.id)}
              onMouseLeave={() => onHover(null)}
              aria-label={`Поз. ${p.pos}. ${p.title}. Слои: ${p.tags.join(', ')}. Открыть в спецификации`}
            >
              <span className="bp-mx-pos">{p.pos}</span>
              <span className="bp-mx-name">{rich(p.title)}</span>
              {layers.map(l => (
                <span key={l.tag} className={`bp-mx-cell${activeTag && activeTag !== l.tag ? ' is-dim' : ''}`} style={{ ['--c' as string]: l.color }}>
                  {p.tags.includes(l.tag) ? <i /> : null}
                </span>
              ))}
            </button>
          </li>
        ))}
      </ul>
      {cutList || (all && visible.length > LIMIT + 2) ? (
        <button type="button" className="bp-btn bp-btn-ghost bp-mx-more" aria-expanded={all} onClick={() => setAll(v => !v)}>
          {all ? 'Свернуть схему' : `Вся схема: ${visible.length} поз.`}
        </button>
      ) : null}
    </div>
  )
}

export default function Schema(props: Props) {
  return (
    <>
      <SchemaWide {...props} />
      <SchemaTall {...props} />
    </>
  )
}
