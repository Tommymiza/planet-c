import {
  SocketEventHandler,
  SocketEventType,
  SocketMessage,
} from "@/types/socket";
import { SOCKET_CONFIG } from "@/utils/config";
import { create } from "zustand";
import { SocketStatus, SocketStoreItem } from "./type";

const { maxAttempts: MAX_RECONNECT_ATTEMPTS, delay: RECONNECT_DELAY } =
  SOCKET_CONFIG.reconnect;

export const useSocket = create<SocketStoreItem>((set, get) => ({
  // État initial
  socket: null,
  status: SocketStatus.DISCONNECTED,
  error: null,
  reconnectAttempts: 0,
  _eventHandlers: new Map(),
  _reconnectTimer: null,
  _url: null,

  // Ouvrir une connexion WebSocket
  openSocket: (url: string) => {
    const state = get();

    // Si déjà connecté, ne rien faire
    if (state.socket?.readyState === WebSocket.OPEN) {
      console.log("Socket already connected");
      return;
    }

    // Fermer la connexion existante si elle existe
    if (state.socket) {
      state.socket.close();
    }

    try {
      set({
        status: SocketStatus.CONNECTING,
        error: null,
        _url: url,
      });

      const socket = new WebSocket(url);

      socket.onopen = () => {
        console.log("✅ Socket connected");
        set({
          socket,
          status: SocketStatus.CONNECTED,
          reconnectAttempts: 0,
          error: null,
        });
      };

      socket.onmessage = (event) => {
        try {
          const message: SocketMessage = JSON.parse(event.data);
          get().emit(message.type, message.data);
        } catch (error) {
          console.error("❌ Error parsing message:", error);
        }
      };

      socket.onclose = (event) => {
        console.log("🔌 Socket disconnected", event.code, event.reason);
        set({ socket: null, status: SocketStatus.DISCONNECTED });

        // Émettre un événement de déconnexion
        get().emit("player:disconnected", {
          code: event.code,
          reason: event.reason,
        });

        // Tentative de reconnexion automatique
        const currentState = get();
        if (
          currentState.reconnectAttempts < MAX_RECONNECT_ATTEMPTS &&
          currentState._url
        ) {
          get().reconnect();
        }
      };

      socket.onerror = (error) => {
        console.error("❌ Socket error:", error);
        set({
          status: SocketStatus.ERROR,
          error: "Connection error occurred",
        });
      };
    } catch (error) {
      console.error("❌ Error creating socket:", error);
      set({
        status: SocketStatus.ERROR,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  // Fermer la connexion
  closeSocket: () => {
    const state = get();

    // Annuler le timer de reconnexion
    if (state._reconnectTimer) {
      clearTimeout(state._reconnectTimer);
    }

    if (state.socket) {
      state.socket.close();
      set({
        socket: null,
        status: SocketStatus.DISCONNECTED,
        reconnectAttempts: 0,
        _reconnectTimer: null,
        _url: null,
      });
    }
  },

  // Reconnexion automatique
  reconnect: () => {
    const state = get();

    if (!state._url) {
      console.warn("⚠️ Cannot reconnect: no URL stored");
      return;
    }

    const attempts = state.reconnectAttempts + 1;
    console.log(
      `🔄 Reconnecting... (attempt ${attempts}/${MAX_RECONNECT_ATTEMPTS})`
    );

    set({
      status: SocketStatus.RECONNECTING,
      reconnectAttempts: attempts,
    });

    const timer = setTimeout(() => {
      get().openSocket(state._url!);
    }, RECONNECT_DELAY);

    set({ _reconnectTimer: timer });
  },

  // Envoyer un message
  sendMessage: async <T = any>(type: SocketEventType, data: T) => {
    const socket = get().socket;

    if (!socket || socket.readyState !== WebSocket.OPEN) {
      throw new Error("Socket is not connected");
    }

    if (!type) {
      throw new Error("Message type is required");
    }

    const message: SocketMessage<T> = {
      type,
      data,
      timestamp: Date.now(),
    };

    try {
      socket.send(JSON.stringify(message));
    } catch (error) {
      console.error("❌ Error sending message:", error);
      throw error;
    }
  },

  // S'abonner à un événement
  on: (event: SocketEventType, handler: SocketEventHandler) => {
    const handlers = get()._eventHandlers;

    console.log(`🔔 Subscribing to event: ${event}`);

    if (!handlers.has(event)) {
      handlers.set(event, new Set());
    }

    handlers.get(event)?.add(handler);

    return () => {
      get().off(event, handler);
    };
  },

  // Se désabonner d'un événement
  off: (event: SocketEventType, handler: SocketEventHandler) => {
    const handlers = get()._eventHandlers;

    if (handlers.has(event)) {
      handlers.get(event)!.delete(handler);
    }
  },

  // Émettre un événement vers les handlers
  emit: (event: SocketEventType, data: any) => {
    const handlers = get()._eventHandlers.get(event);

    if (handlers) {
      handlers.forEach((handler) => {
        try {
          handler(data);
        } catch (error) {
          console.error(`❌ Error in event handler for ${event}:`, error);
        }
      });
    }
  },
}));
