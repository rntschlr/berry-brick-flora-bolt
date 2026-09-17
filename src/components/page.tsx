import { useEffect, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProgress } from "@/lib/progress";
import { Button } from "@/components/ui/button";

export function PageHeader({
  kicker,
  title,
  lead,
  id,
}: {
  kicker?: string;
  title: string;
  lead?: string;
  id?: string;
}) {
  const markSeen = useProgress((s) => s.markSeen);
  const bookmarks = useProgress((s) => s.bookmarks);
  const toggle = useProgress((s) => s.toggleBookmark);

  useEffect(() => {
    if (id) markSeen(id);
  }, [id, markSeen]);

  const saved = id ? bookmarks.includes(id) : false;

  return (
    <header className="mb-8 max-w-3xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          {kicker ? (
            <p className="mb-2 text-xs font-medium tracking-[0.18em] text-primary uppercase">{kicker}</p>
          ) : null}
          <h1 className="font-display text-3xl font-semibold text-fg md:text-5xl">{title}</h1>
        </div>
        {id ? (
          <Button
            variant="ghost"
            size="icon"
            aria-label={saved ? "Remove bookmark" : "Bookmark this sheet"}
            onClick={() => toggle(id)}
            className="shrink-0"
          >
            <Bookmark className={cn("size-5", saved && "fill-primary text-primary")} />
          </Button>
        ) : null}
      </div>
      <span className="mt-4 block h-px w-16 bg-primary" />
      {lead ? <p className="mt-5 text-lg text-muted">{lead}</p> : null}
    </header>
  );
}

export function Paper({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] md:p-6", className)}>{children}</div>;
}

export function Hu({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span lang="hu" className={cn("font-serif text-fg", className)}>
      {children}
    </span>
  );
}

export function PairRow({ hu, en, note }: { hu: string; en: string; note?: string }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-border py-3 last:border-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
      <div>
        <p className="font-serif text-lg text-fg" lang="hu">
          {hu}
        </p>
        {note ? <p className="text-xs text-subtle">{note}</p> : null}
      </div>
      <p className="text-sm text-muted sm:text-right">{en}</p>
    </div>
  );
}

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link to={href} className="mb-6 inline-flex min-h-11 items-center text-sm text-muted hover:text-fg">
      ← {label}
    </Link>
  );
}
