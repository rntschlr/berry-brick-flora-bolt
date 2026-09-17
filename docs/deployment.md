# Deploy Tinta, then connect your domain

Tinta runs as a public, server-rendered Cloudflare Pages site. Publish on `tinta.pages.dev` first, then attach a purchased hostname. No database, no sign-in: bookmarks and progress stay in each visitor’s browser.

## Buy a domain this hour

Do this in Cloudflare + GitHub only. The GitHub repo is already wired for a custom origin: one variable, `VITE_PUBLIC_SITE_URL`, drives canonicals, sitemap, robots, and share cards.

**Need it live in this hour?** Buy at [Cloudflare Registrar](https://domains.cloudflare.com/) in the same account as Pages. Registration is at-cost, DNS is already on Cloudflare, SSL is automatic.

| If this name is free | Buy it | Why |
| --- | --- | --- |
| `tinta.dev` | Cloudflare Registrar | Best public-notebook URL. HTTPS forced. |
| `tinta.ink` | Cloudflare Registrar | Literal: tinta = ink. |
| `tintaval.com` | Cloudflare Registrar | Fallback if the short names are taken. |

`tinta.com`, `tinta.app`, `tinta.page`, and `tinta.hu` are **taken**. `tinta.hu` belongs to TINTA Könyvkiadó (since 1999). Do not fight that.

**Want `tintaval.hu`?** Buy at [DotRoll](https://admin.dotroll.com/) (search `tintaval`). Skip their hosting. Then point nameservers at Cloudflare. New `.hu` names sit in an **8-day public queue** before they resolve — so it cannot be the live URL this hour. Use `tinta.pages.dev` until it is.

### After checkout (same hour, Cloudflare Registrar)

1. Cloudflare dashboard → **Workers & Pages** → project **`tinta`** → **Custom domains** → add the hostname.
2. Apex (`tintaval.com`) must be a zone in this Cloudflare account. Cloudflare writes the DNS record.
3. GitHub → this repo → **Settings → Secrets and variables → Actions**:
   - Secrets: `CLOUDFLARE_API_TOKEN` (Account / Cloudflare Pages / Edit), `CLOUDFLARE_ACCOUNT_ID`
   - Variable: `VITE_PUBLIC_SITE_URL` = `https://your-new-domain` (no trailing slash)
4. **Actions → Cloudflare Pages → Run workflow** on `main`.
5. Open the new hostname. Set a 301 from `www` and later from `tinta.pages.dev` to the canonical host.

Progress on `tinta.pages.dev` does **not** move to the new domain. Browser storage is per-origin.

## First publication

1. Create a Cloudflare Pages **Direct Upload** project named `tinta` with production branch `main`. The name must be available in your account. Alternatively, create it using `npx wrangler pages project create tinta --production-branch main` after signing in to your own Cloudflare account. If you use another project name, update `wrangler.toml`, the workflow's deploy command, and the canonical URL variable together.
2. In GitHub → repository **Settings → Secrets and variables → Actions**, add the secrets `CLOUDFLARE_API_TOKEN` (scoped to your account's Cloudflare Pages Edit permission) and `CLOUDFLARE_ACCOUNT_ID`.
3. Under **Variables**, set `VITE_PUBLIC_SITE_URL` to the HTTPS production origin Cloudflare assigns, with no path, for example `https://tinta.pages.dev`.
4. Merge reviewed changes into `main`. The Cloudflare Pages workflow checks types, lint, tests, and builds before uploading. PRs run checks without deployment. Missing deployment secrets produce an explicit skip rather than a live site.
5. Verify the deployment in Cloudflare and open the actual URL it returns. A successful local build alone is not proof of publication.

The workflow builds standalone mode with auth disabled. Private platform preview/auth helpers remain in source for compatibility but are not part of the public learning flow. Do not enable auth just to publish the notebook.

## Attach your purchased domain

1. Open your Pages project → **Custom domains → Set up a domain** and enter the chosen hostname.
2. Follow Cloudflare's DNS instructions. An apex domain such as `example.com` must be a Cloudflare zone in the same account with Cloudflare nameservers; a subdomain can use a CNAME at another DNS provider. Associate the domain in Pages before adding a CNAME.
3. Wait for domain verification and HTTPS activation.
4. Set the GitHub Actions repository variable `VITE_PUBLIC_SITE_URL` to your new HTTPS origin and rerun the workflow on `main`. This sets page canonical URLs, share-image URLs, structured data, `robots.txt`, and every sitemap entry together. Changing a Cloudflare runtime variable alone does not rebuild metadata created by GitHub Actions.
5. Choose one canonical hostname and configure Cloudflare redirects from alternate hostnames and the old production `pages.dev` hostname once the new hostname works.

Progress stored on the old hostname will not automatically move to the new one: browser localStorage is isolated by origin. No server-side progress copy exists.

Cloudflare references: [custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/), [Direct Upload with CI](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/), [redirecting pages.dev](https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/).

## Production checks

- `/health` returns HTTP 200 and `{"status":"ok","service":"tinta"}` with `Cache-Control: no-store`. It is a liveness check, not a database or external-service readiness check.
- `/`, `/practice`, and a case-detail URL load on a direct visit and a refresh.
- `/robots.txt`, `/sitemap.xml`, canonical links, and `og:image` all use the chosen production origin.
- Inspect an HTML response for `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, and the limited CSP restricting objects and base URLs. The CSP is deliberately scoped; it does not claim a nonce-based script policy.
- Confirm no original builder extension script is requested in standalone mode. Test bookmarks, full/topic drills, retry, mobile navigation, and keyboard focus.
- Check unknown URLs return 404, the social card renders, and the browser console has no app errors.

The server applies response headers to SSR separately from static `_headers`: Cloudflare does not apply that file to Pages Functions responses. See [Cloudflare headers](https://developers.cloudflare.com/pages/configuration/headers/).

## Build locally

```bash
npm ci
npm run typecheck
npm run lint
npm test
VITE_PUBLIC_SITE_URL=https://example.com npm run build:cf
VITE_PUBLIC_SITE_URL=https://example.com npm run test:production
```

`https://example.com` is a documentation example, not a deployed Tinta domain. `build:cf` updates only generated `dist` metadata; source files retain their development defaults. Inspect the output before uploading.

## Operations and rollback

Use GitHub Actions logs for build failures and Cloudflare deployment logs for runtime failures. Do not log credentials, cookies, or learner data. Cloudflare's deployment history can roll production back to a known-good deployment; follow up with a Git revert so the next build matches the restored version. Keep credentials in Actions/Cloudflare secret settings, never in `VITE_` variables or source control.

A previous source revision included a platform preview OAuth credential. It has been removed from active source; history still contains it. The issuer/broker owner must rotate or revoke it if it remains valid. Public standalone deployment does not need that credential.
