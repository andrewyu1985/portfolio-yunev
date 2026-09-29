# Газета и чертёж раздвигают диапазон портфолио

Лучшая пара к текущему SaaS-дизайну — **«Газета»** и **«Чертёж»**. «Газета» — редакционная полоса на тёплой газетной бумаге: высококонтрастная антиква Playfair, текст PT Serif, линейки и один красный spot-цвет. «Чертёж» — инженерный лист в варианте whiteprint на голубоватой кальке: рамка, основная надпись, спецификация и зоны листа, шрифты Martian Mono, Tektur и IBM Plex Sans, синие «чернила» и красный карандаш. Эти два стиля противоположны SaaS и друг другу по шести осям: типографика, сетка, форма, цвет, модель взаимодействия и метафора. Оба нативно светлые, оба собираются из собственного контента (32 проекта, категории, стек), поэтому их нельзя взять готовым шаблоном. На 390px оба сохраняют жанр: газета — одна колонка с шапкой и линейками, чертёж — вертикальная стопка листов. Модные альтернативы не годятся: ретро-ОС, бесконечный холст, необрутализм, терминал и bento уже растиражированы шаблонами Framer и Lovable или ломаются на телефоне. Технически переключатель устроен так. Клиентская оболочка на `/` получает текущий дизайн как серверный слот, и он остаётся в статическом HTML без изменений. Два новых дизайна грузятся через `import()` только по выбору, их шрифты подключаются через `next/font/google` с `preload: false` на собственной обёртке. Смена идёт через ручной `document.startViewTransition` с кольцом от нажатой кнопки. Ссылка `/?design=newspaper` работает через inline-скрипт в `<head>`, без `useSearchParams`. Сам переключатель — нативная радиогруппа с целями 44px. До публикации сборкой нужно проверить четыре вещи: не попали ли новые чанки в начальный JS, работает ли `next/font` внутри ленивого модуля, как в iOS Safari работают русские переносы и кольцевая анимация.

## Газета и чертёж расходятся с SaaS по всем шести осям

Награды и подборки 2025–2026 годов тянут в две стороны: «ремесленная иммерсивность» (3D, WebGL, кинетическая типографика) и «интерфейс-метафора» (ретро-ОС, редакционная вёрстка, коллаж). Беда в том, что самые заметные метафоры уже стали шаблонами. Ретро-ОС получила Honorable Mention на Awwwards у PortfolioXP ([Awwwards](https://www.awwwards.com/sites/portfolioxp)). **10 сентября 2025 года PostHog перезапустил весь сайт как веб-десктоп** ([PostHog](https://posthog.com/blog/why-os)). Готовые «Retro Desktop Portfolio» и репозитории вроде 98.portfolio раздаются свободно ([MeDo](https://nocodewebsitebuilder.com/templates/2084-retro-desktop-portfolio), [GitHub](https://github.com/AlexandreDresch/98.portfolio)). Бесконечный холст взял Site of the Month (Everest), и даже победитель ограничил свободу холста одной осью Y ([Awwwards](https://www.awwwards.com/everest-wins-site-of-the-month-january.html)). Для холста есть готовые шаблоны в Framer, Bolt и Webflow ([Framer OFFGRID](https://www.framer.com/marketplace/templates/offgrid-a-canvas/), [Bolt.new](https://bolt.new/resources/templates/infinite-canvas-gallery), [Webflow](https://webflow.com/templates/html/infinite-canvas-website-template)). Про необрутализм NN/g уже пишет в жанре «best practices», с примерами Gumroad и Figma ([NN/g](https://www.nngroup.com/articles/neobrutalism/)). Терминал-резюме продаётся как готовый сервис ([ShellSelf](https://peerlist.io/strangequirks/project/shellself), [Termio](https://peerlist.io/vikasacharya/project/termiodev)). Лёгкая blueprint-сетка — это **«Vercel aesthetic» для «SaaS landing pages… AI product pages, portfolio sites»** ([Setproduct](https://www.setproduct.com/blog/complete-guide-to-blueprint-grid-design)), то есть почти текущий дизайн. Архитектору ИИ-систем шаблонный стиль вредит вдвойне: посетитель решит, что сайт сгенерирован.

Оконные и холстовые метафоры к тому же разваливаются на телефоне. Замеры 29.09.2026 на эмуляции iPhone 13 показали долю целей меньше 44px на первом экране: **4 из 13 у daedalOS, 17 из 22 у Poolsuite, 12 из 20 у ryOS**. Два последних сайта вдобавок запрещают масштабирование через viewport ([dustinbrett.com](https://dustinbrett.com/), [poolsuite.net](https://poolsuite.net/), [os.ryo.lu](https://os.ryo.lu/)). Шаблон Infinite Canvas для Framer уже на 768px сам сворачивается в «fixed viewer over a scrolling list» ([Framer](https://www.framer.com/marketplace/templates/infinite-canvas/)). Отзывы о PostHog показывают цену такого вау-эффекта: «I'm an engineer evaluating PostHog, and I bounced», «back button didn't do anything», «Suited more for PC than mobile» ([Newslepear #131](https://newslepear.beehiiv.com/p/131-what-do-people-think-about-the-new-posthog-website-and-a-fun-announcement-stunt-from-recall-ai)).

Газета и чертёж свободны от обоих пороков. Они несут смысл профессии: «объяснять» и «проектировать». Они нативно светлые. Их содержание нельзя купить шаблоном, потому что оно строится из собственных данных. В газете 32 проекта становятся материалами номера, счётчики — «цифрами номера», таймлайн — «хроникой», а пять категорий фильтра (боты, агенты, видеопайплайны, презентации, инфраструктура) — рубриками. В чертеже проекты становятся узлами схемы, стрелки — потоками данных, спецификация — стеком, основная надпись — именем, ролью и датой, «Лист 1 из 4» — навигацией, фильтр — слоем, красные ревизии — пометками. Две оговорки обязательны. Во-первых, чертёж должен быть **настоящим инженерным документом** (рамка, штамп, выносные и размерные линии, зоны A–F/1–8), а не фоновой сеткой: сетка и есть SaaS-клише. Во-вторых, это **whiteprint** — синие линии на светлой бумаге. Классическая синька даёт белое на прусском синем, то есть тёмный фон, а он запрещён.

| Ось | Классика (SaaS) | Газета | Чертёж |
|---|---|---|---|
| Типографика | Unbounded + Manrope, геометрический гротеск | Высококонтрастная антиква, узкий гротеск в рубриках, буквицы | Моноширинный и «конструктивный» шрифт, размеры и позиции цифрами |
| Сетка | Карточная, скруглённые плитки | Колонки с волосяными линейками, шапка-титул | Рамка листа, зоны, штамп, спецификация |
| Форма | Большие скругления, pill-чипы | Углы 0px, линейки | Углы 0px, толщины линий, выноски |
| Цвет | Белый и электрический индиго | Газетный off-white, чёрная «краска», один красный | Калька, синие «чернила», красный карандаш |
| Взаимодействие | Hover-карточки, pill-фильтры | Чтение, рубрики-якоря, раскрытие материала | Подсветка узла и его связей, слои вместо фильтров |
| Метафора | Продукт | Издание «Хроника проектов» | Документ «Архитектура систем» |

Запасные варианты тоже есть. **Схема метро** по смыслу сильнее всех для фильтруемого каталога: категории становятся линиями, проекты — станциями, общие компоненты — пересадками. «Interactive maps» и «nonlinear journeys» Figma включает в тренды 2026 года ([Figma](https://www.figma.com/resource-library/web-design-trends/)). Но подтверждённых портфолио в таком стиле не нашлось, а на 390px схему придётся заменить вертикальной линейной схемой одной линии, как табло в вагоне. **Музейный каталог-индекс** («№ 01–32 · название · год · стек») несёт наименьший мобильный риск: нумерованный список и есть мобильный список. Швейцарский стиль отпадает: гротеск на белом слишком близок к текущему дизайну.

Главное правило для обоих новых дизайнов: **метафора живёт только в визуальном слое**. Секции, их порядок, якоря `#projects`, `#about`, `#contact`, логика фильтра, видимые контакты, нативный скролл и кнопка «назад» остаются как в классике. Muzli формулирует это так: «Visuals open the door. Clarity and judgment determine whether you stay in the room» ([Muzli, 2026](https://muz.li/blog/portfolio-mistakes-designers-still-make-in-2026/)). У NN/g вывод тот же: «keep it limited to visual design» ([NN/g, 2017](https://www.nngroup.com/articles/brutalism-antidesign/)). Muzli же предупреждает, что слишком большое число проектов читается как расфокус. Обе метафоры дают готовое место для приоритета: у газеты это передовица, у чертежа — «Лист 1». Самый сильный проект встаёт туда естественно, без переделки каталога. Честная оговорка: выбор пары — экспертный вывод, A/B-данных нет. Портфолио в виде полного чертежа или схемы метро за 2024–2026 не найдено, а FWA, CSSDA и Godly не просматривались. Это может означать как свежесть идеи, так и пробел в поиске.

## Шрифты: половина модных гарнитур не знает кириллицы

В `next/font/google` из Next 16.2.4 зашит собственный список: **1911 семейств, кириллица есть у 290**. Шрифт не из списка валидатор отклоняет ошибкой `Unknown font`, а шрифт без кириллического подмножества при `subsets: ['cyrillic']` падает на `Unknown subset` ([font-data.json](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/compiled/@next/font/dist/google/font-data.json), [validate-google-font-function-call.js](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/compiled/@next/font/dist/google/validate-google-font-function-call.js)). Кириллицы нет у многих любимцев дизайнеров: Space Grotesk и Space Mono, Bebas Neue, Archivo, Instrument Serif, Fraunces, Newsreader, Syne. Именно отсутствием кириллицы у Space Grotesk объясняется прошлый баг на сайте ([тест](https://fonts.googleapis.com/css2?family=Space+Grotesk)). Флага `cyrillic` в метаданных при этом мало. У **Pixelify Sans нет заглавных «О» и «П»** ([google/fonts#9392](https://github.com/google/fonts/issues/9392)). У **Playfair Display нет знака ₽** ([тест](https://fonts.googleapis.com/css2?family=Playfair+Display)). У японских DotGothic16 и Train One кириллица полноширинная: 1 em на букву против 0,5 em у латиницы ([тест](https://fonts.googleapis.com/css2?family=DotGothic16)). **Кириллических блэклеттеров в Google Fonts нет вовсе**, так что готический маст-хед «как у NYT» невозможен ([метаданные GF](https://fonts.google.com/metadata/fonts)). Поэтому любой кандидат стоит прогнать строкой «ПОРТФОЛИО Проекты № 1 — «ИИ» 1 000 ₽ ё Ё».

### Газета: Playfair для шапки, PT Serif для текста

| Роль | Шрифт | Почему | Параметры next/font |
|---|---|---|---|
| Маст-хед и заголовки | **Playfair** (v2, не Playfair Display) | wght 300–900, wdth 87,5–112,5, opsz 5–1200; есть ₽ и №; на opsz ~1200 максимальный газетный контраст | импорт `Playfair`, `axes: ['opsz','wdth']` |
| Альтернатива заголовков | **Old Standard TT** | цифровая «Обыкновенная», классическая русская книжно-газетная антиква | только 400/700 + italic, статический |
| Текст | **PT Serif** (или Literata с opsz 7–72) | 400/700 + italic, полный набор знаков | `weight: ['400','700']`, `style: ['normal','italic']` |
| Рубрики, кикеры, подписи | **Libre Franklin** капсом с разрядкой | 100–900 + italic, все знаки; News Cycle без № и ₽ | вариативный, веса не указывать |

Playfair выбран из-за двух осей. Его оптический размер доходит до «Needlepoint»: «as high contrast as practically possible» ([Google Fonts](https://raw.githubusercontent.com/google/fonts/main/ofl/playfair/article/ARTICLE.en_us.html)). Это то самое «иголочное» ощущение «Коммерсанта». Ось ширины на 87,5 сжимает длинные русские слова, и на телефоне заголовок можно держать крупнее (это вывод, его надо проверить замером). Old Standard TT — самый аутентичный русский выбор: журнал «Шрифт» прямо называет его цифровой версией гарнитуры Обыкновенной ([typejournal.ru](https://typejournal.ru/articles/ost-1337)). Но у него всего два веса и нет осей. Prata и Oranienbaum годятся только для слов без «№», «…» и «₽» ([тест Prata](https://fonts.googleapis.com/css2?family=Prata)). Ruslan Display и Monomakh уводят в «летопись», а не в газету.

### Чертёж: Martian Mono для штампа, IBM Plex Sans для описаний

| Роль | Шрифт | Почему | Параметры next/font |
|---|---|---|---|
| Штамп, размеры, спецификация, метки | **Martian Mono** | 100–800, wdth 75–112,5: сжатый штамп и широкие размерные подписи; все знаки | `axes: ['wdth']` |
| Заголовки листов | **Tektur** (альтернатива — Science Gothic) | «octagonal outlines and rectangular counters»: ближайшая замена ГОСТ-овскому чертёжному шрифту, которого в GF нет | 400–900, `axes: ['wdth']` |
| Описания проектов | **IBM Plex Sans** | пропорциональный текст экономит ширину 390px; wdth 75–100 | `axes: ['wdth']`; семейство Plex Sans **Condensed** без кириллицы |
| Пометки «красным карандашом» (по желанию) | **Caveat** | 400–700, есть ₽ и № | вариативный |

Моноширинный текст быстро съедает полосу 390px, поэтому Martian Mono нужен только для меток, а описания набираются IBM Plex Sans ([Martian Mono](https://raw.githubusercontent.com/google/fonts/main/ofl/martianmono/DESCRIPTION.en_us.html), [Tektur](https://raw.githubusercontent.com/google/fonts/main/ofl/tektur/DESCRIPTION.en_us.html)). JetBrains Mono уже стоит в классике, а Martian Mono визуально отделяет чертёж от неё. Если заголовкам листа нужен характер «Bank Gothic», подойдёт **Science Gothic**. Он появился в GF 19.11.2025, у него оси ширины 50–200 и контраста CTRS, а кириллица расширенная ([Google Fonts](https://raw.githubusercontent.com/google/fonts/main/ofl/sciencegothic/article/ARTICLE.en_us.html)). Unbounded в новых дизайнах повторять не стоит: он — лицо классики. Бюджет — **три семейства на дизайн**: документация Next прямо советует «use multiple fonts conservatively» ([font.md](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/03-api-reference/02-components/font.md)).

## Палитры: тёплая газетная бумага и холодная калька вместо трёх белых экранов

Если все три дизайна светлые, при переключении они рискуют слиться в «белый, белый, белый». Различие должно идти от **оттенка и фактуры бумаги**. Классика остаётся на чистом белом с индиго #4F46E5 (6,29:1). Газета получает тёплую газетную бумагу, чертёж — холодную кальку. Все значения контраста ниже рассчитаны по формуле WCAG 2.x. AA означает ≥4,5:1 для обычного текста. Цвета с контрастом ниже 3:1 допустимы только как декор.

| Газета, бумага **#F4EFE3** · oklch(95,3% 0,017 88) | Hex | Контраст |
|---|---|---|
| Краска, основной текст | #1C1A17 | 15,13 (AAA) |
| Вторичный текст | #4A453D | 8,28 (AAA) |
| Подписи, даты | #6B6558 | 5,05 (AA) |
| Spot-красный: рубрики, линейка передовицы | #C8102E | 5,13 (AA) |
| Красный для мелкого текста | #B3121F | 6,05 (AA) |
| Линейки (только линии) | #CFC6B3 | 1,48 (декор) |

| Чертёж, калька **#EAF2FB** · oklch(95,8% 0,015 251) | Hex | Контраст |
|---|---|---|
| Чернила, основной текст | #0B2E6B | 11,50 (AAA) |
| Чернила 2, заголовки листов | #123A7A | 9,72 (AAA) |
| Линии контура и мелкие подписи | #2F6FB5 | 4,58 (AA) |
| Размерные линии (только линии и крупный текст) | #2F7FD1 | 3,66 |
| Сетка (только фон) | #BCD3EC | 1,36 (декор) |
| Красный карандаш, ревизии | #C0392B | 4,81 (AA) |

Правило для обеих палитр одно: **сигнальный цвет стиля идёт в заливку, линию или графику, а мелкий текст набирается почти чёрным**. Для газеты хватит одного spot-цвета, как в двухкрасочной печати. У бумаги есть ловушка: серый #767676 проходит проверку на белом, но на газетном фоне даёт **только 3,97:1**. На бумаге потемнее (#EFE8D8) красный опускается до 4,82:1, это край AA. Фактуру — газетное зерно, сетку кальки, рамку листа — нужно рисовать CSS-градиентами или маленьким SVG, а не PNG-обоями. Это прямо следует из рекомендаций по LCP ([web.dev](https://web.dev/articles/vitals)).

## На 390px газета теряет колонки, чертёж теряет ширину листа, но не жанр

Общая рамка задана WCAG 2.2. По **1.4.10 Reflow** контент при 320 CSS px не должен требовать двумерной прокрутки. Исключение сделано только для того, чему двумерность нужна по смыслу, например карт и диаграмм, а список проектов и текст «Обо мне» под него не подпадают ([W3C 1.4.10](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)). По **2.5.7** любое перетаскивание обязано иметь альтернативу без перетаскивания ([W3C 2.5.7](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html)). По 2.5.8 цель касания — минимум 24×24, а для важных контролов разумно брать 44×44 ([W3C 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)). Запрет масштабирования (`maximum-scale=1`, `user-scalable=no`) противоречит 1.4.4 ([W3C 1.4.4](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html)). NN/g советует на мобильных вообще исключать скролл-хайджекинг ([NN/g, 2023](https://www.nngroup.com/articles/scrolljacking-101/)). Отсюда требования к обоим новым дизайнам: только нативная вертикальная прокрутка, никаких pan/zoom-холстов и «липких» сцен.

### Газета держится на шапке и линейках, а не на колонках

Многоколоночный набор на телефоне заставляет читать вверх-вниз. Рэйчел Эндрю предупреждала о «reading experience which made the reader scroll in the block dimension» ([Smashing Magazine](https://www.smashingmagazine.com/2019/01/css-multiple-column-layout-multicol/)). Поэтому на 390px текст идёт **одной колонкой шириной 358px**. Газетность при этом держится на маст-хеде во всю ширину с двойной линейкой, на строке выпуска «№ 32 · 29 сентября 2026 · Москва · цена 0 ₽», на рубриках, горизонтальных линейках между материалами и буквице у передовицы. С 600–700px длинный текст «Обо мне» получает `column-width` вместо числа колонок: так советует Энди Кларк, и браузер сам решает, сколько колонок помещается ([CSS-Tricks, 2025](https://css-tricks.com/revisiting-css-multi-column-layout/)). Сетку проектов лучше строить на CSS Grid с `border-left` у ячеек: у Grid порядок чтения предсказуем. Буквице нужны две записи и запасной вариант. `initial-letter` в Chrome работает без префикса, в Safari — только с `-webkit-`, а Firefox его не поддерживает, поэтому нужен ещё `::first-letter` с `float` ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/initial-letter)). Если появится бегущая строка-«тикер», по 2.2.2 ей нужна кнопка паузы ([W3C 2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)).

### Чертёж превращается в стопку листов

Большую схему на телефоне разрезают на **вертикальную стопку листов**: каждый проект становится отдельным узлом-листом, а основная надпись сворачивается в полосу вверху карточки. Подсветка узла и его связей, которая на десктопе срабатывает при наведении, на телефоне включается тапом. Слои-фильтры делаются настоящими кнопками высотой не меньше 44px. Если отдельной диаграмме всё же нужна двумерность, вертикальный свайп остаётся странице (`touch-action: pan-y`), а масштаб меняется кнопками, не только щипком. Мелкие размерные подписи не должны уходить в нечитаемые кегли: декоративными могут быть линии, но не текст.

### Гигантская кириллица упирается в самое длинное слово

Обе концепции любят крупный шрифт, а русские слова длинные. Замер в Chrome 154 (29.09.2026, системные шрифты как прокси) показал максимальный кегль, при котором слово целиком помещается в 358px:

| Слово | Georgia (прокси антиквы) | Courier New (прокси моно) |
|---|---|---|
| Портфолио | 66px | 66px |
| АРХИТЕКТОР | 53px | 59px |
| Автоматизация | 49px | 45px |
| ИНТЕЛЛЕКТУАЛЬНЫЕ | 31px | 37px |
| ПРОИЗВОДИТЕЛЬНОСТЬ | 28px | 33px |

У Martian Mono знак шире, 0,7 em против 0,6 em у Courier. Поэтому 17-буквенное слово при wdth 100 поместится примерно до 30px (это расчёт). Для реальных шрифтов таблицу нужно пересчитать тем же способом. Практическое правило такое. Нижняя граница `clamp()` у заголовков берётся по самому длинному слову. `hyphens: auto` при `lang="ru"` включается для наборного текста и подзаголовков. `overflow-wrap: break-word` ставится последней страховкой. А дисплейные строки собираются из коротких слов или с `&shy;` в выбранных местах, потому что «ИНТЕЛЛЕКТУ-АЛЬНЫЕ» в гигантском кегле выглядит как брак. Переносы зависят от атрибута `lang` ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/hyphens)). В 2023 году утверждалось, что в десктопном Chrome русского словаря нет ([Vivaldi Forum](https://forum.vivaldi.net/topic/82881/no-russian-hyphen-data)). Замер в Chrome 154 это опроверг: в профиле есть `hyph-ru.hyb`, и блок шириной 358px с «высокопроизводительных интеллектуальных» в 48px разбился на 4 строки с переносами. **iOS Safari и Android не проверены**, нужен живой iPhone.

## Переключатель: серверный слот, ленивые чанки и кольцо от кнопки

### Одна клиентская оболочка на `/` лучше CSS-тем, маршрутов и `<Activity>`

CSS-темизация отпадает сразу: у трёх дизайнов разные DOM, раскладка и взаимодействия. Остаются два жизнеспособных варианта. **Рекомендуемый (A)** — клиентская оболочка на одном маршруте `/`. Классика передаётся в неё как серверный слот: документация Next прямо описывает паттерн «use `children` to create a _slot_ in a `<ClientComponent>`» ([server-and-client-components.md](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md)). Главная остаётся статически пререндеренной, а в HTML лежит та же классика. Газета и чертёж монтируются только на клиенте, и в DOM всегда одно дерево. **Вариант B** — отдельные статические маршруты `/newspaper` и `/blueprint`, спрятанные за `/?design=…` через `rewrites` с условием `has: query` ([rewrites.md](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/rewrites.md)). Он даёт SSR новых дизайнов и ссылки без мигания. Платить за это придётся навигацией с RSC-запросом, дублями контента (нужен canonical) и более сложным кольцом. `<Activity mode="hidden">` для удержания скрытых дизайнов **не подходит**: скрытое дерево остаётся в документе с `display: none`, а его стили «can affect visible pages» ([preserving-ui-state.md](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/02-guides/preserving-ui-state.md)). Получатся дубли `#projects` и утечки CSS.

```tsx
// app/page.tsx — остаётся Server Component, страница статична
import DesignShell from '@/components/designs/DesignShell'
import ClassicDesign from '@/components/designs/ClassicDesign' // текущее тело 1:1, вместе с <RevealObserver/>

export default function Home() {
  return <DesignShell classic={<ClassicDesign />} />
}
```

`RevealObserver` должен жить **внутри** поддерева классики. Он один раз при монтировании находит `.reveal`, а у этих элементов `opacity: 0`. Если оставить его снаружи, после возврата на классику новые узлы останутся невидимыми ([RevealObserver.tsx](file:///C:/Users/andre/portfolio-yunev/components/RevealObserver.tsx)). Якоря `#projects`, `#about` и `#contact` нужно сохранить во всех трёх дизайнах, тогда ссылки вида `/#projects` работают при любом выборе.

### Чанки новых дизайнов грузятся по выбору, а не с первым экраном

Ленивый импорт обязан жить в клиентском компоненте. Документация Next предупреждает, что при динамическом импорте клиентского компонента из Server Component автоматический code-splitting не работает, а `ssr: false` там вызывает ошибку ([lazy-loading.md](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/02-guides/lazy-loading.md)). Для анимированной смены лучше не рендерить `React.lazy`/`dynamic` внутри перехода: при первом рендере компонент саспендится, и в снимок View Transition попадёт fallback (вывод из механики lazy). Надёжнее сначала выполнить `await import()`, положить в state уже загруженный компонент и только потом синхронно его отрендерить. Чанк прогревается заранее, при `pointerenter` или `focus` на пункте переключателя. Счётчик запросов отбрасывает устаревшие загрузки, когда пользователь быстро листает радио стрелками.

```tsx
// components/designs/DesignShell.tsx
'use client'
import { useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react'
import { runDesignSwap } from './runDesignSwap'

type DesignId = 'classic' | 'newspaper' | 'blueprint'
const loaders = {
  newspaper: () => import('./newspaper/NewspaperDesign'), // литеральные пути → отдельные чанки
  blueprint: () => import('./blueprint/BlueprintDesign'),
} as const

export default function DesignShell({ classic }: { classic: ReactNode }) {
  const [cur, setCur] = useState<{ id: DesignId; Comp?: ComponentType }>({ id: 'classic' }) // = серверный снимок
  const req = useRef(0)

  async function switchTo(id: DesignId, origin?: HTMLElement) {
    const my = ++req.current
    try {
      const Comp = id === 'classic' ? undefined : (await loaders[id]()).default
      if (my !== req.current) return                          // уже выбран другой дизайн
      const commit = () => {
        setCur({ id, Comp })
        document.documentElement.dataset.design = id
        history.replaceState(null, '', (id === 'classic' ? location.pathname : `?design=${id}`) + location.hash)
      }
      if (origin) runDesignSwap(origin, commit); else commit()
    } catch {
      document.documentElement.dataset.design = 'classic'      // чанк не пришёл — вернуть классику
    }
  }

  useEffect(() => {                                            // ссылка ?design=… — только после гидратации
    const d = new URLSearchParams(location.search).get('design')
    if (d === 'newspaper' || d === 'blueprint') switchTo(d)
  }, [])

  const Comp = cur.Comp
  return (
    <>
      {/* переключатель — вне переключаемого дерева */}
      {Comp ? <Comp /> : <div data-design-root="classic">{classic}</div>}
    </>
  )
}
```

После внедрения нужно проверить сборкой, что Turbopack в 16.2.4 не включил чанки газеты и чертежа в начальный JS `/`. Для этого сравнить загрузки в DevTools → Network до и после.

### Шрифты новых дизайнов не должны попасть в preload главной

Сейчас `/` предзагружает **ровно 6 woff2**: три семейства, каждое в latin и cyrillic ([next-font-manifest.json](file:///C:/Users/andre/portfolio-yunev/.next/server/next-font-manifest.json)). Добавлять к ним шрифты газеты и чертежа нельзя. По умолчанию `preload` равен `true`. Файлы с предзагрузкой получают суффикс `.p.` и попадают в манифест конкретного entry, а файлы с `preload: false` туда не попадают ([font.md](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/03-api-reference/02-components/font.md), [next-font-manifest-plugin.js](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/build/webpack/plugins/next-font-manifest-plugin.js)). Поэтому каждый дизайн держит свой файл шрифтов, который импортируют только его ленивые модули. В нём стоит `preload: false`, а `.variable` вешается на корневую обёртку дизайна, не на `<html>`: документация прямо разрешает класть переменную на «parent container».

```ts
// components/designs/newspaper/fonts.ts — импортируется только модулями газеты
import { Playfair, PT_Serif, Libre_Franklin } from 'next/font/google'
export const npDisplay = Playfair({ subsets: ['latin', 'cyrillic'], axes: ['opsz', 'wdth'], variable: '--np-display', display: 'swap', preload: false })
export const npText = PT_Serif({ subsets: ['latin', 'cyrillic'], weight: ['400', '700'], style: ['normal', 'italic'], variable: '--np-text', display: 'swap', preload: false })
export const npKicker = Libre_Franklin({ subsets: ['latin', 'cyrillic'], variable: '--np-kicker', display: 'swap', preload: false })

// components/designs/blueprint/fonts.ts
import { Martian_Mono, Tektur, IBM_Plex_Sans } from 'next/font/google'
export const bpMono = Martian_Mono({ subsets: ['latin', 'cyrillic'], axes: ['wdth'], variable: '--bp-mono', display: 'swap', preload: false })
export const bpHead = Tektur({ subsets: ['latin', 'cyrillic'], axes: ['wdth'], variable: '--bp-head', display: 'swap', preload: false })
export const bpText = IBM_Plex_Sans({ subsets: ['latin', 'cyrillic'], axes: ['wdth'], variable: '--bp-text', display: 'swap', preload: false })
```

Здесь три тонкости. Первая: `font-family` задаётся на самой обёртке дизайна, потому что переменная, объявленная на обёртке, не видна `body`. Вторая: в Tailwind v4 `@theme inline`, скорее всего, компилирует `font-display` прямо в `var(--font-unbounded)`, поэтому переопределять токены классики в скоупе бесполезно. Новым дизайнам нужны свои имена переменных (это не проверено по документации Tailwind). Третья: при `preload: false` первое переключение даст короткий FOUT. Чтобы его не было, после `import()` вызывают `document.fonts.load()` для дисплейной гарнитуры (имя семейства берётся из `npDisplay.style.fontFamily`) и запускают кольцо только после этого. Иначе анимация раскроет кадр с запасным шрифтом. Документация не отвечает прямо, работает ли `next/font/google` в лениво импортируемом `'use client'`-модуле, так что это обязательный пункт проверки сборкой.

### Кольцо от кнопки: ручной `startViewTransition` без React-флага

Для смены корня целиком лучше всего подходит ручной `document.startViewTransition(() => flushSync(...))` с анимацией `clip-path` на `::view-transition-new(root)`. Экспериментальный флаг для него не нужен, same-document-переходы работают в **Chrome и Edge 111+, Safari 18+, Firefox 144+** ([Chrome for Developers](https://developer.chrome.com/blog/view-transitions-in-2025)), и с 14.10.2025 это Baseline ([web.dev](https://web.dev/blog/same-document-view-transitions-are-now-baseline-newly-available)). Там, где API нет, смена просто происходит мгновенно. React `<ViewTransition>` сюда не подходит. Установленный `react@19.2.4` его не экспортирует. Экспортирует только вендорный canary 19.3.0 внутри Next, флаг `experimental.viewTransition` остаётся экспериментальным, а стабильным компонент стал лишь в React 19.3 от 09.09.2026 ([react.dev](https://react.dev/blog/2026/09/09/react-19-3)). Смешивать подходы нельзя: «if you have something else on the page running a ViewTransition React will interrupt it» ([react.dev](https://react.dev/reference/react/ViewTransition)).

```ts
// components/designs/runDesignSwap.ts — по канону Chrome docs
import { flushSync } from 'react-dom'
export function runDesignSwap(origin: HTMLElement, commit: () => void) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  const apply = () => flushSync(() => { commit(); window.scrollTo({ top: 0, behavior: 'instant' }) })
  if (!document.startViewTransition || reduce) { apply(); return }
  const r = origin.getBoundingClientRect()
  const x = r.left + r.width / 2, y = r.top + r.height / 2
  const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
  document.startViewTransition(apply).ready.then(() =>
    document.documentElement.animate(
      { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
      { duration: 550, easing: 'cubic-bezier(.2,.8,.2,1)', pseudoElement: '::view-transition-new(root)' }))
}
```

```css
::view-transition-old(root), ::view-transition-new(root) { animation: none; mix-blend-mode: normal; }
.design-switcher { view-transition-name: design-switcher; }        /* имя уникально, иначе переход пропустится */
::view-transition-group(design-switcher) { animation: none; }
```

Здесь есть две ловушки. Первая: CSS-снипет из гайда Next для reduced motion (`animation-duration: 0s`) **не остановит** анимацию, запущенную через `element.animate()`. Поэтому `matchMedia` проверяется в JS, как в коде выше. Вторая: в `globals.css` стоит `html { scroll-behavior: smooth }`, и без `behavior: 'instant'` новый снимок покажет плавную прокрутку вместо верха нового дизайна. Координаты кольца берутся с `<label>`, а не с визуально скрытого `<input>`. Как кольцевой `clip-path` ведёт себя в iOS Safari в 2026 году, не проверено; нужен ручной тест ([Chrome for Developers](https://developer.chrome.com/docs/web-platform/view-transitions/same-document)).

### Ссылка `/?design=blueprint` без мигания и без потери статики

`useSearchParams` в оболочке использовать **нельзя**. На пререндеренном маршруте он отправит дерево до ближайшего `Suspense` в клиентский рендер, и классика исчезнет из HTML. В dev этого не видно, а в production без `Suspense` сборка падает ([use-search-params.md](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/03-api-reference/04-functions/use-search-params.md)). Проп `searchParams` делает страницу динамической ([page.md](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/page.md)). Правильная схема повторяет официальный гайд Next «Preventing flash before hydration» ([nextjs.org](https://nextjs.org/docs/app/guides/preventing-flash-before-hydration)). Inline-скрипт в `<head>` root layout читает `location.search` и ставит `data-design` на `<html>` до первой отрисовки. Несколько строк в `globals.css` по этому атрибуту красят фон целевого дизайна и прячут классику. На `<html>` ставится `suppressHydrationWarning`. Оболочка гидрируется с `'classic'`, как сервер, и лишь потом подгружает нужный дизайн. В сборке 16.2.4 скрипт из `<head>` root layout остаётся в `<head>`: это проверено на `ld+json` той же конструкции, вопреки сторонним утверждениям, будто Next 16 переносит такие скрипты в body ([index.html сборки](file:///C:/Users/andre/portfolio-yunev/.next/server/app/index.html)).

```css
/* globals.css — единственные глобальные строки новых дизайнов, работают до загрузки JS */
html[data-design="newspaper"] body { background: #F4EFE3; }
html[data-design="blueprint"] body { background: #EAF2FB; }
html[data-design="newspaper"] [data-design-root="classic"],
html[data-design="blueprint"] [data-design-root="classic"] { visibility: hidden; }
```

У этой схемы три страховки. Если чанк не загрузился, атрибут снимается, иначе классика останется скрытой. Кроме того, нужен таймаут около 3 с по флагу «дизайн смонтирован». Без JS атрибут вообще не ставится, поэтому боты и пользователи без JS видят классику. В dev Strict Mode React сбрасывает атрибуты `<html>` при повторном монтировании, их нужно переустанавливать в `useLayoutEffect`. Если появится строгий CSP, inline-скрипту понадобится nonce. URL обновляется через `history.replaceState`, чтобы не засорять историю. **localStorage лучше не использовать**: портфолио смотрят разово, первое впечатление должна давать классика, а сохранённый выбор спорит с присланной ссылкой. Приоритет простой: URL, затем классика. Canonical у `/` остаётся `/`, а варианты `?design=` отдают тот же статический HTML и отдельным контентом не индексируются.

### Доступный переключатель — это радиогруппа, а не вкладки

Выбор «один из трёх» без связанной tabpanel — это радиогруппа. Проще всего собрать её из нативных `<input type="radio">` внутри `<fieldset>` с визуально скрытой `<legend>`: Tab, стрелки и Space работают из коробки по паттерну APG ([W3C APG](https://www.w3.org/WAI/ARIA/apg/patterns/radio/)). `tablist` не подходит, потому что вкладки подразумевают панели. `aria-pressed` означает независимые toggle-кнопки. Каждый сегмент — не меньше 44px в высоту. Три сегмента примерно по 119px помещаются в 358px, и подписи «Классика · Газета · Чертёж» влезают без сокращений. Фокус остаётся на выбранном радио, смена объявляется через `aria-live="polite"` («Включён дизайн «Чертёж»»), обводка `:focus-visible` контрастна во всех трёх палитрах.

```tsx
<fieldset className="design-switcher">
  <legend className="sr-only">Дизайн страницы</legend>
  {DESIGNS.map(d => (
    <label key={d.id} className="seg" onPointerEnter={() => warm(d.id)}>   {/* min-height: 44px */}
      <input type="radio" name="design" value={d.id} checked={cur === d.id}
             onFocus={() => warm(d.id)}
             onChange={e => switchTo(d.id, e.currentTarget.parentElement!)} />
      <span>{d.label}</span>
    </label>
  ))}
</fieldset>
<p aria-live="polite" className="sr-only">{announce}</p>
```

Переключатель живёт вне переключаемого дерева, иначе фокус потеряется при размонтировании. Чтобы не трогать классику, лучшее место — **обычная полоса в потоке над обёрткой дизайна**, а не фиксированная. Фиксированная полоса перекроет sticky Nav с `top: 0`, и классику пришлось бы править. Это вывод: если нужен переключатель, видимый всегда, придётся сдвинуть `top` у Nav. Нативные радио меняют выбор уже при нажатии стрелки. Поэтому счётчик запросов в оболочке обязателен, а в reduced motion не анимируется ни кольцо, ни ползунок сегмента.

### Изоляция стилей и остальные ловушки

Весь CSS газеты и чертежа скоупится под `[data-design-root="newspaper"]` и `[data-design-root="blueprint"]` или пишется на CSS Modules. **Глобальные селекторы (`body`, `h1`, `:root`) в них запрещены**: загруженный CSS ленивого чанка, по всей видимости, остаётся в документе после возврата на классику и протечёт в неё. Жёсткий способ защиты взят из документации Next: собственный `<style>` дизайна в cleanup получает `media = 'not all'` ([preserving-ui-state.md](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/02-guides/preserving-ui-state.md)). Токены классики на `:root` продолжают действовать и в новых дизайнах, отсюда свои имена переменных. Tailwind v4 сканирует весь проект, поэтому утилиты новых дизайнов попадут в общий CSS классики. На CSS Modules этой проблемы нет. Sticky Nav переживёт обёртку `<div data-design-root="classic">` только без `overflow: hidden/auto` на ней. Горизонтальное переполнение в новых дизайнах режется через `overflow-x: clip`, а `transform` и `filter` на обёртке сломают `position: fixed` у потомков ([DigitalOcean](https://digitalocean.com/community/tutorials/css-position-sticky)). Смену дизайна стоит слать в аналитику собственным событием: учтёт ли Vercel Analytics `replaceState` как pageview, неизвестно.

Производительность меряется целями Core Web Vitals для мобильных на 75-м перцентиле: **LCP ≤ 2,5 с, INP ≤ 200 мс, CLS ≤ 0,1** ([web.dev](https://web.dev/articles/vitals)). При схеме A первая загрузка классики не меняется совсем. Для новых дизайнов действуют обычные правила: анимировать только `transform` и `opacity`, давать `content-visibility: auto` блокам ниже первого экрана, превью с `loading="lazy"` и явным `aspect-ratio`, WOFF2-подмножества latin и cyrillic ([web.dev: fonts](https://web.dev/articles/font-best-practices)).

| Не проверено до внедрения | Как проверить |
|---|---|
| Чанки газеты и чертежа не попали в начальный JS `/` | `next build`, сравнить JS `/` в DevTools → Network до и после |
| `next/font/google` работает в ленивом клиентском модуле и не добавляет preload | в `.next/server/app/index.html` по-прежнему ровно 6 `rel="preload" as="font"` |
| Inline-скрипт остаётся в `<head>` в 16.2.4 | посмотреть пререндеренный `index.html` |
| CSS ленивого чанка после возврата на классику | переключить туда и обратно, сравнить вычисленные стили классики |
| Скоупные переменные при `@theme inline` в Tailwind v4 | утилиты `font-*` внутри новых дизайнов |
| Русские переносы и кольцо `clip-path` в iOS Safari | живой iPhone, 390px |
| Озвучка полной замены DOM экранными дикторами | VoiceOver и NVDA |

## Заключение

Три дизайна с переключателем — это не декор, а самый сильный экспонат портфолио архитектора ИИ-автоматизации. Работу оценивают дважды: сначала глазами (есть ли диапазон), потом руками (не ломается ли что-то). Классика грузится ровно как раньше, два других дизайна ничего не стоят первому экрану, ссылка на конкретный дизайн открывается без мигания, а переключатель работает с клавиатуры и в reduced motion. Всё это демонстрирует ту самую инженерную зрелость, которую портфолио продаёт. Поэтому качество реализации переключателя весит не меньше, чем качество вёрстки газеты и чертежа.

Выбор стилей ведёт к более общему выводу: в 2026 году свежесть даёт не эстетика, а метафора, собранная из собственного контента. Шаблон ретро-ОС или холста можно купить за вечер. Газету, где передовица — лучший проект, и чертёж, где спецификация — реальный стек, купить нельзя, и это единственная защита от впечатления «сайт сгенерирован». Практически это значит, что начинать надо с пробника: первый экран и одна карточка проекта в обоих стилях на 390px с реальными длинными русскими словами. Только потом верстать всю страницу. Главный риск здесь не в CSS, а в том, что метафора замедлит ответ на три вопроса посетителя: кто это, что он сделал, какой получился результат.
