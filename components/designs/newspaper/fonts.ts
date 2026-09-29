import { Libre_Franklin, Old_Standard_TT, PT_Serif } from 'next/font/google'

// Заголовки и маст-хед: Old Standard TT — цифровая версия «Обыкновенной»,
// книжно-газетной антиквы русских периодических изданий. В отличие от Playfair
// на больших оптических размерах, её тонкие штрихи кириллицы не пропадают
// («и», «н», «ц» читаются и на кегле 100 px), а знаки × и + нормальной толщины.
// Шрифт не вариативный: прямое начертание 400/700 и курсив 400.
// Полужирного курсива у гарнитуры нет, поэтому прямое и курсив — два объявления
// (запрос несуществующего 700 italic ломает загрузку).
export const display = Old_Standard_TT({
  variable: '--nw-display',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700'],
  style: 'normal',
  display: 'swap',
  preload: false,
})

export const displayItalic = Old_Standard_TT({
  variable: '--nw-display-i',
  subsets: ['latin', 'cyrillic'],
  weight: '400',
  style: 'italic',
  display: 'swap',
  preload: false,
})

// Текст колонок: PT Serif — русская текстовая антиква ParaType
export const text = PT_Serif({
  variable: '--nw-text',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  preload: false,
})

// Служебный газетный гротеск: выходные данные, указатель разделов, подписи
export const grot = Libre_Franklin({
  variable: '--nw-grot',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  preload: false,
})
