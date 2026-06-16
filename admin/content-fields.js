/* The catalogue of editable site text, grouped for the admin form.
   This is the ONE place that defines a field's label/group; the matching
   element in the page carries the same data-key (or data-href-key / data-copy-key
   / data-show-key for links, the affiliate code, and section on/off switches).
   The live site reads those tags; this file only powers the editor UI.

   Each group may set `page` (default "index.html"); fields without a visible
   default can carry `def`. To add a field: add an entry here + tag the element with
   the same key. `npm run check:content` verifies the two stay in sync across pages.

   multiline:true → textarea.  type:"image" → uploader.  type:"toggle" → on/off switch.
   NOTE: editing a field that contains bold/italic/a link replaces it with plain text
   (textContent, never innerHTML) — intentional. Links wired with data-href-key keep working. */
window.CONTENT_FIELDS = [
  {
    group: "Navigation & header",
    fields: [
      { key: "brand.name", label: "Logo wordmark", hint: "The “The Plant PT” text by the logo (header & footer)" },
      { key: "nav.coaching", label: "Menu link · Coaching" },
      { key: "nav.pricing", label: "Menu link · Pricing" },
      { key: "nav.about", label: "Menu link · About" },
      { key: "nav.shop", label: "Menu link · Shop" },
      { key: "nav.mealprep", label: "Menu link · Meal prep" },
      { key: "nav.login", label: "Menu link · Client login" },
      { key: "nav.cta", label: "Menu button · Start today" },
      { key: "nav.menuIg", label: "Mobile menu · Instagram link" },
      { key: "nav.menuLoc", label: "Mobile menu · location" }
    ]
  },
  {
    group: "Hero (top of page)",
    fields: [
      { key: "hero.kicker", label: "Kicker line", hint: "Small line above the headline" },
      { key: "hero.title", label: "Headline", hint: "Plain text — the design's line break/italic is replaced when edited", multiline: true },
      { key: "hero.lead", label: "Intro paragraph", multiline: true },
      { key: "hero.cta1", label: "Primary button", hint: "e.g. Start training" },
      { key: "hero.cta2", label: "Secondary button", hint: "e.g. See how I coach" },
      { key: "hero.stat1.num", label: "Stat 1 · number", hint: "Counts up — use a number, e.g. 14" },
      { key: "hero.stat1.label", label: "Stat 1 · label" },
      { key: "hero.stat2.num", label: "Stat 2 · number" },
      { key: "hero.stat2.label", label: "Stat 2 · label" },
      { key: "hero.stat3.num", label: "Stat 3 · number" },
      { key: "hero.stat3.label", label: "Stat 3 · label" },
      { key: "hero.mediaTag", label: "Photo caption" },
      { key: "img.hero", label: "Hero photo", type: "image" }
    ]
  },
  {
    group: "Scrolling banner",
    fields: [
      { key: "marquee.1", label: "Phrase 1" },
      { key: "marquee.2", label: "Phrase 2" },
      { key: "marquee.3", label: "Phrase 3" },
      { key: "marquee.4", label: "Phrase 4" },
      { key: "marquee.5", label: "Phrase 5" },
      { key: "marquee.6", label: "Phrase 6" }
    ]
  },
  {
    group: "Philosophy",
    fields: [
      { key: "statement.kicker", label: "Eyebrow", hint: "e.g. “The philosophy”" },
      { key: "statement.title", label: "Big statement", multiline: true },
      { key: "statement.sub", label: "Paragraph", multiline: true }
    ]
  },
  {
    group: "Ways to train",
    fields: [
      { key: "eyebrow.coaching", label: "Eyebrow label" },
      { key: "coaching.title", label: "Section heading" },
      { key: "coaching.intro", label: "Intro paragraph", multiline: true },
      { key: "coaching.card1.title", label: "Card 1 · title" },
      { key: "coaching.card1.body", label: "Card 1 · text", multiline: true },
      { key: "coaching.card1.link", label: "Card 1 · link" },
      { key: "coaching.card2.title", label: "Card 2 · title" },
      { key: "coaching.card2.body", label: "Card 2 · text", multiline: true },
      { key: "coaching.card2.link", label: "Card 2 · link" },
      { key: "coaching.card3.title", label: "Card 3 · title" },
      { key: "coaching.card3.body", label: "Card 3 · text", multiline: true },
      { key: "coaching.card3.link", label: "Card 3 · link" },
      { key: "coaching.card4.title", label: "Card 4 · title" },
      { key: "coaching.card4.body", label: "Card 4 · text", multiline: true },
      { key: "coaching.card4.link", label: "Card 4 · link" },
      { key: "coaching.card5.title", label: "Card 5 · title" },
      { key: "coaching.card5.body", label: "Card 5 · text", multiline: true },
      { key: "coaching.card5.link", label: "Card 5 · link" },
      { key: "coaching.card6.title", label: "Card 6 · title" },
      { key: "coaching.card6.body", label: "Card 6 · text", multiline: true },
      { key: "coaching.card6.link", label: "Card 6 · link" }
    ]
  },
  {
    group: "Pricing",
    fields: [
      { key: "eyebrow.pricing", label: "Eyebrow label" },
      { key: "pricing.title", label: "Section heading" },
      { key: "pricing.intro", label: "Intro paragraph", multiline: true },
      { key: "price.group.name", label: "Plan 1 · name" },
      { key: "price.group.amount", label: "Plan 1 · price", hint: "e.g. £12" },
      { key: "price.group.unit", label: "Plan 1 · unit", hint: "e.g. / class" },
      { key: "price.group.feat1", label: "Plan 1 · line 1" },
      { key: "price.group.feat2", label: "Plan 1 · line 2" },
      { key: "price.group.feat3", label: "Plan 1 · line 3" },
      { key: "price.group.btn", label: "Plan 1 · button" },
      { key: "price.online.name", label: "Plan 2 · name" },
      { key: "price.online.amount", label: "Plan 2 · price", hint: "e.g. £55" },
      { key: "price.online.unit", label: "Plan 2 · unit", hint: "e.g. / month" },
      { key: "price.online.badge", label: "Plan 2 · badge", hint: "e.g. Most popular" },
      { key: "price.online.feat1", label: "Plan 2 · line 1" },
      { key: "price.online.feat2", label: "Plan 2 · line 2" },
      { key: "price.online.feat3", label: "Plan 2 · line 3" },
      { key: "price.online.feat4", label: "Plan 2 · line 4" },
      { key: "price.online.btn", label: "Plan 2 · button" },
      { key: "price.pt.name", label: "Plan 3 · name" },
      { key: "price.pt.amount", label: "Plan 3 · price", hint: "e.g. £160" },
      { key: "price.pt.unit", label: "Plan 3 · unit", hint: "e.g. / 4 sessions" },
      { key: "price.pt.feat1", label: "Plan 3 · line 1" },
      { key: "price.pt.feat2", label: "Plan 3 · line 2" },
      { key: "price.pt.feat3", label: "Plan 3 · line 3" },
      { key: "price.pt.btn", label: "Plan 3 · button" },
      { key: "pricing.note", label: "Note under the cards", multiline: true }
    ]
  },
  {
    group: "About Joe",
    fields: [
      { key: "eyebrow.about", label: "Eyebrow label" },
      { key: "about.title", label: "Section heading" },
      { key: "about.body1", label: "Paragraph 1", multiline: true },
      { key: "about.body2", label: "Paragraph 2", multiline: true },
      { key: "about.point1", label: "Bullet 1" },
      { key: "about.point2", label: "Bullet 2" },
      { key: "about.point3", label: "Bullet 3" },
      { key: "about.point4", label: "Bullet 4" },
      { key: "about.btn", label: "Button" },
      { key: "about.mediaTag", label: "Photo caption" },
      { key: "about.badge1", label: "Badge · top line" },
      { key: "about.badge2", label: "Badge · bottom line" },
      { key: "img.about", label: "Photo of Joe", type: "image" }
    ]
  },
  {
    group: "Testimonials (hidden until switched on)",
    fields: [
      { key: "show.testimonials", label: "Show this section on the site", type: "toggle", hint: "Off by default — turn on once you've added real reviews" },
      { key: "eyebrow.results", label: "Eyebrow label" },
      { key: "testimonials.title", label: "Section heading" },
      { key: "testimonials.intro", label: "Intro paragraph", multiline: true },
      { key: "testimonials.q1.text", label: "Quote 1 · text", multiline: true },
      { key: "testimonials.q1.name", label: "Quote 1 · name" },
      { key: "testimonials.q1.meta", label: "Quote 1 · detail" },
      { key: "testimonials.q2.text", label: "Quote 2 · text", multiline: true },
      { key: "testimonials.q2.name", label: "Quote 2 · name" },
      { key: "testimonials.q2.meta", label: "Quote 2 · detail" },
      { key: "testimonials.q3.text", label: "Quote 3 · text", multiline: true },
      { key: "testimonials.q3.name", label: "Quote 3 · name" },
      { key: "testimonials.q3.meta", label: "Quote 3 · detail" }
    ]
  },
  {
    group: "Transformations (hidden until switched on)",
    fields: [
      { key: "show.transformations", label: "Show this section on the site", type: "toggle", hint: "Off by default — turn on once you've added before/after photos" },
      { key: "eyebrow.transformations", label: "Eyebrow label" },
      { key: "transformations.title", label: "Section heading" },
      { key: "transformations.intro", label: "Intro paragraph", multiline: true },
      { key: "transformations.before", label: "“Before” label (all cards)" },
      { key: "transformations.after", label: "“After” label (all cards)" },
      { key: "img.transform.c1.before", label: "Card 1 · before photo", type: "image" },
      { key: "img.transform.c1.after", label: "Card 1 · after photo", type: "image" },
      { key: "transformations.c1.name", label: "Card 1 · name" },
      { key: "transformations.c1.stat", label: "Card 1 · result" },
      { key: "img.transform.c2.before", label: "Card 2 · before photo", type: "image" },
      { key: "img.transform.c2.after", label: "Card 2 · after photo", type: "image" },
      { key: "transformations.c2.name", label: "Card 2 · name" },
      { key: "transformations.c2.stat", label: "Card 2 · result" },
      { key: "img.transform.c3.before", label: "Card 3 · before photo", type: "image" },
      { key: "img.transform.c3.after", label: "Card 3 · after photo", type: "image" },
      { key: "transformations.c3.name", label: "Card 3 · name" },
      { key: "transformations.c3.stat", label: "Card 3 · result" }
    ]
  },
  {
    group: "Try it free (lead magnet)",
    fields: [
      { key: "eyebrow.leadmagnet", label: "Eyebrow label" },
      { key: "leadmagnet.title", label: "Heading" },
      { key: "leadmagnet.body", label: "Paragraph", multiline: true },
      { key: "leadmagnet.btn", label: "Button" },
      { key: "leadmagnet.consent", label: "Consent checkbox text", multiline: true },
      { key: "leadmagnet.note", label: "Reassurance line" },
      { key: "leadmagnet.cover", label: "Cover badge", hint: "The “First class free” card" }
    ]
  },
  {
    group: "Gallery",
    fields: [
      { key: "eyebrow.gallery", label: "Eyebrow label" },
      { key: "gallery.title", label: "Section heading" },
      { key: "gallery.intro", label: "Intro paragraph", multiline: true },
      { key: "gallery.cap1", label: "Caption 1" },
      { key: "gallery.cap3", label: "Caption 2" },
      { key: "gallery.cap4", label: "Caption 3" },
      { key: "gallery.cap5", label: "Caption 4" },
      { key: "gallery.cap2", label: "Caption 5" },
      { key: "gallery.cap6", label: "Caption 6" }
    ]
  },
  {
    group: "The Plant Games",
    fields: [
      { key: "eyebrow.plantgames", label: "Eyebrow label" },
      { key: "plantgames.title", label: "Event name" },
      { key: "plantgames.ver", label: "Version badge", hint: "e.g. 3.0" },
      { key: "plantgames.lead", label: "Intro paragraph", multiline: true },
      { key: "plantgames.btn1", label: "Primary button" },
      { key: "plantgames.btn2", label: "Secondary button" },
      { key: "plantgames.whereLabel", label: "Meta 1 · label" },
      { key: "plantgames.where", label: "Meta 1 · value" },
      { key: "plantgames.whoLabel", label: "Meta 2 · label" },
      { key: "plantgames.who", label: "Meta 2 · value" },
      { key: "plantgames.bookingLabel", label: "Meta 3 · label" },
      { key: "plantgames.booking", label: "Meta 3 · value" }
    ]
  },
  {
    group: "Shop",
    fields: [
      { key: "eyebrow.shop", label: "Eyebrow label" },
      { key: "shop.title", label: "Section heading" },
      { key: "shop.intro", label: "Intro paragraph", multiline: true },
      { key: "shop.tag1", label: "Tile 1 · image tag" },
      { key: "shop.item1", label: "Tile 1 · label" },
      { key: "shop.merchCta", label: "Tile 1 · link" },
      { key: "shop.tag2", label: "Tile 2 · image tag" },
      { key: "shop.item2", label: "Tile 2 · label" },
      { key: "shop.merchCta2", label: "Tile 2 · link" },
      { key: "shop.item3", label: "Tile 3 · label" },
      { key: "shop.merchCta3", label: "Tile 3 · link" },
      { key: "shop.btn", label: "Button" },
      { key: "img.merch1", label: "Tile 1 image", type: "image" },
      { key: "img.merch2", label: "Tile 2 image", type: "image" }
    ]
  },
  {
    group: "Meal prep",
    fields: [
      { key: "eyebrow.mealprep", label: "Eyebrow label" },
      { key: "mealprep.title", label: "Section heading" },
      { key: "mealprep.intro", label: "Intro paragraph", multiline: true },
      { key: "mealprep.point1", label: "Bullet 1" },
      { key: "mealprep.point2", label: "Bullet 2" },
      { key: "mealprep.point3", label: "Bullet 3" },
      { key: "mealprep.menuBtn", label: "“See the full menu” button" },
      { key: "mealprep.diyText", label: "Cook-at-home · text" },
      { key: "mealprep.diyLink", label: "Cook-at-home · link" },
      { key: "mealprep.signupEyebrow", label: "Signup · eyebrow" },
      { key: "mealprep.signupTitle", label: "Signup · heading" },
      { key: "mealprep.signupSub", label: "Signup · subtext", multiline: true },
      { key: "mealprep.btn", label: "Signup · button" },
      { key: "mealprep.consent", label: "Signup · consent text", multiline: true },
      { key: "mealprep.note", label: "Signup · reassurance line" }
    ]
  },
  {
    group: "Recommended gear",
    fields: [
      { key: "eyebrow.gear", label: "Eyebrow label" },
      { key: "gear.title", label: "Section heading" },
      { key: "gear.intro", label: "Intro paragraph", multiline: true },
      { key: "gear.type", label: "Card · type tag" },
      { key: "gear.spartan.name", label: "Brand · name" },
      { key: "gear.spartan.body", label: "Brand · text", multiline: true },
      { key: "gear.spartan.codeLabel", label: "Brand · code label" },
      { key: "gear.code", label: "Discount code", hint: "Updates the code, the Copy button and the footer" },
      { key: "gear.shopLink", label: "Brand · shop link" },
      { key: "img.spartan", label: "Brand image", type: "image" }
    ]
  },
  {
    group: "FAQ",
    fields: [
      { key: "eyebrow.faq", label: "Eyebrow label" },
      { key: "faq.title", label: "Section heading" },
      { key: "faq.intro", label: "Intro paragraph", multiline: true },
      { key: "faq.q1", label: "Question 1" },
      { key: "faq.a1", label: "Answer 1", multiline: true },
      { key: "faq.q2", label: "Question 2" },
      { key: "faq.a2", label: "Answer 2", multiline: true },
      { key: "faq.q3", label: "Question 3" },
      { key: "faq.a3", label: "Answer 3", multiline: true },
      { key: "faq.q4", label: "Question 4" },
      { key: "faq.a4", label: "Answer 4", multiline: true },
      { key: "faq.q5", label: "Question 5" },
      { key: "faq.a5", label: "Answer 5", multiline: true }
    ]
  },
  {
    group: "Free consult",
    fields: [
      { key: "eyebrow.booking", label: "Eyebrow label" },
      { key: "booking.title", label: "Heading" },
      { key: "booking.body", label: "Paragraph", multiline: true },
      { key: "booking.btn", label: "Button" },
      { key: "booking.risk", label: "Reassurance line" }
    ]
  },
  {
    group: "Contact",
    fields: [
      { key: "eyebrow.contact", label: "Eyebrow label" },
      { key: "contact.title", label: "Section heading" },
      { key: "contact.intro", label: "Intro paragraph", multiline: true },
      { key: "contact.wa.head", label: "WhatsApp · label" },
      { key: "contact.wa.label", label: "WhatsApp · text" },
      { key: "contact.wa", label: "WhatsApp · number (link)", hint: "International, e.g. 447771400557", def: "447771400557" },
      { key: "contact.ig.head", label: "Instagram · label" },
      { key: "contact.ig", label: "Instagram · handle", hint: "Shown as text and used for every Instagram link" },
      { key: "contact.email.head", label: "Email · label" },
      { key: "contact.email", label: "Email · address", hint: "Shown and used for the mailto link" },
      { key: "contact.phone.head", label: "Phone · label" },
      { key: "contact.phone", label: "Phone · number", hint: "Shown and used for the call link" }
    ]
  },
  {
    group: "Enquiry form",
    fields: [
      { key: "form.name", label: "“Your name” label" },
      { key: "form.email", label: "“Email” label" },
      { key: "form.phone", label: "“Phone” label" },
      { key: "form.optional", label: "“(optional)” tag" },
      { key: "form.choose", label: "Dropdown placeholder", hint: "e.g. Choose one…" },
      { key: "form.goalLabel", label: "“Main goal” label" },
      { key: "form.goal1", label: "Goal option 1" },
      { key: "form.goal2", label: "Goal option 2" },
      { key: "form.goal3", label: "Goal option 3" },
      { key: "form.goal4", label: "Goal option 4" },
      { key: "form.goal5", label: "Goal option 5" },
      { key: "form.modeLabel", label: "“Train how?” label" },
      { key: "form.mode1", label: "Train option 1" },
      { key: "form.mode2", label: "Train option 2" },
      { key: "form.mode3", label: "Train option 3" },
      { key: "form.message", label: "“Anything else?” label" },
      { key: "form.consent", label: "Consent checkbox text", multiline: true },
      { key: "form.submit", label: "Send button" },
      { key: "form.note", label: "Reassurance line" },
      { key: "form.legal", label: "Privacy link text", hint: "Appears under all three forms" }
    ]
  },
  {
    group: "Footer",
    fields: [
      { key: "footer.tagline", label: "Tagline", multiline: true },
      { key: "footer.codeBrand", label: "Discount · brand name" },
      { key: "footer.credit", label: "Design credit", multiline: true },
      { key: "footer.exploreHead", label: "Column 1 · heading" },
      { key: "footer.exp1", label: "Column 1 · link 1" },
      { key: "footer.exp2", label: "Column 1 · link 2" },
      { key: "footer.exp3", label: "Column 1 · link 3" },
      { key: "footer.exp4", label: "Column 1 · link 4" },
      { key: "footer.exp5", label: "Column 1 · link 5" },
      { key: "footer.exp6", label: "Column 1 · link 6" },
      { key: "footer.connectHead", label: "Column 2 · heading" },
      { key: "footer.con1", label: "Column 2 · link 1" },
      { key: "footer.con2", label: "Column 2 · link 2" },
      { key: "footer.con3", label: "Column 2 · link 3" },
      { key: "footer.con4", label: "Column 2 · link 4" },
      { key: "footer.con5", label: "Column 2 · link 5" },
      { key: "footer.copyright", label: "Copyright line" },
      { key: "footer.privacy", label: "Privacy link" },
      { key: "footer.location", label: "Location line" }
    ]
  },
  {
    group: "Sticky button (mobile)",
    fields: [
      { key: "sticky.cta", label: "Floating button" }
    ]
  },

  /* ===================== The Plant Prep menu page ===================== */
  {
    group: "Plant Prep — page header",
    page: "the-plant-prep.html",
    fields: [
      { key: "prep.heroEyebrow", label: "Eyebrow label" },
      { key: "prep.title", label: "Headline", hint: "Plain text — the design's line break/italic is replaced when edited", multiline: true },
      { key: "prep.sub", label: "Intro paragraph", multiline: true },
      { key: "prep.legend", label: "Macro legend line", hint: "The VG / V key under the intro" }
    ]
  },
  {
    group: "Plant Prep — breakfast",
    page: "the-plant-prep.html",
    fields: [
      { key: "prep.breakfastHead", label: "Section heading", hint: "e.g. Breakfast" },
      { key: "prep.breakfastCount", label: "Section count", hint: "e.g. 5 dishes" },
      { key: "prep.b1.name", label: "Dish 1 · name" },
      { key: "prep.b1.tag", label: "Dish 1 · diet tag", hint: "e.g. Vegan / Chicken / Veggie" },
      { key: "prep.b1.macros", label: "Dish 1 · macros line" },
      { key: "prep.b1.desc", label: "Dish 1 · description", multiline: true },
      { key: "prep.b1.price", label: "Dish 1 · price", hint: "e.g. £3.95 or Price TBC" },
      { key: "prep.b2.name", label: "Dish 2 · name" },
      { key: "prep.b2.tag", label: "Dish 2 · diet tag" },
      { key: "prep.b2.macros", label: "Dish 2 · macros line" },
      { key: "prep.b2.desc", label: "Dish 2 · description", multiline: true },
      { key: "prep.b2.price", label: "Dish 2 · price" },
      { key: "prep.b3.name", label: "Dish 3 · name" },
      { key: "prep.b3.tag", label: "Dish 3 · diet tag" },
      { key: "prep.b3.macros", label: "Dish 3 · macros line" },
      { key: "prep.b3.desc", label: "Dish 3 · description", multiline: true },
      { key: "prep.b3.price", label: "Dish 3 · price" },
      { key: "prep.b4.name", label: "Dish 4 · name" },
      { key: "prep.b4.tag", label: "Dish 4 · diet tag" },
      { key: "prep.b4.macros", label: "Dish 4 · macros line" },
      { key: "prep.b4.desc", label: "Dish 4 · description", multiline: true },
      { key: "prep.b4.price", label: "Dish 4 · price" },
      { key: "prep.b5.name", label: "Dish 5 · name" },
      { key: "prep.b5.tag", label: "Dish 5 · diet tag" },
      { key: "prep.b5.macros", label: "Dish 5 · macros line" },
      { key: "prep.b5.desc", label: "Dish 5 · description", multiline: true },
      { key: "prep.b5.price", label: "Dish 5 · price" }
    ]
  },
  {
    group: "Plant Prep — dinner",
    page: "the-plant-prep.html",
    fields: [
      { key: "prep.dinnerHead", label: "Section heading", hint: "e.g. Dinner" },
      { key: "prep.dinnerCount", label: "Section count", hint: "e.g. 5 dishes" },
      { key: "prep.d1.name", label: "Dish 1 · name" },
      { key: "prep.d1.tag", label: "Dish 1 · diet tag", hint: "e.g. Vegan / Chicken / Veggie" },
      { key: "prep.d1.macros", label: "Dish 1 · macros line" },
      { key: "prep.d1.desc", label: "Dish 1 · description", multiline: true },
      { key: "prep.d1.price", label: "Dish 1 · price", hint: "e.g. £6.50 or Price TBC" },
      { key: "prep.d2.name", label: "Dish 2 · name" },
      { key: "prep.d2.tag", label: "Dish 2 · diet tag" },
      { key: "prep.d2.macros", label: "Dish 2 · macros line" },
      { key: "prep.d2.desc", label: "Dish 2 · description", multiline: true },
      { key: "prep.d2.price", label: "Dish 2 · price" },
      { key: "prep.d3.name", label: "Dish 3 · name" },
      { key: "prep.d3.tag", label: "Dish 3 · diet tag" },
      { key: "prep.d3.macros", label: "Dish 3 · macros line" },
      { key: "prep.d3.desc", label: "Dish 3 · description", multiline: true },
      { key: "prep.d3.price", label: "Dish 3 · price" },
      { key: "prep.d4.name", label: "Dish 4 · name" },
      { key: "prep.d4.tag", label: "Dish 4 · diet tag" },
      { key: "prep.d4.macros", label: "Dish 4 · macros line" },
      { key: "prep.d4.desc", label: "Dish 4 · description", multiline: true },
      { key: "prep.d4.price", label: "Dish 4 · price" },
      { key: "prep.d5.name", label: "Dish 5 · name" },
      { key: "prep.d5.tag", label: "Dish 5 · diet tag" },
      { key: "prep.d5.macros", label: "Dish 5 · macros line" },
      { key: "prep.d5.desc", label: "Dish 5 · description", multiline: true },
      { key: "prep.d5.price", label: "Dish 5 · price" }
    ]
  },
  {
    group: "Plant Prep — make it yourself",
    page: "the-plant-prep.html",
    fields: [
      { key: "prep.diyEyebrow", label: "Eyebrow label" },
      { key: "prep.diyTitle", label: "Heading" },
      { key: "prep.diySub", label: "Paragraph", multiline: true },
      { key: "prep.diyBtn", label: "Button", hint: "Arrow is kept automatically" }
    ]
  },
  {
    group: "Plant Prep — join the list",
    page: "the-plant-prep.html",
    fields: [
      { key: "prep.joinEyebrow", label: "Eyebrow label" },
      { key: "prep.joinTitle", label: "Heading" },
      { key: "prep.joinBody", label: "Paragraph", multiline: true },
      { key: "prep.joinBtn", label: "Submit button" },
      { key: "prep.joinConsent", label: "Consent checkbox text", multiline: true },
      { key: "prep.joinNote", label: "Reassurance line" },
      { key: "prep.footer", label: "Footer line" }
    ]
  },

  /* ===================== Meal plans library page ===================== */
  {
    group: "Meal plans — header",
    page: "meal-plans/index.html",
    fields: [
      { key: "plans.brand", label: "Logo wordmark" },
      { key: "plans.brandSub", label: "Logo small line", hint: "e.g. Joe Wilson · Glasgow" },
      { key: "plans.title", label: "Headline" },
      { key: "plans.lead", label: "Intro paragraph", multiline: true }
    ]
  },
  {
    group: "Meal plans — plan cards",
    page: "meal-plans/index.html",
    fields: [
      { key: "plans.card1.title", label: "Plan 1 · title" },
      { key: "plans.card1.desc", label: "Plan 1 · description", multiline: true },
      { key: "plans.card2.title", label: "Plan 2 · title" },
      { key: "plans.card2.desc", label: "Plan 2 · description", multiline: true },
      { key: "plans.card3.title", label: "Plan 3 · title" },
      { key: "plans.card3.desc", label: "Plan 3 · description", multiline: true },
      { key: "plans.card4.title", label: "Plan 4 · title" },
      { key: "plans.card4.desc", label: "Plan 4 · description", multiline: true },
      { key: "plans.card5.title", label: "Plan 5 · title" },
      { key: "plans.card5.desc", label: "Plan 5 · description", multiline: true },
      { key: "plans.card6.title", label: "Plan 6 · title" },
      { key: "plans.card6.desc", label: "Plan 6 · description", multiline: true },
      { key: "plans.card7.title", label: "Plan 7 · title" },
      { key: "plans.card7.desc", label: "Plan 7 · description", multiline: true },
      { key: "plans.card8.title", label: "Plan 8 · title" },
      { key: "plans.card8.desc", label: "Plan 8 · description", multiline: true },
      { key: "plans.card9.title", label: "Plan 9 · title" },
      { key: "plans.card9.desc", label: "Plan 9 · description", multiline: true },
      { key: "plans.card10.title", label: "Plan 10 · title" },
      { key: "plans.card10.desc", label: "Plan 10 · description", multiline: true }
    ]
  },
  {
    group: "Meal plans — DIY guide",
    page: "meal-plans/index.html",
    fields: [
      { key: "plans.diyKicker", label: "Eyebrow label" },
      { key: "plans.diyTitle", label: "Heading" },
      { key: "plans.diyLead", label: "Intro paragraph", multiline: true },
      { key: "plans.step1.title", label: "Step 1 · title" },
      { key: "plans.step1.body", label: "Step 1 · text", multiline: true },
      { key: "plans.step2.title", label: "Step 2 · title" },
      { key: "plans.step2.body", label: "Step 2 · text", multiline: true },
      { key: "plans.step3.title", label: "Step 3 · title" },
      { key: "plans.step3.body", label: "Step 3 · text", multiline: true },
      { key: "plans.step4.title", label: "Step 4 · title" },
      { key: "plans.step4.body", label: "Step 4 · text", multiline: true },
      { key: "plans.step5.title", label: "Step 5 · title" },
      { key: "plans.step5.body", label: "Step 5 · text", multiline: true },
      { key: "plans.step6.title", label: "Step 6 · title" },
      { key: "plans.step6.body", label: "Step 6 · text", multiline: true },
      { key: "plans.diyCta", label: "Closing call-to-action", hint: "The link to have Joe build a plan is kept", multiline: true },
      { key: "plans.footer", label: "Footer line", multiline: true }
    ]
  }
];
