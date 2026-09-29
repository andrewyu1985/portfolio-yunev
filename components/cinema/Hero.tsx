'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { IMG, person } from './data'

gsap.registerPlugin(ScrollTrigger)

const TITLE = ['Андрей', 'Юнев']

// Титульный кадр: диорама — широкий кадр сверху, имя и подпись — на чистом фоне под ним.
// Кадр наезжает на прокрутке и чуть наклоняется за мышью; имя выходит по буквам.
export default function Hero() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = root.current!
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set('.cn-hero__ch, .cn-hero__sub, .cn-hero__meta, .cn-hero__scroll', { opacity: 1, y: 0, rotateX: 0 })
        return
      }
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.fromTo('.cn-hero__img', { scale: 1.12, filter: 'blur(14px)' }, { scale: 1, filter: 'blur(0px)', duration: 2.2 }, 0)
        .fromTo('.cn-hero__ch', { yPercent: 110, rotateX: -60, opacity: 0 }, { yPercent: 0, rotateX: 0, opacity: 1, duration: 1.3, stagger: 0.045 }, 0.35)
        .fromTo('.cn-hero__sub', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1 }, 1.0)
        .fromTo('.cn-hero__meta > *', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.08 }, 1.2)
        .fromTo('.cn-hero__scroll', { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.8)

      // На прокрутке кадр наезжает и гаснет в фон, титры остаются читаемыми
      gsap.timeline({ scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: 0.6 } })
        .to('.cn-hero__img', { scale: 1.2, yPercent: 14, ease: 'none' }, 0)
        .to('.cn-hero__veil', { opacity: 0.85, ease: 'none' }, 0)
        .to('.cn-hero__title', { yPercent: -12, ease: 'none' }, 0)

      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const qx = gsap.quickTo('.cn-hero__stage', 'rotateY', { duration: 0.9, ease: 'power3' })
        const qy = gsap.quickTo('.cn-hero__stage', 'rotateX', { duration: 0.9, ease: 'power3' })
        const move = (e: MouseEvent) => {
          qx((e.clientX / window.innerWidth - 0.5) * 4)
          qy(-(e.clientY / window.innerHeight - 0.5) * 3)
        }
        window.addEventListener('mousemove', move)
        return () => window.removeEventListener('mousemove', move)
      }
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="cn-hero" aria-label="Титульный кадр">
      <div className="cn-hero__frame">
        <div className="cn-hero__stage">
          <img className="cn-hero__img" src={`${IMG}/hero.jpg`} alt="Бумажная диорама: город из белых кубов, связанных латунной проволокой, и один синий павильон" fetchPriority="high" />
          <div className="cn-hero__veil" aria-hidden />
        </div>
        <div className="cn-hero__grain" aria-hidden />
      </div>

      <a href="#manifesto" className="cn-hero__scroll" aria-label="Листать вниз">
        <span className="cn-hero__scroll-line" aria-hidden />
        Листайте
      </a>

      <div className="cn-hero__body">
        <h1 className="cn-hero__title" aria-label={person.name}>
          {TITLE.map((word, wi) => (
            <span className="cn-hero__word" key={word} aria-hidden>
              {Array.from(word).map((ch, i) => (
                <span className="cn-hero__ch" key={`${wi}-${i}`}>{ch}</span>
              ))}
            </span>
          ))}
        </h1>
        <p className="cn-hero__sub">
          {person.role}. Убираю ручные операции и собираю системы, которые работают без меня.
        </p>
        <div className="cn-hero__meta">
          <span>17 лет в управлении</span>
          <span>32 проекта</span>
          <span>Без единой строки кода руками</span>
        </div>
      </div>
    </section>
  )
}
