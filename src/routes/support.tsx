import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Paper } from "@/components/page";

export const Route = createFileRoute("/support")({ component: SupportPage });

function SupportPage() {
  return (
    <div className="max-w-3xl">
      <PageHeader
        kicker="Help"
        title="Support"
        lead="Magdolna is a Hungarian field notebook. If something is wrong, write and include the page you were on."
      />
      <div className="space-y-4">
        <Paper>
          <p className="text-xs tracking-[0.16em] text-primary uppercase">Email</p>
          <a className="mt-2 block font-medium text-fg" href="mailto:johnkrentschler@icloud.com">
            johnkrentschler@icloud.com
          </a>
          <p className="mt-2 text-sm text-muted">Usual reply within a few days.</p>
        </Paper>
        <Paper>
          <p className="text-xs tracking-[0.16em] text-primary uppercase">Source</p>
          <a
            className="mt-2 block font-medium text-fg"
            href="https://github.com/rntschlr/berry-brick-flora-bolt"
          >
            github.com/rntschlr/berry-brick-flora-bolt
          </a>
          <p className="mt-2 text-sm text-muted">Open an issue for a bug or a missing ending.</p>
        </Paper>
      </div>
    </div>
  );
}
