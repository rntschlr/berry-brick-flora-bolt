export type SearchHit = {
  href: string;
  title: string;
  subtitle: string;
};

export function searchHits(q: string, index: SearchHit[], limit = 20): SearchHit[] {
  const n = q.trim().toLowerCase();
  if (!n) return [];
  const scored = index
    .map((h) => {
      const t = h.title.toLowerCase();
      const s = h.subtitle.toLowerCase();
      let score = 0;
      if (t === n || t.startsWith(n)) score += 8;
      if (t.includes(n)) score += 4;
      if (s.includes(n)) score += 2;
      return { h, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  const seen = new Set<string>();
  const out: SearchHit[] = [];
  for (const { h } of scored) {
    const key = h.href + h.title;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(h);
    if (out.length >= limit) break;
  }
  return out;
}
