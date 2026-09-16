import { createFileRoute, Link } from "@tanstack/react-router";
import { CASES } from "@/data/cases";
import { BackLink, PageHeader, Paper } from "@/components/page";

export const Route = createFileRoute("/cases/$slug")({
  component: CaseDetail,
});

function CaseDetail() {
  const { slug } = Route.useParams();
  const cas = CASES.find((c) => c.id === slug);
  if (!cas) {
    return (
      <div className="max-w-3xl">
        <BackLink href="/cases" label="All cases" />
        <PageHeader title="No such case" lead="That sheet isn’t on the desk." />
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <BackLink href="/cases" label="All cases" />
      <PageHeader
        id={`case-${cas.id}`}
        kicker={cas.huName}
        title={`${cas.name}  ${cas.suffixes.join(" / ")}`}
        lead={cas.summary}
      />
      <Paper>
        <p className="text-sm text-muted">English job: {cas.english}</p>
        {cas.triad ? (
          <p className="mt-1 text-sm text-muted">
            Triad: {cas.triad} · {cas.role}
          </p>
        ) : null}
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
          {cas.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </Paper>
      <div className="mt-4">
        {cas.examples.map((ex) => (
          <Paper key={ex.hu} className="mb-3">
            <p className="font-serif text-xl">{ex.hu}</p>
            <p className="mt-1 text-sm text-muted">{ex.en}</p>
          </Paper>
        ))}
      </div>
      <p className="mt-6 text-sm">
        <Link to="/lab" className="font-medium text-primary">
          Inflect this on the workbench →
        </Link>
      </p>
    </div>
  );
}
