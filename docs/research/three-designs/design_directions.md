# Необычные концепции дизайна главной страницы личного портфолио (2024–2026), только светлый фон

Контекст: русскоязычное портфолио «архитектора ИИ-систем» (https://andrey-yunev.vercel.app). Текущий дизайн — чистый SaaS: белый фон, электрический индиго, Unbounded/Manrope, скруглённые карточки, pill-чипы. Нужны ещё два дизайна той же страницы с переключателем: кардинально отличаются и от SaaS, и друг от друга. Жёсткие ограничения: только светлый фон (чёрный текст, рамки и жёсткие тени допустимы), кириллица, обязательная проверка на 390px.

Примечание о методе: собрано ~30 запросов и чтений страниц (Awwwards, Muzli, Figma, Wix, NN/g, Setproduct, PostHog, Indeed Design и др.). Firecrawl-поиск упёрся в лимит запросов (HTTP 429), поэтому FWA, CSSDA, Godly, Siteinspire, Land-book и Minimal Gallery напрямую не просмотрены — см. разделы Gaps.

## Вопрос 1. Какие концепции портфолио и личных сайтов отмечались на Awwwards, FWA, CSSDA, Godly, Siteinspire, Land-book, Minimal Gallery и One Page Love в 2024–2026?

### Takeaway
Проверенные в этой сессии награды и подборки 2025–2026 показывают две противоположные линии. Первая — «ремесленная иммерсивность»: 3D/WebGL, кинетическая типографика, бесконечные холсты. Вторая — «интерфейс-метафора»: ретро-ОС, редакционная вёрстка, коллаж или скрапбук. Среди метафор-интерфейсов ретро-ОС уже получила награду (Awwwards Honorable Mention у PortfolioXP) и массовое тиражирование. Бесконечный холст получил Site of the Month (Everest) и превратился в шаблон Framer. Редакционная вёрстка на Awwwards чаще встречается у студий и в фэшне, чем у технарей.

### Cited Findings
**Awwwards (2025–2026)**
- В категории Portfolio на Awwwards в 2026 году отмечены SOTD-сайты, например «bleibtgleich'26» (SOTD) и работа «avecanni». Характер этих сайтов в выдаче не описан — [Awwwards: Portfolio](https://www.awwwards.com/websites/portfolio/)
- В категории Single page встречаются личные портфолио: «Daniel Kiss – Portfolio», «Christoph Nagel Portfolio», «Rafael Cespedes Portfolio», автор Edoardo Lunardi (PRO) — [Awwwards: Single page](https://www.awwwards.com/websites/single-page/)
- Коллекция Awwwards «Freelance Portfolios» открывается сайтом «Powell Studio – Portfolio» — [Awwwards: Freelance Portfolios](https://www.awwwards.com/awwwards/collections/freelance-portfolio/)
- Awwwards продолжает выдавать SOTD в категории Typography, например «Site Of The Day Aug 24, 2026» — [Awwwards: Typography](https://www.awwwards.com/websites/typography/?page=4)
- **PortfolioXP** (Honorable Mention на Awwwards) — «A portfolio that replicate the Windows XP aestethic and UX». Пример ретро-ОС-портфолио с наградой — [Awwwards: PortfolioXP](https://www.awwwards.com/sites/portfolioxp)
- **Everest** (Site of the Month, январь; год в выдаче не указан): «infinitely draggable canvas comprised of tiles». Сначала холст двигался по X и Y, потом его сузили до одной оси Y ради эффекта изгиба при перетаскивании. Показательно, что даже победитель ограничил свободу холста — [Awwwards: Everest wins SOTM January](https://www.awwwards.com/everest-wins-site-of-the-month-january.html) (данные из сниппета поиска, страница целиком не прочитана)
- В разделе Awwwards Inspiration (Creative Pass) есть подборки по элементу «Editorial layout». Примеры: Cappen (Amanda Braga; теги: editorial layout, typography, hero font, minimalism), Mara (Adoratorio Studio), Books of Design (Locomotive; bold typography), Frances To (serif typefaces, muted colors) — [Awwwards: editorial layout](https://www.awwwards.com/inspiration/editorial-layout), [Mara](https://www.awwwards.com/inspiration/editorial-layout-mara), [Books of Design](https://www.awwwards.com/inspiration/editorial-layout-books-of-design), [Frances To](https://www.awwwards.com/inspiration/editorial-layout-frances-to)
- Там же есть подборки по элементу «infinite canvas», включая Bigma и Standfor — [Awwwards: infinite canvas](https://www.awwwards.com/inspiration/infinite-canvas), [infinite canvas Bigma](https://www.awwwards.com/inspiration/infinite-canvas-bigma), [infinit gallery Standfor](https://www.awwwards.com/inspiration/infinit-gallery-standfor)
- Более старый пример: Awwwards опубликовал кейс «Nicky Tesla's spreadsheet portfolio» (3 апреля 2020 года). Это портфолио в виде таблицы, сделанное после закрытия дизайн-студии — [Awwwards case study (2020)](https://www.awwwards.com/case-study-nicky-teslas-spreadsheet-portfolio.html) (страница отдала 502, детали известны только по сниппету поиска)

**Muzli «100 Best Designer Portfolio Websites of 2026»** (опубликовано 12.10.2025; порядок, по словам авторов, случайный) — [Muzli](https://muz.li/blog/top-100-most-creative-and-unique-portfolio-websites-of-2025/)
- Grit Pictures (grit.pictures) — сайт как «mad man's scrapbook»: грубые текстуры, рваные края, коллаж, монохром. Пример направления скрапбук/коллаж
- Lazy Eight (lazyeight.design) — «grid systems, content clarity, typographic detail, and subtle motion». Близко к швейцарской линии
- Phantom.Land — «WebGL theatrics, kinetic grids, and bold interfaces that evolve as you scroll»
- Mat Voyce (matvoyce.tv) и Joseph San (joseph-san.com) — кинетическая типографика
- Studio Null (madebynull.com) — «editorial platforms and experimental type specimens», девиз «make the web fun again»
- Samsy Ninja (samsy.ninja) — 3D, вычислительный дизайн, более 50 наград; Alche Studio — иммерсивные миры на Unreal Engine
- Marga Navarro (itsmarga.me) — «system-thinking mindset… minimal aesthetic»; Clément Grellier — минимализм и микровзаимодействия
- Большинство из 100 — студии и агентства, личных портфолио технических специалистов немного

**One Page Love**
- Сайт «Emily Not Found» (emilylonetto.com) цитируется в обзоре трендов 2026 со ссылкой `?ref=onepagelove`, то есть был замечен через One Page Love. Приводится как пример пересечения технологии и тактильного, «человеческого» — [Tiny Coast Digital: 2026 trends](https://tinycoastdigital.com/insights/web-design-trends-2026)

**Прочие упоминаемые портфолио-ориентиры**
- Bruno Simon (bruno-simon.com) — эталон игрового 3D-портфолио, по-прежнему приводится как пример тренда 2026 — [Sessions College](https://www.sessions.edu/notes-on-design/top-web-design-trends/)
- Портфолио Ryan Haskins (ryanhaskins.com) Wix приводит как пример тренда «Dial-up design»: коллаж и ранние графические редакторы — [Wix: 11 trends 2026](https://www.wix.com/blog/web-design-trends)
- ryOS (os.ryo.lu) Ryo Lu — веб-«операционка» с темами System 7, Aqua, Windows XP и Windows 98 и встроенным ИИ-ассистентом — [ryOS README](https://cdn.jsdelivr.net/gh/ryokun6/ryos@main/README.md)

### Inferences
- Бросается в глаза перекос: в топ-подборках доминируют студии с WebGL и 3D. Личное портфолио технического архитектора, сделанное как «документ», а не как «аттракцион», будет выделяться на этом фоне — и среди наградных сайтов, и среди SaaS-шаблонов.
- Награды за ретро-ОС (PortfolioXP) и бесконечный холст (Everest, SOTM) говорят о том, что оба направления уже признаны и массово растиражированы, а не о том, что они свежие.

### Gaps
- FWA, CSSDA, Godly, Siteinspire, Land-book и Minimal Gallery не просмотрены из-за лимита поиска (429) и бюджета вызовов. Конкретные победители оттуда не подтверждены.
- Для SOTD-сайтов Awwwards (bleibtgleich'26, Daniel Kiss, Christoph Nagel и др.) не проверены визуальный стиль и цвет фона.
- Год SOTM у Everest в выдаче не указан.

## Вопрос 2. Каталог направлений: визуальная подпись, взаимодействия, смысл для «архитектора систем», риски читаемости, свежесть или клише

### Takeaway
Большинство «модных» радикальных направлений 2025–2026 уже шаблонизированы: ретро-ОС, бесконечный холст, терминал, необрутализм, bento, лёгкая «blueprint-сетка». Для них есть готовые шаблоны Framer, Lovable, v0 и Bolt, а крупные бренды (PostHog, Gumroad, Figma, Vercel) используют их в своих сайтах. Направления со смыслом «архитектор систем» и пока без шаблонной волны — настоящий инженерный чертёж (не фоновая сетка), схема метро, реестр или таблица, газетная полоса и музейная экспликация. Фоновая «blueprint-сетка» — клише и почти совпадает с текущим SaaS-видом.

### Cited Findings
**Макротренды 2026 (контекст)**
- Figma называет 13 трендов веба на 2026 год: 3D/иммерсивность; экспериментальная навигация («radial menus, hidden drawers, interactive maps, or nonlinear journeys»; примеры Locomotive, The Outline, Palmer, Google Arts & Culture); яркие палитры (Y2K, dopamine); смелую типографику (кинетические надписи, вариативные шрифты); тёмную тему; motion и скроллителлинг; геймификацию; неоморфизм; ретрофутуризм (подходит «portfolios»); максимализм; коллаж («personal portfolios often use collage layouts»; пример La Palatine); необрутализм/анти-дизайн («creative portfolios»; Balenciaga, Diesel, Mailchimp); устойчивый веб и доступность — [Figma: Top web design trends 2026](https://www.figma.com/resource-library/web-design-trends/)
- По отчёту Figma State of the Designer 2026, 72% дизайнеров используют генеративный ИИ в работе — [Figma](https://www.figma.com/resource-library/web-design-trends/)
- Тренды Wix на 2026 год: «Nature distilled», «Museumcore» (максимализм с отсылками к Ренессансу и барокко), «'80s excess», «Dial-up design» (Byline, NoSpace, Boys Club, обложка Brat, портфолио Ryan Haskins), «Retrofuture femme» — [Wix](https://www.wix.com/blog/web-design-trends)
- Tiny Coast: волна ностальгии по 90-м и Y2K продолжается. Отдельно отмечено «Colliding timelines»: «museum web design trend for a portfolio section», винтажные рамки, тактильные «безделушки» — [Tiny Coast Digital](https://tinycoastdigital.com/insights/web-design-trends-2026)
- Sessions College, 2026: 3D и интерактив (Bruno Simon), «Bento stacking», рукотворные текстуры, коллаж — [Sessions College](https://www.sessions.edu/notes-on-design/top-web-design-trends/)
- Слабый источник (YouTube, Sam Crawford): тренды 2026 — «Rise of Human-Made Design (Against AI "Soulless" Sites)», «Anti-Grid Movement», «Glassmorphism 2.0» — [YouTube](https://www.youtube.com/watch?v=rFyOIWMwRdg)

---

#### 2.1 Редакционная вёрстка: газета, broadsheet, журнал
- **Подпись:** многоколоночная сетка с линейками-разделителями, шапка-«титул» с датой и номером выпуска, заголовки антиквой, буквицы, подписи под изображениями, «рубрики» вместо категорий.
- **Взаимодействия:** чтение и скролл, переходы по рубрикам, раскрытие «материала» (проекта) как статьи; минимум анимации.
- **Смысл для архитектора систем:** средний или высокий. «Издание о проделанной работе»: 32 проекта как материалы номера, stats как «цифры номера», таймлайн как «хроника». Подчёркивает умение объяснять, а по NN/g и Muzli именно ясность ценят ревьюеры (см. вопрос 5).
- **Риски:** мелкий кегль в колонках, длинные строки антиквы на мобиле. Многоколоночность на 390px нужно сворачивать в одну колонку, но линейки и иерархию можно сохранить.
- **Светлый фон:** нативно светлый (газетная бумага, off-white).
- **Свежесть:** на Awwwards editorial-подборки есть, но в основном у студий и в фэшне (Mara/Adoratorio, Books of Design/Locomotive, Frances To) — [Awwwards editorial](https://www.awwwards.com/inspiration/editorial-layout). У технических и ИИ-портфолио такой вариант редок (вывод, количественно не подтверждён).

#### 2.2 Швейцарский / интернациональный типографский стиль
- **Подпись:** модульная сетка, асимметрия, гротеск, флаговый набор по левому краю, крупные номера, один сигнальный цвет (обычно красный) плюс чёрный на белом. Основа — объективность и читаемость — [BMCC OpenLab: International Typographic Style](https://openlab.bmcc.cuny.edu/mma215-fall25/?p=544)
- **Взаимодействия:** почти статичный лист; интерактив через состояния ячеек сетки и фильтры в виде «таблицы-индекса».
- **Смысл:** средний. «Система» здесь выражена формой, а не метафорой. Setproduct прямо выводит «blueprint/Vercel-эстетику» из Swiss Design 1950–60-х — [Setproduct](https://www.setproduct.com/blog/complete-guide-to-blueprint-grid-design)
- **Риски:** низкие, стиль изначально про читаемость. Главный риск — скучность и близость к минималистичному SaaS.
- **Светлый фон:** нативно белый.
- **Свежесть:** вечная классика. В Muzli-2026 есть близкие примеры (Lazy Eight — «grid systems… typographic detail») — [Muzli](https://muz.li/blog/top-100-most-creative-and-unique-portfolio-websites-of-2025/). Контраст с текущим SaaS **умеренный**: тоже гротеск на белом.

#### 2.3 Необрутализм (neo-brutalism)
- **Подпись (по NN/g):** «high contrast, blocky layouts, bold colors, thick borders, and "unpolished" elements»; жёсткие одноцветные тени («a black drop shadow offset by 4px»); причудливые шрифты; элементы в духе Windows 98 и моноширинный шрифт — [NN/g: Neobrutalism, Hayat Sheikh, 11.04.2025](https://www.nngroup.com/articles/neobrutalism/)
- **Рекомендации NN/g:** 2–3 цвета, проверка контраста (не жёлтый с голубым), нейтральный шрифт для основного текста, поля 24–32px, явные hover-состояния, заголовки вдвое крупнее текста — [NN/g](https://www.nngroup.com/articles/neobrutalism/)
- **Смысл:** низкий или средний. Метафоры «системы» нет, только «честность» и «сырость».
- **Светлый фон:** да, пастельные и светлые фоны с чёрными рамками и жёсткими тенями прямо разрешены ограничением.
- **Свежесть:** **мейнстрим.** NN/g приводит как примеры Gumroad и ребрендинг Figma; Figma включила стиль в тренды 2026 — [NN/g](https://www.nngroup.com/articles/neobrutalism/), [Figma](https://www.figma.com/resource-library/web-design-trends/). Раз NN/g пишет «best practices», стиль уже устоялся.

#### 2.4 Ретро-ОС / метафора рабочего стола
- **Подпись:** окна, иконки, панель задач или меню-бар, перетаскивание, «приложения» вместо разделов.
- **Референсы:** PostHog.com перезапущен как веб-десктоп 10.09.2025: клон Проводника как магазин мерча, продуктовые страницы в стиле PowerPoint, форум в стиле Outlook Express, changelog в виде таблицы, прилипание окон, горячие клавиши — [PostHog: Why our website looks like an operating system](https://posthog.com/blog/why-os). Также ryOS Ryo Lu (System 7, Aqua, XP, 98 плюс ИИ-ассистент) — [ryOS](https://cdn.jsdelivr.net/gh/ryokun6/ryos@main/README.md); PortfolioXP (Awwwards HM) — [Awwwards](https://www.awwwards.com/sites/portfolioxp); портфолио-«Unix 90-х» — [Reddit r/webdev](https://www.reddit.com/r/webdev/comments/1bx6v7w/my_portfolio_website_simulating_a_90s_unix/)
- **Шаблонизация:** шаблоны «Retro Desktop Portfolio», видеоуроки Win95 и XP, репозитории 98.portfolio — [MeDo template](https://nocodewebsitebuilder.com/templates/2084-retro-desktop-portfolio), [YouTube Win95](https://www.youtube.com/watch?v=NXXw5sYg71I), [GitHub 98.portfolio](https://github.com/AlexandreDresch/98.portfolio)
- **Риски:** сам автор PostHog признаёт: «an OS interface for a "website" is initially a jarring experience» — [PostHog](https://posthog.com/blog/why-os). Реакция: на Hacker News преимущественно негатив, на Reddit смешанная с уклоном в негатив, в LinkedIn позитив. Критика: не работает кнопка «назад», сломана прокрутка с клавиатуры, «I'm an engineer evaluating PostHog, and I bounced», «Suited more for PC than mobile» — [Newslepear #131](https://newslepear.beehiiv.com/p/131-what-do-people-think-about-the-new-posthog-website-and-a-fun-announcement-stunt-from-recall-ai)
- **Смысл:** средний. «Я строю системы» ≈ «вот моя ОС». Метафора считывается, но ассоциируется с ностальгией, а не с архитектурой.
- **Светлый фон:** зависит от эпохи. Mac System 7 (1-bit, светло-серый и белый) — светлый; бирюзовый рабочий стол Win95 средне-тёмный (вывод, не проверено).
- **390px:** **ломается** — окна на телефоне превращаются в полноэкранные листы, и метафора теряется.
- **Свежесть:** **клише 2025–2026.**

#### 2.5 Бесконечный холст / мудборд / Figma-доска
- **Подпись:** проекты разбросаны по плоскости, её можно тянуть и масштабировать; стикеры, коннекторы, мини-карта.
- **Референсы:** Everest (Awwwards SOTM) — draggable canvas из плиток, позже ограниченный осью Y — [Awwwards](https://www.awwwards.com/everest-wins-site-of-the-month-january.html). Шаблоны Framer OFFGRID и Infinite Canvas, компонент InfiniteSpaceCanvas, шаблоны Bolt.new и Webflow, рилсы «I built an infinite portfolio where you drag forever» — [Framer OFFGRID](https://www.framer.com/marketplace/templates/offgrid-a-canvas/), [Framer Infinite Canvas](https://www.framer.com/marketplace/templates/infinite-canvas/), [Framer component](https://www.framer.com/marketplace/components/infinitespacecanvas/), [Bolt.new](https://bolt.new/resources/templates/infinite-canvas-gallery), [Webflow](https://webflow.com/templates/html/infinite-canvas-website-template), [Instagram](https://www.instagram.com/reel/DdzAKkXu4Gh/)
- **Смысл:** средний. «Доска архитектора» с блоками и связями несёт смысл, если связи реальные (какой проект из чего вырос), а не декоративные.
- **Риски:** непредсказуемая навигация, контент не найти, на телефоне pan+zoom конфликтует со скроллом страницы (вывод).
- **Светлый фон:** да (белая доска в точку).
- **390px:** **ломается** без отдельной мобильной раскладки.
- **Свежесть:** **быстро шаблонизируется** (Framer, Bolt, Webflow, Lovable).

#### 2.6 Bento-сетка
- **Подпись:** плитки разного размера в скруглённых контейнерах.
- **Свежесть:** «basically taking over modern web design in 2025»; используют Apple, Google, Spotify и «thousands of startups» — [gillian-sarah.com](https://gillian-sarah.com/bento-grid-web-design-trend-2025/), [studiomeyer.io](https://studiomeyer.io/en/blog/bento-grid-layouts). Там же приводится цифра «на 35% дольше время на странице» без ссылки на исследование — **не доверять**.
- **Вывод для задачи:** **исключить.** Это ядро текущего SaaS-языка, контраста не даст.

#### 2.7 Скроллителлинг
- **Подпись:** повествование разворачивается при прокрутке, закреплённые сцены, анимации по триггерам.
- **Доказательства:** Figma относит скроллителлинг к тренду «Motion design and animation» — [Figma](https://www.figma.com/resource-library/web-design-trends/). NN/g (2017, **старый источник**): текст, который появляется по скроллу, задерживает пользователей. Совет — анимировать вторичный контент и проигрывать анимацию один раз; «Task-focused users don't want to be wowed», особенно на B2B-сайтах — [NN/g: Scroll-Triggered Text Animations Delay Users](https://www.nngroup.com/articles/scroll-animations/)
- **Смысл:** низкий. Это приём подачи, а не метафора; лучше как слой внутри другого направления.
- **Свежесть:** повсеместно на Awwwards, клише как самостоятельная концепция (вывод).

#### 2.8 Кинетическая типографика
- **Подпись:** огромные надписи, которые движутся, деформируются и реагируют на курсор; вариативные шрифты.
- **Референсы:** Mat Voyce, Joseph San (Muzli-2026) — [Muzli](https://muz.li/blog/top-100-most-creative-and-unique-portfolio-websites-of-2025/); демо Codrops «Kinetic Typography Page Transition» (2021, **старое**) и «Coding a Kinetic SVG Typography Animation» (2023) — [Codrops 2021](https://tympanus.net/codrops/2021/09/29/kinetic-typography-page-transition), [Codrops 2023](https://tympanus.net/codrops/2023/01)
- **Риски:** длинные русские слова («автоматизация», «архитектор») в дисплейном кегле на 390px переполняют строку (вывод). Анимированный текст мешает чтению (NN/g выше).
- **Смысл:** низкий. Показывает моушн-мастерство, но не системное мышление.

#### 2.9 Терминал / CLI (светлый вариант)
- **Подпись:** моноширинный шрифт, приглашение `$`, команды `ls projects`, `cat about`, мигающий курсор.
- **Шаблонизация:** есть SaaS-сервисы «терминал-резюме» (ShellSelf, Termio.dev) и шаблоны Lovable и v0 — [Peerlist ShellSelf](https://peerlist.io/strangequirks/project/shellself), [Peerlist Termio](https://peerlist.io/vikasacharya/project/termiodev), [Lovable template](https://lovable.dev/ja/templates/websites/portfolio/terminal-developer-portfolio-website-template)
- **Смысл:** высокий для разработчика, но сужает образ до «кодера», а не архитектора.
- **Риски:** набор команд на мобильной клавиатуре неудобен, нужны кликабельные команды (вывод). Метафора по умолчанию тёмная, светлая версия («бумажный терминал», телетайп) теряет узнаваемость (вывод).
- **Свежесть:** **клише**, существует как SaaS-продукт.

#### 2.10 Blueprint / технический чертёж / инженерная схема
- **Важное разделение.** (а) Лёгкая фоновая сетка из линий или точек — это **«Vercel aesthetic»**: «SaaS landing pages, developer tool websites, AI product pages, portfolio sites»; её подхватили Stripe, Tailwind, Linear и «dozens of startups» — [Setproduct, 21.04.2026](https://www.setproduct.com/blog/complete-guide-to-blueprint-grid-design). Для ИИ-архитектора это **клише, почти совпадающее с текущим SaaS**. (б) Полноценный **инженерный чертёж**: рамка, штамп с основной надписью, выносные и размерные линии, позиции, спецификация, зоны A–F/1–8, «Лист 1 из 4», ревизии. В ходе поиска такие портфолио не нашлись (см. Gaps).
- **Смысл:** **максимальный** для «архитектора систем». Проекты — узлы схемы, стрелки — потоки данных, спецификация — стек, штамп — имя, роль и дата.
- **Светлый фон:** классическая синька (белые линии на прусском синем) — **тёмный фон, нарушает ограничение**. Нужна «whiteprint»/диазокопия (синие или чёрные линии на белом) или калька и ватман (вывод).
- **390px:** большую схему надо разрезать на вертикальную стопку «листов» (вывод).
- **Свежесть:** вариант (а) — клише; вариант (б) — свежий.

#### 2.11 Индекс / каталог / библиотечная карточка / архив
- **Подпись:** список-указатель (номер, название, год, тип, роль) вместо плиток; карточки в духе каталожных, с пробитым отверстием, инвентарными номерами и штемпелями.
- **Доказательства:** лаконичные «project lists» с названием, клиентом, годом и ролью — распространённый приём — [Portfoliobox](https://www.portfoliobox.com/blog/present-your-work-and-services-with-lists-on-your-portfolio-website)
- **Смысл:** высокий. «Систематизация 32 проектов», фильтры превращаются в индексы.
- **Риски:** низкие; на 390px список работает лучше плиток.
- **Свежесть:** минималистичный индекс-список распространён у дизайнеров (вывод, количественно не подтверждён). «Каталожная карточка» как метафора встречается реже.

#### 2.12 Музей / выставка
- **Два варианта.** (а) «White cube»: белые стены, экспонаты с этикетками (название, год, «материалы» = стек, инвентарный номер), план залов. (б) «Museumcore» (Wix, тренд 2026): максималистский барочный вариант с отсылками к Ренессансу — [Wix](https://www.wix.com/blog/web-design-trends). Tiny Coast отмечает «museum web design trend for a portfolio section» и винтажные рамки — [Tiny Coast](https://tinycoastdigital.com/insights/web-design-trends-2026)
- **Смысл:** средний. «Экспозиция систем» подходит; этикетки-экспликации удобны для задачи, решения и результата.
- **Светлый фон:** вариант (а) нативно белый; museumcore часто тёмный и насыщенный (вывод) — выбирать (а).
- **Свежесть:** museumcore растёт в 2026 году, white-cube для технических портфолио редок (вывод).

#### 2.13 Ризограф / зин / коллаж / скрапбук
- **Подпись:** плашечные цвета с несовмещением слоёв, растр, зерно, скотч, рваные края, вырезки.
- **Доказательства:** «Collage» — тренд Figma 2026, «personal portfolios often use collage layouts» — [Figma](https://www.figma.com/resource-library/web-design-trends/). Grit Pictures как «mad man's scrapbook» — [Muzli](https://muz.li/blog/top-100-most-creative-and-unique-portfolio-websites-of-2025/). «Dial-up design» и портфолио Ryan Haskins — [Wix](https://www.wix.com/blog/web-design-trends)
- **Смысл:** низкий. Рукотворность и арт-подача против «системности»; хорошо подходит как антитезис ИИ-генеративной гладкости.
- **Светлый фон:** нативно бумажный.
- **Свежесть:** растущий тренд, высокая конкуренция в креативных портфолио.

#### 2.14 Карта / схема метро
- **Подпись:** цветные линии под 45° и 90°, станции-кружки, пересадки, упрощённая география.
- **Доказательства:** Figma называет «interactive maps» и «nonlinear journeys» частью тренда «Experimental navigation» 2026 — [Figma](https://www.figma.com/resource-library/web-design-trends/). Прямых примеров портфолио-«схемы метро» в поиске не нашлось, а упоминание UXtweak о навигации портфолио Сэма Годдарта неоднозначно — [UXtweak](https://blog.uxtweak.com/website-navigation-examples/)
- **Смысл:** **высокий и конкретный.** Пять категорий фильтра (боты, агенты, видеопайплайны, презентации, инфраструктура) становятся линиями, 32 проекта — станциями, общие компоненты — пересадками. Фильтр = «показать линию».
- **Светлый фон:** нативно белый (классические схемы метро — на белом; общеизвестно, в этой сессии не проверялось).
- **390px:** большая схема не помещается. Решение — вертикальная «линейная схема» одной линии, как табло в вагоне, плюс переключатель линий (вывод).
- **Свежесть:** **свежо** (доказательств распространения не найдено).

#### 2.15 Таблица / спредшит / реестр / лог
- **Подпись:** ячейки, заголовки столбцов A, B, C, номера строк, строка формул, сортировка по клику на столбец, моноширинные цифры.
- **Доказательства:** Nicky Tesla — портфолио-таблица (Awwwards, 2020, **старое**) — [Awwwards](https://www.awwwards.com/case-study-nicky-teslas-spreadsheet-portfolio.html); у PostHog changelog оформлен как таблица (2025) — [PostHog](https://posthog.com/blog/why-os)
- **Смысл:** высокий для автоматизации: данные, строки-процессы, статусы, «20×» как вычисляемая ячейка.
- **Риски:** широкая таблица на 390px требует горизонтальной прокрутки, это недопустимо. На мобиле строки нужно разворачивать в «запись-карточку» (вывод).
- **Светлый фон:** нативно белый.
- **Свежесть:** редкость как целое портфолио, но уже используется как приём в продуктах (PostHog).

#### 2.16 Чек / билет / квитанция
- **Подпись:** узкая колонка термобумаги, моноширинный шрифт, пунктирные разделители, «ИТОГО», штрихкод, перфорация.
- **Доказательства:** в этой сессии источников не найдено (см. Gaps).
- **Смысл:** низкий. Юмористическая подача «счёта» за 17 лет опыта, для каталога из 32 проектов быстро надоедает (вывод).
- **390px:** узкая колонка **идеальна** для телефона (вывод).
- **Светлый фон:** нативно белый.

#### 2.17 Y2K / Frutiger Aero / стекло
- **Доказательства:** Frutiger Aero (около 2005–2013): глянец, облака, пузыри, вода, стекло, бело-сине-зелёная гамма. Возвращается с конца 2022 года через TikTok (хэштег использован более 30 млн раз). Liquid Glass от Apple (2025), вероятно, испытал его влияние — [Wikipedia: Frutiger Aero](https://en.wikipedia.org/wiki/Frutiger_Aero). Kittl называет его «glossy 2000s design trend making a comeback in 2026» — [Kittl](https://www.kittl.com/ai-graphic-design). Figma — «Y2K nostalgia», «dopamine design» — [Figma](https://www.figma.com/resource-library/web-design-trends/)
- **Смысл:** низкий (ностальгия, лайфстайл).
- **Светлый фон:** да (небо, белый).
- **Свежесть:** мейнстрим после Liquid Glass. Риск: выглядит как сайт Apple, а не как собственный язык.

#### 2.18 Мемфис
- **Доказательства:** в этой сессии источников о Мемфисе в 2025–2026 не найдено.
- **Смысл:** низкий (игривая декоративность 80-х). Близок к тренду Wix «'80s excess» — [Wix](https://www.wix.com/blog/web-design-trends)
- **Светлый фон:** да.

#### 2.19 Анти-дизайн
- **NN/g** (Kate Moran, 05.11.2017, **старый**): анти-дизайн — «ugly, disorienting, or complex interfaces». Он уместен только для аудитории дизайнеров и художников или для развлекательных продуктов. «Keep it limited to visual design», не ломая иерархию, навигацию и взаимодействие — [NN/g: Brutalism and Antidesign](https://www.nngroup.com/articles/brutalism-antidesign/)
- **Вывод:** аудитория ИИ-архитектора — B2B-заказчики, поэтому **не подходит** как основа.

#### 2.20 Иммерсивное 3D / WebGL (для полноты)
- Тренд №1 у Figma, пример — Bruno Simon — [Figma](https://www.figma.com/resource-library/web-design-trends/), [Sessions](https://www.sessions.edu/notes-on-design/top-web-design-trends/)
- Для задачи: тяжело, часто тёмное (вывод), слабая доступность и проблемы на мобиле. Не подходит под «светлый фон + 390px + кириллица».

### Inferences
Сводная матрица. Это **моя оценка** на основе источников выше, не измерение. Шкала 1–5: смысл для «архитектора систем», светлый фон, работа на 390px, свежесть 2026, контраст с текущим SaaS.

| Направление | Смысл | Светлый фон | 390px | Свежесть | Контраст с SaaS |
|---|---|---|---|---|---|
| Инженерный чертёж (whiteprint, штамп, спецификация) | 5 | 5 (только не синька) | 3 | 4 | 5 |
| Схема метро (линии = категории) | 5 | 5 | 3 | 5 | 5 |
| Газетная полоса / broadsheet | 3 | 5 | 4 | 4 | 5 |
| Реестр / таблица / лог | 4 | 5 | 3 | 4 | 4 |
| Индекс / каталожные карточки | 4 | 5 | 5 | 3 | 4 |
| Музей white-cube с экспликациями | 3 | 5 | 4 | 4 | 4 |
| Швейцарский стиль | 3 | 5 | 5 | 2 | 2 |
| Ризограф / зин / коллаж | 2 | 5 | 4 | 3 | 5 |
| Необрутализм | 2 | 5 | 5 | 1 | 4 |
| Ретро-ОС | 3 | 3 | 1 | 1 | 5 |
| Бесконечный холст | 3 | 5 | 1 | 2 | 4 |
| Терминал (светлый) | 3 | 2 | 2 | 1 | 4 |
| Чек / билет | 2 | 5 | 5 | 3 | 4 |
| Y2K / Frutiger Aero | 1 | 4 | 4 | 2 | 3 |
| Кинетическая типографика | 1 | 3 | 2 | 2 | 3 |
| Скроллителлинг | 1 | 3 | 3 | 1 | 2 |
| Bento | 1 | 5 | 5 | 1 | 1 |
| Анти-дизайн | 1 | 4 | 2 | 2 | 5 |
| 3D / WebGL | 2 | 2 | 1 | 2 | 4 |

- Главное наблюдение: всё, что уже прошло стадию «шаблона в Framer, Lovable или v0» (ретро-ОС, холст, терминал, bento), для ИИ-архитектора опасно вдвойне. Зритель может решить, что сайт сгенерирован. Свежесть сейчас в метафорах, которые **нельзя взять шаблоном**, потому что они строятся из собственного контента: схема метро из реальных категорий, чертёж из реальной архитектуры проектов.
- Для русскоязычной аудитории чертёж с рамкой и основной надписью в духе ЕСКД/ГОСТ мгновенно узнаётся инженерами и заказчиками из промышленности. Это усиливает «архитектора» (вывод; конкретный стандарт и шрифты «ГОСТ тип А/Б» в этой сессии не проверены).
- Кириллица: антиквы и гротески с кириллицей для редакционного варианта и моноширинные с кириллицей для чертежа или реестра существуют (из общих знаний: PT Serif, PT Sans, PT Mono, Literata, Source Serif 4, IBM Plex Mono, JetBrains Mono, Onest, Golos). **В этой сессии по Google Fonts не перепроверено.**

### Gaps
- Не найдено ни одного подтверждённого портфолио в стилях «схема метро», «чек/билет», «Мемфис» и «полноценный инженерный чертёж (не фоновая сетка)» за 2024–2026. Это может означать и свежесть, и просто недостаток поиска.
- Статистика распространённости стилей (доля SOTD по стилям и т. п.) не найдена; оценки свежести — экспертный вывод по косвенным признакам: шаблоны, использование брендами, статьи «best practices».
- Детали портфолио Nicky Tesla недоступны (страница Awwwards отдала 502).

## Вопрос 3. Какие направления естественно работают только со светлым фоном?

### Takeaway
Нативно светлые направления: газетная полоса, швейцарский стиль, инженерный чертёж (в варианте whiteprint), схема метро, реестр или таблица, индекс или каталог, музей white-cube, зин или ризограф, чек, необрутализм (светлые пастельные фоны с чёрными рамками и жёсткими тенями). Проблемные: классическая синька (тёмно-синий фон), терминал (исходно тёмный), 3D/WebGL и кинетические шоу (на Awwwards часто тёмные), museumcore, ретро-ОС в духе Win95/XP.

### Cited Findings
- Blueprint-сетка работает на «white or near-white» фоне, с линиями #E5E7EB и непрозрачностью 10–20%. При этом светло-серые линии на белом создают проблемы доступности; контраст текста должен быть не ниже 4,5:1 — [Setproduct](https://www.setproduct.com/blog/complete-guide-to-blueprint-grid-design)
- Необрутализм у NN/g показан на светлых и ярких фонах (жёлтый, пастель) с чёрными рамками и тенями со смещением 4px. Цветовые пары вроде жёлтого с голубым не проходят проверку контраста — [NN/g](https://www.nngroup.com/articles/neobrutalism/)
- Frutiger Aero: основная гамма «typically white, green, and blue» — [Wikipedia](https://en.wikipedia.org/wiki/Frutiger_Aero)
- Тёмная тема остаётся трендом 2026 года у Figma («Dark mode has become standard»). Значит, многие наградные сайты тёмные, и светлый сайт выделится — [Figma](https://www.figma.com/resource-library/web-design-trends/)
- Museumcore в описании Wix — «excess, ornamentation», Ренессанс и барокко — [Wix](https://www.wix.com/blog/web-design-trends)

### Inferences
- **Blueprint:** обязательно whiteprint или ватман: белая или слегка тёплая «бумага», сине-чёрные линии, красные пометки-ревизии. Классическую синьку (белое на прусском синем) под ограничение не брать.
- **Терминал:** возможен только как «бумажный телетайп» или светлая тема в духе Solarized Light. Узнаваемость метафоры падает, поэтому направление не рекомендуется.
- **Ретро-ОС:** если всё-таки брать, то Mac System 7 (1-bit, белый и серый), а не бирюзовый рабочий стол Win95.
- **Музей:** только white-cube.
- Светлые направления легче проходят WCAG, но в паре с белым SaaS фон должен отличаться хотя бы **фактурой и оттенком** бумаги: газетный off-white, ватман с сеткой, термобумага. Иначе при переключении три дизайна сольются в «белый, белый, белый».

### Gaps
- Цвет фона победителей SOTD 2025–2026 не посчитан: доли светлых и тёмных сайтов нет.

## Вопрос 4. Какие направления лучше всего показывают диапазон в паре с текущим SaaS-дизайном?

### Takeaway
Максимальный контраст по пяти осям (типографика, сетка, модель взаимодействия, цвет, метафора) даёт пара **«Газетная полоса / технический журнал»** + **«Инженерный чертёж / схема системы на ватмане»**. Вариант с тем же эффектом — заменить одну из них на **«Схему метро»** или **«Реестр-таблицу»**. Швейцарский стиль и bento слишком близки к текущему SaaS. Ретро-ОС и бесконечный холст контрастны, но шаблонны и ломаются на 390px.

### Cited Findings
- Текущий SaaS-язык (гротеск, сетка, акцентный цвет, скругления) — это то, что Setproduct описывает как «Vercel aesthetic» для «SaaS landing pages… AI product pages, portfolio sites». Blueprint-сетка поэтому не даст контраста — [Setproduct](https://www.setproduct.com/blog/complete-guide-to-blueprint-grid-design)
- Figma связывает экспериментальную навигацию (интерактивные карты, нелинейные маршруты) с трендом 2026 года — это обоснование для «схемы метро» как отдельной модели взаимодействия — [Figma](https://www.figma.com/resource-library/web-design-trends/)
- «Rise of Human-Made Design (Against AI "Soulless" Sites)» — слабый сигнал о спросе на рукотворное против генеративного — [YouTube, Sam Crawford](https://www.youtube.com/watch?v=rFyOIWMwRdg)
- Hiring-менеджер Indeed: буткемп-портфолио выглядят «very polished but also formulaic», и возникает вопрос «can you go off-script?» — [Indeed Design (2020, старый источник)](https://indeed.design/article/ux-design-portfolio-advice-from-hiring-managers/)

### Inferences
Контраст пары по осям (моя разработка):

| Ось | Текущий SaaS | Дизайн B: «Газетная полоса» | Дизайн C: «Чертёж / схема системы» |
|---|---|---|---|
| Типографика | Unbounded + Manrope, геометрический гротеск | Антиква для заголовков и текста плюс узкий гротеск для рубрик; буквицы | Моноширинный плюс «чертёжный» шрифт; размеры и позиции цифрами |
| Сетка | Карточная, скруглённые плитки | 5–6 колонок с линейками-разделителями, шапка-титул | Рамка листа, зоны A–F/1–8, штамп, спецификация |
| Углы и форма | Большие скругления, pills | 0px, волосяные линейки | 0px, толщины линий по ГОСТ-логике, выноски |
| Цвет | Белый плюс электрический индиго | Газетный off-white, чёрная «краска», одна плашка (красная) | Ватман или белый, сине-чёрные линии, красные ревизии |
| Взаимодействие | Hover-карточки, pill-фильтры, скролл | Чтение, рубрики-якоря, раскрытие «материала» | Наведение подсвечивает узел и его связи, зум в деталь, слои (фильтр = слой) |
| Метафора | Продукт или SaaS | Издание: «Номер 32. Хроника проектов» | Инженерный документ: «Архитектура систем, лист 1 из 4» |
| Как подать stats | Числа-карточки | «Цифры номера» в колонке | Таблица параметров в штампе |
| 390px | Готово | Одна колонка с сохранением линеек | Вертикальная стопка листов, схема каждого проекта — отдельный узел |

- **Почему эта пара:** оба направления несут смысл профессии (объяснять и проектировать) и нативно светлые. Они не пересекаются между собой: антиква и чтение против моно и манипуляции, «текст» против «схемы». В этой сессии не найдено их массовой шаблонизации.
- **Альтернатива C′ «Схема метро»:** сильнее по смыслу для фильтруемой сетки из 32 проектов, но сложнее в вёрстке на 390px (нужна вертикальная линейная схема).
- **Альтернатива B′ «Реестр / лог системы»:** строки вместо карточек, сортируемые столбцы, статусы. На 390px — записи-карточки. Хорошо сочетается с C, если C — схема метро.
- **Не рекомендую:** швейцарский стиль (слабый контраст с SaaS); необрутализм, ретро-ОС, холст, терминал, bento (клише или шаблоны); анти-дизайн и 3D (конфликт с B2B-аудиторией, светлым фоном и мобилой).
- Для кириллицы: в «газете» нужны `hyphens: auto` и `lang="ru"` из-за длинных слов в узких колонках; в «чертеже» моноширинный шрифт быстро съедает ширину 390px, поэтому текст описаний держать в пропорциональном шрифте, а моно — только для меток.

### Gaps
- Нет эмпирических данных (A/B-тестов), что пара «газета + чертёж» воспринимается лучше других; это экспертный вывод.
- Не проверено, есть ли у выбранных шрифтов кириллица с нужными начертаниями (узкий гротеск, буквицы).

## Вопрос 5. Что говорят рекрутеры, клиенты и дизайн-лиды о запоминающемся и о «трюкачестве»?

### Takeaway
Консенсус: визуальная необычность открывает дверь, но решение принимается по ясности (что сделал, какие решения, что изменилось) и удобству. Креативная обёртка, которая мешает найти контент, контакты или работает плохо на мобиле, вредит. Показательный кейс — PostHog-2025: колоссальное внимание, но технари отказывались от сайта из-за «браузера в браузере».

### Cited Findings
- Muzli (29.01.2026): «Visuals open the door. Clarity and judgment determine whether you stay in the room». Два порога: внимание (визуал) и доверие (что сделал, что решал, что изменилось). Ошибка — «Treating the portfolio like a gallery, not a product». «Your portfolio is your first product… judged on usability as much as content». Что работает: «fast load times, clear structure, visible contact information, no unnecessary friction» — [Muzli: Portfolio Mistakes 2026](https://muz.li/blog/portfolio-mistakes-designers-still-make-in-2026/)
- Там же: слишком много проектов сигнализирует о расфокусе; лучше меньше, но отобранных, с самым релевантным наверху. Важно для каталога из 32 проектов — [Muzli](https://muz.li/blog/portfolio-mistakes-designers-still-make-in-2026/)
- Indeed Design (апрель 2020, **старый**): «The first thing I ask myself is, does the portfolio look modern?» (Annie Jarvis). Красный флаг — только финальные макеты без пути к решению. Портфолио под паролем означает, что кандидата пропустят. Буткемп-портфолио «very polished but also formulaic» — [Indeed Design](https://indeed.design/article/ux-design-portfolio-advice-from-hiring-managers/)
- NN/g (2017): анти-дизайн уместен только для аудитории дизайнеров или в развлечениях; «nobody ever complains that a site is too easy to understand» — [NN/g: Brutalism and Antidesign](https://www.nngroup.com/articles/brutalism-antidesign/)
- NN/g (2017): «Task-focused users don't want to be wowed by a website — they want to get answers»; появление текста по скроллу раздражает — [NN/g: Scroll animations](https://www.nngroup.com/articles/scroll-animations/)
- NN/g (2025): необрутализм привлекает внимание, но без баланса «can overwhelm users and hinder accessibility» — [NN/g: Neobrutalism](https://www.nngroup.com/articles/neobrutalism/)
- Кейс PostHog (сентябрь 2025): «got a ton of attention… way more than any other website redesign». Одновременно: «I'm an engineer evaluating PostHog, and I bounced», «Fun, but a disaster for conversions once launch hype fades», «back button didn't do anything», «Suited more for PC than mobile» — [Newslepear #131](https://newslepear.beehiiv.com/p/131-what-do-people-think-about-the-new-posthog-website-and-a-fun-announcement-stunt-from-recall-ai); автор признаёт «initially a jarring experience» — [PostHog](https://posthog.com/blog/why-os)
- Ministry of Testing обсуждала риски запуска такого сайта — [Ministry of Testing](https://www.ministryoftesting.com/memories/what-risks-are-there-with-launching-a-website-like-this) (не прочитано)

### Inferences
- **Правило для обоих новых дизайнов:** метафора живёт в **визуальном слое**, а информационная архитектура остаётся той же. Те же секции, тот же порядок, фильтр работает так же, контакты видны, нативный скролл и кнопка «назад» не ломаются. Прямо следует из NN/g («keep it limited to visual design») и PostHog-кейса.
- Переключатель трёх стилей сам по себе и есть демонстрация диапазона. Поэтому каждый стиль должен давать **одинаково быстрый** доступ к сути: кто, что делал, результат. Иначе «креатив» будет выглядеть трюкачеством.
- Для B2B-аудитории ИИ-автоматизации (заказчики, а не арт-директора) лучше метафоры **«документа»** (газета, чертёж, реестр, схема), а не **«игрушки»** (ОС, холст, анти-дизайн, 3D-мир).
- Анимации: только для вторичных элементов, один раз, с учётом `prefers-reduced-motion`.

### Gaps
- Не найдено исследований NN/g именно о портфолио (юзабилити креативных портфолио у рекрутеров) за 2024–2026. Данные NN/g о брутализме и скролл-анимациях — 2017 года.
- Нет данных об отношении **клиентов** B2B-автоматизации (не нанимающих дизайнеров) к креативным портфолио. Мнения hiring-менеджеров перенесены на заказчиков по аналогии.
- Пост Tom Scott «8 red flags in design portfolios» и видео рекрутеров найдены, но не прочитаны — [LinkedIn](https://www.linkedin.com/posts/tomscottt_8-red-flags-in-design-portfolios-activity-7460948781556178944-GDbW), [YouTube](https://www.youtube.com/watch?v=JqsGReLZccQ)
