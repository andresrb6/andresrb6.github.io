/*
 * Carga data/casos.json (una sola vez) y ofrece utilidades comunes al hub de
 * proyectos, a las páginas de caso y a los enlaces del CV.
 * fetch() necesita servidor: funciona en GitHub Pages y con
 * `python3 -m http.server`, no abriendo el archivo con doble clic.
 */
window.CasesData = (function () {
  "use strict";

  var promise = null;
  var data = null;

  // Prefijo hasta la raíz del sitio ("" en index.html, "../" en casos/*.html)
  function root() { return document.body.getAttribute("data-root") || ""; }

  function load() {
    if (!promise) {
      promise = fetch(root() + "data/casos.json", { cache: "no-cache" })
        .then(function (r) {
          if (!r.ok) throw new Error("HTTP " + r.status);
          return r.json();
        })
        .then(function (json) { data = json; return json; });
    }
    return promise;
  }

  function cases() { return data && Array.isArray(data.cases) ? data.cases : []; }
  function published() { return cases().filter(function (c) { return c.published; }); }
  function find(id) { return cases().find(function (c) { return c.id === id; }) || null; }
  function url(c) { return root() + "casos/" + c.id + ".html"; }

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  // Texto en el idioma activo; acepta string, array o { es, ca, en }
  function tr(field, lang) {
    if (field == null) return field;
    if (typeof field === "string" || Array.isArray(field)) return field;
    return field[lang] != null ? field[lang] : (field.es != null ? field.es : field.en);
  }

  // Dato de KPI o cifra: null -> [PENDIENTE], "measuring" -> En medición
  function value(v, lang, t) {
    if (v == null) return '<span class="val-pending">' + esc(t.pending) + "</span>";
    if (v === "measuring") return '<span class="val-measuring">' + esc(t.measuring) + "</span>";
    return esc(tr(v, lang));
  }

  function status(key, t) {
    var label = (t.status && t.status[key]) || key;
    return '<span class="status status--' + esc(key) + '"><span class="status-dot" aria-hidden="true"></span>' + esc(label) + "</span>";
  }

  return {
    load: load,
    cases: cases,
    published: published,
    find: find,
    url: url,
    esc: esc,
    tr: tr,
    value: value,
    status: status
  };
})();
