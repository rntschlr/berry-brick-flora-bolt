# Contributing to Tinta

## Prerequisites

- [nvm](https://github.com/nvm-sh/nvm) (or equivalent)
- Node **22** (see `.nvmrc`)
- npm 9+

```bash
nvm install
nvm use
```

## Setup

```bash
git clone https://github.com/rntschlr/berry-brick-flora-bolt.git
cd berry-brick-flora-bolt
npm ci
```

Auth stays **off** when `.grok/app-env.json` is missing (normal public checkout). See `.env.example`.

## Checks

```bash
npm run typecheck
npm run lint
npm test
NITRO_PRESET=cloudflare-pages npm run build:cf
```

Local UI:

```bash
npm run dev
# or after build:cf
npm run preview
```

## Pull requests

- Keep the GitHub repo slug (`berry-brick-flora-bolt`); brand the product as **Tinta**.
- Do not commit secrets, Cloudflare tokens, or `.grok/app-env.json`.
- Prefer focused diffs: hygiene, domain logic, docs/screenshots — not cosmetic churn.
- Hungarian name-day lists in `src/data/namedays.ts` keep real given names. That is not the product name.
