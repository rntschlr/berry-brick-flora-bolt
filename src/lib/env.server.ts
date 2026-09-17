/**
 * Server-only env helpers. Fail closed with clear messages for required keys.
 * Never import from client code.
 */

export function env(key: string): string | undefined {
  const v = process.env[key]?.trim();
  return v || undefined;
}

/**
 * Read a required env var. Throws with a stable, actionable message when missing.
 */
export function requireEnv(key: string): string {
  const v = env(key);
  if (!v) {
    throw new Error(
      `[magdolna] Missing required environment variable ${key}. ` +
        `Set it in the host env (or Cloudflare Pages project settings).`,
    );
  }
  return v;
}

/** Parse a boolean-ish env flag; undefined when unset. */
export function envFlag(key: string): boolean | undefined {
  const v = env(key)?.toLowerCase();
  if (v === undefined) return undefined;
  if (v === "true" || v === "1" || v === "yes") return true;
  if (v === "false" || v === "0" || v === "no") return false;
  throw new Error(
    `[magdolna] Invalid boolean for ${key}=${JSON.stringify(process.env[key])}. ` +
      `Use true/false (or 1/0).`,
  );
}

/**
 * Workspace preview vs deployed app. The deployer writes GROK_PROJECT_ID on
 * every publish; the sandbox preview never has it. Single source of truth for
 * the split — gate audience, gate endpoints and connector-token semantics all
 * key off this predicate.
 */
export function isWorkspacePreview(): boolean {
  return !env("GROK_PROJECT_ID");
}

/** Auth is off when explicitly disabled (public / Cloudflare default). */
export function isAuthEnabled(): boolean {
  return env("VITE_AUTH_ENABLED") !== "false";
}
