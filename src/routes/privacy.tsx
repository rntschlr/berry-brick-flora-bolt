import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Paper } from "@/components/page";

export const Route = createFileRoute("/privacy")({ component: PrivacyPage });

function PrivacyPage() {
  return (
    <div className="max-w-3xl">
      <PageHeader
        kicker="Legal"
        title="Privacy"
        lead="Magdolna is a grammar notebook. It does not need an account, and it does not sell data."
      />
      <Paper className="space-y-4 text-sm leading-relaxed text-muted">
        <p>
          Progress (opened sheets, bookmarks, drill scores) is stored on this
          device only. It is not sent to a Magdolna server, and it is not used for
          advertising.
        </p>
        <p>
          The hosted site may be served through Cloudflare or another
          operator you connect. Those operators may collect standard request
          logs (IP address, browser, pages opened) to keep the site running.
        </p>
        <p>
          If you install Magdolna from the App Store, the wrapper uses the same
          on-device notebook. No extra tracking SDKs are included.
        </p>
        <p>
          Questions:{" "}
          <a className="text-primary" href="mailto:johnkrentschler@icloud.com">
            johnkrentschler@icloud.com
          </a>
        </p>
        <p className="text-xs text-subtle">Last updated 16 September 2026.</p>
      </Paper>
    </div>
  );
}
