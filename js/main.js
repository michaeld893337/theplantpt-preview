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
    FORM_ENDPOINT: "https://api.web3forms.com/submit", // Web3Forms (default — leave as is)
    WEB3FORMS_KEY: "",                 // ← paste your free Web3Forms access key here to go live
    CONTACT_EMAIL: "hello@plantpt.co.uk" // mailto fallback used until a key is added
  };

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  function postJSON(url, payload) {
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).then(function (r) { return r.ok ? r.json() : Promise.reject(new Error("HTTP " + r.status)); });
  }

  /* ---------- current year ---------- */
  var yearEl = $("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- smooth scroll (Lenis) ---------- */
  /* Progressive: only runs if the vendored lib loaded and the visitor hasn't
     asked for reduced motion. The site scrolls perfectly fine without it. */
  if (!prefersReduced && window.Lenis) {
    var lenis = new window.Lenis({
      duration: 1.1,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }
    });
    (function raf(time) { lenis.raf(time); requestAnimationFrame(raf); })();

    // Lenis now owns scrolling, so route in-page anchor links through it.
    $$('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var hash = a.getAttribute("href");
        if (hash.length < 2) return;               // ignore a bare "#"
        var target = document.querySelector(hash);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -68 });   // clear the sticky nav
      });
    });
  }

  /* ---------- sticky nav + mobile sticky CTA ---------- */
  var nav = $("[data-nav]");
  var stickyCta = $(".sticky-cta");
  var hero = $("#hero");
  var contactSec = $("#contact");

  function onScroll() {
    var y = window.scrollY;
    if (nav) nav.classList.toggle("is-stuck", y > 40);
    if (stickyCta && hero) {
      var pastHero = y > hero.offsetHeight * 0.7;
      // No point pushing "Start today" once the visitor is already at the form —
      // and it would float over the submit button.
      var atContact = contactSec && (y + window.innerHeight) > (contactSec.offsetTop + 160);
      stickyCta.classList.toggle("is-visible", pastHero && !atContact);
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

      // consent is required (GDPR) — block submit until ticked
      var consentEl = form.querySelector("[name=consent]");
      if (consentEl && !consentEl.checked) {
        consentEl.focus();
        setNote("Please tick the box so Joe can reply to you.", "error");
        return;
      }

      var data = collect(form);
      var honeypot = (form.querySelector("[name=website]") || {}).value || "";
      var submitBtn = form.querySelector("[data-submit]");
      if (submitBtn) submitBtn.disabled = true;
      setNote("Sending…", "");

      // Delivery chain — an enquiry is never lost:
      //   1. Web3Forms (emails Joe directly) when a key is configured,
      //   2. our own backend (Cloudflare D1 lead store),
      //   3. the visitor's email app as the last resort.
      var capture = postJSON("/api/subscribe", {
        source: "contact", website: honeypot, consent: !!(consentEl && consentEl.checked),
        name: data.name, email: data.email, phone: data.phone,
        goal: data.goal, mode: data.mode, message: data.message
      });

      var delivery;
      if (CONFIG.WEB3FORMS_KEY) {
        capture.catch(function () {}); // capture is best-effort once email delivery is on
        delivery = postJSON(CONFIG.FORM_ENDPOINT, {
          access_key: CONFIG.WEB3FORMS_KEY, subject: "New enquiry — The Plant PT",
          from_name: data.name, botcheck: honeypot,
          name: data.name, email: data.email, phone: data.phone,
          goal: data.goal, mode: data.mode, message: data.message
        }).catch(function () { return capture; });
      } else {
        delivery = capture;
      }

      delivery
      .then(function () { showSuccess(data); })
      .catch(function () {
        var subject = encodeURIComponent("New enquiry — The Plant PT");
        var body = encodeURIComponent(
          "Name: " + data.name + "\nEmail: " + data.email + "\nPhone: " + (data.phone || "—") +
          "\nGoal: " + data.goal + "\nTraining: " + data.mode + "\n\n" + (data.message || "")
        );
        window.location.href = "mailto:" + CONFIG.CONTACT_EMAIL + "?subject=" + subject + "&body=" + body;
        if (submitBtn) submitBtn.disabled = false;
        setNote("Opening your email app… or DM Joe on Instagram above.", "success");
      });
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
      // After a successful submit the form resets and collapses, which can leave
      // this confirmation off-screen on mobile — scroll it into view so it's seen.
      if (type === "success" && note.scrollIntoView) {
        note.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "center" });
      }
    }
    function collect(f) {
      var o = {};
      $$("input, select, textarea", f).forEach(function (el) {
        if (el.name) o[el.name] = el.value.trim();
      });
      return o;
    }
    // Swap the form for a confirmation card so success is unmissable — the old
    // reset-the-form approach collapsed the layout and pushed the note off-screen.
    function showSuccess(data) {
      var first = (data.name || "").split(/\s+/)[0] || "";
      var card = document.createElement("div");
      card.className = "form-success";
      card.setAttribute("role", "status");
      card.setAttribute("tabindex", "-1");

      var icon = document.createElement("span");
      icon.className = "form-success__icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = "✓";

      var title = document.createElement("h3");
      title.className = "form-success__title";
      title.textContent = first ? "Got it, " + first + " — enquiry sent." : "Got it — enquiry sent.";

      var p = document.createElement("p");
      p.textContent = "Joe personally reads every enquiry and will get back to you, usually within a day or two. Keep an eye on your inbox — and your spam folder, just in case.";

      var ig = document.createElement("a");
      ig.className = "btn btn--dark";
      ig.href = "https://www.instagram.com/the_plant_pt/";
      ig.target = "_blank";
      ig.rel = "noopener";
      ig.textContent = "Or DM Joe on Instagram";

      card.appendChild(icon); card.appendChild(title); card.appendChild(p); card.appendChild(ig);
      form.replaceWith(card);
      card.focus({ preventScroll: true });
      if (card.scrollIntoView) card.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "center" });
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
      // consent required for the marketing list (GDPR)
      var leadConsent = leadForm.querySelector("[name=consent]");
      if (leadConsent && !leadConsent.checked) {
        if (leadNote) { leadNote.textContent = "Please tick the box to get the guide."; leadNote.classList.remove("is-success"); }
        return;
      }
      var leadHoneypot = (leadForm.querySelector("[name=website]") || {}).value || "";
      if (leadNote) { leadNote.textContent = "Sending…"; leadNote.classList.remove("is-success"); }

      // Capture the email in our own backend (Cloudflare D1).
      fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "lead-magnet", email: leadEmail.value, consent: !!(leadConsent && leadConsent.checked), website: leadHoneypot })
      })
      .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
      .then(function () { leadForm.reset(); if (leadNote) { leadNote.textContent = "You're on the list — Joe will email your guide shortly. 🌱"; leadNote.classList.add("is-success"); } })
      .catch(function () { if (leadNote) { leadNote.textContent = "Hmm, that didn't send — please try again."; } });
    });
    if (leadEmail) leadEmail.addEventListener("input", function () { if (leadNote && !leadNote.classList.contains("is-success")) leadNote.textContent = leadDefault; });
  }
})();
