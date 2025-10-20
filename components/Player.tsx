// player card component
import { PlayerItem } from "@/stores/game/type";

export default function Player({ player }: { player: PlayerItem }) {
  return (
    <div className="p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">{player.name}</h2>
      <p className="text-gray-600">{player.role}</p>
    </div>
  );
}
