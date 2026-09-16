import { useMemo, useState } from "react";
import { QUIZ } from "@/data/quiz";
import { useProgress } from "@/lib/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Paper } from "@/components/page";
import { cn } from "@/lib/utils";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function QuizPanel() {
  const [seed] = useState(() => shuffle(QUIZ));
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const record = useProgress((s) => s.recordQuiz);
  const best = useProgress((s) => s.quizBest);
  const q = seed[i];
  const total = seed.length;

  const status = useMemo(() => {
    if (picked === null) return null;
    return picked === q.answer;
  }, [picked, q]);

  if (done) {
    return (
      <Paper className="mx-auto max-w-xl text-center">
        <p className="text-xs tracking-[0.16em] text-primary uppercase">Drill complete</p>
        <p className="mt-3 font-display text-5xl font-semibold">
          {score}/{total}
        </p>
        <p className="mt-2 text-muted">Best on this desk: {Math.max(best, score)}/{total}</p>
        <Button
          className="mt-6"
          onClick={() => {
            setI(0);
            setPicked(null);
            setScore(0);
            setDone(false);
          }}
        >
          Drill again
        </Button>
      </Paper>
    );
  }

  return (
    <Paper className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between gap-3">
        <Badge variant="muted">
          {i + 1} / {total}
        </Badge>
        <p className="text-sm text-muted">
          Score {score} · {q.tag}
        </p>
      </div>
      <h2 className="mt-5 font-display text-2xl font-semibold md:text-3xl">{q.prompt}</h2>
      <ul className="mt-6 flex flex-col gap-2">
        {q.choices.map((c, idx) => {
          const show = picked !== null;
          const correct = idx === q.answer;
          return (
            <li key={c}>
              <button
                disabled={picked !== null}
                onClick={() => setPicked(idx)}
                className={cn(
                  "min-h-12 w-full rounded-xl px-4 py-3 text-left text-sm shadow-[var(--shadow-border)]",
                  !show && "bg-bg-elevated hover:bg-surface",
                  show && correct && "bg-ok/10 text-ok",
                  show && !correct && idx === picked && "bg-primary/10 text-primary",
                  show && !correct && idx !== picked && "bg-bg-elevated text-muted",
                )}
              >
                {c}
              </button>
            </li>
          );
        })}
      </ul>
      {status !== null ? (
        <div className="mt-5 rounded-xl bg-bg-elevated p-4">
          <p className="text-sm font-medium">{status ? "Right." : "Not this one."}</p>
          <p className="mt-1 text-sm text-muted">{q.explain}</p>
          <Button
            className="mt-4"
            onClick={() => {
              const nextScore = score + (status ? 1 : 0);
              if (i + 1 >= total) {
                record(nextScore);
                setScore(nextScore);
                setDone(true);
              } else {
                setScore(nextScore);
                setI(i + 1);
                setPicked(null);
              }
            }}
          >
            {i + 1 >= total ? "See result" : "Next"}
          </Button>
        </div>
      ) : null}
    </Paper>
  );
}
