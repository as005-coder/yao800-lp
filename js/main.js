/* Miyazaki Fresh Pepper LP */
(function () {
  'use strict';

  /* ---------- リンク先設定（確定したらここを書き換える） ---------- */
  var LINKS = {
    store: '#',      // 公式オンラインストアのURL
    instagram: '#'   // InstagramのURL
  };
  document.querySelectorAll('[data-link]').forEach(function (a) {
    var url = LINKS[a.getAttribute('data-link')];
    if (url && url !== '#') {
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener';
    }
  });

  /* ---------- SPメニュー ---------- */
  var btn = document.querySelector('.menu-btn');
  var menu = document.getElementById('spmenu');
  var header = document.getElementById('header');
  function setMenu(open) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    header.classList.toggle('is-menu-open', open);
  }
  if (btn && menu) {
    btn.addEventListener('click', function () {
      setMenu(btn.getAttribute('aria-expanded') !== 'true');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
    window.matchMedia('(min-width: 768px)').addEventListener('change', function (e) {
      if (e.matches) setMenu(false);
    });
  }

  /* ---------- フェードイン ---------- */
  var targets = document.querySelectorAll(
    '.intro__logo, .intro__text, .photo3, .rare__lead, .rare__body, .shock__title, .shock__body, ' +
    '.field__title, .field__text, .problem__top > *, .problem__solve-inner, .why__title, .why__text, ' +
    '.vtitle, .pro__text, .cta, .diff__head, .flavor__inner, .diff__summary p, .gift__text, ' +
    '.reasons__title, .reasons__list li, .products__title, .product, .company'
  );
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function (el) {
      el.classList.add('js-fade');
      io.observe(el);
    });
  }
})();
