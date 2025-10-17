import { SocketEventHandler, SocketEventType } from "@/types/socket";

export enum SocketStatus {
  DISCONNECTED = "disconnected",
  CONNECTING = "connecting",
  CONNECTED = "connected",
  RECONNECTING = "reconnecting",
  ERROR = "error",
}

export interface SocketStoreItem {
  // État de la connexion
  socket: WebSocket | null;
  status: SocketStatus;
  error: string | null;
  reconnectAttempts: number;

  // Méthodes de connexion
  openSocket: (url: string) => void;
  closeSocket: () => void;
  reconnect: () => void;

  // Gestion des messages
  sendMessage: <T = any>(type: SocketEventType, data: T) => Promise<void>;

  // Gestion des événements
  on: (event: SocketEventType, handler: SocketEventHandler) => () => void;
  off: (event: SocketEventType, handler: SocketEventHandler) => void;
  emit: (event: SocketEventType, data: any) => void;

  // État interne (ne pas utiliser directement)
  _eventHandlers: Map<SocketEventType, Set<SocketEventHandler>>;
  _reconnectTimer: NodeJS.Timeout | null;
  _url: string | null;
}
