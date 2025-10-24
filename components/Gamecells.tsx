import { useSocket } from "@/stores/socket";
import { useUserStore } from "@/stores/user";
import { useState } from "react";

export default function Gamecells() {
  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(5);
  return (
    <div
      className="grid border border-gray-400"
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: "500px",
        aspectRatio: cols / rows,
      }}
    >
      {Array.from({ length: rows }).map((_, i) =>
        Array.from({ length: cols }).map((_, j) => (
          <Gamecell key={`${i}-${j}`} row={i} col={j} />
        ))
      )}
    </div>
  );
}

function Gamecell({ row, col }: { row: number; col: number }) {
  const { sendMessage } = useSocket();
  const { user } = useUserStore();
  const handleClick = () => {
    sendMessage("cell:clicked", { row, col, user });
  };
  return (
    <div
      className="border border-gray-300 flex items-center justify-center"
      onClick={handleClick}
    >
      {row},{col}
    </div>
  );
}
