'use client'

import { Project } from '@/types/project'

export default function ProjectFeatured({ project }: { project: Project }) {
  return (
    <article
      style={{
        background: 'var(--color-bg2)',
        border: '1px solid var(--color-border-accent)',
        borderRadius: 'var(--radius)',
        padding: 'clamp(24px, 4vw, 40px)',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: 32,
        alignItems: 'start',
        boxShadow: 'var(--shadow-card)',
        transition: 'box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-card)'
      }}
      className="featured-grid"
    >
      {/* Main content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>{project.icon}</span>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'var(--text-h1)',
              lineHeight: 'var(--lh-heading)',
              letterSpacing: 'var(--ls-heading)',
              color: 'var(--color-text)',
              margin: 0,
            }}
          >
            {project.title}
          </h3>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text3)',
              letterSpacing: '0.04em',
              marginLeft: 'auto',
            }}
          >
            <span className="dot-live" />
            live
          </span>
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-body)',
            lineHeight: 'var(--lh-body)',
            color: 'var(--color-text2)',
            maxWidth: '72ch',
            margin: 0,
          }}
        >
          {project.description}
        </p>

        {/* Features with tree formatting */}
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {project.features.map((feature, i) => {
            const isLast = i === project.features.length - 1
            const prefix = isLast ? '└─' : '├─'
            return (
              <li
                key={i}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  lineHeight: 1.6,
                  color: 'var(--color-text2)',
                  display: 'flex',
                  gap: 10,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-accent-dim)',
                    flexShrink: 0,
                    fontSize: 'var(--text-xs)',
                    paddingTop: 2,
                  }}
                >
                  {prefix}
                </span>
                {feature}
              </li>
            )
          })}
        </ul>

        {/* Stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {project.stack.map((tech) => (
            <span
              key={tech}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                letterSpacing: 'var(--ls-tag)',
                color: 'var(--color-accent)',
                background: 'var(--color-accent-bg)',
                border: '1px solid var(--color-border-accent)',
                borderRadius: 'var(--radius-sm)',
                padding: '3px 10px',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="arrow-btn"
            >
              {project.linkLabel ?? 'Открыть проект'} <span aria-hidden="true">→</span>
            </a>
          )}
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 'var(--text-sm)',
                fontWeight: 500,
                color: 'var(--color-text2)',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
                transition: 'color 0.18s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text2)')}
            >
              {project.demoLabel ?? 'Демо'} ↗
            </a>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .featured-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </article>
  )
}
