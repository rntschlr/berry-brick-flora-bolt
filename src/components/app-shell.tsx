import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Languages, Layers, LayoutGrid, Share, Target } from "lucide-react";
import { NAV } from "@/data/nav";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchDialog } from "@/components/search-dialog";
import { namesForDate } from "@/data/namedays";

const TABS = [
  { id: "desk", href: "/", label: "Desk", icon: BookOpen },
  { id: "cases", href: "/cases", label: "Cases", icon: Layers },
  { id: "verbs", href: "/verbs", label: "Verbs", icon: Languages },
  { id: "practice", href: "/practice", label: "Drill", icon: Target },
] as const;

const INSTALL_KEY = "magdolna-install-dismissed";

function pathActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="flex flex-col gap-0.5">
      {NAV.map((item) => {
        const active = pathActive(pathname, item.href);
        return (
          <Link
            key={item.id}
            to={item.href}
            onClick={onNavigate}
            className={cn(
              "flex min-h-11 items-center rounded-lg px-3 text-sm transition-colors duration-[var(--motion-quick)]",
              active ? "bg-bg-elevated font-medium text-fg" : "text-muted hover:bg-bg-elevated/70 hover:text-fg",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function Brand() {
  return (
    <Link to="/" className="block">
      <p className="font-display text-2xl font-semibold tracking-tight text-fg">Magdolna</p>
      <p className="text-xs tracking-wide text-muted">Hungarian field notes</p>
    </Link>
  );
}

function useIosInstallHint() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent || "";
    const ios =
      /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && (navigator.maxTouchPoints || 0) > 1);
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in navigator && Boolean((navigator as Navigator & { standalone?: boolean }).standalone));
    const framed = window.self !== window.top;
    const dismissed = window.localStorage.getItem(INSTALL_KEY) === "1";
    setShow(ios && !standalone && !framed && !dismissed);
  }, []);

  const dismiss = () => {
    window.localStorage.setItem(INSTALL_KEY, "1");
    setShow(false);
  };

  return { show, dismiss };
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const nev = namesForDate(new Date());
  const install = useIosInstallHint();
  const tabMatch = TABS.some((tab) => pathActive(pathname, tab.href));

  return (
    <div className="magdolna-shell bg-bg text-fg">
      <div className="mx-auto flex min-h-dvh max-w-7xl">
        <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r border-border px-4 py-6 md:flex">
          <Brand />
          {nev.names.length > 0 ? (
            <p className="mt-4 text-xs text-subtle">
              Névnap · {nev.label}
              <span className="mt-0.5 block font-serif text-sm text-fg">{nev.names.join(", ")}</span>
            </p>
          ) : null}
          <ScrollArea className="mt-6 flex-1">
            <NavList />
          </ScrollArea>
          <p className="pt-4 text-xs leading-relaxed text-subtle">
            Original notes covering the Hungarian grammar map. Accents are not optional.
          </p>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-40 flex items-center gap-2 border-b border-border bg-bg/90 px-4 py-3 backdrop-blur-sm md:px-8">
            <div className="md:hidden">
              <Brand />
            </div>
            <div className="ml-auto">
              <SearchDialog />
            </div>
          </header>
          {install.show ? (
            <div className="flex items-start gap-3 border-b border-border bg-surface px-4 py-3 md:hidden">
              <Share className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-fg">Add Magdolna to your Home Screen</p>
                <p className="mt-0.5 text-sm text-muted">
                  In Safari, tap Share, then Add to Home Screen. It opens like its own app.
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={install.dismiss}>
                Dismiss
              </Button>
            </div>
          ) : null}
          <main className="flex-1 px-4 py-8 pb-24 md:px-10 md:py-10 md:pb-10">
            {children}
            <footer className="mt-16 border-t border-border pt-6 text-xs text-subtle">
              <p>Magdolna · Hungarian field notes</p>
              <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                <Link to="/privacy" className="hover:text-fg">
                  Privacy
                </Link>
                <Link to="/support" className="hover:text-fg">
                  Support
                </Link>
                <a href="https://github.com/rntschlr/magdolna" className="hover:text-fg">
                  Source
                </a>
              </p>
            </footer>
          </main>
        </div>
      </div>

      <nav
        className="magdolna-tabbar fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/95 backdrop-blur-sm md:hidden"
        aria-label="Primary"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-5">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = pathActive(pathname, tab.href);
            return (
              <Link
                key={tab.id}
                to={tab.href}
                className={cn(
                  "flex min-h-16 flex-col items-center justify-center gap-1 text-xs transition-colors duration-[var(--motion-quick)]",
                  active ? "font-medium text-primary" : "text-muted",
                )}
              >
                <Icon className="size-5" />
                {tab.label}
              </Link>
            );
          })}
          <button
            type="button"
            className={cn(
              "flex min-h-16 flex-col items-center justify-center gap-1 text-xs transition-colors duration-[var(--motion-quick)]",
              open || !tabMatch ? "font-medium text-primary" : "text-muted",
            )}
            onClick={() => setOpen(true)}
          >
            <LayoutGrid className="size-5" />
            More
          </button>
        </div>
      </nav>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <Brand />
          </SheetHeader>
          <ScrollArea className="mt-4 max-h-96">
            <NavList onNavigate={() => setOpen(false)} />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
