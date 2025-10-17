import { useState } from "react";

export default function Gamecells() {
  const [rows, setRows] = useState(5);
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
          <div
            key={`${i}-${j}`}
            className="border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-blue-100"
          >
            ({i + 1}, {j + 1})
          </div>
        ))
      )}
    </div>
  );
}
