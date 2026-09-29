# Портфолио Андрея Юнева

Сайт-портфолио архитектора AI-систем: 32 проекта AI-автоматизации, контент-пайплайнов и инфраструктуры.

- Прод: https://andrey-yunev.vercel.app
- Репозиторий: https://github.com/andrewyu1985/portfolio-yunev
- Стек: Next.js 16.2.4 (App Router, Turbopack), React 19.2, TypeScript, Tailwind v4

> В Next 16 ломающие изменения. Перед кодом Next-специфики читайте `node_modules/next/dist/docs/` (см. `AGENTS.md`).

## Маршруты

| Адрес | Что это | Код |
|---|---|---|
| `/` | Главная в трёх дизайнах с переключателем вверху: «Классика», «Газета», «Чертёж» | `app/page.tsx`, `components/`, `components/designs/` |
| `/?design=newspaper`, `/?design=blueprint` | Прямые ссылки на «Газету» и «Чертёж» | `components/designs/registry.ts` |
| `/discs` | Версия «Диски» (3-й пункт переключателя — ссылка): ряд 3D-дисков на three.js, категории с переворотом, указатель всех проектов | `app/discs/`, `components/discs/`, стили `.dk-` |
| `/cinema`, `/cinema/archive` | Версия «Ателье» (2-й пункт переключателя, сразу после классики — ссылка): 3D-прокрутка, GSAP + Lenis | `app/cinema/`, `components/cinema/`, стили с префиксом `.cn-` |
| `/*.html` | Страницы-презентации проектов, статичный HTML | `public/`, общий каркас `public/presentation.css` + `public/presentation.js` |

## Данные

- `data/projects.ts` — все проекты: `id, title, description, icon, stack, features, tags, link/linkLabel, demoLink/demoLabel, status, featured`. Тип — `types/project.ts`.
  - Фильтр строится из тегов в порядке их первого появления (`allTags`), первый пункт — «Все».
  - Тег **«AI Creator»** (бывший «Контент») назван как в вакансиях, на которые откликается Андрей: рекрутер должен сразу найти этот раздел. Название и место в фильтре не менять.
  - Флагман (`featured: true`) — Private Chat. На карточке классики видны только первые три пункта `features`.
- `data/profile.ts` — тексты героя, «Обо мне» и контактов для «Газеты» и «Чертежа».
  - Классика держит свои копии текстов в `components/Hero.tsx`, `About.tsx`, `Footer.tsx`: правку текста вносить в оба места.
  - Счётчик проектов классики — вручную в `components/Hero.tsx` (`{ to: 32 }`); новые дизайны считают `projects.length` сами.

## Переключатель дизайнов главной

- `components/designs/DesignShell.tsx` — клиентская оболочка. Классика приходит из `app/page.tsx` готовым серверным слотом и попадает в статический HTML как раньше; её компоненты не менялись.
- «Газета» и «Чертёж» грузятся лениво через `import()` только при выборе (вместе со своими шрифтами) и рендерятся вместо классики. Смена — View Transition с круговым раскрытием от нажатой кнопки; при `prefers-reduced-motion` мгновенно.
- `components/designs/DesignSwitcher.tsx` + `shell.css` — полоса над меню: подпись «5 вариантов дизайна этой страницы» (склонение — `captionCount` в registry) и радиогруппа; на телефоне — строка «Эта страница в 4 вариантах дизайна — переключите:» над кнопками. «Ателье» и «Диски» — обычные ссылки на `/cinema` и `/discs` (`LINK_DESIGNS`); порядок пунктов задаёт `SWITCHER_ITEMS`. На `/cinema` и `/discs` та же полоса статичной копией — `components/cinema/DesignBar.tsx` (проп `active`).
- `components/designs/registry.ts` — список дизайнов (`DESIGNS`, `LINK_DESIGNS`, `DESIGN_COUNT`) и `DESIGN_BOOT_SCRIPT`: скрипт в `<head>` (`app/layout.tsx`) до отрисовки ставит `data-design` на `<html>` по `?design=…`, чтобы прямая ссылка не мигала классикой. На `<html>` поэтому стоит `suppressHydrationWarning`.
- Выбор хранится только в адресе (`history.replaceState`), localStorage не используется.

### Дизайны

- **«Газета»** — `components/designs/newspaper/`: первая полоса «Вестника автоматизации». Old Standard TT (заголовки), PT Serif (текст), Libre Franklin (рубрики); CSS-модуль, глобально только фон под `html[data-design="newspaper"]` (`newspaper-global.css`).
- **«Чертёж»** — `components/designs/blueprint/`: лист ЕСКД на светлой миллиметровке — рамка, основная надпись, структурная схема, спецификация, «слои»-фильтр. Tektur, Martian Mono, Caveat; все стили под `.bp`; карта слоёв с кодами и цветами — `model.ts`.

### Правила для новых дизайнов

1. Только светлые фоны: никаких тёмных секций, панелей, кнопок и подвалов.
2. На 390 px нет горизонтальной прокрутки страницы, цели касания ≥ 44 px; широкие таблицы и схемы перестраиваются или прокручиваются внутри своего контейнера.
3. Стили изолированы: CSS-модули или корневой класс дизайна; глобально — только под `html[data-design="<id>"]`.
4. Шрифты — `next/font/google` в `fonts.ts` своей папки, `preload: false`, `subsets: ['latin', 'cyrillic']`, переменная на корневом элементе дизайна, не на `<html>`.
5. Кириллицу проверять глазами, а не по флагу `subsets`: у Space Grotesk/Space Mono её нет вовсе; у Playfair на больших `opsz` и весах тонкие штрихи кириллицы пропадают («Вестнпк»); знака «→» нет в Google-подмножествах Martian Mono и Tektur.
6. Добавить дизайн: запись в `DESIGNS` и `isDesignId`, загрузчик в `loaders` (`DesignShell.tsx`), id в `DESIGN_BOOT_SCRIPT` и в правила `.ds-boot`/`.ds-classic` в `shell.css`, значок `.ds-glyph-<id>`.

## Стили классики

- Цвета — OKLCH-токены только в `:root` (`app/globals.css`), не в `@theme inline`: Tailwind v4 ломает oklch. При смене цветов удалять `.next` перед перезапуском.
- Шрифты: Unbounded, Manrope, JetBrains Mono (`app/layout.tsx`).

## Разработка и деплой

```bash
npm ci
npm run dev        # http://localhost:3000
npm run build      # все маршруты — ○ (Static)
npx tsc --noEmit -p .
```

- Деплой: `git push origin main` → Vercel собирает сам за ~30–60 с. `npx vercel` не нужен (токен CLI недействителен).
- Автор коммитов — из конфига репозитория (`andrewyu1985@users.noreply.github.com`), иначе Vercel отклонит деплой.
- Проверять прод через `curl`: из браузера без прокси `*.vercel.app` из России может не открываться.
- Если в основной папке работает другая сессия агента — работать в отдельном `git worktree`, перед push делать `git pull --rebase origin main`.

### Зеркало для России: https://andrey-yunev.ru

`*.vercel.app` у части российских провайдеров и в мобильных сетях не открывается: блокируются адреса Vercel (216.198.79.x, 64.29.17.x). Поэтому для резюме есть копия на российском хостинге reg.ru.

- Хостинг: `server27.hosting.reg.ru` (31.31.196.16), ISPmanager, сайт `andrey-yunev.ru` + `www`, папка `/www/andrey-yunev.ru`, DNS-зона на `ns1/ns2.hosting.reg.ru`.
- Сборка копии: `STATIC_EXPORT=1 next build` → `out/` (статический экспорт, `trailingSlash`, картинки без оптимизации, без аналитики Vercel — см. `next.config.ts`, `app/layout.tsx`). Обычная сборка для Vercel от этого не меняется.
- Обновить зеркало после изменений на сайте:

  ```bash
  py -3 scripts/deploy_ru.py            # собрать и залить изменившиеся файлы
  py -3 scripts/deploy_ru.py --dry-run  # что будет залито
  ```

  Скрипт меняет в копии `andrey-yunev.vercel.app` на `andrey-yunev.ru`, кладёт `.htaccess` и заливает по FTP (пользователь `u0572201_portfolio`) только изменённые файлы. Пароль FTP — локально, в `C:\chatium-archive\05_ACCOUNT\ftp_andrey-yunev_password.txt` или в переменной `FTP_PASSWORD`; в репозиторий не класть.
- Зеркало не обновляется само: после пуша в `main` запускать скрипт вручную.
- Переадресация со старого адреса: `public/ru-mirror.js` подключён в `app/layout.tsx` и во все `public/*.html`. На `andrey-yunev.vercel.app` страница проверяет, открывается ли у посетителя `https://andrey-yunev.ru` (запрос `ru-ping.txt`, 2,5 с), и если да — переводит на тот же путь с `?design=` и `#якорем` (`/cinema` → `/cinema/`); если нет (VPN, сеть без доступа к reg.ru, нет сертификата) — оставляет на Vercel. Тем, у кого Vercel заблокирован, переадресация не поможет: до старого адреса они не доходят. Новой странице-презентации в `public/` нужна та же строка `<script src="/ru-mirror.js" async></script>` перед `</head>`.
- Известное: статику и `.htaccess` на этом хостинге отдаёт nginx, поэтому своя страница 404 и правила `.htaccess` для статических файлов не действуют.

## Документация

- `docs/research/three-designs/` — исследование, по которому выбраны «Газета» и «Чертёж»: отчёт (`report.md`) и заметки (концепции, мобильная адаптация, техника переключателя, шрифты и палитры).
- Открытый вопрос: в `public/presentation.css` у заголовков карточек задан `'Space Grotesk'` без запасного шрифта — на страницах-презентациях кириллица рисуется Times New Roman.
