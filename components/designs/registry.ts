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

export const isDesignId = (v: unknown): v is DesignId =>
  v === 'classic' || v === 'newspaper' || v === 'blueprint'

// Скрипт в <head>: до первой отрисовки ставит data-design на <html>,
// чтобы ссылка ?design=… не мигала классикой
export const DESIGN_BOOT_SCRIPT =
  "try{var d=new URLSearchParams(location.search).get('design');" +
  "if(d==='newspaper'||d==='blueprint')document.documentElement.setAttribute('data-design',d)}catch(e){}"
