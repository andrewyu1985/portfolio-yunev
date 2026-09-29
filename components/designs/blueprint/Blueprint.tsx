'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { person, capabilities, stats, contact } from '@/data/profile'
import { mono, draft, hand } from './fonts'
import { items, layers, docCode, ALL_TAG } from './model'
import Schema from './Schema'
import Spec, { LinkArrow } from './Spec'
import Note from './Note'
import { rich } from './rich'
import Cursor from './Cursor'
import './blueprint.css'

const FLAG_ID = items.find(p => p.featured)?.id

const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
// Строчная первая буква, если это не аббревиатура («AI-инструменты» не трогаем)
const low = (s: string) => (/^.\p{Lu}/u.test(s) ? s : s.charAt(0).toLowerCase() + s.slice(1))

function Hero() {
  const yearsStat = stats.find(s => s.label.includes('лет'))
  const reqs = person.bio.split(/(?<=\.)\s+/)
  return (
    <section className="bp-sec bp-hero" aria-labelledby="bp-name">
      <div className="bp-sec-head">
        <p className="bp-view"><span className="bp-view-l">Вид А</span> Общий вид</p>
        <span className="bp-sec-code">{docCode} ВО</span>
      </div>

      <div className="bp-hero-grid">
        <div className="bp-hero-main">
          <div className="bp-namebox">
            {yearsStat ? (
              <div className="bp-dim" aria-hidden="true">
                <span>{yearsStat.value}{yearsStat.suffix} лет</span>
              </div>
            ) : null}
            <h1 id="bp-name" className="bp-name">
              <span>{person.firstName}</span> <span>{person.lastName}</span>
            </h1>
          </div>
          <p className="bp-role">{person.role}</p>
          <p className="bp-status">
            <span>{person.status}</span>
          </p>

          <h2 className="bp-h3 bp-tt-h">Технические требования</h2>
          <ol className="bp-tt">
            {reqs.map((r, i) => <li key={i}><span className="bp-num">{i + 1}.</span><span>{rich(r)}</span></li>)}
          </ol>

          <div className="bp-actions">
            <a className="bp-btn bp-btn-main" href="#bp-spec">Смотреть проекты</a>
            <a className="bp-btn bp-btn-ghost" href={contact.telegram} target="_blank" rel="noopener noreferrer">
              Telegram<LinkArrow />
            </a>
          </div>
        </div>

        <figure className="bp-part">
          <div className="bp-part-frame">
            <Image
              src={person.photo}
              alt={`${person.name}, фото`}
              width={440}
              height={440}
              sizes="(max-width: 720px) 220px, 300px"
              className="bp-photo"
              priority
            />
            <svg className="bp-part-lines" viewBox="0 0 400 400" aria-hidden="true">
              <path className="bp-cl" d="M200 -18 V418 M-18 200 H418" />
              <path className="bp-leader" d="M318 106 L364 40 H420" />
              <circle cx="318" cy="106" r="4" className="bp-leader-dot" />
            </svg>
            <span className="bp-pos-flag" aria-hidden="true">1</span>
          </div>
          <figcaption>
            <span className="bp-poz">поз.&nbsp;1</span> — {person.lastName} {person.firstName.charAt(0)}.
          </figcaption>
        </figure>

        <p className="bp-margin-note bp-pencil">
          Примечание: {low(person.noCode)}
        </p>
      </div>

      <div className="bp-hero-tables">
        <table className="bp-table">
          <caption>Технические характеристики</caption>
          <thead>
            <tr><th scope="col">Параметр</th><th scope="col">Значение</th></tr>
          </thead>
          <tbody>
            {stats.map(s => (
              <tr key={s.label}>
                <th scope="row">{cap(s.label)}</th>
                <td>{s.value}{s.suffix}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="bp-caps">
          <h2 className="bp-caption">Компетенции</h2>
          <ol>
            {capabilities.map((c, i) => (
              <li key={c}><span className="bp-num">{i + 1}</span>{c}</li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Layers({ active, onPick }: { active: string | null; onPick: (t: string | null) => void }) {
  return (
    <div className="bp-layers" role="group" aria-label="Слои: фильтр проектов по тегам">
      <p className="bp-layers-t">Слои</p>
      <button type="button" className="bp-layer" aria-pressed={active === null} onClick={() => onPick(null)}>
        <span className="bp-layer-sw bp-layer-all" aria-hidden="true" />
        <span className="bp-layer-n">{ALL_TAG}</span>
        <span className="bp-layer-c">{items.length}</span>
      </button>
      {layers.map(l => (
        <button
          key={l.tag}
          type="button"
          className="bp-layer"
          aria-pressed={active === l.tag}
          onClick={() => onPick(active === l.tag ? null : l.tag)}
          style={{ ['--c' as string]: l.color }}
        >
          <span className="bp-layer-sw" aria-hidden="true">{l.code}</span>
          <span className="bp-layer-n">{l.tag}</span>
          <span className="bp-layer-c">{l.count}</span>
        </button>
      ))}
    </div>
  )
}

function TitleBlock() {
  const year = new Date().getFullYear()
  const tg = contact.socials.find(s => s.label === 'Telegram')
  const handle = tg ? '@' + tg.href.split('/').pop() : ''
  return (
    <footer id="contact" className="bp-foot" aria-labelledby="bp-contact-h">
      <div className="bp-agree">
        <p className="bp-agree-k">Согласовано</p>
        <h2 id="bp-contact-h" className="bp-agree-h">{contact.ctaLead} {contact.ctaAccent}</h2>
        <div className="bp-agree-act">
          <a className="bp-btn bp-btn-main" href={contact.mailto}>Написать на {contact.email}</a>
          <ul className="bp-socials" aria-label="Соцсети">
            {contact.socials.map(s => (
              <li key={s.label}>
                <a className="bp-btn bp-btn-ghost" href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}<LinkArrow />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="bp-longnote">
          <span className="bp-pencil">Примечание к листу.</span> {person.noCode}: {rich(low(person.noCodeLong))}.
        </p>
        <p className="bp-copy">© {year} {person.name} · {contact.credits}</p>
      </div>

      <div className="bp-tb" role="group" aria-label="Основная надпись">
        <div className="tb-c tb-ch tb-ch1" aria-hidden="true"><span /><span /><span /><span /><span /></div>
        <div className="tb-c tb-ch tb-ch2" aria-hidden="true"><span /><span /><span /><span /><span /></div>
        <div className="tb-c tb-hd" aria-hidden="true"><span>Изм.</span><span>Лист</span><span>№ докум.</span><span>Подп.</span><span>Дата</span></div>
        <div className="tb-c tb-role tb-r1">
          <span className="tb-k">Разраб.</span><span className="tb-v">Юнев А.</span><span className="tb-sign" aria-hidden="true">Юнев</span><span className="tb-date">{year}</span>
        </div>
        {['Пров.', 'Т.контр.', 'Н.контр.', 'Утв.'].map((r, i) => (
          <div key={r} className={`tb-c tb-role tb-r${i + 2}`} aria-hidden="true">
            <span className="tb-k">{r}</span><span className="tb-v" /><span /><span />
          </div>
        ))}
        <div className="tb-c tb-design"><span className="tb-k">Обозначение</span><span className="tb-v">{docCode} СП</span></div>
        <div className="tb-c tb-name"><span className="tb-k">Наименование</span><span className="tb-v">Портфолио. {person.role}</span></div>
        <div className="tb-c tb-lit"><span className="tb-k">Лит.</span><span className="tb-v tb-cells"><i /><i /><i /></span></div>
        <div className="tb-c tb-mass"><span className="tb-k">Масса</span><span className="tb-v">—</span></div>
        <div className="tb-c tb-scale"><span className="tb-k">Масштаб</span><span className="tb-v">1:1</span></div>
        <div className="tb-c tb-sheet"><span className="tb-k">Лист</span><span className="tb-v">1</span></div>
        <div className="tb-c tb-sheets"><span className="tb-k">Листов</span><span className="tb-v">1</span></div>
        <div className="tb-c tb-mail"><span className="tb-k">E-mail</span><a className="tb-v" href={contact.mailto}>{contact.email}</a></div>
        <div className="tb-c tb-tg"><span className="tb-k">Telegram</span><a className="tb-v" href={contact.telegram} target="_blank" rel="noopener noreferrer">{handle}</a></div>
      </div>
    </footer>
  )
}

export default function Blueprint() {
  const sheet = useRef<HTMLDivElement>(null)
  const [layer, setLayer] = useState<string | null>(null)
  const [open, setOpen] = useState<Set<string>>(() => new Set(FLAG_ID ? [FLAG_ID] : []))
  const [hoverId, setHoverId] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const visible = useMemo(() => (layer ? items.filter(p => p.tags.includes(layer)) : items), [layer])

  const toggle = useCallback((id: string) => {
    setOpen(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const openOne = useCallback((id: string) => {
    setOpen(prev => (prev.has(id) ? prev : new Set(prev).add(id)))
  }, [])

  const pick = useCallback((id: string) => {
    openOne(id)
    requestAnimationFrame(() => {
      const row = document.getElementById(`bp-p-${id}`)
      if (!row) return
      row.scrollIntoView({ behavior: reduceMotion() ? 'instant' : 'smooth', block: 'start' })
      document.getElementById(`bp-pb-${id}`)?.focus({ preventScroll: true })
    })
  }, [openOne])

  return (
    <div className={`bp ${mono.variable} ${draft.variable} ${hand.variable}`}>
      <div ref={sheet} className={`bp-sheet${ready ? ' is-ready' : ''}`}>
        <svg className="bp-frame" aria-hidden="true" preserveAspectRatio="none">
          <rect className="bp-draw" pathLength={1} x="0" y="0" width="100%" height="100%" />
        </svg>
        <ol className="bp-zones" aria-hidden="true">
          {[8, 7, 6, 5, 4, 3, 2, 1].map(z => <li key={z}>{z}</li>)}
        </ol>

        <header className="bp-head">
          <div className="bp-corner" aria-hidden="true"><span>{docCode} СП</span></div>
          <p className="bp-head-doc">
            <span className="bp-head-code">{docCode} СП</span>
            <span className="bp-head-sheet">Лист 1</span>
          </p>
          <nav aria-label="Разделы листа">
            <ul>
              <li><a href="#bp-projects">Схема</a></li>
              <li><a href="#bp-spec">Спецификация</a></li>
              <li><a href="#about">Записка</a></li>
              <li><a href="#contact">Контакты</a></li>
            </ul>
          </nav>
        </header>

        <main id="top" className="bp-main">
          <Hero />

          <section id="bp-projects" className="bp-sec bp-projects" aria-label="Проекты">
            <div className="bp-sec-head">
              <h2 id="bp-schema-h" className="bp-h2">Схема структурная</h2>
              <span className="bp-sec-code">{docCode} С1</span>
            </div>
            <p className="bp-lead">
              Слои — это шины, проекты — узлы. Точка на пересечении значит, что проект относится к слою.{' '}
              <span className="bp-only-wide">Нажмите на узел, чтобы открыть его позицию в спецификации.</span>
              <span className="bp-only-tall">Нажмите на строку, чтобы открыть позицию в спецификации.</span>
            </p>
            <div className="bp-layers-dock">
              <Layers active={layer} onPick={setLayer} />
            </div>
            <Schema visible={visible} activeTag={layer} hoverId={hoverId} onHover={setHoverId} onPick={pick} />

            <div id="bp-spec" className="bp-sec-head bp-spec-head-row">
              <h2 id="bp-spec-h" className="bp-h2">Спецификация</h2>
              <span className="bp-sec-code">{docCode} СП</span>
            </div>
            <p className="bp-lead" aria-live="polite">
              {layer ? `Слой «${layer}»: ${visible.length} из ${items.length} поз.` : `Все слои: ${items.length} поз.`} Строка раскрывается: описание, состав, материал и ссылки.
            </p>
            <Spec visible={visible} activeTag={layer} open={open} hoverId={hoverId} onHover={setHoverId} onToggle={toggle} onOpen={openOne} />
          </section>

          <Note />
        </main>

        <TitleBlock />
      </div>
      <p className="bp-under" aria-hidden="true"><span>Копировал</span><span>Формат А1</span></p>
      <Cursor sheet={sheet} />
    </div>
  )
}
