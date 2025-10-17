"use client";

import {
  useSocketConnection,
  useSocketEvent,
  useSocketStatus,
} from "@/hooks/useSocketEvents";
import { useGameState } from "@/stores/game";
import { PlayerItem } from "@/stores/game/type";
import { ReactNode } from "react";

interface SocketProviderProps {
  url: string;
  children: ReactNode;
  fallback?: ReactNode;
  showStatus?: boolean;
}

/**
 * Provider pour gérer la connexion Socket au niveau global
 * À placer dans le layout principal ou au niveau du board
 */
export function SocketProvider({
  url,
  children,
  fallback,
  showStatus = false,
}: SocketProviderProps) {
  const { status } = useSocketConnection(url);
  const { setPlayers } = useGameState();
  const { isConnected, isConnecting, isReconnecting, error } =
    useSocketStatus();

  useSocketEvent("game:join", (data) => {
    const keys = Object.keys(data);
    const allPlayers: PlayerItem[] = [];
    for (const key of keys) {
      allPlayers.push({
        name: key,
        role: data[key],
      });
    }
    setPlayers(allPlayers);
  });

  // Afficher un fallback pendant la connexion si fourni
  if (!isConnected && fallback) {
    return <>{fallback}</>;
  }

  return (
    <>
      {showStatus && (
        <SocketStatusIndicator
          status={status}
          error={error}
          isConnecting={isConnecting}
          isReconnecting={isReconnecting}
        />
      )}
      {children}
    </>
  );
}

/**
 * Indicateur visuel du statut de la connexion
 */
function SocketStatusIndicator({
  status,
  error,
  isConnecting,
  isReconnecting,
}: {
  status: string;
  error: string | null;
  isConnecting: boolean;
  isReconnecting: boolean;
}) {
  const getStatusColor = () => {
    if (isConnecting || isReconnecting) return "bg-yellow-500";
    if (error) return "bg-red-500";
    if (status === "connected") return "bg-green-500";
    return "bg-gray-500";
  };

  const getStatusText = () => {
    if (isReconnecting) return "Reconnexion...";
    if (isConnecting) return "Connexion...";
    if (error) return `Erreur: ${error}`;
    if (status === "connected") return "Connecté";
    return "Déconnecté";
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-lg border">
      <div
        className={`w-3 h-3 rounded-full ${getStatusColor()} animate-pulse`}
      />
      <span className="text-sm font-medium text-gray-700">
        {getStatusText()}
      </span>
    </div>
  );
}
