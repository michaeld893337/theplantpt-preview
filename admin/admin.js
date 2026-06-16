// Admin dashboard logic. All security is server-side: this just asks the API
// "am I an admin?" (/api/me) and, if so, loads the customer list (/api/leads).
// A non-admin gets 401 from both and sees only the "not signed in" gate.
//
// The customer rows are UNTRUSTED (anyone can submit the public form), so we
// build the table with DOM methods + textContent — never innerHTML — which
// makes stored-XSS against the admin impossible.

const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));

function cell(value, className) {
  const td = document.createElement("td");
  td.textContent = value == null ? "" : String(value);
  if (className) td.className = className;
  return td;
}

/* ===================== Auth / mode detection =====================
   Three modes:
     • live    — the real Cloudflare site: /admin/api/me returns the signed-in
                 admin (Cloudflare Access has already gated the page at the edge).
     • preview — a static host with NO backend (the GitHub preview, a plain local
                 server, or an opened file). No login or database exists here, so we
                 show a cosmetic password gate and let the editor work against the
                 browser's localStorage. NOT real security — see admin/index.html.
     • gate    — a real backend that says "not you": show the sign-in notice.
   Preview mode is purely additive: on the live site it never activates, so there's
   nothing to undo at launch. */

const PREVIEW_PASSWORD = "plantpt2026";      // staging only — visible in page source, NOT a real secret
const PREVIEW_STORE = "ppt_preview_content"; // localStorage key shared with js/content.js
let PREVIEW = false;

function isStaticHost() {
  return location.hostname.endsWith("github.io") || location.protocol === "file:";
}

async function init() {
  if (isStaticHost()) return initPreview();
  let res;
  try {
    res = await fetch("/admin/api/me");
  } catch {
    return showGate();
  }
  if (res.ok) {
    const me = await res.json();
    $("[data-who]").textContent = "Signed in as " + me.admin;
    $("[data-dash]").hidden = false;
    await loadLeads();
    await loadContent();
    return;
  }
  if (res.status === 404) return initPreview(); // backend absent → treat as static preview
  return showGate();                            // 401/403 → real site, just not signed in
}

function showGate() {
  $("[data-who]").textContent = "Not signed in";
  $("[data-gate]").hidden = false;
}

/* Preview mode: cosmetic password, then the editor runs against localStorage. */
function initPreview() {
  PREVIEW = true;
  if (sessionStorage.getItem("ppt_preview_unlocked") === "1") return enterPreview();
  $("[data-who]").textContent = "Preview";
  const gate = $("[data-pwgate]");
  gate.hidden = false;
  $("[data-pwform]").addEventListener("submit", (e) => {
    e.preventDefault();
    if ($("[data-pwinput]").value === PREVIEW_PASSWORD) {
      sessionStorage.setItem("ppt_preview_unlocked", "1");
      gate.hidden = true;
      enterPreview();
    } else {
      $("[data-pwerror]").textContent = "Incorrect password — try again.";
    }
  });
  const i = $("[data-pwinput]");
  if (i) i.focus();
}

function enterPreview() {
  PREVIEW = true;
  $("[data-who]").textContent = "Preview mode — changes save in this browser";
  $("[data-dash]").hidden = false;

  // No database on a static host, so there are no real enquiries to show.
  $("[data-count]").textContent = "";
  $("[data-leads]").textContent =
    "Customer enquiries will appear here on the live site. This preview has no database, so there's nothing to load yet.";
  const csv = document.querySelector('a[href="/admin/api/leads?format=csv"]');
  if (csv) csv.style.display = "none";

  loadContent();
}

async function loadLeads() {
  const wrap = $("[data-leads]");
  wrap.textContent = "Loading…";

  let data;
  try {
    const res = await fetch("/admin/api/leads");
    if (!res.ok) throw new Error("failed");
    data = await res.json();
  } catch {
    wrap.textContent = "Could not load enquiries.";
    return;
  }

  $("[data-count]").textContent = `(${data.count})`;
  wrap.textContent = "";

  if (!data.leads.length) {
    wrap.textContent = "No enquiries yet — submissions from the site’s forms appear here.";
    return;
  }

  const table = document.createElement("table");

  const thead = document.createElement("thead");
  const htr = document.createElement("tr");
  ["When", "Source", "Name", "Email", "Phone", "Goal", "Train", "Message", "Consent"].forEach((h) => {
    const th = document.createElement("th");
    th.textContent = h;
    htr.appendChild(th);
  });
  thead.appendChild(htr);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  data.leads.forEach((l) => {
    const tr = document.createElement("tr");

    tr.appendChild(cell((l.created_at || "").replace("T", " ").slice(0, 16)));

    const sourceTd = document.createElement("td");
    const pill = document.createElement("span");
    pill.className = "pill" + (l.source === "contact" ? " pill--contact" : "");
    pill.textContent = l.source || "";
    sourceTd.appendChild(pill);
    tr.appendChild(sourceTd);

    tr.appendChild(cell(l.name));
    tr.appendChild(cell(l.email, "email"));
    tr.appendChild(cell(l.phone));
    tr.appendChild(cell(l.goal));
    tr.appendChild(cell(l.mode));
    tr.appendChild(cell(l.message));
    tr.appendChild(cell(l.consent ? "✓" : ""));

    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  wrap.appendChild(table);
}

/* ===================== Site-text editor =====================
   Renders the editable fields declared in content-fields.js, pre-filled with
   the site's CURRENT wording, and saves only what changed. Editing a field
   back to its default sends an empty value, which removes the override so the
   built-in copy returns. */

async function loadContent() {
  const wrap = $("[data-content]");
  if (!wrap || !window.CONTENT_FIELDS) return;

  const [defaults, overrides] = await Promise.all([loadDefaults(), loadOverrides()]);

  wrap.textContent = "";
  window.CONTENT_FIELDS.forEach((group, gi) => {
    const sec = document.createElement("details");
    sec.className = "cgroup";
    if (gi === 0) sec.open = true; // first group expanded, rest collapsed
    const sum = document.createElement("summary");
    sum.textContent = `${group.group} · ${group.fields.length}`;
    sec.appendChild(sum);

    group.fields.forEach((f) => {
      if (f.type === "image") { sec.appendChild(buildImageField(f, overrides[f.key])); return; }
      const def = defaults[f.key] || "";
      const ov = overrides[f.key];
      const current = ov && ov.value != null ? ov.value : def;

      const field = document.createElement("div");
      field.className = "cfield";

      const id = "c_" + f.key.replace(/\W+/g, "_");
      const label = document.createElement("label");
      label.setAttribute("for", id);
      label.textContent = f.label;
      if (f.hint) {
        const hint = document.createElement("span");
        hint.className = "chint";
        hint.textContent = " — " + f.hint;
        label.appendChild(hint);
      }

      const input = f.multiline ? document.createElement("textarea") : document.createElement("input");
      if (!f.multiline) input.type = "text";
      input.id = id;
      input.value = current;
      input.placeholder = def || "(no default text)";
      input.dataset.key = f.key;
      input.dataset.type = "text";
      input.dataset.def = def;
      input.dataset.original = current;
      input.addEventListener("input", () => {
        field.classList.toggle("is-dirty", input.value !== input.dataset.original);
      });

      field.appendChild(label);
      field.appendChild(input);
      sec.appendChild(field);
    });
    wrap.appendChild(sec);
  });

  $$("[data-content-save]").forEach((btn) => (btn.onclick = saveContent));
}

/* Builds an image field: thumbnail preview + file picker + reset. Picking a file
   uploads it straight to /api/upload (R2); the returned URL is staged in a hidden
   [data-key] input (type=image) and committed by the main Save button. Reset clears
   the override so the design's default image returns. */
function buildImageField(f, ov) {
  const url = ov && ov.value ? ov.value : "";

  const field = document.createElement("div");
  field.className = "cfield cfield--img";
  const label = document.createElement("label");
  label.textContent = f.label;
  field.appendChild(label);

  const thumb = document.createElement("div");
  thumb.className = "thumb";
  const setThumb = (u) => {
    if (u) { thumb.style.backgroundImage = 'url("' + u.replace(/"/g, "%22") + '")'; thumb.textContent = ""; }
    else { thumb.style.backgroundImage = ""; thumb.textContent = "Design default"; }
  };

  const hidden = document.createElement("input");
  hidden.type = "hidden";
  hidden.dataset.key = f.key;
  hidden.dataset.type = "image";
  hidden.dataset.def = "";
  hidden.dataset.original = url;
  hidden.value = url;

  const status = document.createElement("span");
  status.className = "imgstatus";
  const markDirty = () => field.classList.toggle("is-dirty", hidden.value !== hidden.dataset.original);

  const file = document.createElement("input");
  file.type = "file";
  file.accept = "image/png,image/jpeg,image/webp,image/avif,image/gif";
  file.onchange = async () => {
    const picked = file.files && file.files[0];
    if (!picked) return;
    // Preview: no R2 upload endpoint — embed the image as a data URL in localStorage.
    if (PREVIEW) {
      status.textContent = "Reading…";
      const reader = new FileReader();
      reader.onload = () => { hidden.value = reader.result; setThumb(reader.result); markDirty(); status.textContent = "ready — Save to apply (preview)"; };
      reader.onerror = () => { status.textContent = "Could not read that image."; };
      reader.readAsDataURL(picked);
      file.value = "";
      return;
    }
    status.textContent = "Uploading…";
    try {
      const fd = new FormData();
      fd.append("file", picked);
      const res = await fetch("/admin/api/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error("upload failed");
      const data = await res.json();
      hidden.value = data.url;
      setThumb(data.url);
      markDirty();
      status.textContent = "ready — Save to apply";
    } catch {
      status.textContent = "Upload failed — use a JPG/PNG/WebP under 6 MB";
    }
    file.value = ""; // allow re-picking the same file
  };

  const reset = document.createElement("button");
  reset.type = "button";
  reset.className = "btn btn--ghost imgreset";
  reset.textContent = "Reset";
  reset.onclick = () => {
    hidden.value = "";
    setThumb("");
    markDirty();
    status.textContent = hidden.value !== hidden.dataset.original ? "will reset on save" : "";
  };

  setThumb(url);
  const ctrl = document.createElement("div");
  ctrl.className = "imgctrl";
  ctrl.appendChild(file);
  ctrl.appendChild(reset);
  ctrl.appendChild(status);
  const row = document.createElement("div");
  row.className = "imgrow";
  row.appendChild(thumb);
  row.appendChild(ctrl);
  field.appendChild(row);
  field.appendChild(hidden);
  return field;
}

/* The page's own HTML is the source of truth for default copy: fetch it and read
   each [data-key]'s text. Fetched HTML carries the baked-in defaults (overrides are
   applied in the browser, not in the source), so this is exactly the default set. */
async function loadDefaults() {
  try {
    // Relative so it resolves on the live site (/index.html), a local server, and
    // the GitHub project preview (/<repo>/index.html) alike.
    const html = await (await fetch("../index.html")).text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    const map = {};
    doc.querySelectorAll("[data-key]").forEach((el) => {
      map[el.getAttribute("data-key")] = el.textContent.trim();
    });
    return map;
  } catch {
    return {};
  }
}

async function loadOverrides() {
  if (PREVIEW) {
    try { return JSON.parse(localStorage.getItem(PREVIEW_STORE) || "{}") || {}; }
    catch { return {}; }
  }
  try {
    const res = await fetch("/api/content");
    if (!res.ok) throw new Error("failed");
    return (await res.json()).content || {};
  } catch {
    return {};
  }
}

async function saveContent() {
  const status = $("[data-content-status]");
  const inputs = $$("[data-content] [data-key]");

  const updates = [];
  inputs.forEach((input) => {
    if (input.value === input.dataset.original) return; // untouched
    // Back to default → send "" so the server drops the override (restores default).
    const value = input.value.trim() === input.dataset.def.trim() ? "" : input.value;
    updates.push({ key: input.dataset.key, value: value, type: input.dataset.type || "text" });
  });

  if (!updates.length) {
    status.textContent = "Nothing to save.";
    return;
  }

  // Preview: persist to the browser (no backend). js/content.js reads the same key.
  if (PREVIEW) {
    try {
      const store = JSON.parse(localStorage.getItem(PREVIEW_STORE) || "{}") || {};
      updates.forEach((u) => {
        if (u.value === "" || u.value == null) delete store[u.key];
        else store[u.key] = { value: u.value, type: u.type };
      });
      localStorage.setItem(PREVIEW_STORE, JSON.stringify(store));
      inputs.forEach((input) => {
        input.dataset.original = input.value;
        const cf = input.closest(".cfield");
        if (cf) cf.classList.remove("is-dirty");
      });
      status.textContent = `Saved ${updates.length} change${updates.length > 1 ? "s" : ""} — showing on this preview (in your browser). Reload the site to see them.`;
    } catch {
      status.textContent = "Couldn't save to the preview — the browser store may be full (large images use a lot of space).";
    }
    return;
  }

  status.textContent = "Saving…";
  $$("[data-content-save]").forEach((b) => (b.disabled = true));
  try {
    const res = await fetch("/admin/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ updates }),
    });
    if (!res.ok) throw new Error("HTTP " + res.status);
    inputs.forEach((input) => {
      input.dataset.original = input.value; // commit new baseline
      input.closest(".cfield").classList.remove("is-dirty");
    });
    status.textContent = `Saved ${updates.length} change${updates.length > 1 ? "s" : ""} — live shortly.`;
  } catch {
    status.textContent = "Could not save — please try again.";
  } finally {
    $$("[data-content-save]").forEach((b) => (b.disabled = false));
  }
}

init();
