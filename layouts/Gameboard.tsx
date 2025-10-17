"use client";

import { useSocketStatus } from "@/hooks/useSocketEvents";
import { SocketProvider } from "@/layouts/SocketProvider";
import { SOCKET_CONFIG } from "@/utils/config";
import React from "react";

export default function Gameboard({ children }: { children: React.ReactNode }) {
  return (
    <SocketProvider
      url={SOCKET_CONFIG.url}
      showStatus={true}
      fallback={<GameboardLoading />}
    >
      {children}
    </SocketProvider>
  );
}

// Composant de chargement pendant la connexion
function GameboardLoading() {
  const { status, isReconnecting, reconnectAttempts, error } =
    useSocketStatus();

  const getStatusMessage = () => {
    if (isReconnecting) {
      return {
        title: "Reconnexion en cours...",
        subtitle: `Tentative ${reconnectAttempts} sur ${SOCKET_CONFIG.reconnect.maxAttempts}`,
        color: "border-yellow-500",
      };
    }
    if (error) {
      return {
        title: "Erreur de connexion",
        subtitle: error,
        color: "border-red-500",
      };
    }
    return {
      title: "Connexion au serveur de jeu...",
      subtitle: "Veuillez patienter",
      color: "border-orange-500",
    };
  };

  const statusMessage = getStatusMessage();

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-50">
      <div className="text-center max-w-md px-4">
        {/* Spinner */}
        <div
          className={`animate-spin rounded-full h-16 w-16 border-b-4 ${statusMessage.color} mx-auto mb-4`}
        ></div>

        {/* Titre */}
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          {statusMessage.title}
        </h2>

        {/* Sous-titre */}
        <p className="text-gray-500 mb-4">{statusMessage.subtitle}</p>

        {/* Barre de progression pour la reconnexion */}
        {isReconnecting && (
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div
              className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  (reconnectAttempts / SOCKET_CONFIG.reconnect.maxAttempts) *
                  100
                }%`,
              }}
            ></div>
          </div>
        )}

        {/* Message d'erreur détaillé */}
        {error && reconnectAttempts >= SOCKET_CONFIG.reconnect.maxAttempts && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
            <p className="text-sm text-red-700 mb-2">
              <strong>Impossible de se connecter au serveur.</strong>
            </p>
            <p className="text-xs text-red-600 mb-3">
              Veuillez vérifier que le serveur est en ligne.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
            >
              Réessayer
            </button>
          </div>
        )}

        {/* Info technique (en dev uniquement) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded text-left">
            <p className="text-xs text-blue-700">
              <strong>Mode développement</strong>
            </p>
            <p className="text-xs text-blue-600 mt-1">Status: {status}</p>
            <p className="text-xs text-blue-600">URL: {SOCKET_CONFIG.url}</p>
          </div>
        )}
      </div>
    </div>
  );
}
