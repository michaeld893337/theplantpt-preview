/* =============================================================
   THE PLANT PT — interactions
   Vanilla JS, no dependencies. Progressive: the site works
   without it, this just adds polish + the contact funnel.
============================================================= */
(function () {
  "use strict";

  /* =========================================================
     CONFIG  ▸  the one thing worth setting up.
     ---------------------------------------------------------
     Leave FORM_ENDPOINT empty and the contact form falls back
     to opening the visitor's email app addressed to Joe — so
     it works on day one with zero backend.

     To deliver enquiries straight to an inbox WITHOUT the
     visitor leaving the page, create a free Web3Forms access
     key at https://web3forms.com and paste it below. That's
     the whole setup. (See README for Formspree / other options.)
     ========================================================= */
  var CONFIG = {
    FORM_ENDPOINT: "",                 // e.g. "https://api.web3forms.com/submit"
    WEB3FORMS_KEY: "",                 // paste your Web3Forms access key here
    CONTACT_EMAIL: "hello@plantpt.co.uk" // mailto fallback recipient
  };

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- current year ---------- */
  var yearEl = $("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- sticky nav + mobile sticky CTA ---------- */
  var nav = $("[data-nav]");
  var stickyCta = $(".sticky-cta");
  var hero = $("#hero");

  function onScroll() {
    var y = window.scrollY;
    if (nav) nav.classList.toggle("is-stuck", y > 40);
    if (stickyCta && hero) {
      stickyCta.classList.toggle("is-visible", y > hero.offsetHeight * 0.7);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  var toggle = $("[data-menu-toggle]");
  var menu = $("[data-mobile-menu]");

  function setMenu(open) {
    if (!menu || !toggle) return;
    menu.hidden = !open;                 // keep screen readers in sync (CSS keeps it transitionable)
    menu.classList.toggle("is-open", open);
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      setMenu(!menu.classList.contains("is-open"));
    });
    $$("a", menu).forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
  }

  /* ---------- scroll reveal ---------- */
  var revealEls = $$(".reveal");
  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- stat count-up ---------- */
  var counted = false;
  function runCounts() {
    if (counted) return; counted = true;
    $$("[data-count]").forEach(function (el) {
      var target = parseInt(el.getAttribute("data-count"), 10);
      var suffix = el.getAttribute("data-suffix") || "";
      if (prefersReduced) { el.textContent = target + suffix; return; }
      var start = null, dur = 1400;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);          // easeOutCubic
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }
  var statsEl = $(".hero__stats");
  if (statsEl && "IntersectionObserver" in window && !prefersReduced) {
    var statObs = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { runCounts(); statObs.disconnect(); }
    }, { threshold: 0.5 });
    statObs.observe(statsEl);
  } else {
    runCounts();
  }

  /* ---------- copy affiliate codes ---------- */
  $$("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var code = btn.getAttribute("data-copy");
      var done = function () {
        var original = btn.textContent;
        btn.textContent = "Copied ✓";
        btn.classList.add("is-copied");
        setTimeout(function () {
          btn.textContent = original;
          btn.classList.remove("is-copied");
        }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(done).catch(fallbackCopy);
      } else {
        fallbackCopy();
      }
      function fallbackCopy() {
        var t = document.createElement("textarea");
        t.value = code; t.style.position = "fixed"; t.style.opacity = "0";
        document.body.appendChild(t); t.select();
        try { document.execCommand("copy"); done(); } catch (e) {}
        document.body.removeChild(t);
      }
    });
  });

  /* ---------- contact form ---------- */
  var form = $("[data-contact-form]");
  if (form) {
    var note = $("[data-form-note]");
    var defaultNote = note ? note.textContent : "";

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // validate required fields
      var valid = true;
      $$("[required]", form).forEach(function (field) {
        var ok = field.value && field.value.trim() !== "";
        if (field.type === "email") ok = ok && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(field.value);
        field.classList.toggle("is-invalid", !ok);
        if (!ok && valid) { field.focus(); valid = false; }
      });
      if (!valid) {
        setNote("Please fill in the highlighted fields.", "error");
        return;
      }

      var data = collect(form);

      // Path A: a real endpoint is configured → POST it (no page reload)
      if (CONFIG.FORM_ENDPOINT && CONFIG.WEB3FORMS_KEY) {
        setNote("Sending…", "");
        var payload = Object.assign({ access_key: CONFIG.WEB3FORMS_KEY,
          subject: "New enquiry — The Plant PT", from_name: data.name }, data);
        fetch(CONFIG.FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload)
        })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (res.success) { form.reset(); setNote("Thanks " + data.name.split(" ")[0] + " — Joe will be in touch soon. 💪", "success"); }
          else { setNote("Something went wrong. Please message Joe on WhatsApp instead.", "error"); }
        })
        .catch(function () { setNote("Network issue. Please try WhatsApp or email instead.", "error"); });
        return;
      }

      // Path B (default): no backend yet → open the visitor's email app, pre-filled
      var subject = encodeURIComponent("New enquiry — The Plant PT");
      var body = encodeURIComponent(
        "Name: " + data.name + "\n" +
        "Email: " + data.email + "\n" +
        "Phone: " + (data.phone || "—") + "\n" +
        "Goal: " + data.goal + "\n" +
        "Training: " + data.mode + "\n\n" +
        (data.message || "")
      );
      window.location.href = "mailto:" + CONFIG.CONTACT_EMAIL + "?subject=" + subject + "&body=" + body;
      setNote("Opening your email app… or message Joe on WhatsApp above.", "success");
    });

    // clear the invalid state as the user fixes a field
    $$("input, select, textarea", form).forEach(function (f) {
      f.addEventListener("input", function () { f.classList.remove("is-invalid"); });
    });

    function setNote(msg, type) {
      if (!note) return;
      note.textContent = msg;
      note.classList.remove("is-success", "is-error");
      if (type === "success") note.classList.add("is-success");
      if (type === "error") note.classList.add("is-error");
    }
    function collect(f) {
      var o = {};
      $$("input, select, textarea", f).forEach(function (el) {
        if (el.name) o[el.name] = el.value.trim();
      });
      return o;
    }
  }

  /* ---------- lead-magnet email capture ---------- */
  var leadForm = document.querySelector("[data-lead-form]");
  if (leadForm) {
    var leadNote = document.querySelector("[data-lead-note]");
    var leadDefault = leadNote ? leadNote.textContent : "";
    var leadEmail = leadForm.querySelector("input[type=email]");
    leadForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = leadEmail && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(leadEmail.value);
      if (!ok) { if (leadEmail) leadEmail.focus(); if (leadNote) { leadNote.textContent = "Please enter a valid email."; leadNote.classList.remove("is-success"); } return; }
      // TODO: connect to an email platform (Mailchimp / ConvertKit / Web3Forms) to actually deliver the guide.
      leadForm.reset();
      if (leadNote) { leadNote.textContent = "Nice one — check your inbox for the guide. 🌱"; leadNote.classList.add("is-success"); }
    });
    if (leadEmail) leadEmail.addEventListener("input", function () { if (leadNote && !leadNote.classList.contains("is-success")) leadNote.textContent = leadDefault; });
  }
})();
