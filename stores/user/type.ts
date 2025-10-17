export type User = {
  name: string;
  role: "harverster" | "parkManager";
};

export type UserStoreItem = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};
