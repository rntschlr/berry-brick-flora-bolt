import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ProgressSnapshot = {
  seen: string[];
  bookmarks: string[];
  quizBest: number;
  quizAttempts: number;
};

export function markSeenList(seen: readonly string[], id: string): string[] {
  if (!id || seen.includes(id)) return [...seen];
  return [...seen, id];
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
    { name: "magdolna-progress" },
  ),
);
