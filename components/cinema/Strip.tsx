'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { galleryStrip } from './data'

gsap.registerPlugin(ScrollTrigger)

// Полоса из шести кадров: каждый едет со своей скоростью, будто снят с разных полок.
export default function Strip() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = root.current!
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.cn-strip__item').forEach(item => {
        const speed = Number(item.dataset.speed || 0)
        gsap.fromTo(item, { yPercent: -speed, rotateZ: speed / 12 }, {
          yPercent: speed, rotateZ: -speed / 12, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.5 },
        })
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="cn-strip" aria-label="Кадры">
      <div className="cn-strip__row">
        {galleryStrip.map(g => (
          <figure className="cn-strip__item" data-speed={g.speed} key={g.src}>
            <img src={g.src} alt={g.alt} loading="lazy" width={1024} height={1024} />
          </figure>
        ))}
      </div>
    </section>
  )
}
