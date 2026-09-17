import assert from "node:assert/strict";
import { test } from "node:test";
import { QUIZ } from "../data/quiz.ts";
import { isFullDrill, summarizeAnswers } from "./quiz-session.ts";

test("review contains only missed questions and preserves their selected answers", () => {
  const correct = { question: QUIZ[0], picked: QUIZ[0].answer };
  const missed = { question: QUIZ[1], picked: (QUIZ[1].answer + 1) % QUIZ[1].choices.length };
  assert.deepEqual(summarizeAnswers([correct, missed]), { score: 1, mistakes: [missed] });
  assert.deepEqual(summarizeAnswers([]), { score: 0, mistakes: [] });
});

test("only a complete original drill can update the full-drill record", () => {
  assert.equal(isFullDrill([...QUIZ].reverse(), QUIZ, false), true);
  assert.equal(isFullDrill(QUIZ.slice(0, 2), QUIZ, false), false);
  assert.equal(isFullDrill(QUIZ, QUIZ, true), false);
  assert.equal(isFullDrill(Array(QUIZ.length).fill(QUIZ[0]), QUIZ, false), false);
});

test("every question has a unique id, a valid answer, and an explanation", () => {
  assert.equal(new Set(QUIZ.map((question) => question.id)).size, QUIZ.length);
  for (const question of QUIZ) {
    assert.ok(Number.isInteger(question.answer));
    assert.ok(question.answer >= 0 && question.answer < question.choices.length);
    assert.ok(question.explain.trim());
  }
});
