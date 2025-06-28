import CircleIcon from "@/assets/circle.min.svg";
import CrossIcon from "@/assets/cross.min.svg";

type CellProps = {
  value: null | "X" | "O";
  onSquareClick: () => void;
};

function Cell({ value, onSquareClick }: CellProps) {
  return (
    <div
      className="w-24 h-24 cursor-pointer rounded-[3px] flex items-center justify-center"
      style={{ backgroundColor: "#2c2c2e" }}
      onClick={onSquareClick}
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
