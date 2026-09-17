# Magdolna

**Hungarian field notes for English speakers** — grammar, cases, verbs, and the words you will actually use.

[![Cloudflare Pages](https://github.com/rntschlr/berry-brick-flora-bolt/actions/workflows/cloudflare.yml/badge.svg)](https://github.com/rntschlr/berry-brick-flora-bolt/actions/workflows/cloudflare.yml)

<p align="center">
  <img src="public/og.jpg" alt="Magdolna — Hungarian field notes" width="720" />
</p>

Standalone Cloudflare Pages project **`magdolna`**. The GitHub repo slug (`berry-brick-flora-bolt`) is the scaffold export name; the product is Magdolna.

## Screenshots

### Desk

![Magdolna home desk](docs/screenshots/home.png)

### Noun cases

![Noun cases overview](docs/screenshots/cases.png)

### Verbs

![Verb conjugations](docs/screenshots/verbs.png)

### Practice drill

![Practice quiz](docs/screenshots/practice.png)

## Features

- **Desk** — today’s névnap, local progress, and a map of the grammar notebook
- **Alphabet & vowel harmony** — the traps English speakers hit first, plus a live harmony bench
- **Eighteen noun cases** — interiors / surfaces / vicinity triads and the rest of the map
- **Verbs** — indefinite vs definite, coverbs, and a conjugator workbench
- **Practice** — short drills; best score stays on this device
- **Search** — ⌘K across cases, verbs, phrases, and basics
- **No account required** for the public notebook; progress is local-only

## Stack

- React 19 + TanStack Router / Start
- Tailwind CSS 4
- Vite 8 + Nitro (Cloudflare Pages preset)
- Zustand (on-device progress)
- Playwright (devDependency) for UI capture

## Local development

```bash
nvm install   # Node 22 — see .nvmrc
nvm use
npm ci
npm run dev   # http://0.0.0.0:8080
```

Checks:

```bash
npm run typecheck
npm run lint
npm test
NITRO_PRESET=cloudflare-pages npm run build:cf
```

Auth stays **off** when `.grok/app-env.json` is missing (normal public checkout). See [`.env.example`](.env.example) and [CONTRIBUTING.md](CONTRIBUTING.md).

## Cloudflare deploy

GitHub Actions workflow [`.github/workflows/cloudflare.yml`](.github/workflows/cloudflare.yml):

1. `npm ci` → typecheck → lint → `build:cf` with auth/chrome off
2. Deploys to Pages project **`magdolna`** when secrets are present
3. Soft-skips deploy (build still runs) if `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` are missing

After the first deploy, attach your own domain in the Cloudflare dashboard (Workers & Pages → magdolna → Custom domains).

## Privacy & security

- Progress is stored on-device only — see [Privacy](./src/routes/privacy.tsx) in the app
- Vulnerability reports: [SECURITY.md](SECURITY.md)

## License

Private / personal project unless otherwise noted by the owner.
