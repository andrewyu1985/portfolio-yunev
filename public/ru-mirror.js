/* Переадресация со старого адреса на зеркало для России (https://andrey-yunev.ru).
   На andrey-yunev.vercel.app страница проверяет, открывается ли у посетителя новый адрес,
   и если да — переводит на тот же путь там. Если новый адрес недоступен (VPN, чужая сеть,
   нет сертификата) — посетитель остаётся здесь. На самом зеркале скрипт ничего не делает.
   Старый хост задан регуляркой, а не строкой: scripts/deploy_ru.py заменяет в копии строку
   с именем хоста на andrey-yunev.ru, и проверка на зеркале стала бы всегда истинной. */
(function () {
  if (!/^(andrey|portfolio)-yunev\.vercel\.app$/.test(location.hostname) || !window.fetch) return
  var target = 'https://andrey-yunev.ru'
  var path = location.pathname
  // на зеркале страницы лежат папками (/cinema/): сразу идём по адресу со слешем,
  // иначе сервер reg.ru при добавлении слеша уводит с https на http
  if (!/\/$/.test(path) && !/\.[a-z0-9]+$/i.test(path)) path += '/'
  var ctrl = window.AbortController ? new AbortController() : null
  var timer = setTimeout(function () { if (ctrl) ctrl.abort() }, 2500)
  fetch(target + '/ru-ping.txt?t=' + Date.now(), { mode: 'no-cors', cache: 'no-store', signal: ctrl ? ctrl.signal : undefined })
    .then(function () {
      clearTimeout(timer)
      location.replace(target + path + location.search + location.hash)
    })
    .catch(function () {})
})()
