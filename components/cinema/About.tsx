'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { aboutShots, person, timeline } from './data'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = root.current!
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.cn-about__photo', { yPercent: 8 }, { yPercent: -8, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 } })
      gsap.utils.toArray<HTMLElement>('.cn-about__shot').forEach((s, i) => {
        gsap.fromTo(s, { y: 60 + i * 30, rotateZ: i % 2 ? 2 : -2 }, { y: -40 - i * 20, rotateZ: i % 2 ? -1 : 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 } })
      })
      gsap.utils.toArray<HTMLElement>('.cn-about__p, .cn-tl__row').forEach(p => {
        gsap.fromTo(p, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: p, start: 'top 88%', once: true } })
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="about" className="cn-about">
      <div className="cn-about__grid">
        <div className="cn-about__media">
          <figure className="cn-about__photo">
            <img src={person.photo} alt="Андрей Юнев" width={574} height={710} loading="lazy" />
          </figure>
          <div className="cn-about__shots" aria-hidden>
            {aboutShots.map(s => (
              <figure className="cn-about__shot" key={s.src}><img src={s.src} alt="" loading="lazy" width={512} height={512} /></figure>
            ))}
          </div>
        </div>

        <div className="cn-about__text">
          <p className="cn-mani__label">Обо мне</p>
          <h2 className="cn-h2">Строю системы,<br />которые работают сами</h2>
          <p className="cn-about__p">Семнадцать лет в операционном управлении: недвижимость, клуб робототехники на 150 учеников в месяц, образовательный проект с аудиторией 20 000 человек. Всё это время я делал одно и то же — убирал ручные операции и заменял их процессом, который воспроизводится без меня.</p>
          <p className="cn-about__p">С 2025 года тем же занимаются агенты. Я не пишу код руками: описываю задачу, проверяю результат и настаиваю на цифрах. Так появились автономный агент на сервере, закрытый мессенджер, конвейер монтажа эфиров и конспекты, где каждая цитата сверена со страницей.</p>
          <p className="cn-about__p">Работаю с задачами, где процесс повторяется, а люди устали его повторять.</p>

          <dl className="cn-tl">
            {timeline.map(t => (
              <div className="cn-tl__row" key={t.year}>
                <dt>{t.year}</dt>
                <dd>{t.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
