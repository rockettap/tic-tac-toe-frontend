import { Cell, type MarkOrNull } from "./cell";

type BoardProps = {
  state: MarkOrNull[];
  notAllowed: boolean;
  onCellClick?: (row: number, col: number) => void;
};

function Board({ state, notAllowed, onCellClick }: BoardProps) {
  return (
    <div
      className="mb-6 inline-grid gap-1 rounded-3xl overflow-hidden border-4 border-neutral-300 bg-neutral-300 dark:border-neutral-600 dark:bg-neutral-600 grid-cols-3 sm:max-w-[316px] w-full"
      style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
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
