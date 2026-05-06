'use client'

import { useState, useEffect } from 'react'

const links = [
  { href: '#projects', label: 'Проекты' },
  { href: '#about',    label: 'Обо мне' },
  { href: '#contact',  label: 'Связаться' },
]

export default function Nav() {
  const [scrolled, setScrolled]   = useState(false)
  const [progress, setProgress]   = useState(0)
  const [active, setActive]       = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) setActive('#' + e.target.id) }) },
      { threshold: 0.35 }
    )
    ;['projects', 'about', 'contact'].forEach(id => {
      const el = document.getElementById(id); if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <>
      {/* Scroll progress */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 2,
        background: 'var(--color-bg3)', zIndex: 200,
      }}>
        <div style={{
          height: '100%', background: 'var(--color-accent)',
          width: `${progress}%`, transition: 'width 0.1s linear',
        }} />
      </div>

      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'oklch(1.00 0.000 0 / 0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        transition: 'border-color 0.25s ease',
        marginTop: 2,
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 64,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <a href="/" style={{
            fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1rem',
            letterSpacing: '-0.02em', color: 'var(--color-accent)', textDecoration: 'none',
          }}>АЮ</a>

          <div style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="nav-links">
            {links.map(({ href, label }) => (
              <a key={href} href={href} style={{
                fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 500,
                color: active === href ? 'var(--color-text)' : 'var(--color-text3)',
                textDecoration: 'none', transition: 'color 0.18s',
                borderBottom: active === href ? '1.5px solid var(--color-accent)' : '1.5px solid transparent',
                paddingBottom: 2,
              }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
                onMouseLeave={e => (e.currentTarget.style.color = active === href ? 'var(--color-text)' : 'var(--color-text3)')}
              >{label}</a>
            ))}
          </div>

          <a href="mailto:andrewyunev@gmail.com" style={{
            fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.85rem',
            color: 'var(--color-text-inv)', background: 'var(--color-accent)',
            padding: '9px 22px', borderRadius: 100, textDecoration: 'none',
            transition: 'opacity 0.18s, transform 0.18s',
          }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
          >Написать</a>
        </div>
        <style>{`@media (max-width: 640px) { .nav-links { display: none !important; } }`}</style>
      </nav>
    </>
  )
}
