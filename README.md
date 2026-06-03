# The Plant PT — Joe Wilson

A world-class, ad-ready website for **Joe Wilson, "The Plant PT"** — plant-powered personal
training & boxing coaching in Glasgow. Built as a fast, static site (HTML/CSS/JS, **no build
step, no server runtime**) so it drops straight onto the Vexon server and loads instantly for
paid-ad traffic.

> **Design concept — "Roots & Ringcraft":** editorial, earthy and premium (the plant-based calm)
> with athletic clay-orange energy on every call-to-action (the boxing grit). Fonts: Fraunces +
> Hanken Grotesk + Spline Sans Mono.

---

## 📁 Project structure

```
Joes Site/
├── index.html          ← the whole site (one page, anchored sections)
├── css/
│   └── styles.css       ← design system + all styling (PHOTO SLOTS live at the top)
├── js/
│   └── main.js          ← nav, reveals, count-up, copy-codes, contact form (CONFIG at top)
├── assets/
│   └── favicon.svg      ← browser-tab icon
├── images/
│   └── README.md        ← how to swap in Joe's real photos (1 line each)
└── README.md            ← you are here
```

## ▶️ Run it anywhere (no internet, no setup)

The site is fully self-contained — the fonts are bundled in `/fonts`, so it looks **identical
offline**. To run it on any machine:

- **Easiest:** double-click **`Open The Plant PT.bat`** (Windows) — opens it in your browser.
- **Or:** open **`index.html`** in any browser (Mac / Windows / phone).
- **Most production-accurate:** serve it locally, then visit `http://localhost:8080`:

```bash
python -m http.server 8080
```

Everything runs from this folder — copy it to a USB stick or another laptop and it just works.

---

## ✅ Before it goes live — confirm with Joe

These are placeholders deliberately left obvious so they're easy to find:

| # | What | Where | Current placeholder |
|---|------|-------|---------------------|
| 1 | **Phone number** | `index.html` → search `tel:+440000000000` | fake number |
| 2 | **WhatsApp number** | `index.html` → search `wa.me/440000000000` | fake number |
| 3 | **Email address** | `index.html` (`mailto:`) + `js/main.js` (`CONTACT_EMAIL`) | `hello@plantpt.co.uk` |
| 4 | **Vivobarefoot link** | `index.html` → search `vivobarefoot.com` | brand homepage (add real affiliate URL) |
| 5 | **Spartan Protein link** | `index.html` → search `spartanprotein.co.uk` | best-guess domain (confirm) |
| 6 | **Real photos** | see `images/README.md` | gradient placeholders |
| 7 | **Client reviews** | `index.html` "Results" section | placeholder quotes |
| 8 | **Prices** | `index.html` Pricing section | `£XX` placeholders — add Joe's real rates |
| 9 | **Transformation photos** | `index.html` Transformations + `images/` | before/after gradient slots to swap |
| 10 | **Lead-magnet delivery** | `js/main.js` `[data-lead-form]` | shows success only — connect Mailchimp/ConvertKit |
| 11 | **Booking link** | `index.html` `#booking` + Pricing CTAs | → TeamUp schedule; confirm or swap for Calendly |

Affiliate codes are correct and already in place: **Vivobarefoot `VPRO20`**, **Spartan Protein `PLANTPT`**.
Booking links (TeamUp "Two Birds") and the shop (theplantptshop.com) are wired up.

---

## ✉️ The contact funnel (the "back end")

The form works **on day one with zero backend**: when someone submits, it opens their email
app pre-addressed to Joe. To upgrade it to proper inbox delivery (no page reload) you only set
two values — open `js/main.js`, top of file, `CONFIG`:

```js
var CONFIG = {
  FORM_ENDPOINT: "https://api.web3forms.com/submit",  // paste this exact URL
  WEB3FORMS_KEY: "your-access-key-here",              // free key from web3forms.com
  CONTACT_EMAIL: "joe@plantpt.co.uk"                  // mailto fallback
};
```

1. Go to <https://web3forms.com>, enter Joe's email, get a free **Access Key** (no account needed).
2. Paste the key + endpoint above. Done — every enquiry now lands in Joe's inbox instantly.

**Want the full contact suite you described** (stored leads + dashboard for ad-campaign ROI,
WhatsApp/IG/phone all tracked)? That's the natural next step — see "Roadmap" below. Firebase is
already connected to this workspace, so we can add a lead database + private dashboard when you
and Joe are ready.

---

## 🚀 Deploying to the Vexon server (plantpt.co.uk)

Because it's static, deployment = **copy these files to the web root**. Typical paths:

- **Nginx:** `/var/www/plantpt.co.uk/` (root in the server block)
- **Apache:** `/var/www/html/` or a vhost `DocumentRoot`

Steps:
1. Register/point **plantpt.co.uk** → add an **A record** to the Vexon server's IP
   (or a CNAME if it sits behind a proxy).
2. Upload the whole `Joes Site/` contents (keep the folder structure) to the web root.
3. Add HTTPS with a free Let's Encrypt certificate (`certbot`), so the site is `https://`.
4. Visit `https://plantpt.co.uk` — that's it.

> No Node.js, PHP, or database required for v1. If/when we add the leads dashboard, we'll layer a
> small service alongside it.

---

## 🗺️ Roadmap (when you & Joe are ready)

- [ ] Swap in real photos + an `og-image.jpg` for ad/share previews
- [ ] Real contact details + Web3Forms key (proper inbox delivery)
- [ ] **Leads dashboard** — store every enquiry (Firebase) + UTM tags to measure ad ROI per campaign
- [ ] **Calendly / TeamUp booking** embedded for self-serve consults
- [ ] Blog / podcast page for SEO (Joe sharing his training & nutrition journey)
- [ ] Dedicated landing pages per ad campaign (boxing, fat-loss, plant-based) for sharper funnels
- [ ] Cookie/consent banner + privacy policy (needed once analytics/ads pixels are added)

---

## 🎨 Design system quick reference

- **Colours:** warm paper `#f3efe5`, ink `#1a1f12`, deep olive `#222a15`, moss `#3f5b27`,
  leaf `#84a64e`, clay (CTA) `#c95a30` — all defined as CSS variables in `styles.css`.
- **Type:** Fraunces (display) · Hanken Grotesk (body) · Spline Sans Mono (labels).
- **Accessibility:** skip link, semantic landmarks, focus styles, `prefers-reduced-motion`
  support, and AA-contrast text. Keep these when editing.

Built for Joe. 🌱🥊
