/* Idiomes, navegació (desktop + drawer mòbil), renderitzat del CV i animacions */
(function () {
  "use strict";

  var LANGS = ["ca", "es", "en"];
  var DEFAULT_LANG = "ca";
  var STORAGE_KEY = "ar-lang";
  var currentLang = DEFAULT_LANG;

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function dict() { return window.CONTENT[currentLang] || window.CONTENT[DEFAULT_LANG]; }

  function lookup(key) {
    return key.split(".").reduce(function (obj, k) { return obj == null ? undefined : obj[k]; }, dict());
  }

  function storageGet() { try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; } }
  function storageSet(v) { try { localStorage.setItem(STORAGE_KEY, v); } catch (e) { /* ignore */ } }

  function detectLang() {
    var fromUrl = new URLSearchParams(location.search).get("lang");
    if (LANGS.indexOf(fromUrl) !== -1) { storageSet(fromUrl); return fromUrl; } // se mantiene al navegar a los casos
    var stored = storageGet();
    if (LANGS.indexOf(stored) !== -1) return stored;
    var nav = (navigator.languages || [navigator.language || ""]).map(function (l) { return String(l).slice(0, 2).toLowerCase(); });
    for (var i = 0; i < nav.length; i++) if (LANGS.indexOf(nav[i]) !== -1) return nav[i];
    return DEFAULT_LANG;
  }

  /* ---------- Render ---------- */

  function renderStatic() {
    $$("[data-i18n]").forEach(function (el) {
      var v = lookup(el.getAttribute("data-i18n"));
      if (typeof v === "string") el.textContent = v;
    });
    $$("[data-i18n-html]").forEach(function (el) {
      var v = lookup(el.getAttribute("data-i18n-html"));
      if (typeof v === "string") el.innerHTML = v; // només textos propis de content.js
    });
    $$("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
        var parts = pair.split(":");
        var v = lookup(parts[1]);
        if (parts[0] && typeof v === "string") el.setAttribute(parts[0].trim(), v);
      });
    });
  }

  function renderHeroFacts(d) {
    var ul = $("#hero-facts");
    if (!ul) return;
    ul.innerHTML = d.hero.facts.map(function (f) {
      return "<li><strong>" + esc(f.value) + "</strong><span>" + esc(f.label) + "</span></li>";
    }).join("");
  }

  function renderMethod(d) {
    var ol = $("#method-list");
    if (!ol) return;
    ol.innerHTML = d.about.method.map(function (m, i) {
      return '<li class="method-step reveal is-visible"><span class="method-num">0' + (i + 1) + "</span>" +
        "<div><h3>" + esc(m.title) + "</h3><p>" + esc(m.text) + "</p></div></li>";
    }).join("");
  }

  // Enlaces "Ver caso completo" bajo los logros del CV (solo casos publicados)
  function caseLinks(itemId, bulletIndex, d) {
    var C = window.CasesData;
    if (!C || !itemId) return "";
    return C.published().filter(function (c) {
      return c.cv && c.cv.experience === itemId && c.cv.bullet === bulletIndex;
    }).map(function (c) {
      return '<a class="xp-case-link" href="' + esc(C.url(c)) + '">' + esc(d.portfolio.viewCase) +
        ": " + esc(C.tr(c.shortTitle, currentLang)) + ' <span aria-hidden="true">→</span></a>';
    }).join("");
  }

  function renderTimeline(d) {
    var ol = $("#timeline");
    if (!ol) return;
    ol.innerHTML = d.experience.items.map(function (x) {
      var end = x.end || d.ui.present;
      var current = !x.end;
      return '<li class="xp' + (current ? " xp--current" : "") + '"' + (x.id ? ' id="' + esc(x.id) + '"' : "") + ">" +
        '<span class="xp-dot" aria-hidden="true"></span>' +
        '<div class="xp-card">' +
          '<div class="xp-head">' +
            "<div><h3>" + esc(x.role) + "</h3>" +
            '<p class="xp-company">' + esc(x.company) + ' <span>· ' + esc(x.place) + "</span></p></div>" +
            '<p class="xp-date">' + (current ? '<span class="live-dot" aria-hidden="true"></span>' : "") + esc(x.start) + " – " + esc(end) + "</p>" +
          "</div>" +
          '<ul class="xp-list">' + x.bullets.map(function (b, i) { return "<li>" + esc(b) + caseLinks(x.id, i, d) + "</li>"; }).join("") + "</ul>" +
          '<div class="xp-tags">' + x.tags.map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("") + "</div>" +
        "</div></li>";
    }).join("");
  }

  function renderLangs(d) {
    var ul = $("#lang-levels");
    if (!ul) return;
    ul.innerHTML = d.education.langs.map(function (l) {
      return '<li><div class="lang-row"><span>' + esc(l.name) + "</span><em>" + esc(l.level) + "</em></div>" +
        '<span class="bar" aria-hidden="true"><span style="width:' + Number(l.pct) + '%"></span></span></li>';
    }).join("");
  }

  function renderSkills(d) {
    var grid = $("#skills-grid");
    if (grid) {
      grid.innerHTML = d.skills.groups.map(function (g) {
        return '<article class="skill-card reveal is-visible">' +
          '<span class="skill-icon" aria-hidden="true"><svg><use href="#i-' + esc(g.icon) + '"/></svg></span>' +
          "<h3>" + esc(g.title) + '</h3><ul class="chips">' +
          g.items.map(function (s) { return '<li class="chip">' + esc(s) + "</li>"; }).join("") +
          "</ul></article>";
      }).join("");
    }
    var soft = $("#soft-skills");
    if (soft) soft.innerHTML = d.skills.soft.map(function (s) { return '<li class="chip">' + esc(s) + "</li>"; }).join("");
  }

  function setLang(lang, persist) {
    if (LANGS.indexOf(lang) === -1) lang = DEFAULT_LANG;
    currentLang = lang;
    var d = dict();
    document.documentElement.lang = lang;
    // Las páginas de caso gestionan su propio título y descripción (case.js)
    if (!document.body.hasAttribute("data-case")) {
      document.title = d.meta.title;
      var desc = $('meta[name="description"]');
      if (desc) desc.setAttribute("content", d.meta.description);
    }

    renderStatic();
    renderHeroFacts(d);
    renderMethod(d);
    renderTimeline(d);
    renderLangs(d);
    renderSkills(d);
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang: lang } }));

    $$("[data-lang]").forEach(function (b) {
      var on = b.getAttribute("data-lang") === lang;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on);
    });
    if (persist) storageSet(lang);
  }

  /* ---------- Drawer (mòbil) ---------- */

  function initDrawer() {
    var toggle = $(".menu-toggle");
    var drawer = $("#drawer");
    var overlay = $(".drawer-overlay");
    if (!toggle || !drawer || !overlay) return;
    var mq = window.matchMedia("(min-width: 960px)");

    function focusables() {
      return $$("a[href], button:not([disabled])", drawer).filter(function (el) { return el.offsetParent !== null; });
    }

    function open() {
      overlay.hidden = false;
      requestAnimationFrame(function () {
        drawer.classList.add("is-open");
        overlay.classList.add("is-open");
      });
      drawer.setAttribute("aria-hidden", "false");
      toggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("no-scroll");
      var f = focusables();
      if (f.length) f[0].focus();
    }

    function close(returnFocus) {
      if (!drawer.classList.contains("is-open")) return;
      drawer.classList.remove("is-open");
      overlay.classList.remove("is-open");
      drawer.setAttribute("aria-hidden", "true");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("no-scroll");
      setTimeout(function () { overlay.hidden = true; }, 300);
      if (returnFocus !== false) toggle.focus();
    }

    toggle.addEventListener("click", function () {
      drawer.classList.contains("is-open") ? close() : open();
    });
    $$("[data-drawer-close]").forEach(function (el) { el.addEventListener("click", function () { close(); }); });
    $$(".drawer-nav a, .drawer .btn", drawer).forEach(function (a) {
      a.addEventListener("click", function () { close(false); });
    });

    document.addEventListener("keydown", function (e) {
      if (!drawer.classList.contains("is-open")) return;
      if (e.key === "Escape") { close(); return; }
      if (e.key === "Tab") {
        var f = focusables();
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    var onChange = function (e) { if (e.matches) close(false); };
    if (mq.addEventListener) mq.addEventListener("change", onChange); else mq.addListener(onChange);
  }

  /* ---------- Header, secció activa i animacions ---------- */

  function initScrollUi() {
    var header = $(".site-header");
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (!("IntersectionObserver" in window)) {
      $$(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    // Solo enlaces internos de esta página (en las páginas de caso apuntan a ../#...)
    var links = $$(".nav-desktop a, .drawer-nav a").filter(function (a) { return a.getAttribute("href").charAt(0) === "#"; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = "#" + entry.target.id;
        links.forEach(function (a) {
          var on = a.getAttribute("href") === id;
          a.classList.toggle("is-active", on);
          if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$("main section[id]").forEach(function (s) { spy.observe(s); });

    var reveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          reveal.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    $$(".reveal:not(.is-visible)").forEach(function (el) { reveal.observe(el); });
  }

  window.Site = { lang: function () { return currentLang; }, dict: dict };

  /* ---------- Init ---------- */

  document.addEventListener("DOMContentLoaded", function () {
    document.documentElement.classList.add("js");
    var year = $("#year");
    if (year) year.textContent = new Date().getFullYear();

    setLang(detectLang(), false);

    // Al llegar los casos se añaden los enlaces del CV; si la URL trae ancla
    // (p. ej. #exp-tecnotrip desde una página de caso), se recoloca el scroll.
    if (window.CasesData && $("#timeline")) {
      window.CasesData.load().then(function () { renderTimeline(dict()); }).catch(function () {}).then(function () {
        var target = location.hash && document.getElementById(location.hash.slice(1));
        if (target) target.scrollIntoView({ behavior: "instant" });
      });
    }

    document.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-lang]");
      if (btn) setLang(btn.getAttribute("data-lang"), true);
    });

    initDrawer();
    initScrollUi();
  });
})();
