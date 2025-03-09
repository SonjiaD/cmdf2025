import { create } from "zustand";

const useProgressStore = create((set) => ({
  progress: 0,
  points: 0,
  increaseProgress: () =>
    set((state) => {
      if (state.progress >= 100) {
        return { progress: 0, points: state.points + 20 }; // Reset bar & add points
      }
      return { progress: state.progress + 20 };
    }),
}));

export default useProgressStore;
