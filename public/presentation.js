// Общий скрипт standalone-презентаций: липкий nav + появление секций при прокрутке
(function () {
  var nav = document.getElementById('nav');
  if (nav) {
    addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', scrollY > 20);
    });
  }
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  els.forEach(function (el) { io.observe(el); });
})();
