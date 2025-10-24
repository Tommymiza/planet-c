// player card component
import { PlayerItem } from "@/stores/game/type";
import { useUserStore } from "@/stores/user";
import { cn } from "@/utils/cn";

export default function Player({ player }: { player: PlayerItem }) {
  const { user } = useUserStore();
  const current = user?.name === player.name;
  return (
    <div className={cn("p-4 rounded-lg shadow-md", current && "bg-blue-100")}>
      <h2 className="text-xl font-bold">{player.name}</h2>
      <p className="text-gray-600">{player.role}</p>
    </div>
  );
}
