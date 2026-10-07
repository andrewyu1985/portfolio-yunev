import type { Metadata } from 'next'
import { Oranienbaum, Golos_Text } from 'next/font/google'
import './discs.css'

// Шрифты только этой версии: Oranienbaum — заголовки-титры, Golos Text — текст. Оба с кириллицей.
const oranienbaum = Oranienbaum({
  variable: '--dk-display',
  subsets: ['latin', 'cyrillic'],
  weight: '400',
  display: 'swap',
})

const golos = Golos_Text({
  variable: '--dk-body',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Андрей Юнев — портфолио на дисках',
  description: '28 проектов на дисках: агенты, исследования, приложения, видео, AI-креатор, инфраструктура. Листайте ряд, переворачивайте диски.',
  openGraph: {
    title: 'Андрей Юнев — портфолио на дисках',
    description: '28 проектов: AI-агенты, автоматизация, видео, книги.',
    type: 'website',
    locale: 'ru_RU',
  },
}

export default function DiscsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`dk-root ${oranienbaum.variable} ${golos.variable}`}>
      {children}
    </div>
  )
}
