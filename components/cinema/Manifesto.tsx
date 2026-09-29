'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TEXT = 'Семнадцать лет я руководил людьми и процессами. Потом появились агенты — и оказалось, что процесс можно не «оптимизировать», а пересобрать целиком: описать, отдать машине и оставить человеку только решения. Тридцать два проекта на этой странице сделаны именно так.'

// Манифест: слова проявляются по мере прокрутки, как титры, которые печатаются.
export default function Manifesto() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = root.current!
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduce) { gsap.set('.cn-mani__w', { opacity: 1 }); return }
      gsap.fromTo('.cn-mani__w', { opacity: 0.14 }, {
        opacity: 1, ease: 'none', stagger: 0.6,
        scrollTrigger: { trigger: el, start: 'top 72%', end: 'bottom 58%', scrub: 0.4 },
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="manifesto" className="cn-mani">
      <p className="cn-mani__label">Кто я</p>
      <p className="cn-mani__text">
        {TEXT.split(' ').map((w, i) => (
          <span className="cn-mani__w" key={i}>{w} </span>
        ))}
      </p>
    </section>
  )
}
