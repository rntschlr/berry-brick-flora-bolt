/** Liveness only; no database, credentials, or user information is exposed. */
export default function health() {
  return Response.json(
    { status: "ok", service: "tinta" },
    {
      headers: { "cache-control": "no-store" },
    },
  );
}
