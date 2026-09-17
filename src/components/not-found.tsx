import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <div className="mx-auto max-w-lg py-8 text-center">
      <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">Missing sheet</p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-fg">That page is not on the desk.</h1>
      <p className="mt-3 text-muted">It may have been renamed, or the link is old. The notebook still starts at the desk.</p>
      <Button asChild className="mt-6">
        <Link to="/">Back to the desk</Link>
      </Button>
    </div>
  );
}
