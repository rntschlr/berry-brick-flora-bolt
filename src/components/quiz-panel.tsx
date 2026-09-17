import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { QUIZ, type QuizQuestion } from "@/data/quiz";
import { summarizeAnswers, isFullDrill, type QuizAnswer } from "@/lib/quiz-session";
import { useProgress } from "@/lib/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Paper } from "@/components/page";
import { cn } from "@/lib/utils";

function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const TOPICS = [...new Set(QUIZ.map((question) => question.tag))];
const LESSONS: Record<string, string> = { time: "/basics", numbers: "/basics" };

export function QuizPanel() {
  // Start on a deterministic setup screen so server and client markup agree.
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [topic, setTopic] = useState("all");
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [review, setReview] = useState(false);
  const record = useProgress((state) => state.recordQuiz);
  const best = useProgress((state) => state.quizBest);
  const heading = useRef<HTMLHeadingElement>(null);
  const next = useRef<HTMLButtonElement>(null);
  const { score, mistakes } = summarizeAnswers(answers);
  const question = questions[answers.length];
  const total = questions.length;

  useEffect(() => {
    if (total > 0) heading.current?.focus();
  }, [answers.length, total, done]);

  useEffect(() => {
    if (picked !== null) next.current?.focus();
  }, [picked]);

  function start(items: QuizQuestion[], isReview = false) {
    setQuestions(shuffle(items));
    setAnswers([]);
    setPicked(null);
    setDone(false);
    setReview(isReview);
  }

  if (!total) {
    const count = topic === "all" ? QUIZ.length : QUIZ.filter((q) => q.tag === topic).length;
    return (
      <Paper className="mx-auto max-w-2xl">
        <p className="text-xs tracking-[0.16em] text-primary uppercase">
          A little practice, every day
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold">Make it stick.</h2>
        <p className="mt-3 text-muted">
          Choose a focused topic or test the whole notebook. Get an explanation after every answer,
          then revisit the ones you missed.
        </p>
        <label htmlFor="drill-topic" className="mt-6 block text-sm font-medium">
          What would you like to practise?
        </label>
        <select
          id="drill-topic"
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
          className="mt-2 min-h-12 w-full rounded-xl border border-border bg-bg px-4 text-fg"
        >
          <option value="all">The whole notebook · {QUIZ.length} questions</option>
          {TOPICS.map((tag) => (
            <option key={tag} value={tag}>
              {tag.charAt(0).toUpperCase() + tag.slice(1)} ·{" "}
              {QUIZ.filter((q) => q.tag === tag).length} questions
            </option>
          ))}
        </select>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Button
            onClick={() => start(topic === "all" ? QUIZ : QUIZ.filter((q) => q.tag === topic))}
          >
            Start {count}-question drill
          </Button>
          <p className="text-sm text-muted">No timer. Take your time.</p>
        </div>
      </Paper>
    );
  }

  if (done) {
    return (
      <Paper className="mx-auto max-w-2xl">
        <p className="text-xs tracking-[0.16em] text-primary uppercase">
          {review ? "Review complete" : "Drill complete"}
        </p>
        <h2
          ref={heading}
          tabIndex={-1}
          className="mt-3 font-display text-5xl font-semibold tabular-nums"
        >
          {score}/{total}
        </h2>
        <p className="mt-3 text-muted">
          {mistakes.length
            ? "Every mistake is a useful field note. Review these, then give them another go."
            : "Every answer correct. Nicely done — keep exploring the notebook."}
        </p>
        {isFullDrill(questions, QUIZ, review) ? (
          <p className="mt-2 text-sm text-muted">
            Best full drill on this device: {best}/{QUIZ.length}
          </p>
        ) : null}
        <div className="mt-6 flex flex-wrap gap-3">
          {mistakes.length ? (
            <Button
              onClick={() =>
                start(
                  mistakes.map((answer) => answer.question),
                  true,
                )
              }
            >
              Retry {mistakes.length} missed {mistakes.length === 1 ? "question" : "questions"}
            </Button>
          ) : null}
          <Button
            variant="secondary"
            onClick={() => {
              setQuestions([]);
              setDone(false);
            }}
          >
            Choose another drill
          </Button>
        </div>
        {mistakes.length ? (
          <section className="mt-8 border-t border-border pt-6" aria-labelledby="review-heading">
            <h3 id="review-heading" className="font-display text-2xl font-semibold">
              Your review notes
            </h3>
            <ol className="mt-4 space-y-5">
              {mistakes.map(({ question: q, picked: choice }) => (
                <li key={q.id} className="rounded-xl bg-bg-elevated p-4">
                  <p className="font-medium">{q.prompt}</p>
                  <p className="mt-2 text-sm text-muted">Your answer: {q.choices[choice]}</p>
                  <p className="mt-1 text-sm font-medium text-ok">
                    Correct answer: {q.choices[q.answer]}
                  </p>
                  <p className="mt-2 text-sm text-muted">{q.explain}</p>
                  <Link
                    to={LESSONS[q.tag] ?? `/${q.tag}`}
                    className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-primary"
                  >
                    Revisit the {q.tag} sheet →
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        ) : null}
      </Paper>
    );
  }

  const correct = picked === question.answer;
  return (
    <Paper className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between gap-3">
        <Badge variant="muted">
          {answers.length + 1} / {total}
        </Badge>
        <p className="text-sm text-muted">
          {review ? "Review" : "Drill"} · {question.tag}
        </p>
      </div>
      <progress
        aria-label="Questions answered"
        value={answers.length + (picked === null ? 0 : 1)}
        max={total}
        className="mt-4 h-1.5 w-full accent-primary"
      />
      <h2
        ref={heading}
        tabIndex={-1}
        className="mt-5 font-display text-2xl font-semibold md:text-3xl"
      >
        {question.prompt}
      </h2>
      <ul className="mt-6 flex flex-col gap-2" aria-label="Answer choices">
        {question.choices.map((choice, index) => (
          <li key={choice}>
            <button
              disabled={picked !== null}
              onClick={() => setPicked(index)}
              className={cn(
                "min-h-12 w-full rounded-xl px-4 py-3 text-left text-sm shadow-[var(--shadow-border)] transition-colors",
                picked === null
                  ? "bg-bg-elevated hover:bg-surface"
                  : index === question.answer
                    ? "bg-ok/10 text-ok"
                    : "bg-bg-elevated text-muted",
              )}
            >
              {choice}
              {picked !== null && index === question.answer
                ? " — Correct answer"
                : picked === index
                  ? " — Your answer"
                  : ""}
            </button>
          </li>
        ))}
      </ul>
      {picked !== null ? (
        <div className="mt-5 rounded-xl bg-bg-elevated p-4">
          <div role="status">
            <p className="text-sm font-medium">{correct ? "Right." : "Not this one."}</p>
            <p className="mt-1 text-sm text-muted">{question.explain}</p>
          </div>
          <Button
            ref={next}
            className="mt-4"
            onClick={() => {
              const completed = [...answers, { question, picked }];
              setAnswers(completed);
              setPicked(null);
              if (completed.length === total) {
                if (isFullDrill(questions, QUIZ, review))
                  record(summarizeAnswers(completed).score);
                setDone(true);
              }
            }}
          >
            {answers.length + 1 === total ? "See result" : "Next question"}
          </Button>
        </div>
      ) : null}
    </Paper>
  );
}
