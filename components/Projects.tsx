'use client'

import { useState } from 'react'
import { projects, allTags, ALL_TAG } from '@/data/projects'
import ProjectCard from './ProjectCard'
import ProjectFeatured from './ProjectFeatured'

export default function Projects() {
  const [activeTag, setActiveTag] = useState(ALL_TAG)

  const featured = projects.find(p => p.featured)
  const regular = projects.filter(p => !p.featured)
  const filteredRegular = activeTag === ALL_TAG ? regular : regular.filter(p => p.tags.includes(activeTag))
  const showFeatured = activeTag === ALL_TAG || (featured?.tags.includes(activeTag) ?? false)

  return (
    <section id="projects" style={{
      background: 'var(--color-bg)',
      paddingTop: 'clamp(64px, 8vw, 100px)',
      paddingBottom: 'clamp(64px, 8vw, 100px)',
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
          <div style={{
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
      </div>
    </section>
  )
}
