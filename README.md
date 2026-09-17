# Tinta

**Hungarian field notes for English speakers.**

*Tinta* is Hungarian for **ink**. This is a public grammar notebook: the alphabet trap, vowel harmony, eighteen noun cases, two conjugations, and the phrases you actually say on the street. No account. Progress stays on the device that opened it.

[![Cloudflare Pages](https://github.com/rntschlr/berry-brick-flora-bolt/actions/workflows/cloudflare.yml/badge.svg)](https://github.com/rntschlr/berry-brick-flora-bolt/actions/workflows/cloudflare.yml)

**Live:** [tinta.pages.dev](https://tinta.pages.dev) (after the first Cloudflare deploy)

<p align="center">
  <img src="public/og.jpg" alt="Tinta — Hungarian field notes" width="720" />
</p>

The GitHub slug (`berry-brick-flora-bolt`) is the scaffold export name. The product is **Tinta**.

## What’s inside

| Sheet | What you get |
| --- | --- |
| Desk | Today’s névnap, a six-step path, local progress, and a map of the notebook |
| Alphabet | Forty letters, the *s / sz* trap, long vowels |
| Vowel harmony | Back, front, rounded — with a live bench |
| Noun cases | Interiors / surfaces / vicinity, then the rest of the eighteen |
| Verbs | Indefinite vs definite, coverbs, conjugator |
| Possession, pronouns, adjectives, word-building, syntax | The rest of the map |
| Basics & how to say | Numbers, time, colours, greetings, *szeretlek* |
| Workbenches | Type a noun or a verb and watch the endings |
| Drill | Full or topic drills, mistake review, and retry; full-drill best stays on this device |
| Search | ⌘K across cases, verbs, phrases, and basics |

## Screenshots

### Desk

![Tinta home desk](docs/screenshots/home.png)

### Noun cases

![Noun cases overview](docs/screenshots/cases.png)

### Verbs

![Verb conjugations](docs/screenshots/verbs.png)

### Practice drill

![Practice quiz](docs/screenshots/practice.png)

## Use it

- Open the **desk** and follow the numbered path, or jump with **⌘K**.
- Bookmark a sheet and find it under **Your bookmarked sheets** on the desk. Continue returns to your most recently visited sheet.
- Choose a topic in **Drill**, review explanations, and retry only your missed questions. Focused drills never overwrite your full-drill best score.
- Opened sheets and drill scores never leave this browser. If browser storage is unavailable, the notebook still works for the current session.
- On iPhone, Add to Home Screen — it opens like its own app.
- Privacy and support pages live at `/privacy` and `/support`.

## Stack

- React 19 + TanStack Router / Start
- Tailwind CSS 4
- Self-hosted Figtree + Fraunces (no Google Fonts request)
- Zustand (on-device progress)
- Vite 8 + Nitro (Cloudflare Pages or Vercel)
- Playwright (devDependency) for UI capture

## Local development

```bash
nvm install   # Node 22 — see .nvmrc
nvm use
npm ci
npm run dev
```

Checks:

```bash
npm run typecheck
npm run lint
npm test
NITRO_PRESET=cloudflare-pages npm run build:cf
```

Auth stays **off** when `.grok/app-env.json` is missing (normal public checkout). See [`.env.example`](.env.example) and [CONTRIBUTING.md](CONTRIBUTING.md).

## Go live today (Cloudflare Pages)

1. In the [repo secrets](https://github.com/rntschlr/berry-brick-flora-bolt/settings/secrets/actions) add:
   - `CLOUDFLARE_API_TOKEN` — a token with **Account / Cloudflare Pages / Edit**
   - `CLOUDFLARE_ACCOUNT_ID` — from the Cloudflare dashboard URL or Workers overview
2. Push to `main` (or run **Actions → Cloudflare Pages → Run workflow**).
3. The first successful deploy creates Pages project **`tinta`**.
4. Open **https://tinta.pages.dev**.
5. Optional: Cloudflare dashboard → Workers & Pages → `tinta` → **Custom domains**, then set `VITE_PUBLIC_SITE_URL` to that domain and redeploy.

Pull requests run typechecking, lint, unit tests, and a Cloudflare build without deploying. Deployments run only from `main`.

If a token is missing, the workflow still typechecks, lints, and builds — it just skips the upload.

## Privacy & security

- Progress is stored on-device only — see [Privacy](./src/routes/privacy.tsx)
- Vulnerability reports: [SECURITY.md](SECURITY.md)

Hungarian névnap lists in `src/data/namedays.ts` keep real given names. That is not the product name.

## License

Private / personal project unless otherwise noted by the owner.

### Test portability

Platform helper tests use isolated fixtures so the app's real branding and absent generator configuration cannot change expected results. Four checks for private generator prompt documents are reported as skipped when those documents are absent; runtime and application tests still run. `npm run check:auth` is a live dev-server comparison and needs a running local server.
