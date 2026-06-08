'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const CAPS = [
  'AI-оркестрация', 'Multi-agent системы', 'Автоматизация',
  'Telegram-боты', 'MCP-интеграции', 'Контент-пайплайны', 'API-оркестрация',
]

function CountUp({ to, suffix = '', started }: { to: number; suffix?: string; started: boolean }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!started) return
    const dur = 1400
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.floor(eased * to))
      if (p < 1) requestAnimationFrame(tick)
      else setVal(to)
    }
    requestAnimationFrame(tick)
  }, [to, started])
  return <>{val}{suffix}</>
}

export default function Hero() {
  const statsRef = useRef<HTMLDivElement>(null)
  const [statsStarted, setStatsStarted] = useState(false)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStatsStarted(true); obs.disconnect() }
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section style={{ background: 'var(--color-bg)', overflow: 'hidden', position: 'relative' }}>

      {/* Animated background blobs */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', width: 700, height: 700, borderRadius: '50%',
          background: 'oklch(0.50 0.26 265 / 0.05)', filter: 'blur(100px)',
          top: -200, right: -150,
          animation: 'blob1 14s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', width: 500, height: 500, borderRadius: '50%',
          background: 'oklch(0.65 0.18 285 / 0.04)', filter: 'blur(80px)',
          bottom: 0, left: '15%',
          animation: 'blob2 18s ease-in-out infinite',
        }} />
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
        <div style={{
          paddingTop: 'clamp(32px, 5vw, 64px)',
          paddingBottom: 'clamp(32px, 5vw, 64px)',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 'clamp(32px, 6vw, 80px)',
          alignItems: 'center',
        }} className="hero-grid">

          <div>

          {/* Status badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'var(--color-accent-bg)',
            border: '1px solid var(--color-border-accent)',
            borderRadius: 100, padding: '6px 16px', marginBottom: 36,
            animation: 'hero-in 0.6s cubic-bezier(0.16,1,0.3,1) both',
          }}>
            <span className="dot-live" style={{ flexShrink: 0 }} />
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
              letterSpacing: '0.09em', textTransform: 'uppercase',
              color: 'var(--color-accent)',
            }}>Открыт к проектам</span>
          </div>

          {/* Name */}
          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 900,
            fontSize: 'var(--text-display)',
            lineHeight: 'var(--lh-display)',
            letterSpacing: 'var(--ls-display)',
            color: 'var(--color-text)', margin: '0 0 20px',
            animation: 'hero-in 0.7s 0.1s cubic-bezier(0.16,1,0.3,1) both',
          }}>
            Андрей<br />
            Юнев<span style={{ color: 'var(--color-accent)' }}>.</span>
          </h1>

          {/* Role */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28,
            animation: 'hero-in 0.7s 0.2s cubic-bezier(0.16,1,0.3,1) both',
          }}>
            <span style={{
              display: 'block', height: 2, width: 36,
              background: 'var(--color-accent)', borderRadius: 2, flexShrink: 0,
            }} />
            <p style={{
              fontFamily: 'var(--font-body)', fontWeight: 600,
              fontSize: 'clamp(1rem, 2.2vw, 1.3rem)',
              letterSpacing: '-0.01em', color: 'var(--color-text2)', margin: 0,
            }}>Архитектор AI-систем</p>
          </div>

          {/* Bio */}
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '1.05rem',
            lineHeight: 1.7, color: 'var(--color-text2)',
            maxWidth: '56ch', margin: '0 0 36px',
            animation: 'hero-in 0.7s 0.3s cubic-bezier(0.16,1,0.3,1) both',
          }}>
            17 лет строю воспроизводимые системы вместо ручных операций.
            Убираю операционный хаос, внедряю AI‑пайплайны,
            сокращаю время типовых задач в&nbsp;5–20 раз.
          </p>

          {/* Capability chips */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 44,
            animation: 'hero-in 0.7s 0.4s cubic-bezier(0.16,1,0.3,1) both',
          }}>
            {CAPS.map((cap, i) => (
              <span key={i} style={{
                fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 500,
                color: 'var(--color-accent)',
                background: 'var(--color-accent-bg)',
                border: '1px solid var(--color-border-accent)',
                borderRadius: 100, padding: '6px 15px',
                transition: 'background 0.18s, color 0.18s, transform 0.18s, box-shadow 0.18s',
                cursor: 'default',
              }}
                onMouseEnter={e => {
                  const el = e.currentTarget
                  el.style.background = 'var(--color-accent)'
                  el.style.color = 'var(--color-text-inv)'
                  el.style.transform = 'translateY(-2px)'
                  el.style.boxShadow = '0 4px 16px oklch(0.50 0.26 265 / 0.22)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget
                  el.style.background = 'var(--color-accent-bg)'
                  el.style.color = 'var(--color-accent)'
                  el.style.transform = 'translateY(0)'
                  el.style.boxShadow = 'none'
                }}
              >{cap}</span>
            ))}
          </div>

          {/* No-code badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'oklch(0.93 0.06 145 / 0.12)',
            border: '1px solid oklch(0.65 0.15 145 / 0.35)',
            borderRadius: 100, padding: '6px 14px', marginBottom: 20,
            animation: 'hero-in 0.7s 0.45s cubic-bezier(0.16,1,0.3,1) both',
          }}>
            <span style={{ fontSize: '0.85rem' }}>🚫</span>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              color: 'oklch(0.38 0.15 145)', fontWeight: 500,
            }}>Реализовано без знания программирования</span>
          </div>

          {/* CTA row */}
          <div style={{
            display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center',
            animation: 'hero-in 0.7s 0.5s cubic-bezier(0.16,1,0.3,1) both',
          }}>
            <a href="#projects" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.95rem',
              color: 'var(--color-text-inv)', background: 'var(--color-accent)',
              padding: '14px 32px', borderRadius: 100, textDecoration: 'none',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              boxShadow: '0 4px 24px oklch(0.50 0.26 265 / 0.28)',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 32px oklch(0.50 0.26 265 / 0.40)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 24px oklch(0.50 0.26 265 / 0.28)'
              }}
            >
              Смотреть проекты <span style={{ fontSize: '1.1em' }}>→</span>
            </a>
            <a href="https://t.me/Andrewyunev" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9rem',
              color: 'var(--color-text2)', border: '1px solid var(--color-border)',
              padding: '13px 28px', borderRadius: 100, textDecoration: 'none',
              transition: 'border-color 0.18s, color 0.18s, background 0.18s',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--color-accent)'
                e.currentTarget.style.color = 'var(--color-accent)'
                e.currentTarget.style.background = 'var(--color-accent-bg)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--color-border)'
                e.currentTarget.style.color = 'var(--color-text2)'
                e.currentTarget.style.background = 'transparent'
              }}
            >Telegram ↗</a>
          </div>

          </div>{/* end left col */}

          {/* Photo */}
          <div className="hero-photo" style={{
            position: 'relative', flexShrink: 0,
            width: 'clamp(200px, 22vw, 300px)',
            height: 'clamp(200px, 22vw, 300px)',
            animation: 'hero-in 0.9s 0.3s cubic-bezier(0.16,1,0.3,1) both',
          }}>
            {/* Decorative ring */}
            <div aria-hidden style={{
              position: 'absolute', inset: -10,
              borderRadius: '50%',
              border: '1px solid var(--color-border-accent)',
              animation: 'float 6s ease-in-out infinite',
            }} />
            <div aria-hidden style={{
              position: 'absolute', inset: -22,
              borderRadius: '50%',
              border: '1px solid oklch(0.50 0.26 265 / 0.10)',
            }} />
            <Image
              src="/photo.jpg"
              alt="Андрей Юнев"
              fill
              sizes="(max-width: 640px) 0px, clamp(200px, 22vw, 300px)"
              style={{ objectFit: 'cover', objectPosition: '50% 25%', borderRadius: '50%' }}
              priority
            />
          </div>

        </div>{/* end hero-grid */}

        {/* Stats — animated count-up */}
        <div ref={statsRef} style={{
          borderTop: '1px solid var(--color-border)',
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        }} className="stats-grid">
          {[
            { to: 18, suffix: '', label: 'проектов\nреализовано' },
            { to: 20, suffix: '×', label: 'ускорение\nтиповых задач' },
            { to: 17, suffix: '+', label: 'лет в\nуправлении' },
          ].map((s, i) => (
            <div key={i} style={{
              padding: 'clamp(20px, 3vw, 32px) 24px',
              borderRight: i < 2 ? '1px solid var(--color-border)' : 'none',
              display: 'flex', flexDirection: 'column', gap: 6,
            }}>
              <span style={{
                fontFamily: 'var(--font-display)', fontWeight: 800,
                fontSize: 'clamp(2rem, 4vw, 2.8rem)', lineHeight: 1,
                letterSpacing: '-0.03em', color: 'var(--color-accent)',
              }}>
                <CountUp to={s.to} suffix={s.suffix} started={statsStarted} />
              </span>
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: '0.8rem',
                lineHeight: 1.4, color: 'var(--color-text3)', whiteSpace: 'pre-line',
              }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-photo { display: none !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr !important; }
          .stats-grid > div { border-right: none !important; border-bottom: 1px solid var(--color-border); }
        }
      `}</style>
    </section>
  )
}
