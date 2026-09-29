# Техническая реализация runtime-переключателя трёх дизайнов (Next.js 16.2.4 / React 19.2.4 / Tailwind v4 / Vercel)

> Проверено на реальном проекте `C:\Users\andre\portfolio-yunev`: `next@16.2.4`, `react@19.2.4`, `react-dom@19.2.4`, `@types/react@19.2.14`, `tailwindcss@4`, `next.config.ts` пустой (экспериментальных флагов нет). Главная `/` сейчас статически пререндерится: есть `C:\Users\andre\portfolio-yunev\.next\server\app\index.html`.
> Условные обозначения источников: «Лок. док» — файлы документации Next 16.2.4 в `C:\Users\andre\portfolio-yunev\node_modules\next\dist\docs\`; «Лок. исходник» — файлы в `node_modules`; «Лок. сборка» — артефакты `.next` проекта.

## 1. Механика переключения: условный рендер в клиентской «оболочке» vs CSS-темы vs отдельные маршруты

### Takeaway
CSS-темизация отпадает: DOM, раскладка и взаимодействия у дизайнов разные. Жизнеспособны два варианта. **(A) Рекомендуемый — клиентская оболочка на одном маршруте `/`.** Дизайн №1 передаётся в неё как server-rendered слот `children`/prop и остаётся в статическом HTML байт в байт. Дизайны №2 и №3 подгружаются лениво только на клиенте, в DOM одновременно смонтировано одно дерево. **(B) Альтернатива — отдельные статические маршруты `/v2` и `/v3`.** Её можно спрятать за `/?design=v2` через `rewrites` с условием `has: query`. Вариант B лучше, если нужны deep-link'и без мигания и SSR самих дизайнов №2/№3. Цена — навигация с загрузкой RSC и дубли контента (нужен canonical). `<Activity>` для удержания скрытых дизайнов **не подходит**: скрытое дерево остаётся в DOM, отсюда дубли `#projects`/`#about` и утечка стилей.

### Cited Findings
- Паттерн «слота» официально описан: «A common pattern is to use `children` to create a _slot_ in a `<ClientComponent>`». Серверный контент можно передать внутрь клиентского компонента, и он будет отрендерен на сервере — [Лок. док: server-and-client-components.md](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md) (строки ~289–310). Там же: «Props passed to Client Components need to be serializable by React» — [Лок. док: server-and-client-components.md](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md).
- Контекст недоступен в Server Components. Для общего состояния нужен клиентский провайдер, который принимает `children` — [Лок. док: server-and-client-components.md, раздел «Context providers»](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md).
- Текущая структура: `app/page.tsx` — серверный компонент, он рендерит `<RevealObserver/> <Nav/> <main><Hero/><Projects/><About/></main> <Footer/>`. Секции содержат `id="projects"`, `id="about"`, `id="contact"`, у Nav стоит `position: 'sticky', top: 0, zIndex: 100` — [Лок. код: app/page.tsx](file:///C:/Users/andre/portfolio-yunev/app/page.tsx), [components/Nav.tsx](file:///C:/Users/andre/portfolio-yunev/components/Nav.tsx), [components/Projects.tsx](file:///C:/Users/andre/portfolio-yunev/components/Projects.tsx), [components/About.tsx](file:///C:/Users/andre/portfolio-yunev/components/About.tsx), [components/Footer.tsx](file:///C:/Users/andre/portfolio-yunev/components/Footer.tsx).
- Скрытое через `<Activity mode="hidden">` содержимое остаётся в документе: «Hidden Activity content has `display: none` but remains in the document… DOM queries can find hidden elements». Стили страницы (CSS-переменные, z-index, глобальные классы) «can affect visible pages when the originating component is hidden by Activity» — [Лок. док: preserving-ui-state.md](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/02-guides/preserving-ui-state.md) (строки ~265, ~307). Activity прячет через `display: none`, сохраняет state и уничтожает эффекты — [react.dev: Activity](https://react.dev/reference/react/Activity).
- Шрифт, объявленный в `page`, предзагружается только на маршруте этой страницы: «If it's a unique page, it is preloaded on the unique route for that page» — [Лок. док: font.md, раздел «Preloading»](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/03-api-reference/02-components/font.md). Для варианта B это значит, что шрифты `/v2` не попадут в `/`.
- Rewrites поддерживают условие по query (`has: [{ type: 'query', key: '...' }]`, в том числе в `beforeFiles`), и «Rewrites are applied to client-side routing» — [Лок. док: rewrites.md](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/rewrites.md) (строки 37, 54–61, 237+). Альтернатива — `proxy.ts` (в Next 16 это бывший middleware) с `matcher` и `has: [{ type: 'query', ... }]` — [Лок. док: proxy.md](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md) (строки 97–114).
- Canonical задаётся через `metadata.alternates.canonical` — [Лок. док: generate-metadata.md](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md) (строки ~402–416).
- Прокрутка при навигации через `<Link>` по умолчанию сохраняется, пока новая Page видна во вьюпорте. Иначе Next скроллит к первому элементу Page, причём sticky/fixed элементы при этом пропускаются — [Лок. док: link.md](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/03-api-reference/02-components/link.md) (строки 232–236, 845–851).

### Inferences
- **Сравнение вариантов:**
  | Критерий | CSS-темы | (A) Клиентская оболочка на `/` | (B) Маршруты `/v2`, `/v3` (+ rewrite `?design=`) |
  |---|---|---|---|
  | Разный DOM/раскладка/интерактив | нет | да | да |
  | Дизайн №1 без изменений и в статическом HTML | да | да (слот) | да (страница вообще не трогается, кроме тоггла) |
  | JS/шрифты дизайнов №2/3 на первой загрузке `/` | — | нет при ленивом импорте и `preload:false` | нет автоматически |
  | SEO дизайнов №2/3 | — | не индексируются (клиентский рендер) — это нормально для вариаций | индексируются; нужен canonical на `/` или `noindex` против дублей |
  | Deep-link без мигания | — | нужен inline-скрипт и скрытие №1 до загрузки чанка | «из коробки» (статический HTML нужного дизайна) |
  | Скорость переключения | мгновенно | мгновенно после прогрева чанка | навигация с RSC-запросом (Link префетчит) |
  | Дубли `id` | — | нет (смонтировано одно дерево) | нет |
  | Кольцевая View Transition от кнопки | — | проще всего (ручной `startViewTransition`) | через React/Next-интеграцию (`experimental.viewTransition`, `transitionTypes`), кольцо сложнее |
- **Рекомендуемая схема A:**
  ```tsx
  // app/page.tsx — остаётся Server Component, страница статична
  import DesignShell from '@/components/design/DesignShell'
  import ClassicDesign from '@/components/design/ClassicDesign' // текущее тело страницы 1:1, включая <RevealObserver/>
  export default function Home() {
    return <DesignShell classic={<ClassicDesign />} />
  }
  ```
  `DesignShell` ('use client') хранит `design: 'classic' | 'v2' | 'v3'`. Рендерит `classic` (серверный слот) либо загруженный компонент дизайна. Тоггл лежит вне переключаемых деревьев (фиксированная полоса сверху), чтобы не пересоздаваться.
- `RevealObserver` должен остаться **внутри** поддерева дизайна №1. Он делает `querySelectorAll('.reveal')` один раз на mount, а `.reveal` имеет `opacity: 0` до класса `.visible` ([components/RevealObserver.tsx](file:///C:/Users/andre/portfolio-yunev/components/RevealObserver.tsx), [app/globals.css](file:///C:/Users/andre/portfolio-yunev/app/globals.css)). Если оставить его снаружи, при возврате на дизайн №1 новые `.reveal`-узлы не получат наблюдателя и останутся невидимыми.
- Одинаковые якоря (`#projects`, `#about`, `#contact`) стоит сохранить во всех трёх дизайнах. Тогда ссылки `/#projects` работают при любом дизайне, а дублей нет, потому что смонтировано одно дерево.
- Вариант B с `rewrites` на статические `/v2` и `/v3` на Vercel должен обслуживаться на уровне маршрутизации CDN, без вызова функции. Это вывод, в документации для Vercel прямо не проверено.

### Gaps
- Не проверено экспериментально, как именно Vercel кэширует и отдаёт `/?design=v2` при rewrite в статическую `/v2`. Также не проверено, корректно ли App Router переиспользует префетч для URL с query при rewrite.
- В документации нет явного ответа, как `<Link>` ведёт себя со скроллом при полной смене Page через rewrite. Надёжнее явно вызывать `scrollTo`.

## 2. Code-splitting дизайнов №2/№3: `next/dynamic` vs `React.lazy`, правила `ssr:false` в Next 16

### Takeaway
Ленивый импорт должен жить **в клиентском компоненте** (оболочке). Из Server Component автоматический code-splitting клиентских компонентов не работает, а `ssr:false` там запрещён и даёт ошибку. `next/dynamic` — это обёртка над `React.lazy` и `Suspense`, оба варианта грузят чанк только при первом рендере. Для переключения с View Transition лучше **сначала `await import()`, потом синхронно рендерить уже загруженный компонент**, иначе Suspense-fallback попадёт в снимок перехода.

### Cited Findings
- Есть два способа: `next/dynamic` и `React.lazy()` с Suspense. «`next/dynamic` is a composite of `React.lazy()` and Suspense» — [Лок. док: lazy-loading.md](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/02-guides/lazy-loading.md).
- Пример в документации: `'use client'` плюс `{showMore && <ComponentB />}`, где ComponentB помечен «Load on demand, only when/if the condition is met» — [Лок. док: lazy-loading.md](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/02-guides/lazy-loading.md).
- «When a Server Component dynamically imports a Client Component, automatic code splitting is currently **not** supported.» — [Лок. док: lazy-loading.md](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/02-guides/lazy-loading.md).
- «`ssr: false` option is not supported in Server Components. You will see an error if you try to use it in Server Components… Please move it into a Client Component.» Также: «`ssr: false` option will only work for Client Components, move it into Client Components ensure the client code-splitting working properly.» — [Лок. док: lazy-loading.md](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/02-guides/lazy-loading.md).
- «When using `React.lazy()` and Suspense, Client Components will be prerendered (SSR) by default.» — [Лок. док: lazy-loading.md](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/02-guides/lazy-loading.md).
- Путь в `import()` должен быть литералом внутри вызова `dynamic()`, не шаблонной строкой и не переменной. `dynamic()` вызывается на верхнем уровне модуля. Это сказано в PagesOnly-части, но ограничение относится к бандлеру — [Лок. док: lazy-loading.md](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/02-guides/lazy-loading.md).
- Под Turbopack есть magic-comments `turbopackIgnore` и `turbopackOptional` — [Лок. док: lazy-loading.md](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/02-guides/lazy-loading.md).
- React о ViewTransition и flushSync: «If a `flushSync` happens to get in the middle of this sequence, then React will skip the Transition» — [react.dev: ViewTransition](https://react.dev/reference/react/ViewTransition).

### Inferences
- Дизайн №1 всегда стартовый на сервере, поэтому `ssr:false` на ленивых дизайнах ничего не меняет в HTML. Он лишь явно фиксирует, что №2/№3 не пререндерятся. Допустим, потому что оболочка — клиентский компонент.
- **Паттерн без Suspense для плавной смены:** хранить в state не id, а уже загруженный компонент.
  ```tsx
  'use client'
  const loaders = {
    v2: () => import('./v2/DesignV2'),   // литеральные пути → отдельные чанки
    v3: () => import('./v3/DesignV3'),
  } as const
  // прогрев: onPointerEnter / onFocus / requestIdleCallback → loaders.v2()
  async function switchTo(id: 'v2'|'v3') {
    const { default: Comp } = await loaders[id]()   // чанк уже загружен
    runViewTransition(() => setCurrent({ id, Comp })) // flushSync внутри, см. раздел 4
  }
  ```
  Если вместо этого отрендерить `React.lazy`/`dynamic`-компонент внутри `flushSync`, он при первом рендере саспендится даже с закэшированным модулем. В снимок View Transition тогда попадёт fallback. Это вывод из механики lazy, отдельно не проверялся.
- Если View Transition не нужна, достаточно `const DesignV2 = dynamic(() => import('./v2/DesignV2'), { ssr: false, loading: () => <Skeleton/> })` в оболочке.
- Прогрев через `import()` с тем же литеральным путём должен попадать в тот же чанк (бандлер дедуплицирует модуль). Проверить в Network после `next build`.

### Gaps
- Не проверялось на сборке, что Turbopack в 16.2.4 не включает чанки `v2`/`v3` в initial JS `/`. Нужно проверить после внедрения: сравнить размер JS `/` до и после (например, по `.next/static/chunks`, загружаемым на `/`, в DevTools → Network).

## 3. Шрифты для каждого дизайна (`next/font/google`, `preload:false`, переменные на обёртке, кириллица)

### Takeaway
Шрифты дизайнов №2/№3 объявляются на уровне модуля в отдельном `designs/fonts.ts`, который импортируют **только** ленивые модули дизайнов. Нужно поставить **`preload: false`**, а `.variable`/`.className` вешать на корневую обёртку дизайна, а не на `<html>`. Механизм подтверждён исходником Next 16.2.4: файлы с `preload:true` получают суффикс `.p.` и попадают в preload-манифест конкретного entry (`[project]/app/page`), а с `preload:false` — нет. Сейчас `/` уже предзагружает 6 woff2 (3 семейства × latin+cyrillic). Добавлять к ним шрифты №2/№3 нельзя.

### Cited Findings
- Опция `preload`: «A boolean value that specifies whether the font should be preloaded or not. The default is `true`.» — [Лок. док: font.md](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/03-api-reference/02-components/font.md).
- `subsets`: «Fonts specified via `subsets` will have a link preload tag injected into the head when the `preload` option is true». Также: «Failing to specify any subsets while `preload` is `true` will result in a warning.» — [Лок. док: font.md](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/03-api-reference/02-components/font.md).
- `display` по умолчанию `'swap'`. `adjustFontFallback` для google по умолчанию `true` (метрический fallback против CLS) — [Лок. док: font.md](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/03-api-reference/02-components/font.md).
- Переменная на контейнере, а не на `<html>`: «set the `className` of the parent container of the text you would like to style to the font loader's `variable` value». Пример: `<main className={inter.variable}>` — [Лок. док: font.md, раздел CSS variables](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/03-api-reference/02-components/font.md). Для Tailwind: «You can add these variables to the `<html>` or `<body>` tag, depending on your preference» — [там же](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/03-api-reference/02-components/font.md).
- Файл определений шрифтов: «Every time you call the `localFont` or Google font function, that font will be hosted as one instance… load it in one place and import the related font object where you need it» — [Лок. док: font.md, «Using a font definitions file»](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/03-api-reference/02-components/font.md). Подход «utility-файл с экспортом шрифтов… This ensures the font is preloaded only when it's rendered» — [Лок. док: font.md, «Using Multiple Fonts»](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/03-api-reference/02-components/font.md).
- «Recommendation: Use multiple fonts conservatively since each new font is an additional resource the client has to download.» — [Лок. док: font.md](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/03-api-reference/02-components/font.md).
- Как это устроено внутри: «next-font-loader will emit the font file as `[name].p.[ext]` instead of `[name].[ext]`» при preload, а в манифест попадают только файлы по регулярке `/\.p\.(woff|woff2|eot|ttf|otf)$/` — [Лок. исходник: next-font-manifest-plugin.js](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/build/webpack/plugins/next-font-manifest-plugin.js). Preload-теги берутся из `nextFontManifest.app[<путь entry без расширения>]` — [Лок. исходник: get-preloadable-fonts.js](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/server/app-render/get-preloadable-fonts.js).
- Фактическое состояние сборки: `.next/server/next-font-manifest.json` содержит для `"[project]/app/page"` 6 файлов `*.p.*.woff2`, а в `<head>` HTML `/` ровно 6 `<link rel="preload" … as="font">` — [Лок. сборка: next-font-manifest.json](file:///C:/Users/andre/portfolio-yunev/.next/server/next-font-manifest.json), [Лок. сборка: index.html](file:///C:/Users/andre/portfolio-yunev/.next/server/app/index.html).
- Текущие шрифты: Unbounded (400–900), Manrope (400–600), JetBrains Mono (400–500), все `subsets: ['latin','cyrillic']`, `display:'swap'`, переменные `--font-unbounded`/`--font-manrope`/`--font-jetbrains` на `<html>` — [Лок. код: app/layout.tsx](file:///C:/Users/andre/portfolio-yunev/app/layout.tsx).
- В компилированном `@next/font` google-лоадере есть проверка «Unknown subset…». Шрифт без кириллического подмножества упадёт на сборке, если указать `cyrillic` — [Лок. исходник: node_modules/next/dist/compiled/@next/font/dist/google/](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/compiled/@next/font/dist/google/).

### Inferences
- Рецепт:
  ```ts
  // components/design/fonts-v2.ts — импортируется ТОЛЬКО из components/design/v2/*
  import { Fraunces, Onest } from 'next/font/google'   // пример: выбрать гарнитуры с cyrillic
  export const v2Display = Fraunces({ subsets: ['latin','cyrillic'], variable: '--v2-display', display: 'swap', preload: false })
  export const v2Body    = Onest({ subsets: ['latin','cyrillic'], variable: '--v2-body', display: 'swap', preload: false })
  // DesignV2.tsx: <div data-design-root="v2" className={`${v2Display.variable} ${v2Body.variable}`}> …
  ```
  Кириллица есть не у всех гарнитур Google Fonts. Выбирать с подмножеством `cyrillic`, иначе сработает ошибка «Unknown subset».
- `preload:false` страхует независимо от того, в какой entry Turbopack отнесёт шрифты лениво импортированного модуля. Без него есть риск, что шрифты №2/№3 попадут в preload-список `[project]/app/page` и утяжелят первую загрузку №1.
- При `preload:false` и `display:'swap'` в момент первого переключения на №2/№3 возможен короткий FOUT. Смягчение: прогревать шрифты вместе с чанком при hover/focus тоггла (`document.fonts.load('1em "…"')` после импорта модуля) либо переключать только после `document.fonts.ready`.
- CSS-переменная шрифта, объявленная на обёртке дизайна, не видна `body`. Поэтому `font-family` для дизайна задаётся на самой обёртке, а не на `body`.
- Tailwind v4: в `globals.css` стоит `@theme inline { --font-display: var(--font-unbounded); … }`. Насколько я понимаю поведение `inline`, утилиты вроде `font-display` компилируются прямо в `var(--font-unbounded)`, поэтому переопределение `--font-display` в скоупе дизайна их не затронет. Это не проверено, см. Gaps. Для №2/№3 лучше свои переменные и свои токены.

### Gaps
- Не удалось найти в JS-коде 16.2.4 точный текст ошибки о том, что вызов font loader обязан быть `const` на уровне модуля (вероятно, проверка в SWC-бинаре). Практическое правило «вызывать на верхнем уровне модуля и присваивать `const`» следует из всех примеров документации, но цитаты-запрета нет.
- Документация не говорит прямо, можно ли вызывать `next/font/google` в модуле с `'use client'`, который импортируется динамически. Примеры есть только в layout/page и в «font definitions file». Проверить сборкой.
- Поведение Tailwind v4 `@theme inline` при скоупном переопределении переменных не проверено по документации Tailwind.

## 4. View Transitions: ручной `startViewTransition` + `flushSync` vs React `<ViewTransition>`, флаг Next, поддержка браузеров, reduced motion, кольцевое раскрытие

### Takeaway
Для смены дизайна целиком (свап корня) лучший вариант — **ручной `document.startViewTransition(() => flushSync(...))` с кольцом `clip-path` на `::view-transition-new(root)`**. Он не требует экспериментального флага, работает в Chrome/Edge 111+, Safari 18+, Firefox 144+ и легко отключается для reduced motion. React `<ViewTransition>` в этом проекте технически доступен: App Router использует вендорный React **19.3.0-canary-3f0b9e61-20260317**, где он экспортируется. Но установленный `react@19.2.4` его **не содержит**, флаг Next `experimental.viewTransition` помечен как experimental, а стабильным `<ViewTransition>` стал только в React 19.3 (09.09.2026). Смешивать два подхода нельзя: React прерывает чужие view transitions.

### Cited Findings
- Проверено в node_modules: установленный `react@19.2.4` не экспортирует `ViewTransition`/`addTransitionType` (`'ViewTransition' in require('react') === false`), а `react-dom@19.2.4/cjs/react-dom-client.production.js` содержит 0 упоминаний `startViewTransition`. Вендорный `next/dist/compiled/react` имеет `version = "19.3.0-canary-3f0b9e61-20260317"` и экспортирует `ViewTransition`, `addTransitionType`, `Activity`. В вендорном `react-dom-client.production.js` 3 упоминания `startViewTransition` — [Лок. исходник: next/dist/compiled/react/cjs/react.production.js](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/compiled/react/cjs/react.production.js), [Лок. исходник: next/dist/compiled/react-dom/cjs/react-dom-client.production.js](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/compiled/react-dom/cjs/react-dom-client.production.js).
- Типы: `next/dist/types.d.ts` содержит `/// <reference types="react/experimental" preserve="true" />`, а `@types/react/canary.d.ts` объявляет `ViewTransition` и `addTransitionType`. Импорт `import { ViewTransition } from 'react'` проходит проверку типов в Next-проекте — [Лок. исходник: next/dist/types.d.ts](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/types.d.ts), [Лок. исходник: @types/react/canary.d.ts](file:///C:/Users/andre/portfolio-yunev/node_modules/@types/react/canary.d.ts).
- Экспериментальный канал React включается только флагами `taint`, `transitionIndicator`, `gestureTransition`. `viewTransition` в этот список не входит — [Лок. исходник: needs-experimental-react.js](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/lib/needs-experimental-react.js). В `config-shared.js` по умолчанию `viewTransition: false` — [Лок. исходник: next/dist/server/config-shared.js](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/server/config-shared.js).
- Документ флага: `version: experimental`. «The `experimental.viewTransition` flag enables Next.js integration, such as triggering transitions during route navigations.» — [Лок. док: viewTransition.md](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/viewTransition.md).
- Гайд Next: «`<ViewTransition>` animations are activated by Transitions, `<Suspense>`, and `useDeferredValue`. Regular `setState` calls do not trigger them. In Next.js, route navigations are transitions». Про поддержку: «The View Transitions API is supported in all major browsers, though some animations may behave differently in Safari. Without browser support, your application works normally, the transitions simply do not animate.» Для reduced motion даётся CSS, обнуляющий `animation-duration`/`animation-delay` у `::view-transition-old(*)`, `::view-transition-new(*)`, `::view-transition-group(*)`. Шапку предлагается «заякорить» через `viewTransitionName: 'site-header'` с `animation: none`. `<Link transitionTypes={[...]}>` задаёт направленные анимации — [Лок. док: view-transitions.md](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/02-guides/view-transitions.md). Проп `transitionTypes?: string[]` у Link есть в типах 16.2.4 — [Лок. исходник: next/dist/client/app-dir/link.d.ts](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/client/app-dir/link.d.ts).
- React 19.3 (09.09.2026): «both of these [View Transitions and Fragment Refs] are now stable in React 19.3!» — [react.dev blog: React 19.3](https://react.dev/blog/2026/09/09/react-19-3).
- React о собственном вызове API: «React automatically calls `startViewTransition` itself behind the scenes so you should never do that yourself. In fact, if you have something else on the page running a ViewTransition React will interrupt it.» Также: «React doesn't automatically disable animations for this case [reduced motion]… We recommend always using the `@media (prefers-reduced-motion)` media query». И: «`<ViewTransition>` only activates exit/enter if it is placed _before_ any DOM nodes» — [react.dev: ViewTransition](https://react.dev/reference/react/ViewTransition).
- Поддержка браузеров (same-document): Chrome 111+, Edge 111+, Safari 18+, Firefox 144+ (вышел 14.10.2025). `view-transition-class` и `match-element`: Chrome/Edge 137+, Firefox 144+, Safari 18.4+. Вложенные группы — только Chrome/Edge 140+ — [Chrome for Developers: View transitions in 2025](https://developer.chrome.com/blog/view-transitions-in-2025). Статус Baseline Newly available с 14.10.2025, но «The initial implementation of same-document view transitions in Firefox does not include view transition types» — [web.dev](https://web.dev/blog/same-document-view-transitions-are-now-baseline-newly-available). В Firefox 144 есть `document.startViewTransition(updateCallback)`, `view-transition-name`, `view-transition-class`, `:active-view-transition` — [MDN: Firefox 144 for developers](https://developer.mozilla.org/Firefox/Releases/144).
- Каноничный пример кольцевого раскрытия (Chrome docs): фолбэк `if (!document.startViewTransition) { update(); return }`. Координаты клика, `endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))`, затем `transition.ready.then(() => document.documentElement.animate({ clipPath: [\`circle(0 at ${x}px ${y}px)\`, \`circle(${endRadius}px at ${x}px ${y}px)\`] }, { duration: 500, easing: 'ease-in', pseudoElement: '::view-transition-new(root)' }))`. CSS: `::view-transition-old(root), ::view-transition-new(root) { animation: none; mix-blend-mode: normal; }`. Уникальность имён: «If two rendered elements have the same `view-transition-name` at the same time, the transition will be skipped.» — [Chrome for Developers: Same-document view transitions](https://developer.chrome.com/docs/web-platform/view-transitions/same-document).
- Для React в сообществе принят тот же приём: `document.startViewTransition()` с `ReactDOM.flushSync()` внутри, радиус через `getBoundingClientRect()` кнопки и `Math.hypot` — [react-theme-switch-animation](https://minhvo.is-a.dev/projects/react-theme-switch-animation) (сторонний источник).

### Inferences
- Рекомендуемая функция:
  ```ts
  import { flushSync } from 'react-dom'
  export function runDesignSwap(el: HTMLElement, commit: () => void) {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const apply = () => flushSync(() => { commit(); window.scrollTo({ top: 0, behavior: 'instant' }) })
    if (!document.startViewTransition || reduce) { apply(); return }
    const r = el.getBoundingClientRect()
    const x = r.left + r.width / 2, y = r.top + r.height / 2
    const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    const t = document.startViewTransition(apply)
    t.ready.then(() => document.documentElement.animate(
      { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
      { duration: 550, easing: 'cubic-bezier(.2,.8,.2,1)', pseudoElement: '::view-transition-new(root)' }))
  }
  ```
- **Ловушка reduced motion:** CSS-снипет из гайда Next (`animation-duration: 0s !important`) не остановит анимацию, запущенную из JS через `element.animate()`. Проверять `matchMedia` нужно в JS, как в коде выше. Для reduce можно вместо кольца делать короткий кроссфейд либо мгновенную смену.
- **Ловушка `scroll-behavior: smooth`:** в `globals.css` стоит `html { scroll-behavior: smooth; }`, поэтому обычный `scrollTo(0,0)` будет плавным. Нужен `behavior: 'instant'` внутри колбэка перехода, тогда новый снимок сразу показывает верх нового дизайна.
- Тоггл лучше исключить из кольца: дать ему `view-transition-name: design-switcher` и `animation: none` (как «якорь шапки» в гайде Next). Иначе переключатель тоже «раскроется» кругом. Имя должно быть уникальным, иначе переход пропустится.
- Не включать `experimental.viewTransition` и не использовать `<ViewTransition>` одновременно с ручным API. Иначе React может прервать ручной переход. Если позже выбран вариант B (маршруты), можно перейти на React-интеграцию: `experimental.viewTransition: true` и `<Link transitionTypes>`. Кольцо от точки клика там сложнее: координаты придётся передавать CSS-переменными в `@keyframes` на `::view-transition-new(...)`.
- Safari 18.0–18.3 поддерживает базовый API, но не `view-transition-class`. Для кольца на `root` этого достаточно.

### Gaps
- Не проверено, как `<ViewTransition>` из canary 3f0b9e61 (март 2026) отличается API-шно от стабильного 19.3 (сентябрь 2026). Next 16.2.4 вендорит более ранний canary.
- Не найдено авторитетного описания, запускает ли React-интеграция переход корня (`root`) без единого `<ViewTransition>` в дереве.
- Нет свежих данных (2026) о багах Safari с кольцевым `clip-path` на `::view-transition-new(root)`. Нужна ручная проверка на iOS Safari.

## 5. Deep-link через `?design=…` на статически пререндеренной странице; мигание дизайна №1; localStorage

### Takeaway
В оболочке, которая оборачивает дизайн №1, **нельзя использовать `useSearchParams`**. На статическом маршруте всё дерево до ближайшего Suspense уйдёт в клиентский рендер, и дизайн №1 пропадёт из HTML. Проп страницы `searchParams` делает страницу динамической. Правильная схема такая. Inline `<script>` в `<head>` root layout читает `location.search` и ставит `data-design` на `<html>` до первой отрисовки. CSS по этому атрибуту прячет контент №1 и красит фон под целевой дизайн. На `<html>` нужен `suppressHydrationWarning`. Оболочка гидрируется с `'classic'` (как сервер) и сразу после гидрации подгружает и включает нужный дизайн. URL обновляется через `history.replaceState`. localStorage — по желанию, с приоритетом URL > storage > default.

### Cited Findings
- «If a route is prerendered, calling `useSearchParams` will cause the Client Component tree up to the closest `Suspense` boundary to be client-side rendered.» Также: «During production builds, a static page that calls `useSearchParams` from a Client Component must be wrapped in a `Suspense` boundary, otherwise the build fails with the Missing Suspense boundary with useSearchParams error.» И: «In development… `useSearchParams` doesn't suspend and things may appear to work without `Suspense`.» — [Лок. док: use-search-params.md](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/03-api-reference/04-functions/use-search-params.md).
- «`searchParams` is a Request-time API… Using it will opt the page into dynamic rendering at request time.» — [Лок. док: page.md](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/page.md).
- Next позволяет нативные `window.history.pushState/replaceState`: «calls integrate into the Next.js Router, allowing you to sync with `usePathname` and `useSearchParams`» — [Лок. док: linking-and-navigating.md](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/01-getting-started/04-linking-and-navigating.md) (строки 343+).
- Официальный гайд Next «How to prevent flash before hydration» (версия документа 16.3.6, обновлён 29.07.2026; в локальных доках 16.2.4 его нет). Основные тезисы:
  - «Using an inline script that runs synchronously as the browser parses the HTML, you can update the DOM before the first paint»;
  - пример темы: `<html lang="en" data-theme="light" suppressHydrationWarning>` и в `<head>` скрипт `(function(){try{var t=localStorage.getItem("theme");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
  - «A Client Component that re-renders with client values causes a hydration error. Deferring to `useEffect` avoids the error but introduces a visible flash»;
  - без `suppressHydrationWarning` React «recovers by client-rendering from the nearest error or Suspense boundary»;
  - чтение cookie в root layout «opts the entire app out of static prerendering», поэтому cookie тоже читать в inline-скрипте;
  - в dev Strict Mode при повторном монтировании React «resets `<html>`, `<head>`, and `<body>` to only the attributes it manages from JSX», и атрибут нужно переустанавливать в `useLayoutEffect`;
  - `useLayoutEffect` «prevents the flash between hydration and paint, but not the flash between the HTML arriving and React hydrating»;
  - inline-скрипты блокируются строгим CSP без nonce.

  Источник: [nextjs.org: Preventing flash before hydration](https://nextjs.org/docs/app/guides/preventing-flash-before-hydration).
- Проверено на текущей сборке 16.2.4: `<script type="application/ld+json" dangerouslySetInnerHTML>` из `<head>` root layout остаётся в `<head>` пререндеренного `index.html` — [Лок. сборка: index.html](file:///C:/Users/andre/portfolio-yunev/.next/server/app/index.html), [Лок. код: app/layout.tsx](file:///C:/Users/andre/portfolio-yunev/app/layout.tsx). Это расходится с найденным в поиске сторонним утверждением, что «Script tags with dangerouslySetInnerHTML in the head JSX get moved to the body by Next.js 16 and don't work, and next/script with strategy="beforeInteractive"… doesn't work». Точный автор неясен, сниппет из поисковой выдачи рядом со ссылками на eastondev.com и pastecode.xyz — [сниппет поиска, напр. eastondev.com](https://eastondev.com/blog/en/posts/dev/20251220-nextjs-dark-mode-guide/).
- `next/script strategy="beforeInteractive"`: такие скрипты «downloaded before any Next.js module», но «their execution does not block page hydration from occurring». Размещаются в root layout — [Лок. док: script.md](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/03-api-reference/02-components/script.md).

### Inferences
- Рецепт (вариант A):
  ```tsx
  // app/layout.tsx — добавить к <html> suppressHydrationWarning и скрипт в <head>
  <script dangerouslySetInnerHTML={{ __html:
   `(function(){try{var d=new URLSearchParams(location.search).get("design");
     if(d==="v2"||d==="v3")document.documentElement.setAttribute("data-design",d)}catch(e){}})()` }} />
  ```
  ```css
  /* globals.css — крошечные скоупные правила, работающие до загрузки JS */
  html[data-design="v2"] body { background: #…; }           /* фон целевого дизайна */
  html[data-design]:not([data-design="classic"]) [data-design-root="classic"] { visibility: hidden; }
  ```
  Состояние в оболочке берётся через `useSyncExternalStore(subscribe /* popstate */, () => readDesignFromURL(), () => 'classic')`. Серверный снимок `'classic'` совпадает с HTML, гидратация проходит чисто. После неё React перерендерит с клиентским значением, а оболочка загрузит чанк и покажет дизайн. Альтернатива: `useState('classic')` плюс `useLayoutEffect`.
- Если чанк не загрузился (ошибка сети), нужно снять `data-design` с `<html>`, иначе дизайн №1 останется скрытым. Разумно добавить и таймаут-страховку, например 3 с. Без JS атрибут не ставится вообще, поэтому пользователь без JS и бот без JS видят №1.
- Для обновления URL при переключении — `history.replaceState` (не засоряет историю). Если нужен `pushState`, оболочка должна слушать `popstate`. `useSearchParams` при этом не использовать из-за CSR-bailout.
- **localStorage.** Плюсы: вернувшийся посетитель видит свой дизайн. Минусы: портфолио смотрят разово (рекрутер или клиент), а «первое впечатление» должно быть №1. Сохранённый выбор расходится с поделённой ссылкой, и логика усложняется (приоритеты, мигание уже без URL). Рекомендация: источник истины — URL; в localStorage не сохранять или сохранять только в `sessionStorage` в рамках визита. Поисковики это не затрагивает: `/` без параметра всегда отдаёт №1.
- Canonical у `/` и так `/` (через `metadataBase`). Варианты `?design=` ботами не индексируются как отдельный контент, потому что статический HTML одинаковый.
- Вариант B (rewrite `/?design=v2` → статическая `/v2`) полностью снимает проблему мигания: сервер или CDN сразу отдаёт HTML нужного дизайна.

### Gaps
- Гайд о предотвращении мигания относится к 16.3.6. В 16.2.4 размещение исполняемого inline-скрипта в `<head>` проверено только косвенно, на `ld+json`-скрипте той же конструкции. Нужно проверить `next build` и посмотреть `index.html`.
- Не проверено, выдаёт ли 16.2.4 в dev предупреждение React о `<script>` в root layout. В гайде 16.3.6 есть обход через helper `InlineScript` с `type` `text/javascript` / `text/plain`, но он нужен для клиентских компонентов.

## 6. Доступный переключатель (сегментированный контрол)

### Takeaway
Семантически это «выбор одного из трёх» без tabpanel-связи. Лучший вариант — **радиогруппа**. Проще всего сделать её на нативных `<input type="radio">` внутри `<fieldset>` с `<legend>` (визуально скрытой): стрелки, Tab и Space работают из коробки. Второй вариант — `role="radiogroup"` + `role="radio"` + `aria-checked` + roving tabindex. `tablist` не подходит: вкладки подразумевают управление tabpanel. Кнопки с `aria-pressed` семантически означают независимые toggle-кнопки. Цели касания — от 44×44 (AAA; минимум AA — 24×24). Смену дизайна нужно объявлять через `aria-live="polite"`, фокус оставлять на выбранном радио, а скролл сбрасывать наверх.

### Cited Findings
- APG Radio Group: контейнер `role="radiogroup"`, элементы `role="radio"`, `aria-checked="true|false"`, у группы метка через `aria-labelledby` или `aria-label`. Клавиатура: Tab/Shift+Tab входит в группу на отмеченный элемент. «Arrow keys… move focus to the next radio button in the group, uncheck the previously focused button, and check the newly focused button», с зацикливанием. Space отмечает сфокусированный элемент — [W3C WAI-ARIA APG: Radio Group Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/).
- WCAG 2.2 SC 2.5.8 Target Size (Minimum), уровень AA: «The size of the target for pointer inputs is at least 24 by 24 CSS pixels», с исключениями. Для важных контролов рекомендуется более строгий 2.5.5 Target Size (Enhanced) — [W3C: Understanding SC 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).

### Inferences
- Разметка:
  ```tsx
  <fieldset className="switcher"><legend className="sr-only">Дизайн страницы</legend>
    {DESIGNS.map(d => (
      <label key={d.id} className="seg">                                 {/* min 44×44 */}
        <input type="radio" name="design" value={d.id} checked={cur===d.id}
               onChange={e => switchTo(d.id, e.currentTarget)} />
        <span>{d.label}</span>
      </label>))}
  </fieldset>
  <p aria-live="polite" className="sr-only">{announce}</p>   {/* «Включён дизайн 2: …» */}
  ```
  Фокус: `:focus-visible` на `label:has(input:focus-visible)` с явной обводкой, контрастной во всех трёх дизайнах.
- Нативные радио меняют выбор уже при нажатии стрелки. Значит, стрелки вызывают реальную смену дизайна с загрузкой чанка и анимацией. Это ожидаемое поведение радио по APG, но стоит учесть: при быстрых нажатиях стрелок делать дебаунс или отменять устаревшие загрузки, если `await import()` ещё не завершился.
- Тоггл должен жить вне переключаемого дерева, иначе фокус потеряется при размонтировании. Скролл наверх внутри перехода (`behavior: 'instant'`). Фокус не переносить на контент (пользователь остаётся на контроле), вместо этого live-объявление. Если тоггл встроен в Nav дизайна №1, это меняет вид №1. Отдельная тонкая фиксированная полоса сверху (или плавающая «пилюля») сохраняет №1 нетронутым.
- В reduced motion не анимировать ни кольцо, ни ползунок сегмента.

### Gaps
- Точный текст SC 2.5.5 (44×44 CSS px, AAA) в загруженной странице не процитирован. Порог 44 px — общепринятое значение этого критерия, отдельно не проверено в этой сессии.
- Не исследовалось поведение экранных читалок (NVDA, VoiceOver) при полной замене DOM во время View Transition.

## 7. Изоляция глобальных стилей между дизайнами

### Takeaway
Оболочка ставит `data-design` на `<html>`. Инлайн-скрипт делает это до гидрации, `useLayoutEffect` — при смене, с переустановкой после dev-ремаунта Strict Mode. Весь CSS дизайнов №2/№3 скоупится под `[data-design="v2"]` или идёт через CSS Modules. Глобальные селекторы (`body`, `h1`, `:root`) в CSS дизайнов №2/№3 **запрещены**: загруженный CSS ленивого чанка, по всей видимости, остаётся в документе после возврата на №1 и протечёт в него. В `globals.css` остаётся текущее оформление №1 как дефолт плюс несколько строк `html[data-design="v2"] body {…}` для фона и `color-scheme`.

### Cited Findings
- Текущие глобальные стили: `html { scroll-behavior: smooth; }`, `body { background: var(--color-bg); color: var(--color-text); font-family: var(--font-manrope)…; overflow-x: hidden; }`, токены на `:root`, `@theme inline` для Tailwind — [Лок. код: app/globals.css](file:///C:/Users/andre/portfolio-yunev/app/globals.css).
- Паттерн темы через атрибут на `<html>`: `[data-theme='light'] {…}` / `[data-theme='dark'] {…}` плюс inline-скрипт и `suppressHydrationWarning` — [nextjs.org: Preventing flash before hydration](https://nextjs.org/docs/app/guides/preventing-flash-before-hydration).
- Для скрытого через Activity контента Next рекомендует отключать стили страницы через `style.media = 'not all'` в cleanup ref-колбэка или `useLayoutEffect`, иначе «a hidden page's accent color or z-index overrides shouldn't leak into the visible page» — [Лок. док: preserving-ui-state.md](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/02-guides/preserving-ui-state.md) (строки ~265–300).

### Inferences
- Схема: `html[data-design="v2"] body { background: …; color: …; }` в `globals.css`, всего несколько строк. Они нужны ещё до загрузки чанка ради deep-link без мигания. Всё остальное — в `v2.module.css` или в глобальном `v2.css`, где каждый селектор начинается с `[data-design-root="v2"]`. Импортировать их только из ленивого модуля дизайна.
- Правила `:root` дизайна №1 (`--color-*`, `--font-display`…) продолжают действовать и в №2/№3. Дизайнам №2/№3 давать свои имена переменных или переопределять токены на своей обёртке, а не на `:root`.
- Если нужна жёсткая гарантия отсутствия утечек, можно применить приём из preserving-ui-state: дизайн №2/№3 рендерит свой `<style ref>`, который в cleanup ставит `media='not all'`.
- Tailwind v4 сканирует исходники проекта. Утилиты, использованные только в №2/№3, окажутся в общем CSS, который грузит и №1. Рост обычно небольшой. Если критично, писать №2/№3 на CSS Modules или исключить их папку из сканирования (в Tailwind v4 для этого есть директива `@source`). Не проверено.
- `meta theme-color` и `color-scheme` можно обновлять из оболочки при смене дизайна (например, для тёмного №3).

### Gaps
- Не проверено экспериментально, удаляются ли из DOM CSS-чанки лениво загруженного клиентского компонента при его размонтировании в Next 16.2.4 (React 19 управляет `<link rel="stylesheet" precedence>`). Практическая рекомендация (строгий скоуп) верна при любом ответе.

## 8. Прочие ловушки Next 16 / React 19.2: гидратация при условном рендере, восстановление скролла, `position: sticky` в обёртках

### Takeaway
Главные риски такие:
- клиентское начальное состояние, отличное от серверного `'classic'` (ошибка гидратации и клиентский ререндер всего дерева с потерей SSR-выгоды);
- `useSearchParams` в оболочке (CSR-bailout дизайна №1);
- `RevealObserver` вне переключаемого дерева;
- `scroll-behavior: smooth` при сбросе скролла;
- `overflow: hidden` на обёртке дизайна: ломает `position: sticky` у Nav.

Обёртка с `display: contents` или обычный `div` без overflow на sticky не влияет, потому что обёртка охватывает всю страницу.

### Cited Findings
- Несовпадение текста или структуры при гидратации без `suppressHydrationWarning` React трактует как ошибку и «recovers by client-rendering from the nearest error or Suspense boundary» — [nextjs.org: Preventing flash before hydration](https://nextjs.org/docs/app/guides/preventing-flash-before-hydration).
- В dev Strict Mode атрибуты `<html>`, выставленные скриптом, сбрасываются при повторном монтировании. Лечится `useLayoutEffect` — [nextjs.org: Preventing flash before hydration](https://nextjs.org/docs/app/guides/preventing-flash-before-hydration).
- Скрытые Activity-деревья остаются в DOM. Тесты и селекторы находят скрытые элементы, рекомендуется `getByRole` — [Лок. док: preserving-ui-state.md](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/02-guides/preserving-ui-state.md).
- При управлении скроллом Next пропускает sticky/fixed элементы при поиске «первого видимого» элемента Page — [Лок. док: link.md](file:///C:/Users/andre/portfolio-yunev/node_modules/next/dist/docs/01-app/03-api-reference/02-components/link.md).
- Sticky «прилипает» к ближайшему предку с механизмом прокрутки. Если у предка `overflow: hidden|scroll|auto`, sticky работает не так, как ожидается — [DigitalOcean: CSS position sticky](https://digitalocean.com/community/tutorials/css-position-sticky), [johnkavanagh.co.uk: position sticky](https://johnkavanagh.co.uk/articles/position-sticky-in-css). WebKit-баг о том, что элемент, не создающий блок (display: unset/contents-подобные случаи), должен брать контейнер от ближайшего блочного предка — [WebKit Bug 190580](https://bugs.webkit.org/show_bug.cgi?id=190580).
- Сейчас Nav: `position: 'sticky', top: 0, zIndex: 100` внутри фрагмента, то есть его родитель — `body` с `overflow-x: hidden` — [Лок. код: components/Nav.tsx](file:///C:/Users/andre/portfolio-yunev/components/Nav.tsx), [Лок. код: app/globals.css](file:///C:/Users/andre/portfolio-yunev/app/globals.css).

### Inferences
- **Гидратация.** Все три ветки рендерить из одного компонента-оболочки. На сервере и в первом клиентском рендере всегда `'classic'`: `useSyncExternalStore` с `getServerSnapshot` → `'classic'` или `useState('classic')`. Ленивые дизайны монтируются только после гидратации. Не читать `window`, `localStorage`, `location` в теле рендера при первой отрисовке.
- **Sticky.** Если обернуть дизайн №1 в `<div data-design-root="classic">`, содержащий Nav, main и Footer, sticky сохранится: блок sticky — эта обёртка на всю высоту страницы. Вариант `display: contents` оставляет родителем `body`, то есть ровно как сейчас. Нельзя ставить на обёртку `overflow: hidden/auto` (для обрезки горизонтального переполнения в новых дизайнах использовать `overflow-x: clip`; то, что `clip` не создаёт scroll-контейнер, в этой сессии не проверено). `transform`/`filter` на обёртке сломают `position: fixed` у потомков: тоггл-полосу держать вне обёртки.
- **Восстановление скролла.** При смене дизайна через `replaceState` браузерное восстановление не задействуется. Сброс наверх делать явно. При переходе по «Назад» с `pushState` нужен собственный обработчик `popstate` и, возможно, `history.scrollRestoration = 'manual'` на время свапа. Иначе браузер восстановит позицию, рассчитанную для другого дизайна с другой высотой.
- **Эффекты при повторном монтировании.** Hero, Nav и Projects вешают слушатели и `IntersectionObserver` в `useEffect`. При размонтировании №1 и повторном монтировании они корректно пересоздаются, если cleanup написаны правильно (у Nav cleanup есть).
- **Аналитика.** Смена дизайна через `replaceState` в `@vercel/analytics` может учитываться как pageview или нет. Лучше слать собственное событие. Не проверено.

### Gaps
- Нет авторитетного источника (спецификация CSS Position или MDN), процитированного дословно, о поведении `position: sticky` у ребёнка элемента с `display: contents`. Вывод выше сделан из того, что `display: contents` не порождает бокс.
- Не проверено, как View Transition снимает sticky Nav: он попадает в снимок `root`, если у него нет своего `view-transition-name`.
