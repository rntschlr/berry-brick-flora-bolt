import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  markSeenList,
  recordQuizStats,
  toggleBookmarkList,
  safeStorage,
  normalizeProgress,
  useProgress,
} from "./progress.ts";

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

describe("progress resilience", () => {
  it("restores valid fields and discards malformed persisted values", () => {
    assert.deepEqual(
      normalizeProgress({
        seen: ["alphabet", null, 5, "alphabet", "verbs", ""],
        bookmarks: "cases",
        quizBest: -1,
        quizAttempts: Number.MAX_VALUE,
      }),
      { seen: ["alphabet", "verbs"], bookmarks: [], quizBest: 0, quizAttempts: 0 },
    );
    for (const invalid of [null, undefined, [], "invalid"]) {
      assert.deepEqual(normalizeProgress(invalid), {
        seen: [],
        bookmarks: [],
        quizBest: 0,
        quizAttempts: 0,
      });
    }
  });
  it("rehydrates saved progress without allowing stored keys to replace actions", async () => {
    const options = useProgress.persist.getOptions();
    const initial = useProgress.getState();
    try {
      useProgress.persist.setOptions({
        storage: {
          getItem: () => ({
            state: {
              seen: ["alphabet"],
              bookmarks: ["verbs"],
              quizBest: 7,
              quizAttempts: 3,
              markSeen: "broken",
              toggleBookmark: null,
            },
            version: 0,
          }),
          setItem() {},
          removeItem() {},
        },
      });
      await useProgress.persist.rehydrate();
      useProgress.getState().markSeen("verbs");
      useProgress.getState().toggleBookmark("cases");
      assert.deepEqual(useProgress.getState().seen, ["alphabet", "verbs"]);
      assert.deepEqual(useProgress.getState().bookmarks, ["verbs", "cases"]);
      assert.equal(useProgress.getState().quizBest, 7);
      assert.equal(useProgress.getState().quizAttempts, 3);
    } finally {
      useProgress.setState(initial, true);
      useProgress.persist.setOptions(options);
    }
  });
  it("moves revisited sheets to the end without inflating the count", () => {
    assert.deepEqual(markSeenList(["alphabet", "verbs"], "alphabet"), ["verbs", "alphabet"]);
  });
  it("survives a blocked localStorage getter", () => {
    const storage = safeStorage(() => {
      throw new Error("SecurityError");
    });
    assert.equal(storage.getItem("progress"), null);
    assert.doesNotThrow(() => storage.setItem("progress", "value"));
    assert.doesNotThrow(() => storage.removeItem("progress"));
  });
  it("survives quota failures after successful reads", () => {
    const storage = safeStorage(
      () =>
        ({
          getItem: () => "saved",
          setItem: () => {
            throw new Error("QuotaExceededError");
          },
          removeItem: () => {},
        }) as unknown as Storage,
    );
    assert.equal(storage.getItem("progress"), "saved");
    assert.doesNotThrow(() => storage.setItem("progress", "new"));
  });
});
