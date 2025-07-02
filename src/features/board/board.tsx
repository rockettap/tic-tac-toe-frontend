import { Cell } from "./cell";

type BoardProps = {
  state: (null | "X" | "O")[];
  onCellClick?: (row: number, col: number) => void;
};

function Board({ state, onCellClick }: BoardProps) {
  return (
    <div>
      <div
        style={{
          display: "inline-grid",
          gridTemplateColumns: `repeat(3, 96px)`,
          gap: "4px",
          borderRadius: "24px",
          overflow: "hidden",
          backgroundColor: "#636366",
          border: "4px solid #636366",
        }}
      >
        {state.map((value, index) => (
          <Cell
            key={index}
            value={value}
            onSquareClick={() =>
              onCellClick?.(Math.floor(index / 3), index % 3)
            }
          />
        ))}
      </div>
    </div>
  );
}

export { Board };
