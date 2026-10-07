'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { featured } from './data'

gsap.registerPlugin(ScrollTrigger)

// 3D-колода избранных проектов. Экран закреплён, прокрутка тянет карточки из глубины:
// каждая выезжает из дальнего плана, останавливается перед камерой и уходит за неё.
// На телефоне и при reduced-motion — обычный вертикальный список с мягким появлением.
export default function Featured() {
  const root = useRef<HTMLElement>(null)
  const N = featured.length

  useEffect(() => {
    const el = root.current!
    const mm = gsap.matchMedia()

    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const cards = gsap.utils.toArray<HTMLElement>('.cn-deck__card')
      const texts = gsap.utils.toArray<HTMLElement>('.cn-deck__text')
      const counter = el.querySelector<HTMLElement>('.cn-deck__now')!

      // Первая карточка уже стоит перед камерой, остальные ждут в глубине.
      gsap.set(cards.slice(1), { z: -2600, opacity: 0, yPercent: 8, xPercent: (i: number) => (i % 2 ? -6 : 6) })
      gsap.set(texts.slice(1), { opacity: 0, y: 30 })

      const steps = N - 1
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el, start: 'top top', end: `+=${steps * 110}%`,
          pin: true, scrub: 0.7, anticipatePin: 1,
          onUpdate: self => {
            const i = Math.min(N - 1, Math.max(0, Math.round(self.progress * steps)))
            counter.textContent = String(i + 1).padStart(2, '0')
          },
        },
      })

      for (let i = 1; i < N; i++) {
        const t = i - 1
        // предыдущая уходит за камеру, текст гаснет
        tl.to(cards[i - 1], { z: 900, opacity: 0, yPercent: -10, duration: 0.55, ease: 'power1.in' }, t)
          .to(texts[i - 1], { opacity: 0, y: -24, duration: 0.3 }, t)
        // следующая подлетает из глубины
        tl.to(cards[i], { z: 0, opacity: 1, yPercent: 0, xPercent: 0, duration: 1, ease: 'power1.out' }, t)
          .to(texts[i], { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, t + 0.55)
      }

      // лёгкий параллакс сцены за мышью
      if (window.matchMedia('(hover: hover)').matches) {
        const qx = gsap.quickTo('.cn-deck__stage', 'rotateY', { duration: 1, ease: 'power3' })
        const qy = gsap.quickTo('.cn-deck__stage', 'rotateX', { duration: 1, ease: 'power3' })
        const move = (e: MouseEvent) => {
          qx((e.clientX / window.innerWidth - 0.5) * 6)
          qy(-(e.clientY / window.innerHeight - 0.5) * 4)
        }
        window.addEventListener('mousemove', move)
        return () => window.removeEventListener('mousemove', move)
      }
    })

    mm.add('(max-width: 899px), (prefers-reduced-motion: reduce)', () => {
      const items = gsap.utils.toArray<HTMLElement>('.cn-deck__item')
      items.forEach(item => {
        gsap.fromTo(item, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.9, ease: 'expo.out',
          scrollTrigger: { trigger: item, start: 'top 85%', once: true },
        })
      })
    })

    return () => mm.revert()
  }, [N])

  return (
    <section ref={root} id="featured" className="cn-deck" aria-label="Избранные проекты">
      <div className="cn-deck__head">
        <p className="cn-mani__label">Избранное</p>
        <p className="cn-deck__counter"><span className="cn-deck__now">01</span><span className="cn-deck__of"> / {String(N).padStart(2, '0')}</span></p>
      </div>

      <div className="cn-deck__stage">
        {featured.map(({ project, img, line, n }) => {
          const href = project.link || project.demoLink
          const label = project.linkLabel || project.demoLabel || 'Открыть'
          return (
            <div className="cn-deck__item" key={project.id}>
              <article className="cn-deck__card">
                <img src={img} alt="" loading="lazy" width={1024} height={768} />
                <span className="cn-deck__n" aria-hidden>{n}</span>
              </article>
              <div className="cn-deck__text">
                <p className="cn-deck__tags">{project.tags.join(' · ')}</p>
                <h3 className="cn-deck__title">{project.title}</h3>
                <p className="cn-deck__line">{line}</p>
                <p className="cn-deck__stack">{project.stack.slice(0, 4).join(', ')}</p>
                {href && (
                  <a className="cn-link" href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                    {label}
                  </a>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <p className="cn-deck__all">
        <a className="cn-link" href="/cinema/archive">Все 28 проектов в архиве</a>
      </p>
    </section>
  )
}
