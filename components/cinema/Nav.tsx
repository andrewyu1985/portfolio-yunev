'use client'

import { useEffect, useState } from 'react'
import { person } from './data'

export default function Nav({ archive = false }: { archive?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <header className={`cn-nav${scrolled ? ' is-scrolled' : ''}`}>
      <a href="/cinema" className="cn-nav__mark" aria-label="Андрей Юнев — на главную кино-версии">
        <span className="cn-nav__dot" aria-hidden />
        Андрей Юнев
      </a>
      <nav className="cn-nav__links" aria-label="Разделы">
        {archive ? (
          <a href="/cinema">Главная</a>
        ) : (
          <>
            <a href="#featured">Проекты</a>
            <a href="#about">Обо мне</a>
            <a href="/cinema/archive">Архив</a>
          </>
        )}
      </nav>
      <a href={`mailto:${person.email}`} className="cn-btn cn-btn--blue cn-nav__cta">Написать</a>
    </header>
  )
}
