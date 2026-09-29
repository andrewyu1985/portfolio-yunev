'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { IMG, person } from './data'

gsap.registerPlugin(ScrollTrigger)

function CopyEmail() {
  const [done, setDone] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(person.email); setDone(true); setTimeout(() => setDone(false), 2200) } catch { /* буфер недоступен — есть mailto рядом */ }
  }
  return (
    <p className="cn-foot__mail">
      <a href={`mailto:${person.email}`}>{person.email}</a>
      <button type="button" onClick={copy} className="cn-foot__copy" aria-live="polite">{done ? 'Скопировано' : 'Скопировать'}</button>
    </p>
  )
}

export default function Footer() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = root.current!
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.cn-foot__img', { scale: 1.15, yPercent: -10 }, { scale: 1, yPercent: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom bottom', scrub: 0.6 } })
      gsap.fromTo('.cn-foot__big span', { yPercent: 100 }, { yPercent: 0, duration: 1.2, ease: 'expo.out', stagger: 0.12, scrollTrigger: { trigger: '.cn-foot__big', start: 'top 85%', once: true } })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <footer ref={root} id="contact" className="cn-foot">
      <div className="cn-foot__cta">
        <div className="cn-foot__imgwrap" aria-hidden>
          <img className="cn-foot__img" src={`${IMG}/cta.jpg`} alt="" loading="lazy" width={1376} height={768} />
        </div>
        <div className="cn-foot__ctatext">
          <p className="cn-mani__label">Есть задача?</p>
          <h2 className="cn-h2">Опишите процесс, который надоело делать руками</h2>
          <CopyEmail />
          <div className="cn-foot__soc">
            <a href={person.telegram} target="_blank" rel="noopener noreferrer">Telegram</a>
            <a href={person.vk} target="_blank" rel="noopener noreferrer">VK</a>
            <a href={person.max} target="_blank" rel="noopener noreferrer">MAX</a>
          </div>
        </div>
      </div>

      <p className="cn-foot__big" aria-label="Хаос делают руками. Порядок делает система.">
        <span aria-hidden>Хаос делают руками.</span>
        <span aria-hidden>Порядок делает система.</span>
      </p>

      <div className="cn-foot__bar">
        <span>© 2026 Андрей Юнев</span>
        <a href="/">Классическая версия сайта</a>
        <a href="#top">Наверх</a>
      </div>
    </footer>
  )
}
