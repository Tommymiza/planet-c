import { PlayerItem } from "../game/type";

export type UserStoreItem = {
  user: PlayerItem | null;
  setUser: (user: PlayerItem) => void;
  clearUser: () => void;
};
