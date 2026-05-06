const timeline = [
  { year: '2013', text: 'Операционное управление коммерческой недвижимостью' },
  { year: '2015', text: 'Роботрек — клуб робототехники, 150+ учеников/мес, 1 место на всероссийских соревнованиях' },
  { year: '2017', text: 'Юневерсум — образовательный проект, аудитория 20 000+ человек' },
  { year: '2023', text: 'Первые AI-агенты и автоматизированные пайплайны' },
  { year: '2025', text: 'Hermes System — платформа AI-оркестрации из 18 агентов' },
]

const paragraphs = [
  'Архитектор автоматизации и AI-решений с 17+ годами в операционном управлении. Специализируюсь на перестройке бизнес-процессов: убираю ручные операции, внедряю воспроизводимые системы, сокращаю время типовых задач в 5–20 раз.',
  'Не точечная оптимизация — пересборка процесса. Строю решения на пересечении управления и AI: контентные конвейеры, клиентские сценарии, операционная инфраструктура. Снижение затрат на подрядчиков на 70–100%, устойчивая работа без зависимости от человеческого фактора.',
  'Основатель «Юневерсум» и «ВектораВсем» с аудиторией 20 000+ человек. Ранее — основатель «Роботрека» (150+ учеников в месяц, 1 место на всероссийских соревнованиях).',
]

export default function About() {
  return (
    <section id="about" style={{
      background: 'var(--color-bg3)',
      paddingTop: 'clamp(64px, 8vw, 100px)',
      paddingBottom: 'clamp(64px, 8vw, 100px)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>

        <div className="reveal" style={{ marginBottom: 56 }}>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--color-accent)', margin: '0 0 14px',
          }}>02 — Обо мне</p>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'var(--text-h1)', lineHeight: 1.1,
            letterSpacing: 'var(--ls-heading)', color: 'var(--color-text)', margin: 0,
          }}>
            Строю системы,<br />
            <span style={{ color: 'var(--color-accent)' }}>которые работают сами</span>
          </h2>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(40px, 6vw, 80px)', alignItems: 'start',
        }} className="about-grid reveal">

          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            {paragraphs.map((text, i) => (
              <p key={i} style={{
                fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)',
                lineHeight: 1.75, color: 'var(--color-text2)', margin: 0,
              }}>{text}</p>
            ))}
          </div>

          <div style={{ position: 'relative', paddingLeft: 28 }}>
            <div style={{
              position: 'absolute', left: 0, top: 6, bottom: 6,
              width: 1, background: 'var(--color-border)',
            }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
              {timeline.map(item => (
                <div key={item.year} style={{ position: 'relative' }}>
                  <span style={{
                    position: 'absolute', left: -33, top: 5,
                    width: 9, height: 9, borderRadius: '50%',
                    background: 'var(--color-accent)',
                    boxShadow: '0 0 0 3px var(--color-bg3), 0 0 0 5px oklch(0.50 0.26 265 / 0.15)',
                  }} />
                  <span style={{
                    display: 'block', fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem', color: 'var(--color-accent)',
                    letterSpacing: '0.06em', marginBottom: 5,
                  }}>{item.year}</span>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.875rem',
                    lineHeight: 1.6, color: 'var(--color-text3)', margin: 0,
                  }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .about-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}
