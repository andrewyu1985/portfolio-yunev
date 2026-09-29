import type { Metadata } from 'next'
import { Prata, Onest } from 'next/font/google'
import './cinema.css'

// Шрифты только для этой версии: Prata — титры, Onest — текст. Оба с кириллицей.
const prata = Prata({
  variable: '--cn-display',
  subsets: ['latin', 'cyrillic'],
  weight: '400',
  display: 'swap',
})

const onest = Onest({
  variable: '--cn-body',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Андрей Юнев — кино-версия портфолио',
  description: 'Архитектор AI-систем. 32 проекта: агенты, автоматизация, видео, книги. Версия с 3D-прокруткой.',
  openGraph: {
    title: 'Андрей Юнев — архитектор AI-систем',
    description: '32 проекта: AI-агенты, автоматизация, видео, книги.',
    images: [{ url: '/cinema/img/hero.jpg', width: 2752, height: 1536, alt: 'Бумажная диорама города-системы' }],
    type: 'website',
    locale: 'ru_RU',
  },
}

export default function CinemaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`cn ${prata.variable} ${onest.variable}`}>
      {children}
    </div>
  )
}
