'use client'

import { Project } from '@/types/project'

const statusConfig = {
  live:    { label: 'live',     bg: 'oklch(0.93 0.06 145 / 0.15)', color: 'oklch(0.38 0.15 145)' },
  wip:     { label: 'в работе', bg: 'var(--color-accent-bg)',       color: 'var(--color-accent)' },
  concept: { label: 'идея',     bg: 'var(--color-bg3)',             color: 'var(--color-text3)' },
}

export default function ProjectCard({ project }: { project: Project }) {
  const st = statusConfig[project.status]

  return (
    <article style={{
      background: 'var(--color-bg)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)',
      padding: 24,
      display: 'flex', flexDirection: 'column', gap: 16,
      boxShadow: 'var(--shadow-card)',
      transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease, border-color 0.25s ease',
      cursor: 'default',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-5px)'
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
        e.currentTarget.style.borderColor = 'var(--color-border-accent)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'var(--shadow-card)'
        e.currentTarget.style.borderColor = 'var(--color-border)'
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: 'var(--color-accent-bg)',
            border: '1px solid var(--color-border-accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.2rem', flexShrink: 0,
          }}>
            {project.icon}
          </div>
          <h3 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
            lineHeight: 1.25, letterSpacing: '-0.02em',
            color: 'var(--color-text)', margin: 0,
          }}>
            {project.title}
          </h3>
        </div>
        <span style={{
          flexShrink: 0, fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
          letterSpacing: '0.04em', padding: '3px 9px', borderRadius: 100,
          background: st.bg, color: st.color,
          display: 'inline-flex', alignItems: 'center', gap: 4,
          fontWeight: 500, whiteSpace: 'nowrap',
        }}>
          <span className={`dot-${project.status}`} />
          {st.label}
        </span>
      </div>

      <p style={{
        fontFamily: 'var(--font-body)', fontSize: '0.875rem',
        lineHeight: 1.65, color: 'var(--color-text2)', margin: 0,
      }}>
        {project.description}
      </p>

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

      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>
        {project.features.slice(0, 3).map((f, i) => (
          <li key={i} style={{
            fontFamily: 'var(--font-body)', fontSize: '0.8rem',
            lineHeight: 1.55, color: 'var(--color-text3)',
            paddingLeft: 14, position: 'relative',
          }}>
            <span aria-hidden style={{
              position: 'absolute', left: 0, color: 'var(--color-accent)', fontWeight: 700,
            }}>›</span>
            {f}
          </li>
        ))}
      </ul>

      <div style={{ flex: 1 }} />

      {(project.link || project.demoLink) && (
        <div style={{
          display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center',
          paddingTop: 8, borderTop: '1px solid var(--color-border)',
        }}>
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="arrow-btn">
              {project.linkLabel ?? 'Открыть'} <span aria-hidden>→</span>
            </a>
          )}
          {project.demoLink && (
            <a href={project.demoLink} target="_blank" rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 500,
                color: 'var(--color-text3)', textDecoration: 'none', transition: 'color 0.18s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text2)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text3)')}
            >{project.demoLabel ?? 'Демо'} ↗</a>
          )}
        </div>
      )}
    </article>
  )
}
