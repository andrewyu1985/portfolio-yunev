'use client'

import { Project } from '@/types/project'

function StatusDot({ status }: { status: Project['status'] }) {
  const labels = { live: 'live', wip: 'в работе', concept: 'идея' }
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-xs)',
        color: 'var(--color-text3)',
        letterSpacing: '0.04em',
      }}
    >
      <span className={`dot-${status}`} />
      {labels[status]}
    </span>
  )
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      style={{
        background: 'var(--color-bg2)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius)',
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.transform = 'translateY(-3px)'
        el.style.borderColor = 'var(--color-border-accent)'
        el.style.boxShadow = 'var(--shadow-lg)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.transform = 'translateY(0)'
        el.style.borderColor = 'var(--color-border)'
        el.style.boxShadow = 'none'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>{project.icon}</span>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 'var(--text-h2)',
              lineHeight: 'var(--lh-heading)',
              letterSpacing: 'var(--ls-heading)',
              color: 'var(--color-text)',
              margin: 0,
            }}
          >
            {project.title}
          </h3>
        </div>
        <StatusDot status={project.status} />
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          lineHeight: 'var(--lh-body)',
          color: 'var(--color-text2)',
          margin: 0,
        }}
      >
        {project.description}
      </p>

      {/* Stack tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {project.stack.map((tech) => (
          <span
            key={tech}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              letterSpacing: 'var(--ls-tag)',
              color: 'var(--color-text3)',
              background: 'var(--color-bg3)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '2px 8px',
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Features */}
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {project.features.slice(0, 3).map((f, i) => (
          <li
            key={i}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              lineHeight: 1.55,
              color: 'var(--color-text3)',
              paddingLeft: 14,
              position: 'relative',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: 0,
                color: 'var(--color-accent-dim)',
                fontWeight: 600,
              }}
            >
              ›
            </span>
            {f}
          </li>
        ))}
      </ul>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Actions */}
      {(project.link || project.demoLink) && (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
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
                color: 'var(--color-text3)',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
                transition: 'color 0.18s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text2)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text3)')}
            >
              {project.demoLabel ?? 'Демо'} ↗
            </a>
          )}
        </div>
      )}
    </article>
  )
}
