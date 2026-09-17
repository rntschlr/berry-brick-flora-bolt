# Contributing to Magdolna

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
npm run dev          # http://0.0.0.0:8080
# or after build:cf
npm run preview      # http://127.0.0.1:8081
```

## Pull requests

- Keep the GitHub repo slug (`berry-brick-flora-bolt`); brand the product as **Magdolna**.
- Do not commit secrets, Cloudflare tokens, or `.grok/app-env.json`.
- Prefer focused diffs: hygiene, domain logic, docs/screenshots — not cosmetic churn.
