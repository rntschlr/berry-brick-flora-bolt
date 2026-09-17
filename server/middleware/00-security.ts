/** Apply to SSR responses too: Cloudflare's static _headers file does not cover Workers. */
export const RESPONSE_HEADERS = {
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin",
  "permissions-policy": "camera=(), microphone=(), geolocation=()",
  "content-security-policy": "object-src 'none'; base-uri 'self'",
} as const;

type ResponseEvent = { res: { headers: Headers } };

export default async function securityHeaders(
  event: ResponseEvent,
  next: () => unknown | Promise<unknown>,
) {
  for (const [name, value] of Object.entries(RESPONSE_HEADERS)) event.res.headers.set(name, value);
  const result = await next();
  if (!(result instanceof Response)) return result;
  // Responses returned directly by other middleware can have immutable headers.
  const headers = new Headers(result.headers);
  for (const [name, value] of Object.entries(RESPONSE_HEADERS)) headers.set(name, value);
  return new Response(result.body, {
    status: result.status,
    statusText: result.statusText,
    headers,
  });
}
