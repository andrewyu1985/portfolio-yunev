"""Проверка внешних ссылок из inventory.json. Каждый адрес — напрямую и через прокси из окружения.
Запуск: python3 -I -X utf8 check_external.py <папка результатов>
"""
import json, re, subprocess, sys, tempfile, os
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.parse import quote, urlsplit

RES = Path(sys.argv[1])
inv = json.loads((RES / 'inventory.json').read_text(encoding='utf-8'))
UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36'
SKIP = ('fonts.googleapis.com', 'fonts.gstatic.com', 'www.w3.org', 'schema.org')


def curl(url, direct, maxtime=25):
    fd, tmp = tempfile.mkstemp(suffix='.body')
    os.close(fd)
    cmd = ['curl', '-s', '-L', '--compressed', '-m', str(maxtime), '-A', UA,
           '-H', 'Accept-Language: ru,en;q=0.8', '-o', tmp, '-w', '%{http_code}\t%{url_effective}']
    if direct:
        cmd += ['--noproxy', '*']
    cmd.append(url)
    try:
        r = subprocess.run(cmd, capture_output=True, text=True, timeout=maxtime + 10)
        code, _, eff = r.stdout.partition('\t')
    except Exception as e:  # noqa
        code, eff = '000', str(e)
    try:
        body = Path(tmp).read_bytes()[:400_000].decode('utf-8', 'replace')
    except Exception:
        body = ''
    try:
        os.unlink(tmp)
    except OSError:
        pass
    return code.strip() or '000', eff.strip(), body


def best(url):
    """Сначала через прокси (заграничные сервисы), при неудаче — напрямую."""
    tries = []
    for direct in (False, True):
        code, eff, body = curl(url, direct)
        tries.append((('напрямую' if direct else 'прокси'), code))
        if code.startswith(('2', '3')):
            return code, eff, body, tries
    return code, eff, body, tries


def title(body):
    m = re.search(r'<title[^>]*>(.*?)</title>', body, re.S | re.I)
    return re.sub(r'\s+', ' ', m.group(1)).strip()[:90] if m else ''


def check(url):
    host = urlsplit(url).netloc.lower()
    note = ''
    if 'youtube.com' in host or 'youtu.be' in host:
        code, eff, body, tries = best('https://www.youtube.com/oembed?format=json&url=' + quote(url, safe=''))
        if code == '200':
            try:
                j = json.loads(body)
                note = f"ролик «{j.get('title','')}» · канал {j.get('author_name','')}"
            except Exception:
                note = 'ответ не разобран'
        else:
            note = 'ролик недоступен (закрыт или удалён)' if code in ('401', '403', '404', '400') else 'не удалось проверить'
        ok = code == '200'
    elif 'disk.yandex' in host or 'disk.360.yandex' in host or host == 'yadi.sk':
        code, eff, body, tries = best('https://cloud-api.yandex.net/v1/disk/public/resources?fields=name,size,media_type&public_key=' + quote(url, safe=''))
        ok = code == '200'
        note = body[:160]
    elif host == 't.me':
        parts = [p for p in urlsplit(url).path.split('/') if p]
        if len(parts) >= 2 and parts[1].isdigit():
            code, eff, body, tries = best(url + '?embed=1')
            bad = 'tgme_widget_message_error' in body or 'Post not found' in body or 'Channel with username' in body
            ok = code == '200' and not bad and 'tgme_widget_message' in body
            m = re.search(r'tgme_widget_message_text[^>]*>(.*?)</div>', body, re.S)
            note = 'пост: ' + re.sub(r'<[^>]+>', ' ', m.group(1))[:80].strip() if m else ('пост не найден' if bad else 'пост без текста/медиа')
        else:
            code, eff, body, tries = best(url)
            m = re.search(r'tgme_page_title[^>]*>\s*(?:<span[^>]*>)?(.*?)<', body, re.S)
            extra = re.search(r'tgme_page_extra[^>]*>(.*?)<', body, re.S)
            ok = code == '200' and bool(m)
            note = (('«' + m.group(1).strip() + '»') if m else 'страница без названия — имя не занято/удалено') + (' · ' + extra.group(1).strip() if extra else '')
    elif 'drive.google.com' in host:
        code, eff, body, tries = best(url)
        t = title(body)
        private = 'accounts.google.com' in eff or 'ServiceLogin' in eff
        gone = 'does not exist' in body or 'не существует' in body or code == '404'
        ok = code == '200' and not private and not gone
        note = ('требует входа в Google — закрыта' if private else 'файл не существует' if gone else t)
    else:
        code, eff, body, tries = best(url)
        ok = code.startswith('2')
        t = title(body)
        note = t
        if eff and eff.rstrip('/') != url.rstrip('/'):
            note += f'  → {eff[:110]}'
        low = body.lower()
        if 'hh.ru' in host:
            if 'в архиве' in low or 'vacancy-archived' in low or 'архивная' in low:
                note = 'вакансия в архиве · ' + t
            if 'captcha' in low or 'ddos' in low or code in ('403', '429'):
                note = 'hh.ru не пускает проверку (защита от роботов)'
                ok = None
        if 'github.com' in host and code == '404':
            note = 'репозиторий не найден или закрытый — посетитель увидит 404'
    return {'url': url, 'ok': ok, 'code': code, 'tries': tries, 'note': note, 'where': inv['external'][url]}


urls = [u for u in sorted(inv['external']) if urlsplit(u).netloc.lower() not in SKIP]
with ThreadPoolExecutor(8) as ex:
    out = list(ex.map(check, urls))
(RES / 'external.json').write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding='utf-8')

for mark, flt in (('БИТЫЕ', lambda r: r['ok'] is False), ('НЕ УДАЛОСЬ ПРОВЕРИТЬ', lambda r: r['ok'] is None), ('ЖИВЫЕ', lambda r: r['ok'] is True)):
    rows = [r for r in out if flt(r)]
    print(f'\n== {mark}: {len(rows)} ==')
    for r in rows:
        tr = ' '.join(f'{a}:{c}' for a, c in r['tries'])
        print(f"{r['code']} [{tr}] {r['url']}\n      {r['note'][:170]}\n      где: {r['where'][0]}" + (f" (+{len(r['where'])-1})" if len(r['where']) > 1 else ''))
