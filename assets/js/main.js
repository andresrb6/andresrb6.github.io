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
      return '<li><span class="label">' + esc(f.k) + "</span><strong>" + esc(f.v) + "</strong><small>" + esc(f.d) + "</small></li>";
    }).join("");
  }

  function renderMethod(d) {
    var ol = $("#method-list");
    if (!ol) return;
    ol.innerHTML = d.about.method.map(function (m, i) {
      return '<li><span class="idx">0' + (i + 1) + "</span><h3>" + esc(m.title) + "</h3><p>" + esc(m.text) + "</p></li>";
    }).join("");
  }

  // Enllaços "Veure cas complet" sota els assoliments del CV (només casos publicats)
  function caseLinks(itemId, bulletIndex, d) {
    var C = window.CasesData;
    if (!C || !itemId) return "";
    return C.published().filter(function (c) {
      return c.cv && c.cv.experience === itemId && c.cv.bullet === bulletIndex;
    }).map(function (c) {
      return '<a class="cv-case-link" href="' + esc(C.url(c)) + '">' + esc(d.portfolio.viewCase) +
        ": " + esc(C.tr(c.shortTitle, currentLang)) + "</a>";
    }).join("");
  }

  function renderTimeline(d) {
    var ol = $("#timeline");
    if (!ol) return;
    ol.innerHTML = d.experience.items.map(function (x) {
      var current = !x.end;
      return '<li class="cv-row"' + (x.id ? ' id="' + esc(x.id) + '"' : "") + ">" +
        '<p class="cv-date">' + (current ? '<span class="dot dot--live" aria-hidden="true"></span>' : "") +
          esc(x.start) + " – " + esc(x.end || d.ui.present) + "</p>" +
        '<div class="cv-role"><h3>' + esc(x.role) + "</h3><p>" + esc(x.company) + " · " + esc(x.place) + "</p></div>" +
        '<div class="cv-body"><ul class="cv-list">' +
          x.bullets.map(function (b, i) { return "<li>" + esc(b) + caseLinks(x.id, i, d) + "</li>"; }).join("") +
        '</ul><div class="cv-tags">' + x.tags.map(function (t) { return '<span class="pill">' + esc(t) + "</span>"; }).join("") + "</div></div>" +
      "</li>";
    }).join("");
  }

  function renderEducation(d) {
    var ol = $("#education");
    if (ol) {
      ol.innerHTML = d.education.items.map(function (e) {
        return '<li class="cv-row"><p class="cv-date">' + esc(e.period) + '</p><div class="cv-role"><h3>' + esc(e.title) + "</h3><p>" + esc(e.place) + "</p></div></li>";
      }).join("");
    }
    var ul = $("#lang-levels");
    if (ul) {
      ul.innerHTML = d.education.langs.map(function (l) {
        return "<li><span>" + esc(l.name) + '</span><span class="label">' + esc(l.level) + "</span>" +
          '<span class="bar" aria-hidden="true"><span style="width:' + Number(l.pct) + '%"></span></span></li>';
      }).join("");
    }
  }

  function renderStack(d) {
    var s = d.skills;
    var grid = $("#stack");
    if (grid) {
      grid.innerHTML = s.groups.map(function (g, i) {
        return '<article class="stack-card">' +
          '<div><p class="label"><span class="idx">0' + (i + 1) + "</span> — " + esc(g.code) + "</p>" +
          "<h3>" + esc(g.title) + "</h3></div>" +
          '<ul class="stack-tools" aria-label="' + esc(s.toolsLabel) + '">' + g.tools.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" +
          '<p class="stack-methods"><span class="sr-only">' + esc(s.methodsLabel) + ": </span>" + esc(g.methods) + "</p>" +
        "</article>";
      }).join("");
    }
    var soft = $("#soft-skills");
    if (soft) soft.innerHTML = s.soft.map(function (t) { return '<li class="pill">' + esc(t) + "</li>"; }).join("");
    var mq = $("#marquee");
    if (mq) {
      var all = [];
      s.groups.forEach(function (g) { all = all.concat(g.tools); });
      var row = all.map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("");
      mq.innerHTML = row + row; // duplicat per al bucle continu
    }
  }

  /* Ajusta el text a l'amplada del contenidor (wordmark Haus Otto i correu) */
  function fitText() {
    $$("[data-fit]").forEach(function (el) {
      if (!el.offsetParent) return;
      var box = el.parentElement.clientWidth;
      el.style.display = "inline-block";
      el.style.fontSize = "100px";
      var w = el.getBoundingClientRect().width;
      el.style.display = "";
      if (w) el.style.fontSize = Math.floor(100 * box / w * 0.99) + "px";
    });
    $$("[data-fit-group]").forEach(function (g) {
      if (!g.offsetParent) return;
      var lines = $$("span", g), box = g.clientWidth, min = Infinity;
      lines.forEach(function (l) { l.style.fontSize = "100px"; l.style.display = "inline-block"; min = Math.min(min, 100 * box / l.getBoundingClientRect().width); });
      lines.forEach(function (l) { l.style.fontSize = Math.floor(min * 0.99) + "px"; l.style.display = ""; });
    });
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
    renderEducation(d);
    renderStack(d);
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
        // El focus entra al calaix quan ja és visible (després del canvi de visibilitat)
        setTimeout(function () {
          var f = focusables();
          if (f.length) f[0].focus();
        }, 50);
      });
      drawer.setAttribute("aria-hidden", "false");
      toggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("no-scroll");
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
    var links = $$(".nav-desktop a, .drawer-nav a, .dots a").filter(function (a) { return a.getAttribute("href").charAt(0) === "#"; });
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

    fitText();
    // Es torna a ajustar quan arriba la font condensada (es carrega en diferit)
    if (document.fonts) {
      if (document.fonts.ready) document.fonts.ready.then(fitText);
      if (document.fonts.addEventListener) document.fonts.addEventListener("loadingdone", fitText);
    }
    window.addEventListener("load", fitText);
    var rt;
    window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(fitText, 120); });
  });
})();
