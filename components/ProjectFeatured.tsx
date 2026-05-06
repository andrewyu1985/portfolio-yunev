'use client'

import { Project } from '@/types/project'

export default function ProjectFeatured({ project }: { project: Project }) {
  return (
    <article style={{
      background: 'var(--color-bg2)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-lg)',
      display: 'grid',
      gridTemplateColumns: '1fr 260px',
      minHeight: 320,
      transition: 'transform 0.22s ease, box-shadow 0.22s ease',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.boxShadow = 'var(--shadow-xl)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
      }}
      className="featured-layout"
    >
      {/* Основной контент */}
      <div style={{
        padding: 'clamp(28px, 4vw, 48px)',
        display: 'flex', flexDirection: 'column', gap: 20,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '1.75rem', lineHeight: 1 }}>{project.icon}</span>
          <div>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--color-accent)', margin: '0 0 4px',
            }}>Флагманский проект</p>
            <h3 style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
              lineHeight: 1.05, letterSpacing: '-0.03em',
              color: 'var(--color-text)', margin: 0,
            }}>{project.title}</h3>
          </div>
          <span style={{
            marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            letterSpacing: '0.04em', padding: '4px 10px', borderRadius: 100,
            background: 'oklch(0.93 0.06 145 / 0.15)', color: 'oklch(0.40 0.15 145)',
            display: 'inline-flex', alignItems: 'center', gap: 5,
          }}>
            <span className="dot-live" /> live
          </span>
        </div>

        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '0.95rem',
          lineHeight: 1.7, color: 'var(--color-text2)', maxWidth: '65ch', margin: 0,
        }}>
          {project.description}
        </p>

        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {project.features.map((f, i) => {
            const isLast = i === project.features.length - 1
            return (
              <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', color: 'var(--color-accent)',
                  flexShrink: 0, fontSize: '0.75rem', paddingTop: 2,
                }}>{isLast ? '└─' : '├─'}</span>
                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.875rem',
                  lineHeight: 1.55, color: 'var(--color-text3)',
                }}>{f}</span>
              </li>
            )
          })}
        </ul>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', marginTop: 4 }}>
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem',
              color: 'oklch(0.15 0.015 258)', background: 'var(--color-accent)',
              padding: '10px 22px', borderRadius: 100, textDecoration: 'none',
              transition: 'opacity 0.18s',
            }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              {project.linkLabel ?? 'Открыть'} →
            </a>
          )}
          {project.demoLink && (
            <a href={project.demoLink} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 500,
              color: 'var(--color-text3)', textDecoration: 'none', transition: 'color 0.18s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text3)')}
            >
              {project.demoLabel ?? 'Демо'} ↗
            </a>
          )}
        </div>
      </div>

      {/* Правая amber-панель */}
      <div style={{
        background: 'var(--color-accent)',
        padding: '40px 32px',
        display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'center',
      }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'oklch(0.28 0.10 68)', margin: 0,
        }}>Стек технологий</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {project.stack.map(tech => (
            <span key={tech} style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.82rem',
              fontWeight: 500, color: 'oklch(0.22 0.08 68)',
              background: 'oklch(0.48 0.16 68 / 0.25)',
              borderRadius: 'var(--radius-sm)', padding: '6px 12px',
              letterSpacing: '0.02em',
            }}>
              {tech}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .featured-layout { grid-template-columns: 1fr !important; }
          .featured-layout > div:last-child { display: none !important; }
        }
      `}</style>
    </article>
  )
}
