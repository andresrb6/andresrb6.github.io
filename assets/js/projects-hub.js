/* Casos a la one-page: una targeta per cas de data/casos.json (estil Factory) */
(function () {
  "use strict";

  var D = window.CasesData;
  var esc = D.esc;

  function kpis(c, lang, t) {
    var list = (c.card && c.card.kpis) || [];
    if (!list.length) return "";
    return '<ul class="kpi-row">' + list.slice(0, 3).map(function (k) {
      return '<li class="kpi"><span class="kpi-value">' + D.value(k.value, lang, t) + '</span><span class="label">' + esc(D.tr(k.label, lang)) + "</span></li>";
    }).join("") + "</ul>";
  }

  function card(c, i, lang, t, tp) {
    var foot = c.published
      ? '<a class="ghost-link" href="' + esc(D.url(c)) + '">' + esc(tp.viewCase) + '<svg aria-hidden="true"><use href="#i-arrow"/></svg></a>'
      : '<span class="case-soon">' + esc(tp.soon) + "</span>";
    var facts = [["problem", c.card.problem], ["execution", c.card.execution], ["result", c.card.result]]
      .filter(function (f) { return f[1] !== undefined; })
      .map(function (f) {
        var v = f[1] && typeof f[1] === "object" ? esc(D.tr(f[1], lang)) : D.value(f[1], lang, t);
        return '<div><dt class="label">' + esc(tp[f[0]]) + "</dt><dd>" + v + "</dd></div>";
      }).join("");
    return '<article class="case-card' + (c.published ? "" : " is-soon") + '">' +
      '<div class="case-card-top"><span class="case-card-index">[' + (i < 9 ? "0" : "") + (i + 1) + "]</span>" + D.status(c.status, t) + "</div>" +
      "<h3>" + esc(D.tr(c.title, lang)) + "</h3>" +
      '<dl class="case-card-facts">' + facts + "</dl>" +
      kpis(c, lang, t) +
      '<div class="case-card-foot">' + foot + '<span class="label">' + esc(tp.kpis) + "</span></div>" +
    "</article>";
  }

  function render() {
    var grid = document.getElementById("projects");
    if (!grid) return;
    var lang = window.Site.lang();
    var dict = window.Site.dict();
    D.load().then(function () {
      grid.innerHTML = D.cases().map(function (c, i) { return card(c, i, lang, dict.cases, dict.portfolio); }).join("");
    }).catch(function () {
      grid.innerHTML = '<p class="cases-empty" role="alert">' + esc(dict.cases.loadError) + "</p>";
    });
  }

  document.addEventListener("langchange", render);
})();
