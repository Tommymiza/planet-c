// Types pour les messages WebSocket
export type SocketEventType =
  | "game:join"
  | "game:start"
  | "game:state"
  | "round:decision"
  | "round:resolution"
  | "player:connected"
  | "player:disconnected"
  | "error";

export interface SocketMessage<T = any> {
  type: SocketEventType;
  data: T;
  timestamp?: number;
}

// Types pour les données spécifiques
export interface JoinGameData {
  playerName: string;
  teamId?: string;
  gameId: string;
}

export interface GameStateData {
  gameId: string;
  scenario: string;
  round: number;
  teams: any[];
  cells: any[];
}

export interface RoundDecisionData {
  teamId: string;
  allocations: Record<string, number>;
  protectedCells?: string[];
}

export interface ErrorData {
  message: string;
  code?: string;
}

// Type pour les handlers d'événements
export type SocketEventHandler<T = any> = (data: T) => void;

export interface SocketEventHandlers {
  [key: string]: SocketEventHandler[];
}
