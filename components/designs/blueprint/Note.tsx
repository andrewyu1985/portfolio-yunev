'use client'

import { useEffect, useRef, useState } from 'react'
import { aboutParagraphs, aboutTitle, certificate, timeline } from '@/data/profile'
import { docCode, years } from './model'
import { rich } from './rich'

const Y0 = Number(timeline[0].year)
const Y1 = Number(timeline[timeline.length - 1].year)

/* Хронология как масштабная линейка с размерной цепью (десктоп) */
function Ruler() {
  const box = useRef<HTMLDivElement>(null)
  const [w, setW] = useState(1000)
  useEffect(() => {
    const el = box.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setW(Math.max(600, Math.round(e.contentRect.width))))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const m = 34
  const x = (y: number) => m + ((y - Y0) / (Y1 - Y0)) * (w - 2 * m)
  const n = timeline.length
  // Выноска приходит к левому краю колонки события (текст в колонках выровнен влево),
  // а не к её середине: так она не совпадает с засечками соседних лет.
  const GAP = 24 // = column-gap у .bp-events
  const colX = (k: number) => k * ((w - GAP * (n - 1)) / n + GAP) + 6
  const yrs = Array.from({ length: Y1 - Y0 + 1 }, (_, i) => Y0 + i)
  const dimY = 26
  const rulerY = 74
  const h = 168

  return (
    <div ref={box} className="bp-ruler">
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
        <defs>
          <marker id="bp-dimarrow" viewBox="0 0 12 8" refX="12" refY="4" markerWidth="12" markerHeight="8" orient="auto-start-reverse" markerUnits="userSpaceOnUse">
            <path d="M0 1 L12 4 L0 7" fill="none" stroke="#B3321B" strokeWidth="1.2" />
          </marker>
        </defs>
        {/* размерная цепь: интервалы между событиями */}
        {timeline.slice(1).map((t, k) => {
          const a = Number(timeline[k].year)
          const b = Number(t.year)
          return (
            <g key={t.year} className="bp-rl-dim">
              <path d={`M${x(a)} ${dimY} H${x(b)}`} markerStart="url(#bp-dimarrow)" markerEnd="url(#bp-dimarrow)" />
              <text x={(x(a) + x(b)) / 2} y={dimY - 7} textAnchor="middle">{years(b - a)}</text>
            </g>
          )
        })}
        {timeline.map(t => (
          <path key={'ext' + t.year} className="bp-rl-ext" d={`M${x(Number(t.year))} ${dimY - 10} V${rulerY}`} />
        ))}
        {/* линейка */}
        <rect className="bp-rl-bar" x={x(Y0) - 10} y={rulerY} width={x(Y1) - x(Y0) + 20} height={14} />
        {yrs.map(y => {
          const ev = timeline.some(t => Number(t.year) === y)
          return (
            <g key={y}>
              <path className={ev ? 'bp-rl-major' : 'bp-rl-minor'} d={`M${x(y)} ${rulerY} V${rulerY + (ev ? 22 : 8)}`} />
              <text className={ev ? 'bp-rl-ymaj' : 'bp-rl-ymin'} x={x(y)} y={rulerY + (ev ? 38 : 26)} textAnchor="middle">{ev ? y : String(y).slice(2)}</text>
            </g>
          )
        })}
        {/* выноски к описаниям */}
        {timeline.map((t, k) => {
          const tx = x(Number(t.year))
          // уровни полок растут слева направо: полка правого события проходит ниже,
          // чем кончается вертикаль левого, и выноски не пересекаются
          const cy = rulerY + 50 + k * 8
          return <path key={'ld' + t.year} className="bp-rl-lead" d={`M${tx} ${rulerY + 42} V${cy} H${colX(k)} V${h}`} />
        })}
        {timeline.map((t, k) => <circle key={'pt' + t.year} className="bp-rl-pt" cx={colX(k)} cy={h - 3} r={3} />)}
      </svg>
    </div>
  )
}

function Stamp() {
  const [code, name] = certificate.title.split('·').map(s => s.trim())
  const issuer = certificate.details.split('·')[1]?.trim()
  const ring = `${name ?? code} • ${issuer ? issuer + ' • ' : ''}`
  const [c1, c2] = code.split('-')
  return (
    <svg className="bp-otk" viewBox="0 0 180 180" role="img" aria-label={`Штамп: ${certificate.title}`}>
      <defs>
        <path id="bp-otk-ring" d="M90 90 m-62 0 a62 62 0 1 1 124 0 a62 62 0 1 1 -124 0" />
        <filter id="bp-otk-ink" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.4 1.25" />
          <feComposite in="SourceGraphic" operator="in" />
        </filter>
      </defs>
      <g filter="url(#bp-otk-ink)" fill="none" stroke="currentColor">
        <circle cx="90" cy="90" r="84" strokeWidth="3" />
        <circle cx="90" cy="90" r="76" strokeWidth="1.2" />
        <circle cx="90" cy="90" r="46" strokeWidth="1.2" />
        <text fill="currentColor" stroke="none" className="bp-otk-ring">
          <textPath href="#bp-otk-ring" textLength={386} lengthAdjust="spacing">{ring}</textPath>
        </text>
        <text x="90" y="72" textAnchor="middle" fill="currentColor" stroke="none" className="bp-otk-s">ОТК</text>
        <text x="90" y="99" textAnchor="middle" fill="currentColor" stroke="none" className="bp-otk-l">{c1}</text>
        <text x="90" y="118" textAnchor="middle" fill="currentColor" stroke="none" className="bp-otk-s">{c2}</text>
      </g>
    </svg>
  )
}

export default function Note() {
  return (
    <section id="about" className="bp-sec bp-note" aria-labelledby="bp-about-h">
      <div className="bp-sec-head">
        <h2 id="bp-about-h" className="bp-h2">Пояснительная записка</h2>
        <span className="bp-sec-code">{docCode} ПЗ</span>
      </div>

      <p className="bp-about-title">{aboutTitle.lead} {aboutTitle.accent}</p>

      <h3 className="bp-h3"><span className="bp-num">1</span>Общие сведения</h3>
      <ol className="bp-clauses">
        {aboutParagraphs.map((t, i) => (
          <li key={i}><span className="bp-num">1.{i + 1}</span><p>{rich(t)}</p></li>
        ))}
      </ol>

      <h3 className="bp-h3"><span className="bp-num">2</span>Хронология, {Y0}–{Y1}</h3>
      <p className="bp-pencil bp-rl-hint">Размеры для справок, в годах</p>
      <div className="bp-chrono">
        <Ruler />
        <ol className="bp-events" style={{ ['--n' as string]: timeline.length }}>
          {timeline.map((t, k) => (
            <li key={t.year} data-gap={k > 0 ? years(Number(t.year) - Number(timeline[k - 1].year)) : undefined}>
              <span className="bp-ev-y">{t.year}</span>
              <span className="bp-ev-t">{rich(t.text)}</span>
            </li>
          ))}
        </ol>
      </div>

      <h3 className="bp-h3"><span className="bp-num">3</span>Подтверждение квалификации</h3>
      <div className="bp-cert">
        <Stamp />
        <div className="bp-cert-t">
          <p className="bp-cert-k">{certificate.kind}</p>
          <p className="bp-cert-title">{certificate.title}</p>
          <p className="bp-cert-d">{certificate.details}</p>
        </div>
      </div>
    </section>
  )
}
