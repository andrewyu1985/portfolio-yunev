import type { ReactNode } from 'react'

/* Типографика текстов из data/* для чертёжных шрифтов.
   — «→» (U+2192) нет ни в одном подмножестве Martian Mono / Tektur от Google Fonts:
     рисуем стрелку SVG, скринридер читает её подпись «→».
   — «‑» (U+2011) тоже нет: ставим обычный дефис, а слово делаем неразрывным.
   — числа «20 000», диапазоны «5–20», «0,5–1,5×» не рвутся по строкам.
   — названия в кавычках «Юневерсум» не переносятся автоматическими переносами. */

export const RArrow = () => (
  <svg className="bp-rarr" viewBox="0 0 18 10" role="img" aria-label="→" focusable="false">
    <path d="M1 5h15M11.5 1.2 16 5l-4.5 3.8" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

const TOKEN = /→|\d+(?:[.,]\d+)?[–-]\d+(?:[.,]\d+)?[%×+]?|[\p{L}\d]+‑[\p{L}\d]+|«[^«»]{1,30}»/gu

export function rich(text: string): ReactNode {
  // тысячи: «20 000» → неразрывный пробел
  const s = text.replace(/(\d) (?=\d{3}(?!\d))/g, '$1 ')
  const out: ReactNode[] = []
  let last = 0
  let k = 0
  for (const m of s.matchAll(TOKEN)) {
    const i = m.index ?? 0
    const t = m[0]
    if (i > last) out.push(s.slice(last, i))
    if (t === '→') {
      out.push(<RArrow key={k++} />)
    } else if (t.startsWith('«')) {
      out.push(<span key={k++} className="bp-nohy">{t}</span>)
    } else {
      out.push(<span key={k++} className="bp-nw">{t.replace('‑', '-')}</span>)
    }
    last = i + t.length
  }
  if (last < s.length) out.push(s.slice(last))
  return out.length === 1 ? out[0] : out
}

/* Для SVG-подписей, где нельзя вставить HTML: текст без «→» и позиции стрелок (в символах) */
export function splitArrows(text: string): { plain: string; at: number[] } {
  const at: number[] = []
  let plain = ''
  for (const ch of text.replace(/‑/g, '-')) {
    if (ch === '→') { at.push(plain.length); plain += '  ' }
    else plain += ch
  }
  return { plain, at }
}
