import { create } from "zustand";
import { UserStoreItem } from "./type";

export const useUserStore = create<UserStoreItem>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
