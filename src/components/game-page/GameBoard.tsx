import black_disc_imagePath from "../../assets/black-disc.png";
import white_disc_imagePath from "../../assets/white-disc.png";
import { DiscColor } from "../../types";

type GridValue = DiscColor | "";

function Grid({ value }: { value: GridValue }) {
  if (value === "B") {
    return (
      <div className="gameboard-grid">
        <img className="gameboard-grid__disc" src={black_disc_imagePath} alt="Black Disc" />
      </div>
    );
  }
  if (value === "W") {
    return (
      <div className="gameboard-grid">
        <img className="gameboard-grid__disc" src={white_disc_imagePath} alt="White Disc" />
      </div>
    );
  }
  if (value === "") {
    return <div className="gameboard-grid" />;
  }
}
export default function GameBoard() {
  // Function to render a single row of the board
  const initialBoard: GridValue[][] = [
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "W", "B", "", "", ""],
    ["", "", "", "B", "W", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
  ];
  return (
    <div className="reversi-board">
      {initialBoard.map((row, rowIndex) =>
        row.map((value, colIndex) => {
          const index = `${rowIndex}-${colIndex}`;
          return <Grid key={index} value={value} />;
        })
      )}
    </div>
  );
}
