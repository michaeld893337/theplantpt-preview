# 📸 Photos — how to swap Joe's real images in

Right now every image on the site is an **on-brand gradient placeholder**, so the site
looks finished and nothing is ever a broken image. Swapping in Joe's real photos is a
**one-line change per photo** — no HTML editing, no hunting around.

## Where the photos are controlled

All image "slots" live in **one block** at the top of `css/styles.css`, under the
heading `PHOTO SLOTS`. Each is a CSS variable.

## To use a real photo

1. Drop the photo into this `images/` folder (e.g. `hero.jpg`).
2. Open `css/styles.css`, find the matching variable, and replace the gradient value
   with a URL. Because the CSS file lives in `/css`, the path starts with `../images/`:

```css
/* before */
--img-hero: radial-gradient( …lots of gradient… );

/* after */
--img-hero: url('../images/hero.jpg');
```

That's it. Save, refresh.

## The slots & recommended sizes

| CSS variable     | Where it shows        | Suggested photo                          | Size (px)      |
|------------------|-----------------------|------------------------------------------|----------------|
| `--img-hero`     | Big hero image        | Joe training / boxing, portrait crop     | 1200 × 1500    |
| `--img-about`    | About section         | Joe portrait / coaching a client         | 1200 × 1500    |
| `--img-merch-1`  | Shop card 1           | T-shirt product shot                     | 1200 × 900     |
| `--img-merch-2`  | Shop card 2           | Jumper product shot                      | 1200 × 900     |
| `--img-merch-3`  | Shop card 3           | Caps / accessories                       | 1200 × 900     |
| `--img-vivo`     | Vivobarefoot panel    | Shoes / feet / outdoor                   | 900 × 1100     |
| `--img-spartan`  | Spartan Protein panel | Protein / shaker / training fuel         | 900 × 1100     |

## One more: the social-share image

When someone shares the site on WhatsApp / Instagram / Facebook (and in your ads),
this is the preview image. Add a file named **`og-image.jpg`** here, sized **1200 × 630**.
It's already wired up in `index.html` (the `og:image` tag) and the Google structured data.

## Tips for fast, sharp photos
- Export as **JPG** or **WebP**, quality ~80%. Keep each file **under ~400 KB**.
- Square-ish / portrait photos suit the hero & about slots; landscape suits merch.
- Free optimiser: <https://squoosh.app> (drag a photo in, download a smaller version).
