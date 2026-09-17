/**
 * Shared LIVE-PREVIEW OAuth client (server-only — NEVER import from the client).
 *
 * The sandbox serves each live preview on a dynamic `https://*.grok-sandbox.com`
 * URL, which can't be pre-registered per app. The broker instead exposes ONE
 * shared "preview" client that accepts any
 * `https://*.grok-sandbox.com/api/auth/oauth2/callback/*`
 * (broker: `app-builder-deployer/auth/src/preview-oauth.ts`).
 *
 * The preview client secret MUST come from the environment
 * (`GROK_PREVIEW_CLIENT_SECRET` or, when the deployer injects a per-app client,
 * `GROK_AUTH_CLIENT_SECRET` in `server.ts`). There is no hardcoded fallback —
 * if unset, preview OAuth fails closed (`authConfigured` is false).
 */
export const PREVIEW_CLIENT_ID = "grok_preview";

/** Read the preview OAuth client secret from env only (never bake into client). */
export function readPreviewClientSecret(): string | undefined {
  const value = process.env.GROK_PREVIEW_CLIENT_SECRET?.trim();
  return value ? value : undefined;
}

/** The shared auth broker issuer (OIDC discovery lives under it). */
export const GROK_ISSUER_DEFAULT = "https://auth.grok.me";

/**
 * Host patterns whose callbacks the preview client accepts. Better Auth derives
 * the live preview's real origin from the request host and validates it against
 * this list (wildcard-matched), so the OAuth `redirect_uri` becomes the concrete
 * `https://<preview-host>/api/auth/oauth2/callback/...` the broker allows.
 */
export const PREVIEW_ALLOWED_HOSTS = ["*.grok-sandbox.com"] as const;
