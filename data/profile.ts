// Тексты героя, «Обо мне» и контактов — общие для альтернативных дизайнов главной.
// Классический дизайн (components/*.tsx) держит свои копии и этот файл не читает:
// правка текста здесь не меняет классику, и наоборот.

import { projects } from './projects'

export const person = {
  name: 'Андрей Юнев',
  firstName: 'Андрей',
  lastName: 'Юнев',
  initials: 'АЮ',
  role: 'Архитектор AI-систем',
  status: 'Открыт к проектам',
  photo: '/photo.jpg',
  bio: '17 лет строю воспроизводимые системы вместо ручных операций. Убираю операционный хаос, внедряю AI‑пайплайны, сокращаю время типовых задач в 5–20 раз.',
  noCode: 'Реализовано без знания программирования',
  noCodeLong: 'AI-инструменты, правильные промпты и системное мышление — никакого кода',
}

export const capabilities = [
  'AI-оркестрация', 'Multi-agent системы', 'Автоматизация',
  'Telegram-боты', 'MCP-интеграции', 'Контент-пайплайны', 'API-оркестрация',
]

export const stats = [
  { value: projects.length, suffix: '', label: 'проектов реализовано' },
  { value: 20, suffix: '×', label: 'ускорение типовых задач' },
  { value: 17, suffix: '+', label: 'лет в управлении' },
]

export const aboutTitle = { lead: 'Строю системы,', accent: 'которые работают сами' }

export const aboutParagraphs = [
  'Архитектор автоматизации и AI-решений с 17+ годами в операционном управлении. Специализируюсь на перестройке бизнес-процессов: убираю ручные операции, внедряю воспроизводимые системы, сокращаю время типовых задач в 5–20 раз.',
  'Не точечная оптимизация — пересборка процесса. Строю решения на пересечении управления и AI: контентные конвейеры, клиентские сценарии, операционная инфраструктура. Снижение затрат на подрядчиков на 70–100%.',
  'Руководитель проектов «Юневерсум» и «ВектораВсем» с аудиторией 20 000+ человек. Ранее — руководитель клуба робототехники «Роботрек» (150+ учеников в месяц, 1 место на всероссийских соревнованиях).',
]

export const timeline = [
  { year: '2013', text: 'Операционное управление коммерческой недвижимостью' },
  { year: '2015', text: 'Роботрек — клуб робототехники, 150+ учеников/мес, 1 место на всероссийских соревнованиях' },
  { year: '2017', text: 'Юневерсум — образовательный проект, аудитория 20 000+ человек' },
  { year: '2025', text: 'Первые AI-агенты и автоматизированные пайплайны' },
  { year: '2026', text: 'Hermes — личный автономный AI-агент, и Private Chat — закрытый мессенджер' },
]

export const certificate = {
  kind: 'Сертификат',
  title: 'P3P-2026 · P3.express Practitioner',
  details: 'certN · OMIMO · Effective from 2026-05-05, valid for life',
}

export const contact = {
  email: 'andrewyunev@gmail.com',
  mailto: 'mailto:andrewyunev@gmail.com',
  ctaLead: 'Есть задача?',
  ctaAccent: 'Давайте обсудим.',
  telegram: 'https://t.me/Andrewyunev',
  socials: [
    { label: 'Telegram', href: 'https://t.me/Andrewyunev' },
    { label: 'VK', href: 'https://vk.com/andrewyunev' },
    { label: 'MAX', href: 'https://max.ru/u/f9LHodD0cOLmKFCjGeOvUu6BhkT33DqLdWe3fGZqFr3lk_svf2Z7s2MHHmU' },
  ],
  credits: 'Сделано с вайбкодингом · Next.js + Claude Code',
}

export const statusLabel = { live: 'live', wip: 'в работе', concept: 'идея' } as const
