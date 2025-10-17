export const defaultConfig = {
  maxHarvestPerHarvester: 2,
  regenerationUntouched: 1,
  regenerationLightUse: 0,
  overharvestPenaltyPerHarvester: 1,
  adjacencyDisturbance: true,
};

// Configuration du Socket
export const SOCKET_CONFIG = {
  url: process.env.NEXT_PUBLIC_SOCKET_URL || "ws://localhost:9090",
  reconnect: {
    maxAttempts: 5,
    delay: 3000,
  },
} as const;

// Configuration de l'application
export const APP_CONFIG = {
  defaultGameId: process.env.NEXT_PUBLIC_GAME_ID || "default-game",
} as const;
