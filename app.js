// Rebuilt portfolio interactions
(function() {
  'use strict';

  // Mobile menu toggle
  function initMobileMenu() {
    var btn = document.getElementById('hamburger');
    var panel = document.getElementById('mobileMenu');
    if (!btn || !panel) return;
    btn.addEventListener('click', function() {
      var open = panel.getAttribute('data-open') === 'true';
      panel.setAttribute('data-open', String(!open));
      panel.style.display = open ? 'none' : 'grid';
    });
  }

  // Theme toggle (light/dark)
  function initTheme() {
    var key = 'theme';
    var el = document.getElementById('themeToggleNew');
    var current = localStorage.getItem(key) || 'dark';
    document.documentElement.setAttribute('data-theme', current);
    if (!el) return;
    function swap() {
      current = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', current);
      localStorage.setItem(key, current);
    }
    el.addEventListener('click', swap);
  }

  // Contact form (no backend – present UX only)
  function initContact() {
    var form = document.getElementById('contactFormNew');
    if (!form) return;
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var original = btn.textContent;
      btn.disabled = true;
      btn.innerHTML = 'Sending…';
      setTimeout(function() {
        btn.disabled = false;
        btn.innerHTML = original;
        form.reset();
        alert('Thanks! I will get back to you shortly.');
      }, 1000);
    });
  }

  // Smooth anchor scroll
  function initAnchors() {
    document.addEventListener('click', function(e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // Init
  function init() {
    initMobileMenu();
    initTheme();
    initContact();
    initAnchors();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();


