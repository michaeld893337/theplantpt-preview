/* The catalogue of editable site text, grouped for the admin form.
   This is the ONE place that defines a field's label/group; the matching
   element in index.html carries the same data-key. The live site reads the
   data-key tags, this file only powers the editor UI.

   To add a field: add an entry here + tag the element with the same data-key.
   `npm run check:content` (scripts/check-content.mjs) verifies the two stay in sync.

   multiline:true → renders a textarea (for sentences/paragraphs).
   NOTE: editing a field that has bold/italic/links in the design replaces it
   with plain text — that's intentional (textContent, never innerHTML). */
window.CONTENT_FIELDS = [
  {
    group: "Hero (top of page)",
    fields: [
      { key: "hero.kicker", label: "Kicker line", hint: "Small line above the headline" },
      { key: "hero.title", label: "Headline", hint: "Plain text — the design's line break/italic is replaced when edited", multiline: true },
      { key: "hero.lead", label: "Intro paragraph", multiline: true },
      { key: "img.hero", label: "Hero photo", type: "image" }
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
      { key: "coaching.title", label: "Section heading" },
      { key: "coaching.intro", label: "Intro paragraph", multiline: true },
      { key: "coaching.card1.title", label: "Card 1 · title" },
      { key: "coaching.card1.body", label: "Card 1 · text", multiline: true },
      { key: "coaching.card2.title", label: "Card 2 · title" },
      { key: "coaching.card2.body", label: "Card 2 · text", multiline: true },
      { key: "coaching.card3.title", label: "Card 3 · title" },
      { key: "coaching.card3.body", label: "Card 3 · text", multiline: true },
      { key: "coaching.card4.title", label: "Card 4 · title" },
      { key: "coaching.card4.body", label: "Card 4 · text", multiline: true },
      { key: "coaching.card5.title", label: "Card 5 · title" },
      { key: "coaching.card5.body", label: "Card 5 · text", multiline: true },
      { key: "coaching.card6.title", label: "Card 6 · title" },
      { key: "coaching.card6.body", label: "Card 6 · text", multiline: true }
    ]
  },
  {
    group: "Pricing",
    fields: [
      { key: "pricing.title", label: "Section heading" },
      { key: "pricing.intro", label: "Intro paragraph", multiline: true },
      { key: "price.group.name", label: "Plan 1 · name" },
      { key: "price.group.amount", label: "Plan 1 · price", hint: "e.g. £12" },
      { key: "price.group.feat1", label: "Plan 1 · line 1" },
      { key: "price.group.feat2", label: "Plan 1 · line 2" },
      { key: "price.group.feat3", label: "Plan 1 · line 3" },
      { key: "price.online.name", label: "Plan 2 · name" },
      { key: "price.online.amount", label: "Plan 2 · price", hint: "e.g. £55" },
      { key: "price.online.feat1", label: "Plan 2 · line 1" },
      { key: "price.online.feat2", label: "Plan 2 · line 2" },
      { key: "price.online.feat3", label: "Plan 2 · line 3" },
      { key: "price.online.feat4", label: "Plan 2 · line 4" },
      { key: "price.pt.name", label: "Plan 3 · name" },
      { key: "price.pt.amount", label: "Plan 3 · price", hint: "e.g. £160" },
      { key: "price.pt.feat1", label: "Plan 3 · line 1" },
      { key: "price.pt.feat2", label: "Plan 3 · line 2" },
      { key: "price.pt.feat3", label: "Plan 3 · line 3" }
    ]
  },
  {
    group: "About Joe",
    fields: [
      { key: "about.title", label: "Section heading" },
      { key: "about.body1", label: "Paragraph 1", multiline: true },
      { key: "about.body2", label: "Paragraph 2", multiline: true },
      { key: "about.point1", label: "Bullet 1" },
      { key: "about.point2", label: "Bullet 2" },
      { key: "about.point3", label: "Bullet 3" },
      { key: "about.point4", label: "Bullet 4" },
      { key: "img.about", label: "Photo of Joe", type: "image" }
    ]
  },
  {
    group: "Gallery",
    fields: [
      { key: "gallery.title", label: "Section heading" },
      { key: "gallery.intro", label: "Intro paragraph", multiline: true },
      { key: "gallery.cap1", label: "Caption 1" },
      { key: "gallery.cap2", label: "Caption 2" }
    ]
  },
  {
    group: "The Plant Games",
    fields: [
      { key: "plantgames.title", label: "Event name" },
      { key: "plantgames.ver", label: "Version badge", hint: "e.g. 3.0" },
      { key: "plantgames.lead", label: "Intro paragraph", multiline: true },
      { key: "plantgames.where", label: "Where" },
      { key: "plantgames.who", label: "Who" },
      { key: "plantgames.booking", label: "Booking" }
    ]
  },
  {
    group: "Shop",
    fields: [
      { key: "shop.title", label: "Section heading" },
      { key: "shop.intro", label: "Intro paragraph", multiline: true },
      { key: "shop.item1", label: "Tile 1 · label" },
      { key: "shop.item2", label: "Tile 2 · label" },
      { key: "shop.item3", label: "Tile 3 · label" },
      { key: "img.merch1", label: "Tile 1 image", type: "image" },
      { key: "img.merch2", label: "Tile 2 image", type: "image" }
    ]
  },
  {
    group: "Meal prep",
    fields: [
      { key: "mealprep.title", label: "Section heading" },
      { key: "mealprep.intro", label: "Intro paragraph", multiline: true },
      { key: "mealprep.point1", label: "Bullet 1" },
      { key: "mealprep.point2", label: "Bullet 2" },
      { key: "mealprep.point3", label: "Bullet 3" },
      { key: "mealprep.signupTitle", label: "Signup · heading" },
      { key: "mealprep.signupSub", label: "Signup · subtext", multiline: true }
    ]
  },
  {
    group: "Recommended gear",
    fields: [
      { key: "gear.title", label: "Section heading" },
      { key: "gear.intro", label: "Intro paragraph", multiline: true },
      { key: "gear.spartan.name", label: "Brand · name" },
      { key: "gear.spartan.body", label: "Brand · text", multiline: true },
      { key: "gear.spartan.codeLabel", label: "Brand · code label" },
      { key: "img.spartan", label: "Brand image", type: "image" }
    ]
  },
  {
    group: "FAQ",
    fields: [
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
      { key: "booking.title", label: "Heading" },
      { key: "booking.body", label: "Paragraph", multiline: true },
      { key: "booking.risk", label: "Reassurance line" }
    ]
  },
  {
    group: "Contact",
    fields: [
      { key: "contact.title", label: "Section heading" },
      { key: "contact.intro", label: "Intro paragraph", multiline: true }
    ]
  },
  {
    group: "Footer",
    fields: [
      { key: "footer.tagline", label: "Tagline", multiline: true }
    ]
  }
];
