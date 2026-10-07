"""Опись всех ссылок сайта: собранные страницы out/ + исходники (данные и компоненты).
Проверяет внутренние ссылки и якоря по файлам, внешние складывает в список для отдельной проверки.
Запуск: python3 -I -X utf8 links_inventory.py <корень репозитория> <папка для результатов>
"""
import json, re, sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote

ROOT = Path(sys.argv[1])
RES = Path(sys.argv[2])
OUT = ROOT / 'out'
RES.mkdir(parents=True, exist_ok=True)

ATTRS = {'href', 'src', 'poster', 'data-src', 'action'}
SKIP_PREFIX = ('data:', 'javascript:', 'blob:', 'about:')


class P(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.links = []   # (tag, attr, value, line)
        self.ids = set()
        self.metas = []

    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if d.get('id'):
            self.ids.add(d['id'])
        if tag == 'a' and d.get('name'):
            self.ids.add(d['name'])
        for k, v in attrs:
            if v is None:
                continue
            if k in ATTRS:
                self.links.append((tag, k, v.strip(), self.getpos()[0]))
            elif k == 'srcset':
                for part in v.split(','):
                    u = part.strip().split(' ')[0]
                    if u:
                        self.links.append((tag, 'srcset', u, self.getpos()[0]))
        if tag == 'meta' and d.get('content') and (d.get('property') or d.get('name') or '').startswith(('og:', 'twitter:')):
            self.metas.append((d.get('property') or d.get('name'), d['content'], self.getpos()[0]))
        if tag == 'link' and d.get('rel') == 'canonical':
            self.metas.append(('canonical', d.get('href', ''), self.getpos()[0]))

    handle_startendtag = handle_starttag


def resolve(path: str):
    """Путь сайта -> файл в out/ или None."""
    p = unquote(path)
    if p.startswith('/'):
        p = p[1:]
    cands = [OUT / p]
    if p == '' or p.endswith('/'):
        cands = [OUT / p / 'index.html']
    else:
        cands += [OUT / p / 'index.html', OUT / (p + '.html')]
    for c in cands:
        if c.is_file():
            return c
    return None


pages = {}
for f in sorted(OUT.rglob('*.html')):
    rel = f.relative_to(OUT).as_posix()
    s = f.read_text(encoding='utf-8', errors='replace')
    p = P()
    try:
        p.feed(s)
    except Exception as e:  # noqa
        print('не разобрал', rel, e)
    # якоря, которые ставит скрипт/React: id в сыром тексте
    p.ids |= set(re.findall(r'\bid=["\']([^"\']+)["\']', s))
    pages[rel] = {'links': p.links, 'ids': p.ids, 'metas': p.metas, 'text': s}

internal_bad, anchors_bad, external, mail, metas = [], [], {}, {}, []


def add_ext(url, where):
    external.setdefault(url, [])
    if where not in external[url]:
        external[url].append(where)


def check_internal(value, where, base_rel):
    sp = urlsplit(value)
    path, frag = sp.path, sp.fragment
    if path == '':
        target_rel = base_rel
        target = OUT / base_rel
    else:
        if not path.startswith('/'):
            base_dir = (Path('/' + base_rel).parent).as_posix()
            path = (base_dir.rstrip('/') + '/' + path)
            # нормализация ../
            parts = []
            for seg in path.split('/'):
                if seg == '..':
                    if parts:
                        parts.pop()
                elif seg not in ('.', ''):
                    parts.append(seg)
            path = '/' + '/'.join(parts) + ('/' if sp.path.endswith('/') else '')
        target = resolve(path)
        if target is None:
            internal_bad.append((where, value))
            return
        target_rel = target.relative_to(OUT).as_posix()
    if frag and target_rel in pages:
        if unquote(frag) not in pages[target_rel]['ids']:
            anchors_bad.append((where, value, target_rel))


for rel, d in pages.items():
    for tag, attr, v, line in d['links']:
        where = f'{rel}:{line} <{tag} {attr}>'
        if not v or v.startswith(SKIP_PREFIX):
            continue
        if v.startswith(('mailto:', 'tel:')):
            mail.setdefault(v, []).append(where)
        elif v.startswith(('http://', 'https://', '//')):
            add_ext(('https:' + v) if v.startswith('//') else v, where)
        else:
            check_internal(v, where, rel)
    for name, content, line in d['metas']:
        metas.append((rel, name, content))

# ---- исходники: данные и компоненты (ленивые дизайны в HTML не попадают) ----
SRC_GLOBS = ['data/*.ts', 'components/**/*.ts', 'components/**/*.tsx', 'app/**/*.tsx', 'app/**/*.ts']
src_seen = set()
for g in SRC_GLOBS:
    for f in sorted(ROOT.glob(g)):
        if f in src_seen:
            continue
        src_seen.add(f)
        rel = f.relative_to(ROOT).as_posix()
        for i, line in enumerate(f.read_text(encoding='utf-8').splitlines(), 1):
            for m in re.finditer(r'["\'`](https?://[^"\'`\s<>]+)["\'`]', line):
                add_ext(m.group(1), f'{rel}:{i}')
            for m in re.finditer(r'["\'`](mailto:[^"\'`\s]+|tel:[^"\'`\s]+)["\'`]', line):
                mail.setdefault(m.group(1), []).append(f'{rel}:{i}')
            for m in re.finditer(r'["\'`](/[A-Za-z0-9_\-./%]*(?:\?[^"\'`#\s]*)?(?:#[A-Za-z0-9_\-]*)?)["\'`]', line):
                v = m.group(1)
                if v in ('/', '//') or '${' in v or v.startswith('//'):
                    continue
                # только то, что похоже на адрес сайта: файл с расширением или известный маршрут
                pth = urlsplit(v).path
                if re.search(r'\.[a-z0-9]{2,5}$', pth) or pth.rstrip('/') in ('', '/cinema', '/cinema/archive', '/discs') or v.startswith('/#'):
                    check_internal(v, f'{rel}:{i}', 'index.html')

# ---- картинки версий, которые подставляются по id проекта ----
ids = re.findall(r"^\s*id:\s*'([^']+)'", (ROOT / 'data/projects.ts').read_text(encoding='utf-8'), re.M)
missing_art = [i for i in ids if not (ROOT / 'public/discs/art' / f'{i}.jpg').is_file()]

# ---- CSS url(...) в общих стилях и страницах ----
css_bad = []
for f in list((ROOT / 'public').glob('*.css')) + list((ROOT / 'public').glob('*.html')):
    s = f.read_text(encoding='utf-8', errors='replace')
    for m in re.finditer(r'url\(\s*["\']?([^"\')\s]+)["\']?\s*\)', s):
        u = m.group(1)
        if u.startswith(('data:', 'http', '#', '%23')):
            if u.startswith('http'):
                add_ext(u, f'public/{f.name} (css url)')
            continue
        t = (ROOT / 'public' / u.lstrip('/')) if u.startswith('/') else (f.parent / u)
        if not t.is_file():
            css_bad.append((f.name, u))

res = {
    'pages': sorted(pages),
    'internal_bad': internal_bad,
    'anchors_bad': anchors_bad,
    'css_bad': css_bad,
    'missing_disc_art': missing_art,
    'mail': mail,
    'metas': metas,
    'external': external,
    'project_ids': ids,
}
(RES / 'inventory.json').write_text(json.dumps(res, ensure_ascii=False, indent=1), encoding='utf-8')

print('страниц в копии:', len(pages), '· исходников просмотрено:', len(src_seen))
print('внутренних ссылок в никуда:', len(internal_bad))
for w, v in internal_bad:
    print('   ', v, '<-', w)
print('якорей в никуда:', len(anchors_bad))
for w, v, t in anchors_bad:
    print('   ', v, '(нет якоря в', t + ')', '<-', w)
print('картинок из стилей нет на месте:', len(css_bad), css_bad[:10])
print('проектов:', len(ids), '· без обложки для «Дисков»:', missing_art)
print('почта и телефоны:')
for k, v in mail.items():
    print('   ', k, '×', len(v))
print('внешних адресов (уникальных):', len(external))
