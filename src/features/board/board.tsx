import { Cell } from "./cell";

function Board() {
  return (
    <div>
      <div
        style={{
          display: "inline-grid",
          gridTemplateColumns: "repeat(3, 96px)",
          gap: "4px",
          borderRadius: "24px",
          overflow: "hidden",
          backgroundColor: "#636366",
          border: "4px solid #636366",
        }}
      >
        <Cell value="O" onSquareClick={() => console.log(0, 0)} />
        <Cell value="X" onSquareClick={() => console.log(0, 1)} />
        <Cell value="O" onSquareClick={() => console.log(0, 2)} />

        <Cell value={null} onSquareClick={() => console.log(1, 0)} />
        <Cell value="X" onSquareClick={() => console.log(1, 1)} />
        <Cell value="X" onSquareClick={() => console.log(1, 2)} />

        <Cell value="O" onSquareClick={() => console.log(2, 0)} />
        <Cell value={null} onSquareClick={() => console.log(2, 1)} />
        <Cell value="O" onSquareClick={() => console.log(2, 2)} />
      </div>
    </div>
  );
}

export { Board };
