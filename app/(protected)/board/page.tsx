"use client";

import Gamecells from "@/components/Gamecells";
import Player from "@/components/Player";
import { useGameState } from "@/stores/game";

export default function Dashboard() {
  const { players } = useGameState();
  return (
    <div>
      <div className="p-4">
        <h6 className="font-semibold mb-4">Players</h6>
        <div className="grid grid-cols-3 p-10 gap-4 max-sm:grid-cols-1">
          {players.map((p) => (
            <Player key={p.name} player={p} />
          ))}
        </div>
      </div>
      <div className="p-4">
        <h6 className="font-semibold">Game board</h6>
        <div className="flex w-full items-center justify-center">
          <Gamecells />
        </div>
      </div>
    </div>
  );
}
