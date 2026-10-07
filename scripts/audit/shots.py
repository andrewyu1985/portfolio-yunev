"""Снимки версий сайта с локальной копии. Запуск:
python3 -I -X utf8 shots.py <база, напр. http://localhost:3312> <папка для png> <режим: styles|page>
"""
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE, OUT, MODE = sys.argv[1], Path(sys.argv[2]), sys.argv[3]
OUT.mkdir(parents=True, exist_ok=True)
HIDE = 'nextjs-portal{display:none!important}'
ARGS = ['--no-proxy-server', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--hide-scrollbars']

with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True, args=ARGS)
    if MODE == 'styles':
        ctx = b.new_context(viewport={'width': 1440, 'height': 900}, device_scale_factor=1)
        for name, path, wait in [('classic', '/', 3500), ('newspaper', '/?design=newspaper', 5000),
                                 ('blueprint', '/?design=blueprint', 5000), ('atelier', '/cinema', 5000)]:
            pg = ctx.new_page()
            pg.goto(BASE + path, wait_until='load', timeout=180000)
            pg.add_style_tag(content=HIDE)
            pg.wait_for_timeout(wait)
            pg.screenshot(path=str(OUT / f'{name}.png'))
            print('снято', name, flush=True)
            pg.close()
        pg = ctx.new_page()
        logs = []
        pg.on('console', lambda m: logs.append(m.text[:160]) if m.type == 'error' else None)
        pg.goto(BASE + '/discs', wait_until='load', timeout=180000)
        pg.add_style_tag(content=HIDE)
        try:
            pg.wait_for_function("() => { const e = document.querySelector('.dk-preload'); return !e || getComputedStyle(e).opacity === '0' || getComputedStyle(e).display === 'none' || e.classList.contains('is-done') }", timeout=240000)
            print('прелоадер ушёл', flush=True)
        except Exception as e:
            print('прелоадер не ушёл:', str(e)[:120], flush=True)
        pg.wait_for_timeout(6000)
        pg.screenshot(path=str(OUT / 'discs.png'))
        print('снято discs; ошибок в консоли:', len(logs), logs[:3], flush=True)
        info = pg.evaluate("() => ({cats: [...document.querySelectorAll('.dk-cat')].map(e => e.textContent.trim()), total: (document.querySelector('.dk-index-btn')||{}).textContent, canvas: !!document.querySelector('canvas')})")
        print(info, flush=True)
        pg.close()
    else:
        # длинный снимок страницы для стены «Ателье» и проверка на телефоне
        for name, w, h, clip in [('wall', 720, 900, 2400), ('m390', 390, 844, 3200)]:
            ctx = b.new_context(viewport={'width': w, 'height': h}, device_scale_factor=1)
            pg = ctx.new_page()
            pg.goto(BASE + '/website-creation.html', wait_until='networkidle', timeout=120000)
            pg.add_style_tag(content='.reveal{opacity:1!important;transform:none!important;transition:none!important}img{content-visibility:visible}')
            pg.evaluate("() => document.querySelectorAll('img[loading=lazy]').forEach(i => { i.loading = 'eager' })")
            pg.wait_for_timeout(2500)
            m = pg.evaluate("() => ({sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, h: document.documentElement.scrollHeight, imgs: [...document.images].map(i => i.naturalWidth), wide: [...document.querySelectorAll('body *')].filter(e => e.getBoundingClientRect().right > innerWidth + 1).slice(0,5).map(e => e.tagName + '.' + e.className)})")
            print(name, m, flush=True)
            pg.screenshot(path=str(OUT / f'{name}.png'), full_page=True, clip={'x': 0, 'y': 0, 'width': w, 'height': min(clip, m['h'])})
            ctx.close()
    b.close()
