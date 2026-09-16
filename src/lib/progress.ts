import { create } from "zustand";
import { persist } from "zustand/middleware";

type ProgressState = {
  seen: string[];
  bookmarks: string[];
  quizBest: number;
  quizAttempts: number;
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
      markSeen: (id) => {
        if (get().seen.includes(id)) return;
        set({ seen: [...get().seen, id] });
      },
      toggleBookmark: (id) => {
        const cur = get().bookmarks;
        set({
          bookmarks: cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id],
        });
      },
      recordQuiz: (score) =>
        set({
          quizBest: Math.max(get().quizBest, score),
          quizAttempts: get().quizAttempts + 1,
        }),
    }),
    { name: "tinta-progress" },
  ),
);
