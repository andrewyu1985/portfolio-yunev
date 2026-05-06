'use client'

import { Project } from '@/types/project'

const statusConfig = {
  live:    { label: 'live',     bg: 'oklch(0.93 0.06 145)', color: 'oklch(0.38 0.13 145)' },
  wip:     { label: 'в работе', bg: 'oklch(0.95 0.06 80)',  color: 'var(--color-accent)' },
  concept: { label: 'идея',     bg: 'var(--color-bg3)',     color: 'var(--color-text3)' },
}

export default function ProjectCard({ project }: { project: Project }) {
  const st = statusConfig[project.status]

  return (
    <article style={{
      background: 'var(--color-bg2)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)',
      padding: 24,
      display: 'flex', flexDirection: 'column', gap: 16,
      boxShadow: 'var(--shadow-card)',
      transition: 'transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease',
      cursor: 'default',
    }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.transform = 'translateY(-4px)'
        el.style.boxShadow = 'var(--shadow-lg)'
        el.style.borderColor = 'var(--color-border-accent)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = 'var(--shadow-card)'
        el.style.borderColor = 'var(--color-border)'
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: 'var(--color-bg3)',
            border: '1px solid var(--color-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.2rem', flexShrink: 0,
          }}>
            {project.icon}
          </div>
          <h3 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            lineHeight: 1.2, letterSpacing: '-0.02em',
            color: 'var(--color-text)', margin: 0,
          }}>
            {project.title}
          </h3>
        </div>
        <span style={{
          flexShrink: 0, fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
          letterSpacing: '0.04em', padding: '3px 9px',
          borderRadius: 100, background: st.bg, color: st.color,
          display: 'inline-flex', alignItems: 'center', gap: 4,
          fontWeight: 500, whiteSpace: 'nowrap',
        }}>
          <span className={`dot-${project.status}`} />
          {st.label}
        </span>
      </div>

      {/* Description */}
      <p style={{
        fontFamily: 'var(--font-body)', fontSize: '0.875rem',
        lineHeight: 1.65, color: 'var(--color-text2)', margin: 0,
      }}>
        {project.description}
      </p>

      {/* Stack */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
        {project.stack.map(tech => (
          <span key={tech} style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
            letterSpacing: '0.04em', color: 'var(--color-text3)',
            background: 'var(--color-bg3)', border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)', padding: '2px 8px',
          }}>
            {tech}
          </span>
        ))}
      </div>

      {/* Features */}
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>
        {project.features.slice(0, 3).map((f, i) => (
          <li key={i} style={{
            fontFamily: 'var(--font-body)', fontSize: '0.8rem',
            lineHeight: 1.55, color: 'var(--color-text3)',
            paddingLeft: 14, position: 'relative',
          }}>
            <span aria-hidden="true" style={{
              position: 'absolute', left: 0, color: 'var(--color-accent)', fontWeight: 700,
            }}>›</span>
            {f}
          </li>
        ))}
      </ul>

      <div style={{ flex: 1 }} />

      {/* Actions */}
      {(project.link || project.demoLink) && (
        <div style={{
          display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center',
          paddingTop: 8, borderTop: '1px solid var(--color-border)',
        }}>
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer"
              className="arrow-btn">
              {project.linkLabel ?? 'Открыть'} <span aria-hidden="true">→</span>
            </a>
          )}
          {project.demoLink && (
            <a href={project.demoLink} target="_blank" rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 500,
                color: 'var(--color-text3)', textDecoration: 'none',
                transition: 'color 0.18s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text2)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text3)')}
            >
              {project.demoLabel ?? 'Демо'} ↗
            </a>
          )}
        </div>
      )}
    </article>
  )
}
