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
        height: 56,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        background: 'oklch(0.13 0.018 258 / 0.85)',
        borderBottom: '1px solid var(--color-border)',
        fontFamily: 'var(--font-body)',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '0 24px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1.125rem',
            color: 'var(--color-accent)',
            textDecoration: 'none',
            letterSpacing: '-0.01em',
          }}
        >
          АЮ
        </a>

        {/* Desktop links */}
        <div
          style={{ gap: 32, alignItems: 'center' }}
          className="hidden sm:flex"
        >
          {links.map((link) => {
            const sectionId = link.href.replace('#', '')
            const isActive = active === sectionId
            return (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontWeight: 500,
                  fontSize: 'var(--text-sm)',
                  color: isActive ? 'var(--color-text)' : 'var(--color-text2)',
                  textDecoration: 'none',
                  position: 'relative',
                  paddingBottom: 2,
                  transition: 'color 0.18s ease',
                }}
              >
                {link.label}
                <span
                  style={{
                    position: 'absolute',
                    bottom: -2,
                    left: 0,
                    right: 0,
                    height: 1,
                    background: 'var(--color-accent)',
                    transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.2s ease',
                  }}
                />
              </a>
            )
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex sm:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            color: 'var(--color-text2)',
            flexDirection: 'column',
            gap: 5,
          }}
          aria-label="Открыть меню"
        >
          <span style={{ display: 'block', width: 22, height: 1.5, background: 'currentColor', transition: 'transform 0.2s', transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
          <span style={{ display: 'block', width: 22, height: 1.5, background: 'currentColor', opacity: menuOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
          <span style={{ display: 'block', width: 22, height: 1.5, background: 'currentColor', transition: 'transform 0.2s', transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: 'absolute',
            top: 56,
            left: 0,
            right: 0,
            background: 'oklch(0.13 0.018 258 / 0.97)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid var(--color-border)',
            padding: '16px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontWeight: 500,
                fontSize: '1rem',
                color: 'var(--color-text2)',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
