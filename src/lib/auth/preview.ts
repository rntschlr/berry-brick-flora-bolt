/**
 * Server-only settings for the optional OAuth broker integration.
 * Credentials are supplied by the host environment; none are shipped with Tinta.
 */
export const GROK_ISSUER_DEFAULT = "https://auth.grok.me";
export const PREVIEW_ALLOWED_HOSTS = ["*.grok-sandbox.com"] as const;
const PREVIEW_CLIENT_ID = "grok_preview";

type AuthEnvironment = Record<string, string | undefined>;

/**
 * Resolve optional authentication without initializing a database or network
 * client. Reject incomplete enabled configurations before accepting requests.
 * The caller passes the built auth flag when no runtime override is present.
 */
export function resolveAuthEnvironment(environment: AuthEnvironment) {
  const env = (key: string): string | undefined => environment[key]?.trim() || undefined;
  const enabled = env("VITE_AUTH_ENABLED") !== "false";
  const clientId = env("GROK_AUTH_CLIENT_ID");
  const clientSecret = env("GROK_AUTH_CLIENT_SECRET");
  const previewSecret = env("GROK_PREVIEW_CLIENT_SECRET");
  const secret = env("BETTER_AUTH_SECRET");
  const databaseUrl = env("DATABASE_URL");
  const production = env("NODE_ENV") === "production";

  if (enabled) {
    // A partial per-app pair must never silently mix with preview credentials.
    if (Boolean(clientId) !== Boolean(clientSecret)) {
      throw new Error(
        "[auth] Set both GROK_AUTH_CLIENT_ID and GROK_AUTH_CLIENT_SECRET, or set VITE_AUTH_ENABLED=false for the public study app.",
      );
    }
    if (!clientId && !previewSecret) {
      throw new Error(
        "[auth] Authentication is enabled but OAuth credentials are missing. Set GROK_AUTH_CLIENT_ID and GROK_AUTH_CLIENT_SECRET, or set VITE_AUTH_ENABLED=false for the public study app. Preview environments may use GROK_PREVIEW_CLIENT_SECRET.",
      );
    }
    // A generated process-local key invalidates persistent sessions on restart.
    if (!secret && (production || databaseUrl)) {
      throw new Error(
        "[auth] Set a stable BETTER_AUTH_SECRET of at least 32 characters when authentication is enabled in production or with DATABASE_URL.",
      );
    }
    if (secret && secret.length < 32) {
      throw new Error("[auth] BETTER_AUTH_SECRET must be at least 32 characters.");
    }
  }

  return {
    enabled,
    issuer: env("GROK_AUTH_ISSUER") ?? GROK_ISSUER_DEFAULT,
    // The preview identity is usable only with an explicitly supplied secret.
    clientId: clientId ?? (previewSecret ? PREVIEW_CLIENT_ID : undefined),
    clientSecret: clientSecret ?? previewSecret,
    secret,
    databaseUrl,
  };
}
