import CircleIcon from "@/assets/circle.min.svg";
import CrossIcon from "@/assets/cross.min.svg";

export type Mark = "X" | "O";
export type MarkOrNull = Mark | null;

type CellProps = {
  value: MarkOrNull;
  notAllowed: boolean;
  onSquareClick: () => void;
};

function Cell({ value, onSquareClick, notAllowed }: CellProps) {
  return (
    <div
      className={`aspect-square rounded-[3px] flex items-center justify-center bg-neutral-200 dark:bg-neutral-800 ${
        notAllowed ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={!notAllowed ? onSquareClick : undefined}
    >
      {value === "O" ? (
        <img src={CircleIcon} alt="Circle" />
      ) : value === "X" ? (
        <img src={CrossIcon} alt="Cross" />
      ) : null}
    </div>
  );
}

export { Cell };
