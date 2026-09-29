"""Зеркало сайта на российском хостинге: https://andrey-yunev.ru (reg.ru, server27).

Зачем: *.vercel.app у части российских провайдеров и в мобильных сетях не открывается
(блокируются адреса Vercel), а ссылка на портфолио уходит в резюме.

Запуск из корня репозитория:
    py -3 scripts/deploy_ru.py              # собрать копию и залить изменившиеся файлы
    py -3 scripts/deploy_ru.py --skip-build # залить уже собранную папку out/
    py -3 scripts/deploy_ru.py --dry-run    # показать, что будет залито, ничего не меняя

Что делает:
1. STATIC_EXPORT=1 next build -> out/ (см. next.config.ts; Vercel собирает как раньше).
2. Меняет в копии адреса vercel.app на https://andrey-yunev.ru.
3. Кладёт out/.htaccess (404, без листинга папок).
4. Заливает по FTP (пользователь u0572201_portfolio, домашняя папка = корень сайта) только
   файлы, чей хеш изменился с прошлой заливки, и удаляет с хостинга файлы, которых больше нет.
   Список залитого хранится в .deploy-ru-manifest.json (в git не попадает).

Пароль FTP: переменная FTP_PASSWORD или файл из FTP_PASSWORD_FILE
(по умолчанию C:\\chatium-archive\\05_ACCOUNT\\ftp_andrey-yunev_password.txt). В репозиторий не класть.
"""
import argparse, ftplib, hashlib, json, os, subprocess, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'out'
MANIFEST = ROOT / '.deploy-ru-manifest.json'
SITE = 'https://andrey-yunev.ru'
HOST = 'andrey-yunev.ru'
# и ссылки, и надписи вида «andrey-yunev.vercel.app» в тексте страниц
OLD_HOSTS = ['andrey-yunev.vercel.app', 'portfolio-yunev.vercel.app']
TEXT_EXT = {'.html', '.js', '.txt', '.json', '.xml', '.css', '.webmanifest', '.svg'}
FTP_HOST = 'server27.hosting.reg.ru'
FTP_USER = 'u0572201_portfolio'
PW_FILE = os.environ.get('FTP_PASSWORD_FILE', r'C:\chatium-archive\05_ACCOUNT\ftp_andrey-yunev_password.txt')

HTACCESS = """Options -Indexes
DirectoryIndex index.html
ErrorDocument 404 /404.html
AddDefaultCharset UTF-8
<Files ".htaccess">
  Require all denied
</Files>
<IfModule mod_headers.c>
  <FilesMatch "\\.(html|txt)$">
    Header set Cache-Control "no-cache"
  </FilesMatch>
</IfModule>
"""


def build():
    env = dict(os.environ, STATIC_EXPORT='1')
    print('> STATIC_EXPORT=1 next build', flush=True)
    r = subprocess.run('npx next build', cwd=ROOT, env=env, shell=True)
    if r.returncode or not (OUT / 'index.html').exists():
        sys.exit('сборка не удалась: нет out/index.html')


def postprocess():
    changed = 0
    for p in OUT.rglob('*'):
        if p.is_file() and p.suffix in TEXT_EXT:
            s = p.read_text(encoding='utf-8', errors='surrogateescape')
            t = s
            for h in OLD_HOSTS:
                t = t.replace(h, HOST)
            if t != s:
                p.write_text(t, encoding='utf-8', errors='surrogateescape')
                changed += 1
    (OUT / '.htaccess').write_text(HTACCESS, encoding='utf-8', newline='\n')
    print(f'адреса vercel.app заменены в {changed} файлах, .htaccess записан')


def local_files():
    files = {}
    for p in sorted(OUT.rglob('*')):
        if p.is_file():
            files[p.relative_to(OUT).as_posix()] = hashlib.sha1(p.read_bytes()).hexdigest()
    return files


def connect():
    pw = os.environ.get('FTP_PASSWORD') or Path(PW_FILE).read_text(encoding='utf-8').strip()
    try:
        ftp = ftplib.FTP_TLS(FTP_HOST, timeout=60)
        ftp.login(FTP_USER, pw)
        ftp.prot_p()
        print('FTP: соединение защищено TLS')
    except ftplib.all_errors as e:
        print(f'FTP TLS не вышел ({e}), обычный FTP')
        ftp = ftplib.FTP(FTP_HOST, timeout=60)
        ftp.login(FTP_USER, pw)
    ftp.encoding = 'utf-8'
    return ftp


def ensure_dirs(ftp, rel, made):
    parts = rel.split('/')[:-1]
    for i in range(1, len(parts) + 1):
        d = '/'.join(parts[:i])
        if d not in made:
            try:
                ftp.mkd('/' + d)
            except ftplib.error_perm:
                pass
            made.add(d)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--skip-build', action='store_true')
    ap.add_argument('--dry-run', action='store_true')
    a = ap.parse_args()
    if not a.skip_build:
        build()
    postprocess()
    now = local_files()
    prev = json.loads(MANIFEST.read_text(encoding='utf-8')) if MANIFEST.exists() else {}
    upload = [f for f, h in now.items() if prev.get(f) != h]
    remove = [f for f in prev if f not in now]
    print(f'к заливке {len(upload)} файлов, к удалению {len(remove)}, всего в копии {len(now)}')
    if a.dry_run:
        for f in upload[:40]:
            print('  +', f)
        return
    ftp = connect()
    made, done = set(), dict(prev)
    try:
        for i, f in enumerate(upload, 1):
            # хостинг иногда рвёт долгую сессию (EOFError) — переподключаемся и повторяем файл
            for attempt in range(3):
                try:
                    ensure_dirs(ftp, f, made)
                    with open(OUT / f, 'rb') as fh:
                        ftp.storbinary('STOR /' + f, fh)
                    break
                except (EOFError, OSError, ftplib.error_temp, ftplib.error_reply) as e:
                    if attempt == 2:
                        raise
                    print(f'  обрыв на {f} ({type(e).__name__}), переподключаюсь', flush=True)
                    ftp = connect()
            done[f] = now[f]
            if i % 50 == 0 or i == len(upload):
                print(f'  залито {i}/{len(upload)}', flush=True)
        for f in remove:
            try:
                ftp.delete('/' + f)
            except ftplib.error_perm:
                pass
            done.pop(f, None)
    finally:
        MANIFEST.write_text(json.dumps(done, ensure_ascii=False, indent=0), encoding='utf-8')
        try:
            ftp.quit()
        except ftplib.all_errors:
            pass
    print(f'готово: {SITE}')


if __name__ == '__main__':
    main()
