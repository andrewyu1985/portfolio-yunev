# Портфолио Андрея Юнева

Сайт-портфолио архитектора AI-систем: 28 проектов AI-автоматизации, контент-пайплайнов и инфраструктуры. Главная существует в пяти версиях оформления.

- Сайт: https://andrey-yunev.ru (хостинг reg.ru) — основной и единственный адрес для резюме и писем.
- Репозиторий: https://github.com/andrewyu1985/portfolio-yunev
- Стек: Next.js 16.2.4 (App Router, Turbopack), React 19.2, TypeScript, Tailwind v4
- На Vercel остаётся техническая копия (`andrey-yunev.vercel.app`): она пересобирается сама при каждом push и нужна только затем, чтобы старые ссылки переводили на основной адрес. Проверять и упоминать её в отчётах не нужно.

> В Next 16 ломающие изменения. Перед кодом Next-специфики читайте `node_modules/next/dist/docs/` (см. `AGENTS.md`).

## Маршруты

| Адрес | Что это | Код |
|---|---|---|
| `/` | Главная. «Классика» отдаётся сразу, «Газета» и «Чертёж» подгружаются по выбору в переключателе вверху | `app/page.tsx`, `components/`, `components/designs/` |
| `/?design=newspaper`, `/?design=blueprint` | Прямые ссылки на «Газету» и «Чертёж» | `components/designs/registry.ts` |
| `/cinema`, `/cinema/archive` | Версия «Ателье» (2-й пункт переключателя): 3D-прокрутка, GSAP + Lenis; архив — список всех проектов | `app/cinema/`, `components/cinema/`, стили с префиксом `.cn-` |
| `/discs` | Версия «Диски» (3-й пункт переключателя): ряд 3D-дисков на three.js, шесть категорий с переворотом, указатель всех проектов | `app/discs/`, `components/discs/`, стили `.dk-` |
| `/*.html` | Страницы проектов, статичный HTML | `public/`, общий каркас `public/presentation.css` + `public/presentation.js` |

Порядок пунктов переключателя: Классика · Ателье · Диски · Газета · Чертёж.

## Данные

- `data/projects.ts` — все проекты: `id, title, description, icon, stack, features, tags, link/linkLabel, demoLink/demoLabel, status, featured`. Тип — `types/project.ts`. Это единственный источник текстов карточек: все пять версий читают его.
  - Фильтр строится из тегов в порядке их первого появления (`allTags`), первый пункт — «Все».
  - Тег **«AI Creator»** (бывший «Контент») назван как в вакансиях, на которые откликается Андрей: рекрутер должен сразу найти этот раздел. Название и место в фильтре не менять.
  - Флагман (`featured: true`) — «Закрытый чат». На карточке классики видны первые три пункта `features`, в «Дисках» — первые два, в «Чертеже» — все: самое важное ставить первым.
  - Обе ссылки проекта (`link` и `demoLink`) показывают все пять версий. В «Ателье» это строка `.cn-arch__links` в архиве, в «Дисках» — вторая кнопка `.dk-open--second`.
  - Описание должно соответствовать примерам на странице проекта. Расхождение лечится добавлением материалов и текста, а не вычёркиванием (решение Андрея 07.10.2026: «усиливай проекты, а не обедняй их»).
- Число проектов записано текстом в «Классике» (`components/Hero.tsx`, `{ to: 28 }`), в «Ателье» (`components/cinema/Hero.tsx`, `Manifesto.tsx`, `Featured.tsx`, `Archive.tsx`, `data.ts`, `app/cinema/layout.tsx`, `app/cinema/archive/page.tsx`), в `app/discs/layout.tsx` и на страницах `public/ai-creator.html`, `public/website-creation.html`. При добавлении или удалении проекта править везде. «Газета» и «Чертёж» считают `projects.length` сами.
- В «Дисках» проект нужно ещё вписать в категорию (`components/discs/data.ts`) и положить обложку `public/discs/art/<id>.jpg`.
- Стена скриншотов в «Ателье» (`archiveShots` в `components/cinema/data.ts`) рассчитана ровно на 15 снимков 720×2400 из `public/cinema/archive/`.
- `data/profile.ts` — тексты героя, «Обо мне» и контактов для «Газеты» и «Чертежа». Классика держит свои копии в `components/Hero.tsx`, `About.tsx`, `Footer.tsx`: правку текста вносить в оба места.

## Страницы проектов

Каждая страница — самостоятельный HTML в `public/`. Картинки страницы лежат в своей папке.

| Страница | Карточка (`id`) | Материалы |
|---|---|---|
| `private-chat.html` | `private-chat` | `public/private-chat-login.png` |
| `hermes-system.html` | `hermes-system` | — |
| `ars-orchestrator.html` | `ars-orchestrator` | — |
| `second-brain-bot.html` | `second-brain-bot` | — |
| `deep-research-report.html`, `deep-research-prompt.html` | `deep-research` | образец исследования и образец промпта |
| `hh-report.html` | `hh-parser` | образец отчёта |
| `navigator.html` | `navigator-training` | — |
| `uneversum-catalog.html` | `uneversum-catalog` | — |
| `website-creation.html` | `website-creation` | `public/styles/` — снимки пяти версий сайта 1200×750; после заметной смены вида версии переснять |
| `onv-montage.html` | `onv-montage` | `public/onv/`; кадры четырёх стилей рилсов — `s-aura.jpg`, `s-glass.jpg`, `s-akvarel.jpg`, `s-poster.jpg` |
| `video-update.html` | `video-update` | `public/video-update/` — обложки пар «было / стало»; ролики на Rutube |
| `forum-video.html` | `forum-video` | `public/forum/`; ролик на Яндекс Диске |
| `mira-vs-time.html` | `mira-vs-time` | `public/mira/` |
| `told-after-dark.html` | `told-after-dark` | `public/tad/` |
| `reels-generator.html` | `reels-generator` | `public/reels/` — кадры трёх рилсов; четвёртый пример — ролик для форума |
| `pptx-design-system.html` | `pptx-design-system` | `public/pptx/` |
| `audio-to-book.html` | `audio-to-book` | `public/book/` |
| `verified-notes.html` | `verified-notes` | `public/notes/` |
| `ai-creator.html` | без карточки | страница-заявка под вакансии AI Creator, ссылка идёт в письмах |
| `quiz-funnel.html` | без карточки | не страница проекта, а переход на главную: проект снят с витрины, но адрес стоит в уже отправленных письмах |

Правила для новой страницы:

1. Подключить `/presentation.css` и `/presentation.js`, задать свою палитру в `:root` (переменные перечислены в начале `presentation.css`). Только светлые фоны.
2. Перед `</head>` — строка `<script src="/ru-mirror.js" async></script>`.
3. У Space Grotesk нет кириллицы. В общем каркасе у части заголовков он задан без запасного шрифта, поэтому в стилях страницы дописывать: `.nav-mark,.card h3,.card h4,.cta h2{font-family:'Space Grotesk','Inter',system-ui,sans-serif}`.
4. У картинки с атрибутами `width` и `height` внутри flex-колонки `aspect-ratio` не сработает без `height:auto` — кадр обрежется.
5. Проверять на ширине 390 px: без горизонтальной прокрутки, картинки загружаются.
6. Заказчиков со стороны не называть (ролик для форума, дизайн-система презентаций). Проекты школы «Юневерсум» называются своим именем.
7. Вписать страницу в таблицу выше.

## Переключатель версий главной

- `components/designs/DesignShell.tsx` — клиентская оболочка. Классика приходит из `app/page.tsx` готовым серверным слотом и попадает в статический HTML.
- «Газета» и «Чертёж» грузятся лениво через `import()` только при выборе (вместе со своими шрифтами) и рендерятся вместо классики. Смена — View Transition с круговым раскрытием от нажатой кнопки; при `prefers-reduced-motion` мгновенно.
- `components/designs/DesignSwitcher.tsx` + `shell.css` — полоса над меню: подпись «5 вариантов дизайна этой страницы» (склонение — `captionCount` в registry) и радиогруппа; на телефоне — строка над кнопками. «Ателье» и «Диски» — обычные ссылки на `/cinema` и `/discs` (`LINK_DESIGNS`); порядок пунктов задаёт `SWITCHER_ITEMS`. На `/cinema` и `/discs` та же полоса статичной копией — `components/cinema/DesignBar.tsx` (проп `active`).
- `components/designs/registry.ts` — список версий (`DESIGNS`, `LINK_DESIGNS`, `DESIGN_COUNT`) и `DESIGN_BOOT_SCRIPT`: скрипт в `<head>` (`app/layout.tsx`) до отрисовки ставит `data-design` на `<html>` по `?design=…`, чтобы прямая ссылка не мигала классикой. На `<html>` поэтому стоит `suppressHydrationWarning`.
- Выбор хранится только в адресе (`history.replaceState`), localStorage не используется.

### Версии

- **«Классика»** — `components/*.tsx`. Цвета — OKLCH-токены только в `:root` (`app/globals.css`), не в `@theme inline`: Tailwind v4 ломает oklch. При смене цветов удалять `.next` перед перезапуском. Шрифты: Unbounded, Manrope, JetBrains Mono (`app/layout.tsx`).
- **«Ателье»** — `components/cinema/`: 3D-колода восьми избранных проектов, параллакс, стена скриншотов, архив. Prata + Onest. Текст на картинку не кладётся.
- **«Диски»** — `components/discs/`: React Three Fiber, семь фиксированных слотов, обложки и этикетки рисуются на canvas. Oranienbaum + Golos Text.
- **«Газета»** — `components/designs/newspaper/`: первая полоса «Вестника автоматизации». Old Standard TT, PT Serif, Libre Franklin; CSS-модуль, глобально только фон под `html[data-design="newspaper"]`.
- **«Чертёж»** — `components/designs/blueprint/`: лист ЕСКД на светлой миллиметровке — рамка, основная надпись, структурная схема, спецификация, «слои»-фильтр. Tektur, Martian Mono, Caveat; все стили под `.bp`. Высота подписей схемы растёт вместе с самым длинным названием проекта.

### Правила для новых версий

1. Только светлые фоны: никаких тёмных секций, панелей, кнопок и подвалов.
2. На 390 px нет горизонтальной прокрутки страницы, цели касания ≥ 44 px; широкие таблицы и схемы перестраиваются или прокручиваются внутри своего контейнера.
3. Стили изолированы: CSS-модули или корневой класс версии; глобально — только под `html[data-design="<id>"]`.
4. Шрифты — `next/font/google` в `fonts.ts` своей папки, `preload: false`, `subsets: ['latin', 'cyrillic']`, переменная на корневом элементе версии, не на `<html>`.
5. Кириллицу проверять глазами, а не по флагу `subsets`: у Space Grotesk/Space Mono её нет вовсе; у Playfair на больших `opsz` и весах тонкие штрихи кириллицы пропадают («Вестнпк»); знака «→» нет в Google-подмножествах Martian Mono и Tektur.
6. Добавить версию: запись в `DESIGNS` и `isDesignId`, загрузчик в `loaders` (`DesignShell.tsx`), id в `DESIGN_BOOT_SCRIPT` и в правила `.ds-boot`/`.ds-classic` в `shell.css`, значок `.ds-glyph-<id>`.
7. Материалы и описания во всех версиях одинаковы: новая версия показывает описание и обе ссылки проекта из `data/projects.ts`.

## Разработка и выкладка

```bash
npm ci
npm run dev -- -p 3312     # открывать http://localhost:3312, не 127.0.0.1
npx tsc --noEmit -p .
```

Порядок выкладки после любой правки сайта:

```bash
# 1. сохранить и отправить код (автор коммита — из конфига репозитория)
git fetch origin && git rebase origin/main && git push origin HEAD:main

# 2. собрать копию для сайта — без прокси: через прокси сборка падает на шрифтах Google
env -u HTTPS_PROXY -u HTTP_PROXY -u https_proxy -u http_proxy -u ALL_PROXY -u all_proxy STATIC_EXPORT=1 npx next build

# 3. посмотреть, что уйдёт на хостинг, и залить
py -3 scripts/deploy_ru.py --skip-build --dry-run
py -3 scripts/deploy_ru.py --skip-build

# 4. проверить на сайте
curl --noproxy '*' -s -o /dev/null -w '%{http_code}\n' https://andrey-yunev.ru/
```

- Правка только в `public/` (статическая страница или картинка) сборки не требует: скопировать изменённые файлы в `out/` и выполнить шаг 3.
- Автор коммитов — `andrewyu1985@users.noreply.github.com`, иначе Vercel отклонит сборку технической копии.
- Если в основной папке работает другая сессия агента — работать в отдельном `git worktree`.
- Локальный сервер, запущенный в фоне, после остановки задачи оставляет процесс `node …\next\dist\server\lib\start-server.js` на порту: гасить его по PID, проверив командную строку, а не по маске `node`.

### Хостинг

- `server27.hosting.reg.ru` (31.31.196.16), ISPmanager, сайт `andrey-yunev.ru` + `www`, папка `/www/andrey-yunev.ru`, DNS-зона на `ns1/ns2.hosting.reg.ru`. Сертификат Let's Encrypt продлевает панель.
- `STATIC_EXPORT=1` включает в `next.config.ts` статический экспорт в `out/` (`trailingSlash`, картинки без оптимизации, без аналитики Vercel).
- `scripts/deploy_ru.py` заливает по FTP (пользователь `u0572201_portfolio`) только файлы, чей хеш изменился, и удаляет с хостинга те, которых больше нет. Список залитого — `.deploy-ru-manifest.json` (в git не попадает). Пароль FTP — локально, в `C:\chatium-archive\05_ACCOUNT\ftp_andrey-yunev_password.txt` или в переменной `FTP_PASSWORD`; в репозиторий не класть.
- Сайт не обновляется сам: после push обязательно шаги 2–4.
- `public/ru-mirror.js` подключён в `app/layout.tsx` и во все `public/*.html`: на технической копии `*.vercel.app` страница проверяет, открывается ли у посетителя `https://andrey-yunev.ru` (запрос `ru-ping.txt`, 2,5 с), и переводит на тот же путь с `?design=` и `#якорем`. На самом `andrey-yunev.ru` скрипт ничего не делает.
- Известное: статику на этом хостинге отдаёт nginx, поэтому своя страница 404 и правила `.htaccess` для статических файлов не действуют.

### Проверка сайта

Скрипты в `scripts/audit/` (запуск: `python3 -I -X utf8 <скрипт> …`):

- `links_inventory.py <корень репо> <папка результатов>` — собирает все ссылки из `out/` и из исходников, проверяет внутренние ссылки и якоря, пишет `inventory.json`.
- `check_external.py <папка результатов>` — открывает каждую внешнюю ссылку напрямую и через прокси. YouTube проверяется через oEmbed, Яндекс Диск — через открытый API (`cloud-api.yandex.net/v1/disk/public/resources?public_key=…`: `curl` по самой ссылке отдаёт капчу), Telegram-посты — через `?embed=1`. Rutube: `https://rutube.ru/api/video/<id>/?format=json&p=<ключ>` отдаёт название, длительность и обложку.
- `live_assets.py <корень репо>` — проверяет, что хостинг отдаёт каждый файл из `out/`.
- `shots.py <адрес локального сервера> <папка> styles|page` — снимки пяти версий (Playwright, системный Chrome; для «Дисков» нужны флаги `--use-angle=swiftshader --enable-unsafe-swiftshader` и ожидание ухода `.dk-preload`).

## История и открытые вопросы

- `docs/research/three-designs/` — исследование, по которому выбраны «Газета» и «Чертёж»: отчёт (`report.md`) и заметки.
- 07.10.2026: проверка всего сайта (54 замечания, отчёт у владельца); с витрины сняты «Бот-библиотекарь», «Радар YouTube», «Воронка „РОСТ“» и «VPN-инфраструктура» — стало 28 проектов; у «Создания сайтов» и «Генератора рилсов» появились свои страницы; на странице видеокурсов — пары «было / стало»; у ИИ-монтажёра — четыре стиля рилсов; «Ролик для стенда на форуме по микроэлектронике 2026»; основной адрес — `andrey-yunev.ru`.
- Открыто: в `public/presentation.css` у заголовков карточек задан `'Space Grotesk'` без запасного шрифта — на старых страницах кириллица рисуется шрифтом браузера по умолчанию (новые страницы переопределяют это у себя).
- Открыто: нет файла `public/og-image.jpg`, а у страниц проектов и «Дисков» картинка для превью в мессенджерах не задана.
- Открыто: названия в карточках переведены на русский, страницы проектов называются по-старому (Private Chat, Hermes, Mira vs Time, «Апдейт видеокурсов» и другие).
- Открыто: на странице и в карточке ИИ-монтажёра стоит «13 рилсов по шести вопросам» — число нужно уточнить у владельца, сданы все девять вопросов.
