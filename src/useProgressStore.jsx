import { create } from "zustand";

const useProgressStore = create((set) => ({
  progress: 0,        // Current progress
  points: 0,          // Total points
  totalAccuracy: 0,   // Store cumulative accuracy
  attempts: 0,        // Track number of speech attempts

  increaseProgress: () =>
    set((state) => {
      if (state.progress >= 100) {
        return { progress: 0, points: state.points + 20 }; // Reset bar & add points
      }
      return { progress: state.progress + 20 };
    }),

    setMatchAccuracy: (accuracy) =>
        set((state) => ({
          totalAccuracy: state.totalAccuracy + parseFloat(accuracy),  // ✅ Add accuracy
          attempts: state.attempts + 1,  // ✅ Increment attempts
        })),
}));

export default useProgressStore;
