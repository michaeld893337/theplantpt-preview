/* =============================================================
   THE PLANT PT — editable content layer (public site)
   Vanilla JS, no dependencies. Progressive: if this fails or the
   API is unreachable, every element keeps its baked-in HTML, so
   the page is never blank. Mirrors the [data-year] pattern in main.js.

   How it works:
     1. Elements that Joe can edit are tagged  <… data-key="hero.kicker">
     2. On load we fetch /api/content  → { "hero.kicker": {value,type}, … }
     3. For each tagged element that has an override, we apply it.
============================================================= */
(function () {
  "use strict";

  var nodes = Array.prototype.slice.call(document.querySelectorAll("[data-key]"));
  if (!nodes.length) return; // nothing editable on this page

  function applyAll(content) {
    nodes.forEach(function (el) {
      var override = content[el.getAttribute("data-key")];
      if (override && override.value != null) applyOverride(el, override.value, override.type);
    });
  }

  /* Staging/preview overrides saved by the admin in preview mode — used on static
     hosts (the GitHub preview) where there is no /api/content backend. Per-browser
     only; the live site uses the API above instead. Shared key with admin/admin.js. */
  function previewOverrides() {
    try { return JSON.parse(localStorage.getItem("ppt_preview_content") || "{}") || {}; }
    catch (e) { return {}; }
  }

  // Static hosts (the GitHub preview, an opened file) have no API — read the local
  // preview edits directly and skip a fetch that would only 404 in the console.
  var staticHost = location.hostname.indexOf("github.io") !== -1 || location.protocol === "file:";
  if (staticHost) { applyAll(previewOverrides()); return; }

  fetch("/api/content")
    .then(function (r) { return r.ok ? r.json() : Promise.reject(new Error("HTTP " + r.status)); })
    .then(function (data) { applyAll((data && data.content) || {}); })
    .catch(function () {
      /* No live backend (offline, or a static preview) — fall back to any local
         preview edits so the staging site reflects them. Silent if there are none. */
      applyAll(previewOverrides());
    });

  /* ===========================================================
     applyOverride(el, value, type)  ▸  YOUR CALL TO MAKE
     -----------------------------------------------------------
     This is where an admin's saved value lands on the live page,
     so how you write it IS the security + behaviour policy:

       • type === "text"  → the common case. Joe's prices, headlines
         and copy. These values are trusted-ish (only an authenticated
         admin can write them), BUT admin.js elsewhere is deliberate
         about NEVER using innerHTML, so stored markup can't become a
         script. Match that: set the *text*, not HTML.

       • type === "image" → value is an image URL. Decide how to show
         it: an <img> wants its `src` set; a CSS-backed panel (like the
         hero) wants `el.style.backgroundImage`. You can detect which
         by the element's tagName.

     Constraints:
       - Never use innerHTML / insertAdjacentHTML here (XSS = trivial).
       - Don't blank the element on a bad value — leave the default.

     Implement the ~6-10 lines below. (Ping me if you'd rather I do it.)
  ============================================================ */
  function applyOverride(el, value, type) {
    // Empty / whitespace value = no real override → keep the baked-in default.
    if (value == null || String(value).trim() === "") return;

    if (type === "image") {
      // `value` is an image URL. An <img> wants its src; a CSS-backed panel
      // (e.g. the hero) wants a background-image. Anything else: leave it be.
      if (el.tagName === "IMG") el.src = value;
      else if (el.style) el.style.backgroundImage = 'url("' + String(value).replace(/"/g, "%22") + '")';
      return;
    }

    // Default = text. textContent, never innerHTML: a stored string can then
    // never become markup or script (matches the no-innerHTML rule in admin.js).
    el.textContent = value;
  }
})();
