import { DESIGN_COUNT, SWITCHER_ITEMS, captionCount, captionMobile, captionOthers } from '@/components/designs/registry'
import '@/components/designs/shell.css'

// Та же полоса переключателя, что на главной, только статичная: текущая версия включена,
// остальные — ссылки на главную с нужным дизайном или на свою страницу.
export default function DesignBar({ active }: { active: 'cinema' | 'discs' }) {
  const activeIdx = SWITCHER_ITEMS.findIndex(d => d.kind === 'link' && d.id === active)
  const others = SWITCHER_ITEMS.filter(d => !(d.kind === 'link' && d.id === active)).map(d => d.label)

  return (
    <div className="ds-bar" data-active={active}>
      <div className="ds-bar-in">
        <p className="ds-caption">
          <span className="ds-caption-k">{captionCount()}</span>
          <span className="ds-caption-v">
            {captionOthers(others)}
            <span className="ds-arrow" aria-hidden> →</span>
          </span>
          <span className="ds-caption-m">{captionMobile()}</span>
        </p>

        <nav className="ds-seg" style={{ ['--i' as string]: activeIdx, ['--n' as string]: DESIGN_COUNT }} aria-label="Вариант дизайна страницы">
          <span className="ds-thumb" aria-hidden />
          {SWITCHER_ITEMS.map(d => {
            const on = d.kind === 'link' && d.id === active
            const href = d.kind === 'link' ? d.href : d.id === 'classic' ? '/' : `/?design=${d.id}`
            return (
              <a key={d.id} href={href} className="ds-opt ds-opt-link" data-on={on || undefined} aria-current={on ? 'page' : undefined} title={`${d.label} — ${d.tagline}`}>
                <span className={`ds-glyph ds-glyph-${d.id}`} aria-hidden />
                <span className="ds-label">{d.label}</span>
              </a>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
