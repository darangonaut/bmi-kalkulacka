# BMI Kalkulačka

A clean, single-file BMI calculator with a visual gauge and a body-fat estimate. Live, reactive (no "calculate" button), installable as a PWA. UI in Czech.

**Live:** [bmi.markuska.cz](https://bmi.markuska.cz)

## Features

- **Live BMI** from height (cm) + weight (kg) — updates as you type
- **Visual gauge** — an animated marker on a colour-coded 15–40 scale shows exactly where you land
- **Category** (Podváha / Ideální / Mírná nadváha / Obezita / Těžká obezita) with the category colour as the only accent
- **Healthy weight range** for your height (BMI 18.5–25)
- **Body-fat estimate** — optional sex + age inputs feed the **Deurenberg formula** (`%fat = 1.2·BMI + 0.23·age − 10.8·sex − 5.4`), with sex-specific ACE categories
- **Caveat for muscular people** — BMI can't tell muscle from fat, so it overestimates for bodybuilders / strength athletes; body-fat % or waist is more telling
- **PWA** — installable, works offline
- No backend, no build step

## Stack

Single `index.html` — **Vue 3** + **Tailwind** (both via CDN), Space Grotesk, plain CSS for the gauge. Light Minimal aesthetic (monochrome + category accent), matching the rest of the markuska.cz apps.

## File structure

- `index.html` — the whole app (markup, Vue logic, styles)
- `manifest.json`, `sw.js` — PWA manifest + service worker
- `favicon.svg`, `favicon-16/32.png`, `apple-touch-icon.png`, `icon-192/512.png` — icon set (gauge motif)
- `bin/generate-favicons.php` — regenerates the PNG icons from the gauge motif (PHP GD, no external tooling)

## Development

```bash
git clone https://github.com/darangonaut/bmi-kalkulacka.git
cd bmi-kalkulacka
python3 -m http.server 8765   # then open http://localhost:8765
```
Edit `index.html` directly — no build, no dependencies to install.

## Deploy

Static deploy on the Oracle VM (git clone into `/var/www/bmi/public`, nginx vhost, certbot). Update = `git pull` on the server. See `~/vyvoj/DEPLOY.md` section A.

## Note

BMI and the body-fat figure are **orientational estimates**, not a medical diagnosis.

## License

MIT
