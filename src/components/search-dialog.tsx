import { useEffect, useMemo, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { buildSearchIndex, searchHits } from "@/lib/search";

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const router = useRouter();
  const index = useMemo(() => buildSearchIndex(), []);
  const hits = searchHits(q, index);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <Button
        variant="secondary"
        className="h-11 w-auto justify-start gap-2 px-3 text-muted md:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="size-4" />
        Search notes
        <kbd className="ml-auto hidden rounded border border-border px-1.5 text-[10px] text-subtle md:inline">
          ⌘K
        </kbd>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl p-0">
          <DialogHeader className="px-5 pt-5">
            <DialogTitle>Search the desk</DialogTitle>
          </DialogHeader>
          <div className="px-5">
            <Input
              autoFocus
              placeholder="ház, accusative, szeretlek, s/sz…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <ul className="max-h-80 overflow-auto px-2 pb-3">
            {q && hits.length === 0 ? (
              <li className="px-3 py-6 text-sm text-muted">Nothing matches. Try a suffix or an English gloss.</li>
            ) : null}
            {hits.map((h) => (
              <li key={h.href + h.title}>
                <button
                  className="w-full rounded-lg px-3 py-2.5 text-left hover:bg-bg-elevated"
                  onClick={() => {
                    setOpen(false);
                    setQ("");
                    const [path, hash] = h.href.split("#");
                    router.history.push(path ?? "/");
                    if (hash) {
                      requestAnimationFrame(() => {
                        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
                      });
                    }
                  }}
                >
                  <p className="font-serif text-base text-fg">{h.title}</p>
                  <p className="line-clamp-1 text-xs text-muted">{h.subtitle}</p>
                </button>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
}
