'use client'

const TelegramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
)
const VKIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.525-2.049-1.714-1.033-1.01-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.566c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.271.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/>
  </svg>
)

const capabilities = [
  'AI-оркестрация и мульти-агентные системы',
  'Автоматизация бизнес-процессов',
  'Telegram-боты и контент-пайплайны',
  'MCP-интеграции и API-оркестрация',
  'От идеи до рабочего прототипа за день',
]

const stats = [
  { number: '13', label: 'проектов\nреализовано' },
  { number: '18', label: 'агентов в\nHermes System' },
  { number: '17+', label: 'лет в\nуправлении' },
]

export default function Hero() {
  return (
    <section style={{ background: 'var(--color-bg)', overflow: 'hidden' }}>

      {/* Label bar */}
      <div style={{
        background: 'var(--color-text)',
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 32,
        overflow: 'hidden',
      }}>
        {['Архитектор AI-систем', '·', 'Москва', '·', 'Автоматизация', '·', 'Вайбкодинг', '·', 'Multi-agent', '·', 'Открыт к проектам'].map((t, i) => (
          <span key={i} style={{
            fontFamily: i % 2 === 1 ? 'var(--font-body)' : 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: i % 2 === 1 ? 0 : '0.1em',
            textTransform: i % 2 === 1 ? 'none' : 'uppercase',
            color: i % 2 === 1 ? 'oklch(0.45 0.015 258)' : 'oklch(0.75 0.012 80)',
            whiteSpace: 'nowrap',
          }}>{t}</span>
        ))}
      </div>

      {/* Main hero */}
      <div style={{
        maxWidth: 1100, margin: '0 auto', padding: '0 24px',
        display: 'grid',
        gridTemplateColumns: '1fr 340px',
        gap: 0,
        minHeight: 'clamp(480px, 60vh, 640px)',
      }} className="hero-main">

        {/* Left — content */}
        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(40px, 6vw, 80px) 0',
          paddingRight: 'clamp(24px, 4vw, 64px)',
          gap: 28,
        }}>
          {/* Name */}
          <div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'var(--text-display)',
              lineHeight: 'var(--lh-display)',
              letterSpacing: 'var(--ls-display)',
              color: 'var(--color-text)',
              margin: 0,
            }}>
              Андрей<br />Юнев
            </h1>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12, marginTop: 16,
            }}>
              <span style={{
                display: 'block', height: 2, width: 32,
                background: 'var(--color-accent)', borderRadius: 2, flexShrink: 0,
              }} />
              <p style={{
                fontFamily: 'var(--font-display)', fontWeight: 600,
                fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                letterSpacing: '-0.01em',
                color: 'var(--color-accent)', margin: 0,
              }}>
                Архитектор AI-систем
              </p>
            </div>
          </div>

          {/* Bio */}
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)',
            lineHeight: 1.7, color: 'var(--color-text2)', maxWidth: '52ch', margin: 0,
          }}>
            17 лет строю воспроизводимые системы вместо ручных операций.
            Убираю операционный хаос, внедряю AI‑пайплайны, сокращаю время типовых задач в&nbsp;5–20 раз.
          </p>

          {/* Contacts */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {[
              { href: 'mailto:andrewyunev@gmail.com', label: 'andrewyunev@gmail.com', icon: null },
              { href: 'https://t.me/Andrewyunev', label: 'Telegram', icon: <TelegramIcon /> },
              { href: 'https://vk.com/andrewyunev', label: 'VK', icon: <VKIcon /> },
            ].map(({ href, label, icon }) => (
              <a key={href} href={href} target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontFamily: 'var(--font-body)', fontSize: '0.825rem', fontWeight: 500,
                  color: 'var(--color-text3)',
                  background: 'var(--color-bg3)', border: '1px solid var(--color-border)',
                  borderRadius: 100, padding: '6px 14px', textDecoration: 'none',
                  transition: 'color 0.18s, border-color 0.18s, background 0.18s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--color-accent)'
                  e.currentTarget.style.borderColor = 'var(--color-border-accent)'
                  e.currentTarget.style.background = 'var(--color-accent-bg)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--color-text3)'
                  e.currentTarget.style.borderColor = 'var(--color-border)'
                  e.currentTarget.style.background = 'var(--color-bg3)'
                }}
              >
                {icon}{label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div>
            <a href="#projects" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.95rem',
              color: 'var(--color-bg2)',
              background: 'var(--color-text)',
              padding: '14px 28px', borderRadius: 100, textDecoration: 'none',
              transition: 'background 0.2s ease, transform 0.2s ease',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--color-accent)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--color-text)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Смотреть проекты
              <span style={{ fontSize: '1.1em' }}>→</span>
            </a>
          </div>
        </div>

        {/* Right — amber panel */}
        <div style={{
          background: 'var(--color-text)',
          padding: 'clamp(32px, 4vw, 52px) clamp(24px, 3vw, 40px)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24,
          position: 'relative', overflow: 'hidden',
        }} className="hero-panel">
          {/* Decorative large number */}
          <span style={{
            position: 'absolute', right: -8, top: -16,
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: '9rem', lineHeight: 1, letterSpacing: '-0.05em',
            color: 'oklch(0.20 0.015 258)', userSelect: 'none', pointerEvents: 'none',
          }} aria-hidden="true">AI</span>

          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--color-accent)', margin: 0, position: 'relative',
          }}>Могу помочь с</p>

          <ul style={{
            listStyle: 'none', margin: 0, padding: 0,
            display: 'flex', flexDirection: 'column', gap: 14,
            position: 'relative',
          }}>
            {capabilities.map((cap, i) => (
              <li key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
              }}>
                <span style={{
                  width: 5, height: 5, borderRadius: '50%', background: 'var(--color-accent)',
                  flexShrink: 0, marginTop: 7,
                }} />
                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.875rem',
                  lineHeight: 1.55, color: 'oklch(0.75 0.012 80)',
                }}>
                  {cap}
                </span>
              </li>
            ))}
          </ul>

          <a href="https://t.me/Andrewyunev" target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem',
              color: 'var(--color-text)', background: 'var(--color-accent)',
              padding: '12px 20px', borderRadius: 'var(--radius)', textDecoration: 'none',
              transition: 'opacity 0.18s', position: 'relative', marginTop: 8,
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <TelegramIcon /> Написать в Telegram
          </a>
        </div>
      </div>

      {/* Stats strip */}
      <div style={{
        borderTop: '1px solid var(--color-border)',
        background: 'var(--color-bg2)',
        maxWidth: '100%', overflow: 'hidden',
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto', padding: '0 24px',
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        }} className="stats-grid">
          {stats.map((s, i) => (
            <div key={i} style={{
              padding: 'clamp(20px, 3vw, 32px) 24px',
              borderRight: i < 2 ? '1px solid var(--color-border)' : 'none',
              display: 'flex', flexDirection: 'column', gap: 4,
            }}>
              <span style={{
                fontFamily: 'var(--font-display)', fontWeight: 800,
                fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1,
                letterSpacing: '-0.03em', color: 'var(--color-accent)',
              }}>{s.number}</span>
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: '0.8rem',
                lineHeight: 1.4, color: 'var(--color-text3)',
                whiteSpace: 'pre-line',
              }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-main { grid-template-columns: 1fr !important; }
          .hero-panel { display: none !important; }
          .stats-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr !important; }
          .stats-grid > div { border-right: none !important; border-bottom: 1px solid var(--color-border); }
        }
      `}</style>
    </section>
  )
}
