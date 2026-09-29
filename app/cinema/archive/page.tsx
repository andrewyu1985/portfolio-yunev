import type { Metadata } from 'next'
import Nav from '@/components/cinema/Nav'
import DesignBar from '@/components/cinema/DesignBar'
import Smooth from '@/components/cinema/Smooth'
import { allProjects, person } from '@/components/cinema/data'

export const metadata: Metadata = {
  title: 'Архив — все 32 проекта · Андрей Юнев',
  description: 'Полный список проектов: AI-агенты, исследования, продукты школы, видео, книги, инфраструктура.',
}

const STATUS = { live: 'работает', wip: 'в работе', concept: 'идея' } as const

export default function CinemaArchive() {
  return (
    <>
      <Smooth />
      <DesignBar />
      <Nav archive />
      <main id="top" className="cn-arch">
        <header className="cn-arch__head">
          <p className="cn-mani__label">Архив</p>
          <h1 className="cn-h2">Все {allProjects.length} проекта</h1>
          <p className="cn-arch__lead">По порядку тем: агенты и автоматизация, исследования, продукты школы, видео, изображения и книги, инфраструктура.</p>
        </header>

        <ol className="cn-arch__list">
          {allProjects.map((p, i) => {
            const href = p.link || p.demoLink
            const ext = href?.startsWith('http')
            return (
              <li className="cn-arch__row" key={p.id}>
                <span className="cn-arch__n">{String(i + 1).padStart(2, '0')}</span>
                <div className="cn-arch__main">
                  <h2 className="cn-arch__title">
                    {href ? <a href={href} target={ext ? '_blank' : undefined} rel={ext ? 'noopener noreferrer' : undefined}>{p.title}</a> : p.title}
                  </h2>
                  <p className="cn-arch__desc">{p.description}</p>
                </div>
                <div className="cn-arch__side">
                  <p className="cn-arch__tags">{p.tags.join(' · ')}</p>
                  <p className="cn-arch__stack">{p.stack.slice(0, 4).join(', ')}</p>
                  <p className={`cn-arch__status is-${p.status}`}>{STATUS[p.status]}</p>
                </div>
              </li>
            )
          })}
        </ol>

        <footer className="cn-foot__bar cn-arch__bar">
          <span>© 2026 Андрей Юнев</span>
          <a href={`mailto:${person.email}`}>{person.email}</a>
          <a href="/cinema">К титульному кадру</a>
        </footer>
      </main>
    </>
  )
}
