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
  id: 'cinema'
  label: string
  tagline: string
  href: string
}

export const LINK_DESIGNS: LinkDesignMeta[] = [
  { id: 'cinema', label: 'Ателье', tagline: 'бумажный макет и 3D-прокрутка', href: '/cinema' },
]

export const DESIGN_COUNT = DESIGNS.length + LINK_DESIGNS.length

// Порядок пунктов в переключателе: «Ателье» идёт сразу за классикой
export type SwitcherItem = ({ kind: 'design' } & DesignMeta) | ({ kind: 'link' } & LinkDesignMeta)
export const SWITCHER_ITEMS: SwitcherItem[] = [
  { kind: 'design', ...DESIGNS[0] },
  { kind: 'link', ...LINK_DESIGNS[0] },
  ...DESIGNS.slice(1).map(d => ({ kind: 'design' as const, ...d })),
]

export const isDesignId = (v: unknown): v is DesignId =>
  v === 'classic' || v === 'newspaper' || v === 'blueprint'

// Скрипт в <head>: до первой отрисовки ставит data-design на <html>,
// чтобы ссылка ?design=… не мигала классикой
export const DESIGN_BOOT_SCRIPT =
  "try{var d=new URLSearchParams(location.search).get('design');" +
  "if(d==='newspaper'||d==='blueprint')document.documentElement.setAttribute('data-design',d)}catch(e){}"
