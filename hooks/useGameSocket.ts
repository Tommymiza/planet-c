import { useSocketEvent, useSocketSend } from "@/hooks/useSocketEvents";

/**
 * Hook personnalisé pour gérer les événements de jeu
 */
export function useGameEvents() {
  const { isConnected } = useSocketSend();

  return {
    isConnected,
  };
}

/**
 * Hook pour écouter les mises à jour de l'état du jeu
 */

export function useGameJoin(onJoin: (data: any) => void) {
  useSocketEvent("game:join", onJoin);
}

/**
 * Hook pour écouter les résolutions de round
 */
export function useRoundResolution(onResolution: (resolution: any) => void) {
  useSocketEvent("round:resolution", onResolution);
}

/**
 * Hook pour écouter les connexions/déconnexions de joueurs
 */
export function usePlayerEvents(
  onPlayerConnected?: (data: any) => void,
  onPlayerDisconnected?: (data: any) => void
) {
  if (onPlayerConnected) {
    useSocketEvent("player:connected", onPlayerConnected);
  }

  if (onPlayerDisconnected) {
    useSocketEvent("player:disconnected", onPlayerDisconnected);
  }
}
