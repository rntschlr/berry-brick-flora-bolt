import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page";
import { QuizPanel } from "@/components/quiz-panel";

export const Route = createFileRoute("/practice")({ component: PracticePage });

function PracticePage() {
  return (
    <div>
      <PageHeader
        id="practice"
        kicker="Drill"
        title="Twenty questions"
        lead="Alphabet traps, triads, definite objects, fél négy. Best score stays on this device."
      />
      <QuizPanel />
    </div>
  );
}
