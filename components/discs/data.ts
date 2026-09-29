import { projects } from '@/data/projects'
import type { Project } from '@/types/project'

// Категории — переключатели сверху. Порядок id внутри = порядок дисков слева направо.
export interface Category {
  id: string
  label: string
  hue: string // цвет фона обложек этой категории — для заглушки, пока обложка грузится
  ids: string[]
}

export const CATEGORIES: Category[] = [
  { id: 'agents',   label: 'Агенты',         hue: '#7a1d1d', ids: ['hermes-system', 'ecommerce-agent', 'ars-orchestrator', 'second-brain-bot', 'tg-voice-agent', 'news-digest', 'uneversum-bot'] },
  { id: 'research', label: 'Исследования',   hue: '#22306e', ids: ['deep-research', 'tg-chat-analyzer', 'yt-radar', 'hh-parser'] },
  { id: 'apps',     label: 'Приложения',     hue: '#155c55', ids: ['private-chat', 'navigator-training', 'quiz-funnel', 'uneversum-catalog', 'breathing-app', 'website-creation'] },
  { id: 'video',    label: 'Видео',          hue: '#a04a12', ids: ['onv-montage', 'video-update', 'forum-video', 'mira-vs-time', 'told-after-dark', 'reels-generator'] },
  { id: 'creator',  label: 'AI-креатор',     hue: '#4d2a5e', ids: ['ai-images', 'ai-presentations', 'pptx-design-system', 'handwriting-ocr', 'audio-to-book', 'verified-notes'] },
  { id: 'infra',    label: 'Инфраструктура', hue: '#5a5f2e', ids: ['ai-vps-access', 'vpn-infra', 'chrome-downloader'] },
]

export interface Disc {
  project: Project
  art: string
  hue: string
  category: Category
  n: number // сквозной номер 1..32
}

const byId = new Map(projects.map(p => [p.id, p]))
let counter = 0
export const DISCS: Record<string, Disc[]> = Object.fromEntries(
  CATEGORIES.map(c => [c.id, c.ids.flatMap(id => {
    const project = byId.get(id)
    if (!project) return []
    counter += 1
    return [{ project, art: `/discs/art/${id}.jpg`, hue: c.hue, category: c, n: counter }]
  })]),
)

export const TOTAL = counter

export const STATUS: Record<Project['status'], string> = { live: 'работает', wip: 'в работе', concept: 'идея' }

export const person = {
  name: 'Андрей Юнев',
  mark: 'АЮ',
  role: 'Архитектор AI-систем',
  email: 'andrewyunev@gmail.com',
  telegram: 'https://t.me/Andrewyunev',
}

export const projectHref = (p: Project) => p.link || p.demoLink
export const projectHrefLabel = (p: Project) => p.linkLabel || p.demoLabel || 'Открыть проект'
