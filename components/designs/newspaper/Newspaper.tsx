'use client'

import { Fragment, useMemo, useState, type CSSProperties, type ReactNode } from 'react'
import { projects, allTags, ALL_TAG } from '@/data/projects'
import {
  person, capabilities, stats, aboutTitle, aboutParagraphs, timeline, certificate, contact,
} from '@/data/profile'
import type { Project } from '@/types/project'
import { display, displayItalic, text, grot } from './fonts'
import s from './Newspaper.module.css'
import './newspaper-global.css'

// Типографская правка строки из данных:
// — неразрывный дефис U+2011 есть не во всех гарнитурах, ставим обычный;
// — разряды чисел («20 000»), число и слово после него («1 место»),
//   однобуквенные предлоги и союзы и тире не отрываются от соседей.
function typo(v: string, justified = false) {
  const NB = String.fromCharCode(0xa0)
  const r = v
    .replace(new RegExp(String.fromCharCode(0x2011), 'g'), '-')
    .replace(/(\d) (?=\d{3}(?!\d))/g, '$1' + NB)
    .replace(/(\d[+%×]?) (?=[а-яёА-ЯЁa-zA-Z])/g, '$1' + NB)
    .replace(/ ([—→])/g, NB + '$1')
  // В колонках с выключкой по ширине предлоги не привязываем: длинные неразрывные
  // сцепки («и «ВектораВсем»») растягивают пробелы в строке
  if (justified) return r
  return r
    .replace(/(^|[\s(«])([а-яёА-ЯЁ]) /g, '$1$2' + NB)
    .replace(/(^|[\s(«])([а-яёА-ЯЁ]) /g, '$1$2' + NB)
}

// Стрелки «→» нет ни в одной из подключённых гарнитур (Google отдаёт её не во всех
// подмножествах), и браузер подставлял Times New Roman. Рисуем её сами линией
// той же толщины, что у текста; для скринридера и копирования остаётся знак.
function Arrow() {
  return (
    <span className={s.arrow}>
      <svg viewBox="0 0 16 10" aria-hidden focusable="false">
        <path d="M1 5h13M10 1.5 14 5l-4 3.5" fill="none" stroke="currentColor" strokeWidth="1.25" />
      </svg>
      <span className={s.sr}>→</span>
    </span>
  )
}

function withArrows(v: string, key = ''): ReactNode[] {
  return v.split('→').flatMap((part, i) => (i ? [<Arrow key={key + 'a' + i} />, part] : [part]))
}

// Текст из данных для набора колонок
function t(v: string, justified = false): ReactNode {
  return withArrows(typo(v, justified))
}

// Заголовок: слова с коротким префиксом через дефис («E-commerce», «AI-генерация»)
// не рвём после префикса — «E-» в конце строки читается как брак
function tt(v: string, all = false): ReactNode {
  const re = all ? /(\S+-\S+)/ : /((?:^|(?<=\s))[A-Za-zА-Яа-яЁё]{1,3}-\S+)/
  return typo(v).split(re).map((part, i) =>
    i % 2
      ? <span key={i} className={s.nowrap}>{withArrows(part, String(i))}</span>
      : <Fragment key={i}>{withArrows(part, String(i))}</Fragment>,
  )
}

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ')

function plural(n: number, one: string, few: string, many: string) {
  const m10 = n % 10
  const m100 = n % 100
  if (m10 === 1 && m100 !== 11) return one
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few
  return many
}

// Адрес для объявления: домен и путь без протокола; длинный идентификатор MAX не печатаем
function handle(href: string) {
  const u = new URL(href)
  const path = u.pathname.replace(/\/$/, '')
  return path.length > 24 ? u.hostname : u.hostname + path
}

const STATUS: Record<Project['status'], string> = {
  live: 'Работает',
  wip: 'В работе',
  concept: 'Идея',
}

function Out() {
  return (
    <svg className={s.out} viewBox="0 0 10 10" width="10" height="10" aria-hidden focusable="false">
      <path d="M2 8 8 2M3.5 2H8v4.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

function ProjectLinks({ p }: { p: Project }) {
  const links = [
    p.link && { href: p.link, label: p.linkLabel ?? 'Подробнее' },
    p.demoLink && { href: p.demoLink, label: p.demoLabel ?? 'Демо' },
  ].filter(Boolean) as { href: string; label: string }[]
  if (!links.length) return null
  return (
    <p className={s.links}>
      {links.map(l => (
        <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={s.link}>
          <span>{l.label}</span>
          <Out />
          <span className={s.sr}> (откроется в новой вкладке)</span>
        </a>
      ))}
    </p>
  )
}

function Kicker({ p }: { p: Project }) {
  return (
    <p className={s.storyMeta}>
      <span className={s.kicker}>
        {p.tags.map((tag, i) => (
          <Fragment key={tag}>
            <span className={s.nowrap}>{tag}</span>{i < p.tags.length - 1 ? ', ' : ''}
          </Fragment>
        ))}
      </span>
      <span className={cx(s.status, p.status !== 'live' && s.statusWip)}>{STATUS[p.status]}</span>
    </p>
  )
}

function Featured({ p }: { p: Project }) {
  return (
    <article className={s.feature} aria-labelledby={`nw-p-${p.id}`}>
      <div className={s.featureMain}>
        <Kicker p={p} />
        <h3 id={`nw-p-${p.id}`} className={s.featureTitle}>
          <span className={s.hl}>{tt(p.title)}</span>
        </h3>
        <p className={s.featureDeck}>Главный материал номера</p>
        <div className={s.featureCols}>
          <p className={cx(s.body, s.dropcap)}>{t(p.description, true)}</p>
          <ul className={s.dashes}>
            {p.features.map(f => <li key={f}>{t(f)}</li>)}
          </ul>
        </div>
      </div>
      <aside className={s.featureSide} aria-label={`Справка о проекте ${p.title}`}>
        <p className={s.sideHead}>Справка</p>
        <dl className={s.facts}>
          <div>
            <dt>Статус</dt>
            <dd>{STATUS[p.status]}</dd>
          </div>
          <div>
            <dt>Разделы</dt>
            <dd>{p.tags.join(', ')}</dd>
          </div>
          <div>
            <dt>Технологии</dt>
            <dd><i>{p.stack.join(', ')}</i></dd>
          </div>
        </dl>
        <ProjectLinks p={p} />
      </aside>
    </article>
  )
}

function Story({ p, lead, i }: { p: Project; lead: boolean; i: number }) {
  // Крупный материал на широком экране: первый пункт выносится «выноской» между линейками,
  // остальные пункты развёрнуты. На телефоне выноски нет — пункт стоит в списке,
  // видны первые три, остальное в «Окончании», как у обычных заметок.
  const pull = lead && p.features.length > 1 ? p.features[0] : null
  const head = p.features.slice(0, 3)
  const rest = p.features.slice(3)
  const short = p.title.length <= 16
  const moreLabel = `ещё ${rest.length} ${plural(rest.length, 'пункт', 'пункта', 'пунктов')}`
  return (
    <article
      className={cx(s.story, lead && s.storyLead)}
      style={{ '--i': Math.min(i, 12) } as CSSProperties}
      aria-labelledby={`nw-p-${p.id}`}
    >
      <Kicker p={p} />
      <h3 id={`nw-p-${p.id}`} className={cx(s.storyTitle, lead ? s.titleLead : short && s.titleShort)}>
        <span className={s.hl}>{tt(p.title)}</span>
      </h3>
      <div className={cx(lead && s.leadCols)}>
        <p className={cx(s.body, s.lede, lead && s.dropcap)}>{t(p.description)}</p>
        {pull && <p className={s.pull}>{t(pull)}</p>}
        <ul className={s.dashes}>
          {head.map((f, k) => (
            <li key={f} className={cx(!!pull && k === 0 && s.pulled)}>{t(f)}</li>
          ))}
          {lead && rest.map(f => <li key={f} className={s.wideOnly}>{t(f)}</li>)}
        </ul>
        <p className={s.tech}><i>Технологии: {p.stack.join(', ')}</i></p>
      </div>
      {/* Подвал заметки: ссылки и «Окончание» в одну строку; раскрытое окончание встаёт над ссылками */}
      <div className={s.foot}>
        <ProjectLinks p={p} />
        {rest.length > 0 && (
          <details className={cx(s.more, lead && s.narrowOnly)}>
            <summary>
              <span className={s.moreWord}>Окончание: </span>{moreLabel}
            </summary>
            <ul className={s.dashes}>
              {rest.map(f => <li key={f}>{t(f)}</li>)}
            </ul>
          </details>
        )}
      </div>
    </article>
  )
}

// Раскладка «полосы» модулями по 7 материалов, как верстают газету:
// крупный материал на две колонки, под ним пара заметок, рядом две колонки по две заметки.
// Каждый второй модуль зеркальный: крупный материал справа — и в DOM он тоже идёт
// после боковых колонок, чтобы порядок чтения и Tab совпадали с видимым слева направо.
interface Module {
  lead: Project
  pair: Project[]
  sides: Project[][]
  rev: boolean
  start: number
}

// Оценка высоты набора в пикселях (замерена на ширине 1440): так редактор «подгоняет» полосу
const chars = (p: Project, all: boolean) =>
  p.title.length + p.description.length + (all ? p.features : p.features.slice(0, 3)).join('').length
const hStd = (p: Project) => 150 + (p.link || p.demoLink ? 44 : 0) + 1.02 * chars(p, false)
const hLead = (p: Project) => 330 + 0.52 * chars(p, true)

// Раскладываем шесть заметок модуля по местам так, чтобы колонки кончались ближе друг к другу
function balance(lead: Project, rest: Project[]) {
  let best = { cost: Infinity, pair: [] as Project[], c: [] as Project[], d: [] as Project[] }
  const idx = rest.map((_, i) => i)
  for (let a = 0; a < 6; a++) for (let b = a + 1; b < 6; b++) {
    const others = idx.filter(i => i !== a && i !== b)
    for (let k = 1; k < 4; k++) {
      const cI = [others[0], others[k]]
      const dI = others.filter(i => !cI.includes(i))
      const hs = [
        hLead(lead) + Math.max(hStd(rest[a]), hStd(rest[b])),
        hStd(rest[cI[0]]) + hStd(rest[cI[1]]),
        hStd(rest[dI[0]]) + hStd(rest[dI[1]]),
      ]
      const cost = Math.max(...hs) - Math.min(...hs)
      if (cost < best.cost) {
        best = { cost, pair: [rest[a], rest[b]], c: cI.map(i => rest[i]), d: dI.map(i => rest[i]) }
      }
    }
  }
  return best
}

function layoutIssue(list: Project[]): Module[] {
  const mods: Module[] = []
  for (let i = 0; i < list.length; i += 7) {
    const [lead, ...rest] = list.slice(i, i + 7)
    let c: Project[] = []
    let d: Project[] = []
    let pair: Project[] = []
    if (rest.length === 6) {
      ({ c, d, pair } = balance(lead, rest))
    } else {
      const order = [c, d, pair, pair, c, d]
      rest.forEach((p, j) => order[j].push(p))
    }
    mods.push({ lead, pair, sides: [c, d].filter(x => x.length), rev: mods.length % 2 === 1, start: i })
  }
  return mods
}

function IssueModule({ m }: { m: Module }) {
  const n = m.sides.length
  // Колонки на широком экране: крупный блок = 2 доли, каждая боковая колонка = 1 доля
  const widths = [n === 0 ? '1fr' : '2fr', ...m.sides.map(() => '1fr')]
  const gtc = (m.rev ? [...widths].reverse() : widths).join(' ')
  const mainCol = m.rev ? n + 1 : 1
  const sideCol = (k: number) => (m.rev ? k + 1 : k + 2)
  // Номера материалов для задержки «проявления» идут в порядке чтения
  let idx = m.start
  const main = (
    <div
      key="main"
      className={s.modMain}
      style={{ '--c': mainCol } as CSSProperties}
      data-l={mainCol === 1 || undefined}
      data-r={mainCol === n + 1 || undefined}
    >
      <Story p={m.lead} lead i={idx++} />
      {m.pair.length > 0 && (
        <div className={s.modPair} data-count={m.pair.length}>
          {m.pair.map(p => <Story key={p.id} p={p} lead={false} i={idx++} />)}
        </div>
      )}
    </div>
  )
  const sides = m.sides.map((col, k) => (
    <div
      key={k}
      className={s.modSide}
      style={{ '--c': sideCol(k) } as CSSProperties}
      data-l={sideCol(k) === 1 || undefined}
      data-r={sideCol(k) === n + 1 || undefined}
      data-tl={k === 0 || undefined}
      data-tr={k === n - 1 || undefined}
    >
      {col.map(p => <Story key={p.id} p={p} lead={false} i={idx++} />)}
    </div>
  ))
  return (
    <div className={s.module} data-side={n} data-rev={m.rev || undefined} style={{ '--gtc': gtc } as CSSProperties}>
      {m.rev ? [...sides, main] : [main, ...sides]}
    </div>
  )
}

export default function Newspaper() {
  const [activeTag, setActiveTag] = useState(ALL_TAG)
  const [today] = useState(() => {
    const d = new Intl.DateTimeFormat('ru-RU', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    }).format(new Date())
    return d.charAt(0).toUpperCase() + d.slice(1)
  })
  const year = new Date().getFullYear()

  const featured = projects.find(p => p.featured)
  const regular = useMemo(() => projects.filter(p => !p.featured), [])
  const filtered = activeTag === ALL_TAG ? regular : regular.filter(p => p.tags.includes(activeTag))
  const showFeatured = !!featured && (activeTag === ALL_TAG || featured.tags.includes(activeTag))
  const modules = layoutIssue(filtered)
  const total = filtered.length + (showFeatured ? 1 : 0)

  const counts = useMemo(() => {
    const m = new Map<string, number>()
    for (const tag of allTags) {
      m.set(tag, tag === ALL_TAG ? projects.length : projects.filter(p => p.tags.includes(tag)).length)
    }
    return m
  }, [])

  const n = projects.length
  const fontVars = cx(display.variable, displayItalic.variable, text.variable, grot.variable)

  return (
    <div className={cx(s.root, fontVars)}>
      <div className={s.page}>
        {/* ── Шапка ── */}
        <header className={s.mast}>
          <div className={s.mastRow}>
            <p className={cx(s.ear, s.earLeft)}>
              <span className={s.earHead}>Подписка открыта</span>
              <span className={s.earText}>{person.status}</span>
            </p>
            <p className={s.title}>
              <span>Вестник</span> <span>автоматизации</span>
            </p>
            <p className={cx(s.ear, s.earRight)}>
              <span className={s.earHead}>В номере</span>
              <span className={s.earText}>{n} {plural(n, 'материал', 'материала', 'материалов')}</span>
            </p>
          </div>
          <p className={s.dateline}>
            <span className={s.dlNum}>№&nbsp;{n}</span>
            <span className={s.dlDate}>{today}</span>
            <span className={s.dlCity}>Москва</span>
            <span className={s.dlMotto}>Ежедневная газета Андрея Юнева</span>
          </p>
          <nav className={s.sections} aria-label="Разделы номера">
            <ul>
              <li><a href="#front"><span>Передовица</span><small>с. 1</small></a></li>
              <li><a href="#projects"><span>Материалы номера</span><small>с. 2</small></a></li>
              <li><a href="#about"><span>Портрет</span><small>с. 3</small></a></li>
              <li><a href="#contact"><span>Объявления</span><small>с. 4</small></a></li>
            </ul>
          </nav>
        </header>

        <main>
          {/* ── Передовица ── */}
          <section id="front" className={s.front} aria-labelledby="nw-h1">
            <div className={s.frontHead}>
              <p className={s.kicker}>Передовая статья</p>
              <h1 id="nw-h1" className={s.h1}>
                {tt(`${person.role} ${person.name} сокращает время типовых задач в 5–20 раз`, true)}
              </h1>
            </div>

            <figure className={s.photo}>
              <div className={s.halftone}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={person.photo} alt={`${person.name}, портрет`} width={574} height={710} />
              </div>
              <figcaption>
                <b>{person.name}</b>, {tt(person.role.charAt(0).toLowerCase() + person.role.slice(1), true)}. {person.status}.
              </figcaption>
            </figure>

            <p className={cx(s.body, s.lead)}>{t(person.bio)}</p>

            <p className={s.ctas}>
              <a href="#projects" className={s.cta}>Смотреть проекты</a>
              <a href={contact.telegram} target="_blank" rel="noopener noreferrer" className={cx(s.cta, s.ctaAlt)}>
                Telegram <Out />
                <span className={s.sr}> (откроется в новой вкладке)</span>
              </a>
            </p>

            <div className={s.frontCols}>
              <section className={cx(s.col, s.figures)} aria-labelledby="nw-figures">
                <h2 id="nw-figures" className={s.boxTitle}>Цифры номера</h2>
                <dl>
                  {stats.map(st => (
                    <div key={st.label}>
                      <dt>{st.label}</dt>
                      <dd>{st.value}{st.suffix && <span className={s.suffix}>{st.suffix}</span>}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section className={cx(s.col, s.rubrics)} aria-labelledby="nw-rubrics">
                <h2 id="nw-rubrics" className={s.boxTitle}>Постоянные рубрики</h2>
                <ul>
                  {capabilities.map(c => <li key={c}>{c}</li>)}
                </ul>
              </section>

              <aside className={cx(s.col, s.remark)} aria-label="От редакции">
                <p className={s.remarkHead}>От редакции</p>
                <p className={s.remarkTitle}>{t(person.noCode)}</p>
                <p className={s.remarkMore}>
                  <a href="#contact" className={s.link}>Подробнее — в объявлениях, с. 4</a>
                </p>
              </aside>
            </div>
          </section>

          {/* ── Материалы номера ── */}
          <section id="projects" className={s.issue} aria-labelledby="nw-projects">
            <div className={s.band}>
              <h2 id="nw-projects" className={s.bandTitle}>Материалы номера</h2>
              <p className={s.bandNote}>
                <span>
                  {total} {plural(total, 'материал', 'материала', 'материалов')}
                  {activeTag !== ALL_TAG && <> в разделе «{activeTag}»</>}
                </span>
                <span className={s.folio}>Полоса 2</span>
              </p>
            </div>

            <div className={s.index} role="group" aria-label="Разделы номера: фильтр материалов">
              <span className={s.indexLabel} aria-hidden>В номере:</span>
              <ul className={s.indexList}>
                {allTags.map(tag => (
                  <li key={tag}>
                    <button
                      type="button"
                      className={s.indexBtn}
                      aria-pressed={tag === activeTag}
                      onClick={e => {
                        setActiveTag(tag)
                        // На телефоне указатель прокручивается внутри себя — держим выбранный раздел в поле зрения
                        const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
                        e.currentTarget.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: still ? 'auto' : 'smooth' })
                      }}
                    >
                      <span className={s.indexTxt}>{tag}<sup>{counts.get(tag)}</sup></span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div key={activeTag} className={s.issueBody}>
              {showFeatured && featured && <Featured p={featured} />}

              {filtered.length > 0 && (
                <div className={s.modules}>
                  {modules.map(m => <IssueModule key={m.lead.id} m={m} />)}
                </div>
              )}

              {total === 0 && (
                <div className={s.empty} role="status">
                  <p>По тегу «{activeTag}» материалов пока нет.</p>
                  <button type="button" className={s.indexBtn} onClick={() => setActiveTag(ALL_TAG)}>
                    <span className={s.indexTxt}>Показать все материалы</span>
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* ── Портрет ── */}
          <section id="about" className={s.portrait} aria-labelledby="nw-about">
            <div className={s.band}>
              <p className={s.bandTitle} aria-hidden>Портрет</p>
              <p className={s.bandNote}><span className={s.folio}>Полоса 3</span></p>
            </div>
            <div className={s.portraitGrid}>
              <div className={s.interview}>
                <p className={s.kicker}>Интервью номера</p>
                <h2 id="nw-about" className={s.portraitTitle}>
                  {aboutTitle.lead} {aboutTitle.accent}
                </h2>
                <div className={s.textCols}>
                  {aboutParagraphs.map((para, i) => (
                    <p key={i} className={cx(s.body, i === 0 && s.dropcap)}>{t(para, true)}</p>
                  ))}
                </div>
                <aside className={s.notice} aria-label="Официальное извещение">
                  <p className={s.noticeHead}>Официальное извещение</p>
                  <p className={s.noticeKind}>{certificate.kind}</p>
                  <p className={s.noticeTitle}>{certificate.title}</p>
                  <p className={s.noticeDetails}>{certificate.details}</p>
                </aside>
              </div>

              <section className={s.chronicle} aria-labelledby="nw-chronicle">
                <h3 id="nw-chronicle" className={s.boxTitle}>Хроника</h3>
                <ol>
                  {timeline.map(item => (
                    <li key={item.year}>
                      <time dateTime={item.year}>{item.year}</time>
                      <p>{t(item.text)}</p>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          </section>

          {/* ── Объявления ── */}
          <section id="contact" className={s.classifieds} aria-labelledby="nw-contact">
            <div className={s.band}>
              <h2 id="nw-contact" className={s.bandTitle}>Объявления</h2>
              <p className={s.bandNote}><span className={s.folio}>Полоса 4</span></p>
            </div>

            <div className={s.ads}>
              <div className={cx(s.ad, s.adMain)}>
                <p className={s.adHead}>{contact.ctaLead} {contact.ctaAccent}</p>
                <p className={s.adText}>
                  Принимаю задачи на автоматизацию. Пишите:{' '}
                  <a href={contact.mailto} className={s.adMail}>{contact.email}</a>
                </p>
              </div>

              <div className={cx(s.ad, s.adList)}>
                <p className={s.adKind}>Связь</p>
                <ul>
                  {contact.socials.map(so => (
                    <li key={so.label}>
                      <span className={s.adWho}>
                        <span className={s.adName}>{so.label}.</span>{' '}
                        <span className={s.adAddr}>{handle(so.href)}</span>
                      </span>
                      <a href={so.href} target="_blank" rel="noopener noreferrer" className={s.adLink}>
                        Написать<span className={s.sr}> в {so.label}</span> <Out />
                        <span className={s.sr}> (откроется в новой вкладке)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={cx(s.ad, s.adNote)}>
                <p className={s.adKind}>Ремарка</p>
                <p className={s.adNoteHead}>{t(person.noCode)}</p>
                <p className={s.adText}>{t(person.noCodeLong)}</p>
              </div>
            </div>
          </section>
        </main>

        <footer className={s.colophon}>
          <p className={s.colophonTitle}>Вестник автоматизации · №&nbsp;{n}</p>
          <p>Учредитель и главный редактор — {person.name}. Москва.</p>
          <p>© {year} {person.name} · {contact.credits}</p>
        </footer>
      </div>
    </div>
  )
}
