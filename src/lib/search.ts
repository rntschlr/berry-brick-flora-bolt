import { LETTERS } from "@/data/alphabet";
import { CASES } from "@/data/cases";
import { VERB_TOPICS, VERBS, COVERBS } from "@/data/verbs";
import { POSTPOSITIONS, WORD_BUILDING } from "@/data/grammar";
import { COLOURS, COUNTRIES, DAYS, GREETINGS, INTRODUCTIONS, MONTHS, NUMBERS, PHRASES } from "@/data/vocab";
import { NAV } from "@/data/nav";

export type SearchHit = {
  href: string;
  title: string;
  subtitle: string;
};

export function buildSearchIndex(): SearchHit[] {
  const hits: SearchHit[] = NAV.map((n) => ({
    href: n.href,
    title: n.label,
    subtitle: n.blurb,
  }));

  for (const l of LETTERS) {
    hits.push({
      href: "/alphabet",
      title: `${l.glyph}  ·  ${l.name}`,
      subtitle: `${l.example.hu} — ${l.hint}`,
    });
  }
  for (const c of CASES) {
    hits.push({
      href: `/cases/${c.id}`,
      title: `${c.name}  ${c.suffixes.join(" ")}`,
      subtitle: c.english + " — " + c.summary,
    });
  }
  for (const v of VERB_TOPICS) {
    hits.push({ href: `/verbs#${v.id}`, title: v.title, subtitle: v.summary });
  }
  for (const v of VERBS) {
    hits.push({
      href: "/lab",
      title: `${v.stem} — ${v.en}`,
      subtitle: v.presentIndef.slice(0, 3).join(", "),
    });
  }
  for (const c of COVERBS) {
    hits.push({ href: "/verbs#coverbs", title: `Coverb ${c.prefix}`, subtitle: c.sense });
  }
  for (const p of POSTPOSITIONS) {
    hits.push({ href: "/grammar", title: p.hu, subtitle: `${p.en} (${p.personal})` });
  }
  for (const w of WORD_BUILDING) {
    hits.push({ href: "/word-building", title: w.suffix, subtitle: `${w.makes} — ${w.ex}` });
  }
  const bags: { href: string; items: { hu: string; en: string }[] }[] = [
    { href: "/phrases", items: [...GREETINGS, ...INTRODUCTIONS, ...PHRASES] },
    { href: "/basics", items: [...NUMBERS, ...COLOURS, ...DAYS, ...MONTHS, ...COUNTRIES] },
  ];
  for (const bag of bags) {
    for (const it of bag.items) {
      hits.push({ href: bag.href, title: it.hu, subtitle: it.en });
    }
  }
  return hits;
}

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
