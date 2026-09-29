'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { facts } from './data'

gsap.registerPlugin(ScrollTrigger)

// Три колонки цифр едут с разной скоростью — тот же приём, что у отзывов в референсе,
// только вместо отзывов — проверенные цифры из проектов.
export default function Facts() {
  const root = useRef<HTMLElement>(null)
  const cols = [facts.slice(0, 3), facts.slice(3, 6), facts.slice(6, 9)]

  useEffect(() => {
    const el = root.current!
    const mm = gsap.matchMedia()
    mm.add('(min-width: 760px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray<HTMLElement>('.cn-facts__col').forEach((col, i) => {
        const d = [-90, 60, -140][i]
        gsap.fromTo(col, { y: -d }, { y: d, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 } })
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={root} className="cn-facts" aria-label="Цифры">
      <div className="cn-facts__head">
        <p className="cn-mani__label">В цифрах</p>
        <h2 className="cn-h2">Результат считается,<br />а не описывается</h2>
      </div>
      <div className="cn-facts__cols">
        {cols.map((col, i) => (
          <div className="cn-facts__col" key={i}>
            {col.map(f => (
              <div className="cn-fact" key={f.label}>
                <p className="cn-fact__v">{f.value}</p>
                <p className="cn-fact__l">{f.label}</p>
                <p className="cn-fact__n">{f.note}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
