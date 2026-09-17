import type { ErrorComponentProps } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";
import { APP_NAME } from "@/lib/brand";

const FALLBACK_MESSAGE = `Something went wrong in ${APP_NAME}. Try reloading the page.`;

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message.trim()) return error.message.trim();
  if (typeof error === "string" && error.trim()) return error.trim();
  return FALLBACK_MESSAGE;
}

export function AppErrorComponent({ error, reset }: ErrorComponentProps) {
  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6 py-16 text-center" role="alert">
      <span className="text-primary" aria-hidden="true">
        <TriangleAlert className="size-10" strokeWidth={2} />
      </span>
      <h1 className="font-display text-xl font-semibold tracking-tight text-fg">Something went wrong</h1>
      <p className="max-w-md text-sm break-words text-muted">{errorMessage(error)}</p>
      {typeof reset === "function" ? (
        <button
          type="button"
          onClick={reset}
          className="mt-2 h-11 rounded-md border border-border bg-surface px-4 text-sm font-medium text-fg hover:bg-bg-elevated"
        >
          Try again
        </button>
      ) : null}
    </main>
  );
}
