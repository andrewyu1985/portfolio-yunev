'use client'

import { useState, useRef, useEffect } from 'react'
import { projects, allTags, ALL_TAG } from '@/data/projects'
import ProjectCard from './ProjectCard'
import ProjectFeatured from './ProjectFeatured'

export default function Projects() {
  const [activeTag, setActiveTag] = useState(ALL_TAG)
  const [showHint, setShowHint] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const endRef = useRef<HTMLDivElement>(null)

  const featured = projects.find(p => p.featured)
  const regular = projects.filter(p => !p.featured)
  const filteredRegular = activeTag === ALL_TAG ? regular : regular.filter(p => p.tags.includes(activeTag))
  const showFeatured = activeTag === ALL_TAG || (featured?.tags.includes(activeTag) ?? false)

  // Подсказка прокрутки: появляется только когда пользователь долистал до первого ряда
  // обычных карточек, и исчезает, когда достигнут конец списка
  useEffect(() => {
    const grid = gridRef.current
    const end = endRef.current
    if (!grid || !end) return
    let started = false
    let atEnd = true
    const update = () => setShowHint(started && !atEnd)
    // started=true, когда первый ряд грида заметно вошёл в кадр (на ~180px выше низа экрана)
    const o1 = new IntersectionObserver(([e]) => { started = e.isIntersecting; update() }, { rootMargin: '0px 0px -180px 0px', threshold: 0 })
    const o2 = new IntersectionObserver(([e]) => { atEnd = e.isIntersecting; update() }, { rootMargin: '0px 0px -120px 0px' })
    o1.observe(grid)
    o2.observe(end)
    return () => { o1.disconnect(); o2.disconnect() }
  }, [filteredRegular.length])

  return (
    <section ref={sectionRef} id="projects" style={{
      background: 'var(--color-bg)',
      paddingTop: 'clamp(64px, 8vw, 100px)',
      paddingBottom: 'clamp(64px, 8vw, 100px)',
      position: 'relative',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div className="reveal" style={{ marginBottom: 48 }}>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--color-accent)', margin: '0 0 12px',
          }}>01 — Проекты</p>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'var(--text-h1)', lineHeight: 1.1,
            letterSpacing: '-0.025em', color: 'var(--color-text)', margin: 0,
          }}>
            AI-системы и<br />инструменты автоматизации
          </h2>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.82rem',
            color: 'var(--color-text3)', margin: '16px 0 0',
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{
              fontWeight: 700, color: 'var(--color-accent)',
              background: 'var(--color-accent-bg)',
              border: '1px solid var(--color-border-accent)',
              borderRadius: 100, padding: '2px 10px',
            }}>{projects.length} проектов</span>
            листайте, чтобы увидеть все
          </p>
        </div>

        {/* Filter */}
        <div className="reveal" style={{
          display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40,
        }} role="group" aria-label="Фильтр">
          {allTags.map(tag => {
            const isActive = tag === activeTag
            return (
              <button key={tag} onClick={() => setActiveTag(tag)}
                aria-pressed={isActive}
                style={{
                  fontFamily: 'var(--font-body)', fontWeight: 600,
                  fontSize: '0.75rem', letterSpacing: 'var(--ls-upper)',
                  textTransform: 'uppercase', padding: '7px 16px', borderRadius: 100,
                  border: `1.5px solid ${isActive ? 'var(--color-accent)' : 'var(--color-border)'}`,
                  background: isActive ? 'var(--color-accent)' : 'transparent',
                  color: isActive ? 'var(--color-bg2)' : 'var(--color-text3)',
                  cursor: 'pointer', transition: 'all 0.18s ease', minHeight: 36,
                }}>
                {tag}
              </button>
            )
          })}
        </div>

        {/* Featured */}
        {featured && showFeatured && (
          <div className="reveal" style={{ marginBottom: 28 }}>
            <ProjectFeatured project={featured} />
          </div>
        )}

        {/* Grid */}
        {filteredRegular.length > 0 ? (
          <div ref={gridRef} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 20,
          }}>
            {filteredRegular.map((project, i) => (
              <div key={project.id} className="reveal" style={{ transitionDelay: `${i * 40}ms` }}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center', padding: '64px 24px',
            color: 'var(--color-text3)', fontFamily: 'var(--font-body)',
          }}>
            <p style={{ fontSize: 'var(--text-body)', marginBottom: 16 }}>
              По тегу «{activeTag}» проектов пока нет.
            </p>
            <button onClick={() => setActiveTag(ALL_TAG)}
              className="arrow-btn"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              <span>←</span> Показать все
            </button>
          </div>
        )}

        {/* Маркер конца списка для подсказки прокрутки */}
        <div ref={endRef} aria-hidden style={{ height: 1 }} />
      </div>

      {/* Плавающая подсказка «листайте вниз» */}
      <button
        onClick={() => window.scrollBy({ top: Math.round(window.innerHeight * 0.72), behavior: 'smooth' })}
        aria-label="Прокрутить к следующим проектам"
        className="scroll-hint"
        style={{
          position: 'fixed', left: '50%', bottom: 22, zIndex: 60,
          transform: `translateX(-50%) translateY(${showHint ? '0' : '10px'})`,
          opacity: showHint ? 0.72 : 0,
          pointerEvents: showHint ? 'auto' : 'none',
          display: 'inline-flex', alignItems: 'center', gap: 7,
          fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 500,
          letterSpacing: '0.02em',
          color: 'var(--color-text3)',
          background: 'oklch(1 0 0 / 0.72)',
          border: '1px solid var(--color-border)',
          borderRadius: 100, padding: '7px 14px', cursor: 'pointer',
          boxShadow: '0 4px 14px oklch(0.20 0.03 265 / 0.08)',
          backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
          transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <span>ещё проекты</span>
        <span className="sh-arrow" aria-hidden style={{ fontSize: '0.9rem', lineHeight: 1, color: 'var(--color-accent)' }}>↓</span>
      </button>

      <style>{`
        .scroll-hint:hover { opacity: 1 !important; color: var(--color-text2) !important; border-color: var(--color-border-accent) !important; }
        .sh-arrow { animation: sh-bounce 1.9s ease-in-out infinite; }
        @keyframes sh-bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(3px); } }
        @media (prefers-reduced-motion: reduce) { .sh-arrow { animation: none; } }
      `}</style>
    </section>
  )
}
