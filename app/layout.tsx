import type { Metadata } from 'next'
import { Bricolage_Grotesque, Manrope, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
})

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500'],
  display: 'swap',
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Андрей Юнев',
  jobTitle: 'Архитектор AI-систем',
  email: 'andrewyunev@gmail.com',
  url: 'https://portfolio-yunev.vercel.app',
  sameAs: [
    'https://github.com/andrewyu1985',
    'https://t.me/Andrewyunev',
    'https://vk.com/andrewyunev',
    'https://max.ru/u/f9LHodD0cOLmKFCjGeOvUu6BhkT33DqLdWe3fGZqFr3lk_svf2Z7s2MHHmU',
  ],
}

export const metadata: Metadata = {
  title: 'Андрей Юнев — AI-агенты и автоматизация',
  description: 'Портфолио: AI-оркестрация, автоматизация бизнес-процессов, Telegram-боты. 17+ лет в операционном управлении.',
  metadataBase: new URL('https://portfolio-yunev.vercel.app'),
  openGraph: {
    title: 'Андрей Юнев — AI-агенты и автоматизация',
    description: 'AI-агенты, автоматизация, MCP-интеграции, контент-пайплайны',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Андрей Юнев — портфолио' }],
    type: 'website',
    locale: 'ru_RU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Андрей Юнев — AI-агенты',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${bricolage.variable} ${manrope.variable} ${jetbrains.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
