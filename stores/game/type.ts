export type PlayerItem = {
  name: string;
  role: string;
};

export type GameStoreItem = {
  players: PlayerItem[];
  resources: any[];
  round: number;
  setPlayers: (players: PlayerItem[]) => void;
  setResources: (resources: any[]) => void;
  setRound: (round: number) => void;
};
