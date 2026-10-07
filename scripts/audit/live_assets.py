"""Все ли файлы собранной копии реально отдаёт сайт andrey-yunev.ru.
Запуск: python3 -I -X utf8 live_assets.py <корень репозитория>
"""
import subprocess, sys
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.parse import quote

OUT = Path(sys.argv[1]) / 'out'
files = sorted(p.relative_to(OUT).as_posix() for p in OUT.rglob('*') if p.is_file())
files = [f for f in files if f != '.htaccess']


def head(url, direct):
    cmd = ['curl', '-s', '-o', '/dev/null', '-w', '%{http_code}', '-m', '25', '-I']
    if direct:
        cmd += ['--noproxy', '*']
    cmd.append(url)
    try:
        return subprocess.run(cmd, capture_output=True, text=True, timeout=40).stdout.strip() or '000'
    except Exception:
        return '000'


def ru(f):
    return f, head('https://andrey-yunev.ru/' + quote(f), True)


with ThreadPoolExecutor(6) as ex:
    res = list(ex.map(ru, files))
bad = [(f, c) for f, c in res if c != '200']
# повтор для сбойных — хостинг иногда режет частые запросы
bad = [(f, c2) for f, c in bad for c2 in [head('https://andrey-yunev.ru/' + quote(f), True)] if c2 != '200']
print(f'сайт: файлов проверено {len(files)}, не отдаются: {len(bad)}')
for f, c in bad:
    print('   ', c, f)
