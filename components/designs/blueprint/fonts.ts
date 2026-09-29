import { Martian_Mono, Tektur, Caveat } from 'next/font/google'

// Чертёж: Martian Mono — основной набор (ось ширины: сжатый для текста и штампа),
// Tektur — «конструктивные» заголовки листа, Caveat — пометки красным карандашом.
// Проверено fontTools: у Martian Mono нет ↗ (стрелку рисуем SVG), у Tektur нет U+2011
// (им набираются только имя, заголовки и обозначения), у Caveat нет стрелок и U+2011.

export const mono = Martian_Mono({
  variable: '--bp-mono',
  subsets: ['latin', 'cyrillic', 'latin-ext'], // latin-ext — ради «₽»; грузится только по unicode-range
  axes: ['wdth'],
  display: 'swap',
  preload: false,
})

export const draft = Tektur({
  variable: '--bp-draft',
  subsets: ['latin', 'cyrillic'],
  axes: ['wdth'],
  display: 'swap',
  preload: false,
})

export const hand = Caveat({
  variable: '--bp-hand',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  preload: false,
})
