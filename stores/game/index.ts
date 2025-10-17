import { create } from "zustand";
import { GameStoreItem } from "./type";

export const useGameState = create<GameStoreItem>((set) => ({
  players: [],
  resources: [],
  round: 0,
  setPlayers: (players) => set({ players }),
  setResources: (resources) => set({ resources }),
  setRound: (round) => set({ round }),
}));
