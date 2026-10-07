'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { archiveShots } from './data'

gsap.registerPlugin(ScrollTrigger)

// Стена из длинных скриншотов страниц проектов, положенная в перспективу.
// Два ряда едут навстречу друг другу, скорость привязана к прокрутке.
export default function Archive() {
  const root = useRef<HTMLElement>(null)
  const rowA = archiveShots.slice(0, 8)
  const rowB = archiveShots.slice(7, 15)

  useEffect(() => {
    const el = root.current!
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.cn-wall__row--a', { xPercent: 0 }, { xPercent: -28, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.8 } })
      gsap.fromTo('.cn-wall__row--b', { xPercent: -28 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.8 } })
      gsap.fromTo('.cn-wall__plane', { rotateX: 32 }, { rotateX: 14, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.8 } })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="cn-wall" aria-label="Архив страниц проектов">
      <div className="cn-wall__head">
        <p className="cn-mani__label">Архив</p>
        <h2 className="cn-h2">У каждого проекта — своя страница</h2>
        <a className="cn-link" href="/cinema/archive">Список всех 28</a>
      </div>
      <div className="cn-wall__view">
        <div className="cn-wall__plane">
          <div className="cn-wall__row cn-wall__row--a">
            {rowA.map(src => <img key={src} src={src} alt="" loading="lazy" width={720} height={2400} />)}
          </div>
          <div className="cn-wall__row cn-wall__row--b">
            {rowB.map(src => <img key={src} src={src} alt="" loading="lazy" width={720} height={2400} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
