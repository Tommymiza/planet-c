import { useSocket } from "@/stores/socket";
import { SocketEventHandler, SocketEventType } from "@/types/socket";
import { useEffect } from "react";

/**
 * Hook pour s'abonner à un événement socket
 * Se désabonne automatiquement au démontage du composant
 */
export function useSocketEvent<T = any>(
  event: SocketEventType,
  handler: SocketEventHandler<T>
) {
  const { on } = useSocket();
  useEffect(() => {
    const unsubscribe = on(event, handler);
    return unsubscribe;
  }, [event, handler, on]);
}

/**
 * Hook pour gérer la connexion socket (à utiliser dans un composant parent)
 */
export function useSocketConnection(url: string) {
  const { openSocket, closeSocket, status } = useSocket();

  useEffect(() => {
    if (url) {
      openSocket(url);
    }

    return () => {
      closeSocket();
    };
  }, [url, openSocket, closeSocket]);

  return { status };
}

/**
 * Hook pour envoyer des messages via socket
 */
export function useSocketSend() {
  const { sendMessage, status } = useSocket();

  return {
    send: sendMessage,
    isConnected: status === "connected",
  };
}

/**
 * Hook pour obtenir le statut de connexion
 */
export function useSocketStatus() {
  const { status, error, reconnectAttempts } = useSocket();

  return {
    status,
    error,
    reconnectAttempts,
    isConnected: status === "connected",
    isConnecting: status === "connecting",
    isReconnecting: status === "reconnecting",
    hasError: status === "error",
  };
}
