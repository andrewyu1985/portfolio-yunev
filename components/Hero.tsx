'use client'

import Image from 'next/image'

const TelegramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
)

const VKIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.525-2.049-1.714-1.033-1.01-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.566c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.271.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/>
  </svg>
)

const MAXIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
  </svg>
)

const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)

const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)

export default function Hero() {
  return (
    <section
      className="noise-bg"
      style={{
        background: 'var(--color-bg)',
        paddingTop: 'clamp(64px, 10vw, 120px)',
        paddingBottom: 'clamp(64px, 10vw, 120px)',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) auto',
          gap: 'clamp(32px, 6vw, 80px)',
          alignItems: 'start',
        }}
        className="hero-grid"
      >
        {/* Left — Text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Name */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'var(--text-display)',
              lineHeight: 'var(--lh-display)',
              letterSpacing: 'var(--ls-display)',
              color: 'var(--color-text)',
              margin: 0,
            }}
          >
            Андрей<br />Юнев
          </h1>

          {/* Role */}
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 'var(--text-h2)',
              lineHeight: 'var(--lh-heading)',
              letterSpacing: 'var(--ls-heading)',
              color: 'var(--color-accent)',
              margin: 0,
            }}
          >
            Архитектор AI-систем
          </p>

          {/* Description */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-body)',
              lineHeight: 'var(--lh-body)',
              color: 'var(--color-text2)',
              maxWidth: '55ch',
              margin: 0,
            }}
          >
            17 лет строю воспроизводимые системы вместо ручных операций.
            Убираю операционный хаос, внедряю AI-пайплайны, сокращаю время типовых задач в&nbsp;5–20 раз.
          </p>

          {/* Contacts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <a
              href="mailto:andrewyunev@gmail.com"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                color: 'var(--color-text3)',
                fontSize: 'var(--text-sm)',
                fontFamily: 'var(--font-body)',
                textDecoration: 'none',
                width: 'fit-content',
                transition: 'color 0.18s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text3)')}
            >
              <EmailIcon /> andrewyunev@gmail.com
            </a>

            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              <a
                href="https://t.me/Andrewyunev"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  color: 'var(--color-text3)',
                  fontSize: 'var(--text-sm)',
                  fontFamily: 'var(--font-body)',
                  textDecoration: 'none',
                  transition: 'color 0.18s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text3)')}
              >
                <TelegramIcon /> Telegram
              </a>

              <a
                href="https://vk.com/andrewyunev"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  color: 'var(--color-text3)',
                  fontSize: 'var(--text-sm)',
                  fontFamily: 'var(--font-body)',
                  textDecoration: 'none',
                  transition: 'color 0.18s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text3)')}
              >
                <VKIcon /> VK
              </a>

              <a
                href="https://max.ru/u/f9LHodD0cOLmKFCjGeOvUu6BhkT33DqLdWe3fGZqFr3lk_svf2Z7s2MHHmU"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  color: 'var(--color-text3)',
                  fontSize: 'var(--text-sm)',
                  fontFamily: 'var(--font-body)',
                  textDecoration: 'none',
                  transition: 'color 0.18s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text3)')}
              >
                <MAXIcon /> MAX
              </a>
            </div>

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                color: 'var(--color-text3)',
                fontSize: 'var(--text-sm)',
                fontFamily: 'var(--font-body)',
              }}
            >
              <LocationIcon /> Москва
            </span>
          </div>

          {/* CTA */}
          <div>
            <a
              href="#projects"
              className="arrow-btn"
              style={{ fontSize: 'var(--text-body)', fontWeight: 600 }}
            >
              Смотреть проекты <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* Stats */}
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text3)',
              letterSpacing: '0.04em',
              margin: 0,
            }}
          >
            13 проектов · 18 агентов в Hermes · 17+ лет в управлении
          </p>
        </div>

        {/* Right — Photo */}
        <div
          style={{
            width: 'clamp(160px, 20vw, 240px)',
            flexShrink: 0,
          }}
          className="hero-photo"
        >
          <div
            style={{
              position: 'relative',
              aspectRatio: '3/4',
              borderRadius: 'var(--radius)',
              overflow: 'hidden',
              border: '1px solid var(--color-border-accent)',
              background: 'var(--color-bg3)',
            }}
          >
            <Image
              src="/photo.jpg"
              alt="Андрей Юнев"
              fill
              style={{ objectFit: 'cover' }}
              priority
              sizes="(max-width: 640px) 140px, 240px"
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-photo {
            order: -1;
            width: 140px !important;
          }
        }
      `}</style>
    </section>
  )
}
