'use client'

import { useEffect, useState } from 'react'

const links = [
  { label: 'Проекты', href: '#projects' },
  { label: 'Обо мне', href: '#about' },
  { label: 'Связаться', href: '#contact' },
]

export default function Nav() {
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id], footer[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        height: 60,
        background: scrolled ? 'oklch(0.97 0.008 80 / 0.92)' : 'oklch(0.97 0.008 80 / 0.98)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${scrolled ? 'var(--color-border)' : 'transparent'}`,
        transition: 'border-color 0.3s ease, background 0.3s ease',
        fontFamily: 'var(--font-body)',
      }}
    >
      <div style={{
        maxWidth: 1100, margin: '0 auto', padding: '0 24px',
        height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <a href="#" style={{
          fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem',
          color: 'var(--color-accent)', textDecoration: 'none', letterSpacing: '-0.01em',
        }}>АЮ</a>

        {/* Desktop */}
        <div style={{ gap: 36, alignItems: 'center' }} className="hidden sm:flex">
          {links.map((link) => {
            const id = link.href.replace('#', '')
            const isActive = active === id
            return (
              <a key={link.href} href={link.href} style={{
                fontWeight: 500, fontSize: '0.9rem',
                color: isActive ? 'var(--color-text)' : 'var(--color-text3)',
                textDecoration: 'none', position: 'relative', paddingBottom: 2,
                transition: 'color 0.18s ease',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
                onMouseLeave={e => (e.currentTarget.style.color = isActive ? 'var(--color-text)' : 'var(--color-text3)')}
              >
                {link.label}
                <span style={{
                  position: 'absolute', bottom: -2, left: 0, right: 0, height: 1.5,
                  background: 'var(--color-accent)', borderRadius: 2,
                  transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'left', transition: 'transform 0.22s ease',
                }} />
              </a>
            )
          })}
          <a href="#contact" style={{
            fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem',
            color: 'var(--color-bg2)', background: 'var(--color-text)',
            textDecoration: 'none', padding: '8px 18px', borderRadius: 100,
            transition: 'background 0.18s ease',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-accent)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-text)')}
          >Написать</a>
        </div>

        {/* Mobile hamburger */}
        <button className="flex sm:hidden" onClick={() => setMenuOpen(v => !v)} style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: '8px',
          color: 'var(--color-text2)', flexDirection: 'column', gap: 5,
        }} aria-label="Меню">
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', width: 22, height: 1.5, background: 'currentColor',
              transition: 'transform 0.2s, opacity 0.2s',
              transform: menuOpen
                ? i === 0 ? 'translateY(6.5px) rotate(45deg)' : i === 2 ? 'translateY(-6.5px) rotate(-45deg)' : 'none'
                : 'none',
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </div>

      {menuOpen && (
        <div style={{
          position: 'absolute', top: 60, left: 0, right: 0,
          background: 'oklch(0.97 0.008 80 / 0.97)', backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--color-border)',
          padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20,
        }}>
          {links.map(link => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} style={{
              fontWeight: 500, fontSize: '1rem', color: 'var(--color-text2)', textDecoration: 'none',
            }}>{link.label}</a>
          ))}
        </div>
      )}
    </nav>
  )
}
