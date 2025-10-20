"use client";

import Player from "@/components/Player";
import { useGameState } from "@/stores/game";

export default function Dashboard() {
  const { players } = useGameState();
  return (
    <div className="grid grid-cols-3 p-10 gap-4 max-sm:grid-cols-1">
      {players.map((p) => (
        <Player key={p.name} player={p} />
      ))}
    </div>
  );
}
