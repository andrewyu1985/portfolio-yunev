import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--color-bg)',
      color: 'var(--color-text)',
      gap: '1.5rem',
      textAlign: 'center',
      padding: '2rem',
    }}>
      <span style={{ fontSize: '4rem', fontFamily: 'var(--font-jetbrains)', color: 'var(--color-accent)', fontWeight: 700 }}>404</span>
      <p style={{ color: 'var(--color-text2)', fontFamily: 'var(--font-manrope)' }}>Страница не найдена</p>
      <Link href="/" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontFamily: 'var(--font-manrope)', fontWeight: 600 }}>← На главную</Link>
    </div>
  )
}
