import { projects } from '@/data/projects'
import type { Project } from '@/types/project'

export const IMG = '/cinema/img'

export const person = {
  name: 'Андрей Юнев',
  role: 'Архитектор AI-систем',
  email: 'andrewyunev@gmail.com',
  telegram: 'https://t.me/Andrewyunev',
  vk: 'https://vk.com/andrewyunev',
  max: 'https://max.ru/u/f9LHodD0cOLmKFCjGeOvUu6BhkT33DqLdWe3fGZqFr3lk_svf2Z7s2MHHmU',
  photo: '/photo.jpg',
}

// Избранное для 3D-колоды: порядок — порядок появления из глубины.
const FEATURED: { id: string; img: string; line: string }[] = [
  { id: 'private-chat',       img: 'p-private-chat', line: 'Закрытый мессенджер: вход по приглашению, шифрование, бэкап в B2, переезд без потерь.' },
  { id: 'hermes-system',      img: 'p-hermes',       line: 'Автономный агент на сервере: 27 наборов навыков, 17 задач по расписанию, чинит себя сам.' },
  { id: 'ars-orchestrator',   img: 'p-ars',          line: '38 агентов проводят исследование от поиска до слепого рецензирования и LaTeX.' },
  { id: 'onv-montage',        img: 'p-onv',          line: 'Двухчасовой эфир превращается в ролики и 13 рилсов для четырёх площадок — в четырёх стилях оформления.' },
  { id: 'navigator-training', img: 'p-navigator',    line: 'Игра из десяти остановок с настоящими письменными упражнениями, 26 сборок.' },
  { id: 'second-brain-bot',   img: 'p-second-brain', line: 'Голосовое в Telegram становится структурированной заметкой в Obsidian.' },
  { id: 'verified-notes',     img: 'p-notes',        line: 'Конспект, где у каждого тезиса дословная цитата и страница: 2 586 цитат, 0 ненайденных.' },
  { id: 'pptx-design-system', img: 'p-pptx',         line: 'Генератор презентаций по бренд-буку: 37 типов экрана, 79 проверок на слайд.' },
]

export type FeaturedItem = { project: Project; img: string; line: string; n: string }

export const featured: FeaturedItem[] = FEATURED.flatMap(({ id, img, line }, i) => {
  const project = projects.find(p => p.id === id)
  return project ? [{ project, img: `${IMG}/${img}.jpg`, line, n: String(i + 1).padStart(2, '0') }] : []
})

export const galleryStrip = [
  { src: `${IMG}/g1.jpg`, alt: 'Бумажный кинопроектор', speed: -14 },
  { src: `${IMG}/g2.jpg`, alt: 'Бумажный замок и конверт', speed: 10 },
  { src: `${IMG}/g3.jpg`, alt: 'Раскрытая бумажная книга с закладками', speed: -6 },
  { src: `${IMG}/g4.jpg`, alt: 'Стая бумажных самолётов', speed: 16 },
  { src: `${IMG}/g5.jpg`, alt: 'Веер бумажных слайдов', speed: -10 },
  { src: `${IMG}/g6.jpg`, alt: 'Бумажная серверная стойка', speed: 8 },
]

// Факты — из карточек проектов, ничего сверх того, что уже есть на витрине.
export const facts = [
  { value: '2 586', label: 'цитат проверено в конспектах', note: 'ни одной ненайденной' },
  { value: '38', label: 'агентов в оркестраторе исследования', note: 'десять стадий, два гейта' },
  { value: '1:52:30', label: 'эфира на входе монтажёра', note: '13 рилсов на выходе' },
  { value: '27', label: 'наборов навыков у Hermes', note: 'работает 24/7 в мессенджере' },
  { value: '397', label: 'страниц книги из аудиокурса', note: '35 записей, 96 таймкодов сверены' },
  { value: '18/18', label: 'таблиц сверено при переезде чата', note: 'и 121 из 121 файла' },
  { value: '26', label: 'сборок игры «Навигатор»', note: 'десять остановок, платно с третьей' },
  { value: '37', label: 'типов экрана в дизайн-системе', note: 'до 109 фигур на слайде' },
  { value: '31', label: 'продукт в каталоге школы', note: 'фасетный поиск, 27 статей' },
]

export const archiveShots = [
  'private-chat', 'hermes-system', 'ars-orchestrator', 'onv-montage', 'navigator',
  'verified-notes', 'pptx-design-system', 'forum-video', 'audio-to-book', 'told-after-dark',
  'mira-vs-time', 'website-creation', 'uneversum-catalog', 'video-update', 'second-brain-bot',
].map(id => `/cinema/archive/${id}.jpg`)

export const aboutShots = [
  { src: `${IMG}/a1.jpg`, alt: 'Бумажная мастерская робототехники' },
  { src: `${IMG}/a2.jpg`, alt: 'Бумажный зрительный зал' },
  { src: `${IMG}/a3.jpg`, alt: 'Бумажный рабочий стол' },
]

export const timeline = [
  { year: '2013', text: 'Операционное управление коммерческой недвижимостью' },
  { year: '2015', text: '«Роботрек» — клуб робототехники, 150+ учеников в месяц, первое место на всероссийских соревнованиях' },
  { year: '2017', text: '«Юневерсум» — образовательный проект, аудитория 20 000+ человек' },
  { year: '2025', text: 'Первые AI-агенты и автоматизированные конвейеры' },
  { year: '2026', text: '«Гермес» — автономный агент, закрытый чат для клуба, 28 проектов на витрине' },
]

export const allProjects = projects
