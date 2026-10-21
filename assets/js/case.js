/*
 * Plantilla de página de caso de estudio (un solo layout para todos los casos).
 * Cada casos/<id>.html solo define sus metadatos SEO y <body data-case="<id>">;
 * el contenido sale de data/casos.json.
 *
 * CONFIDENCIAL: las capturas y cifras absolutas de GA4, Search Console y Brevo
 * deben anonimizarse o mostrarse como variaciones porcentuales antes de
 * publicar, y hay que pedir el visto bueno a la dirección de Tecnotrip.
 */
(function () {
  "use strict";

  var D = window.CasesData;
  var esc = D.esc;
  var caseId = document.body.getAttribute("data-case");
  var PHASES = ["audit_done", "in_progress", "measured"];

  function list(items) {
    if (!items || !items.length) return "";
    return "<ol>" + items.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ol>";
  }

  function pad(n) { return (n < 10 ? "0" : "") + n; }

  function phases(c, t) {
    var current = PHASES.indexOf(c.status);
    return '<ol class="phases" aria-label="' + esc(t.phasesLabel) + '">' +
      t.phases.map(function (name, i) {
        // Cada estat marca la seva fase com a completada
        var state = i <= current ? "done" : (i === current + 1 ? "next" : "todo");
        return '<li class="phase phase--' + state + '"' + (i === current ? ' aria-current="step"' : "") + ">" +
          '<span class="phase-num">' + (state === "done" ? "[✓] " : "[ ] ") + pad(i + 1) + "</span>" +
          '<span class="phase-name">' + esc(name) + "</span></li>";
      }).join("") + "</ol>";
  }

  function hero(c, lang, t) {
    var tools = (c.tools || []).map(function (x) { return '<li class="pill">' + esc(x) + "</li>"; }).join("");
    var num = D.cases().indexOf(c) + 1;
    return '<header class="case-hero"><div class="wrap">' +
        '<nav class="breadcrumb" aria-label="' + esc(t.breadcrumbLabel) + '"><ol>' +
          '<li><a href="../#hero">' + esc(t.home) + "</a></li>" +
          '<li><a href="../#portfolio">' + esc(t.projects) + "</a></li>" +
          '<li aria-current="page">' + esc(D.tr(c.shortTitle, lang)) + "</li>" +
        "</ol></nav>" +
        '<div class="case-hero-top"><span class="idx">[' + pad(num) + "]</span>" +
          '<span class="label">' + esc(t.caseStudy) + "</span>" + D.status(c.status, t) + "</div>" +
        '<h1 class="case-title">' + esc(D.tr(c.title, lang)) + "</h1>" +
        '<p class="case-subtitle">' + esc(D.tr(c.subtitle, lang)) + "</p>" +
        phases(c, t) +
        '<dl class="case-meta">' +
          '<div><dt class="label">' + esc(t.role) + "</dt><dd>" + esc(D.tr(c.role, lang)) + "</dd></div>" +
          '<div><dt class="label">' + esc(t.company) + "</dt><dd>" + esc(c.company) + "</dd></div>" +
          '<div><dt class="label">' + esc(t.period) + "</dt><dd>" + D.value(c.period, lang, t) + "</dd></div>" +
          '<div class="case-meta-tools"><dt class="label">' + esc(t.tools) + '</dt><dd><ul class="pills">' + tools + "</ul></dd></div>" +
        "</dl>" +
        '<div class="case-hero-pad"></div>' +
      "</div></header>";
  }

  function block(id, n, title, inner) {
    return '<section class="case-section" id="' + id + '" aria-labelledby="' + id + '-h"><div class="wrap case-section-inner">' +
        '<div class="case-section-head"><span class="idx">' + pad(n) + '</span><h2 id="' + id + '-h">' + esc(title) + "</h2></div>" +
        '<div class="case-section-body">' + inner + "</div>" +
      "</div></section>";
  }

  function body(c, lang, t) {
    var context = (D.tr(c.context, lang) || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");

    var baseline = (c.baseline || []).map(function (b) {
      return '<li class="stat"><span class="stat-value">' + D.value(b.value, lang, t) + '</span><span class="label">' + esc(D.tr(b.label, lang)) + "</span></li>";
    }).join("");
    var findings = (c.findings || []).map(function (f) {
      return '<li><strong>' + esc(D.tr(f.area, lang)) + "</strong><span>" + D.value(f.text, lang, t) + "</span></li>";
    }).join("");

    var actions = (c.actions || []).map(function (a) {
      return '<li class="' + (a.done ? "is-done" : "is-planned") + '">' +
        '<span class="action-box" aria-hidden="true">' + (a.done ? "[✓]" : "[ ]") + "</span>" +
        "<span>" + esc(D.tr(a.text, lang)) + "</span>" +
        '<span class="action-state">' + esc(a.done ? t.done : t.planned) + "</span></li>";
    }).join("");

    var hasTarget = (c.kpis || []).some(function (k) { return k.target; });
    var rows = (c.kpis || []).map(function (k) {
      return '<tr><th scope="row">' + esc(D.tr(k.label, lang)) + "</th><td>" + D.value(k.before, lang, t) +
        '</td><td class="kpi-arrow" aria-hidden="true">→</td><td>' + D.value(k.after, lang, t) + "</td>" +
        (hasTarget ? '<td class="kpi-target">' + (k.target ? esc(D.tr(k.target, lang)) : "—") + "</td>" : "") + "</tr>";
    }).join("");
    var table = '<div class="kpi-table-wrap" tabindex="0" role="region" aria-labelledby="kpi-caption"><table class="kpi-table">' +
      '<caption id="kpi-caption" class="label">' + esc(t.tableCaption) + "</caption>" +
      '<thead><tr><th scope="col">' + esc(t.kpi) + '</th><th scope="col">' + esc(t.before) +
      '</th><td class="kpi-arrow" aria-hidden="true"></td><th scope="col">' + esc(t.after) + "</th>" +
      (hasTarget ? '<th scope="col">' + esc(t.target) + "</th>" : "") + "</tr></thead>" +
      "<tbody>" + rows + "</tbody></table></div>" +
      '<p class="case-note">' + esc(t.dataNote) + "</p>";

    var learnings = D.tr(c.learnings, lang);
    var learn = '<div class="learn-grid">' +
      '<div class="learn-card"><h3>' + esc(t.learnings) + "</h3>" +
        (learnings && learnings.length ? list(learnings) : '<p class="val-measuring-block">' + esc(t.learningsPending) + "</p>") +
      "</div>" +
      '<div class="learn-card"><h3>' + esc(t.next) + "</h3>" + (list(D.tr(c.next, lang)) || D.value(null, lang, t)) + "</div>" +
    "</div>";

    return block("context", 1, t.context, '<div class="prose">' + context + "</div>") +
      block("baseline", 2, t.baseline, '<p class="case-lead">' + esc(t.baselineIntro) + '</p><ul class="stats">' + baseline + "</ul>" +
        '<h3 class="label case-sub">' + esc(t.findings) + '</h3><ul class="rows">' + findings + "</ul>") +
      block("actions", 3, t.actions, '<ul class="actions">' + actions + "</ul>") +
      block("results", 4, t.results, table) +
      block("learnings", 5, t.learningsAndNext, learn);
  }

  function pager(c, lang, t) {
    var pub = D.published();
    var i = pub.indexOf(c);
    var links = "";
    if (pub.length > 1) {
      var prev = pub[(i - 1 + pub.length) % pub.length];
      var next = pub[(i + 1) % pub.length];
      links = '<div class="pager">' +
        '<a class="pager-link" href="' + esc(D.url(prev)) + '" rel="prev"><span class="label">← ' + esc(t.prev) + "</span><strong>" + esc(D.tr(prev.title, lang)) + "</strong></a>" +
        '<a class="pager-link pager-link--next" href="' + esc(D.url(next)) + '" rel="next"><span class="label">' + esc(t.nextCase) + " →</span><strong>" + esc(D.tr(next.title, lang)) + "</strong></a>" +
      "</div>";
    }
    return '<nav class="case-nav" aria-label="' + esc(t.caseNavLabel) + '"><div class="wrap">' + links +
      '<div class="case-back">' +
        '<a class="btn btn-primary" href="../#portfolio">← ' + esc(t.backProjects) + "</a>" +
        '<a class="btn btn-outline" href="../#' + esc(c.cv ? c.cv.experience : "experience") + '">' + esc(t.backCv) + "</a>" +
      "</div></div></nav>";
  }

  function render(lang, dict) {
    var mount = document.getElementById("case-root");
    var t = dict.cases;
    var c = D.find(caseId);
    if (!c || !c.published) {
      mount.innerHTML = '<div class="wrap case-empty"><h1>' + esc(t.notFound) + '</h1><p><a class="btn btn-primary" href="../#portfolio">← ' + esc(t.backProjects) + "</a></p></div>";
      return;
    }
    document.title = D.tr(c.title, lang) + " · " + t.caseStudy + " · Andrés Roldán Baldó";
    var desc = document.querySelector('meta[name="description"]');
    if (desc && c.subtitle) desc.setAttribute("content", D.tr(c.subtitle, lang));
    mount.innerHTML = hero(c, lang, t) + body(c, lang, t) + pager(c, lang, t);
  }

  function update() {
    var lang = window.Site.lang();
    var dict = window.Site.dict();
    D.load().then(function () { render(lang, dict); }).catch(function () {
      // Sin datos, deja el h1 estático del HTML y avisa
      var mount = document.getElementById("case-root");
      var old = mount.querySelector(".case-error");
      if (old) old.remove();
      mount.insertAdjacentHTML("beforeend", '<p class="wrap case-error" role="alert">' + esc(dict.cases.loadError) + "</p>");
    });
  }

  document.addEventListener("langchange", update);
})();
