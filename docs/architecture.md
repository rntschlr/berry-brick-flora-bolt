# Architecture

Tinta is a public, server-rendered Hungarian grammar notebook. Its current product does not require accounts, a database, or an API for saving learner data.

## Runtime responsibilities

| Layer                              | Responsibility                                                        | Persistence                                        |
| ---------------------------------- | --------------------------------------------------------------------- | -------------------------------------------------- |
| React + TanStack Router            | Pages, navigation, search, workbenches, and quiz interactions         | None by itself                                     |
| Typed content and domain functions | Grammar references, examples, questions, and language rules           | Versioned in Git                                   |
| Zustand progress store             | Recently opened sheets, bookmarks, full-drill best, and attempt count | Browser `localStorage`, under `tinta-progress`     |
| TanStack Start + Nitro             | Server rendering and application delivery                             | No learner records                                 |
| Cloudflare Pages                   | Public hosting for the configured production build                    | Deployment assets; provider request logs may exist |

The server sends the notebook to the browser. Learning interactions run locally; progress is not uploaded. The storage adapter catches browser storage failures so the current session remains usable. Clearing site data removes saved progress. Another device, browser profile, or domain has a separate store.

## Source map

| Path                                 | Purpose                                                            |
| ------------------------------------ | ------------------------------------------------------------------ |
| `src/routes/`                        | Typed page routes, metadata, and page composition                  |
| `src/components/`                    | App shell, search, quiz panel, workbenches, and reusable UI        |
| `src/data/`                          | Hungarian learning content and navigation data                     |
| `src/lib/hungarian.ts`               | Language workbench rules                                           |
| `src/lib/quiz-session.ts`            | Answer summaries, mistake detection, and full-drill identification |
| `src/lib/progress.ts`                | Browser-local state and safe storage access                        |
| `src/lib/search-core.ts`             | Search indexing and matching logic                                 |
| `src/lib/brand.ts`, `src/lib/seo.ts` | Product identity and page metadata                                 |
| `server/`                            | Nitro response middleware and the `/health` liveness route         |
| `public/`                            | Icons, manifest, social artwork, and public static files           |
| `scripts/`                           | Build, preview, migration, and scaffold tooling                    |
| `.github/workflows/cloudflare.yml`   | Pull-request checks and credentialed deployment from `main`        |

## Public deployment boundary

The Cloudflare workflow sets `VITE_AUTH_ENABLED=false`, `VITE_PUBLIC_STANDALONE=true`, and `VITE_SHIP_GROK_CHROME=false`. Keep those values for the public notebook. `VITE_PUBLIC_SITE_URL` supplies the public origin for domain-dependent metadata and is build-time configuration, so changing it requires rebuilding.

`NITRO_PRESET=cloudflare-pages npm run build:cf` builds the Cloudflare application without invoking database migrations. The generic `npm run build` invokes `scripts/migrate.mjs` after building and is a different deployment path.

The full launch sequence, domain settings, and post-deployment checks are in [Deployment](deployment.md).

## Server behavior

`server/middleware/00-security.ts` applies response headers to server-rendered responses; `public/_headers` covers static assets. Keeping both is intentional because Cloudflare Pages Functions responses do not inherit static-file headers. The scoped content security policy restricts object loading and base URLs; it is not a comprehensive script-execution policy.

`GET /health` returns HTTP 200 with `{"status":"ok","service":"tinta"}` and `Cache-Control: no-store`. It exposes no credentials or user data and reports process liveness only; the public app has no database readiness dependency.

## Optional backend infrastructure

The repository originated from an application scaffold and retains these extension points:

| Module              | Available infrastructure                                                            | Current product use                                    |
| ------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `src/lib/db.ts`     | Parameterized PostgreSQL queries and an in-memory PGlite development fallback       | No learner-data reads or writes                        |
| `src/lib/auth/`     | Better Auth clients, server helpers, identity verification, and preview integration | No account interface or progress sync                  |
| `src/lib/app-data/` | Connector and readiness helpers                                                     | No connected learning-data service                     |
| `migrations/auth/`  | Opt-in authentication schema                                                        | Excluded from the top-level application migration scan |

These modules are not evidence of a deployed account backend. Setting a database URL or turning on an auth flag alone does not implement accounts or sync. The PGlite fallback is in memory and is unsuitable as durable production storage.

If the product later needs accounts, add the user-facing flow and server routes deliberately. Verify identity on the server, authorize each user's records, validate request input, and keep secrets in server-only configuration. Choose persistent storage compatible with the deployment runtime, define schema migrations and recovery procedures, and update the privacy policy before collecting learner data. Changing the public origin also requires reviewing authentication callback and allowed-origin settings if authentication is introduced.

## Verification

Pull requests run TypeScript checking, ESLint, unit tests, the Cloudflare build, and `test:production` against the built worker handler. Application tests exercise language rules, search, progress behavior, and quiz sessions; scaffold tests cover shared platform helpers. Generator-document checks may skip in a public checkout when their private source files are absent.

Passing those checks does not establish browser compatibility or successful deployment. Inspect affected interactions in a real browser, then verify the deployed origin, headers, metadata, direct route loads, and local progress persistence using the [deployment guide](deployment.md).
