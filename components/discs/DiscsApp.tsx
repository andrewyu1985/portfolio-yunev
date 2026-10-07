'use client'

import { Component, Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { CATEGORIES, DISCS, STATUS, TOTAL, person, projectHref, projectHrefLabel } from './data'
import { warm, frontTexture, backTexture } from './textures'

// three.js — только в браузере: модуль подгружается после монтирования
const Scene = lazy(() => import('./Scene'))

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(err: unknown) { console.error('Сцена дисков упала:', err) }
  render() { return this.state.failed ? null : this.props.children }
}

const FLIP_MS = 900
const preload = (list: { project: { id: string } }[]) =>
  Promise.all((list as Parameters<typeof frontTexture>[0][]).flatMap(d => [frontTexture(d), backTexture(d)]))

function Digits({ value }: { value: number }) {
  // Счётчик с «барабанными» цифрами
  const s = String(value).padStart(2, '0')
  return (
    <span className="dk-digits" aria-hidden>
      {Array.from(s).map((ch, i) => (
        <span className="dk-digit" key={i}>
          <span className="dk-digit__col" style={{ transform: `translateY(${-Number(ch) * 10}%)` }}>
            {Array.from('0123456789').map(n => <span key={n}>{n}</span>)}
          </span>
        </span>
      ))}
    </span>
  )
}

export default function DiscsApp() {
  const [cat, setCat] = useState(0)
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [flipTick, setFlipTick] = useState(0)
  const [drag, setDrag] = useState(0)
  const [ready, setReady] = useState(false)
  const [indexOpen, setIndexOpen] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const switching = useRef(false)
  const wheelLock = useRef(0)

  const discs = DISCS[CATEGORIES[cat].id]
  const disc = discs[Math.min(index, discs.length - 1)]
  const href = projectHref(disc.project)
  const demo = disc.project.link && disc.project.demoLink ? disc.project.demoLink : undefined

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 760px)')
    const on = () => setMobile(mq.matches)
    on(); mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  // Прогреть текстуры остальных категорий, когда первая уже видна
  useEffect(() => {
    if (!ready) return
    const id = window.setTimeout(() => CATEGORIES.forEach(c => warm(DISCS[c.id])), 800)
    return () => window.clearTimeout(id)
  }, [ready])

  const go = useCallback((dir: number) => {
    setFlipped(false)
    setIndex(i => Math.max(0, Math.min(discs.length - 1, i + dir)))
  }, [discs.length])

  const pick = useCallback((i: number) => {
    if (i === index) setFlipped(f => !f)
    else { setFlipped(false); setIndex(i) }
  }, [index])

  // Смена категории: сначала обложки новой категории готовятся, потом — общий переворот.
  // Список дисков подменяется ближе к середине поворота, а сами обложки на дисках
  // сцена меняет в момент «ребром к зрителю» — резкой подмены не видно.
  const flipTo = useCallback((next: number, i: number) => {
    if (switching.current) return
    switching.current = true
    setIndexOpen(false)
    setFlipped(false)
    preload(DISCS[CATEGORIES[next].id]).catch(() => null).then(() => {
      setFlipTick(t => t + 1)
      window.setTimeout(() => { setCat(next); setIndex(i) }, FLIP_MS * 0.35)
      window.setTimeout(() => { switching.current = false }, FLIP_MS)
    })
  }, [])

  const switchCat = useCallback((next: number) => { if (next !== cat) flipTo(next, 0) }, [cat, flipTo])

  const jumpTo = useCallback((c: number, i: number) => {
    setIndexOpen(false)
    if (c === cat) { setFlipped(false); setIndex(i); return }
    flipTo(c, i)
  }, [cat, flipTo])

  // Клавиатура
  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
      else if (e.key === ' ') { e.preventDefault(); setFlipped(f => !f) }
      else if (e.key === 'Enter' && href) { window.open(href, href.startsWith('http') ? '_blank' : '_self') }
      else if (e.key === 'Escape') setIndexOpen(false)
      else if (e.key === 'ArrowUp') { e.preventDefault(); switchCat((cat + CATEGORIES.length - 1) % CATEGORIES.length) }
      else if (e.key === 'ArrowDown') { e.preventDefault(); switchCat((cat + 1) % CATEGORIES.length) }
    }
    window.addEventListener('keydown', on)
    return () => window.removeEventListener('keydown', on)
  }, [go, href, cat, switchCat])

  // Колесо и тачпад — листают ряд
  const onWheel = useCallback((e: React.WheelEvent) => {
    const now = performance.now()
    if (now - wheelLock.current < 520) return
    const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
    if (Math.abs(d) < 8) return
    wheelLock.current = now
    go(d > 0 ? 1 : -1)
  }, [go])

  // Перетаскивание
  const dragStart = useRef<number | null>(null)
  const dragged = useRef(false)
  const onPointerDown = (e: React.PointerEvent) => { dragStart.current = e.clientX; dragged.current = false }
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStart.current === null) return
    const dx = e.clientX - dragStart.current
    if (Math.abs(dx) > 6) dragged.current = true
    setDrag(dx / 320)
  }
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStart.current === null) return
    const dx = e.clientX - dragStart.current
    dragStart.current = null
    setDrag(0)
    if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1)
  }
  const onPick = useCallback((i: number) => { if (!dragged.current) pick(i) }, [pick])
  const onReady = useCallback(() => setReady(true), [])

  const facts = useMemo(() => disc.project.features.slice(0, 2), [disc])

  return (
    <div className={`dk${ready ? ' is-ready' : ''}${mobile ? ' is-mobile' : ''}`}>
      {/* Прелоадер */}
      <div className="dk-preload" aria-hidden={ready}>
        <span className="dk-preload__mark">{person.mark}</span>
        <span className="dk-preload__t">Собираю диски…</span>
      </div>

      {/* Шапка: марка и переключатели категорий */}
      <header className="dk-top">
        <a href="/" className="dk-mark" title="Классическая версия сайта">{person.mark}</a>
        <nav className="dk-cats" aria-label="Категории проектов">
          {CATEGORIES.map((c, i) => (
            <button key={c.id} type="button" className="dk-cat" data-on={i === cat || undefined} onClick={() => switchCat(i)}>
              {c.label}
              <span className="dk-cat__n">{DISCS[c.id].length}</span>
            </button>
          ))}
        </nav>
        <button type="button" className="dk-index-btn" aria-expanded={indexOpen} onClick={() => setIndexOpen(o => !o)}>
          Указатель <span className="dk-index-btn__n">{TOTAL}</span>
          <span className="dk-chev" aria-hidden />
        </button>
      </header>

      {/* Сцена */}
      <div className="dk-stage" onWheel={onWheel} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} onPointerLeave={onPointerUp}>
        {mounted && (
          <SceneBoundary>
            <Suspense fallback={null}>
              <Scene discs={discs} index={index} flipped={flipped} flipTick={flipTick} drag={drag} onPick={onPick} onReady={onReady} mobile={mobile} />
            </Suspense>
          </SceneBoundary>
        )}
      </div>

      {/* Карточка проекта — слева сверху */}
      <aside className="dk-meta" key={disc.project.id}>
        <h1 className="dk-meta__title">{disc.project.title}</h1>
        <dl className="dk-meta__rows">
          <div><dt>Стек</dt><dd>{disc.project.stack.slice(0, mobile ? 3 : 5).map(s => <span key={s}>{s}</span>)}</dd></div>
          <div><dt>Статус</dt><dd>{STATUS[disc.project.status]}</dd></div>
          <div><dt>Темы</dt><dd>{disc.project.tags.map(s => <span key={s}>{s}</span>)}</dd></div>
        </dl>
        {href && (
          <a className="dk-open" href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
            {projectHrefLabel(disc.project)}
          </a>
        )}
        {demo && (
          <a className="dk-open dk-open--second" href={demo} target={demo.startsWith('http') ? '_blank' : undefined} rel={demo.startsWith('http') ? 'noopener noreferrer' : undefined}>
            {disc.project.demoLabel ?? 'Демо'}
          </a>
        )}
      </aside>

      {/* Края: категория слева, счётчик справа */}
      <p className="dk-edge dk-edge--l">{person.name} · {CATEGORIES[cat].label}</p>
      <p className="dk-edge dk-edge--r" aria-label={`${index + 1} из ${discs.length}`}>
        <Digits value={index + 1} /><span className="dk-edge__of"> / {String(discs.length).padStart(2, '0')}</span>
      </p>

      {/* Два факта — внизу, как цитаты критиков в референсе */}
      <section className="dk-facts" aria-label="Что сделано">
        {facts.map((f, i) => (
          <p className="dk-fact" key={i}>
            <span className="dk-fact__k">Факт {String(i + 1).padStart(2, '0')}</span>
            <span className="dk-fact__t">{f}</span>
          </p>
        ))}
      </section>

      <p className="dk-hint" aria-hidden>← → листать · пробел — перевернуть · Enter — открыть</p>

      {/* Указатель — все 28 */}
      <div className={`dk-index${indexOpen ? ' is-open' : ''}`} role="dialog" aria-label="Все проекты">
        <div className="dk-index__in">
          {CATEGORIES.map((c, ci) => (
            <div className="dk-index__group" key={c.id}>
              <h2 className="dk-index__h">{c.label}</h2>
              <ol className="dk-index__list">
                {DISCS[c.id].map((d, di) => (
                  <li key={d.project.id}>
                    <button type="button" className="dk-index__item" data-on={ci === cat && di === index || undefined} onClick={() => jumpTo(ci, di)}>
                      <span className="dk-index__num">{String(d.n).padStart(2, '0')}</span>
                      <span className="dk-index__title">{d.project.title}</span>
                      <span className="dk-index__st">{STATUS[d.project.status]}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          ))}
          <p className="dk-index__foot">
            <a href={`mailto:${person.email}`}>{person.email}</a>
            <a href={person.telegram} target="_blank" rel="noopener noreferrer">Telegram</a>
            <a href="/">Классическая версия</a>
          </p>
        </div>
      </div>
    </div>
  )
}
