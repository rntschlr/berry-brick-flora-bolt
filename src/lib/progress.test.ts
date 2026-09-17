import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { markSeenList, recordQuizStats, toggleBookmarkList } from "./progress.ts";

describe("markSeenList", () => {
  it("appends a new id", () => {
    assert.deepEqual(markSeenList(["a"], "b"), ["a", "b"]);
  });
  it("is idempotent for duplicates", () => {
    assert.deepEqual(markSeenList(["a"], "a"), ["a"]);
  });
  it("ignores empty ids", () => {
    assert.deepEqual(markSeenList(["a"], ""), ["a"]);
  });
});

describe("toggleBookmarkList", () => {
  it("adds then removes", () => {
    const once = toggleBookmarkList([], "cases/inessive");
    assert.deepEqual(once, ["cases/inessive"]);
    assert.deepEqual(toggleBookmarkList(once, "cases/inessive"), []);
  });
  it("ignores empty ids", () => {
    assert.deepEqual(toggleBookmarkList(["x"], ""), ["x"]);
  });
});

describe("recordQuizStats", () => {
  it("keeps the best score and increments attempts", () => {
    assert.deepEqual(recordQuizStats(3, 1, 5), { quizBest: 5, quizAttempts: 2 });
    assert.deepEqual(recordQuizStats(7, 2, 4), { quizBest: 7, quizAttempts: 3 });
  });
  it("floors and clamps non-finite scores to 0", () => {
    assert.deepEqual(recordQuizStats(2, 0, 3.9), { quizBest: 3, quizAttempts: 1 });
    assert.deepEqual(recordQuizStats(2, 0, Number.NaN), { quizBest: 2, quizAttempts: 1 });
    assert.deepEqual(recordQuizStats(0, 0, -4), { quizBest: 0, quizAttempts: 1 });
  });
});
