/*
 * Zona de dades (Factory.ai): dashboard de resultats + targetes de casos.
 * Dades: data/casos.json (bloc "dashboard" i llista "cases").
 */
(function () {
  "use strict";

  var D = window.CasesData;
  var esc = D.esc;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function fmt(v) { return (v < 0 ? "−" : "") + Math.abs(v); }

  function dashboard(db, lang, t) {
    if (!db) return "";
    var tiles = db.tiles.map(function (x) {
      return '<div class="tile">' +
        '<p class="label">' + esc(D.tr(x.label, lang)) + "</p>" +
        '<p class="tile-value"><span data-count="' + Number(x.value) + '">' + fmt(x.value) + "</span><small>" + esc(x.unit) + "</small></p>" +
        '<span class="meter' + (x.tone === "metric" ? " meter--metric" : "") + '" aria-hidden="true"><span style="--w:' + Number(x.bar) + '%"></span></span>' +
        '<p class="tile-note">' + esc(D.tr(x.note, lang)) + "</p>" +
      "</div>";
    }).join("");
    var charts = db.charts.map(function (c) {
      return '<div class="chart"><h4 class="label">' + esc(D.tr(c.title, lang)) + '</h4><ul class="bars">' +
        c.bars.map(function (b) {
          return '<li class="bar"><span class="bar-name">' + esc(b.label) + '</span>' +
            '<span class="bar-track" aria-hidden="true"><span style="--w:' + Number(b.value) + '%"></span></span>' +
            '<span class="bar-val">' + Number(b.value) + "%</span></li>";
        }).join("") + "</ul></div>";
    }).join("");
    var c = D.find(db.case);
    var link = c && c.published ? '<a class="arrow-link label" href="' + esc(D.url(c)) + '">' + esc(t.viewCaseShort) + '<svg aria-hidden="true"><use href="#i-arrow"/></svg></a>' : "";
    return '<figure class="dash panel" aria-label="' + esc(t.dashboardLabel) + '">' +
      '<div class="dash-bar"><span class="dash-lights" aria-hidden="true"><i></i><i></i><i></i></span>' +
        '<span class="label dash-title">' + esc(db.window) + "</span>" +
        '<span class="label dash-live"><span class="pulse" aria-hidden="true"></span>' + esc(D.tr(db.status, lang)) + " · " + esc(db.date) + "</span></div>" +
      '<div class="dash-tiles">' + tiles + "</div>" +
      '<div class="dash-charts">' + charts + "</div>" +
      '<figcaption class="dash-foot"><span class="label">' + esc(D.tr(db.source, lang)) + "</span>" + link + "</figcaption>" +
    "</figure>";
  }

  function kpis(c, lang, t) {
    var list = (c.card && c.card.kpis) || [];
    if (!list.length) return "";
    return '<ul class="kpi-panel panel">' + list.slice(0, 3).map(function (k) {
      return '<li class="kpi"><span class="kpi-value">' + D.value(k.value, lang, t) + '</span><span class="label">' + esc(D.tr(k.label, lang)) + "</span></li>";
    }).join("") + "</ul>";
  }

  function card(c, i, lang, t, tp) {
    var facts = [["problem", c.card.problem], ["execution", c.card.execution]]
      .filter(function (f) { return f[1]; })
      .map(function (f) { return '<div><dt class="label">' + esc(tp[f[0]]) + "</dt><dd>" + esc(D.tr(f[1], lang)) + "</dd></div>"; }).join("");
    var result = '<span class="label">' + esc(tp.result) + ": " + D.value(c.card.result, lang, t) + "</span>";
    var foot = c.published
      ? '<a class="btn btn-dark" href="' + esc(D.url(c)) + '">' + esc(tp.viewCase) + '<svg aria-hidden="true"><use href="#i-arrow"/></svg></a>' + result
      : '<span class="label">' + esc(tp.pending) + "</span>" + result;
    return '<article class="case-row' + (c.published ? "" : " is-soon") + '">' +
      '<span class="case-row-index idx">[' + (i < 9 ? "0" : "") + (i + 1) + "]</span>" +
      "<div>" +
        '<div class="case-row-top">' + D.status(c.status, t) + "</div>" +
        "<h3>" + esc(D.tr(c.title, lang)) + "</h3>" +
        '<dl class="case-facts">' + facts + "</dl>" +
        '<div class="case-row-foot">' + foot + "</div>" +
      "</div>" +
      kpis(c, lang, t) +
    "</article>";
  }

  // Anima comptadors i barres quan el dashboard entra a la pantalla
  function animate(dash) {
    if (!dash) return;
    if (reduce || !("IntersectionObserver" in window)) { dash.classList.add("is-live"); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.disconnect();
        dash.classList.add("is-live");
        dash.querySelectorAll("[data-count]").forEach(function (el) {
          var end = Number(el.getAttribute("data-count")), t0 = null;
          function step(ts) {
            if (!t0) t0 = ts;
            var p = Math.min(1, (ts - t0) / 1100), eased = 1 - Math.pow(1 - p, 3);
            el.textContent = fmt(Math.round(end * eased));
            if (p < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        });
      });
    }, { threshold: 0.3 });
    io.observe(dash);
  }

  function render() {
    var grid = document.getElementById("projects");
    var dashBox = document.getElementById("dashboard");
    if (!grid) return;
    var lang = window.Site.lang();
    var dict = window.Site.dict();
    var t = Object.assign({}, dict.cases, dict.ui);
    D.load().then(function (json) {
      if (dashBox) {
        var wasLive = dashBox.querySelector(".dash.is-live");
        dashBox.innerHTML = dashboard(json.dashboard, lang, t);
        var dash = dashBox.querySelector(".dash");
        if (wasLive && dash) dash.classList.add("is-live"); else animate(dash);
      }
      grid.innerHTML = D.cases().map(function (c, i) { return card(c, i, lang, dict.cases, dict.portfolio); }).join("");
      var count = document.getElementById("cases-count");
      if (count) count.textContent = D.published().length + " / " + D.cases().length;
    }).catch(function () {
      grid.innerHTML = '<p class="label" role="alert">' + esc(dict.cases.loadError) + "</p>";
    });
  }

  document.addEventListener("langchange", render);
})();
