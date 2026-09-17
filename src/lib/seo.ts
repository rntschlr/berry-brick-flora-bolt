import { APP_DESCRIPTION, APP_NAME, APP_TAGLINE } from "@/lib/brand";

export function pageHead(title?: string, description?: string) {
  const full = title ? `${title} · ${APP_NAME}` : `${APP_NAME} — ${APP_TAGLINE}`;
  const desc = description ?? APP_DESCRIPTION;
  return {
    meta: [
      { title: full },
      { name: "description", content: desc },
    ],
  };
}
