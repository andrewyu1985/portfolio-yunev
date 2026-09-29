// Три дизайна главной. Классика рендерится на сервере как раньше,
// остальные подгружаются только по выбору в переключателе.

export type DesignId = 'classic' | 'newspaper' | 'blueprint'

export interface DesignMeta {
  id: DesignId
  label: string
  tagline: string
}

export const DESIGNS: DesignMeta[] = [
  { id: 'classic',   label: 'Классика', tagline: 'чистый интерфейс в духе SaaS' },
  { id: 'newspaper', label: 'Газета',   tagline: 'полоса ежедневной газеты' },
  { id: 'blueprint', label: 'Чертёж',   tagline: 'инженерный лист с основной надписью' },
]

// Четвёртый вариант живёт на своём адресе (свои шрифты, свой layout),
// поэтому в переключателе это ссылка, а не радиокнопка.
export interface LinkDesignMeta {
  id: 'cinema' | 'discs'
  label: string
  tagline: string
  href: string
}

export const LINK_DESIGNS: LinkDesignMeta[] = [
  { id: 'cinema', label: 'Ателье', tagline: 'бумажный макет и 3D-прокрутка', href: '/cinema' },
  { id: 'discs',  label: 'Диски',  tagline: 'проекты на дисках, как в фильмотеке', href: '/discs' },
]

export const DESIGN_COUNT = DESIGNS.length + LINK_DESIGNS.length

// Порядок пунктов в переключателе: Классика · Ателье · Диски · Газета · Чертёж
export type SwitcherItem = ({ kind: 'design' } & DesignMeta) | ({ kind: 'link' } & LinkDesignMeta)
export const SWITCHER_ITEMS: SwitcherItem[] = [
  { kind: 'design', ...DESIGNS[0] },
  ...LINK_DESIGNS.map(d => ({ kind: 'link' as const, ...d })),
  ...DESIGNS.slice(1).map(d => ({ kind: 'design' as const, ...d })),
]

// Подписи полосы: «4 варианта» / «5 вариантов», «ещё в четырёх стилях»
const plural = (n: number, one: string, few: string, many: string) => {
  const m10 = n % 10, m100 = n % 100
  if (m10 === 1 && m100 !== 11) return one
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few
  return many
}
const PREP = ['', 'одном', 'двух', 'трёх', 'четырёх', 'пяти', 'шести', 'семи']
export const captionCount = (n = DESIGN_COUNT) => `${n} ${plural(n, 'вариант', 'варианта', 'вариантов')} дизайна этой страницы`
export const captionMobile = (n = DESIGN_COUNT) => `Эта страница в ${n} ${plural(n, 'варианте', 'вариантах', 'вариантах')} дизайна — переключите:`
export const captionOthers = (labels: string[]) => {
  const q = labels.map(l => `«${l}»`)
  const list = q.length <= 1 ? q.join('') : `${q.slice(0, -1).join(', ')} и ${q[q.length - 1]}`
  return `Та же страница ещё в ${PREP[q.length] ?? q.length} ${plural(q.length, 'стиле', 'стилях', 'стилях')} — ${list}`
}

export const isDesignId = (v: unknown): v is DesignId =>
  v === 'classic' || v === 'newspaper' || v === 'blueprint'

// Скрипт в <head>: до первой отрисовки ставит data-design на <html>,
// чтобы ссылка ?design=… не мигала классикой
export const DESIGN_BOOT_SCRIPT =
  "try{var d=new URLSearchParams(location.search).get('design');" +
  "if(d==='newspaper'||d==='blueprint')document.documentElement.setAttribute('data-design',d)}catch(e){}"
