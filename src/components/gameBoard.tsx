import black_disc_imagePath from "../assets/black-disc.png";
import white_disc_imagePath from "../assets/white-disc.png";

interface SquareProps {
  value: Disc;
}

type Disc = "B" | "W" | "";

function Square({ value }: SquareProps) {
  if (value === "B") {
    return (
      <div className="square">
        <img className="disc" src={black_disc_imagePath} alt="Black Disc" />
      </div>
    );
  }
  if (value === "W") {
    return (
      <div className="square">
        <img className="disc" src={white_disc_imagePath} alt="White Disc" />
      </div>
    );
  }
  if (value === "") {
    return <div className="square" />;
  }
}
export default function Board() {
  // Function to render a single row of the board
  const board: Disc[][] = [
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "W", "", "", "", ""],
    ["", "", "", "W", "B", "", "", ""],
    ["", "", "", "B", "W", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
  ];
  return (
    <div className="reversi-board">
          {board.map((row, rowIndex) =>
            row.map((value, colIndex) => {
              const key = `${rowIndex}-${colIndex}`;
              return <Square key={key} value={value} />;
            })
          )}
        </div>
  );
}
