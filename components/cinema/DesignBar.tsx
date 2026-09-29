import { DESIGN_COUNT, SWITCHER_ITEMS } from '@/components/designs/registry'
import '@/components/designs/shell.css'

// Та же полоса переключателя, что на главной, только статичная:
// «Ателье» включено, остальные варианты — ссылки на главную с нужным дизайном.
export default function DesignBar() {
  const activeIdx = SWITCHER_ITEMS.findIndex(d => d.kind === 'link')
  const others = SWITCHER_ITEMS.filter(d => d.kind === 'design').map(d => `«${d.label}»`)
  const othersText = `${others.slice(0, -1).join(', ')} и ${others[others.length - 1]}`

  return (
    <div className="ds-bar" data-active="cinema">
      <div className="ds-bar-in">
        <p className="ds-caption">
          <span className="ds-caption-k">{DESIGN_COUNT} варианта дизайна этой страницы</span>
          <span className="ds-caption-v">
            Та же страница ещё в трёх стилях — {othersText}
            <span className="ds-arrow" aria-hidden> →</span>
          </span>
          <span className="ds-caption-m">Эта страница в {DESIGN_COUNT} вариантах дизайна — переключите:</span>
        </p>

        <nav className="ds-seg" style={{ ['--i' as string]: activeIdx, ['--n' as string]: DESIGN_COUNT }} aria-label="Вариант дизайна страницы">
          <span className="ds-thumb" aria-hidden />
          {SWITCHER_ITEMS.map(d => d.kind === 'link' ? (
            <a key={d.id} href={d.href} className="ds-opt ds-opt-link" data-on aria-current="page" title={`${d.label} — ${d.tagline}`}>
              <span className={`ds-glyph ds-glyph-${d.id}`} aria-hidden />
              <span className="ds-label">{d.label}</span>
            </a>
          ) : (
            <a key={d.id} href={d.id === 'classic' ? '/' : `/?design=${d.id}`} className="ds-opt ds-opt-link" title={`${d.label} — ${d.tagline}`}>
              <span className={`ds-glyph ds-glyph-${d.id}`} aria-hidden />
              <span className="ds-label">{d.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}
