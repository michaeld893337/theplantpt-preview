/* =============================================================
   THE PLANT PT — editable content layer (public site)
   Vanilla JS, no dependencies. Progressive: if this fails or the
   API is unreachable, every element keeps its baked-in HTML, so
   the page is never blank.

   How it works:
     1. Editable elements are tagged. The admin saves a map:
          { "hero.kicker": {value, type}, "contact.email": {value}, … }
     2. On load we fetch that map (/api/content live, or localStorage
        on the static GitHub preview) and apply it.

   Five kinds of hook, all reading the SAME map by key:
     • [data-key]        → text (textContent) or image (bg/src).
                           If the element also has [data-count] (an animated
                           stat), its data-count is updated to match.
     • [data-href-key]   → rebuild the element's href from the key's value,
                           via [data-href-tmpl] (e.g. "mailto:{v}", "tel:{v}")
                           and optional [data-href-normalize] (phone | wa | handle).
     • [data-copy-key]   → set the element's data-copy attribute (the
                           "copy to clipboard" affiliate-code button).
     • [data-show-key]   → reveal a section (remove `hidden`) when the value
                           is "on". Default/empty leaves it hidden.

   A key can be reused on many elements — all of them get updated (so one
   field drives the marquee's duplicated phrases or the affiliate code's
   several appearances).
============================================================= */
(function () {
  "use strict";

  // Anything editable on this page? (any of the five hooks)
  var SEL = "[data-key],[data-href-key],[data-copy-key],[data-show-key]";
  if (!document.querySelector(SEL)) return;

  function apply(content) {
    // 1 · text / image (+ animated-stat data-count sync)
    document.querySelectorAll("[data-key]").forEach(function (el) {
      var ov = content[el.getAttribute("data-key")];
      if (ov && ov.value != null) applyOverride(el, ov.value, ov.type);
    });
    // 2 · link href sync
    document.querySelectorAll("[data-href-key]").forEach(function (el) {
      var ov = content[el.getAttribute("data-href-key")];
      if (ov && ov.value != null && String(ov.value).trim() !== "") applyHref(el, ov.value);
    });
    // 3 · copy-to-clipboard attribute sync
    document.querySelectorAll("[data-copy-key]").forEach(function (el) {
      var ov = content[el.getAttribute("data-copy-key")];
      if (ov && ov.value != null && String(ov.value).trim() !== "") el.setAttribute("data-copy", ov.value);
    });
    // 4 · section visibility toggle
    document.querySelectorAll("[data-show-key]").forEach(function (el) {
      var ov = content[el.getAttribute("data-show-key")];
      if (ov && String(ov.value).toLowerCase() === "on") el.hidden = false;
    });
  }

  /* Staging/preview overrides saved by the admin in preview mode — used on
     static hosts (the GitHub preview) where there is no /api/content backend.
     Per-browser only; the live site uses the API instead. Key shared with admin.js. */
  function previewOverrides() {
    try { return JSON.parse(localStorage.getItem("ppt_preview_content") || "{}") || {}; }
    catch (e) { return {}; }
  }

  // Static hosts (the GitHub preview, an opened file) have no API — read local
  // preview edits directly and skip a fetch that would only 404 in the console.
  var staticHost = location.hostname.indexOf("github.io") !== -1 || location.protocol === "file:";
  if (staticHost) { apply(previewOverrides()); return; }

  fetch("/api/content")
    .then(function (r) { return r.ok ? r.json() : Promise.reject(new Error("HTTP " + r.status)); })
    .then(function (data) { apply((data && data.content) || {}); })
    .catch(function () {
      /* No live backend (offline, or a static preview) — fall back to any local
         preview edits so the staging site reflects them. Silent if there are none. */
      apply(previewOverrides());
    });

  /* ---- appliers (never innerHTML — a stored string can't become markup) ---- */

  function applyOverride(el, value, type) {
    if (value == null || String(value).trim() === "") return; // empty = keep default

    if (type === "image") {
      // value is an image URL (or data: URL in preview). <img> wants src; a
      // CSS-backed panel (e.g. the hero) wants a background-image.
      if (el.tagName === "IMG") el.src = value;
      else if (el.style) el.style.backgroundImage = 'url("' + String(value).replace(/"/g, "%22") + '")';
      return;
    }

    el.textContent = value;
    // Animated count-up stat: keep its data-count in step so the animation lands
    // on the new number (main.js reads data-count).
    if (el.hasAttribute("data-count")) {
      var n = String(value).replace(/[^\d.]/g, "");
      if (n) el.setAttribute("data-count", n);
    }
  }

  function applyHref(el, value) {
    var tmpl = el.getAttribute("data-href-tmpl") || "{v}";
    var norm = el.getAttribute("data-href-normalize");
    var v = String(value).trim();
    if (norm === "phone") v = v.replace(/[^\d+]/g, "").replace(/^0/, "+44");      // tel: → +44…
    else if (norm === "wa") v = v.replace(/[^\d]/g, "").replace(/^0/, "44");      // wa.me → 44… (no +)
    else if (norm === "handle") v = v.replace(/^@/, "");                          // @name → name
    el.setAttribute("href", tmpl.replace("{v}", v));
  }
})();
