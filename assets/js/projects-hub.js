/* Hub de proyectos de la one-page: una tarjeta por caso de data/casos.json */
(function () {
  "use strict";

  var D = window.CasesData;
  var esc = D.esc;

  function card(c, lang, t, tp) {
    var link = c.published
      ? '<a class="project-link" href="' + esc(D.url(c)) + '">' + esc(tp.viewCase) + '<svg aria-hidden="true"><use href="#i-arrow"/></svg></a>'
      : '<span class="case-soon">' + esc(tp.soon) + "</span>";
    return '<article class="project-card case-card' + (c.published ? "" : " is-soon") + '">' +
      '<div class="case-card-top">' +
        '<span class="case-card-icon" aria-hidden="true"><svg><use href="#i-' + esc(c.icon || "chart") + '"/></svg></span>' +
        D.status(c.status, t) +
      "</div>" +
      "<h3>" + esc(D.tr(c.title, lang)) + "</h3>" +
      '<dl class="case-card-facts">' +
        "<div><dt>" + esc(tp.problem) + "</dt><dd>" + esc(D.tr(c.card.problem, lang)) + "</dd></div>" +
        "<div><dt>" + esc(tp.result) + "</dt><dd>" + D.value(c.card.result, lang, t) + "</dd></div>" +
      "</dl>" +
      link +
    "</article>";
  }

  function render() {
    var grid = document.getElementById("projects");
    if (!grid) return;
    var lang = window.Site.lang();
    var dict = window.Site.dict();
    D.load().then(function () {
      grid.innerHTML = D.cases().map(function (c) { return card(c, lang, dict.cases, dict.portfolio); }).join("");
    }).catch(function () {
      grid.innerHTML = '<p class="projects-empty" role="alert">' + esc(dict.cases.loadError) + "</p>";
    });
  }

  document.addEventListener("langchange", render);
})();
