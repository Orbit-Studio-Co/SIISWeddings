# SIIS Weddings

Luxury wedding house website — Erbil, Kurdistan Region, Iraq.

Static site. No build step, no dependencies, no framework. Open `index.html` or deploy the folder as-is.

```
index.html      all sections, SEO meta, Open Graph, JSON-LD
styles.css      design system + components
script.js       content data, i18n (EN/KU/AR), all interactions
assets/         logo mark + favicon (SVG)
vercel.json     security headers + caching
robots.txt · sitemap.xml
```

## Local preview

```sh
python -m http.server 5599 --directory "SIIS Weddings"
# → http://localhost:5599
```

Use a server rather than opening the file directly — `localStorage` and the
Google Maps embed behave inconsistently over `file://`.

## Brand

Taken from the live Instagram profile [@siisweddings](https://www.instagram.com/siisweddings/):

- **Positioning** — "Luxury Wedding House · For couples who expect nothing less than extraordinary"
- **Services** — Wedding Films · Photography · Planning
- **Phone** — +964 750 510 0113 (all enquiry forms open WhatsApp on this number)

The logo is rebuilt as vector: an ivory disc, a chocolate ring, and the
palindrome `S I : I S` set in Cormorant Garamond in oxblood. It is inlined in
`index.html` (so it inherits the webfont) and also standalone in
`assets/logo-mark.svg`.

### Palette

| Token | Value | Use |
|---|---|---|
| Warm Ivory | `#F6EFE6` | logo disc, dark-surface text |
| Deep Chocolate | `#2A1A18` | footer, stats band, solid buttons |
| Luxury Gold | `#B08D57` | accents only — rules, hovers, eyebrows |
| Oxblood | `#5C1B23` | the logo wordmark and signature |

Oxblood is not in the original brief — it was sampled from the actual
Instagram logo and is used only for the mark and the signature flourish, so
the identity matches what clients already recognise.

## Content that still needs your input

These are placeholders. **Review before going live.**

- **Statistics** — 500+ weddings, 1000+ clients, 8+ years, 99% satisfaction.
  Supplied in the brief, but the Instagram account shows 16 posts and ~1,076
  followers, so please confirm these are defensible before publishing them.
  Edit in `index.html` (`data-count` attributes).
- **Testimonials** — four reviews with invented couple names and cities.
  Replace with real, permissioned quotes. `script.js` → `I18N.*.t1.q` etc.
- **Featured wedding stories** — three written narratives (Shaqlawa, Erbil,
  Rawanduz) with placeholder details. `script.js` → `I18N.*.st.*`
- **Studio hours** — Sat–Thu 10:00–20:00, Fri by appointment. Not supplied.
- **Address** — the map is centred on Erbil generally; no street address was
  given, so none is claimed. Add one to the map embed and the JSON-LD
  `PostalAddress` when you have it.
- **Facebook link** — points to facebook.com. Swap in the real page.
- **Domain** — `siisweddings.com` is assumed throughout (canonical, OG,
  sitemap, robots). Update if the domain differs.
- **Photography** — all imagery is royalty-free stock from Unsplash, curated
  to match the Instagram aesthetic. Replace with SIIS's own work; this is the
  single biggest upgrade available to the site.

## Editing content

Nearly all copy lives in one place: the `I18N` object in `script.js`, keyed
identically across `en`, `ku` (Kurdish Badini) and `ar` (Arabic). Change a
string in all three and it updates everywhere it appears.

Images are listed as Unsplash photo IDs in the data arrays at the top of
`script.js` (`PORTFOLIO`, `STORIES`, `GALLERY`, `CINEMA`, `INSTA`,
`TESTIMONIALS`). To use your own photography, drop files into `assets/` and
replace the `u(id, width)` helper calls with plain paths.

## Features

Navigation transitions transparent → frosted on scroll and hides on downward
scroll. Trilingual with automatic RTL for Kurdish and Arabic, including
mirrored icons and an Arabic serif pairing (Amiri + Noto Kufi Arabic). Dark
mode follows the system and persists. Hero runs a four-slide Ken Burns
crossfade. Portfolio filters by nine categories into a keyboard-accessible
lightbox with arrow-key and swipe navigation. Counters, scroll reveals, split
text, parallax and an animated process timeline. Gallery offers grid/masonry
toggle, a cinematic slider, and a drag-to-compare colour-grade slider.

Both enquiry forms validate inline, then compose a formatted message and open
WhatsApp — there is no backend, so nothing is stored and nothing can be lost.

### Accessibility

Skip link, visible focus rings, focus trapping in the modal and lightbox,
`aria-expanded`/`aria-selected` on all toggles, labelled form fields with
`aria-invalid` on error, and a full `prefers-reduced-motion` path that
disables the cursor, parallax, autoplay and every transition.

## Verified

Rendered in headless Chromium at 390 / 768 / 1024 / 1440 px: zero console
errors, zero failed requests, zero horizontal overflow at every breakpoint.
Lightbox, booking modal, dark mode and both RTL languages were driven and
asserted, not just eyeballed.

Every image URL was checked for HTTP 200 **and reviewed visually on a contact
sheet before selection** — which is how a conference auditorium, a Venice
postcard, a casual wine toast and a rustic gingham table got cut from the
first pass. Broken images degrade to an inline ivory SIIS placeholder rather
than a browser icon.

## Deploy

Static files only — no build step, no install, no environment variables.

**Cloudflare Pages (current target).** Connect the GitHub repo at
*Workers & Pages → Create → Pages → Connect to Git*, then:

| Setting | Value |
|---|---|
| Framework preset | None |
| Build command | *(leave empty)* |
| Build output directory | `/` |

`_headers` applies the security headers and caching. Every push to `main`
redeploys automatically.

Also works unchanged on Vercel (which reads `vercel.json` instead),
Netlify (reads `_headers`), or GitHub Pages (ignores both, so the security
headers are lost there).

### Custom domain

The site is canonicalised to `https://siisweddings.com` in four places:
`index.html` (canonical link, `og:url`, and two JSON-LD fields),
`sitemap.xml`, and `robots.txt`. **If the domain ever changes, update all
of them** or search engines will index against the wrong host.

To connect it on Cloudflare Pages:

1. *Pages project → Custom domains → Set up a domain* — add both
   `siisweddings.com` and `www.siisweddings.com`.
2. Cloudflare shows the exact DNS records to create. **Use the values it
   displays**, not values copied from a tutorial — hosting IPs change.
3. Turn on *SSL/TLS → Edge Certificates → Always Use HTTPS*.
4. Send `www` to the apex so there is one canonical host: *Rules →
   Redirect Rules → Create*, matching hostname `www.siisweddings.com`,
   redirecting to `https://siisweddings.com/${http.request.uri.path}`
   with a 301. (Pages `_redirects` handles paths, not hostnames, which is
   why this is a dashboard rule.)

DNS changes are usually live in minutes but can take up to 24 hours.

## Handover checklist

Ownership splits into three independent assets. The domain is the one that
matters — whoever holds it controls the business's address.

- [ ] **Domain** registered in **SIIS Weddings' own registrar account**,
      in their name, on their card. If it currently sits in an agency
      account, move it: same registrar → account "push" (instant);
      different registrar → unlock, share the EPP/auth code, they
      initiate. Note ICANN blocks registrar transfers within **60 days**
      of registration or a previous transfer.
- [ ] **Hosting account** created by the client, or transferred to them.
      Agency retains access as a collaborator if it is staying on for
      maintenance.
- [ ] **Repository** either transferred (*Settings → General → Danger
      Zone → Transfer ownership*, recipient must accept) or the client
      added under *Settings → Collaborators*. Agree which, in writing.
- [ ] Placeholder content above reviewed and replaced.
- [ ] Google Search Console verified on the live domain, `sitemap.xml`
      submitted.
