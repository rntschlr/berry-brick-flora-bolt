import { APP_DESCRIPTION, APP_NAME, APP_TAGLINE, SITE_ORIGIN } from "@/lib/brand";

export function pageHead(title?: string, description?: string, path = "/") {
  const full = title ? `${title} · ${APP_NAME}` : `${APP_NAME} — ${APP_TAGLINE}`;
  const desc = description ?? APP_DESCRIPTION;
  return {
    meta: [
      { title: full },
      { name: "description", content: desc },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: APP_NAME },
      { property: "og:title", content: full },
      { property: "og:description", content: desc },
      { property: "og:url", content: `${SITE_ORIGIN}${path}` },
      { property: "og:image", content: `${SITE_ORIGIN}/og.jpg` },
      { property: "og:image:alt", content: "Tinta — Hungarian field notes" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_ORIGIN}${path}` }],
  };
}
