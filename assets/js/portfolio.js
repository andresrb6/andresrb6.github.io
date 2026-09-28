/* Portafoli: filtres, targetes i fitxa de detall. Les dades viuen a data/projects.js */
(function () {
  "use strict";

  var ALL = "all";
  var state = { filter: ALL, lang: "ca" };
  var lastTrigger = null;

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function tr(field) {
    if (field == null) return "";
    if (typeof field === "string" || Array.isArray(field)) return field;
    return field[state.lang] || field.ca || field.es || field.en || "";
  }

  function projects() { return Array.isArray(window.PROJECTS) ? window.PROJECTS : []; }

  function usedCategories() {
    var seen = [];
    projects().forEach(function (p) {
      (p.categories || []).forEach(function (c) { if (seen.indexOf(c) === -1) seen.push(c); });
    });
    return seen;
  }

  function coverHtml(p) {
    var cover = p.cover || {};
    if (cover.image) {
      return '<div class="project-cover"><img src="' + esc(cover.image) + '" alt="" loading="lazy"></div>';
    }
    return '<div class="project-cover project-cover--' + esc(cover.tone || "blue") + '" aria-hidden="true">' +
      '<svg><use href="#i-' + esc(cover.icon || "chart") + '"/></svg>' +
      '<span class="project-cover-client">' + esc(p.client) + "</span></div>";
  }

  function renderFilters(t) {
    var wrap = document.getElementById("portfolio-filters");
    if (!wrap) return;
    var cats = [ALL].concat(usedCategories());
    wrap.innerHTML = cats.map(function (c) {
      var label = c === ALL ? t.all : (t.categories[c] || c);
      var active = state.filter === c;
      return '<button type="button" class="filter' + (active ? " is-active" : "") + '" data-filter="' + esc(c) + '" aria-pressed="' + active + '">' + esc(label) + "</button>";
    }).join("");
  }

  function renderCards(t) {
    var grid = document.getElementById("projects");
    if (!grid) return;
    var list = projects().filter(function (p) {
      return state.filter === ALL || (p.categories || []).indexOf(state.filter) !== -1;
    });
    if (!list.length) {
      grid.innerHTML = '<p class="projects-empty">' + esc(t.empty) + "</p>";
      return;
    }
    grid.innerHTML = list.map(function (p) {
      var metrics = (p.metrics || []).slice(0, 3).map(function (m) {
        return '<li><strong>' + esc(m.value) + "</strong><span>" + esc(tr(m.label)) + "</span></li>";
      }).join("");
      var cats = (p.categories || []).map(function (c) {
        return '<span class="tag">' + esc(t.categories[c] || c) + "</span>";
      }).join("");
      return '<article class="project-card">' +
        coverHtml(p) +
        '<div class="project-body">' +
          '<div class="project-meta"><span>' + esc(p.year) + "</span>" +
            (p.sample ? '<span class="badge-sample" title="' + esc(t.sampleNote) + '">' + esc(t.sample) + "</span>" : "") +
          "</div>" +
          "<h3>" + esc(tr(p.title)) + "</h3>" +
          "<p>" + esc(tr(p.summary)) + "</p>" +
          '<div class="project-tags">' + cats + "</div>" +
          (metrics ? '<ul class="project-metrics">' + metrics + "</ul>" : "") +
          '<button type="button" class="project-link" data-project="' + esc(p.id) + '">' + esc(t.viewCase) +
            '<svg aria-hidden="true"><use href="#i-arrow"/></svg></button>' +
        "</div></article>";
    }).join("");
  }

  function openProject(id, t) {
    var p = projects().find(function (x) { return x.id === id; });
    var dialog = document.getElementById("project-modal");
    var body = document.getElementById("modal-body");
    if (!p || !dialog || !body) return;

    var actions = (tr(p.actions) || []).map(function (a) { return "<li>" + esc(a) + "</li>"; }).join("");
    var metrics = (p.metrics || []).map(function (m) {
      return '<li><strong>' + esc(m.value) + "</strong><span>" + esc(tr(m.label)) + "</span></li>";
    }).join("");
    var tools = (p.tools || []).map(function (x) { return '<li class="chip">' + esc(x) + "</li>"; }).join("");

    body.innerHTML =
      coverHtml(p) +
      '<div class="modal-content">' +
        '<p class="project-meta"><span>' + esc(p.client) + " · " + esc(p.year) + "</span></p>" +
        '<h2 id="modal-title">' + esc(tr(p.title)) + "</h2>" +
        (p.sample ? '<p class="sample-note">' + esc(t.sampleNote) + "</p>" : "") +
        (metrics ? "<h3>" + esc(t.results) + '</h3><ul class="project-metrics project-metrics--lg">' + metrics + "</ul>" : "") +
        '<div class="modal-cols">' +
          "<div><h3>" + esc(t.context) + "</h3><p>" + esc(tr(p.context)) + "</p></div>" +
          "<div><h3>" + esc(t.challenge) + "</h3><p>" + esc(tr(p.challenge)) + "</p></div>" +
        "</div>" +
        (actions ? "<h3>" + esc(t.actions) + '</h3><ul class="check-list">' + actions + "</ul>" : "") +
        (tools ? "<h3>" + esc(t.tools) + '</h3><ul class="chips">' + tools + "</ul>" : "") +
        (p.link ? '<p><a class="btn btn-primary" href="' + esc(p.link) + '" target="_blank" rel="noopener">' + esc(t.viewCase) + "</a></p>" : "") +
      "</div>";

    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    document.body.classList.add("no-scroll");
  }

  function closeModal() {
    var dialog = document.getElementById("project-modal");
    if (!dialog) return;
    if (typeof dialog.close === "function" && dialog.open) dialog.close();
    else dialog.removeAttribute("open");
  }

  function render(lang, t) {
    state.lang = lang;
    renderFilters(t);
    renderCards(t);
    var dialog = document.getElementById("project-modal");
    var current = dialog && dialog.open && dialog.getAttribute("data-current");
    if (current) openProject(current, t);
  }

  function init(getDict) {
    var filters = document.getElementById("portfolio-filters");
    var grid = document.getElementById("projects");
    var dialog = document.getElementById("project-modal");

    if (filters) filters.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-filter]");
      if (!btn) return;
      state.filter = btn.getAttribute("data-filter");
      var t = getDict().portfolio;
      renderFilters(t);
      renderCards(t);
    });

    if (grid) grid.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-project]");
      if (!btn) return;
      lastTrigger = btn;
      var id = btn.getAttribute("data-project");
      dialog.setAttribute("data-current", id);
      openProject(id, getDict().portfolio);
    });

    if (dialog) {
      dialog.addEventListener("click", function (e) {
        // Tanca en clicar el fons (fora del contingut) o el botó de tancar
        if (e.target === dialog || e.target.closest("[data-modal-close]")) closeModal();
      });
      dialog.addEventListener("close", function () {
        dialog.removeAttribute("data-current");
        document.body.classList.remove("no-scroll");
        if (lastTrigger && document.body.contains(lastTrigger)) lastTrigger.focus();
      });
    }
  }

  window.Portfolio = { init: init, render: render };
})();
