import { Cell } from "./cell";

type BoardProps = {
  state: (null | "X" | "O")[];
  notAllowed: boolean;
  onCellClick?: (row: number, col: number) => void;
};

function Board({ state, notAllowed, onCellClick }: BoardProps) {
  return (
    <div
      style={{
        gridTemplateColumns: `repeat(3, 96px)`,
      }}
      className="mb-6 inline-grid grid-cols-3 gap-1 rounded-3xl overflow-hidden border-4 border-neutral-300 bg-neutral-300 dark:border-neutral-600 dark:bg-neutral-600"
    >
      {state.map((value, index) => (
        <Cell
          key={index}
          value={value}
          notAllowed={notAllowed}
          onSquareClick={() => onCellClick?.(Math.floor(index / 3), index % 3)}
        />
      ))}
    </div>
  );
}

export { Board };
