const timeline = [
  { year: '2013', text: 'Операционное управление коммерческой недвижимостью' },
  { year: '2015', text: 'Роботрек: клуб робототехники, 150+ учеников в месяц, 1 место на всероссийских соревнованиях' },
  { year: '2017', text: 'Юневерсум — образовательный проект, аудитория 20 000+ человек' },
  { year: '2023', text: 'Первые AI-агенты и автоматизированные пайплайны' },
  { year: '2025', text: 'Hermes System — платформа AI-оркестрации из 18 агентов' },
]

const paragraphs = [
  'Архитектор автоматизации и AI-решений с 17+ годами в операционном управлении. Специализируюсь на перестройке бизнес-процессов: убираю ручные операции, внедряю воспроизводимые системы, сокращаю время типовых задач в 5–20 раз.',
  'Не точечная оптимизация — пересборка процесса. Строю решения на пересечении управления и AI: контентные конвейеры, клиентские сценарии, операционная инфраструктура. Результат — снижение затрат на подрядчиков на 70–100%, устойчивая работа без зависимости от человеческого фактора.',
  'Основатель интернет-проектов «Юневерсум» и «ВектораВсем» с аудиторией 20 000+ человек. Ранее — основатель клуба робототехники «Роботрек» (150+ учеников в месяц, 1 место на всероссийских соревнованиях), операционный управляющий коммерческой недвижимостью.',
]

export default function About() {
  return (
    <section
      id="about"
      style={{
        background: 'var(--color-bg2)',
        paddingTop: 'clamp(64px, 8vw, 100px)',
        paddingBottom: 'clamp(64px, 8vw, 100px)',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        {/* Section header */}
        <div className="reveal" style={{ marginBottom: 48 }}>
          <h2
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
            Обо мне
          </h2>
        </div>

        {/* 2-col layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(32px, 6vw, 80px)',
            alignItems: 'start',
          }}
          className="about-grid reveal"
        >
          {/* Left — Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {paragraphs.map((text, i) => (
              <p
                key={i}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-body)',
                  lineHeight: 'var(--lh-body)',
                  color: 'var(--color-text2)',
                  margin: 0,
                  maxWidth: '60ch',
                }}
              >
                {text}
              </p>
            ))}

            {/* Resume download */}
            <a
              href="/resume.pdf"
              download
              className="arrow-btn"
              style={{ marginTop: 8, width: 'fit-content' }}
            >
              Скачать резюме (PDF) <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* Right — Timeline */}
          <div style={{ position: 'relative', paddingLeft: 24 }}>
            {/* Vertical line */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 8,
                bottom: 8,
                width: 1,
                background: 'var(--color-border)',
              }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {timeline.map((item) => (
                <div key={item.year} style={{ position: 'relative' }}>
                  {/* Dot */}
                  <span
                    style={{
                      position: 'absolute',
                      left: -28,
                      top: 4,
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: 'var(--color-accent)',
                      flexShrink: 0,
                    }}
                  />

                  {/* Year */}
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-accent)',
                      letterSpacing: '0.06em',
                      marginBottom: 4,
                    }}
                  >
                    {item.year}
                  </span>

                  {/* Text */}
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      lineHeight: 1.6,
                      color: 'var(--color-text2)',
                      margin: 0,
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
