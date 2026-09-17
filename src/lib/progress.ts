import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const PROGRESS_KEY = "tinta-progress";
const LEGACY_PROGRESS_KEYS = ["magdolna-progress"] as const;

export type ProgressSnapshot = {
  seen: string[];
  bookmarks: string[];
  quizBest: number;
  quizAttempts: number;
};

/** Persisted browser data can be stale or malformed. Restore data, never actions. */
export function normalizeProgress(value: unknown): ProgressSnapshot {
  const data =
    value && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : {};
  const ids = (value: unknown): string[] =>
    Array.isArray(value)
      ? [...new Set(value.filter((id): id is string => typeof id === "string" && id.length > 0))]
      : [];
  const count = (value: unknown): number =>
    typeof value === "number" && Number.isSafeInteger(value) && value >= 0 ? value : 0;
  return {
    seen: ids(data.seen),
    bookmarks: ids(data.bookmarks),
    quizBest: count(data.quizBest),
    quizAttempts: count(data.quizAttempts),
  };
}

export function markSeenList(seen: readonly string[], id: string): string[] {
  if (!id) return [...seen];
  return [...seen.filter((item) => item !== id), id];
}

export function toggleBookmarkList(bookmarks: readonly string[], id: string): string[] {
  if (!id) return [...bookmarks];
  return bookmarks.includes(id) ? bookmarks.filter((x) => x !== id) : [...bookmarks, id];
}

export function recordQuizStats(
  quizBest: number,
  quizAttempts: number,
  score: number,
): { quizBest: number; quizAttempts: number } {
  const safe = Number.isFinite(score) ? Math.max(0, Math.floor(score)) : 0;
  return {
    quizBest: Math.max(quizBest, safe),
    quizAttempts: quizAttempts + 1,
  };
}

// Every operation can throw in restricted browsers, not just the initial read.
export function safeStorage(getStorage: () => Storage) {
  return {
    getItem: (key: string) => {
      try {
        return getStorage().getItem(key);
      } catch {
        return null;
      }
    },
    setItem: (key: string, value: string) => {
      try {
        getStorage().setItem(key, value);
      } catch {
        /* Keep this session usable. */
      }
    },
    removeItem: (key: string) => {
      try {
        getStorage().removeItem(key);
      } catch {
        /* Storage is optional. */
      }
    },
  };
}

export const browserStorage = safeStorage(() => window.localStorage);

function progressStorage() {
  if (!browserStorage.getItem(PROGRESS_KEY)) {
    for (const key of LEGACY_PROGRESS_KEYS) {
      const legacy = browserStorage.getItem(key);
      if (legacy) {
        browserStorage.setItem(PROGRESS_KEY, legacy);
        break;
      }
    }
  }
  return browserStorage;
}

type ProgressState = ProgressSnapshot & {
  markSeen: (id: string) => void;
  toggleBookmark: (id: string) => void;
  recordQuiz: (score: number) => void;
};

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      seen: [],
      bookmarks: [],
      quizBest: 0,
      quizAttempts: 0,
      markSeen: (id) => set({ seen: markSeenList(get().seen, id) }),
      toggleBookmark: (id) => set({ bookmarks: toggleBookmarkList(get().bookmarks, id) }),
      recordQuiz: (score) => set(recordQuizStats(get().quizBest, get().quizAttempts, score)),
    }),
    {
      name: PROGRESS_KEY,
      storage: createJSONStorage(() => progressStorage()),
      merge: (persisted, current) => ({ ...current, ...normalizeProgress(persisted) }),
      partialize: ({ seen, bookmarks, quizBest, quizAttempts }) => ({
        seen,
        bookmarks,
        quizBest,
        quizAttempts,
      }),
    },
  ),
);
