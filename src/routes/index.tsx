import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { NAV } from "@/data/nav";
import { CASES, TRIADS } from "@/data/cases";
import { namesForDate } from "@/data/namedays";
import { useProgress } from "@/lib/progress";
import { HarmonyLab } from "@/components/labs";
import { PageHeader, Paper, Hu } from "@/components/page";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const nev = namesForDate(new Date());
  const seen = useProgress((s) => s.seen);
  const bookmarks = useProgress((s) => s.bookmarks);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const sections = NAV.filter((n) => n.href !== "/");

  return (
    <div>
      <PageHeader
        kicker="Magyar desk"
        title="A magyar nyelv nem nehéz. Csak más."
        lead="Field notes for English speakers: the alphabet trap, vowel harmony, eighteen cases, two conjugations, and the phrases you need on the street. Search anything, then drill it."
        id="desk"
      />

      <div className="mb-10 grid gap-4 md:grid-cols-3">
        <Paper>
          <p className="text-xs tracking-[0.16em] text-primary uppercase">Today</p>
          <p className="mt-2 font-display text-2xl">
            {nev.names.length ? nev.names.join(", ") : "—"}
          </p>
          <p className="mt-1 text-sm text-muted">Névnap · {nev.label}. Wish someone boldog névnapot.</p>
        </Paper>
        <Paper>
          <p className="text-xs tracking-[0.16em] text-primary uppercase">Sheets opened</p>
          <p className="mt-2 font-display text-2xl tabular-nums">{ready ? seen.length : "—"}</p>
          <p className="mt-1 text-sm text-muted">
            Bookmarks {ready ? bookmarks.length : "—"}. Progress stays on this device.
          </p>
        </Paper>
        <Paper>
          <p className="text-xs tracking-[0.16em] text-primary uppercase">Start here</p>
          <p className="mt-2 text-sm text-muted">
            Learn <Hu>s</Hu> vs <Hu>sz</Hu>, then harmony, then the three movement triads. Verbs wait patiently.
          </p>
          <Link to="/alphabet" className="mt-3 inline-block text-sm font-medium text-primary">
            Open the alphabet →
          </Link>
        </Paper>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="mb-4 font-display text-2xl font-semibold">The desk</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {sections.map((s) => (
              <Link
                key={s.id}
                to={s.href}
                className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] transition-[box-shadow] duration-[var(--motion-quick)] hover:shadow-[var(--shadow-border-hover)]"
              >
                <p className="font-display text-xl font-semibold">{s.label}</p>
                <p className="mt-1 text-sm text-muted">{s.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <HarmonyLab compact />
          <Paper>
            <p className="text-xs tracking-[0.16em] text-primary uppercase">Movement triads</p>
            <h2 className="mt-1 font-display text-2xl font-semibold">Goal · place · source</h2>
            <ul className="mt-4 space-y-3">
              {TRIADS.map((t) => (
                <li key={t.id}>
                  <p className="font-medium">{t.label}</p>
                  <p className="text-sm text-muted">{t.blurb}</p>
                </li>
              ))}
            </ul>
            <Link to="/cases" className="mt-4 inline-block text-sm font-medium text-primary">
              All {CASES.length} cases →
            </Link>
          </Paper>
        </div>
      </div>
    </div>
  );
}
