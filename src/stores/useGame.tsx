import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GameState {
  1: boolean;
  2: boolean;
  3: boolean;
  4: boolean;
  answers: (game: keyof GameState) => void;
}

export const useGameState = create<GameState>()(
  persist(
    (set) => ({
      1: false,
      2: false,
      3: false,
      4: false,

      answers: (game: keyof GameState) =>
        set({
          [game]: true,
        }),
    }),
    {
      name: "thatsus-game-storage",
    },
  ),
);
