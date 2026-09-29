// Производные данные листа: позиции, обозначения и «слои» (теги) с цветами САПР.
// Исходные данные в data/* не меняются.

import { projects, allTags, ALL_TAG } from '@/data/projects'
import type { Project } from '@/types/project'

export interface Item extends Project {
  pos: number
  code: string
}

const pad3 = (n: number) => String(n).padStart(3, '0')

// Флагман — всегда позиция 1, остальные в порядке data/projects.ts
export const items: Item[] = [...projects]
  .sort((a, b) => Number(!!b.featured) - Number(!!a.featured))
  .map((p, i) => ({ ...p, pos: i + 1, code: `АЮ.${pad3(i + 1)}` }))

export const docCode = `АЮ.${pad3(projects.length)}.000`

export interface Layer {
  tag: string
  code: string
  color: string
  count: number
}

const KNOWN: Record<string, { code: string; color: string }> = {
  'AI-агенты': { code: 'АГ', color: '#1D5BB8' },
  'Автоматизация': { code: 'АВ', color: '#0B7566' },
  'Инфраструктура': { code: 'ИН', color: '#6A4BA6' },
  'Телеграм': { code: 'ТГ', color: '#0A7299' },
  'Контент': { code: 'КН', color: '#A85A12' },
  'Приложения': { code: 'ПР', color: '#A12F6A' },
}
const SPARE = ['#3B6E2A', '#8A3B2E', '#2E5E8A', '#6B5A1E']

export const layers: Layer[] = allTags
  .filter(t => t !== ALL_TAG)
  .map((tag, i) => ({
    tag,
    code: KNOWN[tag]?.code ?? tag.replace(/[^A-Za-zА-Яа-яЁё]/g, '').slice(0, 2).toUpperCase(),
    color: KNOWN[tag]?.color ?? SPARE[i % SPARE.length],
    count: projects.filter(p => p.tags.includes(tag)).length,
  }))

export const layerOf = (tag: string) => layers.find(l => l.tag === tag)

export { ALL_TAG }

// 1 год, 2 года, 8 лет
export function years(n: number) {
  const a = Math.abs(n) % 100
  const b = a % 10
  if (a > 10 && a < 20) return `${n} лет`
  if (b === 1) return `${n} год`
  if (b >= 2 && b <= 4) return `${n} года`
  return `${n} лет`
}
