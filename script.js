/* RYTINTECH — script.js (vanilla JS, no libraries) */
(function () {
  var body = document.body;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Opening animation: reveal site after ~1.4s
  function ready() { body.classList.remove('loading'); body.classList.add('ready'); }
  window.addEventListener('load', function () { setTimeout(ready, reduce ? 0 : 1400); });
  setTimeout(ready, 3500); // safety fallback

  // 2. Nav: solid background after scrolling, parallax on hero image
  var nav = document.getElementById('nav');
  var heroImg = document.getElementById('heroImg');
  var steps = document.querySelectorAll('.step');
  var stepList = document.querySelector('.steps');
  var ticking = false;

  function onScroll() {
    var y = window.scrollY;
    nav.classList.toggle('solid', y > 60);
    if (!reduce && heroImg && y < window.innerHeight * 1.2) {
      heroImg.style.transform = 'translateY(' + (y * 0.25) + 'px)';
    }
    // process line progress
    if (stepList) {
      var r = stepList.getBoundingClientRect();
      var p = (window.innerHeight * 0.75 - r.top) / r.height;
      stepList.style.setProperty('--p', Math.max(0, Math.min(1, p)));
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  // 3. Scroll reveal (sections, and process steps one by one)
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(function (el, i) {
    el.style.transitionDelay = (i % 4) * 90 + 'ms';
    io.observe(el);
  });
  var stepIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        var i = Array.prototype.indexOf.call(steps, e.target);
        e.target.style.transitionDelay = (reduce ? 0 : i * 120) + 'ms';
        e.target.classList.add('on');
        stepIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  steps.forEach(function (s) { stepIO.observe(s); });

  // 4. Mobile menu
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');
  function setMenu(open) {
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
})();
