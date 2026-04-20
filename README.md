# skalvilege.dk

Marketing website for **Playdate** — a new app that helps Danish and international families in Denmark find playmates and coordinate playdates.

## Local development

```bash
python3 -m http.server 8789
```

Then visit <http://localhost:8789>.

## Site modes

The site runs in one of two modes, controlled by `site.config.js`:

| Mode | What it shows |
|------|---------------|
| `"prelaunch"` | Waitlist page with email signup + "coming soon" store badges |
| `"launched"` | Download page with real App Store / Google Play links |

Switch by editing `SITE_MODE` in `site.config.js` and committing.

Override via URL for testing:

```
http://localhost:8789/?mode=prelaunch
http://localhost:8789/?mode=launched
```

## i18n

Danish (default) + English, with browser auto-detect and a header toggle. Strings live in `js/i18n.js`. Add `data-i18n="key"`, `data-i18n-placeholder="key"` or `data-i18n-aria="key"` to elements to localise them.

## Appwrite

The waitlist form and contact form post to Appwrite. Until project IDs are filled into `site.config.js`, both gracefully fall back to a local "thanks" UI (contact form also opens the user's mail client).

## Deployment

Pushes to `main` auto-deploy to GitHub Pages via `.github/workflows/deploy.yml`.

Current public preview URL:

```
https://incubatordk.github.io/skalvilege.dk/
```

When the custom domain is moved, add a `CNAME` file containing `skalvilege.dk` and update canonical, sitemap, RSS and Open Graph URLs to `https://skalvilege.dk`.

## Structure

```
index.html              — Landing page (hero, features, how-it-works, testimonials, founders, CTA, footer)
css/styles.css          — Design tokens + layout
js/i18n.js              — Danish/English translations + language toggle
js/main.js              — Mode switching, signup, contact modal, scroll effects
site.config.js          — Site mode + Appwrite + store URLs
assets/                 — Logos, founder photos, profile images
privacy-policy/         — GDPR privacy policy (da + en)
terms.html              — Terms & Conditions
robots.txt, sitemap.xml — SEO basics
.nojekyll               — Skip Jekyll processing on GH Pages
```
