'use client'

const TelegramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
)
const VKIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.525-2.049-1.714-1.033-1.01-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.566c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.271.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/>
  </svg>
)
const MaxIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
  </svg>
)

export default function Footer() {
  const year = new Date().getFullYear()
  const socials = [
    { href: 'https://t.me/Andrewyunev', label: 'Telegram', Icon: TelegramIcon },
    { href: 'https://vk.com/andrewyunev', label: 'VK', Icon: VKIcon },
    { href: 'https://max.ru/u/f9LHodD0cOLmKFCjGeOvUu6BhkT33DqLdWe3fGZqFr3lk_svf2Z7s2MHHmU', label: 'MAX', Icon: MaxIcon },
  ]

  return (
    <footer id="contact" style={{
      background: 'var(--color-bg2)',
      borderTop: '1px solid var(--color-border)',
      paddingTop: 'clamp(56px, 7vw, 88px)',
      paddingBottom: 'clamp(32px, 4vw, 48px)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>

        {/* Top */}
        <div className="footer-top reveal" style={{
          display: 'grid', gridTemplateColumns: '1fr auto',
          gap: 40, alignItems: 'end', marginBottom: 48,
        }}>
          <div>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'var(--color-accent)', margin: '0 0 16px',
            }}>03 — Связаться</p>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 'clamp(1.75rem, 4vw, 3rem)',
              lineHeight: 1.1, letterSpacing: '-0.025em',
              color: 'var(--color-text)', margin: 0,
            }}>
              Есть задача?<br />
              <span style={{ color: 'var(--color-accent)' }}>Давайте обсудим.</span>
            </h2>
          </div>
          <a href="mailto:andrewyunev@gmail.com" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.95rem',
            color: 'oklch(0.15 0.015 258)', background: 'var(--color-accent)',
            padding: '14px 28px', borderRadius: 100, textDecoration: 'none',
            transition: 'opacity 0.18s, transform 0.18s', whiteSpace: 'nowrap',
          }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Написать на email →
          </a>
        </div>

        {/* Email */}
        <div className="reveal" style={{
          padding: '28px 0',
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
          marginBottom: 40,
        }}>
          <a href="mailto:andrewyunev@gmail.com" style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(1.25rem, 3vw, 2rem)',
            letterSpacing: '-0.02em', color: 'var(--color-text2)',
            textDecoration: 'none', transition: 'color 0.18s',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text2)')}
          >
            andrewyunev@gmail.com
          </a>
        </div>

        {/* Bottom */}
        <div className="reveal" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 20,
        }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {socials.map(({ href, label, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                title={label}
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 40, height: 40, borderRadius: 10,
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text3)', textDecoration: 'none',
                  transition: 'color 0.18s, border-color 0.18s, background 0.18s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--color-accent)'
                  e.currentTarget.style.borderColor = 'var(--color-accent)'
                  e.currentTarget.style.background = 'var(--color-accent-bg)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--color-text3)'
                  e.currentTarget.style.borderColor = 'var(--color-border)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                <Icon />
              </a>
            ))}
          </div>

          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
            color: 'var(--color-text3)', letterSpacing: '0.04em',
          }}>
            © {year} Андрей Юнев · Сделано с вайбкодингом · Next.js + Claude Code
          </p>
        </div>
      </div>

      <style>{`
        .footer-top { grid-template-columns: 1fr auto !important; }
        @media (max-width: 640px) { .footer-top { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  )
}
