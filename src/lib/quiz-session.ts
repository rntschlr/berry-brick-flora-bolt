import type { QuizQuestion } from "../data/quiz.ts";

export type QuizAnswer = { question: QuizQuestion; picked: number };

export function summarizeAnswers(answers: readonly QuizAnswer[]) {
  const mistakes = answers.filter((answer) => answer.picked !== answer.question.answer);
  return { score: answers.length - mistakes.length, mistakes };
}

export function isFullDrill(
  questions: readonly QuizQuestion[],
  bank: readonly QuizQuestion[],
  review: boolean,
) {
  const ids = new Set(questions.map((question) => question.id));
  return (
    !review && questions.length === bank.length && bank.every((question) => ids.has(question.id))
  );
}
