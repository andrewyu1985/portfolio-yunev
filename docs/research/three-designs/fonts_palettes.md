# Кириллические шрифты Google Fonts (next/font/google, Next 16.2.4) и светлые палитры для восьми стилевых направлений портфолио

**Метод и обозначения (прочитать до таблиц).**
- **FD**: локальный [font-data.json из next 16.2.4](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/compiled/@next/font/dist/google/font-data.json). Это собственный список `next/font/google`: 1911 семейств, у 290 из них в `subsets` есть `cyrillic`. Всё, что указано ниже про веса, наклон и вариативные оси, взято из FD. Шрифта, которого нет в FD, next/font 16.2.4 не загрузит: валидатор бросает ошибку `Unknown font` ([validate-google-font-function-call.js](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/compiled/@next/font/dist/google/validate-google-font-function-call.js)).
- **GFM**: живые [метаданные Google Fonts](https://fonts.google.com/metadata/fonts), скачаны 29.09.2026. В них 1946 семейств и 294 с кириллицей. Отсюда взяты дизайнеры, даты добавления и категории.
- **Тест глифов**: собственная проверка через fontTools 4.62.1. Для каждого семейства я скачал TTF, который отдаёт CSS2 API (`https://fonts.googleapis.com/css2?family=…`, начертание по умолчанию), и проверил:
  - все 66 русских букв, включая Ёё;
  - знаки «» — – „ “ № ₽ … ’;
  - украинские ЄІЇҐ;
  - ширину (advance) «а» по сравнению с «a» в долях кегля, чтобы поймать «полноширинную» кириллицу японских шрифтов.

  Дополнительно я запросил CSS с User-Agent Chrome и убедился, что в нём есть блоки `/* cyrillic */`. Ссылки «тест» в тексте ведут на CSS-запрос соответствующего семейства. Пустое «нет» значит, что все проверенные символы на месте.
- Контраст считал сам по формуле относительной яркости WCAG 2.x, OKLCH пересчитывал сам (sRGB → OKLab). AA означает ≥4,5:1 для обычного текста, AA-large означает ≥3:1 (только крупный текст ≥24px или ≥18,66px жирный, а также элементы интерфейса).

---

## Сквозная проверка: какие модные шрифты НЕ имеют кириллицы или имеют дефектную (ловушка Space Grotesk)

### Takeaway
Многие популярные «дизайнерские» шрифты кириллицы не имеют вовсе: Space Grotesk/Mono, Bebas Neue, Archivo, Instrument Serif, Fraunces, Newsreader, VT323, Silkscreen и Syne. Ещё хуже те, у которых в метаданных кириллица есть, а на деле она дефектная. У **Pixelify Sans** нет заглавных **О и П**. У **DotGothic16**, Train One, Rampart One, Reggae One, Stick, Yomogi и Kosugi кириллица **полноширинная**: каждая буква шириной 1 em, латиница 0,5–0,6 em, и русский текст выглядит как набор «вразрядку». Кроме того, у многих дисплейных кириллических шрифтов нет **₽** и/или **№**.

### Cited Findings
- У Space Grotesk в FD `subsets` = latin, latin-ext, vietnamese, кириллицы нет. Тест: 0 кириллических кодпоинтов, в CSS нет блока cyrillic. Это и есть причина прошлого бага на сайте — [FD](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/compiled/@next/font/dist/google/font-data.json); [тест](https://fonts.googleapis.com/css2?family=Space+Grotesk)
- Нет кириллицы (FD, для многих ещё и GFM): Space Mono, VT323, Silkscreen, Jersey 10/15/20/25, Micro 5, Sixtyfour, Workbench, Kode Mono, Doto, Bytesized, всё семейство Bitcount, Bebas Neue, Anton, Archivo / Archivo Black / Archivo Narrow, IBM Plex Sans **Condensed**, Instrument Serif, Instrument Sans, Fraunces, Newsreader, Bodoni Moda, DM Serif Display, Abril Fatface, Libre Baskerville, Crimson Pro, Syne, Bricolage Grotesque, Hanken / Schibsted / Familjen / Host / Darker Grotesque, Epilogue, Outfit, Sora, Figtree, Plus Jakarta Sans, все Lexend, Red Hat Display/Text/Mono, Chakra Petch, Oxanium, Orbitron, Saira, Share Tech Mono, Major Mono Display, Courier Prime, Special Elite, Azeret Mono, Chivo Mono, Spline Sans Mono, Caveat Brush, Permanent Marker, Gloria Hallelujah, Rock Salt — [FD](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/compiled/@next/font/dist/google/font-data.json); [GFM](https://fonts.google.com/metadata/fonts)
- **Pixelify Sans** указан в FD с `cyrillic`, но в cyrillic-woff2 для весов 400 и 700 нет U+041E «О» и U+041F «П». Кроме того, нет «І» и «₽» — [тест](https://fonts.googleapis.com/css2?family=Pixelify+Sans). Баг подтверждён в трекере Google Fonts: «not only are the Cyrillic letters О and П missing, but also the uppercase Greek letters Δ and Ω» — [google/fonts#9392](https://github.com/google/fonts/issues/9392)
- У японских шрифтов DotGothic16, Train One, Rampart One, Reggae One, Stick, Yomogi и Kosugi ширина «а» = 1,0 em при латинской «a» ≈0,5–0,61 em. В них только 66 базовых русских букв, украинских нет, у Kosugi нет даже «» и —. Zen Kaku Gothic New из этого ряда пропорциональный (0,535 em) — [тест DotGothic16](https://fonts.googleapis.com/css2?family=DotGothic16); [тест Train One](https://fonts.googleapis.com/css2?family=Train+One); [тест Kosugi](https://fonts.googleapis.com/css2?family=Kosugi)
- **Кириллических блэклеттеров в Google Fonts нет.** У UnifrakturMaguntia, UnifrakturCook, Pirata One, Grenze, Texturina, Fruktur, Jacquard 12, Jacquarda Bastarda 9, Germania One, New Rocker, Metal Mania, MedievalSharp и Uncial Antiqua кириллицы нет ни в GFM, ни в FD. «Grenze Gothic» в FD отсутствует вовсе — [GFM](https://fonts.google.com/metadata/fonts); [FD](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/compiled/@next/font/dist/google/font-data.json)
- Есть в живом Google Fonts с кириллицей, но нет в FD Next 16.2.4, а значит, через next/font/google не загрузить: Akt, Finlandica Headline, Finlandica Text, Iosevka Charon, Iosevka Charon Mono, Pliant. У Climate Crisis в GFM кириллица есть, а в FD нет — [GFM](https://fonts.google.com/metadata/fonts) против [FD](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/compiled/@next/font/dist/google/font-data.json)
- Знак ₽ (U+20BD) лежит в подмножестве **latin-ext** (диапазон `U+20AD-20C0`), № (U+2116) — в **cyrillic**, «» и тире — в **latin** — [CSS2 Playfair](https://fonts.googleapis.com/css2?family=Playfair)
- next/font скачивает все файлы шрифта из CSS, а `subsets` задаёт только то, что **предзагружать** (комментарий в коде: «provide the array of subsets we want to preload if preloading is enabled») — [loader.js](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/compiled/@next/font/dist/google/loader.js)
- Сейчас сайт грузит `Unbounded, Manrope, JetBrains_Mono` из `next/font/google` — [layout.tsx](file:///C:/Users/andre/portfolio-yunev/app/layout.tsx)

### Inferences
- Одного флага `subsets` содержит `cyrillic` мало. Для финального выбора нужен тест на глифы. Для любого нового шрифта стоит прогнать хотя бы строку «ПОРТФОЛИО Проекты № 1 — «ИИ» 1 000 ₽ ё Ё». Pixelify Sans этот тест не проходит на первом же слове.
- Для каждого семейства в next/font указывать `subsets: ['latin', 'cyrillic']`. Если ₽ стоит на первом экране, добавить `'latin-ext'`. Без него ₽ всё равно подгрузится по unicode-range, просто без предзагрузки.
- Японские гротески с полноширинной кириллицей для русского текста не годятся вообще, даже как дисплейные.

### Gaps
- Размер 94–104 кириллических кодпоинта у многих дисплейных шрифтов означает только базовую кириллицу. На русском это не сказывается, но для казахского, сербского и других языков покрытия может не хватить. Эти языки не проверялись.
- Тест смотрел только начертание по умолчанию. Для вариативных шрифтов это корректно, потому что cmap общий. Для статических семейств жирные начертания могут отличаться, отдельно проверен только Pixelify 400/700.

---

## Редакционный / газетный стиль (broadsheet): кириллические антиквы для заголовков и текста, «Известия»/«Коммерсантъ», маст-хед

### Takeaway
Главный кандидат для заголовков — **Playfair (v2)**. У него кириллица и cyrillic-ext, оси wght 300–900, wdth 87,5–112,5 и opsz 5–**1200**, полный набор знаков, включая ₽ и №. На opsz около 1200 контраст максимальный, это газетная «иголка». Самый аутентичный «русский» вариант — **Old Standard TT**: это прямое цифровое воплощение гарнитуры Обыкновенной, стандартной книжно-газетной антиквы начала XX века. Для узких заголовков подходит **Noto Serif Display** (wdth 62,5–100). Для текста — PT Serif, Literata, Source Serif 4 или Spectral. Кириллического блэклеттера для маст-хеда нет. Альтернативы — «древнерусские» Ruslan Display и Monomakh, но они уводят в стилистику «летописи», а не газеты.

### Cited Findings
**Дисплейные антиквы (заголовки, маст-хед):**
- **Playfair**: веса 300–900 (variable) + italic, оси `opsz 5–1200`, `wdth 87.5–112.5`, `wght 300–900`, подмножества cyrillic и cyrillic-ext — [FD](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/compiled/@next/font/dist/google/font-data.json). Тест: 124 кириллических кодпоинта, все символы на месте, включая ₽ и № — [тест](https://fonts.googleapis.com/css2?family=Playfair). Дизайнер Claus Eggers Sørensen, в GF с 12.04.2023 — [GFM](https://fonts.google.com/metadata/fonts). Ось оптического размера идёт «from the extremely small Agate (5pt) to the extremely big Needlepoint (1200pt)… the Needlepoint is as high contrast as practically possible» — [ARTICLE](https://raw.githubusercontent.com/google/fonts/main/ofl/playfair/article/ARTICLE.en_us.html)
- **Playfair Display**: 400–900 (variable, wght) + italic. **Нет ₽** — [FD](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/compiled/@next/font/dist/google/font-data.json); [тест](https://fonts.googleapis.com/css2?family=Playfair+Display). Playfair Display SC: 400/700/900 + italic, тоже без ₽ — [тест](https://fonts.googleapis.com/css2?family=Playfair+Display+SC)
- **Old Standard TT** (Alexey Kryukov): только 400 и 700 + italic, **не вариативный**. Тест: 218 кодпоинтов, все символы — [FD](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/compiled/@next/font/dist/google/font-data.json); [тест](https://fonts.googleapis.com/css2?family=Old+Standard+TT). Из описания: «reproduces a specific type of Modern (classicist) style… very commonly used in… the late 19th and early 20th century… The name "Old Standard" was selected as opposed to the "Obyknovennaya Novaya" ("New Standard") typeface, widely used in Soviet typography» — [DESCRIPTION](https://raw.githubusercontent.com/google/fonts/main/ofl/oldstandardtt/DESCRIPTION.en_us.html). Журнал «Шрифт» прямо называет цифровыми версиями гарнитуры Обыкновенной «New Standard (ParaType), Old Standard (дизайнер А. Крюков)» — [typejournal.ru](https://typejournal.ru/articles/ost-1337)
- Исторический контекст: «Новой газетной гарнитурой» набирался текст многих советских газет, «за исключением центральных» — [Шицгал, «Русский типографский шрифт»](https://press-book.ru/library/books/ShitsgalAG-1985/ch4110.html)
- **Noto Serif Display**: 100–900 + italic, оси `wdth 62.5–100` и `wght 100–900`. Тест: 304 кодпоинта, все символы — [FD](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/compiled/@next/font/dist/google/font-data.json); [тест](https://fonts.googleapis.com/css2?family=Noto+Serif+Display)
- **Oranienbaum** (Oleg Pospelov, Jovanny Lemonad): только 400, **нет ₽**. Из описания: «modern high contrast Antiqua… Based on… Bodoni, Oranienbaum is typical of the typefaces from the first quarter of the 20th century» — [DESCRIPTION](https://raw.githubusercontent.com/google/fonts/main/ofl/oranienbaum/DESCRIPTION.en_us.html); [тест](https://fonts.googleapis.com/css2?family=Oranienbaum)
- **Prata** (Cyreal, Ivan Petrov): только 400, **нет № и …**. «Elegant Didone… will work best in display sizes» — [DESCRIPTION](https://raw.githubusercontent.com/google/fonts/main/ofl/prata/DESCRIPTION.en_us.html); [тест](https://fonts.googleapis.com/css2?family=Prata)
- **Yeseva One** (Jovanny Lemonad): только 400, все символы. Автор описывает его как «a serif display type that is very feminine» — [DESCRIPTION](https://raw.githubusercontent.com/google/fonts/main/ofl/yesevaone/DESCRIPTION.en_us.html); [тест](https://fonts.googleapis.com/css2?family=Yeseva+One)
- **Libertinus Serif Display**: только 400, нет ₽. Libertinus Serif: 400/600/700 + italic. Это форк Linux Libertine для научных изданий с кириллицей — [ARTICLE](https://raw.githubusercontent.com/google/fonts/main/ofl/libertinusserifdisplay/article/ARTICLE.en_us.html); [тест](https://fonts.googleapis.com/css2?family=Libertinus+Serif+Display)

**Замена маст-хеда (блэклеттера с кириллицей нет, см. сквозной раздел):**
- **Ruslan Display**: 400, 94 кодпоинта, нет ₽. «Based on a 1970s typeface made by Ukrainian designer Oleg Snarsky, which evokes the ustav and semiustav styles of the 11th–16th centuries» — [DESCRIPTION](https://raw.githubusercontent.com/google/fonts/main/ofl/ruslandisplay/DESCRIPTION.en_us.html); [тест](https://fonts.googleapis.com/css2?family=Ruslan+Display)
- **Monomakh** (Aleksandr Andreev, Nikita Simmons; в GF с 2025-02-11): 400, нет ₽. «A Cyrillic font implemented in a mixed ustav/poluustav style… for… Slavic history and philology» — [DESCRIPTION](https://raw.githubusercontent.com/google/fonts/main/ofl/monomakh/DESCRIPTION.en_us.html); [GFM](https://fonts.google.com/metadata/fonts); [тест](https://fonts.googleapis.com/css2?family=Monomakh)
- **Triodion** и **Pochaevsk**: церковнославянские шрифты в стиле синодальных изданий. У Triodion нет № ₽ Ґ — [Triodion](https://raw.githubusercontent.com/google/fonts/main/ofl/triodion/DESCRIPTION.en_us.html); [Pochaevsk](https://raw.githubusercontent.com/google/fonts/main/ofl/pochaevsk/DESCRIPTION.en_us.html); [тест Triodion](https://fonts.googleapis.com/css2?family=Triodion)

**Текстовые антиквы (у всех полный набор символов по тесту):**
- **PT Serif**: 400/700 + italic, 220 кодпоинтов. PT Serif Caption: 400 + italic — [FD](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/compiled/@next/font/dist/google/font-data.json); [тест](https://fonts.googleapis.com/css2?family=PT+Serif)
- **Literata**: 200–900 + italic, `opsz 7–72` — [тест](https://fonts.googleapis.com/css2?family=Literata)
- **Source Serif 4**: 200–900 + italic, `opsz 8–60` — [тест](https://fonts.googleapis.com/css2?family=Source+Serif+4)
- **Merriweather**: 300–900 + italic, `opsz 18–144`, `wdth 87–112` — [тест](https://fonts.googleapis.com/css2?family=Merriweather)
- **Spectral**: 200–800 + italic, статический — [тест](https://fonts.googleapis.com/css2?family=Spectral)
- **Brygada 1918**: 400–700 + italic — [тест](https://fonts.googleapis.com/css2?family=Brygada+1918)
- **Tinos**: 400/700 + italic, метрика Times — [тест](https://fonts.googleapis.com/css2?family=Tinos)
- Lora (400–700), Alegreya (400–900), EB Garamond (400–800), Vollkorn (400–900), Bona Nova (400/700) — все с italic и полным набором символов. Все значения — [FD](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/compiled/@next/font/dist/google/font-data.json)

**Газетные гротески для рубрик и подписей:**
- **News Cycle** (Nathan Willis): 400/700 без italic, **нет № и ₽**. «Revival of the 1908-era News Gothic, the stalwart newspaper face» — [DESCRIPTION](https://raw.githubusercontent.com/google/fonts/main/ofl/newscycle/DESCRIPTION.en_us.html); [тест](https://fonts.googleapis.com/css2?family=News+Cycle). В описании кириллица значится как «soon», хотя фактически в шрифте 256 кириллических кодпоинтов: описание устарело.
- **Libre Franklin** (Impallari Type): 100–900 + italic, cyrillic и cyrillic-ext, все символы — [FD](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/compiled/@next/font/dist/google/font-data.json); [тест](https://fonts.googleapis.com/css2?family=Libre+Franklin)
- **Oswald** (кириллица от Cyreal): 200–700, все символы — [тест](https://fonts.googleapis.com/css2?family=Oswald)

### Inferences
- Для ощущения «Коммерсантъ» или «Известия» нужна высококонтрастная дидона или «Обыкновенная». Вариант 1: Playfair wght 800–900 на opsz 700–1200 для заголовков и маст-хеда. Вариант 2: Old Standard TT Bold. Текст — PT Serif или Literata в две-три колонки. Рубрики и кикеры — Libre Franklin капсом с разрядкой. Даты — IBM Plex Mono.
- В next/font у Playfair нужно явно указать `axes: ['opsz','wdth']`. Без этого оси не попадут в CSS, а opsz — главная причина его выбирать. Имя импорта — `Playfair` (не путать с `Playfair_Display`).
- Prata и Oranienbaum годятся только для заголовков без «№», «…» и «₽», иначе будет подмена глифа.
- Ruslan Display и Monomakh задают стилистику «былины» или «летописи», а не газеты. Их можно использовать как ироничный маст-хед, но это другой жанр.

### Gaps
- Реальные гарнитуры маст-хедов «Коммерсанта» и «Известий» не проверены: надёжного источника в рамках бюджета не нашлось.
- Качество рисунка отдельных кириллических знаков (Д, Л, Ф, ж) визуально не оценивалось, только покрытие и метрика. Экспертных разборов кириллицы Playfair и Old Standard не нашёл.

---

## Ретро-ОС / пиксельный интерфейс (Mac OS classic, Windows 95, pixel UI)

### Takeaway
Кириллические пиксельные шрифты, прошедшие тест: **Tiny5**, **Press Start 2P**, **Handjet** и **Rubik Pixels**. **Pixelify Sans** (нет О/П) и **DotGothic16** (полноширинная кириллица) — ловушки. У VT323, Silkscreen, Jersey, Micro 5, Sixtyfour, Workbench и Kode Mono кириллицы нет. Аналога Chicago, Charcoal или MS Sans Serif с кириллицей в Google Fonts нет. Системную оболочку придётся собирать из пиксельного шрифта для заголовков и меню плюс обычного гротеска или моноширинного шрифта для текста.

### Cited Findings
- **Tiny5** (Stefan Schmidt, 2024): 400, cyrillic и cyrillic-ext, 178 кодпоинтов, все символы, «а» = 0,5 em — [FD](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/compiled/@next/font/dist/google/font-data.json); [тест](https://fonts.googleapis.com/css2?family=Tiny5). «A variable-width, 5-pixel font… inspired by the graphing calculators and digital gadgets of the 1980s-90s… supports… Cyrillic Core and Cyrillic Plus» — [ARTICLE](https://raw.githubusercontent.com/google/fonts/main/ofl/tiny5/article/ARTICLE.en_us.html)
- **Press Start 2P** (CodeMan38): 400, 184 кодпоинта, все символы. Все глифы шириной 1,0 em, то есть он моноширинный и широкий — [тест](https://fonts.googleapis.com/css2?family=Press+Start+2P). «Based on the font design from 1980s Namco arcade games. It works best at sizes of 8px, 16px and other multiples of 8… includes… Greek and Cyrillic» — [DESCRIPTION](https://raw.githubusercontent.com/google/fonts/main/ofl/pressstart2p/DESCRIPTION.en_us.html)
- **Handjet** (Rosetta, David Březina): 100–900 (variable), оси `ELSH 0–16` (форма элемента) и `ELGR 1–2` (сетка элементов), 182 кодпоинта, все символы — [FD](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/compiled/@next/font/dist/google/font-data.json); [тест](https://fonts.googleapis.com/css2?family=Handjet). «Element-based variable font (aka pixel font…)… Each element can take one of 23 shapes… Due to rendering issues specific to Mac OS, the font may show aberrations and visual artifacts» — [DESCRIPTION](https://raw.githubusercontent.com/google/fonts/main/ofl/handjet/DESCRIPTION.en_us.html)
- **Rubik Pixels** (NaN, Luke Prowse): 400, 182 кодпоинта, все символы. Сгенерирован скриптом-фильтром из Rubik — [DESCRIPTION](https://raw.githubusercontent.com/google/fonts/main/ofl/rubikpixels/DESCRIPTION.en_us.html); [тест](https://fonts.googleapis.com/css2?family=Rubik+Pixels)
- **DotGothic16** (Fontworks): «based on the old 16x16 Gothic bitmap font» — [DESCRIPTION](https://raw.githubusercontent.com/google/fonts/main/ofl/dotgothic16/DESCRIPTION.en_us.html). Но кириллица в нём полноширинная (1,0 em против 0,5 em у латиницы), только 66 букв, нет ₽ и украинских букв — [тест](https://fonts.googleapis.com/css2?family=DotGothic16)
- **Pixelify Sans**: нет «О» и «П» — [google/fonts#9392](https://github.com/google/fonts/issues/9392); [тест](https://fonts.googleapis.com/css2?family=Pixelify+Sans)
- Без кириллицы: VT323, Silkscreen, Jersey 10, Micro 5, Sixtyfour, Workbench, Kode Mono, Doto, Bytesized, Bitcount — [FD](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/compiled/@next/font/dist/google/font-data.json); [GFM](https://fonts.google.com/metadata/fonts)
- «Системные» спутники с кириллицей. **Arimo**: 400–700 + italic, 304 кодпоинта, «metrically compatible with Arial™» — [DESCRIPTION](https://raw.githubusercontent.com/google/fonts/main/ofl/arimo/DESCRIPTION.en_us.html); [тест](https://fonts.googleapis.com/css2?family=Arimo). **Cascadia Code** «originated from the Windows Terminal project as a replacement for Consolas… Cyrillic» — [ARTICLE](https://raw.githubusercontent.com/google/fonts/main/ofl/cascadiacode/article/ARTICLE.en_us.html)

### Inferences
- Схема для Windows 95: заголовки окон и меню набрать Tiny5, кегль кратен сетке шрифта. Крупные «экранные» надписи — Press Start 2P на 16, 24 или 32px. Текст внутри окон — Arimo или IBM Plex Sans, они близки к «системному» гротеску Arial/Tahoma. Консольные вставки — Cascadia Code или IBM Plex Mono.
- Схема для Mac OS classic: Chicago-подобного шрифта с кириллицей нет. Ближе всего Tiny5 или Handjet (ELSH 0, квадратные элементы) для меню. Текст — Geneva-подобный гротеск, например Arimo или Golos Text.
- Press Start 2P очень широкий (1 em на знак), поэтому длинные русские слова («Портфолио», «Интеграции») на 390px переполнят строку. Использовать только для коротких ярлыков.
- Handjet стоит проверить на macOS вживую до выбора: производитель предупреждает об артефактах.

### Gaps
- Chicago, Charcoal, Geneva и MS Sans Serif с кириллицей в Google Fonts не найдены. Точное попадание возможно только через `next/font/local`, а это вне ограничения задачи.
- Не проверено, как пиксельные шрифты рендерятся с антиалиасингом в Chrome и Safari на дробных кеглях.

---

## Необрутализм и швейцарский стиль: гротески с кириллицей

### Takeaway
Для **Swiss** есть неогротески с отличной кириллицей: **Inter / Inter Tight**, **Arimo** (метрика Arial/Helvetica), **Golos Text** (ParaType), **Onest** и **IBM Plex Sans** с осью ширины 75–100. Семейство IBM Plex Sans Condensed кириллицы НЕ имеет, но ось wdth её заменяет. Для **необрутализма**: **Dela Gothic One**, **Science Gothic** (возрождение Bank Gothic с осями ширины 50–200 и контраста, расширенная кириллица, новинка 2025 года), Rubik Mono One, Russo One, Days One, Tektur, Stalinist One, Oi и Alumni Sans. Unbounded уже используется на текущем сайте. Bebas Neue, Archivo и Anton — без кириллицы. Их кириллические замены — Oswald, Alumni Sans и Fira Sans Extra Condensed.

### Cited Findings
**Swiss / неогротески (у всех полный набор символов по тесту, если не указано иное):**
- **Inter**: 100–900 + italic, `opsz 14–32`, 249 кодпоинтов. **Inter Tight**: 100–900 + italic, «specialized version of Inter with tighter spacing, for display usage» — [FD](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/compiled/@next/font/dist/google/font-data.json); [DESCRIPTION Inter Tight](https://raw.githubusercontent.com/google/fonts/main/ofl/intertight/DESCRIPTION.en_us.html); [тест](https://fonts.googleapis.com/css2?family=Inter+Tight)
- **Golos Text** (Alexandra Korolkova, Vitaly Kuzmin): 400–900, без italic. «Commissioned by Smena and AIC Media for state and social service websites… released by Paratype in 2019» — [DESCRIPTION](https://raw.githubusercontent.com/google/fonts/main/ofl/golostext/DESCRIPTION.en_us.html); [тест](https://fonts.googleapis.com/css2?family=Golos+Text)
- **Onest** (Dmitri Voloshin, Andrey Kudryavtsev): 100–900, без italic. «A hybrid of geometric and humanistic grotesques… character sets… for a range of closed and semi-closed apertures» — [ARTICLE](https://raw.githubusercontent.com/google/fonts/main/ofl/onest/article/ARTICLE.en_us.html); [тест](https://fonts.googleapis.com/css2?family=Onest)
- **IBM Plex Sans**: 100–700 + italic, `wdth 75–100`. **IBM Plex Sans Condensed** — без кириллицы — [FD](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/compiled/@next/font/dist/google/font-data.json); [тест](https://fonts.googleapis.com/css2?family=IBM+Plex+Sans)
- **Geologica** (Monokrom, Sindre Bremnes, Frode Helland): 100–900, оси `CRSV 0–1`, `SHRP 0–100`, `slnt −12–0` — [FD](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/compiled/@next/font/dist/google/font-data.json); [GFM](https://fonts.google.com/metadata/fonts)
- **Roboto Flex**: 100–1000, 13 осей, включая `wdth 25–151`, `opsz 8–144`, `GRAD`. **Commissioner**: 100–900, `FLAR`, `VOLM`, `slnt`. **Wix Madefor Display** (Dalton Maag): 400–800 — [FD](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/compiled/@next/font/dist/google/font-data.json)
- Узкие: **Roboto Condensed** (100–900 + italic) и **Fira Sans Extra Condensed** (100–900 + italic, 288 кодпоинтов). **Sofia Sans Extra Condensed** (1–1000) — **без ₽**. **Alumni Sans** (100–900 + italic; нет Ґ) — «originally inspired by the black face Impact» — [DESCRIPTION](https://raw.githubusercontent.com/google/fonts/main/ofl/alumnisans/DESCRIPTION.en_us.html); [тест Sofia](https://fonts.googleapis.com/css2?family=Sofia+Sans+Extra+Condensed)

**Необрутализм (дисплейные):**
- **Science Gothic** (Thomas Phinney, Vassil Kateliev, Brandon Buerkle; в GF с 19.11.2025): 100–900, оси `wdth 50–200`, `wght 100–900`, `CTRS 0–85` (контраст), `slnt −10–0`. Тест: 182 кодпоинта, все символы — [FD](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/compiled/@next/font/dist/google/font-data.json); [GFM](https://fonts.google.com/metadata/fonts); [тест](https://fonts.googleapis.com/css2?family=Science+Gothic). «Closely modeled on Morris Fuller Benton's Bank Gothic (1930–34)… adds a lowercase, true small caps, extensive language coverage (extended Latin and extended Cyrillic)» — [ARTICLE](https://raw.githubusercontent.com/google/fonts/main/ofl/sciencegothic/article/ARTICLE.en_us.html); [Phinney on Fonts](https://www.thomasphinney.com/2019/07/bank-gothic-variable-designer/)
- **Dela Gothic One** (artakana): 400, 96 кодпоинтов, **нет ₽**. «A flat, very thick Gothic body… ideal for use on posters» — [DESCRIPTION](https://raw.githubusercontent.com/google/fonts/main/ofl/delagothicone/DESCRIPTION.en_us.html); [тест](https://fonts.googleapis.com/css2?family=Dela+Gothic+One)
- **Rubik Mono One** (Hubert & Fischer): 400, **нет ₽**. «A monospaced sister of the Black roman style in the Rubik family» — [DESCRIPTION](https://raw.githubusercontent.com/google/fonts/main/ofl/rubikmonoone/DESCRIPTION.en_us.html); [тест](https://fonts.googleapis.com/css2?family=Rubik+Mono+One)
- **Russo One** и **Days One** (Jovanny Lemonad): по 400, обе **без ₽** — [тест Russo](https://fonts.googleapis.com/css2?family=Russo+One); [тест Days](https://fonts.googleapis.com/css2?family=Days+One)
- **Tektur** (Adam Jagosz): 400–900, `wdth 75–100`, все символы. «Octagonal outlines and rectangular counters» — [DESCRIPTION](https://raw.githubusercontent.com/google/fonts/main/ofl/tektur/DESCRIPTION.en_us.html); [тест](https://fonts.googleapis.com/css2?family=Tektur)
- **Stalinist One** (Alexey Maslov, Jovanny Lemonad): 400, нет ₽, очень широкий («a» = 1,075 em). «Typeface for a post-apocalyptic time» — [DESCRIPTION](https://raw.githubusercontent.com/google/fonts/main/ofl/stalinistone/DESCRIPTION.en_us.html); [тест](https://fonts.googleapis.com/css2?family=Stalinist+One)
- **Kelly Slab** (Denis Masharov): 400, нет ₽. Геометрический брусковый шрифт «under the influence of… 1930s… "City" by Georg Trump» — [DESCRIPTION](https://raw.githubusercontent.com/google/fonts/main/ofl/kellyslab/DESCRIPTION.en_us.html)
- **Oi**: 400, все символы, ультражирный («ж» = 1,58 em). **Kablammo**: 400 + ось `MORF 0–60`, только заглавные (строчные коды указывают на те же глифы). **Seymour One**: 400, нет ₽ — [тест Oi](https://fonts.googleapis.com/css2?family=Oi); [тест Kablammo](https://fonts.googleapis.com/css2?family=Kablammo)
- **Unbounded** (Studio Koto, NaN): 200–900, «Latin and Cyrillic scripts with over 1300 individual glyphs» — [DESCRIPTION](https://raw.githubusercontent.com/google/fonts/main/ofl/unbounded/DESCRIPTION.en_us.html)

### Inferences
- **Swiss**: крупные заголовки Inter Tight 700–800 с отрицательным трекингом, текст Inter или Golos Text, флаг-лейблы IBM Plex Mono. Если нужен «Helvetica-вкус», подойдёт Arimo, но у него всего 400–700. Узкий Swiss-плакат: IBM Plex Sans на wdth 75 или Roboto Condensed.
- **Необрутализм**: самый свежий и редкий выбор — Science Gothic на wdth 150–200 и wght 800–900 (в GFM он на месте #1164 по популярности, то есть неизбитый). Также подойдёт Dela Gothic One, текст Onest или Golos, метки Martian Mono. В next/font у Science Gothic объявить `axes: ['wdth','CTRS']`.
- Unbounded уже задействован в текущем дизайне. Для «радикально другого» дизайна его лучше не повторять.

### Gaps
- Нет сравнительных экспертных оценок качества кириллицы у Inter, Onest и Golos: источники не найдены, вывод о «хорошей кириллице» основан только на покрытии.

---

## Моноширинные для чертежа (blueprint) и светлого терминала (CLI)

### Takeaway
С кириллицей и полным набором символов: **JetBrains Mono** (уже на сайте), **IBM Plex Mono**, **Fira Code**, **PT Mono**, **Martian Mono** (оси ширины 75–112,5 и веса), **Geist Mono**, **Cascadia Code/Mono**, **Lilex**, **Source Code Pro**, **Noto Sans Mono** (wdth 62,5–100) и **Overpass Mono**. Без ₽: Ubuntu Mono, Roboto Mono и Anonymous Pro. Victor Mono — без № и ₽. **Space Mono кириллицы не имеет вовсе** (ловушка, как Space Grotesk).

### Cited Findings
- **JetBrains Mono**: 100–800 + italic, 98 кодпоинтов, все символы — [FD](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/compiled/@next/font/dist/google/font-data.json); [тест](https://fonts.googleapis.com/css2?family=JetBrains+Mono)
- **IBM Plex Mono**: 100–700 + italic, статический, 168 кодпоинтов, все символы — [тест](https://fonts.googleapis.com/css2?family=IBM+Plex+Mono)
- **Fira Code**: 300–700 (variable), без italic, 288 кодпоинтов, все символы — [тест](https://fonts.googleapis.com/css2?family=Fira+Code)
- **PT Mono**: только 400, все символы — [тест](https://fonts.googleapis.com/css2?family=PT+Mono)
- **Martian Mono** (Roman Shamin, Evil Martians): 100–800, `wdth 75–112.5`, 84 кодпоинта, все символы, знак шириной 0,7 em. «Inherits Grotesk's brutal and eye-catching aesthetics… In January 2023, the basic Cyrillic script is added… Ukrainian, Belarusian, and Russian» — [DESCRIPTION](https://raw.githubusercontent.com/google/fonts/main/ofl/martianmono/DESCRIPTION.en_us.html); [тест](https://fonts.googleapis.com/css2?family=Martian+Mono)
- **Geist Mono**: 100–900, подмножества cyrillic и latin (без cyrillic-ext), 134 кодпоинта, все символы — [FD](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/compiled/@next/font/dist/google/font-data.json)
- **Cascadia Code / Cascadia Mono**: 200–700 + italic, все символы, в GF с 2025 года — [GFM](https://fonts.google.com/metadata/fonts); [ARTICLE](https://raw.githubusercontent.com/google/fonts/main/ofl/cascadiacode/article/ARTICLE.en_us.html)
- **Lilex** (в числе авторов Mike Abbink, Mikhael Khrustik; в GF с 2025-12-08): 100–700 + italic, 194 кодпоинта, все символы — [GFM](https://fonts.google.com/metadata/fonts); [тест](https://fonts.googleapis.com/css2?family=Lilex)
- **Noto Sans Mono**: 100–900, `wdth 62.5–100`, 304 кодпоинта. **Source Code Pro**: 200–900 + italic. **Overpass Mono**: 300–700. **Ubuntu Sans Mono**: 400–700 + italic. У всех все символы — [FD](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/compiled/@next/font/dist/google/font-data.json)
- Нет ₽: **Ubuntu Mono** (к тому же узкий, 0,5 em), **Roboto Mono**, **Anonymous Pro**. У **Victor Mono** нет № и ₽ — [тест Ubuntu Mono](https://fonts.googleapis.com/css2?family=Ubuntu+Mono); [тест Victor](https://fonts.googleapis.com/css2?family=Victor+Mono)
- Без кириллицы: Space Mono, VT323, Share Tech Mono, Major Mono Display, Syne Mono, Xanh Mono, Cutive Mono, Courier Prime, Special Elite, Red Hat Mono, Azeret Mono, Chivo Mono, Reddit Mono, Sometype Mono, Spline Sans Mono, B612 Mono, Atkinson Hyperlegible Mono, Kode Mono, M PLUS 1 Code — [FD](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/compiled/@next/font/dist/google/font-data.json)

### Inferences
- **Blueprint**: основной шрифт — Martian Mono. Ось wdth 75 даёт «чертёжную» сжатость для штампа, 112,5 — широкие размерные подписи. Заголовки листа — Tektur или Science Gothic. Рукописные пометки — Caveat или Shantell Sans.
- **Светлый терминал**: чтобы визуально отличаться от текущего сайта на JetBrains Mono, взять IBM Plex Mono (классика IBM), Cascadia Code (эстетика Windows Terminal) или Fira Code (лигатуры).
- ГОСТ-овского «чертёжного шрифта» (тип Б) в GF нет. Тот же эффект дают Tektur с его «конструктивным» рисунком или сжатый Martian/Noto Sans Mono.

### Gaps
- Шрифт по ГОСТ 2.304 (ISO 3098) с кириллицей в Google Fonts не найден.

---

## Рукописные и маркерные шрифты с кириллицей для пометок

### Takeaway
Лучший универсальный вариант — **Caveat**: 400–700 (variable), 236 кодпоинтов, есть ₽ и №. Для «маркера» с характером подходит **Shantell Sans** с осями INFM «неформальность», BNCE «прыгучесть» и SPAC. Из рукописных есть также Pangolin, Bad Script и Playpen Sans. Neucha и Marck Script без ₽. Amatic SC очень узкий. Comfortaa и Kurale — не рукописные.

### Cited Findings
- **Caveat** (Impallari Type): 400–700, cyrillic и cyrillic-ext, все символы — [FD](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/compiled/@next/font/dist/google/font-data.json); [тест](https://fonts.googleapis.com/css2?family=Caveat). Caveat Brush кириллицы не имеет — [FD](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/compiled/@next/font/dist/google/font-data.json)
- **Shantell Sans** (Shantell Martin, Arrow Type, Anya Danilova): 300–800 + italic, оси `BNCE −100–100`, `INFM 0–100`, `SPAC 0–100`, все символы — [FD](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/compiled/@next/font/dist/google/font-data.json); [GFM](https://fonts.google.com/metadata/fonts); [тест](https://fonts.googleapis.com/css2?family=Shantell+Sans)
- **Playpen Sans** (TypeTogether, в команде Vera Evstafieva): 100–800, все символы — [GFM](https://fonts.google.com/metadata/fonts); [тест](https://fonts.googleapis.com/css2?family=Playpen+Sans)
- **Pangolin** (Kevin Burke): 400, 182 кодпоинта, все символы. **Bad Script** (Gaslight): 400, 198 кодпоинтов, все символы — [тест Pangolin](https://fonts.googleapis.com/css2?family=Pangolin); [тест Bad Script](https://fonts.googleapis.com/css2?family=Bad+Script)
- **Neucha** (Jovanny Lemonad) и **Marck Script** (Denis Masharov): по 400, **без ₽** — [тест Neucha](https://fonts.googleapis.com/css2?family=Neucha); [тест Marck](https://fonts.googleapis.com/css2?family=Marck+Script)
- **Amatic SC**: 400/700, 98 кодпоинтов, все символы, очень узкий («а» = 0,313 em) — [тест](https://fonts.googleapis.com/css2?family=Amatic+SC)
- **Balsamiq Sans** (400/700 + italic): нет № и ₽. **Comic Relief** (400/700): нет ₽ — [тест Balsamiq](https://fonts.googleapis.com/css2?family=Balsamiq+Sans)
- **Kurale** (Eduardo Tunni) в GFM относится к категории Serif, а не Handwriting — [GFM](https://fonts.google.com/metadata/fonts)
- Полноширинная кириллица, для пометок не годятся: **Yomogi**, **Stick** — [тест Yomogi](https://fonts.googleapis.com/css2?family=Yomogi)
- Без кириллицы: Permanent Marker, Gloria Hallelujah, Rock Salt, Reenie Beanie, Nothing You Could Do — [FD](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/compiled/@next/font/dist/google/font-data.json)

### Inferences
- Для «редакторских правок» поверх макета: Caveat 600–700 в цвете spot (красный карандаш) или Shantell Sans с INFM 100 и BNCE ~50.
- Balsamiq Sans хорошо ложится на «эскизный» интерфейс, но в подписях нельзя использовать «№».
- Comfortaa — это округлый геометрический гротеск, а не рукопись (это вывод по виду шрифта, в GFM категория не проверялась).

### Gaps
- Качество соединений в рукописной кириллице (Bad Script, Marck Script) визуально не оценивалось.

---

## Риз-принт / зин и музейный каталог / индекс: шрифты

### Takeaway
Для **ризографии и зина**: семейство фильтров Rubik (Dirt, Spray Paint, Broken Fax, Marker Hatch и др., все с полной кириллицей и ₽), Dela Gothic One, Oi и Alumni Sans. Текст — Golos Text или Onest. Для **музея и каталога**: Cormorant Garamond / Cormorant SC / Unicase, EB Garamond, Spectral + Spectral SC, Ysabeau SC (вес 1–1000), Alegreya SC и Bona Nova (+SC). Инвентарные номера — IBM Plex Mono.

### Cited Findings
- **Rubik Dirt / Spray Paint / Broken Fax / Marker Hatch**: по 400, 182 кодпоинта, все символы, включая ₽ — [тест Spray Paint](https://fonts.googleapis.com/css2?family=Rubik+Spray+Paint); [тест Broken Fax](https://fonts.googleapis.com/css2?family=Rubik+Broken+Fax). Кириллица есть и у остальных фильтров Rubik: Wet Paint, Distressed, Glitch, Microbe, Maze, Iso, Bubbles, Doodle Shadow, Moonrocks, Beastly, Burned, Puddles, Vinyl, Gemstones, 80s Fade, Storm, Lines, Maps, Scribble, Glitch Pop, Doodle Triangles — [FD](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/compiled/@next/font/dist/google/font-data.json)
- **Cormorant Garamond / Cormorant / Cormorant Infant**: 300–700 (variable) + italic. **Cormorant SC и Cormorant Unicase**: 300–700, статические. У всех 236 кодпоинтов и все символы. **Cormorant Upright** — БЕЗ кириллицы — [FD](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/compiled/@next/font/dist/google/font-data.json); [тест SC](https://fonts.googleapis.com/css2?family=Cormorant+SC)
- **EB Garamond** (Georg Duffner, Octavio Pardo): 400–800 + italic, 241 кодпоинт — [тест](https://fonts.googleapis.com/css2?family=EB+Garamond)
- Капительные шрифты с полным набором символов: **Ysabeau SC** (1–1000 variable), **Spectral SC** (200–800 + italic), **Alegreya SC** (400–900 + italic), **Arsenal SC** (400/700 + italic), **Bona Nova SC** (400/700 + italic). У **Vollkorn SC** нет №, у **Playfair Display SC** нет ₽ — [FD](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/compiled/@next/font/dist/google/font-data.json); [тест Ysabeau SC](https://fonts.googleapis.com/css2?family=Ysabeau+SC); [тест Vollkorn SC](https://fonts.googleapis.com/css2?family=Vollkorn+SC)
- **Tenor Sans** и **Forum**: по 400, **без ₽** — [тест Tenor](https://fonts.googleapis.com/css2?family=Tenor+Sans); [тест Forum](https://fonts.googleapis.com/css2?family=Forum)

### Inferences
- **Музей**: название и разделы — Cormorant Garamond 300 крупно или Cormorant SC с разрядкой. Этикетки экспонатов — Ysabeau Office или Spectral. Номера «инв. № 0042» — IBM Plex Mono. У всех этих шрифтов есть №.
- **Зин**: один «грязный» дисплей (Rubik Spray Paint или Broken Fax) плюс чистый Golos для текста. Фильтры Rubik однотипны по скелету (Rubik Black), поэтому в одном макете лучше держать не больше одного.

### Gaps
- Ysabeau Office и IBM Plex Serif по глифам не тестировались. Кириллица у них есть по FD, но наличие ₽ и № не проверено.

---

## Светлые палитры по направлениям (hex/OKLCH) с проверкой контраста WCAG

### Takeaway
Для каждого направления есть палитра на светлом фоне, где основной текст проходит AAA, а акцентный — AA. Главные подводные камни:
- «фирменные» яркие цвета стилей текстом не читаются: Riso Fluorescent Pink 2,72:1, жёлтый 1,10:1, серый #808080 на #C0C0C0 из Windows 95 2,17:1, акценты Solarized light (зелёный, жёлтый, циан) ≈2,9–3,0:1, и даже основной текст Solarized base00 даёт 4,13:1 и не проходит AA;
- бирюзовый рабочий стол Windows (#008080, L≈54%) — фон средней яркости, почти тёмный. По правилу «никакого тёмного фона» его стоит заменить бледной бирюзой #BFE3E0 или небесным #A6CAF0.

### Cited Findings
- Цвета красок Riso (экранные приближения): Fluorescent Pink **#FF48B0** (Pantone 806 U), Blue **#0078BF** (3005 U), Yellow #F7FF00, Scarlet #F65058, Violet #9D7AD2 — [Martian Press](https://martian.press/ink-colors). Те же Blue #0078bf и Fluorescent Pink #ff48b0, всего 78 красок — [Observable: riso colors](https://observablehq.com/@romellogoodman/riso-colors). **Расхождение**: BYU Print Lab даёт Fluorescent Pink #F75295 и Blue #113772 — [BYU Print Lab](https://printlab.byu.edu/riso)
- Бирюзовый фон рабочего стола Windows 95: **#008080** — [desktopcolors.com](https://desktopcolors.com/os/windows-95). Среди системных цветов Windows встречаются серый **#C0C0C0** (ControlLight), #808080 (ControlDark/GrayText) и тёмно-синие **#000080** (HotTrack) и #0A246A (ActiveCaption/Highlight), а также светлый градиент заголовка #A6CAF0 — [gist zaxbux: Windows System Colours](https://gist.github.com/zaxbux/64b5a88e2e390fb8f8d24eb1736f71e0)
- Solarized light: фон base3 **#FDF6E3**, основной текст base00 **#657B83**, вторичный base01 **#586E75** — [ethanschoonover.com/solarized](https://ethanschoonover.com/solarized/)
- Все значения контраста ниже рассчитаны мной по формуле WCAG 2.x, OKLCH пересчитан мной из hex. Отдельного внешнего источника у этих цифр нет, это вычисления.

**1. Газета / broadsheet.** Бумага #F4EFE3, oklch(95.3% 0.017 88).
| Роль | Hex | OKLCH | Контраст |
|---|---|---|---|
| Краска (текст) | #1C1A17 | 21.9% 0.007 78 | 15,13 AAA |
| Вторичный текст | #4A453D | 39.3% 0.015 80 | 8,28 AAA |
| Подписи | #6B6558 | 50.8% 0.021 86 | 5,05 AA |
| Spot-красный | #C8102E | 53.0% 0.207 22 | 5,13 AA |
| Красный глубже | #B3121F | 48.9% 0.190 25 | 6,05 AA |
| Синий (опц.) | #1F3A5F | 34.7% 0.073 257 | 10,01 AAA |
| Линейки (декор) | #CFC6B3 | 82.9% 0.028 86 | 1,48 (только линии) |

На более тёмной бумаге #EFE8D8 красный #C8102E даёт 4,82 и подписи #6B6558 — 4,74. Всё ещё AA, но на грани.

**2. Ретро-ОС (светлая).** Лицевая панель #C0C0C0 (80.8% 0 —): чёрный 11,54 AAA, #000080 8,80 AAA, **#808080 2,17 FAIL**, белый 1,82 FAIL (белый только для фасок). В окне #FFFFFF: текст-ссылка #008080 4,77 AA. Platinum-вариант #DDDDDD: #555555 5,49 AA, акцент #3A3AA0 6,74 AA. Светлые «рабочие столы»: бледная бирюза #BFE3E0 (88.9% 0.038 190) даёт с чёрным 15,28, небесный #A6CAF0 (82.6% 0.066 250) с чёрным 12,33 и с #000080 9,40. Оригинальный #008080 как фон: белый текст 4,77, чёрный 4,40.

**3. Риз-принт / зин.** Бумага #F5F0E6 (95.6% 0.014 85).
- Fluorescent Pink #FF48B0: 2,72, **FAIL**, только плашки и надпечатка.
- Riso Blue #0078BF: 4,17, только крупный текст.
- Жёлтый #FFE800: 1,10, только заливки.
- Текстовые цвета:
  - тёмно-синий #1C2B4B — 12,35;
  - #3D5588 — 6,48 AA;
  - малиновый #C2185B — 5,17 AA;
  - надпечатка pink×blue (multiply, моё вычисление) ≈ #002284 — 11,84.

**4. Blueprint (светлый, не тёмно-синий фон).** Калька #EAF2FB (95.8% 0.015 251).
| Роль | Hex | Контраст |
|---|---|---|
| Чернила | #0B2E6B | 11,50 AAA |
| Чернила 2 | #123A7A | 9,72 AAA |
| Линии и мелкие подписи | #2F6FB5 | 4,58 AA |
| Размерные линии | #2F7FD1 | 3,66 (только линии и крупный текст) |
| Сетка | #BCD3EC | 1,36 (только сетка) |
| Красный карандаш | #C0392B | 4,81 AA (#D23B2A — 4,23, только крупный) |

**5. Swiss.** Белый #FFFFFF: #111111 18,88; красный #E4002B 4,85 AA (#DA291C 4,87); серый #6B6B6B 5,33 (#767676 4,54, минимум). На off-white #F6F5F1 красный #E4002B падает до **4,44**, а это ниже AA для мелкого текста.

**6. Необрутализм (светлый).** Фон #FFF8E7: текст #111111 17,83. Заливки жёлтая #FFD60A, розовая #FF6B9A, сиреневая #C4B5FD и мятная #A7F3D0 как текст на фоне не проходят (1,2–2,5). Зато #111111 на них даёт 13,38 / 7,03 / 10,23 / —. Электрический синий #2B2BFF: 6,86 на фоне, 5,14 на жёлтом.

**7. Терминал (светлый).**
- Solarized light (#FDF6E3):
  - base00 #657B83 — **4,13, не AA**;
  - base01 #586E75 — 4,99 AA;
  - base02 #073642 — 12,05;
  - акценты зелёный #859900 (2,97), жёлтый #B58900 (2,98) и циан #2AA198 (2,93) — FAIL;
  - синий #268BD2 (3,41) и красный #DC322F (4,29) — только крупный текст.
- Предлагаемая «бумажная» альтернатива, фон #F7F7F2, все цвета AA:

| Роль | Hex | Контраст |
|---|---|---|
| Текст | #1F2328 | 14,70 |
| Серый | #57606A | 5,95 |
| Зелёный | #1A7F37 | 4,73 |
| Синий | #0969DA | 4,83 |
| Янтарный | #9A6700 | 4,53 |
| Красный | #CF222E | 4,98 |
| Фиолетовый | #8250DF | 4,69 |

**8. Музей / каталог.** Стена #F7F5F0 (97.0% 0.007 89): текст #222222 14,60; подписи #6E6A63 4,94 AA; бордо #8B1E2D 8,30 или #7A1F1F 9,43; бутылочный зелёный #2C4A3E 8,94; золото #9A7B4F 3,62 (только крупный текст и UI); волосяные линии #D9D4CA.

Для сравнения: индиго текущего сайта #4F46E5 на белом даёт 6,29 AA.

### Inferences
- Во всех палитрах «сигнальный» цвет стиля (Riso pink, Win95 teal, Solarized accents, жёлтые и розовые заливки необрутализма) нужно использовать как **фон плашки или графику**, а текст на нём набирать почти чёрным. Этим цветом нельзя набирать мелкий текст на бумажном фоне.
- Требование «без тёмных фонов» выполняется во всех восьми палитрах. Тёмные цвета (#111, #1C1A17, #0B2E6B, #000080) используются только для текста, линий и жёстких теней необрутализма.
- Для газетного направления удобно держать один spot-цвет (#C8102E) и не добавлять второй. Это ближе к двухкрасочной газетной печати.

### Gaps
- Hex-значения «Platinum» Mac OS 8/9 (#DDDDDD и т. п.) из первоисточника не подтверждены. Это моё приближение.
- Цвета красок Riso в разных источниках отличаются (Martian Press / Observable против BYU): экранное воспроизведение флуоресцентных красок условно.
- Каким цвет спот-красного реально был у «Коммерсанта» или «Известий», не проверено.
